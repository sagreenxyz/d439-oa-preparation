/**
 * Foundations of Nursing — LMS Application
 * Single-page learning management system built from Notes.md
 */

/* ════════════════════════════════════════════════════════════════════════════
   STATE
   ════════════════════════════════════════════════════════════════════════════ */

const STATE_KEY = 'nursing_lms_v1';

let state = {
  // { unitId: { reviewDone, quizScore, quizTotal, quizAnswers } }
  unitProgress: {}
};

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) state = JSON.parse(raw);
  } catch (_) { /* ignore */ }
}

function saveState() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {}
}

function getUnitProgress(unitId) {
  if (!state.unitProgress[unitId]) {
    state.unitProgress[unitId] = {
      reviewDone: false,
      quizScore: null,
      quizTotal: null,
      quizAnswers: []
    };
  }
  return state.unitProgress[unitId];
}

/* ════════════════════════════════════════════════════════════════════════════
   MARKED CONFIGURATION
   ════════════════════════════════════════════════════════════════════════════ */

function renderMarkdown(md) {
  if (window.marked) {
    return window.marked.parse(md);
  }
  // Fallback: lightweight markdown-to-HTML conversion (no marked library)
  console.warn('marked.js not loaded — using built-in markdown fallback');
  return mdFallback(md);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Minimal markdown renderer used as a fallback when marked.js is unavailable.
 * Handles: headings, tables, blockquotes, bold/italic, lists, hr, paragraphs.
 */
function mdFallback(md) {
  const lines = md.split('\n');
  let html = '';
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      html += `<h${level}>${inlineFormat(headingMatch[2])}</h${level}>\n`;
      i++; continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      html += '<hr>\n'; i++; continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      html += `<blockquote><p>${inlineFormat(line.slice(2))}</p></blockquote>\n`;
      i++; continue;
    }

    // Table (line starts with |)
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]); i++;
      }
      if (tableLines.length >= 2) {
        const headers = tableLines[0].split('|').slice(1, -1).map(c => c.trim());
        // tableLines[1] is separator
        const rows = tableLines.slice(2);
        html += '<table><thead><tr>' +
          headers.map(h => `<th>${inlineFormat(h)}</th>`).join('') +
          '</tr></thead><tbody>';
        rows.forEach(r => {
          const cells = r.split('|').slice(1, -1).map(c => c.trim());
          html += '<tr>' + cells.map(c => `<td>${inlineFormat(c)}</td>`).join('') + '</tr>';
        });
        html += '</tbody></table>\n';
      }
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      html += '<ul>';
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        html += `<li>${inlineFormat(lines[i].slice(2))}</li>`;
        i++;
      }
      html += '</ul>\n'; continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      html += '<ol>';
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        html += `<li>${inlineFormat(lines[i].replace(/^\d+\.\s/, ''))}</li>`;
        i++;
      }
      html += '</ol>\n'; continue;
    }

    // Empty line
    if (line.trim() === '') { i++; continue; }

    // Paragraph
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

function getUnit(id) {
  return CURRICULUM.units.find(u => u.id === id);
}

function getUnitQuestions(unitId) {
  return CURRICULUM.questions.filter(q => q.unitId === unitId);
}

function totalUnits() { return CURRICULUM.units.length; }

function completedUnitsCount() {
  return CURRICULUM.units.filter(u => {
    const p = state.unitProgress[u.id];
    return p && p.quizScore !== null;
  }).length;
}

function overallProgress() {
  // Each unit = review half + quiz half
  let score = 0;
  let total = totalUnits() * 2;
  CURRICULUM.units.forEach(u => {
    const p = state.unitProgress[u.id];
    if (p) {
      if (p.reviewDone) score++;
      if (p.quizScore !== null) score++;
    }
  });
  return total === 0 ? 0 : Math.round((score / total) * 100);
}

/* ════════════════════════════════════════════════════════════════════════════
   ROUTER / VIEW MANAGEMENT
   ════════════════════════════════════════════════════════════════════════════ */

const views = {};

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(`view-${name}`);
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════════════════════════════════════════════
   SIDEBAR
   ════════════════════════════════════════════════════════════════════════════ */

