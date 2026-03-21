# AI Content Generation Prompt — LMS Module Creator

> **Purpose:** This document instructs external AI systems (ChatGPT, Claude, Gemini, etc.) on how to produce content that a GitHub Copilot Coding Agent can use to create or edit LMS modules in this application. Read this document carefully and follow every specification exactly. The GitHub Agent will transform your output into working application code.

---

## 1. What This LMS Is

This is an **Astro.build-powered Learning Management System** deployed to GitHub Pages. Each *module* covers one course or certification exam topic. The platform currently hosts the **D439 Foundations of Nursing** module—21 units, 125 practice questions—as its reference implementation.

A module consists of:

| Layer | What It Is |
|---|---|
| **Units** | Top-level course sections (numbered 1–N) |
| **Sections** | Sub-topics within a unit (numbered 1.1, 1.2 …) |
| **Questions** | Practice questions tied to a unit; may follow one or more sections |

Learners move through each unit section-by-section. After each section they answer inline practice questions before advancing. Progress is tracked in browser local storage.

---

## 2. How the GitHub Agent Uses Your Content

When you hand your structured content to the GitHub Copilot Coding Agent, it will:

1. **Create** (or modify) `public/<module-id>/js/curriculum.js` — the data file that drives all content.
2. **Create** (or copy and adapt) `src/pages/<module-id>/index.astro` — the Astro page that loads the module.
3. **Create** (or copy and adapt) `public/<module-id>/css/styles.css` and `public/<module-id>/js/app.js` — presentational assets.
4. **Register** the new module in the `modules` array inside `src/pages/index.astro` so it appears on the homepage.

You do **not** need to write Astro, CSS, or JavaScript. Your job is to produce the **content data** (units, sections, and questions) in the exact JSON schema shown below.

---

## 3. The Curriculum Data Schema

The entire module's content lives in a single JavaScript file that assigns a `CURRICULUM` constant:

```js
const CURRICULUM = {
  "units": [ /* array of Unit objects */ ],
  "questions": [ /* array of Question objects */ ]
};
```

### 3.1 Unit Object

```jsonc
{
  "id": 1,                      // integer, sequential, unique within the module
  "title": "Unit Title Here",   // string — concise, sentence-case
  "intro": "",                  // string — currently unused; leave as empty string
  "sections": [ /* Section objects */ ]
}
```

### 3.2 Section Object

```jsonc
{
  "id": "1.1",                  // string — "<unitId>.<sectionIndex>", e.g. "1.1", "1.2", "2.1"
  "title": "Section Title",     // string — concise noun phrase
  "content": "### 1.1 Section Title\n\n<markdown body>\n\n---"
  // ^ Always start the content with "### <id> <title>\n\n"
  // ^ Always end the content with "\n\n---"
}
```

#### Content Markdown Conventions

All section `content` values are **markdown strings** rendered by the app. Follow these conventions exactly:

| Element | Syntax | When to Use |
|---|---|---|
| Section heading | `### 1.1 Section Title` | First line of every content value |
| Divider | `---` | Last line of every content value |
| Tables | GFM pipe tables | Comparing items, definitions, ranges |
| Tip/note callout | `> 💡 Text here` | Key exam trap or important summary |
| Bold emphasis | `**term**` | Key terms, important values |
| Inline code | `` `value` `` | Lab values, exact numbers |
| Unordered list | `- item` | When order does not matter |
| Ordered list | `1. step` | Procedures with sequence |
| Emoji bullets | `✅` `❌` | Not used in section content (reserved for questions) |

**Escape sequences in JSON strings:**

- Newlines → `\n`
- Quotes inside content → `\"`
- Backslashes → `\\`

**Full section content example (from D439 Unit 1):**

```json
{
  "id": "1.1",
  "title": "Overview: ADPIE",
  "content": "### 1.1 Overview: ADPIE\n\n| Phase | Description |\n|---|---|\n| **Assessment** | Collect subjective and objective data |\n| **Diagnosis** | Analyze data; identify actual or potential problems |\n| **Planning** | Set measurable goals; select interventions |\n| **Implementation** | Carry out planned interventions |\n| **Evaluation** | Determine whether goals are met; modify plan as needed |\n\n---"
}
```

### 3.3 Question Object

