/**
 * BMC - Business and Management Club
 * Handles scroll-triggered fade-in animations using Intersection Observer
 */

export class RevealAnimation {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal');
    this.observer = null;

    if (this.revealElements.length === 0) {
      console.warn('No reveal elements found');
      return;
    }

    this.init();
  }

  /**
   * Initialize reveal animations
   */
  init() {
    this.createObserver();
    this.observeElements();
  }

  /**
   * Create Intersection Observer with optimized settings
   */
  createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onElementVisible(entry.target);
        }
      });
    }, options);
  }

  /**
   * Observe all reveal elements
   */
  observeElements() {
    this.revealElements.forEach((el) => {
      this.observer.observe(el);
    });
  }

  /**
   * Callback when element becomes visible
   * @param {HTMLElement} element - The revealed element
   */
  onElementVisible(element) {
    element.classList.add('visible');

    // Optionally unobserve after reveal for performance
    // this.observer.unobserve(element);
  }

  /**
   * Destroy observer and clean up
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}