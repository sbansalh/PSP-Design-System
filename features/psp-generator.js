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

    // Check for explicit badge assignments near instrument keywords
    var badgeKeys = Object.keys(BADGE_KEYWORDS);
    for (var b = 0; b < badgeKeys.length; b++) {
      var badgeText = badgeKeys[b];
      var badgeKws = BADGE_KEYWORDS[badgeText];
      for (var bk = 0; bk < badgeKws.length; bk++) {
        if (lower.indexOf(badgeKws[bk]) !== -1) {
          // Find which instrument this badge is near
          for (var inst = 0; inst < instrumentIds.length; inst++) {
            var instKws = INSTRUMENT_KEYWORDS[instrumentIds[inst]];
            for (var ik = 0; ik < instKws.length; ik++) {
              var instIdx = lower.indexOf(instKws[ik]);
              var badgeIdx = lower.indexOf(badgeKws[bk]);
              if (instIdx !== -1 && badgeIdx !== -1 && Math.abs(instIdx - badgeIdx) < 50) {
                badges[instrumentIds[inst]] = badgeText;
                break;
              }
            }
            if (badges[instrumentIds[inst]]) break;
          }
          // If no instrument found near badge, assign to first instrument without badge
          if (!Object.values(badges).some(function(v) { return v === badgeText; })) {
            for (var fi = 0; fi < instrumentIds.length; fi++) {
              if (!badges[instrumentIds[fi]]) {
                badges[instrumentIds[fi]] = badgeText;
                break;
              }
            }
          }
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
    var match = prompt.match(/(?:deliver to|customer|user|name)\s+([A-Z][a-z]+)/i);
    return match ? match[1] : 'Akshay';
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

  /**
   * Group instruments into sections following PSP hierarchy rules.
   * @param {string[]} instrumentIds
   * @param {object} badges
   * @param {object} offers
   * @param {object} states
   * @param {object} parsedData
   * @returns {object[]} Array of section configs for psp-frame.render()
   */
  function buildSections(instrumentIds, badges, offers, states, parsedData) {
    var reg = getRegistry();
    if (!reg) return [];

    var sections = [];
    var recommended = [];
    var upi = [];
    var cards = [];
    var moreWays = [];

    // Build tiles and sort into groups
    for (var i = 0; i < instrumentIds.length; i++) {
      var instId = instrumentIds[i];
      var inst = reg.getInstrument(instId);
      if (!inst) continue;

      var overrides = {
        holder: parsedData.customerName || 'Akshay',
        badge: badges[instId] || (inst.badges.length > 0 ? inst.badges[0] : ''),
        disabled: states[instId] === 'disabled'
      };

      if (offers[instId]) {
        overrides.offerAmount = offers[instId];
      }

      // Handle APB balance
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

      // Route to correct group
      var groupCat = inst.groupCategory;
      // If instrument has a badge (best offer/previously used/featured), put in RECOMMENDED
      if (overrides.badge && recommended.length < 3) {
        recommended.push(tile);
      } else if (groupCat === 'upi') {
        upi.push(tile);
      } else if (groupCat === 'cards') {
        cards.push(tile);
      } else {
        moreWays.push(tile);
      }
    }

    // Determine preselection across all tiles
    var allTiles = recommended.concat(upi).concat(cards).concat(moreWays);
    var preselIdx = determinePreselection(allTiles, parsedData);
    if (preselIdx >= 0 && preselIdx < allTiles.length) {
      allTiles[preselIdx].selected = true;
    }

    // Build sections
    if (recommended.length > 0) {
      sections.push({ title: 'RECOMMENDED', tiles: recommended });
    }
    if (upi.length > 0) {
      sections.push({ title: 'UPI', tiles: upi, addLink: '+ Add account to Amazon Pay UPI' });
    }
    if (cards.length > 0) {
      sections.push({ title: 'CREDIT & DEBIT CARDS', tiles: cards, addLink: '+ Add new credit or debit card' });
    }
    if (moreWays.length > 0) {
      sections.push({ title: 'MORE WAYS TO PAY', tiles: moreWays });
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

    // If no instruments found, use defaults
    if (instrumentIds.length === 0) {
      instrumentIds = ['cbcc', 'hdfc_credit', 'apay_upi', 'apay_balance', 'cod'];
      badges = { cbcc: 'Best offer', hdfc_credit: 'Previously used', apay_upi: 'Featured' };
      offers = { cbcc: '10' };
    }

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
