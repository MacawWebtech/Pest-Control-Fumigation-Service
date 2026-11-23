# Defendra – Customization & Developer Guide

This guide explains how to customize the visual tokens, typography, brand assets, calculation logic, and layouts of the **Defendra Pest Control & Fumigation Service** template.

---

## 1. Color Palette Customization

Defendra enforces a strict **3-Color Industrial Palette** using CSS Custom Properties defined in `assets/css/style.css`:

```css
:root {
  /* Brand Core Colors */
  --color-charcoal: #202723;   /* Primary structural color, headings, dark surfaces */
  --color-yellow:   #E5C747;   /* Safety Yellow accent, active states, badges, CTAs */
  --color-ivory:    #F4F1E8;   /* Warm Ivory primary background, light surfaces */

  /* Derived Tonal Steps for Depth (Zero External Hues) */
  --color-charcoal-light: #2A332E;  /* Elevated card background in dark contexts */
  --color-charcoal-deep:  #181D1A;  /* Deep footer/header backing */
  --color-charcoal-muted: #56645C;  /* Secondary text labels */
  --color-charcoal-border:#323C36;  /* High-contrast border lines */

  --color-yellow-hover:   #D4B535;  /* Button hover and focus rings */
  --color-yellow-light:   #F9F3D3;  /* Tinted background highlights */
  --color-yellow-dark:    #B2941C;  /* Accessible borders on light surfaces */

  --color-ivory-surface:  #FFFFFF;  /* Card surface overlay */
  --color-ivory-border:   #E2DDCF;  /* Subdued dividing lines on light cards */
}
```

### Changing the Brand Palette
To change your core branding while maintaining the three-color rule:
1. Open `assets/css/style.css`.
2. Update `--color-charcoal`, `--color-yellow`, and `--color-ivory`.
3. Update the matching dark-mode overrides in `assets/css/dark-mode.css`.
4. Run an automated color audit or browser inspection to ensure text-to-background contrast satisfies WCAG AA (minimum 4.5:1 for body text, 3:1 for large text).

---

## 2. Typography Customization

Defendra enforces a strict **2-Font Architecture**:
- **Headings, Badges, Hero Metrics:** `Barlow Condensed` (Weights: 600, 700, 800)
- **Body, Navigation, Form Controls, Buttons:** `Inter` (Weights: 400, 500, 600, 700)

### Changing Fonts
1. Open any HTML template and locate the Google Fonts `<link>` tag in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```
2. Replace it with your chosen Google Font URL (ensure no more than 2 font families are loaded).
3. In `assets/css/style.css`, update the font variables:
```css
:root {
  --font-heading: 'Barlow Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

---

## 3. Layout & Padding Rules

To maintain the robust modern industrial look, Defendra sections are built with:
- **100% Viewport Width Sections:** Every major `<section>` spans `width: 100%` edge-to-edge.
- **Unified Container Padding:**
  - Desktop (`> 1024px`): `padding: 0 30px`
  - Tablet (`640px – 1024px`): `padding: 0 30px`
  - Mobile (`< 640px`): `padding: 0 18px`
- **Base Grid:** 12-column responsive grid with `grid-template-columns: repeat(12, 1fr)`.

Classes available in `style.css`:
- `.container`: Applies standard max-width (`1280px`) and responsive horizontal padding.
- `.container-wide`: Applies wider max-width (`1440px`) for large metric sections.
- `.container-fluid`: Spans `100%` width with horizontal padding.

---

## 4. Replacing Brand Logo & Assets

### Brand Logo
The template displays a clean geometric vector logo in the navigation header:
```html
<a href="index.html" class="brand-logo" aria-label="Defendra Home">
  <span class="logo-mark">
    <!-- SVG Hexagon Badge with Crosshairs -->
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>
  </span>
  <span class="logo-text">DEFENDRA<span class="text-yellow">.</span></span>
</a>
```
To use an external PNG/SVG logo:
```html
<a href="index.html" class="brand-logo" aria-label="Defendra Home">
  <img src="assets/images/logo.svg" alt="Company Logo" width="140" height="36">
</a>
```

### Vector Illustrations
All vector graphics in `assets/images/` are built with inline SVGs utilizing the 3 brand colors (`#202723`, `#E5C747`, `#F4F1E8`). You can open any `.svg` file in a code editor or Figma to adjust line weights, dimensions, or iconography.

---

## 5. Pricing Calculator Customization

The dynamic estimate calculator logic resides in `assets/js/calculator.js` and `assets/js/inspection.js`.

### Modifying Price Rates & Multipliers
Open `assets/js/calculator.js` and edit the calculation data objects:
```javascript
const PEST_BASE_RATES = {
  termite: { min: 4500, max: 7500, label: 'Termite Barrier Treatment' },
  cockroach: { min: 1499, max: 2499, label: 'German Cockroach Gel' },
  rodent: { min: 2199, max: 3799, label: 'Rodent Baiting & Exclusion' },
  bedbug: { min: 3200, max: 5500, label: 'Thermal Remediation' },
  general: { min: 1299, max: 2199, label: 'General Pest Suppression' }
};

const PREMISE_MULTIPLIERS = {
  residential: 1.0,
  commercial: 1.45,
  industrial: 2.1
};
```
To alter the currency symbol from Indian Rupees (`₹`) to US Dollars (`$`), British Pounds (`£`), or Euros (`€`), simply update the `formatCurrency()` helper function:
```javascript
function formatCurrency(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}
```

---

## 6. RTL (Right-to-Left) Language Setup

Defendra comes with a complete RTL mirroring stylesheet in `assets/css/rtl.css`.
To set a page to RTL mode statically:
1. Add `dir="rtl"` and `lang="ar"` (or `lang="he"`) to the `<html>` element:
```html
<html lang="ar" dir="rtl">
```
2. Ensure `assets/css/rtl.css` is linked in the `<head>` after `components.css`:
```html
<link rel="stylesheet" href="assets/css/rtl.css">
```
3. Defendra's `assets/js/theme.js` also provides a dynamic RTL toggle that updates `<html dir="rtl">` programmatically and saves the state to `localStorage`.

## Banner & Page Background Images (JPG)

Every banner and page background reads its photo from `assets/images/banners/`.
Upload a JPG there with the same file name (see `assets/images/banners/README.md` for the full list),
or change the paths in the `:root` block at the top of `assets/css/banners.css`.
Recommended size: 1920 x 800 px, under ~400 KB.