function buildSidebar() {
  const list = document.getElementById('sidebar-unit-list');
  list.innerHTML = '';

  CURRICULUM.units.forEach(unit => {
    const prog = state.unitProgress[unit.id];
    const isComplete = prog && prog.quizScore !== null;
    const inProgress = prog && (prog.reviewDone || prog.quizAnswers.length > 0) && !isComplete;

    const item = document.createElement('div');
    item.className = `sidebar-unit${isComplete ? ' completed' : ''}${inProgress ? ' in-progress' : ''}`;
    item.dataset.unitId = unit.id;
    item.innerHTML = `
      <div class="unit-num">${unit.id}</div>
      <div class="unit-label">Unit ${unit.id}: ${unit.title}</div>
      <div class="unit-status-icon">${isComplete ? '✓' : ''}</div>
    `;
    item.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-unit').forEach(s => s.classList.remove('active'));
      item.classList.add('active');
      navigateToUnit(unit.id);
      // Close mobile sidebar
      document.getElementById('sidebar').classList.remove('open');
    });
    list.appendChild(item);
  });
}

function highlightSidebarUnit(unitId) {
  document.querySelectorAll('.sidebar-unit').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.unitId) === unitId);
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
  highlightSidebarUnit(null);

  const grid = document.getElementById('units-grid');
  grid.innerHTML = '';

  CURRICULUM.units.forEach(unit => {
    const prog = state.unitProgress[unit.id];
    const isComplete = prog && prog.quizScore !== null;
    const inProgress = prog && (prog.reviewDone || prog.quizAnswers.length > 0) && !isComplete;
    const questions = getUnitQuestions(unit.id);
    const statusText = isComplete ? 'Completed ✓' : inProgress ? 'In Progress' : 'Not Started';
    const quizPct = isComplete ? Math.round((prog.quizScore / prog.quizTotal) * 100) : (inProgress ? 30 : 0);

    const card = document.createElement('div');
    card.className = `unit-card${isComplete ? ' completed' : ''}${inProgress ? ' in-progress' : ''}`;
    card.innerHTML = `
      <div class="unit-card-header">
        <div class="unit-card-num">${unit.id}</div>
        <div class="unit-card-status">${statusText}</div>
      </div>
      <h3>Unit ${unit.id}: ${unit.title}</h3>
      <p>${unit.sections.length} sections · ${questions.length} questions</p>
      ${isComplete ? `<p style="font-size:.75rem;color:var(--success);font-weight:600">Score: ${prog.quizScore}/${prog.quizTotal} (${Math.round(prog.quizScore/prog.quizTotal*100)}%)</p>` : ''}
      <div class="unit-card-mini-prog">
        <div class="unit-card-mini-prog-fill" style="width:${quizPct}%"></div>
      </div>
    `;
    card.addEventListener('click', () => navigateToUnit(unit.id));
    grid.appendChild(card);
  });

  showView('dashboard');
}

/* ════════════════════════════════════════════════════════════════════════════
   UNIT NAVIGATION ENTRY POINT
   ════════════════════════════════════════════════════════════════════════════ */

function navigateToUnit(unitId) {
  const prog = getUnitProgress(unitId);
  if (!prog.reviewDone) {
    startReview(unitId);
  } else if (prog.quizScore === null) {
    startQuiz(unitId);
  } else {
    showUnitComplete(unitId);
  }
}

/* ════════════════════════════════════════════════════════════════════════════
   REVIEW VIEW
   ════════════════════════════════════════════════════════════════════════════ */

let reviewState = { unitId: null, sectionIdx: 0 };

function startReview(unitId) {
  reviewState = { unitId, sectionIdx: 0 };
  renderReviewSection();
  highlightSidebarUnit(unitId);
  showView('review');
}

