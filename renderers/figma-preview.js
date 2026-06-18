/**
 * PSP Design System - Figma Preview Renderer
 * Embeds Figma preview iframes for component documentation pages.
 *
 * Features:
 *   - Embeds Figma frames at actual design dimensions
 *   - "Open in Figma" link adjacent to each embed
 *   - 10-second timeout triggers fallback UI
 *   - On load failure: hides iframe, shows placeholder, error message, retry button
 *
 * Usage:
 *   var html = window.PSP.renderers.figmaPreview.render(componentId);
 *   window.PSP.renderers.figmaPreview.attachEvents();
 *
 * Data source: window.PSP.data.components[componentId].figmaFileKey, .figmaNodeId
 */
(function() {
  'use strict';

  var FIGMA_EMBED_TIMEOUT_MS = 10000;
  var activeTimers = {};

  /**
   * Inject scoped styles for the Figma preview renderer (idempotent).
   */
  function injectStyles() {
    if (document.getElementById('psp-figma-preview-styles')) return;

    var css = [
      '.psp-figma-preview {',
      '  margin: 16px 0;',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '}',
      '.psp-figma-preview__embed-wrapper {',
      '  position: relative;',
      '  border: 1px solid #e0e0e0;',
      '  border-radius: 8px;',
      '  overflow: hidden;',
      '  background: #fafafa;',
      '}',
      '.psp-figma-preview__iframe {',
      '  display: block;',
      '  width: 100%;',
      '  min-height: 400px;',
      '  border: none;',
      '}',
      '.psp-figma-preview__iframe--hidden {',
      '  display: none;',
      '}',
      '.psp-figma-preview__actions {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 12px;',
      '  margin-top: 12px;',
      '}',
      '.psp-figma-preview__open-link {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  gap: 6px;',
      '  font-size: 13px;',
      '  font-weight: 500;',
      '  color: #0972d3;',
      '  text-decoration: none;',
      '  padding: 6px 12px;',
      '  border-radius: 6px;',
      '  border: 1px solid #0972d3;',
      '  transition: background 0.15s;',
      '}',
      '.psp-figma-preview__open-link:hover {',
      '  background: #eef6ff;',
      '}',
      '.psp-figma-preview__open-link svg {',
      '  width: 14px;',
      '  height: 14px;',
      '  fill: currentColor;',
      '}',
      '.psp-figma-preview__fallback {',
      '  display: flex;',
      '  flex-direction: column;',
      '  align-items: center;',
      '  justify-content: center;',
      '  padding: 48px 24px;',
      '  text-align: center;',
      '  background: #f5f5f5;',
      '  min-height: 300px;',
      '}',
      '.psp-figma-preview__fallback--hidden {',
      '  display: none;',
      '}',
      '.psp-figma-preview__fallback-icon {',
      '  width: 64px;',
      '  height: 64px;',
      '  border-radius: 12px;',
      '  background: #e8e8e8;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  margin-bottom: 16px;',
      '}',
      '.psp-figma-preview__fallback-icon svg {',
      '  width: 32px;',
      '  height: 32px;',
      '  fill: #999;',
      '}',
      '.psp-figma-preview__error-msg {',
      '  font-size: 14px;',
      '  color: #666;',
      '  margin-bottom: 16px;',
      '}',
      '.psp-figma-preview__retry-btn {',
      '  font-size: 13px;',
      '  font-weight: 500;',
      '  color: #0972d3;',
      '  background: #fff;',
      '  border: 1px solid #0972d3;',
      '  border-radius: 6px;',
      '  padding: 8px 16px;',
      '  cursor: pointer;',
      '  transition: background 0.15s;',
      '}',
      '.psp-figma-preview__retry-btn:hover {',
      '  background: #eef6ff;',
      '}',
      '.psp-figma-preview__loading {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  padding: 48px 24px;',
      '  min-height: 300px;',
      '  color: #888;',
      '  font-size: 13px;',
      '}',
      '.psp-figma-preview__loading--hidden {',
      '  display: none;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'psp-figma-preview-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Get the Figma embed URL for a component.
   * @param {string} figmaFileKey
   * @param {string} figmaNodeId
   * @returns {string}
   */
  function getEmbedUrl(figmaFileKey, figmaNodeId) {
    return 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/'
      + encodeURIComponent(figmaFileKey) + '?node-id=' + encodeURIComponent(figmaNodeId);
  }

  /**
   * Get the direct Figma file link for "Open in Figma".
   * @param {string} figmaFileKey
   * @param {string} figmaNodeId
   * @returns {string}
   */
  function getFigmaLink(figmaFileKey, figmaNodeId) {
    return 'https://www.figma.com/file/' + encodeURIComponent(figmaFileKey)
      + '?node-id=' + encodeURIComponent(figmaNodeId);
  }

  /**
   * Figma logo SVG icon (small, inline).
   * @returns {string}
   */
  function figmaIconSvg() {
    return '<svg viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">'
      + '<path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>'
      + '<path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>'
      + '<path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>'
      + '<path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>'
      + '<path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>'
      + '</svg>';
  }

  /**
   * Placeholder icon for fallback state.
   * @returns {string}
   */
  function placeholderIconSvg() {
    return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
      + '<path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 '
      + '16H3V5h18v14zM5 15l3-3.5 2.5 3 3.5-4.5 4.5 5.8H5z"/>'
      + '</svg>';
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
   * Render Figma preview HTML for a given component ID.
   * @param {string} componentId - Key in window.PSP.data.components
   * @returns {string} HTML string
   */
  function render(componentId) {
    injectStyles();

    if (!window.PSP || !window.PSP.data || !window.PSP.data.components) {
      return '<p class="psp-figma-preview__error-msg">Component data not available.</p>';
    }

    var component = window.PSP.data.components[componentId];
    if (!component || !component.figmaFileKey || !component.figmaNodeId) {
      return '<p class="psp-figma-preview__error-msg">No Figma data available for this component.</p>';
    }

    var embedUrl = getEmbedUrl(component.figmaFileKey, component.figmaNodeId);
    var figmaLink = getFigmaLink(component.figmaFileKey, component.figmaNodeId);
    var safeId = escapeHtml(componentId);

    var html = '<div class="psp-figma-preview" data-figma-component="' + safeId + '">';

    // Embed wrapper
    html += '<div class="psp-figma-preview__embed-wrapper">';

    // Loading indicator
    html += '<div class="psp-figma-preview__loading" id="figma-loading-' + safeId + '">';
    html += 'Loading Figma preview…';
    html += '</div>';

    // Iframe (hidden until loaded)
    html += '<iframe class="psp-figma-preview__iframe psp-figma-preview__iframe--hidden"';
    html += ' id="figma-iframe-' + safeId + '"';
    html += ' data-src="' + escapeHtml(embedUrl) + '"';
    html += ' data-component-id="' + safeId + '"';
    html += ' allowfullscreen';
    html += ' title="Figma preview for ' + escapeHtml(component.name || componentId) + '"';
    html += '></iframe>';

    // Fallback (hidden initially)
    html += '<div class="psp-figma-preview__fallback psp-figma-preview__fallback--hidden"';
    html += ' id="figma-fallback-' + safeId + '">';
    html += '<div class="psp-figma-preview__fallback-icon">' + placeholderIconSvg() + '</div>';
    html += '<p class="psp-figma-preview__error-msg">Figma preview unavailable</p>';
    html += '<button class="psp-figma-preview__retry-btn" data-retry-component="' + safeId + '">';
    html += 'Retry</button>';
    html += '</div>';

    html += '</div>'; // close embed-wrapper

    // Actions row with "Open in Figma" link
    html += '<div class="psp-figma-preview__actions">';
    html += '<a class="psp-figma-preview__open-link" href="' + escapeHtml(figmaLink) + '"';
    html += ' target="_blank" rel="noopener noreferrer">';
    html += figmaIconSvg();
    html += ' Open in Figma</a>';
    html += '</div>';

    html += '</div>'; // close psp-figma-preview
    return html;
  }

  /**
   * Show fallback UI for a given component embed.
   * @param {string} componentId
   */
  function showFallback(componentId) {
    var iframe = document.getElementById('figma-iframe-' + componentId);
    var loading = document.getElementById('figma-loading-' + componentId);
    var fallback = document.getElementById('figma-fallback-' + componentId);

    if (iframe) {
      iframe.classList.add('psp-figma-preview__iframe--hidden');
      iframe.removeAttribute('src');
    }
    if (loading) {
      loading.classList.add('psp-figma-preview__loading--hidden');
    }
    if (fallback) {
      fallback.classList.remove('psp-figma-preview__fallback--hidden');
    }

    // Clear any active timer
    if (activeTimers[componentId]) {
      clearTimeout(activeTimers[componentId]);
      delete activeTimers[componentId];
    }
  }

  /**
   * Attempt to load the Figma iframe for a component.
   * Sets up a 10-second timeout and load/error handlers.
   * @param {string} componentId
   */
  function loadEmbed(componentId) {
    var iframe = document.getElementById('figma-iframe-' + componentId);
    var loading = document.getElementById('figma-loading-' + componentId);
    var fallback = document.getElementById('figma-fallback-' + componentId);

    if (!iframe) return;

    var embedSrc = iframe.getAttribute('data-src');
    if (!embedSrc) return;

    // Reset state: show loading, hide iframe and fallback
    if (loading) {
      loading.classList.remove('psp-figma-preview__loading--hidden');
    }
    if (fallback) {
      fallback.classList.add('psp-figma-preview__fallback--hidden');
    }
    iframe.classList.add('psp-figma-preview__iframe--hidden');

    // Clear existing timer
    if (activeTimers[componentId]) {
      clearTimeout(activeTimers[componentId]);
    }

    // Set timeout (10 seconds)
    activeTimers[componentId] = setTimeout(function() {
      showFallback(componentId);
    }, FIGMA_EMBED_TIMEOUT_MS);

    // Handle successful load
    iframe.onload = function() {
      if (activeTimers[componentId]) {
        clearTimeout(activeTimers[componentId]);
        delete activeTimers[componentId];
      }
      if (loading) {
        loading.classList.add('psp-figma-preview__loading--hidden');
      }
      iframe.classList.remove('psp-figma-preview__iframe--hidden');
    };

    // Handle load error
    iframe.onerror = function() {
      showFallback(componentId);
    };

    // Start loading
    iframe.src = embedSrc;
  }

  /**
   * Attach event handlers after the rendered HTML has been inserted into the DOM.
   * Sets up timeout watchers for all Figma embeds and retry button listeners.
   */
  function attachEvents() {
    // Find all Figma preview containers
    var containers = document.querySelectorAll('.psp-figma-preview[data-figma-component]');

    for (var i = 0; i < containers.length; i++) {
      var componentId = containers[i].getAttribute('data-figma-component');
      if (componentId) {
        loadEmbed(componentId);
      }
    }

    // Attach retry button click handlers (event delegation on document)
    document.addEventListener('click', function(e) {
      var retryBtn = e.target.closest('[data-retry-component]');
      if (retryBtn) {
        var retryComponentId = retryBtn.getAttribute('data-retry-component');
        if (retryComponentId) {
          loadEmbed(retryComponentId);
        }
      }
    });
  }

  /**
   * Render previews for all components that have Figma data.
   * @returns {string} HTML string with all previews
   */
  function renderAll() {
    injectStyles();

    if (!window.PSP || !window.PSP.data || !window.PSP.data.components) {
      return '';
    }

    var components = window.PSP.data.components;
    var html = '';

    for (var id in components) {
      if (components.hasOwnProperty(id) && components[id].figmaFileKey && components[id].figmaNodeId) {
        html += '<h4>' + escapeHtml(components[id].name || id) + '</h4>';
        html += render(id);
      }
    }

    return html;
  }

  // Expose on namespace
  window.PSP.renderers.figmaPreview = {
    render: render,
    renderAll: renderAll,
    attachEvents: attachEvents,
    showFallback: showFallback,
    loadEmbed: loadEmbed
  };

})();
