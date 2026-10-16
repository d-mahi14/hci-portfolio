/**
 * SYSTEM USABILITY SCALE (SUS) EVALUATION SUITE
 * 
 * Enhanced with:
 * 1. Dual Scoring Modes:
 *    - Standard Brooke (1996) SUS with alternating polarity
 *    - All-Positive SUS (Sauro & Lewis) where 5 is always positive
 * 2. Visual polarity indicators & per-question score breakdown
 * 3. High-score detection heuristic (alerts user if they selected 5 on negative items)
 * 4. LocalStorage persistence, aggregate stats, and JSON/CSV export
 */

const SUSController = (function() {
  const STORAGE_KEY = 'mahi_portfolio_sus_evaluations';
  let currentMode = 'standard'; // 'standard' or 'positive'

  const SUS_QUESTIONS = [
    { id: 1, text: "I think that I would like to use this website frequently.", polarity: "positive" },
    { id: 2, text: "I found the website unnecessarily complex.", polarity: "negative", positiveText: "I found the website simple and clear to use." },
    { id: 3, text: "I thought the website was easy to use.", polarity: "positive" },
    { id: 4, text: "I think that I would need the support of a technical person to be able to use this website.", polarity: "negative", positiveText: "I could use this website without any technical assistance." },
    { id: 5, text: "I found the various functions in this website were well integrated.", polarity: "positive" },
    { id: 6, text: "I thought there was too much inconsistency in this website.", polarity: "negative", positiveText: "I felt the website was very consistent throughout." },
    { id: 7, text: "I would imagine that most people would learn to use this website very quickly.", polarity: "positive" },
    { id: 8, text: "I found the website very cumbersome to use.", polarity: "negative", positiveText: "I found the website very straightforward and pleasant to use." },
    { id: 9, text: "I felt very confident using the website.", polarity: "positive" },
    { id: 10, text: "I needed to learn a lot of things before I could get going with this website.", polarity: "negative", positiveText: "I could get going with this website right away without learning new things." }
  ];

  function init() {
    setupModeToggle();
    renderQuestionnaire();
    renderAggregates();
    setupFormListener();
  }

  function getStoredEvaluations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading localStorage for SUS:', e);
      return [];
    }
  }

  function saveEvaluations(evals) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evals));
    } catch (e) {
      console.error('Error writing to localStorage for SUS:', e);
    }
  }

  function setupModeToggle() {
    const standardRadio = document.getElementById('sus-mode-standard');
    const positiveRadio = document.getElementById('sus-mode-positive');

    if (standardRadio && positiveRadio) {
      standardRadio.addEventListener('change', () => {
        if (standardRadio.checked) {
          currentMode = 'standard';
          renderQuestionnaire();
        }
      });
      positiveRadio.addEventListener('change', () => {
        if (positiveRadio.checked) {
          currentMode = 'positive';
          renderQuestionnaire();
        }
      });
    }
  }

  function renderQuestionnaire() {
    const container = document.getElementById('sus-questions-list');
    if (!container) return;

    // Retain existing user selections if already clicked
    const currentSelections = {};
    for (let i = 1; i <= 10; i++) {
      const checked = container.querySelector(`input[name="sus-q${i}"]:checked`);
      if (checked) currentSelections[`sus-q${i}`] = checked.value;
    }

    container.innerHTML = SUS_QUESTIONS.map(q => {
      const isNegative = q.polarity === 'negative';
      const questionText = currentMode === 'positive' && isNegative ? q.positiveText : q.text;

      let badgeHtml = '';
      let leftLabel = 'Strongly Disagree';
      let rightLabel = 'Strongly Agree';

      if (currentMode === 'standard') {
        if (isNegative) {
          badgeHtml = '<span style="font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; background: rgba(244, 63, 94, 0.15); color: var(--color-error); font-weight: 600; margin-left: 6px;">Negative statement: 1 is Best</span>';
          leftLabel = '1 (Strongly Disagree - Best)';
          rightLabel = '5 (Strongly Agree - Worst)';
        } else {
          badgeHtml = '<span style="font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; background: var(--color-teal-glow); color: var(--color-teal); font-weight: 600; margin-left: 6px;">Positive statement: 5 is Best</span>';
          leftLabel = '1 (Strongly Disagree - Worst)';
          rightLabel = '5 (Strongly Agree - Best)';
        }
      } else {
        badgeHtml = '<span style="font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; background: var(--color-teal-glow); color: var(--color-teal); font-weight: 600; margin-left: 6px;">5 is Always Best</span>';
      }

      return `
        <div class="sus-question-row">
          <label class="sus-question-text" id="sus-q${q.id}-label">
            <strong>${q.id}.</strong> ${questionText}
            ${badgeHtml}
          </label>
          <div class="sus-options-scale" role="radiogroup" aria-labelledby="sus-q${q.id}-label">
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">${leftLabel}</span>
            ${[1, 2, 3, 4, 5].map(val => `
              <label class="sus-radio-label">
                <input 
                  type="radio" 
                  name="sus-q${q.id}" 
                  value="${val}" 
                  ${currentSelections[`sus-q${q.id}`] == val ? 'checked' : ''}
                  aria-label="${val} for question ${q.id}"
                >
                <span class="sus-scale-num">${val}</span>
              </label>
            `).join('')}
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">${rightLabel}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function calculateScore(answers, mode) {
    let contributionSum = 0;
    const breakdown = [];
    let highCountOnNegative = 0;

    for (let i = 1; i <= 10; i++) {
      const val = parseInt(answers[`sus-q${i}`], 10);
      let pts = 0;
      const isOdd = (i % 2 !== 0);

      if (mode === 'positive') {
        // In All-Positive mode, every item is (val - 1)
        pts = val - 1;
      } else {
        // Standard Brooke (1996) formula
        if (isOdd) {
          pts = val - 1;
        } else {
          pts = 5 - val;
          if (val >= 4) highCountOnNegative++;
        }
      }

      contributionSum += pts;
      breakdown.push({
        id: i,
        val,
        pts,
        polarity: isOdd ? 'positive' : 'negative'
      });
    }

    const totalScore = Math.round(contributionSum * 2.5 * 10) / 10;
    const isAllHighInStandard = (mode === 'standard' && highCountOnNegative >= 4);

    return { totalScore, breakdown, isAllHighInStandard, mode };
  }

  function getInterpretation(score) {
    if (score >= 85) return { grade: "A+", label: "Exceptional Usability (Top 5%)", color: "var(--color-teal)" };
    if (score >= 80) return { grade: "A", label: "Excellent Usability (Top 10%)", color: "var(--color-teal)" };
    if (score >= 68) return { grade: "B", label: "Above Average (Industry Benchmark: 68)", color: "var(--color-sky)" };
    if (score >= 51) return { grade: "C", label: "Average / Marginal", color: "var(--color-warning)" };
    return { grade: "F", label: "Below Average / Usability Concerns", color: "var(--color-error)" };
  }

  function setupFormListener() {
    const form = document.getElementById('sus-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const answers = {};
      const missingQuestions = [];

      for (let i = 1; i <= 10; i++) {
        const val = formData.get(`sus-q${i}`);
        if (!val) {
          missingQuestions.push(i);
        } else {
          answers[`sus-q${i}`] = val;
        }
      }

      const errorAlert = document.getElementById('sus-error-alert');
      if (missingQuestions.length > 0) {
        if (errorAlert) {
          errorAlert.textContent = `Please answer Question${missingQuestions.length > 1 ? 's' : ''} ${missingQuestions.join(', ')} before calculating.`;
          errorAlert.style.display = 'block';
          errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }

      if (errorAlert) errorAlert.style.display = 'none';

      const testerName = formData.get('sus-tester-name') || 'Anonymous Tester';
      const comments = formData.get('sus-comments') || '';

      const result = calculateScore(answers, currentMode);
      const evaluation = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        testerName,
        score: result.totalScore,
        mode: currentMode,
        answers,
        comments
      };

      const evals = getStoredEvaluations();
      evals.push(evaluation);
      saveEvaluations(evals);

      displayLatestResult(result, answers);
      renderAggregates();
      
      const resultBox = document.getElementById('sus-latest-result');
      if (resultBox) {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  function displayLatestResult(result, answers) {
    const resultBox = document.getElementById('sus-latest-result');
    if (!resultBox) return;

    const interp = getInterpretation(result.totalScore);

    let tipBanner = '';
    if (result.isAllHighInStandard) {
      tipBanner = `
        <div style="background: rgba(56, 189, 248, 0.12); border: 1px solid var(--color-sky); border-radius: var(--radius-md); padding: var(--space-4); margin-top: var(--space-4); text-align: left; font-size: 0.85rem; color: var(--color-text-primary);">
          <strong>💡 Notice regarding your score:</strong><br>
          You gave high ratings (4 or 5) across all questions. In standard Brooke SUS, questions 2, 4, 6, 8, and 10 are negative statements (e.g. <em>"unnecessarily complex"</em>, <em>"cumbersome"</em>), so selecting 5 on them means you agreed the site was complex!
          <br><br>
          If you meant 5 stars overall (Best), select <strong>"All-Positive Mode (5 = Always Best)"</strong> at the top of the form and re-submit to see your true score (which will be <strong>100 / 100 Grade A+</strong>)!
        </div>
      `;
    }

    const breakdownHtml = result.breakdown.map(item => `
      <tr style="border-bottom: 1px solid var(--color-border);">
        <td style="padding: 6px 10px; font-weight: 600;">Q${item.id}</td>
        <td style="padding: 6px 10px; font-size: 0.8rem; color: var(--color-text-secondary);">
          ${SUS_QUESTIONS[item.id - 1].text}
        </td>
        <td style="padding: 6px 10px; text-align: center; font-family: var(--font-family-mono);">${item.val} / 5</td>
        <td style="padding: 6px 10px; text-align: right; font-family: var(--font-family-mono); color: var(--color-teal); font-weight: 700;">
          +${item.pts} pts
        </td>
      </tr>
    `).join('');

    resultBox.innerHTML = `
      <div class="sus-score-badge-card" style="border-color: ${interp.color};">
        <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">
          Calculated Usability Score (${result.mode === 'positive' ? 'All-Positive Mode' : 'Standard Brooke Formula'})
        </span>
        <div class="sus-score-number" style="color: ${interp.color};">${result.totalScore}</div>
        <div class="sus-score-label">Scale: 0 – 100 Benchmark</div>
        <div class="sus-grade-pill" style="background-color: ${interp.color}; color: #0F172A;">
          Grade ${interp.grade}: ${interp.label}
        </div>

        ${tipBanner}

        <details style="margin-top: var(--space-4); width: 100%; text-align: left; background: var(--color-bg-base); border-radius: var(--radius-md); padding: var(--space-3); border: 1px solid var(--color-border);">
          <summary style="cursor: pointer; font-weight: 600; color: var(--color-teal); font-size: 0.85rem;">
            🔍 View Question-by-Question Calculation Breakdown (Click to expand)
          </summary>
          <div style="overflow-x: auto; margin-top: var(--space-3);">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem;">
              <thead>
                <tr style="border-bottom: 2px solid var(--color-border); background: var(--color-bg-elevated);">
                  <th style="padding: 6px 10px; text-align: left;">#</th>
                  <th style="padding: 6px 10px; text-align: left;">Question</th>
                  <th style="padding: 6px 10px; text-align: center;">Selected</th>
                  <th style="padding: 6px 10px; text-align: right;">Points</th>
                </tr>
              </thead>
              <tbody>
                ${breakdownHtml}
              </tbody>
            </table>
          </div>
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--space-2); margin-bottom: 0;">
            Total Score = Sum of Points (${result.breakdown.reduce((a, b) => a + b.pts, 0)}) × 2.5 = <strong>${result.totalScore}</strong>.
          </p>
        </details>
      </div>
    `;
    resultBox.style.display = 'block';
  }

  function renderAggregates() {
    const container = document.getElementById('sus-aggregates-container');
    if (!container) return;

    const evals = getStoredEvaluations();
    if (evals.length === 0) {
      container.innerHTML = `
        <div style="background: var(--color-bg-elevated); padding: var(--space-4); border-radius: var(--radius-md); text-align: center;">
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 0;">
            No evaluations recorded yet. Fill the scale above or collect tests from your 5 participants.
          </p>
        </div>
      `;
      return;
    }

    const scores = evals.map(e => e.score);
    const count = scores.length;
    const avg = Math.round((scores.reduce((a, b) => a + b, 0) / count) * 10) / 10;
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const avgInterp = getInterpretation(avg);

    container.innerHTML = `
      <div style="background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
          <h4 style="margin: 0;">Aggregate Tester Benchmark (N = ${count})</h4>
          <span class="sus-grade-pill" style="background-color: ${avgInterp.color}; color: #0F172A;">
            Avg Grade: ${avgInterp.grade}
          </span>
        </div>
        
        <table class="aggregate-stats-table">
          <tbody>
            <tr>
              <th>Total Evaluations</th>
              <td>${count} / 5 Target Testers</td>
            </tr>
            <tr>
              <th>Mean SUS Score</th>
              <td style="color: ${avgInterp.color}; font-size: 1.1rem;">${avg} / 100</td>
            </tr>
            <tr>
              <th>Minimum Score</th>
              <td>${min}</td>
            </tr>
            <tr>
              <th>Maximum Score</th>
              <td>${max}</td>
            </tr>
            <tr>
              <th>Usability Interpretation</th>
              <td style="font-weight: 500; font-family: inherit;">${avgInterp.label}</td>
            </tr>
          </tbody>
        </table>

        <div class="sus-export-actions">
          <button type="button" class="btn btn-secondary btn-sm" id="export-sus-json-btn">
            ↓ Export JSON
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="export-sus-csv-btn">
            ↓ Export CSV
          </button>
          <button type="button" class="btn btn-outline btn-sm" id="clear-sus-btn" style="color: var(--color-error); border-color: rgba(244, 63, 94, 0.3);">
            Reset Data
          </button>
        </div>
      </div>
    `;

    document.getElementById('export-sus-json-btn')?.addEventListener('click', exportJSON);
    document.getElementById('export-sus-csv-btn')?.addEventListener('click', exportCSV);
    document.getElementById('clear-sus-btn')?.addEventListener('click', clearEvaluations);
  }

  function exportJSON() {
    const evals = getStoredEvaluations();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(evals, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'sus_evaluations_mahi_desai.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function exportCSV() {
    const evals = getStoredEvaluations();
    if (evals.length === 0) return;

    const headers = ['ID', 'Timestamp', 'TesterName', 'SUS_Score', 'Mode', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Comments'];
    const rows = evals.map(e => [
      e.id,
      `"${e.timestamp}"`,
      `"${e.testerName.replace(/"/g, '""')}"`,
      e.score,
      `"${e.mode || 'standard'}"`,
      e.answers['sus-q1'],
      e.answers['sus-q2'],
      e.answers['sus-q3'],
      e.answers['sus-q4'],
      e.answers['sus-q5'],
      e.answers['sus-q6'],
      e.answers['sus-q7'],
      e.answers['sus-q8'],
      e.answers['sus-q9'],
      e.answers['sus-q10'],
      `"${(e.comments || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', 'sus_evaluations_mahi_desai.csv');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function clearEvaluations() {
    if (confirm('Are you sure you want to reset all stored SUS responses? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      const resultBox = document.getElementById('sus-latest-result');
      if (resultBox) resultBox.style.display = 'none';
      renderAggregates();
    }
  }

  return { init };
})();
