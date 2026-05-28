/**
 * PSP Design System - Dark Mode
 * Theme switching via CSS custom property overrides.
 * Persists preference in localStorage, respects prefers-reduced-motion.
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'psp-theme';
  var TRANSITION_DURATION = 300;
  var TRANSITIONING_CLASS = 'theme-transitioning';

  /**
   * Check if user prefers reduced motion
   * @returns {boolean}
   */
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Get the current theme from the document attribute
   * @returns {string} 'light' or 'dark'
   */
  function getTheme() {
    var attr = document.documentElement.getAttribute('data-theme');
    return attr === 'dark' ? 'dark' : 'light';
  }

  /**
   * Apply theme transition class (respects prefers-reduced-motion)
   */
  function applyTransition() {
    if (prefersReducedMotion()) {
      return;
    }
    document.documentElement.classList.add(TRANSITIONING_CLASS);
    setTimeout(function() {
      document.documentElement.classList.remove(TRANSITIONING_CLASS);
    }, TRANSITION_DURATION);
  }

  /**
   * Set the theme explicitly
   * @param {string} theme - 'light' or 'dark'
   */
  function setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') {
      theme = 'light';
    }

    applyTransition();

    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage unavailable (private browsing) — silently fail
    }

    // Update toggle button icon if it exists
    updateToggleButton(theme);
  }

  /**
   * Toggle between light and dark themes
   * @returns {string} The new theme after toggling
   */
  function toggle() {
    var current = getTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    return next;
  }

  /**
   * Load persisted preference from localStorage
   * @returns {string|null} The stored theme or null if not set
   */
  function loadPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  /**
   * Update the toggle button's visual state
   * @param {string} theme - 'light' or 'dark'
   */
  function updateToggleButton(theme) {
    var btn = document.getElementById('psp-dark-mode-toggle');
    if (!btn) return;

    var icon = btn.querySelector('.dark-mode-icon');
    if (icon) {
      // Sun icon for dark mode (click to go light), moon icon for light mode (click to go dark)
      icon.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }

    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  /**
   * Create and inject the toggle button into the sidebar header
   */
  function createToggleButton() {
    var sidebarHeader = document.querySelector('.sidebar-header');
    if (!sidebarHeader) return;

    // Don't create if already exists
    if (document.getElementById('psp-dark-mode-toggle')) return;

    var btn = document.createElement('button');
    btn.id = 'psp-dark-mode-toggle';
    btn.type = 'button';
    btn.className = 'dark-mode-toggle';
    btn.setAttribute('aria-label', getTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', getTheme() === 'dark' ? 'true' : 'false');

    var currentTheme = getTheme();
    btn.innerHTML = '<span class="dark-mode-icon">' + (currentTheme === 'dark' ? '☀️' : '🌙') + '</span>';

    btn.onclick = function() {
      toggle();
    };

    // Style the button inline (minimal, fits sidebar header)
    btn.style.cssText = 'position:absolute;top:32px;right:24px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:background 0.2s;padding:0;';

    // Make sidebar-header position relative for absolute positioning
    sidebarHeader.style.position = 'relative';

    sidebarHeader.appendChild(btn);
  }

  /**
   * Inject the transition CSS into the document head
   */
  function injectTransitionStyles() {
    var styleId = 'psp-dark-mode-transitions';
    if (document.getElementById(styleId)) return;

    var style = document.createElement('style');
    style.id = styleId;
    style.textContent = [
      '.' + TRANSITIONING_CLASS + ' *,',
      '.' + TRANSITIONING_CLASS + ' *::before,',
      '.' + TRANSITIONING_CLASS + ' *::after {',
      '  transition: background-color ' + TRANSITION_DURATION + 'ms ease,',
      '    color ' + TRANSITION_DURATION + 'ms ease,',
      '    border-color ' + TRANSITION_DURATION + 'ms ease,',
      '    box-shadow ' + TRANSITION_DURATION + 'ms ease !important;',
      '}',
      '@media (prefers-reduced-motion: reduce) {',
      '  .' + TRANSITIONING_CLASS + ' *,',
      '  .' + TRANSITIONING_CLASS + ' *::before,',
      '  .' + TRANSITIONING_CLASS + ' *::after {',
      '    transition: none !important;',
      '  }',
      '}'
    ].join('\n');

    document.head.appendChild(style);
  }

  /**
   * Initialize dark mode: load preference, apply theme, create toggle
   */
  function init() {
    // Inject transition styles
    injectTransitionStyles();

    // Load persisted preference
    var saved = loadPreference();
    if (saved === 'dark' || saved === 'light') {
      // Apply without transition on initial load
      if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      try {
        localStorage.setItem(STORAGE_KEY, saved);
      } catch (e) {}
    }

    // Create toggle button
    createToggleButton();
  }

  // Expose on window.PSP.features.darkMode
  window.PSP.features.darkMode = {
    toggle: toggle,
    setTheme: setTheme,
    getTheme: getTheme,
    init: init
  };
})();