function renderReviewSection() {
  const { unitId, sectionIdx } = reviewState;
  const unit = getUnit(unitId);
  const section = unit.sections[sectionIdx];
  const totalSections = unit.sections.length;
  const isLast = sectionIdx === totalSections - 1;

  // Breadcrumb
  document.getElementById('review-breadcrumb').textContent =
    `Foundations of Nursing › Unit ${unitId}`;

  // Title
  document.getElementById('review-unit-title').textContent =
    `Unit ${unitId}: ${unit.title}`;

  document.getElementById('review-unit-subtitle').textContent =
    `Review Material — Section ${sectionIdx + 1} of ${totalSections}`;

  // Section steps indicator
  const steps = document.getElementById('section-steps');
  steps.innerHTML = '';
  for (let i = 0; i < totalSections; i++) {
    const dot = document.createElement('div');
    dot.className = `section-step${i < sectionIdx ? ' done' : ''}${i === sectionIdx ? ' active' : ''}`;
    steps.appendChild(dot);
  }

  // Content
  document.getElementById('review-section-badge').textContent = `Section ${section.id}`;
  document.getElementById('review-section-title').textContent = section.title;
  document.getElementById('review-section-content').innerHTML =
    `<div class="md-content">${renderMarkdown(section.content)}</div>`;

  // Buttons
  const prevBtn = document.getElementById('review-prev-btn');
  const nextBtn = document.getElementById('review-next-btn');

  prevBtn.style.display = sectionIdx === 0 ? 'none' : 'inline-flex';
  prevBtn.onclick = () => {
    reviewState.sectionIdx--;
    renderReviewSection();
  };

  if (isLast) {
    nextBtn.innerHTML = 'Start Quiz <span>→</span>';
    nextBtn.className = 'btn btn-success btn-lg';
    nextBtn.onclick = () => finishReview();
  } else {
    nextBtn.innerHTML = 'Next Section <span>→</span>';
    nextBtn.className = 'btn btn-primary btn-lg';
    nextBtn.onclick = () => {
      reviewState.sectionIdx++;
      renderReviewSection();
    };
  }
}

function finishReview() {
  const { unitId } = reviewState;
  const prog = getUnitProgress(unitId);
  prog.reviewDone = true;
  saveState();
  buildSidebar();
  updateHeaderProgress();
  startQuiz(unitId);
}

/* ════════════════════════════════════════════════════════════════════════════
   QUIZ VIEW
   ════════════════════════════════════════════════════════════════════════════ */

let quizState = {
  unitId: null,
  questions: [],
  currentIdx: 0,
  answers: [],         // [ {questionId, selectedIds, correct} ]
  answered: false,
  selectedIds: []
};

function startQuiz(unitId) {
  const questions = getUnitQuestions(unitId);
  quizState = {
    unitId,
    questions,
    currentIdx: 0,
    answers: [],
    answered: false,
    selectedIds: []
  };
  renderQuizQuestion();
  highlightSidebarUnit(unitId);
  showView('quiz');
}

function renderQuizQuestion() {
  const { questions, currentIdx, unitId } = quizState;
  const unit = getUnit(unitId);
  const q = questions[currentIdx];
  const total = questions.length;

  quizState.answered = false;
  quizState.selectedIds = [];

  // Progress
  const pct = Math.round((currentIdx / total) * 100);
  document.getElementById('quiz-prog-fill').style.width = pct + '%';

  // Breadcrumb
  document.getElementById('quiz-breadcrumb').textContent =
    `Unit ${unitId}: ${unit.title}`;

  // Header
  document.getElementById('quiz-unit-subtitle').textContent =
    `Quiz — Question ${currentIdx + 1} of ${total}`;

  // Meta badges
  const metaEl = document.getElementById('quiz-question-meta');
  metaEl.innerHTML = `
    <span class="badge">${q.concept}</span>
    ${q.isSATA ? '<span class="badge badge-sata">Select All That Apply</span>' : ''}
  `;

  document.getElementById('quiz-question-num').textContent =
    `Question ${q.id}`;

  document.getElementById('quiz-question-text').textContent =
    q.questionText || `Refer to the scenario: ${q.title}`;

  // Options
  const optList = document.getElementById('quiz-options-list');
  optList.className = `options-list${q.isSATA ? ' sata' : ''}`;
  optList.innerHTML = '';

  q.options.forEach(opt => {
    const li = document.createElement('li');
    li.className = 'option-item';
    li.dataset.optId = opt.id;
    li.innerHTML = `
      <div class="option-marker">${opt.id}</div>
      <div class="option-text">${opt.text}</div>
    `;
    li.addEventListener('click', () => handleOptionClick(li, opt.id, q.isSATA));
    optList.appendChild(li);
  });

  // Actions
  const actionsEl = document.getElementById('quiz-actions');
  actionsEl.innerHTML = `
    <button class="btn btn-primary btn-lg" id="quiz-submit-btn" disabled>
      Submit Answer
    </button>
  `;
  document.getElementById('quiz-submit-btn').addEventListener('click', submitAnswer);

  // Hide explanation
  document.getElementById('explanation-container').innerHTML = '';
}

