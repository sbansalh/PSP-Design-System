/* ── Build All Sections ── */
function buildSections(){
var html='';

/* ══════════════════════════════════════════════════════════════
   0. GETTING STARTED
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec active">';

/* Hero Section */
html+='<div class="hero">';
html+='<div class="hero-content">';
html+='<div class="hero-badge">📦 v2.0.0 · Production Ready</div>';
html+='<h1 class="hero-title">PSP Design System</h1>';
html+='<p class="hero-desc">Build consistent payment experiences across 90+ Amazon touchpoints. Complete component library, design tokens, and usage guidelines for Paycheckout and Stores checkout flows.</p>';
html+='<div class="hero-actions">';
html+='<button class="btn btn-primary" onclick="switchTab(2)">Browse Components →</button>';
html+='<a href="https://www.figma.com/design/XoqbHriFr2Efq18TBPG6VQ/Modernised-PSP-toolkit?node-id=9-1857" target="_blank" class="btn btn-secondary">Open in Figma ↗</a>';
html+='</div></div></div>';

/* Stats */
html+='<div class="stats-grid">';
html+='<div class="stat-card"><div class="stat-num">3</div><div class="stat-label">Tile States</div></div>';
html+='<div class="stat-card"><div class="stat-num">8</div><div class="stat-label">Page Sections</div></div>';
html+='<div class="stat-card"><div class="stat-num">3</div><div class="stat-label">Badge Types</div></div>';
html+='<div class="stat-card"><div class="stat-num">17</div><div class="stat-label">Color Tokens</div></div>';
html+='<div class="stat-card"><div class="stat-num">13</div><div class="stat-label">Char Limits</div></div>';
html+='<div class="stat-card"><div class="stat-num">5</div><div class="stat-label">Page States</div></div>';
html+='</div>';
html+='<div class="note note-blue" style="margin:24px 0"><strong>⚡ Semi-Modernized PSP:</strong> This design system documents the current semi-modernized PSP implementation. Key feature: <strong>Radio button selection</strong> (not full tile tap). Selected tiles show blue border + filled radio button. This balances familiarity (radio buttons) with modern visual design.</div>';
html+='<div class="grid-2">';
html+='<div class="card"><div style="height:120px;background:linear-gradient(135deg,#e3f5e1 0%,#b8e6b0 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--cs-border)"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="12" y="16" width="40" height="32" rx="4" stroke="#037f0c" stroke-width="2" fill="none"/><path d="M20 28h24M20 34h16" stroke="#037f0c" stroke-width="2" stroke-linecap="round"/><circle cx="44" cy="20" r="8" fill="#037f0c" opacity=".15"/><path d="M41 20l2 2 4-4" stroke="#037f0c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="card-title">When to use</div><div style="padding:0 24px 24px">';
html+='<div class="do"><strong>\u2713 Paycheckout Context</strong><ul><li>PSP is rendered inside Paycheckout webview</li><li>Use components from <b>Tuxedo Mobile</b> library</li><li>Tuxedo handles buttons, inputs, typography</li></ul></div>';
html+='<div style="height:12px"></div>';
html+='<div class="do"><strong>\u2713 Stores Checkout Context</strong><ul><li>PSP is rendered inside Stores checkout</li><li>Use components from <b>RIO</b> (Stores Design Library)</li><li>RIO handles buttons, inputs, typography</li></ul></div></div></div>';

html+='<div class="card"><div style="height:120px;background:linear-gradient(135deg,#e9f3ff 0%,#b8d4f0 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--cs-border)"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="24" cy="28" r="10" stroke="#0972d3" stroke-width="2" fill="none"/><circle cx="24" cy="25" r="3" fill="#0972d3" opacity=".3"/><path d="M17 35c0-4 3-7 7-7s7 3 7 7" stroke="#0972d3" stroke-width="2" fill="none"/><circle cx="40" cy="24" r="8" stroke="#0972d3" stroke-width="2" fill="none"/><circle cx="40" cy="22" r="2.5" fill="#0972d3" opacity=".3"/><path d="M34 30c0-3 2.5-6 6-6s6 3 6 6" stroke="#0972d3" stroke-width="2" fill="none"/><rect x="14" y="42" width="36" height="2" rx="1" fill="#0972d3" opacity=".15"/></svg></div><div class="card-title">Who this is for</div><div style="padding:0 24px 24px">';
html+='<div style="font-size:13px;line-height:2.2;color:var(--cs-text-primary)">';
html+='<div><span class="flow-num" style="background:#2162A1">D</span> <b>Designers</b> \u2014 Component specs, spacing tokens, visual states</div>';
html+='<div><span class="flow-num" style="background:#037f0c">E</span> <b>Engineers</b> \u2014 Design tokens, JSON handoff, character limits</div>';
html+='<div><span class="flow-num" style="background:#0972d3">P</span> <b>Product Teams</b> \u2014 Page hierarchy, preselection logic, section ordering</div>';
html+='</div></div></div>';
html+='</div>';

html+='<div class="card"><div style="height:120px;background:linear-gradient(135deg,#fff3e0 0%,#ffe0b2 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--cs-border)"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="14" y="12" width="36" height="40" rx="3" stroke="#e65100" stroke-width="2" fill="none"/><path d="M22 22h20M22 28h14M22 34h18M22 40h10" stroke="#e65100" stroke-width="2" stroke-linecap="round" opacity=".6"/><rect x="38" y="36" width="12" height="12" rx="2" fill="#e65100" opacity=".12"/><path d="M42 40l2 2 3-3" stroke="#e65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="card-title">What this system covers</div><div style="padding:0 24px 24px">';
html+='<ul style="font-size:13px;padding-left:18px;line-height:2.2;color:var(--cs-text-primary)"><li>Instrument tile anatomy &amp; states</li><li>Section grouping &amp; hierarchy</li><li>Recommended section logic</li><li>Bottom sticky CTA bar</li><li>Character constraints for all text</li><li>Selection &amp; preselection behaviour</li><li>Offer badge &amp; savings display</li></ul>';
html+='<div class="warn" style="margin-top:14px">\u26A0\uFE0F <b>BUTTONS:</b> Do not document buttons here. They come from master libraries:<br>&bull; Paycheckout context \u2192 <b>Tuxedo Mobile</b> library<br>&bull; Stores checkout context \u2192 <b>RIO</b> (Stores Design Library)</div></div></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   1. FOUNDATIONS
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%)">';
html+='<div class="hero-badge">🎨 Design Foundations</div>';
html+='<h1 class="hero-title">Foundations</h1>';
html+='<p class="hero-desc">Core design tokens that define the visual language of the PSP — colors, typography, spacing, and more. These tokens ensure consistency across all payment touchpoints.</p>';
html+='</div>';

/* Color Tokens */
html+='<div class="card"><div class="card-title">Color Tokens</div><div class="swatch-grid">';
var tokens=[['Page BG','#F7FAFA'],['Card BG','#FFFFFF'],['Primary Text','#0F1111'],['Secondary Text','#565959'],['Link','#2162A1'],['Success','#0B7B3C'],['Border','#D5D9D9'],['Badge Blue','#0A7CD1'],['CTA Yellow','#FFD814'],['Selected BG','#EDF8FF'],['Selected Border','#007185'],['Radio Button','#007185'],['Error Red','#CC0C39'],['Badge Gray BG','#E3E6E6'],['Badge Gray Text','#232F3E'],['Address BG','#F7FEFF'],['Savings Bar BG','#E8FFF8']];
tokens.forEach(function(t){html+='<div class="swatch" onclick="copySpec(this.querySelector(\'.swatch-hex\'))"><div class="swatch-color" style="background:'+t[1]+'"></div><div><div class="swatch-name">'+t[0]+'</div><div class="swatch-hex">'+t[1]+'</div></div></div>';});
html+='</div></div>';

