# Design Document: Modernised PSP Design System

## Overview

This document captures the design decisions, architecture, and rationale behind the Modernised PSP (Payment Selection Page) design system for Amazon Pay.

## Problem Statement

The PSP screen is used across two checkout contexts (Paycheckout and Stores) with no unified component documentation. Designers and developers reference different Figma files, leading to inconsistent implementations. This design system extracts and codifies the exact specifications from the canonical Figma source.

## Source of Truth

- **Figma file**: `XoqbHriFr2Efq18TBPG6VQ` (Modernised PSP toolkit)
- **Node**: `9:1857` (frame: "Mordenised PSP - For Ref")
- **Page**: "Baseline PSP (Ref)"

All values in this system are extracted directly from Figma node data — not approximated.

## Architecture

### Dual-Context Strategy

The PSP renders in two contexts that share instrument components but differ in chrome:

| Aspect | Paycheckout | Stores Checkout |
|--------|-------------|-----------------|
| Container | Bottom sheet / webview | Full page |
| Button library | Tuxedo Mobile | RIO |
| Header | Amazon Pay branded | Stores branded |
| CTA style | Teal accent | Yellow accent |

**Decision**: Document only the shared PSP components (tiles, badges, card groups, dividers, savings bar). Buttons and CTA styling are explicitly excluded and deferred to the context-specific library.

### Section Hierarchy

The PSP follows a fixed section order optimised for conversion:

1. **RECOMMENDED** (max 3) — ML-driven, highest conversion
2. **UPI** — High adoption in India
3. **CREDIT & DEBIT CARDS** — Saved instruments
4. **MORE WAYS TO PAY** — Balance, Pay Later, COD, EMI, Net Banking
5. **GIFT CARDS** — Lowest priority

**Rationale**: Based on usability testing of the fast-track design. Section order is fixed and must not change based on user history or A/B tests.

### Preselection Logic

```
IF Best Offer exists → auto-select
ELSE IF Previously Used exists → auto-select
ELSE IF only one instrument → auto-select
ELSE → no preselection (user must choose)
```

**Rationale**: Reduces friction for returning users while ensuring new users make an explicit choice.

### Instrument Tile States

Three states cover all interaction scenarios:

1. **Transaction Ready** (default) — White bg, all 3 lines visible, tappable
2. **Selected** — Blue bg `#EDF8FF`, blue border `#2162A1`, checkmark radio
3. **Non-Transaction Ready** — 0.7 opacity, red reason text, "Why?" link, no offer line

**Decision**: Non-transaction-ready tiles remain visible (not hidden) to maintain spatial consistency and inform users why an instrument is unavailable.

### Badge System

Three badge variants, all positioned at top-left of tile:

| Badge | Background | Priority | Source |
|-------|-----------|----------|--------|
| Best offer | `#0A7CD1` (blue) | 1st | ML/offer engine |
| Previously used | `#565959` (gray) | 2nd | Transaction history |
| Featured | `#565959` (gray) | 3rd | Business/promotional |

**Decision**: Only one badge per tile. Priority determines which badge shows if multiple apply.

### Line 2 Adaptability

Line 2 content varies by instrument type while maintaining identical layout:

- Cards: `NETWORK ••••XXXX | Name`
- UPI: `Bank Name ••••XXXX`
- Balance: `Add ₹XXX to proceed`
- Pay Later: `Available credit: ₹ XX,XXX`
- COD: `Convenience fee of ₹X will apply`
- EMI/Net Banking: No Line 2 (expandable chevron)

### Bottom Sticky CTA

Two-part fixed bar:

1. **Savings bar** (`#E8FFF8`) — Influencer widget showing total savings
2. **Action bar** (white) — Price display + Continue button

**Decision**: Savings bar is always visible when offers are applied. It acts as a conversion nudge. The CTA button component itself comes from Tuxedo/RIO.

## Color System

All colors extracted from Figma with exact RGB values:

### Semantic Colors
- Primary text: `#0F1111` — Used for all headings and instrument names
- Secondary text: `#565959` — Subtitles, details, section headers
- Link: `#2162A1` — All interactive links and "Details" text
- Success: `#0B7B3C` — Savings and cashback amounts only
- Error: `#CC0C39` — Non-transaction-ready reason text only
- Muted: `#888C8C` — Disabled and placeholder text

### Surface Colors
- Page: `#F7FAFA`
- Card: `#FFFFFF`
- Selected: `#EDF8FF`
- Savings bar: `#E8FFF8`
- Header gradient: `#82D8E3` → `#A6E7CE`

## Typography

Single font family: **Amazon Ember**

| Use | Size | Weight | Line Height |
|-----|------|--------|-------------|
| Instrument name | 16px | 400 | 20px |
| Card details | 13px | 400 | 18px |
| Section header | 13px | 700 | 18px (uppercase) |
| Badge label | 9.23px | 400 | 15px |
| Price amount | 22px | 700 | 26px |
| CTA label | 16px | 400 | 21px |

## Spacing

4px base grid. Key values: 8px (small gaps), 12px (tile padding, icon gap), 16px (page padding), 25px (section top margin).

## Character Constraints

| Element | Max Chars |
|---------|-----------|
| Instrument name | ~32 |
| Card details | ~36 |
| Offer text | ~40 |
| Badge text | ~16 |
| Section header | ~24 |

## Deliverables

1. **Interactive HTML docs** — `design-system/index.html` (self-contained, no deps)
2. **Design tokens JSON** — `design-tokens.json` (for code integration)
3. **Figma plugin script** — `figma-plugin-script.js` (creates components + styles)
4. **HTML mockup** — `psp-modernised.html` (pixel-accurate reference)

## Open Questions

- Should the "Wallet as separate category" pattern (from the reference image) be adopted in the modernised PSP?
- Should "Buy Now Pay Later" get its own section or remain under "More Ways to Pay"?
- What is the exact behaviour when all instruments are non-transaction-ready?
