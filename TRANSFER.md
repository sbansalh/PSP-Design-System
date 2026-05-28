# PSP Design System — Project Transfer Guide

## Quick Start

1. Clone/copy the entire `psp-design-system/` folder
2. Run `npm install` (installs fast-check for property tests)
3. Open `index.html` in a browser — the full design system loads with no build step

## Project Structure

```
psp-design-system/
├── .kiro/                          # Kiro specs (requirements, design, tasks)
│   └── specs/psp-toolkit-excellence/
│       ├── .config.kiro            # Spec configuration
│       ├── requirements.md         # Feature requirements (15 requirement groups)
│       ├── design.md               # Architecture & design decisions
│       └── tasks.md                # Implementation task list with progress
│
├── data/                           # Data layer (window.PSP.data.*)
│   ├── components.js               # Component registry (7 components)
│   ├── motion-tokens.js            # Animation tokens (10 tokens)
│   ├── themes.js                   # Light + dark theme color maps
│   ├── guidance.js                 # Usage guidance (do/don't per component)
│   ├── breakpoints.js              # Responsive breakpoints (4 breakpoints)
│   ├── changelog.js                # Token changelog (26 entries)
│   └── code-examples.js            # Multi-platform code (6 components × 4 platforms)
│
├── features/                       # Interactive features (window.PSP.features.*)
│   ├── dark-mode.js                # Theme toggle with localStorage persistence
│   ├── search.js                   # Cmd+K search with inverted index
│   └── clipboard.js                # Copy-to-clipboard with fallback
│
├── renderers/                      # UI renderers (window.PSP.renderers.*)
│   ├── anatomy.js                  # SVG anatomy diagrams with callouts
│   ├── states.js                   # State documentation grid + animated demos
│   ├── playground.js               # Interactive component playground
│   ├── motion-preview.js           # Animated motion token previews
│   └── changelog.js                # Changelog renderer
│
├── tests/                          # Property-based tests (open in browser)
│   ├── property-tests-cards.html   # Properties 1, 13 (card variants)
│   ├── property-tests-data-layer.html  # Properties 5,6,11,12,14,16,17,18
│   ├── property-tests-renderers.html   # Properties 2, 3, 4
│   ├── property-tests-interactive.html # Properties 7, 8, 9, 10
│   └── test-animated-state-demo.html   # Unit test for animated demos
│
├── PSP Instument icons/            # PNG logos for payment instruments
│   ├── Amazon Pay Balance.png
│   ├── Amazon Pay Later.png
│   ├── Amazon Pay UPI.png
│   ├── App + 3P.png
│   ├── Cash on delivery.png
│   ├── EMI.png
│   ├── HDFC credit card.png
│   ├── ICICI Bank.png
│   ├── Netbanking.png
│   └── Pay by any UPI App.png
│
├── index.html                      # Main entry point (CSS + nav + script loading)
├── app.js                          # Content generation (all sections)
├── psp-namespace.js                # Global namespace initializer
├── design-tokens.json              # Exported design tokens (JSON)
├── psp-modernised.html             # Legacy modernised PSP reference
├── figma-plugin-script.js          # Figma plugin helper
├── package.json                    # Dependencies (fast-check for tests)
├── CHANGELOG.md                    # Project changelog
├── README.md                       # Project readme
├── design.md                       # Design documentation
└── skill.md                        # Skill documentation
```

## Task Progress (as of transfer)

**30/46 tasks completed (65%)**

| Phase | Status |
|-------|--------|
| 1. Core Infrastructure | ✅ Complete |
| 2. Component Data Layer | ✅ Complete |
| 3. Checkpoint - Data layer | ✅ Verified |
| 4. Visual Polish & Anatomy Diagrams | ✅ Complete |
| 5. Motion & Interaction | ✅ Complete |
| 6. Interactive Features | ✅ Complete |
| 7. Checkpoint - Interactive features | ✅ Verified |
| 8. Content Depth | ⏸ Skipped (for now) |
| 9. Developer Experience | ⏸ Skipped (for now) |
| 10. Integration & Final Wiring | ⏸ Skipped (for now) |
| 11. Final Checkpoint | ⏸ Skipped (for now) |

## Remaining Work (Phases 8–11)

Open `.kiro/specs/psp-toolkit-excellence/tasks.md` to see the full task list. Remaining tasks:
- 8.1–8.4: Content depth (usage guidance renderer, breakpoints docs, edge cases, accessibility docs)
- 9.1–9.4: Developer experience (syntax highlighting, changelog renderer, Figma previews, property test)
- 10.1–10.3: Integration (wire modules into app.js, click-to-copy, integration tests)
- 11: Final checkpoint

## Architecture Notes

- **No build tools** — vanilla HTML/CSS/JS, open `index.html` directly
- **Global namespace** — all modules use `window.PSP` (initialized by `psp-namespace.js`)
- **Script loading order** — namespace → data → features → renderers → app.js
- **Amazon RIO design** — orange (#FF9900) primary, dark navy (#232f3e) sidebar, Amazon Ember font
- **Dark mode** — toggle in sidebar header, persists to localStorage, 300ms transitions
- **Search** — Cmd/Ctrl+K opens modal, inverted index built from all data sources
- **Property tests** — fast-check via CDN, open test HTML files in browser to run

## Design Decisions

- Hero sections use solid #FF9900 with white text (WCAG AA for large text)
- Sidebar is Amazon dark navy (#232f3e) with orange active states
- Buttons follow RIO style (pill-shaped, 20px border-radius)
- Component states displayed in 2×2 grid layout
- "Service & Pay" renamed to "Bottom Sticky Sleeve"
- Badge "Featured" uses blue (#0A7CD1) with full corner radius

## How to Continue Development

1. Open the project in Kiro
2. The spec at `.kiro/specs/psp-toolkit-excellence/tasks.md` tracks all progress
3. Ask Kiro to "continue with the task list" — it will pick up from task 8.1
4. Or ask for specific tasks by number (e.g., "execute task 9.1")
