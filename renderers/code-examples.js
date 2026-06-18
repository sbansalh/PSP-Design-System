/**
 * PSP Design System - Code Examples Renderer
 * Renders multi-platform code examples with tab switching, syntax highlighting,
 * and copy-to-clipboard functionality.
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5
 */
(function() {
  'use strict';

  var PLATFORMS = ['html', 'reactNative', 'android', 'ios'];

  /**
   * Render the code examples section for a given component.
   * Generates a tabbed interface with syntax-highlighted code and copy buttons.
   * @param {string} componentId - Key in window.PSP.data.codeExamples
   * @returns {string} HTML string for the code examples panel
   */
  function render(componentId) {
    var examples = window.PSP.data.codeExamples;
    if (!examples || !examples[componentId]) {
      return '';
    }
    var component = examples[componentId];
    var instanceId = 'psp-code-' + componentId + '-' + Date.now();

    var html = '';
    html += '<div class="psp-code-examples" data-component="' + componentId + '" id="' + instanceId + '">';

    // Tab selector
    html += '<div class="psp-code-examples__tabs" role="tablist" aria-label="Platform code examples">';
    for (var i = 0; i < PLATFORMS.length; i++) {
      var platformKey = PLATFORMS[i];
      var platformData = component[platformKey];
      if (!platformData) continue;
      var isActive = i === 0;
      html += '<button class="psp-code-examples__tab' + (isActive ? ' psp-code-examples__tab--active' : '') + '"';
      html += ' role="tab"';
      html += ' aria-selected="' + (isActive ? 'true' : 'false') + '"';
      html += ' aria-controls="' + instanceId + '-panel-' + platformKey + '"';
      html += ' data-platform="' + platformKey + '"';
      html += ' tabindex="' + (isActive ? '0' : '-1') + '"';
      html += '>' + platformData.label + '</button>';
    }
    html += '</div>';

    // Code panels
    for (var j = 0; j < PLATFORMS.length; j++) {
      var pKey = PLATFORMS[j];
      var pData = component[pKey];
      if (!pData) continue;
      var isPanelActive = j === 0;
      var highlightedCode = window.PSP.features.highlight.highlight(pData.code, pData.language);

      html += '<div class="psp-code-examples__panel' + (isPanelActive ? ' psp-code-examples__panel--active' : '') + '"';
      html += ' id="' + instanceId + '-panel-' + pKey + '"';
      html += ' role="tabpanel"';
      html += ' data-platform="' + pKey + '"';
      html += ' aria-hidden="' + (!isPanelActive) + '"';
      html += '>';

      // Copy button
      html += '<button class="psp-code-examples__copy" data-platform="' + pKey + '" aria-label="Copy ' + pData.label + ' code">';
      html += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">';
      html += '<rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>';
      html += '<path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.5" fill="none"/>';
      html += '</svg>';
      html += '<span>Copy</span>';
      html += '</button>';

      // Code block
      html += '<pre class="psp-code-examples__pre"><code class="psp-code-examples__code">' + highlightedCode + '</code></pre>';
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Render code examples for all components.
   * @returns {string} HTML string containing all component code example sections
   */
  function renderAll() {
    var examples = window.PSP.data.codeExamples;
    if (!examples) return '';
    var html = '';
    var keys = Object.keys(examples);
    for (var i = 0; i < keys.length; i++) {
      var componentId = keys[i];
      var compData = window.PSP.data.components && window.PSP.data.components[componentId];
      var displayName = compData ? compData.name : componentId;
      html += '<div class="psp-code-examples__section">';
      html += '<h4 class="psp-code-examples__title">' + displayName + '</h4>';
      html += render(componentId);
      html += '</div>';
    }
    return html;
  }

  /**
   * Attach event listeners for tab switching and copy buttons on a container.
   * Call this after inserting the rendered HTML into the DOM.
   * @param {HTMLElement} [container] - Optional container element (defaults to document)
   */
  function attachEvents(container) {
    var root = container || document;
    var codeBlocks = root.querySelectorAll('.psp-code-examples');

    codeBlocks.forEach(function(block) {
      // Tab switching
      var tabs = block.querySelectorAll('.psp-code-examples__tab');
      var panels = block.querySelectorAll('.psp-code-examples__panel');

      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          var platform = this.getAttribute('data-platform');

          // Deactivate all tabs
          tabs.forEach(function(t) {
            t.classList.remove('psp-code-examples__tab--active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
          });

          // Activate clicked tab
          this.classList.add('psp-code-examples__tab--active');
          this.setAttribute('aria-selected', 'true');
          this.setAttribute('tabindex', '0');

          // Show/hide panels
          panels.forEach(function(p) {
            var panelPlatform = p.getAttribute('data-platform');
            if (panelPlatform === platform) {
              p.classList.add('psp-code-examples__panel--active');
              p.setAttribute('aria-hidden', 'false');
            } else {
              p.classList.remove('psp-code-examples__panel--active');
              p.setAttribute('aria-hidden', 'true');
            }
          });
        });

        // Keyboard navigation between tabs
        tab.addEventListener('keydown', function(e) {
          var tabsArr = Array.prototype.slice.call(tabs);
          var currentIdx = tabsArr.indexOf(this);
          var newIdx = -1;

          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            newIdx = (currentIdx + 1) % tabsArr.length;
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            newIdx = (currentIdx - 1 + tabsArr.length) % tabsArr.length;
          }

          if (newIdx >= 0) {
            tabsArr[newIdx].click();
            tabsArr[newIdx].focus();
          }
        });
      });

      // Copy buttons
      var copyBtns = block.querySelectorAll('.psp-code-examples__copy');
      copyBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var platform = this.getAttribute('data-platform');
          var componentId = block.getAttribute('data-component');
          var examples = window.PSP.data.codeExamples;
          if (examples && examples[componentId] && examples[componentId][platform]) {
            var rawCode = examples[componentId][platform].code;
            window.PSP.features.clipboard.copy(rawCode);

            // Visual feedback on button
            var span = this.querySelector('span');
            if (span) {
              var originalText = span.textContent;
              span.textContent = 'Copied!';
              var self = this;
              setTimeout(function() {
                var s = self.querySelector('span');
                if (s) s.textContent = originalText;
              }, 2000);
            }
          }
        });
      });
    });
  }

  window.PSP.renderers = window.PSP.renderers || {};
  window.PSP.renderers.codeExamples = {
    render: render,
    renderAll: renderAll,
    attachEvents: attachEvents
  };
})();
