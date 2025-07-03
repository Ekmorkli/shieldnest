// Main JavaScript functionality
// Use a MutationObserver to ensure the navbar is fully loaded before proceeding
const observer = new MutationObserver((mutationsList, observer) => {
    const navbar = document.querySelector('.navbar');
    const navList = document.querySelector('.navbar ul'); // Get navList here as it's a child of navbar

    if (navbar && navList) {
        // Stop observing once the navbar and navList are found
        observer.disconnect();
        console.log('Navbar and NavList found, proceeding with setup.');

        // --- Mobile Menu Button Creation and Setup ---
        let mobileMenuBtn = document.querySelector('.mobile-menu-btn');

        // Always create the button if it doesn't exist.
        // We'll simplify the insertion to always prepend it for consistency.
        if (!mobileMenuBtn) {
            mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('type', 'button');

            // Prepend the button to the navbar
            navbar.prepend(mobileMenuBtn); // Simpler and less error-prone
            console.log('Mobile menu button created and prepended successfully.');
        }

        // Now that we're sure the elements exist (and button is present/created),
        // set up the mobile menu listeners.
        setupMobileMenuListeners(mobileMenuBtn, navList, navbar);
        console.log('Mobile menu listeners initiated.');

        // --- Rest of your DCL dependent code that needs navbar/elements ---

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

        const scrollObserver = new IntersectionObserver((entries) => { // Renamed to avoid conflict
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observe all cards
        document.querySelectorAll('.service-card, .pricing-card, .blog-card').forEach(card => {
            scrollObserver.observe(card);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.querySelector('.theme-toggle')?.classList.add('light');
        }

        // Add gradient text class to important elements
        const headers = document.querySelectorAll('h1, h2');
        headers.forEach(header => {
            if (header.textContent.includes('ShieldNest') || header.textContent.includes('Cyber')) {
                header.classList.add('gradient-text');
            }
        });

        // Contact form initial message (ensure it targets correct form)
        document.getElementById("contact-form")?.addEventListener("submit", function (e) {
            const message = document.getElementById("form-message");
            if (message) {
                message.textContent = "Your message is being sent...";
            }
        });

        // Initialize quiz if elements are present
        if (document.getElementById("question-container") && document.getElementById("options-container") && document.getElementById("next-btn") && document.getElementById("score-display")) {
            loadQuestion();
        }

    }
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });

// --- Helper Functions (defined outside MutationObserver scope but used within) ---

// Mobile menu toggle functionality
function setupMobileMenuListeners(button, navListElement, navbarElement) {
    // Remove any existing event listeners by cloning the button (most robust way)
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button); // Replace the old button with the new one

    // Add event listeners to the new button
    newButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = navListElement.classList.contains('mobile-active');
        console.log('Menu button clicked, current state:', isActive);

        if (isActive) {
            navListElement.classList.remove('mobile-active');
            this.classList.remove('active');
            this.innerHTML = '☰';
            this.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        } else {
            navListElement.classList.add('mobile-active');
            this.classList.add('active');
            this.innerHTML = '✕';
            this.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Disable scrolling
        }
    });

    // Close mobile menu when clicking on a link
    navListElement.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navListElement.classList.remove('mobile-active');
            newButton.classList.remove('active');
            newButton.innerHTML = '☰';
            newButton.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        // Check if the click is outside the navbar (which contains both button and nav list)
        if (!navbarElement.contains(e.target) && navListElement.classList.contains('mobile-active')) {
            navListElement.classList.remove('mobile-active');
            newButton.classList.remove('active');
            newButton.innerHTML = '☰';
            newButton.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navListElement.classList.contains('mobile-active')) {
            navListElement.classList.remove('mobile-active');
            newButton.classList.remove('active');
            newButton.innerHTML = '☰';
            newButton.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    });
}

