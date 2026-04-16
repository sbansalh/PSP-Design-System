# Skill: Modernised PSP Design System

## Purpose

This skill provides context and guidelines for working on the Modernised PSP (Payment Selection Page) design system for Amazon Pay. Use it when building, reviewing, or extending PSP components.

## When to activate

- Building or modifying PSP instrument tiles
- Reviewing PSP-related Figma designs
- Implementing payment method selection UI
- Creating new instrument types or states
- Working on the bottom sticky CTA bar
- Extracting design tokens for code

## Key facts

### Source
- Figma: `XoqbHriFr2Efq18TBPG6VQ`, Node `9:1857`
- Frame width: 360px
- Font: Amazon Ember (Regular 400, Bold 700)
- Grid: 4px base

### Two contexts
- **Paycheckout** → Buttons from Tuxedo Mobile
- **Stores checkout** → Buttons from RIO library
- PSP instrument components are shared across both

### Section order (fixed, never changes)
1. RECOMMENDED (max 3 instruments)
2. UPI
3. CREDIT & DEBIT CARDS
4. MORE WAYS TO PAY (Balance → Pay Later → COD → EMI → Net Banking)
5. GIFT CARDS

### Preselection
Best Offer → Previously Used → Single instrument → No preselection

### Tile states
1. Transaction Ready — white bg, all 3 lines, tappable
2. Selected — `#EDF8FF` bg, `#2162A1` border, filled radio
3. Non-Transaction Ready — 0.7 opacity, red reason, "Why?" link, no offer line

### Critical colors
- Selected bg: `#EDF8FF`, border: `#2162A1`
- Success/savings: `#0B7B3C`
- Badge blue: `#0A7CD1`
- Error/reason: `#CC0C39`
- CTA: `#FFD814`
- Primary text: `#0F1111`
- Secondary text: `#565959`
- Link: `#2162A1`

### Do NOT
- Document buttons (they come from Tuxedo/RIO)
- Change section order
- Show more than 3 recommended instruments
- Show offer text on non-transaction-ready tiles
- Use colors outside the defined palette
- Use font weights other than 400 and 700

## Files reference

| File | Purpose |
|------|---------|
| `amazon-pay-super-offer/design-system/index.html` | Interactive design system docs |
| `amazon-pay-super-offer/design-tokens.json` | Structured tokens JSON |
| `amazon-pay-super-offer/psp-modernised.html` | Pixel-accurate HTML mockup |
| `amazon-pay-super-offer/figma-plugin-script.js` | Figma plugin for components |
| `design.md` | Design decisions and rationale |
| `.kiro/specs/super-offer-bottom-sheet/modernised-psp-design-system.md` | Full token spec |
