# d439-oa-preparation

## Sequence of AI Prompts Used to Build This Repository

The following prompts were used in order to take the repository from an empty state (containing only the raw HTML export of the OA Readiness Questionnaire) to its current state.

---

### Prompt 1 — Parse the HTML questionnaire into individual Markdown files

> I have an HTML file called `OA Readiness Questionnaire.html` that contains a 50-question nursing readiness exam. Each question has a stem, answer options (with one or more correct answers marked), a question type (single choice or select-all-that-apply), and a point value of 2. Please parse this file and create one Markdown file per question inside a `questions/` directory. Name each file using the pattern `Q##-<first-few-words-of-the-stem>.md` (e.g., `Q01-nurse-providing-care-client-indwelling.md`). In each file, include the question number as a heading, the full question stem, the **Type** and **Points** as bold metadata fields, an `## Options` section listing every answer choice as a bullet, and prefix each correct answer with `CORRECT ==>`.

---

### Prompt 2 — Create an Educator's Analysis document

> Using the 50 question Markdown files in the `questions/` directory, create a file called `EDUCATOR-ANALYSIS.md`. The document should include:
> 1. An answer-completeness audit confirming every question has at least one correct answer, with a table showing how many questions are single-choice vs. select-all-that-apply (SATA).
> 2. A question-distribution table organized by clinical domain (e.g., Wound Care, Infection Control, Oxygenation, etc.).
> 3. A Bloom's Taxonomy level mapping table (Knowledge, Comprehension, Application, Analysis, Synthesis/Evaluation) for each question.
> 4. A cognitive-demand analysis calling out the highest-stakes clinical reasoning questions and the questions whose distractors reflect common student misconceptions.
> 5. Format and psychometric observations (SATA design quality, negatively-phrased items, any consistency issues corrected).
> 6. A table mapping every question to its NCLEX-RN® Client Needs category.
> 7. A section on strengths of the question set and a numbered list of recommendations for improvement.

---

### Prompt 3 — Create a Student Study Guide

> Using the 50 question Markdown files in the `questions/` directory and the educator analysis in `EDUCATOR-ANALYSIS.md`, create a file called `STUDENT-STUDY-GUIDE.md`. The guide should:
> 1. Open with a brief overview (total questions, point value, question-type counts, and a SATA tip).
> 2. Organize all 50 questions into **study clusters** by shared clinical concept (e.g., Wound Care & Skin Integrity, Infection Control & Asepsis, Oxygenation & Respiratory Care, etc.). For each cluster provide: a "Core Concepts to Master" table and a question-by-question highlights list that names the key takeaway or most-commonly-missed fact for that question.
> 3. End with a **Priority Study Order** table ranking clusters by question count and NCLEX weight so students with limited time know where to start.
> 4. Include a **SATA Strategy Quick Reference** section listing every SATA question number and a 5-step approach for answering SATA items.
> 5. Include a **Common Exam Traps** table that maps each frequent mistake to the question where it appears and the correct principle to remember.