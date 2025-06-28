
// Enhanced WhatsApp Integration for ShieldNest
class WhatsAppIntegration {
  constructor() {
    this.phoneNumber = "233539985980";
    this.baseUrl = `https://wa.me/${this.phoneNumber}`;
    this.init();
  }

  init() {
    this.createWhatsAppWidgets();
    this.bindEvents();
    this.createQuickActionMenu();
  }

  createWhatsAppWidgets() {
    // Enhanced WhatsApp floating button
    const whatsappFloat = document.createElement('div');
    whatsappFloat.id = 'whatsapp-float';
    whatsappFloat.innerHTML = `
      <div class="whatsapp-icon">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </div>
      <div class="whatsapp-pulse"></div>
    `;
    document.body.appendChild(whatsappFloat);

    // WhatsApp quick action menu
    const quickMenu = document.createElement('div');
    quickMenu.id = 'whatsapp-quick-menu';
    quickMenu.innerHTML = `
      <div class="quick-menu-header">
        <div class="agent-info">
          <div class="agent-avatar">🛡️</div>
          <div class="agent-details">
            <span class="agent-name">ShieldNest Support</span>
            <span class="agent-status">🟢 Online Now</span>
          </div>
        </div>
        <button class="close-menu">×</button>
      </div>
      <div class="quick-actions">
        <button class="quick-action" data-type="emergency">
          🚨 <span>Emergency Cyber Attack</span>
        </button>
        <button class="quick-action" data-type="consultation">
          📋 <span>Free Security Assessment</span>
        </button>
        <button class="quick-action" data-type="services">
          🛡️ <span>Our Services & Pricing</span>
        </button>
        <button class="quick-action" data-type="support">
          🔧 <span>Technical Support</span>
        </button>
        <button class="quick-action" data-type="training">
          🎓 <span>Cybersecurity Training</span>
        </button>
        <button class="quick-action" data-type="custom">
          💬 <span>Custom Message</span>
        </button>
      </div>
      <div class="quick-menu-footer">
        <p>Average response time: <strong>2 minutes</strong></p>
      </div>
    `;
    document.body.appendChild(quickMenu);

    // Custom message modal
    const customModal = document.createElement('div');
    customModal.id = 'custom-message-modal';
    customModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Send Custom Message</h3>
          <button class="close-modal">×</button>
        </div>
        <div class="modal-body">
          <textarea id="custom-message" placeholder="Type your message here..." maxlength="500"></textarea>
          <div class="character-count">
            <span id="char-count">0</span>/500 characters
          </div>
        </div>
        <div class="modal-footer">
          <button id="send-custom" class="send-btn">Send via WhatsApp</button>
        </div>
      </div>
    `;
    document.body.appendChild(customModal);
  }

  createQuickActionMenu() {
    // Add quick WhatsApp buttons to key pages
    const pages = ['services', 'pricing', 'tools', 'about'];
    pages.forEach(page => {
      if (window.location.pathname.includes(page) || window.location.pathname.includes('index')) {
        this.addPageSpecificButtons();
      }
    });
  }

  addPageSpecificButtons() {
    // Add WhatsApp CTA buttons throughout the site
    const ctaButtons = document.querySelectorAll('.cta-button, .get-started-btn');
    ctaButtons.forEach(button => {
      if (!button.querySelector('.whatsapp-cta')) {
        const whatsappCTA = document.createElement('button');
        whatsappCTA.className = 'whatsapp-cta';
        whatsappCTA.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Get Instant Help
        `;
        whatsappCTA.onclick = () => this.openQuickMenu();
        button.parentNode.insertBefore(whatsappCTA, button.nextSibling);
      }
    });
  }

  bindEvents() {
    const whatsappFloat = document.getElementById('whatsapp-float');
    const quickMenu = document.getElementById('whatsapp-quick-menu');
    const closeMenu = document.querySelector('.close-menu');
    const quickActions = document.querySelectorAll('.quick-action');
    const customModal = document.getElementById('custom-message-modal');
    const closeModal = document.querySelector('.close-modal');
    const customMessage = document.getElementById('custom-message');
    const charCount = document.getElementById('char-count');
    const sendCustom = document.getElementById('send-custom');

    // Float button click
    whatsappFloat.addEventListener('click', () => this.openQuickMenu());

    // Close menu
    closeMenu.addEventListener('click', () => this.closeQuickMenu());

    // Quick actions
    quickActions.forEach(action => {
      action.addEventListener('click', () => {
        const type = action.dataset.type;
        if (type === 'custom') {
          this.openCustomModal();
        } else {
          this.sendPredefinedMessage(type);
        }
      });
    });

    // Custom modal events
    closeModal.addEventListener('click', () => this.closeCustomModal());
    customMessage.addEventListener('input', () => {
      charCount.textContent = customMessage.value.length;
    });
    sendCustom.addEventListener('click', () => this.sendCustomMessage());

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!quickMenu.contains(e.target) && !whatsappFloat.contains(e.target)) {
        this.closeQuickMenu();
      }
      if (e.target === customModal) {
        this.closeCustomModal();
      }
    });
  }

  openQuickMenu() {
    const quickMenu = document.getElementById('whatsapp-quick-menu');
    quickMenu.classList.add('menu-open');
    
    // Hide chat widget temporarily to avoid overlap
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
      chatWindow.style.zIndex = '998';
    }
  }

  closeQuickMenu() {
    const quickMenu = document.getElementById('whatsapp-quick-menu');
    quickMenu.classList.remove('menu-open');
    
    // Restore chat widget z-index
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
      chatWindow.style.zIndex = '999';
    }
  }

  openCustomModal() {
    const modal = document.getElementById('custom-message-modal');
    modal.classList.add('modal-open');
    document.getElementById('custom-message').focus();
    this.closeQuickMenu();
  }

  closeCustomModal() {
    const modal = document.getElementById('custom-message-modal');
    modal.classList.remove('modal-open');
    document.getElementById('custom-message').value = '';
    document.getElementById('char-count').textContent = '0';
  }

  sendPredefinedMessage(type) {
    let message = '';
    
    switch(type) {
      case 'emergency':
        message = `🚨 CYBERSECURITY EMERGENCY ALERT 🚨

We are currently experiencing a security incident and need immediate assistance. 

Please respond urgently with:
- Emergency response team contact
- Immediate action steps
- Available support options

Time is critical for our business security.`;
        break;
        
      case 'consultation':
        message = `Hello ShieldNest! 👋

I'm interested in your FREE cybersecurity assessment for my business.

Please provide information about:
- What the assessment includes
- How long it takes
- When we can schedule it
- Any preparation needed

Looking forward to securing our business with your expertise!`;
        break;
        
      case 'services':
        message = `Hi ShieldNest Team! 🛡️

I'd like to learn more about your cybersecurity services and pricing.

Specifically interested in:
- Available security packages
- Pricing for small/medium business
- What's included in each plan
- Implementation timeline

Could you please send me detailed information?`;
        break;
        
      case 'support':
        message = `Hello ShieldNest Support 🔧

I need technical assistance with:
- [Please describe your technical issue]

Current situation:
- System affected: 
- Urgency level: 
- Business impact:

Please advise on next steps for resolution.`;
        break;
        
      case 'training':
        message = `Hi ShieldNest! 🎓

I'm interested in cybersecurity training for our team.

Please provide details about:
- Available training programs
- Duration and format (online/in-person)
- Pricing per person/group
- Certification options
- Training schedule

We want to build a security-conscious culture in our organization.`;
        break;
    }
    
    this.sendToWhatsApp(message);
    this.closeQuickMenu();
  }

  sendCustomMessage() {
    const customMessage = document.getElementById('custom-message').value.trim();
    if (customMessage) {
      const formattedMessage = `Hello ShieldNest! 👋

${customMessage}

Looking forward to your response!`;
      this.sendToWhatsApp(formattedMessage);
      this.closeCustomModal();
    }
  }

  sendToWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${this.baseUrl}?text=${encodedMessage}`;
    
    // Track the interaction
    this.trackWhatsAppClick(message.substring(0, 50));
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  }

  trackWhatsAppClick(messagePreview) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', {
        'event_category': 'engagement',
        'event_label': messagePreview,
        'value': 1
      });
    }
    
    // Console log for development
    console.log('WhatsApp message sent:', messagePreview);
  }

  // Auto-populate messages based on page context
  getContextualMessage() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('pricing')) {
      return 'pricing';
    } else if (currentPage.includes('services')) {
      return 'services';
    } else if (currentPage.includes('tools')) {
      return 'support';
    } else if (currentPage.includes('incident-response')) {
      return 'emergency';
    } else {
      return 'consultation';
    }
  }
}

// Initialize enhanced WhatsApp integration
document.addEventListener('DOMContentLoaded', () => {
  new WhatsAppIntegration();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WhatsAppIntegration;
}
