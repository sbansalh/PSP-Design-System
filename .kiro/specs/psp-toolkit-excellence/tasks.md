# Implementation Plan: PSP Toolkit Excellence

## Overview

Elevate the PSP Design System toolkit from its current single-file architecture (index.html + app.js) to a modular, world-class documentation site. Implementation follows 5 phases: visual polish, motion/interaction, interactive features, content depth, and developer experience. All code is vanilla HTML/CSS/JS with no build tools, using a global `window.PSP` namespace and `<script>` tag loading.

## Tasks

- [x] 1. Project Structure and Core Infrastructure
  - [x] 1.1 Create directory structure and namespace initialization
    - Create `data/`, `renderers/`, and `features/` directories
    - Create a base namespace initializer that sets up `window.PSP`, `window.PSP.data`, `window.PSP.renderers`, `window.PSP.features`
    - Update `index.html` to include all `<script>` tags in dependency order (data → features → renderers → app.js)
    - _Requirements: Design Architecture (File Organization, Loading Strategy)_

  - [x] 1.2 Implement card variant CSS system
    - Add `.card--elevated`, `.card--filled`, `.card--outlined` CSS classes to `index.html` styles
    - Elevated: `box-shadow: var(--elevation-2)`, no border
    - Filled: `background: var(--color-surface-variant)`, no border/shadow
    - Outlined: `border: 1px solid var(--color-outline-variant)`, no shadow
    - Apply card variants throughout existing documentation for visual hierarchy
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.3 Implement card content density improvements
    - Apply minimum 24px internal padding to all card content areas
    - Add visual separators between distinct content blocks within cards
    - Establish typographic hierarchy using Title, Body, Caption type scale roles
    - Set `max-width: 720px` on card content areas for readability
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 1.4 Write property tests for card variant system (Property 1, Property 13)
    - **Property 1: Card variant style mapping produces correct CSS**
    - **Property 13: Card content density constraints**
    - **Validates: Requirements 1.1, 10.1, 10.4**

- [x] 2. Component Data Layer
  - [x] 2.1 Create component registry (`data/components.js`)
    - Define full component entries for: instrumentTile, sectionHeader, badge, ctaBar, savingsBar, bankPill
    - Each entry includes: name, description, figmaNodeId, figmaFileKey, anatomy parts array, states object, a11y spec, playground config
    - Expose on `window.PSP.data.components`
    - _Requirements: 2.1, 3.1, 6.1, 14.1_

  - [x] 2.2 Create motion tokens data (`data/motion-tokens.js`)
    - Define motion tokens for: selection, expansion, navigation, fadeIn, slideUp, collapse
    - Each token: name, duration (ms), easing (cubic-bezier), properties array, category (auto-derived: <200ms=micro, 200-500ms=standard, >500ms=complex)
    - Group into categories: micro-interactions, standard transitions, complex animations
    - Expose on `window.PSP.data.motionTokens`
    - _Requirements: 4.1, 4.2, 4.5_

  - [x] 2.3 Create theme color maps (`data/themes.js`)
    - Define light theme map with all existing color role values
    - Define dark theme map with dark equivalents for every color role (primary, secondary, tertiary, error, success, warning, surface, outline and all variants)
    - Ensure every light key has a corresponding dark key with a different value
    - Expose on `window.PSP.data.themes`
    - _Requirements: 5.3_

  - [x] 2.4 Create usage guidance data (`data/guidance.js`)
    - Define usage guidance for each component with minimum 3 "when to use" scenarios and minimum 2 "when not to use" anti-patterns
    - Each anti-pattern includes a recommended alternative
    - Expose on `window.PSP.data.guidance`
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 2.5 Create breakpoints data (`data/breakpoints.js`)
    - Define 4 breakpoints: mobile (<600px), tablet (600-900px), desktop (900-1400px), largeDesktop (>1400px)
    - Each includes: columns, spacing token, component size modifications
    - Expose on `window.PSP.data.breakpoints`
    - _Requirements: 9.1, 9.2_

  - [x] 2.6 Create changelog data (`data/changelog.js`)
    - Define changelog entries with: version, date (ISO), type (addition/modification/deprecation), tokenName, previousValue (for modifications), newValue
    - Entries stored in reverse chronological order
    - Expose on `window.PSP.data.changelog`
    - _Requirements: 12.1, 12.2_

  - [x] 2.7 Create multi-platform code examples (`data/code-examples.js`)
    - Define code snippets for each component in 4 formats: HTML/CSS, React Native, Android XML, iOS SwiftUI
    - Each example includes all design token values used by the component
    - Expose on `window.PSP.data.codeExamples`
    - _Requirements: 11.1, 11.3_

  - [x] 2.8 Write property tests for data layer (Properties 5, 6, 11, 12, 14, 16, 17, 18)
    - **Property 5: Motion token structure and categorization**
    - **Property 6: Dark mode color completeness**
    - **Property 11: Usage guidance completeness**
    - **Property 12: Breakpoint specification completeness**
    - **Property 14: Multi-platform code example coverage**
    - **Property 16: Changelog entry structure and ordering**
    - **Property 17: Edge case documentation coverage**
    - **Property 18: Accessibility documentation completeness**
    - **Validates: Requirements 4.2, 4.5, 5.2, 5.3, 8.1-8.3, 9.2, 11.1, 11.3, 12.2-12.4, 13.1, 13.3, 14.1-14.3, 14.5**

