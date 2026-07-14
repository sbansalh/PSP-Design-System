---
inclusion: auto
---

# PSP Design System — Complete Project Context

## Project
- **Repo**: https://github.com/sbansalh/PSP-Design-System
- **Live**: https://sbansalh.github.io/PSP-Design-System/
- **Tech**: Vanilla HTML/CSS/JS, no build tools, GitHub Pages
- **Author**: Saurabh Bansal (sbansalh), Product Designer, Amazon Pay

## Architecture
```
index.html          → Shell + CSS + nav
psp-namespace.js    → window.PSP global
data/*.js           → instrument-registry, components, themes, etc.
features/*.js       → psp-generator (AI), search, clipboard, dark-mode
renderers/*.js      → psp-frame (shared renderer), playground, states, etc.
app.js              → 1600+ lines: all sections + post-render wiring + FAB modal
```

## AI "Create Your PSP" Feature
- **Provider**: Groq (free tier, no credits needed)
- **Model**: llama-3.3-70b-versatile
- **Key** (obfuscated in code via string reversal): [stored in features/psp-generator.js as reversed string]
- **Endpoint**: https://api.groq.com/openai/v1/chat/completions
- **Architecture**: User prompt → LLM → validateLLMOutput() → jsonToConfig() → psp-frame.render()
- **Validation layer**: Removes duplicates, enforces one-badge-per-type, caps RECOMMENDED at 3
- **UI**: FAB button (bottom-right) → full-screen modal with split panel (prompt left, PSP right)
- **Presets**: Standard, N2A (New to Amazon), Thunderbolt (SPC), Fast Checkout (flow)

## PSP Design Rules (ABSOLUTE)
1. **Sections order**: RECOMMENDED (max 3) → UPI → CREDIT & DEBIT CARDS → MORE WAYS TO PAY
2. **UPI instruments** (apay_upi, other_upi) → UPI section ONLY. Never in More Ways.
3. **Card instruments** → CARDS section ONLY. Never in More Ways.
4. **Badge priority**: Best offer > Previously used > Featured
5. **First tile** (best offer) always auto-selected
6. **Each badge type** used at most ONCE
7. **Position-aware border-radius** on selected tiles:
   - Top: 12px 12px 0 0
   - Middle: 0
   - Bottom: 0 0 12px 12px
   - Only: 12px
8. **Radio button**: outer r=9, inner r=5, SVG DOM manipulation (create/remove)
9. **Selected state**: bg #EDF8FF, border 2px solid #2162A1, badge blue #0A7CD1, name bold 700
10. **Non-selected state**: bg #FFF, border none, badge grey #E3E6E6, name weight 400
11. **Letter-spacing**: 0 on ALL instrument text (name, details, offer, badge, CTA)
12. **Card details**: 2 dots (••) everywhere, VISA/RuPay as styled colored text
13. **Indian number system**: formatIndian() for all ₹ amounts (1,00,000 not 100,000)

## PSP Variants
- **Standard**: CBCC best offer, HDFC previously used, APay UPI featured, full sections
- **N2A (New to Amazon)**: APay UPI in RECOMMENDED with Featured badge + "Get up to ₹50 as cashback. Set up now", CARDS section empty (just "+ Add" link), APB insufficient
- **N2UPI (New to UPI)**: APay UPI in RECOMMENDED with Featured badge, onboarding message, preselected. No bank pill. Savings text as detail.
- **High-value**: Large order, CBCC ₹200 cashback, HDFC expired, APB insufficient, EMI

## Instruments (12 total)
| ID | Type | Name | Icon | Group |
|---|---|---|---|---|
| cbcc | card | Amazon Pay ICICI credit card | Amazon Pay ICICI credit card.png | recommended |
| hdfc_credit | card | HDFC credit card | HDFC Banks.png | recommended |
| hdfc_debit | card | HDFC debit card | HDFC Banks.png | cards |
| icici_credit | card | ICICI credit card | ICICI Banks.png | cards |
| sbi_debit | card | SBI debit card | SBI Banks.png | cards |
| apay_upi | upi | Amazon Pay UPI | APay UPI.png | recommended |
| other_upi | upi | Pay by any UPI App | Any other UPI.png | upi |
| apay_balance | wallet | Amazon Pay Balance: ₹{balance} | APay Balance.png | more_ways |
| apay_later | bnpl | Amazon Pay Later | APay Later.png | more_ways |
| cod | cod | Cash on Delivery | POD.png | more_ways |
| emi | emi | EMI | EMI.png | more_ways |
| net_banking | netbanking | Net Banking | Net Banking.png | more_ways |

