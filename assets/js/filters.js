/**
 * DEFENDRA - PEST CONTROL & FUMIGATION SERVICE
 * Search & Filtering Engine for Services, Service Areas, and Blog Articles
 * Vanilla ES6+, no global pollution, zero console.log
 */

(() => {
  'use strict';

  // --- 1. Services Filter (services.html) ---
  const initServicesFilter = () => {
    const filterTabs = document.querySelectorAll('[data-service-filter]');
    const serviceItems = document.querySelectorAll('[data-service-category]');

    if (!filterTabs.length || !serviceItems.length) return;

    filterTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetCategory = tab.getAttribute('data-service-filter');

        // Update active tab style
        filterTabs.forEach((t) => t.classList.remove('is-active', 'btn-primary'));
        tab.classList.add('is-active', 'btn-primary');

        // Filter cards
        serviceItems.forEach((item) => {
          const itemCategories = item.getAttribute('data-service-category').split(' ');
          if (targetCategory === 'all' || itemCategories.includes(targetCategory)) {
            item.style.display = '';
            item.classList.remove('is-filtered-out');
          } else {
            item.style.display = 'none';
            item.classList.add('is-filtered-out');
          }
        });
      });
    });
  };

  // --- 2. Areas Served Search & Region Filter (areas-served.html) ---
  const initAreasFilter = () => {
    const searchInput = document.getElementById('areaSearchInput');
    const regionButtons = document.querySelectorAll('[data-region-filter]');
    const areaCards = document.querySelectorAll('[data-area-card]');
    const resultsCount = document.getElementById('areaResultsCount');

    if (!areaCards.length) return;

    let activeRegion = 'all';
    let searchQuery = '';

    const applyAreaFilters = () => {
      let visibleCount = 0;

      areaCards.forEach((card) => {
        const cardRegion = card.getAttribute('data-region') || '';
        const cardText = (card.textContent || '').toLowerCase();

        const matchesRegion = activeRegion === 'all' || cardRegion === activeRegion;
        const matchesSearch = !searchQuery || cardText.includes(searchQuery);

        if (matchesRegion && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (resultsCount) {
        resultsCount.textContent = `Showing ${visibleCount} verified service zones`;
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyAreaFilters();
      });
    }

    regionButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Selected button = solid yellow; every other button (including "All Metros")
        // goes back to the outlined light style so it stays visible on the dark panel.
        regionButtons.forEach((b) => {
          b.classList.remove('is-active', 'btn-primary');
          b.classList.add('btn-outline-light');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.remove('btn-outline-light');
        btn.classList.add('is-active', 'btn-primary');
        btn.setAttribute('aria-pressed', 'true');
        activeRegion = btn.getAttribute('data-region-filter') || 'all';
        applyAreaFilters();
      });
    });
  };

  // --- 3. Blog Search, Category Tabs & Pagination (blog.html) ---
  const initBlogFilter = () => {
    const blogSearch = document.getElementById('blogSearchInput');
    const blogCategoryTabs = document.querySelectorAll('[data-blog-category]');
    const blogCards = document.querySelectorAll('[data-blog-card]');
    const noResultsMsg = document.getElementById('blogNoResults');

    if (!blogCards.length) return;

    let selectedCat = 'all';
    let searchTerm = '';

    const updateBlogList = () => {
      let count = 0;

      blogCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category') || '';
        const cardText = (card.textContent || '').toLowerCase();

        const matchCat = selectedCat === 'all' || cardCat === selectedCat;
        const matchSearch = !searchTerm || cardText.includes(searchTerm);

        if (matchCat && matchSearch) {
          card.style.display = '';
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsMsg) {
        noResultsMsg.style.display = count === 0 ? 'block' : 'none';
      }
    };

    if (blogSearch) {
      blogSearch.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase().trim();
        updateBlogList();
      });
    }

    blogCategoryTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        blogCategoryTabs.forEach((t) => t.classList.remove('is-active', 'badge-yellow'));
        tab.classList.add('is-active', 'badge-yellow');
        selectedCat = tab.getAttribute('data-blog-category') || 'all';
        updateBlogList();
      });
    });
  };

  // --- 4. FAQ Category Tabs (faq.html) ---
  const initFaqFilter = () => {
    const faqTabs = document.querySelectorAll('[data-faq-tab]');
    const faqGroups = document.querySelectorAll('[data-faq-group]');
    const faqSearch = document.getElementById('faqSearchInput');
    const faqItems = document.querySelectorAll('.accordion-item');

    if (!faqTabs.length && !faqSearch) return;

    // Tab switcher
    faqTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetGroup = tab.getAttribute('data-faq-tab');

        faqTabs.forEach((t) => t.classList.remove('is-active', 'btn-primary'));
        tab.classList.add('is-active', 'btn-primary');

        faqGroups.forEach((group) => {
          if (targetGroup === 'all' || group.getAttribute('data-faq-group') === targetGroup) {
            group.style.display = '';
          } else {
            group.style.display = 'none';
          }
        });
      });
    });

    // Real-time keyword filter across questions
    if (faqSearch) {
      faqSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        faqItems.forEach((item) => {
          const text = (item.textContent || '').toLowerCase();
          if (!query || text.includes(query)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  };

  // --- Global Initializer ---
  const init = () => {
    initServicesFilter();
    initAreasFilter();
    initBlogFilter();
    initFaqFilter();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
