/* ── Build All Sections ── */
function buildSections(){
var html='';

/* ══════════════════════════════════════════════════════════════
   0. GETTING STARTED
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec active">';
html+='<div class="page-title">PSP Design System</div>';
html+='<div class="page-desc">Component specifications, layout patterns, and interaction guidelines for the Payment Selection Page (PSP) in Amazon Pay checkout flows.</div>';

html+='<div class="stats-grid">';
html+='<div class="stat-card"><div class="stat-num">3</div><div class="stat-label">Tile States</div></div>';
html+='<div class="stat-card"><div class="stat-num">8</div><div class="stat-label">Page Sections</div></div>';
html+='<div class="stat-card"><div class="stat-num">3</div><div class="stat-label">Badge Types</div></div>';
html+='<div class="stat-card"><div class="stat-num">16</div><div class="stat-label">Color Tokens</div></div>';
html+='<div class="stat-card"><div class="stat-num">13</div><div class="stat-label">Char Limits</div></div>';
html+='<div class="stat-card"><div class="stat-num">5</div><div class="stat-label">Page States</div></div>';
html+='</div>';

html+='<div class="grid-2">';
html+='<div class="card"><div class="card-title">When to use</div>';
html+='<div class="do"><strong>\u2713 Paycheckout Context</strong><ul><li>PSP is rendered inside Paycheckout webview</li><li>Use components from <b>Tuxedo Mobile</b> library</li><li>Tuxedo handles buttons, inputs, typography</li></ul></div>';
html+='<div style="height:12px"></div>';
html+='<div class="do"><strong>\u2713 Stores Checkout Context</strong><ul><li>PSP is rendered inside Stores checkout</li><li>Use components from <b>RIO</b> (Stores Design Library)</li><li>RIO handles buttons, inputs, typography</li></ul></div></div>';

html+='<div class="card"><div class="card-title">Who this is for</div>';
html+='<div style="font-size:13px;line-height:2.2;color:var(--body-color)">';
html+='<div><span class="flow-num" style="background:#2162A1">D</span> <b>Designers</b> \u2014 Component specs, spacing tokens, visual states</div>';
html+='<div><span class="flow-num" style="background:#0B7B3C">E</span> <b>Engineers</b> \u2014 Design tokens, JSON handoff, character limits</div>';
html+='<div><span class="flow-num" style="background:#0A7CD1">P</span> <b>Product Teams</b> \u2014 Page hierarchy, preselection logic, section ordering</div>';
html+='</div></div>';
html+='</div>';

html+='<div class="card"><div class="card-title">What this system covers</div>';
html+='<ul style="font-size:13px;padding-left:18px;line-height:2.2;color:var(--body-color)"><li>Instrument tile anatomy &amp; states</li><li>Section grouping &amp; hierarchy</li><li>Recommended section logic</li><li>Bottom sticky CTA bar</li><li>Character constraints for all text</li><li>Selection &amp; preselection behaviour</li><li>Offer badge &amp; savings display</li></ul>';
html+='<div class="warn" style="margin-top:14px">\u26A0\uFE0F <b>BUTTONS:</b> Do not document buttons here. They come from master libraries:<br>&bull; Paycheckout context \u2192 <b>Tuxedo Mobile</b> library<br>&bull; Stores checkout context \u2192 <b>RIO</b> (Stores Design Library)</div></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   1. FOUNDATIONS
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="page-title">Foundations</div>';
html+='<div class="page-desc">Core design tokens that define the visual language of the PSP \u2014 colors, typography, and spacing.</div>';

/* Color Tokens */
html+='<div class="card"><div class="card-title">Color Tokens</div><div class="swatch-grid">';
var tokens=[['Page BG','#F7FAFA'],['Card BG','#FFFFFF'],['Primary Text','#0F1111'],['Secondary Text','#565959'],['Link','#2162A1'],['Success','#0B7B3C'],['Border','#D5D9D9'],['Badge Blue','#0A7CD1'],['CTA Yellow','#FFD814'],['Selected BG','#EDF8FF'],['Selected Border','#2162A1'],['Error Red','#CC0C39'],['Badge Gray BG','#E3E6E6'],['Badge Gray Text','#232F3E'],['Address BG','#F7FEFF'],['Savings Bar BG','#E8FFF8']];
tokens.forEach(function(t){html+='<div class="swatch" onclick="copySpec(this.querySelector(\'.swatch-hex\'))"><div class="swatch-color" style="background:'+t[1]+'"></div><div><div class="swatch-name">'+t[0]+'</div><div class="swatch-hex">'+t[1]+'</div></div></div>';});
html+='</div></div>';

/* Typography */
html+='<div class="card"><div class="card-title">Typography</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Size</th><th>Weight</th><th>Color</th></tr>';
html+='<tr><td>Instrument Name (Line 1)</td><td>16px</td><td>400 (Regular)</td><td>#0F1111</td></tr>';
html+='<tr><td>Instrument Detail (Line 2)</td><td>13px</td><td>400 (Regular)</td><td>#565959</td></tr>';
html+='<tr><td>Offer Text (Line 3)</td><td>13px</td><td>400 (Regular)</td><td>#0B7B3C</td></tr>';
html+='<tr><td>Section Header</td><td>13px</td><td>700 (Bold), uppercase</td><td>#565959</td></tr>';
html+='<tr><td>Badge Text</td><td>9.2px</td><td>400 (Regular)</td><td>Varies</td></tr>';
html+='<tr><td>Price Number</td><td>22px</td><td>700 (Bold)</td><td>#0F1111</td></tr>';
html+='<tr><td>Price Symbol (\u20B9)</td><td>13px</td><td>700 (Bold)</td><td>#0F1111</td></tr>';
html+='<tr><td>CTA Button</td><td>16px</td><td>400 (Regular)</td><td>#0F1111</td></tr>';
html+='<tr><td>Savings Text</td><td>14.4px</td><td>700 (Bold)</td><td>#0B7B3C</td></tr>';
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
html+='<div class="page-title">Instrument Tile</div>';
html+='<div class="page-desc">Generic instrument tile used for all payment methods. Three visual states are documented below.</div>';
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
html+='</table></div></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   3. PATTERNS (merged Layout Patterns + Bottom Sticky CTA)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="page-title">Patterns</div>';
html+='<div class="page-desc">Section grouping, spacing, visual hierarchy rules, and the bottom sticky CTA bar for the PSP page layout.</div>';
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
html+='<span style="background:#0A7CD1;color:#fff;font-size:9.2px;padding:2px 8px;border-radius:13px">Best offer</span>';
html+='<span style="background:#E3E6E6;color:#232F3E;font-size:9.2px;padding:2px 8px;border-radius:13px">Previously used</span>';
html+='<span style="background:#E3E6E6;color:#232F3E;font-size:9.2px;padding:2px 8px;border-radius:13px">Featured</span>';
html+='</div><div class="spec" onclick="copySpec(this)">font: 9.2px/400 | padding: 2px 8px | radius: 13px | left-offset: 66px</div></div>';
/* UPI Pill */
html+='<div class="card"><div class="card-title">UPI Bank Pill</div><div class="preview">';
html+='<div style="display:inline-flex;align-items:center;gap:6px;background:#FFF;border:0.46px solid #D5D9D9;border-radius:30px;padding:4px 8px"><div style="width:13px;height:13px;border-radius:50%;background:linear-gradient(135deg,#F58220,#B7202E)"></div><span style="font-size:13px;color:#565959">ICICI Bank &#8226;&#8226;&#8226;&#8226;0911</span><span style="color:#2162A1;font-weight:700">&rsaquo;</span></div>';
html+='</div><div class="spec" onclick="copySpec(this)">border: 0.46px solid #D5D9D9 | radius: 30px | padding: 4px 8px</div></div>';
/* CTA Bar (merged from Bottom Sticky CTA) */
html+='<div class="card"><div class="card-title">Bottom Sticky CTA Bar</div>';
html+='<div class="preview"><div style="width:100%;max-width:360px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 -2px 5px rgba(0,0,0,.08);border:1px solid #D5D9D9">';
html+='<div style="background:#E8FFF8;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0"><span style="font-size:14.4px;color:#0B7B3C;font-weight:700">&#8377;15 saved</span><span style="font-size:14px;color:#2162A1">See offers &rsaquo;</span></div>';
html+='<div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center"><div><span style="font-size:13px;font-weight:700">&#8377;</span><span style="font-size:22px;font-weight:700">504</span><div style="font-size:14px;color:#565959">Includes fees</div></div><div style="background:#FFD814;border-radius:92px;width:170px;height:47px;display:flex;align-items:center;justify-content:center"><span style="font-size:16px;color:#0F1111">Continue</span></div></div>';
html+='</div></div>';
html+='<div class="spec" onclick="copySpec(this)">position: fixed bottom:0 | savings-bar: bg #E8FFF8 radius 12px 12px 0 0 | action-bar: bg #FFFFFF</div></div>';
html+='<div class="grid-2">';
html+='<div class="card"><div class="card-title">Savings Bar</div><div class="tbl-wrap"><table class="tbl"><tr><th>Property</th><th>Value</th></tr>';
html+='<tr><td>Background</td><td>#E8FFF8</td></tr><tr><td>Border-radius</td><td>12px 12px 0 0</td></tr><tr><td>Savings text</td><td>14.4px/700 #0B7B3C</td></tr><tr><td>Link text</td><td>14px/400 #2162A1</td></tr>';
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
html+='<div class="page-title">States &amp; Behavior</div>';
html+='<div class="page-desc">All interactive states for instrument tiles, page-level elements, preselection logic, and grouping rules.</div>';
/* Tile States */
html+='<div class="card"><div class="card-title">Tile States Summary</div><div class="tbl-wrap"><table class="tbl"><tr><th>State</th><th>Background</th><th>Border</th><th>Opacity</th><th>Lines</th></tr>';
html+='<tr><td><span class="state-label state-active">Transaction Ready</span></td><td>#FFFFFF</td><td>0.55px solid #D5D9D9</td><td>1.0</td><td>1, 2, 3</td></tr>';
html+='<tr><td><span class="state-label state-selected">Selected</span></td><td>#EDF8FF</td><td>1px solid #2162A1</td><td>1.0</td><td>1, 2, 3</td></tr>';
html+='<tr><td><span class="state-label state-disabled">Non-Txn Ready</span></td><td>#FFFFFF</td><td>0.55px solid #D5D9D9</td><td>0.7</td><td>1, 2 (reason)</td></tr>';
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
html+='<div class="page-title">Content Guidelines</div>';
html+='<div class="page-desc">Maximum character limits for all text elements in the PSP. Exceeding these limits will cause truncation with ellipsis.</div>';
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
html+='<tr><td>Savings text</td><td>20</td><td>14.4px Bold #0B7B3C</td><td>\u201C\u20B915 saved\u201D</td></tr>';
html+='<tr><td>Address name</td><td>20</td><td>13px Bold #0F1111</td><td>\u201CDeliver to Akshay\u201D</td></tr>';
html+='<tr><td>Address detail</td><td>40</td><td>13px Regular #0F1111</td><td>\u201CBengaluru 560001\u201D</td></tr>';
html+='</table></div></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   6. MENTAL MODEL & HIERARCHY (wireframe only, no preselection/grouping)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="page-title">Mental Model &amp; Hierarchy</div>';
html+='<div class="page-desc">The PSP follows a specific hierarchy to optimise conversion and user experience. The wireframe below maps every numbered zone to its purpose and spec.</div>';
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
html+='<div style="background:#EDF8FF;border:1px solid #2162A1;border-radius:12px 12px 0 0;padding:12px"><div style="padding-left:66px;margin-bottom:4px"><span style="background:#0A7CD1;color:#fff;font-size:9.2px;padding:2px 8px;border-radius:13px;display:inline-block">Best offer</span></div><div style="display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/App + 3P.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:14px;color:#0F1111">Amazon Pay ICICI credit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;&#8226;&#8226;0424 | Akshay</div><div style="font-size:12px;color:#0B7B3C">Save &#8377;10 as cashback. <span style="color:#2162A1">Details</span></div></div></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px"><div style="padding-left:66px;margin-bottom:4px"><span style="background:#E3E6E6;color:#232F3E;font-size:9.2px;padding:2px 8px;border-radius:13px;display:inline-block">Previously used</span></div><div style="display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/HDFC credit card.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:14px;color:#0F1111">HDFC credit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;&#8226;&#8226;0422 | Akshay</div></div></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;border-radius:0 0 12px 12px"><div style="padding-left:66px;margin-bottom:4px"><span style="background:#E3E6E6;color:#232F3E;font-size:9.2px;padding:2px 8px;border-radius:13px;display:inline-block">Featured</span></div><div style="display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Amazon Pay UPI.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:14px;color:#0F1111">Amazon Pay UPI</div><div style="display:inline-flex;align-items:center;gap:6px;background:#FFF;border:0.46px solid #D5D9D9;border-radius:30px;padding:4px 8px;margin-top:4px"><div style="width:13px;height:13px;border-radius:50%;background:linear-gradient(135deg,#F58220,#B7202E)"></div><span style="font-size:12px;color:#565959">ICICI Bank &#8226;&#8226;&#8226;&#8226;0911</span><span style="color:#2162A1;font-weight:700">&rsaquo;</span></div></div></div></div>';
html+='</div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">UPI</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px"><div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Pay by any UPI App.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;font-size:14px;color:#0F1111">Pay by any UPI App</div><span style="color:#2162A1">&rsaquo;</span></div><div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div><div style="padding:12px"><span style="font-size:14px;color:#2162A1">+ Add account to Amazon Pay UPI</span></div></div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">CREDIT &amp; DEBIT CARDS</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px"><div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/HDFC credit card.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:14px;color:#0F1111">HDFC debit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;0333 | Akshay</div></div></div><div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div><div style="padding:12px"><span style="font-size:14px;color:#2162A1">+ Add new credit or debit card</span></div></div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">MORE WAYS TO PAY</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px">';
html+='<div style="padding:12px;display:flex;align-items:flex-start;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Amazon Pay Balance.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:16px;color:#0F1111;line-height:20px">Amazon Pay Balance: &#8377;60</div><div style="display:flex;align-items:center;gap:8px;margin-top:2px"><span style="font-size:11.5px;color:#565959;white-space:nowrap">Add &#8377;413.00 to proceed</span><div style="background:#FFF;border:1px solid #888C8C;border-radius:61px;padding:1px 10px;font-size:11.5px;color:#0F1111;white-space:nowrap;flex-shrink:0;line-height:22px">Add Now &rsaquo;</div></div></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Amazon Pay Later.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1"><div style="font-size:14px;color:#0F1111">Amazon Pay Later</div><div style="font-size:12px;color:#565959">Available credit: &#8377; 60,000</div></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Cash on delivery.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1"><div style="font-size:14px;color:#0F1111">Cash on Delivery/Pay on Delivery</div><div style="font-size:12px;color:#565959">Convenience fee of &#8377;7 will apply</div></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/EMI.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;font-size:14px;color:#0F1111">EMI</div><span style="color:#2162A1">&rsaquo;</span></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Netbanking.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;font-size:14px;color:#0F1111">Net Banking</div><span style="color:#2162A1">&rsaquo;</span></div>';
html+='</div></div>';
html+='<div style="padding:8px 16px"><div style="background:#FFF;border:0.5px solid #D5D9D9;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;color:#2162A1">Add Gift Card or Promo Code</span><span style="color:#2162A1">&rsaquo;</span></div></div>';
html+='<div><div style="background:#E8FFF8;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;border-top:1px solid #E6E6E6;box-shadow:0 -2px 5px rgba(0,0,0,0.08)"><span style="font-size:14.4px;color:#0B7B3C;font-weight:700">&#8377;15 saved</span><span style="font-size:14px;color:#2162A1">See offers &rsaquo;</span></div>';
html+='<div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center;background:#FFF"><div><span style="font-size:13px;font-weight:700">&#8377;</span><span style="font-size:22px;font-weight:700">504</span><div style="font-size:14px;color:#565959">Includes fees</div></div><div style="background:#FFD814;border-radius:92px;width:170px;height:47px;display:flex;align-items:center;justify-content:center"><span style="font-size:16px;color:#0F1111">Continue</span></div></div></div>';
html+='</div>';
html+='</div>';
html+='<div class="mm-right" style="padding-top:8px">';
html+='<div class="callout" style="border-left-color:#82D8E3"><strong>Header</strong>gradient: 135deg #82D8E3 \u2192 #A6E7CE<br>title: 16px Regular #0F1111</div>';
html+='<div class="callout" style="border-left-color:#007185"><strong>Address Bar</strong>bg: #F7FEFF<br>name: 13px Bold #0F1111<br>Change: 13px #007185</div>';
html+='<div class="callout" style="border-left-color:#0A7CD1"><strong>Selected Tile</strong>bg: #EDF8FF<br>border: 1px solid #2162A1<br>icon: 54\u00D736px, radius 5px</div>';
html+='<div class="callout" style="border-left-color:#E3E6E6"><strong>Badges</strong>Best offer: bg #0A7CD1, text #FFF<br>Previously used: bg #E3E6E6<br>Featured: bg #E3E6E6</div>';
html+='<div class="callout" style="border-left-color:#FFD814"><strong>CTA Button</strong>bg: #FFD814, radius: 92px<br>size: 170\u00D747px<br>text: 16px Regular #0F1111</div>';
html+='<div class="callout" style="border-left-color:#0B7B3C"><strong>Savings Bar</strong>bg: #E8FFF8<br>radius: 12px 12px 0 0<br>text: 14.4px Bold #0B7B3C</div>';
html+='</div>';
html+='</div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   7. DEVELOPER HANDOFF (Raw JSON - kept as is)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="page-title">Developer Handoff</div>';
html+='<div class="page-desc">Design tokens and component specs exported as JSON for developer handoff.</div>';
html+='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div class="card-title" style="margin-bottom:0">design-tokens.json</div><div style="font-size:12px;color:var(--sidebar-accent);font-weight:600;cursor:pointer;padding:4px 12px;border-radius:6px;background:rgba(130,216,227,.1)" onclick="copyJSON()">Copy JSON</div></div>';
html+='<pre style="background:#1B2836;color:#A6E7CE;padding:20px;border-radius:10px;font-size:12px;font-family:SF Mono,Menlo,Consolas,monospace;overflow-x:auto;max-height:500px;line-height:1.7" id="jsonPre"></pre></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   8. BASELINE CX (kept as is)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="page-title">Baseline CX</div>';
html+='<div class="page-desc">Current baseline customer experience for Service and Pay. Click the cover below to open the full Figma design file.</div>';
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

/* ── Inject HTML ── */
contentEl.innerHTML = html;

/* ── Fill JSON ── */
var jsonData = {
  designTokens:{colors:{bgPage:'#F7FAFA',bgCard:'#FFFFFF',textPrimary:'#0F1111',textSecondary:'#565959',textLink:'#2162A1',textSuccess:'#0B7B3C',borderCard:'#D5D9D9',badgeBlue:'#0A7CD1',ctaYellow:'#FFD814',selectedBg:'#EDF8FF',selectedBorder:'#2162A1',errorRed:'#CC0C39',headerGradientStart:'#82D8E3',headerGradientEnd:'#A6E7CE',savingsBarBg:'#E8FFF8',addressBg:'#F7FEFF',badgeGrayBg:'#E3E6E6',badgeGrayText:'#232F3E',dividerDash:'#6F7373'},spacing:{pagePadding:'16px',tilePadding:'12px',iconTextGap:'10px',badgeLeftOffset:'66px',dividerInset:'12px'},radii:{cardGroup:'12px',tile:'12px',icon:'5px',badge:'13px',cta:'92px',bankPill:'30px'},sizes:{icon:'54x36px',cta:'170x47px',bankLogoCircle:'13px'}},
  tileStates:{transactionReady:{bg:'#FFFFFF',border:'0.55px solid #D5D9D9',opacity:1},selected:{bg:'#EDF8FF',border:'1px solid #2162A1',opacity:1},nonTransactionReady:{bg:'#FFFFFF',border:'0.55px solid #D5D9D9',opacity:0.7}},
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
