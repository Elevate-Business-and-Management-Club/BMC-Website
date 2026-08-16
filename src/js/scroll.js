/**
 * BMC - Business and Management Club
 * Handles navbar appearance and smooth scrolling between page sections.
 */

export class ScrollController {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.scrollThreshold = 80;
    this.lastScrollY = 0;

    if (!this.navbar) {
      console.warn('Navbar element not found. Add id="nav" to the <nav> element.');
      return;
    }

    this.init();
  }

  /**
   * Initialize all scrolling features.
   */
  init() {
    this.handleScroll();
    this.bindEvents();
  }

  /**
   * Attach scrolling and navbar-link events.
   */
  bindEvents() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });

        ticking = true;
      }
    });

    this.initSmoothScroll();
  }

  /**
   * Add a visual state to the navbar once the visitor has scrolled down.
   */
  handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    this.lastScrollY = currentScrollY;
  }

  /**
   * Smoothly scroll navbar and internal links to their matching section IDs.
   */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');

        // Links such as href="#" do not point to a page section.
        if (!href || href === '#') {
          return;
        }

        const target = document.querySelector(href);

        // Allow normal browser behavior if a matching target is unavailable.
        if (!target) {
          console.warn(`No section found for ${href}`);
          return;
        }

        event.preventDefault();

        const navbarHeight = this.navbar.offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight -
          12;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth',
        });

        // Updates the URL hash without a sudden second jump.
        window.history.replaceState(null, '', href);
      });
    });
  }
}
