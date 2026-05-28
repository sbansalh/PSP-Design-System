/**
 * PSP Design System - Changelog Data
 * Token changelog entries in reverse chronological order (newest first).
 * Each entry: version, date (ISO), type, tokenName, previousValue (for modifications), newValue, description.
 */
(function() {
  'use strict';

  window.PSP.data.changelog = [
    // v2.0.0 entries — Card variants, motion tokens, dark mode colors
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--elevation-2',
      newValue: '0 2px 8px rgba(0,0,0,0.12)',
      description: 'Added elevation level 2 shadow token for card--elevated variant.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--psp-service-icon-size',
      newValue: '40px',
      description: 'Added service tile circular icon size token for Service & Pay variant.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--psp-cta-button-radius',
      newValue: '8px',
      description: 'Added dedicated border-radius token for CTA bar primary button.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--motion-duration-selection',
      newValue: '200ms',
      description: 'Added motion token for instrument tile selection transition duration.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--motion-easing-standard',
      newValue: 'cubic-bezier(0.2, 0, 0, 1)',
      description: 'Added standard easing curve token for selection and expansion transitions.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--motion-duration-expansion',
      newValue: '300ms',
      description: 'Added motion token for section expansion animation duration.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--motion-easing-decelerate',
      newValue: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      description: 'Added decelerate easing curve for expansion and slide-up animations.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--color-surface-dark',
      newValue: '#1A1A2E',
      description: 'Added dark mode surface color for primary backgrounds.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--color-on-surface-dark',
      newValue: '#E8E8E8',
      description: 'Added dark mode foreground text color for surface backgrounds.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'addition',
      tokenName: '--color-primary-dark',
      newValue: '#58A6FF',
      description: 'Added dark mode primary accent color for interactive elements.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'modification',
      tokenName: '--psp-badge-radius',
      previousValue: '2px',
      newValue: '4px',
      description: 'Increased badge corner radius for softer appearance aligned with updated brand guidelines.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'modification',
      tokenName: '--color-surface-variant',
      previousValue: '#F5F5F5',
      newValue: '#F7F7F7',
      description: 'Lightened surface variant for improved contrast with card--filled backgrounds.'
    },
    {
      version: '2.0.0',
      date: '2024-12-01',
      type: 'deprecation',
      tokenName: '--psp-card-shadow',
      newValue: 'Use --elevation-2 instead',
      description: 'Deprecated in favor of the new elevation token system. Will be removed in v3.0.0.'
    },

    // v1.4.0 entries
    {
      version: '1.4.0',
      date: '2024-09-15',
      type: 'addition',
      tokenName: '--psp-savings-bar-bg',
      newValue: '#E7F7E9',
      description: 'Added dedicated background color token for savings bar component.'
    },
    {
      version: '1.4.0',
      date: '2024-09-15',
      type: 'modification',
      tokenName: '--psp-icon-size',
      previousValue: '48x32px',
      newValue: '54x36px',
      description: 'Increased instrument icon size for better visual hierarchy and legibility.'
    },
    {
      version: '1.4.0',
      date: '2024-09-15',
      type: 'addition',
      tokenName: '--psp-pill-radius',
      newValue: '16px',
      description: 'Added pill-shaped border radius token for bank pill component.'
    },

    // v1.3.0 entries
    {
      version: '1.3.0',
      date: '2024-07-01',
      type: 'addition',
      tokenName: '--color-link',
      newValue: '#0066C0',
      description: 'Added link color token for inline CTA text in service tiles.'
    },
    {
      version: '1.3.0',
      date: '2024-07-01',
      type: 'modification',
      tokenName: '--psp-radio-size',
      previousValue: '16px',
      newValue: '20px',
      description: 'Increased radio button size to meet 44x44px touch target with padding.'
    },

    // v1.2.0 entries
    {
      version: '1.2.0',
      date: '2024-04-20',
      type: 'addition',
      tokenName: '--psp-badge-blue',
      newValue: '#E6F2FF',
      description: 'Added blue badge background token for offer badges on instrument tiles.'
    },
    {
      version: '1.2.0',
      date: '2024-04-20',
      type: 'modification',
      tokenName: '--color-success',
      previousValue: '#067D62',
      newValue: '#1D8102',
      description: 'Updated success green to Amazon standard green for better brand alignment.'
    },
    {
      version: '1.2.0',
      date: '2024-04-20',
      type: 'deprecation',
      tokenName: '--psp-offer-green',
      newValue: 'Use --color-success instead',
      description: 'Consolidated offer text color into the standard success color token.'
    },

    // v1.1.0 entries
    {
      version: '1.1.0',
      date: '2024-02-10',
      type: 'addition',
      tokenName: '--psp-cta-bar-height',
      newValue: '64px',
      description: 'Added fixed height token for CTA bar sticky container.'
    },
    {
      version: '1.1.0',
      date: '2024-02-10',
      type: 'addition',
      tokenName: '--color-border-subtle',
      newValue: '#D5D9D9',
      description: 'Added subtle border color token used across instrument tiles and section dividers.'
    },

    // v1.0.0 entries
    {
      version: '1.0.0',
      date: '2024-01-05',
      type: 'addition',
      tokenName: '--psp-radio-size',
      newValue: '16px',
      description: 'Initial radio button size token for instrument tile selection indicator.'
    },
    {
      version: '1.0.0',
      date: '2024-01-05',
      type: 'addition',
      tokenName: '--psp-icon-size',
      newValue: '48x32px',
      description: 'Initial instrument icon dimensions token.'
    },
    {
      version: '1.0.0',
      date: '2024-01-05',
      type: 'addition',
      tokenName: '--psp-badge-icon-size',
      newValue: '12px',
      description: 'Initial badge icon size for optional leading icon in badge component.'
    }
  ];
})();
