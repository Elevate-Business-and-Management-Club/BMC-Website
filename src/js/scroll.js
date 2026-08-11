/**
 * BMC - Business and Management Club
 * Handles navigation scroll effects and smooth scrolling
 */

export class ScrollController {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.scrollThreshold = 80;
    this.lastScrollY = 0;

    if (!this.navbar) {
      console.warn('Navbar element not found');
      return;
    }

    this.init();
  }

  /**
   * Initialize scroll functionality
   */
  init() {
    this.bindEvents();
  }

  /**
   * Bind scroll event listeners
   */
  bindEvents() {
    // Throttle scroll events for performance
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Handle smooth scroll for anchor links
    this.initSmoothScroll();
  }

  /**
   * Handle scroll event
   */
  handleScroll() {
    const currentScrollY = window.scrollY;

    // Toggle navbar scrolled state
    if (currentScrollY > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    this.lastScrollY = currentScrollY;
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');

        // Skip if just '#'
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const navHeight = this.navbar.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }
}
