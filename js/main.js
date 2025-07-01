// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Functionality
  const navbar = document.querySelector('.navbar');
  const navList = document.querySelector('.navbar ul');

  // Ensure mobile menu button exists on all pages
  let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  
  // Always create the button if it doesn't exist and we have a navbar
  if (!mobileMenuBtn && navbar) {
    mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('type', 'button');

    // Insert mobile menu button - ensure it's properly positioned
    const logo = navbar.querySelector('.logo');
    if (logo && logo.nextSibling) {
      navbar.insertBefore(mobileMenuBtn, logo.nextSibling);
    } else if (logo) {
      logo.parentNode.insertBefore(mobileMenuBtn, logo.nextSibling);
    } else {
      // If no logo found, add it as the first child
      navbar.insertBefore(mobileMenuBtn, navbar.firstChild);
    }
    
    console.log('Mobile menu button created successfully');
  }

  // Mobile menu toggle functionality
  function setupMobileMenu() {
    const currentMobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const currentNavList = document.querySelector('.navbar ul');
    const currentNavbar = document.querySelector('.navbar');

    if (currentMobileMenuBtn && currentNavList && currentNavbar) {
      // Remove any existing event listeners by cloning the button
      const newMobileMenuBtn = currentMobileMenuBtn.cloneNode(true);
      currentMobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, currentMobileMenuBtn);

      newMobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = currentNavList.classList.contains('mobile-active');
        console.log('Menu button clicked, current state:', isActive);

        if (isActive) {
          currentNavList.classList.remove('mobile-active');
          this.classList.remove('active');
          this.innerHTML = '☰';
          this.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = 'auto';
        } else {
          currentNavList.classList.add('mobile-active');
          this.classList.add('active');
          this.innerHTML = '✕';
          this.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden';
        }
      });

      // Close mobile menu when clicking on a link
      currentNavList.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
          currentNavList.classList.remove('mobile-active');
          newMobileMenuBtn.classList.remove('active');
          newMobileMenuBtn.innerHTML = '☰';
          newMobileMenuBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = 'auto';
        }
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!currentNavbar.contains(e.target) && currentNavList.classList.contains('mobile-active')) {
          currentNavList.classList.remove('mobile-active');
          newMobileMenuBtn.classList.remove('active');
          newMobileMenuBtn.innerHTML = '☰';
          newMobileMenuBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = 'auto';
        }
      });

      // Handle window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          currentNavList.classList.remove('mobile-active');
          newMobileMenuBtn.classList.remove('active');
          newMobileMenuBtn.innerHTML = '☰';
          newMobileMenuBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = 'auto';
        }
      });
    }
  }

  // Setup mobile menu
  setupMobileMenu();
  // Create theme toggle button
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.addEventListener('click', toggleTheme);
  document.body.appendChild(themeToggle);

  // Create floating action buttons
  const floatingIcons = document.createElement('div');
  floatingIcons.className = 'floating-icons';
  floatingIcons.innerHTML = `
    <a href="#services" class="floating-icon" title="Services">🛡️</a>
    <a href="#pricing" class="floating-icon" title="Pricing">💰</a>
    <a href="#contact" class="floating-icon" title="Contact">📞</a>
  `;
  document.body.appendChild(floatingIcons);

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.style.opacity = '1';
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll('.service-card, .pricing-card, .blog-card').forEach(card => {
    observer.observe(card);
  });

  // Parallax effect removed to prevent interference with mobile menu

