# Quiz Reconciliation: 50-Question Export vs 75-Question Export

## Source Files Compared

- `D439 Foundations of Nursing OA Approval Q & A (Copy) (3_19_2026 9：15：47 AM).html`
- `Foundations of Nursing OA Attempt 2 Approval Quiz (3_19_2026 9：15：13 AM).html`

## Reconciliation Summary

I extracted the question titles from both HTML files and compared them side by side.

| Measure | 50-question export | 75-question export | Combined |
|---|---:|---:|---:|
| Extracted question prompts | 50 | 75 | 125 |
| Exact duplicate prompts | - | - | 0 |
| Distinct prompt wordings after normalization | - | - | 125 |

## Important Finding

There are no verbatim duplicate questions between these two HTML exports, even after normalizing for:

- case differences
- punctuation differences
- extra spaces
- HTML formatting artifacts
- curly quotes versus straight quotes

That means these two quiz files do **not** contain literal repeat prompts in the form they were exported.

## Why This May Still Feel Duplicative

Although there are no exact prompt duplicates, the two quizzes overlap heavily in **topic coverage**. They often test the same nursing concept from different angles.

Examples:

- One quiz asks about oxygen safety in the hospital; the other asks about oxygen safety in the home.
- One quiz asks about catheter-associated infection prevention; the other asks about catheter insertion, contamination, removal, and retention.
- One quiz asks about pressure ulcers and healing; the other asks about Braden scoring, sacral redness, skin integrity, and wound infection signs.
- One quiz asks about clear liquid diet items; the other asks whether specific items like pudding or a popsicle are allowed.

So the overlap is **conceptual**, not literal.

## Theme-by-Theme Comparison

| Shared content area | 50-question export | 75-question export | Reconciliation |
|---|---|---|---|
| Urinary care | CAUTI prevention, 24-hour urine collection, urine specimen technique | catheter insertion, sterile contamination, catheter removal, urinary retention, incontinence, enema response | Same domain, different scenarios |
| Infection control | droplet precautions, medical asepsis, surgical asepsis, wound infection risk | RSV precautions, PPE, hand hygiene, contact precautions, room infection-control actions | Same domain, different organisms and procedures |
| Oxygenation and airway | oxygen safety, nasopharyngeal suctioning, oxygen via nasal cannula | home oxygen safety, suctioning priority, trach suction charting, post-suction follow-up, impaired gas exchange | Strong overlap by respiratory topic |
| Pain | post-op pain first action, PQRST pain assessment | morphine reassessment, PCA misuse, post-op abdominal pain, nonverbal pain, pain goal not met | Same domain, different pain-management situations |
| Skin and wounds | wound drainage type, stage III/IV pressure ulcers, wound healing, diabetic foot protection | Braden score, sacral redness, dry skin, purulent wound drainage, older-adult skin fragility | Strong overlap by skin-integrity content |
| Safety and mobility | restraints, crutches, cane teaching, ROM after stroke | restraints, log-rolling, unsteady gait ambulation, ROM with weakness, confused client safety | Same safety concepts, different patient contexts |
| Nutrition and GI | clear liquid diet items, enteral feeding position, steatorrhea | clear liquid diet item checks, NG tube insertion, NGT home teaching, diarrhea diagnosis | Same GI/fundamentals space |
| Teaching and communication | language barriers, therapeutic relationship, grief response, SBAR | therapeutic communication, anxiety, ALS hopelessness statement, teaching effectiveness, cultural sensitivity | Shared communication focus |
| Ethics and legal | Good Samaritan, HIPAA, legal witness signature, threatening statement as legal issue | autonomy, refusing care, advance directives, no-CPR statement | Same broader professional practice area |
| Prioritization and fundamentals | Maslow, subjective data, vital signs, BP technique, documentation during outage | immediate-attention questions, diagnosis/goals, reassessment, priority actions | Same judgment framework, different item wording |

## How the Two Files Differ

### 50-question export

This file leans more toward:

- longer scenario-based prompts
- more multi-select items
- broader foundations topics mixed into each question
- more professional/legal framing

Representative examples:

- CAUTI prevention select-all-that-apply
- oxygen safety select-all-that-apply
- Good Samaritan Law
- HIPAA and emancipated minor confidentiality
- EHR downtime documentation

### 75-question export

This file leans more toward:

- shorter single-scenario prompts
- faster priority-action questions
- more direct bedside intervention items
- more focused respiratory, pain, and skin-integrity items

Representative examples:

- RSV precautions
- what to do after catheter removal
- PCA misuse by family
- first action for SpO2 88%
- Braden score interpretation

## Reconciliation Against the Existing Unique-Question File

The existing file `Foundations_Nursing_Questions_Unique.md` states that both HTML files collapse to 98 unique prompts.

This direct reconciliation of the current HTML exports does **not** support that conclusion at the literal-question level. Based on the raw exported prompts:

- total extracted prompts = 125
- literal duplicate prompts across files = 0
- literal unique prompts = 125

Most likely explanation:

- the existing `Foundations_Nursing_Questions_Unique.md` file was deduplicated manually or conceptually
- questions that test the same concept were probably merged even when the prompt wording was different

That is a valid study-guide strategy, but it is not the same as a strict side-by-side reconciliation of the HTML quiz exports.

## Bottom-Line Interpretation

If you are reconciling the files as exported quiz banks:

- treat them as **125 distinct prompt wordings**
- do **not** remove any items as literal duplicates

If you are reconciling them as a study guide by concept:

- there is substantial thematic overlap
- the two files can reasonably be collapsed into fewer concept clusters
- the apparent duplication is mostly due to repeated nursing topics, not repeated question text

## Recommended Use

Use the files in one of two ways depending on your goal:

1. **Question-bank review:** keep all 125 prompts.
2. **Concept review:** merge them by topic area such as urinary care, infection control, oxygenation, pain, skin integrity, restraints, teaching, ethics, and prioritization.