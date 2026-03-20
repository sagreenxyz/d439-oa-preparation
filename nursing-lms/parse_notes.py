import re
import json
import sys
import os

# Resolve paths relative to this script's location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
NOTES_PATH = os.path.join(SCRIPT_DIR, '..', 'Notes.md')
OUTPUT_PATH = os.path.join(SCRIPT_DIR, 'js', 'curriculum.js')

with open(NOTES_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')

# ─────────────────────────────────────────────────────────────────────────────
# 1. SPLIT INTO PART I AND PART II
# ─────────────────────────────────────────────────────────────────────────────

part1_start = None
part2_start = None

for i, line in enumerate(lines):
    if re.match(r'^# PART I: REVIEW MATERIAL', line):
        part1_start = i
    if re.match(r'^# PART II: EXAM QUESTIONS', line):
        part2_start = i

part1_lines = lines[part1_start:part2_start]
part2_lines = lines[part2_start:]

# ─────────────────────────────────────────────────────────────────────────────
# 2. PARSE UNITS FROM PART I
# ─────────────────────────────────────────────────────────────────────────────

units = []

# Find unit boundaries
unit_indices = []
for i, line in enumerate(part1_lines):
    m = re.match(r'^## Unit (\d+): (.+)', line)
    if m:
        unit_indices.append((i, int(m.group(1)), m.group(2).strip()))

for idx, (start_i, unit_num, unit_title) in enumerate(unit_indices):
    end_i = unit_indices[idx+1][0] if idx+1 < len(unit_indices) else len(part1_lines)
    unit_block = part1_lines[start_i:end_i]

    # Parse sections within unit
    sections = []
    section_indices = []
    for i, line in enumerate(unit_block):
        m = re.match(r'^### ([\d.]+) (.+)', line)
        if m:
            section_indices.append((i, m.group(1), m.group(2).strip()))

    for s_idx, (s_start, s_num, s_title) in enumerate(section_indices):
        s_end = section_indices[s_idx+1][0] if s_idx+1 < len(section_indices) else len(unit_block)
        section_content = '\n'.join(unit_block[s_start:s_end]).strip()
        sections.append({
            'id': s_num,
            'title': s_title,
            'content': section_content
        })

    # Unit-level content (before first section)
    unit_intro_end = section_indices[0][0] if section_indices else len(unit_block)
    unit_intro = '\n'.join(unit_block[1:unit_intro_end]).strip()  # skip the ## Unit header

    units.append({
        'id': unit_num,
        'title': unit_title,
        'intro': unit_intro,
        'sections': sections
    })

print(f"Parsed {len(units)} units", file=sys.stderr)
for u in units:
    print(f"  Unit {u['id']}: {u['title']} ({len(u['sections'])} sections)", file=sys.stderr)

# ─────────────────────────────────────────────────────────────────────────────
# 3. PARSE QUESTIONS FROM PART II
# ─────────────────────────────────────────────────────────────────────────────

# Topic to unit mapping
TOPIC_MAP = {
    'Nursing Process & Clinical Judgment': 1,
    'Legal & Ethical Concepts': 2,
    'Communication & Therapeutic Relationships': 3,
    'Documentation': 4,
    'Patient Education': 5,
    'Vital Signs': 6,
    'Health Assessment & Physical Examination': 7,
    'Health Assessment': 7,
    'Infection Prevention and Control': 8,
    'Patient Safety & Restraints': 9,
    'Patient Safety': 9,
    'Medication Administration': 10,
    'Hygiene & Skin Care': 11,
    'Skin Integrity & Wound Care': 12,
    'Oxygenation': 13,
    'Fluid & Electrolyte Balance': 14,
    'Pain Management': 15,
    'Sleep': 16,
    'Nutrition & Diet Therapy': 17,
    'Activity, Immobility & Patient Positioning': 18,
    'Urinary Elimination': 19,
    'Bowel Elimination': 20,
    'End-of-Life & Perioperative Care': 21,
}

questions = []
part2_text = '\n'.join(part2_lines)

# Split on question headers
# Exam 1: "### Question X of 50 — Title"
# Lab:    "### Question X — Title"
question_pattern = re.compile(
    r'### Question (\d+)(?:\s+of\s+\d+)?\s+[—–-]+\s+(.+?)(?=\n### Question |\n# |$)',
    re.DOTALL
)

for m in question_pattern.finditer(part2_text):
    q_num = int(m.group(1))
    q_title = m.group(2).split('\n')[0].strip()
    q_body = m.group(0)
    
    # Extract topic and concept
    topic_match = re.search(r'\*\*Topic:\*\*\s*(.+?)\s*\|\s*\*\*Concept:\*\*\s*(.+?)(?:\n|$)', q_body)
    topic = topic_match.group(1).strip() if topic_match else 'General'
    concept = topic_match.group(2).strip() if topic_match else ''
    
    # Extract question text
    q_text_match = re.search(r'\*\*Question:\*\*\s*(.+?)(?=\n\n|\n\|)', q_body, re.DOTALL)
    q_text = q_text_match.group(1).strip() if q_text_match else ''
    
    # Extract options table
    # Lines like: | 1 | Option text | ✅ YES |
    # or        : | A | Option text | ✅ YES |
    table_rows = re.findall(r'^\|\s*([A-E\d]+)\s*\|\s*(.+?)\s*\|\s*(✅ YES|❌ NO)\s*\|', q_body, re.MULTILINE)
    
    options = []
    correct_indices = []
    for opt_id, opt_text, is_correct in table_rows:
        options.append({'id': opt_id.strip(), 'text': opt_text.strip()})
        if '✅' in is_correct:
            correct_indices.append(opt_id.strip())
    
    # Extract correct answer line
    correct_line_match = re.search(r'\*\*Correct answer[s]?:\s*(.+?)\*\*', q_body)
    correct_answer_text = correct_line_match.group(1).strip() if correct_line_match else ''
    
    # Extract explanation (everything after the correct answer line)
    explanation = ''
    after_correct = re.split(r'\*\*Correct answer[s]?:.+?\*\*', q_body)
    if len(after_correct) > 1:
        explanation = after_correct[1].strip()
        # Remove leading ---
        explanation = re.sub(r'^---\s*', '', explanation).strip()
    
    # Map topic to unit
    unit_id = TOPIC_MAP.get(topic, 1)
    
    questions.append({
        'id': q_num,
        'title': q_title,
        'topic': topic,
        'concept': concept,
        'unitId': unit_id,
        'questionText': q_text,
        'options': options,
        'correctIds': correct_indices,
        'correctAnswerText': correct_answer_text,
        'explanation': explanation,
        'isSATA': len(correct_indices) > 1
    })

print(f"\nParsed {len(questions)} questions", file=sys.stderr)

# Show topic distribution
from collections import Counter
topic_counts = Counter(q['topic'] for q in questions)
print("\nTopic distribution:", file=sys.stderr)
for topic, count in sorted(topic_counts.items(), key=lambda x: TOPIC_MAP.get(x[0], 99)):
    unit_id = TOPIC_MAP.get(topic, '?')
    print(f"  Unit {unit_id} - {topic}: {count} questions", file=sys.stderr)

# Show unmapped topics
unmapped = [q for q in questions if q['topic'] not in TOPIC_MAP]
if unmapped:
    print(f"\nUnmapped topics ({len(unmapped)}):", file=sys.stderr)
    for q in unmapped:
        print(f"  Q{q['id']}: {q['topic']}", file=sys.stderr)

# Output as JavaScript module
curriculum = {
    'units': units,
    'questions': questions
}

curriculum_js = f"const CURRICULUM = {json.dumps(curriculum, ensure_ascii=False, indent=2)};\n"

with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    f.write(curriculum_js)

print(f"\nCurriculum written to {OUTPUT_PATH} ({len(curriculum_js):,} bytes)", file=sys.stderr)
