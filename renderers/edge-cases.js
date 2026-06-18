/**
 * PSP Design System - Edge Case & Error Recovery Documentation Renderer
 * Documents edge cases per component (empty states, overflow text, loading states)
 * and creates error recovery flow diagrams showing user path from failure to resolution.
 *
 * Usage:
 *   window.PSP.renderers.edgeCases.render(containerEl);
 *   var html = window.PSP.renderers.edgeCases.generateHtml();
 *
 * Data source: Inline edge case data + window.PSP.data.components
 * Each edge case entry has: componentId, edgeCases { emptyState, overflowText, loadingState }
 * Each error recovery flow has: componentId, errorType, errorMessage, availableActions[], resultingState, diagram[]
 *
 * Requirements: 13.1 (edge cases per component), 13.2 (error recovery flow diagrams),
 *               13.3 (error flow specs), 13.4 (visual examples of edge case rendering)
 */
(function() {
  'use strict';

  var STYLE_ID = 'psp-edge-cases-styles';

  // ═══════════════════════════════════════════════════════════════
  // Edge Case Data (inline — documentation content)
  // ═══════════════════════════════════════════════════════════════

  var EDGE_CASE_DATA = {
    instrumentTile: {
      componentId: 'instrumentTile',
      componentName: 'Instrument Tile',
      edgeCases: {
        emptyState: {
          title: 'No instruments available',
          description: 'When the user has no saved payment instruments, the tile list area displays an empty state prompt.',
          visual: { type: 'empty', placeholder: 'No saved payment methods. Add a new card or bank account to get started.' }
        },
        overflowText: {
          title: 'Long instrument name truncation',
          description: 'Instrument names exceeding the container width are truncated with ellipsis. Card details (network + last 4) wrap to second line if needed.',
          visual: { type: 'overflow', text: 'Amazon Pay ICICI Bank Platinum Rewards International Credit Card', maxWidth: '220px' }
        },
        loadingState: {
          title: 'Instrument list loading',
          description: 'While fetching payment instruments from the server, a skeleton shimmer placeholder is displayed in place of each tile.',
          visual: { type: 'loading', shimmerCount: 3 }
        }
      }
    },
    sectionHeader: {
      componentId: 'sectionHeader',
      componentName: 'Section Header',
      edgeCases: {
        emptyState: {
          title: 'Section with zero items',
          description: 'When a payment category section has no available instruments, the header displays with a (0) count and the section body is collapsed.',
          visual: { type: 'empty', placeholder: 'CREDIT & DEBIT CARDS (0)' }
        },
        overflowText: {
          title: 'Long section label',
          description: 'Section labels that exceed the header width are truncated. This can happen with dynamic category names from backend.',
          visual: { type: 'overflow', text: 'CREDIT & DEBIT CARDS AND OTHER BANKING INSTRUMENTS', maxWidth: '280px' }
        },
        loadingState: {
          title: 'Section count loading',
          description: 'While instrument counts are being calculated, the count badge shows a spinner indicator instead of a number.',
          visual: { type: 'loading', shimmerCount: 1 }
        }
      }
    },
    badge: {
      componentId: 'badge',
      componentName: 'Badge',
      edgeCases: {
        emptyState: {
          title: 'No badge applicable',
          description: 'When no offers or status labels apply to an instrument, the badge element is hidden entirely (not rendered as empty).',
          visual: { type: 'empty', placeholder: '[Badge hidden — no offer available]' }
        },
        overflowText: {
          title: 'Long badge label',
          description: 'Badge labels exceeding max-width are truncated with ellipsis. Badges have a max-width of 120px.',
          visual: { type: 'overflow', text: 'Limited time cashback offer available', maxWidth: '120px' }
        },
        loadingState: {
          title: 'Offer calculation pending',
          description: 'While the system calculates applicable offers, the badge area shows a small shimmer placeholder.',
          visual: { type: 'loading', shimmerCount: 1 }
        }
      }
    },
    ctaBar: {
      componentId: 'ctaBar',
      componentName: 'CTA Bar',
      edgeCases: {
        emptyState: {
          title: 'No instrument selected',
          description: 'When no payment instrument is selected, the CTA bar shows a disabled state with "Select a payment method" messaging.',
          visual: { type: 'empty', placeholder: 'Select a payment method to continue' }
        },
        overflowText: {
          title: 'Large price amount overflow',
          description: 'Very large order totals (₹10,00,000+) may exceed the price display area. Text scales down or wraps to prevent overflow.',
          visual: { type: 'overflow', text: '₹10,00,000.00', maxWidth: '140px' }
        },
        loadingState: {
          title: 'Price calculation in progress',
          description: 'While the final amount is being calculated (e.g., applying coupon or offer), the price area shows a loading indicator.',
          visual: { type: 'loading', shimmerCount: 1 }
        }
      }
    },
    savingsBar: {
      componentId: 'savingsBar',
      componentName: 'Savings Bar',
      edgeCases: {
        emptyState: {
          title: 'No savings available',
          description: 'When the selected instrument offers no savings, the savings bar is hidden completely rather than showing ₹0.',
          visual: { type: 'empty', placeholder: '[Savings bar hidden — ₹0 savings]' }
        },
        overflowText: {
          title: 'Long savings message',
          description: 'Savings messages with complex offer descriptions are truncated with "..." and a "View details" link.',
          visual: { type: 'overflow', text: 'Save ₹150 as cashback on orders above ₹999 with Amazon Pay ICICI credit card', maxWidth: '260px' }
        },
        loadingState: {
          title: 'Savings calculation loading',
          description: 'While savings are being recalculated (instrument change), the bar shows a shimmer animation.',
          visual: { type: 'loading', shimmerCount: 1 }
        }
      }
    },
    bankPill: {
      componentId: 'bankPill',
      componentName: 'Bank Pill',
      edgeCases: {
        emptyState: {
          title: 'No linked bank accounts',
          description: 'When no UPI bank accounts are linked, the pill area shows an "Add bank account" prompt instead of empty space.',
          visual: { type: 'empty', placeholder: '+ Add bank account' }
        },
        overflowText: {
          title: 'Long bank name in pill',
          description: 'Bank names exceeding pill width are abbreviated (e.g., "State Bank of India" → "SBI").',
          visual: { type: 'overflow', text: 'State Bank of India', maxWidth: '100px' }
        },
        loadingState: {
          title: 'Bank account verification',
          description: 'While verifying bank account availability, the pill shows a subtle pulse animation.',
          visual: { type: 'loading', shimmerCount: 2 }
        }
      }
    },
    serviceTile: {
      componentId: 'serviceTile',
      componentName: 'Service Tile',
      edgeCases: {
        emptyState: {
          title: 'Service unavailable',
          description: 'When a service (e.g., Pay Later) is unavailable for the current order, the tile shows a disabled state with explanation.',
          visual: { type: 'empty', placeholder: 'Pay Later — Not available for this order amount' }
        },
        overflowText: {
          title: 'Long service description',
          description: 'Service descriptions exceeding two lines are clamped with ellipsis using line-clamp CSS.',
          visual: { type: 'overflow', text: 'EMI starting ₹167/month for 12 months with zero processing fee on eligible credit cards from partner banks', maxWidth: '240px' }
        },
        loadingState: {
          title: 'Service eligibility check',
          description: 'While checking user eligibility for services, tiles show skeleton placeholders with shimmer effect.',
          visual: { type: 'loading', shimmerCount: 2 }
        }
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // Error Recovery Flow Data
  // ═══════════════════════════════════════════════════════════════

  var ERROR_RECOVERY_FLOWS = [
    {
      componentId: 'instrumentTile',
      errorType: 'payment_failure',
      errorMessage: 'Payment failed. Your card was not charged.',
      availableActions: ['Try again', 'Choose another payment method', 'Contact bank'],
      resultingState: 'enabled',
      diagram: [
        { id: 'error', label: 'Payment failed', type: 'error', next: 'action1' },
        { id: 'action1', label: 'Retry payment', type: 'action', next: 'resolution1' },
        { id: 'action2', label: 'Switch instrument', type: 'action', next: 'resolution2' },
        { id: 'resolution1', label: 'Payment processed', type: 'resolution' },
        { id: 'resolution2', label: 'New instrument selected', type: 'resolution' }
      ]
    },
    {
      componentId: 'instrumentTile',
      errorType: 'network_timeout',
      errorMessage: 'Unable to load payment methods. Please check your connection.',
      availableActions: ['Retry', 'Refresh page'],
      resultingState: 'loading',
      diagram: [
        { id: 'error', label: 'Network timeout', type: 'error', next: 'action1' },
        { id: 'action1', label: 'Tap Retry', type: 'action', next: 'resolution1' },
        { id: 'action2', label: 'Refresh page', type: 'action', next: 'resolution2' },
        { id: 'resolution1', label: 'Instruments loaded', type: 'resolution' },
        { id: 'resolution2', label: 'Page reloaded', type: 'resolution' }
      ]
    },
    {
      componentId: 'ctaBar',
      errorType: 'insufficient_balance',
      errorMessage: 'Insufficient balance. ₹200 more needed to complete this order.',
      availableActions: ['Add money to wallet', 'Choose another method', 'Split payment'],
      resultingState: 'disabled',
      diagram: [
        { id: 'error', label: 'Insufficient balance', type: 'error', next: 'action1' },
        { id: 'action1', label: 'Add money', type: 'action', next: 'resolution1' },
        { id: 'action2', label: 'Switch method', type: 'action', next: 'resolution2' },
        { id: 'resolution1', label: 'Balance topped up', type: 'resolution' },
        { id: 'resolution2', label: 'New method selected', type: 'resolution' }
      ]
    },
    {
      componentId: 'bankPill',
      errorType: 'bank_unavailable',
      errorMessage: 'Your bank is temporarily unavailable. Please try after some time.',
      availableActions: ['Try another bank', 'Use a different payment method', 'Retry later'],
      resultingState: 'disabled',
      diagram: [
        { id: 'error', label: 'Bank unavailable', type: 'error', next: 'action1' },
        { id: 'action1', label: 'Select other bank', type: 'action', next: 'resolution1' },
        { id: 'action2', label: 'Use card/wallet', type: 'action', next: 'resolution2' },
        { id: 'resolution1', label: 'Other bank selected', type: 'resolution' },
        { id: 'resolution2', label: 'Alternate method active', type: 'resolution' }
      ]
    },
    {
      componentId: 'savingsBar',
      errorType: 'offer_expired',
      errorMessage: 'This offer has expired. Updated savings will be shown.',
      availableActions: ['View other offers', 'Continue without offer'],
      resultingState: 'enabled',
      diagram: [
        { id: 'error', label: 'Offer expired', type: 'error', next: 'action1' },
        { id: 'action1', label: 'View other offers', type: 'action', next: 'resolution1' },
        { id: 'action2', label: 'Continue', type: 'action', next: 'resolution2' },
        { id: 'resolution1', label: 'New offer applied', type: 'resolution' },
        { id: 'resolution2', label: 'Order at full price', type: 'resolution' }
      ]
    },
    {
      componentId: 'serviceTile',
      errorType: 'eligibility_check_failed',
      errorMessage: 'Unable to verify eligibility for this service. Please try again.',
      availableActions: ['Retry check', 'Choose another service', 'Skip'],
      resultingState: 'loading',
      diagram: [
        { id: 'error', label: 'Eligibility check failed', type: 'error', next: 'action1' },
        { id: 'action1', label: 'Retry', type: 'action', next: 'resolution1' },
        { id: 'action2', label: 'Skip service', type: 'action', next: 'resolution2' },
        { id: 'resolution1', label: 'Eligibility confirmed', type: 'resolution' },
        { id: 'resolution2', label: 'Service skipped', type: 'resolution' }
      ]
    },
    {
      componentId: 'sectionHeader',
      errorType: 'section_load_error',
      errorMessage: 'Could not load payment options for this category.',
      availableActions: ['Retry', 'Expand other sections'],
      resultingState: 'enabled',
      diagram: [
        { id: 'error', label: 'Section load failed', type: 'error', next: 'action1' },
        { id: 'action1', label: 'Tap Retry', type: 'action', next: 'resolution1' },
        { id: 'action2', label: 'Use other section', type: 'action', next: 'resolution2' },
        { id: 'resolution1', label: 'Section loaded', type: 'resolution' },
        { id: 'resolution2', label: 'Other section expanded', type: 'resolution' }
      ]
    }
  ];

  // ═══════════════════════════════════════════════════════════════
  // Style injection
  // ═══════════════════════════════════════════════════════════════

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var css = [
      '/* === Edge Cases Renderer Styles === */',
      '.psp-edge-cases {',
      '  font-family: system-ui, -apple-system, sans-serif;',
      '  margin: 16px 0;',
      '}',
      '.psp-edge-cases__title {',
      '  font-size: 20px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '  margin-bottom: 8px;',
      '}',
      '.psp-edge-cases__subtitle {',
      '  font-size: 14px;',
      '  color: #555;',
      '  margin-bottom: 24px;',
      '  line-height: 1.5;',
      '}',
      '',
      '/* --- Component Edge Case Section --- */',
      '.psp-edge-cases__component {',
      '  margin-bottom: 32px;',
      '  border: 1px solid #e0e0e0;',
      '  border-radius: 10px;',
      '  overflow: hidden;',
      '  background: #fff;',
      '}',
      '.psp-edge-cases__component-header {',
      '  padding: 14px 18px;',
      '  background: #f8f9fa;',
      '  border-bottom: 1px solid #e0e0e0;',
      '  font-size: 16px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '}',
      '.psp-edge-cases__cases {',
      '  display: grid;',
      '  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));',
      '  gap: 1px;',
      '  background: #e0e0e0;',
      '}',
      '.psp-edge-cases__case {',
      '  padding: 16px 18px;',
      '  background: #fff;',
      '}',
      '.psp-edge-cases__case-label {',
      '  font-size: 11px;',
      '  font-weight: 600;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  margin-bottom: 6px;',
      '  padding: 3px 8px;',
      '  border-radius: 4px;',
      '  display: inline-block;',
      '}',
      '.psp-edge-cases__case-label--empty {',
      '  background: #fef3c7;',
      '  color: #92400e;',
      '}',
      '.psp-edge-cases__case-label--overflow {',
      '  background: #ede9fe;',
      '  color: #5b21b6;',
      '}',
      '.psp-edge-cases__case-label--loading {',
      '  background: #dbeafe;',
      '  color: #1e40af;',
      '}',
      '.psp-edge-cases__case-title {',
      '  font-size: 14px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '  margin: 8px 0 4px;',
      '}',
      '.psp-edge-cases__case-desc {',
      '  font-size: 13px;',
      '  color: #555;',
      '  line-height: 1.5;',
      '  margin-bottom: 12px;',
      '}',
      '',
      '/* --- Visual Examples --- */',
      '.psp-edge-cases__visual {',
      '  border: 1px dashed #d0d0d0;',
      '  border-radius: 6px;',
      '  padding: 12px;',
      '  background: #fafafa;',
      '  min-height: 40px;',
      '  display: flex;',
      '  align-items: center;',
      '}',
      '.psp-edge-cases__visual--empty {',
      '  justify-content: center;',
      '  color: #888;',
      '  font-style: italic;',
      '  font-size: 13px;',
      '  text-align: center;',
      '}',
      '.psp-edge-cases__visual--overflow {',
      '  overflow: hidden;',
      '}',
      '.psp-edge-cases__visual-text {',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '  font-size: 13px;',
      '  color: #1a1a1a;',
      '  font-weight: 500;',
      '}',
      '.psp-edge-cases__visual--loading {',
      '  flex-direction: column;',
      '  gap: 8px;',
      '}',
      '.psp-edge-cases__shimmer {',
      '  height: 16px;',
      '  width: 100%;',
      '  border-radius: 4px;',
      '  background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%);',
      '  background-size: 200% 100%;',
      '  animation: psp-shimmer 1.5s infinite;',
      '}',
      '@keyframes psp-shimmer {',
      '  0% { background-position: 200% 0; }',
      '  100% { background-position: -200% 0; }',
      '}',
      '',
      '/* --- Error Recovery Flows --- */',
      '.psp-edge-cases__flows-title {',
      '  font-size: 18px;',
      '  font-weight: 600;',
      '  color: #1a1a1a;',
      '  margin: 32px 0 16px;',
      '}',
      '.psp-edge-cases__flow {',
      '  margin-bottom: 24px;',
      '  border: 1px solid #e0e0e0;',
      '  border-radius: 10px;',
      '  overflow: hidden;',
      '  background: #fff;',
      '}',
      '.psp-edge-cases__flow-header {',
      '  padding: 14px 18px;',
      '  background: #fff5f5;',
      '  border-bottom: 1px solid #fecaca;',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 10px;',
      '}',
      '.psp-edge-cases__flow-icon {',
      '  width: 24px;',
      '  height: 24px;',
      '  border-radius: 50%;',
      '  background: #fee2e2;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  font-size: 12px;',
      '  color: #dc2626;',
      '  flex-shrink: 0;',
      '}',
      '.psp-edge-cases__flow-title {',
      '  font-size: 14px;',
      '  font-weight: 600;',
      '  color: #991b1b;',
      '}',
      '.psp-edge-cases__flow-component {',
      '  margin-left: auto;',
      '  font-size: 12px;',
      '  color: #666;',
      '  background: #f0f0f0;',
      '  padding: 3px 8px;',
      '  border-radius: 4px;',
      '}',
      '.psp-edge-cases__flow-body {',
      '  padding: 18px;',
      '}',
      '.psp-edge-cases__flow-message {',
      '  font-size: 13px;',
      '  color: #dc2626;',
      '  background: #fef2f2;',
      '  border: 1px solid #fecaca;',
      '  border-radius: 6px;',
      '  padding: 10px 14px;',
      '  margin-bottom: 16px;',
      '  font-weight: 500;',
      '}',
      '.psp-edge-cases__flow-actions-label {',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  color: #555;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  margin-bottom: 8px;',
      '}',
      '.psp-edge-cases__flow-actions {',
      '  display: flex;',
      '  flex-wrap: wrap;',
      '  gap: 8px;',
      '  margin-bottom: 16px;',
      '}',
      '.psp-edge-cases__flow-action {',
      '  font-size: 13px;',
      '  padding: 6px 12px;',
      '  border: 1px solid #d0d0d0;',
      '  border-radius: 6px;',
      '  background: #fff;',
      '  color: #1a1a1a;',
      '  font-weight: 500;',
      '}',
      '.psp-edge-cases__flow-result-label {',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  color: #555;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.5px;',
      '  margin-bottom: 6px;',
      '}',
      '.psp-edge-cases__flow-result {',
      '  font-size: 13px;',
      '  color: #065f46;',
      '  background: #ecfdf5;',
      '  border: 1px solid #a7f3d0;',
      '  border-radius: 6px;',
      '  padding: 8px 12px;',
      '  font-weight: 500;',
      '  margin-bottom: 16px;',
      '}',
      '',
      '/* --- Flow Diagram --- */',
      '.psp-edge-cases__diagram {',
      '  display: flex;',
      '  align-items: center;',
      '  flex-wrap: wrap;',
      '  gap: 8px;',
      '  padding: 14px;',
      '  background: #f8f9fa;',
      '  border-radius: 8px;',
      '  border: 1px solid #e8e8e8;',
      '}',
      '.psp-edge-cases__diagram-step {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 8px;',
      '}',
      '.psp-edge-cases__diagram-node {',
      '  font-size: 12px;',
      '  font-weight: 600;',
      '  padding: 6px 12px;',
      '  border-radius: 6px;',
      '  white-space: nowrap;',
      '}',
      '.psp-edge-cases__diagram-node--error {',
      '  background: #fee2e2;',
      '  color: #991b1b;',
      '  border: 1px solid #fecaca;',
      '}',
      '.psp-edge-cases__diagram-node--action {',
      '  background: #dbeafe;',
      '  color: #1e40af;',
      '  border: 1px solid #bfdbfe;',
      '}',
      '.psp-edge-cases__diagram-node--resolution {',
      '  background: #d1fae5;',
      '  color: #065f46;',
      '  border: 1px solid #a7f3d0;',
      '}',
      '.psp-edge-cases__diagram-arrow {',
      '  color: #999;',
      '  font-size: 14px;',
      '  font-weight: bold;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════════
  // Utility
  // ═══════════════════════════════════════════════════════════════

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ═══════════════════════════════════════════════════════════════
  // Visual example renderers
  // ═══════════════════════════════════════════════════════════════

  function renderVisualEmpty(visual) {
    return '<div class="psp-edge-cases__visual psp-edge-cases__visual--empty">'
      + escapeHtml(visual.placeholder)
      + '</div>';
  }

  function renderVisualOverflow(visual) {
    var maxW = visual.maxWidth || '200px';
    return '<div class="psp-edge-cases__visual psp-edge-cases__visual--overflow">'
      + '<div class="psp-edge-cases__visual-text" style="max-width:' + escapeHtml(maxW) + ';">'
      + escapeHtml(visual.text)
      + '</div>'
      + '</div>';
  }

  function renderVisualLoading(visual) {
    var count = visual.shimmerCount || 2;
    var html = '<div class="psp-edge-cases__visual psp-edge-cases__visual--loading">';
    for (var i = 0; i < count; i++) {
      var widthPercent = 100 - (i * 20);
      if (widthPercent < 40) widthPercent = 40;
      html += '<div class="psp-edge-cases__shimmer" style="width:' + widthPercent + '%;"></div>';
    }
    html += '</div>';
    return html;
  }

  function renderVisual(visual) {
    if (!visual) return '';
    switch (visual.type) {
      case 'empty': return renderVisualEmpty(visual);
      case 'overflow': return renderVisualOverflow(visual);
      case 'loading': return renderVisualLoading(visual);
      default: return '';
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Edge case section renderer
  // ═══════════════════════════════════════════════════════════════

  function renderEdgeCaseCard(caseType, caseData) {
    var labelClass = '';
    var labelText = '';
    switch (caseType) {
      case 'emptyState':
        labelClass = 'psp-edge-cases__case-label--empty';
        labelText = 'Empty State';
        break;
      case 'overflowText':
        labelClass = 'psp-edge-cases__case-label--overflow';
        labelText = 'Overflow Text';
        break;
      case 'loadingState':
        labelClass = 'psp-edge-cases__case-label--loading';
        labelText = 'Loading State';
        break;
    }

    var html = '<div class="psp-edge-cases__case" data-case-type="' + escapeHtml(caseType) + '">';
    html += '<span class="psp-edge-cases__case-label ' + labelClass + '">' + labelText + '</span>';
    html += '<div class="psp-edge-cases__case-title">' + escapeHtml(caseData.title) + '</div>';
    html += '<div class="psp-edge-cases__case-desc">' + escapeHtml(caseData.description) + '</div>';
    html += renderVisual(caseData.visual);
    html += '</div>';

    return html;
  }

  function renderComponentEdgeCases(data) {
    var html = '<div class="psp-edge-cases__component" data-component="' + escapeHtml(data.componentId) + '">';
    html += '<div class="psp-edge-cases__component-header">' + escapeHtml(data.componentName) + '</div>';
    html += '<div class="psp-edge-cases__cases">';
    html += renderEdgeCaseCard('emptyState', data.edgeCases.emptyState);
    html += renderEdgeCaseCard('overflowText', data.edgeCases.overflowText);
    html += renderEdgeCaseCard('loadingState', data.edgeCases.loadingState);
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ═══════════════════════════════════════════════════════════════
  // Error recovery flow renderer
  // ═══════════════════════════════════════════════════════════════

  function renderFlowDiagram(diagram) {
    if (!diagram || diagram.length === 0) return '';

    var html = '<div class="psp-edge-cases__diagram">';

    // Group by type for display: error → actions → resolutions
    var errors = diagram.filter(function(s) { return s.type === 'error'; });
    var actions = diagram.filter(function(s) { return s.type === 'action'; });
    var resolutions = diagram.filter(function(s) { return s.type === 'resolution'; });

    // Render error nodes
    for (var e = 0; e < errors.length; e++) {
      html += '<div class="psp-edge-cases__diagram-step">';
      html += '<div class="psp-edge-cases__diagram-node psp-edge-cases__diagram-node--error">' + escapeHtml(errors[e].label) + '</div>';
      if (actions.length > 0) {
        html += '<span class="psp-edge-cases__diagram-arrow">→</span>';
      }
      html += '</div>';
    }

    // Render action nodes
    for (var a = 0; a < actions.length; a++) {
      html += '<div class="psp-edge-cases__diagram-step">';
      html += '<div class="psp-edge-cases__diagram-node psp-edge-cases__diagram-node--action">' + escapeHtml(actions[a].label) + '</div>';
      if (a < actions.length - 1) {
        html += '<span class="psp-edge-cases__diagram-arrow">/</span>';
      } else if (resolutions.length > 0) {
        html += '<span class="psp-edge-cases__diagram-arrow">→</span>';
      }
      html += '</div>';
    }

    // Render resolution nodes
    for (var r = 0; r < resolutions.length; r++) {
      html += '<div class="psp-edge-cases__diagram-step">';
      html += '<div class="psp-edge-cases__diagram-node psp-edge-cases__diagram-node--resolution">' + escapeHtml(resolutions[r].label) + '</div>';
      if (r < resolutions.length - 1) {
        html += '<span class="psp-edge-cases__diagram-arrow">/</span>';
      }
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  function renderErrorFlow(flow) {
    var componentName = '';
    if (EDGE_CASE_DATA[flow.componentId]) {
      componentName = EDGE_CASE_DATA[flow.componentId].componentName;
    }

    var html = '<div class="psp-edge-cases__flow" data-component="' + escapeHtml(flow.componentId) + '" data-error-type="' + escapeHtml(flow.errorType) + '">';

    // Header
    html += '<div class="psp-edge-cases__flow-header">';
    html += '<span class="psp-edge-cases__flow-icon">⚠</span>';
    html += '<span class="psp-edge-cases__flow-title">' + escapeHtml(flow.errorType.replace(/_/g, ' ')) + '</span>';
    if (componentName) {
      html += '<span class="psp-edge-cases__flow-component">' + escapeHtml(componentName) + '</span>';
    }
    html += '</div>';

    // Body
    html += '<div class="psp-edge-cases__flow-body">';

    // Error message
    html += '<div class="psp-edge-cases__flow-message">' + escapeHtml(flow.errorMessage) + '</div>';

    // Available actions
    html += '<div class="psp-edge-cases__flow-actions-label">Available Actions</div>';
    html += '<div class="psp-edge-cases__flow-actions">';
    for (var i = 0; i < flow.availableActions.length; i++) {
      html += '<span class="psp-edge-cases__flow-action">' + escapeHtml(flow.availableActions[i]) + '</span>';
    }
    html += '</div>';

    // Resulting state
    html += '<div class="psp-edge-cases__flow-result-label">Resulting State</div>';
    html += '<div class="psp-edge-cases__flow-result">Component returns to: ' + escapeHtml(flow.resultingState) + '</div>';

    // Flow diagram
    html += renderFlowDiagram(flow.diagram);

    html += '</div>'; // flow-body
    html += '</div>'; // flow

    return html;
  }

  // ═══════════════════════════════════════════════════════════════
  // Public API
  // ═══════════════════════════════════════════════════════════════

  /**
   * Generate the full HTML for edge case and error recovery documentation.
   * @returns {string}
   */
  function generateHtml() {
    var html = '<div class="psp-edge-cases">';

    // Title
    html += '<h2 class="psp-edge-cases__title">Edge Cases &amp; Error Recovery</h2>';
    html += '<p class="psp-edge-cases__subtitle">Documentation of edge cases per component (empty states, overflow text, loading states) and error recovery flows showing user paths from failure to resolution.</p>';

    // Edge case sections per component
    var componentKeys = Object.keys(EDGE_CASE_DATA);
    for (var i = 0; i < componentKeys.length; i++) {
      html += renderComponentEdgeCases(EDGE_CASE_DATA[componentKeys[i]]);
    }

    // Error recovery flows
    html += '<h3 class="psp-edge-cases__flows-title">Error Recovery Flows</h3>';
    for (var j = 0; j < ERROR_RECOVERY_FLOWS.length; j++) {
      html += renderErrorFlow(ERROR_RECOVERY_FLOWS[j]);
    }

    html += '</div>';
    return html;
  }

  /**
   * Main render function.
   * Renders edge case and error recovery documentation into a container element.
   *
   * @param {HTMLElement} containerEl - DOM element to render into
   */
  function render(containerEl) {
    injectStyles();
    containerEl.innerHTML = generateHtml();
  }

  /**
   * Get the inline edge case data (for testing/inspection).
   * @returns {object}
   */
  function getEdgeCaseData() {
    return EDGE_CASE_DATA;
  }

  /**
   * Get the error recovery flow data (for testing/inspection).
   * @returns {Array}
   */
  function getErrorRecoveryFlows() {
    return ERROR_RECOVERY_FLOWS;
  }

  // Expose on namespace
  window.PSP.renderers.edgeCases = {
    render: render,
    generateHtml: generateHtml,
    getEdgeCaseData: getEdgeCaseData,
    getErrorRecoveryFlows: getErrorRecoveryFlows
  };

})();
