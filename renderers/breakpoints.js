/**
 * PSP Design System - Responsive Breakpoint Documentation Renderer
 * Renders breakpoint specification tables and visual layout previews.
 *
 * Usage:
 *   window.PSP.renderers.breakpoints.render(containerEl);
 *   var html = window.PSP.renderers.breakpoints.generateHtml();
 *
 * Data source: window.PSP.data.breakpoints
 * Each entry has: name, range, columns, spacing, componentSizes
 *
 * Requirements: 9.1 (4 breakpoints), 9.2 (layout specs per breakpoint),
 *               9.3 (visual previews)
 */
(function() {
  'use strict';

  var STYLE_ID = 'psp-breakpoints-styles';

  /**
   * Inject scoped styles for the breakpoints renderer (idempotent).
   */
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var css = [
      '/* === Breakpoints Renderer Styles === */',
      '.psp-breakpoints {',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '  margin: 16px 0;',
      '}',
      '.psp-breakpoints__title {',
      '  font-size: 20px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '  margin-bottom: 8px;',
      '}',
      '.psp-breakpoints__subtitle {',
      '  font-size: 14px;',
      '  color: #555;',
      '  margin-bottom: 24px;',
      '  line-height: 1.5;',
      '}',
      '',
      '/* --- Breakpoint Grid/Table --- */',
      '.psp-breakpoints__grid {',
      '  display: grid;',
      '  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));',
      '  gap: 16px;',
      '  margin-bottom: 32px;',
      '}',
      '.psp-breakpoints__card {',
      '  border: 1px solid #e0e0e0;',
      '  border-radius: 10px;',
      '  overflow: hidden;',
      '  background: #fff;',
      '  transition: box-shadow 0.2s;',
      '}',
      '.psp-breakpoints__card:hover {',
      '  box-shadow: 0 2px 8px rgba(0,0,0,0.08);',
      '}',
      '.psp-breakpoints__card-header {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 10px;',
      '  padding: 14px 18px;',
      '  background: #f8f9fa;',
      '  border-bottom: 1px solid #e0e0e0;',
      '}',
      '.psp-breakpoints__card-icon {',
      '  width: 28px;',
      '  height: 28px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  border-radius: 6px;',
      '  font-size: 14px;',
      '}',
      '.psp-breakpoints__card-icon--mobile {',
      '  background: #ede9fe;',
      '  color: #7c3aed;',
      '}',
      '.psp-breakpoints__card-icon--tablet {',
      '  background: #dbeafe;',
      '  color: #2563eb;',
      '}',
      '.psp-breakpoints__card-icon--desktop {',
      '  background: #d1fae5;',
      '  color: #059669;',
      '}',
      '.psp-breakpoints__card-icon--largeDesktop {',
      '  background: #fef3c7;',
      '  color: #d97706;',
      '}',
      '.psp-breakpoints__card-name {',
      '  font-size: 15px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '}',
      '.psp-breakpoints__card-range {',
      '  margin-left: auto;',
      '  font-size: 12px;',
      '  font-weight: 500;',
      '  color: #666;',
      '  background: #f0f0f0;',
      '  padding: 3px 8px;',
      '  border-radius: 4px;',
      '}',
      '.psp-breakpoints__card-body {',
      '  padding: 14px 18px;',
      '}',
      '.psp-breakpoints__specs {',
      '  display: grid;',
      '  grid-template-columns: 1fr 1fr;',
      '  gap: 10px;',
      '  margin-bottom: 14px;',
      '}',
      '.psp-breakpoints__spec {',
      '  font-size: 13px;',
      '}',
      '.psp-breakpoints__spec-label {',
      '  font-weight: 600;',
      '  color: #555;',
      '  font-size: 11px;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  margin-bottom: 2px;',
      '}',
      '.psp-breakpoints__spec-value {',
      '  color: #1a1a1a;',
      '  font-size: 13px;',
      '  font-weight: 500;',
      '}',
      '.psp-breakpoints__components-title {',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  color: #555;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  margin-bottom: 8px;',
      '  padding-top: 10px;',
      '  border-top: 1px solid #f0f0f0;',
      '}',
      '.psp-breakpoints__component-list {',
      '  list-style: none;',
      '  margin: 0;',
      '  padding: 0;',
      '}',
      '.psp-breakpoints__component-item {',
      '  font-size: 12px;',
      '  color: #444;',
      '  padding: 4px 0;',
      '  border-bottom: 1px solid #f8f8f8;',
      '  line-height: 1.4;',
      '}',
      '.psp-breakpoints__component-item:last-child {',
      '  border-bottom: none;',
      '}',
      '.psp-breakpoints__component-name {',
      '  font-weight: 600;',
      '  color: #333;',
      '}',
      '',
      '/* --- Visual Previews --- */',
      '.psp-breakpoints__previews-title {',
      '  font-size: 16px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '  margin-bottom: 16px;',
      '}',
      '.psp-breakpoints__previews {',
      '  display: flex;',
      '  align-items: flex-end;',
      '  gap: 16px;',
      '  margin-bottom: 32px;',
      '  overflow-x: auto;',
      '  padding-bottom: 8px;',
      '}',
      '.psp-breakpoints__preview-item {',
      '  flex-shrink: 0;',
      '  display: flex;',
      '  flex-direction: column;',
      '  align-items: center;',
      '}',
      '.psp-breakpoints__preview-frame {',
      '  border: 2px solid #e0e0e0;',
      '  border-radius: 8px;',
      '  background: #fafafa;',
      '  overflow: hidden;',
      '  position: relative;',
      '}',
      '.psp-breakpoints__preview-content {',
      '  padding: 8px;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 6px;',
      '}',
      '.psp-breakpoints__preview-row {',
      '  display: flex;',
      '  gap: 4px;',
      '}',
      '.psp-breakpoints__preview-col {',
      '  background: #e8e8e8;',
      '  border-radius: 3px;',
      '  height: 18px;',
      '  flex: 1;',
      '}',
      '.psp-breakpoints__preview-col--highlight {',
      '  background: #FF9900;',
      '  opacity: 0.5;',
      '}',
      '.psp-breakpoints__preview-tile {',
      '  background: #fff;',
      '  border: 1px solid #ddd;',
      '  border-radius: 4px;',
      '  height: 24px;',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 4px;',
      '  padding: 0 6px;',
      '}',
      '.psp-breakpoints__preview-tile-icon {',
      '  width: 12px;',
      '  height: 8px;',
      '  background: #ddd;',
      '  border-radius: 2px;',
      '}',
      '.psp-breakpoints__preview-tile-text {',
      '  flex: 1;',
      '  height: 4px;',
      '  background: #ccc;',
      '  border-radius: 2px;',
      '}',
      '.psp-breakpoints__preview-label {',
      '  margin-top: 8px;',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  color: #555;',
      '  text-align: center;',
      '}',
      '.psp-breakpoints__preview-range {',
      '  font-size: 11px;',
      '  color: #888;',
      '  text-align: center;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Escape HTML special characters.
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
   * Icons per breakpoint key (simple SVG-like Unicode symbols).
   */
  var BP_ICONS = {
    mobile: '\u{1F4F1}',
    tablet: '\u{1F4F2}',
    desktop: '\u{1F5A5}\uFE0F',
    largeDesktop: '\u{1F5A5}\uFE0F'
  };

  /**
   * Ordered list of breakpoint keys.
   */
  var BP_ORDER = ['mobile', 'tablet', 'desktop', 'largeDesktop'];

  /**
   * Preview frame widths for the visual preview section (scaled representations).
   */
  var PREVIEW_WIDTHS = {
    mobile: 80,
    tablet: 130,
    desktop: 200,
    largeDesktop: 260
  };

  /**
   * Preview frame heights for visual preview section.
   */
  var PREVIEW_HEIGHTS = {
    mobile: 140,
    tablet: 120,
    desktop: 100,
    largeDesktop: 100
  };

  /**
   * Generate a single breakpoint card HTML.
   * @param {string} key - Breakpoint key (e.g., 'mobile')
   * @param {object} bp - Breakpoint data object
   * @returns {string}
   */
  function renderBreakpointCard(key, bp) {
    var components = bp.componentSizes || {};
    var componentKeys = Object.keys(components);

    var html = '<div class="psp-breakpoints__card" data-breakpoint="' + escapeHtml(key) + '">';

    // Header
    html += '<div class="psp-breakpoints__card-header">';
    html += '<span class="psp-breakpoints__card-icon psp-breakpoints__card-icon--' + escapeHtml(key) + '">' + (BP_ICONS[key] || '\u{1F4D0}') + '</span>';
    html += '<span class="psp-breakpoints__card-name">' + escapeHtml(bp.name) + '</span>';
    html += '<span class="psp-breakpoints__card-range">' + escapeHtml(bp.range) + '</span>';
    html += '</div>';

    // Body
    html += '<div class="psp-breakpoints__card-body">';

    // Layout specs
    html += '<div class="psp-breakpoints__specs">';
    html += '<div class="psp-breakpoints__spec"><div class="psp-breakpoints__spec-label">Columns</div><div class="psp-breakpoints__spec-value">' + bp.columns + '</div></div>';
    html += '<div class="psp-breakpoints__spec"><div class="psp-breakpoints__spec-label">Spacing</div><div class="psp-breakpoints__spec-value"><code>' + escapeHtml(bp.spacing) + '</code></div></div>';
    html += '</div>';

    // Component sizes
    if (componentKeys.length > 0) {
      html += '<div class="psp-breakpoints__components-title">Component Sizes</div>';
      html += '<ul class="psp-breakpoints__component-list">';
      for (var i = 0; i < componentKeys.length; i++) {
        var compKey = componentKeys[i];
        html += '<li class="psp-breakpoints__component-item">';
        html += '<span class="psp-breakpoints__component-name">' + escapeHtml(compKey) + ':</span> ';
        html += escapeHtml(components[compKey]);
        html += '</li>';
      }
      html += '</ul>';
    }

    html += '</div>'; // card-body
    html += '</div>'; // card

    return html;
  }

  /**
   * Generate visual preview showing column layout for a breakpoint.
   * @param {string} key
   * @param {object} bp
   * @returns {string}
   */
  function renderPreviewItem(key, bp) {
    var width = PREVIEW_WIDTHS[key] || 100;
    var height = PREVIEW_HEIGHTS[key] || 100;
    var cols = bp.columns || 4;

    var html = '<div class="psp-breakpoints__preview-item">';
    html += '<div class="psp-breakpoints__preview-frame" style="width:' + width + 'px;height:' + height + 'px;">';
    html += '<div class="psp-breakpoints__preview-content">';

    // Column grid row
    html += '<div class="psp-breakpoints__preview-row">';
    for (var c = 0; c < Math.min(cols, 12); c++) {
      var highlight = (c % 3 === 0) ? ' psp-breakpoints__preview-col--highlight' : '';
      html += '<div class="psp-breakpoints__preview-col' + highlight + '"></div>';
    }
    html += '</div>';

    // Simulated component tiles
    var tileCount = key === 'mobile' ? 2 : (key === 'tablet' ? 2 : 3);
    for (var t = 0; t < tileCount; t++) {
      html += '<div class="psp-breakpoints__preview-tile">';
      html += '<div class="psp-breakpoints__preview-tile-icon"></div>';
      html += '<div class="psp-breakpoints__preview-tile-text"></div>';
      html += '</div>';
    }

    html += '</div>'; // preview-content
    html += '</div>'; // preview-frame

    html += '<div class="psp-breakpoints__preview-label">' + escapeHtml(bp.name) + '</div>';
    html += '<div class="psp-breakpoints__preview-range">' + escapeHtml(bp.range) + '</div>';
    html += '</div>';

    return html;
  }

  /**
   * Generate the full HTML for the breakpoints documentation.
   * @returns {string}
   */
  function generateHtml() {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.breakpoints) {
      return '<p>No breakpoint data available.</p>';
    }

    var breakpoints = window.PSP.data.breakpoints;
    var html = '<div class="psp-breakpoints">';

    // Title
    html += '<h2 class="psp-breakpoints__title">Responsive Breakpoints</h2>';
    html += '<p class="psp-breakpoints__subtitle">Four breakpoint thresholds define how PSP components adapt across mobile, tablet, desktop, and large desktop viewports.</p>';

    // Breakpoint cards grid
    html += '<div class="psp-breakpoints__grid">';
    for (var i = 0; i < BP_ORDER.length; i++) {
      var key = BP_ORDER[i];
      var bp = breakpoints[key];
      if (bp) {
        html += renderBreakpointCard(key, bp);
      }
    }
    html += '</div>';

    // Visual previews
    html += '<h3 class="psp-breakpoints__previews-title">Layout Previews</h3>';
    html += '<div class="psp-breakpoints__previews">';
    for (var j = 0; j < BP_ORDER.length; j++) {
      var pKey = BP_ORDER[j];
      var pBp = breakpoints[pKey];
      if (pBp) {
        html += renderPreviewItem(pKey, pBp);
      }
    }
    html += '</div>';

    html += '</div>'; // psp-breakpoints

    return html;
  }

  /**
   * Main render function.
   * Renders breakpoint documentation into a container element.
   *
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function render(containerEl) {
    injectStyles();

    var html = generateHtml();
    containerEl.innerHTML = html;
  }

  // Expose on namespace
  window.PSP.renderers.breakpoints = {
    render: render,
    generateHtml: generateHtml
  };

})();
