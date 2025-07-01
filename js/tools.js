
// Tools JavaScript Functions
document.addEventListener('DOMContentLoaded', function() {
  
  // Password Generator Functions
  const passwordLength = document.getElementById('password-length');
  const lengthDisplay = document.getElementById('length-display');
  
  if (passwordLength && lengthDisplay) {
    passwordLength.addEventListener('input', function() {
      lengthDisplay.textContent = this.value;
    });
  }

  // Quiz Data
  const quizData = [
    {
      question: "How often should you update your passwords?",
      options: ["Never", "Once a year", "Every 3-6 months", "Every day"],
      correct: 2
    },
    {
      question: "What is phishing?",
      options: ["A type of fish", "Fraudulent emails to steal information", "A computer virus", "A firewall feature"],
      correct: 1
    },
    {
      question: "What does HTTPS indicate?",
      options: ["High-speed internet", "Secure encrypted connection", "Website is popular", "Website is expensive"],
      correct: 1
    },
    {
      question: "What is two-factor authentication?",
      options: ["Using two passwords", "Two security guards", "Additional security layer beyond password", "Two different browsers"],
      correct: 2
    },
    {
      question: "How should you handle suspicious emails?",
      options: ["Delete immediately", "Forward to friends", "Click links to verify", "Reply asking for verification"],
      correct: 0
    },
    {
      question: "What is malware?",
      options: ["Good software", "Malicious software", "Male software", "Mail software"],
      correct: 1
    },
    {
      question: "How often should you backup your data?",
      options: ["Never", "Once a year", "Monthly", "Daily or weekly"],
      correct: 3
    },
    {
      question: "What is a VPN used for?",
      options: ["Faster internet", "Private secure connection", "Video calling", "File sharing"],
      correct: 1
    },
    {
      question: "What should you do if you suspect a security breach?",
      options: ["Ignore it", "Change passwords immediately", "Wait and see", "Restart computer"],
      correct: 1
    },
    {
      question: "What makes a password strong?",
      options: ["Short and simple", "Long with mixed characters", "Personal information", "Common words"],
      correct: 1
    }
  ];

  let currentQuizQuestion = 0;
  let quizScore = 0;
  let quizStarted = false;

  // Initialize quiz
  window.startQuiz = function() {
    currentQuizQuestion = 0;
    quizScore = 0;
    quizStarted = true;
    
    const startBtn = document.getElementById('quiz-start-btn');
    if (startBtn) {
      startBtn.style.display = 'none';
    }
    
    showQuizQuestion();
  };

  function showQuizQuestion() {
    if (currentQuizQuestion >= quizData.length) {
      showQuizResults();
      return;
    }

    const question = quizData[currentQuizQuestion];
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const progressEl = document.getElementById('quiz-progress');

    if (questionEl) {
      questionEl.textContent = `Question ${currentQuizQuestion + 1}: ${question.question}`;
    }

    if (optionsEl) {
      optionsEl.innerHTML = question.options.map((option, index) => 
        `<button onclick="selectQuizAnswer(${index})" class="btn-primary" style="display: block; width: 100%; margin: 0.5rem 0; padding: 1rem; text-align: left;">${option}</button>`
      ).join('');
    }

    if (progressEl) {
      progressEl.textContent = `Progress: ${currentQuizQuestion + 1} / ${quizData.length}`;
    }
  }

  window.selectQuizAnswer = function(selectedIndex) {
    const question = quizData[currentQuizQuestion];
    
    if (selectedIndex === question.correct) {
      quizScore++;
    }

    currentQuizQuestion++;
    setTimeout(showQuizQuestion, 500);
  };

  function showQuizResults() {
    const percentage = Math.round((quizScore / quizData.length) * 100);
    const resultsEl = document.getElementById('quiz-results');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const progressEl = document.getElementById('quiz-progress');

    let resultMessage = '';
    let resultColor = '';

    if (percentage >= 80) {
      resultMessage = '🎉 Excellent! You have strong cybersecurity knowledge.';
      resultColor = '#22c55e';
    } else if (percentage >= 60) {
      resultMessage = '👍 Good job! Consider reviewing some cybersecurity basics.';
      resultColor = '#f59e0b';
    } else {
      resultMessage = '📚 Consider cybersecurity training to improve your knowledge.';
      resultColor = '#ef4444';
    }

    if (questionEl) questionEl.textContent = 'Quiz Complete!';
    if (optionsEl) optionsEl.innerHTML = '';
    if (progressEl) progressEl.textContent = '';

    if (resultsEl) {
      resultsEl.innerHTML = `
        <div style="text-align: center; padding: 2rem; background: rgba(248, 250, 252, 0.8); border-radius: 15px; border: 1px solid rgba(59, 130, 246, 0.2);">
          <h3 style="color: ${resultColor}; margin-bottom: 1rem;">Your Score: ${quizScore}/${quizData.length} (${percentage}%)</h3>
          <p style="color: #64748b; margin-bottom: 2rem;">${resultMessage}</p>
          <button onclick="retakeQuiz()" class="btn-primary">Retake Quiz</button>
          <a href="services.html" class="btn-primary" style="margin-left: 1rem; text-decoration: none;">Get Professional Training</a>
        </div>
      `;
      resultsEl.style.display = 'block';
    }
  }

  window.retakeQuiz = function() {
    const resultsEl = document.getElementById('quiz-results');
    const startBtn = document.getElementById('quiz-start-btn');
    
    if (resultsEl) resultsEl.style.display = 'none';
    if (startBtn) {
      startBtn.style.display = 'block';
      startBtn.textContent = 'Retake Quiz';
    }
    
    const questionEl = document.getElementById('quiz-question');
    if (questionEl) questionEl.textContent = 'Click Retake Quiz to begin';
    
    quizStarted = false;
  };
});

