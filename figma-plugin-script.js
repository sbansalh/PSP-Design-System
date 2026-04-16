// ============================================================
// Modernised PSP Design System — Figma Plugin Script
// ============================================================
// 
// HOW TO USE:
// 1. Open your Figma file: Modernised PSP toolkit
// 2. Go to Plugins > Development > New Plugin > Figma Design > choose any name
// 3. In the plugin editor, replace ALL code in code.ts with this script
// 4. Click Run
// 5. The script will create everything on the "Page for Kiro" page
//
// ALTERNATIVELY (Quick method):
// 1. Open Figma file
// 2. Open the browser console (Cmd+Option+J on Mac)
// 3. This won't work in browser console — you MUST use the Plugin approach
//
// ============================================================

// ---------- UTILITIES ----------

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}

function solidPaint(hex, opacity) {
  const c = hexToRgb(hex);
  const paint = { type: 'SOLID', color: c };
  if (opacity !== undefined) paint.opacity = opacity;
  return paint;
}

function setFills(node, hex, opacity) {
  node.fills = [solidPaint(hex, opacity)];
}

function setStrokes(node, hex, weight, opacity) {
  node.strokes = [solidPaint(hex, opacity)];
  node.strokeWeight = weight;
}

async function loadFonts() {
  await figma.loadFontAsync({ family: "Amazon Ember", style: "Regular" });
  await figma.loadFontAsync({ family: "Amazon Ember", style: "Medium" });
  await figma.loadFontAsync({ family: "Amazon Ember", style: "Bold" });
}

function createText(parent, text, opts) {
  const t = figma.createText();
  t.characters = text;
  t.fontName = { family: "Amazon Ember", style: opts.style || "Regular" };
  t.fontSize = opts.size || 14;
  if (opts.lineHeight) t.lineHeight = { value: opts.lineHeight, unit: "PIXELS" };
  if (opts.color) setFills(t, opts.color);
  if (opts.letterSpacing) t.letterSpacing = { value: opts.letterSpacing, unit: "PIXELS" };
  if (opts.textCase) t.textCase = opts.textCase;
  t.textAutoResize = opts.autoResize || "WIDTH_AND_HEIGHT";
  if (parent) parent.appendChild(t);
  return t;
}


// ============================================================
// PART 1: COLOR STYLES
// ============================================================

function createColorStyles() {
  const colors = [
    // Backgrounds
    { name: "PSP/Background/Page", hex: "#F7FAFA" },
    { name: "PSP/Background/Card", hex: "#FFFFFF" },
    { name: "PSP/Background/Selected Tile", hex: "#EDF8FF" },
    { name: "PSP/Background/Address Bar", hex: "#F7FEFF" },
    { name: "PSP/Background/Savings Bar", hex: "#E8FFF8" },
    { name: "PSP/Background/Header Gradient Start", hex: "#82D8E3" },
    { name: "PSP/Background/Header Gradient End", hex: "#A6E7CE" },
    { name: "PSP/Background/CTA Button", hex: "#FFD814" },

    // Text
    { name: "PSP/Text/Primary", hex: "#0F1111" },
    { name: "PSP/Text/Secondary", hex: "#565959" },
    { name: "PSP/Text/Link", hex: "#2162A1" },
    { name: "PSP/Text/Success", hex: "#0B7B3C" },
    { name: "PSP/Text/Muted", hex: "#888C8C" },

    // Borders
    { name: "PSP/Border/Card", hex: "#D5D9D9" },
    { name: "PSP/Border/Selected", hex: "#2162A1" },
    { name: "PSP/Border/Divider Dashed", hex: "#6F7373" },
    { name: "PSP/Border/Address", hex: "#E5E5E5" },
    { name: "PSP/Border/Savings Bar", hex: "#E6E6E6" },

    // Badge
    { name: "PSP/Badge/Best Offer BG", hex: "#0A7CD1" },
    { name: "PSP/Badge/Best Offer Text", hex: "#FFFFFF" },
    { name: "PSP/Badge/Default BG", hex: "#E3E6E6" },
    { name: "PSP/Badge/Default Text", hex: "#232F3E" },
  ];

  const styles = [];
  for (const c of colors) {
    const style = figma.createPaintStyle();
    style.name = c.name;
    style.paints = [solidPaint(c.hex)];
    styles.push(style);
  }
  return styles;
}

// ============================================================
// PART 2: TEXT STYLES
// ============================================================

function createTextStyles() {
  const textDefs = [
    { name: "PSP/Heading/Page Title", size: 16, style: "Regular", lineHeight: 18 },
    { name: "PSP/Heading/Section Header", size: 13, style: "Bold", lineHeight: 18 },
    { name: "PSP/Body/Instrument Name", size: 16, style: "Regular", lineHeight: 20 },
    { name: "PSP/Body/Instrument Name Small", size: 15, style: "Regular", lineHeight: 20 },
    { name: "PSP/Body/Secondary", size: 13, style: "Regular", lineHeight: 18 },
    { name: "PSP/Body/Offer Text", size: 13, style: "Regular", lineHeight: 18 },
    { name: "PSP/Body/Link", size: 16, style: "Regular", lineHeight: 20 },
    { name: "PSP/Badge/Label", size: 9, style: "Regular", lineHeight: 15 },
    { name: "PSP/Price/Currency", size: 13, style: "Bold", lineHeight: 16 },
    { name: "PSP/Price/Amount", size: 22, style: "Bold", lineHeight: 26 },
    { name: "PSP/Price/Fees", size: 14, style: "Regular", lineHeight: 18 },
    { name: "PSP/Savings/Amount", size: 14, style: "Bold", lineHeight: 20 },
    { name: "PSP/CTA/Label", size: 16, style: "Regular", lineHeight: 21 },
    { name: "PSP/Button/Add Now", size: 13, style: "Regular", lineHeight: 29 },
    { name: "PSP/Address/Name", size: 13, style: "Bold", lineHeight: 18 },
    { name: "PSP/Address/Detail", size: 13, style: "Regular", lineHeight: 18 },
  ];

  for (const def of textDefs) {
    const style = figma.createTextStyle();
    style.name = def.name;
    style.fontName = { family: "Amazon Ember", style: def.style };
    style.fontSize = def.size;
    if (def.lineHeight) style.lineHeight = { value: def.lineHeight, unit: "PIXELS" };
  }
}


