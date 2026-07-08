/**
 * PSP Design System - "Create Your PSP" AI Generator
 * Client-side LLM via OpenRouter API → Structured JSON → psp-frame.js
 *
 * Architecture:
 *   1. User prompt → OpenRouter (free/cheap model) with PSP system prompt
 *   2. LLM returns structured JSON config
 *   3. JSON → instrument registry → psp-frame.js renderer
 *
 * Falls back to basic rule engine ONLY when no API key is set.
 *
 * To activate: call window.PSP.features.pspGenerator.setApiKey('sk-or-...')
 * or paste key into the UI input field.
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

  function formatIndian(num) {
    var n = String(parseInt(num, 10) || 0);
    if (n.length <= 3) return n;
    var last3 = n.slice(-3);
    var rest = n.slice(0, -3);
    return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
  }

  // ═══════════════════════════════════════════
  // LLM CONFIG
  // ═══════════════════════════════════════════

  var config = {
    apiKey: null, // Set via setApiKey() or UI input
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'google/gemini-2.0-flash-exp:free',
    timeout: 15000
  };

  // Try to load saved key from localStorage
  try {
    var savedKey = localStorage.getItem('psp-openrouter-key');
    if (savedKey) config.apiKey = savedKey;
  } catch (e) {}

  // ═══════════════════════════════════════════
  // SYSTEM PROMPT — teaches the LLM PSP rules
  // ═══════════════════════════════════════════

  var SYSTEM_PROMPT = [
    'You are a PSP (Payment Selection Page) configuration generator for Amazon India checkout.',
    'Given a natural language description, output ONLY a valid JSON object. No markdown, no explanation, no code fences.',
    '',
    '## PSP RULES:',
    '- 4 sections in order: RECOMMENDED (max 3), UPI, CARDS, MORE WAYS TO PAY',
    '- RECOMMENDED: Gets badges. Sorted by badge priority: Best offer > Previously used > Featured',
    '- UPI section: ONLY upi-type instruments (apay_upi, other_upi). Never elsewhere.',
    '- CARDS section: ONLY card-type instruments. Never in More Ways.',
    '- MORE WAYS: Everything else (apay_balance, apay_later, cod, emi, net_banking)',
    '- First tile in RECOMMENDED is always auto-selected',
    '- Each badge type used at most ONCE across all instruments',
    '- If user mentions an instrument with a badge, it goes to RECOMMENDED',
    '- Keep base PSP intact unless user explicitly says otherwise',
    '',
    '## INSTRUMENTS (use these exact IDs):',
    '- cbcc: Amazon Pay ICICI Credit Card (type: card)',
    '- hdfc_credit: HDFC Credit Card (type: card)',
    '- hdfc_debit: HDFC Debit Card (type: card)',
    '- icici_credit: ICICI Credit Card (type: card)',
    '- sbi_debit: SBI Debit Card (type: card)',
    '- apay_upi: Amazon Pay UPI (type: upi)',
    '- other_upi: Pay by any UPI App (type: upi)',
    '- apay_balance: Amazon Pay Balance (type: wallet, default balance: 60)',
    '- apay_later: Amazon Pay Later (type: bnpl, default credit: 60000)',
    '- cod: Cash on Delivery (type: cod)',
    '- emi: EMI (type: emi)',
    '- net_banking: Net Banking (type: netbanking)',
    '',
    '## DEFAULT PSP (use when user does not specify):',
    '- RECOMMENDED: cbcc (Best offer), hdfc_credit (Previously used), apay_upi (Featured)',
    '- UPI: other_upi',
    '- CARDS: hdfc_debit',
    '- MORE WAYS: apay_balance, apay_later, cod, emi, net_banking',
    '',
    '## STATES: normal, disabled (e.g. expired), insufficient (only APB)',
    '',
    '## OUTPUT FORMAT (strict JSON, no other text):',
    '{',
    '  "orderAmount": <number or null>,',
    '  "customerName": "<string>",',
    '  "address": "<string>",',
    '  "sections": [',
    '    {',
    '      "type": "recommended" | "upi" | "cards" | "more_ways",',
    '      "instruments": [',
    '        {',
    '          "id": "<instrument_id>",',
    '          "badge": "Best offer" | "Previously used" | "Featured" | null,',
    '          "offerAmount": <number or null>,',
    '          "state": "normal" | "disabled" | "insufficient",',
    '          "creditLimit": <number or null>',
    '        }',
    '      ]',
    '    }',
    '  ]',
    '}',
    '',
    'IMPORTANT:',
    '- Always include all 4 sections unless user explicitly removes one',
    '- Modify only what the user specifies. Keep everything else from the default.',
    '- If user says "in UPI box" for an instrument, put it in the upi section',
    '- Badges only appear on instruments in the recommended section',
    '- The orderAmount in output should be the exact amount mentioned in the user\'s prompt. If user says \'₹2,500 order\', orderAmount should be 2500. Calculate the CTA price as orderAmount.',
    '- If user mentions cashback/discount amounts, subtract them from orderAmount only for the savings display, NOT the total price.'
  ].join('\n');

  // ═══════════════════════════════════════════
  // LOADING ANIMATION (scattered dots)
  // ═══════════════════════════════════════════

  var styleInjected = false;
  function injectStyles() {
    if (styleInjected) return;
    styleInjected = true;
    var s = document.createElement('style');
    s.textContent = [
      '.psp-dots-field { position:absolute;inset:0;overflow:hidden }',
      '.psp-dot { position:absolute;width:6px;height:6px;border-radius:50%;opacity:0;animation:pspDF 2.5s ease-in-out infinite }',
      '@keyframes pspDF { 0%,100%{opacity:0;transform:scale(.3)} 40%{opacity:.7;transform:scale(1)} 60%{opacity:.5;transform:scale(.8)} }',
      '.psp-ai-status { position:absolute;bottom:40px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.95);border:1px solid #E3E6E6;border-radius:20px;padding:8px 16px;font-size:12px;color:#565959;display:flex;align-items:center;gap:8px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.08);z-index:2 }',
      '@keyframes pspDP { 0%,100%{opacity:.3} 50%{opacity:1} }',
      '.psp-ai-status-dot { width:6px;height:6px;border-radius:50%;background:#FF9900;animation:pspDP 1s ease-in-out infinite }'
    ].join('\n');
    document.head.appendChild(s);
  }

  function showLoading(el) {
    injectStyles();
    el.innerHTML = '<div class="psp-ai-loading" style="width:100%;max-width:360px;height:520px;border-radius:30px;background:#F7FAFA;border:0.5px solid #989898;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.12);position:relative;display:flex;align-items:center;justify-content:center"><div class="psp-dots-field"></div><div class="psp-ai-status"><span class="psp-ai-status-dot"></span><span>AI is crafting your PSP...</span></div></div>';
    var field = el.querySelector('.psp-dots-field');
    if (!field) return;
    var colors = ['#FF9900','#2162A1','#0A7CD1','#82D8E3','#A6E7CE','#D5D9D9','#565959'];
    for (var i = 0; i < 40; i++) {
      var d = document.createElement('div');
      d.className = 'psp-dot';
      d.style.cssText = 'left:'+(Math.random()*90+5)+'%;top:'+(Math.random()*80+5)+'%;width:'+(3+Math.random()*5)+'px;height:'+d.style.width+';background:'+colors[i%7]+';animation-delay:'+(Math.random()*2.5)+'s;animation-duration:'+(1.5+Math.random()*1.5)+'s';
      d.style.height = d.style.width;
      field.appendChild(d);
    }
  }

  // ═══════════════════════════════════════════
  // LLM CALL (OpenRouter)
  // ═══════════════════════════════════════════

  function callLLM(prompt) {
    if (!config.apiKey) return Promise.resolve(null);

    return fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + config.apiKey,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.href,
        'X-Title': 'PSP Design System'
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 2000
      })
    })
    .then(function(res) {
      if (!res.ok) {
        return res.text().then(function(t) { throw new Error('API ' + res.status + ': ' + t.substring(0, 200)); });
      }
      return res.json();
    })
    .then(function(data) {
      var text = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      if (!text) {
        console.warn('[PSP Generator] Empty response from LLM:', JSON.stringify(data).substring(0, 300));
        return null;
      }
      // Strip markdown fences if present
      text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
      // Try to extract JSON from the response (LLM might add text before/after)
      var jsonStart = text.indexOf('{');
      var jsonEnd = text.lastIndexOf('}');
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        text = text.substring(jsonStart, jsonEnd + 1);
      }
      try { return JSON.parse(text); } catch (e) {
        console.warn('[PSP Generator] Failed to parse LLM JSON:', text.substring(0, 500));
        return { _error: 'parse_failed', _raw: text.substring(0, 300) };
      }
    })
    .catch(function(err) {
      console.warn('[PSP Generator] LLM error:', err.message);
      return { _error: err.message };
    });
  }

  // ═══════════════════════════════════════════
  // JSON → RENDER CONFIG (converts LLM output to psp-frame config)
  // ═══════════════════════════════════════════

  function jsonToConfig(json) {
    var reg = getRegistry();
    if (!reg || !json || !json.sections) return null;

    var titleMap = { recommended:'RECOMMENDED', upi:'UPI', cards:'CREDIT & DEBIT CARDS', more_ways:'MORE WAYS TO PAY' };
    var addLinks = { upi:'+ Add account to Amazon Pay UPI', cards:'+ Add new credit or debit card' };
    var sections = [];
    var allTiles = [];

    for (var si = 0; si < json.sections.length; si++) {
      var sec = json.sections[si];
      if (!sec.instruments || !sec.instruments.length) continue;
      var tiles = [];
      for (var ti = 0; ti < sec.instruments.length; ti++) {
        var inst = sec.instruments[ti];
        var overrides = {
          holder: json.customerName || 'Akshay',
          badge: inst.badge || '',
          disabled: inst.state === 'disabled'
        };
        if (inst.offerAmount) overrides.offerAmount = String(inst.offerAmount);
        if (inst.id === 'apay_balance') {
          var regI = reg.getInstrument('apay_balance');
          var bal = regI ? regI.defaultBalance || 60 : 60;
          overrides.balance = bal;
          if (inst.state === 'insufficient' || (json.orderAmount && bal < json.orderAmount)) {
            overrides.insufficientBalance = true;
            overrides.shortfall = formatIndian(json.orderAmount - bal);
          }
        }
        if (inst.id === 'apay_later' && inst.creditLimit) {
          overrides.creditLimit = formatIndian(inst.creditLimit);
        }
        var tile = reg.buildTile(inst.id, overrides);
        if (tile) { tiles.push(tile); allTiles.push(tile); }
      }
      if (tiles.length) {
        var s = { title: titleMap[sec.type] || sec.type, tiles: tiles };
        if (addLinks[sec.type]) s.addLink = addLinks[sec.type];
        sections.push(s);
      }
    }

    if (allTiles.length > 0) allTiles[0].selected = true;

    var price = json.orderAmount || 504;
    var savings = 0;
    if (allTiles[0] && allTiles[0].offer) {
      var m = allTiles[0].offer.match(/\u20B9([\d,]+)/);
      if (m) savings = parseInt(m[1].replace(/,/g,''), 10);
    }

    return {
      address: { name: 'Deliver to ' + (json.customerName || 'Akshay'), detail: json.address || 'Bengaluru 560001, Karnataka', showChange: true },
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
  // FALLBACK: hardcoded default config (no parsing needed)
  // Used only when no API key is set
  // ═══════════════════════════════════════════

  function getDefaultConfig() {
    var reg = getRegistry();
    if (!reg) return { sections: [] };

    var recTiles = [
      reg.buildTile('cbcc', { holder: 'Akshay', badge: 'Best offer', offerAmount: '10' }),
      reg.buildTile('hdfc_credit', { holder: 'Akshay', badge: 'Previously used', offerAmount: '6' }),
      reg.buildTile('apay_upi', { holder: 'Akshay', badge: 'Featured' })
    ].filter(Boolean);
    recTiles[0].selected = true;

    var upiTiles = [reg.buildTile('other_upi', { badge: '' })].filter(Boolean);
    var cardsTiles = [reg.buildTile('hdfc_debit', { holder: 'Akshay', badge: '' })].filter(Boolean);
    var moreTiles = [
      reg.buildTile('apay_balance', { badge: '' }),
      reg.buildTile('apay_later', { badge: '' }),
      reg.buildTile('cod', { badge: '' }),
      reg.buildTile('emi', { badge: '' }),
      reg.buildTile('net_banking', { badge: '' })
    ].filter(Boolean);

    return {
      address: { name: 'Deliver to Akshay', detail: 'Bengaluru 560001, Karnataka', showChange: true },
      sections: [
        { title: 'RECOMMENDED', tiles: recTiles },
        { title: 'UPI', tiles: upiTiles, addLink: '+ Add account to Amazon Pay UPI' },
        { title: 'CREDIT & DEBIT CARDS', tiles: cardsTiles, addLink: '+ Add new credit or debit card' },
        { title: 'MORE WAYS TO PAY', tiles: moreTiles }
      ],
      giftCard: { text: 'Add Gift Card or Promo Code' },
      cta: { savings: '\u20B916 saved', offersLink: 'See offers \u203A', price: '504', feeNote: 'Includes fees', buttonText: 'Continue' }
    };
  }

  // Legacy parse() for backward compat (just returns default)
  function parse() {
    return getDefaultConfig();
  }

  // ═══════════════════════════════════════════
  // GENERATE (main entry point)
  // ═══════════════════════════════════════════

  function generate(prompt, outputEl) {
    if (!outputEl) return;
    if (!window.PSP || !window.PSP.renderers || !window.PSP.renderers.pspFrame) return;
    var renderer = window.PSP.renderers.pspFrame;

    // No API key → render default with a note
    if (!config.apiKey) {
      var cfg = getDefaultConfig();
      outputEl.innerHTML = renderer.render(cfg);
      renderer.attachInteractivity(outputEl);
      return;
    }

    // Show loading
    showLoading(outputEl);

    // Minimum 2s loading for smooth feel
    var minTimer = new Promise(function(r) { setTimeout(r, 2000); });

    Promise.all([callLLM(prompt), minTimer]).then(function(results) {
      var llmJson = results[0];
      var cfg = null;

      // Check for errors
      if (llmJson && llmJson._error) {
        outputEl.innerHTML = '<div style="padding:20px;background:#fff5f5;border:1px solid #fca5a5;border-radius:12px;max-width:360px"><div style="font-size:14px;font-weight:600;color:#991b1b;margin-bottom:8px">⚠️ Generation failed</div><div style="font-size:12px;color:#7f1d1d;line-height:1.6">' + (llmJson._error === 'parse_failed' ? 'LLM returned invalid JSON. Raw response:<br><code style="font-size:11px;word-break:break-all">' + (llmJson._raw || '') + '</code>' : llmJson._error) + '</div><div style="font-size:11px;color:#9ca3af;margin-top:12px">Model: ' + config.model + '</div></div>';
        return;
      }

      if (llmJson && llmJson.sections) cfg = jsonToConfig(llmJson);
      if (!cfg || !cfg.sections || !cfg.sections.length) cfg = getDefaultConfig();

      outputEl.innerHTML = renderer.render(cfg);
      renderer.attachInteractivity(outputEl);
    });
  }

  // ═══════════════════════════════════════════
  // API KEY MANAGEMENT
  // ═══════════════════════════════════════════

  function setApiKey(key) {
    config.apiKey = key || null;
    try { localStorage.setItem('psp-openrouter-key', key || ''); } catch (e) {}
  }

  function getApiKey() { return config.apiKey; }
  function hasApiKey() { return !!config.apiKey; }

  function setModel(model) { config.model = model; }

  // ═══════════════════════════════════════════
  // EXPOSE
  // ═══════════════════════════════════════════

  window.PSP.features.pspGenerator = {
    generate: generate,
    parse: parse,
    getDefaultConfig: getDefaultConfig,
    setApiKey: setApiKey,
    getApiKey: getApiKey,
    hasApiKey: hasApiKey,
    setModel: setModel,
    getSystemPrompt: function() { return SYSTEM_PROMPT; }
  };

})();
