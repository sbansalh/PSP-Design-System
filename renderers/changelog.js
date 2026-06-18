/**
 * PSP Design System - Changelog Renderer
 * Renders changelog section with color-coded entry types:
 *   - Additions (green)
 *   - Modifications (amber)
 *   - Deprecations (red)
 *
 * Displays entries in reverse chronological order (data is pre-sorted).
 * Each entry shows: version, date, token name, previous value (for mods), new value.
 *
 * Usage:
 *   window.PSP.renderers.changelog.render(containerEl);
 *   var html = window.PSP.renderers.changelog.generateHtml();
 *   var html = window.PSP.renderers.changelog.renderAll();
 *
 * Data source: window.PSP.data.changelog (array of entry objects)
 */
(function() {
  'use strict';

  /**
   * Inject scoped styles for the changelog renderer (idempotent).
   */
  function injectStyles() {
    if (document.getElementById('psp-changelog-styles')) return;

    var css = [
      '.psp-changelog {',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '  margin: 16px 0;',
      '}',
      '.psp-changelog__version-group {',
      '  margin-bottom: 32px;',
      '}',
      '.psp-changelog__version-header {',
      '  display: flex;',
      '  align-items: baseline;',
      '  gap: 12px;',
      '  margin-bottom: 16px;',
      '  padding-bottom: 8px;',
      '  border-bottom: 2px solid #e0e0e0;',
      '}',
      '.psp-changelog__version-label {',
      '  font-size: 18px;',
      '  font-weight: 700;',
      '  color: #1a1a1a;',
      '}',
      '.psp-changelog__version-date {',
      '  font-size: 13px;',
      '  color: #666;',
      '}',
      '.psp-changelog__entry {',
      '  display: flex;',
      '  align-items: flex-start;',
      '  gap: 12px;',
      '  padding: 12px 16px;',
      '  margin-bottom: 8px;',
      '  border-radius: 8px;',
      '  border: 1px solid #e8e8e8;',
      '  background: #fafafa;',
      '}',
      '.psp-changelog__entry--addition {',
      '  border-left: 4px solid #22c55e;',
      '}',
      '.psp-changelog__entry--modification {',
      '  border-left: 4px solid #f59e0b;',
      '}',
      '.psp-changelog__entry--deprecation {',
      '  border-left: 4px solid #ef4444;',
      '}',
      '.psp-changelog__indicator {',
      '  display: inline-block;',
      '  width: 10px;',
      '  height: 10px;',
      '  border-radius: 50%;',
      '  flex-shrink: 0;',
      '  margin-top: 5px;',
      '}',
      '.psp-changelog__indicator--addition {',
      '  background: #22c55e;',
      '}',
      '.psp-changelog__indicator--modification {',
      '  background: #f59e0b;',
      '}',
      '.psp-changelog__indicator--deprecation {',
      '  background: #ef4444;',
      '}',
      '.psp-changelog__content {',
      '  flex: 1;',
      '  min-width: 0;',
      '}',
      '.psp-changelog__token-name {',
      '  font-size: 14px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '  font-family: "SF Mono", "Fira Code", monospace;',
      '}',
      '.psp-changelog__type-badge {',
      '  display: inline-block;',
      '  font-size: 11px;',
      '  font-weight: 600;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  padding: 2px 8px;',
      '  border-radius: 4px;',
      '  margin-left: 8px;',
      '  vertical-align: middle;',
      '}',
      '.psp-changelog__type-badge--addition {',
      '  background: #dcfce7;',
      '  color: #166534;',
      '}',
      '.psp-changelog__type-badge--modification {',
      '  background: #fef3c7;',
      '  color: #92400e;',
      '}',
      '.psp-changelog__type-badge--deprecation {',
      '  background: #fee2e2;',
      '  color: #991b1b;',
      '}',
      '.psp-changelog__description {',
      '  font-size: 13px;',
      '  color: #555;',
      '  line-height: 1.5;',
      '  margin-top: 4px;',
      '}',
      '.psp-changelog__values {',
      '  display: flex;',
      '  flex-wrap: wrap;',
      '  gap: 8px;',
      '  margin-top: 8px;',
      '  font-size: 12px;',
      '}',
      '.psp-changelog__value-chip {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  gap: 4px;',
      '  padding: 4px 10px;',
      '  border-radius: 4px;',
      '  font-family: "SF Mono", "Fira Code", monospace;',
      '  font-size: 12px;',
      '}',
      '.psp-changelog__value-chip--previous {',
      '  background: #fee2e2;',
      '  color: #991b1b;',
      '  text-decoration: line-through;',
      '}',
      '.psp-changelog__value-chip--new {',
      '  background: #dcfce7;',
      '  color: #166534;',
      '}',
      '.psp-changelog__value-chip--deprecation {',
      '  background: #fee2e2;',
      '  color: #991b1b;',
      '  font-style: italic;',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '}',
      '.psp-changelog__value-label {',
      '  font-weight: 600;',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '  text-decoration: none;',
      '}',
      '.psp-changelog__empty {',
      '  padding: 24px 18px;',
      '  text-align: center;',
      '  color: #888;',
      '  font-size: 13px;',
      '  font-style: italic;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'psp-changelog-styles';
    style.textContent = css;
    document.head.appendChild(style);
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
   * Format an ISO date string to a human-readable format.
   * @param {string} isoDate - e.g. '2024-12-01'
   * @returns {string} e.g. 'Dec 1, 2024'
   */
  function formatDate(isoDate) {
    if (!isoDate) return '';
    var parts = isoDate.split('-');
    if (parts.length !== 3) return escapeHtml(isoDate);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = parts[0];
    var monthIndex = parseInt(parts[1], 10) - 1;
    var day = parseInt(parts[2], 10);
    if (monthIndex < 0 || monthIndex > 11) return escapeHtml(isoDate);
    return months[monthIndex] + ' ' + day + ', ' + year;
  }

  /**
   * Render a single changelog entry HTML.
   * @param {object} entry - Changelog entry object
   * @returns {string} HTML string
   */
  function renderEntry(entry) {
    var type = entry.type || 'addition';
    var html = '<div class="psp-changelog__entry psp-changelog__entry--' + escapeHtml(type) + '">';

    // Color indicator dot
    html += '<span class="psp-changelog__indicator psp-changelog__indicator--' + escapeHtml(type) + '" aria-hidden="true"></span>';

    // Content area
    html += '<div class="psp-changelog__content">';

    // Token name + type badge
    html += '<div>';
    html += '<span class="psp-changelog__token-name">' + escapeHtml(entry.tokenName) + '</span>';
    html += '<span class="psp-changelog__type-badge psp-changelog__type-badge--' + escapeHtml(type) + '">' + escapeHtml(type) + '</span>';
    html += '</div>';

    // Description
    if (entry.description) {
      html += '<div class="psp-changelog__description">' + escapeHtml(entry.description) + '</div>';
    }

    // Values section
    html += '<div class="psp-changelog__values">';
    if (type === 'modification' && entry.previousValue) {
      html += '<span class="psp-changelog__value-chip psp-changelog__value-chip--previous">';
      html += '<span class="psp-changelog__value-label">Old:</span> ' + escapeHtml(entry.previousValue);
      html += '</span>';
      html += '<span class="psp-changelog__value-chip psp-changelog__value-chip--new">';
      html += '<span class="psp-changelog__value-label">New:</span> ' + escapeHtml(entry.newValue);
      html += '</span>';
    } else if (type === 'deprecation') {
      html += '<span class="psp-changelog__value-chip psp-changelog__value-chip--deprecation">';
      html += '<span class="psp-changelog__value-label">Migration:</span> ' + escapeHtml(entry.newValue);
      html += '</span>';
    } else if (entry.newValue) {
      html += '<span class="psp-changelog__value-chip psp-changelog__value-chip--new">';
      html += '<span class="psp-changelog__value-label">Value:</span> ' + escapeHtml(entry.newValue);
      html += '</span>';
    }
    html += '</div>';

    html += '</div>'; // close content
    html += '</div>'; // close entry
    return html;
  }

  /**
   * Group changelog entries by version.
   * Preserves the order from the data (already reverse chronological).
   * @param {Array} entries
   * @returns {Array} Array of { version, date, entries[] }
   */
  function groupByVersion(entries) {
    var groups = [];
    var groupMap = {};

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var key = entry.version;
      if (!groupMap[key]) {
        var group = { version: key, date: entry.date, entries: [] };
        groupMap[key] = group;
        groups.push(group);
      }
      groupMap[key].entries.push(entry);
    }

    return groups;
  }

  /**
   * Generate the full HTML for the changelog section.
   * Data is already in reverse chronological order from the data file.
   *
   * @returns {string} HTML string for the changelog section
   */
  function generateHtml() {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.changelog) {
      return '';
    }

    var entries = window.PSP.data.changelog;
    if (!entries || entries.length === 0) {
      return '<div class="psp-changelog__empty">No changelog entries available.</div>';
    }

    var groups = groupByVersion(entries);
    var html = '<div class="psp-changelog">';

    for (var g = 0; g < groups.length; g++) {
      var group = groups[g];
      html += '<div class="psp-changelog__version-group">';

      // Version header
      html += '<div class="psp-changelog__version-header">';
      html += '<span class="psp-changelog__version-label">v' + escapeHtml(group.version) + '</span>';
      html += '<span class="psp-changelog__version-date">' + formatDate(group.date) + '</span>';
      html += '</div>';

      // Entries for this version
      for (var e = 0; e < group.entries.length; e++) {
        html += renderEntry(group.entries[e]);
      }

      html += '</div>'; // close version group
    }

    html += '</div>'; // close changelog
    return html;
  }

  /**
   * Main render function.
   * Renders the changelog into a container element.
   *
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function render(containerEl) {
    injectStyles();

    var html = generateHtml();

    if (!html) {
      containerEl.innerHTML = '<div class="psp-changelog__empty">No changelog data available.</div>';
      return;
    }

    containerEl.innerHTML = html;
  }

  /**
   * Render all changelog entries and return the HTML string.
   * Alias for generateHtml() to match pattern used by buildSections.
   *
   * @returns {string} Full HTML string for the changelog
   */
  function renderAll() {
    injectStyles();
    return generateHtml();
  }

  /**
   * Get all unique versions in the changelog.
   * @returns {string[]} Array of version strings in reverse chronological order
   */
  function getVersions() {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.changelog) {
      return [];
    }
    var seen = {};
    var versions = [];
    var entries = window.PSP.data.changelog;
    for (var i = 0; i < entries.length; i++) {
      if (!seen[entries[i].version]) {
        seen[entries[i].version] = true;
        versions.push(entries[i].version);
      }
    }
    return versions;
  }

  /**
   * Get entries filtered by type.
   * @param {string} type - 'addition', 'modification', or 'deprecation'
   * @returns {Array} Filtered entries
   */
  function getEntriesByType(type) {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.changelog) {
      return [];
    }
    return window.PSP.data.changelog.filter(function(entry) {
      return entry.type === type;
    });
  }

  // Expose on namespace
  window.PSP.renderers.changelog = {
    render: render,
    renderAll: renderAll,
    generateHtml: generateHtml,
    getVersions: getVersions,
    getEntriesByType: getEntriesByType
  };

})();
