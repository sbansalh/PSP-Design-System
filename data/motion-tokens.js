/**
 * PSP Design System - Motion Tokens
 * Motion token definitions for transitions and animations.
 * 
 * Categories are auto-derived from duration:
 *   - micro: < 200ms (micro-interactions)
 *   - standard: 200-500ms (standard transitions)
 *   - complex: > 500ms (complex animations)
 */
(function() {
  'use strict';

  /**
   * Derive motion category from duration in milliseconds.
   * @param {number} duration - Duration in ms
   * @returns {'micro'|'standard'|'complex'}
   */
  function deriveCategory(duration) {
    if (duration < 200) return 'micro';
    if (duration <= 500) return 'standard';
    return 'complex';
  }

  /**
   * Create a motion token with auto-derived category.
   * @param {object} spec - Token specification without category
   * @returns {object} Complete motion token with category
   */
  function createToken(spec) {
    return {
      name: spec.name,
      duration: spec.duration,
      easing: spec.easing,
      properties: spec.properties,
      category: deriveCategory(spec.duration)
    };
  }

  var tokens = {
    selection: createToken({
      name: 'Selection Transition',
      duration: 200,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      properties: ['background-color', 'border-color', 'box-shadow']
    }),

    expansion: createToken({
      name: 'Expansion Animation',
      duration: 300,
      easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      properties: ['height', 'opacity', 'padding']
    }),

    navigation: createToken({
      name: 'Navigation Transition',
      duration: 250,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['transform', 'opacity']
    }),

    fadeIn: createToken({
      name: 'Fade In',
      duration: 150,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      properties: ['opacity']
    }),

    slideUp: createToken({
      name: 'Slide Up',
      duration: 350,
      easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      properties: ['transform', 'opacity']
    }),

    collapse: createToken({
      name: 'Collapse',
      duration: 250,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['height', 'opacity', 'margin']
    }),

    ripple: createToken({
      name: 'Ripple Effect',
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['transform', 'opacity']
    }),

    stateChange: createToken({
      name: 'State Change',
      duration: 100,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['background-color', 'border-color', 'color']
    }),

    toast: createToken({
      name: 'Toast Notification',
      duration: 300,
      easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      properties: ['transform', 'opacity']
    }),

    skeleton: createToken({
      name: 'Skeleton Shimmer',
      duration: 1500,
      easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
      properties: ['background-position']
    })
  };

  // Expose on global namespace
  window.PSP.data.motionTokens = tokens;

  // Also expose the helper for external use/testing
  window.PSP.data.deriveMotionCategory = deriveCategory;
})();
