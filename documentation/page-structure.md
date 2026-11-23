# Defendra – Page Structure & Architectural Breakdown

This document provides a comprehensive structural and functional breakdown of all **19 production HTML templates** included in the Defendra package.

---

## Template Matrix

| File Name | Category | Primary Reference / Inspiration | Key Dynamic Features |
|:---|:---|:---|:---|
| `index.html` | Core Homepage 1 | Hawx-style split hero & Saela structural layout | Real-time metric ticker, sticky navigation, service carousel |
| `index-2.html` | Core Homepage 2 | Terminix-style quick quote hero & Orkin trust bars | Embedded hero quick estimator widget, interactive tabbed protocols |
| `about.html` | Company | Saela compliance & safety standards | Team roster, dual certification grid, corporate timeline, audit badges |
| `services.html` | Directory | Orkin treatment taxonomy | Category tab filtering (All / Residential / Commercial / Fumigation) |
| `service-details.html` | Deep Dive | Saela Termite Barrier Protocol | 4-stage treatment timeline, technical spec cards, sidebar inquiry card |
| `pricing.html` | Commercial | Commercial transparent tiered plans | Interactive sqft/premise/pest rate calculator, feature matrix table |
| `areas-served.html` | Coverage | Regional service hubs & response radii | Live city search box, region category tabs, response time guarantee cards |
| `inspection-booking.html` | Lead Flow | Enterprise 6-step multi-step wizard | Client-side step validation, dynamic INR pricing range, file upload check |
| `inspection-confirmation.html` | Post-Action | State verification pass | Print-to-PDF receipt trigger, dynamic booking ID generator, summary review |
| `faq.html` | Support | Categorized technical FAQ accordion | Category filter tabs, real-time question search input, accordion expand/collapse |
| `blog.html` | Content | Technical pest management publications | Category badges, live search filter, pagination controls, newsletter CTA |
| `blog-details.html` | Content | Long-form technical treatment article | Sticky Table of Contents, social share modal, author bio, related articles |
| `contact.html` | Communication | Regional dispatch centers & hotline | Form validation with custom status toasts, emergency dispatch notice |
| `login.html` | Authentication | Secure client portal login | Password visibility toggle, remember-me toggle, validation alerts |
| `register.html` | Authentication | Client onboarding registration | Password strength indicator, terms checkbox, validation |
| `forgot-password.html` | Authentication | Self-service credential recovery | Email verification state, recovery confirmation alert banner |
| `404.html` | Utility | Custom error screen | Quick recovery directory links, search input, return home CTA |
| `coming-soon.html` | Utility | Expansion market teaser | Live dynamic countdown timer (Days/Hours/Mins/Secs), notification signup |
| `maintenance.html` | Utility | Scheduled maintenance notice | System status indicator, scheduled completion time, emergency call card |

---

## Detailed Page Anatomy

### 1. `index.html` (Commercial Home 1 – Hawx Style)
- **Header:** Brand logo, main menu, RTL and Dark/Light toggles, and the Book Inspection button (the call and Book Inspection buttons both appear inside the mobile menu).
- **Header:** Sticky navbar, brand logo, primary navigation (`Home`, `Services`, `Areas Served`, `Pricing Guide`, `About Us`, `Contact`), primary Yellow CTA button.
- **Hero Section:** Split layout inspired by Hawx Pest Control. Left side features strong Barlow Condensed typography, risk statement, bulleted guarantees, and dual CTAs. Right side showcases an industrial SVG graphic with animated badge overlays.
- **Trust Ticker:** Key certification stats (CIB&RC, ISO 9001:2015, IPCA Member, 99.4% Clearance Rate).
- **Service Grid:** 6 prominent treatment cards with hover micro-elevations, icon badges, and direct links to `service-details.html`.
- **4-Step Workflow Section:** Clear sequential progression: 1. Deep Diagnostic -> 2. Target Barrier -> 3. Thermal/Chemical Knockdown -> 4. Residual Monitoring.
- **Interactive Calculator Teaser:** Direct launch pad into the pricing guide.
- **Testimonials Section:** Verified customer reviews with star ratings and premise badge labels.
- **FAQ Preview:** Accordion with top 4 high-frequency questions.
- **Footer:** 4-column industrial footer with company bio, quick links, service category index, compliance notices, and copyright.