// Password Generator
function generatePassword() {
  const length = parseInt(document.getElementById('password-length').value);
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
  
  // Clear copy status
  document.getElementById('copy-status').textContent = '';
}

// Copy Password to Clipboard
function copyPassword() {
  const passwordField = document.getElementById('generated-password');
  const copyStatus = document.getElementById('copy-status');
  
  if (passwordField.value === '') {
    copyStatus.textContent = 'Please generate a password first!';
    copyStatus.style.color = '#ef4444';
    return;
  }

  passwordField.select();
  passwordField.setSelectionRange(0, 99999); // For mobile devices

  try {
    document.execCommand('copy');
    copyStatus.textContent = '✅ Password copied to clipboard!';
    copyStatus.style.color = '#22c55e';
  } catch (err) {
    copyStatus.textContent = '❌ Failed to copy password';
    copyStatus.style.color = '#ef4444';
  }

  // Clear status after 3 seconds
  setTimeout(() => {
    copyStatus.textContent = '';
  }, 3000);
}

// Security Checklist Evaluation
function evaluateChecklist() {
  const checkboxes = document.querySelectorAll('#checklistForm input[type="checkbox"]');
  const resultsDiv = document.getElementById('checklist-results');
  
  let checkedCount = 0;
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) checkedCount++;
  });

  const percentage = Math.round((checkedCount / checkboxes.length) * 100);
  let securityLevel = '';
  let recommendations = '';
  let levelColor = '';

  if (percentage >= 90) {
    securityLevel = 'Excellent';
    levelColor = '#22c55e';
    recommendations = 'Your security posture is excellent! Continue with regular reviews and updates.';
  } else if (percentage >= 70) {
    securityLevel = 'Good';
    levelColor = '#f59e0b';
    recommendations = 'Good security foundation! Address the remaining items to strengthen your defenses.';
  } else if (percentage >= 50) {
    securityLevel = 'Needs Improvement';
    levelColor = '#f97316';
    recommendations = 'Your security needs attention. Focus on implementing the unchecked items urgently.';
  } else {
    securityLevel = 'Critical';
    levelColor = '#ef4444';
    recommendations = 'Critical security gaps detected! Immediate action required to protect your systems.';
  }

  resultsDiv.innerHTML = `
    <div style="text-align: center; padding: 2rem; background: rgba(248, 250, 252, 0.8); border-radius: 15px; border: 1px solid rgba(59, 130, 246, 0.2);">
      <h3 style="color: ${levelColor}; margin-bottom: 1rem;">Security Level: ${securityLevel}</h3>
      <p style="font-size: 1.5rem; font-weight: bold; color: ${levelColor}; margin-bottom: 1rem;">${percentage}% Complete</p>
      <p style="color: #64748b; margin-bottom: 2rem;">${recommendations}</p>
      <a href="services.html" class="btn-primary" style="text-decoration: none;">Get Professional Security Assessment</a>
    </div>
  `;
  
  resultsDiv.style.display = 'block';
  resultsDiv.scrollIntoView({ behavior: 'smooth' });
}
