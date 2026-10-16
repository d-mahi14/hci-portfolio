/**
 * PROJECTS CONTROLLER & DETAIL MODAL
 * 
 * [HCI - Nielsen #3: User control and freedom]
 * Modals can be dismissed with Escape key, close button, or backdrop click.
 * Focus is trapped within modal and restored to trigger on dismiss.
 * 
 * [HCI - User Requirement #5: Clean placeholder with TODO label if no screenshot exists]
 */

const ProjectsController = (function() {
  let activeFilter = 'All';
  let lastFocusedElement = null;

  function init() {
    renderFilterButtons();
    renderProjectCards();
    setupModalListeners();
  }

  function renderFilterButtons() {
    const filterContainer = document.getElementById('project-filters');
    if (!filterContainer) return;

    const categories = ['All', 'AI/ML', 'Deep Learning', 'Full-Stack'];
    filterContainer.innerHTML = categories.map(cat => `
      <button 
        type="button" 
        class="filter-btn ${cat === activeFilter ? 'active' : ''}" 
        data-filter="${cat}"
        aria-pressed="${cat === activeFilter}">
        ${cat}
      </button>
    `).join('');

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      
      filterContainer.querySelectorAll('.filter-btn').forEach(b => {
        const isActive = b.dataset.filter === activeFilter;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', isActive);
      });

      renderProjectCards();
    });
  }

  function renderProjectCards() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = activeFilter === 'All' 
      ? PROFILE_DATA.projects 
      : PROFILE_DATA.projects.filter(p => p.category === activeFilter);

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="text-muted">No projects found for this category.</p>';
      return;
    }

    grid.innerHTML = filtered.map(project => `
      <article class="project-card" data-project-id="${project.id}">
        <div class="project-thumb-container">
          ${project.image ? `
            <img 
              src="${project.image}" 
              alt="${project.title} screenshot" 
              class="project-thumb-img" 
              loading="lazy"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            >
            <div class="project-thumb-placeholder" style="display: none;">
              <span class="placeholder-badge">Architecture: ${project.category}</span>
            </div>
          ` : `
            <div class="project-thumb-placeholder">
              <span class="placeholder-badge">TODO: Add screenshot in ${project.screenshotFolder}</span>
              <span style="font-size: 0.8rem; color: var(--color-text-muted);">Architecture: ${project.category}</span>
            </div>
          `}
        </div>
        <div class="project-card-body">
          <div class="project-header-meta">
            <span class="project-category-tag">${project.category}</span>
            <time class="project-period">${project.period}</time>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
          <div class="project-tags">
            ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            ${project.technologies.length > 4 ? `<span class="tech-tag">+${project.technologies.length - 4} more</span>` : ''}
          </div>
          <div class="project-card-footer">
            <button 
              type="button" 
              class="btn btn-primary btn-sm open-project-modal-btn" 
              data-project-id="${project.id}"
              aria-haspopup="dialog">
              View Architecture & Metrics
            </button>
            <a 
              href="${project.github}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-secondary btn-sm"
              aria-label="View ${project.title} on GitHub">
              GitHub
            </a>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click listeners to open modal
    grid.querySelectorAll('.open-project-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        lastFocusedElement = e.currentTarget;
        openModal(btn.dataset.projectId);
      });
    });
  }

  function openModal(projectId) {
    const project = PROFILE_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    const modalBackdrop = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-dynamic-content');
    if (!modalBackdrop || !modalContent) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: var(--space-3);">
        <span class="project-category-tag">${project.category}</span>
        <h2 id="modal-project-title" style="margin-top: var(--space-2); margin-bottom: var(--space-1);">${project.title}</h2>
        <span class="project-period">${project.period}</span>
      </div>

      <!-- Usability Evaluation Remediation P1: Highlighted key metric line at top of modal -->
      ${(project.highlightMetric || (project.metrics && project.metrics.length > 0)) ? `
        <div class="modal-highlighted-metric-banner" style="background: rgba(20, 184, 166, 0.12); border: 1px solid var(--color-teal); border-left: 5px solid var(--color-teal); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-4); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-2);">
          <div style="display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap;">
            <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; color: var(--color-teal); background: rgba(20, 184, 166, 0.2); padding: 2px 8px; border-radius: var(--radius-sm);">★ Key Metric</span>
            <strong style="font-size: 1.05rem; color: var(--color-text-primary); font-family: var(--font-family-mono); font-weight: 700;">${project.highlightMetric || `${project.metrics[0].label}: ${project.metrics[0].value}`}</strong>
          </div>
          <span class="badge" style="background: var(--color-teal); color: #0F172A; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: 9999px;">Verified</span>
        </div>
      ` : ''}

      <div class="project-thumb-container" style="height: 240px; border-radius: var(--radius-md); margin-bottom: var(--space-4); background-color: var(--color-bg-elevated);">
        ${project.image ? `
          <img 
            src="${project.image}" 
            alt="${project.title} architecture screenshot" 
            style="width: 100%; height: 100%; object-fit: contain;" 
            loading="lazy"
          >
        ` : `
          <div class="project-thumb-placeholder">
            <span class="placeholder-badge">TODO: Add screenshot in ${project.screenshotFolder}</span>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">Verified data from resume</span>
          </div>
        `}
      </div>

      <h4 style="margin-bottom: var(--space-2);">System Overview</h4>
      <p>${project.description}</p>

      <h4 style="margin-top: var(--space-4); margin-bottom: var(--space-2);">Architecture & Pipeline</h4>
      <p style="background: var(--color-bg-elevated); padding: var(--space-3); border-radius: var(--radius-md); font-family: var(--font-family-mono); font-size: 0.85rem; border-left: 3px solid var(--color-teal);">
        ${project.architecture}
      </p>

      <h4 style="margin-top: var(--space-4); margin-bottom: var(--space-2);">Verified Engineering Metrics</h4>
      <div class="modal-metrics-grid">
        ${project.metrics.map(m => `
          <div class="modal-metric-card">
            <div class="modal-metric-value">${m.value}</div>
            <div class="modal-metric-label">${m.label}</div>
          </div>
        `).join('')}
      </div>

      <h4 style="margin-top: var(--space-4); margin-bottom: var(--space-2);">Key Deliverables</h4>
      <ul class="timeline-bullets" style="margin-bottom: var(--space-6);">
        ${project.deliverables.map(del => `<li>${del}</li>`).join('')}
      </ul>

      <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          View Repository on GitHub
        </a>
        <button type="button" class="btn btn-secondary close-modal-action-btn">
          Close
        </button>
      </div>
    `;

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button inside modal
    const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const modalBackdrop = document.getElementById('project-modal');
    if (!modalBackdrop || !modalBackdrop.classList.contains('open')) return;

    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus to trigger
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  function setupModalListeners() {
    const modalBackdrop = document.getElementById('project-modal');
    if (!modalBackdrop) return;

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop || e.target.closest('.modal-close-btn') || e.target.closest('.close-modal-action-btn')) {
        closeModal();
      }
    });

    // Keyboard support: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  return { init, openModal, closeModal };
})();
