/**
 * Header Manager Class
 * Simple content management using window.siteConfig variables
 */
class HeaderManager {
  constructor() {
    this.config = window.siteConfig;
    this.currentPage = "beranda";
    this.init();
  }

  /**
   * Initialize header manager
   */
  init() {
    this.renderContent();
    this.setupEventListeners();
    this.setupStickyHeader();

    const file = window.location.pathname.split("/").pop() || "index.html";

    if (file === "produk.html") {
      this.setActivePage("produk");
      document.title = "Produk Kami - Buya hamka";
    } else if (file === "tentang-kami.html") {
      this.setActivePage("tentang");
      document.title = "Tentang Kami - Buya hamka";
    } else if (file === "berita.html") {
      this.setActivePage("berita");
      document.title = "Berita - Buya hamka";
    } else if (file === "berita-detail.html") {
      this.setActivePage("berita");
      document.title = "Kontak - Buya hamka";
    } else if (file === "kontak.html") {
      this.setActivePage("kontak");
      document.title = "Kontak - Buya hamka";
    } else {
      this.setActivePage("beranda");
      document.title = "Beranda - Buya hamka";
    }

    console.log("Header Manager initialized with config:", this.config);
  }

  /**
   * Render all content from config
   */
  renderContent() {
    this.renderBrand();
    this.renderNavigation();
    this.renderCTA();
    this.renderPageContent();
  }

  /**
   * Render brand section
   */
  renderBrand() {
    const brandName = document.getElementById("brand-name");
    const brandLink = document.getElementById("brand-logo");

    if (brandName && this.config.brand) {
      brandName.textContent = this.config.brand.name;
    }

    if (brandLink && this.config.brand) {
      brandLink.href = this.config.brand.href;
      brandLink.setAttribute("title", this.config.brand.description);
    }
  }

  /**
   * Render navigation menu
   */
  renderNavigation() {
    const navContainer = document.getElementById("main-navigation");
    if (!navContainer || !this.config.navigation) return;

    navContainer.innerHTML = "";

    this.config.navigation.forEach((item) => {
      const li = document.createElement("li");
      li.className = `nav-item ${item.active ? "active" : ""}`;

      const a = document.createElement("a");
      a.className = "nav-link";
      a.href = item.href;
      a.textContent = item.label;
      a.setAttribute("data-page", item.id);

      // Set current page from active item
      if (item.active) {
        this.currentPage = item.id;

        // Add screen reader text for active item
        const srSpan = document.createElement("span");
        srSpan.className = "sr-only";
        srSpan.textContent = "(current)";
        a.appendChild(srSpan);
      }

      li.appendChild(a);
      navContainer.appendChild(li);
    });
  }

  /**
   * Render CTA button
   */
  renderCTA() {
    const ctaButton = document.getElementById("cta-button");
    const ctaSpan = ctaButton?.querySelector("span");
    const ctaIcon = ctaButton?.querySelector("i");

    if (ctaButton && this.config.cta) {
      ctaButton.href = this.config.cta.href;
    }

    if (ctaSpan && this.config.cta) {
      ctaSpan.textContent = this.config.cta.text;
    }

    if (ctaIcon && this.config.cta.icon) {
      ctaIcon.className = this.config.cta.icon;
    }
  }

  /**
   * Render page content
   */
  renderPageContent() {
    const pageTitle = document.getElementById("page-title");
    const pageSubtitle = document.getElementById("page-subtitle");

    if (pageTitle && this.config.pageContent) {
      pageTitle.textContent = this.config.pageContent.title;
    }

    if (pageSubtitle && this.config.pageContent) {
      pageSubtitle.textContent = this.config.pageContent.subtitle;
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Navigation clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches(".nav-link")) {
        this.handleNavClick(e.target);
      }
    });

    // Mobile menu toggle
    const navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarToggler) {
      navbarToggler.addEventListener("click", () => {
        this.handleMobileToggle();
      });
    }
  }

  /**
   * Handle navigation click
   */
  handleNavClick(clickedLink) {
    // Remove active class from all nav items
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to clicked item
    clickedLink.closest(".nav-item").classList.add("active");

    // Update current page
    this.currentPage = clickedLink.dataset.page;

    // Update config active states
    if (this.config.navigation) {
      this.config.navigation.forEach((item) => {
        item.active = item.id === this.currentPage;
      });
    }

    console.log(`Navigated to: ${this.currentPage}`);
  }

  /**
   * Handle mobile menu toggle
   */
  handleMobileToggle() {
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar) {
      navbar.addEventListener("shown.bs.collapse", () => {
        console.log("Mobile menu opened");
      });

      navbar.addEventListener("hidden.bs.collapse", () => {
        console.log("Mobile menu closed");
      });
    }
  }

  /**
   * Setup sticky header behavior
   */
  setupStickyHeader() {
    let lastScrollTop = 0;
    const header = document.querySelector(".header_section");

    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide header
        header.style.transform = "translateY(-100%)";
      } else {
        // Scrolling up - show header
        header.style.transform = "translateY(0)";
      }

      lastScrollTop = scrollTop;
    });
  }

  // === PUBLIC METHODS ===

  /**
   * Set active page programmatically
   * @param {string} pageName - Page ID to set as active
   */
  setActivePage(pageName) {
    const targetLink = document.querySelector(`[data-page="${pageName}"]`);
    if (targetLink) {
      this.handleNavClick(targetLink);
    }
  }

  /**
   * Get current active page
   * @returns {string} Current page ID
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Update brand info
   * @param {Object} brandData - New brand data
   */
  updateBrand(brandData) {
    this.config.brand = { ...this.config.brand, ...brandData };
    this.renderBrand();
  }

  /**
   * Update navigation menu
   * @param {Array} navigationData - New navigation array
   */
  updateNavigation(navigationData) {
    this.config.navigation = navigationData;
    this.renderNavigation();
    this.setupEventListeners(); // Re-setup listeners
  }

  /**
   * Update CTA button
   * @param {Object} ctaData - New CTA data
   */
  updateCTA(ctaData) {
    this.config.cta = { ...this.config.cta, ...ctaData };
    this.renderCTA();
  }

  /**
   * Update page content
   * @param {Object} contentData - New content data
   */
  updatePageContent(contentData) {
    this.config.pageContent = { ...this.config.pageContent, ...contentData };
    this.renderPageContent();
  }

  /**
   * Get current configuration
   * @returns {Object} Current site config
   */
  getConfig() {
    return this.config;
  }
}

/**
 * Initialize when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  window.headerManager = new HeaderManager();

  // Developer console message
  console.log(`
Komikes Header Manager Loaded! 

Simple config-based system:
- Edit window.siteConfig in HTML to change content
- headerManager.setActivePage('produk') - Set active page
- headerManager.updateBrand({name: 'New Name'}) - Update brand
- headerManager.updateCTA({text: 'New CTA'}) - Update CTA
- headerManager.getConfig() - Get current config

Navigation pages: beranda, produk, tentang, berita, kontak
    `);
});

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = HeaderManager;
}
