/**
 * Foundations of Nursing — LMS v2
 * Integrated section+question flow, hierarchy sidebar, vibrant theme
 */

/* ════════════════════════════════════════════════════════════════════════════
   STATE
   ════════════════════════════════════════════════════════════════════════════ */

const STATE_KEY = 'nursing_lms_v2';

let state = { unitProgress: {} };

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) state = { ...state, ...JSON.parse(raw) };
  } catch (_) {}
}

function saveState() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {}
}

function getUnitProgress(unitId) {
  if (!state.unitProgress[unitId]) {
    state.unitProgress[unitId] = {
      stepsAnswered: {},  // { questionId: { selectedIds, isCorrect } }
      done: false,
      quizScore: null,
      quizTotal: null
    };
  }
  return state.unitProgress[unitId];
}

/* ════════════════════════════════════════════════════════════════════════════
   MARKDOWN
   ════════════════════════════════════════════════════════════════════════════ */

function renderMarkdown(md) {
  if (!md) return '';
  if (window.marked) return window.marked.parse(md);
  return mdFallback(md);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function mdFallback(md) {
  const lines = md.split('\n');
  let html = '';
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      html += `<h${headingMatch[1].length}>${inlineFormat(headingMatch[2])}</h${headingMatch[1].length}>\n`;
      i++; continue;
    }
    if (/^---+$/.test(line.trim())) { html += '<hr>\n'; i++; continue; }
    if (line.startsWith('> ')) {
      html += `<blockquote><p>${inlineFormat(line.slice(2))}</p></blockquote>\n`;
      i++; continue;
    }
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) { tableLines.push(lines[i]); i++; }
      if (tableLines.length >= 2) {
        const headers = tableLines[0].split('|').slice(1, -1).map(c => c.trim());
        const rows = tableLines.slice(2);
        html += '<table><thead><tr>' + headers.map(h => `<th>${inlineFormat(h)}</th>`).join('') + '</tr></thead><tbody>';
        rows.forEach(r => {
          const cells = r.split('|').slice(1, -1).map(c => c.trim());
          html += '<tr>' + cells.map(c => `<td>${inlineFormat(c)}</td>`).join('') + '</tr>';
        });
        html += '</tbody></table>\n';
      }
      continue;
    }
    if (/^[-*]\s/.test(line)) {
      html += '<ul>';
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        html += `<li>${inlineFormat(lines[i].slice(2))}</li>`; i++;
      }
      html += '</ul>\n'; continue;
    }
    if (/^\d+\.\s/.test(line)) {
      html += '<ol>';
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        html += `<li>${inlineFormat(lines[i].replace(/^\d+\.\s/, ''))}</li>`; i++;
      }
      html += '</ol>\n'; continue;
    }
    if (line.trim() === '') { i++; continue; }
    html += `<p>${inlineFormat(line)}</p>\n`;
    i++;
  }
  return html;
}

