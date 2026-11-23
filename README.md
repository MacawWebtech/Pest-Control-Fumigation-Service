# Defendra – Pest Control & Fumigation Service HTML5 Template

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E5C747?style=flat&logo=html5&logoColor=202723)](https://whatwg.org)
[![CSS3](https://img.shields.io/badge/CSS3-Modern%20Tokens-E5C747?style=flat&logo=css3&logoColor=202723)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B%20Modular-E5C747?style=flat&logo=javascript&logoColor=202723)](https://tc39.es)
[![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Built--in-202723?style=flat)](https://github.com)
[![RTL](https://img.shields.io/badge/RTL-Complete%20Mirroring-202723?style=flat)](https://github.com)
[![WCAG AA](https://img.shields.io/badge/WCAG%20AA-Accessible-202723?style=flat)](https://www.w3.org/WAI/WCAG21/quickref/)

**Defendra** is a commercial, marketplace-ready, multipurpose HTML5 template meticulously engineered for commercial pest control companies, industrial fumigation contractors, agricultural bio-security specialists, and residential extermination enterprises.

---

## Key Feature Highlights

- **19 Fully Coded Production Templates:** Zero `TODO` comments, zero placeholder stubs, and zero dummy functions. Every page is completely implemented with semantic markup and realistic commercial content.
- **Strict 3-Color Modern Industrial Aesthetic:** Built strictly using Charcoal (`#202723`), Safety Yellow (`#E5C747`), and Warm Ivory (`#F4F1E8`), utilizing tonal and opacity variations via CSS custom properties.
- **Strict 2-Font Typography Architecture:** High-impact headings in `Barlow Condensed` paired with hyper-readable UI and body copy in `Inter`.
- **Full-Width Edge-to-Edge Layout:** Modern industrial layout with 100% viewport width sections, 30px desktop/tablet padding, and 18px mobile padding.
- **Enterprise 6-Step Multi-Step Wizard (`inspection-booking.html`):** Interactive booking wizard with step-by-step client validation, real-time INR (₹) price range calculation, drag-and-drop file upload checks, and printable confirmation pass.
- **Dual Homepage Variants:**
  - `index.html`: Hawx-inspired split hero with animated metric badges, deep 4-step workflow, and high-conversion trust anchors.
  - `index-2.html`: Terminix-inspired full-width dark hero with an embedded live quick-quote estimate calculator and tabbed protocol matrix.
- **Interactive Price Calculator (`pricing.html`):** Sliders and radio selectors dynamically recalculating treatment estimates based on pest category, premise type, and square footage.
- **Live Search & Category Filtering (`filters.js`):** Instant search and filtering across Services (`services.html`), Regional Areas (`areas-served.html`), and Technical Blog articles (`blog.html`).
- **Comprehensive Dark Theme (`dark-mode.css`):** Full dark theme respecting the 3-brand color constraint with instant toggling and `localStorage` memory.
- **Complete RTL Support (`rtl.css`):** True Right-to-Left bidirectional layout mirroring for Arabic and Hebrew locales.
- **Zero Heavy Build Tooling:** Pure HTML5, modern CSS3, and ES6+ vanilla JavaScript. No Node.js build steps, Webpack, or framework lock-in required.

---

## Directory Architecture

```text
defendra-pest-control/
├── index.html                    # Commercial Home 1 (Hawx split hero)
├── index-2.html                  # Commercial Home 2 (Terminix quick quote hero)
├── about.html                    # About Us, Leadership & Credentials
├── services.html                 # Comprehensive 8-category Service Listing with Filters
├── service-details.html          # Deep-dive Service Page (Termite Barrier Treatment)
├── pricing.html                  # Transparent Pricing Guide + Live Cost Calculator
├── areas-served.html             # Regional Hub Coverage + Search Filter + Map Mockup
├── inspection-booking.html       # 6-Step Multi-Step Inspection Request Form
├── inspection-confirmation.html  # Booking Confirmation State & Print Pass
├── faq.html                      # Categorized FAQ Accordion with Search
├── blog.html                     # Technical Pest Management Blog + Filters
├── blog-details.html             # Single Article with Sticky TOC & Social Share
├── contact.html                  # Regional Dispatch Hubs & Inquiry Form
├── login.html                    # Customer Portal Authentication
├── register.html                 # Client Account Onboarding
├── forgot-password.html          # Credential Recovery Form
├── 404.html                      # Custom 404 Error Screen
├── coming-soon.html              # Service Expansion Countdown & Signup
├── maintenance.html              # Scheduled System Maintenance Screen
├── sitemap.xml                   # Search Engine Index Sitemap
├── robots.txt                    # Search Engine Crawler Directives
├── README.md                     # Template Documentation & Overview
├── assets/
│   ├── css/
│   │   ├── style.css             # Design tokens, typography, grid, core layout
│   │   ├── components.css        # Buttons, cards, badges, wizard, modals, form controls
│   │   ├── dark-mode.css         # High-contrast 3-color dark theme
│   │   ├── rtl.css               # Complete Arabic/Hebrew bidirectional mirroring
│   │   └── responsive.css        # Breakpoint definitions (<640px, 640-1024px, >1024px)
│   ├── js/
│   │   ├── main.js               # Sticky navigation, mobile drawer, modals, accordions
│   │   ├── theme.js              # Dark/Light & RTL toggles with localStorage state
│   │   ├── forms.js              # Client-side form validation & status toasts
│   │   ├── inspection.js         # 6-step wizard logic, live INR calculator, file upload
│   │   ├── calculator.js         # Live pricing calculator with premise & pest multipliers
│   │   └── filters.js            # Instant search and tab filters for services, areas, blog
│   └── images/                   # High-contrast industrial SVG graphics
│       ├── home/                 # Hero banners, guarantee shields, workflow schematics
│       ├── services/             # 8 service category vector illustrations
│       ├── termites/             # Sub-slab barrier & bait station schematics
│       ├── cockroaches/          # German cockroach gel baiting diagrams
│       ├── rodents/              # Tamper-proof bait box & exclusion diagrams
│       ├── bed-bugs/             # Thermal heat remediation diagrams
│       ├── team/                 # Technical leadership & entomologist portraits
│       ├── areas/                # Regional hub landmark graphics (Los Angeles, Chicago, etc.)
│       └── blog/                 # Technical editorial article covers
└── documentation/
    ├── installation-guide.md     # Quick start, local server setup, and production deployment
    ├── customization-guide.md    # Guide to modifying colors, fonts, rates, and components
    ├── page-structure.md         # Detailed anatomical walkthrough of all 19 HTML templates
    ├── integrations.md           # Backend form wiring, webhooks, Zapier, and CRM integration
    └── credits.md                # Fonts, icons, and design inspiration attributions
```

---

## Design System Tokens

### 1. Color Palette (Strict 3 Colors)

| Role | Color Name | Hex Code | Purpose |
|:---|:---|:---|:---|
| Primary Structural | **Charcoal** | `#202723` | Headings, dark surfaces, navigation, borders, core typography |
| Primary Accent | **Safety Yellow** | `#E5C747` | Primary action buttons (CTAs), active states, badges, highlight tags |
| Primary Background | **Warm Ivory** | `#F4F1E8` | Page backgrounds, card overlays, contrast containers |

*Note: All secondary shades (e.g. `#2A332E`, `#181D1A`, `#D4B535`, `#F9F3D3`) are mathematically derived tonal/opacity steps of these 3 base hex codes. No external hues are used.*

### 2. Typography (Strict 2 Fonts)

- **Headings / Badges / Numbers:** `Barlow Condensed` (`font-weight: 600, 700, 800`)
- **Body / Navigation / Controls:** `Inter` (`font-weight: 400, 500, 600, 700`)

---

## Quick Start

### 1. Previewing Locally
Run a local development server using VS Code Live Server or Python:
```bash
# Navigate to the template root
cd defendra-pest-control

# Start a local server with Python 3
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### 2. Documentation
For in-depth guides, please inspect the `documentation/` folder:
- [Installation Guide](documentation/installation-guide.md)
- [Customization Guide](documentation/customization-guide.md)
- [Page Structure Breakdown](documentation/page-structure.md)
- [Integrations Guide](documentation/integrations.md)
- [Credits & Attributions](documentation/credits.md)

---

## Browser Support & Standards

- **Browsers:** Chrome, Edge, Firefox, Safari, Opera (latest 2 versions).
- **Standards:** W3C Semantic HTML5, CSS3 Custom Properties, ES6+ JavaScript.
- **Accessibility:** WCAG 2.1 AA compliant color contrast, aria labels, and keyboard accessible interactive controls.
- **Touch Target Standard:** Minimum 44px x 44px on all clickable buttons and inputs.
- **Responsive Breakpoints:** Fully tested across Mobile (`<640px`), Tablet (`640px - 1024px`), and Desktop (`>1024px`).

---

## Static Template Honesty Notice
Defendra is a commercial front-end HTML5 template. All pricing figures (in INR ₹) are sample estimates, and inspection requests submitted via the 6-step wizard are validated client-side and stored in `localStorage` for demonstration. Refer to `documentation/integrations.md` for connecting to your live API or CRM.

---

© 2026 Defendra Pest Control & Fumigation Services. All rights reserved.
