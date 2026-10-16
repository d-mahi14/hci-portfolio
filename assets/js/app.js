/**
 * CORE APPLICATION CONTROLLER
 * 
 * [HCI - Nielsen #1: Visibility of System Status]
 * ScrollSpy highlights active navigation items; reading progress tracks depth.
 * 
 * [HCI - Nielsen #7: Flexibility and efficiency of use]
 * Theme toggle persisted across sessions, honors system preferences.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollSpy();
  initReadingProgress();
  initBackToTop();

  // Initialize modular controllers
  if (typeof ProjectsController !== 'undefined') ProjectsController.init();
  if (typeof BlogController !== 'undefined') BlogController.init();
  if (typeof ContactController !== 'undefined') ContactController.init();
  if (typeof SUSController !== 'undefined') SUSController.init();
});

/**
 * THEME CONTROLLER (Dark/Light with localStorage persistence)
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('mahi_theme_preference');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const activeTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('mahi_theme_preference', next);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = theme === 'dark' 
      ? '<span aria-hidden="true">☀️</span><span class="sr-only">Switch to light theme</span>' 
      : '<span aria-hidden="true">🌙</span><span class="sr-only">Switch to dark theme</span>';
    themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

/**
 * RESPONSIVE MOBILE NAVIGATION TOGGLE
 */
function initNavigation() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
  });

  // Close nav on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    }
  });
}

/**
 * SCROLLSPY (HCI - Visibility of System Status)
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const isCurrent = href === `#${id}`;
          link.classList.toggle('active', isCurrent);
          if (isCurrent) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/**
 * READING PROGRESS BAR
 */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

/**
 * BACK TO TOP BUTTON (Fitts's Law Anchor)
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
