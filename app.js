/* ── Build All Sections ── */
function buildSections(){
var html='';

/* ══════════════════════════════════════════════════════════════
   0. GETTING STARTED
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec active">';

/* Hero Section */
html+='<div class="hero">';
html+='<svg class="hero-logo" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" width="120"><text x="0" y="72" font-family="Amazon Ember, Arial, sans-serif" font-size="62" font-weight="400" fill="#ffffff" letter-spacing="-1">amazon</text><text x="265" y="72" font-family="Amazon Ember, Arial, sans-serif" font-size="62" font-weight="300" fill="#ffffff" letter-spacing="-1">pay</text><path d="M50 88c30 12 75 18 120 18 50 0 95-10 130-28 4-2 7 2 3 5-38 22-85 34-133 34-55 0-105-15-140-38-4-3-1-7 3-5z" fill="#FF9900" transform="translate(-15,2) scale(0.85)"/></svg>';
html+='<div class="hero-content">';
html+='<div class="hero-badge" style="margin-top:32px">📦 v2.0.0 · Production Ready</div>';
html+='<h1 class="hero-title">PSP Design System</h1>';
html+='<p class="hero-desc">Build consistent payment experiences across 90+ Amazon touchpoints. Complete component library, design tokens, and usage guidelines for Paycheckout and Stores checkout flows.</p>';
html+='<div class="hero-actions">';
html+='<button class="btn btn-primary" onclick="switchTab(2)">Browse Components →</button>';
html+='<a href="https://www.figma.com/design/N6ojbzlM3tRsXj5X4cJkkX/Service-and-Pay?node-id=1-28778" target="_blank" class="btn btn-secondary">Open in Figma ↗</a>';
html+='</div></div></div>';

/* Stats */
html+='<div class="stats-grid">';
html+='<div class="stat-card"><div class="stat-num">3</div><div class="stat-label">Tile States</div></div>';
html+='<div class="stat-card"><div class="stat-num">9</div><div class="stat-label">Instruments</div></div>';
html+='<div class="stat-card"><div class="stat-num">6</div><div class="stat-label">Tenets</div></div>';
html+='<div class="stat-card"><div class="stat-num">17</div><div class="stat-label">Color Tokens</div></div>';
html+='<div class="stat-card"><div class="stat-num">13</div><div class="stat-label">Char Limits</div></div>';
html+='<div class="stat-card"><div class="stat-num">5</div><div class="stat-label">Page States</div></div>';
html+='</div>';
html+='<div class="note note-blue" style="margin:24px 0"><strong>⚡ Semi-Modernized PSP:</strong> This design system documents the current semi-modernized PSP implementation. Key feature: <strong>Radio button selection</strong> (not full tile tap). Selected tiles show blue border + filled radio button. This balances familiarity (radio buttons) with modern visual design.</div>';
html+='<div class="grid-2">';
html+='<div class="card card--outlined"><div style="height:120px;background:linear-gradient(135deg,#e3f5e1 0%,#b8e6b0 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e9ebed"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="12" y="16" width="40" height="32" rx="4" stroke="#037f0c" stroke-width="2" fill="none"/><path d="M20 28h24M20 34h16" stroke="#037f0c" stroke-width="2" stroke-linecap="round"/><circle cx="44" cy="20" r="8" fill="#037f0c" opacity=".15"/><path d="M41 20l2 2 4-4" stroke="#037f0c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="card-title">When to use</div><div style="padding:0 24px 24px">';
html+='<div class="do"><strong>\u2713 Paycheckout Context</strong><ul><li>PSP is rendered inside Paycheckout webview</li><li>Use components from <a href="https://www.figma.com/design/TNEXlmIcQPMlbEMb9i7KOE/Tuxedo-Mobile?node-id=0-1&t=8qzFCbKUF1qF9Ck5-1" target="_blank" style="color:#0972d3;text-decoration:none;font-weight:600">Tuxedo Mobile ↗</a> library</li><li>Tuxedo handles buttons, inputs, typography</li></ul></div>';
html+='<div style="height:12px"></div>';
html+='<div class="do"><strong>\u2713 Stores Checkout Context</strong><ul><li>PSP is rendered inside Stores checkout</li><li>Use components from <a href="https://www.figma.com/design/KQAZPbiOnoBYWkYn0B8Qnk/Rio-Foundations-Library_PCT?node-id=6-2&t=U35Pf6bj6fe9VxFu-1" target="_blank" style="color:#0972d3;text-decoration:none;font-weight:600">RIO Foundations ↗</a></li><li>Child library: <a href="https://www.figma.com/design/0OoLLPw03qD4C8FNFtbP5n/Stores-Design-Library?m=auto&node-id=0-1&t=1iTlA2sIpuUdHilM-1" target="_blank" style="color:#0972d3;text-decoration:none;font-weight:600">Stores Design Library ↗</a></li><li>RIO handles buttons, inputs, typography</li></ul></div></div></div>';

html+='<div class="card card--outlined"><div style="height:120px;background:linear-gradient(135deg,#e9f3ff 0%,#b8d4f0 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e9ebed"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="24" cy="28" r="10" stroke="#0972d3" stroke-width="2" fill="none"/><circle cx="24" cy="25" r="3" fill="#0972d3" opacity=".3"/><path d="M17 35c0-4 3-7 7-7s7 3 7 7" stroke="#0972d3" stroke-width="2" fill="none"/><circle cx="40" cy="24" r="8" stroke="#0972d3" stroke-width="2" fill="none"/><circle cx="40" cy="22" r="2.5" fill="#0972d3" opacity=".3"/><path d="M34 30c0-3 2.5-6 6-6s6 3 6 6" stroke="#0972d3" stroke-width="2" fill="none"/><rect x="14" y="42" width="36" height="2" rx="1" fill="#0972d3" opacity=".15"/></svg></div><div class="card-title">Who this is for</div><div style="padding:0 24px 24px">';
html+='<div style="font-size:13px;line-height:2.2;color:#1a1c1e">';
html+='<div><span class="flow-num" style="background:#2162A1">D</span> <b>Designers</b> \u2014 Component specs, spacing tokens, visual states</div>';
html+='<div><span class="flow-num" style="background:#037f0c">E</span> <b>Engineers</b> \u2014 Design tokens, JSON handoff, character limits</div>';
html+='<div><span class="flow-num" style="background:#0972d3">P</span> <b>Product Teams</b> \u2014 Page hierarchy, preselection logic, section ordering</div>';
html+='</div></div></div>';
html+='</div>';

html+='<div class="card card--filled"><div style="height:120px;background:linear-gradient(135deg,#fff3e0 0%,#ffe0b2 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e9ebed"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="14" y="12" width="36" height="40" rx="3" stroke="#e65100" stroke-width="2" fill="none"/><path d="M22 22h20M22 28h14M22 34h18M22 40h10" stroke="#e65100" stroke-width="2" stroke-linecap="round" opacity=".6"/><rect x="38" y="36" width="12" height="12" rx="2" fill="#e65100" opacity=".12"/><path d="M42 40l2 2 3-3" stroke="#e65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="card-title">What this system covers</div><div style="padding:0 24px 24px">';
html+='<ul style="font-size:13px;padding-left:18px;line-height:2.2;color:#1a1c1e"><li>Instrument tile anatomy &amp; states</li><li>Section grouping &amp; hierarchy</li><li>Recommended section logic</li><li>Bottom sticky CTA bar</li><li>Character constraints for all text</li><li>Selection &amp; preselection behaviour</li><li>Offer badge &amp; savings display</li></ul>';
html+='<div class="warn" style="margin-top:14px">\u26A0\uFE0F <b>BUTTONS:</b> Do not document buttons here. They come from master libraries:<br>&bull; Paycheckout context \u2192 <b>Tuxedo Mobile</b> library<br>&bull; Stores checkout context \u2192 <b>RIO</b> (Stores Design Library)</div></div></div>';


/* PSP Tenets */
html+='<div class="card card--elevated"><div style="height:100px;background:linear-gradient(135deg,#e8eaf6 0%,#c5cae9 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e9ebed"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M28 8l4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1z" stroke="#1a237e" stroke-width="2" fill="none"/><circle cx="28" cy="38" r="8" stroke="#1a237e" stroke-width="2" fill="none"/><path d="M24 38h8M28 34v8" stroke="#1a237e" stroke-width="1.5" stroke-linecap="round"/></svg></div>';
html+='<div class="card-title">PSP Tenets</div><div style="padding:0 24px 24px">';
html+='<p style="font-size:13px;color:#565959;margin-bottom:16px">Six guiding principles that govern every design decision in the payment experience.</p>';
html+='<div style="display:grid;gap:12px">';
html+='<div style="padding:14px 16px;background:#f0f4ff;border-left:4px solid #1a73e8;border-radius:0 8px 8px 0"><strong style="font-size:14px;color:#1a1c1e">1. Reduce Cognitive Load</strong><p style="margin:6px 0 0;font-size:13px;color:#444;line-height:1.6">Minimize the number of decisions a user has to make. Preselect the best option, collapse less relevant choices, and guide users toward the fastest path to payment completion.</p></div>';
html+='<div style="padding:14px 16px;background:#f0f4ff;border-left:4px solid #1a73e8;border-radius:0 8px 8px 0"><strong style="font-size:14px;color:#1a1c1e">2. Trust Through Familiarity</strong><p style="margin:6px 0 0;font-size:13px;color:#444;line-height:1.6">Users trust what they recognize. Prioritize previously used instruments, show recognizable brand logos, and maintain consistent patterns across touchpoints.</p></div>';
html+='<div style="padding:14px 16px;background:#f0f4ff;border-left:4px solid #1a73e8;border-radius:0 8px 8px 0"><strong style="font-size:14px;color:#1a1c1e">3. Speed Over Choice</strong><p style="margin:6px 0 0;font-size:13px;color:#444;line-height:1.6">For returning users, speed matters more than variety. Reduce steps, auto-select when confident, and optimize for one-tap completion wherever possible.</p></div>';
html+='<div style="padding:14px 16px;background:#f0f4ff;border-left:4px solid #1a73e8;border-radius:0 8px 8px 0"><strong style="font-size:14px;color:#1a1c1e">4. Progressive Disclosure</strong><p style="margin:6px 0 0;font-size:13px;color:#444;line-height:1.6">Show only what\u2019s needed at each step. Advanced options, secondary instruments, and edge-case flows should be accessible but not prominent.</p></div>';
html+='<div style="padding:14px 16px;background:#f0f4ff;border-left:4px solid #1a73e8;border-radius:0 8px 8px 0"><strong style="font-size:14px;color:#1a1c1e">5. Contextual Intelligence</strong><p style="margin:6px 0 0;font-size:13px;color:#444;line-height:1.6">Adapt the experience based on context \u2014 order value, device type, merchant category, and user history. The same user may need different flows in different situations.</p></div>';
html+='<div style="padding:14px 16px;background:#f0f4ff;border-left:4px solid #1a73e8;border-radius:0 8px 8px 0"><strong style="font-size:14px;color:#1a1c1e">6. Graceful Recovery</strong><p style="margin:6px 0 0;font-size:13px;color:#444;line-height:1.6">Payment failures are inevitable. Design for recovery \u2014 show alternatives immediately, preserve user progress, and never dead-end the experience.</p></div>';
html+='</div></div></div>';

/* Use Cases Section - Insert after "What this system covers" */
html+='<div class="card card--elevated"><div class="card-title">Real-World Use Cases</div>';
html+='<div style="padding:0 28px 24px">';
html+='<div class="note note-blue" style="margin-top:16px"><strong>📱 Production Examples:</strong> These use cases show how PSP components are applied in real Amazon checkout flows across India market.</div>';

/* Use Cases Grid - 2 column layout */
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px">';

/* Use Case 1: Preselected Best Offer */
html+='<div style="padding:20px;background:#f7f9fc;border-radius:12px;border-left:4px solid #0972d3">';
html+='<div style="font-size:15px;font-weight:600;color:#0F1111;margin-bottom:12px">1. Preselected Best Offer Tile</div>';
html+='<div style="font-size:13px;color:#565959;line-height:1.8;margin-bottom:16px">Customer has 3+ saved payment methods. PSP auto-selects the tile with "Best offer" badge, showing blue border and filled radio button.</div>';
html+='<div style="background:#fff;border-radius:8px;padding:16px;border:1px solid #D5D9D9">';
html+='<div style="font-size:11px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:10px">RECOMMENDED</div>';
html+='<div style="background:#EDF8FF;border:2px solid #2162A1;border-radius:12px;padding:12px">';
html+='<div style="display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Amazon Pay ICICI credit card.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="margin-bottom:4px"><span style="background:#0A7CD1;color:#fff;font-size:10px;padding:2px 8px;border-radius:13px;display:inline-block">Best offer</span></div><div style="font-size:14px;font-weight:700;color:#0F1111">Amazon Pay ICICI credit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;0424 | Akshay</div><div style="font-size:12px;color:#0B7B3C">Save &#8377;10 as cashback. <span style="color:#2162A1">Details</span></div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#2162A1" stroke-width="2"/><circle cx="10" cy="10" r="5" fill="#2162A1"/></svg></div></div></div>';
html+='<div style="font-size:12px;color:#5a6c7d;margin-top:12px;font-style:italic"><strong>When:</strong> Order total &#8377;500+, offer eligible instrument exists<br><strong>Result:</strong> CTA shows "Continue with &#8377;10 savings"</div></div>';

/* Use Case 2: Disabled Card */
html+='<div style="padding:20px;background:#fff5f5;border-radius:12px;border-left:4px solid #CC0C39">';
html+='<div style="font-size:15px;font-weight:600;color:#0F1111;margin-bottom:12px">2. Non-Transaction Ready (Expired Card)</div>';
html+='<div style="font-size:13px;color:#565959;line-height:1.8;margin-bottom:16px">Saved card has expired. PSP shows the tile with 70% opacity, disabled radio button, and error message in red.</div>';
html+='<div style="background:#fff;border-radius:8px;padding:16px;border:1px solid #D5D9D9">';
html+='<div style="font-size:11px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:10px">CREDIT & DEBIT CARDS</div>';
html+='<div style="background:#FFF;border:1px solid #D5D9D9;border-radius:12px;padding:12px;opacity:0.7">';
html+='<div style="display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/HDFC Banks.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:700;color:#0F1111">HDFC credit card</div><div style="font-size:12px;color:#CC0C39">Card expired \u2014 <span style="color:#2162A1">Why?</span></div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div></div></div>';
html+='<div style="font-size:12px;color:#5a6c7d;margin-top:12px;font-style:italic"><strong>When:</strong> Card expiry date < current date<br><strong>Result:</strong> Tile not selectable, user must update card or choose another method</div></div>';

/* Use Case 3: UPI with Bank Pill */
html+='<div style="padding:20px;background:#f0fdf4;border-radius:12px;border-left:4px solid #0B7B3C">';
html+='<div style="font-size:15px;font-weight:600;color:#0F1111;margin-bottom:12px">3. UPI Payment with Bank Pill</div>';
html+='<div style="font-size:13px;color:#565959;line-height:1.8;margin-bottom:16px">Customer selects UPI payment. PSP shows linked bank details in a rounded pill with bank icon.</div>';
html+='<div style="background:#fff;border-radius:8px;padding:16px;border:1px solid #D5D9D9">';
html+='<div style="font-size:11px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:10px">UPI</div>';
html+='<div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;padding:12px">';
html+='<div style="display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/APay UPI.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="margin-bottom:3px"><span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:2px 8px;border-radius:13px;display:inline-block">Featured</span></div><div style="font-size:14px;font-weight:400;color:#0F1111;margin-bottom:4px">Amazon Pay UPI</div><div style="display:inline-flex;align-items:center;gap:5px;background:#FFF;border:0.5px solid #D5D9D9;border-radius:20px;padding:3px 7px"><img src="PSP Instument icons/ICICI Bank UPI Pill.png" width="16" height="16" style="border-radius:50%;object-fit:cover" alt="ICICI Bank"><span style="font-size:11px;color:#565959">ICICI Bank &#8226;&#8226;0911</span><span style="font-size:11px;color:#565959">&#8250;</span></div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="1.5"/></svg></div></div></div>';
html+='<div style="font-size:12px;color:#5a6c7d;margin-top:12px;font-style:italic"><strong>When:</strong> UPI linked to bank account<br><strong>Result:</strong> Instant payment via UPI flow, no CVV required</div></div>';

/* Use Case 4: COD with Fee */
html+='<div style="padding:20px;background:#fffbeb;border-radius:12px;border-left:4px solid #f59e0b">';
html+='<div style="font-size:15px;font-weight:600;color:#0F1111;margin-bottom:12px">4. Cash on Delivery with Fee</div>';
html+='<div style="font-size:13px;color:#565959;line-height:1.8;margin-bottom:16px">Customer in serviceable PIN code. PSP shows COD option with convenience fee warning on Line 2.</div>';
html+='<div style="background:#fff;border-radius:8px;padding:16px;border:1px solid #D5D9D9">';
html+='<div style="font-size:11px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:10px">MORE WAYS TO PAY</div>';
html+='<div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;padding:12px">';
html+='<div style="display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/POD.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:400;color:#0F1111;margin-bottom:3px">Cash on Delivery</div><div style="font-size:12px;color:#565959">Convenience fee of &#8377;7 will apply</div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="1.5"/></svg></div></div></div>';
html+='<div style="font-size:12px;color:#5a6c7d;margin-top:12px;font-style:italic"><strong>When:</strong> PIN code supports COD, order value < &#8377;5,000<br><strong>Result:</strong> Total increases by &#8377;7, no online payment needed</div></div>';

/* Use Case 5: Bottom Sticky CTA */
html+='<div style="padding:20px;background:#f0fdfa;border-radius:12px;border-left:4px solid #0B7B3C">';
html+='<div style="font-size:15px;font-weight:600;color:#0F1111;margin-bottom:12px">5. Sticky CTA with Savings</div>';
html+='<div style="font-size:13px;color:#565959;line-height:1.8;margin-bottom:16px">Customer selects payment with offer. Bottom CTA bar shows savings amount and total price.</div>';
html+='<div style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 -2px 8px rgba(0,0,0,.1);border:1px solid #D5D9D9">';
html+='<div style="background:#E8FFF8;padding:10px 16px;display:flex;justify-content:space-between;align-items:center">';
html+='<span style="font-size:13px;color:#0B7B3C;font-weight:700">&#8377;15 saved</span>';
html+='<span style="font-size:13px;color:#2162A1">See offers &#8250;</span></div>';
html+='<div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center">';
html+='<div><span style="font-size:11px;font-weight:700">&#8377;</span><span style="font-size:20px;font-weight:700">504</span>';
html+='<div style="font-size:12px;color:#565959">Includes fees</div></div>';
html+='<div style="background:#FFD814;border-radius:80px;padding:11px 28px"><span style="font-size:14px;color:#0F1111;font-weight:500">Continue</span></div></div></div>';
html+='<div style="font-size:12px;color:#5a6c7d;margin-top:12px;font-style:italic"><strong>When:</strong> Offer applied successfully<br><strong>Result:</strong> Fixed CTA at bottom, visible during scroll</div></div>';

html+='</div>';
html+='</div></div>';

html+='</div>';

/* ══════════════════════════════════════════════════════════════
   1. FOUNDATIONS
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#16a34a">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Foundations</h1>';
html+='<p class="section-header__desc">Core design tokens that define the visual language of the PSP — colors, typography, spacing, and more. These tokens ensure consistency across all payment touchpoints.</p>';
html+='</div></div>';

/* Material Design 3 Type Scale */
html+='<div class="card card--elevated"><div class="card-title">Material Design 3 Type Scale</div>';
html+='<div class="note note-blue"><strong>📐 Type Scale System:</strong> We use Material Design 3\'s complete type scale with 15 roles. Each role has defined size, weight, line-height, and letter-spacing for perfect consistency.</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Role</th><th>Size</th><th>Weight</th><th>Line Height</th><th>Tracking</th><th>Use Case</th></tr>';
html+='<tr><td><strong>Display Large</strong></td><td>57px</td><td>400</td><td>64px</td><td>-0.25px</td><td>Hero headlines</td></tr>';
html+='<tr><td><strong>Display Medium</strong></td><td>45px</td><td>400</td><td>52px</td><td>0</td><td>Hero titles</td></tr>';
html+='<tr><td><strong>Display Small</strong></td><td>36px</td><td>400</td><td>44px</td><td>0</td><td>Large headings</td></tr>';
html+='<tr><td><strong>Headline Large</strong></td><td>32px</td><td>400</td><td>40px</td><td>0</td><td>Page titles</td></tr>';
html+='<tr><td><strong>Headline Medium</strong></td><td>28px</td><td>400</td><td>36px</td><td>0</td><td>Section headers</td></tr>';
html+='<tr><td><strong>Headline Small</strong></td><td>24px</td><td>400</td><td>32px</td><td>0</td><td>Subsection headers</td></tr>';
html+='<tr><td><strong>Title Large</strong></td><td>22px</td><td>400</td><td>28px</td><td>0</td><td>Card titles, prominent text</td></tr>';
html+='<tr><td><strong>Title Medium</strong></td><td>16px</td><td>500</td><td>24px</td><td>0.15px</td><td>Card subtitles</td></tr>';
html+='<tr><td><strong>Title Small</strong></td><td>14px</td><td>500</td><td>20px</td><td>0.1px</td><td>List item titles</td></tr>';
html+='<tr><td><strong>Body Large</strong></td><td>16px</td><td>400</td><td>24px</td><td>0.5px</td><td>Primary body text</td></tr>';
html+='<tr><td><strong>Body Medium</strong></td><td>14px</td><td>400</td><td>20px</td><td>0.25px</td><td>Secondary body text</td></tr>';
html+='<tr><td><strong>Body Small</strong></td><td>12px</td><td>400</td><td>16px</td><td>0.4px</td><td>Captions, helper text</td></tr>';
html+='<tr><td><strong>Label Large</strong></td><td>14px</td><td>500</td><td>20px</td><td>0.1px</td><td>Buttons, tabs</td></tr>';
html+='<tr><td><strong>Label Medium</strong></td><td>12px</td><td>500</td><td>16px</td><td>0.5px</td><td>Badges, chips</td></tr>';
html+='<tr><td><strong>Label Small</strong></td><td>11px</td><td>500</td><td>16px</td><td>0.5px</td><td>Overline text</td></tr>';
html+='</table></div>';
html+='<div class="spec" onclick="copySpec(this)">CSS: var(--type-display-large), var(--type-headline-medium), var(--type-body-large), etc.</div>';
html+='</div>';

/* Unified Color System */
html+='<div class="card card--elevated"><div class="card-title">Role-Based Color System</div>';
html+='<div class="note note-blue"><strong>🎨 Color Roles:</strong> Material Design 3 uses semantic color roles instead of hardcoded colors. Each role has primary color + "on" color + container variant.</div>';
html+='<div style="padding:0 28px 24px"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:16px">';
html+='<div style="background:#0972d3;color:#fff;padding:20px;border-radius:12px"><div style="font-size:12px;opacity:0.8;margin-bottom:4px">PRIMARY</div><div style="font-size:24px;font-weight:700">#0972d3</div><div style="font-size:11px;margin-top:8px;opacity:0.9">Actions, links, selections</div></div>';
html+='<div style="background:#d1e4ff;color:#001d36;padding:20px;border-radius:12px"><div style="font-size:12px;opacity:0.8;margin-bottom:4px">PRIMARY CONTAINER</div><div style="font-size:24px;font-weight:700">#d1e4ff</div><div style="font-size:11px;margin-top:8px;opacity:0.9">Highlighted sections, tags</div></div>';
html+='<div style="background:#16a34a;color:#fff;padding:20px;border-radius:12px"><div style="font-size:12px;opacity:0.8;margin-bottom:4px">SUCCESS</div><div style="font-size:24px;font-weight:700">#16a34a</div><div style="font-size:11px;margin-top:8px;opacity:0.9">Success states, confirmations</div></div>';
html+='<div style="background:#d32f2f;color:#fff;padding:20px;border-radius:12px"><div style="font-size:12px;opacity:0.8;margin-bottom:4px">ERROR</div><div style="font-size:24px;font-weight:700">#d32f2f</div><div style="font-size:11px;margin-top:8px;opacity:0.9">Errors, warnings</div></div>';
html+='<div style="background:#fafafa;color:#1a1c1e;padding:20px;border-radius:12px;border:1px solid #e0e2ec"><div style="font-size:12px;opacity:0.6;margin-bottom:4px">SURFACE</div><div style="font-size:24px;font-weight:700">#fafafa</div><div style="font-size:11px;margin-top:8px;opacity:0.7">Cards, backgrounds</div></div>';
html+='<div style="background:#e0e2ec;color:#44474e;padding:20px;border-radius:12px"><div style="font-size:12px;opacity:0.8;margin-bottom:4px">SURFACE VARIANT</div><div style="font-size:24px;font-weight:700">#e0e2ec</div><div style="font-size:11px;margin-top:8px;opacity:0.9">Hover states, dividers</div></div>';
html+='</div></div>';
html+='<div class="spec" onclick="copySpec(this)">CSS: var(--color-primary), var(--color-on-primary), var(--color-primary-container), etc.</div>';
html+='</div>';

/* Spacing Scale */
html+='<div class="card card--filled"><div class="card-title">Spacing Scale (8px Baseline Grid)</div>';
html+='<div class="note note-blue"><strong>📏 8px Grid:</strong> All spacing uses multiples of 4px for consistency. Primary scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px.</div>';
html+='<div style="padding:0 28px 24px"><div style="display:flex;flex-direction:column;gap:8px;margin-top:16px">';
html+='<div style="display:flex;align-items:center;gap:16px"><div style="width:4px;height:32px;background:#0972d3;border-radius:2px"></div><div><strong>space-1</strong> · 4px · Micro spacing</div></div>';
html+='<div style="display:flex;align-items:center;gap:16px"><div style="width:8px;height:32px;background:#0972d3;border-radius:2px"></div><div><strong>space-2</strong> · 8px · Tight spacing</div></div>';
html+='<div style="display:flex;align-items:center;gap:16px"><div style="width:12px;height:32px;background:#0972d3;border-radius:2px"></div><div><strong>space-3</strong> · 12px · Compact spacing</div></div>';
html+='<div style="display:flex;align-items:center;gap:16px"><div style="width:16px;height:32px;background:#0972d3;border-radius:2px"></div><div><strong>space-4</strong> · 16px · Base spacing</div></div>';
html+='<div style="display:flex;align-items:center;gap:16px"><div style="width:24px;height:32px;background:#0972d3;border-radius:2px"></div><div><strong>space-6</strong> · 24px · Comfortable spacing</div></div>';
html+='<div style="display:flex;align-items:center;gap:16px"><div style="width:32px;height:32px;background:#0972d3;border-radius:2px"></div><div><strong>space-8</strong> · 32px · Section spacing</div></div>';
html+='<div style="display:flex;align-items:center;gap:16px"><div style="width:48px;height:32px;background:#0972d3;border-radius:2px"></div><div><strong>space-12</strong> · 48px · Large spacing</div></div>';
html+='<div style="display:flex;align-items:center;gap:16px"><div style="width:64px;height:32px;background:#0972d3;border-radius:2px"></div><div><strong>space-16</strong> · 64px · Extra large spacing</div></div>';
html+='</div></div>';
html+='<div class="spec" onclick="copySpec(this)">CSS: var(--space-1), var(--space-2), var(--space-4), var(--space-6), var(--space-8), etc.</div>';
html+='</div>';

/* Elevation System */
html+='<div class="card card--filled"><div class="card-title">Elevation System (Material Design 3)</div>';
html+='<div class="note note-blue"><strong>📦 5 Elevation Levels:</strong> Material Design 3 defines 5 levels of elevation using layered shadows for depth perception.</div>';
html+='<div style="padding:0 28px 24px"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:20px;margin-top:16px">';
html+='<div style="background:#fff;padding:24px 16px;border-radius:12px;box-shadow:0 1px 2px 0 rgba(0,0,0,0.3),0 1px 3px 1px rgba(0,0,0,0.15);text-align:center"><div style="font-size:20px;font-weight:700;color:#0972d3;margin-bottom:4px">1</div><div style="font-size:11px;color:#44474e">Cards</div></div>';
html+='<div style="background:#fff;padding:24px 16px;border-radius:12px;box-shadow:0 1px 2px 0 rgba(0,0,0,0.3),0 2px 6px 2px rgba(0,0,0,0.15);text-align:center"><div style="font-size:20px;font-weight:700;color:#0972d3;margin-bottom:4px">2</div><div style="font-size:11px;color:#44474e">Hover</div></div>';
html+='<div style="background:#fff;padding:24px 16px;border-radius:12px;box-shadow:0 4px 8px 3px rgba(0,0,0,0.15),0 1px 3px rgba(0,0,0,0.3);text-align:center"><div style="font-size:20px;font-weight:700;color:#0972d3;margin-bottom:4px">3</div><div style="font-size:11px;color:#44474e">Buttons</div></div>';
html+='<div style="background:#fff;padding:24px 16px;border-radius:12px;box-shadow:0 6px 10px 4px rgba(0,0,0,0.15),0 2px 3px rgba(0,0,0,0.3);text-align:center"><div style="font-size:20px;font-weight:700;color:#0972d3;margin-bottom:4px">4</div><div style="font-size:11px;color:#44474e">Navigation</div></div>';
html+='<div style="background:#fff;padding:24px 16px;border-radius:12px;box-shadow:0 8px 12px 6px rgba(0,0,0,0.15),0 4px 4px rgba(0,0,0,0.3);text-align:center"><div style="font-size:20px;font-weight:700;color:#0972d3;margin-bottom:4px">5</div><div style="font-size:11px;color:#44474e">Modals</div></div>';
html+='</div></div>';
html+='<div class="spec" onclick="copySpec(this)">CSS: var(--elevation-1), var(--elevation-2), var(--elevation-3), var(--elevation-4), var(--elevation-5)</div>';
html+='</div>';

/* Border Radius Scale */
html+='<div class="card card--outlined"><div class="card-title">Border Radius Scale</div>';
html+='<div style="padding:0 28px 24px"><div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap">';
html+='<div style="width:80px;height:80px;background:#d1e4ff;border-radius:0;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font-size:16px;font-weight:700;color:#001d36">0px</div><div style="font-size:10px;color:#001d36;opacity:0.6">None</div></div>';
html+='<div style="width:80px;height:80px;background:#d1e4ff;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font-size:16px;font-weight:700;color:#001d36">4px</div><div style="font-size:10px;color:#001d36;opacity:0.6">XS</div></div>';
html+='<div style="width:80px;height:80px;background:#d1e4ff;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font-size:16px;font-weight:700;color:#001d36">8px</div><div style="font-size:10px;color:#001d36;opacity:0.6">SM</div></div>';
html+='<div style="width:80px;height:80px;background:#d1e4ff;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font-size:16px;font-weight:700;color:#001d36">12px</div><div style="font-size:10px;color:#001d36;opacity:0.6">MD</div></div>';
html+='<div style="width:80px;height:80px;background:#d1e4ff;border-radius:16px;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font-size:16px;font-weight:700;color:#001d36">16px</div><div style="font-size:10px;color:#001d36;opacity:0.6">LG</div></div>';
html+='<div style="width:80px;height:80px;background:#d1e4ff;border-radius:24px;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font-size:16px;font-weight:700;color:#001d36">24px</div><div style="font-size:10px;color:#001d36;opacity:0.6">XL</div></div>';
html+='<div style="width:80px;height:80px;background:#d1e4ff;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font-size:16px;font-weight:700;color:#001d36">Full</div><div style="font-size:10px;color:#001d36;opacity:0.6">Pill</div></div>';
html+='</div></div>';
html+='<div class="spec" onclick="copySpec(this)">CSS: var(--radius-none), var(--radius-xs), var(--radius-sm), var(--radius-md), var(--radius-lg), var(--radius-xl), var(--radius-full)</div>';
html+='</div>';

/* Card Variants Comparison */
html+='<div class="card card--elevated"><div class="card-title">Card Variants</div>';
html+='<div class="note note-blue"><strong>🃏 Three Variants:</strong> Material Design 3 defines three card styles for visual hierarchy. Click any card to copy its CSS token values.</div>';
html+='<div style="padding:0 28px 24px"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;margin-top:16px">';

/* Elevated variant */
html+='<div class="psp-card-variant-example" style="cursor:pointer" data-copy="box-shadow: var(--elevation-2); border: none; border-radius: var(--radius-md);"><div class="card--elevated" style="padding:24px;border-radius:12px;background:#fff;text-align:center">';
html+='<div style="font-size:32px;margin-bottom:12px">☁️</div>';
html+='<div style="font-size:14px;font-weight:600;color:#1a1c1e;margin-bottom:8px">Elevated</div>';
html+='<div style="font-size:12px;color:#44474e;line-height:1.6">box-shadow: var(--elevation-2), no border</div>';
html+='</div></div>';

/* Filled variant */
html+='<div class="psp-card-variant-example" style="cursor:pointer" data-copy="background: var(--color-surface-variant); border: none; box-shadow: none; border-radius: var(--radius-md);"><div class="card--filled" style="padding:24px;border-radius:12px;text-align:center">';
html+='<div style="font-size:32px;margin-bottom:12px">🎨</div>';
html+='<div style="font-size:14px;font-weight:600;color:#1a1c1e;margin-bottom:8px">Filled</div>';
html+='<div style="font-size:12px;color:#44474e;line-height:1.6">background: var(--color-surface-variant), no border/shadow</div>';
html+='</div></div>';

/* Outlined variant */
html+='<div class="psp-card-variant-example" style="cursor:pointer" data-copy="border: 1px solid var(--color-outline-variant); box-shadow: none; border-radius: var(--radius-md);"><div class="card--outlined" style="padding:24px;border-radius:12px;background:#fff;text-align:center">';
html+='<div style="font-size:32px;margin-bottom:12px">🔲</div>';
html+='<div style="font-size:14px;font-weight:600;color:#1a1c1e;margin-bottom:8px">Outlined</div>';
html+='<div style="font-size:12px;color:#44474e;line-height:1.6">border: 1px solid var(--color-outline-variant), no shadow</div>';
html+='</div></div>';

html+='</div></div>';
html+='<div class="spec" onclick="copySpec(this)">CSS: .card--elevated, .card--filled, .card--outlined</div>';
html+='</div>';

/* PSP-Specific Typography Application */
html+='<div class="card card--outlined"><div class="card-title">PSP Typography Application</div>';
html+='<div class="note note-blue"><strong>📱 PSP Components:</strong> Here\'s how the type scale maps to PSP elements. All specs use the type scale above.</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Type Role</th><th>Actual Size</th><th>Usage</th></tr>';
html+='<tr><td>Instrument Name</td><td>Body Large</td><td>16px / 400</td><td>Line 1 of payment tiles</td></tr>';
html+='<tr><td>Instrument Detail</td><td>Body Small</td><td>12px / 400</td><td>Line 2 (card number, UPI ID)</td></tr>';
html+='<tr><td>Offer Text</td><td>Body Small</td><td>12px / 400</td><td>Savings/cashback text</td></tr>';
html+='<tr><td>Section Header</td><td>Label Small</td><td>11px / 500</td><td>RECOMMENDED, UPI, etc.</td></tr>';
html+='<tr><td>Badge Text</td><td>Label Small</td><td>11px / 500</td><td>Best offer, Featured</td></tr>';
html+='<tr><td>Price</td><td>Title Large</td><td>22px / 400</td><td>Order total price</td></tr>';
html+='<tr><td>CTA Button</td><td>Label Large</td><td>14px / 500</td><td>Continue, Pay Now</td></tr>';
html+='<tr><td>Hero Title</td><td>Display Medium</td><td>45px / 400</td><td>Page hero sections</td></tr>';
html+='</table></div>';
html+='<div class="note">Font family: Amazon Ember. Falls back to -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif.</div>';
html+='</div>';

html+='</div>';

/* ══════════════════════════════════════════════════════════════
   2. COMPONENTS (kept from Instrument Components)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#0972d3">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Components</h1>';
html+='<p class="section-header__desc">Component specifications for PSP elements. Primary component: Instrument tiles used for all payment methods with radio button selection.</p>';
html+='</div></div>';
html+='<div class="note note-blue"><strong>⚡ Semi-Modernized PSP:</strong> Radio buttons are used for selection. Only the radio button is clickable, not the entire tile. Selected tiles show blue border + filled radio button.</div>';
html+='<div class="warn">\u26A0\uFE0F <b>BUTTONS:</b> Do not document buttons here. They come from master libraries (Tuxedo Mobile / RIO).</div>';
html+='<div class="note note-blue">Line 2 format changes based on instrument type: Cards show network + last 4 + name, UPI shows bank + last 4, Wallets show balance.</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">';
html+='<div class="card" style="margin-bottom:0"><div class="card-title" style="font-size:14px;padding:16px 16px 8px">State 1 \u2014 Transaction Ready</div><span class="state-label state-active" style="margin-left:16px">Active</span>';
html+='<div class="preview" style="min-height:120px;padding:16px;margin:12px 16px"><div style="width:100%;max-width:340px"><div style="background:#fff;border:0.55px solid #D5D9D9;border-radius:12px;padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;background:#FFF;box-shadow:0 0 3.6px rgba(0,0,0,0.08);border:0.5px solid #E7E7E7;display:flex;align-items:center;justify-content:center;font-size:9px;color:#888C8C;flex-shrink:0">ICON</div><div style="flex:1"><div style="font-size:16px;color:#0F1111">Instrument Name</div><div style="font-size:13px;color:#565959">NETWORK &#8226;&#8226;XXXX | Name</div><div style="font-size:13px;color:#0B7B3C;margin-top:2px">Save &#8377;XX as cashback. <span style="color:#2162A1">Details</span></div></div></div></div></div>';
html+='</div>';
html+='<div class="card" style="margin-bottom:0"><div class="card-title" style="font-size:14px;padding:16px 16px 8px">State 2 \u2014 Selected</div><span class="state-label state-selected" style="margin-left:16px">Selected</span>';
html+='<div class="preview" style="min-height:120px;padding:16px;margin:12px 16px"><div style="width:100%;max-width:340px"><div style="background:#EDF8FF;border:1px solid #2162A1;border-radius:12px;padding:12px;display:flex;align-items:center;gap:10px"><div style="width:54px;height:36px;border-radius:5px;background:#FFF;box-shadow:0 0 3.6px rgba(0,0,0,0.08);border:0.5px solid #E7E7E7;display:flex;align-items:center;justify-content:center;font-size:9px;color:#888C8C;flex-shrink:0">ICON</div><div style="flex:1"><div style="font-size:16px;color:#0F1111">Instrument Name</div><div style="font-size:13px;color:#565959">NETWORK &#8226;&#8226;XXXX | Name</div><div style="font-size:13px;color:#0B7B3C;margin-top:2px">Save &#8377;XX as cashback. <span style="color:#2162A1">Details</span></div></div></div></div></div>';
html+='</div>';
html+='<div class="card" style="margin-bottom:0"><div class="card-title" style="font-size:14px;padding:16px 16px 8px">State 3 \u2014 Non-Transaction Ready</div><span class="state-label state-disabled" style="margin-left:16px">Disabled</span>';
html+='<div class="preview" style="min-height:120px;padding:16px;margin:12px 16px"><div style="width:100%;max-width:340px"><div style="background:#fff;border:0.55px solid #D5D9D9;border-radius:12px;padding:12px;display:flex;align-items:center;gap:10px;opacity:0.7"><div style="width:54px;height:36px;border-radius:5px;background:#FFF;box-shadow:0 0 3.6px rgba(0,0,0,0.08);border:0.5px solid #E7E7E7;display:flex;align-items:center;justify-content:center;font-size:9px;color:#888C8C;flex-shrink:0">ICON</div><div style="flex:1"><div style="font-size:16px;color:#0F1111">Instrument Name</div><div style="font-size:13px;color:#CC0C39">Card expired \u2014 <span style="color:#2162A1">Why?</span></div></div></div></div></div>';
html+='</div>';
html+='</div>';
/* State 4 — Bottom Sticky Sleeve */
html+='<div class="card"><div class="card-title">State 4 \u2014 Bottom Sticky Sleeve</div><span class="state-label state-service">Bottom Sticky Sleeve</span>';
html+='<div class="preview"><div style="width:100%;max-width:340px">';
html+='<div style="background:#fff;border:0.55px solid #D5D9D9;border-radius:12px;padding:16px;position:relative">';
html+='<div style="display:inline-block;background:#0A7CD1;border-radius:13px;padding:2px 10px;font-size:11px;font-weight:600;color:#ffffff;margin-bottom:12px">Featured</div>';
html+='<div style="display:flex;align-items:center;gap:12px">';
html+='<div style="width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/APay UPI.png" width="48" height="48" style="border-radius:50%;object-fit:cover" alt="Amazon Pay UPI"></div>';
html+='<div style="flex:1"><div style="font-size:16px;color:#0F1111;font-weight:500">Amazon Pay UPI</div>';
html+='<div style="font-size:13px;color:#0B7B3C">Save \u20B925 as cashback</div></div>';
html+='<span style="font-size:18px;color:#0972d3;font-weight:300">\u203A</span>';
html+='</div>';
html+='<div style="margin-top:16px;padding-top:16px;border-top:1px solid #E9EBED;display:flex;justify-content:space-between;align-items:center">';
html+='<div><span style="font-size:12px;font-weight:700;color:#0F1111">\u20B9</span><span style="font-size:22px;font-weight:700;color:#0F1111">293</span><span style="font-size:12px;color:#0F1111;margin-left:4px">\u2303</span><div style="font-size:12px;color:#565959">includes fees</div></div>';
html+='<div style="background:#FFD814;border-radius:80px;padding:12px 28px;font-size:14px;font-weight:400;color:#0F1111">Register & Pay</div>';
html+='</div></div></div></div>';
html+='<button class="code-toggle" onclick="toggleCode(this)">\u25B8 Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">HTML</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">&lt;!-- Bottom Sticky Sleeve State --&gt;</span><br>';
html+='<span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"instrument-tile tile-service-pay"</span><span class="code-tag">&gt;</span><br>';
html+='  <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"tile-badge"</span><span class="code-tag">&gt;</span>Featured<span class="code-tag">&lt;/div&gt;</span><br>';
html+='  <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"tile-row"</span><span class="code-tag">&gt;</span><br>';
html+='    <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"tile-icon tile-icon--circular"</span><span class="code-tag">&gt;</span>ICON<span class="code-tag">&lt;/div&gt;</span><br>';
html+='    <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"tile-content"</span><span class="code-tag">&gt;</span><br>';
html+='      <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"tile-name"</span><span class="code-tag">&gt;</span>Instrument Name<span class="code-tag">&lt;/div&gt;</span><br>';
html+='      <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"tile-offer"</span><span class="code-tag">&gt;</span>Save \u20B9XX as cashback<span class="code-tag">&lt;/div&gt;</span><br>';
html+='    <span class="code-tag">&lt;/div&gt;</span><br>';
html+='    <span class="code-tag">&lt;span</span> <span class="code-attr">class=</span><span class="code-value">"tile-chevron"</span><span class="code-tag">&gt;</span>\u203A<span class="code-tag">&lt;/span&gt;</span><br>';
html+='  <span class="code-tag">&lt;/div&gt;</span><br>';
html+='  <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"tile-footer"</span><span class="code-tag">&gt;</span><br>';
html+='    <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"tile-price"</span><span class="code-tag">&gt;</span>\u20B9293<span class="code-tag">&lt;/div&gt;</span><br>';
html+='    <span class="code-tag">&lt;button</span> <span class="code-attr">class=</span><span class="code-value">"tile-cta"</span><span class="code-tag">&gt;</span>Register &amp; Pay<span class="code-tag">&lt;/button&gt;</span><br>';
html+='  <span class="code-tag">&lt;/div&gt;</span><br>';
html+='<span class="code-tag">&lt;/div&gt;</span></code></div>';
html+='<button class="code-toggle" onclick="toggleCode(this)">\u25B8 Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">CSS</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">/* Bottom Sticky Sleeve State */</span><br>';
html+='<span class="code-attr">.tile-service-pay</span> {<br>';
html+='  <span class="code-attr">background:</span> <span class="code-value">#FFFFFF</span>;<br>';
html+='  <span class="code-attr">border:</span> <span class="code-value">0.55px solid #D5D9D9</span>;<br>';
html+='  <span class="code-attr">border-radius:</span> <span class="code-value">12px</span>;<br>';
html+='  <span class="code-attr">padding:</span> <span class="code-value">16px</span>;<br>';
html+='}<br>';
html+='<span class="code-attr">.tile-icon--circular</span> {<br>';
html+='  <span class="code-attr">width:</span> <span class="code-value">48px</span>;<br>';
html+='  <span class="code-attr">height:</span> <span class="code-value">48px</span>;<br>';
html+='  <span class="code-attr">border-radius:</span> <span class="code-value">50%</span>;<br>';
html+='}<br>';
html+='<span class="code-attr">.tile-footer</span> {<br>';
html+='  <span class="code-attr">border-top:</span> <span class="code-value">1px solid #E9EBED</span>;<br>';
html+='  <span class="code-attr">margin-top:</span> <span class="code-value">16px</span>;<br>';
html+='  <span class="code-attr">padding-top:</span> <span class="code-value">16px</span>;<br>';
html+='  <span class="code-attr">display:</span> <span class="code-value">flex</span>;<br>';
html+='  <span class="code-attr">justify-content:</span> <span class="code-value">space-between</span>;<br>';
html+='  <span class="code-attr">align-items:</span> <span class="code-value">center</span>;<br>';
html+='}<br>';
html+='<span class="code-attr">.tile-cta</span> {<br>';
html+='  <span class="code-attr">background:</span> <span class="code-value">#FFD814</span>;<br>';
html+='  <span class="code-attr">border-radius:</span> <span class="code-value">80px</span>;<br>';
html+='  <span class="code-attr">padding:</span> <span class="code-value">12px 28px</span>;<br>';
html+='  <span class="code-attr">font-size:</span> <span class="code-value">14px</span>;<br>';
html+='}</code></div>';
html+='<div class="note" style="margin:20px 28px"><strong>Bottom Sticky Sleeve context:</strong> Used in service flows (recharge, bill pay, subscriptions) where the instrument tile includes an inline CTA and price display. The tile acts as both selection and action trigger \u2014 no separate bottom CTA bar needed.</div>';

html+='</div>';
html+='<div class="card"><div class="card-title">Line 2 Format by Instrument Type</div><div class="tbl-wrap"><table class="tbl"><tr><th>Type</th><th>Format</th><th>Example</th></tr>';
html+='<tr><td>Credit/Debit Card</td><td>NETWORK \u2022\u2022\u2022\u2022XXXX | Name</td><td>VISA \u2022\u2022\u2022\u20220424 | Akshay</td></tr>';
html+='<tr><td>UPI</td><td>Bank Name \u2022\u2022\u2022\u2022XXXX</td><td>ICICI Bank \u2022\u2022\u2022\u20220911</td></tr>';
html+='<tr><td>Wallet / Balance</td><td>Balance: \u20B9XXX</td><td>Balance: \u20B960</td></tr>';
html+='<tr><td>Pay Later</td><td>Available credit: \u20B9XX,XXX</td><td>Available credit: \u20B9 60,000</td></tr>';
html+='<tr><td>COD</td><td>Descriptive text</td><td>Convenience fee of \u20B97 will apply</td></tr>';
html+='<tr><td>EMI / Net Banking</td><td>No Line 2</td><td>\u2014</td></tr>';
html+='</table></div></div>';
html+='<div class="card"><div class="card-title">Instrument Tile Structure</div>';
html+='<div class="note note-blue" style="margin-top:16px"><strong>\uD83D\uDCCB Generic Structure:</strong> The instrument tile is used across all payment contexts (Checkout, Bottom Sticky Sleeve, Recharge). The structure adapts based on context — not all elements are present in every variant.</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Checkout (Radio)</th><th>Bottom Sticky Sleeve</th><th>Notes</th></tr>';
html+='<tr><td><strong>Container</strong></td><td>border 0.55px #D5D9D9, radius 12px, padding 12px</td><td>border 0.55px #D5D9D9, radius 12px, padding 16px</td><td>Bottom Sticky Sleeve has more padding for inline CTA</td></tr>';
html+='<tr><td><strong>Icon</strong></td><td>54 \u00D7 36px, radius 5px (rectangular)</td><td>48 \u00D7 48px, radius 50% (circular)</td><td>Circular icons for service flows, rectangular for checkout</td></tr>';
html+='<tr><td><strong>Badge</strong></td><td>Above tile content, 66px left offset</td><td>Top-left inside tile, inline</td><td>Badge position varies by context</td></tr>';
html+='<tr><td><strong>Line 1 (Name)</strong></td><td>16px / 400 / #0F1111</td><td>16px / 500 / #0F1111</td><td>Slightly bolder in Bottom Sticky Sleeve</td></tr>';
html+='<tr><td><strong>Line 2 (Detail)</strong></td><td>13px / 400 / #565959</td><td>\u2014 (not used)</td><td>Bottom Sticky Sleeve uses offer text instead</td></tr>';
html+='<tr><td><strong>Line 3 (Offer)</strong></td><td>13px / 400 / #0B7B3C</td><td>13px / 400 / #0B7B3C</td><td>Same across contexts</td></tr>';
html+='<tr><td><strong>Selection</strong></td><td>Radio button (20\u00D720px, left-aligned)</td><td>Chevron (\u203A) right-aligned</td><td>Radio for multi-select view, chevron for single-action</td></tr>';
html+='<tr><td><strong>Inline CTA</strong></td><td>\u2014 (uses bottom sticky bar)</td><td>Yellow pill button, 80px radius</td><td>Bottom Sticky Sleeve has CTA inside tile</td></tr>';
html+='<tr><td><strong>Price display</strong></td><td>\u2014 (in sticky CTA bar)</td><td>22px / 700 / #0F1111, inside tile footer</td><td>Price shown inline for service flows</td></tr>';
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

/* Per-Instrument Specifications */
html+='<div class="card"><div class="card-title">Per-Instrument Specifications</div>';
html+='<div class="note note-blue"><strong>📋 Instrument Detail:</strong> Each payment instrument has unique states, preselection rules, badges, and CTAs. This table documents the specifics for each instrument type.</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Instrument</th><th>States</th><th>Preselection Rule</th><th>Badge</th><th>CTA / Action</th></tr>';
html+='<tr><td><strong>Amazon Pay Balance</strong></td><td>Sufficient balance, Insufficient balance, Zero balance</td><td>Auto-select when balance \u2265 order total and no Best Offer exists</td><td>Show exact balance (e.g., \u201C\u20B91,234 available\u201D)</td><td>\u201CAdd Money\u201D when insufficient; hidden when sufficient</td></tr>';
html+='<tr><td><strong>Amazon Pay UPI</strong></td><td>Linked (with bank), Not linked (setup prompt), Failed (retry)</td><td>Previously used bank auto-selected within UPI group</td><td>\u201CPreviously used\u201D on last successful bank</td><td>Bank pill: bank logo + last 4 digits</td></tr>';
html+='<tr><td><strong>Amazon Pay ICICI</strong></td><td>Active, Blocked, Expired</td><td>Prioritized when Best Offer cashback available</td><td>\u201CBest offer\u201D when cashback active</td><td>Show cashback amount on Line 3</td></tr>';
html+='<tr><td><strong>Amazon Pay Later</strong></td><td>Active (with credit limit), Inactive, Overdue</td><td>Select if highest offer and no APB fast path</td><td>Show available credit</td><td>Display \u201CAvailable credit: \u20B9XX,XXX\u201D</td></tr>';
html+='<tr><td><strong>Credit/Debit Cards</strong></td><td>Valid, Expired, Blocked, CVV required</td><td>Previously used card auto-selected if no offer</td><td>Network logo + last 4 + cardholder name</td><td>\u201CAdd new card\u201D link in section</td></tr>';
html+='<tr><td><strong>Net Banking</strong></td><td>Available, Unavailable (bank down)</td><td>Never preselected (requires bank selection)</td><td>\u2014</td><td>Opens bank selection list</td></tr>';
html+='<tr><td><strong>EMI</strong></td><td>Eligible, Not eligible (order value too low)</td><td>Never preselected</td><td>\u2014</td><td>Opens EMI plan selection</td></tr>';
html+='<tr><td><strong>Cash on Delivery</strong></td><td>Available, Unavailable (PIN code), Fee applies</td><td>Never preselected (lowest priority)</td><td>Show fee if applicable</td><td>Display \u201CConvenience fee of \u20B9X will apply\u201D</td></tr>';
html+='<tr><td><strong>Gift Cards</strong></td><td>Has balance, No balance, Partially redeemable</td><td>Never preselected (supplementary)</td><td>Show redeemable amount</td><td>\u201CAdd Gift Card or Promo Code\u201D</td></tr>';
html+='</table></div></div>';

html+='</div>';

/* ══════════════════════════════════════════════════════════════
   3. PATTERNS (merged Layout Patterns + Bottom Sticky CTA)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#7c3aed">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Patterns</h1>';
html+='<p class="section-header__desc">Section grouping, spacing, visual hierarchy rules, and the bottom sticky CTA bar for the PSP page layout.</p>';
html+='</div></div>';
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
html+='<div class="card"><div class="card-title">Section Order (Fixed)</div><div style="font-size:13px;line-height:2.4;color:var(--body-color);padding:0 28px 24px">';
var sn=["Header & Address Bar","RECOMMENDED (up to 3 tiles)","UPI","CREDIT & DEBIT CARDS","MORE WAYS TO PAY","GIFT CARDS","Savings Bar","Sticky CTA Bar"];
for(var si=0;si<8;si++){html+='<div><span class="flow-num">'+(si+1)+'</span>'+sn[si]+'</div>';}
html+='</div><div class="note">Section order is fixed and must not change based on user history or A/B tests.</div></div>';
/* Badge Variants — Each badge shown individually with Non-Selected (grey) and Selected (blue) states */
html+='<div class="card"><div class="card-title">Badge Variants</div>';
html+='<div style="padding:0 28px 24px">';
html+='<p style="font-size:13px;color:#565959;margin:12px 0 20px">Each badge has two color states: <strong>Grey</strong> when the parent instrument is not selected, and <strong>Blue</strong> when the parent instrument is selected.</p>';
/* Best Offer badge */
html+='<div style="margin-bottom:24px"><div style="font-size:13px;font-weight:600;color:#0F1111;margin-bottom:12px">Best Offer</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">';
html+='<div><div style="font-size:11px;font-weight:600;color:#565959;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Non-Selected</div><div class="preview" style="margin:0;padding:16px;justify-content:flex-start"><span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:3px 10px;border-radius:13px;font-weight:500">Best offer</span></div></div>';
html+='<div><div style="font-size:11px;font-weight:600;color:#565959;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Selected</div><div class="preview" style="margin:0;padding:16px;justify-content:flex-start;background:#EDF8FF;border-color:#2162A1"><span style="background:#0A7CD1;color:#fff;font-size:10px;padding:3px 10px;border-radius:13px;font-weight:500">Best offer</span></div></div>';
html+='</div></div>';
/* Previously Used badge */
html+='<div style="margin-bottom:24px"><div style="font-size:13px;font-weight:600;color:#0F1111;margin-bottom:12px">Previously Used</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">';
html+='<div><div style="font-size:11px;font-weight:600;color:#565959;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Non-Selected</div><div class="preview" style="margin:0;padding:16px;justify-content:flex-start"><span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:3px 10px;border-radius:13px;font-weight:500">Previously used</span></div></div>';
html+='<div><div style="font-size:11px;font-weight:600;color:#565959;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Selected</div><div class="preview" style="margin:0;padding:16px;justify-content:flex-start;background:#EDF8FF;border-color:#2162A1"><span style="background:#0A7CD1;color:#fff;font-size:10px;padding:3px 10px;border-radius:13px;font-weight:500">Previously used</span></div></div>';
html+='</div></div>';
/* Featured badge */
html+='<div style="margin-bottom:12px"><div style="font-size:13px;font-weight:600;color:#0F1111;margin-bottom:12px">Featured</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">';
html+='<div><div style="font-size:11px;font-weight:600;color:#565959;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Non-Selected</div><div class="preview" style="margin:0;padding:16px;justify-content:flex-start"><span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:3px 10px;border-radius:13px;font-weight:500">Featured</span></div></div>';
html+='<div><div style="font-size:11px;font-weight:600;color:#565959;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Selected</div><div class="preview" style="margin:0;padding:16px;justify-content:flex-start;background:#EDF8FF;border-color:#2162A1"><span style="background:#0A7CD1;color:#fff;font-size:10px;padding:3px 10px;border-radius:13px;font-weight:500">Featured</span></div></div>';
html+='</div></div>';
html+='</div>';
html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">HTML</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">&lt;!-- Badge Variants --&gt;</span><br>';
html+='<span class="code-tag">&lt;span</span> <span class="code-attr">class=</span><span class="code-value">"badge badge-primary"</span><span class="code-tag">&gt;</span>Best offer<span class="code-tag">&lt;/span&gt;</span><br>';
html+='<span class="code-tag">&lt;span</span> <span class="code-attr">class=</span><span class="code-value">"badge badge-secondary"</span><span class="code-tag">&gt;</span>Previously used<span class="code-tag">&lt;/span&gt;</span><br>';
html+='<span class="code-tag">&lt;span</span> <span class="code-attr">class=</span><span class="code-value">"badge badge-secondary"</span><span class="code-tag">&gt;</span>Featured<span class="code-tag">&lt;/span&gt;</span></code></div>';
html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">CSS</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">/* Badge Styles */</span><br>';
html+='<span class="code-attr">.badge</span> {<br>';
html+='  <span class="code-attr">font-size:</span> <span class="code-value">10px</span>;<br>';
html+='  <span class="code-attr">padding:</span> <span class="code-value">2px 8px</span>;<br>';
html+='  <span class="code-attr">border-radius:</span> <span class="code-value">13px</span>;<br>';
html+='  <span class="code-attr">display:</span> <span class="code-value">inline-block</span>;<br>';
html+='}<br>';
html+='<span class="code-attr">.badge-primary</span> {<br>';
html+='  <span class="code-attr">background:</span> <span class="code-value">#0A7CD1</span>;<br>';
html+='  <span class="code-attr">color:</span> <span class="code-value">#FFFFFF</span>;<br>';
html+='}<br>';
html+='<span class="code-attr">.badge-secondary</span> {<br>';
html+='  <span class="code-attr">background:</span> <span class="code-value">#E3E6E6</span>;<br>';
html+='  <span class="code-attr">color:</span> <span class="code-value">#232F3E</span>;<br>';
html+='}</code></div>';

html+='</div>';
/* UPI Pill */
html+='<div class="card"><div class="card-title">UPI Bank Pill</div><div class="preview">';
html+='<div style="display:inline-flex;align-items:center;gap:6px;background:#FFF;border:0.46px solid #D5D9D9;border-radius:30px;padding:4px 8px"><img src="PSP Instument icons/ICICI Bank UPI Pill.png" style="width:13px;height:13px;border-radius:50%"><span style="font-size:13px;color:#565959">ICICI Bank &#8226;&#8226;0911</span></div>';
html+='</div>';
html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">HTML</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">&lt;!-- UPI Bank Pill --&gt;</span><br>';
html+='<span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"upi-pill"</span><span class="code-tag">&gt;</span><br>';
html+='  <span class="code-tag">&lt;img</span> <span class="code-attr">src=</span><span class="code-value">"bank-icon.png"</span> <span class="code-attr">class=</span><span class="code-value">"upi-icon"</span> <span class="code-tag">/&gt;</span><br>';
html+='  <span class="code-tag">&lt;span</span> <span class="code-attr">class=</span><span class="code-value">"upi-text"</span><span class="code-tag">&gt;</span>ICICI Bank &#8226;&#8226;0911<span class="code-tag">&lt;/span&gt;</span><br>';
html+='<span class="code-tag">&lt;/div&gt;</span></code></div>';
html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">CSS</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">/* UPI Pill */</span><br>';
html+='<span class="code-attr">.upi-pill</span> {<br>';
html+='  <span class="code-attr">display:</span> <span class="code-value">inline-flex</span>;<br>';
html+='  <span class="code-attr">align-items:</span> <span class="code-value">center</span>;<br>';
html+='  <span class="code-attr">gap:</span> <span class="code-value">6px</span>;<br>';
html+='  <span class="code-attr">background:</span> <span class="code-value">#FFFFFF</span>;<br>';
html+='  <span class="code-attr">border:</span> <span class="code-value">0.46px solid #D5D9D9</span>;<br>';
html+='  <span class="code-attr">border-radius:</span> <span class="code-value">30px</span>;<br>';
html+='  <span class="code-attr">padding:</span> <span class="code-value">4px 8px</span>;<br>';
html+='}<br>';
html+='<span class="code-attr">.upi-icon</span> { <span class="code-attr">width:</span> <span class="code-value">13px</span>; <span class="code-attr">height:</span> <span class="code-value">13px</span>; <span class="code-attr">border-radius:</span> <span class="code-value">50%</span>; }<br>';
html+='<span class="code-attr">.upi-text</span> { <span class="code-attr">font-size:</span> <span class="code-value">13px</span>; <span class="code-attr">color:</span> <span class="code-value">#565959</span>; }</code></div>';

html+='</div>';
/* CTA BarA Bar (merged from Bottom Sticky CTA) */
html+='<div class="card"><div class="card-title">Bottom Sticky CTA Bar</div>';
html+='<div class="preview"><div style="width:100%;max-width:360px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 -2px 5px rgba(0,0,0,.08);border:1px solid #D5D9D9">';
html+='<div style="background:#E8FFF8;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0"><span style="font-size:14px;color:#0B7B3C;font-weight:700">&#8377;15 saved</span><span style="font-size:14px;color:#2162A1">See offers &rsaquo;</span></div>';
html+='<div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center"><div><span style="font-size:13px;font-weight:700">&#8377;</span><span style="font-size:22px;font-weight:700">504</span><div style="font-size:14px;color:#565959">Includes fees</div></div><div style="background:#FFD814;border-radius:92px;width:170px;height:47px;display:flex;align-items:center;justify-content:center"><span style="font-size:16px;color:#0F1111">Continue</span></div></div>';
html+='</div></div>';
html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">HTML</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">&lt;!-- Bottom Sticky CTA Bar --&gt;</span><br>';
html+='<span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"cta-bar"</span><span class="code-tag">&gt;</span><br>';
html+='  <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"savings-bar"</span><span class="code-tag">&gt;</span><br>';
html+='    <span class="code-tag">&lt;span</span> <span class="code-attr">class=</span><span class="code-value">"savings-text"</span><span class="code-tag">&gt;</span>&#8377;15 saved<span class="code-tag">&lt;/span&gt;</span><br>';
html+='    <span class="code-tag">&lt;span</span> <span class="code-attr">class=</span><span class="code-value">"offers-link"</span><span class="code-tag">&gt;</span>See offers &rsaquo;<span class="code-tag">&lt;/span&gt;</span><br>';
html+='  <span class="code-tag">&lt;/div&gt;</span><br>';
html+='  <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"action-bar"</span><span class="code-tag">&gt;</span><br>';
html+='    <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"price-display"</span><span class="code-tag">&gt;</span><br>';
html+='      <span class="code-tag">&lt;span</span> <span class="code-attr">class=</span><span class="code-value">"price"</span><span class="code-tag">&gt;</span>&#8377;504<span class="code-tag">&lt;/span&gt;</span><br>';
html+='      <span class="code-tag">&lt;div</span> <span class="code-attr">class=</span><span class="code-value">"price-note"</span><span class="code-tag">&gt;</span>Includes fees<span class="code-tag">&lt;/div&gt;</span><br>';
html+='    <span class="code-tag">&lt;/div&gt;</span><br>';
html+='    <span class="code-tag">&lt;button</span> <span class="code-attr">class=</span><span class="code-value">"cta-button"</span><span class="code-tag">&gt;</span>Continue<span class="code-tag">&lt;/button&gt;</span><br>';
html+='  <span class="code-tag">&lt;/div&gt;</span><br>';
html+='<span class="code-tag">&lt;/div&gt;</span></code></div>';
html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">CSS</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">/* CTA Bar */</span><br>';
html+='<span class="code-attr">.cta-bar</span> { <span class="code-attr">position:</span> <span class="code-value">fixed</span>; <span class="code-attr">bottom:</span> <span class="code-value">0</span>; <span class="code-attr">left:</span> <span class="code-value">0</span>; <span class="code-attr">right:</span> <span class="code-value">0</span>; }<br>';
html+='<span class="code-attr">.savings-bar</span> {<br>';
html+='  <span class="code-attr">background:</span> <span class="code-value">#E8FFF8</span>;<br>';
html+='  <span class="code-attr">padding:</span> <span class="code-value">10px 16px</span>;<br>';
html+='  <span class="code-attr">border-radius:</span> <span class="code-value">12px 12px 0 0</span>;<br>';
html+='}<br>';
html+='<span class="code-attr">.savings-text</span> { <span class="code-attr">font-size:</span> <span class="code-value">14px</span>; <span class="code-attr">font-weight:</span> <span class="code-value">700</span>; <span class="code-attr">color:</span> <span class="code-value">#0B7B3C</span>; }<br>';
html+='<span class="code-attr">.cta-button</span> {<br>';
html+='  <span class="code-attr">background:</span> <span class="code-value">#FFD814</span>;<br>';
html+='  <span class="code-attr">border-radius:</span> <span class="code-value">92px</span>;<br>';
html+='  <span class="code-attr">width:</span> <span class="code-value">170px</span>;<br>';
html+='  <span class="code-attr">height:</span> <span class="code-value">47px</span>;<br>';
html+='}</code></div>';

html+='</div>';
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
html+='<div class="section-header" style="border-left-color:#dc2626">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">States & Behavior</h1>';
html+='<p class="section-header__desc">All interactive states for instrument tiles, page-level elements, preselection logic, and grouping rules.</p>';
html+='</div></div>';
/* Tile States */
html+='<div class="card"><div class="card-title">Tile States Summary</div><div class="tbl-wrap"><table class="tbl"><tr><th>State</th><th>Background</th><th>Border</th><th>Radio Button</th><th>Opacity</th><th>Lines</th></tr>';
html+='<tr><td><span class="state-label state-active">Transaction Ready</span></td><td>#FFFFFF</td><td>1px solid #D5D9D9</td><td>Empty circle (2px #D5D9D9)</td><td>1.0</td><td>1, 2, 3</td></tr>';
html+='<tr><td><span class="state-label state-selected">Selected</span></td><td>#EDF8FF</td><td>2px solid #2162A1</td><td>Filled blue (#2162A1 + 8px white dot)</td><td>1.0</td><td>1, 2, 3</td></tr>';
html+='<tr><td><span class="state-label state-disabled">Non-Txn Ready</span></td><td>#FFFFFF</td><td>1px solid #D5D9D9</td><td>Disabled (gray, opacity 0.4)</td><td>0.6</td><td>1, 2 (reason)</td></tr>';
html+='<tr><td><span class="state-label state-service">Bottom Sticky Sleeve</span></td><td>#FFFFFF</td><td>0.55px solid #D5D9D9</td><td>Chevron (\u203A) instead of radio</td><td>1.0</td><td>1, 3 + inline CTA</td></tr>';
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
html+='<div class="card" style="margin-top:24px"><div class="card-title">Preselection Logic</div><div style="padding:0 28px 24px;font-size:13px;line-height:2.2;color:var(--body-color)">';
html+='<div><span class="flow-num">IF</span> <b>Best Offer</b> instrument exists \u2192 Auto-select it</div>';
html+='<div><span class="flow-num" style="background:#565959">ELIF</span> <b>Previously Used</b> instrument exists \u2192 Auto-select it</div>';
html+='<div><span class="flow-num" style="background:#565959">ELIF</span> Only <b>one instrument</b> available \u2192 Auto-select it</div>';
html+='<div><span class="flow-num" style="background:#888C8C">ELSE</span> No preselection \u2014 user must choose</div>';
html+='</div></div>';
/* Grouping Rules (moved from Mental Model) */
html+='<div class="card" style="margin-top:24px"><div class="card-title">Grouping Rules</div><div style="padding:0 28px 24px"><div class="grid-2" style="margin-top:12px">';
html+='<div class="do"><strong>\u2713 How it works</strong><ul><li>Recommended instruments are pulled from native categories</li><li>Native categories remain visible</li><li>Max 3 instruments in Recommended section</li></ul></div>';
html+='<div class="dont"><strong>\u2717 Common mistakes</strong><ul><li>Showing more than 3 recommended instruments</li><li>Hiding native category when instrument is in Recommended</li><li>Changing section order based on user history</li></ul></div>';
html+='</div>';
html+='<div class="tbl-wrap" style="margin-top:20px"><table class="tbl"><tr><th>Group</th><th>Contents</th><th>Visibility</th><th>Max Items</th></tr>';
html+='<tr><td><strong>Primary (Recommended)</strong></td><td>Best Offer + Previously Used + Featured</td><td>Always expanded</td><td>3</td></tr>';
html+='<tr><td><strong>Secondary (Native Categories)</strong></td><td>UPI, Credit/Debit Cards</td><td>Always expanded</td><td>Unlimited</td></tr>';
html+='<tr><td><strong>Tertiary (More Ways)</strong></td><td>APB, Pay Later, COD, EMI, Net Banking</td><td>Always expanded</td><td>Unlimited</td></tr>';
html+='<tr><td><strong>Collapsed</strong></td><td>Gift Cards, Promo Codes</td><td>Collapsed by default, tap to expand</td><td>1 row</td></tr>';
html+='</table></div></div></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   5. CONTENT GUIDELINES (renamed from Character Constraints)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#d97706">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Content Guidelines</h1>';
html+='<p class="section-header__desc">Maximum character limits for all text elements in the PSP. Exceeding these limits will cause truncation with ellipsis.</p>';
html+='</div></div>';
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
html+='<div class="section-header" style="border-left-color:#0891b2">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Mental Model & Hierarchy</h1>';
html+='<p class="section-header__desc">The PSP follows a specific hierarchy to optimise conversion and user experience. The wireframe below maps every numbered zone to its purpose and spec.</p>';
html+='</div></div>';
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
html+='<div style="padding:10px 16px;background:#F7FEFF;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #E5E5E5"><div style="display:flex;align-items:flex-start;gap:6px"><span style="font-size:14px;margin-top:1px">&#128205;</span><div><span style="font-size:13px;font-weight:700;color:#0F1111">Deliver to Akshay</span><div style="font-size:13px;color:#0F1111">Bengaluru 560001, Karnataka</div></div></div><span style="font-size:13px;color:#2162A1;flex-shrink:0">Change</span></div>';
html+='<div style="padding:12px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">RECOMMENDED</div>';
html+='<div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:12px">';
html+='<div style="background:#EDF8FF;border:2px solid #2162A1;border-radius:12px 12px 0 0;padding:12px;position:relative"><div style="display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/Amazon Pay ICICI credit card.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="margin-bottom:4px"><span style="background:#0A7CD1;color:#fff;font-size:10px;padding:2px 8px;border-radius:13px;display:inline-block">Best offer</span></div><div style="font-size:14px;font-weight:700;color:#0F1111">Amazon Pay ICICI credit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;0424 | Akshay</div><div style="font-size:12px;color:#0B7B3C">Save &#8377;10 as cashback. <span style="color:#2162A1">Details</span></div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#2162A1" stroke-width="2"/><circle cx="10" cy="10" r="5" fill="#2162A1"/></svg></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;position:relative"><div style="display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/HDFC Banks.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="margin-bottom:4px"><span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:2px 8px;border-radius:13px;display:inline-block">Previously used</span></div><div style="font-size:14px;font-weight:400;color:#0F1111">HDFC credit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;0422 | Akshay</div><div style="font-size:12px;color:#0B7B3C">Save &#8377;6. <span style="color:#2162A1">Details</span></div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;border-radius:0 0 12px 12px;position:relative"><div style="display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden"><img src="PSP Instument icons/APay UPI.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="margin-bottom:4px"><span style="background:#E3E6E6;color:#232F3E;font-size:10px;padding:2px 8px;border-radius:13px;display:inline-block">Featured</span></div><div style="font-size:14px;font-weight:400;color:#0F1111">Amazon Pay UPI</div><div style="display:flex;align-items:center;gap:4px;background:#FFF;border:0.5px solid #D5D9D9;border-radius:20px;padding:3px 8px;margin-top:4px;margin-right:16px"><img src="PSP Instument icons/ICICI Bank UPI Pill.png" style="width:14px;height:14px;border-radius:50%;object-fit:cover;flex-shrink:0"><span style="font-size:11px;color:#565959;flex:1">ICICI Bank &#8226;&#8226;0911</span><span style="font-size:14px;color:#565959;flex-shrink:0">&rsaquo;</span></div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div></div>';
html+='</div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">UPI</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px"><div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;"><img src="PSP Instument icons/Any other UPI.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;font-size:14px;font-weight:400;color:#0F1111">Pay by any UPI App</div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div><div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div><div style="padding:12px"><span style="font-size:14px;color:#2162A1">+ Add account to Amazon Pay UPI</span></div></div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">CREDIT &amp; DEBIT CARDS</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px"><div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;"><img src="PSP Instument icons/HDFC Banks.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:400;color:#0F1111">HDFC debit card</div><div style="font-size:12px;color:#565959">VISA &#8226;&#8226;0333 | Akshay</div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div><div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div><div style="padding:12px"><span style="font-size:14px;color:#2162A1">+ Add new credit or debit card</span></div></div></div>';
html+='<div style="padding:8px 16px 0"><div style="font-size:13px;font-weight:700;color:#565959;letter-spacing:.5px;margin-bottom:8px">MORE WAYS TO PAY</div><div style="background:#FFF;border:0.55px solid #D5D9D9;border-radius:12px;overflow:hidden;margin-bottom:8px">';
html+='<div style="padding:12px;display:flex;align-items:flex-start;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;margin-top:2px"><img src="PSP Instument icons/APay Balance.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:400;color:#0F1111;line-height:20px">Amazon Pay Balance: &#8377;60</div><div style="display:flex;align-items:center;gap:8px;margin-top:6px"><span style="font-size:11.5px;color:#565959;white-space:nowrap">Add &#8377;413 to proceed</span><div style="background:#FFF;border:1px solid #888C8C;border-radius:61px;padding:1px 10px;font-size:11.5px;color:#0F1111;white-space:nowrap;flex-shrink:0;line-height:22px">Add Now &rsaquo;</div></div></div><svg width="20" height="20" style="flex-shrink:0;margin-top:2px"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;"><img src="PSP Instument icons/APay Later.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1"><div style="font-size:14px;font-weight:400;color:#0F1111">Amazon Pay Later</div><div style="font-size:12px;color:#565959">Available credit: &#8377; 60,000</div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;"><img src="PSP Instument icons/POD.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1"><div style="font-size:14px;font-weight:400;color:#0F1111">Cash on Delivery</div><div style="font-size:12px;color:#565959">Convenience fee of &#8377;7 will apply</div></div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;"><img src="PSP Instument icons/EMI.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;font-size:14px;font-weight:400;color:#0F1111">EMI</div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div>';
html+='<div style="margin:0 12px;border-top:0.5px dashed #6F7373"></div>';
html+='<div style="padding:12px;display:flex;align-items:center;gap:10px"><div style="width:48px;height:32px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;"><img src="PSP Instument icons/Net Banking.png" style="width:100%;height:100%;object-fit:contain"></div><div style="flex:1;font-size:14px;font-weight:400;color:#0F1111">Net Banking</div><svg width="20" height="20" style="flex-shrink:0"><circle cx="10" cy="10" r="9" fill="none" stroke="#D5D9D9" stroke-width="2"/></svg></div>';
html+='</div></div>';
html+='<div style="padding:8px 16px"><div style="background:#FFF;border:0.5px solid #D5D9D9;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;color:#2162A1">Add Gift Card or Promo Code</span><span style="color:#2162A1">&rsaquo;</span></div></div>';
html+='<div><div style="background:#E8FFF8;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;border-top:1px solid #E6E6E6;box-shadow:0 -2px 5px rgba(0,0,0,0.08)"><span style="font-size:14px;color:#0B7B3C;font-weight:700">&#8377;15 saved</span><span style="font-size:14px;color:#2162A1">See offers &rsaquo;</span></div>';
html+='<div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center;background:#FFF"><div><span style="font-size:13px;font-weight:700">&#8377;</span><span style="font-size:22px;font-weight:700">504</span><div style="font-size:14px;color:#565959">Includes fees</div></div><div style="background:#FFD814;border-radius:92px;width:170px;height:47px;display:flex;align-items:center;justify-content:center"><span style="font-size:16px;color:#0F1111">Continue</span></div></div></div>';
html+='</div>';
html+='</div>';
html+='<div class="mm-right" style="padding-top:8px">';
html+='<div class="callout" style="border-left-color:#82D8E3"><strong>Header</strong>gradient: 135deg #82D8E3 \u2192 #A6E7CE<br>title: 16px Regular #0F1111</div>';
html+='<div class="callout" style="border-left-color:#2162A1"><strong>Address Bar</strong>bg: #F7FEFF<br>name: 13px Bold #0F1111<br>Change: 13px #2162A1</div>';
html+='<div class="callout" style="border-left-color:#0A7CD1"><strong>Selected Tile</strong>bg: #EDF8FF<br>border: 2px solid #2162A1<br>icon: 48\u00D732px LEFT, radius 4px<br>radio: 20px RIGHT</div>';
html+='<div class="callout" style="border-left-color:#E3E6E6"><strong>Badges</strong>Best offer: bg #0A7CD1, text #FFF<br>Previously used: bg #E3E6E6<br>Featured: bg #E3E6E6</div>';
html+='<div class="callout" style="border-left-color:#FFD814"><strong>CTA Button</strong>bg: #FFD814, radius: 92px<br>size: 170\u00D747px<br>text: 16px Regular #0F1111</div>';
html+='<div class="callout" style="border-left-color:#0B7B3C"><strong>Savings Bar</strong>bg: #E8FFF8<br>radius: 12px 12px 0 0<br>text: 14px Bold #0B7B3C</div>';
html+='</div>';
html+='</div>';
html+='</div>';


/* ══════════════════════════════════════════════════════════════
   7. ACCESSIBILITY (NEW)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#059669">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Accessibility</h1>';
html+='<p class="section-header__desc">ARIA labels, keyboard navigation, screen reader support, and focus management guidelines to ensure PSP is accessible to all users, including those with disabilities.</p>';
html+='</div></div>';

/* ARIA Labels */
html+='<div class="card"><div class="card-title">ARIA Labels & Roles</div>';
html+='<div class="note note-blue"><strong>♿ Semantic HTML:</strong> Use proper ARIA roles, labels, and states to make the payment selection page accessible to screen readers and assistive technologies.</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>ARIA Role</th><th>ARIA Label/Description</th><th>Example</th></tr>';
html+='<tr><td>Instrument Tile</td><td>radio</td><td>aria-label="[Instrument Name] [Detail] [Offer if any]"</td><td>aria-label="Amazon Pay ICICI credit card, VISA ending 0424, Save ₹10 as cashback"</td></tr>';
html+='<tr><td>Radio Group</td><td>radiogroup</td><td>aria-label="Payment methods"</td><td>&lt;div role="radiogroup" aria-label="Select payment method"&gt;</td></tr>';
html+='<tr><td>Section Header</td><td>heading</td><td>aria-level="2"</td><td>&lt;h2 aria-level="2"&gt;RECOMMENDED&lt;/h2&gt;</td></tr>';
html+='<tr><td>Badge</td><td>status</td><td>aria-label="Best offer available"</td><td>&lt;span role="status" aria-label="Best offer"&gt;</td></tr>';
html+='<tr><td>Disabled Tile</td><td>radio</td><td>aria-disabled="true" + aria-describedby</td><td>aria-disabled="true" aria-describedby="error-msg-123"</td></tr>';
html+='<tr><td>Error Message</td><td>alert</td><td>id matching aria-describedby</td><td>&lt;span role="alert" id="error-msg-123"&gt;Card expired&lt;/span&gt;</td></tr>';
html+='<tr><td>CTA Button</td><td>button</td><td>aria-label="Continue to payment"</td><td>&lt;button aria-label="Continue to payment with selected method"&gt;</td></tr>';
html+='</table></div>';

html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">HTML Example with ARIA</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">&lt;!-- Accessible Instrument Tile --&gt;</span><br>';
html+='<span class="code-tag">&lt;div</span> <span class="code-attr">role=</span><span class="code-value">"radiogroup"</span> <span class="code-attr">aria-label=</span><span class="code-value">"Select payment method"</span><span class="code-tag">&gt;</span><br>';
html+='  <span class="code-tag">&lt;div</span><br>';
html+='    <span class="code-attr">role=</span><span class="code-value">"radio"</span><br>';
html+='    <span class="code-attr">aria-checked=</span><span class="code-value">"true"</span><br>';
html+='    <span class="code-attr">aria-label=</span><span class="code-value">"Amazon Pay ICICI credit card, VISA ending 0424, Save 10 rupees as cashback"</span><br>';
html+='    <span class="code-attr">tabindex=</span><span class="code-value">"0"</span><br>';
html+='    <span class="code-attr">class=</span><span class="code-value">"instrument-tile tile-selected"</span><span class="code-tag">&gt;</span><br>';
html+='    <span class="code-comment">&lt;!-- Tile content --&gt;</span><br>';
html+='  <span class="code-tag">&lt;/div&gt;</span><br>';
html+='<span class="code-tag">&lt;/div&gt;</span></code></div>';
html+='</div>';

/* Keyboard Navigation */
html+='<div class="card"><div class="card-title">Keyboard Navigation</div>';
html+='<div class="note note-blue"><strong>⌨️ Keyboard Support:</strong> All interactive elements must be keyboard-accessible. Users should be able to navigate and select payment methods without a mouse.</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Key</th><th>Action</th><th>Context</th></tr>';
html+='<tr><td><kbd>Tab</kbd></td><td>Move focus to next interactive element</td><td>Navigate between tiles, buttons, links</td></tr>';
html+='<tr><td><kbd>Shift + Tab</kbd></td><td>Move focus to previous interactive element</td><td>Navigate backwards</td></tr>';
html+='<tr><td><kbd>Arrow Up/Down</kbd></td><td>Move between radio buttons within a group</td><td>Navigate within section (e.g., UPI tiles)</td></tr>';
html+='<tr><td><kbd>Space</kbd></td><td>Select radio button</td><td>Select payment method</td></tr>';
html+='<tr><td><kbd>Enter</kbd></td><td>Activate button/link</td><td>Continue button, "Add new" links</td></tr>';
html+='<tr><td><kbd>Escape</kbd></td><td>Close modal/overlay</td><td>Dismiss expanded details or error messages</td></tr>';
html+='</table></div>';

html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">JavaScript: Keyboard Handler</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">// Handle keyboard navigation for radio group</span><br>';
html+='<span class="code-attr">function</span> handleKeyDown(event) {<br>';
html+='  <span class="code-attr">const</span> tiles = <span class="code-attr">document</span>.querySelectorAll(<span class="code-value">\'[role="radio"]\'</span>);<br>';
html+='  <span class="code-attr">const</span> currentIndex = Array.from(tiles).indexOf(<span class="code-attr">document</span>.activeElement);<br>';
html+='  <br>';
html+='  <span class="code-attr">switch</span> (event.key) {<br>';
html+='    <span class="code-attr">case</span> <span class="code-value">\'ArrowDown\'</span>:<br>';
html+='    <span class="code-attr">case</span> <span class="code-value">\'ArrowRight\'</span>:<br>';
html+='      event.preventDefault();<br>';
html+='      tiles[(currentIndex + <span class="code-value">1</span>) % tiles.length].focus();<br>';
html+='      <span class="code-attr">break</span>;<br>';
html+='    <span class="code-attr">case</span> <span class="code-value">\'ArrowUp\'</span>:<br>';
html+='    <span class="code-attr">case</span> <span class="code-value">\'ArrowLeft\'</span>:<br>';
html+='      event.preventDefault();<br>';
html+='      tiles[(currentIndex - <span class="code-value">1</span> + tiles.length) % tiles.length].focus();<br>';
html+='      <span class="code-attr">break</span>;<br>';
html+='    <span class="code-attr">case</span> <span class="code-value">\' \'</span>:<br>';
html+='      event.preventDefault();<br>';
html+='      selectPaymentMethod(<span class="code-attr">document</span>.activeElement);<br>';
html+='      <span class="code-attr">break</span>;<br>';
html+='  }<br>';
html+='};</code></div>';
html+='</div>';

/* Focus Management */
html+='<div class="card"><div class="card-title">Focus Management</div>';
html+='<div class="note note-blue"><strong>🎯 Focus Indicators:</strong> Visible focus states help keyboard users understand where they are on the page. Use clear, high-contrast focus indicators.</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>State</th><th>Focus Style</th><th>CSS</th></tr>';
html+='<tr><td>Default Focus</td><td>2px solid blue outline with 2px offset</td><td>outline: 2px solid #0972d3;<br>outline-offset: 2px;</td></tr>';
html+='<tr><td>Radio Focus</td><td>Blue ring around radio button</td><td>box-shadow: 0 0 0 3px rgba(9, 114, 211, 0.3);</td></tr>';
html+='<tr><td>Button Focus</td><td>Blue outline + subtle shadow</td><td>outline: 2px solid #0972d3;<br>box-shadow: 0 0 0 4px rgba(9, 114, 211, 0.1);</td></tr>';
html+='</table></div>';

html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">CSS: Focus Styles</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">/* Focus Management */</span><br>';
html+='<span class="code-attr">.instrument-tile:focus</span> {<br>';
html+='  <span class="code-attr">outline:</span> <span class="code-value">2px solid #0972d3</span>;<br>';
html+='  <span class="code-attr">outline-offset:</span> <span class="code-value">2px</span>;<br>';
html+='  <span class="code-attr">box-shadow:</span> <span class="code-value">0 0 0 4px rgba(9, 114, 211, 0.1)</span>;<br>';
html+='}<br>';
html+='<br>';
html+='<span class="code-comment">/* Never remove focus outline */</span><br>';
html+='<span class="code-attr">*:focus:not(:focus-visible)</span> {<br>';
html+='  <span class="code-attr">outline:</span> <span class="code-value">none</span>; <span class="code-comment">/* Only for mouse users */</span><br>';
html+='}<br>';
html+='<br>';
html+='<span class="code-attr">*:focus-visible</span> {<br>';
html+='  <span class="code-attr">outline:</span> <span class="code-value">2px solid #0972d3</span>;<br>';
html+='  <span class="code-attr">outline-offset:</span> <span class="code-value">2px</span>;<br>';
html+='}</code></div>';
html+='</div>';

/* Screen Reader Support */
html+='<div class="card"><div class="card-title">Screen Reader Announcements</div>';
html+='<div class="note note-blue"><strong>📢 Live Regions:</strong> Use ARIA live regions to announce dynamic changes to screen reader users without moving focus.</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Event</th><th>Announcement</th><th>ARIA Attribute</th></tr>';
html+='<tr><td>Payment method selected</td><td>"[Instrument name] selected"</td><td>aria-live="polite"</td></tr>';
html+='<tr><td>Error occurred</td><td>"Error: [Error message]"</td><td>aria-live="assertive"</td></tr>';
html+='<tr><td>Savings applied</td><td>"₹15 saved on this payment method"</td><td>aria-live="polite"</td></tr>';
html+='<tr><td>Loading complete</td><td>"Payment methods loaded, 5 options available"</td><td>aria-live="polite"</td></tr>';
html+='</table></div>';

html+='<button class="code-toggle" onclick="toggleCode(this)">▸ Show code</button><div class="code-block"><div class="code-block-header"><span class="code-block-title">HTML: Live Regions</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent)">Copy</button></div>';
html+='<code><span class="code-comment">&lt;!-- Screen Reader Announcements --&gt;</span><br>';
html+='<span class="code-tag">&lt;div</span><br>';
html+='  <span class="code-attr">role=</span><span class="code-value">"status"</span><br>';
html+='  <span class="code-attr">aria-live=</span><span class="code-value">"polite"</span><br>';
html+='  <span class="code-attr">aria-atomic=</span><span class="code-value">"true"</span><br>';
html+='  <span class="code-attr">class=</span><span class="code-value">"sr-only"</span><span class="code-tag">&gt;</span><br>';
html+='  Amazon Pay ICICI credit card selected<br>';
html+='<span class="code-tag">&lt;/div&gt;</span><br>';
html+='<br>';
html+='<span class="code-comment">&lt;!-- Error announcements (assertive) --&gt;</span><br>';
html+='<span class="code-tag">&lt;div</span><br>';
html+='  <span class="code-attr">role=</span><span class="code-value">"alert"</span><br>';
html+='  <span class="code-attr">aria-live=</span><span class="code-value">"assertive"</span><br>';
html+='  <span class="code-attr">class=</span><span class="code-value">"sr-only"</span><span class="code-tag">&gt;</span><br>';
html+='  Error: Unable to select this payment method. Please try another.<br>';
html+='<span class="code-tag">&lt;/div&gt;</span></code></div>';
html+='</div>';

/* Color Contrast */
html+='<div class="card"><div class="card-title">Color Contrast (WCAG AA)</div>';
html+='<div class="note note-blue"><strong>🎨 Contrast Ratios:</strong> All text must meet WCAG 2.1 AA standards: 4.5:1 for normal text, 3:1 for large text (18px+).</div>';
html+='<div class="tbl-wrap"><table class="tbl"><tr><th>Element</th><th>Foreground</th><th>Background</th><th>Contrast Ratio</th><th>Status</th></tr>';
html+='<tr><td>Tile Name</td><td>#0F1111</td><td>#FFFFFF</td><td>15.8:1</td><td><span style="color:#0B7B3C">✓ Pass</span></td></tr>';
html+='<tr><td>Tile Detail</td><td>#565959</td><td>#FFFFFF</td><td>7.3:1</td><td><span style="color:#0B7B3C">✓ Pass</span></td></tr>';
html+='<tr><td>Offer Text</td><td>#0B7B3C</td><td>#FFFFFF</td><td>5.2:1</td><td><span style="color:#0B7B3C">✓ Pass</span></td></tr>';
html+='<tr><td>Error Text</td><td>#CC0C39</td><td>#FFFFFF</td><td>5.8:1</td><td><span style="color:#0B7B3C">✓ Pass</span></td></tr>';
html+='<tr><td>Link Text</td><td>#2162A1</td><td>#FFFFFF</td><td>5.5:1</td><td><span style="color:#0B7B3C">✓ Pass</span></td></tr>';
html+='<tr><td>Selected Tile (Name)</td><td>#0F1111</td><td>#EDF8FF</td><td>15.2:1</td><td><span style="color:#0B7B3C">✓ Pass</span></td></tr>';
html+='</table></div>';
html+='<div class="note">All PSP colors meet or exceed WCAG 2.1 AA standards. Use <a href="https://webaim.org/resources/contrastchecker/" target="_blank" style="color:#2162A1">WebAIM Contrast Checker</a> to verify custom colors.</div>';
html+='</div>';

/* Best Practices */
html+='<div class="card"><div class="card-title">Accessibility Best Practices</div>';
html+='<div class="grid-2">';
html+='<div class="do"><strong>✓ DO</strong><ul>';
html+='<li>Use semantic HTML (radio buttons, not divs)</li>';
html+='<li>Provide clear, descriptive ARIA labels</li>';
html+='<li>Maintain logical tab order</li>';
html+='<li>Ensure minimum 44×44px touch targets</li>';
html+='<li>Announce dynamic changes via live regions</li>';
html+='<li>Test with VoiceOver (iOS) and TalkBack (Android)</li>';
html+='<li>Support high contrast mode</li>';
html+='<li>Provide skip links for long lists</li>';
html+='</ul></div>';
html+='<div class="dont"><strong>✗ DON\'T</strong><ul>';
html+='<li>Remove focus indicators</li>';
html+='<li>Use color alone to convey information</li>';
html+='<li>Trap keyboard focus</li>';
html+='<li>Hide content with display:none if it needs announcing</li>';
html+='<li>Use placeholder text as labels</li>';
html+='<li>Autoplay sounds or animations</li>';
html+='<li>Set focus programmatically without user action</li>';
html+='<li>Use low-contrast colors for text</li>';
html+='</ul></div>';
html+='</div></div>';

/* Testing Checklist */
html+='<div class="card"><div class="card-title">Accessibility Testing Checklist</div>';
html+='<div style="font-size:13px;line-height:2.2;color:#1a1c1e">';
html+='<div><input type="checkbox" style="margin-right:8px">Keyboard navigation works for all interactive elements</div>';
html+='<div><input type="checkbox" style="margin-right:8px">Focus indicators are visible and meet 3:1 contrast</div>';
html+='<div><input type="checkbox" style="margin-right:8px">Screen reader announces tile content correctly</div>';
html+='<div><input type="checkbox" style="margin-right:8px">ARIA labels are descriptive and unique</div>';
html+='<div><input type="checkbox" style="margin-right:8px">Color contrast meets WCAG AA (4.5:1 minimum)</div>';
html+='<div><input type="checkbox" style="margin-right:8px">Touch targets are minimum 44×44px</div>';
html+='<div><input type="checkbox" style="margin-right:8px">Errors are announced to screen readers</div>';
html+='<div><input type="checkbox" style="margin-right:8px">Page works in high contrast mode</div>';
html+='<div><input type="checkbox" style="margin-right:8px">Tab order is logical (top to bottom)</div>';
html+='<div><input type="checkbox" style="margin-right:8px">No keyboard traps exist</div>';
html+='</div>';
html+='<div class="note" style="margin-top:16px">Test with: <strong>VoiceOver</strong> (macOS/iOS), <strong>NVDA</strong> (Windows), <strong>TalkBack</strong> (Android), <strong>JAWS</strong> (Windows)</div>';
html+='</div>';

/* Per-Component Accessibility Documentation (from renderer) */
html+='<div class="card card--elevated"><div class="card-title">Per-Component Accessibility Specs</div>';
html+='<div style="padding:0 28px 24px">';
html+='<p style="font-size:13px;color:#555;margin:12px 0 16px">Detailed ARIA roles, screen reader announcements, keyboard navigation, touch targets, and compliance checklists for each PSP component.</p>';
if (window.PSP && window.PSP.renderers && window.PSP.renderers.accessibility) {
  var a11yIds = window.PSP.renderers.accessibility.getComponentIds();
  for (var a11yIdx = 0; a11yIdx < a11yIds.length; a11yIdx++) {
    html += window.PSP.renderers.accessibility.generateHtml(a11yIds[a11yIdx]);
  }
}
html+='</div></div>';

html+='</div>';


/* ══════════════════════════════════════════════════════════════
   8. DECISION FRAMEWORK
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#6d28d9">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Decision Framework</h1>';
html+='<p class="section-header__desc">Intelligence layer that governs payment method prioritization, preselection logic, and personalization rules. This framework ensures consistent user experience across 90+ touchpoints.</p>';
html+='</div></div>';

/* Decision Framework Cards (continuation of section 8) */

/* Card 1: Payment Prioritization Engine */
html+='<div class="card"><div style="height:100px;background:linear-gradient(135deg,#e9f3ff 0%,#c8dff8 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e9ebed"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="8" y="6" width="40" height="10" rx="3" stroke="#0972d3" stroke-width="2"/><rect x="14" y="22" width="28" height="10" rx="3" stroke="#0972d3" stroke-width="2"/><rect x="20" y="38" width="16" height="10" rx="3" stroke="#0972d3" stroke-width="2"/><path d="M28 16v6M28 32v6" stroke="#0972d3" stroke-width="2" stroke-linecap="round"/></svg></div>';
html+='<div class="card-title">Payment Prioritization Engine</div><div style="padding:0 24px 24px">';

/* Flowchart */
html+='<div style="display:flex;flex-direction:column;align-items:center;gap:0;margin-bottom:24px">';
html+='<div style="background:#0972d3;color:#fff;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;text-align:center">User enters PSP</div>';
html+='<div style="width:2px;height:20px;background:#e9ebed"></div>';

html+='<div style="background:#e9f3ff;border:1px solid #89bdee;padding:12px 20px;border-radius:10px;font-size:13px;text-align:center;max-width:400px;width:100%"><span class="flow-num">1</span> Has active offer on any instrument?</div>';
html+='<div style="display:flex;gap:40px;align-items:flex-start;margin:8px 0">';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#16a34a;margin-bottom:4px">YES</div><div style="background:#f2fcf3;border:1px solid #29ad32;padding:8px 16px;border-radius:8px;font-size:12px;color:#16a34a;font-weight:600">Select Best Offer</div></div>';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#5f6b7a;margin-bottom:4px">NO</div><div style="font-size:11px;color:#5f6b7a">&#8595;</div></div>';
html+='</div>';

html+='<div style="background:#e9f3ff;border:1px solid #89bdee;padding:12px 20px;border-radius:10px;font-size:13px;text-align:center;max-width:400px;width:100%"><span class="flow-num">2</span> Amazon Pay Balance \u2265 order total?</div>';
html+='<div style="display:flex;gap:40px;align-items:flex-start;margin:8px 0">';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#16a34a;margin-bottom:4px">YES</div><div style="background:#f2fcf3;border:1px solid #29ad32;padding:8px 16px;border-radius:8px;font-size:12px;color:#16a34a;font-weight:600">Select APB</div></div>';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#5f6b7a;margin-bottom:4px">NO</div><div style="font-size:11px;color:#5f6b7a">&#8595;</div></div>';
html+='</div>';

html+='<div style="background:#e9f3ff;border:1px solid #89bdee;padding:12px 20px;border-radius:10px;font-size:13px;text-align:center;max-width:400px;width:100%"><span class="flow-num">3</span> Has previously successful payment?</div>';
html+='<div style="display:flex;gap:40px;align-items:flex-start;margin:8px 0">';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#16a34a;margin-bottom:4px">YES</div><div style="background:#f2fcf3;border:1px solid #29ad32;padding:8px 16px;border-radius:8px;font-size:12px;color:#16a34a;font-weight:600">Select Previously Used</div></div>';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#5f6b7a;margin-bottom:4px">NO</div><div style="font-size:11px;color:#5f6b7a">&#8595;</div></div>';
html+='</div>';

html+='<div style="background:#e9f3ff;border:1px solid #89bdee;padding:12px 20px;border-radius:10px;font-size:13px;text-align:center;max-width:400px;width:100%"><span class="flow-num">4</span> Only one instrument available?</div>';
html+='<div style="display:flex;gap:40px;align-items:flex-start;margin:8px 0">';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#16a34a;margin-bottom:4px">YES</div><div style="background:#f2fcf3;border:1px solid #29ad32;padding:8px 16px;border-radius:8px;font-size:12px;color:#16a34a;font-weight:600">Auto-select</div></div>';
html+='<div style="text-align:center"><div style="font-size:11px;font-weight:700;color:#5f6b7a;margin-bottom:4px">NO</div><div style="background:#fffce9;border:1px solid #d4a00e;padding:8px 16px;border-radius:8px;font-size:12px;color:#d97706;font-weight:600">Show Featured, no preselection</div></div>';
html+='</div>';
html+='</div>';

/* Priority Table */
html+='<div class="tbl-wrap" style="margin:0 0 16px"><table class="tbl"><tr><th>Priority</th><th>Condition</th><th>Action</th></tr>';
html+='<tr><td><span class="flow-num">1</span></td><td>Best Offer exists</td><td>Preselect + show blue badge</td></tr>';
html+='<tr><td><span class="flow-num">2</span></td><td>APB \u2265 order total</td><td>Preselect + show balance</td></tr>';
html+='<tr><td><span class="flow-num">3</span></td><td>Previous success within 30 days</td><td>Preselect + show \u201CPreviously used\u201D badge</td></tr>';
html+='<tr><td><span class="flow-num">4</span></td><td>Single instrument only</td><td>Auto-select</td></tr>';
html+='<tr><td><span class="flow-num" style="background:#5f6b7a">5</span></td><td>Multiple instruments, no priority match</td><td>Show Featured, no preselection</td></tr>';
html+='</table></div>';
html+='</div></div>';

/* Card 2: Enhanced Preselection Rules */
html+='<div class="card"><div style="height:100px;background:linear-gradient(135deg,#f2fcf3 0%,#c8ecc9 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e9ebed"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="18" stroke="#037f0c" stroke-width="2" fill="none"/><path d="M20 28l6 6 12-12" stroke="#037f0c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
html+='<div class="card-title">Enhanced Preselection Rules</div><div style="padding:0 24px 24px">';

var scenarios=[
  ['Best Offer Wins','Instrument has cashback/discount','Always preselect, even if not previously used','Best offer (blue)','Card with \u20B910 cashback vs previously used UPI'],
  ['APB Fast Path','Balance \u2265 order total + no Best Offer','Preselect APB for instant checkout','Show \u201CAdd Now\u201D if balance insufficient','User has \u20B9500 APB, order is \u20B9450'],
  ['Trust Through Familiarity','Previously used successfully + no offer','Preselect last successful payment (within 30 days)','Previously used (gray)','Last used HDFC credit card 5 days ago'],
  ['Featured Recommendation','New user or no previous success','Highlight featured instrument, no preselection','Featured (gray)','Based on merchant success rates'],
  ['Single Option Auto-Select','Only one transaction-ready instrument','Auto-select + auto-advance (skip selection)','\u2014','Single linked card, no other options']
];
scenarios.forEach(function(s,i){
  html+='<div style="background:#fafafa;border:1px solid #e9ebed;border-radius:10px;padding:16px;margin-bottom:12px">';
  html+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span class="flow-num">'+(i+1)+'</span><span style="font-size:14px;font-weight:700;color:#1a1c1e">'+s[0]+'</span></div>';
  html+='<div style="display:grid;grid-template-columns:100px 1fr;gap:4px 12px;font-size:13px;color:#1a1c1e">';
  html+='<span style="font-weight:600;color:#5f6b7a">Condition</span><span>'+s[1]+'</span>';
  html+='<span style="font-weight:600;color:#5f6b7a">Behavior</span><span>'+s[2]+'</span>';
  html+='<span style="font-weight:600;color:#5f6b7a">Badge</span><span>'+s[3]+'</span>';
  html+='<span style="font-weight:600;color:#5f6b7a">Example</span><span>'+s[4]+'</span>';
  html+='</div></div>';
});
html+='</div></div>';

/* Card 3: Personalization Matrix */
html+='<div class="card"><div style="height:100px;background:linear-gradient(135deg,#f5f0ff 0%,#ddd0f7 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e9ebed"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="8" y="8" width="18" height="18" rx="3" stroke="#7b2ff2" stroke-width="2"/><rect x="30" y="8" width="18" height="18" rx="3" stroke="#7b2ff2" stroke-width="2"/><rect x="8" y="30" width="18" height="18" rx="3" stroke="#7b2ff2" stroke-width="2"/><rect x="30" y="30" width="18" height="18" rx="3" stroke="#7b2ff2" stroke-width="2"/><circle cx="17" cy="17" r="4" fill="#7b2ff2" opacity=".2"/><circle cx="39" cy="17" r="4" fill="#7b2ff2" opacity=".4"/><circle cx="17" cy="39" r="4" fill="#7b2ff2" opacity=".3"/><circle cx="39" cy="39" r="4" fill="#7b2ff2" opacity=".5"/></svg></div>';
html+='<div class="card-title">Personalization Matrix</div><div style="padding:0 24px 24px">';

html+='<div style="font-size:14px;font-weight:600;color:#1a1c1e;margin-bottom:12px">User Type Behavior</div>';
html+='<div class="tbl-wrap" style="margin:0 0 24px"><table class="tbl"><tr><th>Attribute</th><th>First Time</th><th>Returning (1\u20135 orders)</th><th>Power User (5+)</th></tr>';
html+='<tr><td style="font-weight:600">Preselection</td><td>Featured only</td><td>Previously used if exists</td><td>Previously used prioritized</td></tr>';
html+='<tr><td style="font-weight:600">Offer Visibility</td><td>Prominent badges</td><td>Inline text</td><td>Collapsed until relevant</td></tr>';
html+='<tr><td style="font-weight:600">Option Count</td><td>Show 3\u20135 methods</td><td>Show all saved</td><td>Prioritize top 3, collapse rest</td></tr>';
html+='<tr><td style="font-weight:600">Help Text</td><td>More guidance</td><td>Minimal</td><td>None</td></tr>';
html+='</table></div>';

html+='<div style="font-size:14px;font-weight:600;color:#1a1c1e;margin-bottom:12px">Context Factors</div>';
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
html+='<div class="card"><div style="height:100px;background:linear-gradient(135deg,#fff3e0 0%,#ffe0b2 100%);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e9ebed"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M12 40L20 28L28 34L36 18L44 24" stroke="#e65100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="44" cy="24" r="4" fill="#e65100" opacity=".3"/><path d="M40 16l4 8 4-2" stroke="#e65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
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

html+='<div style="font-size:14px;font-weight:600;color:#1a1c1e;margin-bottom:12px">Smart Fallback Logic</div>';
html+='<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:8px">';
var fallbacks=[
  ['Best Offer fails','Auto-suggest Previously Used'],
  ['Previously Used fails','Auto-suggest Featured UPI'],
  ['All saved methods unavailable','Prompt to add new card'],
  ['Persistent failures','Escalate to manual entry (Net Banking, COD)']
];
fallbacks.forEach(function(f,i){
  html+='<div style="display:flex;align-items:center;gap:12px;background:#fafafa;border:1px solid #e9ebed;border-radius:8px;padding:10px 14px">';
  html+='<span class="flow-num" style="background:'+(i<2?'#0972d3':i===2?'#d97706':'#d32f2f')+'">'+String.fromCharCode(65+i)+'</span>';
  html+='<div style="font-size:13px"><span style="color:#5f6b7a">IF </span><span style="font-weight:600">'+f[0]+'</span><span style="color:#5f6b7a"> \u2192 </span><span style="color:#0972d3;font-weight:600">'+f[1]+'</span></div>';
  html+='</div>';
});
html+='</div>';
html+='</div></div>';

html+='</div>';

/* ══════════════════════════════════════════════════════════════
   9. BASELINE CX
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#0972d3">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Baseline CX</h1>';
html+='<p class="section-header__desc">Current baseline customer experience for Service and Pay. Click the cover below to open the full Figma design file.</p>';
html+='</div></div>';
html+='<div style="padding:24px"><div style="margin-bottom:32px"><h3 style="font-size:16px;font-weight:600;color:#1a1c1e;margin-bottom:12px">Mental Model Flow</h3><div style="border:1px solid #e0e0e0;border-radius:8px;overflow:hidden"><iframe src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/N6ojbzlM3tRsXj5X4cJkkX/Service-and-Pay?node-id=1-4327" style="width:100%;height:600px;border:none" allowfullscreen></iframe></div>';
html+='<div style="margin-top:12px"><a href="https://www.figma.com/design/N6ojbzlM3tRsXj5X4cJkkX/Service-and-Pay?node-id=1-4327" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:#0972d3;text-decoration:none;padding:8px 14px;border-radius:6px;border:1px solid #0972d3">🖼️ Open Mental Model in Figma ↗</a></div></div>';
html+='<div style="margin-bottom:32px"><h3 style="font-size:16px;font-weight:600;color:#1a1c1e;margin-bottom:12px">All Baseline Flows</h3><div style="border:1px solid #e0e0e0;border-radius:8px;overflow:hidden"><iframe src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/N6ojbzlM3tRsXj5X4cJkkX/Service-and-Pay?node-id=1-28778" style="width:100%;height:700px;border:none" allowfullscreen></iframe></div>';
html+='<div style="margin-top:12px"><a href="https://www.figma.com/design/N6ojbzlM3tRsXj5X4cJkkX/Service-and-Pay?node-id=1-28778" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:#0972d3;text-decoration:none;padding:8px 14px;border-radius:6px;border:1px solid #0972d3">🖼️ Open All Baseline Flows in Figma ↗</a></div></div></div>';
html+='<div class="note" style="margin-top:24px">\u26A0\uFE0F This Figma file is restricted to Amazon employees. Do not share the link externally.</div>';

/* Baseline CX Subsections */
html+='<div class="card card--elevated"><div class="card-title">Minimum Acceptable Experience Criteria</div>';
html+='<div style="padding:0 28px 24px">';
html+='<div class="tbl-wrap" style="margin:16px 0"><table class="tbl"><tr><th>Criterion</th><th>Minimum Standard</th><th>Target</th></tr>';
html+='<tr><td>Payment methods visible</td><td>\u2265 3 options shown</td><td>5\u20137 relevant options</td></tr>';
html+='<tr><td>Preselection accuracy</td><td>\u2265 70% correct first choice</td><td>\u2265 85%</td></tr>';
html+='<tr><td>Tap-to-pay steps</td><td>\u2264 3 taps from PSP load</td><td>1\u20132 taps (returning user)</td></tr>';
html+='<tr><td>Error recovery options</td><td>\u2265 1 alternative shown</td><td>3 alternatives with ranking</td></tr>';
html+='<tr><td>Accessibility compliance</td><td>WCAG 2.1 AA</td><td>WCAG 2.1 AAA for critical paths</td></tr>';
html+='</table></div></div></div>';

html+='<div class="card card--elevated"><div class="card-title">Performance Benchmarks</div>';
html+='<div style="padding:0 28px 24px">';
html+='<div class="tbl-wrap" style="margin:16px 0"><table class="tbl"><tr><th>Metric</th><th>P50 Target</th><th>P95 Target</th><th>Max Acceptable</th></tr>';
html+='<tr><td>PSP page load (FCP)</td><td>&lt; 1.2s</td><td>&lt; 2.5s</td><td>4s</td></tr>';
html+='<tr><td>Instrument list render</td><td>&lt; 300ms</td><td>&lt; 800ms</td><td>1.5s</td></tr>';
html+='<tr><td>Selection response</td><td>&lt; 100ms</td><td>&lt; 200ms</td><td>300ms</td></tr>';
html+='<tr><td>CTA button activation</td><td>&lt; 50ms</td><td>&lt; 100ms</td><td>200ms</td></tr>';
html+='<tr><td>Offer calculation</td><td>&lt; 500ms</td><td>&lt; 1s</td><td>2s</td></tr>';
html+='<tr><td>Payment submission</td><td>&lt; 2s</td><td>&lt; 4s</td><td>8s (with loading state)</td></tr>';
html+='</table></div></div></div>';

html+='<div class="card card--elevated"><div class="card-title">Error Rate Thresholds</div>';
html+='<div style="padding:0 28px 24px">';
html+='<div class="tbl-wrap" style="margin:16px 0"><table class="tbl"><tr><th>Error Type</th><th>Acceptable Rate</th><th>Alert Threshold</th><th>Action</th></tr>';
html+='<tr><td>Payment failure (all)</td><td>&lt; 5%</td><td>&gt; 8%</td><td>Show alternative methods immediately</td></tr>';
html+='<tr><td>UPI timeout</td><td>&lt; 3%</td><td>&gt; 5%</td><td>Retry prompt + fallback to card</td></tr>';
html+='<tr><td>Card decline</td><td>&lt; 2%</td><td>&gt; 4%</td><td>Suggest different card or UPI</td></tr>';
html+='<tr><td>Page load failure</td><td>&lt; 0.5%</td><td>&gt; 1%</td><td>Full-page retry with skeleton</td></tr>';
html+='<tr><td>Offer application error</td><td>&lt; 1%</td><td>&gt; 2%</td><td>Silent retry, show without offer</td></tr>';
html+='</table></div></div></div>';

html+='<div class="card card--elevated"><div class="card-title">Accessibility Minimums</div>';
html+='<div style="padding:0 28px 24px">';
html+='<div class="grid-2" style="margin-top:16px">';
html+='<div class="do"><strong>\u2713 Required (WCAG AA)</strong><ul>';
html+='<li>4.5:1 contrast ratio for all body text</li>';
html+='<li>3:1 contrast for large text (\u226518px bold)</li>';
html+='<li>44\u00D744px minimum touch targets</li>';
html+='<li>Keyboard navigable (all interactive elements)</li>';
html+='<li>Screen reader compatible (ARIA labels)</li>';
html+='<li>Focus indicators visible (2px, 3:1 contrast)</li>';
html+='<li>No content conveyed by color alone</li>';
html+='</ul></div>';
html+='<div class="dont"><strong>\u2717 Common Violations</strong><ul>';
html+='<li>Radio buttons without labels (&lt; 44px target)</li>';
html+='<li>Offer text relying only on green color</li>';
html+='<li>Missing focus styles on tile selection</li>';
html+='<li>Dynamic content not announced to SR</li>';
html+='<li>Savings bar not reachable via keyboard</li>';
html+='<li>Error messages not linked to inputs</li>';
html+='</ul></div>';
html+='</div></div></div>';

html+='</div>';

/* ══════════════════════════════════════════════════════════════
   10. CREATE YOUR PSP (AI Generator)
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color: #FF9900">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Create Your PSP</h1>';
html+='<p class="section-header__desc">Describe your checkout scenario in plain English and get a pixel-perfect PSP mockup. Powered by AI — understands PSP hierarchy, badges, instrument states, and section rules.</p>';
html+='</div></div>';
html+='<div style="padding:0 4px">';
// API Key setup bar
html+='<div id="psp-api-key-bar" style="margin-bottom:16px;padding:12px 16px;background:#fffbeb;border:1px solid #fbbf24;border-radius:8px;display:flex;align-items:center;gap:12px;font-size:13px">';
html+='<span style="font-size:16px">🔑</span>';
html+='<div style="flex:1"><strong>OpenRouter API Key</strong> — <a href="https://openrouter.ai/keys" target="_blank" style="color:#2162A1">Get free key →</a> (uses free models, no credit card needed)</div>';
html+='<input id="psp-api-key-input" type="password" placeholder="sk-or-v1-..." style="width:220px;padding:6px 10px;border:1px solid #d5d9d9;border-radius:6px;font-size:12px;font-family:monospace">';
html+='<button id="psp-api-key-save" style="background:#FF9900;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Save</button>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start" id="psp-generator-layout">';
// Left: input
html+='<div>';
html+='<div style="margin-bottom:16px">';
html+='<label style="font-size:12px;font-weight:600;color:#5f6368;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:8px">Describe your PSP</label>';
html+='<textarea id="psp-generator-input" style="width:100%;min-height:120px;padding:12px 16px;border:1px solid #d5d9d9;border-radius:8px;font-size:14px;font-family:inherit;line-height:1.6;resize:vertical;outline:none;transition:border-color 0.15s" placeholder="Example: Create a PSP for a ₹2,500 order. Customer has Amazon Pay ICICI with best offer ₹50 cashback, HDFC credit card previously used, UPI linked. Show Pay Later and COD too."></textarea>';
html+='</div>';
html+='<div style="display:flex;gap:10px;margin-bottom:20px">';
html+='<button id="psp-generator-btn" style="background:#FF9900;color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:background 0.15s;font-family:inherit">Generate PSP →</button>';
html+='<button id="psp-generator-reset" style="background:#fff;color:#5f6368;border:1px solid #d5d9d9;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.15s;font-family:inherit">Reset</button>';
html+='</div>';
html+='<div style="font-size:12px;color:#5f6368;line-height:1.6">';
html+='<strong style="display:block;margin-bottom:6px;color:#1a1c1e">Quick examples:</strong>';
html+='<div id="psp-generator-examples" style="display:flex;flex-direction:column;gap:6px">';
html+='<div class="psp-example-chip" data-prompt="PSP for ₹499 order with CBCC best offer ₹10 cashback, HDFC previously used, APay UPI featured" style="cursor:pointer;padding:8px 12px;background:#f7f8f9;border:1px solid #e3e5e8;border-radius:6px;font-size:12px;color:#1a1c1e;transition:all 0.15s">💳 Standard checkout — 3 recommended + UPI</div>';
html+='<div class="psp-example-chip" data-prompt="Create PSP for ₹15000 order. CBCC with best offer ₹200 cashback, HDFC credit expired, Amazon Pay Balance insufficient, Pay Later, EMI, Net Banking" style="cursor:pointer;padding:8px 12px;background:#f7f8f9;border:1px solid #e3e5e8;border-radius:6px;font-size:12px;color:#1a1c1e;transition:all 0.15s">💰 High-value order — with disabled card + EMI</div>';
html+='<div class="psp-example-chip" data-prompt="Simple PSP with only COD and Net Banking for ₹299 order" style="cursor:pointer;padding:8px 12px;background:#f7f8f9;border:1px solid #e3e5e8;border-radius:6px;font-size:12px;color:#1a1c1e;transition:all 0.15s">📦 Minimal — COD + Net Banking only</div>';
html+='<div class="psp-example-chip" data-prompt="Show APay UPI in UPI box with multiple accounts, APL in recommended as Featured with ₹60,000 credit limit, CBCC best offer ₹50" style="cursor:pointer;padding:8px 12px;background:#f7f8f9;border:1px solid #e3e5e8;border-radius:6px;font-size:12px;color:#1a1c1e;transition:all 0.15s">🔀 Custom routing — UPI in UPI box + APL featured</div>';
html+='</div>';
html+='</div>';
html+='</div>';
// Right: output (phone frame)
html+='<div style="display:flex;justify-content:center;align-items:flex-start">';
html+='<div id="psp-generator-output" style="width:100%;max-width:380px"></div>';
html+='</div>';
html+='</div>';
html+='</div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   11. MOTION TOKENS
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#2563eb">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Motion Tokens</h1>';
html+='<p class="section-header__desc">Standardized motion tokens for consistent animations across all PSP components. Click any token to copy its CSS transition shorthand.</p>';
html+='</div></div>';
html+='<div id="psp-motion-preview-container"></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   13. PLAYGROUND
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#0891b2">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Component Playground</h1>';
html+='<p class="section-header__desc">Experiment with component properties in real-time. Modify text, toggle states, and generate code snippets for your configuration.</p>';
html+='</div></div>';
html+='<div id="psp-playground-container"></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   14. CHANGELOG
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#65a30d">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Changelog</h1>';
html+='<p class="section-header__desc">Track all design token additions, modifications, and deprecations across versions.</p>';
html+='</div></div>';
html+='<div id="psp-changelog-container"></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   15. BREAKPOINTS
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#c026d3">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Breakpoints</h1>';
html+='<p class="section-header__desc">Responsive breakpoint documentation showing how PSP components adapt across mobile, tablet, desktop, and large desktop viewports.</p>';
html+='</div></div>';
html+='<div id="psp-breakpoints-container"></div>';
html+='</div>';

/* ══════════════════════════════════════════════════════════════
   16. CODE EXAMPLES
   ══════════════════════════════════════════════════════════════ */
html+='<div class="sec">';
html+='<div class="section-header" style="border-left-color:#0d9488">';
html+='<div class="section-header__content">';
html+='<h1 class="section-header__title">Code Examples</h1>';
html+='<p class="section-header__desc">Implementation examples across HTML/CSS, React Native, Android XML, and iOS SwiftUI with syntax highlighting and copy support.</p>';
html+='</div></div>';
html+='<div id="psp-code-examples-container"></div>';
html+='</div>';

/* ── Inject HTML ── */
contentEl.innerHTML = html;

/* ── Fill JSON ── */
var jsonData = {
  designTokens:{colors:{bgPage:'#F7FAFA',bgCard:'#FFFFFF',textPrimary:'#0F1111',textSecondary:'#565959',textLink:'#2162A1',textSuccess:'#0B7B3C',borderCard:'#D5D9D9',badgeBlue:'#0A7CD1',ctaYellow:'#FFD814',selectedBg:'#EDF8FF',selectedBorder:'#2162A1',radioButton:'#2162A1',errorRed:'#CC0C39',headerGradientStart:'#82D8E3',headerGradientEnd:'#A6E7CE',savingsBarBg:'#E8FFF8',addressBg:'#F7FEFF',badgeGrayBg:'#E3E6E6',badgeGrayText:'#232F3E',dividerDash:'#6F7373'},spacing:{pagePadding:'16px',tilePadding:'12px',iconTextGap:'10px',badgeLeftOffset:'66px',dividerInset:'12px'},radii:{cardGroup:'12px',tile:'12px',icon:'5px',badge:'13px',cta:'92px',bankPill:'30px'},sizes:{icon:'54x36px',cta:'170x47px',bankLogoCircle:'13px'},radioButton:{size:'20px',borderDefault:'2px solid #D5D9D9',borderSelected:'2px solid #2162A1',fillSelected:'#2162A1',dotSize:'8px',dotColor:'#FFFFFF',position:'12px left, centered vertical'}},
  tileStates:{transactionReady:{bg:'#FFFFFF',border:'1px solid #D5D9D9',radioButton:'empty circle',opacity:1},selected:{bg:'#EDF8FF',border:'2px solid #2162A1',radioButton:'filled blue with white dot',opacity:1},nonTransactionReady:{bg:'#FFFFFF',border:'1px solid #D5D9D9',radioButton:'disabled gray',opacity:0.6}},
  badges:{bestOffer:{bg:'#0A7CD1',text:'#FFFFFF'},previouslyUsed:{bg:'#E3E6E6',text:'#232F3E'},featured:{bg:'#E3E6E6',text:'#232F3E'}},
  charLimits:{instrumentName:32,cardDetails:36,upiDetails:28,offerText:40,badgeText:16,sectionHeader:24,ctaText:14,savingsText:20,addressName:20,addressDetail:40}
};
var pre=document.getElementById('jsonPre');
if(pre) pre.textContent=JSON.stringify(jsonData,null,2);

/* ══════════════════════════════════════════════════════════════
   POST-RENDER: Wire renderers into their container elements
   ══════════════════════════════════════════════════════════════ */

// Motion Tokens (section 11)
if (window.PSP && window.PSP.renderers && window.PSP.renderers.motionPreview) {
  var motionContainer = document.getElementById('psp-motion-preview-container');
  if (motionContainer) {
    window.PSP.renderers.motionPreview.render(motionContainer);
  }
}

// Playground (section 12) — render instrumentTile as default
if (window.PSP && window.PSP.renderers && window.PSP.renderers.playground) {
  var playgroundContainer = document.getElementById('psp-playground-container');
  if (playgroundContainer) {
    window.PSP.renderers.playground.render('instrumentTile', playgroundContainer);
  }
}

// Changelog (section 13)
if (window.PSP && window.PSP.renderers && window.PSP.renderers.changelog) {
  var changelogContainer = document.getElementById('psp-changelog-container');
  if (changelogContainer) {
    window.PSP.renderers.changelog.render(changelogContainer);
  }
}

// Breakpoints (section 14)
if (window.PSP && window.PSP.renderers && window.PSP.renderers.breakpoints) {
  var breakpointsContainer = document.getElementById('psp-breakpoints-container');
  if (breakpointsContainer) {
    window.PSP.renderers.breakpoints.render(breakpointsContainer);
  }
}

// Code Examples (section 15)
if (window.PSP && window.PSP.renderers && window.PSP.renderers.codeExamples) {
  var codeExamplesContainer = document.getElementById('psp-code-examples-container');
  if (codeExamplesContainer) {
    codeExamplesContainer.innerHTML = window.PSP.renderers.codeExamples.renderAll();
    window.PSP.renderers.codeExamples.attachEvents(codeExamplesContainer);
  }
}

// States documentation in States & Behavior section (section 4)
if (window.PSP && window.PSP.renderers && window.PSP.renderers.states) {
  var allSecs = document.querySelectorAll('#content > .sec');
  var statesTarget = allSecs[4]; // States & Behavior section
  if (statesTarget) {
    var statesCard = document.createElement('div');
    statesCard.className = 'card card--elevated';
    statesCard.innerHTML = '<div class="card-title">Interactive State Documentation</div>';
    var statesInner = document.createElement('div');
    statesInner.style.padding = '24px';
    statesCard.appendChild(statesInner);
    statesTarget.appendChild(statesCard);
    window.PSP.renderers.states.render('instrumentTile', statesInner);
  }
}

// Usage Guidance in Components section (section 2)
if (window.PSP && window.PSP.renderers && window.PSP.renderers.guidance) {
  var allSecs = document.querySelectorAll('#content > .sec');
  var guidanceTarget = allSecs[2]; // Components section
  if (guidanceTarget) {
    var guidanceCard = document.createElement('div');
    guidanceCard.className = 'card card--elevated';
    guidanceCard.innerHTML = '<div class="card-title">Usage Guidance</div>';
    var guidanceInner = document.createElement('div');
    guidanceInner.style.padding = '24px';
    guidanceCard.appendChild(guidanceInner);
    guidanceTarget.appendChild(guidanceCard);
    window.PSP.renderers.guidance.render('instrumentTile', guidanceInner);
  }
}

// Edge Cases in States & Behavior section (section 4)
if (window.PSP && window.PSP.renderers && window.PSP.renderers.edgeCases) {
  var allSecs = document.querySelectorAll('#content > .sec');
  var edgeCasesTarget = allSecs[4]; // States & Behavior section
  if (edgeCasesTarget) {
    var edgeCasesCard = document.createElement('div');
    edgeCasesCard.className = 'card card--elevated';
    edgeCasesCard.innerHTML = '<div class="card-title">Edge Cases & Error Recovery</div>';
    var edgeCasesInner = document.createElement('div');
    edgeCasesInner.style.padding = '24px';
    edgeCasesCard.appendChild(edgeCasesInner);
    window.PSP.renderers.edgeCases.render(edgeCasesInner);
  }
}

// Wire click-to-copy on card variant examples using PSP clipboard utility
(function() {
  var variantExamples = document.querySelectorAll('.psp-card-variant-example');
  variantExamples.forEach(function(el) {
    el.addEventListener('click', function() {
      var text = this.getAttribute('data-copy');
      if (text && window.PSP && window.PSP.features && window.PSP.features.clipboard) {
        window.PSP.features.clipboard.copy(text);
      }
    });
  });

  // Wire inline code-copy-btn buttons to use PSP clipboard utility with toast
  var codeCopyBtns = document.querySelectorAll('.code-copy-btn');
  codeCopyBtns.forEach(function(btn) {
    btn.onclick = function() {
      var codeEl = this.parentElement.nextElementSibling;
      if (codeEl && window.PSP && window.PSP.features && window.PSP.features.clipboard) {
        window.PSP.features.clipboard.copy(codeEl.textContent);
      } else if (codeEl) {
        navigator.clipboard.writeText(codeEl.textContent).then(function() {
          if (typeof toast === 'function') toast('Copied!');
        });
      }
    };
  });
})();
}

