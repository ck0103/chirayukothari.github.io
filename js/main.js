// Minimalist Academic Website JavaScript
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBibtexToggles();
  initPublicationFilters();
  initActiveNav();
});

/* -------------------------------------------------------------
 * 1. Mobile Navigation Menu
 * ----------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

/* -------------------------------------------------------------
 * 2. Interactive BibTeX Drawer & Copy-to-Clipboard
 * ----------------------------------------------------------- */
function initBibtexToggles() {
  const bibBtns = document.querySelectorAll('.btn-bibtex');
  
  bibBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const box = document.getElementById(targetId);
      if (box) {
        box.classList.toggle('open');
      }
    });
  });

  const copyBtns = document.querySelectorAll('.copy-bib-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const box = btn.closest('.bibtex-drawer');
      const textToCopy = box.querySelector('code').innerText;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const origText = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => {
          btn.innerText = origText;
        }, 1800);
      });
    });
  });
}

/* -------------------------------------------------------------
 * 3. Publication Filters
 * ----------------------------------------------------------- */
function initPublicationFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const entries = document.querySelectorAll('.pub-entry');
  if (tabs.length === 0 || entries.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      entries.forEach(entry => {
        const category = entry.getAttribute('data-category');
        const year = entry.getAttribute('data-year');

        if (filter === 'all' || filter === category || filter === year) {
          entry.style.display = 'block';
        } else {
          entry.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 4. Active Navigation Detection
 * ----------------------------------------------------------- */
function initActiveNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