// ============================================================
// PART 3: COMPONENTS
// ============================================================

function createBadgeComponent(page) {
  // --- Badge Component Set (Best Offer / Previously Used / Featured) ---
  const variants = [];

  // Best Offer variant
  const bestOffer = figma.createComponent();
  bestOffer.name = "Type=Best Offer";
  bestOffer.layoutMode = "HORIZONTAL";
  bestOffer.counterAxisAlignItems = "CENTER";
  bestOffer.primaryAxisAlignItems = "CENTER";
  bestOffer.paddingLeft = 8;
  bestOffer.paddingRight = 8;
  bestOffer.paddingTop = 2;
  bestOffer.paddingBottom = 2;
  bestOffer.cornerRadius = 13;
  bestOffer.primaryAxisSizingMode = "AUTO";
  bestOffer.counterAxisSizingMode = "AUTO";
  setFills(bestOffer, "#0A7CD1");
  const boText = createText(bestOffer, "Best offer", { size: 9, style: "Regular", lineHeight: 15, color: "#FFFFFF" });
  boText.layoutAlign = "INHERIT";
  variants.push(bestOffer);

  // Previously Used variant
  const prevUsed = figma.createComponent();
  prevUsed.name = "Type=Previously Used";
  prevUsed.layoutMode = "HORIZONTAL";
  prevUsed.counterAxisAlignItems = "CENTER";
  prevUsed.primaryAxisAlignItems = "CENTER";
  prevUsed.paddingLeft = 8;
  prevUsed.paddingRight = 8;
  prevUsed.paddingTop = 2;
  prevUsed.paddingBottom = 2;
  prevUsed.cornerRadius = 13;
  prevUsed.primaryAxisSizingMode = "AUTO";
  prevUsed.counterAxisSizingMode = "AUTO";
  setFills(prevUsed, "#E3E6E6");
  const puText = createText(prevUsed, "Previously used", { size: 9, style: "Regular", lineHeight: 15, color: "#232F3E" });
  puText.layoutAlign = "INHERIT";
  variants.push(prevUsed);

  // Featured variant
  const featured = figma.createComponent();
  featured.name = "Type=Featured";
  featured.layoutMode = "HORIZONTAL";
  featured.counterAxisAlignItems = "CENTER";
  featured.primaryAxisAlignItems = "CENTER";
  featured.paddingLeft = 8;
  featured.paddingRight = 8;
  featured.paddingTop = 2;
  featured.paddingBottom = 2;
  featured.cornerRadius = 13;
  featured.primaryAxisSizingMode = "AUTO";
  featured.counterAxisSizingMode = "AUTO";
  setFills(featured, "#E3E6E6");
  const fText = createText(featured, "Featured", { size: 9, style: "Regular", lineHeight: 15, color: "#232F3E" });
  fText.layoutAlign = "INHERIT";
  variants.push(featured);

  const componentSet = figma.combineAsVariants(variants, page);
  componentSet.name = "PSP/Badge";
  componentSet.layoutMode = "HORIZONTAL";
  componentSet.itemSpacing = 20;
  componentSet.paddingLeft = 20;
  componentSet.paddingRight = 20;
  componentSet.paddingTop = 20;
  componentSet.paddingBottom = 20;
  setFills(componentSet, "#FFFFFF");

  return componentSet;
}

function createDividerComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Divider Dashed";
  comp.resize(304, 1);
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";

  const line = figma.createLine();
  line.resize(304, 0);
  line.strokes = [solidPaint("#6F7373")];
  line.strokeWeight = 0.5;
  line.dashPattern = [1, 3];
  line.strokeCap = "SQUARE";
  comp.appendChild(line);
  line.layoutAlign = "STRETCH";
  line.layoutGrow = 1;

  page.appendChild(comp);
  return comp;
}

function createInstrumentIconComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Instrument Icon";
  comp.resize(54, 36);
  comp.cornerRadius = 5;
  setFills(comp, "#FFFFFF");
  comp.effects = [{
    type: "DROP_SHADOW",
    visible: true,
    color: { r: 0, g: 0, b: 0, a: 0.08 },
    blendMode: "NORMAL",
    offset: { x: 0, y: 0 },
    radius: 3.6,
  }];

  // Placeholder rectangle for logo
  const placeholder = figma.createRectangle();
  placeholder.name = "Logo Placeholder";
  placeholder.resize(40, 26);
  placeholder.x = 7;
  placeholder.y = 5;
  placeholder.cornerRadius = 2;
  setFills(placeholder, "#F0F2F2");
  comp.appendChild(placeholder);

  page.appendChild(comp);
  return comp;
}


