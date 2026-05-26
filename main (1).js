/**
 * BMC - Business and Management Club - Main Application Entry Point
 * Initializes all modules and handles application lifecycle
 */

import { CustomCursor } from './cursor.js';
import { ScrollController } from './scroll.js';
import { RevealAnimation } from './reveal.js';
import "./gallery.js";
import "./upcomingevents.js";

/**
 * Main Application Class
 * Orchestrates all modules and handles initialization
 */
class App {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
    
    // Bind event handlers so they retain the correct context
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  /**
   * Initialize the application
   */
  init() {
    if (this.isInitialized) {
      console.warn('App already initialized');
      return;
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Setup all modules and UI components
   */
  setup() {
    // Initialize external animation & effect modules
    this.modules.cursor = new CustomCursor();
    this.modules.scroll = new ScrollController();
    this.modules.reveal = new RevealAnimation();

    // Initialize Interactive Mobile Navigation
    this.setupMobileNavigation();

    this.isInitialized = true;
  }

  /**
   * Cache DOM elements and attach responsive mobile navbar listeners
   */
  setupMobileNavigation() {
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileCloseBtn = document.getElementById('mobile-menu-close-btn');
    this.navbarLinks = document.querySelector('.navbar__links');

    if (this.navbarLinks) {
      // Toggle interaction parameters wireframes
      if (this.mobileMenuBtn) {
        this.mobileMenuBtn.addEventListener('click', this.toggleMenu);
      }
      if (this.mobileCloseBtn) {
        this.mobileCloseBtn.addEventListener('click', this.closeMenu);
      }

      // Automatically dismiss popup panel when clicking internal anchor routes
      this.navLinks = this.navbarLinks.querySelectorAll('.navbar__link');
      this.navLinks.forEach(link => {
        link.addEventListener('click', this.closeMenu);
      });
    }
  }

  /**
   * Action handler to open mobile menu
   */
  toggleMenu() {
    if (this.navbarLinks) this.navbarLinks.classList.add('active');
  }

  /**
   * Direct action handler to force-close the overlay menu window
   */
  closeMenu() {
    if (this.navbarLinks) this.navbarLinks.classList.remove('active');
  }

  /**
   * Clean up and destroy modules safely to prevent memory leaks
   */
  destroy() {
    // Remove attached UI listeners
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.removeEventListener('click', this.toggleMenu);
    }
    if (this.mobileCloseBtn) {
      this.mobileCloseBtn.removeEventListener('click', this.closeMenu);
    }
    if (this.navLinks) {
      this.navLinks.forEach(link => {
        link.removeEventListener('click', this.closeMenu);
      });
    }

    // Destroy external modules that possess custom cleanup routines
    if (this.modules.reveal && typeof this.modules.reveal.destroy === 'function') {
      this.modules.reveal.destroy();
    }

    this.isInitialized = false;
  }
}

// Initialize application
const app = new App();
app.init();

// Export for potential external use
export { app };