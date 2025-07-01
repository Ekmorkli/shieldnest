
// Cookie Consent Management
class CookieConsent {
  constructor() {
    this.cookieName = 'shieldnest_cookie_consent';
    this.consentTypes = {
      necessary: true, // Always true
      analytics: false,
      marketing: false
    };
    this.init();
  }

  init() {
    this.checkExistingConsent();
    this.bindEvents();
  }

  checkExistingConsent() {
    const consent = this.getConsent();
    if (!consent) {
      this.showBanner();
    } else {
      this.loadConsentedServices(consent);
    }
  }

  showBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'block';
    }
  }

  hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  bindEvents() {
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.acceptAll());
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => this.rejectAll());
    }
  }

  acceptAll() {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    };
    this.saveConsent(consent);
    this.loadConsentedServices(consent);
    this.hideBanner();
  }

  rejectAll() {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };
    this.saveConsent(consent);
    this.loadConsentedServices(consent);
    this.hideBanner();
  }

  saveConsent(consent) {
    try {
      localStorage.setItem(this.cookieName, JSON.stringify(consent));
      // Also set a simple cookie for server-side reading
      document.cookie = `${this.cookieName}=${JSON.stringify(consent)}; path=/; max-age=31536000; SameSite=Strict`;
    } catch (error) {
      console.warn('Failed to save cookie consent:', error);
    }
  }

  getConsent() {
    try {
      const stored = localStorage.getItem(this.cookieName);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to read cookie consent:', error);
      return null;
    }
  }

  loadConsentedServices(consent) {
    // Load analytics only if consented
    if (consent.analytics) {
      this.loadAnalytics();
    }

    // Load marketing tools only if consented
    if (consent.marketing) {
      this.loadMarketing();
    }
  }

  loadAnalytics() {
    // Placeholder for analytics loading
    console.log('Analytics tracking enabled');
  }

  loadMarketing() {
    // Placeholder for marketing tools
    console.log('Marketing tools enabled');
  }

  // Method to revoke consent
  revokeConsent() {
    localStorage.removeItem(this.cookieName);
    document.cookie = `${this.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    location.reload();
  }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CookieConsent();
});
