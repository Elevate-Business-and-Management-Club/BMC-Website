/**
 * BMC - Business and Management Club - Main Application Entry Point
 * Initializes all modules and handles application lifecycle
 */

import { CustomCursor } from './cursor.js';
import { ScrollController } from './scroll.js';
import { RevealAnimation } from './reveal.js';
import { clubMembers } from './member.js';
//import "./gallery.js";
//import "./upcomingevents.js";

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
function renderTeam() {
    const teamContainer = document.getElementById('team-container');

    if (!teamContainer) {
        console.error('team-container not found');
        return;
    }

    const batches = [...new Set(clubMembers.map(member => member.batch))];

    let html = `
        <div class="batches-wrapper">
    `;

    batches.forEach(batch => {

        const batchMembers = clubMembers.filter(
            member => member.batch === batch
        );

        const leadership = batchMembers.filter(
            member =>
                member.role === 'Coordinator' ||
                member.role === 'Co-Coordinator'
        );

        const regularMembers = batchMembers.filter(
            member =>
                member.role !== 'Coordinator' &&
                member.role !== 'Co-Coordinator'
        );

        html += `
            <div class="batch-column">
                <h2 class="batch-heading">BATCH ${batch}</h2>
        `;

        // ONLY BATCH 2024 gets Coordinator / Co-Coordinator
        if (batch === "2024" && leadership.length > 0) {

            html += `
                <div class="leadership-container">
            `;

            leadership.forEach(member => {
                html += `
                    <div class="leadership-card">
                        <span class="leadership-role">
                            ${member.role}
                        </span>

                        <h3>${member.name}</h3>

                        <p>${member.sector}</p>
                    </div>
                `;
            });

            html += `
                </div>
            `;
        }

        // Show sectors for BOTH batches
        const sectors = [
            ...new Set(
                regularMembers.map(member => member.sector)
            )
        ];

        sectors.forEach(sector => {

            const sectorMembers = regularMembers.filter(
                member => member.sector === sector
            );

            html += `
                <div class="sector-group">

                    <h3 class="sector-heading">
                        ${sector}
                    </h3>

                    <div class="members-list">
            `;

            sectorMembers.forEach(member => {

                html += `
                    <div class="member-item">
                        <span class="member-name">
                            ${member.name}
                        </span>
                    </div>
                `;

            });

            html += `
                    </div>
                </div>
            `;
        });

        html += `
            </div>
        `;
    });

    html += `
        </div>
    `;

    teamContainer.innerHTML = html;
}
const app = new App();
app.init();

renderTeam();