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

  /** Format number in Indian number system (1,23,456) */
  function formatIndian(num) {
    var n = String(parseInt(num, 10) || 0);
    if (n.length <= 3) return n;
    var last3 = n.slice(-3);
    var rest = n.slice(0, -3);
    return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
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
  // LOADING ANIMATION (scattered dots — Gemini/Grok style)
  // ═══════════════════════════════════════════

  function buildLoadingHTML() {
    return [
      '<div class="psp-ai-loading" style="width:100%;max-width:360px;height:520px;border-radius:30px;background:#F7FAFA;border:0.5px solid #989898;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.12);position:relative;display:flex;align-items:center;justify-content:center">',
      '  <div class="psp-dots-field"></div>',
      '  <div class="psp-ai-status">',
      '    <span class="psp-ai-status-dot"></span>',
      '    <span>AI is crafting your PSP...</span>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  // Inject CSS for dots animation (once)
  var styleInjected = false;
  function injectStyles() {
    if (styleInjected) return;
    styleInjected = true;
    var style = document.createElement('style');
    style.textContent = [
      '.psp-dots-field {',
      '  position: absolute; inset: 0; overflow: hidden;',
      '}',
      '.psp-dot {',
      '  position: absolute; width: 6px; height: 6px; border-radius: 50%;',
      '  opacity: 0; animation: pspDotFade 2.5s ease-in-out infinite;',
      '}',
      '@keyframes pspDotFade {',
      '  0%, 100% { opacity: 0; transform: scale(0.3); }',
      '  40% { opacity: 0.7; transform: scale(1); }',
      '  60% { opacity: 0.5; transform: scale(0.8); }',
      '}',
      '.psp-ai-status {',
      '  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);',
      '  background: rgba(255,255,255,0.95); border: 1px solid #E3E6E6;',
      '  border-radius: 20px; padding: 8px 16px; font-size: 12px; color: #565959;',
      '  display: flex; align-items: center; gap: 8px; white-space: nowrap;',
      '  box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 2;',
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
    // Generate random scattered dots
    var dotsField = containerEl.querySelector('.psp-dots-field');
    if (dotsField) {
      var colors = ['#FF9900', '#2162A1', '#0A7CD1', '#82D8E3', '#A6E7CE', '#D5D9D9', '#565959'];
      var dotCount = 40;
      for (var i = 0; i < dotCount; i++) {
        var dot = document.createElement('div');
        dot.className = 'psp-dot';
        dot.style.left = (Math.random() * 90 + 5) + '%';
        dot.style.top = (Math.random() * 80 + 5) + '%';
        dot.style.width = (3 + Math.random() * 5) + 'px';
        dot.style.height = dot.style.width;
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        dot.style.animationDelay = (Math.random() * 2.5) + 's';
        dot.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
        dotsField.appendChild(dot);
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
    apay_upi: ['apay upi', 'amazon upi', 'amazon pay upi'],
    other_upi: ['other upi', 'any upi', 'gpay', 'phonepe', 'paytm upi', 'upi linked', 'upi'],
    apay_balance: ['apb', 'amazon pay balance', 'apay balance', 'balance', 'wallet'],
    apay_later: ['apl', 'pay later', 'amazon pay later', 'bnpl'],
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
      /order\s*(?:of|for|worth|value)?\s*(?:\u20B9|rs\.?|inr)?\s*([\d,]+)/i,
      /([\d,]+)\s*(?:order|amount|total|rupee)/i,
      /(?:for|worth)\s*(?:\u20B9|rs\.?|inr)\s*([\d,]+)/i
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
    // Only match amounts that are clearly offers (near cashback/save/off keywords OR directly after instrument keyword with ₹)
    var keys = Object.keys(INSTRUMENT_KEYWORDS);
    for (var k = 0; k < keys.length; k++) {
      var instId = keys[k];
      var keywords = INSTRUMENT_KEYWORDS[instId];
      for (var kw = 0; kw < keywords.length; kw++) {
        var kwIdx = lower.indexOf(keywords[kw]);
        if (kwIdx === -1) continue;
        var afterKw = lower.substring(kwIdx, Math.min(lower.length, kwIdx + keywords[kw].length + 50));
        // Look for offer patterns: "₹XX cashback", "₹XX off", "save ₹XX", "offer ₹XX"
        var offerMatch = afterKw.match(/(?:\u20B9|rs\.?)(\d+)\s*(?:cashback|off|saved?|discount)/i);
        if (!offerMatch) offerMatch = afterKw.match(/(?:save|cashback|offer|discount)\s*(?:\u20B9|rs\.?)(\d+)/i);
        if (!offerMatch) {
          // Direct amount right after keyword (e.g., "CBCC ₹10") but NOT if followed by "order|limit|balance"
          var directMatch = afterKw.match(/(?:\u20B9|rs\.?)(\d+)/);
          if (directMatch) {
            var afterAmount = afterKw.substring(afterKw.indexOf(directMatch[0]) + directMatch[0].length, afterKw.indexOf(directMatch[0]) + directMatch[0].length + 20);
            if (!/order|limit|balance|credit/i.test(afterAmount)) {
              offerMatch = directMatch;
            }
          }
        }
        if (offerMatch) { offers[instId] = offerMatch[1]; break; }
      }
    }
    return offers;
  }

  function extractBadges(prompt, instrumentIds) {
    var lower = prompt.toLowerCase();
    var badges = {};
    var usedBadgeTypes = {};

    // Split prompt into clauses by commas or "and"
    var clauses = lower.split(/[,]|\band\b/);

    for (var ci = 0; ci < clauses.length; ci++) {
      var clause = clauses[ci].trim();
      if (!clause) continue;

      // Find which instrument this clause talks about
      var clauseInst = null;
      for (var ii = 0; ii < instrumentIds.length; ii++) {
        if (badges[instrumentIds[ii]]) continue;
        var iKws = INSTRUMENT_KEYWORDS[instrumentIds[ii]];
        for (var ik = 0; ik < iKws.length; ik++) {
          if (clause.indexOf(iKws[ik]) !== -1) {
            clauseInst = instrumentIds[ii];
            break;
          }
        }
        if (clauseInst) break;
      }
      if (!clauseInst) continue;

      // Find which badge this clause assigns
      // Priority: more specific badges first (previously used > best offer > featured)
      // "Featured" is often used as section name, so it's lowest priority
      var clauseBadge = null;
      if (clause.indexOf('previously used') !== -1 && !usedBadgeTypes['Previously used']) {
        clauseBadge = 'Previously used';
      } else if (clause.indexOf('best offer') !== -1 && !usedBadgeTypes['Best offer']) {
        clauseBadge = 'Best offer';
      } else if (clause.indexOf('featured') !== -1 && !usedBadgeTypes['Featured']) {
        // Only assign "Featured" if the clause doesn't also say "in featured" (section name)
        // "in featured" = section placement, "featured" alone = badge
        if (clause.indexOf('in featured') === -1 || clause.length < 30) {
          clauseBadge = 'Featured';
        }
      }

      if (clauseBadge) {
        badges[clauseInst] = clauseBadge;
        usedBadgeTypes[clauseBadge] = true;
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

    // Override base badges with user-specified badges
    for (var ob in badges) {
      if (recommendedBadges[ob] !== undefined) {
        // Instrument is already in RECOMMENDED, just update its badge
        recommendedBadges[ob] = badges[ob];
      }
    }

    // Check for explicit section placement from prompt context
    // (e.g., "apay UPI in UPI box" means move apay_upi to UPI section)
    var explicitUpi = [];
    var explicitCards = [];
    if (parsedData._promptLower) {
      var pl = parsedData._promptLower;
      if (pl.indexOf('upi') !== -1 && (pl.indexOf('upi box') !== -1 || pl.indexOf('upi section') !== -1 || pl.indexOf('in upi') !== -1)) {
        // Check which UPI instruments are mentioned for the UPI box
        for (var eu = 0; eu < mentionedIds.length; eu++) {
          var eInst = reg.getInstrument(mentionedIds[eu]);
          if (eInst && eInst.type === 'upi') explicitUpi.push(mentionedIds[eu]);
        }
      }
      if (pl.indexOf('card box') !== -1 || pl.indexOf('cards section') !== -1 || pl.indexOf('in cards') !== -1) {
        for (var ec = 0; ec < mentionedIds.length; ec++) {
          var ecInst = reg.getInstrument(mentionedIds[ec]);
          if (ecInst && ecInst.type === 'card') explicitCards.push(mentionedIds[ec]);
        }
      }
    }

    // If user explicitly placed apay_upi in UPI box, move it out of RECOMMENDED
    // BUT only if it doesn't have an explicit badge (badge = stay in RECOMMENDED)
    for (var ep = 0; ep < explicitUpi.length; ep++) {
      var euId = explicitUpi[ep];
      if (badges[euId]) continue; // has a badge, stays in RECOMMENDED
      var recIdx = recommended.indexOf(euId);
      if (recIdx !== -1) {
        recommended.splice(recIdx, 1);
        delete recommendedBadges[euId];
      }
      if (upiList.indexOf(euId) === -1) upiList.unshift(euId);
    }

    // Apply badge overrides — move instruments to RECOMMENDED if badged
    for (var bid in badges) {
      // Skip if explicitly placed in another section
      if (explicitUpi.indexOf(bid) !== -1) continue;
      if (explicitCards.indexOf(bid) !== -1) continue;

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
          overrides.shortfall = formatIndian(parsedData.orderAmount - balance);
        }
      }
      // Handle APL credit limit from prompt
      if (instId === 'apay_later' && parsedData._promptLower) {
        var aplMatch = parsedData._promptLower.match(/(?:apl|pay later|amazon pay later)[\w\s]*?(?:\u20B9|rs\.?)([\d,]+)/i);
        if (!aplMatch) aplMatch = parsedData._promptLower.match(/(?:\u20B9|rs\.?)([\d,]+)\s*(?:limit|credit)/i);
        if (aplMatch) overrides.creditLimit = formatIndian(parseInt(aplMatch[1].replace(/,/g, ''), 10));
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
            overrides.shortfall = formatIndian(llmJson.orderAmount - bal);
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
        savings: savings > 0 ? ('\u20B9' + formatIndian(savings) + ' saved') : null,
        offersLink: savings > 0 ? 'See offers \u203A' : null,
        price: formatIndian(price),
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

    var parsedData = { orderAmount: orderAmount, customerName: customerName, address: address, _promptLower: prompt.toLowerCase() };
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
        savings: savings > 0 ? ('\u20B9' + formatIndian(savings) + ' saved') : null,
        offersLink: savings > 0 ? 'See offers \u203A' : null,
        price: formatIndian(price),
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
