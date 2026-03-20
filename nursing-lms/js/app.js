/**
 * Foundations of Nursing — LMS v2
 * Integrated section+question flow, hierarchy sidebar, vibrant theme
 * Includes Developer Mode with change-tour popups
 */

/* ════════════════════════════════════════════════════════════════════════════
   STATE
   ════════════════════════════════════════════════════════════════════════════ */

const STATE_KEY = 'nursing_lms_v2';

let state = { unitProgress: {}, devModeEnabled: false };

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
    const correctMatch = line.match(/^\u2705\s+\*\*Option\s+(\w+)\s*[\u2014\u2013-]/i);
    const incorrectMatch = line.match(/^\u274c\s+\*\*Option\s+(\w+)\s*[\u2014\u2013-]/i);
    const takeawayMatch = line.includes('\uD83D\uDCA1') || line.includes('💡');
    if (correctMatch) {
      flush();
      currentType = 'correct';
      currentId = correctMatch[1];
      const stripped = line.replace(/^\u2705\s+\*\*Option\s+\w+\s*[\u2014\u2013-]\s*Correct:\*\*\s*/i, '').trim();
      currentLines = [stripped];
    } else if (incorrectMatch) {
      flush();
      currentType = 'incorrect';
      currentId = incorrectMatch[1];
      const stripped = line.replace(/^\u274c\s+\*\*Option\s+\w+\s*[\u2014\u2013-]\s*Incorrect:\*\*\s*/i, '').trim();
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
    if (item && item.dataset.distractorMd) showDistractorPopup(item, item.dataset.distractorMd);
  }, true);

  document.addEventListener('mouseleave', e => {
    if (!e.target || typeof e.target.closest !== 'function') return;
    const item = e.target.closest('.option-item.has-distractor');
    if (item) hideDistractorPopup();
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
  if (!rationaleHtml) {
    rationaleHtml = q.explanation
      ? '<div class="md-content">' + renderMarkdown(q.explanation) + '</div>'
      : '<p>See the options above for the correct answer.</p>';
  }

  const hasDistractors = q.options.some(o => !q.correctIds.includes(o.id));

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
        (hasDistractors ? '<p class="distractor-hint-note">\ud83d\udcac Hover over any incorrect option for its rationale.</p>' : '') +
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
   DEVELOPER MODE — change-tour popup system
   ════════════════════════════════════════════════════════════════════════════ */

/**
 * Changelog entries: each entry represents one change in the current iteration.
 * Add new entries at the TOP for the latest iteration.
 * Each entry: { version, date, title, description, highlight }
 *   highlight: optional CSS selector to spotlight in the UI during this step
 */
const DEV_CHANGELOG = [
  {
    version: '2.1',
    date: '2026-03-20',
    title: 'Developer Mode',
    description: 'A new <strong>Developer Mode</strong> toggle has been added to the header. When enabled, this sequential popup tour launches automatically, walking through every change made in the current iteration. Use the Prev / Next buttons to step through changes. Toggle Dev Mode off at any time via the header button.',
    highlight: '#dev-mode-btn'
  },
  {
    version: '2.0',
    date: '2026-03-20',
    title: 'Vibrant Color Scheme',
    description: 'The color palette has been completely overhauled. The old dull blue-grey medical theme has been replaced with a vibrant <strong>indigo/violet + amber + emerald</strong> scheme. The header now uses a gradient, buttons have depth with shadows, and section headers have a two-tone accent border.',
    highlight: '.top-header'
  },
  {
    version: '2.0',
    date: '2026-03-20',
    title: 'Hierarchical Sidebar Navigation',
    description: 'The left sidebar now shows a <strong>collapsible tree</strong> matching the table of contents in the source Notes. Click a unit header to expand it and reveal all its sections. Click any section name to jump directly to that section within the unit.',
    highlight: '.sidebar'
  },
  {
    version: '2.0',
    date: '2026-03-20',
    title: 'Integrated Section + Question Flow',
    description: 'The old separate <em>Review</em> and <em>Quiz</em> phases have been replaced by a single integrated flow. After reading each section, the questions that relate to that section appear <strong>immediately inline</strong> — no more switching between modes. This creates a natural learn-then-practice loop for each sub-topic.',
    highlight: '#unit-content'
  },
  {
    version: '2.0',
    date: '2026-03-20',
    title: 'Multiple Choice Auto-Submit',
    description: 'For standard multiple-choice questions (one correct answer), selecting any option <strong>immediately submits</strong> the answer — no Submit button needed. The Submit button is still shown for <em>Select All That Apply</em> questions so you can check multiple boxes before committing.',
    highlight: '#unit-content'
  },
  {
    version: '2.0',
    date: '2026-03-20',
    title: 'Correct-Answer Rationale Only',
    description: 'After answering a question, the explanation panel now shows <strong>only the rationale for the correct answer</strong>. Distractor rationales are hidden by default to reduce cognitive overload.',
    highlight: '#explanation-container'
  },
  {
    version: '2.0',
    date: '2026-03-20',
    title: 'Distractor Rationale on Hover',
    description: 'Each <strong>incorrect option</strong> now has a hidden rationale that appears in a dark tooltip popup when you hover over it. Move your pointer away and the popup disappears. This keeps the interface clean while still giving access to the full reasoning.',
    highlight: '.option-item.incorrect, .option-item.has-distractor'
  },
  {
    version: '2.0',
    date: '2026-03-20',
    title: 'Source Updated: Notes2.md',
    description: 'The LMS curriculum is now generated from <strong>Notes2.md</strong> instead of Notes.md. Notes2.md contains the same 21 units and 125 questions but with significantly expanded per-option rationales, providing much richer explanations for each answer choice.',
    highlight: null
  }
];

let devTourIndex = 0;
let devHighlightEl = null;

function isDevModeEnabled() { return !!state.devModeEnabled; }

function toggleDevMode() {
  state.devModeEnabled = !state.devModeEnabled;
  saveState();
  updateDevModeButton();
  if (state.devModeEnabled) startDevTour();
  else closeDevTour();
}

function updateDevModeButton() {
  const btn = document.getElementById('dev-mode-btn');
  if (!btn) return;
  const on = isDevModeEnabled();
  btn.textContent = on ? '\uD83D\uDEE0\uFE0F Dev: ON' : '\uD83D\uDEE0\uFE0F Dev: OFF';
  btn.style.background = on ? 'rgba(245,158,11,.85)' : 'rgba(255,255,255,.18)';
  btn.style.color = on ? '#1E293B' : '#fff';
  btn.style.fontWeight = on ? '700' : '500';
}

function startDevTour() {
  devTourIndex = 0;
  renderDevTourPopup();
}

function closeDevTour() {
  const overlay = document.getElementById('dev-tour-overlay');
  if (overlay) overlay.remove();
  removeDevHighlight();
}

function removeDevHighlight() {
  if (devHighlightEl) {
    devHighlightEl.classList.remove('dev-highlight');
    devHighlightEl = null;
  }
}

function renderDevTourPopup() {
  // Remove existing overlay
  const existing = document.getElementById('dev-tour-overlay');
  if (existing) existing.remove();
  removeDevHighlight();

  const entry = DEV_CHANGELOG[devTourIndex];
  const total = DEV_CHANGELOG.length;

  // Highlight target element if specified
  if (entry.highlight) {
    const target = document.querySelector(entry.highlight);
    if (target) {
      devHighlightEl = target;
      target.classList.add('dev-highlight');
    }
  }

  const overlay = document.createElement('div');
  overlay.id = 'dev-tour-overlay';
  overlay.className = 'dev-tour-overlay';
  overlay.innerHTML =
    '<div class="dev-tour-popup">' +
      '<div class="dev-tour-header">' +
        '<span class="dev-tour-badge">v' + entry.version + ' &bull; ' + entry.date + '</span>' +
        '<button class="dev-tour-close" id="dev-tour-close-btn" title="Close tour">&times;</button>' +
      '</div>' +
      '<div class="dev-tour-title">' + (devTourIndex + 1) + ' / ' + total + ' &mdash; ' + entry.title + '</div>' +
      '<div class="dev-tour-desc">' + entry.description + '</div>' +
      '<div class="dev-tour-progress">' +
        DEV_CHANGELOG.map((_, i) =>
          '<div class="dev-tour-dot' + (i === devTourIndex ? ' active' : i < devTourIndex ? ' done' : '') + '"></div>'
        ).join('') +
      '</div>' +
      '<div class="dev-tour-actions">' +
        (devTourIndex > 0
          ? '<button class="btn btn-outline dev-tour-btn" id="dev-tour-prev">&#8592; Prev</button>'
          : '<span></span>') +
        (devTourIndex < total - 1
          ? '<button class="btn btn-primary dev-tour-btn" id="dev-tour-next">Next &#8594;</button>'
          : '<button class="btn btn-success dev-tour-btn" id="dev-tour-done">Done &#10003;</button>') +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  document.getElementById('dev-tour-close-btn').addEventListener('click', () => {
    state.devModeEnabled = false;
    saveState();
    updateDevModeButton();
    closeDevTour();
  });
  document.getElementById('dev-tour-prev')?.addEventListener('click', () => {
    devTourIndex--;
    renderDevTourPopup();
  });
  document.getElementById('dev-tour-next')?.addEventListener('click', () => {
    devTourIndex++;
    renderDevTourPopup();
  });
  document.getElementById('dev-tour-done')?.addEventListener('click', () => {
    closeDevTour();
    // Keep dev mode on but close the tour
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   RESET
   ════════════════════════════════════════════════════════════════════════════ */

function resetAllProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  const devMode = state.devModeEnabled;
  state = { unitProgress: {}, devModeEnabled: devMode };
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

  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  document.getElementById('main-content').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
  });
  document.getElementById('unit-back-btn').addEventListener('click', renderDashboard);
  document.getElementById('dev-mode-btn').addEventListener('click', toggleDevMode);

  buildSidebar();
  updateHeaderProgress();
  updateDevModeButton();
  renderDashboard();

  // Auto-launch tour if dev mode was previously enabled
  if (isDevModeEnabled()) startDevTour();
});
