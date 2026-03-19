(function () {
  const STORAGE_KEY = "d439-nursing-quiz-progress";
  const QUESTIONS = Array.isArray(window.QUIZ_QUESTIONS) ? window.QUIZ_QUESTIONS : [];

  const state = {
    topic: "",
    subtopic: "",
    mode: "subtopic",
    queue: [],
    currentIndex: 0,
    selectedAnswers: [],
    answered: false,
    sessionResults: [],
    progress: loadProgress(),
  };

  const homeView = document.getElementById("homeView");
  const quizView = document.getElementById("quizView");
  const summaryView = document.getElementById("summaryView");
  const resetProgressButton = document.getElementById("resetProgressButton");

  const catalog = buildCatalog(QUESTIONS);

  resetProgressButton.addEventListener("click", () => {
    if (!window.confirm("Reset all spaced-repetition history and review scheduling?")) {
      return;
    }
    state.progress = {};
    persistProgress();
    renderHome();
  });

  renderHome();

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function persistProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  }

  function buildCatalog(items) {
    const topics = new Map();

    for (const item of items) {
      if (!topics.has(item.topic)) {
        topics.set(item.topic, new Map());
      }
      const subtopics = topics.get(item.topic);
      if (!subtopics.has(item.subtopic)) {
        subtopics.set(item.subtopic, []);
      }
      subtopics.get(item.subtopic).push(item);
    }

    return Array.from(topics.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([topic, subtopics]) => ({
        topic,
        subtopics: Array.from(subtopics.entries())
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([subtopic, questions]) => ({
            subtopic,
            questions: questions.sort((a, b) => a.sourceOrder - b.sourceOrder),
          })),
      }));
  }

  function getDueQuestions() {
    const now = Date.now();
    return QUESTIONS.filter((question) => {
      const entry = state.progress[question.id];
      return entry && entry.dueAt && entry.dueAt <= now;
    });
  }

  function getReviewStats() {
    const now = Date.now();
    let due = 0;
    let mastered = 0;
    let seen = 0;

    for (const question of QUESTIONS) {
      const entry = state.progress[question.id];
      if (!entry) {
        continue;
      }
      seen += 1;
      if ((entry.repetitions || 0) >= 3) {
        mastered += 1;
      }
      if ((entry.dueAt || 0) <= now) {
        due += 1;
      }
    }

    return { due, mastered, seen };
  }

  function renderHome() {
    const stats = getReviewStats();
    const defaultTopic = state.topic || (catalog[0] ? catalog[0].topic : "");
    if (!state.topic && defaultTopic) {
      state.topic = defaultTopic;
    }
    const topicEntry = catalog.find((entry) => entry.topic === state.topic) || catalog[0];
    const availableSubtopics = topicEntry ? topicEntry.subtopics : [];
    const defaultSubtopic = state.subtopic || (availableSubtopics[0] ? availableSubtopics[0].subtopic : "");
    if (!state.subtopic && defaultSubtopic) {
      state.subtopic = defaultSubtopic;
    }

    setActiveView(homeView);

    homeView.innerHTML = `
      <div class="hero-grid">
        <article class="panel hero-card">
          <h2>Study one lane at a time</h2>
          <p class="hero-copy">Pick a topic, narrow it to a subtopic, and move from the first question to the last with immediate answer review. When you finish each item, rate how well you knew it and the app will schedule it for spaced repetition.</p>
          <div class="stats-grid">
            <div class="stat-tile">
              <span class="stat-label">Questions</span>
              <span class="stat-value">${QUESTIONS.length}</span>
            </div>
            <div class="stat-tile">
              <span class="stat-label">Due Today</span>
              <span class="stat-value">${stats.due}</span>
            </div>
            <div class="stat-tile">
              <span class="stat-label">Mastered</span>
              <span class="stat-value">${stats.mastered}</span>
            </div>
          </div>
        </article>

        <aside class="panel side-card">
          <div>
            <h3>Review Queue</h3>
            <p class="muted">Due cards are pulled from local study history stored in this browser.</p>
          </div>
          <div class="metric-box">
            <span class="stat-label">Cards with history</span>
            <strong>${stats.seen}</strong>
          </div>
          <button class="primary-button" type="button" ${stats.due ? "" : "disabled"} id="startReviewButton">Start Due Review</button>
        </aside>
      </div>

      <div class="panel hero-card" style="margin-top: 20px;">
        <div class="picker-stack">
          <div class="picker-group">
            <h3>1. Choose a topic</h3>
            <div class="chip-grid" id="topicChips"></div>
          </div>

          <div class="picker-group">
            <h3>2. Choose a subtopic</h3>
            <div class="chip-grid" id="subtopicChips"></div>
          </div>

          <div class="mode-group">
            <h3>3. Choose study flow</h3>
            <div class="mode-grid" id="modeCards"></div>
          </div>

          <div class="button-row">
            <button class="primary-button" type="button" id="startSelectedButton">Start Session</button>
          </div>
        </div>
      </div>
    `;

    const topicChips = document.getElementById("topicChips");
    const subtopicChips = document.getElementById("subtopicChips");
    const modeCards = document.getElementById("modeCards");

    for (const entry of catalog) {
      topicChips.appendChild(makeChip(entry.topic, entry.topic === state.topic, () => {
        state.topic = entry.topic;
        state.subtopic = entry.subtopics[0] ? entry.subtopics[0].subtopic : "";
        renderHome();
      }));
    }

    const currentTopic = catalog.find((entry) => entry.topic === state.topic) || catalog[0];
    const currentSubtopics = currentTopic ? currentTopic.subtopics : [];
    for (const entry of currentSubtopics) {
      subtopicChips.appendChild(makeChip(`${entry.subtopic} · ${entry.questions.length}`, entry.subtopic === state.subtopic, () => {
        state.subtopic = entry.subtopic;
        renderHome();
      }));
    }

    const modes = [
      {
        key: "subtopic",
        title: "Subtopic Run",
        text: "Study one subtopic from beginning to end.",
      },
      {
        key: "topic",
        title: "Whole Topic",
        text: "Study all subtopics inside the chosen topic in sequence.",
      },
    ];

    for (const mode of modes) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `mode-card${state.mode === mode.key ? " active" : ""}`;
      button.innerHTML = `<strong>${mode.title}</strong><p>${mode.text}</p>`;
      button.addEventListener("click", () => {
        state.mode = mode.key;
        renderHome();
      });
      modeCards.appendChild(button);
    }

    document.getElementById("startSelectedButton").addEventListener("click", () => {
      startChosenSession();
    });

    document.getElementById("startReviewButton").addEventListener("click", () => {
      const dueQuestions = getDueQuestions().sort((a, b) => (state.progress[a.id]?.dueAt || 0) - (state.progress[b.id]?.dueAt || 0));
      startSession(dueQuestions, {
        title: "Due Review",
        subtitle: `${dueQuestions.length} scheduled question${dueQuestions.length === 1 ? "" : "s"}`,
        modeLabel: "Spaced repetition",
      });
    });
  }

  function makeChip(label, active, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${active ? " active" : ""}`;
    button.textContent = label;
    button.addEventListener("click", handler);
    return button;
  }

  function startChosenSession() {
    const topicEntry = catalog.find((entry) => entry.topic === state.topic);
    if (!topicEntry) {
      return;
    }

    let queue = [];
    let subtitle = "";
    if (state.mode === "topic") {
      queue = topicEntry.subtopics.flatMap((entry) => entry.questions);
      subtitle = topicEntry.subtopics.map((entry) => entry.subtopic).join(" · ");
    } else {
      const subtopicEntry = topicEntry.subtopics.find((entry) => entry.subtopic === state.subtopic) || topicEntry.subtopics[0];
      queue = subtopicEntry ? subtopicEntry.questions : [];
      subtitle = subtopicEntry ? subtopicEntry.subtopic : "";
    }

    startSession(queue, {
      title: state.topic,
      subtitle,
      modeLabel: state.mode === "topic" ? "Whole topic" : "Subtopic run",
    });
  }

  function startSession(queue, meta) {
    state.queue = queue.slice();
    state.currentIndex = 0;
    state.selectedAnswers = [];
    state.answered = false;
    state.sessionResults = [];
    state.sessionMeta = meta;

    if (!state.queue.length) {
      window.alert("No questions matched that selection.");
      return;
    }

    renderQuiz();
  }

  function renderQuiz() {
    const question = state.queue[state.currentIndex];
    const progressPercent = ((state.currentIndex + 1) / state.queue.length) * 100;
    const reviewEntry = state.progress[question.id];
    const dueLabel = reviewEntry && reviewEntry.dueAt ? formatDueLabel(reviewEntry.dueAt) : "New card";

    setActiveView(quizView);

    quizView.innerHTML = `
      <div class="quiz-layout">
        <article class="panel quiz-card">
          <div class="quiz-meta">
            <span>${state.currentIndex + 1} of ${state.queue.length}</span>
            <span>${state.sessionMeta.modeLabel}</span>
          </div>
          <div class="progress-shell"><div class="progress-bar" style="width:${progressPercent}%"></div></div>

          <div class="quiz-badges">
            <div class="info-pill"><strong>Topic</strong>${question.topic}</div>
            <div class="info-pill"><strong>Subtopic</strong>${question.subtopic}</div>
            <div class="info-pill"><strong>Review</strong>${dueLabel}</div>
          </div>

          <h2 class="quiz-question">${escapeHtml(question.question)}</h2>
          <div class="answer-list" id="answerList"></div>
          <div class="button-row" id="actionRow"></div>
          <div id="feedbackMount"></div>
        </article>

        <aside class="panel side-card">
          <div>
            <h3>Session</h3>
            <p class="muted">${escapeHtml(state.sessionMeta.title)}</p>
            <p class="muted">${escapeHtml(state.sessionMeta.subtitle)}</p>
          </div>
          <div class="metric-box">
            <span class="stat-label">Correct so far</span>
            <strong>${state.sessionResults.filter((result) => result.isCorrect).length}</strong>
          </div>
          <div class="metric-box">
            <span class="stat-label">Answered</span>
            <strong>${state.sessionResults.length}</strong>
          </div>
          <div class="metric-box">
            <span class="stat-label">Remaining</span>
            <strong>${state.queue.length - state.currentIndex - (state.answered ? 1 : 0)}</strong>
          </div>
          <button class="ghost-button" type="button" id="quitSessionButton">Back to Home</button>
        </aside>
      </div>
    `;

    const answerList = document.getElementById("answerList");
    for (const option of question.options) {
      const selected = state.selectedAnswers.includes(option);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `answer-card${selected ? " selected" : ""}`;
      button.innerHTML = `
        <span class="answer-indicator">${question.type === "multi" ? (selected ? "✓" : "+") : selected ? "●" : "○"}</span>
        <span>${escapeHtml(option)}</span>
      `;
      button.disabled = state.answered;
      button.addEventListener("click", () => toggleAnswer(option));
      answerList.appendChild(button);
    }

    const actionRow = document.getElementById("actionRow");
    if (!state.answered) {
      const submitButton = document.createElement("button");
      submitButton.type = "button";
      submitButton.className = "primary-button";
      submitButton.textContent = question.type === "multi" ? "Check Answers" : "Check Answer";
      submitButton.disabled = !state.selectedAnswers.length;
      submitButton.addEventListener("click", submitCurrentAnswer);
      actionRow.appendChild(submitButton);
    } else {
      renderFeedback(question);
    }

    document.getElementById("quitSessionButton").addEventListener("click", () => {
      if (window.confirm("Leave this session and go back to the home screen?")) {
        renderHome();
      }
    });
  }

  function toggleAnswer(option) {
    const question = state.queue[state.currentIndex];
    if (question.type === "single") {
      state.selectedAnswers = [option];
    } else if (state.selectedAnswers.includes(option)) {
      state.selectedAnswers = state.selectedAnswers.filter((item) => item !== option);
    } else {
      state.selectedAnswers = [...state.selectedAnswers, option];
    }
    renderQuiz();
  }

  function submitCurrentAnswer() {
    const question = state.queue[state.currentIndex];
    const selected = [...state.selectedAnswers].sort();
    const correct = [...question.correctAnswers].sort();
    const isCorrect = selected.length === correct.length && selected.every((value, index) => value === correct[index]);

    state.answered = true;
    state.sessionResults.push({ questionId: question.id, isCorrect });
    renderQuiz();
  }

  function renderFeedback(question) {
    const feedbackMount = document.getElementById("feedbackMount");
    const selected = state.selectedAnswers;
    const isCorrect = selected.length === question.correctAnswers.length && selected.every((item) => question.correctAnswers.includes(item));

    const answerCards = Array.from(document.querySelectorAll(".answer-card"));
    answerCards.forEach((card, index) => {
      const option = question.options[index];
      card.classList.remove("selected");
      if (question.correctAnswers.includes(option)) {
        card.classList.add("correct");
      } else if (selected.includes(option)) {
        card.classList.add("incorrect");
      }
    });

    feedbackMount.innerHTML = `
      <div class="feedback-panel ${isCorrect ? "correct" : "incorrect"}">
        <h3>${isCorrect ? "Correct" : "Review this one"}</h3>
        <p>${escapeHtml(question.explanation)}</p>
        <ul class="correct-list">
          ${question.correctAnswers.map((answer) => `<li>${escapeHtml(answer)}</li>`).join("")}
        </ul>
        <div class="rating-row">
          ${renderRatingButton("again", "Again")}
          ${renderRatingButton("hard", "Hard")}
          ${renderRatingButton("good", "Good")}
          ${renderRatingButton("easy", "Easy")}
        </div>
      </div>
    `;

    for (const button of feedbackMount.querySelectorAll(".rating-button")) {
      button.addEventListener("click", () => {
        applySpacedRepetition(question.id, button.dataset.rating, isCorrect);
        advanceSession();
      });
    }
  }

  function renderRatingButton(key, label) {
    return `<button class="rating-button" data-rating="${key}" type="button">${label}</button>`;
  }

  function applySpacedRepetition(questionId, rating, answeredCorrectly) {
    const entry = state.progress[questionId] || {
      repetitions: 0,
      intervalDays: 0,
      ease: 2.5,
    };

    const now = Date.now();
    const ratingMap = {
      again: { days: 1 / 24, easeDelta: -0.2, reset: true },
      hard: { days: Math.max(1, entry.intervalDays || 1), easeDelta: -0.1 },
      good: { days: entry.repetitions <= 1 ? 1 : Math.max(2, Math.round((entry.intervalDays || 1) * entry.ease)), easeDelta: 0 },
      easy: { days: entry.repetitions <= 1 ? 3 : Math.max(4, Math.round((entry.intervalDays || 2) * (entry.ease + 0.35))), easeDelta: 0.15 },
    };

    const config = ratingMap[rating];
    const nextEase = Math.max(1.3, (entry.ease || 2.5) + config.easeDelta);
    const repetitions = config.reset ? 0 : (entry.repetitions || 0) + (answeredCorrectly ? 1 : 0);

    state.progress[questionId] = {
      repetitions,
      intervalDays: config.days,
      ease: nextEase,
      dueAt: now + config.days * 24 * 60 * 60 * 1000,
      lastRatedAt: now,
      lastRating: rating,
      lastAnsweredCorrectly: answeredCorrectly,
    };

    persistProgress();
  }

  function advanceSession() {
    state.selectedAnswers = [];
    state.answered = false;
    state.currentIndex += 1;

    if (state.currentIndex >= state.queue.length) {
      renderSummary();
      return;
    }

    renderQuiz();
  }

  function renderSummary() {
    const correct = state.sessionResults.filter((result) => result.isCorrect).length;
    const accuracy = Math.round((correct / state.sessionResults.length) * 100) || 0;
    const bySubtopic = summarizeBySubtopic();

    setActiveView(summaryView);
    summaryView.innerHTML = `
      <div class="summary-grid">
        <article class="panel summary-card">
          <h2>Session complete</h2>
          <p class="summary-copy">${escapeHtml(state.sessionMeta.title)} · ${escapeHtml(state.sessionMeta.modeLabel)}</p>
          <div class="stats-grid">
            <div class="stat-tile">
              <span class="stat-label">Questions</span>
              <span class="stat-value">${state.queue.length}</span>
            </div>
            <div class="stat-tile">
              <span class="stat-label">Correct</span>
              <span class="stat-value">${correct}</span>
            </div>
            <div class="stat-tile">
              <span class="stat-label">Accuracy</span>
              <span class="stat-value">${accuracy}%</span>
            </div>
          </div>
          <div class="button-row">
            <button class="primary-button" id="restartSessionButton" type="button">Run Again</button>
            <button class="secondary-button" id="homeFromSummaryButton" type="button">Back to Home</button>
          </div>
        </article>

        <aside class="panel side-card">
          <h3>Subtopic breakdown</h3>
          <div class="summary-list">
            ${bySubtopic.map((item) => `
              <div class="summary-item">
                <strong>${escapeHtml(item.label)}</strong>
                <span class="muted">${item.correct}/${item.total} correct</span>
              </div>
            `).join("")}
          </div>
        </aside>
      </div>
    `;

    document.getElementById("restartSessionButton").addEventListener("click", () => {
      startSession(state.queue, state.sessionMeta);
    });
    document.getElementById("homeFromSummaryButton").addEventListener("click", renderHome);
  }

  function summarizeBySubtopic() {
    const stats = new Map();
    state.queue.forEach((question) => {
      if (!stats.has(question.subtopic)) {
        stats.set(question.subtopic, { label: question.subtopic, total: 0, correct: 0 });
      }
      stats.get(question.subtopic).total += 1;
    });
    state.sessionResults.forEach((result, index) => {
      const question = state.queue[index];
      if (result.isCorrect) {
        stats.get(question.subtopic).correct += 1;
      }
    });
    return Array.from(stats.values()).sort((a, b) => a.label.localeCompare(b.label));
  }

  function formatDueLabel(timestamp) {
    const delta = timestamp - Date.now();
    if (delta <= 0) {
      return "Due now";
    }
    const hours = Math.round(delta / (60 * 60 * 1000));
    if (hours < 24) {
      return `Due in ${hours}h`;
    }
    const days = Math.round(hours / 24);
    return `Due in ${days}d`;
  }

  function setActiveView(target) {
    [homeView, quizView, summaryView].forEach((view) => {
      view.classList.toggle("active", view === target);
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();