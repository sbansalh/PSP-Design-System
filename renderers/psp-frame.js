/**
 * PSP Design System - Shared PSP Frame Renderer
 * Generates pixel-perfect PSP phone frame mockups from structured config.
 * Used by both Mental Model (static) and "Create Your PSP" (dynamic).
 *
 * Design tokens are hardcoded constants — NOT CSS variables.
 * This ensures output is always correct regardless of context.
 *
 * Usage:
 *   var html = window.PSP.renderers.pspFrame.render(config);
 *   window.PSP.renderers.pspFrame.attachInteractivity(containerEl);
 */
(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // DESIGN TOKENS (hardcoded, not variable — guarantees pixel-perfect output)
  // ═══════════════════════════════════════════════════════════════

  var TOKENS = {
    // Container
    frameBg: '#F7FAFA',
    frameBorder: '0.5px solid #989898',
    frameRadius: '30px',
    frameShadow: '0 4px 24px rgba(0,0,0,.12)',
    frameMaxWidth: '360px',

    // Header
    headerGradient: 'linear-gradient(135deg,#82D8E3,#A6E7CE)',
    headerPadding: '14px 16px',
    headerTitle: 'Select a Payment Method',
    headerTitleSize: '16px',
    headerTitleColor: '#0F1111',

    // Address bar
    addressBg: '#F7FEFF',
    addressPadding: '10px 16px',
    addressBorder: '1px solid #E5E5E5',

    // Section header
    sectionFontSize: '13px',
    sectionFontWeight: '700',
    sectionColor: '#565959',
    sectionLetterSpacing: '.5px',

    // Card group
    groupBg: '#FFF',
    groupBorder: '0.55px solid #D5D9D9',
    groupRadius: '12px',

    // Tile (non-selected)
    tilePadding: '12px',
    tileBg: '#FFF',

    // Tile (selected)
    tileSelectedBg: '#EDF8FF',
    tileSelectedBorder: '2px solid #2162A1',
    tileSelectedPadding: '10px', // compensate for 2px border

    // Divider
    dividerStyle: '0.5px dashed #6F7373',
    dividerMargin: '0 12px',

    // Icon
    iconWidth: '48px',
    iconHeight: '32px',
    iconRadius: '4px',

    // Badge (non-selected)
    badgeGreyBg: '#E3E6E6',
    badgeGreyColor: '#232F3E',

    // Badge (selected)
    badgeBlueBg: '#0A7CD1',
    badgeBlueColor: '#FFFFFF',

    // Badge common
    badgeFontSize: '10px',
    badgePadding: '2px 8px',
    badgeRadius: '13px',

    // Name
    nameFontSize: '14px',
    nameColor: '#0F1111',
    nameWeightNormal: '400',
    nameWeightBold: '700',

    // Details
    detailFontSize: '12px',
    detailColor: '#565959',

    // Offer
    offerFontSize: '12px',
    offerColor: '#0B7B3C',
    linkColor: '#2162A1',

    // Radio button
    radioSize: '20',
    radioStrokeDefault: '#D5D9D9',
    radioStrokeSelected: '#2162A1',
    radioFillSelected: '#2162A1',
    radioStrokeWidth: '2',
    radioInnerR: '5',

    // CTA Bar
    savingsBg: '#E8FFF8',
    savingsColor: '#0B7B3C',
    ctaBg: '#FFD814',
    ctaRadius: '92px',
    ctaWidth: '170px',
    ctaHeight: '47px',
    priceSize: '22px'
  };

  // ═══════════════════════════════════════════════════════════════
  // TILE RENDERER
  // ═══════════════════════════════════════════════════════════════

  /**
   * Render a single instrument tile.
   * @param {object} tile - { icon, name, details, badge, offer, detailsLink, selected, disabled, position }
   * @param {object} opts - { position: 'top'|'middle'|'bottom'|'only'|'single' }
   * @returns {string} HTML string
   */
  function renderTile(tile, opts) {
    opts = opts || {};
    var isSelected = !!tile.selected;
    var isDisabled = !!tile.disabled;
    var position = opts.position || 'middle';

    // Container styles
    var bg = isSelected ? TOKENS.tileSelectedBg : TOKENS.tileBg;
    var border = isSelected ? TOKENS.tileSelectedBorder : 'none';
    var padding = isSelected ? TOKENS.tileSelectedPadding : TOKENS.tilePadding;
    var opacity = isDisabled ? '0.7' : '1';
    var radius = '0';
    if (isSelected) {
      switch (position) {
        case 'top': radius = '12px 12px 0 0'; break;
        case 'bottom': radius = '0 0 12px 12px'; break;
        case 'only': case 'single': radius = '12px'; break;
        default: radius = '0';
      }
    }

    // Badge
    var badgeBg = isSelected ? TOKENS.badgeBlueBg : TOKENS.badgeGreyBg;
    var badgeColor = isSelected ? TOKENS.badgeBlueColor : TOKENS.badgeGreyColor;

    // Name weight
    var nameWeight = isSelected ? TOKENS.nameWeightBold : TOKENS.nameWeightNormal;

    // Radio
    var radioStroke = isSelected ? TOKENS.radioStrokeSelected : TOKENS.radioStrokeDefault;
    var radioInner = isSelected
      ? '<circle cx="10" cy="10" r="' + TOKENS.radioInnerR + '" fill="' + TOKENS.radioFillSelected + '"/>'
      : '';

    // Build HTML
    var html = '';
    html += '<div data-psp-tile style="background:' + bg + ';border:' + border + ';border-radius:' + radius + ';padding:' + padding + ';opacity:' + opacity + ';cursor:pointer">';
    html += '<div style="display:flex;align-items:center;gap:10px">';

    // Icon
    if (tile.icon) {
      html += '<div style="width:' + TOKENS.iconWidth + ';height:' + TOKENS.iconHeight + ';border-radius:' + TOKENS.iconRadius + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">';
      html += '<img src="' + tile.icon + '" style="width:100%;height:100%;object-fit:contain" alt="">';
      html += '</div>';
    }

    // Content
    html += '<div style="flex:1;min-width:0">';

    // Badge
    if (tile.badge) {
      html += '<div style="margin-bottom:4px"><span data-psp-badge style="background:' + badgeBg + ';color:' + badgeColor + ';font-size:' + TOKENS.badgeFontSize + ';padding:' + TOKENS.badgePadding + ';border-radius:' + TOKENS.badgeRadius + ';display:inline-block">' + tile.badge + '</span></div>';
    }

    // Name
    html += '<div data-psp-name style="font-size:' + TOKENS.nameFontSize + ';font-weight:' + nameWeight + ';color:' + TOKENS.nameColor + '">' + tile.name + '</div>';

    // Details
    if (tile.details) {
      html += '<div style="font-size:' + TOKENS.detailFontSize + ';color:' + TOKENS.detailColor + ';margin-top:2px">' + tile.details + '</div>';
    }

    // Offer
    if (tile.offer) {
      html += '<div style="font-size:' + TOKENS.offerFontSize + ';color:' + TOKENS.offerColor + ';margin-top:2px">' + tile.offer;
      if (tile.detailsLink) {
        html += ' <span style="color:' + TOKENS.linkColor + '">' + tile.detailsLink + '</span>';
      }
      html += '</div>';
    }

    // Bank pill (for UPI)
    if (tile.bankPill) {
      html += '<div style="display:inline-flex;align-items:center;gap:4px;background:#FFF;border:0.5px solid #D5D9D9;border-radius:20px;padding:3px 8px;margin-top:4px">';
      if (tile.bankPill.icon) {
        html += '<img src="' + tile.bankPill.icon + '" style="width:14px;height:14px;border-radius:50%;object-fit:cover;flex-shrink:0">';
      }
      html += '<span style="font-size:11px;color:#565959">' + tile.bankPill.text + '</span>';
      html += '<span style="font-size:14px;color:#565959;flex-shrink:0">&rsaquo;</span>';
      html += '</div>';
    }

    // Insufficient balance CTA
    if (tile.insufficientCta) {
      html += '<div style="display:flex;align-items:center;gap:8px;margin-top:6px">';
      html += '<span style="font-size:11.5px;color:#565959;white-space:nowrap">' + tile.insufficientCta.text + '</span>';
      html += '<div style="background:#FFF;border:1px solid #888C8C;border-radius:61px;padding:1px 10px;font-size:11.5px;color:#0F1111;white-space:nowrap;flex-shrink:0;line-height:22px">' + tile.insufficientCta.button + '</div>';
      html += '</div>';
    }

    html += '</div>'; // close content

    // Radio button
    html += '<svg width="' + TOKENS.radioSize + '" height="' + TOKENS.radioSize + '" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="' + radioStroke + '" stroke-width="' + TOKENS.radioStrokeWidth + '"/>' + radioInner + '</svg>';

    html += '</div>'; // close flex row
    html += '</div>'; // close tile container

    return html;
  }

  // ═══════════════════════════════════════════════════════════════
  // SECTION RENDERER
  // ═══════════════════════════════════════════════════════════════

  /**
   * Render a section (group of tiles with header).
   * @param {object} section - { title, tiles: [], addLink }
   * @returns {string} HTML string
   */
  function renderSection(section) {
    if (!section.tiles || section.tiles.length === 0) return '';

    var html = '';
    html += '<div style="padding:8px 16px 0">';
    html += '<div style="font-size:' + TOKENS.sectionFontSize + ';font-weight:' + TOKENS.sectionFontWeight + ';color:' + TOKENS.sectionColor + ';letter-spacing:' + TOKENS.sectionLetterSpacing + ';margin-bottom:8px">' + section.title + '</div>';
    html += '<div style="background:' + TOKENS.groupBg + ';border:' + TOKENS.groupBorder + ';border-radius:' + TOKENS.groupRadius + ';overflow:hidden;margin-bottom:8px">';

    for (var i = 0; i < section.tiles.length; i++) {
      var tile = section.tiles[i];
      var position = 'middle';
      if (section.tiles.length === 1) position = 'only';
      else if (i === 0) position = 'top';
      else if (i === section.tiles.length - 1) position = 'bottom';

      html += renderTile(tile, { position: position });

      // Divider (except after last tile)
      if (i < section.tiles.length - 1) {
        html += '<div style="margin:' + TOKENS.dividerMargin + ';border-top:' + TOKENS.dividerStyle + '"></div>';
      }
    }

    // Add link
    if (section.addLink) {
      html += '<div style="margin:' + TOKENS.dividerMargin + ';border-top:' + TOKENS.dividerStyle + '"></div>';
      html += '<div style="padding:12px"><span style="font-size:14px;color:' + TOKENS.linkColor + '">' + section.addLink + '</span></div>';
    }

    html += '</div>'; // close card group
    html += '</div>'; // close section

    return html;
  }

  // ═══════════════════════════════════════════════════════════════
  // CTA BAR RENDERER
  // ═══════════════════════════════════════════════════════════════

  /**
   * Render the sticky CTA bar.
   * @param {object} cta - { savings, offersLink, price, feeNote, buttonText }
   * @returns {string} HTML string
   */
  function renderCtaBar(cta) {
    if (!cta) return '';
    var html = '<div>';

    // Savings bar
    if (cta.savings) {
      html += '<div style="background:' + TOKENS.savingsBg + ';padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;border-top:1px solid #E6E6E6;box-shadow:0 -2px 5px rgba(0,0,0,0.08)">';
      html += '<span style="font-size:14px;color:' + TOKENS.savingsColor + ';font-weight:700">' + cta.savings + '</span>';
      if (cta.offersLink) {
        html += '<span style="font-size:14px;color:' + TOKENS.linkColor + '">' + cta.offersLink + '</span>';
      }
      html += '</div>';
    }

    // Price + button
    html += '<div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center;background:#FFF">';
    html += '<div><span style="font-size:13px;font-weight:700">&#8377;</span><span style="font-size:' + TOKENS.priceSize + ';font-weight:700">' + (cta.price || '0') + '</span>';
    if (cta.feeNote) {
      html += '<div style="font-size:14px;color:#565959">' + cta.feeNote + '</div>';
    }
    html += '</div>';
    html += '<div style="background:' + TOKENS.ctaBg + ';border-radius:' + TOKENS.ctaRadius + ';width:' + TOKENS.ctaWidth + ';height:' + TOKENS.ctaHeight + ';display:flex;align-items:center;justify-content:center"><span style="font-size:16px;color:#0F1111">' + (cta.buttonText || 'Continue') + '</span></div>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  // ═══════════════════════════════════════════════════════════════
  // FULL PSP RENDERER
  // ═══════════════════════════════════════════════════════════════

  /**
   * Render a complete PSP phone frame from config.
   * @param {object} config - {
   *   address: { name, detail, showChange },
   *   sections: [ { title, tiles: [...], addLink } ],
   *   giftCard: { text },
   *   cta: { savings, offersLink, price, feeNote, buttonText }
   * }
   * @returns {string} Full phone frame HTML
   */
  function render(config) {
    if (!config) return '';

    var html = '';

    // Phone frame container
    html += '<div class="psp-generated-frame" style="width:100%;max-width:' + TOKENS.frameMaxWidth + ';border-radius:' + TOKENS.frameRadius + ';background:' + TOKENS.frameBg + ';border:' + TOKENS.frameBorder + ';overflow:hidden;box-shadow:' + TOKENS.frameShadow + '">';

    // Header
    html += '<div style="background:' + TOKENS.headerGradient + ';padding:' + TOKENS.headerPadding + ';display:flex;align-items:center;gap:10px">';
    html += '<span style="font-size:18px;color:#000">&larr;</span>';
    html += '<span style="font-size:' + TOKENS.headerTitleSize + ';color:' + TOKENS.headerTitleColor + '">' + TOKENS.headerTitle + '</span>';
    html += '</div>';

    // Address bar
    if (config.address) {
      html += '<div style="padding:' + TOKENS.addressPadding + ';background:' + TOKENS.addressBg + ';display:flex;justify-content:space-between;align-items:flex-start;border-bottom:' + TOKENS.addressBorder + '">';
      html += '<div style="display:flex;align-items:flex-start;gap:6px"><span style="font-size:14px;margin-top:1px">&#128205;</span><div>';
      html += '<span style="font-size:13px;font-weight:700;color:#0F1111">' + (config.address.name || 'Deliver to Customer') + '</span>';
      if (config.address.detail) {
        html += '<div style="font-size:13px;color:#0F1111">' + config.address.detail + '</div>';
      }
      html += '</div></div>';
      if (config.address.showChange !== false) {
        html += '<span style="font-size:13px;color:' + TOKENS.linkColor + ';flex-shrink:0">Change</span>';
      }
      html += '</div>';
    }

    // Sections
    if (config.sections) {
      for (var i = 0; i < config.sections.length; i++) {
        html += renderSection(config.sections[i]);
      }
    }

    // Gift card row
    if (config.giftCard) {
      html += '<div style="padding:8px 16px"><div style="background:#FFF;border:0.5px solid #D5D9D9;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center">';
      html += '<span style="font-size:14px;color:' + TOKENS.linkColor + '">' + (config.giftCard.text || 'Add Gift Card or Promo Code') + '</span>';
      html += '<span style="color:' + TOKENS.linkColor + '">&rsaquo;</span>';
      html += '</div></div>';
    }

    // CTA bar
    if (config.cta) {
      html += renderCtaBar(config.cta);
    }

    html += '</div>'; // close phone frame

    return html;
  }

  // ═══════════════════════════════════════════════════════════════
  // INTERACTIVITY (click-to-select tiles)
  // ═══════════════════════════════════════════════════════════════

  /**
   * Attach click-to-select interactivity to a rendered PSP frame.
   * @param {HTMLElement} containerEl - The element containing the rendered frame
   */
  function attachInteractivity(containerEl) {
    if (!containerEl) return;

    var frame = containerEl.querySelector('.psp-generated-frame');
    if (!frame) frame = containerEl;

    var tiles = frame.querySelectorAll('[data-psp-tile]');
    if (tiles.length === 0) return;

    // Determine positions
    var tileArray = Array.prototype.slice.call(tiles);

    frame.addEventListener('click', function(e) {
      var clickedTile = e.target.closest('[data-psp-tile]');
      if (!clickedTile) return;

      // Deselect all
      tileArray.forEach(function(t) {
        t.style.background = TOKENS.tileBg;
        t.style.border = 'none';
        t.style.borderRadius = '0';
        t.style.padding = TOKENS.tilePadding;

        // Radio
        var svg = t.querySelector('svg');
        if (svg) {
          var outer = svg.querySelector('circle');
          if (outer) outer.setAttribute('stroke', TOKENS.radioStrokeDefault);
          var inner = svg.querySelectorAll('circle')[1];
          if (inner) inner.parentNode.removeChild(inner);
        }

        // Badge
        var badge = t.querySelector('[data-psp-badge]');
        if (badge) {
          badge.style.background = TOKENS.badgeGreyBg;
          badge.style.color = TOKENS.badgeGreyColor;
        }

        // Name
        var name = t.querySelector('[data-psp-name]');
        if (name) name.style.fontWeight = TOKENS.nameWeightNormal;
      });

      // Determine position of clicked tile
      var idx = tileArray.indexOf(clickedTile);
      var parent = clickedTile.parentElement;
      var siblingsInParent = [];
      tileArray.forEach(function(t, ti) {
        if (t.parentElement === parent) siblingsInParent.push(ti);
      });
      var posInGroup = siblingsInParent.indexOf(idx);
      var position = 'middle';
      if (siblingsInParent.length === 1) position = 'only';
      else if (posInGroup === 0) position = 'top';
      else if (posInGroup === siblingsInParent.length - 1) position = 'bottom';

      var radius = '0';
      switch (position) {
        case 'top': radius = '12px 12px 0 0'; break;
        case 'bottom': radius = '0 0 12px 12px'; break;
        case 'only': radius = '12px'; break;
      }

      // Select clicked tile
      clickedTile.style.background = TOKENS.tileSelectedBg;
      clickedTile.style.border = TOKENS.tileSelectedBorder;
      clickedTile.style.borderRadius = radius;
      clickedTile.style.padding = TOKENS.tileSelectedPadding;

      // Radio
      var svg = clickedTile.querySelector('svg');
      if (svg) {
        var outer = svg.querySelector('circle');
        if (outer) outer.setAttribute('stroke', TOKENS.radioStrokeSelected);
        var inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        inner.setAttribute('cx', '10');
        inner.setAttribute('cy', '10');
        inner.setAttribute('r', TOKENS.radioInnerR);
        inner.setAttribute('fill', TOKENS.radioFillSelected);
        svg.appendChild(inner);
      }

      // Badge
      var badge = clickedTile.querySelector('[data-psp-badge]');
      if (badge) {
        badge.style.background = TOKENS.badgeBlueBg;
        badge.style.color = TOKENS.badgeBlueColor;
      }

      // Name
      var name = clickedTile.querySelector('[data-psp-name]');
      if (name) name.style.fontWeight = TOKENS.nameWeightBold;
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // EXPOSE API
  // ═══════════════════════════════════════════════════════════════

  window.PSP.renderers.pspFrame = {
    render: render,
    renderTile: renderTile,
    renderSection: renderSection,
    renderCtaBar: renderCtaBar,
    attachInteractivity: attachInteractivity,
    TOKENS: TOKENS
  };

})();