function copyJSON(){
  var pre=document.getElementById('jsonPre');
  if(pre) {
    if (window.PSP && window.PSP.features && window.PSP.features.clipboard) {
      window.PSP.features.clipboard.copy(pre.textContent);
    } else {
      navigator.clipboard.writeText(pre.textContent).then(function(){toast('JSON copied to clipboard')});
    }
  }
}

/* ── Initialize app ── */
buildSections();

/* ── Make Mental Model PSP interactive ── */
(function() {
  var phoneFrame = document.getElementById('phoneFrame');
  if (!phoneFrame) return;

  // STEP 1: Tag all elements with stable data attributes during init
  // Find tile containers: divs with padding:12px that have an SVG radio (circle element)
  // Two patterns exist:
  //   A) padding:12px div → child flex div → SVG (RECOMMENDED tiles)
  //   B) padding:12px + display:flex combined on same div → SVG direct child (other tiles)
  // Exclude: parent containers that contain other tiles (card groups)
  var allDivs = phoneFrame.querySelectorAll('div[style*="padding:12px"]');
  var tileContainers = [];
  for (var i = 0; i < allDivs.length; i++) {
    var div = allDivs[i];
    var divStyle = div.getAttribute('style') || '';
    var hasSvgRadio = false;

    // Pattern B: div itself is both padded AND flex, SVG is direct child
    if (divStyle.indexOf('display:flex') !== -1) {
      var directSvg = div.querySelector(':scope > svg');
      if (directSvg && directSvg.querySelector('circle')) {
        hasSvgRadio = true;
      }
    } else {
      // Pattern A: div is padded container with a child flex row that has SVG
      var children = div.children;
      for (var ch = 0; ch < children.length; ch++) {
        var child = children[ch];
        if (child.tagName === 'DIV' && child.getAttribute('style') &&
            child.getAttribute('style').indexOf('display:flex') !== -1 &&
            child.getAttribute('style').indexOf('align-items') !== -1) {
          var svgInRow = child.querySelector(':scope > svg');
          if (svgInRow && svgInRow.querySelector('circle')) {
            hasSvgRadio = true;
            break;
          }
        }
      }
    }
    if (!hasSvgRadio) continue;
      var idx = tileContainers.length;
      div.setAttribute('data-tile', idx);
      div.style.cursor = 'pointer';
      tileContainers.push(div);

      // Tag the name element (first div with font-size:14px inside the flex row's content area)
      var contentDivs = div.querySelectorAll('div[style*="font-size:14px"]');
      for (var n = 0; n < contentDivs.length; n++) {
        var cd = contentDivs[n];
        if (cd.style.fontWeight || cd.getAttribute('style').indexOf('font-weight') !== -1) {
          cd.setAttribute('data-name', idx);
          break;
        }
      }

      // Tag badge elements (spans with border-radius:13px)
      var spans = div.querySelectorAll('span');
      for (var s = 0; s < spans.length; s++) {
        var spanStyle = spans[s].getAttribute('style') || '';
        if (spanStyle.indexOf('border-radius') !== -1 && spanStyle.indexOf('13px') !== -1) {
          spans[s].setAttribute('data-badge', idx);
        }
      }
  }

  // STEP 2: Determine position of each tile (top/middle/bottom) within its parent group
  // Tiles inside the RECOMMENDED card group share the same parent
  var tilePositions = []; // 'top', 'middle', 'bottom', 'only'
  for (var p = 0; p < tileContainers.length; p++) {
    var parent = tileContainers[p].parentElement;
    // Count how many data-tile siblings share this parent
    var siblings = [];
    for (var q = 0; q < tileContainers.length; q++) {
      if (tileContainers[q].parentElement === parent) siblings.push(q);
    }
    if (siblings.length === 1) {
      tilePositions[p] = 'only';
    } else {
      var posInGroup = siblings.indexOf(p);
      if (posInGroup === 0) tilePositions[p] = 'top';
      else if (posInGroup === siblings.length - 1) tilePositions[p] = 'bottom';
      else tilePositions[p] = 'middle';
    }
  }

  function getSelectedRadius(pos) {
    switch (pos) {
      case 'top': return '12px 12px 0 0';
      case 'bottom': return '0 0 12px 12px';
      case 'only': return '12px';
      default: return '0';
    }
  }

  // STEP 3: Define state functions using data attributes (stable, never changes)
  function deselectAll() {
    for (var i = 0; i < tileContainers.length; i++) {
      var t = tileContainers[i];
      // Container reset
      t.style.background = '#FFF';
      t.style.border = 'none';
      t.style.borderRadius = '0';
      t.style.padding = '12px';

      // Radio reset - remove inner fill circle if it exists, reset outer stroke
      var svg = t.querySelector('svg');
      if (svg) {
        var circles = svg.querySelectorAll('circle');
        if (circles.length >= 1) {
          circles[0].setAttribute('stroke', '#D5D9D9');
          circles[0].setAttribute('stroke-width', '2');
        }
        // Remove any inner fill circles (r=5)
        if (circles.length >= 2) {
          circles[1].parentNode.removeChild(circles[1]);
        }
      }

      // Badge reset
      var badges = phoneFrame.querySelectorAll('[data-badge="' + i + '"]');
      for (var b = 0; b < badges.length; b++) {
        badges[b].style.background = '#E3E6E6';
        badges[b].style.color = '#232F3E';
      }

      // Name reset
      var nameEl = phoneFrame.querySelector('[data-name="' + i + '"]');
      if (nameEl) nameEl.style.fontWeight = '400';
    }
  }

  function selectTile(idx) {
    var t = tileContainers[idx];
    if (!t) return;

    // Container selected with position-aware border-radius
    t.style.background = '#EDF8FF';
    t.style.border = '2px solid #2162A1';
    t.style.borderRadius = getSelectedRadius(tilePositions[idx]);
    t.style.padding = '10px';

    // Radio selected - set outer stroke + add inner fill circle
    var svg = t.querySelector('svg');
    if (svg) {
      var outerCircle = svg.querySelector('circle');
      if (outerCircle) {
        outerCircle.setAttribute('stroke', '#2162A1');
        outerCircle.setAttribute('stroke-width', '2');
      }
      // Create inner filled circle (same as CBCC selected state)
      var innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      innerCircle.setAttribute('cx', '10');
      innerCircle.setAttribute('cy', '10');
      innerCircle.setAttribute('r', '5');
      innerCircle.setAttribute('fill', '#2162A1');
      svg.appendChild(innerCircle);
    }

    // Badge selected
    var badges = phoneFrame.querySelectorAll('[data-badge="' + idx + '"]');
    for (var b = 0; b < badges.length; b++) {
      badges[b].style.background = '#0A7CD1';
      badges[b].style.color = '#FFFFFF';
    }

    // Name bold
    var nameEl = phoneFrame.querySelector('[data-name="' + idx + '"]');
    if (nameEl) nameEl.style.fontWeight = '700';
  }

  // STEP 3: Click handler
  phoneFrame.addEventListener('click', function(e) {
    var tileEl = e.target.closest('[data-tile]');
    if (!tileEl) return;
    var idx = parseInt(tileEl.getAttribute('data-tile'), 10);
    deselectAll();
    selectTile(idx);
  });
})();

