# Defendra – Installation & Quick Start Guide

Welcome to **Defendra – Pest Control & Fumigation Service HTML5 Template**. This commercial-grade template is built using clean, semantic HTML5, modern CSS3 custom properties, and modular vanilla JavaScript. It requires zero compilation steps, Node.js builds, or external package managers to preview or deploy.

---

## 1. Package Contents Overview

When you unpack the template directory, you will find the following structure:

```text
defendra-pest-control/
├── index.html                    # Commercial Homepage 1 (Hawx-style hero)
├── index-2.html                  # Commercial Homepage 2 (Terminix-style quick quote)
├── about.html                    # Corporate overview, leadership & safety credentials
├── services.html                 # Comprehensive 8-category service directory with filters
├── service-details.html          # Detailed pest protocol (Termite Barrier Treatment)
├── pricing.html                  # Pricing tier comparison + dynamic estimate calculator
├── areas-served.html             # Metropolitan coverage directory with search & filters
├── inspection-booking.html       # 6-Step Multi-Step Inspection Request Wizard
├── inspection-confirmation.html  # Post-submission booking confirmation & print pass
├── faq.html                      # Categorized interactive FAQ accordion
├── blog.html                     # Technical pest insights with tag & search filters
├── blog-details.html             # Long-form article with sticky Table of Contents
├── contact.html                  # Contact information, dispatch hubs & contact form
├── login.html                    # Customer portal authentication login screen
├── register.html                 # Customer account creation screen
├── forgot-password.html          # Password reset request screen
├── 404.html                      # Custom error page with quick navigation recovery
├── coming-soon.html              # Service expansion launch countdown page
├── maintenance.html              # Scheduled maintenance and emergency notice page
├── sitemap.xml                   # Search engine index sitemap
├── robots.txt                    # Crawler access permissions
├── README.md                     # Technical overview & feature summary
├── assets/
│   ├── css/
│   │   ├── style.css             # Base reset, typography, color tokens, layout grid
│   │   ├── components.css        # Buttons, cards, badges, wizard, modals, form controls
│   │   ├── dark-mode.css         # Strict 3-color dark mode implementation
│   │   ├── rtl.css               # Complete Arabic/Hebrew RTL mirroring stylesheet
│   │   └── responsive.css        # Breakpoint overrides (<640px, 640-1024px, >1024px)
│   ├── js/
│   │   ├── main.js               # Navigation sticky, mobile drawer, modals, accordions
│   │   ├── theme.js              # Dark/Light mode & RTL toggles with localStorage
│   │   ├── forms.js              # Client-side validation, feedback banners, error states
│   │   ├── inspection.js         # 6-step wizard logic, live INR estimate & validation
│   │   ├── calculator.js         # Interactive pricing calculator with premise & pest multipliers
│   │   └── filters.js            # Live search & category filters for services, areas, blog
│   └── images/                   # Industrial SVG graphics organized by domain
│       ├── home/                 # Hero banners, workflow, guarantee badges
│       ├── services/             # Treatment category schematics
│       ├── termites/             # Barrier and sub-slab schematics
│       ├── cockroaches/          # German cockroach gel baiting illustrations
│       ├── rodents/              # Tamper-proof bait station & exclusion graphics
│       ├── bed-bugs/             # Thermal remediation & encasement diagrams
│       ├── team/                 # Technical leadership and field inspector avatars
│       ├── areas/                # Regional hub landmark graphics
│       └── blog/                 # Article cover illustrations
└── documentation/
    ├── installation-guide.md     # This installation guide
    ├── customization-guide.md    # Theming, colors, typography, adding services
    ├── page-structure.md         # Detailed anatomical breakdown of all 19 HTML templates
    ├── integrations.md           # Backend form wiring, webhooks, CRM connectivity
    └── credits.md                # Fonts, icons, third-party libraries attribution
```

---

## 2. System Requirements

Because Defendra is a pure static template, there are no mandatory runtime dependencies.

- **Web Browser:** Any modern browser supporting CSS Custom Properties and ES6 JavaScript (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, Opera 76+).
- **Code Editor:** VS Code, Sublime Text, WebStorm, or any code editor of your choice.
- **Local Server (Recommended):** Running through an HTTP server ensures correct SVG rendering, relative module loading, and `localStorage` persistence.

---

## 3. Running Locally

### Option A: VS Code Live Server Extension (Easiest)
1. Open Visual Studio Code.
2. Select **File > Open Folder...** and choose the `defendra-pest-control` folder.
3. If not already installed, search for and install the **Live Server** extension by Ritwick Dey from the VS Code Extensions marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X`).
4. Right-click on `index.html` in the file explorer and click **"Open with Live Server"**.
5. Your default browser will launch at `http://127.0.0.1:5500/index.html`.

### Option B: Python Built-in HTTP Server
If you have Python installed on Windows, macOS, or Linux:
```bash
# Open your terminal and navigate to the project directory
cd /path/to/defendra-pest-control

# For Python 3.x:
python -m http.server 8000

# For Windows PowerShell:
py -3 -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000/`.

### Option C: Node.js `http-server` or `serve`
If you have Node.js / npx installed:
```bash
# Run using npx without installing
npx serve .

# Or using http-server
npx http-server -p 3000
```
Open your browser at `http://localhost:3000/`.

---

## 4. Production Deployment

### 1. Static Hosting Platforms (Netlify, Vercel, Cloudflare Pages, GitHub Pages)
- **Netlify:** Drag and drop the `defendra-pest-control` folder into the Netlify Drop dashboard, or connect your Git repository with publish directory set to `/` (root).
- **Vercel:** Import your repository or deploy via `vercel` CLI. Set framework preset to **Other** / **Static**.
- **Cloudflare Pages:** Connect Git repository, leave build command empty, set output directory to `/`.
- **GitHub Pages:** In repository **Settings > Pages**, choose `main` branch and `/ (root)` folder.

### 2. Traditional Web Hosting (Apache, Nginx, cPanel)
1. Compress the contents of `defendra-pest-control/` into a `.zip` archive.
2. Log in to your hosting cPanel or FTP client (e.g., FileZilla).
3. Upload and extract all files directly into the `public_html/` or document root folder.
4. Ensure file permissions are set correctly (`644` for files, `755` for directories).

---

## 5. Next Steps

- Consult [customization-guide.md](file:///C:/Users/ezhil/.gemini/antigravity/scratch/defendra-pest-control/documentation/customization-guide.md) to modify colors, typography, or add your company details.
- Consult [integrations.md](file:///C:/Users/ezhil/.gemini/antigravity/scratch/defendra-pest-control/documentation/integrations.md) to wire the booking wizard and contact forms to your CRM or backend email processor.
