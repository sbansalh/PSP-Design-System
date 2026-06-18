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

/**
 * PSP Design System - Syntax Highlighter
 * Lightweight regex-based syntax highlighting for 4 languages.
 * Requirements: 11.5
 */
(function() {
  'use strict';

  /**
   * Escape HTML special characters to prevent XSS and rendering issues.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Wrap matched text in a span with the given class.
   * @param {string} text
   * @param {string} cls - CSS class suffix (e.g., 'keyword', 'string')
   * @returns {string}
   */
  function wrap(text, cls) {
    return '<span class="psp-hl-' + cls + '">' + text + '</span>';
  }

  /**
   * Tokenize and highlight HTML/CSS code.
   * @param {string} code - Raw code string
   * @returns {string} HTML with highlight spans
   */
  function highlightHtml(code) {
    var escaped = escapeHtml(code);
    // Comments: <!-- ... -->
    escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, function(m) {
      return wrap(m, 'comment');
    });
    // Strings in attributes: "..." or '...'
    escaped = escaped.replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;)/g, function(m) {
      return wrap(m, 'string');
    });
    // HTML tags: <tagname and </tagname and />
    escaped = escaped.replace(/(&lt;\/?)([\w\-\.]+)/g, function(m, bracket, tag) {
      return wrap(bracket, 'tag') + wrap(tag, 'tag');
    });
    // Closing bracket
    escaped = escaped.replace(/(\/?&gt;)/g, function(m) {
      return wrap(m, 'tag');
    });
    // Attributes: word= (before strings)
    escaped = escaped.replace(/\b([\w\-]+)(=)/g, function(m, attr, eq) {
      return wrap(attr, 'attr') + eq;
    });
    // CSS properties inside style blocks
    escaped = escaped.replace(/\b([\w\-]+)\s*:/g, function(m, prop) {
      if (/^(display|flex|align|justify|padding|margin|background|border|border-radius|cursor|min-height|width|height|font|color|position|bottom|left|right|top|opacity|gap|text-transform|letter-spacing|white-space|outline|box-shadow|grid)/.test(prop)) {
        return wrap(prop, 'attr') + ':';
      }
      return m;
    });
    // CSS selectors (class names)
    escaped = escaped.replace(/(\.[\w\-]+[\w\-\[\]="]*)/g, function(m) {
      return wrap(m, 'keyword');
    });
    return escaped;
  }

  /**
   * Tokenize and highlight JSX (React Native) code.
   * @param {string} code
   * @returns {string}
   */
  function highlightJsx(code) {
    var escaped = escapeHtml(code);
    // Single-line comments
    escaped = escaped.replace(/(\/\/[^\n]*)/g, function(m) {
      return wrap(m, 'comment');
    });
    // Multi-line comments
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, function(m) {
      return wrap(m, 'comment');
    });
    // Strings: "..." or '...'
    escaped = escaped.replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;)/g, function(m) {
      return wrap(m, 'string');
    });
    // Template literals with backticks (escaped as `)
    escaped = escaped.replace(/(`[^`]*?`)/g, function(m) {
      return wrap(m, 'string');
    });
    // Keywords
    escaped = escaped.replace(/\b(import|from|export|default|const|let|var|function|return|if|else|new|this|true|false|null|undefined|typeof|switch|case|break|class|extends)\b/g, function(m) {
      return wrap(m, 'keyword');
    });
    // JSX component tags: <ComponentName or </ComponentName
    escaped = escaped.replace(/(&lt;\/?)([\w\.]+)/g, function(m, bracket, tag) {
      return wrap(bracket, 'tag') + wrap(tag, 'tag');
    });
    escaped = escaped.replace(/(\/?&gt;)/g, function(m) {
      return wrap(m, 'tag');
    });
    // Props/attributes
    escaped = escaped.replace(/\b(style|onPress|accessibilityRole|accessibilityState|accessibilityLabel|source)\b(?=\s*[=:{])/g, function(m) {
      return wrap(m, 'attr');
    });
    // Numbers
    escaped = escaped.replace(/\b(\d+\.?\d*)\b/g, function(m) {
      return wrap(m, 'number');
    });
    return escaped;
  }

  /**
   * Tokenize and highlight Android XML code.
   * @param {string} code
   * @returns {string}
   */
  function highlightXml(code) {
    var escaped = escapeHtml(code);
    // XML comments: <!-- ... -->
    escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, function(m) {
      return wrap(m, 'comment');
    });
    // Strings: "..."
    escaped = escaped.replace(/(&quot;[^&]*?&quot;)/g, function(m) {
      return wrap(m, 'string');
    });
    // XML tags: <tagname or </tagname
    escaped = escaped.replace(/(&lt;\/?)([\w\.\:]+)/g, function(m, bracket, tag) {
      return wrap(bracket, 'tag') + wrap(tag, 'tag');
    });
    escaped = escaped.replace(/(\/?&gt;)/g, function(m) {
      return wrap(m, 'tag');
    });
    // Android namespace attributes: android:xxx or app:xxx
    escaped = escaped.replace(/\b(android|app)(:([\w]+))/g, function(m, ns, colonAndAttr, attr) {
      return wrap(ns, 'keyword') + ':' + wrap(attr, 'attr');
    });
    return escaped;
  }

  /**
   * Tokenize and highlight Swift/SwiftUI code.
   * @param {string} code
   * @returns {string}
   */
  function highlightSwift(code) {
    var escaped = escapeHtml(code);
    // Single-line comments
    escaped = escaped.replace(/(\/\/[^\n]*)/g, function(m) {
      return wrap(m, 'comment');
    });
    // Multi-line comments
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, function(m) {
      return wrap(m, 'comment');
    });
    // Strings: "..."
    escaped = escaped.replace(/(&quot;[^&]*?&quot;)/g, function(m) {
      return wrap(m, 'string');
    });
    // Keywords
    escaped = escaped.replace(/\b(import|struct|var|let|func|private|return|if|else|switch|case|some|true|false|nil|self|enum|protocol|class|static|mutating|guard|where)\b/g, function(m) {
      return wrap(m, 'keyword');
    });
    // Type names (capitalized words commonly used in SwiftUI)
    escaped = escaped.replace(/\b(View|String|Int|Bool|CGFloat|Color|Image|Text|Button|HStack|VStack|ZStack|Spacer|Divider|Circle|RoundedRectangle|Binding|CGSize|StyleSheet|Font)\b/g, function(m) {
      return wrap(m, 'tag');
    });
    // Dot-accessed modifiers: .modifier(
    escaped = escaped.replace(/\.([\w]+)\(/g, function(m, mod) {
      return '.' + wrap(mod, 'attr') + '(';
    });
    // Numbers
    escaped = escaped.replace(/\b(\d+\.?\d*)\b/g, function(m) {
      return wrap(m, 'number');
    });
    return escaped;
  }

  /**
   * Apply syntax highlighting to code string.
   * @param {string} code - Raw code to highlight
   * @param {string} language - 'html'|'jsx'|'xml'|'swift'
   * @returns {string} HTML string with <span> elements having psp-hl-* classes
   */
  function highlight(code, language) {
    if (!code) return '';
    switch (language) {
      case 'html': return highlightHtml(code);
      case 'jsx': return highlightJsx(code);
      case 'xml': return highlightXml(code);
      case 'swift': return highlightSwift(code);
      default: return escapeHtml(code);
    }
  }

  window.PSP.features.highlight = {
    highlight: highlight
  };
})();