/* Typography */
html+='<div class="card"><div class="card-title">Typography</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Size</th><th>Weight</th><th>Color</th></tr>';
html+='<tr><td>Instrument Name (Line 1)</td><td>16px</td><td>400 (Regular)</td><td>#0F1111</td></tr>';
html+='<tr><td>Instrument Detail (Line 2)</td><td>13px</td><td>400 (Regular)</td><td>#565959</td></tr>';
html+='<tr><td>Offer Text (Line 3)</td><td>13px</td><td>400 (Regular)</td><td>#0B7B3C</td></tr>';
html+='<tr><td>Section Header</td><td>13px</td><td>700 (Bold), uppercase</td><td>#565959</td></tr>';
html+='<tr><td>Badge Text</td><td>10px</td><td>400 (Regular)</td><td>Varies</td></tr>';
html+='<tr><td>Price Number</td><td>22px</td><td>700 (Bold)</td><td>#0F1111</td></tr>';
html+='<tr><td>Price Symbol (\u20B9)</td><td>13px</td><td>700 (Bold)</td><td>#0F1111</td></tr>';
html+='<tr><td>CTA Button</td><td>16px</td><td>400 (Regular)</td><td>#0F1111</td></tr>';
html+='<tr><td>Savings Text</td><td>14px</td><td>700 (Bold)</td><td>#0B7B3C</td></tr>';
html+='<tr><td>Sub-text</td><td>14px</td><td>400 (Regular)</td><td>#565959</td></tr>';
html+='<tr><td>Address Name</td><td>13px</td><td>700 (Bold)</td><td>#0F1111</td></tr>';
html+='<tr><td>Address Detail</td><td>13px</td><td>400 (Regular)</td><td>#0F1111</td></tr>';
html+='<tr><td>Change Link</td><td>13px</td><td>400 (Regular)</td><td>#007185</td></tr>';
html+='<tr><td>Header Title</td><td>16px</td><td>400 (Regular)</td><td>#0F1111</td></tr>';
html+='</table></div>';
html+='<div class="note note-blue">Font family: Amazon Ember. Falls back to -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif.</div>';
html+='</div>';

/* Spacing */
html+='<div class="card"><div class="card-title">Spacing Tokens</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Token</th><th>Value</th><th>Usage</th></tr>';
html+='<tr><td>Page padding</td><td>16px</td><td>Left/right content padding</td></tr>';
html+='<tr><td>Section padding</td><td>8px 16px</td><td>Top/sides of each section</td></tr>';
html+='<tr><td>Tile padding</td><td>12px</td><td>Internal padding of instrument tiles</td></tr>';
html+='<tr><td>Icon-to-text gap</td><td>10px</td><td>Between icon container and text</td></tr>';
html+='<tr><td>Badge left offset</td><td>66px</td><td>Badge alignment from tile edge</td></tr>';
html+='<tr><td>Divider inset</td><td>12px</td><td>Dashed divider margin from edges</td></tr>';
html+='</table></div></div>';

/* Radii & Shadows */
html+='<div class="grid-2">';
html+='<div class="card"><div class="card-title">Border Radii</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Radius</th></tr>';
html+='<tr><td>Card group</td><td>12px</td></tr>';
html+='<tr><td>Tile</td><td>12px</td></tr>';
html+='<tr><td>Icon container</td><td>5px</td></tr>';
html+='<tr><td>Badge</td><td>13px</td></tr>';
html+='<tr><td>CTA button</td><td>92px (pill)</td></tr>';
html+='<tr><td>Bank pill</td><td>30px</td></tr>';
html+='<tr><td>Gift card row</td><td>8px</td></tr>';
html+='<tr><td>Savings bar</td><td>12px 12px 0 0</td></tr>';
html+='</table></div></div>';
html+='<div class="card"><div class="card-title">Shadows</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Shadow</th></tr>';
html+='<tr><td>Icon container</td><td>0 0 3.6px rgba(0,0,0,0.08)</td></tr>';
html+='<tr><td>Savings bar</td><td>0 -2px 5px rgba(0,0,0,0.08)</td></tr>';
html+='<tr><td>Phone frame</td><td>0 4px 24px rgba(0,0,0,0.12)</td></tr>';
html+='</table></div></div>';
html+='</div>';

html+='</div>';