- [x] 3. Checkpoint - Data layer complete
  - Ensure all data files load without errors, namespace is correctly populated, ask the user if questions arise.

- [x] 4. Phase 1 — Visual Polish & Anatomy Diagrams
  - [x] 4.1 Implement anatomy diagram renderer (`renderers/anatomy.js`)
    - Generate interactive SVG diagrams with numbered callouts for each component
    - Callouts connect via lines/pointers to component parts
    - All interactive callout elements must be minimum 44x44 CSS pixels
    - On hover: highlight corresponding component part and display design token values
    - Expose on `window.PSP.renderers.anatomy`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 4.2 Implement state documentation renderer (`renderers/states.js`)
    - Render all 6 interaction states side-by-side for each component
    - Show CSS property changes relative to Enabled state for each non-Enabled state
    - Display "Not applicable" label with explanation for null states (e.g., dragged for non-draggable)
    - Expose on `window.PSP.renderers.states`
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [x] 4.3 Integrate card variant comparison into Foundations section
    - Add visual comparison of all three card variants with labeled examples
    - Implement click-to-copy CSS token values for each variant
    - _Requirements: 1.2, 1.4_

  - [x] 4.4 Write property tests for renderers (Properties 2, 3, 4)
    - **Property 2: Anatomy diagram generation produces valid SVG with sequential callouts**
    - **Property 3: Anatomy diagram interactive elements meet minimum touch target size**
    - **Property 4: State documentation completeness and CSS diff**
    - **Validates: Requirements 2.1, 2.2, 2.4, 3.1, 3.3, 3.5**

- [ ] 5. Phase 2 — Motion & Interaction
  - [x] 5.1 Implement motion preview renderer (`renderers/motion-preview.js`)
    - Render animated previews demonstrating each motion token transition
    - Group previews by category (micro, standard, complex)
    - Click-to-copy complete CSS transition shorthand for each token
    - Expose on `window.PSP.renderers.motionPreview`
    - _Requirements: 4.1, 4.3, 4.4, 4.5_

  - [x] 5.2 Implement animated state demos
    - Add animated State_Demo previews showing visual transitions between states
    - Use motion tokens for transition timing
    - Respect `prefers-reduced-motion` media query
    - _Requirements: 3.4_

- [x] 6. Phase 3 — Interactive Features
  - [x] 6.1 Implement dark mode feature (`features/dark-mode.js`)
    - Add toggle button in site header area
    - Switch all color tokens to dark equivalents via `[data-theme="dark"]` attribute on `<html>`
    - Transition within 300ms using CSS transitions
    - Persist preference in localStorage
    - Load persisted preference on page load
    - Respect `prefers-reduced-motion` for transitions
    - Expose on `window.PSP.features.darkMode`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 6.2 Add dark mode CSS variables to `index.html`
    - Define `[data-theme="dark"]` selector with all dark color token overrides
    - Add transition properties for themed elements (background-color, color, border-color at 0.3s)
    - _Requirements: 5.2, 5.3_

  - [x] 6.3 Implement component playground (`renderers/playground.js`)
    - Render playground panel for each component with property controls
    - Live preview updates within 100ms of property change
    - Toggle between all 6 interaction states
    - Allow modifying: text content, badge visibility, offer text, icon selection (for instrument tiles)
    - Generate code snippet for current configuration
    - Provide "Reset to defaults" control
    - Expose on `window.PSP.renderers.playground`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [x] 6.4 Implement search engine (`features/search.js`)
    - Build inverted index at page load from all content data (section titles, component names, token names, content keywords)
    - Keyboard shortcut Cmd/Ctrl+K to open search
    - Display results within 150ms of typing
    - Navigate to section and scroll on result selection
    - Show "No results found" with suggested related terms for empty results
    - Handle edge cases: empty query, short query (<2 chars), special characters, long query (truncate to 100 chars)
    - Expose on `window.PSP.features.search`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 6.5 Implement clipboard utility (`features/clipboard.js`)
    - Copy-to-clipboard with `navigator.clipboard.writeText` primary method
    - Fallback to `document.execCommand('copy')` with temporary textarea
    - Show toast notification on success/failure
    - Expose on `window.PSP.features.clipboard`
    - _Requirements: 1.4, 4.4, 11.4_

  - [x] 6.6 Write property tests for interactive features (Properties 7, 8, 9, 10)
    - **Property 7: Dark mode preference persistence round-trip**
    - **Property 8: Component playground provides all state toggles and generates valid code**
    - **Property 9: Playground reset restores default configuration**
    - **Property 10: Search index coverage and retrieval**
    - **Validates: Requirements 5.5, 6.1, 6.3, 6.5, 6.6, 7.2, 7.3, 7.5**

