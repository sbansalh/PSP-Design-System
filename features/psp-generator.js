/**
 * PSP Design System - "Create Your PSP" AI Generator
 * LLM-Powered Natural Language → PSP Config Engine
 *
 * Architecture:
 *   1. User prompt → LLM intent extraction (with rule-based fallback)
 *   2. Structured intent → PSP config builder (applies hierarchy rules)
 *   3. Config → psp-frame.js renderer (unchanged)
 *
 * Loading: Shimmer animation with twinkling stars (2.5s) before result.
 *
 * Usage:
 *   window.PSP.features.pspGenerator.generate(prompt, outputEl);
 *   // Or synchronous (legacy):
 *   var config = window.PSP.features.pspGenerator.parse(prompt);
 */
(function() {
  'use strict';

  var registry = null;
  function getRegistry() {
    if (!registry && window.PSP && window.PSP.data && window.PSP.data.instrumentRegistry) {
      registry = window.PSP.data.instrumentRegistry;
    }
    return registry;
  }

  // ═══════════════════════════════════════════
  // LLM CONFIGURATION
  // ═══════════════════════════════════════════

  var LLM_CONFIG = {
    // Set to a real endpoint to enable LLM mode
    // e.g., 'https://your-api-gateway.execute-api.ap-south-1.amazonaws.com/prod/generate-psp'
    endpoint: null,
    model: 'anthropic.claude-3-haiku-20240307-v1:0',
    timeout: 8000
  };

  var LLM_SYSTEM_PROMPT = [
    'You are a PSP (Payment Selection Page) config generator for Amazon India.',
    'Output ONLY valid JSON — no markdown, no explanation.',
    '',
    'HIERARCHY: RECOMMENDED (max 3, badges) → UPI → CARDS → MORE WAYS TO PAY.',
    'Badge priority: Best offer > Previously used > Featured.',
    'UPI instruments ONLY go in UPI section. Card instruments ONLY in CARDS.',
    'First instrument (best offer) is always auto-selected.',
    '',
    'INSTRUMENTS: cbcc, hdfc_credit, hdfc_debit, icici_credit, sbi_debit,',
    'apay_upi, other_upi, apay_balance, apay_later, cod, emi, net_banking.',
    '',
    'OUTPUT: {"orderAmount":N,"customerName":"S","address":"S",',
    '"sections":[{"type":"recommended|upi|cards|more_ways",',
    '"instruments":[{"id":"X","badge":"Best offer|Previously used|Featured|null",',
    '"offerAmount":N|null,"state":"normal|disabled|insufficient"}]}]}'
  ].join('\n');

  // ═══════════════════════════════════════════
  // LOADING ANIMATION (shimmer + twinkling stars)
  // ═══════════════════════════════════════════

  function buildShimmerTile() {
    return [
      '<div style="padding:12px;display:flex;align-items:center;gap:10px">',
      '  <div class="psp-shimmer-bar" style="width:48px;height:32px;border-radius:4px;flex-shrink:0"></div>',
      '  <div style="flex:1">',
      '    <div class="psp-shimmer-bar" style="width:70%;height:11px;border-radius:4px;margin-bottom:6px"></div>',
      '    <div class="psp-shimmer-bar" style="width:50%;height:9px;border-radius:4px"></div>',
      '  </div>',
      '  <div class="psp-shimmer-bar" style="width:20px;height:20px;border-radius:50%;flex-shrink:0"></div>',
      '</div>'
    ].join('');
  }

  function buildLoadingHTML() {
    var tile = buildShimmerTile();
    var divider = '<div style="margin:0 12px;border-top:0.5px dashed #D5D9D9"></div>';
    return [
      '<div class="psp-ai-loading" style="width:100%;max-width:360px;border-radius:30px;background:#F7FAFA;border:0.5px solid #989898;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.12);position:relative">',
      // Header
      '<div style="background:linear-gradient(135deg,#82D8E3,#A6E7CE);padding:14px 16px;display:flex;align-items:center;gap:10px">',
      '  <div class="psp-shimmer-bar" style="width:20px;height:16px;border-radius:4px"></div>',
      '  <div class="psp-shimmer-bar" style="width:170px;height:14px;border-radius:4px"></div>',
      '</div>',
      // Address
      '<div style="padding:10px 16px;background:#F7FEFF;border-bottom:1px solid #E5E5E5">',
      '  <div style="display:flex;gap:8px;align-items:center">',
      '    <div class="psp-shimmer-bar" style="width:14px;height:14px;border-radius:50%"></div>',
      '    <div style="flex:1"><div class="psp-shimmer-bar" style="width:55%;height:11px;border-radius:4px;margin-bottom:5px"></div><div class="psp-shimmer-bar" style="width:75%;height:9px;border-radius:4px"></div></div>',
      '  </div>',
      '</div>',
      // Section label
      '<div style="padding:12px 16px 6px"><div class="psp-shimmer-bar" style="width:100px;height:9px;border-radius:4px"></div></div>',
      // Tile group (3 tiles)
      '<div style="padding:0 16px"><div style="background:#FFF;border:0.55px solid #E3E6E6;border-radius:12px;overflow:hidden">',
      tile, divider, tile, divider, tile,
      '</div></div>',
      // Second section label
      '<div style="padding:14px 16px 6px"><div class="psp-shimmer-bar" style="width:60px;height:9px;border-radius:4px"></div></div>',
      // Single tile
      '<div style="padding:0 16px"><div style="background:#FFF;border:0.55px solid #E3E6E6;border-radius:12px;overflow:hidden">',
      tile,
      '</div></div>',
      // CTA shimmer
      '<div style="padding:16px">',
      '  <div style="display:flex;justify-content:space-between;align-items:center">',
      '    <div class="psp-shimmer-bar" style="width:70px;height:22px;border-radius:4px"></div>',
      '    <div class="psp-shimmer-bar" style="width:140px;height:42px;border-radius:92px"></div>',
      '  </div>',
      '</div>',
      // Twinkling stars overlay
      '<div class="psp-ai-stars"></div>',
      // Status text
      '<div class="psp-ai-status">',
      '  <span class="psp-ai-status-dot"></span>',
      '  <span>AI is crafting your PSP...</span>',
      '</div>',
      '</div>'
    ].join('\n');
  }

  // Inject CSS for shimmer + stars animation (once)
  var styleInjected = false;
  function injectStyles() {
    if (styleInjected) return;
    styleInjected = true;
    var style = document.createElement('style');
    style.textContent = [
      '@keyframes pspShimmer {',
      '  0% { background-position: -200px 0; }',
      '  100% { background-position: 200px 0; }',
      '}',
      '.psp-shimmer-bar {',
      '  background: linear-gradient(90deg, #E8E8E8 25%, #F5F5F5 50%, #E8E8E8 75%);',
      '  background-size: 400px 100%;',
      '  animation: pspShimmer 1.4s ease-in-out infinite;',
      '}',
      '@keyframes pspTwinkle {',
      '  0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }',
      '  50% { opacity: 1; transform: scale(1) rotate(180deg); }',
      '}',
      '.psp-ai-stars {',
      '  position: absolute; inset: 0; pointer-events: none; overflow: hidden;',
      '}',
      '.psp-ai-stars::before, .psp-ai-stars::after,',
      '.psp-ai-stars .star-1, .psp-ai-stars .star-2, .psp-ai-stars .star-3,',
      '.psp-ai-stars .star-4, .psp-ai-stars .star-5 {',
      '  content: "✦"; position: absolute; font-size: 14px; color: #FF9900;',
      '  animation: pspTwinkle 2s ease-in-out infinite;',
      '}',
      '.psp-ai-stars::before { top: 15%; left: 20%; animation-delay: 0s; }',
      '.psp-ai-stars::after { top: 35%; right: 15%; animation-delay: 0.4s; font-size: 10px; }',
      '.psp-ai-stars .star-1 { top: 55%; left: 10%; animation-delay: 0.8s; font-size: 12px; }',
      '.psp-ai-stars .star-2 { top: 70%; right: 25%; animation-delay: 1.2s; font-size: 16px; }',
      '.psp-ai-stars .star-3 { top: 25%; right: 30%; animation-delay: 0.6s; font-size: 11px; }',
      '.psp-ai-stars .star-4 { top: 80%; left: 35%; animation-delay: 1.5s; font-size: 13px; }',
      '.psp-ai-stars .star-5 { top: 45%; left: 50%; animation-delay: 1.0s; font-size: 9px; }',
      '.psp-ai-status {',
      '  position: absolute; bottom: 70px; left: 50%; transform: translateX(-50%);',
      '  background: rgba(255,255,255,0.95); border: 1px solid #E3E6E6;',
      '  border-radius: 20px; padding: 8px 16px; font-size: 12px; color: #565959;',
      '  display: flex; align-items: center; gap: 8px; white-space: nowrap;',
      '  box-shadow: 0 2px 8px rgba(0,0,0,0.08);',
      '}',
      '@keyframes pspDotPulse { 0%,100%{opacity:.3} 50%{opacity:1} }',
      '.psp-ai-status-dot {',
      '  width: 6px; height: 6px; border-radius: 50%; background: #FF9900;',
      '  animation: pspDotPulse 1s ease-in-out infinite;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function showLoading(containerEl) {
    injectStyles();
    containerEl.innerHTML = buildLoadingHTML();
    // Add star span elements (CSS pseudo-elements only give 2, we need more)
    var starsEl = containerEl.querySelector('.psp-ai-stars');
    if (starsEl) {
      for (var i = 1; i <= 5; i++) {
        var span = document.createElement('span');
        span.className = 'star-' + i;
        starsEl.appendChild(span);
      }
    }
  }

  // ═══════════════════════════════════════════
  // KEYWORD MAPPINGS (rule-based fallback)
  // ═══════════════════════════════════════════

  var INSTRUMENT_KEYWORDS = {
    cbcc: ['cbcc', 'icici credit', 'amazon pay icici', 'apay icici', 'icici cc', 'icici card', 'amazon icici'],
    hdfc_credit: ['hdfc credit', 'hdfc cc', 'hdfc card'],
    hdfc_debit: ['hdfc debit', 'hdfc dc'],
    icici_credit: ['icici bank credit'],
    sbi_debit: ['sbi debit', 'sbi card', 'sbi dc'],
    apay_upi: ['apay upi', 'amazon upi', 'amazon pay upi', 'upi linked', 'upi'],
    other_upi: ['other upi', 'any upi', 'gpay', 'phonepe', 'paytm upi'],
    apay_balance: ['apb', 'amazon pay balance', 'apay balance', 'balance', 'wallet'],
    apay_later: ['apl', 'pay later', 'amazon pay later', 'bnpl', 'credit line'],
    cod: ['cod', 'cash on delivery', 'pay on delivery', 'pod'],
    emi: ['emi', 'installment', 'monthly payment'],
    net_banking: ['net banking', 'netbanking', 'internet banking', 'neft']
  };

  var BADGE_KEYWORDS = {
    'best offer': ['best offer', 'best cashback', 'highest offer', 'top offer'],
    'Previously used': ['previously used', 'last used', 'recent', 'usual'],
    'Featured': ['featured', 'recommended', 'suggested', 'popular']
  };

  var STATE_KEYWORDS = {
    disabled: ['expired', 'blocked', 'unavailable', 'disabled', 'inactive'],
    insufficient: ['insufficient', 'low balance', 'not enough', 'add money']
  };

  // ═══════════════════════════════════════════
  // EXTRACTION HELPERS (rule-based NLP)
  // ═══════════════════════════════════════════

  function extractOrderAmount(prompt) {
    var patterns = [
      /(?:\u20B9|rs\.?|inr)\s*([\d,]+)/i,
      /([\d,]+)\s*(?:order|amount|total|rupee)/i,
      /order\s*(?:of|for|worth|value)?\s*(?:\u20B9|rs\.?|inr)?\s*([\d,]+)/i
    ];
    for (var i = 0; i < patterns.length; i++) {
      var match = prompt.match(patterns[i]);
      if (match) return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return null;
  }

  function extractInstruments(prompt) {
    var lower = prompt.toLowerCase();
    var found = [];
    var allKw = [];
    var keys = Object.keys(INSTRUMENT_KEYWORDS);
    for (var k = 0; k < keys.length; k++) {
      var kws = INSTRUMENT_KEYWORDS[keys[k]];
      for (var j = 0; j < kws.length; j++) {
        allKw.push({ id: keys[k], keyword: kws[j] });
      }
    }
    allKw.sort(function(a, b) { return b.keyword.length - a.keyword.length; });
    for (var i = 0; i < allKw.length; i++) {
      if (lower.indexOf(allKw[i].keyword) !== -1 && found.indexOf(allKw[i].id) === -1) {
        found.push(allKw[i].id);
      }
    }
    return found;
  }

  function extractOffers(prompt) {
    var lower = prompt.toLowerCase();
    var offers = {};
    var keys = Object.keys(INSTRUMENT_KEYWORDS);
    for (var k = 0; k < keys.length; k++) {
      var instId = keys[k];
      var keywords = INSTRUMENT_KEYWORDS[instId];
      for (var kw = 0; kw < keywords.length; kw++) {
        var kwIdx = lower.indexOf(keywords[kw]);
        if (kwIdx === -1) continue;
        var surrounding = lower.substring(Math.max(0, kwIdx - 30), Math.min(lower.length, kwIdx + keywords[kw].length + 30));
        var amountMatch = surrounding.match(/(?:\u20B9|rs\.?)(\d+)/);
        if (amountMatch) { offers[instId] = amountMatch[1]; break; }
      }
    }
    return offers;
  }

  function extractBadges(prompt, instrumentIds) {
    var lower = prompt.toLowerCase();
    var badges = {};
    // Direct pattern matching
    var patterns = [
      { regex: /(\w[\w\s]{2,30}?)\s+(?:as|in|is|=)\s+(best offer|previously used|featured)/gi, instFirst: true },
      { regex: /(best offer|previously used|featured)\s+(?:remain|on|for|=|is)\s+(\w[\w\s]{2,20})/gi, instFirst: false },
      { regex: /(\w[\w\s]{2,20}?)\s+(?:with\s+)?(best offer|previously used|featured)/gi, instFirst: true }
    ];
    for (var dp = 0; dp < patterns.length; dp++) {
      var pat = patterns[dp];
      var match;
      pat.regex.lastIndex = 0;
      while ((match = pat.regex.exec(lower)) !== null) {
        var instText = pat.instFirst ? match[1].trim() : match[2].trim();
        var badgeText = pat.instFirst ? match[2].trim() : match[1].trim();
        for (var inst = 0; inst < instrumentIds.length; inst++) {
          var instKws = INSTRUMENT_KEYWORDS[instrumentIds[inst]];
          for (var ik = 0; ik < instKws.length; ik++) {
            if (instText.indexOf(instKws[ik]) !== -1) {
              if (badgeText === 'best offer') badges[instrumentIds[inst]] = 'Best offer';
              else if (badgeText === 'previously used') badges[instrumentIds[inst]] = 'Previously used';
              else if (badgeText === 'featured') badges[instrumentIds[inst]] = 'Featured';
              break;
            }
          }
        }
      }
    }
    // Proximity fallback
    var badgeKeys = Object.keys(BADGE_KEYWORDS);
    for (var b = 0; b < badgeKeys.length; b++) {
      var bText = badgeKeys[b];
      var alreadyUsed = false;
      for (var chk in badges) { if (badges[chk] === bText || badges[chk] === bText.charAt(0).toUpperCase() + bText.slice(1)) { alreadyUsed = true; break; } }
      if (alreadyUsed) continue;
      var badgeKws = BADGE_KEYWORDS[bText];
      for (var bk = 0; bk < badgeKws.length; bk++) {
        var bIdx = lower.indexOf(badgeKws[bk]);
        if (bIdx === -1) continue;
        for (var i2 = 0; i2 < instrumentIds.length; i2++) {
          if (badges[instrumentIds[i2]]) continue;
          var iKws = INSTRUMENT_KEYWORDS[instrumentIds[i2]];
          for (var ik2 = 0; ik2 < iKws.length; ik2++) {
            var iIdx = lower.indexOf(iKws[ik2]);
            if (iIdx !== -1 && Math.abs(iIdx - bIdx) < 60) {
              badges[instrumentIds[i2]] = bText.charAt(0).toUpperCase() + bText.slice(1);
              break;
            }
          }
          if (badges[instrumentIds[i2]]) break;
        }
      }
    }
    return badges;
  }

  function extractStates(prompt, instrumentIds) {
    var lower = prompt.toLowerCase();
    var states = {};
    var stateKeys = Object.keys(STATE_KEYWORDS);
    for (var s = 0; s < stateKeys.length; s++) {
      var sName = stateKeys[s];
      var sKws = STATE_KEYWORDS[sName];
      for (var sk = 0; sk < sKws.length; sk++) {
        if (lower.indexOf(sKws[sk]) === -1) continue;
        for (var inst = 0; inst < instrumentIds.length; inst++) {
          var iKws = INSTRUMENT_KEYWORDS[instrumentIds[inst]];
          for (var ik = 0; ik < iKws.length; ik++) {
            var iIdx = lower.indexOf(iKws[ik]);
            var sIdx = lower.indexOf(sKws[sk]);
            if (iIdx !== -1 && sIdx !== -1 && Math.abs(iIdx - sIdx) < 40) {
              states[instrumentIds[inst]] = sName;
            }
          }
        }
      }
    }
    return states;
  }

  function extractCustomerName(prompt) {
    var match = prompt.match(/deliver\s+to\s+([A-Z][a-z]{2,})/);
    if (match) return match[1];
    match = prompt.match(/customer\s+(?:is\s+|named?\s+)?([A-Z][a-z]{2,})/);
    if (match) return match[1];
    return 'Akshay';
  }

  function extractAddress(prompt) {
    var match = prompt.match(/(?:address|deliver to|location|city)\s*:?\s*(.+?)(?:\.|,\s*[A-Z]|$)/i);
    return match ? match[1].trim() : 'Bengaluru 560001, Karnataka';
  }

  // ═══════════════════════════════════════════
  // CONFIG BUILDER (from structured intent)
  // ═══════════════════════════════════════════

  var BASE_RECOMMENDED = ['cbcc', 'hdfc_credit', 'apay_upi'];
  var BASE_RECOMMENDED_BADGES = { cbcc: 'Best offer', hdfc_credit: 'Previously used', apay_upi: 'Featured' };
  var BASE_UPI = ['other_upi'];
  var BASE_CARDS = ['hdfc_debit'];
  var BASE_MORE_WAYS = ['apay_balance', 'apay_later', 'cod', 'emi', 'net_banking'];

  function buildSections(mentionedIds, badges, offers, states, parsedData) {
    var reg = getRegistry();
    if (!reg) return [];

    var recommended = BASE_RECOMMENDED.slice();
    var recommendedBadges = {};
    for (var k in BASE_RECOMMENDED_BADGES) recommendedBadges[k] = BASE_RECOMMENDED_BADGES[k];
    var upiList = BASE_UPI.slice();
    var cardsList = BASE_CARDS.slice();
    var moreWaysList = BASE_MORE_WAYS.slice();

    // Apply badge overrides — move instruments to RECOMMENDED if badged
    for (var bid in badges) {
      recommendedBadges[bid] = badges[bid];
      if (recommended.indexOf(bid) === -1) {
        upiList = upiList.filter(function(x) { return x !== bid; });
        cardsList = cardsList.filter(function(x) { return x !== bid; });
        moreWaysList = moreWaysList.filter(function(x) { return x !== bid; });
        if (recommended.length < 3) {
          recommended.push(bid);
        } else {
          var lowestIdx = -1;
          for (var ri = recommended.length - 1; ri >= 0; ri--) {
            if (mentionedIds.indexOf(recommended[ri]) === -1) { lowestIdx = ri; break; }
          }
          if (lowestIdx === -1) {
            var bp = { 'Best offer': 1, 'Previously used': 2, 'Featured': 3 };
            var lowestPri = 0;
            for (var ri2 = 0; ri2 < recommended.length; ri2++) {
              var rBadge = recommendedBadges[recommended[ri2]] || '';
              var rPri = bp[rBadge] || 99;
              if (rPri > lowestPri) { lowestPri = rPri; lowestIdx = ri2; }
            }
          }
          if (lowestIdx >= 0) {
            var kicked = recommended[lowestIdx];
            recommended[lowestIdx] = bid;
            delete recommendedBadges[kicked];
            var kickedInst = reg.getInstrument(kicked);
            if (kickedInst) {
              var ng = kickedInst.groupCategory;
              if (ng === 'upi' || kickedInst.type === 'upi') { if (upiList.indexOf(kicked) === -1) upiList.unshift(kicked); }
              else if (ng === 'cards' || kickedInst.type === 'card') { if (cardsList.indexOf(kicked) === -1) cardsList.unshift(kicked); }
              else { if (moreWaysList.indexOf(kicked) === -1) moreWaysList.unshift(kicked); }
            }
          }
        }
      }
    }

    function buildTileForSection(instId) {
      var inst = reg.getInstrument(instId);
      if (!inst) return null;
      var overrides = {
        holder: parsedData.customerName || 'Akshay',
        badge: recommendedBadges[instId] || '',
        disabled: states[instId] === 'disabled'
      };
      if (offers[instId]) overrides.offerAmount = offers[instId];
      if (instId === 'apay_balance' && parsedData.orderAmount) {
        var balance = inst.defaultBalance || 60;
        overrides.balance = balance;
        if (balance < parsedData.orderAmount) {
          overrides.insufficientBalance = true;
          overrides.shortfall = (parsedData.orderAmount - balance).toFixed(2);
        }
      }
      var tile = reg.buildTile(instId, overrides);
      tile._instId = instId;
      tile._badge = overrides.badge;
      tile._insufficientBalance = overrides.insufficientBalance;
      return tile;
    }

    var recTiles = recommended.map(buildTileForSection).filter(Boolean);
    var upiTiles = upiList.map(buildTileForSection).filter(Boolean);
    var cardsTiles = cardsList.map(buildTileForSection).filter(Boolean);
    var moreTiles = moreWaysList.map(buildTileForSection).filter(Boolean);

    // Sort RECOMMENDED by badge priority
    var badgePriority = { 'Best offer': 1, 'Previously used': 2, 'Featured': 3 };
    recTiles.sort(function(a, b) {
      return (badgePriority[a._badge] || 99) - (badgePriority[b._badge] || 99);
    });

    // Preselect first tile (best offer)
    var allTiles = recTiles.concat(upiTiles).concat(cardsTiles).concat(moreTiles);
    if (allTiles.length > 0) allTiles[0].selected = true;

    var sections = [];
    if (recTiles.length > 0) sections.push({ title: 'RECOMMENDED', tiles: recTiles });
    if (upiTiles.length > 0) sections.push({ title: 'UPI', tiles: upiTiles, addLink: '+ Add account to Amazon Pay UPI' });
    if (cardsTiles.length > 0) sections.push({ title: 'CREDIT & DEBIT CARDS', tiles: cardsTiles, addLink: '+ Add new credit or debit card' });
    if (moreTiles.length > 0) sections.push({ title: 'MORE WAYS TO PAY', tiles: moreTiles });
    return sections;
  }

  // ═══════════════════════════════════════════
  // LLM RESPONSE → CONFIG CONVERTER
  // Converts LLM JSON output to psp-frame config
  // ═══════════════════════════════════════════

  function llmResponseToConfig(llmJson) {
    var reg = getRegistry();
    if (!reg) return null;

    var sections = [];
    var sectionTitleMap = {
      recommended: 'RECOMMENDED',
      upi: 'UPI',
      cards: 'CREDIT & DEBIT CARDS',
      more_ways: 'MORE WAYS TO PAY'
    };
    var sectionAddLinks = {
      upi: '+ Add account to Amazon Pay UPI',
      cards: '+ Add new credit or debit card'
    };

    var allTiles = [];
    for (var si = 0; si < llmJson.sections.length; si++) {
      var sec = llmJson.sections[si];
      var tiles = [];
      for (var ti = 0; ti < sec.instruments.length; ti++) {
        var inst = sec.instruments[ti];
        var overrides = {
          holder: llmJson.customerName || 'Akshay',
          badge: inst.badge || '',
          disabled: inst.state === 'disabled'
        };
        if (inst.offerAmount) overrides.offerAmount = String(inst.offerAmount);
        if (inst.id === 'apay_balance' && llmJson.orderAmount) {
          var regInst = reg.getInstrument('apay_balance');
          var bal = regInst ? regInst.defaultBalance || 60 : 60;
          overrides.balance = bal;
          if (inst.state === 'insufficient' || bal < llmJson.orderAmount) {
            overrides.insufficientBalance = true;
            overrides.shortfall = (llmJson.orderAmount - bal).toFixed(2);
          }
        }
        var tile = reg.buildTile(inst.id, overrides);
        if (tile) {
          tile._instId = inst.id;
          tile._badge = inst.badge || '';
          tiles.push(tile);
          allTiles.push(tile);
        }
      }
      if (tiles.length > 0) {
        var secConfig = { title: sectionTitleMap[sec.type] || sec.type, tiles: tiles };
        if (sectionAddLinks[sec.type]) secConfig.addLink = sectionAddLinks[sec.type];
        sections.push(secConfig);
      }
    }

    // Auto-select first tile
    if (allTiles.length > 0) allTiles[0].selected = true;

    var price = llmJson.orderAmount || 504;
    var savings = 0;
    // Calculate savings from first instrument offer
    if (allTiles[0] && allTiles[0].offer) {
      var savMatch = allTiles[0].offer.match(/\u20B9(\d+)/);
      if (savMatch) savings = parseInt(savMatch[1], 10);
    }

    return {
      address: {
        name: 'Deliver to ' + (llmJson.customerName || 'Akshay'),
        detail: llmJson.address || 'Bengaluru 560001, Karnataka',
        showChange: true
      },
      sections: sections,
      giftCard: { text: 'Add Gift Card or Promo Code' },
      cta: {
        savings: savings > 0 ? ('\u20B9' + savings + ' saved') : null,
        offersLink: savings > 0 ? 'See offers \u203A' : null,
        price: String(price),
        feeNote: 'Includes fees',
        buttonText: 'Continue'
      }
    };
  }

  // ═══════════════════════════════════════════
  // LLM API CALL (when endpoint is configured)
  // ═══════════════════════════════════════════

  function callLLM(prompt) {
    if (!LLM_CONFIG.endpoint) return Promise.resolve(null);

    var body = JSON.stringify({
      system: LLM_SYSTEM_PROMPT,
      prompt: prompt,
      model: LLM_CONFIG.model
    });

    return fetch(LLM_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
      signal: AbortSignal.timeout ? AbortSignal.timeout(LLM_CONFIG.timeout) : undefined
    })
    .then(function(res) {
      if (!res.ok) throw new Error('LLM API error: ' + res.status);
      return res.json();
    })
    .then(function(data) {
      // Expect { config: {...} } or raw JSON from LLM
      var json = data.config || data;
      if (json && json.sections) return json;
      // Try to parse string response
      if (typeof data === 'string') {
        try { return JSON.parse(data); } catch (e) { return null; }
      }
      return null;
    })
    .catch(function() { return null; });
  }

  // ═══════════════════════════════════════════
  // MAIN PARSE (synchronous, rule-based)
  // ═══════════════════════════════════════════

  function parse(prompt) {
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
      return getDefaultConfig();
    }
    prompt = prompt.trim();

    var orderAmount = extractOrderAmount(prompt);
    var instrumentIds = extractInstruments(prompt);
    var offers = extractOffers(prompt);
    var badges = extractBadges(prompt, instrumentIds);
    var states = extractStates(prompt, instrumentIds);
    var customerName = extractCustomerName(prompt);
    var address = extractAddress(prompt);

    var parsedData = { orderAmount: orderAmount, customerName: customerName, address: address };
    var sections = buildSections(instrumentIds, badges, offers, states, parsedData);

    var price = orderAmount || 504;
    var savings = 0;
    var offerValues = Object.values ? Object.values(offers) : Object.keys(offers).map(function(k){return offers[k];});
    for (var i = 0; i < offerValues.length; i++) savings += parseInt(offerValues[i], 10) || 0;

    return {
      address: { name: 'Deliver to ' + customerName, detail: address, showChange: true },
      sections: sections,
      giftCard: { text: 'Add Gift Card or Promo Code' },
      cta: {
        savings: savings > 0 ? ('\u20B9' + savings + ' saved') : null,
        offersLink: savings > 0 ? 'See offers \u203A' : null,
        price: String(price),
        feeNote: 'Includes fees',
        buttonText: 'Continue'
      }
    };
  }

  function getDefaultConfig() {
    var reg = getRegistry();
    if (!reg) return { sections: [] };
    return parse('Create PSP with CBCC best offer \u20B910, HDFC credit previously used \u20B96, Amazon Pay UPI featured, APB, Pay Later, COD, EMI, Net Banking for \u20B9504 order deliver to Akshay address Bengaluru 560001, Karnataka');
  }

  // ═══════════════════════════════════════════
  // GENERATE (async with loading animation)
  // This is the primary API for the AI feature.
  // Shows shimmer → calls LLM (or fallback) → renders result.
  // ═══════════════════════════════════════════

  function generate(prompt, outputEl) {
    if (!outputEl) return;
    if (!window.PSP || !window.PSP.renderers || !window.PSP.renderers.pspFrame) return;

    // Show loading animation
    showLoading(outputEl);

    // Determine processing time (2-3s for smooth feel)
    var loadingDuration = 2000 + Math.random() * 1000;

    // Attempt LLM call (parallel with loading timer)
    var llmPromise = callLLM(prompt);
    var timerPromise = new Promise(function(resolve) {
      setTimeout(resolve, loadingDuration);
    });

    // Wait for BOTH loading animation and LLM response
    Promise.all([llmPromise, timerPromise]).then(function(results) {
      var llmResult = results[0];
      var config;

      if (llmResult && llmResult.sections) {
        // LLM succeeded — convert to render config
        config = llmResponseToConfig(llmResult);
      } else {
        // Fallback to rule-based parser
        config = parse(prompt);
      }

      // Render the PSP
      var html = window.PSP.renderers.pspFrame.render(config);
      outputEl.innerHTML = html;
      window.PSP.renderers.pspFrame.attachInteractivity(outputEl);
    });
  }

  // ═══════════════════════════════════════════
  // EXPOSE API
  // ═══════════════════════════════════════════

  window.PSP.features.pspGenerator = {
    parse: parse,
    generate: generate,
    getDefaultConfig: getDefaultConfig,
    setEndpoint: function(url) { LLM_CONFIG.endpoint = url; },
    getSystemPrompt: function() { return LLM_SYSTEM_PROMPT; },
    _extractOrderAmount: extractOrderAmount,
    _extractInstruments: extractInstruments,
    _extractOffers: extractOffers,
    _extractBadges: extractBadges,
    _extractStates: extractStates
  };

})();