/* ══════════════════════════════════════════════════════════════
   2. COMPONENTS (kept from Instrument Components)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)">';
html+='<div class="hero-badge">🧩 Component Library</div>';
html+='<h1 class="hero-title">Components</h1>';
html+='<p class="hero-desc">Component specifications for PSP elements. Primary component: Instrument tiles used for all payment methods with radio button selection.</p>';
html+='</div>';
html+='<div class="note note-blue"><strong>⚡ Semi-Modernized PSP:</strong> Radio buttons are used for selection. Only the radio button is clickable, not the entire tile. Selected tiles show blue border + filled radio button.</div>';
html+='<div class="warn">\u26A0\uFE0F <b>BUTTONS:</b> Do not document buttons here. They come from master libraries (Tuxedo Mobile / RIO).</div>';
html+='<div class="note note-blue">Line 2 format changes based on instrument type: Cards show network + last 4 + name, UPI shows bank + last 4, Wallets show balance.</div>';
html+='<div class="card"><div class="card-title">State 1 \u2014 Transaction Ready (Default)</div><span class="state-label state-active">Active</span>';
html+='<div class="preview"><div style="width:100%;max-width:340px"><div style="background:#fff;border:0.55px solid #D5D9D9;border-radius:12px;padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;background:#FFF;box-shadow:0 0 3.6px rgba(0,0,0,0.08);border:0.5px solid #E7E7E7;display:flex;align-items:center;justify-content:center;font-size:9px;color:#888C8C;flex-shrink:0">ICON</div><div style="flex:1"><div style="font-size:16px;color:#0F1111">Instrument Name</div><div style="font-size:13px;color:#565959">NETWORK &#8226;&#8226;&#8226;&#8226;XXXX | Name</div><div style="font-size:13px;color:#0B7B3C;margin-top:2px">Save &#8377;XX as cashback. <span style="color:#2162A1">Details</span></div></div></div></div></div>';
html+='<div class="spec" onclick="copySpec(this)">border: 0.55px solid #D5D9D9 | radius: 12px | padding: 12px | bg: #FFFFFF</div></div>';
html+='<div class="card"><div class="card-title">State 2 \u2014 Selected</div><span class="state-label state-selected">Selected</span>';
html+='<div class="preview"><div style="width:100%;max-width:340px"><div style="background:#EDF8FF;border:1px solid #2162A1;border-radius:12px;padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;background:#FFF;box-shadow:0 0 3.6px rgba(0,0,0,0.08);border:0.5px solid #E7E7E7;display:flex;align-items:center;justify-content:center;font-size:9px;color:#888C8C;flex-shrink:0">ICON</div><div style="flex:1"><div style="font-size:16px;color:#0F1111">Instrument Name</div><div style="font-size:13px;color:#565959">NETWORK &#8226;&#8226;&#8226;&#8226;XXXX | Name</div><div style="font-size:13px;color:#0B7B3C;margin-top:2px">Save &#8377;XX as cashback. <span style="color:#2162A1">Details</span></div></div></div></div></div>';
html+='<div class="spec" onclick="copySpec(this)">bg: #EDF8FF | border: 1px solid #2162A1</div></div>';
html+='<div class="card"><div class="card-title">State 3 \u2014 Non-Transaction Ready</div><span class="state-label state-disabled">Disabled</span>';
html+='<div class="preview"><div style="width:100%;max-width:340px"><div style="background:#fff;border:0.55px solid #D5D9D9;border-radius:12px;padding:12px;display:flex;align-items:center;gap:10px;opacity:0.7"><div style="width:54px;height:36px;border-radius:5px;background:#FFF;box-shadow:0 0 3.6px rgba(0,0,0,0.08);border:0.5px solid #E7E7E7;display:flex;align-items:center;justify-content:center;font-size:9px;color:#888C8C;flex-shrink:0">ICON</div><div style="flex:1"><div style="font-size:16px;color:#0F1111">Instrument Name</div><div style="font-size:13px;color:#CC0C39">Card expired \u2014 <span style="color:#2162A1">Why?</span></div></div></div></div></div>';
html+='<div class="spec" onclick="copySpec(this)">opacity: 0.7 | Line 2: reason in #CC0C39</div></div>';
html+='<div class="card"><div class="card-title">Line 2 Format by Instrument Type</div><div class="tbl-wrap"><table class="tbl"><tr><th>Type</th><th>Format</th><th>Example</th></tr>';
html+='<tr><td>Credit/Debit Card</td><td>NETWORK \u2022\u2022\u2022\u2022XXXX | Name</td><td>VISA \u2022\u2022\u2022\u20220424 | Akshay</td></tr>';
html+='<tr><td>UPI</td><td>Bank Name \u2022\u2022\u2022\u2022XXXX</td><td>ICICI Bank \u2022\u2022\u2022\u20220911</td></tr>';
html+='<tr><td>Wallet / Balance</td><td>Balance: \u20B9XXX</td><td>Balance: \u20B960</td></tr>';
html+='<tr><td>Pay Later</td><td>Available credit: \u20B9XX,XXX</td><td>Available credit: \u20B9 60,000</td></tr>';
html+='<tr><td>COD</td><td>Descriptive text</td><td>Convenience fee of \u20B97 will apply</td></tr>';
html+='<tr><td>EMI / Net Banking</td><td>No Line 2</td><td>\u2014</td></tr>';
html+='</table></div></div>';
html+='<div class="card"><div class="card-title">Shared Tile Specs</div><div class="tbl-wrap"><table class="tbl"><tr><th>Property</th><th>Value</th></tr>';
html+='<tr><td>Icon container</td><td>54 \u00D7 36px, radius 5px, shadow 0 0 3.6px rgba(0,0,0,0.08)</td></tr>';
html+='<tr><td>Icon to text gap</td><td>10px</td></tr><tr><td>Tile padding</td><td>12px</td></tr>';
html+='<tr><td>Line 1 (Name)</td><td>16px / 400 / #0F1111</td></tr>';
html+='<tr><td>Line 2 (Detail)</td><td>13px / 400 / #565959</td></tr>';
html+='<tr><td>Line 3 (Offer)</td><td>13px / 400 / #0B7B3C</td></tr>';
html+='<tr><td><strong>Radio button size</strong></td><td>20 \\u00D7 20px</td></tr>';
html+='<tr><td>Radio border (default)</td><td>2px solid #D5D9D9</td></tr>';
html+='<tr><td>Radio border (selected)</td><td>2px solid #007185</td></tr>';
html+='<tr><td>Radio fill (selected)</td><td>#007185 with 8px white center dot</td></tr>';
html+='<tr><td>Radio position</td><td>12px from left, vertically centered</td></tr>';
html+='<tr><td>Selection method</td><td>Radio button only (not full tile)</td></tr>';
html+='</table></div></div>';
/* Selection Behavior DO/DON'T */
html+='<div class="card"><div class="card-title">Selection Behavior</div><div class="grid-2">';
html+='<div class="do"><strong>\\u2713 DO</strong><ul>';
html+='<li>Use radio buttons for single selection</li>';
html+='<li>Make only the radio button clickable</li>';
html+='<li>Highlight entire tile when radio is selected</li>';
html+='<li>Show visual feedback on radio button hover</li>';
html+='</ul></div>';
html+='<div class="dont"><strong>\u2717 DON\u2019T</strong><ul>';
html+='<li>Make the entire tile clickable</li>';
html+='<li>Hide or remove radio buttons</li>';
html+='<li>Use checkboxes (multi-select pattern)</li>';
html+='<li>Change radio button position per tile</li>';
html+='</ul></div></div></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   3. PATTERNS (merged Layout Patterns + Bottom Sticky CTA)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)">';
html+='<div class="hero-badge">📐 Layout & Structure</div>';
html+='<h1 class="hero-title">Patterns</h1>';
html+='<p class="hero-desc">Section grouping, spacing, visual hierarchy rules, and the bottom sticky CTA bar for the PSP page layout.</p>';
html+='</div>';
/* Section Anatomy */
html+='<div class="card"><div class="card-title">Section Anatomy</div>';
html+='<div class="preview"><div style="width:100%;max-width:340px;background:#fff;border-radius:12px;overflow:hidden;border:0.55px solid #D5D9D9">';
html+='<div style="padding:10px 16px;font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;border-bottom:1px solid #F0F2F2">SECTION HEADER</div>';
html+='<div style="padding:12px 16px;font-size:14px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;background:#E8E8E8;flex-shrink:0"></div>Instrument tile 1</div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px 16px;font-size:14px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;background:#E8E8E8;flex-shrink:0"></div>Instrument tile 2</div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px 16px;font-size:14px;color:#2162A1">+ Add new instrument</div>';
html+='</div></div>';
html+='<div class="spec" onclick="copySpec(this)">header: 13px/700 uppercase #565959 | card group: border 0.55px #D5D9D9 radius 12px | divider: 0.5px dashed #6F7373 inset 12px</div></div>';
/* Spacing Rules */
html+='<div class="card"><div class="card-title">Spacing Rules</div><div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Spec</th></tr>';
html+='<tr><td>Section divider</td><td>0.5px dashed #6F7373, inset 12px</td></tr>';
html+='<tr><td>Card group border</td><td>0.55px solid #D5D9D9, radius 12px</td></tr>';
html+='<tr><td>Section padding</td><td>8px 16px</td></tr>';
html+='<tr><td>Tile padding</td><td>12px</td></tr>';
html+='<tr><td>Icon size</td><td>54 x 36px, radius 5px</td></tr>';
html+='<tr><td>Page side padding</td><td>16px</td></tr>';
html+='</table></div></div>';
/* Section Order */
html+='<div class="card"><div class="card-title">Section Order (Fixed)</div><div style="font-size:13px;line-height:2.4;color:var(--body-color)">';
var sn=["Header & Address Bar","RECOMMENDED (up to 3 tiles)","UPI","CREDIT & DEBIT CARDS","MORE WAYS TO PAY","GIFT CARDS","Savings Bar","Sticky CTA Bar"];
for(var si=0;si<8;si++){html+='<div><span class="flow-num">'+(si+1)+'</span>'+sn[si]+'</div>';}
html+='</div><div class="note">Section order is fixed and must not change based on user history or A/B tests.</div></div>';
/* Badge Variants */
html+='<div class="card"><div class="card-title">Badge Variants</div><div class="preview" style="gap:12px">';
html+='<span style="background:#0A7CD1;color:#fff;font-size:10px;padding:2px 8px;border-radius:13px">Best offer</span>';
html+='<span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:2px 8px;border-radius:13px">Previously used</span>';
html+='<span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:2px 8px;border-radius:13px">Featured</span>';
html+='</div><div class="spec" onclick="copySpec(this)">font: 10px/400 | padding: 2px 8px | radius: 13px | left-offset: 66px</div></div>';
/* UPI Pill */
html+='<div class="card"><div class="card-title">UPI Bank Pill</div><div class="preview">';
html+='<div style="display:inline-flex;align-items:center;gap:6px;background:#FFF;border:0.46px solid #D5D9D9;border-radius:30px;padding:4px 8px"><img src="PSP Instument icons/ICICI Bank.png" style="width:13px;height:13px;border-radius:50%"><span style="font-size:13px;color:#565959">ICICI Bank &#8226;&#8226;&#8226;&#8226;0911</span></div>';
html+='</div><div class="spec" onclick="copySpec(this)">border: 0.46px solid #D5D9D9 | radius: 30px | padding: 4px 8px</div></div>';
/* CTA Bar (merged from Bottom Sticky CTA) */
html+='<div class="card"><div class="card-title">Bottom Sticky CTA Bar</div>';
html+='<div class="preview"><div style="width:100%;max-width:360px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 -2px 5px rgba(0,0,0,.08);border:1px solid #D5D9D9">';
html+='<div style="background:#E8FFF8;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0"><span style="font-size:14px;color:#0B7B3C;font-weight:700">&#8377;15 saved</span><span style="font-size:14px;color:#2162A1">See offers &rsaquo;</span></div>';
html+='<div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center"><div><span style="font-size:13px;font-weight:700">&#8377;</span><span style="font-size:22px;font-weight:700">504</span><div style="font-size:14px;color:#565959">Includes fees</div></div><div style="background:#FFD814;border-radius:92px;width:170px;height:47px;display:flex;align-items:center;justify-content:center"><span style="font-size:16px;color:#0F1111">Continue</span></div></div>';
html+='</div></div>';
html+='<div class="spec" onclick="copySpec(this)">position: fixed bottom:0 | savings-bar: bg #E8FFF8 radius 12px 12px 0 0 | action-bar: bg #FFFFFF</div></div>';
html+='<div class="grid-2">';
html+='<div class="card"><div class="card-title">Savings Bar</div><div class="tbl-wrap"><table class="tbl"><tr><th>Property</th><th>Value</th></tr>';
html+='<tr><td>Background</td><td>#E8FFF8</td></tr><tr><td>Border-radius</td><td>12px 12px 0 0</td></tr><tr><td>Savings text</td><td>14px/700 #0B7B3C</td></tr><tr><td>Link text</td><td>14px/400 #2162A1</td></tr>';
html+='</table></div></div>';
html+='<div class="card"><div class="card-title">Price &amp; CTA</div><div class="tbl-wrap"><table class="tbl"><tr><th>Property</th><th>Value</th></tr>';
html+='<tr><td>Price</td><td>22px/700 #0F1111</td></tr><tr><td>CTA bg</td><td>#FFD814</td></tr><tr><td>CTA radius</td><td>92px (pill)</td></tr><tr><td>CTA size</td><td>170 x 47px</td></tr>';
html+='</table></div></div>';
html+='</div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   4. STATES & BEHAVIOR (States Reference + Preselection + Grouping)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#fa709a 0%,#fee140 100%)">';
html+='<div class="hero-badge">⚡ Interactive Behavior</div>';
html+='<h1 class="hero-title">States & Behavior</h1>';
html+='<p class="hero-desc">All interactive states for instrument tiles, page-level elements, preselection logic, and grouping rules.</p>';
html+='</div>';
/* Tile States */
html+='<div class="card"><div class="card-title">Tile States Summary</div><div class="tbl-wrap"><table class="tbl"><tr><th>State</th><th>Background</th><th>Border</th><th>Radio Button</th><th>Opacity</th><th>Lines</th></tr>';
html+='<tr><td><span class="state-label state-active">Transaction Ready</span></td><td>#FFFFFF</td><td>1px solid #D5D9D9</td><td>Empty circle (2px #D5D9D9)</td><td>1.0</td><td>1, 2, 3</td></tr>';
html+='<tr><td><span class="state-label state-selected">Selected</span></td><td>#EDF8FF</td><td>2px solid #007185</td><td>Filled blue (#007185 + 8px white dot)</td><td>1.0</td><td>1, 2, 3</td></tr>';
html+='<tr><td><span class="state-label state-disabled">Non-Txn Ready</span></td><td>#FFFFFF</td><td>1px solid #D5D9D9</td><td>Disabled (gray, opacity 0.4)</td><td>0.6</td><td>1, 2 (reason)</td></tr>';
html+='</table></div></div>';
/* Badge States */
html+='<div class="card"><div class="card-title">Badge States</div><div class="tbl-wrap"><table class="tbl"><tr><th>Badge</th><th>Background</th><th>Text</th><th>Position</th></tr>';
html+='<tr><td>Best offer</td><td>#0A7CD1</td><td>#FFFFFF</td><td>66px left offset</td></tr>';
html+='<tr><td>Previously used</td><td>#E3E6E6</td><td>#232F3E</td><td>66px left offset</td></tr>';
html+='<tr><td>Featured</td><td>#E3E6E6</td><td>#232F3E</td><td>66px left offset</td></tr>';
html+='</table></div></div>';
/* Page-Level States */
html+='<div class="card"><div class="card-title">Page-Level States</div><div class="tbl-wrap"><table class="tbl"><tr><th>State</th><th>Behaviour</th></tr>';
html+='<tr><td>Loading</td><td>Skeleton shimmer on all tiles; CTA disabled</td></tr>';
html+='<tr><td>Empty</td><td>Full-page error with retry CTA</td></tr>';
html+='<tr><td>Single instrument</td><td>Auto-selected; skip selection if possible</td></tr>';
html+='<tr><td>Offer applied</td><td>Savings bar visible; selected tile shows green offer text</td></tr>';
html+='<tr><td>Scroll</td><td>Header + tabs sticky; CTA bar fixed at bottom</td></tr>';
html+='</table></div></div>';
/* Preselection Logic (moved from Mental Model) */
html+='<div class="card"><div class="card-title">Preselection Logic</div><div style="font-size:13px;line-height:2.2;color:var(--body-color)">';
html+='<div><span class="flow-num">IF</span> <b>Best Offer</b> instrument exists \u2192 Auto-select it</div>';
html+='<div><span class="flow-num" style="background:#565959">ELIF</span> <b>Previously Used</b> instrument exists \u2192 Auto-select it</div>';
html+='<div><span class="flow-num" style="background:#565959">ELIF</span> Only <b>one instrument</b> available \u2192 Auto-select it</div>';
html+='<div><span class="flow-num" style="background:#888C8C">ELSE</span> No preselection \u2014 user must choose</div>';
html+='</div></div>';
/* Grouping Rules (moved from Mental Model) */
html+='<div class="card"><div class="card-title">Grouping Rules</div><div class="grid-2">';
html+='<div class="do"><strong>\u2713 How it works</strong><ul><li>Recommended instruments are pulled from native categories</li><li>Native categories remain visible</li><li>Max 3 instruments in Recommended section</li></ul></div>';
html+='<div class="dont"><strong>\u2717 Common mistakes</strong><ul><li>Showing more than 3 recommended instruments</li><li>Hiding native category when instrument is in Recommended</li><li>Changing section order based on user history</li></ul></div>';
html+='</div></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   5. CONTENT GUIDELINES (renamed from Character Constraints)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)">';
html+='<div class="hero-badge">✏️ Content & Copy</div>';
html+='<h1 class="hero-title">Content Guidelines</h1>';
html+='<p class="hero-desc">Maximum character limits for all text elements in the PSP. Exceeding these limits will cause truncation with ellipsis.</p>';
html+='</div>';
html+='<div class="card"><div class="card-title">Instrument Tile Text</div><div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Max</th><th>Font</th><th>Notes</th></tr>';
html+='<tr><td>Line 1 \u2014 Name</td><td>32</td><td>16px Regular #0F1111</td><td>e.g. \u201CAmazon Pay ICICI credit card\u201D</td></tr>';
html+='<tr><td>Line 2 \u2014 Card</td><td>36</td><td>13px Regular #565959</td><td>NETWORK \u2022\u2022\u2022\u2022XXXX | Name</td></tr>';
html+='<tr><td>Line 2 \u2014 UPI</td><td>28</td><td>13px Regular #565959</td><td>Bank Name \u2022\u2022\u2022\u2022XXXX</td></tr>';
html+='<tr><td>Line 2 \u2014 Wallet</td><td>28</td><td>13px Regular #565959</td><td>Balance: \u20B9XXX</td></tr>';
html+='<tr><td>Line 3 \u2014 Offer</td><td>40</td><td>13px Regular #0B7B3C</td><td>\u201CSave \u20B9XX as cashback. Details\u201D</td></tr>';
html+='<tr><td>Non-txn reason</td><td>36</td><td>13px Regular #CC0C39</td><td>e.g. \u201CCard expired\u201D</td></tr>';
html+='</table></div></div>';
html+='<div class="card"><div class="card-title">Badges &amp; Headers</div><div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Max</th><th>Font</th><th>Notes</th></tr>';
html+='<tr><td>Badge text</td><td>16</td><td>11px Bold</td><td>\u201CBest offer\u201D, \u201CPreviously used\u201D</td></tr>';
html+='<tr><td>Section header</td><td>24</td><td>13px Bold uppercase #565959</td><td>\u201CRECOMMENDED\u201D</td></tr>';
html+='<tr><td>Bank pill text</td><td>24</td><td>13px Regular #565959</td><td>\u201CICICI Bank \u2022\u2022\u2022\u20220911\u201D</td></tr>';
html+='<tr><td>CTA button</td><td>14</td><td>16px Regular #0F1111</td><td>\u201CContinue\u201D, \u201CPay Now\u201D</td></tr>';
html+='<tr><td>Savings text</td><td>20</td><td>14px Bold #0B7B3C</td><td>\u201C\u20B915 saved\u201D</td></tr>';
html+='<tr><td>Address name</td><td>20</td><td>13px Bold #0F1111</td><td>\u201CDeliver to Akshay\u201D</td></tr>';
html+='<tr><td>Address detail</td><td>40</td><td>13px Regular #0F1111</td><td>\u201CBengaluru 560001\u201D</td></tr>';
html+='</table></div></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   6. MENTAL MODEL & HIERARCHY (wireframe only, no preselection/grouping)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)">';
html+='<div class="hero-badge">🧠 User Journey</div>';
html+='<h1 class="hero-title">Mental Model & Hierarchy</h1>';
html+='<p class="hero-desc">The PSP follows a specific hierarchy to optimise conversion and user experience. The wireframe below maps every numbered zone to its purpose and spec.</p>';
html+='</div>';
html+='<div class="mm-grid" style="display:grid;grid-template-columns:200px 1fr 220px;gap:20px;align-items:start;margin-bottom:32px;position:relative">';
html+='<div class="mm-left" style="padding-top:8px">';
html+='<div class="ann" style="margin-top:0"><span class="flow-num">1</span><div class="ann-body"><strong>Header &amp; Navigation</strong><span>Teal gradient bar with back arrow and page title.</span></div></div>';
html+='<div class="ann"><span class="flow-num">2</span><div class="ann-body"><strong>Address Bar</strong><span>Delivery address summary with Change link.</span></div></div>';
html+='<div class="ann"><span class="flow-num">3</span><div class="ann-body"><strong>Recommended Section</strong><span>Up to 3 instruments: Best Offer, Previously Used, Featured.</span></div></div>';
html+='<div class="ann"><span class="flow-num">4</span><div class="ann-body"><strong>UPI Section</strong><span>Linked UPI accounts and add-account link.</span></div></div>';
html+='<div class="ann"><span class="flow-num">5</span><div class="ann-body"><strong>Cards Section</strong><span>Saved credit &amp; debit cards with add-new link.</span></div></div>';
html+='<div class="ann"><span class="flow-num">6</span><div class="ann-body"><strong>More Ways to Pay</strong><span>Balance, Pay Later, COD, EMI, Net Banking.</span></div></div>';
html+='<div class="ann"><span class="flow-num">7</span><div class="ann-body"><strong>Gift Card Row</strong><span>Add Gift Card or Promo Code entry point.</span></div></div>';
html+='<div class="ann"><span class="flow-num">8</span><div class="ann-body"><strong>Sticky CTA Bar</strong><span>Savings influencer + price + Continue button.</span></div></div>';
html+='</div>';
html+='<div style="position:relative;max-width:360px;margin:0 auto">';
html+='<div id="phoneFrame" style="width:100%;max-width:360px;border-radius:30px;background:#F7FAFA;border:0.5px solid #989898;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.12)">';
html+='<div style="background:linear-gradient(135deg,#82D8E3,#A6E7CE);padding:14px 16px;display:flex;align-items:center;gap:10px"><span style="font-size:18px;color:#000">&larr;</span><span style="font-size:16px;color:#0F1111">Select a Payment Method</span></div>';
html+='<div style="padding:10px 16px;background:#F7FEFF;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #E5E5E5"><div style="display:flex;align-items:flex-start;gap:6px"><span style="font-size:14px;margin-top:1px">&#128205;</span><div><span style="font-size:13px;font-weight:700;color:#0F1111">Deliver to Akshay</span><div style="font-size:13px;color:#0F1111">Bengaluru 560001, Karnataka</div></div></div><span style="font-size:13px;color:#007185;flex-shrink:0">Change</span></div>';
html+='<div style="padding:12px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">RECOMMENDED</div>';
html+='<div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:12px">';
html+='<div style="background:#EDF8FF;border:2px solid #007185;border-radius:12px 12px 0 0;padding:12px;padding-left:40px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#007185" stroke-width="2"/><circle cx="10" cy="10" r="5" fill="#007185"/></svg><div style="padding-left:0;margin-bottom:4px"><span style="background:#0A7CD1;color:#fff;font-size:10px;padding:2px 8px;border-radius:13px;display:inline-block">Best offer</span></div><div style="display:flex;align-items:center;gap:10px"><div style="flex:1;min-width:0"><div style="font-size:14px;color:#0F1111">Amazon Pay ICICI credit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;&#8226;&#8226;0424 | Akshay</div><div style="font-size:12px;color:#0B7B3C">Save &#8377;10 as cashback. <span style="color:#2162A1">Details</span></div></div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/App + 3P.png" style="width:100%;height:100%;object-fit:contain"></div></div></div>';
html+='<div style="padding:12px;padding-left:40px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="padding-left:0;margin-bottom:4px"><span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:2px 8px;border-radius:13px;display:inline-block">Previously used</span></div><div style="display:flex;align-items:center;gap:10px"><div style="flex:1;min-width:0"><div style="font-size:14px;color:#0F1111">HDFC credit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;&#8226;&#8226;0422 | Akshay</div></div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/HDFC credit card.png" style="width:100%;height:100%;object-fit:contain"></div></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;padding-left:40px;border-radius:0 0 12px 12px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="padding-left:0;margin-bottom:4px"><span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:2px 8px;border-radius:13px;display:inline-block">Featured</span></div><div style="display:flex;align-items:center;gap:10px"><div style="flex:1;min-width:0"><div style="font-size:14px;color:#0F1111">Amazon Pay UPI</div><div style="display:inline-flex;align-items:center;gap:6px;background:#FFF;border:0.46px solid #D5D9D9;border-radius:30px;padding:4px 8px;margin-top:4px"><img src="PSP Instument icons/ICICI Bank.png" style="width:13px;height:13px;border-radius:50%"><span style="font-size:12px;color:#565959">ICICI Bank &#8226;&#8226;&#8226;&#8226;0911</span></div></div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Amazon Pay UPI.png" style="width:100%;height:100%;object-fit:contain"></div></div></div>';
html+='</div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">UPI</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px"><div style="padding:12px;padding-left:40px;display:flex;align-items:center;gap:10px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="flex:1;font-size:14px;color:#0F1111">Pay by any UPI App</div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Pay by any UPI App.png" style="width:100%;height:100%;object-fit:contain"></div></div><div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div><div style="padding:12px"><span style="font-size:14px;color:#2162A1">+ Add account to Amazon Pay UPI</span></div></div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">CREDIT &amp; DEBIT CARDS</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px"><div style="padding:12px;padding-left:40px;display:flex;align-items:center;gap:10px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="flex:1;min-width:0"><div style="font-size:14px;color:#0F1111">HDFC debit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;0333 | Akshay</div></div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/HDFC credit card.png" style="width:100%;height:100%;object-fit:contain"></div></div><div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div><div style="padding:12px"><span style="font-size:14px;color:#2162A1">+ Add new credit or debit card</span></div></div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">MORE WAYS TO PAY</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px">';
html+='<div style="padding:12px;padding-left:40px;display:flex;align-items:flex-start;gap:10px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:16px"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="flex:1;min-width:0"><div style="font-size:16px;color:#0F1111;line-height:20px">Amazon Pay Balance: &#8377;60</div><div style="display:flex;align-items:center;gap:8px;margin-top:2px"><span style="font-size:11.5px;color:#565959;white-space:nowrap">Add &#8377;413.00 to proceed</span><div style="background:#FFF;border:1px solid #888C8C;border-radius:61px;padding:1px 10px;font-size:11.5px;color:#0F1111;white-space:nowrap;flex-shrink:0;line-height:22px">Add Now &rsaquo;</div></div></div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Amazon Pay Balance.png" style="width:100%;height:100%;object-fit:contain"></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;padding-left:40px;display:flex;align-items:center;gap:10px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="flex:1"><div style="font-size:14px;color:#0F1111">Amazon Pay Later</div><div style="font-size:12px;color:#565959">Available credit: &#8377; 60,000</div></div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Amazon Pay Later.png" style="width:100%;height:100%;object-fit:contain"></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;padding-left:40px;display:flex;align-items:center;gap:10px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="flex:1"><div style="font-size:14px;color:#0F1111">Cash on Delivery/Pay on Delivery</div><div style="font-size:12px;color:#565959">Convenience fee of &#8377;7 will apply</div></div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Cash on delivery.png" style="width:100%;height:100%;object-fit:contain"></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;padding-left:40px;display:flex;align-items:center;gap:10px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="flex:1;font-size:14px;color:#0F1111">EMI</div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/EMI.png" style="width:100%;height:100%;object-fit:contain"></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;padding-left:40px;display:flex;align-items:center;gap:10px;position:relative"><svg width="20" height="20" style="position:absolute;left:12px;top:50%;transform:translateY(-50%)"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg><div style="flex:1;font-size:14px;color:#0F1111">Net Banking</div><div style="width:32px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Netbanking.png" style="width:100%;height:100%;object-fit:contain"></div></div>';
html+='</div></div>';
html+='<div style="padding:8px 16px"><div style="background:#FFF;border:0.5px solid #D5D9D9;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;color:#2162A1">Add Gift Card or Promo Code</span><span style="color:#2162A1">&rsaquo;</span></div></div>';
html+='<div><div style="background:#E8FFF8;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;border-top:1px solid #E6E6E6;box-shadow:0 -2px 5px rgba(0,0,0,0.08)"><span style="font-size:14px;color:#0B7B3C;font-weight:700">&#8377;15 saved</span><span style="font-size:14px;color:#2162A1">See offers &rsaquo;</span></div>';
html+='<div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center;background:#FFF"><div><span style="font-size:13px;font-weight:700">&#8377;</span><span style="font-size:22px;font-weight:700">504</span><div style="font-size:14px;color:#565959">Includes fees</div></div><div style="background:#FFD814;border-radius:92px;width:170px;height:47px;display:flex;align-items:center;justify-content:center"><span style="font-size:16px;color:#0F1111">Continue</span></div></div></div>';
html+='</div>';
html+='</div>';
html+='<div class="mm-right" style="padding-top:8px">';
html+='<div class="callout" style="border-left-color:#82D8E3"><strong>Header</strong>gradient: 135deg #82D8E3 \u2192 #A6E7CE<br>title: 16px Regular #0F1111</div>';
html+='<div class="callout" style="border-left-color:#007185"><strong>Address Bar</strong>bg: #F7FEFF<br>name: 13px Bold #0F1111<br>Change: 13px #007185</div>';
html+='<div class="callout" style="border-left-color:#0A7CD1"><strong>Selected Tile</strong>bg: #EDF8FF<br>border: 2px solid #007185<br>icon: 54\u00D736px, radius 5px</div>';
html+='<div class="callout" style="border-left-color:#E3E6E6"><strong>Badges</strong>Best offer: bg #0A7CD1, text #FFF<br>Previously used: bg #E3E6E6<br>Featured: bg #E3E6E6</div>';
html+='<div class="callout" style="border-left-color:#FFD814"><strong>CTA Button</strong>bg: #FFD814, radius: 92px<br>size: 170\u00D747px<br>text: 16px Regular #0F1111</div>';
html+='<div class="callout" style="border-left-color:#0B7B3C"><strong>Savings Bar</strong>bg: #E8FFF8<br>radius: 12px 12px 0 0<br>text: 14px Bold #0B7B3C</div>';
html+='</div>';
html+='</div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   7. DEVELOPER HANDOFF (Raw JSON - kept as is)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#89f7fe 0%,#66a6ff 100%)">';
html+='<div class="hero-badge">{} Development Ready</div>';
html+='<h1 class="hero-title">Developer Handoff</h1>';
html+='<p class="hero-desc">Design tokens and component specs exported as JSON for developer handoff. Copy the JSON below to integrate with your development environment.</p>';
html+='</div>';
html+='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div class="card-title" style="margin-bottom:0">design-tokens.json</div><div style="font-size:12px;color:var(--sidebar-accent);font-weight:600;cursor:pointer;padding:4px 12px;border-radius:6px;background:rgba(130,216,227,.1)" onclick="copyJSON()">Copy JSON</div></div>';
html+='<pre style="background:#1B2836;color:#A6E7CE;padding:20px;border-radius:10px;font-size:12px;font-family:SF Mono,Menlo,Consolas,monospace;overflow-x:auto;max-height:500px;line-height:1.7" id="jsonPre"></pre></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   8. BASELINE CX (kept as is)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)">';
html+='<div class="hero-badge">⭐ Reference Design</div>';
html+='<h1 class="hero-title">Baseline CX</h1>';
html+='<p class="hero-desc">Current baseline customer experience for Service and Pay. Click the cover below to open the full Figma design file.</p>';
html+='</div>';
html+='<a class="bcx-hero" href="https://www.figma.com/design/N6ojbzlM3tRsXj5X4cJkkX/Service-and-Pay?node-id=1-51546&t=QS59MWp88L06WKDD-1" target="_blank" rel="noopener noreferrer">';
html+='<div class="bcx-badge">Amazon Internal Only</div>';
html+='<div class="bcx-hero-inner">';
html+='<div class="bcx-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#1B2836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>';
html+='<div class="bcx-title">Service and Pay</div>';
html+='<div class="bcx-sub">Baseline CX design file covering the current customer experience flows for Service and Pay.</div>';
html+='<div class="bcx-cta">Open in Figma <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></div>';
html+='</div></a>';
html+='<div class="note" style="margin-top:24px">\u26A0\uFE0F This Figma file is restricted to Amazon employees. Do not share the link externally.</div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   9. DECISION FRAMEWORK
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="hero" style="background:linear-gradient(135deg,#e0c3fc 0%,#8ec5fc 100%)">';
html+='<div class="hero-badge">🎯 Logic & Rules</div>';
html+='<h1 class="hero-title">Decision Framework</h1>';
html+='<p class="hero-desc">Intelligence layer that governs payment method prioritization, preselection logic, and personalization rules. This framework ensures consistent user experience across 90+ touchpoints.</p>';
html+='</div>';