- [x] 7. Checkpoint - Interactive features complete
  - Ensure all tests pass, dark mode toggles correctly, search returns results, playground updates live. Ask the user if questions arise.

- [ ] 8. Phase 4 — Content Depth
  - [ ] 8.1 Implement usage guidance renderer
    - Render "When to use" sections with green indicator and minimum 3 scenarios
    - Render "When not to use" sections with red indicator and minimum 2 anti-patterns with alternatives
    - Integrate into each component's documentation section
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 8.2 Implement responsive breakpoint documentation
    - Document 4 breakpoint thresholds with layout changes (columns, spacing, component sizes)
    - Display visual previews showing component layout at each breakpoint
    - Provide resizable preview frame demonstrating responsive behavior
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ] 8.3 Implement edge case and error recovery documentation
    - Document edge cases per component: empty states, overflow text, loading states
    - Create error recovery flow diagrams showing user path from failure to resolution
    - Each flow specifies: error message, available actions, resulting state
    - Include visual examples of edge case rendering (truncated text, missing icons, timeout states)
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

  - [ ] 8.4 Implement enhanced accessibility documentation
    - Document ARIA roles, states, and properties per component
    - Provide screen reader announcement text for state transitions
    - Document keyboard navigation patterns (focus order, shortcuts)
    - Specify minimum touch targets (44x44px) and contrast ratios (4.5:1 text, 3:1 UI)
    - Display compliance checklist per component
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 9. Phase 5 — Developer Experience
  - [ ] 9.1 Implement multi-platform code examples with syntax highlighting
    - Add tab selector for platform format (HTML/CSS, React Native, Android XML, iOS SwiftUI)
    - Implement lightweight regex-based syntax highlighter for 4 languages (`features/clipboard.js` extended with `window.PSP.features.highlight`)
    - Add copy button per code example
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ] 9.2 Implement changelog renderer (`renderers/changelog.js`)
    - Render changelog section with additions (green), modifications (amber), deprecations (red)
    - Display in reverse chronological order
    - Each entry shows: version, date, token name, previous value (for mods), new value
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ] 9.3 Implement Figma integration previews
    - Embed Figma preview iframes for key component pages
    - Display at actual design dimensions
    - Add "Open in Figma" link adjacent to each embed
    - Handle load failures: hide iframe, show fallback static image, error message, retry button
    - Timeout after 10 seconds triggers fallback
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

  - [ ] 9.4 Write property test for syntax highlighting (Property 15)
    - **Property 15: Syntax highlighting produces language-appropriate output**
    - **Validates: Requirements 11.5**

- [ ] 10. Integration and Final Wiring
  - [ ] 10.1 Wire all modules into `app.js` buildSections function
    - Update `buildSections()` to call renderers for anatomy, states, playground, motion previews, changelog
    - Add new navigation tabs/sections for: Motion Tokens, Playground, Changelog, Breakpoints
    - Ensure search index is built after all sections render
    - Initialize dark mode and search on page load
    - _Requirements: All (integration)_

  - [ ] 10.2 Add card variant click-to-copy interactions
    - Wire clipboard utility to card variant examples
    - Wire clipboard to motion token previews
    - Wire clipboard to code example copy buttons
    - Show toast notifications on copy
    - _Requirements: 1.4, 4.4, 11.4_

  - [ ] 10.3 Write integration tests
    - Full page load without JS errors
    - Navigation between all sections
    - Dark mode toggle end-to-end with persistence
    - Search end-to-end (type, results, navigate)
    - Playground property modification and code generation
    - _Requirements: All_

- [ ] 11. Final Checkpoint
  - Ensure all tests pass, all sections render correctly, no console errors. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use fast-check via CDN (`https://cdn.jsdelivr.net/npm/fast-check/lib/bundle.js`)
- All code uses vanilla JS with `window.PSP` global namespace — no frameworks or build tools
- Checkpoints ensure incremental validation between phases
- The existing `app.js` buildSections pattern is preserved; new modules extend it