function inlineFormat(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

/* ════════════════════════════════════════════════════════════════════════════
   DATA HELPERS
   ════════════════════════════════════════════════════════════════════════════ */

function getUnit(id) { return CURRICULUM.units.find(u => u.id === id); }
function getUnitQuestions(unitId) { return CURRICULUM.questions.filter(q => q.unitId === unitId); }
function totalUnits() { return CURRICULUM.units.length; }

function completedUnitsCount() {
  return CURRICULUM.units.filter(u => {
    const p = state.unitProgress[u.id];
    return p && p.done;
  }).length;
}

function overallProgress() {
  const total = CURRICULUM.questions.length;
  if (total === 0) return 0;
  let answered = 0;
  CURRICULUM.units.forEach(u => {
    const p = state.unitProgress[u.id];
    if (p && p.stepsAnswered) answered += Object.keys(p.stepsAnswered).length;
  });
  return Math.round((answered / total) * 100);
}

/* ════════════════════════════════════════════════════════════════════════════
   QUESTION -> SECTION MATCHING
   ════════════════════════════════════════════════════════════════════════════ */

function matchQuestionToSection(question, sections) {
  if (!sections || sections.length === 0) return 0;
  const words = (question.concept + ' ' + question.title)
    .toLowerCase()
    .split(/[\s,;:&/()\-]+/)
    .filter(w => w.length > 3);
  if (words.length === 0) return sections.length - 1;
  let bestIdx = sections.length - 1;
  let bestScore = -1;
  sections.forEach((sec, idx) => {
    const titleText = sec.title.toLowerCase();
    const contentText = (sec.content || '').toLowerCase().slice(0, 600);
    const score = words.reduce((acc, w) => {
      if (titleText.includes(w)) acc += 3;
      else if (contentText.includes(w)) acc += 1;
      return acc;
    }, 0);
    if (score > bestScore) { bestScore = score; bestIdx = idx; }
  });
  return bestIdx;
}

function buildUnitSteps(unitId) {
  const unit = getUnit(unitId);
  const questions = getUnitQuestions(unitId);
  const sectionQueues = unit.sections.map(() => []);
  questions.forEach(q => {
    const idx = matchQuestionToSection(q, unit.sections);
    sectionQueues[idx].push(q);
  });
  const steps = [];
  unit.sections.forEach((section, idx) => {
    steps.push({ type: 'section', section, sectionIdx: idx });
    sectionQueues[idx].forEach(q => steps.push({ type: 'question', question: q }));
  });
  return steps;
}

/* ════════════════════════════════════════════════════════════════════════════
   RATIONALE PARSING
   ════════════════════════════════════════════════════════════════════════════ */

function parseRationales(md) {
  const result = { correct: {}, incorrect: {}, takeaway: '' };
  if (!md) return result;
  const lines = md.split('\n');
  let currentType = null;
  let currentId = null;
  let currentLines = [];

  function flush() {
    if (!currentType || !currentLines.length) return;
    const text = currentLines.join('\n').trim().replace(/^---+\s*$/m, '').trim();
    if (currentType === 'correct' && currentId) result.correct[currentId] = text;
    else if (currentType === 'incorrect' && currentId) result.incorrect[currentId] = text;
    else if (currentType === 'takeaway') result.takeaway = text;
    currentType = null; currentId = null; currentLines = [];
  }

  lines.forEach(line => {
    // Match both "✅ **Option 1 — Correct:**" and "✅ **C — Correct.**" formats.
    // "Option " prefix is optional; strip everything up to and including the closing "**".
    const correctMatch = line.match(/^\u2705\s+\*\*(?:Option\s+)?(\w+)\s*[\u2014\u2013-]/i);
    const incorrectMatch = line.match(/^\u274c\s+\*\*(?:Option\s+)?(\w+)\s*[\u2014\u2013-]/i);
    const takeawayMatch = line.includes('\uD83D\uDCA1') || line.includes('💡');
    if (correctMatch) {
      flush();
      currentType = 'correct';
      currentId = correctMatch[1];
      // Strip the whole "✅ **…** " prefix (anything up to and including the closing **)
      const stripped = line.replace(/^\u2705\s+\*\*(?:Option\s+)?\w+\s*[\u2014\u2013-][^*]*\*\*\s*/i, '').trim();
      currentLines = [stripped];
    } else if (incorrectMatch) {
      flush();
      currentType = 'incorrect';
      currentId = incorrectMatch[1];
      const stripped = line.replace(/^\u274c\s+\*\*(?:Option\s+)?\w+\s*[\u2014\u2013-][^*]*\*\*\s*/i, '').trim();
      currentLines = [stripped];
    } else if (takeawayMatch && (line.startsWith('>') || line.startsWith('��') || line.includes('💡'))) {
      flush();
      currentType = 'takeaway';
      currentId = 'takeaway';
      currentLines = [line.replace(/^>\s*/, '')];
    } else if (line.trim() === '---') {
      flush();
    } else {
      currentLines.push(line);
    }
  });
  flush();
  return result;
}

/* ════════════════════════════════════════════════════════════════════════════
   DISTRACTOR POPUP
   ════════════════════════════════════════════════════════════════════════════ */

let distractorPopup = null;

function initDistractorPopup() {
  distractorPopup = document.getElementById('distractor-popup');

  document.addEventListener('mouseenter', e => {
    if (!e.target || typeof e.target.closest !== 'function') return;
    const item = e.target.closest('.option-item.has-distractor');
    if (item && item.dataset.distractorMd && (!e.relatedTarget || !item.contains(e.relatedTarget)))
      showDistractorPopup(item, item.dataset.distractorMd);
  }, true);

  document.addEventListener('mouseleave', e => {
    if (!e.target || typeof e.target.closest !== 'function') return;
    const item = e.target.closest('.option-item.has-distractor');
    if (item && (!e.relatedTarget || !item.contains(e.relatedTarget))) hideDistractorPopup();
  }, true);
}

function showDistractorPopup(element, md) {
  if (!distractorPopup) return;
  distractorPopup.innerHTML =
    '<div class="distractor-popup-label">❌ Why this is incorrect</div>' +
    renderMarkdown(md);
  distractorPopup.style.display = 'block';
  positionDistractorPopup(element);
}

function positionDistractorPopup(element) {
  const rect = element.getBoundingClientRect();
  const popW = Math.min(400, window.innerWidth * 0.9);

  // Measure popup height off-screen first
  distractorPopup.style.left = '0px';
  distractorPopup.style.top = '-9999px';
  distractorPopup.style.display = 'block';
  const popH = distractorPopup.offsetHeight;

  // Vertically align top of popup with top of the hovered distractor row.
  // The popup is position:fixed so coordinates are viewport-relative — no scrollY needed.
  let top = rect.top;

  // Prefer to open to the right of the option; fall back to the left.
  let left = rect.right + 8;
  if (left + popW > window.innerWidth - 8) {
    left = rect.left - popW - 8;
  }
  // Last-resort: pin to right edge of viewport
  if (left < 8) {
    left = Math.max(8, window.innerWidth - popW - 8);
  }

  // Clamp vertically so the popup never overflows the viewport bottom or top.
  if (top + popH > window.innerHeight - 8) top = window.innerHeight - popH - 8;
  if (top < 8) top = 8;

  distractorPopup.style.left = left + 'px';
  distractorPopup.style.top = top + 'px';
}

function hideDistractorPopup() {
  if (distractorPopup) distractorPopup.style.display = 'none';
}

/* ════════════════════════════════════════════════════════════════════════════
   ROUTER / VIEW MANAGEMENT
   ════════════════════════════════════════════════════════════════════════════ */

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════════════════════════════════════════════
   SIDEBAR (hierarchical tree)
   ════════════════════════════════════════════════════════════════════════════ */

function buildSidebar() {
  const list = document.getElementById('sidebar-unit-list');
  list.innerHTML = '';

  CURRICULUM.units.forEach(unit => {
    const prog = state.unitProgress[unit.id];
    const isDone = prog && prog.done;
    const answeredCount = prog && prog.stepsAnswered ? Object.keys(prog.stepsAnswered).length : 0;

    const group = document.createElement('div');
    group.className = 'sidebar-unit-group' + (isDone ? ' completed' : '');
    group.dataset.unitId = unit.id;

    const header = document.createElement('div');
    header.className = 'sidebar-unit-header';
    header.innerHTML =
      '<div class="unit-num">' + unit.id + '</div>' +
      '<div class="unit-label">Unit ' + unit.id + ': ' + unit.title + '</div>' +
      '<div class="unit-chevron">&#8250;</div>' +
      '<div class="unit-status-icon">' + (isDone ? '&#10003;' : '') + '</div>';

    const sectionsDiv = document.createElement('div');
    sectionsDiv.className = 'sidebar-sections';

    unit.sections.forEach((sec, idx) => {
      const secItem = document.createElement('div');
      secItem.className = 'sidebar-section-item';
      secItem.dataset.unitId = unit.id;
      secItem.dataset.sectionIdx = idx;
      secItem.innerHTML =
        '<span class="sidebar-section-num">' + sec.id + '</span>' +
        '<span>' + sec.title + '</span>';
      secItem.addEventListener('click', e => {
        e.stopPropagation();
        navigateToUnit(unit.id, idx);
        document.getElementById('sidebar').classList.remove('open');
      });
      sectionsDiv.appendChild(secItem);
    });

    header.addEventListener('click', () => {
      const isExpanded = group.classList.contains('expanded');
      document.querySelectorAll('.sidebar-unit-group.expanded').forEach(g => {
        if (g !== group) g.classList.remove('expanded');
      });
      group.classList.toggle('expanded', !isExpanded);
      if (!isExpanded) navigateToUnit(unit.id);
      document.getElementById('sidebar').classList.remove('open');
    });

    group.appendChild(header);
    group.appendChild(sectionsDiv);
    list.appendChild(group);
  });
}

function highlightSidebarUnit(unitId, sectionIdx) {
  document.querySelectorAll('.sidebar-unit-group').forEach(g => {
    const uid = parseInt(g.dataset.unitId);
    const isActive = uid === unitId;
    g.classList.toggle('active-unit', isActive);
    if (isActive && !g.classList.contains('expanded')) g.classList.add('expanded');
  });
  document.querySelectorAll('.sidebar-section-item').forEach(s => {
    const uid = parseInt(s.dataset.unitId);
    const sidx = parseInt(s.dataset.sectionIdx);
    s.classList.toggle('active-section',
      uid === unitId && sectionIdx !== undefined && sidx === sectionIdx);
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   HEADER PROGRESS
   ════════════════════════════════════════════════════════════════════════════ */

function updateHeaderProgress() {
  const pct = overallProgress();
  document.getElementById('header-prog-fill').style.width = pct + '%';
  document.getElementById('header-prog-pct').textContent = pct + '%';
}

/* ════════════════════════════════════════════════════════════════════════════
   DASHBOARD
   ════════════════════════════════════════════════════════════════════════════ */

function renderDashboard() {
  const completed = completedUnitsCount();
  const total = totalUnits();
  const pct = overallProgress();

  document.getElementById('dash-completed').textContent = completed;
  document.getElementById('dash-total').textContent = total;
  document.getElementById('dash-questions').textContent = CURRICULUM.questions.length;
  document.getElementById('dash-prog-fill').style.width = pct + '%';

  document.querySelectorAll('.sidebar-unit-group').forEach(g => g.classList.remove('active-unit', 'expanded'));
  document.querySelectorAll('.sidebar-section-item').forEach(s => s.classList.remove('active-section'));

  const grid = document.getElementById('units-grid');
  grid.innerHTML = '';

  CURRICULUM.units.forEach(unit => {
    const prog = state.unitProgress[unit.id];
    const isDone = prog && prog.done;
    const answeredCount = prog && prog.stepsAnswered ? Object.keys(prog.stepsAnswered).length : 0;
    const totalQ = getUnitQuestions(unit.id).length;
    const inProgress = answeredCount > 0 && !isDone;
    const quizPct = isDone ? 100 : totalQ > 0 ? Math.round((answeredCount / totalQ) * 100) : 0;
    const statusText = isDone ? 'Completed \u2713' : inProgress ? 'In Progress' : 'Not Started';

    const card = document.createElement('div');
    card.className = 'unit-card' + (isDone ? ' completed' : '') + (inProgress ? ' in-progress' : '');
    card.innerHTML =
      '<div class="unit-card-header">' +
        '<div class="unit-card-num">' + unit.id + '</div>' +
        '<div class="unit-card-status">' + statusText + '</div>' +
      '</div>' +
      '<h3>Unit ' + unit.id + ': ' + unit.title + '</h3>' +
      '<p>' + unit.sections.length + ' sections \u00b7 ' + totalQ + ' questions</p>' +
      (isDone && prog.quizScore !== null
        ? '<p style="font-size:.75rem;color:var(--success);font-weight:600">Score: ' + prog.quizScore + '/' + prog.quizTotal + ' (' + Math.round(prog.quizScore / prog.quizTotal * 100) + '%)</p>'
        : inProgress
          ? '<p style="font-size:.75rem;color:var(--primary);font-weight:600">' + answeredCount + '/' + totalQ + ' questions answered</p>'
          : '') +
      '<div class="unit-card-mini-prog">' +
        '<div class="unit-card-mini-prog-fill" style="width:' + quizPct + '%"></div>' +
      '</div>';
    card.addEventListener('click', () => navigateToUnit(unit.id));
    grid.appendChild(card);
  });

  showView('dashboard');
}

/* ════════════════════════════════════════════════════════════════════════════
   UNIT NAVIGATION
   ════════════════════════════════════════════════════════════════════════════ */

let unitState = {
  unitId: null, steps: [], currentStep: 0,
  questionAnswered: false, selectedIds: []
};

function navigateToUnit(unitId, startSectionIdx) {
  const prog = getUnitProgress(unitId);

  if (prog.done && startSectionIdx === undefined) {
    showUnitComplete(unitId);
    return;
  }

  const steps = buildUnitSteps(unitId);
  let startStep = 0;

  if (startSectionIdx !== undefined && startSectionIdx > 0) {
    const idx = steps.findIndex(s => s.type === 'section' && s.sectionIdx === startSectionIdx);
    if (idx >= 0) startStep = idx;
  } else if (!prog.done) {
    // Only resume (skip ahead) if there are already some answered questions
    const hasAnswers = Object.keys(prog.stepsAnswered).length > 0;
    if (hasAnswers) {
      for (let i = 0; i < steps.length; i++) {
        const s = steps[i];
        if (s.type === 'question' && !prog.stepsAnswered[s.question.id]) {
          let sectionStep = i - 1;
          while (sectionStep > 0 && steps[sectionStep].type !== 'section') sectionStep--;
          startStep = Math.max(0, sectionStep);
          break;
        }
      }
    }
    // else: startStep stays 0 (fresh unit, start from the beginning)
  }

  unitState = { unitId, steps, currentStep: startStep, questionAnswered: false, selectedIds: [] };
  highlightSidebarUnit(unitId);
  renderCurrentStep();
  showView('unit');
}

/* ════════════════════════════════════════════════════════════════════════════
   UNIT STEP RENDERER
   ════════════════════════════════════════════════════════════════════════════ */

function renderCurrentStep() {
  const { steps, currentStep } = unitState;
  if (currentStep >= steps.length) { finishUnit(); return; }
  updateUnitProgressBar();
  const step = steps[currentStep];
  if (step.type === 'section') renderSectionStep(step);
  else renderQuestionStep(step);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUnitProgressBar() {
  const { steps, currentStep } = unitState;
  const pct = steps.length > 1 ? Math.round((currentStep / (steps.length - 1)) * 100) : 0;
  document.getElementById('unit-prog-fill').style.width = pct + '%';
}

function renderSectionStep(step) {
  const { unitId } = unitState;
  const unit = getUnit(unitId);
  const { section, sectionIdx } = step;

  document.getElementById('unit-breadcrumb').textContent =
    'Foundations of Nursing \u203a Unit ' + unitId + ': ' + unit.title;
  document.getElementById('unit-title').textContent = 'Unit ' + unitId + ': ' + unit.title;
  document.getElementById('unit-step-info').textContent =
    'Section ' + (sectionIdx + 1) + ' of ' + unit.sections.length;

  highlightSidebarUnit(unitId, sectionIdx);

  document.getElementById('unit-content').innerHTML =
    '<div class="content-card">' +
      '<div class="content-card-header">' +
        '<span class="section-badge">\u00a7 ' + section.id + '</span>' +
        '<h3>' + section.title + '</h3>' +
      '</div>' +
      '<div class="content-card-body">' +
        '<div class="md-content">' + renderMarkdown(section.content) + '</div>' +
      '</div>' +
    '</div>';

  attachNoteWidget(unitId, unit.title, 'section', section.id, section.title);
  renderUnitNavButtons();
}

function renderQuestionStep(step) {
  const { unitId } = unitState;
  const unit = getUnit(unitId);
  const q = step.question;

  document.getElementById('unit-breadcrumb').textContent =
    'Foundations of Nursing \u203a Unit ' + unitId + ': ' + unit.title;
  document.getElementById('unit-title').textContent = 'Unit ' + unitId + ': ' + unit.title;
  document.getElementById('unit-step-info').textContent =
    q.isSATA ? 'Select All That Apply' : 'Multiple Choice';

  unitState.questionAnswered = false;
  unitState.selectedIds = [];

  document.getElementById('unit-content').innerHTML =
    '<div class="question-card">' +
      '<div class="question-card-header">' +
        '<div class="question-meta">' +
          '<span class="badge">' + q.concept + '</span>' +
          (q.isSATA ? '<span class="badge badge-sata">Select All That Apply</span>' : '') +
        '</div>' +
        '<div class="question-num">Q' + q.id + '</div>' +
        '<div class="question-text">' + (q.questionText || q.title) + '</div>' +
      '</div>' +
      '<div class="question-card-body">' +
        '<ul class="options-list' + (q.isSATA ? ' sata' : '') + '" id="options-list"></ul>' +
        '<div class="quiz-actions" id="quiz-actions"></div>' +
      '</div>' +
    '</div>' +
    '<div id="explanation-container"></div>';

  const prog = getUnitProgress(unitId);
  const prevAnswer = prog.stepsAnswered[q.id];

  if (prevAnswer) {
    unitState.questionAnswered = true;
    unitState.selectedIds = prevAnswer.selectedIds || [];
    renderOptions(q);
    styleAnsweredOptions(q, prevAnswer.selectedIds, prevAnswer.isCorrect);
    showExplanation(q, prevAnswer.isCorrect, false);
  } else {
    renderOptions(q);
    if (q.isSATA) renderSATASubmitButton(q);
  }

  attachNoteWidget(unitId, unit.title, 'question', q.id, q.title || (q.questionText || '').slice(0, 60));
  renderUnitNavButtons();
}

function renderOptions(q) {
  const optList = document.getElementById('options-list');
  if (!optList) return;
  q.options.forEach(opt => {
    const li = document.createElement('li');
    li.className = 'option-item';
    li.dataset.optId = opt.id;
    li.innerHTML =
      '<div class="option-marker">' + opt.id + '</div>' +
      '<div class="option-text">' + opt.text + '</div>';
    li.addEventListener('click', () => handleOptionClick(li, opt.id, q));
    optList.appendChild(li);
  });
}

function renderSATASubmitButton(q) {
  const actionsEl = document.getElementById('quiz-actions');
  if (!actionsEl) return;
  actionsEl.innerHTML =
    '<button class="btn btn-primary btn-lg" id="sata-submit-btn" disabled>Submit Answer</button>';
  document.getElementById('sata-submit-btn').addEventListener('click', () => submitAnswer(q));
}

/* ════════════════════════════════════════════════════════════════════════════
   OPTION CLICK HANDLER
   ════════════════════════════════════════════════════════════════════════════ */

function handleOptionClick(li, optId, q) {
  if (unitState.questionAnswered) return;
  if (q.isSATA) {
    const idx = unitState.selectedIds.indexOf(optId);
    if (idx === -1) {
      unitState.selectedIds.push(optId);
      li.classList.add('selected');
      li.querySelector('.option-marker').textContent = '\u2713';
    } else {
      unitState.selectedIds.splice(idx, 1);
      li.classList.remove('selected');
      li.querySelector('.option-marker').textContent = optId;
    }
    const btn = document.getElementById('sata-submit-btn');
    if (btn) btn.disabled = unitState.selectedIds.length === 0;
  } else {
    // Single choice: auto-submit immediately
    document.querySelectorAll('#options-list .option-item').forEach(item => {
      item.classList.remove('selected');
      item.querySelector('.option-marker').textContent = item.dataset.optId;
    });
    unitState.selectedIds = [optId];
    li.classList.add('selected');
    li.querySelector('.option-marker').textContent = '\u25cf';
    submitAnswer(q);
  }
}

/* ════════════════════════════════════════════════════════════════════════════
   ANSWER SUBMISSION
   ════════════════════════════════════════════════════════════════════════════ */

function submitAnswer(q) {
  const { selectedIds } = unitState;
  unitState.questionAnswered = true;

  const correctIds = q.correctIds;
  const selected = [...selectedIds].sort();
  const correct = [...correctIds].sort();

  let isCorrect, isPartial;
  if (q.isSATA) {
    const allCorrectSelected = correct.every(id => selected.includes(id));
    const noIncorrectSelected = selected.every(id => correct.includes(id));
    isCorrect = allCorrectSelected && noIncorrectSelected;
    isPartial = !isCorrect && selected.some(id => correct.includes(id));
  } else {
    isCorrect = selected.length === 1 && correct.includes(selected[0]);
    isPartial = false;
  }

  const prog = getUnitProgress(unitState.unitId);
  prog.stepsAnswered[q.id] = { selectedIds: [...selectedIds], isCorrect };
  saveState();
  updateHeaderProgress();

  const actionsEl = document.getElementById('quiz-actions');
  if (actionsEl) actionsEl.innerHTML = '';

  styleAnsweredOptions(q, selectedIds, isCorrect);
  showExplanation(q, isCorrect, isPartial);
  renderUnitNavButtons();
}

function styleAnsweredOptions(q, selectedIds, isCorrect) {
  const rationales = parseRationales(q.explanation);
  document.querySelectorAll('#options-list .option-item').forEach(item => {
    const optId = item.dataset.optId;
    item.classList.add('disabled');
    const wasSelected = selectedIds.includes(optId);
    const isActuallyCorrect = q.correctIds.includes(optId);

    if (wasSelected && isActuallyCorrect) {
      item.classList.add('correct');
      item.querySelector('.option-marker').textContent = '\u2713';
    } else if (wasSelected && !isActuallyCorrect) {
      item.classList.add('incorrect');
    } else if (!wasSelected && isActuallyCorrect) {
      item.classList.add('missed');
      item.querySelector('.option-marker').textContent = '\u2713';
    }

    if (!isActuallyCorrect) {
      const distractorMd = rationales.incorrect[optId] || '';
      if (distractorMd) {
        item.classList.add('has-distractor');
        item.dataset.distractorMd = distractorMd;
      }
    }
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   EXPLANATION (correct-answer rationale only; distractors on hover)
   ════════════════════════════════════════════════════════════════════════════ */

function showExplanation(q, isCorrect, isPartial) {
  const container = document.getElementById('explanation-container');
  if (!container) return;
  const rationales = parseRationales(q.explanation);

  let headerClass, headerIcon, headerText;
  if (isCorrect) { headerClass = 'correct-header'; headerIcon = '\u2705'; headerText = 'Correct!'; }
  else if (isPartial) { headerClass = 'partial-header'; headerIcon = '\u26a0\ufe0f'; headerText = 'Partially Correct'; }
  else { headerClass = 'incorrect-header'; headerIcon = '\u274c'; headerText = 'Incorrect \u2014 Study the Rationale'; }

  let rationaleHtml = '';
  q.correctIds.forEach(id => {
    const text = rationales.correct[id];
    if (text) rationaleHtml += '<div class="rationale-correct-block">' + renderMarkdown(text) + '</div>';
  });
  if (rationales.takeaway) {
    rationaleHtml += '<div class="rationale-takeaway">' + renderMarkdown(rationales.takeaway) + '</div>';
  }

  // For SATA questions, render distractor rationales inline so they are always visible.
  let distractorRationaleHtml = '';
  if (q.isSATA) {
    q.options.forEach(opt => {
      if (!q.correctIds.includes(opt.id)) {
        const text = rationales.incorrect[opt.id];
        if (text) {
          distractorRationaleHtml +=
            '<div class="rationale-incorrect-block">' +
              '<div class="rationale-incorrect-label">\u274c Option ' + opt.id + ' \u2014 Why this is incorrect</div>' +
              renderMarkdown(text) +
            '</div>';
        }
      }
    });
  }

  if (!rationaleHtml && !distractorRationaleHtml) {
    rationaleHtml = q.explanation
      ? '<div class="md-content">' + renderMarkdown(q.explanation) + '</div>'
      : '<p>See the options above for the correct answer.</p>';
  }

  // For non-SATA questions, keep the hover hint when distractor rationales exist on hover.
  const hasHoverDistractors = !q.isSATA &&
    q.options.some(o => !q.correctIds.includes(o.id) && rationales.incorrect[o.id]);

  container.innerHTML =
    '<div class="explanation-card">' +
      '<div class="explanation-card-header ' + headerClass + '">' +
        '<span>' + headerIcon + '</span>' +
        '<span>' + headerText + '</span>' +
      '</div>' +
      '<div class="explanation-body">' +
        '<p class="correct-answer-line">Correct answer' +
          (q.correctIds.length > 1 ? 's' : '') + ': <strong>' + q.correctAnswerText + '</strong></p>' +
        rationaleHtml +
        distractorRationaleHtml +
        (hasHoverDistractors ? '<p class="distractor-hint-note">\ud83d\udcac Hover over any incorrect option for its rationale.</p>' : '') +
      '</div>' +
    '</div>';

  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ════════════════════════════════════════════════════════════════════════════
   UNIT NAVIGATION BUTTONS
   ════════════════════════════════════════════════════════════════════════════ */

function renderUnitNavButtons() {
  const { steps, currentStep, questionAnswered } = unitState;
  const step = steps[currentStep];
  const isLast = currentStep >= steps.length - 1;
  const canNext = step.type === 'section' || questionAnswered;

  const prevBtn = currentStep > 0
    ? '<button class="btn btn-outline" id="step-prev-btn">\u2190 Back</button>' : '';

  let nextBtn = '';
  if (canNext) {
    const label = isLast ? 'Finish Unit \uD83C\uDF89' : step.type === 'question' ? 'Continue \u2192' : 'Next \u2192';
    const cls = isLast ? 'btn btn-success btn-lg' : 'btn btn-primary btn-lg';
    nextBtn = '<button class="' + cls + '" id="step-next-btn" style="margin-left:auto">' + label + '</button>';
  }

  const navEl = document.getElementById('unit-nav');
  navEl.innerHTML = prevBtn + nextBtn;
  document.getElementById('step-prev-btn')?.addEventListener('click', prevStep);
  document.getElementById('step-next-btn')?.addEventListener('click', nextStep);
}

function prevStep() {
  if (unitState.currentStep > 0) { unitState.currentStep--; renderCurrentStep(); }
}

function nextStep() { unitState.currentStep++; renderCurrentStep(); }

/* ════════════════════════════════════════════════════════════════════════════
   FINISH UNIT
   ════════════════════════════════════════════════════════════════════════════ */

function finishUnit() {
  const { unitId } = unitState;
  const prog = getUnitProgress(unitId);
  const questions = getUnitQuestions(unitId);
  const correct = questions.filter(q => prog.stepsAnswered[q.id]?.isCorrect).length;
  prog.done = true;
  prog.quizScore = correct;
  prog.quizTotal = questions.length;
  saveState();
  buildSidebar();
  updateHeaderProgress();
  showUnitComplete(unitId);
}

/* ════════════════════════════════════════════════════════════════════════════
   UNIT COMPLETE VIEW
   ════════════════════════════════════════════════════════════════════════════ */

function showUnitComplete(unitId) {
  const unit = getUnit(unitId);
  const prog = getUnitProgress(unitId);
  const score = prog.quizScore ?? 0;
  const total = prog.quizTotal ?? 0;
  const pct = total > 0 ? Math.round((score / total) * 100) : 100;
  highlightSidebarUnit(unitId);

  let icon, scoreClass;
  if (pct === 100) { icon = '\uD83C\uDFC6'; scoreClass = 'perfect'; }
  else if (pct >= 80) { icon = '\uD83C\uDF89'; scoreClass = ''; }
  else if (pct >= 60) { icon = '\uD83D\uDCDA'; scoreClass = ''; }
  else { icon = '\uD83D\uDD04'; scoreClass = 'needs-work'; }

  const nextUnit = CURRICULUM.units.find(u => u.id === unitId + 1);

  document.getElementById('complete-container').innerHTML =
    '<div class="complete-card">' +
      '<div class="complete-icon">' + icon + '</div>' +
      '<h2>Unit ' + unitId + ' Complete!</h2>' +
      '<p class="text-muted">Unit ' + unitId + ': ' + unit.title + '</p>' +
      (total > 0
        ? '<div class="score-display ' + scoreClass + '">' + pct + '%</div>' +
          '<p class="score-label">Quiz Score</p>' +
          '<div class="score-breakdown">' +
            '<div class="score-breakdown-item"><div class="sbi-num" style="color:var(--success)">' + score + '</div><div class="sbi-lbl">Correct</div></div>' +
            '<div class="score-breakdown-item"><div class="sbi-num" style="color:var(--danger)">' + (total - score) + '</div><div class="sbi-lbl">Incorrect</div></div>' +
            '<div class="score-breakdown-item"><div class="sbi-num">' + total + '</div><div class="sbi-lbl">Total</div></div>' +
          '</div>'
        : '<p style="margin:20px 0;color:var(--text-muted)">No quiz questions for this unit.</p>') +
      '<div class="complete-actions">' +
        '<button class="btn btn-outline" onclick="retryUnit(' + unitId + ')">\u21ba Redo Unit</button>' +
        (nextUnit
          ? '<button class="btn btn-primary btn-lg" onclick="navigateToUnit(' + nextUnit.id + ')">Next Unit: ' + nextUnit.title + ' \u2192</button>'
          : '<button class="btn btn-success btn-lg" onclick="renderDashboard()">\uD83C\uDFC1 Course Complete! View Dashboard</button>') +
      '</div>' +
      '<div class="mt-4"><button class="btn btn-outline" onclick="renderDashboard()" style="width:100%">\u2190 Back to Dashboard</button></div>' +
    '</div>';

  showView('complete');
}

function retryUnit(unitId) {
  const prog = getUnitProgress(unitId);
  prog.stepsAnswered = {};
  prog.done = false;
  prog.quizScore = null;
  prog.quizTotal = null;
  saveState();
  buildSidebar();
  updateHeaderProgress();
  navigateToUnit(unitId);
}

/* ════════════════════════════════════════════════════════════════════════════
   TOPIC & KEYWORD SEARCH INDEX
   ════════════════════════════════════════════════════════════════════════════ */

/**
 * Extract all bigrams and trigrams from a lowercase text string.
 * These are stored in the index so multi-word phrases can be found and scored
 * even when they cross boundaries not captured by single-word matching.
 */
function extractNgrams(text, maxN) {
  const words = text.split(/\s+/).filter(w => w.length >= 2);
  const grams = [];
  for (let n = 2; n <= maxN; n++) {
    for (let i = 0; i <= words.length - n; i++) {
      grams.push(words.slice(i, i + n).join(' '));
    }
  }
  return grams;
}

/**
 * Parse a raw search query into:
 *   phrases  — exact phrases wrapped in single (') or double (") quotes
 *   terms    — remaining individual bare keywords
 *
 * Example: `"blood pressure" diastolic` → { phrases: ['blood pressure'], terms: ['diastolic'] }
 * Example: `'vital signs'` → { phrases: ['vital signs'], terms: [] }
 */
function parseQuery(rawQuery) {
  const phrases = [];
  const terms = [];
  const re = /['"](.*?)['"]/g;
  let match;
  const ranges = [];
  while ((match = re.exec(rawQuery)) !== null) {
    const p = match[1].trim().toLowerCase();
    if (p.length >= 2) phrases.push(p);
    ranges.push([match.index, match.index + match[0].length]);
  }
  // Remove quoted regions then split the remainder into bare terms
  let bare = rawQuery;
  for (let i = ranges.length - 1; i >= 0; i--) {
    bare = bare.slice(0, ranges[i][0]) + ' ' + bare.slice(ranges[i][1]);
  }
  bare.split(/\s+/).forEach(w => {
    const t = w.trim().toLowerCase();
    if (t.length >= 2) terms.push(t);
  });
  return { phrases, terms };
}

/**
 * Build a flat search index from the curriculum.
 * Each entry has:
 *   searchText — the full lowercased text blob for substring matching
 *   ngramSet   — Set of all bigrams and trigrams extracted from that text,
 *                enabling phrase-level scoring for unquoted multi-word queries
 */
function buildSearchIndex() {
  const entries = [];

  CURRICULUM.units.forEach(unit => {
    const raw = 'unit ' + unit.id + ' ' + unit.title;
    const searchText = raw.toLowerCase();
    entries.push({
      type: 'unit',
      label: 'Unit ' + unit.id + ': ' + unit.title,
      sublabel: unit.sections.length + ' sections · ' + getUnitQuestions(unit.id).length + ' questions',
      searchText,
      ngramSet: new Set(extractNgrams(searchText, 3)),
      unitId: unit.id,
      sectionIdx: undefined,
      questionId: undefined
    });

    // Section entries — index the FULL content (no 400-char limit)
    unit.sections.forEach((sec, idx) => {
      const raw = sec.title + ' ' + (sec.content || '');
      const searchText = raw.toLowerCase();
      entries.push({
        type: 'section',
        label: sec.title,
        sublabel: 'Unit ' + unit.id + ': ' + unit.title,
        searchText,
        ngramSet: new Set(extractNgrams(searchText, 3)),
        unitId: unit.id,
        sectionIdx: idx,
        questionId: undefined
      });
    });
  });

  // Question entries — topic, concept, and full question text
  CURRICULUM.questions.forEach(q => {
    const concepts = (q.concept || '').split(';').map(c => c.trim()).filter(Boolean);
    const raw = 'q' + q.id + ' ' + (q.title || '') + ' ' + (q.questionText || '') + ' ' +
                (q.topic || '') + ' ' + (q.concept || '');
    const searchText = raw.toLowerCase();
    entries.push({
      type: 'question',
      label: 'Q' + q.id + ': ' + (q.title || q.questionText.slice(0, 60)),
      sublabel: (q.topic || '') + (concepts.length ? ' · ' + concepts.join(', ') : ''),
      searchText,
      ngramSet: new Set(extractNgrams(searchText, 3)),
      unitId: q.unitId,
      sectionIdx: undefined,
      questionId: q.id
    });
  });

  return entries;
}

let _searchIndex = null;

function getSearchIndex() {
  if (!_searchIndex) _searchIndex = buildSearchIndex();
  return _searchIndex;
}

/**
 * Run a search against the curriculum index.
 *
 * Quoted phrases (single or double quotes) require an EXACT match — every
 * quoted phrase must appear verbatim in the entry's searchText.
 *
 * Unquoted terms are each matched individually; consecutive terms are also
 * checked against the pre-built bigram/trigram set for a phrase-level bonus.
 */
function runSearch(query) {
  if (!query || query.trim().length < 2) return [];

  const { phrases, terms } = parseQuery(query);
  if (phrases.length === 0 && terms.length === 0) return [];

  const index = getSearchIndex();

  const scored = index.map(entry => {
    let score = 0;

    // Quoted phrases: ALL must be present (exact substring) — non-matching entries are excluded
    for (const phrase of phrases) {
      if (!entry.searchText.includes(phrase)) return { entry, score: 0 };
      score += entry.label.toLowerCase().includes(phrase) ? 8 : 4;
    }

    // Bare terms: each match adds to score
    for (const term of terms) {
      if (entry.searchText.includes(term)) {
        score += entry.label.toLowerCase().includes(term) ? 3 : 1;
      }
    }

    // Phrase-level bonus: check consecutive bare term pairs/triples against ngrams
    if (terms.length >= 2) {
      for (let n = 2; n <= Math.min(terms.length, 3); n++) {
        for (let i = 0; i <= terms.length - n; i++) {
          const gram = terms.slice(i, i + n).join(' ');
          if (entry.ngramSet.has(gram)) score += n * 2;
        }
      }
    }

    return { entry, score };
  }).filter(r => r.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 40).map(r => r.entry);
}

function openSearch() {
  const modal = document.getElementById('search-modal');
  modal.style.display = 'flex';
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML =
    '<p class="search-hint">Type a topic, keyword, or question number. Wrap phrases in quotes for exact match — e.g. <code>"blood pressure"</code> or <code>\'vital signs\'</code>. Use <kbd>Ctrl K</kbd> to open.</p>';
  setTimeout(() => document.getElementById('search-input').focus(), 60);
}

function closeSearch() {
  document.getElementById('search-modal').style.display = 'none';
}

function renderSearchResults(results) {
  const container = document.getElementById('search-results');
  if (results.length === 0) {
    container.innerHTML = '<p class="search-hint search-no-results">No results found. Try different keywords.</p>';
    return;
  }

  // Group by type
  const groups = { unit: [], section: [], question: [] };
  results.forEach(r => groups[r.type].push(r));

  const typeLabels = { unit: '📚 Units', section: '§ Sections', question: '❓ Questions' };
  let html = '';

  ['unit', 'section', 'question'].forEach(type => {
    const items = groups[type];
    if (!items.length) return;
    html += '<div class="search-group"><div class="search-group-label">' + typeLabels[type] + '</div>';
    items.forEach((item, i) => {
      html +=
        '<button class="search-result-item" data-idx="' + i + '" data-type="' + item.type + '"' +
          ' data-unit-id="' + (item.unitId || '') + '"' +
          ' data-section-idx="' + (item.sectionIdx !== undefined ? item.sectionIdx : '') + '"' +
          ' data-question-id="' + (item.questionId !== undefined ? item.questionId : '') + '">' +
          '<span class="search-result-label">' + escapeHtml(item.label) + '</span>' +
          '<span class="search-result-sub">' + escapeHtml(item.sublabel) + '</span>' +
        '</button>';
    });
    html += '</div>';
  });

  container.innerHTML = html;

  container.querySelectorAll('.search-result-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const unitId = parseInt(btn.dataset.unitId);
      const sectionIdxStr = btn.dataset.sectionIdx;
      const questionIdStr = btn.dataset.questionId;
      const type = btn.dataset.type;

      closeSearch();

      if (type === 'unit') {
        navigateToUnit(unitId);
      } else if (type === 'section') {
        const sectionIdx = parseInt(sectionIdxStr);
        navigateToUnit(unitId, sectionIdx);
      } else if (type === 'question') {
        const questionId = parseInt(questionIdStr);
        navigateToQuestion(unitId, questionId);
      }
    });
  });
}

/**
 * Navigate directly to a specific question within a unit.
 */
function navigateToQuestion(unitId, questionId) {
  const steps = buildUnitSteps(unitId);
  const qStepIdx = steps.findIndex(s => s.type === 'question' && s.question.id === questionId);
  const startStep = qStepIdx >= 0 ? qStepIdx : 0;
  unitState = { unitId, steps, currentStep: startStep, questionAnswered: false, selectedIds: [] };
  highlightSidebarUnit(unitId);
  renderCurrentStep();
  showView('unit');
}

function initSearch() {
  document.getElementById('search-btn').addEventListener('click', openSearch);
  document.getElementById('search-close-btn').addEventListener('click', closeSearch);
  document.querySelector('.search-modal-backdrop').addEventListener('click', closeSearch);

  document.getElementById('search-input').addEventListener('input', e => {
    const val = e.target.value;
    if (val.trim().length < 2) {
      document.getElementById('search-results').innerHTML =
        '<p class="search-hint">Type a topic, keyword, or question number. Wrap phrases in quotes for exact match — e.g. <code>"blood pressure"</code> or <code>\'vital signs\'</code>. Use <kbd>Ctrl K</kbd> to open.</p>';
    } else {
      renderSearchResults(runSearch(val));
    }
  });

  document.getElementById('search-input').addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && document.getElementById('search-modal').style.display !== 'none') {
      closeSearch();
    }
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   NOTES
   ════════════════════════════════════════════════════════════════════════════ */

function getStepNotes(unitId, stepId) {
  return (state.notes || []).filter(
    n => n.unitId === unitId && n.stepId === String(stepId)
  );
}

function saveNote(unitId, unitTitle, stepType, stepId, stepTitle, text) {
  if (!text.trim()) return null;
  if (!state.notes) state.notes = [];
  const note = {
    id: 'note-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    unitId,
    unitTitle,
    stepType,
    stepId: String(stepId),
    stepTitle,
    text: text.trim(),
    createdAt: new Date().toISOString()
  };
  state.notes.push(note);
  saveState();
  return note;
}

function deleteNote(noteId) {
  if (!state.notes) return;
  state.notes = state.notes.filter(n => n.id !== noteId);
  saveState();
}

function formatTimestamp(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function updateNotesButtonCount() {
  const count = (state.notes || []).length;
  const btn = document.getElementById('notes-btn');
  if (!btn) return;
  btn.innerHTML = count > 0
    ? '📝 Notes <span class="notes-header-count">' + count + '</span>'
    : '📝 Notes';
}

/* Attach a note-taking widget to #unit-content for the current step. */
function attachNoteWidget(unitId, unitTitle, stepType, stepId, stepTitle) {
  const container = document.getElementById('unit-content');
  if (!container) return;
  const widget = document.createElement('div');
  widget.className = 'note-widget';
  widget.id = 'note-widget';
  widget.dataset.unitId = unitId;
  widget.dataset.unitTitle = unitTitle;
  widget.dataset.stepId = String(stepId);
  widget.dataset.stepType = stepType;
  widget.dataset.stepTitle = stepTitle;
  container.appendChild(widget);
  refreshNoteWidget(widget, unitId, unitTitle, stepType, stepId, stepTitle);
}

function refreshNoteWidget(widget, unitId, unitTitle, stepType, stepId, stepTitle) {
  const notes = getStepNotes(unitId, stepId);
  const loc = 'Unit ' + unitId + ' \u203a ' +
    (stepType === 'section' ? 'Section ' + stepId : 'Question ' + stepId);

  let notesHtml = '';
  if (notes.length > 0) {
    notesHtml =
      '<div class="note-list">' +
      notes.map(n =>
        '<div class="note-item" data-note-id="' + n.id + '">' +
          '<div class="note-item-meta">' +
            '<span class="note-item-time">\uD83D\uDD52 ' + formatTimestamp(n.createdAt) + '</span>' +
            '<span class="note-item-loc">' + escapeHtml(loc) + '</span>' +
            '<button class="note-delete-btn" aria-label="Delete note">\u2715</button>' +
          '</div>' +
          '<div class="note-item-text">' + escapeHtml(n.text).replace(/\n/g, '<br>') + '</div>' +
        '</div>'
      ).join('') +
      '</div>';
  }

  widget.innerHTML =
    '<div class="note-widget-header">' +
      '<span class="note-widget-title">\uD83D\uDCDD My Notes' +
        (notes.length > 0 ? ' <span class="note-count">' + notes.length + '</span>' : '') +
      '</span>' +
      '<span class="note-widget-loc">' + escapeHtml(loc) + '</span>' +
    '</div>' +
    notesHtml +
    '<div class="note-input-area">' +
      '<textarea class="note-textarea" id="note-textarea" placeholder="Add a note for this step\u2026" rows="3"></textarea>' +
      '<button class="btn note-save-btn" id="note-save-btn">Save Note</button>' +
    '</div>';

  widget.querySelector('#note-save-btn').addEventListener('click', () => {
    const ta = widget.querySelector('#note-textarea');
    const text = ta.value;
    if (!text.trim()) return;
    saveNote(unitId, unitTitle, stepType, stepId, stepTitle, text);
    ta.value = '';
    refreshNoteWidget(widget, unitId, unitTitle, stepType, stepId, stepTitle);
    updateNotesButtonCount();
    const modal = document.getElementById('notes-modal');
    if (modal && modal.style.display === 'flex') renderNotesModalContent();
    showToast('Note saved.');
  });

  widget.querySelectorAll('.note-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.note-item');
      if (!item) return;
      deleteNote(item.dataset.noteId);
      refreshNoteWidget(widget, unitId, unitTitle, stepType, stepId, stepTitle);
      updateNotesButtonCount();
      const modal = document.getElementById('notes-modal');
      if (modal && modal.style.display === 'flex') renderNotesModalContent();
    });
  });
}

/* ── Notes modal ── */

function buildNotesMarkdown() {
  const notes = state.notes || [];
  if (!notes.length) return '# My Notes \u2014 Foundations of Nursing\n\n*No notes yet.*';

  const byUnit = {};
  notes.forEach(n => {
    if (!byUnit[n.unitId]) byUnit[n.unitId] = { title: n.unitTitle, steps: {} };
    const stepKey = n.stepType + '-' + n.stepId;
    if (!byUnit[n.unitId].steps[stepKey]) {
      byUnit[n.unitId].steps[stepKey] = {
        stepType: n.stepType,
        stepId: n.stepId,
        stepTitle: n.stepTitle,
        notes: []
      };
    }
    byUnit[n.unitId].steps[stepKey].notes.push(n);
  });

  let md = '# My Notes \u2014 Foundations of Nursing\n\n';
  const unitIds = Object.keys(byUnit).map(Number).sort((a, b) => a - b);
  unitIds.forEach(unitId => {
    const unit = byUnit[unitId];
    md += '## Unit ' + unitId + ': ' + unit.title + '\n\n';
    Object.values(unit.steps).forEach(step => {
      const loc = 'Unit ' + unitId + ' \u203a ' +
        (step.stepType === 'section' ? 'Section ' + step.stepId : 'Question ' + step.stepId);
      const prefix = step.stepType === 'section' ? '\u00a7' : 'Q';
      md += '### ' + prefix + step.stepId + ' \u2014 ' + step.stepTitle + '\n\n';
      step.notes.forEach(n => {
        md += '> **' + formatTimestamp(n.createdAt) + '** | ' + loc + '\n\n';
        md += n.text + '\n\n';
      });
    });
  });

  return md.trim();
}

function renderNotesModalContent() {
  const notes = state.notes || [];
  const contentEl = document.getElementById('notes-modal-content');
  if (!contentEl) return;

  if (!notes.length) {
    contentEl.innerHTML =
      '<p class="notes-empty">No notes yet. Use the \u201cMy Notes\u201d widget at the bottom of any section or question to add your first note.</p>';
    return;
  }

  const byUnit = {};
  notes.forEach(n => {
    if (!byUnit[n.unitId]) byUnit[n.unitId] = { title: n.unitTitle, steps: {} };
    const stepKey = n.stepType + '-' + n.stepId;
    if (!byUnit[n.unitId].steps[stepKey]) {
      byUnit[n.unitId].steps[stepKey] = {
        stepType: n.stepType, stepId: n.stepId, stepTitle: n.stepTitle, notes: []
      };
    }
    byUnit[n.unitId].steps[stepKey].notes.push(n);
  });

  let html = '';
  const unitIds = Object.keys(byUnit).map(Number).sort((a, b) => a - b);
  unitIds.forEach(unitId => {
    const unit = byUnit[unitId];
    html += '<div class="notes-unit">';
    html += '<h3 class="notes-unit-title">Unit ' + unitId + ': ' + escapeHtml(unit.title) + '</h3>';
    Object.values(unit.steps).forEach(step => {
      const loc = 'Unit ' + unitId + ' \u203a ' +
        (step.stepType === 'section' ? 'Section ' + step.stepId : 'Question ' + step.stepId);
      const prefix = step.stepType === 'section' ? '\u00a7' : 'Q';
      html += '<div class="notes-step">';
      html += '<h4 class="notes-step-title">' + prefix + step.stepId + ' \u2014 ' + escapeHtml(step.stepTitle) + '</h4>';
      step.notes.forEach(n => {
        html += '<div class="notes-note-item" data-note-id="' + n.id + '">';
        html +=
          '<div class="notes-note-meta">' +
            '<span class="notes-note-time">\uD83D\uDD52 ' + formatTimestamp(n.createdAt) + '</span>' +
            '<span class="notes-note-loc">' + escapeHtml(loc) + '</span>' +
            '<button class="notes-note-delete-btn" aria-label="Delete note">\u2715</button>' +
          '</div>';
        html += '<div class="notes-note-text">' + escapeHtml(n.text).replace(/\n/g, '<br>') + '</div>';
        html += '</div>';
      });
      html += '</div>';
    });
    html += '</div>';
  });
  contentEl.innerHTML = html;

  contentEl.querySelectorAll('.notes-note-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.notes-note-item');
      if (!item) return;
      deleteNote(item.dataset.noteId);
      renderNotesModalContent();
      updateNotesButtonCount();
      const widget = document.getElementById('note-widget');
      if (widget) {
        refreshNoteWidget(
          widget,
          Number(widget.dataset.unitId),
          widget.dataset.unitTitle,
          widget.dataset.stepType,
          widget.dataset.stepId,
          widget.dataset.stepTitle
        );
      }
    });
  });
}