/* Card 1: Payment Prioritization Engine */
html+='<div class="card"><div style="height:100px;background:linear-gradient(135deg,#e9f3ff 0%,#c8dff8 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--cs-border)"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="8" y="6" width="40" height="10" rx="3" stroke="#0972d3" stroke-width="2"/><rect x="14" y="22" width="28" height="10" rx="3" stroke="#0972d3" stroke-width="2"/><rect x="20" y="38" width="16" height="10" rx="3" stroke="#0972d3" stroke-width="2"/><path d="M28 16v6M28 32v6" stroke="#0972d3" stroke-width="2" stroke-linecap="round"/></svg></div>';
html+='<div class="card-title">Payment Prioritization Engine</div><div style="padding:0 24px 24px">';

/* Flowchart */
html+='<div style="display:flex;flex-direction:column;align-items:center;gap:0;margin-bottom:24px">';
html+='<div style="background:var(--cs-accent);color:#fff;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;text-align:center">User enters PSP</div>';
html+='<div style="width:2px;height:20px;background:var(--cs-border)"></div>';

html+='<div style="background:var(--cs-accent-light);border:1px solid #89bdee;padding:12px 20px;border-radius:10px;font-size:13px;text-align:center;max-width:400px;width:100%"><span class="flow-num">1</span> Has active offer on any instrument?</div>';
html+='<div style="display:flex;gap:40px;align-items:flex-start;margin:8px 0">';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:var(--cs-success);margin-bottom:4px">YES</div><div style="background:var(--cs-success-bg);border:1px solid #29ad32;padding:8px 16px;border-radius:8px;font-size:12px;color:var(--cs-success);font-weight:600">Select Best Offer</div></div>';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:var(--cs-text-secondary);margin-bottom:4px">NO</div><div style="font-size:11px;color:var(--cs-text-secondary)">&#8595;</div></div>';
html+='</div>';

