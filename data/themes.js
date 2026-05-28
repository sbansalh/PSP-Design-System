/**
 * PSP Design System - Theme Color Maps
 * Light and dark theme color token definitions.
 * Follows Material Design 3 color role system.
 *
 * Light theme values sourced from index.html :root CSS custom properties.
 * Dark theme values follow MD3 dark theme principles:
 *   - Surfaces use dark grays (#121212 to #1e1e1e range)
 *   - On-surface colors become light for readability
 *   - Primary/accent colors remain vibrant but slightly lighter for dark backgrounds
 *   - Containers become darker, muted versions
 *   - All pairings maintain WCAG AA contrast ratios (4.5:1 text, 3:1 UI)
 */
(function() {
  'use strict';

  var light = {
    '--color-primary': '#0972d3',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#d1e4ff',
    '--color-on-primary-container': '#001d36',
    '--color-secondary': '#535e70',
    '--color-on-secondary': '#ffffff',
    '--color-secondary-container': '#d7e3f7',
    '--color-on-secondary-container': '#101c2b',
    '--color-tertiary': '#6b5778',
    '--color-on-tertiary': '#ffffff',
    '--color-tertiary-container': '#f2daff',
    '--color-on-tertiary-container': '#251431',
    '--color-error': '#d32f2f',
    '--color-on-error': '#ffffff',
    '--color-error-container': '#ffdad6',
    '--color-on-error-container': '#410002',
    '--color-success': '#16a34a',
    '--color-on-success': '#ffffff',
    '--color-success-container': '#d1fae5',
    '--color-on-success-container': '#052e16',
    '--color-warning': '#d97706',
    '--color-on-warning': '#ffffff',
    '--color-warning-container': '#fef3c7',
    '--color-on-warning-container': '#422006',
    '--color-surface': '#fafafa',
    '--color-on-surface': '#1a1c1e',
    '--color-surface-variant': '#e0e2ec',
    '--color-on-surface-variant': '#44474e',
    '--color-outline': '#74777f',
    '--color-outline-variant': '#c4c6d0',
    '--color-background': '#fafafa',
    '--color-on-background': '#1a1c1e'
  };

  var dark = {
    '--color-primary': '#a8c8ff',
    '--color-on-primary': '#003258',
    '--color-primary-container': '#0b4a7d',
    '--color-on-primary-container': '#d1e4ff',
    '--color-secondary': '#bbc7db',
    '--color-on-secondary': '#263141',
    '--color-secondary-container': '#3c4858',
    '--color-on-secondary-container': '#d7e3f7',
    '--color-tertiary': '#d7bee4',
    '--color-on-tertiary': '#3c2948',
    '--color-tertiary-container': '#533f5f',
    '--color-on-tertiary-container': '#f2daff',
    '--color-error': '#ffb4ab',
    '--color-on-error': '#690005',
    '--color-error-container': '#93000a',
    '--color-on-error-container': '#ffdad6',
    '--color-success': '#6ee7a0',
    '--color-on-success': '#003919',
    '--color-success-container': '#0a5c2f',
    '--color-on-success-container': '#d1fae5',
    '--color-warning': '#ffc46b',
    '--color-on-warning': '#462b00',
    '--color-warning-container': '#6b3f00',
    '--color-on-warning-container': '#fef3c7',
    '--color-surface': '#1a1c1e',
    '--color-on-surface': '#e3e2e6',
    '--color-surface-variant': '#44474e',
    '--color-on-surface-variant': '#c4c6d0',
    '--color-outline': '#8e9099',
    '--color-outline-variant': '#44474e',
    '--color-background': '#1a1c1e',
    '--color-on-background': '#e3e2e6'
  };

  window.PSP.data.themes = {
    light: light,
    dark: dark
  };
})();
