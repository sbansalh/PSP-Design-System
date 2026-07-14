/**
 * PSP Design System - State Documentation Renderer
 * Renders all 6 interaction states side-by-side with CSS diffs
 * relative to the Enabled base state.
 *
 * Usage:
 *   window.PSP.renderers.states.render('instrumentTile', containerEl);
 */
(function() {
  'use strict';

  // The 6 canonical interaction states in display order
  var STATE_ORDER = ['enabled', 'disabled', 'hovered', 'focused', 'pressed', 'dragged'];

  // Human-readable labels for each state
  var STATE_LABELS = {
    enabled: 'Enabled',
    disabled: 'Disabled',
    hovered: 'Hovered',
    focused: 'Focused',
    pressed: 'Pressed',
    dragged: 'Dragged'
  };

  // Explanations for null (not applicable) states by state key
  var NULL_EXPLANATIONS = {
    disabled: 'This component does not support a disabled state',
    hovered: 'This component does not support hover interactions',
    focused: 'This component is not focusable',
    pressed: 'This component does not support press interactions',
    dragged: 'This component does not support drag interactions'
  };

  // CSS property display names
  var PROP_LABELS = {
    bg: 'background',
    border: 'border',
    opacity: 'opacity',
    outline: 'outline',
    reason: null // not a CSS property, skip in diff
  };

  /**
   * Compute CSS property differences between a state and the enabled base state.
   * Returns an array of { property, from, to } objects.
   * @param {object} enabledState - The enabled state spec
   * @param {object} targetState - The state to compare against enabled
   * @returns {Array<{property: string, from: string, to: string}>}
   */
  function computeDiff(enabledState, targetState) {
    var diffs = [];
    if (!enabledState || !targetState) return diffs;

    // Collect all keys from both states (excluding non-CSS keys)
    var allKeys = {};
    Object.keys(enabledState).forEach(function(k) { allKeys[k] = true; });
    Object.keys(targetState).forEach(function(k) { allKeys[k] = true; });

    Object.keys(allKeys).forEach(function(key) {
      // Skip non-CSS metadata keys
      if (PROP_LABELS[key] === null) return;
      if (key === 'reason') return;

      var propLabel = PROP_LABELS[key] || key;
      var fromVal = enabledState[key];
      var toVal = targetState[key];

      // Normalize undefined to a display value
      var fromStr = fromVal !== undefined ? String(fromVal) : 'none';
      var toStr = toVal !== undefined ? String(toVal) : 'none';

      if (fromStr !== toStr) {
        diffs.push({
          property: propLabel,
          from: fromStr,
          to: toStr
        });
      }
    });

    return diffs;
  }

  /**
   * Render a single state card as an HTML string.
   * @param {string} stateKey - One of the 6 state keys
   * @param {object|null} stateSpec - The state spec object or null
   * @param {object} enabledState - The enabled base state for diff comparison
   * @param {string} componentName - Display name of the component
   * @returns {string} HTML string for the state card
   */
  function renderStateCard(stateKey, stateSpec, enabledState, componentName) {
    var label = STATE_LABELS[stateKey] || stateKey;
    var isEnabled = stateKey === 'enabled';
    var isNull = stateSpec === null;

    var html = '<div class="psp-state-card" data-state="' + stateKey + '">';
    html += '<div class="psp-state-card__header">';
    html += '<span class="psp-state-card__label">' + label + '</span>';
    if (isEnabled) {
      html += '<span class="psp-state-card__badge psp-state-card__badge--base">Base</span>';
    } else if (isNull) {
      html += '<span class="psp-state-card__badge psp-state-card__badge--na">N/A</span>';
    }
    html += '</div>';

    if (isNull) {
      // Not applicable state
      html += '<div class="psp-state-card__na">';
      html += '<div class="psp-state-card__na-label">Not applicable</div>';
      html += '<div class="psp-state-card__na-explanation">' + (NULL_EXPLANATIONS[stateKey] || 'This state is not applicable to this component') + '</div>';
      html += '</div>';
    } else {
      // Visual preview box showing the state styling
      html += renderPreviewBox(stateSpec, componentName);

      if (isEnabled) {
        // For enabled state, show the base CSS values
        html += '<div class="psp-state-card__diff">';
        html += '<div class="psp-state-card__diff-title">Base CSS properties</div>';
        html += '<ul class="psp-state-card__props">';
        Object.keys(stateSpec).forEach(function(key) {
          if (key === 'reason') return;
          var propLabel = PROP_LABELS[key] || key;
          html += '<li class="psp-state-card__prop">';
          html += '<span class="psp-state-card__prop-name">' + propLabel + ':</span> ';
          html += '<span class="psp-state-card__prop-value">' + stateSpec[key] + '</span>';
          html += '</li>';
        });
        html += '</ul>';
        html += '</div>';
      } else {
        // For non-enabled states, show the diff from enabled
        var diffs = computeDiff(enabledState, stateSpec);
        html += '<div class="psp-state-card__diff">';
        html += '<div class="psp-state-card__diff-title">Changes from Enabled</div>';
        if (diffs.length === 0) {
          html += '<div class="psp-state-card__no-diff">No CSS changes</div>';
        } else {
          html += '<ul class="psp-state-card__diffs">';
          diffs.forEach(function(d) {
            html += '<li class="psp-state-card__diff-item">';
            html += '<span class="psp-state-card__diff-prop">' + d.property + ':</span> ';
            html += '<span class="psp-state-card__diff-to">' + d.to + '</span>';
            html += ' <span class="psp-state-card__diff-arrow">←</span> ';
            html += '<span class="psp-state-card__diff-from">' + d.from + '</span>';
            html += '</li>';
          });
          html += '</ul>';
        }
        // Show reason if present (e.g., "Card expired" for disabled)
        if (stateSpec.reason) {
          html += '<div class="psp-state-card__reason">Reason: ' + stateSpec.reason + '</div>';
        }
        html += '</div>';
      }
    }

    html += '</div>';
    return html;
  }

  /**
   * Render a visual preview box that demonstrates the state's styling.
   * @param {object} stateSpec - The state spec with bg, border, opacity, outline
   * @param {string} componentName - Display name for the preview
   * @returns {string} HTML string for the preview box
   */
  function renderPreviewBox(stateSpec, componentName) {
    var styles = [];
    if (stateSpec.bg) styles.push('background:' + stateSpec.bg);
    if (stateSpec.border) styles.push('border:' + stateSpec.border);
    if (stateSpec.opacity !== undefined) styles.push('opacity:' + stateSpec.opacity);
    if (stateSpec.outline) styles.push('outline:' + stateSpec.outline);

    var html = '<div class="psp-state-card__preview" style="' + styles.join(';') + '">';
    html += '<span class="psp-state-card__preview-label">' + componentName + '</span>';
    html += '</div>';
    return html;
  }

  /**
   * Inject scoped styles for the state renderer (idempotent).
   */
  function injectStyles() {
    if (document.getElementById('psp-states-styles')) return;

    var css = [
      '.psp-states-grid {',
      '  display: grid;',
      '  grid-template-columns: repeat(3, 1fr);',
      '  gap: 20px;',
      '  margin: 16px 0;',
      '}',
      '@media (max-width: 900px) {',
      '  .psp-states-grid {',
      '    grid-template-columns: repeat(2, 1fr);',
      '  }',
      '}',
      '@media (max-width: 600px) {',
      '  .psp-states-grid {',
      '    grid-template-columns: 1fr;',
      '  }',
      '}',
      '.psp-state-card {',
      '  border: 1px solid #e8eaed;',
      '  border-radius: 12px;',
      '  padding: 24px;',
      '  background: #ffffff;',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '  font-size: 13px;',
      '  position: relative;',
      '  transition: box-shadow 0.2s, border-color 0.2s;',
      '}',
      '.psp-state-card:hover {',
      '  border-color: #d0d3d6;',
      '  box-shadow: 0 2px 8px rgba(0,0,0,0.04);',
      '}',
      '.psp-state-card__header {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 8px;',
      '  margin-bottom: 16px;',
      '}',
      '.psp-state-card__label {',
      '  font-weight: 600;',
      '  font-size: 14px;',
      '  color: #1a1c1e;',
      '}',
      '.psp-state-card__badge {',
      '  font-size: 11px;',
      '  padding: 3px 10px;',
      '  border-radius: 20px;',
      '  font-weight: 600;',
      '  letter-spacing: 0.2px;',
      '}',
      '.psp-state-card__badge--base {',
      '  background: #e6f2ff;',
      '  color: #0972d3;',
      '}',
      '.psp-state-card__badge--na {',
      '  background: #f3f3f3;',
      '  color: #888c8c;',
      '}',
      '.psp-state-card__preview {',
      '  height: 64px;',
      '  border-radius: 8px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  margin-bottom: 16px;',
      '  padding: 8px 16px;',
      '}',
      '.psp-state-card__preview-label {',
      '  font-size: 12px;',
      '  color: #555;',
      '  font-weight: 500;',
      '}',
      '.psp-state-card__diff-title {',
      '  font-size: 11px;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  color: #888c8c;',
      '  margin-bottom: 8px;',
      '  font-weight: 600;',
      '}',
      '.psp-state-card__props,',
      '.psp-state-card__diffs {',
      '  list-style: none;',
      '  margin: 0;',
      '  padding: 0;',
      '}',
      '.psp-state-card__prop,',
      '.psp-state-card__diff-item {',
      '  padding: 4px 0;',
      '  font-family: "SF Mono", "Fira Code", monospace;',
      '  font-size: 12px;',
      '  line-height: 1.5;',
      '}',
      '.psp-state-card__prop-name,',
      '.psp-state-card__diff-prop {',
      '  color: #6b21a8;',
      '}',
      '.psp-state-card__prop-value {',
      '  color: #1a1a1a;',
      '}',
      '.psp-state-card__diff-to {',
      '  color: #166534;',
      '  font-weight: 600;',
      '}',
      '.psp-state-card__diff-arrow {',
      '  color: #999;',
      '}',
      '.psp-state-card__diff-from {',
      '  color: #999;',
      '  text-decoration: line-through;',
      '}',
      '.psp-state-card__no-diff {',
      '  color: #888;',
      '  font-style: italic;',
      '}',
      '.psp-state-card__reason {',
      '  margin-top: 10px;',
      '  padding: 8px 12px;',
      '  background: #fffbeb;',
      '  border: 1px solid #fde68a;',
      '  border-radius: 6px;',
      '  font-size: 12px;',
      '  color: #92400e;',
      '}',
      '.psp-state-card__na {',
      '  text-align: center;',
      '  padding: 24px 12px;',
      '}',
      '.psp-state-card__na-label {',
      '  font-weight: 600;',
      '  font-size: 14px;',
      '  color: #888c8c;',
      '  margin-bottom: 6px;',
      '}',
      '.psp-state-card__na-explanation {',
      '  font-size: 12px;',
      '  color: #9ca3af;',
      '  line-height: 1.5;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'psp-states-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Main render function.
   * Renders all 6 interaction states for a component in a 3-column grid.
   *
   * @param {string} componentKey - Key in window.PSP.data.components
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function render(componentKey, containerEl) {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.components) {
      console.error('[PSP States] Component data not loaded.');
      return;
    }

    var component = window.PSP.data.components[componentKey];
    if (!component) {
      console.error('[PSP States] Component not found: ' + componentKey);
      return;
    }

    var states = component.states;
    if (!states) {
      console.warn('[PSP States] No states defined for: ' + componentKey);
      return;
    }

    // Inject styles once
    injectStyles();

    // Get the enabled base state for diff comparisons
    var enabledState = states.enabled || {};

    // Build the grid HTML
    var html = '<div class="psp-states-grid" role="list" aria-label="' + component.name + ' interaction states">';

    STATE_ORDER.forEach(function(stateKey) {
      var stateSpec = states.hasOwnProperty(stateKey) ? states[stateKey] : null;
      html += renderStateCard(stateKey, stateSpec, enabledState, component.name);
    });

    html += '</div>';

    // Render into container
    containerEl.innerHTML = html;
  }

  /**
   * Get the list of state keys in display order.
   * @returns {string[]}
   */
  function getStateOrder() {
    return STATE_ORDER.slice();
  }

  /**
   * Compute CSS diff between enabled and a target state (exposed for testing).
   * @param {object} enabledState
   * @param {object} targetState
   * @returns {Array<{property: string, from: string, to: string}>}
   */
  function getDiff(enabledState, targetState) {
    return computeDiff(enabledState, targetState);
  }

  /**
   * Inject scoped styles for the animated state demo (idempotent).
   */
  function injectAnimatedDemoStyles() {
    if (document.getElementById('psp-states-animated-demo-styles')) return;

    // Read the selection motion token for transition values
    var motionToken = (window.PSP.data && window.PSP.data.motionTokens && window.PSP.data.motionTokens.selection) || {
      duration: 200,
      easing: 'cubic-bezier(0.2, 0, 0, 1)'
    };
    var transitionDuration = motionToken.duration + 'ms';
    var transitionEasing = motionToken.easing;

    var css = [
      '.psp-animated-demo {',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '  margin: 16px 0;',
      '}',
      '.psp-animated-demo__buttons {',
      '  display: flex;',
      '  flex-wrap: wrap;',
      '  gap: 8px;',
      '  margin-bottom: 16px;',
      '}',
      '.psp-animated-demo__btn {',
      '  padding: 6px 14px;',
      '  border: 1px solid #d5d9d9;',
      '  border-radius: 6px;',
      '  background: #fff;',
      '  font-size: 13px;',
      '  font-weight: 500;',
      '  cursor: pointer;',
      '  transition: background ' + transitionDuration + ' ' + transitionEasing + ',',
      '    border-color ' + transitionDuration + ' ' + transitionEasing + ';',
      '}',
      '.psp-animated-demo__btn:hover {',
      '  background: #f0f0f0;',
      '}',
      '.psp-animated-demo__btn--active {',
      '  background: #e6f2ff;',
      '  border-color: #0972d3;',
      '  color: #0972d3;',
      '}',
      '.psp-animated-demo__tile {',
      '  width: 100%;',
      '  max-width: 320px;',
      '  height: 64px;',
      '  border-radius: 8px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  font-size: 14px;',
      '  font-weight: 500;',
      '  color: #1a1a1a;',
      '  transition: background-color ' + transitionDuration + ' ' + transitionEasing + ',',
      '    border ' + transitionDuration + ' ' + transitionEasing + ',',
      '    opacity ' + transitionDuration + ' ' + transitionEasing + ',',
      '    outline ' + transitionDuration + ' ' + transitionEasing + ';',
      '}',
      '@media (prefers-reduced-motion: reduce) {',
      '  .psp-animated-demo__tile {',
      '    transition: none;',
      '  }',
      '  .psp-animated-demo__btn {',
      '    transition: none;',
      '  }',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'psp-states-animated-demo-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Apply a state's visual properties to the demo tile element.
   * @param {HTMLElement} tileEl - The demo tile DOM element
   * @param {object} stateSpec - The state spec (bg, border, opacity, outline)
   */
  function applyStateToTile(tileEl, stateSpec) {
    if (!stateSpec) return;
    tileEl.style.backgroundColor = stateSpec.bg || '';
    tileEl.style.border = stateSpec.border || 'none';
    tileEl.style.opacity = stateSpec.opacity !== undefined ? stateSpec.opacity : 1;
    tileEl.style.outline = stateSpec.outline || 'none';
  }

  /**
   * Render an animated state demo for a component.
   * Shows a single tile that transitions between states when the user clicks state buttons.
   * Uses the 'selection' motion token for transition timing.
   * Respects prefers-reduced-motion (transitions happen instantly if enabled).
   *
   * @param {string} componentKey - Key in window.PSP.data.components
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function renderAnimatedDemo(componentKey, containerEl) {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.components) {
      console.error('[PSP States] Component data not loaded.');
      return;
    }

    var component = window.PSP.data.components[componentKey];
    if (!component) {
      console.error('[PSP States] Component not found: ' + componentKey);
      return;
    }

    var states = component.states;
    if (!states) {
      console.warn('[PSP States] No states defined for: ' + componentKey);
      return;
    }

    // Inject animated demo styles once
    injectAnimatedDemoStyles();

    // Only show states that are applicable (non-null)
    var applicableStates = STATE_ORDER.filter(function(key) {
      return states[key] !== null && states[key] !== undefined;
    });

    // Build the demo HTML
    var wrapper = document.createElement('div');
    wrapper.className = 'psp-animated-demo';
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-label', component.name + ' animated state demo');

    // State toggle buttons
    var buttonsRow = document.createElement('div');
    buttonsRow.className = 'psp-animated-demo__buttons';
    buttonsRow.setAttribute('role', 'toolbar');
    buttonsRow.setAttribute('aria-label', 'State selection');

    applicableStates.forEach(function(stateKey) {
      var btn = document.createElement('button');
      btn.className = 'psp-animated-demo__btn';
      btn.setAttribute('type', 'button');
      btn.setAttribute('data-state', stateKey);
      btn.setAttribute('aria-pressed', stateKey === 'enabled' ? 'true' : 'false');
      btn.textContent = STATE_LABELS[stateKey] || stateKey;
      if (stateKey === 'enabled') {
        btn.classList.add('psp-animated-demo__btn--active');
      }
      buttonsRow.appendChild(btn);
    });

    wrapper.appendChild(buttonsRow);

    // Demo tile
    var tile = document.createElement('div');
    tile.className = 'psp-animated-demo__tile';
    tile.setAttribute('aria-live', 'polite');
    tile.textContent = component.name;

    // Apply initial enabled state
    var enabledState = states.enabled || {};
    applyStateToTile(tile, enabledState);

    wrapper.appendChild(tile);

    // Event delegation for button clicks
    buttonsRow.addEventListener('click', function(e) {
      var btn = e.target;
      if (!btn.classList.contains('psp-animated-demo__btn')) return;

      var stateKey = btn.getAttribute('data-state');
      var stateSpec = states[stateKey];
      if (!stateSpec) return;

      // Update active button styling
      var allBtns = buttonsRow.querySelectorAll('.psp-animated-demo__btn');
      for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove('psp-animated-demo__btn--active');
        allBtns[i].setAttribute('aria-pressed', 'false');
      }
      btn.classList.add('psp-animated-demo__btn--active');
      btn.setAttribute('aria-pressed', 'true');

      // Apply state to tile (CSS transition handles animation)
      applyStateToTile(tile, stateSpec);
    });

    // Render into container
    containerEl.innerHTML = '';
    containerEl.appendChild(wrapper);
  }

  // Expose on namespace
  window.PSP.renderers.states = {
    render: render,
    getStateOrder: getStateOrder,
    getDiff: getDiff,
    renderAnimatedDemo: renderAnimatedDemo
  };

})();
