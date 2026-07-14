/**
 * PSP Design System - Instrument Registry
 * Complete instrument type definitions for the "Create Your PSP" AI feature.
 * Each instrument type maps to: icon, default display values, detail formats,
 * badge rules, grouping category, and special UI elements (bank pill, CTA buttons).
 *
 * This is the single source of truth for generating PSP layouts.
 * The psp-frame.js renderer consumes tiles built from this registry.
 *
 * Usage:
 *   var registry = window.PSP.data.instrumentRegistry;
 *   var cbcc = registry.instruments.cbcc;
 *   var group = registry.getGroup('recommended');
 */
(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // INSTRUMENT DEFINITIONS
  // Each has: id, type, name, icon, detailFormat, badgeEligible, groupCategory
  // ═══════════════════════════════════════════════════════════════

  var instruments = {
    cbcc: {
      id: 'cbcc',
      type: 'card',
      name: 'Amazon Pay ICICI credit card',
      icon: 'PSP Instument icons/Amazon Pay ICICI credit card.png',
      detailFormat: '<span style="color:#1A1F71;font-weight:700;font-size:10px;letter-spacing:1px">VISA</span> \u2022\u20220424 | {holder}',
      defaultDetail: '<span style="color:#1A1F71;font-weight:700;font-size:10px;letter-spacing:1px">VISA</span> \u2022\u20220424 | Akshay',
      badges: ['Best offer'],
      offerFormat: 'Save \u20B9{amount} as cashback.',
      defaultOffer: 'Save \u20B910 as cashback.',
      detailsLink: 'Details',
      groupCategory: 'recommended',
      preselectionPriority: 1
    },

    hdfc_credit: {
      id: 'hdfc_credit',
      type: 'card',
      name: 'HDFC credit card',
      icon: 'PSP Instument icons/HDFC Banks.png',
      detailFormat: '<span style="color:#1A1F71;font-weight:700;font-size:10px;letter-spacing:1px">VISA</span> \u2022\u20220422 | {holder}',
      defaultDetail: '<span style="color:#1A1F71;font-weight:700;font-size:10px;letter-spacing:1px">VISA</span> \u2022\u20220422 | Akshay',
      badges: ['Previously used'],
      offerFormat: 'Save \u20B9{amount}.',
      defaultOffer: 'Save \u20B96.',
      detailsLink: 'Details',
      groupCategory: 'recommended',
      preselectionPriority: 3
    },

    hdfc_debit: {
      id: 'hdfc_debit',
      type: 'card',
      name: 'HDFC debit card',
      icon: 'PSP Instument icons/HDFC Banks.png',
      detailFormat: '<span style="color:#1A1F71;font-weight:700;font-size:10px;letter-spacing:1px">VISA</span> \u2022\u20220333 | {holder}',
      defaultDetail: '<span style="color:#1A1F71;font-weight:700;font-size:10px;letter-spacing:1px">VISA</span> \u2022\u20220333 | Akshay',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'cards',
      preselectionPriority: 5
    },

    icici_credit: {
      id: 'icici_credit',
      type: 'card',
      name: 'ICICI credit card',
      icon: 'PSP Instument icons/ICICI Banks.png',
      detailFormat: '<span style="color:#1A1F71;font-weight:700;font-size:10px;letter-spacing:1px">VISA</span> \u2022\u20221234 | {holder}',
      defaultDetail: '<span style="color:#1A1F71;font-weight:700;font-size:10px;letter-spacing:1px">VISA</span> \u2022\u20221234 | Akshay',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'cards',
      preselectionPriority: 5
    },

    sbi_debit: {
      id: 'sbi_debit',
      type: 'card',
      name: 'SBI debit card',
      icon: 'PSP Instument icons/SBI Banks.png',
      detailFormat: '<span style="color:#097252;font-weight:700;font-size:10px;letter-spacing:0.5px">RuPay</span> \u2022\u20225678 | {holder}',
      defaultDetail: '<span style="color:#097252;font-weight:700;font-size:10px;letter-spacing:0.5px">RuPay</span> \u2022\u20225678 | Akshay',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'cards',
      preselectionPriority: 5
    },

    apay_upi: {
      id: 'apay_upi',
      type: 'upi',
      name: 'Amazon Pay UPI',
      icon: 'PSP Instument icons/APay UPI.png',
      detailFormat: null,
      defaultDetail: '',
      badges: ['Featured'],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'recommended',
      preselectionPriority: 4,
      bankPill: {
        icon: 'PSP Instument icons/ICICI Bank UPI Pill.png',
        text: 'ICICI Bank \u2022\u20220911'
      }
    },

    other_upi: {
      id: 'other_upi',
      type: 'upi',
      name: 'Pay by any UPI App',
      icon: 'PSP Instument icons/Any other UPI.png',
      detailFormat: null,
      defaultDetail: '',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'upi',
      preselectionPriority: 6
    },

    apay_balance: {
      id: 'apay_balance',
      type: 'wallet',
      name: 'Amazon Pay Balance: \u20B9{balance}',
      icon: 'PSP Instument icons/APay Balance.png',
      detailFormat: null,
      defaultDetail: '',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'more_ways',
      preselectionPriority: 2,
      // Dynamic: shows insufficient CTA if balance < order
      insufficientCta: {
        textFormat: 'Add \u20B9{shortfall} to proceed',
        button: 'Add Now \u203A'
      },
      defaultBalance: 60
    },

    apay_later: {
      id: 'apay_later',
      type: 'bnpl',
      name: 'Amazon Pay Later',
      icon: 'PSP Instument icons/APay Later.png',
      detailFormat: 'Available credit: \u20B9 {credit}',
      defaultDetail: 'Available credit: \u20B9 60,000',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'more_ways',
      preselectionPriority: 5
    },

    cod: {
      id: 'cod',
      type: 'cod',
      name: 'Cash on Delivery',
      icon: 'PSP Instument icons/POD.png',
      detailFormat: 'Convenience fee of \u20B9{fee} will apply',
      defaultDetail: 'Convenience fee of \u20B97 will apply',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'more_ways',
      preselectionPriority: 9
    },

    emi: {
      id: 'emi',
      type: 'emi',
      name: 'EMI',
      icon: 'PSP Instument icons/EMI.png',
      detailFormat: null,
      defaultDetail: '',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'more_ways',
      preselectionPriority: 7
    },

    net_banking: {
      id: 'net_banking',
      type: 'netbanking',
      name: 'Net Banking',
      icon: 'PSP Instument icons/Net Banking.png',
      detailFormat: null,
      defaultDetail: '',
      badges: [],
      offerFormat: null,
      defaultOffer: '',
      detailsLink: '',
      groupCategory: 'more_ways',
      preselectionPriority: 8
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // SECTION/GROUP DEFINITIONS
  // ═══════════════════════════════════════════════════════════════

  var groups = {
    recommended: {
      id: 'recommended',
      title: 'RECOMMENDED',
      maxItems: 3,
      addLink: null,
      order: 1
    },
    upi: {
      id: 'upi',
      title: 'UPI',
      maxItems: 10,
      addLink: '+ Add account to Amazon Pay UPI',
      order: 2
    },
    cards: {
      id: 'cards',
      title: 'CREDIT & DEBIT CARDS',
      maxItems: 10,
      addLink: '+ Add new credit or debit card',
      order: 3
    },
    more_ways: {
      id: 'more_ways',
      title: 'MORE WAYS TO PAY',
      maxItems: 10,
      addLink: null,
      order: 4
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // PRESELECTION RULES
  // ═══════════════════════════════════════════════════════════════

  var preselectionRules = [
    { priority: 1, condition: 'best_offer', description: 'Instrument with best offer cashback/discount' },
    { priority: 2, condition: 'apb_sufficient', description: 'Amazon Pay Balance >= order total' },
    { priority: 3, condition: 'previously_used', description: 'Last successfully used instrument (within 30 days)' },
    { priority: 4, condition: 'single_instrument', description: 'Only one transaction-ready instrument available' },
    { priority: 5, condition: 'none', description: 'Multiple options, no priority match — show Featured, no preselection' }
  ];

  // ═══════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  /**
   * Get an instrument by ID.
   * @param {string} id
   * @returns {object|null}
   */
  function getInstrument(id) {
    return instruments[id] || null;
  }

  /**
   * Get all instruments in a group category.
   * @param {string} groupId - 'recommended', 'upi', 'cards', 'more_ways'
   * @returns {object[]}
   */
  function getInstrumentsByGroup(groupId) {
    var result = [];
    var keys = Object.keys(instruments);
    for (var i = 0; i < keys.length; i++) {
      if (instruments[keys[i]].groupCategory === groupId) {
        result.push(instruments[keys[i]]);
      }
    }
    return result;
  }

  /**
   * Get group definition.
   * @param {string} groupId
   * @returns {object|null}
   */
  function getGroup(groupId) {
    return groups[groupId] || null;
  }

  /**
   * Get all group definitions sorted by order.
   * @returns {object[]}
   */
  function getGroupsOrdered() {
    return Object.keys(groups)
      .map(function(k) { return groups[k]; })
      .sort(function(a, b) { return a.order - b.order; });
  }

  /**
   * Get all instrument IDs.
   * @returns {string[]}
   */
  function getAllIds() {
    return Object.keys(instruments);
  }

  /**
   * Build a tile config object from an instrument + user overrides.
   * Used by the PSP generator to create tiles for psp-frame.js
   * @param {string} instrumentId
   * @param {object} overrides - { selected, disabled, badge, offer, details, holder, balance, etc. }
   * @returns {object} Tile config for psp-frame.renderTile()
   */
  function buildTile(instrumentId, overrides) {
    overrides = overrides || {};
    var inst = instruments[instrumentId];
    if (!inst) return null;

    var tile = {
      icon: inst.icon,
      name: overrides.name || inst.name,
      details: overrides.details || inst.defaultDetail,
      badge: overrides.badge !== undefined ? overrides.badge : (inst.badges.length > 0 ? inst.badges[0] : ''),
      offer: overrides.offer || inst.defaultOffer,
      detailsLink: overrides.detailsLink !== undefined ? overrides.detailsLink : inst.detailsLink,
      selected: !!overrides.selected,
      disabled: !!overrides.disabled
    };

    // Handle dynamic name (APB balance)
    if (inst.id === 'apay_balance') {
      var bal = overrides.balance !== undefined ? overrides.balance : (inst.defaultBalance || 60);
      tile.name = 'Amazon Pay Balance: \u20B9' + bal;
    }

    // Handle bank pill (UPI)
    if (inst.bankPill) {
      tile.bankPill = overrides.bankPill !== undefined ? overrides.bankPill : inst.bankPill;
    }

    // Handle insufficient balance CTA
    if (inst.insufficientCta && overrides.insufficientBalance) {
      tile.insufficientCta = {
        text: 'Add \u20B9' + overrides.shortfall + ' to proceed',
        button: inst.insufficientCta.button
      };
    }

    // Handle offer with custom amount
    if (overrides.offerAmount && inst.offerFormat) {
      tile.offer = inst.offerFormat.replace('{amount}', overrides.offerAmount);
    }

    // Handle detail with custom holder
    if (overrides.holder && inst.detailFormat) {
      tile.details = inst.detailFormat.replace('{holder}', overrides.holder);
    }

    // Handle APL credit limit
    if (inst.id === 'apay_later' && overrides.creditLimit) {
      tile.details = 'Available credit: \u20B9 ' + overrides.creditLimit;
    } else if (inst.id === 'apay_later' && tile.details && tile.details.indexOf('{credit}') !== -1) {
      tile.details = inst.defaultDetail;
    }

    // Handle COD fee (always use default)
    if (inst.id === 'cod' && tile.details && tile.details.indexOf('{fee}') !== -1) {
      tile.details = inst.defaultDetail;
    }

    return tile;
  }

  // ═══════════════════════════════════════════════════════════════
  // EXPOSE API
  // ═══════════════════════════════════════════════════════════════

  window.PSP.data.instrumentRegistry = {
    instruments: instruments,
    groups: groups,
    preselectionRules: preselectionRules,
    getInstrument: getInstrument,
    getInstrumentsByGroup: getInstrumentsByGroup,
    getGroup: getGroup,
    getGroupsOrdered: getGroupsOrdered,
    getAllIds: getAllIds,
    buildTile: buildTile
  };

})();
