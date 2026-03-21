# Foundations of Nursing — Interactive Exam Review LMS

A fully self-contained, browser-based Learning Management System (LMS) built from the `Notes2.md` study guide. **No server required** — open `index.html` in any modern web browser and start learning.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Course Structure](#course-structure)
3. [User Interface Overview](#user-interface-overview)
   - [Top Header](#top-header)
   - [Sidebar Navigation](#sidebar-navigation)
   - [Dashboard](#dashboard)
4. [Learning Flow](#learning-flow)
   - [Section Reading](#section-reading)
   - [Inline Practice Questions](#inline-practice-questions)
   - [Multiple Choice (Auto-Submit)](#multiple-choice-auto-submit)
   - [Select All That Apply (SATA)](#select-all-that-apply-sata)
   - [Answer Feedback & Rationales](#answer-feedback--rationales)
   - [Distractor Rationale on Hover](#distractor-rationale-on-hover)
   - [Unit Completion](#unit-completion)
5. [Topic & Keyword Search](#topic--keyword-search)
   - [Opening the Search Modal](#opening-the-search-modal)
   - [Searching by Keyword](#searching-by-keyword)
   - [Exact Phrase Search (Quoted)](#exact-phrase-search-quoted)
   - [Combining Phrases and Keywords](#combining-phrases-and-keywords)
   - [Navigating to a Result](#navigating-to-a-result)
6. [Progress Tracking](#progress-tracking)
7. [Resetting Progress](#resetting-progress)
8. [File Structure](#file-structure)
9. [Regenerating Curriculum Data](#regenerating-curriculum-data)
10. [Technical Notes](#technical-notes)

---

## Quick Start

```
nursing-lms/
└── index.html   ← open this in any browser
```

1. Open `nursing-lms/index.html` in Chrome, Firefox, Safari, or Edge.
2. The **Dashboard** loads automatically showing all 21 units.
3. Click any unit card to begin studying.
4. Your progress is saved automatically in the browser — close the tab and return any time.

To serve locally (optional, for stricter browser environments):

```bash
cd nursing-lms
python3 -m http.server 8080
# then open http://localhost:8080
```

---

## Course Structure

21 units drawn directly from `Notes2.md`, totalling 93 sections and 125 practice questions.

| Unit | Topic |
|------|-------|
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

---

## User Interface Overview

### Top Header

The fixed header at the top of the page contains:

| Element | Description |
|---------|-------------|
| **☰ Menu toggle** | Shows/hides the sidebar on small screens |
| **Logo / Title** | Displays the course name |
| **Overall Progress bar** | Shows the percentage of all 125 questions answered |
| **🔍 Search ⌘K** | Opens the Topic & Keyword Search modal |

### Sidebar Navigation

The collapsible sidebar on the left provides instant access to any point in the course:

- **Unit headers** — click to expand a unit and navigate to its start
- **Section items** — click to jump directly to a specific section within a unit
- **⌂ Dashboard** button — return to the unit grid at any time
- **↺ Reset Progress** button — clears all saved progress (with confirmation)

On mobile or narrow screens, tap the ☰ hamburger button to open the sidebar. Tap anywhere in the main content area to close it.

### Dashboard

The Dashboard is the home screen showing:

- **Stats bar** — units completed, total units, total question count
- **Overall progress bar**
- **Unit cards grid** — one card per unit, showing:
  - Unit number and title
  - Section and question counts
  - In-progress or completed status with a mini progress bar
  - Quiz score (if the unit is complete)

Click any unit card to navigate into it.

---

## Learning Flow

Each unit follows a single integrated flow: **read a section → answer its questions → proceed to the next section**. There are no separate "review" and "quiz" phases.

### Section Reading

When you enter a unit, the first section is displayed with:

- A **breadcrumb** (unit name) and section title
- A **step progress bar** at the top showing how far through the unit you are
- The full section content rendered as formatted text (Markdown)
- A **Continue →** button to move to the next step (section or question)

### Inline Practice Questions

After each section, one or more practice questions appear **inline**, immediately after the content they relate to. This creates a natural _learn → practice_ loop for every sub-topic.

### Multiple Choice (Auto-Submit)

For standard single-answer questions:

- Click any option to **instantly submit** your answer — no Submit button is needed
- The selected option highlights green (correct) or red (incorrect)
- The rationale panel expands automatically

### Select All That Apply (SATA)

For SATA questions:

- Options appear as **checkboxes** — select every option you believe is correct
- A **Submit** button appears after you've checked at least one option
- Click Submit when you are ready to evaluate your selections

### Answer Feedback & Rationales

After answering:

- **Correct options** highlight in **green**
- **Incorrect options** you selected highlight in **red**
- The **rationale panel** expands below, showing the explanation for the correct answer(s)
- A **Next →** button (or **Finish Unit** on the last question) advances the flow

### Distractor Rationale on Hover

For incorrect options you did _not_ select, a brief rationale is hidden to avoid cognitive overload. To reveal it:

- **Hover** over any incorrect option after answering to see a dark tooltip popup explaining why that option is wrong
- Move the mouse away to dismiss the popup

### Unit Completion

After the last question in a unit:

- A **Unit Complete** screen shows your score for that unit (questions correct / total)
- Buttons to **Retake Unit** (reset just this unit's answers) or return to the **Dashboard**
- The unit card on the dashboard updates to show ✓ completed and your score

---

## Topic & Keyword Search

The built-in search index lets you find **any topic, concept, section, or question** in the course and jump to it instantly.

### Opening the Search Modal

Three ways to open search:

| Method | Action |
|--------|--------|
| Header button | Click **🔍 Search** in the top-right of the header |
| Keyboard shortcut | Press **Ctrl+K** (Windows/Linux) or **⌘K** (macOS) |
| Any time | Works from any screen — dashboard, unit, or unit-complete |

Press **Escape** or click outside the modal to close it.

### Searching by Keyword

Type at least 2 characters to see instant results:

```
pain
sbar
heparin
Q47
```

Results are grouped into three categories:

| Group | What it contains |
|-------|-----------------|
| 📚 Units | Matching unit titles |
| § Sections | Matching section titles and content |
| ❓ Questions | Matching by topic, concept, question text, or Q-number |

Each result shows the item name and its context (unit name, topic, concepts). Results are ranked by relevance — label matches rank higher than body-text matches.

### Exact Phrase Search (Quoted)

Wrap a phrase in **single** (`'`) or **double** (`"`) quotes to require an exact match:

```
"blood pressure"
"vital signs"
'infection control'
"select all that apply"
```

- All entries that do **not** contain that exact phrase are excluded from results
- Phrase matches receive a higher relevance boost than individual keyword matches
- The index covers the **full** section content and question text (not truncated)

### Combining Phrases and Keywords

You can mix quoted phrases with bare keywords in the same query:

```
"blood pressure" diastolic
"nursing process" assessment documentation
'pain management' opioid
```

- Quoted phrases are required (exclude non-matching entries)
- Bare keywords are optional scoring signals (more keyword matches = higher rank)

### Multi-Word Keyword Scoring (N-gram Boost)

The search index pre-extracts all **bigrams** (2-word) and **trigrams** (3-word) combinations from every section and question. When you type a multi-word query _without_ quotes, entries where those words appear **consecutively** (as a phrase) rank higher than entries that only happen to contain both words separately:

```
pain management      → "Pain Management" unit ranks higher than entries with scattered occurrences
blood pressure       → "Blood Pressure Assessment" section ranks higher than mentions of both words apart
```

### Navigating to a Result

Click any search result to jump directly:

| Result type | Where you land |
|-------------|---------------|
| **Unit** | Start of that unit (or its completion screen if already done) |
| **Section** | That specific section within the unit |
| **Question** | That specific practice question, ready to answer |

The sidebar automatically expands and highlights the active unit/section after navigation.

---

## Progress Tracking

All progress is automatically saved in your browser's **localStorage** under the key `nursing_lms_v2`. This means:

- Your progress **persists across browser sessions** — close the tab and return later
- Progress is **per-browser and per-device** — it does not sync across devices
- The following is tracked per unit:
  - Which questions have been answered
  - Whether the unit is fully complete
  - The final quiz score

The **Overall Progress** percentage in the header is calculated as `questions answered / 125`.

---

## Resetting Progress

To clear all saved progress:

1. Open the **sidebar** (☰ or swipe right on mobile)
2. Click **↺ Reset Progress**
3. Confirm the dialog

This clears all localStorage data and returns the app to a fresh state. Individual unit progress cannot be reset from the UI separately — use the **Retake Unit** button on the Unit Complete screen to reset just one unit.

---

## File Structure

```
nursing-lms/
├── index.html          # Single-page application shell
├── README.md           # This documentation file
├── css/
│   └── styles.css      # All styles (layout, components, search modal, responsive)
├── js/
│   ├── app.js          # All application logic
│   ├── curriculum.js   # Auto-generated course data (from Notes2.md)
│   └── marked.min.js   # Markdown renderer (local copy — no CDN required)
└── parse_notes.py      # Script to regenerate curriculum.js from Notes2.md
```

### `index.html`

The application shell. Contains:
- The top header (menu toggle, logo, progress bar, search button)
- The sidebar skeleton (populated by JavaScript)
- Three view sections: `#view-dashboard`, `#view-unit`, `#view-complete`
- The search modal (hidden by default)
- Script tags loading `marked.min.js`, `curriculum.js`, and `app.js`

### `css/styles.css`

All styles in a single file. Organized sections:
- CSS custom properties (variables for colors, spacing, etc.)
- Reset and base styles
- Layout shell (sidebar + main content)
- Top header
- Sidebar (hierarchical tree, active/completed states)
- Dashboard and unit cards
- Unit view (section content, progress bar, navigation)
- Question components (options, SATA checkboxes, feedback, rationales)
- Distractor popup
- Search modal and results
- Toast notification
- Responsive breakpoints

### `js/app.js`

All application logic in a single file. Key sections:
- **State** — `loadState()`, `saveState()`, `getUnitProgress()`
- **Markdown** — rendering section content via `marked.js`
- **Curriculum helpers** — `getUnit()`, `getUnitQuestions()`, `buildUnitSteps()`
- **Question–section matching** — heuristic matching of questions to their source sections
- **Distractor popup** — hover-based tooltip for incorrect-option rationales
- **Router / view management** — `showView()`, `buildSidebar()`, `highlightSidebarUnit()`
- **Dashboard** — `renderDashboard()`
- **Unit navigation** — `navigateToUnit()`, `navigateToQuestion()`, `renderCurrentStep()`
- **Section step renderer** — `renderSectionStep()`
- **Question step renderer** — `renderQuestionStep()`, `handleOptionClick()`, `submitAnswer()`
- **Search index** — `extractNgrams()`, `parseQuery()`, `buildSearchIndex()`, `runSearch()`
- **Search UI** — `openSearch()`, `closeSearch()`, `renderSearchResults()`, `initSearch()`
- **Reset** — `resetAllProgress()`
- **Toast** — `showToast()`
- **Init** — `DOMContentLoaded` wiring

### `js/curriculum.js`

Auto-generated. Exports a single global `CURRICULUM` object:

```js
{
  units: [
    {
      id: 1,
      title: "Nursing Process & Clinical Judgment",
      sections: [
        { id: "1.1", title: "...", content: "..." },
        ...
      ]
    },
    ...
  ],
  questions: [
    {
      id: 1,
      title: "...",
      topic: "...",
      concept: "...",
      unitId: 1,
      questionText: "...",
      options: [ { id: "1", text: "..." }, ... ],
      correctIds: ["2"],
      correctAnswerText: "2",
      explanation: "...",
      isSATA: false
    },
    ...
  ]
}
```

### `parse_notes.py`

Python 3 script that parses `Notes2.md` (located one directory above `nursing-lms/`) and writes `js/curriculum.js`. Run it whenever `Notes2.md` changes.

---

## Regenerating Curriculum Data

If you edit `Notes2.md` and need to update the course content:

```bash
cd nursing-lms
python3 parse_notes.py
```

The script reads `../Notes2.md` and overwrites `js/curriculum.js` with a fresh data file.

**Note:** The parser expects the Notes2.md file to follow the section and question formatting conventions established in the original document. Structural changes to headings or question blocks may require corresponding updates to `parse_notes.py`.

---

## Technical Notes

- **No build step** — plain HTML + CSS + JavaScript, no transpilation or bundling
- **No external dependencies** — `marked.min.js` is bundled locally; no CDN calls
- **Offline-capable** — works without internet access
- **localStorage** — progress data is serialized as JSON under the key `nursing_lms_v2`
- **Search index** is built lazily on first search and cached for the session; it is never persisted
- **Responsive design** — sidebar collapses to an off-canvas overlay below ~768 px; the header adapts to narrow viewports
- **Browser support** — any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+); no polyfills included

