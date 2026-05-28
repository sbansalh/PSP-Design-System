/**
 * PSP Design System - Clipboard Utilities
 * Copy-to-clipboard with fallback and toast notifications.
 * Requirements: 1.4, 4.4, 11.4
 */
(function() {
  'use strict';

  /**
   * Fallback copy method using execCommand for older browsers.
   * Creates a temporary textarea, selects its content, and executes copy.
   * @param {string} text - The text to copy
   * @returns {boolean} Whether the copy succeeded
   */
  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    // Prevent scrolling to bottom
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '1px';
    textarea.style.height = '1px';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    var success = false;
    try {
      success = document.execCommand('copy');
    } catch (e) {
      success = false;
    }
    document.body.removeChild(textarea);
    return success;
  }

  /**
   * Copy text to clipboard using navigator.clipboard.writeText as primary method,
   * falling back to document.execCommand('copy') with a temporary textarea.
   * Shows a toast notification on success or failure.
   * @param {string} text - The text to copy to clipboard
   * @returns {Promise} Resolves on success, rejects on failure
   */
  function copy(text) {
    // Use navigator.clipboard.writeText if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function() {
        if (typeof toast === 'function') {
          toast('Copied!');
        }
      }).catch(function(err) {
        // Try fallback on clipboard API failure
        if (fallbackCopy(text)) {
          if (typeof toast === 'function') {
            toast('Copied!');
          }
          return;
        }
        if (typeof toast === 'function') {
          toast('Copy failed');
        }
        return Promise.reject(err);
      });
    }

    // Fallback for browsers without clipboard API
    return new Promise(function(resolve, reject) {
      if (fallbackCopy(text)) {
        if (typeof toast === 'function') {
          toast('Copied!');
        }
        resolve();
      } else {
        if (typeof toast === 'function') {
          toast('Copy failed');
        }
        reject(new Error('Copy failed'));
      }
    });
  }

  window.PSP.features.clipboard = {
    copy: copy
  };
})();