html+='<div style="background:var(--cs-accent-light);border:1px solid #89bdee;padding:12px 20px;border-radius:10px;font-size:13px;text-align:center;max-width:400px;width:100%"><span class="flow-num">2</span> Amazon Pay Balance \u2265 order total?</div>';
html+='<div style="display:flex;gap:40px;align-items:flex-start;margin:8px 0">';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:var(--cs-success);margin-bottom:4px">YES</div><div style="background:var(--cs-success-bg);border:1px solid #29ad32;padding:8px 16px;border-radius:8px;font-size:12px;color:var(--cs-success);font-weight:600">Select APB</div></div>';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:var(--cs-text-secondary);margin-bottom:4px">NO</div><div style="font-size:11px;color:var(--cs-text-secondary)">&#8595;</div></div>';
html+='</div>';

html+='<div style="background:var(--cs-accent-light);border:1px solid #89bdee;padding:12px 20px;border-radius:10px;font-size:13px;text-align:center;max-width:400px;width:100%"><span class="flow-num">3</span> Has previously successful payment?</div>';
html+='<div style="display:flex;gap:40px;align-items:flex-start;margin:8px 0">';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:var(--cs-success);margin-bottom:4px">YES</div><div style="background:var(--cs-success-bg);border:1px solid #29ad32;padding:8px 16px;border-radius:8px;font-size:12px;color:var(--cs-success);font-weight:600">Select Previously Used</div></div>';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:var(--cs-text-secondary);margin-bottom:4px">NO</div><div style="font-size:11px;color:var(--cs-text-secondary)">&#8595;</div></div>';
html+='</div>';