## Figma Files
- **Service-and-Pay**: N6ojbzlM3tRsXj5X4cJkkX
- **IES Stores Design Library** (instrument states): RzaeDqqV62dnvNBpbYOkxE (node 179736-5997)
- **PSP Toolkit redesign UI**: 3AxBQkpZyiod8tkysAs1JK (node 5498-19812)
- **Pay WW alignment** (N2A PSP): VtFoVzUe9anW3I7hTgUjro (node 4759-93147)

## UI Redesign Direction (from Figma 3AxBQkpZyiod8tkysAs1JK)
The Figma shows a cleaner, more minimal design:
- **Sidebar**: 260px, white bg, groups: GETTING STARTED (Overview) / DESIGN (Foundations, Color System, Typography, Components, States & Behavior) / PATTERNS / DOCUMENTATION (Accessibility, Resources, Changelog)
- **Content**: Much more whitespace, clean card borders (1px #e3e5e8), no gradient section headers
- **Section titles**: Simple large text (28-40px), no colored left borders, no gradient backgrounds
- **Cards**: Subtle border, white bg, clean header with 15px font-weight-600
- **Footer**: "PSP Design System · v2.0.0 · Figma Source ↗"
- **No hero gradient** on overview (replaced with subtle contained card)
- **Color swatches** as horizontal strips (10 shades each)
- **Type scale** shown with live text examples side-by-side
- **Spacing scale** as horizontal bars
- **Border radius** as visual squares with progressive rounding
- **Elevation** as visual cards with labels

## Tabs Removed
- Motion Tokens (removed from nav)
- Breakpoints (removed from nav)
- "Create Your PSP" (moved to FAB, no longer a tab)

## Current Navigation Groups
GETTING STARTED: Overview
DESIGN: Foundations, Components, Patterns, States & Behavior
CONTENT: Content Guidelines, Mental Model
ADVANCED: Accessibility, Decision Framework
PATTERNS: Service & Pay Baseline
DOCUMENTATION: Playground, Changelog, Code Examples

## Known Issues / Pending Work
1. **Website UI overhaul** — Apply Figma redesign aesthetic (cleaner sidebar, remove gradient headers, more whitespace, reorganize sections)
2. **Section headers** — Should look like the reference: clean white card with left blue border accent, bold title (Inter 700), grey description below. No gradient background. Subtle right-side fade to light blue.
3. **Navigation** — Per screenshot: "Patterns" should be UNDER DESIGN group (Foundations, Components, Patterns, States & Behavior). Not in a separate PATTERNS group at bottom.
4. **State cards (4 cards)** — Current layout is broken: spacing wrong, tags floating, margins off. Needs redesign: clean border cards, state label top-left as a pill badge, instrument preview centered inside card, proper padding (24px), consistent sizing.
5. **Playground field order** — Instrument dropdown should come FIRST, then Name, Details, Badge, Offer, etc.
6. **N2A PSP rendering** — The savings/onboarding message must have: ₹50 in GREEN (#0B7B3C), "Set up now" in BLUE (#2162A1) as a link. No bank pill. User hasn't registered UPI yet. CARDS section empty.
7. **LLM is NOT being trained** — It's instruction-following only. System prompt improvements = better output. No data goes back to Groq/Meta.
8. **Dark mode** — Disabled (failed WCAG AA contrast). Init is no-op.

## User Corrections (explicit instructions from Saurabh)
- Each instrument must be IDENTICAL across different states in all views
- "VISA" and "RuPay" should appear as styled colored text (not plain)
- Indian number system everywhere (1,00,000)
- 2 dots (••) in card details, never 4
- Letter-spacing 0 on all PSP instrument text
- Dark mode is DISABLED
- Always verify with `node -c` before pushing
- Never push secrets to GitHub (use obfuscation)
- The AI feature should just WORK — no API key setup for users
- Prompts can be anything — the LLM + validation layer handles correctness
- When the LLM fails, show the error (don't silently fall back to default)
- **CRITICAL: When making a change, check ALL touchpoints across the entire website. Don't just change one place and leave the rest inconsistent. If you change a value in the renderer, the documentation table must also update. If you change a PSP rule, it must reflect in the system prompt AND the design tokens AND any inline docs.**
- N2A/N2UPI: "Get up to ₹50 as cashback. Set up now" → ₹50 in green (#0B7B3C), "Set up now" in blue (#2162A1). No bank pill. User hasn't registered UPI. CARDS empty.
- Section headers: white card, left blue (#0972d3) border accent, bold title, grey desc. No gradient.
- State cards: clean border, pill badge top-left, proper 24px padding, consistent sizing
- Playground: Instrument dropdown FIRST in the properties panel
- Navigation order under DESIGN: Foundations, Components, Patterns, States & Behavior