// Form validation functions
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateForm(form) {
    const formData = new FormData(form);
    const errors = [];

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    requiredFields.forEach(field => {
      const value = formData.get(field);
      if (!value || value.trim() === '') {
        errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    });

    // Validate email format
    const email = formData.get('email');
    if (email && !validateEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    // Validate name length
    const name = formData.get('name');
    if (name && name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    // Validate message length
    const message = formData.get('message');
    if (message && message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    return errors;
  }

  function showFormMessage(message, isError = false) {
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
      messageEl.textContent = message;
      messageEl.style.color = isError ? '#ef4444' : '#22c55e';
      messageEl.style.display = 'block';

      // Clear message after 5 seconds
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
  }

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate form
      const errors = validateForm(this);
      if (errors.length > 0) {
        showFormMessage(`Please fix the following errors:\n${errors.join('\n')}`, true);
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Submit form
      fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          this.reset();
          showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', false);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact us via WhatsApp.', true);
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }
});

// Global function for mobile menu toggle (for backward compatibility)
function toggleMobileMenu() {
  const navList = document.querySelector('.navbar ul');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

  if (navList && mobileMenuBtn) {
    const isActive = navList.classList.contains('mobile-active');

    if (isActive) {
      navList.classList.remove('mobile-active');
      mobileMenuBtn.innerHTML = '☰';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
      navList.classList.add('mobile-active');
      mobileMenuBtn.innerHTML = '✕';
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
  }
}

function toggleTheme() {
  const body = document.body;
  const toggle = document.querySelector('.theme-toggle');

  body.classList.toggle('light-theme');
  toggle.classList.toggle('light');

  // Save preference
  localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  document.querySelector('.theme-toggle')?.classList.add('light');
}

// Enhanced typing effect for hero
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Add gradient text class to important elements
document.addEventListener('DOMContentLoaded', function() {
  const headers = document.querySelectorAll('h1, h2');
  headers.forEach(header => {
    if (header.textContent.includes('ShieldNest') || header.textContent.includes('Cyber')) {
      header.classList.add('gradient-text');
    }
  });
});


// Password Generator
function generatePassword() {
  const length = document.getElementById('password-length').value;
  const includeUppercase = document.getElementById('include-uppercase').checked;
  const includeLowercase = document.getElementById('include-lowercase').checked;
  const includeNumbers = document.getElementById('include-numbers').checked;
  const includeSymbols = document.getElementById('include-symbols').checked;

  let charset = '';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset === '') {
    alert('Please select at least one character type!');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  document.getElementById('generated-password').value = password;
  document.getElementById('copy-status').textContent = '';
}

function copyPassword() {
  const passwordField = document.getElementById('generated-password');
  if (passwordField.value === '') {
    alert('Please generate a password first!');
    return;
  }

  passwordField.select();
  document.execCommand('copy');
  document.getElementById('copy-status').textContent = '✅ Password copied to clipboard!';

  setTimeout(() => {
    document.getElementById('copy-status').textContent = '';
  }, 3000);
}

// Update password length display
document.addEventListener('DOMContentLoaded', function() {
  const lengthSlider = document.getElementById('password-length');
  const lengthDisplay = document.getElementById('length-display');

  if (lengthSlider && lengthDisplay) {
    lengthSlider.addEventListener('input', function() {
      lengthDisplay.textContent = this.value;
    });
  }
});

// Password Strength Checker
const passwordInput = document.getElementById('password-input');
const strengthText = document.getElementById('strength-text');

if (passwordInput && strengthText) {
  const strengthSpan = strengthText.querySelector('span');

  passwordInput.addEventListener('input', () => {
    const pwd = passwordInput.value;
    let score = 0;
    if (pwd.length > 7) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[\W]/.test(pwd)) score++;

    const strengths = ["Very Weak", "Weak", "Good", "Strong", "Excellent"];
    strengthSpan.textContent = strengths[score];
    strengthSpan.style.color = ["#f87171", "#facc15", "#60a5fa", "#22c55e", "#16a34a"][score];
  });
}

document.getElementById("contact-form").addEventListener("submit", function (e) {
  const message = document.getElementById("form-message");
  message.textContent = "Your message is being sent...";
});

const quizData = [
  {
    question: "Which of these is a strong password?",
    options: ["password123", "Qwerty", "P@55w0rd!2024", "abc123"],
    answer: "P@55w0rd!2024"
  },
  {
    question: "What is phishing?",
    options: ["A way to catch fish", "A cyberattack using fake emails", "Wi-Fi optimization", "A type of password"],
    answer: "A cyberattack using fake emails"
  },
  {
    question: "How often should you back up important data?",
    options: ["Never", "Once a year", "Every day or week", "Only after a crash"],
    answer: "Every day or week"
  }
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");

function loadQuestion() {
  nextBtn.style.display = "none";
  const q = quizData[currentQuestion];
  questionContainer.innerHTML = `<h3>${q.question}</h3>`;
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, correctAnswer) {
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("wrong");
    }
  });

  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionContainer.innerHTML = "<h3>Quiz Completed!</h3>";
  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";
  scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}.`;
}

loadQuestion();
// Input sanitization utility
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>'"&]/g, '').trim();
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Contact form handling with input sanitization
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const messageEl = document.getElementById('form-message');

      try {
        // Sanitize form inputs
        const formData = new FormData(this);
        const sanitizedData = new FormData();

        for (let [key, value] of formData.entries()) {
          const sanitizedValue = sanitizeInput(value);

          // Additional validation for email
          if (key === 'email' && !validateEmail(sanitizedValue)) {
            throw new Error('Please enter a valid email address');
          }

          sanitizedData.append(key, sanitizedValue);
        }

        messageEl.textContent = 'Sending message...';
        messageEl.style.color = '#3b82f6';

        const response = await fetch(this.action, {
          method: 'POST',
          body: sanitizedData
        });

        if (response.ok) {
          messageEl.textContent = 'Thank you! Your message has been sent successfully.';
          messageEl.style.color = '#22c55e';
          this.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        messageEl.textContent = error.message || 'Sorry, there was an error sending your message. Please try again.';
        messageEl.style.color = '#dc2626';
      }
    });
  }
});