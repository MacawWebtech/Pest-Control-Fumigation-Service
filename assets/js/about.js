/**
 * DEFENDRA - About page interactions
 * 1. Reveal system (masks, fades, wipes, drawn rules, count-up)
 * 2. Colony diagram (spray vs. transfer)
 * 3. Descent timeline (scroll-linked tunnel)
 * 4. Team roster (accordion + portrait wipe)
 * Vanilla ES6, respects prefers-reduced-motion.
 */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- 1. Reveals ---------- */
  const initReveals = () => {
    // wrap masked headlines so the inner span can slide
    $$('[data-mask]').forEach((el) => {
      const inner = document.createElement('span');
      inner.className = 'ab-mask__in';
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
    });

    // a clipped element can't trigger its own observer, so wipes are triggered by their parent
    const targets = $$('[data-mask], [data-fade], [data-draw], [data-count], #colony').concat($$('[data-wipe]').map((w) => w.parentElement));
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'));
      return;
    }
    $$('[data-count]').forEach((el) => { el.textContent = '0'; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        if (e.target.hasAttribute('data-count')) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((t) => io.observe(t));
  };

  const countUp = (el) => {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const fmt = new Intl.NumberFormat('en-IN');
    const dur = 1800;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = fmt.format(Math.round(end * eased)) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- 2. Colony diagram ---------- */
  const initColony = () => {
    const root = $('#colony');
    if (!root) return;
    const NS = 'http://www.w3.org/2000/svg';
    const paths = { top: $('#ab-p-top'), bot: $('#ab-p-bot'), a: $('#ab-p-a'), b: $('#ab-p-b') };
    const len = {};
    Object.keys(paths).forEach((k) => { len[k] = paths[k].getTotalLength(); });

    const layer = $('#ab-ants');
    const queen = $('#ab-queen');
    const sats = { a: $('#ab-sat-a'), b: $('#ab-sat-b') };
    const puff = $('#ab-puff');
    const sw = $('.ab-switch', root);
    const btns = $$('.ab-switch button', root);
    const nestsEl = $('#ab-nests');
    const strengthEl = $('#ab-strength');
    const meter = $('#ab-meter');
    const caption = $('#ab-caption');

    const COPY = {
      transfer: '<b>Defendra method.</b> Workers carry non-repellent gel back to the nest and share it. The queen and brood are reached, and the colony collapses from the inside.',
      spray: '<b>Surface spray.</b> Repellent scatters the workers into new wall cavities. Satellite nests form, and the queen keeps laying untouched.'
    };

    const N = 16;
    const ants = [];
    for (let i = 0; i < N; i++) {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('opacity', '0');
      g.innerHTML = '<circle class="ab-ant__body" r="3.3"/><circle class="ab-ant__cargo" r="2.1" cy="-4.2"/>';
      layer.appendChild(g);
      ants.push({ g, route: [], seg: 0, d: 0, speed: 60 + Math.random() * 30, wait: 0, rest: 0, live: false });
    }

    const state = { mode: 'transfer', strength: 100, collapsed: false, hold: 0, seen: { a: false, b: false } };
    let lastNests = -1, lastStrength = -1;

    const spawn = (ant, delay) => {
      ant.route = state.mode === 'transfer' ? ['top', 'bot'] : ['top', Math.random() < 0.5 ? 'a' : 'b'];
      ant.seg = 0; ant.d = 0; ant.rest = 0; ant.live = true;
      ant.wait = delay;
      ant.speed = 58 + Math.random() * 34;
      ant.g.setAttribute('opacity', '0');
    };

    const arrive = (ant) => {
      const last = ant.route[ant.route.length - 1];
      if (last === 'bot') {
        if (!state.collapsed) {
          state.strength = Math.max(0, state.strength - 100 / 24);
          queen.classList.remove('is-hit'); void queen.getBoundingClientRect(); queen.classList.add('is-hit');
          if (state.strength <= 0) {
            state.collapsed = true; state.hold = 3.2;
            queen.classList.add('is-down');
          }
        }
      } else {
        state.seen[last] = true;
        sats[last].classList.add('is-seen');
      }
    };

    const writeReadouts = () => {
      const nests = 1 + (state.seen.a ? 1 : 0) + (state.seen.b ? 1 : 0);
      const s = Math.round(state.strength);
      if (nests !== lastNests) { nestsEl.textContent = nests; lastNests = nests; }
      if (s !== lastStrength) { strengthEl.textContent = s + '%'; lastStrength = s; }
      meter.style.transform = `scaleX(${state.strength / 100})`;
    };

    const update = (dt) => {
      if (state.collapsed) {
        state.hold -= dt;
        if (state.hold <= 0) { // replay the collapse
          state.collapsed = false; state.strength = 100;
          queen.classList.remove('is-down');
        }
      }
      ants.forEach((a, i) => {
        if (a.rest > 0) { a.rest -= dt; if (a.rest <= 0) spawn(a, Math.random() * 1.2); return; }
        if (a.wait > 0) { a.wait -= dt; return; }
        if (!a.live) return;
        a.d += a.speed * dt;
        const key = a.route[a.seg];
        if (a.d >= len[key]) {
          a.seg++; a.d = 0;
          if (a.seg >= a.route.length) {
            arrive(a); a.live = false; a.rest = 0.4 + Math.random() * 0.8;
            a.g.setAttribute('opacity', '0');
            return;
          }
        }
        const p = paths[a.route[a.seg]].getPointAtLength(a.d);
        a.g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
        a.g.setAttribute('opacity', '1');
      });
      writeReadouts();
    };

    const reset = () => {
      state.strength = 100; state.collapsed = false; state.seen.a = state.seen.b = false;
      queen.classList.remove('is-down', 'is-hit');
      Object.values(sats).forEach((s) => s.classList.remove('is-seen'));
      ants.forEach((a, i) => spawn(a, i * 0.32));
      writeReadouts();
    };

    const setMode = (mode, fromUser) => {
      state.mode = mode;
      root.dataset.mode = mode;
      sw.dataset.mode = mode;
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
      caption.innerHTML = COPY[mode];
      reset();
      if (mode === 'spray') { puff.classList.remove('is-fired'); void puff.getBoundingClientRect(); puff.classList.add('is-fired'); }
      if (reduce) { for (let i = 0; i < 80; i++) update(0.1); }
    };
    btns.forEach((b) => b.addEventListener('click', () => { if (b.dataset.mode !== state.mode) setMode(b.dataset.mode, true); }));

    // run loop only while visible
    let raf = 0, last = 0, visible = true;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      update(dt);
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf && !reduce && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    setMode('transfer');
    if (!reduce) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); }, { threshold: 0.05 }).observe(root);
      }
      document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
      start();
    }
  };

  /* ---------- 3. Descent timeline ---------- */
  const initDescent = () => {
    const steps = $$('.ab-step');
    if (!steps.length) return;
    let queued = false;
    const paint = () => {
      queued = false;
      const line = window.innerHeight * 0.62;
      let active = null;
      steps.forEach((s) => {
        const r = s.getBoundingClientRect();
        const f = reduce ? 1 : Math.min(1, Math.max(0, (line - r.top) / r.height));
        s.style.setProperty('--f', f.toFixed(3));
        s.classList.toggle('is-reached', f > 0.02);
        if (f > 0 && f < 1) active = s;
        s.classList.remove('is-active');
      });
      if (active && !reduce) active.classList.add('is-active');
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(paint); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paint();
  };

  /* ---------- 4. Team roster ---------- */
  const initRoster = () => {
    const items = $$('.ab-roster__item');
    const imgs = $$('.ab-portrait img');
    if (!items.length || items.length !== imgs.length) return;
    let current = -1, z = 1, timer = 0;

    const select = (i) => {
      if (i === current) return;
      current = i;
      items.forEach((it, k) => {
        const on = k === i;
        it.classList.toggle('is-active', on);
        $('.ab-roster__head', it).setAttribute('aria-expanded', String(on));
      });
      const img = imgs[i];
      img.style.zIndex = String(++z);
      img.classList.add('is-on');
      clearTimeout(timer);
      timer = setTimeout(() => imgs.forEach((im, k) => { if (k !== current) im.classList.remove('is-on'); }), 1000);
    };

    const canHover = window.matchMedia('(hover: hover)').matches;
    items.forEach((it, i) => {
      const head = $('.ab-roster__head', it);
      head.addEventListener('click', () => select(i));
      if (canHover) head.addEventListener('mouseenter', () => select(i));
    });
    select(0);
  };

  const init = () => {
    initReveals();
    initColony();
    initDescent();
    initRoster();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