/* ── Wire "Create Your PSP" AI Generator ── */
(function() {
  var genBtn = document.getElementById('psp-generator-btn');
  var genInput = document.getElementById('psp-generator-input');
  var genOutput = document.getElementById('psp-generator-output');
  var genReset = document.getElementById('psp-generator-reset');
  var genExamples = document.getElementById('psp-generator-examples');
  var apiKeyInput = document.getElementById('psp-api-key-input');
  var apiKeySave = document.getElementById('psp-api-key-save');
  var apiKeyBar = document.getElementById('psp-api-key-bar');

  if (!genBtn || !genInput || !genOutput) return;
  var gen = window.PSP && window.PSP.features && window.PSP.features.pspGenerator;
  if (!gen) return;

  // API key UI
  if (apiKeyInput && gen.hasApiKey()) {
    apiKeyInput.value = '••••••••••••••••';
    if (apiKeyBar) apiKeyBar.style.borderColor = '#16a34a';
  }
  if (apiKeySave) {
    apiKeySave.addEventListener('click', function() {
      var key = apiKeyInput.value.trim();
      if (key && key.indexOf('••') === -1) {
        gen.setApiKey(key);
        apiKeyInput.value = '••••••••••••••••';
        apiKeyBar.style.borderColor = '#16a34a';
        apiKeyBar.style.background = '#f0fdf4';
      }
    });
  }

  function generatePSP(skipLoading) {
    var prompt = genInput.value.trim();
    if (skipLoading || !gen.hasApiKey()) {
      // Instant render (default PSP, no LLM)
      var cfg = gen.getDefaultConfig();
      var html = window.PSP.renderers.pspFrame.render(cfg);
      genOutput.innerHTML = html;
      window.PSP.renderers.pspFrame.attachInteractivity(genOutput);
    } else {
      gen.generate(prompt, genOutput);
    }
  }

  genBtn.addEventListener('click', function() { generatePSP(false); });

  genInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      generatePSP(false);
    }
  });

  if (genReset) {
    genReset.addEventListener('click', function() {
      genInput.value = '';
      genOutput.innerHTML = '';
    });
  }

  if (genExamples) {
    genExamples.addEventListener('click', function(e) {
      var chip = e.target.closest('.psp-example-chip');
      if (!chip) return;
      var prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        genInput.value = prompt;
        generatePSP(false);
      }
    });
  }

  // Render default on load (instant, no animation)
  generatePSP(true);
})();

/* ── Initialize Dark Mode (reads localStorage, applies theme, renders toggle) ── */
if (window.PSP && window.PSP.features && window.PSP.features.darkMode) {
  window.PSP.features.darkMode.init();
}

/* ── Initialize Search (sets up keyboard shortcut, renders search UI) ── */
if (window.PSP && window.PSP.features && window.PSP.features.search) {
  window.PSP.features.search.init();
  // Build search index AFTER all sections have rendered
  window.PSP.features.search.buildIndex();
}
