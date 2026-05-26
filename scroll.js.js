/**
 * BMC - Business and Management Club - Scroll Reveal Animations Module
 * Manages optimized view tracking utilizing modern IntersectionObservers
 */

export class RevealAnimation {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal');
    this.observer = null;

    if (this.revealElements.length === 0) {
      return; // Fail gracefully if a page omits reveal styles
    }

    this.init();
  }

  init() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px', // Animates targets slightly before they cross full center viewport
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onElementVisible(entry.target);
        }
      });
    }, options);

    this.revealElements.forEach((el) => this.observer.observe(el));
  }

  /**
   * Add active animation tracking states once inside view
   */
  onElementVisible(element) {
    element.classList.add('revealed');
    // Once an element reveals, unobserve it to conserve CPU processing overhead
    this.observer.unobserve(element);
  }

  /**
   * Safely detach and unbind all visual tracking hooks
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}