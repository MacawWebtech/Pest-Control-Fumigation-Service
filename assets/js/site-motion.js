/**
 * DEFENDRA - Site-wide motion
 * Applies the About page's animation set to every page automatically:
 *   headline masks, soft fades, staggered cards, image wipes, count-up.
 * No page markup changes needed. Skips itself under prefers-reduced-motion.
 * The About page runs its own (richer) version and only gets the footer here.
 */
(() => {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isAbout = !!document.querySelector('main.ab');

  // Never animate inside these (forms, overlays, tables, dynamic widgets)
  const SKIP = 'form, table, .modal-backdrop, .mobile-drawer, .site-header, [data-no-motion]';
  const skip = (el) => !!el.closest(SKIP);

  const targets = [];          // elements that get .sm-in when seen
  const seen = new Set();
  const add = (el) => { if (el && !seen.has(el)) { seen.add(el); targets.push(el); } };

  const stagger = (el, i) => el.style.setProperty('--d', Math.min(i, 5) * 90 + 'ms');

  const mask = (h, delay) => {
    if (h.querySelector('[id]') || h.classList.contains('sm-mask')) return;
    const inner = document.createElement('span');
    inner.className = 'sm-mask__in';
    while (h.firstChild) inner.appendChild(h.firstChild);
    h.appendChild(inner);
    h.classList.add('sm-mask');
    if (delay) h.style.setProperty('--d', delay + 'ms');
    add(h);
  };
  const fade = (el, delay) => {
    if (!el || el.classList.contains('sm-fade')) return;
    el.classList.add('sm-fade');
    if (delay != null) el.style.setProperty('--d', delay + 'ms');
    add(el);
  };

  const main = document.querySelector('main');
  const scopeEls = isAbout ? [] : (main ? [main] : []);

  scopeEls.forEach((root) => {
    const sections = $$(':scope > section', root);
    const first = sections[0];

    // --- Page banner / hero: ordered entrance ---
    if (first) {
      const wrap = first.querySelector('.container') || first;
      let n = 0;
      $$('nav[aria-label="Breadcrumbs"], .text-overline, .lead, p', wrap).forEach((el) => {
        if (skip(el) || el.closest('.card') || el.classList.contains('sm-fade')) return;
        fade(el, 380 + n++ * 90);
      });
      $$('.btn', wrap).forEach((b) => { if (!skip(b)) fade(b.parentElement === wrap ? b : b.parentElement, 520); });
      $$('h1', first).forEach((h) => { if (!skip(h)) mask(h, 120); });
    }

    // --- Section headings ---
    $$('h1, h2', root).forEach((h) => {
      if (skip(h) || h.closest('.card, .accordion, .pricing-card') || h.classList.contains('sm-mask')) return;
      mask(h, 0);
    });
    $$('.section-header .lead, .section-header > p', root).forEach((p) => { if (!skip(p)) fade(p, 150); });

    // --- Grids of cards: staggered ---
    $$('.grid', root).forEach((g) => {
      if (skip(g)) return;
      Array.from(g.children).forEach((c, i) => {
        if (c.classList.contains('sm-fade') || skip(c)) return;
        fade(c, Math.min(i, 5) * 90);
      });
    });
    // standalone cards / accordions outside grids
    $$('.card, .service-card, .feature-box, .review-card, .pricing-card, .accordion-item, .template-disclaimer-box', root).forEach((c) => {
      if (skip(c) || c.classList.contains('sm-fade') || c.closest('.sm-fade')) return;
      fade(c, 0);
    });

    // --- Large images wipe open ---
    $$('img', root).forEach((img) => {
      const w = parseInt(img.getAttribute('width') || '0', 10);
      const host = img.parentElement;
      if (w < 480 || skip(img) || !host || img.closest('.card, .sm-fade, a, picture')) return;
      host.classList.add('sm-wipe-host');
      img.classList.add('sm-wipe-img');
      add(host);
    });
  });

  // --- Footer columns (all pages, including About) ---
  $$('.site-footer .grid > *').forEach((c, i) => fade(c, (i % 4) * 90));

  // --- Count-up for big stand-alone numbers ---
  const counters = [];
  scopeEls.forEach((root) => {
    $$('*', root).forEach((el) => {
      if (el.children.length || skip(el) || el.closest('.card h3, .pricing-card, .wizard, button, a')) return;
      const t = el.textContent.trim();
      const m = /^(\d{1,3}(?:,\d{2,3})+|\d{2,4})([+%]?)$/.exec(t);
      if (!m) return;
      const val = parseInt(m[1].replace(/,/g, ''), 10);
      if (val < 10 || (val >= 1900 && val <= 2100)) return;
      counters.push(el);
      el.dataset.smCount = String(val);
      el.dataset.smSuffix = m[2];
      el.dataset.smComma = m[1].includes(',') ? '1' : '';
      el.textContent = '0';
      add(el);
    });
  });
  const fmt = new Intl.NumberFormat('en-IN');
  const countUp = (el) => {
    const end = parseInt(el.dataset.smCount, 10);
    const suffix = el.dataset.smSuffix || '';
    const comma = !!el.dataset.smComma;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 1800);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      const v = Math.round(end * e);
      el.textContent = (comma ? fmt.format(v) : String(v)) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // --- Observe ---
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('sm-in');
      if (el.dataset.smCount) countUp(el);
      // release the transition so hover transforms on cards stay snappy
      if (el.classList.contains('sm-fade')) setTimeout(() => el.classList.add('sm-done'), 1800);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach((el) => io.observe(el));

  // Safety net: never leave content hidden if something goes wrong
  setTimeout(() => targets.forEach((el) => { if (!el.classList.contains('sm-in') && el.getBoundingClientRect().top < window.innerHeight) el.classList.add('sm-in'); }), 2500);
})();