html+='<div style="background:var(--cs-accent-light);border:1px solid #89bdee;padding:12px 20px;border-radius:10px;font-size:13px;text-align:center;max-width:400px;width:100%"><span class="flow-num">4</span> Only one instrument available?</div>';
html+='<div style="display:flex;gap:40px;align-items:flex-start;margin:8px 0">';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:var(--cs-success);margin-bottom:4px">YES</div><div style="background:var(--cs-success-bg);border:1px solid #29ad32;padding:8px 16px;border-radius:8px;font-size:12px;color:var(--cs-success);font-weight:600">Auto-select</div></div>';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:var(--cs-text-secondary);margin-bottom:4px">NO</div><div style="background:var(--cs-warning-bg);border:1px solid #d4a00e;padding:8px 16px;border-radius:8px;font-size:12px;color:var(--cs-warning);font-weight:600">Show Featured, no preselection</div></div>';
html+='</div>';
html+='</div>';

/* Priority Table */
html+='<div class="tbl-wrap" style="margin:0 0 16px"><table class="tbl"><tr><th>Priority</th><th>Condition</th><th>Action</th></tr>';
html+='<tr><td><span class="flow-num">1</span></td><td>Best Offer exists</td><td>Preselect + show blue badge</td></tr>';
html+='<tr><td><span class="flow-num">2</span></td><td>APB \u2265 order total</td><td>Preselect + show balance</td></tr>';
html+='<tr><td><span class="flow-num">3</span></td><td>Previous success within 30 days</td><td>Preselect + show \u201CPreviously used\u201D badge</td></tr>';
html+='<tr><td><span class="flow-num">4</span></td><td>Single instrument only</td><td>Auto-select</td></tr>';
html+='<tr><td><span class="flow-num" style="background:var(--cs-text-secondary)">5</span></td><td>Multiple instruments, no priority match</td><td>Show Featured, no preselection</td></tr>';
html+='</table></div>';
html+='</div></div>';

