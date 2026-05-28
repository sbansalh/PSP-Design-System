/**
 * PSP Design System - Motion Preview Renderer
 * Animated previews demonstrating motion token transitions.
 * Groups tokens by category (micro, standard, complex) and provides
 * click-to-copy CSS transition shorthand for each token.
 *
 * Usage:
 *   window.PSP.renderers.motionPreview.render(containerEl);
 */
(function() {
  'use strict';

  // Category display order and labels
  var CATEGORY_ORDER = ['micro', 'standard', 'complex'];
  var CATEGORY_LABELS = {
    micro: 'Micro-interactions (< 200ms)',
    standard: 'Standard Transitions (200–500ms)',
    complex: 'Complex Animations (> 500ms)'
  };

  // Check if user prefers reduced motion
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Build the CSS transition shorthand string for a token.
   * e.g. "opacity 200ms cubic-bezier(0.2, 0, 0, 1)"
   * If multiple properties, joins them with commas.
   */
  function buildTransitionShorthand(token) {
    return token.properties.map(function(prop) {
      return prop + ' ' + token.duration + 'ms ' + token.easing;
    }).join(', ');
  }

  /**
   * Group tokens object by category.
   * Returns { micro: [...], standard: [...], complex: [...] }
   * Each entry is { key, token }.
   */
  function groupByCategory(tokens) {
    var groups = { micro: [], standard: [], complex: [] };
    Object.keys(tokens).forEach(function(key) {
      var token = tokens[key];
      var cat = token.category || 'standard';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push({ key: key, token: token });
    });
    return groups;
  }

  /**
   * Copy text to clipboard with fallback.
   */
  function copyToClipboard(text, toastContainer) {
    function showToast(message, success) {
      var toast = document.createElement('div');
      toast.className = 'psp-motion-toast';
      toast.textContent = message;
      toast.style.cssText = [
        'position: fixed',
        'bottom: 24px',
        'left: 50%',
        'transform: translateX(-50%)',
        'padding: 10px 20px',
        'border-radius: 6px',
        'font-size: 13px',
        'font-family: system-ui, -apple-system, sans-serif',
        'color: #ffffff',
        'background: ' + (success ? '#037f0c' : '#d13212'),
        'box-shadow: 0 4px 12px rgba(0,0,0,0.2)',
        'z-index: 10000',
        'opacity: 1',
        'transition: opacity 0.3s'
      ].join(';');
      document.body.appendChild(toast);
      setTimeout(function() {
        toast.style.opacity = '0';
        setTimeout(function() {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
      }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('Copied: ' + text, true);
      }).catch(function() {
        showToast('Copy failed — please copy manually', false);
      });
    } else {
      // Fallback: execCommand
      try {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied: ' + text, true);
      } catch (e) {
        showToast('Copy failed — please copy manually', false);
      }
    }
  }

  /**
   * Create a single motion token preview card.
   */
  function createTokenCard(key, token) {
    var card = document.createElement('div');
    card.className = 'psp-motion-card';
    card.setAttribute('data-token-key', key);
    card.style.cssText = [
      'border: 1px solid #d5d9d9',
      'border-radius: 8px',
      'padding: 20px',
      'margin-bottom: 16px',
      'background: #ffffff',
      'font-family: system-ui, -apple-system, sans-serif'
    ].join(';');

    // Header: token name + duration
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;';

    var nameEl = document.createElement('span');
    nameEl.className = 'psp-motion-card-name';
    nameEl.style.cssText = 'font-weight:600;font-size:14px;color:#16191f;';
    nameEl.textContent = token.name;

    var durationEl = document.createElement('span');
    durationEl.className = 'psp-motion-card-duration';
    durationEl.style.cssText = 'font-size:12px;color:#5f6b7a;background:#f2f3f3;padding:2px 8px;border-radius:4px;';
    durationEl.textContent = token.duration + 'ms';

    header.appendChild(nameEl);
    header.appendChild(durationEl);
    card.appendChild(header);

    // Properties list
    var propsEl = document.createElement('div');
    propsEl.style.cssText = 'font-size:12px;color:#5f6b7a;margin-bottom:12px;';
    propsEl.textContent = 'Properties: ' + token.properties.join(', ');
    card.appendChild(propsEl);

    // Preview area: animated box
    var previewArea = document.createElement('div');
    previewArea.style.cssText = [
      'position: relative',
      'height: 60px',
      'background: #f9fafb',
      'border-radius: 6px',
      'margin-bottom: 12px',
      'overflow: hidden',
      'display: flex',
      'align-items: center',
      'padding: 0 16px'
    ].join(';');

    var previewBox = document.createElement('div');
    previewBox.className = 'psp-motion-preview-box';
    previewBox.style.cssText = [
      'width: 40px',
      'height: 40px',
      'background: #0972d3',
      'border-radius: 6px',
      'transition: none'
    ].join(';');
    previewArea.appendChild(previewBox);
    card.appendChild(previewArea);

    // Controls row: Play button + Copy button
    var controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:8px;align-items:center;';

    // Play button
    var playBtn = document.createElement('button');
    playBtn.className = 'psp-motion-play-btn';
    playBtn.type = 'button';
    playBtn.textContent = '▶ Play';
    playBtn.setAttribute('aria-label', 'Play ' + token.name + ' animation');
    playBtn.style.cssText = [
      'padding: 6px 14px',
      'border: 1px solid #0972d3',
      'border-radius: 4px',
      'background: #ffffff',
      'color: #0972d3',
      'font-size: 13px',
      'font-weight: 500',
      'cursor: pointer',
      'font-family: system-ui, -apple-system, sans-serif'
    ].join(';');

    // Animation logic
    var isAnimating = false;
    playBtn.addEventListener('click', function() {
      if (isAnimating || prefersReducedMotion()) return;
      isAnimating = true;

      // Apply transition
      var transitionValue = buildTransitionShorthand(token);
      previewBox.style.transition = transitionValue;

      // Determine animation based on properties
      var props = token.properties;
      var hasTransform = props.indexOf('transform') !== -1;
      var hasOpacity = props.indexOf('opacity') !== -1;
      var hasBg = props.indexOf('background-color') !== -1;
      var hasHeight = props.indexOf('height') !== -1;
      var hasBorder = props.indexOf('border-color') !== -1;
      var hasShadow = props.indexOf('box-shadow') !== -1;

      // Apply animated state
      if (hasTransform) previewBox.style.transform = 'translateX(120px) scale(1.1)';
      if (hasOpacity) previewBox.style.opacity = '0.3';
      if (hasBg) previewBox.style.backgroundColor = '#037f0c';
      if (hasHeight) previewBox.style.height = '20px';
      if (hasBorder) previewBox.style.borderColor = '#0972d3';
      if (hasShadow) previewBox.style.boxShadow = '0 4px 12px rgba(9,114,211,0.4)';
      if (!hasTransform && !hasOpacity && !hasBg && !hasHeight) {
        // Default: move the box
        previewBox.style.transform = 'translateX(120px)';
      }

      // Reverse after duration
      setTimeout(function() {
        if (hasTransform) previewBox.style.transform = 'none';
        if (hasOpacity) previewBox.style.opacity = '1';
        if (hasBg) previewBox.style.backgroundColor = '#0972d3';
        if (hasHeight) previewBox.style.height = '40px';
        if (hasBorder) previewBox.style.borderColor = 'transparent';
        if (hasShadow) previewBox.style.boxShadow = 'none';
        if (!hasTransform && !hasOpacity && !hasBg && !hasHeight) {
          previewBox.style.transform = 'none';
        }

        setTimeout(function() {
          previewBox.style.transition = 'none';
          isAnimating = false;
        }, token.duration + 50);
      }, token.duration + 100);
    });

    controls.appendChild(playBtn);

    // Copy button
    var shorthand = buildTransitionShorthand(token);
    var copyBtn = document.createElement('button');
    copyBtn.className = 'psp-motion-copy-btn';
    copyBtn.type = 'button';
    copyBtn.textContent = '📋 Copy CSS';
    copyBtn.setAttribute('aria-label', 'Copy CSS transition shorthand for ' + token.name);
    copyBtn.setAttribute('data-copy-value', shorthand);
    copyBtn.style.cssText = [
      'padding: 6px 14px',
      'border: 1px solid #d5d9d9',
      'border-radius: 4px',
      'background: #ffffff',
      'color: #16191f',
      'font-size: 13px',
      'font-weight: 500',
      'cursor: pointer',
      'font-family: system-ui, -apple-system, sans-serif'
    ].join(';');

    copyBtn.addEventListener('click', function() {
      copyToClipboard('transition: ' + shorthand, card);
    });

    controls.appendChild(copyBtn);

    // Shorthand display
    var shorthandDisplay = document.createElement('code');
    shorthandDisplay.className = 'psp-motion-shorthand';
    shorthandDisplay.style.cssText = [
      'display: block',
      'margin-top: 12px',
      'padding: 8px 12px',
      'background: #f2f3f3',
      'border-radius: 4px',
      'font-size: 12px',
      'font-family: monospace',
      'color: #16191f',
      'word-break: break-all',
      'cursor: pointer'
    ].join(';');
    shorthandDisplay.textContent = 'transition: ' + shorthand;
    shorthandDisplay.setAttribute('title', 'Click to copy');
    shorthandDisplay.addEventListener('click', function() {
      copyToClipboard('transition: ' + shorthand, card);
    });

    card.appendChild(controls);
    card.appendChild(shorthandDisplay);

    return card;
  }

  /**
   * Main render function.
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function render(containerEl) {
    if (!window.PSP || !window.PSP.data || !window.PSP.data.motionTokens) {
      console.error('[PSP Motion Preview] Motion token data not loaded.');
      return;
    }

    var tokens = window.PSP.data.motionTokens;
    var groups = groupByCategory(tokens);

    // Clear container
    containerEl.innerHTML = '';

    // Reduced motion notice
    if (prefersReducedMotion()) {
      var notice = document.createElement('div');
      notice.className = 'psp-motion-reduced-notice';
      notice.style.cssText = [
        'padding: 12px 16px',
        'background: #fef3cd',
        'border: 1px solid #ffc107',
        'border-radius: 6px',
        'margin-bottom: 20px',
        'font-size: 13px',
        'font-family: system-ui, -apple-system, sans-serif',
        'color: #664d03'
      ].join(';');
      notice.textContent = 'Animations are disabled because your system prefers reduced motion.';
      containerEl.appendChild(notice);
    }

    // Render each category section
    CATEGORY_ORDER.forEach(function(category) {
      var items = groups[category];
      if (!items || items.length === 0) return;

      // Section header
      var section = document.createElement('div');
      section.className = 'psp-motion-section';
      section.setAttribute('data-category', category);
      section.style.cssText = 'margin-bottom: 32px;';

      var heading = document.createElement('h3');
      heading.className = 'psp-motion-section-heading';
      heading.style.cssText = [
        'font-size: 16px',
        'font-weight: 600',
        'color: #16191f',
        'margin: 0 0 16px 0',
        'padding-bottom: 8px',
        'border-bottom: 1px solid #eaeded',
        'font-family: system-ui, -apple-system, sans-serif'
      ].join(';');
      heading.textContent = CATEGORY_LABELS[category] || category;
      section.appendChild(heading);

      // Render token cards
      items.forEach(function(item) {
        var card = createTokenCard(item.key, item.token);
        section.appendChild(card);
      });

      containerEl.appendChild(section);
    });
  }

  // Expose on namespace
  window.PSP.renderers.motionPreview = {
    render: render,
    buildTransitionShorthand: buildTransitionShorthand,
    groupByCategory: groupByCategory
  };

})();
