/**
 * PSP Design System - Component Playground
 * Interactive panel with property controls and live preview.
 * Supports all registered components with state toggling,
 * property editing, code generation, and reset to defaults.
 *
 * Usage:
 *   window.PSP.renderers.playground.render('instrumentTile', containerEl);
 */
(function() {
  'use strict';

  // The 6 canonical interaction states
  var STATES = ['enabled', 'disabled', 'hovered', 'focused', 'pressed', 'dragged'];

  var STATE_LABELS = {
    enabled: 'Enabled',
    disabled: 'Disabled',
    hovered: 'Hovered',
    focused: 'Focused',
    pressed: 'Pressed',
    dragged: 'Dragged'
  };

  // Available icons for instrument tile icon selector
  var ICON_OPTIONS = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'netbanking', label: 'Netbanking' },
    { value: 'wallet', label: 'Wallet' },
    { value: 'emi', label: 'EMI' },
    { value: 'cod', label: 'Cash on Delivery' }
  ];

  // Track active playground instances: componentKey -> { config, containerEl }
  var instances = {};

  /**
   * Inject scoped styles for the playground (idempotent).
   */
  function injectStyles() {
    if (document.getElementById('psp-playground-styles')) return;

    var css = [
      '.psp-playground {',
      '  display: grid;',
      '  grid-template-columns: 1fr 1fr;',
      '  gap: 24px;',
      '  margin: 16px 0;',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '  font-size: 13px;',
      '}',
      '@media (max-width: 768px) {',
      '  .psp-playground {',
      '    grid-template-columns: 1fr;',
      '  }',
      '}',
      '.psp-playground__preview-panel {',
      '  border: 1px solid #e0e0e0;',
      '  border-radius: 8px;',
      '  padding: 24px;',
      '  background: #fafafa;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 16px;',
      '}',
      '.psp-playground__preview-title {',
      '  font-size: 12px;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  color: #888;',
      '  font-weight: 600;',
      '  margin: 0;',
      '}',
      '.psp-playground__preview-area {',
      '  min-height: 80px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  padding: 16px;',
      '}',
      '.psp-playground__tile {',
      '  width: 100%;',
      '  max-width: 340px;',
      '  border-radius: 8px;',
      '  padding: 12px 16px;',
      '  display: flex;',
      '  align-items: flex-start;',
      '  gap: 12px;',
      '  transition: all 80ms ease;',
      '}',
      '.psp-playground__tile-radio {',
      '  width: 20px;',
      '  height: 20px;',
      '  border-radius: 50%;',
      '  border: 2px solid #888;',
      '  flex-shrink: 0;',
      '  margin-top: 2px;',
      '}',
      '.psp-playground__tile-icon {',
      '  width: 54px;',
      '  height: 36px;',
      '  background: #e8e8e8;',
      '  border-radius: 4px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  font-size: 10px;',
      '  color: #666;',
      '  flex-shrink: 0;',
      '}',
      '.psp-playground__tile-content {',
      '  flex: 1;',
      '  min-width: 0;',
      '}',
      '.psp-playground__tile-name {',
      '  font-size: 14px;',
      '  font-weight: 500;',
      '  color: #1a1a1a;',
      '  margin-bottom: 2px;',
      '}',
      '.psp-playground__tile-details {',
      '  font-size: 12px;',
      '  color: #555;',
      '  margin-bottom: 4px;',
      '}',
      '.psp-playground__tile-offer {',
      '  font-size: 12px;',
      '  color: #067d62;',
      '}',
      '.psp-playground__tile-badge {',
      '  position: absolute;',
      '  top: -6px;',
      '  right: 12px;',
      '  background: #e6f2ff;',
      '  color: #0972d3;',
      '  font-size: 10px;',
      '  font-weight: 600;',
      '  padding: 2px 6px;',
      '  border-radius: 4px;',
      '}',
      '.psp-playground__tile-wrapper {',
      '  position: relative;',
      '}',
      '.psp-playground__code-panel {',
      '  margin-top: 8px;',
      '}',
      '.psp-playground__code-title {',
      '  font-size: 12px;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  color: #888;',
      '  font-weight: 600;',
      '  margin: 0 0 8px 0;',
      '}',
      '.psp-playground__code-block {',
      '  background: #1e1e1e;',
      '  color: #d4d4d4;',
      '  border-radius: 6px;',
      '  padding: 12px 16px;',
      '  font-family: "SF Mono", "Fira Code", monospace;',
      '  font-size: 11px;',
      '  line-height: 1.5;',
      '  overflow-x: auto;',
      '  white-space: pre;',
      '  max-height: 200px;',
      '  overflow-y: auto;',
      '}',
      '.psp-playground__controls-panel {',
      '  border: 1px solid #e0e0e0;',
      '  border-radius: 8px;',
      '  padding: 24px;',
      '  background: #fff;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 16px;',
      '}',
      '.psp-playground__controls-title {',
      '  font-size: 12px;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  color: #888;',
      '  font-weight: 600;',
      '  margin: 0;',
      '}',
      '.psp-playground__control-group {',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 4px;',
      '}',
      '.psp-playground__control-label {',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  color: #333;',
      '}',
      '.psp-playground__control-input {',
      '  padding: 6px 10px;',
      '  border: 1px solid #d5d9d9;',
      '  border-radius: 4px;',
      '  font-size: 13px;',
      '  font-family: inherit;',
      '  outline: none;',
      '  transition: border-color 0.15s;',
      '}',
      '.psp-playground__control-input:focus {',
      '  border-color: #0972d3;',
      '}',
      '.psp-playground__control-select {',
      '  padding: 6px 10px;',
      '  border: 1px solid #d5d9d9;',
      '  border-radius: 4px;',
      '  font-size: 13px;',
      '  font-family: inherit;',
      '  background: #fff;',
      '  outline: none;',
      '}',
      '.psp-playground__control-select:focus {',
      '  border-color: #0972d3;',
      '}',
      '.psp-playground__control-toggle {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 8px;',
      '}',
      '.psp-playground__control-checkbox {',
      '  width: 16px;',
      '  height: 16px;',
      '}',
      '.psp-playground__state-buttons {',
      '  display: flex;',
      '  flex-wrap: wrap;',
      '  gap: 6px;',
      '}',
      '.psp-playground__state-btn {',
      '  padding: 4px 10px;',
      '  border: 1px solid #d5d9d9;',
      '  border-radius: 4px;',
      '  background: #fff;',
      '  font-size: 12px;',
      '  cursor: pointer;',
      '  transition: background 0.1s, border-color 0.1s;',
      '}',
      '.psp-playground__state-btn:hover {',
      '  background: #f0f0f0;',
      '}',
      '.psp-playground__state-btn--active {',
      '  background: #e6f2ff;',
      '  border-color: #0972d3;',
      '  color: #0972d3;',
      '  font-weight: 600;',
      '}',
      '.psp-playground__state-btn--na {',
      '  opacity: 0.5;',
      '  cursor: not-allowed;',
      '}',
      '.psp-playground__reset-btn {',
      '  padding: 8px 16px;',
      '  border: 1px solid #d5d9d9;',
      '  border-radius: 6px;',
      '  background: #fff;',
      '  font-size: 13px;',
      '  font-weight: 500;',
      '  cursor: pointer;',
      '  align-self: flex-start;',
      '  transition: background 0.1s;',
      '}',
      '.psp-playground__reset-btn:hover {',
      '  background: #f7f7f7;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'psp-playground-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Get the playground config for a component.
   * @param {string} componentKey
   * @returns {object|null}
   */
  function getPlaygroundConfig(componentKey) {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.components) return null;
    var comp = window.PSP.data.components[componentKey];
    if (!comp || !comp.playground) return null;
    return comp.playground;
  }

  /**
   * Get the default configuration for a component.
   * @param {string} componentKey
   * @returns {object}
   */
  function getDefaults(componentKey) {
    var pgConfig = getPlaygroundConfig(componentKey);
    if (!pgConfig || !pgConfig.defaults) return {};
    // Return a shallow copy
    var defaults = {};
    Object.keys(pgConfig.defaults).forEach(function(k) {
      defaults[k] = pgConfig.defaults[k];
    });
    return defaults;
  }

  /**
   * Get the current configuration for a component instance.
   * @param {string} componentKey
   * @returns {object}
   */
  function getConfig(componentKey) {
    if (instances[componentKey]) {
      // Return a copy
      var config = {};
      Object.keys(instances[componentKey].config).forEach(function(k) {
        config[k] = instances[componentKey].config[k];
      });
      return config;
    }
    return getDefaults(componentKey);
  }

  /**
   * Generate an HTML code snippet for the current configuration.
   * @param {string} componentKey
   * @param {object} config - Current property values
   * @returns {string}
   */
  function generateCode(componentKey, config) {
    if (!config) config = getConfig(componentKey);
    var comp = window.PSP.data.components[componentKey];
    if (!comp) return '';

    var state = config.state || 'enabled';
    var stateSpec = comp.states[state];

    if (componentKey === 'instrumentTile') {
      var lines = [];
      lines.push('<div class="psp-instrument-tile"');
      lines.push('     role="radio"');
      lines.push('     aria-label="' + (config.name || '') + ', ' + (config.details || '') + '"');
      if (state !== 'enabled') {
        lines.push('     data-state="' + state + '"');
      }
      if (state === 'disabled') {
        lines.push('     aria-disabled="true"');
      }
      var styleProps = [];
      if (stateSpec) {
        if (stateSpec.bg) styleProps.push('background: ' + stateSpec.bg);
        if (stateSpec.border) styleProps.push('border: ' + stateSpec.border);
        if (stateSpec.opacity !== undefined && stateSpec.opacity !== 1) styleProps.push('opacity: ' + stateSpec.opacity);
        if (stateSpec.outline) styleProps.push('outline: ' + stateSpec.outline);
      }
      if (styleProps.length > 0) {
        lines.push('     style="' + styleProps.join('; ') + '"');
      }
      lines.push('>');
      lines.push('  <span class="psp-instrument-tile__radio"></span>');
      if (config.icon) {
        lines.push('  <img class="psp-instrument-tile__icon" src="icons/' + config.icon + '.png" alt="' + config.icon + '" />');
      }
      lines.push('  <div class="psp-instrument-tile__content">');
      lines.push('    <span class="psp-instrument-tile__name">' + (config.name || '') + '</span>');
      lines.push('    <span class="psp-instrument-tile__details">' + (config.details || '') + '</span>');
      if (config.offer) {
        lines.push('    <span class="psp-instrument-tile__offer">' + config.offer + '</span>');
      }
      lines.push('  </div>');
      if (config.badge) {
        lines.push('  <span class="psp-instrument-tile__badge">' + config.badge + '</span>');
      }
      lines.push('</div>');
      return lines.join('\n');
    }

    // Generic code generation for other components
    var tag = componentKey.replace(/([A-Z])/g, '-$1').toLowerCase();
    var lines = [];
    lines.push('<div class="psp-' + tag + '"');
    if (state !== 'enabled') {
      lines.push('     data-state="' + state + '"');
    }
    lines.push('>');
    var controls = (getPlaygroundConfig(componentKey) || {}).controls || [];
    controls.forEach(function(ctrl) {
      if (ctrl === 'state') return;
      if (config[ctrl]) {
        lines.push('  <span class="psp-' + tag + '__' + ctrl + '">' + config[ctrl] + '</span>');
      }
    });
    lines.push('</div>');
    return lines.join('\n');
  }

  /**
   * Render the live preview for a component based on current config.
   * @param {string} componentKey
   * @param {object} config
   * @returns {string} HTML string for the preview
   */
  function renderPreview(componentKey, config) {
    var comp = window.PSP.data.components[componentKey];
    if (!comp) return '';

    var state = config.state || 'enabled';
    var stateSpec = comp.states[state];

    // Build inline styles from state spec
    var styles = [];
    if (stateSpec) {
      if (stateSpec.bg) styles.push('background:' + stateSpec.bg);
      if (stateSpec.border) styles.push('border:' + stateSpec.border);
      if (stateSpec.opacity !== undefined) styles.push('opacity:' + stateSpec.opacity);
      if (stateSpec.outline) styles.push('outline:' + stateSpec.outline);
    } else {
      // Null state (not applicable) - show a muted version
      styles.push('background:#f0f0f0');
      styles.push('border:1px dashed #ccc');
      styles.push('opacity:0.5');
    }

    if (componentKey === 'instrumentTile') {
      var html = '<div class="psp-playground__tile-wrapper">';
      if (config.badge) {
        html += '<span class="psp-playground__tile-badge">' + escapeHtml(config.badge) + '</span>';
      }
      html += '<div class="psp-playground__tile" style="' + styles.join(';') + '">';
      html += '<div class="psp-playground__tile-radio"></div>';
      html += '<div class="psp-playground__tile-icon">' + escapeHtml(config.icon || 'VISA') + '</div>';
      html += '<div class="psp-playground__tile-content">';
      html += '<div class="psp-playground__tile-name">' + escapeHtml(config.name || '') + '</div>';
      html += '<div class="psp-playground__tile-details">' + escapeHtml(config.details || '') + '</div>';
      if (config.offer) {
        html += '<div class="psp-playground__tile-offer">' + escapeHtml(config.offer) + '</div>';
      }
      html += '</div>';
      html += '</div>';
      html += '</div>';
      return html;
    }

    // Generic preview for other components
    var html = '<div class="psp-playground__tile" style="' + styles.join(';') + '">';
    html += '<div class="psp-playground__tile-content">';
    var controls = (getPlaygroundConfig(componentKey) || {}).controls || [];
    controls.forEach(function(ctrl) {
      if (ctrl === 'state') return;
      if (config[ctrl]) {
        html += '<div style="margin-bottom:4px;">' + escapeHtml(config[ctrl]) + '</div>';
      }
    });
    html += '</div>';
    html += '</div>';
    return html;
  }

  /**
   * Escape HTML special characters.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Escape HTML for display inside a code block (preserves structure).
   * @param {string} str
   * @returns {string}
   */
  function escapeCodeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Build the controls panel HTML for a component.
   * @param {string} componentKey
   * @param {object} config - Current config values
   * @returns {string}
   */
  function buildControlsHtml(componentKey, config) {
    var pgConfig = getPlaygroundConfig(componentKey);
    if (!pgConfig) return '';

    var comp = window.PSP.data.components[componentKey];
    var controls = pgConfig.controls || [];
    var html = '';

    controls.forEach(function(ctrl) {
      if (ctrl === 'state') {
        // State selector as button group
        html += '<div class="psp-playground__control-group">';
        html += '<label class="psp-playground__control-label">State</label>';
        html += '<div class="psp-playground__state-buttons">';
        STATES.forEach(function(s) {
          var isActive = config.state === s;
          var isNA = comp && comp.states && comp.states[s] === null;
          var cls = 'psp-playground__state-btn';
          if (isActive) cls += ' psp-playground__state-btn--active';
          if (isNA) cls += ' psp-playground__state-btn--na';
          html += '<button type="button" class="' + cls + '" data-control="state" data-value="' + s + '"';
          if (isNA) html += ' disabled title="Not applicable"';
          html += '>' + STATE_LABELS[s] + '</button>';
        });
        html += '</div>';
        html += '</div>';
      } else if (ctrl === 'icon') {
        // Icon selector dropdown
        html += '<div class="psp-playground__control-group">';
        html += '<label class="psp-playground__control-label">Icon</label>';
        html += '<select class="psp-playground__control-select" data-control="icon">';
        ICON_OPTIONS.forEach(function(opt) {
          var selected = config.icon === opt.value ? ' selected' : '';
          html += '<option value="' + opt.value + '"' + selected + '>' + opt.label + '</option>';
        });
        html += '</select>';
        html += '</div>';
      } else if (ctrl === 'badge') {
        // Badge as text input with toggle behavior (empty = hidden)
        html += '<div class="psp-playground__control-group">';
        html += '<label class="psp-playground__control-label">Badge (empty to hide)</label>';
        html += '<input type="text" class="psp-playground__control-input" data-control="badge" value="' + escapeHtml(config.badge || '') + '" placeholder="e.g. Best offer" />';
        html += '</div>';
      } else {
        // Generic text input
        html += '<div class="psp-playground__control-group">';
        html += '<label class="psp-playground__control-label">' + capitalizeFirst(ctrl) + '</label>';
        html += '<input type="text" class="psp-playground__control-input" data-control="' + ctrl + '" value="' + escapeHtml(config[ctrl] || '') + '" />';
        html += '</div>';
      }
    });

    return html;
  }

  /**
   * Capitalize first letter of a string.
   * @param {string} str
   * @returns {string}
   */
  function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Update the live preview and code snippet in the DOM.
   * Called on any control change.
   * @param {string} componentKey
   */
  function updatePreview(componentKey) {
    var instance = instances[componentKey];
    if (!instance) return;

    var container = instance.containerEl;
    var config = instance.config;

    // Update preview area
    var previewArea = container.querySelector('.psp-playground__preview-area');
    if (previewArea) {
      previewArea.innerHTML = renderPreview(componentKey, config);
    }

    // Update code block
    var codeBlock = container.querySelector('.psp-playground__code-block');
    if (codeBlock) {
      codeBlock.textContent = generateCode(componentKey, config);
    }
  }

  /**
   * Reset the playground to default configuration.
   * @param {string} componentKey
   */
  function resetToDefaults(componentKey) {
    var instance = instances[componentKey];
    if (!instance) return;

    var defaults = getDefaults(componentKey);
    instance.config = defaults;

    // Re-render the entire playground to reset control values
    renderInto(componentKey, instance.containerEl);
  }

  /**
   * Render the full playground into a container element.
   * @param {string} componentKey
   * @param {HTMLElement} containerEl
   */
  function renderInto(componentKey, containerEl) {
    var comp = window.PSP.data.components[componentKey];
    if (!comp || !comp.playground) {
      containerEl.innerHTML = '<p style="color:#888;">No playground configuration for this component.</p>';
      return;
    }

    var config = instances[componentKey] ? instances[componentKey].config : getDefaults(componentKey);

    // Store instance
    instances[componentKey] = { config: config, containerEl: containerEl };

    // Build the full playground HTML
    var html = '<div class="psp-playground" data-component="' + componentKey + '">';

    // Left panel: live preview + code
    html += '<div class="psp-playground__preview-panel">';
    html += '<h4 class="psp-playground__preview-title">Live Preview</h4>';
    html += '<div class="psp-playground__preview-area">';
    html += renderPreview(componentKey, config);
    html += '</div>';
    html += '<div class="psp-playground__code-panel">';
    html += '<h4 class="psp-playground__code-title">Generated Code</h4>';
    html += '<pre class="psp-playground__code-block">' + escapeCodeHtml(generateCode(componentKey, config)) + '</pre>';
    html += '</div>';
    html += '</div>';

    // Right panel: controls
    html += '<div class="psp-playground__controls-panel">';
    html += '<h4 class="psp-playground__controls-title">Properties</h4>';
    html += buildControlsHtml(componentKey, config);
    html += '<button type="button" class="psp-playground__reset-btn" data-action="reset">Reset to defaults</button>';
    html += '</div>';

    html += '</div>';

    containerEl.innerHTML = html;

    // Attach event listeners
    attachListeners(componentKey, containerEl);
  }

  /**
   * Attach event listeners for controls within the playground.
   * Uses event delegation on the container for efficiency.
   * @param {string} componentKey
   * @param {HTMLElement} containerEl
   */
  function attachListeners(componentKey, containerEl) {
    var instance = instances[componentKey];
    if (!instance) return;

    // Handle text inputs - use 'input' event for <100ms response
    var inputs = containerEl.querySelectorAll('.psp-playground__control-input');
    for (var i = 0; i < inputs.length; i++) {
      (function(input) {
        input.addEventListener('input', function() {
          var ctrl = input.getAttribute('data-control');
          instance.config[ctrl] = input.value;
          updatePreview(componentKey);
        });
      })(inputs[i]);
    }

    // Handle select dropdowns
    var selects = containerEl.querySelectorAll('.psp-playground__control-select');
    for (var j = 0; j < selects.length; j++) {
      (function(select) {
        select.addEventListener('input', function() {
          var ctrl = select.getAttribute('data-control');
          instance.config[ctrl] = select.value;
          updatePreview(componentKey);
        });
      })(selects[j]);
    }

    // Handle state buttons
    var stateBtns = containerEl.querySelectorAll('.psp-playground__state-btn');
    for (var k = 0; k < stateBtns.length; k++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          if (btn.disabled) return;
          var value = btn.getAttribute('data-value');
          instance.config.state = value;

          // Update active button styling
          var allBtns = containerEl.querySelectorAll('.psp-playground__state-btn');
          for (var m = 0; m < allBtns.length; m++) {
            allBtns[m].classList.remove('psp-playground__state-btn--active');
          }
          btn.classList.add('psp-playground__state-btn--active');

          updatePreview(componentKey);
        });
      })(stateBtns[k]);
    }

    // Handle reset button
    var resetBtn = containerEl.querySelector('.psp-playground__reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        resetToDefaults(componentKey);
      });
    }
  }

  /**
   * Main render function.
   * Renders the full playground panel for a component.
   *
   * @param {string} componentKey - Key in window.PSP.data.components
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function render(componentKey, containerEl) {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.components) {
      console.error('[PSP Playground] Component data not loaded.');
      return;
    }

    var comp = window.PSP.data.components[componentKey];
    if (!comp) {
      console.error('[PSP Playground] Component not found: ' + componentKey);
      return;
    }

    // Inject styles once
    injectStyles();

    // Render the playground
    renderInto(componentKey, containerEl);
  }

  // Expose on namespace
  window.PSP.renderers.playground = {
    render: render,
    generateCode: generateCode,
    getDefaults: getDefaults,
    getConfig: getConfig,
    resetToDefaults: resetToDefaults,
    updatePreview: updatePreview
  };

})();