/* Card 2: Enhanced Preselection Rules */
html+='<div class="card"><div style="height:100px;background:linear-gradient(135deg,#f2fcf3 0%,#c8ecc9 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--cs-border)"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="18" stroke="#037f0c" stroke-width="2" fill="none"/><path d="M20 28l6 6 12-12" stroke="#037f0c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
html+='<div class="card-title">Enhanced Preselection Rules</div><div style="padding:0 24px 24px">';

var scenarios=[
  ['Best Offer Wins','Instrument has cashback/discount','Always preselect, even if not previously used','Best offer (blue)','Card with \u20B910 cashback vs previously used UPI'],
  ['APB Fast Path','Balance \u2265 order total + no Best Offer','Preselect APB for instant checkout','Show \u201CAdd Now\u201D if balance insufficient','User has \u20B9500 APB, order is \u20B9450'],
  ['Trust Through Familiarity','Previously used successfully + no offer','Preselect last successful payment (within 30 days)','Previously used (gray)','Last used HDFC credit card 5 days ago'],
  ['Featured Recommendation','New user or no previous success','Highlight featured instrument, no preselection','Featured (gray)','Based on merchant success rates'],
  ['Single Option Auto-Select','Only one transaction-ready instrument','Auto-select + auto-advance (skip selection)','\u2014','Single linked card, no other options']
];
scenarios.forEach(function(s,i){
  html+='<div style="background:var(--cs-bg-alt);border:1px solid var(--cs-border);border-radius:10px;padding:16px;margin-bottom:12px">';
  html+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span class="flow-num">'+(i+1)+'</span><span style="font-size:14px;font-weight:700;color:var(--cs-text-primary)">'+s[0]+'</span></div>';
  html+='<div style="display:grid;grid-template-columns:100px 1fr;gap:4px 12px;font-size:13px;color:var(--cs-text-primary)">';
  html+='<span style="font-weight:600;color:var(--cs-text-secondary)">Condition</span><span>'+s[1]+'</span>';
  html+='<span style="font-weight:600;color:var(--cs-text-secondary)">Behavior</span><span>'+s[2]+'</span>';
  html+='<span style="font-weight:600;color:var(--cs-text-secondary)">Badge</span><span>'+s[3]+'</span>';
  html+='<span style="font-weight:600;color:var(--cs-text-secondary)">Example</span><span>'+s[4]+'</span>';
  html+='</div></div>';
});
html+='</div></div>';

/* Card 3: Personalization Matrix */
html+='<div class="card"><div style="height:100px;background:linear-gradient(135deg,#f5f0ff 0%,#ddd0f7 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--cs-border)"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="8" y="8" width="18" height="18" rx="3" stroke="#7b2ff2" stroke-width="2"/><rect x="30" y="8" width="18" height="18" rx="3" stroke="#7b2ff2" stroke-width="2"/><rect x="8" y="30" width="18" height="18" rx="3" stroke="#7b2ff2" stroke-width="2"/><rect x="30" y="30" width="18" height="18" rx="3" stroke="#7b2ff2" stroke-width="2"/><circle cx="17" cy="17" r="4" fill="#7b2ff2" opacity=".2"/><circle cx="39" cy="17" r="4" fill="#7b2ff2" opacity=".4"/><circle cx="17" cy="39" r="4" fill="#7b2ff2" opacity=".3"/><circle cx="39" cy="39" r="4" fill="#7b2ff2" opacity=".5"/></svg></div>';
html+='<div class="card-title">Personalization Matrix</div><div style="padding:0 24px 24px">';

