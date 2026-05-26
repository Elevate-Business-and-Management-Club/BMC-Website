/**
 * BMC - Business and Management Club - Main Application Framework Entry
 * Central lifecycle engine coordinating event loop registrations and dynamic bindings
 */

import { CustomCursor } from './cursor.js';
import { ScrollController } from './scroll.js';
import { RevealAnimation } from './reveal.js';
import { Gallery } from './gallery.js';
import { Events } from './upcomingevents.js';

class App {
  constructor() {
    this.modules = {};
    this.isInitialized = false;

    // Mobile Hamburger Menu Context DOM Hooks
    this.mobileMenuBtn = document.getElementById('navbar-toggle');
    this.mobileCloseBtn = document.getElementById('navbar-close');
    this.navbarLinks = document.getElementById('navbar-menu');

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  init() {
    if (this.isInitialized) {
      console.warn('BMC application instance lifecycle framework is already active.');
      return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Component Mount Routines
    this.modules.cursor = new CustomCursor();
    this.modules.scroll = new ScrollController();
    this.modules.reveal = new RevealAnimation();

    // Boot IIFE dynamic background engines
    Gallery.init();
    Events.init();

    this.bindMenuEvents();
    this.isInitialized = true;
    console.log('BMC Frontend Application initialized successfully.');
  }

  /**
   * Handles modern responsive mobile navigation structures cleanly
   */
  bindMenuEvents() {
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', this.toggleMenu);
    }
    if (this.mobileCloseBtn) {
      this.mobileCloseBtn.addEventListener('click', this.closeMenu);
    }

    // Close mobile layout menus smoothly upon tapping valid page targets
    if (this.navbarLinks) {
      this.navLinks = this.navbarLinks.querySelectorAll('.navbar__link');
      this.navLinks.forEach((link) => {
        link.addEventListener('click', this.closeMenu);
      });
    }
  }

  toggleMenu() {
    if (this.navbarLinks) {
      this.navbarLinks.classList.add('active');
    }
  }

  closeMenu() {
    if (this.navbarLinks) {
      this.navbarLinks.classList.remove('active');
    }
  }

  /**
   * Cleanup method to wipe active application context cleanly during hot updates or route swaps
   */
  destroy() {
    if (this.mobileMenuBtn) this.mobileMenuBtn.removeEventListener('click', this.toggleMenu);
    if (this.mobileCloseBtn) this.mobileCloseBtn.removeEventListener('click', this.closeMenu);
    if (this.navLinks) {
      this.navLinks.forEach((link) => link.removeEventListener('click', this.closeMenu));
    }

    // Unbind class context instances cleanly
    Object.keys(this.modules).forEach((key) => {
      if (this.modules[key] && typeof this.modules[key].destroy === 'function') {
        this.modules[key].destroy();
      }
    });

    this.isInitialized = false;
    console.log('BMC Application teardown workflow completed.');
  }
}

// Instantiate and initialize the app lifecycle entry point safely
const bmcApp = new App();
bmcApp.init();