function createInstrumentTileComponent(page) {
  // --- Default Tile ---
  const defaultTile = figma.createComponent();
  defaultTile.name = "State=Default";
  defaultTile.layoutMode = "VERTICAL";
  defaultTile.primaryAxisSizingMode = "AUTO";
  defaultTile.counterAxisSizingMode = "FIXED";
  defaultTile.resize(328, 90);
  defaultTile.paddingLeft = 12;
  defaultTile.paddingRight = 12;
  defaultTile.paddingTop = 12;
  defaultTile.paddingBottom = 12;
  defaultTile.itemSpacing = 4;
  setFills(defaultTile, "#FFFFFF");

  // Badge row
  const badgeRow = figma.createFrame();
  badgeRow.name = "Badge Row";
  badgeRow.layoutMode = "VERTICAL";
  badgeRow.primaryAxisSizingMode = "AUTO";
  badgeRow.counterAxisSizingMode = "AUTO";
  badgeRow.paddingLeft = 66;
  badgeRow.itemSpacing = 8;
  badgeRow.fills = [];
  defaultTile.appendChild(badgeRow);
  badgeRow.layoutAlign = "STRETCH";

  const badgePlaceholder = figma.createRectangle();
  badgePlaceholder.name = "[Badge Instance Here]";
  badgePlaceholder.resize(80, 20);
  badgePlaceholder.cornerRadius = 13;
  setFills(badgePlaceholder, "#E3E6E6");
  badgeRow.appendChild(badgePlaceholder);

  // Content row
  const contentRow = figma.createFrame();
  contentRow.name = "Content Row";
  contentRow.layoutMode = "HORIZONTAL";
  contentRow.primaryAxisSizingMode = "AUTO";
  contentRow.counterAxisSizingMode = "AUTO";
  contentRow.itemSpacing = 12;
  contentRow.counterAxisAlignItems = "CENTER";
  contentRow.fills = [];
  defaultTile.appendChild(contentRow);
  contentRow.layoutAlign = "STRETCH";

  // Icon placeholder
  const icon = figma.createRectangle();
  icon.name = "Instrument Icon";
  icon.resize(54, 36);
  icon.cornerRadius = 5;
  setFills(icon, "#F0F2F2");
  icon.effects = [{
    type: "DROP_SHADOW", visible: true,
    color: { r: 0, g: 0, b: 0, a: 0.08 },
    blendMode: "NORMAL", offset: { x: 0, y: 0 }, radius: 3.6,
  }];
  contentRow.appendChild(icon);

  // Text block
  const textBlock = figma.createFrame();
  textBlock.name = "Text Block";
  textBlock.layoutMode = "VERTICAL";
  textBlock.primaryAxisSizingMode = "AUTO";
  textBlock.counterAxisSizingMode = "FILL";
  textBlock.itemSpacing = 4;
  textBlock.fills = [];
  contentRow.appendChild(textBlock);
  textBlock.layoutGrow = 1;
  textBlock.layoutAlign = "INHERIT";

  const nameText = createText(textBlock, "Instrument Name", { size: 16, style: "Regular", lineHeight: 20, color: "#0F1111" });
  nameText.layoutAlign = "STRETCH";

  // Detail row (visa + card number)
  const detailRow = figma.createFrame();
  detailRow.name = "Detail Row";
  detailRow.layoutMode = "HORIZONTAL";
  detailRow.primaryAxisSizingMode = "AUTO";
  detailRow.counterAxisSizingMode = "AUTO";
  detailRow.counterAxisAlignItems = "CENTER";
  detailRow.itemSpacing = 4;
  detailRow.fills = [];
  textBlock.appendChild(detailRow);

  const visaPlaceholder = figma.createRectangle();
  visaPlaceholder.name = "Card Network Logo";
  visaPlaceholder.resize(25, 8);
  setFills(visaPlaceholder, "#1A1F71");
  visaPlaceholder.cornerRadius = 1;
  detailRow.appendChild(visaPlaceholder);

  const detailText = createText(detailRow, "••••0424 | Akshay", { size: 13, style: "Regular", lineHeight: 18, color: "#565959" });

  // Offer row
  const offerRow = figma.createFrame();
  offerRow.name = "Offer Row";
  offerRow.layoutMode = "HORIZONTAL";
  offerRow.primaryAxisSizingMode = "AUTO";
  offerRow.counterAxisSizingMode = "AUTO";
  offerRow.itemSpacing = 0;
  offerRow.fills = [];
  textBlock.appendChild(offerRow);

  const savingsText = createText(offerRow, "Save ₹10 as cashback. ", { size: 13, style: "Regular", lineHeight: 18, color: "#0B7B3C" });
  const detailsLink = createText(offerRow, "Details", { size: 13, style: "Regular", lineHeight: 18, color: "#2162A1" });

  // --- Selected Tile ---
  const selectedTile = defaultTile.clone();
  selectedTile.name = "State=Selected";
  setFills(selectedTile, "#EDF8FF");
  setStrokes(selectedTile, "#2162A1", 1);
  selectedTile.topLeftRadius = 12;
  selectedTile.topRightRadius = 12;
  selectedTile.bottomLeftRadius = 0;
  selectedTile.bottomRightRadius = 0;

  const componentSet = figma.combineAsVariants([defaultTile, selectedTile], page);
  componentSet.name = "PSP/Instrument Tile";
  componentSet.layoutMode = "VERTICAL";
  componentSet.itemSpacing = 20;
  componentSet.paddingLeft = 20;
  componentSet.paddingRight = 20;
  componentSet.paddingTop = 20;
  componentSet.paddingBottom = 20;
  setFills(componentSet, "#FFFFFF");

  return componentSet;
}


function createCardGroupComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Card Group";
  comp.layoutMode = "VERTICAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "FIXED";
  comp.resize(328, 100);
  setFills(comp, "#FFFFFF");
  setStrokes(comp, "#D5D9D9", 0.55);
  comp.cornerRadius = 12;
  comp.clipsContent = true;

  page.appendChild(comp);
  return comp;
}

function createSectionHeaderComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Section Header";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "AUTO";
  comp.paddingTop = 25;
  comp.paddingBottom = 12;
  comp.fills = [];

  const text = createText(comp, "SECTION HEADER", {
    size: 13, style: "Bold", lineHeight: 18, color: "#565959",
    textCase: "UPPER"
  });
  text.layoutAlign = "INHERIT";

  page.appendChild(comp);
  return comp;
}

function createAddLinkComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Add New Instrument Link";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "FIXED";
  comp.resize(304, 44);
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.paddingTop = 12;
  comp.paddingBottom = 12;
  comp.itemSpacing = 10;
  comp.fills = [];

  const text = createText(comp, "+ Add new credit or debit card", {
    size: 16, style: "Regular", lineHeight: 20, color: "#2162A1"
  });
  text.layoutAlign = "INHERIT";

  page.appendChild(comp);
  return comp;
}

function createUPIPillComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/UPI Bank Pill";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.resize(238, 34);
  comp.paddingLeft = 8;
  comp.paddingRight = 8;
  comp.paddingTop = 8;
  comp.paddingBottom = 8;
  comp.counterAxisAlignItems = "CENTER";
  comp.primaryAxisAlignItems = "SPACE_BETWEEN";
  comp.itemSpacing = 9;
  comp.cornerRadius = 30;
  setFills(comp, "#FFFFFF");
  setStrokes(comp, "#D5D9D9", 0.46);

  // Left side
  const leftGroup = figma.createFrame();
  leftGroup.name = "Bank Info";
  leftGroup.layoutMode = "HORIZONTAL";
  leftGroup.primaryAxisSizingMode = "AUTO";
  leftGroup.counterAxisSizingMode = "AUTO";
  leftGroup.counterAxisAlignItems = "CENTER";
  leftGroup.itemSpacing = 6;
  leftGroup.fills = [];
  comp.appendChild(leftGroup);

  const bankLogo = figma.createEllipse();
  bankLogo.name = "Bank Logo";
  bankLogo.resize(13, 13);
  setFills(bankLogo, "#F58220");
  bankLogo.effects = [{
    type: "DROP_SHADOW", visible: true,
    color: { r: 0.72, g: 0.70, b: 0.70, a: 0.5 },
    blendMode: "NORMAL", offset: { x: 0, y: 0 }, radius: 2,
  }];
  leftGroup.appendChild(bankLogo);

  const bankText = createText(leftGroup, "ICICI Bank ••••0911", {
    size: 13, style: "Regular", lineHeight: 18, color: "#565959"
  });

  // Chevron
  const chevron = figma.createFrame();
  chevron.name = "Chevron";
  chevron.resize(12, 12);
  chevron.fills = [];
  comp.appendChild(chevron);

  const chevronLine = figma.createVector();
  chevronLine.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 2 1 L 8 6 L 2 11"
  }];
  chevronLine.resize(6, 10);
  chevronLine.x = 3;
  chevronLine.y = 1;
  chevronLine.strokes = [solidPaint("#2162A1")];
  chevronLine.strokeWeight = 1.5;
  chevronLine.fills = [];
  chevron.appendChild(chevronLine);

  page.appendChild(comp);
  return comp;
}


function createAddNowButtonComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Button/Add Now";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "AUTO";
  comp.counterAxisAlignItems = "CENTER";
  comp.paddingLeft = 12;
  comp.paddingRight = 24;
  comp.paddingTop = 1;
  comp.paddingBottom = 1;
  comp.cornerRadius = 61;
  setFills(comp, "#FFFFFF");
  setStrokes(comp, "#888C8C", 1);

  const label = createText(comp, "Add Now", {
    size: 13, style: "Regular", lineHeight: 29, color: "#0F1111"
  });

  page.appendChild(comp);
  return comp;
}

function createContinueButtonComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Button/Continue";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.resize(170, 47);
  comp.counterAxisAlignItems = "CENTER";
  comp.primaryAxisAlignItems = "CENTER";
  comp.paddingLeft = 17;
  comp.paddingRight = 16;
  comp.paddingTop = 13;
  comp.paddingBottom = 13;
  comp.cornerRadius = 92;
  setFills(comp, "#FFD814");

  const label = createText(comp, "Continue", {
    size: 16, style: "Regular", lineHeight: 21, color: "#0F1111"
  });

  page.appendChild(comp);
  return comp;
}

function createSavingsBarComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Savings Bar";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.resize(360, 34);
  comp.primaryAxisAlignItems = "SPACE_BETWEEN";
  comp.counterAxisAlignItems = "CENTER";
  comp.paddingLeft = 15;
  comp.paddingRight = 15;
  comp.paddingTop = 7;
  comp.paddingBottom = 7;
  comp.topLeftRadius = 12;
  comp.topRightRadius = 12;
  comp.bottomLeftRadius = 0;
  comp.bottomRightRadius = 0;
  setFills(comp, "#E8FFF8");
  comp.strokes = [solidPaint("#E6E6E6")];
  comp.strokeWeight = 1;
  comp.strokesIncludedInLayout = false;
  comp.effects = [{
    type: "DROP_SHADOW", visible: true,
    color: { r: 0, g: 0, b: 0, a: 0.08 },
    blendMode: "NORMAL", offset: { x: 0, y: -2 }, radius: 5,
  }];

  const savingsText = createText(comp, "₹15 saved", {
    size: 14, style: "Bold", lineHeight: 20, color: "#0B7B3C"
  });

  const seeOffers = figma.createFrame();
  seeOffers.name = "See Offers Link";
  seeOffers.layoutMode = "HORIZONTAL";
  seeOffers.primaryAxisSizingMode = "AUTO";
  seeOffers.counterAxisSizingMode = "AUTO";
  seeOffers.counterAxisAlignItems = "CENTER";
  seeOffers.fills = [];
  comp.appendChild(seeOffers);

  const linkText = createText(seeOffers, "See offers", {
    size: 14, style: "Regular", lineHeight: 18, color: "#2162A1"
  });

  const chevFrame = figma.createFrame();
  chevFrame.name = "Chevron";
  chevFrame.resize(12, 12);
  chevFrame.fills = [];
  seeOffers.appendChild(chevFrame);

  page.appendChild(comp);
  return comp;
}

function createActionBarComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Action Bar";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.resize(360, 81);
  comp.primaryAxisAlignItems = "SPACE_BETWEEN";
  comp.counterAxisAlignItems = "CENTER";
  comp.paddingLeft = 16;
  comp.paddingRight = 16;
  comp.paddingTop = 12;
  comp.paddingBottom = 12;
  setFills(comp, "#FFFFFF");

  // Price section
  const priceSection = figma.createFrame();
  priceSection.name = "Price Section";
  priceSection.layoutMode = "VERTICAL";
  priceSection.primaryAxisSizingMode = "AUTO";
  priceSection.counterAxisSizingMode = "AUTO";
  priceSection.fills = [];
  comp.appendChild(priceSection);

  const priceRow = figma.createFrame();
  priceRow.name = "Price Row";
  priceRow.layoutMode = "HORIZONTAL";
  priceRow.primaryAxisSizingMode = "AUTO";
  priceRow.counterAxisSizingMode = "AUTO";
  priceRow.counterAxisAlignItems = "CENTER";
  priceRow.itemSpacing = 12;
  priceRow.fills = [];
  priceSection.appendChild(priceRow);

  const priceInner = figma.createFrame();
  priceInner.name = "Price";
  priceInner.layoutMode = "HORIZONTAL";
  priceInner.primaryAxisSizingMode = "AUTO";
  priceInner.counterAxisSizingMode = "AUTO";
  priceInner.fills = [];
  priceRow.appendChild(priceInner);

  const currency = createText(priceInner, "₹", {
    size: 13, style: "Bold", lineHeight: 16, color: "#0F1111"
  });
  const amount = createText(priceInner, "504", {
    size: 22, style: "Bold", lineHeight: 26, color: "#0F1111"
  });

  // Expand arrow placeholder
  const expandArrow = figma.createRectangle();
  expandArrow.name = "Expand Arrow";
  expandArrow.resize(12, 7);
  setFills(expandArrow, "#0F1111", 0.3);
  priceRow.appendChild(expandArrow);

  const feesText = createText(priceSection, "Includes fees", {
    size: 14, style: "Regular", lineHeight: 18, color: "#565959"
  });

  // Continue button placeholder
  const ctaPlaceholder = figma.createRectangle();
  ctaPlaceholder.name = "[Continue Button Instance]";
  ctaPlaceholder.resize(170, 47);
  ctaPlaceholder.cornerRadius = 92;
  setFills(ctaPlaceholder, "#FFD814");
  comp.appendChild(ctaPlaceholder);

  page.appendChild(comp);
  return comp;
}


function createGiftCardRowComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Gift Card Row";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.resize(328, 44);
  comp.primaryAxisAlignItems = "SPACE_BETWEEN";
  comp.counterAxisAlignItems = "CENTER";
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.paddingTop = 12;
  comp.paddingBottom = 12;
  comp.cornerRadius = 8;
  setFills(comp, "#FFFFFF");
  setStrokes(comp, "#D5D9D9", 0.5);

  const text = createText(comp, "Add Gift Card or Promo Code", {
    size: 16, style: "Regular", lineHeight: 20, color: "#2162A1"
  });

  const chevFrame = figma.createFrame();
  chevFrame.name = "Chevron";
  chevFrame.resize(16, 16);
  chevFrame.fills = [];
  comp.appendChild(chevFrame);

  page.appendChild(comp);
  return comp;
}

function createAddressBarComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Address Bar";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.resize(360, 56);
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.paddingTop = 12;
  comp.paddingBottom = 12;
  setFills(comp, "#F7FEFF");

  // Icon placeholder
  const iconFrame = figma.createFrame();
  iconFrame.name = "Location Icon";
  iconFrame.resize(16, 20);
  iconFrame.fills = [];
  comp.appendChild(iconFrame);

  const pin = figma.createEllipse();
  pin.resize(10, 10);
  pin.x = 3;
  pin.y = 3;
  setFills(pin, "#0F1111");
  iconFrame.appendChild(pin);

  // Text content
  const textContent = figma.createFrame();
  textContent.name = "Address Text";
  textContent.layoutMode = "VERTICAL";
  textContent.primaryAxisSizingMode = "AUTO";
  textContent.counterAxisSizingMode = "FILL";
  textContent.fills = [];
  textContent.layoutGrow = 1;
  comp.appendChild(textContent);

  const nameText = createText(textContent, "Deliver to Akshay", {
    size: 13, style: "Bold", lineHeight: 18, color: "#0F1111"
  });
  nameText.layoutAlign = "STRETCH";

  const addrText = createText(textContent, "57 Brigade Road, Residency road... 560025", {
    size: 13, style: "Regular", lineHeight: 18, color: "#0F1111"
  });
  addrText.layoutAlign = "STRETCH";

  // Change link
  const changeText = createText(comp, "Change", {
    size: 13, style: "Regular", lineHeight: 18, color: "#007185"
  });

  page.appendChild(comp);
  return comp;
}

function createHeaderComponent(page) {
  const comp = figma.createComponent();
  comp.name = "PSP/Header";
  comp.resize(360, 69);
  comp.clipsContent = true;

  // Gradient background (two overlapping rects to simulate)
  const gradBg = figma.createRectangle();
  gradBg.name = "Gradient BG";
  gradBg.resize(360, 69);
  gradBg.fills = [{
    type: "GRADIENT_LINEAR",
    gradientTransform: [[0.7, 0.7, 0], [-0.7, 0.7, 0.3]],
    gradientStops: [
      { position: 0, color: { r: 0.51, g: 0.847, b: 0.89, a: 1 } },
      { position: 1, color: { r: 0.651, g: 0.906, b: 0.808, a: 1 } }
    ]
  }];
  comp.appendChild(gradBg);

  // Back arrow placeholder
  const backArrow = figma.createRectangle();
  backArrow.name = "Back Arrow";
  backArrow.resize(24, 24);
  backArrow.x = 15;
  backArrow.y = 34;
  backArrow.fills = [];
  backArrow.strokes = [solidPaint("#0F1111")];
  backArrow.strokeWeight = 1;
  comp.appendChild(backArrow);

  // Title
  const title = createText(null, "Select a Payment Method", {
    size: 16, style: "Regular", lineHeight: 18, color: "#111111"
  });
  title.x = 72;
  title.y = 37;
  comp.appendChild(title);

  page.appendChild(comp);
  return comp;
}

