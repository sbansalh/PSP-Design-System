/**
 * PSP Design System - "Create Your PSP" Generator
 * Phase 3: Prompt Parser + Config Generator + Validator
 *
 * Parses natural language prompts into structured PSP configurations.
 * No external LLM — uses rule-based keyword extraction for deterministic output.
 *
 * Usage:
 *   var config = window.PSP.features.pspGenerator.parse("Create a PSP for ₹2500 order with CBCC best offer ₹50 and HDFC previously used");
 *   var html = window.PSP.renderers.pspFrame.render(config);
 */
(function() {
  'use strict';

  var registry = null; // Lazy-loaded reference to window.PSP.data.instrumentRegistry

  function getRegistry() {
    if (!registry && window.PSP && window.PSP.data && window.PSP.data.instrumentRegistry) {
      registry = window.PSP.data.instrumentRegistry;
    }
    return registry;
  }

  // ═══════════════════════════════════════════════════════════════
  // KEYWORD MAPPINGS — maps natural language to instrument IDs
  // ═══════════════════════════════════════════════════════════════

  var INSTRUMENT_KEYWORDS = {
    // Amazon Pay ICICI Credit Card
    cbcc: ['cbcc', 'icici credit', 'amazon pay icici', 'apay icici', 'icici cc', 'icici card', 'amazon icici'],
    // HDFC Credit Card
    hdfc_credit: ['hdfc credit', 'hdfc cc', 'hdfc card'],
    // HDFC Debit Card
    hdfc_debit: ['hdfc debit', 'hdfc dc'],
    // ICICI Credit Card (non-Amazon)
    icici_credit: ['icici bank credit'],
    // SBI Debit
    sbi_debit: ['sbi debit', 'sbi card', 'sbi dc'],
    // Amazon Pay UPI
    apay_upi: ['apay upi', 'amazon upi', 'amazon pay upi', 'upi linked', 'upi'],
    // Other UPI
    other_upi: ['other upi', 'any upi', 'gpay', 'phonepe', 'paytm upi'],
    // Amazon Pay Balance
    apay_balance: ['apb', 'amazon pay balance', 'apay balance', 'balance', 'wallet'],
    // Amazon Pay Later
    apay_later: ['apl', 'pay later', 'amazon pay later', 'bnpl', 'credit line'],
    // Cash on Delivery
    cod: ['cod', 'cash on delivery', 'pay on delivery', 'pod'],
    // EMI
    emi: ['emi', 'installment', 'monthly payment'],
    // Net Banking
    net_banking: ['net banking', 'netbanking', 'internet banking', 'neft']
  };

  // Badge keywords
  var BADGE_KEYWORDS = {
    'best offer': ['best offer', 'best cashback', 'highest offer', 'top offer'],
    'Previously used': ['previously used', 'last used', 'recent', 'usual'],
    'Featured': ['featured', 'recommended', 'suggested', 'popular']
  };

  // State keywords
  var STATE_KEYWORDS = {
    disabled: ['expired', 'blocked', 'unavailable', 'disabled', 'inactive'],
    insufficient: ['insufficient', 'low balance', 'not enough', 'add money']
  };

  // ═══════════════════════════════════════════════════════════════
  // PROMPT PARSER
  // ═══════════════════════════════════════════════════════════════

  /**
   * Extract order amount from prompt.
   * @param {string} prompt
   * @returns {number|null}
   */
  function extractOrderAmount(prompt) {
    // Match ₹X,XXX or ₹XXX or Rs.XXX or XXXX order/amount
    var patterns = [
      /(?:\u20B9|rs\.?|inr)\s*([\d,]+)/i,
      /([\d,]+)\s*(?:order|amount|total|rupee)/i,
      /order\s*(?:of|for|worth|value)?\s*(?:\u20B9|rs\.?|inr)?\s*([\d,]+)/i
    ];
    for (var i = 0; i < patterns.length; i++) {
      var match = prompt.match(patterns[i]);
      if (match) {
        return parseInt(match[1].replace(/,/g, ''), 10);
      }
    }
    return null;
  }

  /**
   * Extract offer amounts for specific instruments.
   * Returns map of instrumentId -> offerAmount
   * @param {string} prompt
   * @returns {object}
   */
  function extractOffers(prompt) {
    var offers = {};
    var lower = prompt.toLowerCase();

    // Pattern: "₹XX cashback on INSTRUMENT" or "INSTRUMENT with ₹XX cashback"
    var offerPatterns = [
      /(?:\u20B9|rs\.?)(\d+)\s*(?:cashback|discount|off|saved?)\s*(?:on|for|with)?\s*(.+?)(?:\.|,|and|$)/gi,
      /(.+?)\s*(?:with|has|offers?)\s*(?:\u20B9|rs\.?)(\d+)\s*(?:cashback|discount|off|saving)/gi
    ];

    // Simple approach: check each instrument keyword near an amount
    var keys = Object.keys(INSTRUMENT_KEYWORDS);
    for (var k = 0; k < keys.length; k++) {
      var instId = keys[k];
      var keywords = INSTRUMENT_KEYWORDS[instId];
      for (var kw = 0; kw < keywords.length; kw++) {
        var kwIdx = lower.indexOf(keywords[kw]);
        if (kwIdx === -1) continue;

        // Look for amount within 60 chars of the keyword
        var surrounding = lower.substring(Math.max(0, kwIdx - 30), Math.min(lower.length, kwIdx + keywords[kw].length + 30));
        var amountMatch = surrounding.match(/(?:\u20B9|rs\.?)(\d+)/);
        if (amountMatch) {
          offers[instId] = amountMatch[1];
          break;
        }
      }
    }

    return offers;
  }

  /**
   * Extract instruments mentioned in the prompt.
   * @param {string} prompt
   * @returns {string[]} Array of instrument IDs
   */
  function extractInstruments(prompt) {
    var lower = prompt.toLowerCase();
    var found = [];
    var keys = Object.keys(INSTRUMENT_KEYWORDS);

    // Sort by keyword length (longer matches first to avoid partial matches)
    var allKeywords = [];
    for (var k = 0; k < keys.length; k++) {
      var instId = keys[k];
      var keywords = INSTRUMENT_KEYWORDS[instId];
      for (var kw = 0; kw < keywords.length; kw++) {
        allKeywords.push({ id: instId, keyword: keywords[kw] });
      }
    }
    allKeywords.sort(function(a, b) { return b.keyword.length - a.keyword.length; });

    // Match keywords
    for (var i = 0; i < allKeywords.length; i++) {
      if (lower.indexOf(allKeywords[i].keyword) !== -1 && found.indexOf(allKeywords[i].id) === -1) {
        found.push(allKeywords[i].id);
      }
    }

    return found;
  }

  /**
   * Extract badges assigned to instruments.
   * @param {string} prompt
   * @param {string[]} instrumentIds
   * @returns {object} Map of instrumentId -> badge text
   */
  function extractBadges(prompt, instrumentIds) {
    var lower = prompt.toLowerCase();
    var badges = {};

    // Strategy: Find direct patterns first:
    // "INSTRUMENT as/in/with BADGE" or "BADGE remain/on/for INSTRUMENT"
    var directPatterns = [
      // "APL as featured", "UPI as previously used"
      { regex: /(\w[\w\s]{2,30}?)\s+(?:as|in|is|=)\s+(best offer|previously used|featured)/gi, instFirst: true },
      // "best offer remain CBCC", "featured for UPI"
      { regex: /(best offer|previously used|featured)\s+(?:remain|on|for|=|is)\s+(\w[\w\s]{2,20})/gi, instFirst: false },
      // "CBCC with best offer", "CBCC best offer"
      { regex: /(\w[\w\s]{2,20}?)\s+(?:with\s+)?(best offer|previously used|featured)/gi, instFirst: true }
    ];

    for (var dp = 0; dp < directPatterns.length; dp++) {
      var pattern = directPatterns[dp];
      var match;
      pattern.regex.lastIndex = 0;
      while ((match = pattern.regex.exec(lower)) !== null) {
        var instText = pattern.instFirst ? match[1].trim() : match[2].trim();
        var badgeText = pattern.instFirst ? match[2].trim() : match[1].trim();

        // Map instText to an instrument ID
        for (var inst = 0; inst < instrumentIds.length; inst++) {
          var instId = instrumentIds[inst];
          var instKws = INSTRUMENT_KEYWORDS[instId];
          for (var ik = 0; ik < instKws.length; ik++) {
            if (instText.indexOf(instKws[ik]) !== -1) {
              // Capitalize badge text properly
              if (badgeText === 'best offer') badges[instId] = 'Best offer';
              else if (badgeText === 'previously used') badges[instId] = 'Previously used';
              else if (badgeText === 'featured') badges[instId] = 'Featured';
              break;
            }
          }
          if (badges[instId]) break;
        }
      }
    }

    // If some instruments mentioned still have no badge, try proximity fallback
    var badgeKeys = Object.keys(BADGE_KEYWORDS);
    for (var b = 0; b < badgeKeys.length; b++) {
      var bText = badgeKeys[b];
      // Skip if this badge is already assigned
      var alreadyAssigned = false;
      for (var check in badges) { if (badges[check] === bText || badges[check] === bText.charAt(0).toUpperCase() + bText.slice(1)) { alreadyAssigned = true; break; } }
      if (alreadyAssigned) continue;

      var badgeKws = BADGE_KEYWORDS[bText];
      for (var bk = 0; bk < badgeKws.length; bk++) {
        var badgeIdx = lower.indexOf(badgeKws[bk]);
        if (badgeIdx === -1) continue;
        // Find nearest unassigned instrument
        for (var inst2 = 0; inst2 < instrumentIds.length; inst2++) {
          if (badges[instrumentIds[inst2]]) continue;
          var instKws2 = INSTRUMENT_KEYWORDS[instrumentIds[inst2]];
          for (var ik2 = 0; ik2 < instKws2.length; ik2++) {
            var instIdx2 = lower.indexOf(instKws2[ik2]);
            if (instIdx2 !== -1 && Math.abs(instIdx2 - badgeIdx) < 60) {
              badges[instrumentIds[inst2]] = bText.charAt(0).toUpperCase() + bText.slice(1);
              break;
            }
          }
          if (badges[instrumentIds[inst2]]) break;
        }
      }
    }

    return badges;
  }

  /**
   * Extract disabled/insufficient states.
   * @param {string} prompt
   * @param {string[]} instrumentIds
   * @returns {object} Map of instrumentId -> state
   */
  function extractStates(prompt, instrumentIds) {
    var lower = prompt.toLowerCase();
    var states = {};

    var stateKeys = Object.keys(STATE_KEYWORDS);
    for (var s = 0; s < stateKeys.length; s++) {
      var stateName = stateKeys[s];
      var stateKws = STATE_KEYWORDS[stateName];
      for (var sk = 0; sk < stateKws.length; sk++) {
        if (lower.indexOf(stateKws[sk]) !== -1) {
          // Find nearest instrument
          for (var inst = 0; inst < instrumentIds.length; inst++) {
            var instKws = INSTRUMENT_KEYWORDS[instrumentIds[inst]];
            for (var ik = 0; ik < instKws.length; ik++) {
              var instIdx = lower.indexOf(instKws[ik]);
              var stateIdx = lower.indexOf(stateKws[sk]);
              if (instIdx !== -1 && stateIdx !== -1 && Math.abs(instIdx - stateIdx) < 40) {
                states[instrumentIds[inst]] = stateName;
              }
            }
          }
        }
      }
    }

    return states;
  }

  /**
   * Extract customer name from prompt.
   * @param {string} prompt
   * @returns {string}
   */
  function extractCustomerName(prompt) {
    // Only match "deliver to Name" or "customer Name" patterns with proper capitalized names
    var match = prompt.match(/deliver\s+to\s+([A-Z][a-z]{2,})/);
    if (match) return match[1];
    match = prompt.match(/customer\s+(?:is\s+|named?\s+)?([A-Z][a-z]{2,})/);
    if (match) return match[1];
    return 'Akshay';
  }

  /**
   * Extract address from prompt.
   * @param {string} prompt
   * @returns {string}
   */
  function extractAddress(prompt) {
    var match = prompt.match(/(?:address|deliver to|location|city)\s*:?\s*(.+?)(?:\.|,\s*[A-Z]|$)/i);
    return match ? match[1].trim() : 'Bengaluru 560001, Karnataka';
  }

  // ═══════════════════════════════════════════════════════════════
  // CONFIG GENERATOR (applies PSP rules to parsed data)
  // ═══════════════════════════════════════════════════════════════

  /**
   * Determine which instrument should be preselected.
   * @param {object[]} tiles - Array of tile configs
   * @param {object} parsedData - Parsed prompt data
   * @returns {number} Index of tile to preselect (-1 for none)
   */
  function determinePreselection(tiles, parsedData) {
    var reg = getRegistry();
    if (!reg) return 0;

    // Rule 1: Best offer instrument
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i]._badge === 'best offer' || tiles[i]._badge === 'Best offer') return i;
    }

    // Rule 2: APB with sufficient balance
    if (parsedData.orderAmount) {
      for (var j = 0; j < tiles.length; j++) {
        if (tiles[j]._instId === 'apay_balance' && !tiles[j]._insufficientBalance) return j;
      }
    }

    // Rule 3: Previously used
    for (var k = 0; k < tiles.length; k++) {
      if (tiles[k]._badge === 'Previously used') return k;
    }

    // Rule 4: Single instrument
    if (tiles.length === 1) return 0;

    // Rule 5: Default — first instrument
    return 0;
  }

  // ═══════════════════════════════════════════════════════════════
  // BASE PSP DEFINITION (the default full PSP — always shown unless excluded)
  // ═══════════════════════════════════════════════════════════════

  // Default RECOMMENDED section (3 tiles max)
  var BASE_RECOMMENDED = ['cbcc', 'hdfc_credit', 'apay_upi'];
  var BASE_RECOMMENDED_BADGES = { cbcc: 'Best offer', hdfc_credit: 'Previously used', apay_upi: 'Featured' };

  // Default UPI section
  var BASE_UPI = ['other_upi'];

  // Default CARDS section
  var BASE_CARDS = ['hdfc_debit'];

  // Default MORE WAYS section
  var BASE_MORE_WAYS = ['apay_balance', 'apay_later', 'cod', 'emi', 'net_banking'];

  /**
   * Build PSP sections using "base + modifications" approach.
   * ALWAYS starts with full default PSP, then applies prompt overrides.
   *
   * @param {string[]} mentionedIds - Instruments explicitly mentioned in prompt
   * @param {object} badges - Badge overrides from prompt
   * @param {object} offers - Offer amounts from prompt
   * @param {object} states - State overrides (disabled, etc.)
   * @param {object} parsedData - { orderAmount, customerName, address }
   * @returns {object[]} Array of section configs for psp-frame.render()
   */
  function buildSections(mentionedIds, badges, offers, states, parsedData) {
    var reg = getRegistry();
    if (!reg) return [];

    // Start with base PSP structure
    var recommended = BASE_RECOMMENDED.slice();
    var recommendedBadges = {};
    for (var k in BASE_RECOMMENDED_BADGES) { recommendedBadges[k] = BASE_RECOMMENDED_BADGES[k]; }
    var upiList = BASE_UPI.slice();
    var cardsList = BASE_CARDS.slice();
    var moreWaysList = BASE_MORE_WAYS.slice();

    // Apply badge overrides from prompt — move instruments to RECOMMENDED if they have a badge
    for (var bid in badges) {
      recommendedBadges[bid] = badges[bid];
      // If this instrument isn't in RECOMMENDED yet, we need to add it
      if (recommended.indexOf(bid) === -1) {
        // Remove from other sections
        upiList = upiList.filter(function(x) { return x !== bid; });
        cardsList = cardsList.filter(function(x) { return x !== bid; });
        moreWaysList = moreWaysList.filter(function(x) { return x !== bid; });

        if (recommended.length < 3) {
          // Space available, just add
          recommended.push(bid);
        } else {
          // RECOMMENDED is full — force the user's explicit choice in
          // Replace the instrument that was LEAST recently mentioned in the prompt
          // (i.e., the one from base defaults that the user didn't mention)
          var lowestIdx = -1;
          for (var ri = recommended.length - 1; ri >= 0; ri--) {
            if (mentionedIds.indexOf(recommended[ri]) === -1) {
              // This instrument is from base defaults, not mentioned by user — safe to kick
              lowestIdx = ri;
              break;
            }
          }
          // If all are mentioned, kick the one with lowest badge priority
          if (lowestIdx === -1) {
            var lowestPri = 0;
            var bp = { 'Best offer': 1, 'best offer': 1, 'Previously used': 2, 'Featured': 3 };
            for (var ri2 = 0; ri2 < recommended.length; ri2++) {
              var rBadge = recommendedBadges[recommended[ri2]] || '';
              var rPri = bp[rBadge] || 99;
              if (rPri > lowestPri) { lowestPri = rPri; lowestIdx = ri2; }
            }
          }
          if (lowestIdx >= 0) {
            var kicked = recommended[lowestIdx];
            recommended[lowestIdx] = bid;
            // Put kicked instrument back in its NATIVE section (not more_ways)
            var kickedInst = reg.getInstrument(kicked);
            if (kickedInst) {
              delete recommendedBadges[kicked];
              // Route to native section based on instrument type
              var nativeGroup = kickedInst.groupCategory;
              if (nativeGroup === 'upi' || kickedInst.type === 'upi') {
                if (upiList.indexOf(kicked) === -1) upiList.unshift(kicked);
              } else if (nativeGroup === 'cards' || kickedInst.type === 'card') {
                if (cardsList.indexOf(kicked) === -1) cardsList.unshift(kicked);
              } else {
                if (moreWaysList.indexOf(kicked) === -1) moreWaysList.unshift(kicked);
              }
            }
          }
        }
      }
    }

    // Build tile objects
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

    // Sort RECOMMENDED by badge priority: Best offer first, Previously used second, Featured third
    var badgePriority = { 'Best offer': 1, 'best offer': 1, 'Previously used': 2, 'Featured': 3 };
    recTiles.sort(function(a, b) {
      var pa = badgePriority[a._badge] || 99;
      var pb = badgePriority[b._badge] || 99;
      return pa - pb;
    });

    // Determine preselection
    var allTiles = recTiles.concat(upiTiles).concat(cardsTiles).concat(moreTiles);
    var preselIdx = determinePreselection(allTiles, parsedData);
    if (preselIdx >= 0 && preselIdx < allTiles.length) {
      allTiles[preselIdx].selected = true;
    }

    // Build sections (always include all 4, matching PSP hierarchy)
    var sections = [];
    if (recTiles.length > 0) {
      sections.push({ title: 'RECOMMENDED', tiles: recTiles });
    }
    if (upiTiles.length > 0) {
      sections.push({ title: 'UPI', tiles: upiTiles, addLink: '+ Add account to Amazon Pay UPI' });
    }
    if (cardsTiles.length > 0) {
      sections.push({ title: 'CREDIT & DEBIT CARDS', tiles: cardsTiles, addLink: '+ Add new credit or debit card' });
    }
    if (moreTiles.length > 0) {
      sections.push({ title: 'MORE WAYS TO PAY', tiles: moreTiles });
    }

    return sections;
  }

  // ═══════════════════════════════════════════════════════════════
  // MAIN PARSE FUNCTION
  // ═══════════════════════════════════════════════════════════════

  /**
   * Parse a natural language prompt into a full PSP config.
   * @param {string} prompt - User's natural language description
   * @returns {object} Config object ready for psp-frame.render()
   */
  function parse(prompt) {
    if (!prompt || typeof prompt !== 'string') {
      return getDefaultConfig();
    }

    prompt = prompt.trim();
    if (prompt.length < 5) {
      return getDefaultConfig();
    }

    // Extract structured data from prompt
    var orderAmount = extractOrderAmount(prompt);
    var instrumentIds = extractInstruments(prompt);
    var offers = extractOffers(prompt);
    var badges = extractBadges(prompt, instrumentIds);
    var states = extractStates(prompt, instrumentIds);
    var customerName = extractCustomerName(prompt);
    var address = extractAddress(prompt);

    // If no instruments found, the base PSP is still used (buildSections handles defaults)
    // Only extracted instruments are used for overrides

    var parsedData = {
      orderAmount: orderAmount,
      customerName: customerName,
      address: address
    };

    // Build sections
    var sections = buildSections(instrumentIds, badges, offers, states, parsedData);

    // Calculate price
    var price = orderAmount || 504;
    var savings = 0;
    var offerValues = Object.values(offers);
    for (var ov = 0; ov < offerValues.length; ov++) {
      savings += parseInt(offerValues[ov], 10) || 0;
    }

    // Build final config
    var config = {
      address: {
        name: 'Deliver to ' + customerName,
        detail: address,
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

    return config;
  }

  /**
   * Get a default PSP config (used when prompt is empty or invalid).
   * @returns {object}
   */
  function getDefaultConfig() {
    var reg = getRegistry();
    if (!reg) return { sections: [] };

    return parse('Create PSP with CBCC best offer ₹10, HDFC credit previously used ₹6, Amazon Pay UPI featured, APB, Pay Later, COD, EMI, Net Banking for ₹504 order deliver to Akshay address Bengaluru 560001, Karnataka');
  }

  // ═══════════════════════════════════════════════════════════════
  // EXPOSE API
  // ═══════════════════════════════════════════════════════════════

  window.PSP.features.pspGenerator = {
    parse: parse,
    getDefaultConfig: getDefaultConfig,
    // Exposed for testing/debugging
    _extractOrderAmount: extractOrderAmount,
    _extractInstruments: extractInstruments,
    _extractOffers: extractOffers,
    _extractBadges: extractBadges,
    _extractStates: extractStates
  };

})();
