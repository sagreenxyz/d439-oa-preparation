# Foundations of Nursing — Interactive Exam Review LMS

A fully self-contained, browser-based Learning Management System built from the `Notes2.md` study guide. No server required — open `index.html` in any modern web browser.

## How to Use

1. Open `index.html` in a web browser (or serve the folder with any static file server)
2. Select a unit from the dashboard or sidebar
3. **Review** — work through all section material one section at a time
4. **Quiz** — answer unit-specific practice questions with immediate feedback and rationales
5. **Progress** is automatically saved in your browser (localStorage)

## Course Structure

| Units | Topics |
|-------|--------|
| 1 | Nursing Process & Clinical Judgment |
| 2 | Legal & Ethical Concepts |
| 3 | Communication & Therapeutic Relationships |
| 4 | Documentation |
| 5 | Patient Education |
| 6 | Vital Signs |
| 7 | Health Assessment & Physical Examination |
| 8 | Infection Prevention and Control |
| 9 | Patient Safety & Restraints |
| 10 | Medication Administration |
| 11 | Hygiene & Skin Care |
| 12 | Skin Integrity & Wound Care |
| 13 | Oxygenation |
| 14 | Fluid & Electrolyte Balance |
| 15 | Pain Management |
| 16 | Sleep |
| 17 | Nutrition & Diet Therapy |
| 18 | Activity, Immobility & Patient Positioning |
| 19 | Urinary Elimination |
| 20 | Bowel Elimination |
| 21 | End-of-Life & Perioperative Care |

## Features

- **21 Units** parsed directly from `Notes2.md`
- **125 Practice Questions** (50 Exam 1 + 75 Lab Exam) mapped to their respective units
- **Select All That Apply (SATA)** questions with checkbox-style multi-select
- **Instant feedback** with per-option rationales
- **Progress tracking** saved in browser localStorage
- **Retake quiz** option for any unit
- **Mobile-responsive** layout with collapsible sidebar
- Fully **offline-capable** (no CDN dependencies)

## File Structure

```
nursing-lms/
├── index.html          # Main application (single-page)
├── README.md           # This file
├── css/
│   └── styles.css      # Professional medical-themed styles
└── js/
    ├── curriculum.js   # Auto-generated course data (from Notes2.md)
    ├── app.js          # Application logic
    └── marked.min.js   # Markdown renderer (local copy, no CDN)
```

## Regenerating Curriculum Data

The `js/curriculum.js` file is auto-generated from `../Notes2.md` using `parse_notes.py`. To regenerate after editing `Notes2.md`:

```bash
cd nursing-lms
python3 parse_notes.py
```

The script reads `../Notes2.md` relative to its location and writes `js/curriculum.js` directly.