function createSimpleTileComponent(page) {
  // For instruments without badges/offers (EMI, Net Banking, etc.)
  const comp = figma.createComponent();
  comp.name = "PSP/Simple Tile";
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.resize(304, 36);
  comp.paddingLeft = 12;
  comp.paddingRight = 12;
  comp.paddingTop = 12;
  comp.paddingBottom = 12;
  comp.counterAxisAlignItems = "CENTER";
  comp.itemSpacing = 12;
  comp.fills = [];

  const icon = figma.createRectangle();
  icon.name = "Instrument Icon";
  icon.resize(54, 36);
  icon.cornerRadius = 5;
  setFills(icon, "#F0F2F2");
  icon.effects = [{
    type: "DROP_SHADOW", visible: true,
    color: { r: 0, g: 0, b: 0, a: 0.08 },
    blendMode: "NORMAL", offset: { x: 0, y: 0 }, radius: 3.6,
  }];
  comp.appendChild(icon);

  const nameText = createText(comp, "Instrument Name", {
    size: 16, style: "Regular", lineHeight: 20, color: "#0F1111"
  });

  page.appendChild(comp);
  return comp;
}


// ============================================================
// PART 4: TOKEN SWATCH SHEET
// ============================================================

function createTokenSwatchSheet(page) {
  const frame = figma.createFrame();
  frame.name = "🎨 Design Tokens";
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";
  frame.paddingLeft = 40;
  frame.paddingRight = 40;
  frame.paddingTop = 40;
  frame.paddingBottom = 40;
  frame.itemSpacing = 32;
  setFills(frame, "#FFFFFF");

  // Title
  const title = createText(frame, "Modernised PSP — Design Tokens", {
    size: 28, style: "Bold", lineHeight: 36, color: "#0F1111"
  });

  // --- Color Swatches ---
  const colorSection = figma.createFrame();
  colorSection.name = "Colors";
  colorSection.layoutMode = "VERTICAL";
  colorSection.primaryAxisSizingMode = "AUTO";
  colorSection.counterAxisSizingMode = "AUTO";
  colorSection.itemSpacing = 16;
  colorSection.fills = [];
  frame.appendChild(colorSection);

  const colorTitle = createText(colorSection, "Color Tokens", {
    size: 20, style: "Bold", lineHeight: 28, color: "#0F1111"
  });

  const colorGroups = [
    { label: "Backgrounds", colors: [
      { name: "Page", hex: "#F7FAFA" },
      { name: "Card", hex: "#FFFFFF" },
      { name: "Selected", hex: "#EDF8FF" },
      { name: "Address", hex: "#F7FEFF" },
      { name: "Savings", hex: "#E8FFF8" },
      { name: "CTA", hex: "#FFD814" },
    ]},
    { label: "Text", colors: [
      { name: "Primary", hex: "#0F1111" },
      { name: "Secondary", hex: "#565959" },
      { name: "Link", hex: "#2162A1" },
      { name: "Success", hex: "#0B7B3C" },
      { name: "Muted", hex: "#888C8C" },
    ]},
    { label: "Borders", colors: [
      { name: "Card", hex: "#D5D9D9" },
      { name: "Selected", hex: "#2162A1" },
      { name: "Divider", hex: "#6F7373" },
    ]},
    { label: "Badges", colors: [
      { name: "Best Offer", hex: "#0A7CD1" },
      { name: "Default", hex: "#E3E6E6" },
    ]},
    { label: "Header Gradient", colors: [
      { name: "Start", hex: "#82D8E3" },
      { name: "End", hex: "#A6E7CE" },
    ]},
  ];

  for (const group of colorGroups) {
    const groupFrame = figma.createFrame();
    groupFrame.name = group.label;
    groupFrame.layoutMode = "VERTICAL";
    groupFrame.primaryAxisSizingMode = "AUTO";
    groupFrame.counterAxisSizingMode = "AUTO";
    groupFrame.itemSpacing = 8;
    groupFrame.fills = [];
    colorSection.appendChild(groupFrame);

    const groupLabel = createText(groupFrame, group.label, {
      size: 14, style: "Medium", lineHeight: 20, color: "#565959"
    });

    const swatchRow = figma.createFrame();
    swatchRow.name = "Swatches";
    swatchRow.layoutMode = "HORIZONTAL";
    swatchRow.primaryAxisSizingMode = "AUTO";
    swatchRow.counterAxisSizingMode = "AUTO";
    swatchRow.itemSpacing = 12;
    swatchRow.fills = [];
    groupFrame.appendChild(swatchRow);

    for (const c of group.colors) {
      const swatchItem = figma.createFrame();
      swatchItem.name = c.name;
      swatchItem.layoutMode = "VERTICAL";
      swatchItem.primaryAxisSizingMode = "AUTO";
      swatchItem.counterAxisSizingMode = "AUTO";
      swatchItem.counterAxisAlignItems = "CENTER";
      swatchItem.itemSpacing = 4;
      swatchItem.fills = [];
      swatchRow.appendChild(swatchItem);

      const swatch = figma.createRectangle();
      swatch.resize(48, 48);
      swatch.cornerRadius = 8;
      setFills(swatch, c.hex);
      if (c.hex === "#FFFFFF") {
        setStrokes(swatch, "#D5D9D9", 1);
      }
      swatchItem.appendChild(swatch);

      const swatchName = createText(swatchItem, c.name, {
        size: 10, style: "Regular", lineHeight: 14, color: "#565959"
      });
      const swatchHex = createText(swatchItem, c.hex, {
        size: 9, style: "Regular", lineHeight: 12, color: "#888C8C"
      });
    }
  }

  // --- Typography ---
  const typoSection = figma.createFrame();
  typoSection.name = "Typography";
  typoSection.layoutMode = "VERTICAL";
  typoSection.primaryAxisSizingMode = "AUTO";
  typoSection.counterAxisSizingMode = "AUTO";
  typoSection.itemSpacing = 12;
  typoSection.fills = [];
  frame.appendChild(typoSection);

  const typoTitle = createText(typoSection, "Typography Scale", {
    size: 20, style: "Bold", lineHeight: 28, color: "#0F1111"
  });

  const typoSamples = [
    { label: "Price Amount — 22px Bold", size: 22, style: "Bold" },
    { label: "Page Title — 16px Regular", size: 16, style: "Regular" },
    { label: "Instrument Name — 16px Regular", size: 16, style: "Regular" },
    { label: "CTA Label — 16px Regular", size: 16, style: "Regular" },
    { label: "Savings — 14.4px Bold", size: 14, style: "Bold" },
    { label: "Body Secondary — 13px Regular", size: 13, style: "Regular" },
    { label: "Section Header — 13px Bold UPPER", size: 13, style: "Bold" },
    { label: "Badge — 9px Regular", size: 9, style: "Regular" },
  ];

  for (const t of typoSamples) {
    const row = figma.createFrame();
    row.name = t.label;
    row.layoutMode = "HORIZONTAL";
    row.primaryAxisSizingMode = "AUTO";
    row.counterAxisSizingMode = "AUTO";
    row.counterAxisAlignItems = "CENTER";
    row.itemSpacing = 16;
    row.fills = [];
    typoSection.appendChild(row);

    const sample = createText(row, "Amazon Ember Aa", {
      size: t.size, style: t.style, lineHeight: t.size * 1.4, color: "#0F1111"
    });
    const desc = createText(row, t.label, {
      size: 11, style: "Regular", lineHeight: 16, color: "#888C8C"
    });
  }

  // --- Spacing ---
  const spacingSection = figma.createFrame();
  spacingSection.name = "Spacing";
  spacingSection.layoutMode = "VERTICAL";
  spacingSection.primaryAxisSizingMode = "AUTO";
  spacingSection.counterAxisSizingMode = "AUTO";
  spacingSection.itemSpacing = 8;
  spacingSection.fills = [];
  frame.appendChild(spacingSection);

  const spacingTitle = createText(spacingSection, "Spacing Scale (4px grid)", {
    size: 20, style: "Bold", lineHeight: 28, color: "#0F1111"
  });

  const spacingRow = figma.createFrame();
  spacingRow.name = "Spacing Bars";
  spacingRow.layoutMode = "HORIZONTAL";
  spacingRow.primaryAxisSizingMode = "AUTO";
  spacingRow.counterAxisSizingMode = "AUTO";
  spacingRow.counterAxisAlignItems = "MAX";
  spacingRow.itemSpacing = 8;
  spacingRow.fills = [];
  spacingSection.appendChild(spacingRow);

  const spacings = [4, 8, 12, 16, 20, 24, 25, 32];
  for (const s of spacings) {
    const item = figma.createFrame();
    item.layoutMode = "VERTICAL";
    item.primaryAxisSizingMode = "AUTO";
    item.counterAxisSizingMode = "AUTO";
    item.counterAxisAlignItems = "CENTER";
    item.itemSpacing = 4;
    item.fills = [];
    spacingRow.appendChild(item);

    const bar = figma.createRectangle();
    bar.resize(24, s);
    bar.cornerRadius = 2;
    setFills(bar, "#0A7CD1");
    item.appendChild(bar);

    const label = createText(item, `${s}px`, {
      size: 9, style: "Regular", lineHeight: 12, color: "#565959"
    });
  }

  // --- Border Radius ---
  const radiusSection = figma.createFrame();
  radiusSection.name = "Border Radius";
  radiusSection.layoutMode = "VERTICAL";
  radiusSection.primaryAxisSizingMode = "AUTO";
  radiusSection.counterAxisSizingMode = "AUTO";
  radiusSection.itemSpacing = 8;
  radiusSection.fills = [];
  frame.appendChild(radiusSection);

  const radiusTitle = createText(radiusSection, "Border Radius", {
    size: 20, style: "Bold", lineHeight: 28, color: "#0F1111"
  });

  const radiusRow = figma.createFrame();
  radiusRow.layoutMode = "HORIZONTAL";
  radiusRow.primaryAxisSizingMode = "AUTO";
  radiusRow.counterAxisSizingMode = "AUTO";
  radiusRow.itemSpacing = 16;
  radiusRow.fills = [];
  radiusSection.appendChild(radiusRow);

  const radii = [
    { val: 5, label: "Icon 5px" },
    { val: 8, label: "Gift 8px" },
    { val: 12, label: "Card 12px" },
    { val: 13, label: "Badge 13px" },
    { val: 30, label: "Pill 30px" },
    { val: 92, label: "CTA 92px" },
  ];
  for (const r of radii) {
    const item = figma.createFrame();
    item.layoutMode = "VERTICAL";
    item.primaryAxisSizingMode = "AUTO";
    item.counterAxisSizingMode = "AUTO";
    item.counterAxisAlignItems = "CENTER";
    item.itemSpacing = 4;
    item.fills = [];
    radiusRow.appendChild(item);

    const rect = figma.createRectangle();
    rect.resize(48, 48);
    rect.cornerRadius = Math.min(r.val, 24);
    setFills(rect, "#EDF8FF");
    setStrokes(rect, "#2162A1", 1.5);
    item.appendChild(rect);

    const label = createText(item, r.label, {
      size: 9, style: "Regular", lineHeight: 12, color: "#565959"
    });
  }

  page.appendChild(frame);
  frame.x = 0;
  frame.y = 0;
  return frame;
}