function showNotesModal() {
  const modal = document.getElementById('notes-modal');
  if (!modal) return;
  renderNotesModalContent();
  modal.style.display = 'flex';
}

function initNotes() {
  const modal = document.getElementById('notes-modal');
  if (!modal) return;

  modal.querySelector('.notes-modal-backdrop').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  document.getElementById('notes-close-btn').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  document.getElementById('notes-copy-btn').addEventListener('click', () => {
    const md = buildNotesMarkdown();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).then(() => showToast('Notes copied to clipboard as Markdown!')).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
    function fallbackCopy() {
      const ta = document.createElement('textarea');
      ta.value = md;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showToast('Notes copied to clipboard as Markdown!'); }
      catch (_) { showToast('Copy failed \u2014 please copy manually.'); }
      ta.remove();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display !== 'none') modal.style.display = 'none';
  });

  document.getElementById('notes-btn').addEventListener('click', showNotesModal);
  updateNotesButtonCount();
}

/* ════════════════════════════════════════════════════════════════════════════
   RESET
   ════════════════════════════════════════════════════════════════════════════ */

function resetAllProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  state = { unitProgress: {}, notes: state.notes || [] };
  saveState();
  buildSidebar();
  updateHeaderProgress();
  renderDashboard();
  showToast('Progress reset.');
}

/* ════════════════════════════════════════════════════════════════════════════
   TOAST
   ════════════════════════════════════════════════════════════════════════════ */

let toastTimer = null;

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ════════════════════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initDistractorPopup();
  initSearch();
  initNotes();

  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  document.getElementById('main-content').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
  });
  document.getElementById('unit-back-btn').addEventListener('click', renderDashboard);

  buildSidebar();
  updateHeaderProgress();
  renderDashboard();
});