function handleOptionClick(li, optId, isSATA) {
  if (quizState.answered) return;

  if (isSATA) {
    // Toggle selection
    const idx = quizState.selectedIds.indexOf(optId);
    if (idx === -1) {
      quizState.selectedIds.push(optId);
      li.classList.add('selected');
      li.querySelector('.option-marker').textContent = '✓';
    } else {
      quizState.selectedIds.splice(idx, 1);
      li.classList.remove('selected');
      li.querySelector('.option-marker').textContent = optId;
    }
  } else {
    // Single select
    document.querySelectorAll('#quiz-options-list .option-item').forEach(item => {
      item.classList.remove('selected');
      item.querySelector('.option-marker').textContent = item.dataset.optId;
    });
    quizState.selectedIds = [optId];
    li.classList.add('selected');
    li.querySelector('.option-marker').textContent = '●';
  }

  // Enable submit if something selected
  const submitBtn = document.getElementById('quiz-submit-btn');
  if (submitBtn) submitBtn.disabled = quizState.selectedIds.length === 0;
}

function submitAnswer() {
  const { questions, currentIdx, selectedIds } = quizState;
  const q = questions[currentIdx];
  quizState.answered = true;

  // Determine correctness
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

  // Record answer
  quizState.answers.push({
    questionId: q.id,
    selectedIds: [...selectedIds],
    correctIds: correctIds,
    isCorrect
  });

  // Style options
  document.querySelectorAll('#quiz-options-list .option-item').forEach(item => {
    const optId = item.dataset.optId;
    item.classList.add('disabled');
    const wasSelected = selectedIds.includes(optId);
    const isActuallyCorrect = correctIds.includes(optId);

    if (wasSelected && isActuallyCorrect) {
      item.classList.add('correct');
      item.querySelector('.option-marker').textContent = '✓';
      item.innerHTML += '<span class="option-result-icon">✅</span>';
    } else if (wasSelected && !isActuallyCorrect) {
      item.classList.add('incorrect');
      item.innerHTML += '<span class="option-result-icon">❌</span>';
    } else if (!wasSelected && isActuallyCorrect) {
      item.classList.add('missed');
      item.querySelector('.option-marker').textContent = '✓';
      item.innerHTML += '<span class="option-result-icon">💡</span>';
    }
  });

  // Show explanation
  showExplanation(q, isCorrect, isPartial);

  // Update action buttons
  const actionsEl = document.getElementById('quiz-actions');
  const isLast = currentIdx === questions.length - 1;

  actionsEl.innerHTML = `
    <button class="btn btn-primary btn-lg" id="quiz-next-btn">
      ${isLast ? 'See Results' : 'Next Question'} <span>→</span>
    </button>
  `;
  document.getElementById('quiz-next-btn').addEventListener('click', nextQuestion);
}