html+='<div style="font-size:14px;font-weight:600;color:var(--cs-text-primary);margin-bottom:12px">User Type Behavior</div>';
html+='<div class="tbl-wrap" style="margin:0 0 24px"><table class="tbl"><tr><th>Attribute</th><th>First Time</th><th>Returning (1\u20135 orders)</th><th>Power User (5+)</th></tr>';
html+='<tr><td style="font-weight:600">Preselection</td><td>Featured only</td><td>Previously used if exists</td><td>Previously used prioritized</td></tr>';
html+='<tr><td style="font-weight:600">Offer Visibility</td><td>Prominent badges</td><td>Inline text</td><td>Collapsed until relevant</td></tr>';
html+='<tr><td style="font-weight:600">Option Count</td><td>Show 3\u20135 methods</td><td>Show all saved</td><td>Prioritize top 3, collapse rest</td></tr>';
html+='<tr><td style="font-weight:600">Help Text</td><td>More guidance</td><td>Minimal</td><td>None</td></tr>';
html+='</table></div>';

html+='<div style="font-size:14px;font-weight:600;color:var(--cs-text-primary);margin-bottom:12px">Context Factors</div>';
html+='<div class="tbl-wrap" style="margin:0 0 16px"><table class="tbl"><tr><th>Context</th><th>Behavior Change</th></tr>';
html+='<tr><td>Low order value (&lt;\u20B9500)</td><td>Prioritize UPI/APB (low friction)</td></tr>';
html+='<tr><td>High order value (&gt;\u20B95,000)</td><td>Show credit cards first (reward points)</td></tr>';
html+='<tr><td>First order on merchant</td><td>Extra trust signals</td></tr>';
html+='<tr><td>Returning customer</td><td>Fast path, fewer confirmations</td></tr>';
html+='<tr><td>Mobile device</td><td>Optimize for fewer taps</td></tr>';
html+='<tr><td>High-success merchant</td><td>Reduce options, faster flow</td></tr>';
html+='<tr><td>Low-success merchant</td><td>Show alternatives upfront</td></tr>';
html+='</table></div>';
html+='</div></div>';

/* Card 4: Success-Rate Optimization */
html+='<div class="card"><div style="height:100px;background:linear-gradient(135deg,#fff3e0 0%,#ffe0b2 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--cs-border)"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M12 40L20 28L28 34L36 18L44 24" stroke="#e65100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="44" cy="24" r="4" fill="#e65100" opacity=".3"/><path d="M40 16l4 8 4-2" stroke="#e65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
html+='<div class="card-title">Success-Rate Optimization</div><div style="padding:0 24px 24px">';

html+='<div class="grid-2" style="margin-bottom:20px">';
html+='<div class="do"><strong>\u2713 When to REDUCE options</strong><ul>';
html+='<li>User has previously successful payment \u2192 Hide low-success methods</li>';
html+='<li>Single best option exists (Best Offer) \u2192 Collapse other sections</li>';
html+='<li>High-intent user (returning, fast checkout) \u2192 Show top 3 only</li>';
html+='<li>Mobile context + high-success instrument \u2192 Minimize scrolling</li>';
html+='</ul></div>';
html+='<div class="dont"><strong>\u2717 When to EXPAND choices</strong><ul>';
html+='<li>Payment failure occurred \u2192 Show alternative methods immediately</li>';
html+='<li>New user with no history \u2192 Display full range for discovery</li>';
html+='<li>Insufficient balance scenarios \u2192 Prompt with alternatives</li>';
html+='<li>Low-confidence predictions \u2192 Let user decide</li>';
html+='</ul></div>';
html+='</div>';

html+='<div style="font-size:14px;font-weight:600;color:var(--cs-text-primary);margin-bottom:12px">Smart Fallback Logic</div>';
html+='<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:8px">';
var fallbacks=[
  ['Best Offer fails','Auto-suggest Previously Used'],
  ['Previously Used fails','Auto-suggest Featured UPI'],
  ['All saved methods unavailable','Prompt to add new card'],
  ['Persistent failures','Escalate to manual entry (Net Banking, COD)']
];
fallbacks.forEach(function(f,i){
  html+='<div style="display:flex;align-items:center;gap:12px;background:var(--cs-bg-alt);border:1px solid var(--cs-border);border-radius:8px;padding:10px 14px">';
  html+='<span class="flow-num" style="background:'+(i<2?'var(--cs-accent)':i===2?'var(--cs-warning)':'var(--cs-error)')+'">'+String.fromCharCode(65+i)+'</span>';
  html+='<div style="font-size:13px"><span style="color:var(--cs-text-secondary)">IF </span><span style="font-weight:600">'+f[0]+'</span><span style="color:var(--cs-text-secondary)"> \u2192 </span><span style="color:var(--cs-accent);font-weight:600">'+f[1]+'</span></div>';
  html+='</div>';
});
html+='</div>';
html+='</div></div>';

html+='</div>';

/* ── Inject HTML ── */
contentEl.innerHTML = html;

/* ── Fill JSON ── */
var jsonData = {
  designTokens:{colors:{bgPage:'#F7FAFA',bgCard:'#FFFFFF',textPrimary:'#0F1111',textSecondary:'#565959',textLink:'#2162A1',textSuccess:'#0B7B3C',borderCard:'#D5D9D9',badgeBlue:'#0A7CD1',ctaYellow:'#FFD814',selectedBg:'#EDF8FF',selectedBorder:'#007185',radioButton:'#007185',errorRed:'#CC0C39',headerGradientStart:'#82D8E3',headerGradientEnd:'#A6E7CE',savingsBarBg:'#E8FFF8',addressBg:'#F7FEFF',badgeGrayBg:'#E3E6E6',badgeGrayText:'#232F3E',dividerDash:'#6F7373'},spacing:{pagePadding:'16px',tilePadding:'12px',iconTextGap:'10px',badgeLeftOffset:'66px',dividerInset:'12px'},radii:{cardGroup:'12px',tile:'12px',icon:'5px',badge:'13px',cta:'92px',bankPill:'30px'},sizes:{icon:'54x36px',cta:'170x47px',bankLogoCircle:'13px'},radioButton:{size:'20px',borderDefault:'2px solid #D5D9D9',borderSelected:'2px solid #007185',fillSelected:'#007185',dotSize:'8px',dotColor:'#FFFFFF',position:'12px left, centered vertical'}},
  tileStates:{transactionReady:{bg:'#FFFFFF',border:'1px solid #D5D9D9',radioButton:'empty circle',opacity:1},selected:{bg:'#EDF8FF',border:'2px solid #007185',radioButton:'filled blue with white dot',opacity:1},nonTransactionReady:{bg:'#FFFFFF',border:'1px solid #D5D9D9',radioButton:'disabled gray',opacity:0.6}},
  badges:{bestOffer:{bg:'#0A7CD1',text:'#FFFFFF'},previouslyUsed:{bg:'#E3E6E6',text:'#232F3E'},featured:{bg:'#E3E6E6',text:'#232F3E'}},
  charLimits:{instrumentName:32,cardDetails:36,upiDetails:28,offerText:40,badgeText:16,sectionHeader:24,ctaText:14,savingsText:20,addressName:20,addressDetail:40}
};
var pre=document.getElementById('jsonPre');
if(pre) pre.textContent=JSON.stringify(jsonData,null,2);
}

function copyJSON(){
  var pre=document.getElementById('jsonPre');
  if(pre) navigator.clipboard.writeText(pre.textContent).then(function(){toast('JSON copied to clipboard')});
}

buildSections();
