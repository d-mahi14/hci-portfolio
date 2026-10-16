/**
 * BLOG CONTROLLER: SEARCH, FILTER & READ-TIME ESTIMATE
 * 
 * Sourced strictly from verified work (eDNA, cGAN, Groq LLM).
 * Any unverified item flagged with [TODO: confirm].
 * 
 * [HCI - Nielsen #7: Flexibility and efficiency of use]
 * Instant search bar with tag-based filtering.
 */

const BlogController = (function() {
  let searchTerm = '';
  let selectedTag = 'All';

  function init() {
    renderTagFilters();
    renderBlogPosts();
    setupSearch();
    setupArticleModalListeners();
  }

  function renderTagFilters() {
    const tagContainer = document.getElementById('blog-tags');
    if (!tagContainer) return;

    const allTags = ['All', ...new Set(PROFILE_DATA.blogPosts.flatMap(post => post.tags))];
    tagContainer.innerHTML = allTags.map(tag => `
      <button 
        type="button" 
        class="skill-chip ${tag === selectedTag ? 'active' : ''}" 
        data-tag="${tag}"
        style="${tag === selectedTag ? 'border-color: var(--color-teal); background: var(--color-teal-glow); color: var(--color-teal); font-weight: 700;' : ''}">
        ${tag}
      </button>
    `).join('');

    tagContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-tag]');
      if (!btn) return;
      selectedTag = btn.dataset.tag;
      renderTagFilters();
      renderBlogPosts();
    });
  }

  function setupSearch() {
    const searchInput = document.getElementById('blog-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderBlogPosts();
    });
  }

  function renderBlogPosts() {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;

    const filtered = PROFILE_DATA.blogPosts.filter(post => {
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm) || 
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(t => t.toLowerCase().includes(searchTerm));
      return matchesTag && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="text-muted" style="grid-column: 1 / -1; padding: var(--space-4);">No blog posts match your search criteria.</p>';
      return;
    }

    grid.innerHTML = filtered.map(post => `
      <article class="blog-card">
        <div class="blog-meta">
          <time>${post.date}</time>
          <span>•</span>
          <span class="read-time-badge">⏱ ${post.readTime}</span>
        </div>
        <h3 style="margin-bottom: var(--space-2); font-size: var(--font-size-lg);">${post.title}</h3>
        <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);">
          ${post.excerpt}
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-1); margin-bottom: var(--space-4);">
          ${post.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <button 
          type="button" 
          class="btn btn-secondary btn-sm read-article-btn" 
          data-post-id="${post.id}">
          Read Deep-Dive →
        </button>
      </article>
    `).join('');

    grid.querySelectorAll('.read-article-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openArticle(btn.dataset.postId);
      });
    });
  }

  function setupArticleModalListeners() {
    const modalBackdrop = document.getElementById('project-modal');
    if (!modalBackdrop) return;
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target.closest('.close-modal-action-btn')) {
        modalBackdrop.classList.remove('open');
        modalBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  function openArticle(postId) {
    const post = PROFILE_DATA.blogPosts.find(p => p.id === postId);
    if (!post) return;

    const modalBackdrop = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-dynamic-content');
    if (!modalBackdrop || !modalContent) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: var(--space-4);">
        <div class="blog-meta">
          <time>${post.date}</time>
          <span>•</span>
          <span class="read-time-badge">⏱ ${post.readTime}</span>
        </div>
        <h2 style="margin-top: var(--space-2); margin-bottom: var(--space-3);">${post.title}</h2>
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-1); margin-bottom: var(--space-4);">
          ${post.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="blog-full-body" style="line-height: var(--line-height-relaxed); color: var(--color-text-primary);">
        ${post.content}
      </div>

      <div style="margin-top: var(--space-8); padding-top: var(--space-4); border-top: 1px solid var(--color-border); display: flex; justify-content: flex-end;">
        <button type="button" class="btn btn-secondary close-modal-action-btn">
          Done Reading
        </button>
      </div>
    `;

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  return { init };
})();
