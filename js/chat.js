
// Live Chat Widget
class LiveChatWidget {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createChatWidget();
    this.bindEvents();
    this.loadStoredMessages();
  }

  createChatWidget() {
    // Chat toggle button
    const chatToggle = document.createElement('div');
    chatToggle.id = 'chat-toggle';
    chatToggle.innerHTML = `
      <div class="chat-icon">💬</div>
      <div class="chat-badge" id="chat-badge">1</div>
    `;
    document.body.appendChild(chatToggle);

    // Chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chat-window';
    chatWindow.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="agent-avatar">🛡️</div>
          <div class="agent-details">
            <span class="agent-name">ShieldNest Support</span>
            <span class="agent-status">Online</span>
          </div>
        </div>
        <button id="chat-close" class="chat-close">×</button>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="message bot-message">
          <div class="message-avatar">🛡️</div>
          <div class="message-content">
            <p>Hello! Welcome to ShieldNest 👋</p>
            <p>How can we help secure your digital life today?</p>
          </div>
          <div class="message-time">${this.getCurrentTime()}</div>
        </div>
      </div>
      <div class="chat-input-area">
        <div class="quick-replies" id="quick-replies">
          <button class="quick-reply" data-message="I need help with cybersecurity">🔐 Cybersecurity Help</button>
          <button class="quick-reply" data-message="Tell me about your services">🛠️ Your Services</button>
          <button class="quick-reply" data-message="I want to get started">🚀 Get Started</button>
        </div>
        <div class="chat-input-container">
          <input type="text" id="chat-input" placeholder="Type your message..." maxlength="500">
          <button id="chat-send">Send</button>
        </div>
      </div>
    `;
    document.body.appendChild(chatWindow);
  }

  bindEvents() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const quickReplies = document.querySelectorAll('.quick-reply');

    chatToggle.addEventListener('click', () => this.toggleChat());
    chatClose.addEventListener('click', () => this.closeChat());
    chatSend.addEventListener('click', () => this.sendMessage());
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    quickReplies.forEach(button => {
      button.addEventListener('click', () => {
        this.sendMessage(button.dataset.message);
        document.getElementById('quick-replies').style.display = 'none';
      });
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chat-window');
    const chatToggle = document.getElementById('chat-toggle');
    const chatBadge = document.getElementById('chat-badge');

    if (this.isOpen) {
      chatWindow.classList.add('chat-open');
      chatToggle.classList.add('chat-active');
      chatBadge.style.display = 'none';
      document.getElementById('chat-input').focus();
    } else {
      chatWindow.classList.remove('chat-open');
      chatToggle.classList.remove('chat-active');
    }
  }

  closeChat() {
    this.isOpen = false;
    const chatWindow = document.getElementById('chat-window');
    const chatToggle = document.getElementById('chat-toggle');
    chatWindow.classList.remove('chat-open');
    chatToggle.classList.remove('chat-active');
  }

  sendMessage(messageText = null) {
    const input = document.getElementById('chat-input');
    const message = messageText || input.value.trim();
    
    if (!message) return;

    this.addMessage(message, 'user');
    input.value = '';

    // Simulate bot response
    setTimeout(() => {
      this.handleBotResponse(message);
    }, 1000);
  }

  addMessage(content, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = sender === 'user' ? '👤' : '🛡️';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <p>${content}</p>
      </div>
      <div class="message-time">${this.getCurrentTime()}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store message
    this.messages.push({ content, sender, time: new Date().toISOString() });
    this.saveMessages();
  }

  handleBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';

    if (lowerMessage.includes('service') || lowerMessage.includes('help')) {
      response = `We offer comprehensive cybersecurity and IT support services including:

🔒 CYBERSECURITY:
🔍 Security audits & assessments
🦠 Virus removal & system recovery
🔐 Network protection & firewall setup
📊 Compliance checking
🚨 Emergency incident response

💻 IT SUPPORT:
⚙️ Computer repair & maintenance
🌐 Network setup & Wi-Fi configuration
🖨️ Printer & peripheral support
📱 Mobile device setup
☁️ Cloud services & backup solutions

Would you like to know more about any specific service?`;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = `Our pricing is very affordable! 💰

Basic Protection: ₵200/month
Business Security: ₵500/month
Enterprise Suite: ₵1,200/month

All plans include 24/7 support. Would you like a free consultation to determine the best plan for you?`;
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('breach') || lowerMessage.includes('attack')) {
      response = `🚨 This sounds like an emergency! 

For immediate assistance:
📞 Call us: +233 53 998 5980
💬 WhatsApp: https://wa.me/233539985980

Our emergency response team is available 24/7. We can help with ransomware, data breaches, and other security incidents.`;
    } else if (lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      response = `Great! Let's get you started with ShieldNest 🚀

I can help you:
1. Schedule a free cybersecurity assessment
2. Choose the right protection plan
3. Get emergency support

What would you prefer? Or would you like to speak directly with our team on WhatsApp?`;
    } else {
      response = `Thanks for your message! 😊

For immediate assistance, you can:
📞 Call us: +233 53 998 5980
💬 WhatsApp: https://wa.me/233539985980

Our cybersecurity experts are ready to help secure your digital life. What specific area would you like help with?`;
    }

    this.addMessage(response, 'bot');
  }

  getCurrentTime() {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  }

  saveMessages() {
    localStorage.setItem('shieldnest_chat_messages', JSON.stringify(this.messages));
  }

  loadStoredMessages() {
    const stored = localStorage.getItem('shieldnest_chat_messages');
    if (stored) {
      this.messages = JSON.parse(stored);
    }
  }
}

// Initialize chat widget when page loads
document.addEventListener('DOMContentLoaded', () => {
  new LiveChatWidget();
});