```jsonc
{
  "id": 1,                        // integer, sequential, unique across ALL questions in the module
  "title": "Short Question Title", // string — 3–6 words, describes the concept tested
  "topic": "Topic Name",          // string — broad topic area (matches a unit theme)
  "concept": "Concept A; Concept B", // string — semicolon-separated specific concepts tested
  "unitId": 1,                    // integer — the unit this question belongs to
  "questionText": "Stem text…",   // string — the full question as it appears to the learner
  "options": [
    { "id": "1", "text": "Option text" },
    { "id": "2", "text": "Option text" },
    { "id": "3", "text": "Option text" },
    { "id": "4", "text": "Option text" }
  ],
  "correctIds": ["2"],            // array of strings — IDs of all correct options
  "correctAnswerText": "2",       // string — comma-space separated correct option IDs, e.g. "1, 3, 5"
  "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** …\n\n❌ **Option 2 — Incorrect:** …\n\n---",
  "isSATA": false                 // boolean — true only for "Select All That Apply" questions
}
```

#### Option IDs

- **Single-answer questions:** Use `"1"`, `"2"`, `"3"`, `"4"` (or `"A"`, `"B"`, `"C"`, `"D"` — be consistent within a module).
- **SATA questions:** Use `"1"`, `"2"`, `"3"`, `"4"`, `"5"` (typically 5 options; 2–4 correct).
- The `correctAnswerText` must match the IDs: `"1, 3, 5"` for a SATA with options 1, 3, and 5 correct.

#### Writing the Explanation Field

The explanation is the most important part of each question. Structure it as follows:

```
**Rationales:**\n\n
✅ **Option <id> — Correct:** <detailed explanation of WHY this is correct, including the clinical reasoning, mechanism, and nursing priority.>\n\n
❌ **Option <id> — Incorrect:** <detailed explanation of WHY this is wrong, including common misconceptions and what the distractor is testing.>\n\n
[Repeat for every option]\n\n
> 💡 <Optional: one-sentence key takeaway or memory hook.>\n\n
---
```

Rules for explanations:
- Every option must have a rationale — never leave one out.
- Correct options: explain the underlying mechanism and why this is the best/priority action.
- Incorrect options: explain exactly why it is wrong AND name the cognitive trap it represents.
- Avoid vague language. Do not say "this is the best answer." Explain the *why*.
- Aim for 4–8 sentences per option rationale.

**Example explanation snippet (from D439, Question 1):**

```
"explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** The drainage bag must always remain below the level of the bladder. Gravity drives urine flow from the bladder into the bag. If the bag is raised above bladder level — even briefly during transport — urine flows backward into the bladder, seeding it with bacteria. This is one of the most direct and preventable mechanisms of CAUTI.\n\n❌ **Option 2 — Incorrect:** Clamping the catheter tubing to allow the bladder to fill is a harmful practice. Urine that remains stagnant in the bladder becomes a culture medium for bacterial growth. Catheters should drain freely and continuously.\n\n[...continues for all options]\n\n---"
```

---

## 4. Module Metadata You Must Provide

Before generating units and questions, provide the following metadata. The GitHub Agent needs this to name files and register the module correctly.

| Field | Example | Description |
|---|---|---|
| `module-id` | `d439` | Short, lowercase, hyphenated identifier. Used for file paths. |
| `module-title` | `D439 — Foundations of Nursing` | Full display title shown on the homepage card. |
| `module-description` | `Interactive exam-review LMS covering all 21 WGU D439 units` | 1–2 sentence description for the homepage card. |
| `module-icon` | `🏥` | A single emoji used as the module's visual icon. |
| `state-key` | `nursing_lms_v2` | Unique localStorage key to avoid collisions between modules. |
| `unit-count` | `21` | Total number of units. |
| `question-count` | `125` | Total number of practice questions. |

---

## 5. D439 Module as a Reference Model

The D439 module (`public/d439/js/curriculum.js`) is the authoritative example. Study these patterns:

### Unit structure (21 units):

```
Unit 1  — Nursing Process & Clinical Judgment        (6 sections)
Unit 2  — Legal & Ethical Concepts                   (6 sections)
Unit 3  — Communication & Therapeutic Relationships  (4 sections)
Unit 4  — Documentation                              (2 sections)
Unit 5  — Patient Education                          (2 sections)
Unit 6  — Vital Signs                                (5 sections)
Unit 7  — Health Assessment & Physical Examination   (2 sections)
Unit 8  — Infection Prevention and Control           (sections covering chain of infection, PPE, isolation)
...
Unit 21 — Perioperative Care                         (4 sections)
```

### Question distribution:

- 125 total questions across 21 units.
- Each unit has between 3 and 10 questions.
- Mix of single-answer (most) and SATA (≈20–30%).
- Questions test clinical judgment, not pure memorization.

### Content quality bar (match or exceed D439):