// ============================================================
// PART 5: MAIN EXECUTION
// ============================================================

async function main() {
  await loadFonts();

  // Find or create "Page for Kiro"
  let targetPage = figma.root.children.find(p => p.name === "Page for Kiro");
  if (!targetPage) {
    targetPage = figma.createPage();
    targetPage.name = "Page for Kiro";
  }
  figma.currentPage = targetPage;

  // Clear existing content on the page
  for (const child of [...targetPage.children]) {
    child.remove();
  }

  console.log("🎨 Creating color styles...");
  createColorStyles();

  console.log("📝 Creating text styles...");
  createTextStyles();

  console.log("🧩 Creating components...");

  // Layout components in a grid
  let xOffset = 0;
  let yOffset = 0;
  const COL_GAP = 60;
  const ROW_GAP = 60;

  // Token swatch sheet
  console.log("  → Token Swatch Sheet");
  const tokenSheet = createTokenSwatchSheet(targetPage);
  tokenSheet.x = 0;
  tokenSheet.y = 0;

  // Components start to the right of the token sheet
  const compStartX = tokenSheet.width + 80;
  xOffset = compStartX;
  yOffset = 0;

  // Component label
  const compLabel = createText(null, "🧩 Components", {
    size: 28, style: "Bold", lineHeight: 36, color: "#0F1111"
  });
  targetPage.appendChild(compLabel);
  compLabel.x = xOffset;
  compLabel.y = yOffset;
  yOffset += 50;

  // Badge
  console.log("  → Badge");
  const badge = createBadgeComponent(targetPage);
  badge.x = xOffset;
  badge.y = yOffset;
  yOffset += badge.height + ROW_GAP;

  // Instrument Tile
  console.log("  → Instrument Tile");
  const tile = createInstrumentTileComponent(targetPage);
  tile.x = xOffset;
  tile.y = yOffset;
  yOffset += tile.height + ROW_GAP;

  // Simple Tile
  console.log("  → Simple Tile");
  const simpleTile = createSimpleTileComponent(targetPage);
  simpleTile.x = xOffset;
  simpleTile.y = yOffset;
  yOffset += simpleTile.height + ROW_GAP;

  // Divider
  console.log("  → Divider");
  const divider = createDividerComponent(targetPage);
  divider.x = xOffset;
  divider.y = yOffset;
  yOffset += 30 + ROW_GAP;

  // Instrument Icon
  console.log("  → Instrument Icon");
  const instIcon = createInstrumentIconComponent(targetPage);
  instIcon.x = xOffset;
  instIcon.y = yOffset;
  yOffset += instIcon.height + ROW_GAP;

  // Card Group
  console.log("  → Card Group");
  const cardGroup = createCardGroupComponent(targetPage);
  cardGroup.x = xOffset;
  cardGroup.y = yOffset;
  yOffset += cardGroup.height + ROW_GAP;

  // Section Header
  console.log("  → Section Header");
  const sectionHeader = createSectionHeaderComponent(targetPage);
  sectionHeader.x = xOffset;
  sectionHeader.y = yOffset;
  yOffset += sectionHeader.height + ROW_GAP;

  // Add Link
  console.log("  → Add New Instrument Link");
  const addLink = createAddLinkComponent(targetPage);
  addLink.x = xOffset;
  addLink.y = yOffset;
  yOffset += addLink.height + ROW_GAP;

  // UPI Pill
  console.log("  → UPI Bank Pill");
  const upiPill = createUPIPillComponent(targetPage);
  upiPill.x = xOffset;
  upiPill.y = yOffset;
  yOffset += upiPill.height + ROW_GAP;

  // Add Now Button
  console.log("  → Add Now Button");
  const addNowBtn = createAddNowButtonComponent(targetPage);
  addNowBtn.x = xOffset;
  addNowBtn.y = yOffset;
  yOffset += addNowBtn.height + ROW_GAP;

  // Continue Button
  console.log("  → Continue Button");
  const continueBtn = createContinueButtonComponent(targetPage);
  continueBtn.x = xOffset;
  continueBtn.y = yOffset;
  yOffset += continueBtn.height + ROW_GAP;

  // Gift Card Row
  console.log("  → Gift Card Row");
  const giftCard = createGiftCardRowComponent(targetPage);
  giftCard.x = xOffset;
  giftCard.y = yOffset;
  yOffset += giftCard.height + ROW_GAP;

  // Savings Bar
  console.log("  → Savings Bar");
  const savingsBar = createSavingsBarComponent(targetPage);
  savingsBar.x = xOffset;
  savingsBar.y = yOffset;
  yOffset += savingsBar.height + ROW_GAP;

  // Action Bar
  console.log("  → Action Bar");
  const actionBar = createActionBarComponent(targetPage);
  actionBar.x = xOffset;
  actionBar.y = yOffset;
  yOffset += actionBar.height + ROW_GAP;

  // Address Bar
  console.log("  → Address Bar");
  const addressBar = createAddressBarComponent(targetPage);
  addressBar.x = xOffset;
  addressBar.y = yOffset;
  yOffset += addressBar.height + ROW_GAP;

  // Header
  console.log("  → Header");
  const header = createHeaderComponent(targetPage);
  header.x = xOffset;
  header.y = yOffset;

  // Zoom to fit
  figma.viewport.scrollAndZoomIntoView(targetPage.children);

  console.log("✅ Done! Created:");
  console.log("   - 23 color styles (PSP/*)");
  console.log("   - 16 text styles (PSP/*)");
  console.log("   - 15 components");
  console.log("   - 1 token swatch sheet");

  figma.closePlugin("✅ Modernised PSP Design System created on 'Page for Kiro'");
}

main();
