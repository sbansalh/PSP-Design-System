/**
 * PSP Design System - Breakpoint Specifications
 * Responsive breakpoint definitions and component size adjustments.
 * Defines 4 breakpoints: mobile, tablet, desktop, largeDesktop.
 */
(function() {
  'use strict';

  window.PSP.data.breakpoints = {
    mobile: {
      name: 'Mobile',
      range: '< 600px',
      columns: 4,
      spacing: '--spacing-compact-sm',
      componentSizes: {
        instrumentTile: 'Full width, icon scaled to 44x30px, single-line details truncated',
        ctaBar: 'Full width sticky, button min-width 120px, stacked layout below 360px',
        badge: 'Max-width 80px, text truncated with ellipsis',
        sectionHeader: 'Full width, count hidden below 320px',
        savingsBar: 'Full width, icon + text single line, amount right-aligned',
        bankPill: 'Min-width 100px, horizontal scroll within container',
        serviceTile: 'Full width, description limited to 1 line'
      }
    },

    tablet: {
      name: 'Tablet',
      range: '600px – 900px',
      columns: 8,
      spacing: '--spacing-standard-md',
      componentSizes: {
        instrumentTile: 'Full width within content column, icon at default 54x36px',
        ctaBar: 'Full width sticky, button min-width 160px, inline layout',
        badge: 'Max-width 120px, full text visible',
        sectionHeader: 'Full width, count always visible',
        savingsBar: 'Full width, standard padding',
        bankPill: 'Min-width 120px, wrap to second row if needed',
        serviceTile: 'Full width, description up to 2 lines'
      }
    },

    desktop: {
      name: 'Desktop',
      range: '900px – 1400px',
      columns: 12,
      spacing: '--spacing-standard-lg',
      componentSizes: {
        instrumentTile: 'Max-width 560px, centered in content area',
        ctaBar: 'Max-width 560px, centered, button min-width 200px',
        badge: 'Default size, no truncation',
        sectionHeader: 'Max-width 560px, centered',
        savingsBar: 'Max-width 560px, centered',
        bankPill: 'Default size 140px, inline row',
        serviceTile: 'Max-width 560px, full description visible'
      }
    },

    largeDesktop: {
      name: 'Large Desktop',
      range: '> 1400px',
      columns: 12,
      spacing: '--spacing-comfortable-lg',
      componentSizes: {
        instrumentTile: 'Max-width 640px, increased padding 20px, centered',
        ctaBar: 'Max-width 640px, centered, button min-width 240px',
        badge: 'Default size with comfortable spacing',
        sectionHeader: 'Max-width 640px, centered, increased bottom margin',
        savingsBar: 'Max-width 640px, centered, increased vertical padding',
        bankPill: 'Default size 140px, comfortable 12px gap between pills',
        serviceTile: 'Max-width 640px, increased icon size 48px'
      }
    }
  };
})();
