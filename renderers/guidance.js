/**
 * PSP Design System - Usage Guidance Renderer
 * Renders "When to use" and "When not to use" sections for each component,
 * with green/red indicators and structured scenario lists.
 *
 * Usage:
 *   window.PSP.renderers.guidance.render('instrumentTile', containerEl);
 *
 * Data source: window.PSP.data.guidance[componentId]
 * Each entry has:
 *   - whenToUse: Array of { scenario, explanation } (minimum 3)
 *   - whenNotToUse: Array of { scenario, explanation, alternative } (minimum 2)
 */
(function() {
  'use strict';

  /**
   * Inject scoped styles for the guidance renderer (idempotent).
   */
  function injectStyles() {
    if (document.getElementById('psp-guidance-styles')) return;

    var css = [
      '.psp-guidance {',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '  margin: 16px 0;',
      '}',
      '.psp-guidance__section {',
      '  margin-bottom: 24px;',
      '  border-radius: 8px;',
      '  border: 1px solid #e0e0e0;',
      '  overflow: hidden;',
      '}',
      '.psp-guidance__header {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 10px;',
      '  padding: 14px 18px;',
      '  font-size: 15px;',
      '  font-weight: 600;',
      '}',
      '.psp-guidance__header--use {',
      '  background: #f0fdf4;',
      '  border-bottom: 1px solid #bbf7d0;',
      '  color: #166534;',
      '}',
      '.psp-guidance__header--avoid {',
      '  background: #fef2f2;',
      '  border-bottom: 1px solid #fecaca;',
      '  color: #991b1b;',
      '}',
      '.psp-guidance__indicator {',
      '  display: inline-block;',
      '  width: 10px;',
      '  height: 10px;',
      '  border-radius: 50%;',
      '  flex-shrink: 0;',
      '}',
      '.psp-guidance__indicator--green {',
      '  background: #22c55e;',
      '}',
      '.psp-guidance__indicator--red {',
      '  background: #ef4444;',
      '}',
      '.psp-guidance__list {',
      '  list-style: none;',
      '  margin: 0;',
      '  padding: 0;',
      '}',
      '.psp-guidance__item {',
      '  padding: 14px 18px;',
      '  border-bottom: 1px solid #f0f0f0;',
      '}',
      '.psp-guidance__item:last-child {',
      '  border-bottom: none;',
      '}',
      '.psp-guidance__scenario {',
      '  font-size: 14px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '  margin-bottom: 4px;',
      '}',
      '.psp-guidance__explanation {',
      '  font-size: 13px;',
      '  color: #555;',
      '  line-height: 1.5;',
      '  margin: 0;',
      '}',
      '.psp-guidance__alternative {',
      '  display: flex;',
      '  align-items: baseline;',
      '  gap: 6px;',
      '  margin-top: 8px;',
      '  padding: 8px 12px;',
      '  background: #f8fafc;',
      '  border-radius: 6px;',
      '  font-size: 13px;',
      '  color: #1e40af;',
      '  line-height: 1.4;',
      '}',
      '.psp-guidance__alternative-label {',
      '  font-weight: 600;',
      '  white-space: nowrap;',
      '  color: #1e40af;',
      '}',
      '.psp-guidance__empty {',
      '  padding: 24px 18px;',
      '  text-align: center;',
      '  color: #888;',
      '  font-size: 13px;',
      '  font-style: italic;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'psp-guidance-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Render a "When to use" list item.
   * @param {object} item - { scenario, explanation }
   * @returns {string} HTML string
   */
  function renderUseItem(item) {
    var html = '<li class="psp-guidance__item">';
    html += '<div class="psp-guidance__scenario">' + escapeHtml(item.scenario) + '</div>';
    html += '<p class="psp-guidance__explanation">' + escapeHtml(item.explanation) + '</p>';
    html += '</li>';
    return html;
  }

  /**
   * Render a "When not to use" list item with alternative.
   * @param {object} item - { scenario, explanation, alternative }
   * @returns {string} HTML string
   */
  function renderAvoidItem(item) {
    var html = '<li class="psp-guidance__item">';
    html += '<div class="psp-guidance__scenario">' + escapeHtml(item.scenario) + '</div>';
    html += '<p class="psp-guidance__explanation">' + escapeHtml(item.explanation) + '</p>';
    if (item.alternative) {
      html += '<div class="psp-guidance__alternative">';
      html += '<span class="psp-guidance__alternative-label">Instead:</span> ';
      html += escapeHtml(item.alternative);
      html += '</div>';
    }
    html += '</li>';
    return html;
  }

  /**
   * Escape HTML special characters to prevent XSS.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Generate the full HTML for a component's usage guidance.
   * Can be used without a container element — returns an HTML string.
   *
   * @param {string} componentId - Key in window.PSP.data.guidance
   * @returns {string} HTML string for the guidance section, or empty string if no data
   */
  function generateHtml(componentId) {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.guidance) {
      return '';
    }

    var guidance = window.PSP.data.guidance[componentId];
    if (!guidance) {
      return '';
    }

    var whenToUse = guidance.whenToUse || [];
    var whenNotToUse = guidance.whenNotToUse || [];

    var html = '<div class="psp-guidance" data-component="' + escapeHtml(componentId) + '">';

    // "When to use" section
    html += '<div class="psp-guidance__section psp-guidance__section--use">';
    html += '<div class="psp-guidance__header psp-guidance__header--use">';
    html += '<span class="psp-guidance__indicator psp-guidance__indicator--green" aria-hidden="true"></span>';
    html += 'When to use';
    html += '</div>';

    if (whenToUse.length > 0) {
      html += '<ul class="psp-guidance__list" role="list">';
      for (var i = 0; i < whenToUse.length; i++) {
        html += renderUseItem(whenToUse[i]);
      }
      html += '</ul>';
    } else {
      html += '<div class="psp-guidance__empty">No usage scenarios defined.</div>';
    }

    html += '</div>';

    // "When not to use" section
    html += '<div class="psp-guidance__section psp-guidance__section--avoid">';
    html += '<div class="psp-guidance__header psp-guidance__header--avoid">';
    html += '<span class="psp-guidance__indicator psp-guidance__indicator--red" aria-hidden="true"></span>';
    html += 'When not to use';
    html += '</div>';

    if (whenNotToUse.length > 0) {
      html += '<ul class="psp-guidance__list" role="list">';
      for (var j = 0; j < whenNotToUse.length; j++) {
        html += renderAvoidItem(whenNotToUse[j]);
      }
      html += '</ul>';
    } else {
      html += '<div class="psp-guidance__empty">No anti-patterns defined.</div>';
    }

    html += '</div>';

    html += '</div>';

    return html;
  }

  /**
   * Main render function.
   * Renders usage guidance for a component into a container element.
   *
   * @param {string} componentId - Key in window.PSP.data.guidance
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function render(componentId, containerEl) {
    // Inject styles once
    injectStyles();

    var html = generateHtml(componentId);

    if (!html) {
      containerEl.innerHTML = '<div class="psp-guidance__empty">No usage guidance available for this component.</div>';
      return;
    }

    containerEl.innerHTML = html;
  }

  /**
   * Render guidance for all components that have guidance data.
   * Returns an object mapping componentId to HTML string.
   *
   * @returns {object} Map of componentId -> HTML string
   */
  function renderAll() {
    var result = {};
    if (!window.PSP || !window.PSP.data || !window.PSP.data.guidance) {
      return result;
    }

    var guidance = window.PSP.data.guidance;
    var keys = Object.keys(guidance);
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = generateHtml(keys[i]);
    }
    return result;
  }

  /**
   * Get all component IDs that have guidance data.
   * @returns {string[]}
   */
  function getComponentIds() {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.guidance) {
      return [];
    }
    return Object.keys(window.PSP.data.guidance);
  }

  // Expose on namespace
  window.PSP.renderers.guidance = {
    render: render,
    generateHtml: generateHtml,
    renderAll: renderAll,
    getComponentIds: getComponentIds
  };

})();