// Global function for mobile menu toggle (for backward compatibility - not strictly used internally now)
function toggleMobileMenu() {
    const navList = document.querySelector('.navbar ul');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (navList && mobileMenuBtn) {
        const isActive = navList.classList.contains('mobile-active');

        if (isActive) {
            navList.classList.remove('mobile-active');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        } else {
            navList.classList.add('mobile-active');
            mobileMenuBtn.innerHTML = '✕';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }
}

function toggleTheme() {
    const body = document.body;
    const toggle = document.querySelector('.theme-toggle');

    body.classList.toggle('light-theme');
    toggle.classList.toggle('light');

    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
}


// Enhanced typing effect for hero (Consider calling this only on pages with hero section)
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


// Password Generator
function generatePassword() {
    const lengthInput = document.getElementById('password-length');
    const uppercaseCheckbox = document.getElementById('include-uppercase');
    const lowercaseCheckbox = document.getElementById('include-lowercase');
    const numbersCheckbox = document.getElementById('include-numbers');
    const symbolsCheckbox = document.getElementById('include-symbols');
    const generatedPasswordField = document.getElementById('generated-password');
    const copyStatus = document.getElementById('copy-status');

    if (!lengthInput || !uppercaseCheckbox || !lowercaseCheckbox || !numbersCheckbox || !symbolsCheckbox || !generatedPasswordField || !copyStatus) {
        console.warn('Password generator elements not found.');
        return;
    }

    const length = lengthInput.value;
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

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

    generatedPasswordField.value = password;
    copyStatus.textContent = '';
}

function copyPassword() {
    const passwordField = document.getElementById('generated-password');
    const copyStatus = document.getElementById('copy-status');

    if (!passwordField || !copyStatus) {
        console.warn('Copy password elements not found.');
        return;
    }

    if (passwordField.value === '') {
        alert('Please generate a password first!');
        return;
    }

    passwordField.select();
    document.execCommand('copy');
    copyStatus.textContent = '✅ Password copied to clipboard!';

    setTimeout(() => {
        copyStatus.textContent = '';
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
    if (strengthSpan) { // Ensure span exists
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
}

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

// Check if quiz elements exist before trying to manipulate them
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");

function loadQuestion() {
    if (!questionContainer || !optionsContainer || !nextBtn) return;

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
    if (!optionsContainer || !nextBtn) return;

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

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showScore();
        }
    });
}

function showScore() {
    if (!questionContainer || !optionsContainer || !nextBtn || !scoreDisplay) return;

    questionContainer.innerHTML = "<h3>Quiz Completed!</h3>";
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
    scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}.`;
}


// Input sanitization utility
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    // Basic sanitization: remove HTML tags and trim whitespace
    return input.replace(/<script[^>]*>.*?<\/script>/gi, '')
                .replace(/<[^>]*>/g, '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
                .trim();
}

// Contact form handling with input sanitization
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const messageEl = document.getElementById('form-message');
            const submitBtn = this.querySelector('button[type="submit"]');

            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                try {
                    // Sanitize form inputs
                    const formData = new FormData(this);
                    const sanitizedData = new FormData();

                    let hasError = false; // Flag to track if any validation error occurred

                    for (let [key, value] of formData.entries()) {
                        const sanitizedValue = sanitizeInput(value);

                        // Validation checks
                        if (key === 'email') {
                            if (!validateEmail(sanitizedValue)) {
                                hasError = true;
                                throw new Error('Please enter a valid email address.');
                            }
                        } else if (key === 'name') {
                            if (sanitizedValue.length < 2) {
                                hasError = true;
                                throw new Error('Name must be at least 2 characters long.');
                            }
                        } else if (key === 'message') {
                            if (sanitizedValue.length < 10) {
                                hasError = true;
                                throw new Error('Message must be at least 10 characters long.');
                            }
                        } else if (key === 'subject') {
                            if (sanitizedValue.length < 3) {
                                hasError = true;
                                throw new Error('Subject must be at least 3 characters long.');
                            }
                        }

                        // Append sanitized value
                        sanitizedData.append(key, sanitizedValue);
                    }

                    if (hasError) { // If any error occurred during the loop, re-throw to go to catch block
                        return; // The error was already thrown, just exit
                    }


                    if (messageEl) {
                        messageEl.textContent = 'Sending message...';
                        messageEl.style.color = '#3b82f6';
                    }

                    const response = await fetch(this.action, {
                        method: 'POST',
                        body: sanitizedData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        if (messageEl) {
                            messageEl.textContent = 'Thank you! Your message has been sent successfully.';
                            messageEl.style.color = '#22c55e';
                        }
                        this.reset();
                    } else {
                        const errorData = await response.json().catch(() => ({ message: 'Unknown server error.' }));
                        throw new Error(errorData.message || 'Network response was not ok. Please check your form action.');
                    }
                } catch (error) {
                    console.error('Form Submission Error:', error);
                    if (messageEl) {
                        messageEl.textContent = error.message || 'Sorry, there was an error sending your message. Please try again.';
                        messageEl.style.color = '#dc2626';
                    }
                } finally {
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                    if (messageEl) {
                        setTimeout(() => {
                            messageEl.style.display = 'none';
                        }, 5000);
                    }
                }
            }
        });
    }
});
