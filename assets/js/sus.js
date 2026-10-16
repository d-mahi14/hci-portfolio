/**
 * SYSTEM USABILITY SCALE (SUS) EVALUATION SUITE
 * 
 * Sources:
 * - Brooke, J. (1996). SUS: A 'quick and dirty' usability scale.
 * - Sauro, J., & Lewis, J. R. (2016). Quantifying the User Experience: Practical Statistics for User Research.
 * 
 * [HCI - Nielsen #2: Match between system and real world - Honest scoring benchmarks]
 * [HCI - Nielsen #5: Error prevention via alternating question notice]
 * [HCI - Nielsen #4 & Shneiderman #1: Consistency - Standard Brooke SUS is default instrument]
 * 
 * Benchmarks (Sauro & Lewis 2016 curved grading):
 * A+ 84.1-100 | A 80.8-84.0 | A- 78.9-80.7 | B+ 77.2-78.8 | B 74.1-77.1 |
 * B- 72.6-74.0 | C+ 71.1-72.5 | C 65.0-71.0 | C- 62.7-64.9 | D 51.7-62.6 | F 0-51.6
 * A score of 68 is the industry average (grade C), not "above average".
 */

const SUSController = (function() {
  const STORAGE_KEY = 'mahi_portfolio_sus_evaluations';
  // Change 2: Standard Brooke SUS is the default and only recommended mode
  let currentMode = 'standard'; 

  const SUS_QUESTIONS = [
    { id: 1, text: "I think that I would like to use this website frequently.", polarity: "positive" },
    { id: 2, text: "I found the website unnecessarily complex.", polarity: "negative", positiveText: "I found the website simple and clear to use." },
    { id: 3, text: "I thought the website was easy to use.", polarity: "positive" },
    { id: 4, text: "I think that I would need the support of a technical person to be able to use this website.", polarity: "negative", positiveText: "I could use this website without any technical assistance." },
    { id: 5, text: "I found the various functions in this website were well integrated.", polarity: "positive" },
    { id: 6, text: "I thought there was too much inconsistency in this website.", polarity: "negative", positiveText: "I felt the website was very consistent throughout." },
    { id: 7, text: "I would imagine that most people would learn to use this website very quickly.", polarity: "positive" },
    { id: 8, text: "I found the website very cumbersome to use.", polarity: "negative", positiveText: "I found the website very straightforward and comfortable to use." },
    { id: 9, text: "I felt very confident using the website.", polarity: "positive" },
    { id: 10, text: "I needed to learn a lot of things before I could get going with this website.", polarity: "negative", positiveText: "I could get going with this website right away without learning new things." }
  ];

  function init() {
    setupModeToggle();
    renderQuestionnaire();
    renderAggregates();
    setupFormListener();
    setupTooltipEscHandler();
  }

  function setupTooltipEscHandler() {
    // WCAG 1.4.13: Esc key dismisses open tooltips
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.tooltip-content').forEach(tt => {
          tt.classList.add('dismissed');
        });
      }
    });
    // Remove dismissed state when re-entering
    document.querySelectorAll('.has-tooltip').forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        const tt = elem.querySelector('.tooltip-content');
        if (tt) tt.classList.remove('dismissed');
      });
      elem.addEventListener('focusin', () => {
        const tt = elem.querySelector('.tooltip-content');
        if (tt) tt.classList.remove('dismissed');
      });
    });
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
          currentMode = 'all-positive';
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
      const questionText = currentMode === 'all-positive' && isNegative ? q.positiveText : q.text;

      let badgeHtml = '';
      let leftLabel = '1 (Strongly Disagree)';
      let rightLabel = '5 (Strongly Agree)';

      if (currentMode === 'standard') {
        if (isNegative) {
          badgeHtml = '<span style="font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; background: rgba(244, 63, 94, 0.15); color: var(--color-error); font-weight: 600; margin-left: 6px;">Negative wording: 1 is best</span>';
        } else {
          badgeHtml = '<span style="font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; background: var(--color-teal-glow); color: var(--color-teal); font-weight: 600; margin-left: 6px;">Positive wording: 5 is best</span>';
        }
      } else {
        badgeHtml = '<span style="font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; background: rgba(148, 163, 184, 0.2); color: var(--color-text-secondary); font-weight: 500; margin-left: 6px;">All-positive rephrasing</span>';
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

    for (let i = 1; i <= 10; i++) {
      const val = parseInt(answers[`sus-q${i}`], 10);
      let pts = 0;
      const isOdd = (i % 2 !== 0);

      if (mode === 'all-positive') {
        pts = val - 1;
      } else {
        pts = isOdd ? (val - 1) : (5 - val);
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
    return { totalScore, breakdown, mode };
  }

  // Change 1: Sauro & Lewis (2016) Curved Grading Scale
  function getInterpretation(score) {
    if (score >= 84.1) return { grade: "A+", label: "Superior Usability (Sauro & Lewis, 2016)", color: "var(--color-teal)" };
    if (score >= 80.8) return { grade: "A", label: "Excellent Usability", color: "var(--color-teal)" };
    if (score >= 78.9) return { grade: "A-", label: "Very Good Usability", color: "var(--color-teal)" };
    if (score >= 77.2) return { grade: "B+", label: "Good Usability", color: "var(--color-sky)" };
    if (score >= 74.1) return { grade: "B", label: "Solid Usability", color: "var(--color-sky)" };
    if (score >= 72.6) return { grade: "B-", label: "Above Average (Sauro & Lewis, 2016)", color: "var(--color-sky)" };
    if (score >= 71.1) return { grade: "C+", label: "Slightly Above Average", color: "var(--color-sky)" };
    if (score >= 65.0) return { grade: "C", label: "Average (Benchmark: 68 is the industry average)", color: "var(--color-warning)" };
    if (score >= 62.7) return { grade: "C-", label: "Below Average Usability", color: "var(--color-warning)" };
    if (score >= 51.7) return { grade: "D", label: "Poor Usability", color: "var(--color-error)" };
    return { grade: "F", label: "Failing Usability (Urgent Remediation Required)", color: "var(--color-error)" };
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
        mode: currentMode, // "standard" or "all-positive"
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
    const isStandard = (result.mode === 'standard');

    let modeNotice = '';
    if (!isStandard) {
      modeNotice = `
        <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid var(--color-warning); border-radius: var(--radius-md); padding: var(--space-3); margin-top: var(--space-3); text-align: left; font-size: 0.85rem; color: var(--color-text-primary);">
          <strong>Non-Standard Mode Note:</strong> This score was calculated using all-positive rephrasing for practice. It is stored separately and excluded from official Brooke benchmark aggregates (Sauro & Lewis, 2016).
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
          Calculated SUS Score (${isStandard ? 'Standard Brooke Instrument' : 'Non-Standard Practice'})
        </span>
        <div class="sus-score-number" style="color: ${interp.color};">${result.totalScore}</div>
        <div class="sus-score-label">Scale: 0 – 100 (Sauro & Lewis, 2016 curved grading)</div>
        <div class="sus-grade-pill" style="background-color: ${interp.color}; color: #0F172A;">
          Grade ${interp.grade}: ${interp.label}
        </div>
        <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: var(--space-2); margin-bottom: 0;">
          A score of 68 is the industry average (grade C), not 'above average'. Scores &gt; 71 represent above-average usability.
        </p>

        ${modeNotice}

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
            Formula: Sum of Points (${result.breakdown.reduce((a, b) => a + b.pts, 0)}) &times; 2.5 = <strong>${result.totalScore}</strong>.
          </p>
        </details>
      </div>
    `;
    resultBox.style.display = 'block';
  }

  // Change 2: The aggregate (average, min, max, count) uses ONLY mode === "standard" responses!
  function renderAggregates() {
    const container = document.getElementById('sus-aggregates-container');
    if (!container) return;

    const allEvals = getStoredEvaluations();
    const standardEvals = allEvals.filter(e => e.mode === 'standard' || !e.mode);
    const nonStandardEvals = allEvals.filter(e => e.mode === 'all-positive');

    if (standardEvals.length === 0 && nonStandardEvals.length === 0) {
      container.innerHTML = `
        <div style="background: var(--color-bg-elevated); padding: var(--space-4); border-radius: var(--radius-md); text-align: center;">
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 0;">
            No evaluations recorded yet. Complete the questionnaire above to evaluate usability.
          </p>
        </div>
      `;
      return;
    }

    let standardDashboardHtml = '';
    if (standardEvals.length > 0) {
      const scores = standardEvals.map(e => e.score);
      const count = scores.length;
      const avg = Math.round((scores.reduce((a, b) => a + b, 0) / count) * 10) / 10;
      const min = Math.min(...scores);
      const max = Math.max(...scores);
      const avgInterp = getInterpretation(avg);

      standardDashboardHtml = `
        <div style="background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6); margin-bottom: var(--space-4);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); flex-wrap: wrap; gap: var(--space-2);">
            <div>
              <h4 style="margin: 0;">Benchmark Aggregate: Standard Brooke SUS (N = ${count})</h4>
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">Validated benchmark instrument only</span>
            </div>
            <span class="sus-grade-pill" style="background-color: ${avgInterp.color}; color: #0F172A;">
              Avg Grade: ${avgInterp.grade}
            </span>
          </div>
          
          <table class="aggregate-stats-table">
            <tbody>
              <tr>
                <th>Standard Evaluations Count</th>
                <td>${count} participant${count > 1 ? 's' : ''}</td>
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
                <th>Benchmark Interpretation</th>
                <td style="font-weight: 500; font-family: inherit;">${avgInterp.label}</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--space-3); margin-bottom: 0;">
            Benchmark standard: A score of 68 is the industry average (grade C), not 'above average'. Scores &gt; 71 indicate above-average usability.
          </p>
        </div>
      `;
    } else {
      standardDashboardHtml = `
        <div style="background: var(--color-bg-elevated); padding: var(--space-4); border-radius: var(--radius-md); text-align: center; margin-bottom: var(--space-4);">
          <p style="color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: 0;">
            No Standard Brooke SUS evaluations recorded yet. (Only standard responses are included in the benchmark aggregate).
          </p>
        </div>
      `;
    }

    let nonStandardHtml = '';
    if (nonStandardEvals.length > 0) {
      nonStandardHtml = `
        <div style="background: var(--color-bg-surface); border: 1px dashed var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4); margin-bottom: var(--space-4);">
          <h5 style="margin: 0 0 var(--space-2) 0; color: var(--color-text-muted); font-size: 0.85rem;">
            Separate Non-Standard Practice Submissions (N = ${nonStandardEvals.length}) &bull; Not Comparable to SUS Benchmarks
          </h5>
          <ul style="padding-left: var(--space-4); margin: 0; font-size: 0.8rem; color: var(--color-text-secondary);">
            ${nonStandardEvals.map(e => `<li><strong>${e.testerName}:</strong> Score ${e.score} (${new Date(e.timestamp).toLocaleDateString()})</li>`).join('')}
          </ul>
        </div>
      `;
    }

    container.innerHTML = `
      ${standardDashboardHtml}
      ${nonStandardHtml}

      <div class="sus-export-actions">
        <div class="has-tooltip">
          <button type="button" class="btn btn-secondary btn-sm" id="export-sus-json-btn">
            &darr; Export JSON
          </button>
          <div class="tooltip-content" role="tooltip">Download full evaluation records (includes mode and raw responses) in JSON format.</div>
        </div>
        <div class="has-tooltip">
          <button type="button" class="btn btn-secondary btn-sm" id="export-sus-csv-btn">
            &darr; Export CSV
          </button>
          <div class="tooltip-content" role="tooltip">Export evaluation table as CSV for spreadsheet and statistical analysis.</div>
        </div>
        <button type="button" class="btn btn-outline btn-sm" id="clear-sus-btn" style="color: var(--color-error); border-color: rgba(244, 63, 94, 0.3);">
          Reset Data
        </button>
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
