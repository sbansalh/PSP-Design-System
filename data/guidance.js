/**
 * PSP Design System - Usage Guidance
 * Usage guidance (do/don't) per component.
 * Each component has minimum 3 "when to use" scenarios and minimum 2 "when not to use" anti-patterns.
 */
(function() {
  'use strict';

  window.PSP.data.guidance = {
    instrumentTile: {
      whenToUse: [
        {
          scenario: 'Displaying saved payment methods in checkout',
          explanation: 'Instrument tiles are designed for presenting selectable payment options with radio-button behavior, showing card details, bank logos, and promotional badges.'
        },
        {
          scenario: 'Showing a list of linked UPI accounts or wallets',
          explanation: 'The tile format provides enough space for instrument icon, name, details, and optional offer text in a scannable vertical list.'
        },
        {
          scenario: 'Presenting EMI or Pay Later options with offer badges',
          explanation: 'The built-in badge and offer text slots make it ideal for highlighting promotional savings on specific instruments.'
        },
        {
          scenario: 'Single-select payment method picker',
          explanation: 'The radio button affordance communicates mutual exclusivity clearly — only one instrument can be selected at a time.'
        }
      ],
      whenNotToUse: [
        {
          scenario: 'Displaying non-selectable informational cards',
          explanation: 'Instrument tiles imply selection via their radio button. Using them for read-only info confuses users.',
          alternative: 'Use a plain card or info banner without radio affordance.'
        },
        {
          scenario: 'Multi-select scenarios where users pick multiple payment methods',
          explanation: 'The radio button pattern signals single selection. Multi-select requires checkbox affordance.',
          alternative: 'Use a checkbox list or multi-select card pattern with checkmarks.'
        },
        {
          scenario: 'Navigation links to payment settings or management pages',
          explanation: 'Tiles with radio buttons set an expectation of immediate selection, not navigation.',
          alternative: 'Use a serviceTile with chevron for navigation actions.'
        }
      ]
    },

    sectionHeader: {
      whenToUse: [
        {
          scenario: 'Grouping payment instruments by category (e.g., Credit Cards, UPI, Wallets)',
          explanation: 'Section headers create clear visual separation between instrument groups, improving scannability.'
        },
        {
          scenario: 'Labeling collapsible sections in a long payment method list',
          explanation: 'The overline typography and divider pattern signals a group boundary that can expand/collapse.'
        },
        {
          scenario: 'Showing item counts alongside category names',
          explanation: 'The built-in count slot helps users understand how many options exist in each category without expanding.'
        }
      ],
      whenNotToUse: [
        {
          scenario: 'Page-level headings or titles',
          explanation: 'Section headers use overline/caption styling meant for in-page grouping, not primary page titles.',
          alternative: 'Use a standard heading element (h1/h2) with appropriate type scale.'
        },
        {
          scenario: 'Decorative dividers without semantic grouping',
          explanation: 'Section headers carry semantic meaning (heading role). Using them purely as visual dividers harms accessibility.',
          alternative: 'Use a simple <hr> or CSS border for decorative separation.'
        }
      ]
    },

    badge: {
      whenToUse: [
        {
          scenario: 'Highlighting promotional offers on payment instruments',
          explanation: 'Badges draw attention to time-sensitive or value-adding information like cashback or discounts.'
        },
        {
          scenario: 'Indicating instrument status (e.g., "Preferred", "New")',
          explanation: 'Small status labels help users quickly identify special attributes of a payment method.'
        },
        {
          scenario: 'Showing limited-time offers that create urgency',
          explanation: 'The compact, colored badge format is effective for communicating urgency without disrupting the layout.'
        }
      ],
      whenNotToUse: [
        {
          scenario: 'Displaying long descriptive text or full sentences',
          explanation: 'Badges are designed for 1-3 word labels. Long text breaks the compact layout and reduces scannability.',
          alternative: 'Use the offer text slot within the instrument tile or a separate info line.'
        },
        {
          scenario: 'Critical error messages or warnings that require user action',
          explanation: 'Badges are informational and easily overlooked. Critical messages need more prominent treatment.',
          alternative: 'Use an inline alert or error banner with appropriate ARIA live region.'
        }
      ]
    },

    ctaBar: {
      whenToUse: [
        {
          scenario: 'Bottom-of-page checkout action with price summary',
          explanation: 'The sticky CTA bar keeps the primary action always visible while showing savings and total price context.'
        },
        {
          scenario: 'Confirming payment method selection with a "Place Order" action',
          explanation: 'The bar combines summary information with the primary action, reducing cognitive load at the decision point.'
        },
        {
          scenario: 'Showing dynamic savings that update based on instrument selection',
          explanation: 'The savings text slot updates in real-time as users select different instruments, reinforcing value.'
        }
      ],
      whenNotToUse: [
        {
          scenario: 'Pages with multiple equally-weighted actions',
          explanation: 'The CTA bar emphasizes a single primary action. Multiple buttons dilute its purpose.',
          alternative: 'Use a button group or action sheet for multiple equal-weight actions.'
        },
        {
          scenario: 'Informational pages without a transactional outcome',
          explanation: 'A sticky CTA bar implies a purchase or commitment action. Using it on info pages creates false urgency.',
          alternative: 'Use inline buttons or text links for non-transactional navigation.'
        }
      ]
    },

    savingsBar: {
      whenToUse: [
        {
          scenario: 'Displaying total savings when a promotional instrument is selected',
          explanation: 'The green savings bar reinforces the value proposition and encourages users to proceed with the selected instrument.'
        },
        {
          scenario: 'Showing cashback or discount amounts tied to specific payment methods',
          explanation: 'Positioned above the CTA, it provides last-moment reassurance about savings before the user commits.'
        },
        {
          scenario: 'Communicating dynamic savings that change based on cart or instrument selection',
          explanation: 'The bar updates in real-time, giving immediate feedback when users switch between instruments.'
        }
      ],
      whenNotToUse: [
        {
          scenario: 'Showing static promotional banners unrelated to the current selection',
          explanation: 'The savings bar should reflect actual calculated savings, not generic marketing messages.',
          alternative: 'Use a promotional banner or announcement bar for generic offers.'
        },
        {
          scenario: 'Displaying error or warning messages',
          explanation: 'The green color and savings icon create a positive association. Using it for errors causes confusion.',
          alternative: 'Use an error banner with red/amber styling and appropriate error icon.'
        }
      ]
    },

    bankPill: {
      whenToUse: [
        {
          scenario: 'Showing linked bank accounts for UPI payments in a compact format',
          explanation: 'Bank pills efficiently display bank logo and last 4 digits in minimal horizontal space.'
        },
        {
          scenario: 'Horizontal scrollable list of linked accounts within a UPI section',
          explanation: 'The pill shape works well in horizontal layouts where vertical space is limited.'
        },
        {
          scenario: 'Quick account selection within an already-expanded payment method',
          explanation: 'Pills provide a secondary selection layer within a parent instrument tile context.'
        }
      ],
      whenNotToUse: [
        {
          scenario: 'Primary payment method selection at the top level',
          explanation: 'Bank pills are too compact for primary selection — they lack space for offer text, descriptions, or badges.',
          alternative: 'Use instrumentTile for primary payment method selection with full details.'
        },
        {
          scenario: 'Displaying detailed account information (balance, type, branch)',
          explanation: 'The pill format only supports logo + 4 digits. Additional info would break the compact design.',
          alternative: 'Use a full-width card or list item with multiple text lines for detailed account info.'
        }
      ]
    },

    serviceTile: {
      whenToUse: [
        {
          scenario: 'Presenting "Service & Pay" options like Pay Later, EMI, or insurance',
          explanation: 'Service tiles are designed for navigational actions that lead to a sub-flow, distinguished by the chevron affordance.'
        },
        {
          scenario: 'Linking to external payment services or partner integrations',
          explanation: 'The circular icon + description + CTA format clearly communicates a service offering with a navigation action.'
        },
        {
          scenario: 'Showing available services with brief descriptions and inline CTAs',
          explanation: 'The multi-line layout accommodates service name, description, and action text in a scannable format.'
        }
      ],
      whenNotToUse: [
        {
          scenario: 'Direct payment instrument selection (credit cards, UPI)',
          explanation: 'Service tiles navigate to sub-flows. Direct selection instruments need radio-button affordance.',
          alternative: 'Use instrumentTile for direct payment method selection.'
        },
        {
          scenario: 'Displaying status or confirmation information',
          explanation: 'The chevron and CTA text imply an action is available. Read-only status should not suggest navigation.',
          alternative: 'Use a status card or info banner for non-actionable information display.'
        }
      ]
    }
  };
})();
