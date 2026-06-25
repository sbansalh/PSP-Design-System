/**
 * PSP Design System - Component Registry
 * Central data store for all component metadata.
 * Each component entry contains anatomy parts, interaction states,
 * accessibility info, and playground configuration.
 */
(function() {
  'use strict';

  window.PSP.data.components = {
    instrumentTile: {
      name: 'Instrument Tile',
      description: 'Payment method selection tile with radio button on right, instrument icon on left, name/details/offer in center',
      figmaNodeId: '410:45521',
      figmaFileKey: 'N6ojbzlM3tRsXj5X4cJkkX',
      anatomy: [
        { id: 'badge', label: 'Offer/Status Badge', token: '--psp-badge-radius: 13px; positioned above icon', x: 72, y: 0 },
        { id: 'radio', label: 'Radio Button', token: '--psp-radio-size: 20px; right-aligned, vertically centered', x: 320, y: 28 },
        { id: 'icon', label: 'Instrument Icon', token: '--psp-icon-size: 48x32px; border-radius: 4px', x: 16, y: 20 },
        { id: 'name', label: 'Instrument Name', token: '--type-body-large; font-weight: 500; line 1', x: 72, y: 20 },
        { id: 'details', label: 'Card Details (Network ••last4 | Holder)', token: '--type-body-small; --color-text-secondary; line 2', x: 72, y: 36 },
        { id: 'offer', label: 'Offer/Savings Text', token: '--color-success; --type-body-small; line 3', x: 72, y: 52 },
        { id: 'detailsLink', label: 'Details Link (inline after offer)', token: '--color-link; --type-body-small; inline on line 3', x: 220, y: 52 }
      ],
      badgeVariants: {
        bestOffer: { label: 'Best offer', bg: '#0A7CD1', color: '#FFFFFF' },
        previouslyUsed: { label: 'Previously used', bg: '#E3E6E6', color: '#232F3E' },
        featured: { label: 'Featured', bg: '#E3E6E6', color: '#232F3E' }
      },
      offerTextRules: {
        description: 'Offer text on Line 3 changes format based on savings type',
        cashback: { format: 'Save ₹{amount} as cashback. Details', example: 'Save ₹10 as cashback. Details' },
        discount: { format: 'Save ₹{amount}. Details', example: 'Save ₹6. Details' },
        noOffer: { format: null, example: '(Line 3 hidden when no offer available)' }
      },
      states: {
        enabled: { bg: '#FFFFFF', border: '1px solid #D5D9D9', opacity: 1 },
        disabled: { bg: '#FFFFFF', border: '1px solid #D5D9D9', opacity: 0.6, reason: 'Card expired' },
        hovered: { bg: '#F7FAFA', border: '1px solid #D5D9D9', opacity: 1 },
        focused: { bg: '#FFFFFF', border: '2px solid #0972d3', opacity: 1, outline: '2px solid #0972d3' },
        pressed: { bg: '#EDF8FF', border: '2px solid #007185', opacity: 1 },
        dragged: null
      },
      a11y: {
        role: 'radio',
        ariaLabel: '{instrumentName}, {cardDetails}',
        stateAnnouncements: {
          selected: '{instrumentName} selected',
          disabled: '{instrumentName}, not available, {reason}'
        },
        keyboardNav: { select: 'Space/Enter', navigate: 'Arrow Up/Down' },
        minTouchTarget: '44x44px',
        contrastRatio: '4.5:1'
      },
      playground: {
        defaults: { name: 'Amazon Pay ICICI credit card', details: 'VISA \u2022\u20220424 | Akshay', badge: 'Best offer', offer: 'Save \u20B910 as cashback.', detailsLink: 'Details', icon: 'cbcc', state: 'enabled' },
        controls: ['name', 'details', 'badge', 'offer', 'detailsLink', 'icon', 'state'],
        notes: 'Icon is on the LEFT (40x40px), Radio is on the RIGHT. Offer text format depends on savings type — see offerTextRules.'
      }
    },

    sectionHeader: {
      name: 'Section Header',
      description: 'Uppercase section divider label for payment method categories',
      figmaNodeId: '410:45521',
      figmaFileKey: 'N6ojbzlM3tRsXj5X4cJkkX',
      anatomy: [
        { id: 'label', label: 'Section Label', token: '--type-overline', x: 16, y: 8 },
        { id: 'divider', label: 'Bottom Divider', token: '--color-border-subtle', x: 0, y: 32 },
        { id: 'count', label: 'Item Count', token: '--type-caption', x: 280, y: 8 }
      ],
      states: {
        enabled: { bg: 'transparent', border: 'none', opacity: 1 },
        disabled: null,
        hovered: null,
        focused: { bg: 'transparent', border: 'none', opacity: 1, outline: '2px solid #0972d3' },
        pressed: null,
        dragged: null
      },
      a11y: {
        role: 'heading',
        ariaLabel: '{sectionName} section, {itemCount} options',
        stateAnnouncements: {
          expanded: '{sectionName} expanded',
          collapsed: '{sectionName} collapsed'
        },
        keyboardNav: { navigate: 'Tab', toggle: 'Space/Enter' },
        minTouchTarget: '44x44px',
        contrastRatio: '4.5:1'
      },
      playground: {
        defaults: { label: 'CREDIT & DEBIT CARDS', count: '3', state: 'enabled' },
        controls: ['label', 'count', 'state']
      }
    },

    badge: {
      name: 'Badge',
      description: 'Small label indicating offers, status, or promotions on payment instruments',
      figmaNodeId: '410:45521',
      figmaFileKey: 'N6ojbzlM3tRsXj5X4cJkkX',
      anatomy: [
        { id: 'container', label: 'Badge Container', token: '--psp-badge-radius: 4px', x: 0, y: 0 },
        { id: 'label', label: 'Badge Label', token: '--type-caption-bold', x: 8, y: 4 },
        { id: 'icon', label: 'Badge Icon (optional)', token: '--psp-badge-icon-size: 12px', x: 4, y: 4 }
      ],
      states: {
        enabled: { bg: '#E6F2FF', border: 'none', opacity: 1 },
        disabled: { bg: '#F0F0F0', border: 'none', opacity: 0.6, reason: 'Parent instrument disabled' },
        hovered: { bg: '#CCE5FF', border: 'none', opacity: 1 },
        focused: { bg: '#E6F2FF', border: 'none', opacity: 1, outline: '2px solid #0972d3' },
        pressed: { bg: '#B8D9FF', border: 'none', opacity: 1 },
        dragged: null
      },
      a11y: {
        role: 'status',
        ariaLabel: '{badgeText}',
        stateAnnouncements: {
          visible: '{badgeText} badge',
          hidden: 'Badge removed'
        },
        keyboardNav: { navigate: 'Tab (within parent)' },
        minTouchTarget: '44x44px',
        contrastRatio: '4.5:1'
      },
      playground: {
        defaults: { label: 'Best offer', variant: 'blue', state: 'enabled' },
        controls: ['label', 'variant', 'state']
      }
    },

    ctaBar: {
      name: 'CTA Bar',
      description: 'Bottom sticky call-to-action bar with savings summary, total price, and primary action button',
      figmaNodeId: '410:45521',
      figmaFileKey: 'N6ojbzlM3tRsXj5X4cJkkX',
      anatomy: [
        { id: 'container', label: 'Sticky Container', token: '--psp-cta-bar-height: 64px', x: 0, y: 0 },
        { id: 'savings', label: 'Savings Text', token: '--color-success', x: 16, y: 12 },
        { id: 'price', label: 'Total Price', token: '--type-heading-medium', x: 16, y: 34 },
        { id: 'button', label: 'Primary CTA Button', token: '--psp-cta-button-radius: 8px', x: 240, y: 12 },
        { id: 'buttonLabel', label: 'Button Label', token: '--type-button-label', x: 260, y: 22 },
        { id: 'divider', label: 'Top Divider', token: '--color-border-subtle', x: 0, y: 0 }
      ],
      states: {
        enabled: { bg: '#FFFFFF', border: '1px solid #D5D9D9', opacity: 1 },
        disabled: { bg: '#FFFFFF', border: '1px solid #D5D9D9', opacity: 0.6, reason: 'No instrument selected' },
        hovered: { bg: '#FFFFFF', border: '1px solid #D5D9D9', opacity: 1 },
        focused: { bg: '#FFFFFF', border: '2px solid #0972d3', opacity: 1, outline: '2px solid #0972d3' },
        pressed: { bg: '#F0F0F0', border: '1px solid #D5D9D9', opacity: 1 },
        dragged: null
      },
      a11y: {
        role: 'region',
        ariaLabel: 'Payment summary and checkout action',
        stateAnnouncements: {
          updated: 'Total updated to {price}, savings {savings}',
          disabled: 'Checkout unavailable, select a payment method'
        },
        keyboardNav: { focusButton: 'Tab', activate: 'Space/Enter' },
        minTouchTarget: '44x44px',
        contrastRatio: '4.5:1'
      },
      playground: {
        defaults: { savings: 'You save ₹10', price: '₹499', buttonLabel: 'Place Order', state: 'enabled' },
        controls: ['savings', 'price', 'buttonLabel', 'state']
      }
    },

    savingsBar: {
      name: 'Savings Bar',
      description: 'Green promotional bar displayed above the CTA showing total savings on selected instrument',
      figmaNodeId: '410:45521',
      figmaFileKey: 'N6ojbzlM3tRsXj5X4cJkkX',
      anatomy: [
        { id: 'container', label: 'Bar Container', token: '--psp-savings-bar-bg: #E7F7E9', x: 0, y: 0 },
        { id: 'icon', label: 'Savings Icon', token: '--psp-savings-icon-size: 16px', x: 12, y: 8 },
        { id: 'text', label: 'Savings Message', token: '--type-body-small', x: 34, y: 8 },
        { id: 'amount', label: 'Savings Amount', token: '--type-body-small-bold', x: 200, y: 8 }
      ],
      states: {
        enabled: { bg: '#E7F7E9', border: 'none', opacity: 1 },
        disabled: null,
        hovered: { bg: '#D4F0D7', border: 'none', opacity: 1 },
        focused: { bg: '#E7F7E9', border: 'none', opacity: 1, outline: '2px solid #0972d3' },
        pressed: null,
        dragged: null
      },
      a11y: {
        role: 'status',
        ariaLabel: 'Savings: {savingsMessage}',
        stateAnnouncements: {
          visible: 'You save {amount} on this order',
          updated: 'Savings updated to {amount}'
        },
        keyboardNav: { navigate: 'Not focusable (informational)' },
        minTouchTarget: '44x44px',
        contrastRatio: '4.5:1'
      },
      playground: {
        defaults: { text: 'You save', amount: '₹10', state: 'enabled' },
        controls: ['text', 'amount', 'state']
      }
    },

    bankPill: {
      name: 'Bank Pill',
      description: 'Compact pill-shaped element showing bank logo and last 4 digits for UPI linked accounts',
      figmaNodeId: '410:45521',
      figmaFileKey: 'N6ojbzlM3tRsXj5X4cJkkX',
      anatomy: [
        { id: 'container', label: 'Pill Container', token: '--psp-pill-radius: 16px', x: 0, y: 0 },
        { id: 'bankLogo', label: 'Bank Logo', token: '--psp-bank-logo-size: 20px', x: 8, y: 6 },
        { id: 'accountDigits', label: 'Last 4 Digits', token: '--type-body-small', x: 34, y: 8 },
        { id: 'separator', label: 'Dot Separator', token: '--color-text-secondary', x: 28, y: 8 }
      ],
      states: {
        enabled: { bg: '#F0F0F0', border: '1px solid #D5D9D9', opacity: 1 },
        disabled: { bg: '#F0F0F0', border: '1px solid #D5D9D9', opacity: 0.6, reason: 'Account unavailable' },
        hovered: { bg: '#E8E8E8', border: '1px solid #D5D9D9', opacity: 1 },
        focused: { bg: '#F0F0F0', border: '2px solid #0972d3', opacity: 1, outline: '2px solid #0972d3' },
        pressed: { bg: '#DCDCDC', border: '2px solid #007185', opacity: 1 },
        dragged: null
      },
      a11y: {
        role: 'radio',
        ariaLabel: '{bankName} account ending {lastFourDigits}',
        stateAnnouncements: {
          selected: '{bankName} account ending {lastFourDigits} selected',
          disabled: '{bankName} account ending {lastFourDigits}, not available, {reason}'
        },
        keyboardNav: { select: 'Space/Enter', navigate: 'Arrow Left/Right' },
        minTouchTarget: '44x44px',
        contrastRatio: '4.5:1'
      },
      playground: {
        defaults: { bankName: 'HDFC', lastFourDigits: '1234', state: 'enabled' },
        controls: ['bankName', 'lastFourDigits', 'state']
      }
    },

    serviceTile: {
      name: 'Service Tile',
      description: 'Service & Pay variant tile with circular icon, service name, and inline CTA with chevron',
      figmaNodeId: '410:45521',
      figmaFileKey: 'N6ojbzlM3tRsXj5X4cJkkX',
      anatomy: [
        { id: 'icon', label: 'Circular Service Icon', token: '--psp-service-icon-size: 40px', x: 16, y: 12 },
        { id: 'name', label: 'Service Name', token: '--type-body-large', x: 72, y: 14 },
        { id: 'description', label: 'Service Description', token: '--type-body-small', x: 72, y: 34 },
        { id: 'cta', label: 'Inline CTA Text', token: '--color-link', x: 72, y: 52 },
        { id: 'chevron', label: 'Chevron Icon', token: '--psp-chevron-size: 16px', x: 320, y: 24 }
      ],
      states: {
        enabled: { bg: '#FFFFFF', border: '1px solid #D5D9D9', opacity: 1 },
        disabled: { bg: '#FFFFFF', border: '1px solid #D5D9D9', opacity: 0.6, reason: 'Service unavailable' },
        hovered: { bg: '#F7FAFA', border: '1px solid #D5D9D9', opacity: 1 },
        focused: { bg: '#FFFFFF', border: '2px solid #0972d3', opacity: 1, outline: '2px solid #0972d3' },
        pressed: { bg: '#EDF8FF', border: '2px solid #007185', opacity: 1 },
        dragged: null
      },
      a11y: {
        role: 'link',
        ariaLabel: '{serviceName}, {serviceDescription}',
        stateAnnouncements: {
          activated: 'Navigating to {serviceName}',
          disabled: '{serviceName}, not available, {reason}'
        },
        keyboardNav: { activate: 'Space/Enter', navigate: 'Tab' },
        minTouchTarget: '44x44px',
        contrastRatio: '4.5:1'
      },
      playground: {
        defaults: { name: 'Pay Later', description: 'EMI starting ₹167/mo', cta: 'View options', state: 'enabled' },
        controls: ['name', 'description', 'cta', 'state']
      }
    }
  };
})();
