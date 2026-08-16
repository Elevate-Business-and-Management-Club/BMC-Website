/**
 * BMC - Business and Management Club- Custom Cursor Module
 * Handles the custom cursor with dot and ring elements
 */

export class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('cursor');
    this.ring = document.getElementById('cursor-ring');
    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;

    if (!this.cursor || !this.ring) {
      console.warn('Cursor elements not found');
      return;
    }

    // Skip on touch devices - there's no mouse to track,
    // and CSS already hides/restores things via (pointer: coarse).
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    this.init();
  }

  /**
   * Initialize cursor functionality
   */
  init() {
    this.bindEvents();
    this.animateRing();
  }

  /**
   * Bind mouse event listeners
   */
  bindEvents() {
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Move cursor dot instantly
      this.cursor.style.transform = `translate(${this.mouseX - 5}px, ${this.mouseY - 5}px)`;
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .pillar, .service');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => this.onHoverEnter());
      el.addEventListener('mouseleave', () => this.onHoverLeave());
    });
  }

  /**
   * Animate the cursor ring with smooth following
   */
  animateRing() {
    // Smooth follow with lerp
    this.ringX += (this.mouseX - this.ringX - 19) * 0.12;
    this.ringY += (this.mouseY - this.ringY - 19) * 0.12;

    this.ring.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;

    requestAnimationFrame(() => this.animateRing());
  }

  /**
   * Handle hover enter state
   */
  onHoverEnter() {
    this.cursor.classList.add('hovered');
    this.ring.classList.add('hovered');
  }

  /**
   * Handle hover leave state
   */
  onHoverLeave() {
    this.cursor.classList.remove('hovered');
    this.ring.classList.remove('hovered');
  }
}