- **Section content:** Concise but complete. Every table, list, or paragraph serves exam preparation. Include clinical examples and application notes.
- **Question stems:** Scenario-based whenever possible ("A nurse is caring for a client who…"). Avoid trivia or pure recall.
- **Distractors:** Plausible—each wrong answer should be something a test-taker might reasonably pick. Each distractor tests a specific misconception.

---

## 6. Step-by-Step Instructions for the External AI

Follow these steps in order when generating content for a new module:

### Step 1 — Define the Module Metadata

Output the module metadata block first:

```
MODULE METADATA
===============
module-id: <id>
module-title: <title>
module-description: <description>
module-icon: <emoji>
state-key: <unique-key>
unit-count: <N>
question-count: <Q>
```

### Step 2 — Plan the Unit Outline

List all units with their IDs and titles before writing any content. Example format:

```
UNIT OUTLINE
============
1. Nursing Process & Clinical Judgment
2. Legal & Ethical Concepts
3. Communication & Therapeutic Relationships
...
```

### Step 3 — Generate the CURRICULUM JSON Object

Output a single, valid JavaScript assignment:

```js
const CURRICULUM = {
  "units": [
    {
      "id": 1,
      "title": "...",
      "intro": "",
      "sections": [
        {
          "id": "1.1",
          "title": "...",
          "content": "### 1.1 ...\n\n...\n\n---"
        }
      ]
    }
    // ... all units
  ],
  "questions": [
    {
      "id": 1,
      "title": "...",
      "topic": "...",
      "concept": "...",
      "unitId": 1,
      "questionText": "...",
      "options": [
        { "id": "1", "text": "..." },
        { "id": "2", "text": "..." },
        { "id": "3", "text": "..." },
        { "id": "4", "text": "..." }
      ],
      "correctIds": ["1"],
      "correctAnswerText": "1",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** ...\n\n❌ **Option 2 — Incorrect:** ...\n\n❌ **Option 3 — Incorrect:** ...\n\n❌ **Option 4 — Incorrect:** ...\n\n---",
      "isSATA": false
    }
    // ... all questions
  ]
};
```

**Important:** The entire `CURRICULUM` object must be valid JSON inside the JS assignment. Do not add comments inside the JSON. Do not use trailing commas.

### Step 4 — Validation Checklist (Self-Check Before Handing Off)

Before passing your output to the GitHub Agent, verify every item:

- [ ] Module metadata block is complete with all 7 fields.
- [ ] Every unit has a unique sequential integer `id`.
- [ ] Every section `id` follows `"<unitId>.<index>"` format (e.g., `"3.2"`).
- [ ] Every section `content` starts with `### <id> <title>\n\n` and ends with `\n\n---`.
- [ ] Every question has a unique sequential integer `id`.
- [ ] Every question's `unitId` references an existing unit `id`.
- [ ] Every question's `options` array contains 4–5 items with sequential string IDs.
- [ ] `correctIds` is a non-empty array of strings matching option `id` values.
- [ ] `correctAnswerText` matches the joined `correctIds` with `", "`.
- [ ] `isSATA` is `true` if and only if `correctIds.length > 1`.
- [ ] Every question's `explanation` covers **all** options with `✅`/`❌` prefixes.
- [ ] The entire output parses as valid JavaScript (no trailing commas, no unescaped quotes).
- [ ] Newlines in all string fields are represented as `\n`, not literal line breaks.

---

## 7. Instructions to Give the GitHub Copilot Coding Agent

After generating the content, hand the GitHub Agent the following prompt (fill in the bracketed placeholders):

---

> **GitHub Agent Prompt:**
>
> Create a new LMS module with the following configuration:
>
> - **Module ID:** `[module-id]`
> - **Module Title:** `[module-title]`
> - **Module Description:** `[module-description]`
> - **Module Icon:** `[emoji]`
>
> **Files to create:**
>
> 1. `public/[module-id]/js/curriculum.js` — paste the full `CURRICULUM` constant below.
> 2. `public/[module-id]/js/app.js` — copy from `public/d439/js/app.js` and update the `STATE_KEY` constant to `'[state-key]'`.
> 3. `public/[module-id]/js/marked.min.js` — copy from `public/d439/js/marked.min.js`.
> 4. `public/[module-id]/css/styles.css` — copy from `public/d439/css/styles.css`.
> 5. `src/pages/[module-id]/index.astro` — copy from `src/pages/d439/index.astro` and update:
>    - `<title>` tag to `[module-title] — Exam Review LMS`
>    - All `d439` path segments in `const cssHref`, `const jsMarked`, `const jsCurriculum`, `const jsApp` to `[module-id]`
>    - The dashboard `<h1>` text and description paragraph to match the new module
>    - The `id="dash-total"` value to the unit count
>    - The `id="dash-questions"` value to the question count
> 6. Register the module in `src/pages/index.astro` by adding a new entry to the `modules` array:
>    ```js
>    {
>      title: '[module-title]',
>      description: '[module-description]',
>      href: `${base}/[module-id]/`,
>      icon: '[emoji]',
>      badge: 'Available',
>    }
>    ```
>
> **Curriculum content** (paste the full `const CURRICULUM = { ... };` block here):
>
> ```js
> [PASTE FULL CURRICULUM JS HERE]
> ```

