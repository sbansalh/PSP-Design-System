/**
 * PSP Design System - Anatomy Diagram Renderer
 * Generates interactive SVG diagrams with numbered callouts.
 * Each callout connects via lines to component parts and shows
 * token values on hover/focus.
 *
 * Usage:
 *   window.PSP.renderers.anatomy.render('instrumentTile', containerEl);
 */
(function() {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  // Diagram layout constants
  var DIAGRAM_WIDTH = 600;
  var DIAGRAM_HEIGHT = 400;
  var CALLOUT_RADIUS = 24; // 48px diameter >= 44px min touch target
  var COMPONENT_OFFSET_X = 160;
  var COMPONENT_OFFSET_Y = 80;
  var COMPONENT_WIDTH = 280;
  var COMPONENT_HEIGHT = 240;

  // Colors
  var COLORS = {
    calloutFill: '#0972d3',
    calloutFillHover: '#004d8c',
    calloutStroke: '#ffffff',
    calloutText: '#ffffff',
    connectorLine: '#888888',
    connectorLineHover: '#0972d3',
    highlightFill: 'rgba(9, 114, 211, 0.12)',
    highlightStroke: '#0972d3',
    componentBg: '#ffffff',
    componentBorder: '#D5D9D9',
    tooltipBg: '#232f3e',
    tooltipText: '#ffffff',
    partLabelText: '#555555'
  };

  /**
   * Create an SVG element with attributes
   */
  function svgEl(tag, attrs) {
    var el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(key) {
        el.setAttribute(key, attrs[key]);
      });
    }
    return el;
  }

  /**
   * Calculate callout positions arranged around the component box
   */
  function getCalloutPositions(partCount) {
    var positions = [];
    var margin = 50;
    var leftX = COMPONENT_OFFSET_X - margin - CALLOUT_RADIUS;
    var rightX = COMPONENT_OFFSET_X + COMPONENT_WIDTH + margin + CALLOUT_RADIUS;
    var topY = COMPONENT_OFFSET_Y + 30;
    var spacing = Math.min(60, (COMPONENT_HEIGHT - 20) / Math.ceil(partCount / 2));

    for (var i = 0; i < partCount; i++) {
      var side = i % 2 === 0 ? 'left' : 'right';
      var row = Math.floor(i / 2);
      var x = side === 'left' ? leftX : rightX;
      var y = topY + row * spacing;
      positions.push({ x: x, y: y, side: side });
    }
    return positions;
  }

  /**
   * Get the connection point on the component part area
   */
  function getPartAnchor(part, side) {
    var px = COMPONENT_OFFSET_X + (part.x || 0) * (COMPONENT_WIDTH / 360);
    var py = COMPONENT_OFFSET_Y + (part.y || 0) * (COMPONENT_HEIGHT / 70);
    // Clamp within component bounds
    px = Math.max(COMPONENT_OFFSET_X + 10, Math.min(px, COMPONENT_OFFSET_X + COMPONENT_WIDTH - 10));
    py = Math.max(COMPONENT_OFFSET_Y + 10, Math.min(py, COMPONENT_OFFSET_Y + COMPONENT_HEIGHT - 10));
    return { x: px, y: py };
  }

  /**
   * Render the simplified component representation
   */
  function renderComponentBox(svg, component) {
    // Outer container
    var box = svgEl('rect', {
      x: COMPONENT_OFFSET_X,
      y: COMPONENT_OFFSET_Y,
      width: COMPONENT_WIDTH,
      height: COMPONENT_HEIGHT,
      rx: 8,
      ry: 8,
      fill: COLORS.componentBg,
      stroke: COLORS.componentBorder,
      'stroke-width': 1.5
    });
    svg.appendChild(box);

    // Component name label
    var label = svgEl('text', {
      x: COMPONENT_OFFSET_X + COMPONENT_WIDTH / 2,
      y: COMPONENT_OFFSET_Y - 12,
      'text-anchor': 'middle',
      'font-size': '14',
      'font-weight': '600',
      fill: '#333333',
      'font-family': 'system-ui, -apple-system, sans-serif'
    });
    label.textContent = component.name;
    svg.appendChild(label);

    // Render simplified part areas inside the component
    var parts = component.anatomy || [];
    parts.forEach(function(part, idx) {
      var px = COMPONENT_OFFSET_X + 12 + (part.x || 0) * (COMPONENT_WIDTH - 24) / 360;
      var py = COMPONENT_OFFSET_Y + 12 + (part.y || 0) * (COMPONENT_HEIGHT - 24) / 70;
      // Clamp
      px = Math.max(COMPONENT_OFFSET_X + 12, Math.min(px, COMPONENT_OFFSET_X + COMPONENT_WIDTH - 60));
      py = Math.max(COMPONENT_OFFSET_Y + 12, Math.min(py, COMPONENT_OFFSET_Y + COMPONENT_HEIGHT - 30));

      var partGroup = svgEl('g', {
        'class': 'psp-anatomy-part',
        'data-part-index': idx
      });

      // Part highlight area (hidden by default)
      var highlight = svgEl('rect', {
        x: px - 4,
        y: py - 4,
        width: 80,
        height: 24,
        rx: 4,
        ry: 4,
        fill: 'transparent',
        stroke: 'transparent',
        'stroke-width': 2,
        'class': 'psp-anatomy-part-highlight'
      });
      partGroup.appendChild(highlight);

      // Part label text
      var partLabel = svgEl('text', {
        x: px,
        y: py + 12,
        'font-size': '10',
        fill: COLORS.partLabelText,
        'font-family': 'system-ui, -apple-system, sans-serif',
        'class': 'psp-anatomy-part-label'
      });
      partLabel.textContent = part.label;
      partGroup.appendChild(partLabel);

      svg.appendChild(partGroup);
    });
  }

  /**
   * Render connector lines from callouts to parts
   */
  function renderConnectors(svg, parts, calloutPositions) {
    parts.forEach(function(part, idx) {
      var callout = calloutPositions[idx];
      var anchor = getPartAnchor(part, callout.side);

      // Calculate line start (edge of callout circle)
      var dx = anchor.x - callout.x;
      var dy = anchor.y - callout.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var startX = callout.x + (dx / dist) * CALLOUT_RADIUS;
      var startY = callout.y + (dy / dist) * CALLOUT_RADIUS;

      var line = svgEl('line', {
        x1: startX,
        y1: startY,
        x2: anchor.x,
        y2: anchor.y,
        stroke: COLORS.connectorLine,
        'stroke-width': 1.5,
        'stroke-dasharray': '4,3',
        'class': 'psp-anatomy-connector',
        'data-part-index': idx
      });
      svg.appendChild(line);

      // Small dot at the end point
      var dot = svgEl('circle', {
        cx: anchor.x,
        cy: anchor.y,
        r: 3,
        fill: COLORS.connectorLine,
        'class': 'psp-anatomy-connector-dot',
        'data-part-index': idx
      });
      svg.appendChild(dot);
    });
  }

  /**
   * Render numbered callout circles
   */
  function renderCallouts(svg, parts, calloutPositions) {
    parts.forEach(function(part, idx) {
      var pos = calloutPositions[idx];

      var group = svgEl('g', {
        'class': 'psp-anatomy-callout',
        'data-part-index': idx,
        tabindex: '0',
        role: 'button',
        'aria-label': 'Callout ' + (idx + 1) + ': ' + part.label + '. ' + part.token
      });

      // Invisible hit area for 44x44 minimum touch target
      var hitArea = svgEl('rect', {
        x: pos.x - CALLOUT_RADIUS,
        y: pos.y - CALLOUT_RADIUS,
        width: CALLOUT_RADIUS * 2,
        height: CALLOUT_RADIUS * 2,
        fill: 'transparent',
        'class': 'psp-anatomy-callout-hit'
      });
      group.appendChild(hitArea);

      // Visible circle
      var circle = svgEl('circle', {
        cx: pos.x,
        cy: pos.y,
        r: CALLOUT_RADIUS - 2,
        fill: COLORS.calloutFill,
        stroke: COLORS.calloutStroke,
        'stroke-width': 2,
        'class': 'psp-anatomy-callout-circle'
      });
      group.appendChild(circle);

      // Number text
      var text = svgEl('text', {
        x: pos.x,
        y: pos.y + 5,
        'text-anchor': 'middle',
        'font-size': '14',
        'font-weight': '700',
        fill: COLORS.calloutText,
        'font-family': 'system-ui, -apple-system, sans-serif',
        'pointer-events': 'none'
      });
      text.textContent = String(idx + 1);
      group.appendChild(text);

      svg.appendChild(group);
    });
  }

  /**
   * Create tooltip element (HTML overlay, not SVG)
   */
  function createTooltip(containerEl) {
    var tooltip = document.createElement('div');
    tooltip.className = 'psp-anatomy-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.style.cssText = [
      'position: absolute',
      'display: none',
      'background: ' + COLORS.tooltipBg,
      'color: ' + COLORS.tooltipText,
      'padding: 10px 14px',
      'border-radius: 6px',
      'font-size: 13px',
      'font-family: system-ui, -apple-system, sans-serif',
      'line-height: 1.4',
      'max-width: 260px',
      'box-shadow: 0 4px 12px rgba(0,0,0,0.2)',
      'z-index: 1000',
      'pointer-events: none',
      'white-space: normal'
    ].join(';');
    containerEl.appendChild(tooltip);
    return tooltip;
  }

  /**
   * Show tooltip for a part
   */
  function showTooltip(tooltip, part, x, y) {
    var html = '<strong style="display:block;margin-bottom:4px;">' + part.label + '</strong>';
    html += '<span style="opacity:0.8;font-size:12px;">' + (part.token || '') + '</span>';
    tooltip.innerHTML = html;
    tooltip.style.display = 'block';
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 60) + 'px';
    tooltip.setAttribute('aria-hidden', 'false');
  }

  /**
   * Hide tooltip
   */
  function hideTooltip(tooltip) {
    tooltip.style.display = 'none';
    tooltip.setAttribute('aria-hidden', 'true');
  }

  /**
   * Highlight a part and its connector
   */
  function highlightPart(svg, idx) {
    // Highlight the part area
    var partHighlights = svg.querySelectorAll('.psp-anatomy-part-highlight[data-part-index]');
    // Use parent group data attribute
    var partGroups = svg.querySelectorAll('.psp-anatomy-part');
    partGroups.forEach(function(g) {
      var partIdx = parseInt(g.getAttribute('data-part-index'), 10);
      var hl = g.querySelector('.psp-anatomy-part-highlight');
      if (partIdx === idx && hl) {
        hl.setAttribute('fill', COLORS.highlightFill);
        hl.setAttribute('stroke', COLORS.highlightStroke);
      }
    });

    // Highlight connector line
    var connectors = svg.querySelectorAll('.psp-anatomy-connector');
    connectors.forEach(function(line) {
      if (parseInt(line.getAttribute('data-part-index'), 10) === idx) {
        line.setAttribute('stroke', COLORS.connectorLineHover);
        line.setAttribute('stroke-width', '2.5');
        line.setAttribute('stroke-dasharray', 'none');
      }
    });

    // Highlight connector dot
    var dots = svg.querySelectorAll('.psp-anatomy-connector-dot');
    dots.forEach(function(dot) {
      if (parseInt(dot.getAttribute('data-part-index'), 10) === idx) {
        dot.setAttribute('fill', COLORS.connectorLineHover);
        dot.setAttribute('r', '5');
      }
    });

    // Highlight callout circle
    var callouts = svg.querySelectorAll('.psp-anatomy-callout');
    callouts.forEach(function(callout) {
      if (parseInt(callout.getAttribute('data-part-index'), 10) === idx) {
        var circle = callout.querySelector('.psp-anatomy-callout-circle');
        if (circle) {
          circle.setAttribute('fill', COLORS.calloutFillHover);
        }
      }
    });
  }

  /**
   * Remove all highlights
   */
  function clearHighlights(svg) {
    var partGroups = svg.querySelectorAll('.psp-anatomy-part');
    partGroups.forEach(function(g) {
      var hl = g.querySelector('.psp-anatomy-part-highlight');
      if (hl) {
        hl.setAttribute('fill', 'transparent');
        hl.setAttribute('stroke', 'transparent');
      }
    });

    var connectors = svg.querySelectorAll('.psp-anatomy-connector');
    connectors.forEach(function(line) {
      line.setAttribute('stroke', COLORS.connectorLine);
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('stroke-dasharray', '4,3');
    });

    var dots = svg.querySelectorAll('.psp-anatomy-connector-dot');
    dots.forEach(function(dot) {
      dot.setAttribute('fill', COLORS.connectorLine);
      dot.setAttribute('r', '3');
    });

    var callouts = svg.querySelectorAll('.psp-anatomy-callout');
    callouts.forEach(function(callout) {
      var circle = callout.querySelector('.psp-anatomy-callout-circle');
      if (circle) {
        circle.setAttribute('fill', COLORS.calloutFill);
      }
    });
  }

  /**
   * Attach hover/focus event listeners to callouts
   */
  function attachInteractions(svg, tooltip, parts, calloutPositions) {
    var callouts = svg.querySelectorAll('.psp-anatomy-callout');

    callouts.forEach(function(callout) {
      var idx = parseInt(callout.getAttribute('data-part-index'), 10);
      var part = parts[idx];
      var pos = calloutPositions[idx];

      function onEnter() {
        highlightPart(svg, idx);
        showTooltip(tooltip, part, pos.x + CALLOUT_RADIUS + 10, pos.y);
      }

      function onLeave() {
        clearHighlights(svg);
        hideTooltip(tooltip);
      }

      callout.addEventListener('mouseenter', onEnter);
      callout.addEventListener('mouseleave', onLeave);
      callout.addEventListener('focus', onEnter);
      callout.addEventListener('blur', onLeave);
    });
  }

  /**
   * Main render function
   * @param {string} componentKey - Key in window.PSP.data.components
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function render(componentKey, containerEl) {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.components) {
      console.error('[PSP Anatomy] Component data not loaded.');
      return;
    }

    var component = window.PSP.data.components[componentKey];
    if (!component) {
      console.error('[PSP Anatomy] Component not found: ' + componentKey);
      return;
    }

    var parts = component.anatomy || [];
    if (parts.length === 0) {
      console.warn('[PSP Anatomy] No anatomy parts for: ' + componentKey);
      return;
    }

    // Clear container
    containerEl.innerHTML = '';
    containerEl.style.position = 'relative';

    // Create SVG
    var svg = svgEl('svg', {
      width: '100%',
      height: DIAGRAM_HEIGHT,
      viewBox: '0 0 ' + DIAGRAM_WIDTH + ' ' + DIAGRAM_HEIGHT,
      'aria-label': component.name + ' anatomy diagram with ' + parts.length + ' callouts',
      role: 'img',
      'class': 'psp-anatomy-svg'
    });

    // Background
    var bg = svgEl('rect', {
      x: 0,
      y: 0,
      width: DIAGRAM_WIDTH,
      height: DIAGRAM_HEIGHT,
      fill: '#f9fafb',
      rx: 8,
      ry: 8
    });
    svg.appendChild(bg);

    // Calculate callout positions
    var calloutPositions = getCalloutPositions(parts.length);

    // Render layers in order: component box, connectors, callouts
    renderComponentBox(svg, component);
    renderConnectors(svg, parts, calloutPositions);
    renderCallouts(svg, parts, calloutPositions);

    containerEl.appendChild(svg);

    // Create tooltip (HTML overlay)
    var tooltip = createTooltip(containerEl);

    // Attach interactions
    attachInteractions(svg, tooltip, parts, calloutPositions);
  }

  /**
   * Get callout element minimum dimensions
   * @returns {{ width: number, height: number }}
   */
  function getMinCalloutSize() {
    return { width: CALLOUT_RADIUS * 2, height: CALLOUT_RADIUS * 2 };
  }

  // Expose on namespace
  window.PSP.renderers.anatomy = {
    render: render,
    getMinCalloutSize: getMinCalloutSize
  };

})();
