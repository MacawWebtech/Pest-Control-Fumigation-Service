/**
 * DEFENDRA - PEST CONTROL & FUMIGATION SERVICE
 * Theme & Localization Engine (Light/Dark & LTR/RTL)
 * Vanilla ES6+, no global pollution, zero console.log
 */

(() => {
  'use strict';

  const THEME_STORAGE_KEY = 'defendra_theme_preference';
  const DIR_STORAGE_KEY = 'defendra_direction_preference';

  // --- Theme Management ---
  const getPreferredTheme = () => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update all theme toggle buttons across the page
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach((btn) => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'inline-block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'inline-block';
        }
      }
    });
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  // --- RTL Direction Management ---
  const getPreferredDirection = () => {
    return localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
  };

  const applyDirection = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    localStorage.setItem(DIR_STORAGE_KEY, dir);

    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach((btn) => {
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
      btn.classList.toggle('is-active', dir === 'rtl');
    });
  };

  const toggleDirection = () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(nextDir);
  };

  // --- Initialization ---
  const init = () => {
    applyTheme(getPreferredTheme());
    applyDirection(getPreferredDirection());

    // Bind event listeners using delegation
    document.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('.theme-toggle-btn');
      if (themeBtn) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      const rtlBtn = e.target.closest('.rtl-toggle-btn');
      if (rtlBtn) {
        e.preventDefault();
        toggleDirection();
      }
    });

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