---

## 8. Editing an Existing Module

To **modify** an existing module (add units, fix questions, update section content), use this prompt pattern for the GitHub Agent:

> **GitHub Agent Prompt (Edit):**
>
> Edit the existing `[module-id]` LMS module as follows:
>
> **[Describe the change precisely, for example:]**
> - In `public/d439/js/curriculum.js`, update Unit 3, Section 3.2 `content` field to the new value below.
> - Add the following new question object to the `questions` array. Assign it id `126` (next sequential ID).
>
> **New/updated content:**
> ```js
> [PASTE ONLY THE CHANGED PORTIONS]
> ```

Always reference the specific unit `id`, section `id`, or question `id` being changed. Do not paste the entire file unless replacing everything.

---

## 9. Content Quality Standards

The external AI must apply these standards. The GitHub Agent will not correct content errors.

### 9.1 Accuracy

- All factual claims must be consistent with current evidence-based practice, regulatory guidelines, or authoritative textbooks for the subject domain.
- For healthcare modules: cite the foundational framework (e.g., NCSBN NCLEX Next Generation Clinical Judgment Model, ATI, Saunders) implicitly through content accuracy.
- Never invent drug dosages, lab values, or clinical protocols.

### 9.2 Exam Alignment

- Questions must reflect the **cognitive level** expected on the target exam (application and analysis, not pure recall).
- Stems should present a clinical scenario or situation.
- Prioritization questions ("which is the priority action") must have a clearly defensible single best answer, not two equally valid choices.

### 9.3 Distractor Design

Each incorrect option must:
- Be plausible enough that an underprepared learner would choose it.
- Target a specific, named misconception (e.g., confusing medical asepsis with surgical asepsis).
- Be explained in detail in the `explanation` field.

### 9.4 Scope and Coverage

- Every unit should have at least 2 sections and at least 3 questions.
- Cover every major topic that could appear on the target exam.
- Distribute questions roughly proportionally to topic weighting on the exam.

### 9.5 Formatting Consistency

- Use American English spelling.
- Use the Oxford comma.
- Capitalize proper nouns, acronyms, and clinical terms according to their standard usage (e.g., HIPAA, CAUTI, SpO₂).
- Use numeric superscripts/subscripts via Unicode (₂, ₁, ²) in plain-text contexts.

---

## 10. Quick Reference — D439 Section Content Template

Copy this template for each section you write, then fill in the body:

```
### <section-id> <section-title>

[Introduction sentence or table — required]

[Body: tables, lists, callouts as appropriate]

> 💡 [Optional: exam tip or key takeaway]

---
```

When serialized to JSON:

```json
"content": "### 1.1 Section Title\n\n[body]\n\n> 💡 Tip here.\n\n---"
```

---

## 11. Quick Reference — D439 Question Template

```json
{
  "id": 1,
  "title": "Concept Being Tested",
  "topic": "Broad Unit Topic",
  "concept": "Specific Concept A; Specific Concept B",
  "unitId": 1,
  "questionText": "A nurse is [scenario]. Which [action/response/priority] is most appropriate?",
  "options": [
    { "id": "1", "text": "Distractor — plausible but wrong" },
    { "id": "2", "text": "Correct answer" },
    { "id": "3", "text": "Distractor — targets a specific misconception" },
    { "id": "4", "text": "Distractor — targets a different misconception" }
  ],
  "correctIds": ["2"],
  "correctAnswerText": "2",
  "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** [Why wrong and what trap it tests.]\n\n✅ **Option 2 — Correct:** [Full clinical reasoning for why this is the best answer.]\n\n❌ **Option 3 — Incorrect:** [Why wrong and what trap it tests.]\n\n❌ **Option 4 — Incorrect:** [Why wrong and what trap it tests.]\n\n> 💡 [Key takeaway, optional.]\n\n---",
  "isSATA": false
}
```

For a SATA question, change option IDs to `"1"`–`"5"`, set `"isSATA": true`, and update `correctIds` and `correctAnswerText` accordingly.

---

## 12. Example Output (Minimal Module Skeleton)