function showExplanation(q, isCorrect, isPartial) {
  const container = document.getElementById('explanation-container');
  let headerClass, headerIcon, headerText;

  if (isCorrect) {
    headerClass = 'correct-header';
    headerIcon = '✅';
    headerText = 'Correct!';
  } else if (isPartial) {
    headerClass = 'partial-header';
    headerIcon = '⚠️';
    headerText = 'Partially Correct — Review the Rationale';
  } else {
    headerClass = 'incorrect-header';
    headerIcon = '❌';
    headerText = 'Incorrect — Study the Rationale';
  }

  const explanationHtml = q.explanation
    ? renderMarkdown(q.explanation)
    : '<p>See the options above for the correct answer.</p>';

  container.innerHTML = `
    <div class="explanation-card">
      <div class="explanation-card-header ${headerClass}">
        <span>${headerIcon}</span> ${headerText}
      </div>
      <div class="explanation-body">
        <p class="correct-answer-line">Correct answer${q.correctIds.length > 1 ? 's' : ''}: <strong>${q.correctAnswerText}</strong></p>
        ${explanationHtml}
      </div>
    </div>
  `;
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextQuestion() {
  quizState.currentIdx++;
  if (quizState.currentIdx >= quizState.questions.length) {
    finishQuiz();
  } else {
    renderQuizQuestion();
    document.getElementById('view-quiz').scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function finishQuiz() {
  const { unitId, answers } = quizState;
  const correct = answers.filter(a => a.isCorrect).length;
  const total = answers.length;

  // Save progress
  const prog = getUnitProgress(unitId);
  prog.quizScore = correct;
  prog.quizTotal = total;
  prog.quizAnswers = answers;
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
  const score = prog.quizScore;
  const total = prog.quizTotal;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  highlightSidebarUnit(unitId);

  let icon, scoreClass;
  if (pct === 100) { icon = '🏆'; scoreClass = 'perfect'; }
  else if (pct >= 80) { icon = '🎉'; scoreClass = ''; }
  else if (pct >= 60) { icon = '📚'; scoreClass = ''; }
  else { icon = '🔄'; scoreClass = 'needs-work'; }

  const nextUnit = CURRICULUM.units.find(u => u.id === unitId + 1);

  document.getElementById('complete-container').innerHTML = `
    <div class="complete-card">
      <div class="complete-icon">${icon}</div>
      <h2>Unit ${unitId} Complete!</h2>
      <p class="text-muted">Unit ${unitId}: ${unit.title}</p>
      <div class="score-display ${scoreClass}">${pct}%</div>
      <p class="score-label">Quiz Score</p>
      <div class="score-breakdown">
        <div class="score-breakdown-item">
          <div class="sbi-num" style="color:var(--success)">${score}</div>
          <div class="sbi-lbl">Correct</div>
        </div>
        <div class="score-breakdown-item">
          <div class="sbi-num" style="color:var(--danger)">${total - score}</div>
          <div class="sbi-lbl">Incorrect</div>
        </div>
        <div class="score-breakdown-item">
          <div class="sbi-num">${total}</div>
          <div class="sbi-lbl">Total</div>
        </div>
      </div>
      <div class="complete-actions">
        <button class="btn btn-outline" onclick="retryQuiz(${unitId})">
          ↺ Retake Quiz
        </button>
        ${nextUnit
          ? `<button class="btn btn-primary btn-lg" onclick="navigateToUnit(${nextUnit.id})">
               Next Unit: ${nextUnit.title} →
             </button>`
          : `<button class="btn btn-success btn-lg" onclick="renderDashboard()">
               🏁 Course Complete! View Dashboard
             </button>`
        }
      </div>
      <div class="mt-4">
        <button class="btn btn-outline" onclick="renderDashboard()" style="width:100%">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  `;

  showView('complete');
}

function retryQuiz(unitId) {
  const prog = getUnitProgress(unitId);
  prog.quizScore = null;
  prog.quizTotal = null;
  prog.quizAnswers = [];
  saveState();
  buildSidebar();
  updateHeaderProgress();
  startQuiz(unitId);
}

/* ════════════════════════════════════════════════════════════════════════════
   RESET
   ════════════════════════════════════════════════════════════════════════════ */

function resetAllProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  state = { unitProgress: {} };
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

  // Mobile menu
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Click outside sidebar to close on mobile
  document.getElementById('main-content').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
  });

  // Back-to-dashboard buttons
  document.getElementById('review-back-btn').addEventListener('click', renderDashboard);
  document.getElementById('quiz-back-btn').addEventListener('click', renderDashboard);

  buildSidebar();
  updateHeaderProgress();
  renderDashboard();
});
