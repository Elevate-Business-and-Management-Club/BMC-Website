/**
 * BMC - Business and Management Club - Custom Fluid Cursor Module
 * Drives interactive canvas dot tracking and modern blend mode ring followers
 */

export class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('cursor');
    this.ring = document.getElementById('cursor-ring');
    
    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;
    this.animationId = null;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onHoverEnter = this.onHoverEnter.bind(this);
    this.onHoverLeave = this.onHoverLeave.bind(this);
    this.animateRing = this.animateRing.bind(this);

    if (!this.cursor || !this.ring) {
      console.warn('Custom cursor elements (#cursor / #cursor-ring) missing in DOM.');
      return;
    }

    // Disable running overhead instantly on devices that leverage coarse touch screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      this.cursor.style.display = 'none';
      this.ring.style.display = 'none';
      return;
    }

    this.init();
  }

  init() {
    document.addEventListener('mousemove', this.onMouseMove);
    this.bindHoverEffects();
    this.animateRing();
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Instantly pin core cursor dot center
    this.cursor.style.transform = `translate(${this.mouseX - 5}px, ${this.mouseY - 5}px)`;
  }

  bindHoverEffects() {
    this.interactiveTargets = document.querySelectorAll('a, button, .work-item, .pillar, .service, .navbar__toggle');
    this.interactiveTargets.forEach((el) => {
      el.addEventListener('mouseenter', this.onHoverEnter);
      el.addEventListener('mouseleave', this.onHoverLeave);
    });
  }

  onHoverEnter() {
    this.cursor.classList.add('hovered');
    this.ring.classList.add('hovered');
  }

  onHoverLeave() {
    this.cursor.classList.remove('hovered');
    this.ring.classList.remove('hovered');
  }

  /**
   * Linear interpolation loop runner for elastic tracking look and feel
   */
  animateRing() {
    const ringOffset = 19; // Half of structural radius dimensions (38px width / 2)
    this.ringX += (this.mouseX - this.ringX - ringOffset) * 0.12;
    this.ringY += (this.mouseY - this.ringY - ringOffset) * 0.12;

    this.ring.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;
    this.animationId = requestAnimationFrame(this.animateRing);
  }

  /**
   * Reset structural tracking layers cleanly on route variations
   */
  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    if (this.interactiveTargets) {
      this.interactiveTargets.forEach((el) => {
        el.removeEventListener('mouseenter', this.onHoverEnter);
        el.removeEventListener('mouseleave', this.onHoverLeave);
      });
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}