Below is the smallest valid `curriculum.js` for a two-unit, four-question module. Use this as a sanity-check template before generating a full module.

```js
const CURRICULUM = {
  "units": [
    {
      "id": 1,
      "title": "Introduction to the Subject",
      "intro": "",
      "sections": [
        {
          "id": "1.1",
          "title": "Core Concepts",
          "content": "### 1.1 Core Concepts\n\nKey point one.\n\nKey point two.\n\n---"
        },
        {
          "id": "1.2",
          "title": "Applied Framework",
          "content": "### 1.2 Applied Framework\n\n| Term | Definition |\n|---|---|\n| **Term A** | Definition of Term A |\n| **Term B** | Definition of Term B |\n\n---"
        }
      ]
    },
    {
      "id": 2,
      "title": "Advanced Topics",
      "intro": "",
      "sections": [
        {
          "id": "2.1",
          "title": "Special Considerations",
          "content": "### 2.1 Special Considerations\n\nImportant nuance explained here.\n\n> 💡 Remember: nuance matters on the exam.\n\n---"
        }
      ]
    }
  ],
  "questions": [
    {
      "id": 1,
      "title": "Core Concept Application",
      "topic": "Introduction to the Subject",
      "concept": "Core Concepts",
      "unitId": 1,
      "questionText": "A practitioner encounters a situation involving Term A. Which action is most appropriate?",
      "options": [
        { "id": "1", "text": "Apply Term B principles" },
        { "id": "2", "text": "Apply Term A principles correctly" },
        { "id": "3", "text": "Defer to another team member" },
        { "id": "4", "text": "Document and reassess in 24 hours" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Term B applies in a different context. Confusing Term A and Term B is a common error that this distractor targets.\n\n✅ **Option 2 — Correct:** Term A principles directly address this situation because [clinical reasoning]. This is the correct priority action.\n\n❌ **Option 3 — Incorrect:** Deferring is inappropriate when the practitioner has the knowledge and authority to act independently.\n\n❌ **Option 4 — Incorrect:** A 24-hour delay is not appropriate when immediate action is indicated by the scenario.\n\n---",
      "isSATA": false
    },
    {
      "id": 2,
      "title": "Framework Identification",
      "topic": "Introduction to the Subject",
      "concept": "Applied Framework",
      "unitId": 1,
      "questionText": "Which of the following best describes the Applied Framework? *(Select all that apply)*",
      "options": [
        { "id": "1", "text": "It provides a structured approach to Term A" },
        { "id": "2", "text": "It eliminates the need for Term B" },
        { "id": "3", "text": "It supports decision-making under uncertainty" },
        { "id": "4", "text": "It is used only in advanced settings" },
        { "id": "5", "text": "It can be applied at the introductory level" }
      ],
      "correctIds": ["1", "3", "5"],
      "correctAnswerText": "1, 3, 5",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** The framework does provide a structured approach to Term A as described in section 1.2.\n\n❌ **Option 2 — Incorrect:** The framework complements Term B rather than replacing it. This is a common misconception.\n\n✅ **Option 3 — Correct:** Supporting decision-making under uncertainty is one of the framework's primary functions.\n\n❌ **Option 4 — Incorrect:** The framework is applicable in both introductory and advanced settings, not exclusively advanced ones.\n\n✅ **Option 5 — Correct:** The framework is explicitly designed for introductory use as well as advanced application.\n\n---",
      "isSATA": true
    }
  ]
};
```

---

## 13. Summary Checklist for External AI Systems

Before submitting content to the GitHub Agent, confirm all of the following:

- [ ] Module metadata provided (all 7 fields)
- [ ] Unit outline provided (all unit IDs and titles listed before detailed content)
- [ ] All units included, each with `id`, `title`, `intro: ""`, and `sections` array
- [ ] All sections have `id` in `"<unitId>.<index>"` format, `title`, and `content`
- [ ] Section `content` starts with `### <id> <title>` and ends with `---`
- [ ] All newlines in content are escaped as `\n` (no literal line breaks in JSON strings)
- [ ] All questions have unique sequential integer `id` values
- [ ] All questions reference a valid `unitId`
- [ ] All options have string IDs consistent within the module
- [ ] `isSATA: true` only when `correctIds` has more than one entry
- [ ] `correctAnswerText` matches `correctIds` joined with `", "`
- [ ] Every question's `explanation` covers every option with `✅`/`❌` prefix
- [ ] No trailing commas anywhere in the JSON
- [ ] No unescaped double quotes inside JSON string values
- [ ] Output is wrapped in `const CURRICULUM = { ... };`
- [ ] GitHub Agent prompt includes the module metadata and full `CURRICULUM` block
