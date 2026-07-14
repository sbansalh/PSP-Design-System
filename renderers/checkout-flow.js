/**
 * PSP Design System - Fast Checkout Flow Renderer
 * Interactive step-by-step shopping journey visualization.
 * Shows one frame at a time: Home → DP → Cart → PSP → SPC (Thunderbolt)
 *
 * Steps 1-3 use static PNGs (provided by designer) with interactive hotspots.
 * Step 4 is a dynamic PSP rendered via psp-frame.js.
 * Step 5 is the Thunderbolt SPC view.
 *
 * Usage:
 *   window.PSP.renderers.checkoutFlow.render(containerEl);
 */
(function() {
  'use strict';

  var STEPS = [
    { id: 'home', label: 'Home', icon: '🏠', placeholder: 'Home screen PNG — tap product to continue' },
    { id: 'dp', label: 'Detail Page', icon: '📱', placeholder: 'Product detail page PNG — tap Buy Now' },
    { id: 'cart', label: 'Cart', icon: '🛒', placeholder: 'Cart page PNG — tap Proceed to Checkout' },
    { id: 'psp', label: 'PSP', icon: '💳', placeholder: null },
    { id: 'spc', label: 'Thunderbolt SPC', icon: '⚡', placeholder: null }
  ];

  var currentStep = 0;

  /**
   * Render the checkout flow UI into a container.
   * @param {HTMLElement} containerEl
   */
  function render(containerEl) {
    if (!containerEl) return;
    currentStep = 0;
    renderStep(containerEl);
  }

  /**
   * Render a specific step.
   * @param {HTMLElement} containerEl
   */
  function renderStep(containerEl) {
    var step = STEPS[currentStep];
    var html = '';

    // Step indicator dots
    html += '<div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:20px">';
    for (var i = 0; i < STEPS.length; i++) {
      var isActive = i === currentStep;
      var isPast = i < currentStep;
      var dotColor = isActive ? '#FF9900' : (isPast ? '#0B7B3C' : '#D5D9D9');
      var dotSize = isActive ? '10px' : '7px';
      html += '<div style="width:' + dotSize + ';height:' + dotSize + ';border-radius:50%;background:' + dotColor + ';transition:all .2s"></div>';
    }
    html += '</div>';

    // Step label
    html += '<div style="text-align:center;margin-bottom:16px">';
    html += '<span style="font-size:13px;font-weight:600;color:#1a1c1e;background:#f0f2f4;padding:4px 12px;border-radius:12px">' + step.icon + ' ' + step.label + '</span>';
    html += '</div>';

    // Frame content
    html += '<div style="display:flex;justify-content:center">';

    if (step.id === 'psp') {
      // Dynamic PSP
      html += '<div id="psp-flow-psp-frame" style="width:100%;max-width:360px"></div>';
    } else if (step.id === 'spc') {
      // Thunderbolt
      html += '<div id="psp-flow-spc-frame" style="width:100%;max-width:360px"></div>';
    } else {
      // Static placeholder (will be replaced with PNGs)
      html += '<div style="width:100%;max-width:360px;height:520px;border-radius:30px;background:#F7FAFA;border:0.5px solid #989898;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.12);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;cursor:pointer" data-flow-advance>';
      html += '<div style="font-size:48px;margin-bottom:20px">' + step.icon + '</div>';
      html += '<div style="font-size:15px;font-weight:600;color:#1a1c1e;margin-bottom:8px">' + step.label + '</div>';
      html += '<div style="font-size:13px;color:#565959;line-height:1.6;margin-bottom:24px">' + step.placeholder + '</div>';
      html += '<div style="background:#FFD814;border-radius:80px;padding:12px 28px;font-size:14px;color:#0F1111;font-weight:500;cursor:pointer">Tap to continue →</div>';
      html += '</div>';
    }

    html += '</div>';

    // Navigation buttons
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding:0 8px">';
    if (currentStep > 0) {
      html += '<button data-flow-back style="background:#fff;border:1px solid #d5d9d9;border-radius:8px;padding:8px 16px;font-size:13px;color:#1a1c1e;cursor:pointer;font-family:inherit">← Back</button>';
    } else {
      html += '<div></div>';
    }
    if (currentStep < STEPS.length - 1) {
      html += '<button data-flow-next style="background:#0972d3;border:none;border-radius:8px;padding:8px 16px;font-size:13px;color:#fff;cursor:pointer;font-family:inherit;font-weight:500">Next →</button>';
    } else {
      html += '<button data-flow-restart style="background:#16a34a;border:none;border-radius:8px;padding:8px 16px;font-size:13px;color:#fff;cursor:pointer;font-family:inherit;font-weight:500">↺ Restart</button>';
    }
    html += '</div>';

    containerEl.innerHTML = html;

    // Render dynamic content for PSP and SPC steps
    if (step.id === 'psp') {
      var pspFrame = containerEl.querySelector('#psp-flow-psp-frame');
      if (pspFrame && window.PSP.renderers.pspFrame) {
        var reg = window.PSP.data.instrumentRegistry;
        var recTiles = [
          reg.buildTile('cbcc', { holder: 'Akshay', badge: 'Best offer', offerAmount: '2625' }),
          reg.buildTile('hdfc_credit', { holder: 'Akshay', badge: 'Previously used', offerAmount: '6' }),
          reg.buildTile('apay_upi', { holder: 'Akshay', badge: 'Featured' })
        ].filter(Boolean);
        recTiles[0].selected = true;

        var pspConfig = {
          address: { name: 'Deliver to Akshay', detail: 'Bengaluru 560001, Karnataka', showChange: true },
          sections: [
            { title: 'RECOMMENDED', tiles: recTiles },
            { title: 'UPI', tiles: [reg.buildTile('other_upi', { badge: '' })].filter(Boolean), addLink: '+ Add account to Amazon Pay UPI' },
            { title: 'CREDIT & DEBIT CARDS', tiles: [reg.buildTile('hdfc_debit', { holder: 'Akshay', badge: '' })].filter(Boolean), addLink: '+ Add new credit or debit card' },
            { title: 'MORE WAYS TO PAY', tiles: [
              reg.buildTile('apay_balance', { badge: '' }),
              reg.buildTile('apay_later', { badge: '' }),
              reg.buildTile('cod', { badge: '' })
            ].filter(Boolean) }
          ],
          giftCard: { text: 'Add Gift Card or Promo Code' },
          cta: { savings: '\u20B92,625 saved', offersLink: 'See offers \u203A', price: '50,204', feeNote: 'Includes fees', buttonText: 'Continue' }
        };
        pspFrame.innerHTML = window.PSP.renderers.pspFrame.render(pspConfig);
        window.PSP.renderers.pspFrame.attachInteractivity(pspFrame);
      }
    } else if (step.id === 'spc') {
      var spcFrame = containerEl.querySelector('#psp-flow-spc-frame');
      if (spcFrame && window.PSP.renderers.pspFrame.renderThunderbolt) {
        var tbConfig = window.PSP.renderers.pspFrame.getDefaultThunderboltConfig();
        spcFrame.innerHTML = window.PSP.renderers.pspFrame.renderThunderbolt(tbConfig);
        window.PSP.renderers.pspFrame.attachThunderboltInteractivity(spcFrame);
      }
    }

    // Attach navigation listeners
    attachNavListeners(containerEl);
  }

  /**
   * Attach navigation event listeners.
   * @param {HTMLElement} containerEl
   */
  function attachNavListeners(containerEl) {
    var nextBtn = containerEl.querySelector('[data-flow-next]');
    var backBtn = containerEl.querySelector('[data-flow-back]');
    var restartBtn = containerEl.querySelector('[data-flow-restart]');
    var advanceEl = containerEl.querySelector('[data-flow-advance]');

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (currentStep < STEPS.length - 1) { currentStep++; renderStep(containerEl); }
      });
    }
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        if (currentStep > 0) { currentStep--; renderStep(containerEl); }
      });
    }
    if (restartBtn) {
      restartBtn.addEventListener('click', function() {
        currentStep = 0; renderStep(containerEl);
      });
    }
    if (advanceEl) {
      advanceEl.addEventListener('click', function() {
        if (currentStep < STEPS.length - 1) { currentStep++; renderStep(containerEl); }
      });
    }
  }

  // Expose on namespace
  window.PSP.renderers.checkoutFlow = {
    render: render
  };

})();
