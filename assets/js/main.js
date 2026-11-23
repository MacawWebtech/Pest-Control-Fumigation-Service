/**
 * DEFENDRA - PEST CONTROL & FUMIGATION SERVICE
 * Core Application Interactions (Header, Mobile Drawer, Accordions, Modals, Scroll Reveals)
 * Vanilla ES6+, no global pollution, zero console.log
 */

(() => {
  'use strict';

  // --- Sticky Header Controller ---
  const initHeader = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  };

  // --- Mobile Drawer Controller ---
  const initMobileDrawer = () => {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.mobile-drawer-backdrop');
    const closeBtn = document.querySelector('.mobile-drawer__close');

    if (!drawer) return;

    const openDrawer = () => {
      drawer.classList.add('is-active');
      if (backdrop) backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    };

    const closeDrawer = () => {
      drawer.classList.remove('is-active');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
      if (toggleBtn) toggleBtn.focus();
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-active')) {
        closeDrawer();
      }
    });

    // Close on mobile nav link click
    const drawerLinks = drawer.querySelectorAll('a:not(.nav-item--dropdown > a)');
    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  };

  // --- Accordion Controller (FAQ & Details) ---
  const initAccordions = () => {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.accordion-trigger');
      if (!trigger) return;

      const item = trigger.closest('.accordion-item');
      if (!item) return;

      const body = item.querySelector('.accordion-body');
      if (!body) return;

      const isOpen = item.classList.contains('is-open');
      const accordion = item.closest('.accordion');

      // If single-open accordion, close sibling items
      if (accordion && !accordion.hasAttribute('data-multi-expand')) {
        const openSiblings = accordion.querySelectorAll('.accordion-item.is-open');
        openSiblings.forEach((sibling) => {
          if (sibling !== item) {
            sibling.classList.remove('is-open');
            const siblingBody = sibling.querySelector('.accordion-body');
            const siblingTrigger = sibling.querySelector('.accordion-trigger');
            if (siblingBody) siblingBody.style.maxHeight = null;
            if (siblingTrigger) siblingTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('is-open');
        body.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        body.style.maxHeight = `${body.scrollHeight + 32}px`;
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  };

  // --- Modal Controller ---
  const initModals = () => {
    const openModal = (targetId) => {
      const modal = document.getElementById(targetId);
      if (!modal) return;
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
      if (firstFocusable) firstFocusable.focus();
    };

    const closeModal = (modal) => {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-target]');
      if (trigger) {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        openModal(targetId);
        return;
      }

      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        e.preventDefault();
        const modal = closeBtn.closest('.modal-backdrop');
        if (modal) closeModal(modal);
        return;
      }

      if (e.target.classList.contains('modal-backdrop')) {
        closeModal(e.target);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-backdrop.is-active');
        if (activeModal) closeModal(activeModal);
      }
    });
  };

  // --- Active Nav Highlight ---
  const initActiveNav = () => {
    const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const navLinks = document.querySelectorAll('.nav-link, .nav-dropdown__link, .mobile-nav-link');

    // Clear any hard-coded / stale active state first so only the current page is active
    navLinks.forEach((link) => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = href.split('#')[0].split('?')[0].split('/').pop().toLowerCase();
      if (cleanHref !== currentPath) return;

      // A parent toggle that shares its URL with a dropdown child must not steal the state
      if (link.classList.contains('nav-link') && link.closest('.nav-item--dropdown')) {
        const hasMatchingChild = Array.from(link.closest('.nav-item--dropdown').querySelectorAll('.nav-dropdown__link'))
          .some((child) => (child.getAttribute('href') || '').split('/').pop().toLowerCase() === currentPath);
        if (hasMatchingChild) {
          link.classList.add('active');
          return;
        }
      }

      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      const parentDropdown = link.closest('.nav-item--dropdown');
      if (parentDropdown) {
        const parentToggle = parentDropdown.querySelector('.nav-link');
        if (parentToggle) parentToggle.classList.add('active');
      }
    });
  };

  // --- Scroll Reveals ---
  const initScrollReveals = () => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    });

    revealElements.forEach((el) => observer.observe(el));
  };

  // --- Lucide Icons Auto Loader ---
  const initIcons = () => {
    if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  // --- DOM Ready Orchestrator ---
  const init = () => {
    initHeader();
    initMobileDrawer();
    initAccordions();
    initModals();
    initActiveNav();
    initScrollReveals();
    initIcons();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run icons on DOM mutation or page dynamic render
  window.addEventListener('defendra:icons-update', initIcons);
})();
