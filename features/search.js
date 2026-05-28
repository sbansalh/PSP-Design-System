/**
 * PSP Design System - Search Engine
 * Client-side inverted index with keyboard shortcut and modal UI.
 * Indexes section titles, component names, token names, and content keywords.
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */
(function() {
  'use strict';

  // Internal state
  var index = {};       // Inverted index: keyword -> [SearchResult]
  var allTerms = [];    // All indexed terms for suggestions
  var isOpen = false;
  var modalEl = null;
  var inputEl = null;
  var resultsEl = null;
  var debounceTimer = null;

  // Section definitions matching NAV_GROUPS order
  var SECTIONS = [
    { name: 'Overview', tabIndex: 0 },
    { name: 'Foundations', tabIndex: 1 },
    { name: 'Components', tabIndex: 2 },
    { name: 'Patterns', tabIndex: 3 },
    { name: 'States & Behavior', tabIndex: 4 },
    { name: 'Content Guidelines', tabIndex: 5 },
    { name: 'Mental Model', tabIndex: 6 },
    { name: 'Accessibility', tabIndex: 7 },
    { name: 'Decision Framework', tabIndex: 8 },
    { name: 'Developer Handoff', tabIndex: 9 },
    { name: 'Baseline CX', tabIndex: 10 }
  ];

  /**
   * Tokenize a string into lowercase searchable terms.
   * Splits on non-alphanumeric characters and filters short tokens.
   * @param {string} str
   * @returns {string[]}
   */
  function tokenize(str) {
    if (!str || typeof str !== 'string') return [];
    return str.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/[\s\-_]+/)
      .filter(function(t) { return t.length >= 2; });
  }

  /**
   * Add an entry to the inverted index.
   * @param {string} term - The keyword to index
   * @param {object} result - SearchResult object
   */
  function addToIndex(term, result) {
    var key = term.toLowerCase();
    if (key.length < 2) return;
    if (!index[key]) {
      index[key] = [];
    }
    // Avoid duplicate entries for same title+section
    var isDuplicate = index[key].some(function(existing) {
      return existing.title === result.title && existing.section === result.section;
    });
    if (!isDuplicate) {
      index[key].push(result);
    }
  }

  /**
   * Build the inverted index from all PSP data sources.
   * Indexes: section titles, component names, motion token names,
   * breakpoint names, and changelog token names.
   */
  function buildIndex() {
    index = {};
    allTerms = [];

    // 1. Index section titles
    SECTIONS.forEach(function(section) {
      var tokens = tokenize(section.name);
      var result = {
        title: section.name,
        section: section.name,
        tabIndex: section.tabIndex,
        snippet: 'Navigate to ' + section.name + ' section',
        type: 'section'
      };
      tokens.forEach(function(token) {
        addToIndex(token, result);
      });
      // Also index the full name as a term
      addToIndex(section.name.toLowerCase(), result);
    });

    // 2. Index components
    var components = (window.PSP && window.PSP.data && window.PSP.data.components) || {};
    Object.keys(components).forEach(function(key) {
      var comp = components[key];
      var result = {
        title: comp.name,
        section: 'Components',
        tabIndex: 2,
        snippet: comp.description || 'Component: ' + comp.name,
        type: 'component'
      };

      // Index component name tokens
      var nameTokens = tokenize(comp.name);
      nameTokens.forEach(function(token) {
        addToIndex(token, result);
      });
      // Index the key itself
      addToIndex(key, result);
      // Index full name
      addToIndex(comp.name.toLowerCase(), result);

      // Index description tokens
      var descTokens = tokenize(comp.description);
      descTokens.forEach(function(token) {
        addToIndex(token, result);
      });

      // Index anatomy part labels
      if (comp.anatomy && Array.isArray(comp.anatomy)) {
        comp.anatomy.forEach(function(part) {
          var partTokens = tokenize(part.label);
          partTokens.forEach(function(token) {
            addToIndex(token, result);
          });
        });
      }
    });

    // 3. Index motion tokens
    var motionTokens = (window.PSP && window.PSP.data && window.PSP.data.motionTokens) || {};
    Object.keys(motionTokens).forEach(function(key) {
      var token = motionTokens[key];
      var result = {
        title: token.name,
        section: 'Foundations',
        tabIndex: 1,
        snippet: 'Motion token: ' + token.duration + 'ms ' + token.easing + ' (' + token.category + ')',
        type: 'token'
      };

      var nameTokens = tokenize(token.name);
      nameTokens.forEach(function(t) {
        addToIndex(t, result);
      });
      addToIndex(key, result);
      // Index category
      addToIndex(token.category, result);
      // Index properties
      if (token.properties) {
        token.properties.forEach(function(prop) {
          var propTokens = tokenize(prop);
          propTokens.forEach(function(t) {
            addToIndex(t, result);
          });
        });
      }
    });

    // 4. Index breakpoints
    var breakpoints = (window.PSP && window.PSP.data && window.PSP.data.breakpoints) || {};
    Object.keys(breakpoints).forEach(function(key) {
      var bp = breakpoints[key];
      var result = {
        title: bp.name + ' Breakpoint',
        section: 'Patterns',
        tabIndex: 3,
        snippet: 'Breakpoint: ' + bp.range + ', ' + bp.columns + ' columns',
        type: 'content'
      };

      var nameTokens = tokenize(bp.name);
      nameTokens.forEach(function(t) {
        addToIndex(t, result);
      });
      addToIndex(key, result);
      addToIndex('breakpoint', result);
      addToIndex('responsive', result);
    });

    // 5. Index changelog token names
    var changelog = (window.PSP && window.PSP.data && window.PSP.data.changelog) || [];
    changelog.forEach(function(entry) {
      var result = {
        title: entry.tokenName,
        section: 'Developer Handoff',
        tabIndex: 9,
        snippet: entry.type + ' in v' + entry.version + ': ' + (entry.description || entry.newValue),
        type: 'token'
      };

      // Index token name (strip -- prefix)
      var cleanName = entry.tokenName.replace(/^--/, '');
      var nameTokens = tokenize(cleanName);
      nameTokens.forEach(function(t) {
        addToIndex(t, result);
      });
      addToIndex(cleanName, result);
    });

    // 6. Index common design system keywords mapped to sections
    var keywords = [
      { terms: ['color', 'colours', 'palette', 'theme', 'dark', 'light'], section: 'Foundations', tabIndex: 1, title: 'Color System', snippet: 'Role-based color system with light and dark themes' },
      { terms: ['typography', 'type', 'font', 'text'], section: 'Foundations', tabIndex: 1, title: 'Typography', snippet: 'Material Design 3 type scale with 15 roles' },
      { terms: ['spacing', 'padding', 'margin', 'grid'], section: 'Foundations', tabIndex: 1, title: 'Spacing Scale', snippet: '8px baseline grid spacing system' },
      { terms: ['elevation', 'shadow', 'depth'], section: 'Foundations', tabIndex: 1, title: 'Elevation System', snippet: '5 elevation levels using layered shadows' },
      { terms: ['animation', 'motion', 'transition', 'easing'], section: 'Foundations', tabIndex: 1, title: 'Motion Tokens', snippet: 'Animation specifications with easing curves and durations' },
      { terms: ['accessibility', 'aria', 'screen', 'reader', 'a11y', 'wcag'], section: 'Accessibility', tabIndex: 7, title: 'Accessibility', snippet: 'ARIA roles, keyboard navigation, and contrast requirements' },
      { terms: ['playground', 'interactive', 'preview', 'live'], section: 'Components', tabIndex: 2, title: 'Component Playground', snippet: 'Interactive component property editor with live preview' },
      { terms: ['handoff', 'developer', 'code', 'implementation'], section: 'Developer Handoff', tabIndex: 9, title: 'Developer Handoff', snippet: 'Code examples and implementation guidelines' },
      { terms: ['changelog', 'version', 'history', 'update'], section: 'Developer Handoff', tabIndex: 9, title: 'Changelog', snippet: 'Design token additions, modifications, and deprecations' }
    ];

    keywords.forEach(function(kw) {
      var result = {
        title: kw.title,
        section: kw.section,
        tabIndex: kw.tabIndex,
        snippet: kw.snippet,
        type: 'content'
      };
      kw.terms.forEach(function(term) {
        addToIndex(term, result);
      });
    });

    // Collect all unique terms for suggestions
    allTerms = Object.keys(index);
  }

  /**
   * Escape special regex characters in a string.
   * @param {string} str
   * @returns {string}
   */
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Search the index for matching results.
   * @param {string} query - User search query
   * @returns {Array<{title: string, section: string, tabIndex: number, snippet: string, type: string}>}
   */
  function search(query) {
    // Edge case: empty or non-string query
    if (!query || typeof query !== 'string') return [];

    // Edge case: truncate long queries to 100 chars
    if (query.length > 100) {
      query = query.substring(0, 100);
    }

    // Trim whitespace
    query = query.trim();

    // Edge case: empty after trim
    if (!query) return [];

    // Edge case: short query (< 2 chars)
    if (query.length < 2) return [];

    // Escape special characters and tokenize
    var cleanQuery = escapeRegex(query);
    var searchTerms = tokenize(cleanQuery);
    if (searchTerms.length === 0) {
      // If tokenize produces nothing (all special chars), try the raw query
      var rawKey = query.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (rawKey.length < 2) return [];
      searchTerms = [rawKey];
    }

    // For very long single tokens (e.g. concatenated words), try to extract
    // recognizable substrings by checking against indexed terms
    var expandedTerms = [];
    searchTerms.forEach(function(term) {
      expandedTerms.push(term);
      if (term.length > 20) {
        // Try to find indexed terms within the long token
        allTerms.forEach(function(indexedTerm) {
          if (indexedTerm.length >= 3 && term.indexOf(indexedTerm) !== -1) {
            expandedTerms.push(indexedTerm);
          }
        });
      }
    });
    searchTerms = expandedTerms;

    var resultMap = {};  // title+section -> { result, score }

    searchTerms.forEach(function(term) {
      // Exact match
      if (index[term]) {
        index[term].forEach(function(result) {
          var key = result.title + '|' + result.section;
          if (!resultMap[key]) {
            resultMap[key] = { result: result, score: 0 };
          }
          resultMap[key].score += 10;
        });
      }

      // Prefix match for partial typing
      allTerms.forEach(function(indexedTerm) {
        if (indexedTerm.indexOf(term) === 0 && indexedTerm !== term) {
          index[indexedTerm].forEach(function(result) {
            var key = result.title + '|' + result.section;
            if (!resultMap[key]) {
              resultMap[key] = { result: result, score: 0 };
            }
            resultMap[key].score += 5;
          });
        }
      });
    });

    // Sort by score descending, then alphabetically
    var results = Object.keys(resultMap).map(function(key) {
      return resultMap[key];
    });

    results.sort(function(a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.result.title.localeCompare(b.result.title);
    });

    // Return top 10 results
    return results.slice(0, 10).map(function(item) {
      return item.result;
    });
  }

  /**
   * Get suggested terms when no results are found.
   * Finds terms in the index that are similar to the query.
   * @param {string} query
   * @returns {string[]}
   */
  function getSuggestions(query) {
    if (!query || query.length < 2) return [];
    var q = query.toLowerCase();
    var suggestions = [];

    // Find terms that share at least 2 characters with the query
    allTerms.forEach(function(term) {
      if (term.length < 3) return;
      // Check if any 2-char substring of query appears in the term
      for (var i = 0; i <= q.length - 2; i++) {
        var sub = q.substring(i, i + 2);
        if (term.indexOf(sub) !== -1 && suggestions.indexOf(term) === -1) {
          suggestions.push(term);
          break;
        }
      }
    });

    // Sort by length (shorter = more likely relevant) and return top 5
    suggestions.sort(function(a, b) { return a.length - b.length; });
    return suggestions.slice(0, 5);
  }

  /**
   * Create the search modal DOM elements.
   */
  function createModal() {
    if (modalEl) return;

    modalEl = document.createElement('div');
    modalEl.className = 'psp-search-overlay';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-label', 'Search PSP Design System');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;align-items:flex-start;justify-content:center;padding-top:15vh;';

    var container = document.createElement('div');
    container.className = 'psp-search-container';
    container.style.cssText = 'background:#fff;border-radius:12px;width:90%;max-width:560px;box-shadow:0 8px 32px rgba(0,0,0,0.24);overflow:hidden;';

    // Header with input
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;padding:16px 20px;border-bottom:1px solid #e0e2ec;';

    var searchIcon = document.createElement('span');
    searchIcon.textContent = '🔍';
    searchIcon.style.cssText = 'font-size:18px;margin-right:12px;flex-shrink:0;';

    inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.placeholder = 'Search components, tokens, sections...';
    inputEl.setAttribute('aria-label', 'Search');
    inputEl.style.cssText = 'flex:1;border:none;outline:none;font-size:16px;font-family:inherit;background:transparent;color:#1a1c1e;';

    var shortcutHint = document.createElement('span');
    shortcutHint.textContent = 'ESC';
    shortcutHint.style.cssText = 'font-size:11px;color:#565959;background:#f0f0f0;padding:2px 6px;border-radius:4px;flex-shrink:0;';

    header.appendChild(searchIcon);
    header.appendChild(inputEl);
    header.appendChild(shortcutHint);

    // Results area
    resultsEl = document.createElement('div');
    resultsEl.className = 'psp-search-results';
    resultsEl.setAttribute('role', 'listbox');
    resultsEl.style.cssText = 'max-height:400px;overflow-y:auto;padding:8px;';

    container.appendChild(header);
    container.appendChild(resultsEl);
    modalEl.appendChild(container);
    document.body.appendChild(modalEl);

    // Event: close on overlay click
    modalEl.addEventListener('click', function(e) {
      if (e.target === modalEl) {
        close();
      }
    });

    // Event: input typing with debounce
    inputEl.addEventListener('input', function() {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        handleSearch();
      }, 50); // 50ms debounce, well within 150ms requirement
    });

    // Event: keyboard navigation in results
    inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateResults(e.key === 'ArrowDown' ? 1 : -1);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        selectActiveResult();
        return;
      }
    });
  }

  /**
   * Handle search input and render results.
   */
  function handleSearch() {
    var query = inputEl.value;
    var results = search(query);
    renderResults(results, query);
  }

  /**
   * Render search results in the results container.
   * @param {Array} results
   * @param {string} query
   */
  function renderResults(results, query) {
    resultsEl.innerHTML = '';

    // Don't show anything for empty/short queries
    if (!query || query.trim().length < 2) {
      resultsEl.innerHTML = '<div style="padding:24px;text-align:center;color:#565959;font-size:13px;">Type at least 2 characters to search</div>';
      return;
    }

    if (results.length === 0) {
      // No results - show message with suggestions
      var suggestions = getSuggestions(query);
      var html = '<div style="padding:24px;text-align:center;">';
      html += '<div style="font-size:14px;color:#565959;margin-bottom:8px;">No results found for "<strong>' + escapeHtml(query) + '</strong>"</div>';
      if (suggestions.length > 0) {
        html += '<div style="font-size:12px;color:#888;margin-top:12px;">Try: ';
        html += suggestions.map(function(s) {
          return '<span class="psp-search-suggestion" style="display:inline-block;background:#f0f4ff;color:#0972d3;padding:2px 8px;border-radius:4px;margin:2px;cursor:pointer;" data-term="' + escapeHtml(s) + '">' + escapeHtml(s) + '</span>';
        }).join(' ');
        html += '</div>';
      }
      html += '</div>';
      resultsEl.innerHTML = html;

      // Bind suggestion clicks
      var suggestionEls = resultsEl.querySelectorAll('.psp-search-suggestion');
      suggestionEls.forEach(function(el) {
        el.addEventListener('click', function() {
          inputEl.value = el.getAttribute('data-term');
          handleSearch();
        });
      });
      return;
    }

    // Render results
    results.forEach(function(result, idx) {
      var item = document.createElement('div');
      item.className = 'psp-search-result';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', idx);
      item.setAttribute('data-tab', result.tabIndex);
      item.style.cssText = 'padding:12px 16px;border-radius:8px;cursor:pointer;display:flex;align-items:flex-start;gap:12px;';

      var typeIcon = getTypeIcon(result.type);
      var iconEl = document.createElement('span');
      iconEl.textContent = typeIcon;
      iconEl.style.cssText = 'font-size:16px;flex-shrink:0;margin-top:2px;';

      var textEl = document.createElement('div');
      textEl.style.cssText = 'flex:1;min-width:0;';

      var titleEl = document.createElement('div');
      titleEl.style.cssText = 'font-size:14px;font-weight:500;color:#1a1c1e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      titleEl.textContent = result.title;

      var metaEl = document.createElement('div');
      metaEl.style.cssText = 'font-size:12px;color:#565959;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      metaEl.textContent = result.section + ' · ' + result.snippet;

      textEl.appendChild(titleEl);
      textEl.appendChild(metaEl);
      item.appendChild(iconEl);
      item.appendChild(textEl);

      // Hover effect
      item.addEventListener('mouseenter', function() {
        clearActiveResult();
        item.style.background = '#f0f4ff';
        item.setAttribute('aria-selected', 'true');
      });
      item.addEventListener('mouseleave', function() {
        item.style.background = '';
        item.removeAttribute('aria-selected');
      });

      // Click to navigate
      item.addEventListener('click', function() {
        navigateToResult(result);
      });

      resultsEl.appendChild(item);
    });
  }

  /**
   * Get icon for result type.
   * @param {string} type
   * @returns {string}
   */
  function getTypeIcon(type) {
    switch (type) {
      case 'section': return '📄';
      case 'component': return '🧩';
      case 'token': return '🎨';
      case 'content': return '📝';
      default: return '🔹';
    }
  }

  /**
   * Escape HTML special characters.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Navigate through results with keyboard arrows.
   * @param {number} direction - 1 for down, -1 for up
   */
  function navigateResults(direction) {
    var items = resultsEl.querySelectorAll('.psp-search-result');
    if (items.length === 0) return;

    var currentIdx = -1;
    items.forEach(function(item, i) {
      if (item.getAttribute('aria-selected') === 'true') {
        currentIdx = i;
      }
    });

    clearActiveResult();

    var newIdx = currentIdx + direction;
    if (newIdx < 0) newIdx = items.length - 1;
    if (newIdx >= items.length) newIdx = 0;

    items[newIdx].style.background = '#f0f4ff';
    items[newIdx].setAttribute('aria-selected', 'true');
    items[newIdx].scrollIntoView({ block: 'nearest' });
  }

  /**
   * Clear active/selected state from all results.
   */
  function clearActiveResult() {
    var items = resultsEl.querySelectorAll('.psp-search-result');
    items.forEach(function(item) {
      item.style.background = '';
      item.removeAttribute('aria-selected');
    });
  }

  /**
   * Select the currently active (highlighted) result.
   */
  function selectActiveResult() {
    var active = resultsEl.querySelector('.psp-search-result[aria-selected="true"]');
    if (active) {
      var tabIndex = parseInt(active.getAttribute('data-tab'), 10);
      var idx = parseInt(active.getAttribute('data-index'), 10);
      var items = resultsEl.querySelectorAll('.psp-search-result');
      // Get the result data from the rendered items
      var results = search(inputEl.value);
      if (results[idx]) {
        navigateToResult(results[idx]);
      }
    }
  }

  /**
   * Navigate to a search result: switch tab and scroll.
   * @param {object} result - SearchResult object
   */
  function navigateToResult(result) {
    close();
    // Use global switchTab function to navigate
    if (typeof switchTab === 'function') {
      switchTab(result.tabIndex);
    }
    // Scroll to top of the section after a brief delay for tab switch
    setTimeout(function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  /**
   * Open the search modal.
   */
  function open() {
    createModal();
    modalEl.style.display = 'flex';
    isOpen = true;
    inputEl.value = '';
    resultsEl.innerHTML = '<div style="padding:24px;text-align:center;color:#565959;font-size:13px;">Type at least 2 characters to search</div>';
    // Focus input after display
    setTimeout(function() {
      inputEl.focus();
    }, 50);
  }

  /**
   * Close the search modal.
   */
  function close() {
    if (modalEl) {
      modalEl.style.display = 'none';
    }
    isOpen = false;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
  }

  /**
   * Initialize the search feature.
   * Sets up keyboard shortcut (Cmd/Ctrl+K) and builds the index.
   */
  function init() {
    // Build the index from available data
    buildIndex();

    // Register keyboard shortcut: Cmd+K (Mac) / Ctrl+K (Windows)
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }
      // Also close on Escape when open
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    });
  }

  // Expose on window.PSP.features.search
  window.PSP.features.search = {
    buildIndex: buildIndex,
    search: search,
    open: open,
    close: close,
    init: init
  };

})();