### 2. `index-2.html` (Commercial Home 2 – Terminix Style)
- **Distinct Hero:** Full-width dark charcoal header with an embedded interactive quick-quote widget on the right. Users can select pest type and premise size directly on the hero to receive an immediate estimated price range in INR (₹).
- **Interactive Treatment Comparison Tabs:** Tabbed switchers between Residential, Commercial, and Pre-Construction treatments.
- **Orkin-Inspired Guarantee Shield:** Dedicated trust segment breaking down the 30-Day Money-Back Re-Treatment Guarantee.
- **Emergency Callout Banner:** High-visibility safety-yellow banner for urgent infestations with one-tap telephone dialing.

### 3. `inspection-booking.html` (6-Step Booking Wizard)
- **Step 1: Pest Category Selection:** Interactive cards with selectable radio states (Termites, Bed Bugs, Cockroaches, Rodents, General Pest).
- **Step 2: Premise Classification:** Residential (Apartment, Independent Villa) or Commercial (Restaurant, Warehouse, Corporate Office, Hospital).
- **Step 3: Area Dimensions:** Interactive slider and numerical input for square footage (`500 sq ft` to `10,000+ sq ft`).
- **Step 4: Infestation Severity & Evidence:** Low/Moderate/Severe selection plus drag-and-drop file upload with 10MB size limit validation.
- **Step 5: Schedule Preference:** Date picker (minimum next-day constraint) and morning/afternoon time-slot buttons.
- **Step 6: Contact Information & Summary:** Name, phone, email, site address, and real-time dynamically computed INR (₹) estimate range.
- **Validation Engine:** Built with `assets/js/inspection.js` ensuring that no step can be skipped without fulfilling required fields.

### 4. `pricing.html` (Commercial Pricing Guide & Calculator)
- **Tiered Comparison Cards:**
  - *Standard Shield:* Single-treatment intervention.
  - *Quarterly Sentinel (Most Popular):* 4 seasonal barrier treatments with warranty.
  - *Annual Industrial Complete:* 12-month complete warranty with dedicated entomologist.
- **Full Interactive Calculator:** Powered by `assets/js/calculator.js`. Sliders and radio selectors allow real-time recalculation of estimated price ranges in INR (₹).
- **Commercial Contract Matrix:** Table comparing SLAs, emergency response times, compliance reporting, and re-treatment policies.

### 5. `areas-served.html` (Service Coverage & Regional Directory)
- **Live Search & Filter:** Instant JavaScript filtering powered by `assets/js/filters.js` allowing users to type city or pin code.
- **Region Tabs:** Filter by Los Angeles Metro, Chicagoland, Atlanta, and Research Triangle.
- **Coverage Map Mockup:** High-resolution geometric SVG depicting regional dispatch hubs, GPS tracking status, and rapid-response coverage circles.

### 6. `blog.html` & `blog-details.html`
- **Search & Tag Filtering:** Search across technical pest articles by keyword or category.
- **Sticky Table of Contents:** On `blog-details.html`, a sticky sidebar highlights reading progress and scrolls smoothly to headings.
- **Social Sharing:** Modal triggering clipboard copy or sharing links.

### 7. Utility & Authentication Pages
- **`login.html`, `register.html`, `forgot-password.html`:** Built with accessible form fields, password toggles, and feedback validation alerts.
- **`404.html`:** Clear error code, descriptive text, and a search input paired with recommended fallback routes.
- **`coming-soon.html`:** Real-time countdown timer running in pure JavaScript (`assets/js/main.js`) with an interactive notify-me subscription form.
- **`maintenance.html`:** Industrial status dashboard notifying users of scheduled database optimization with alternate emergency contact numbers.
