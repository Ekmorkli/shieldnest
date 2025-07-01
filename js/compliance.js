
// Compliance Checker JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const complianceData = {
    'data-protection': {
      title: '🔒 Data Protection & Privacy',
      questions: [
        'Do you have a privacy policy published on your website?',
        'Do you obtain explicit consent before collecting personal data?',
        'Do you have processes for handling data subject requests?',
        'Is personal data encrypted when stored and transmitted?',
        'Do you conduct regular data protection impact assessments?'
      ]
    },
    'access-control': {
      title: '👤 Access Control & Authentication',
      questions: [
        'Do you use multi-factor authentication for admin accounts?',
        'Are user passwords required to meet complexity requirements?',
        'Do you regularly review and update user access permissions?',
        'Are privileged accounts properly monitored and logged?',
        'Do you have account lockout policies for failed login attempts?'
      ]
    },
    'network-security': {
      title: '🌐 Network Security',
      questions: [
        'Do you use firewalls to protect your network perimeter?',
        'Are all software systems regularly updated with security patches?',
        'Do you use antivirus/anti-malware solutions?',
        'Is network traffic monitored for suspicious activity?',
        'Do you have a secure Wi-Fi configuration?'
      ]
    },
    'incident-response': {
      title: '🚨 Incident Response',
      questions: [
        'Do you have a documented incident response plan?',
        'Are employees trained on how to report security incidents?',
        'Do you regularly test your incident response procedures?',
        'Do you have contact information for relevant authorities?',
        'Are incident response activities logged and reviewed?'
      ]
    }
  };

  let currentCategory = 'data-protection';
  let responses = {};

  function initializeCompliance() {
    createCategoryButtons();
    showCategory(currentCategory);
    updateProgressBar();
  }

  function createCategoryButtons() {
    const categoriesContainer = document.querySelector('.compliance-categories');
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = '';
    
    Object.keys(complianceData).forEach(categoryId => {
      const button = document.createElement('button');
      button.className = 'category-btn';
      button.textContent = complianceData[categoryId].title;
      button.onclick = () => showCategory(categoryId);
      
      if (categoryId === currentCategory) {
        button.classList.add('active');
      }
      
      categoriesContainer.appendChild(button);
    });
  }

  function showCategory(categoryId) {
    currentCategory = categoryId;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event?.target?.classList.add('active');
    
    // Show category content
    const container = document.getElementById('compliance-container');
    if (!container) return;

    const existingCategory = container.querySelector('.compliance-category.active');
    if (existingCategory) {
      existingCategory.classList.remove('active');
    }

    let categoryDiv = document.getElementById(`category-${categoryId}`);
    if (!categoryDiv) {
      categoryDiv = createCategoryDiv(categoryId);
      container.appendChild(categoryDiv);
    }
    
    categoryDiv.classList.add('active');
    updateProgressBar();
  }

  function createCategoryDiv(categoryId) {
    const categoryData = complianceData[categoryId];
    const div = document.createElement('div');
    div.id = `category-${categoryId}`;
    div.className = 'compliance-category';
    
    div.innerHTML = `
      <h3>${categoryData.title}</h3>
      <div class="compliance-questions">
        ${categoryData.questions.map((question, index) => `
          <div class="compliance-question">
            <label>
              <input type="checkbox" name="${categoryId}-${index}" onchange="updateResponse('${categoryId}', ${index}, this.checked)">
              <span>${question}</span>
            </label>
          </div>
        `).join('')}
      </div>
    `;
    
    return div;
  }

  function updateResponse(categoryId, questionIndex, checked) {
    // Input sanitization
    const sanitizedCategoryId = sanitizeInput(categoryId);
    const sanitizedQuestionIndex = parseInt(questionIndex, 10);
    
    if (!sanitizedCategoryId || isNaN(sanitizedQuestionIndex)) {
      console.warn('Invalid input parameters for updateResponse');
      return;
    }

    if (!responses[sanitizedCategoryId]) {
      responses[sanitizedCategoryId] = {};
    }
    responses[sanitizedCategoryId][sanitizedQuestionIndex] = Boolean(checked);
    updateProgressBar();
  }

  function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>'"&]/g, '').trim();
  }

  function updateProgressBar() {
    const totalQuestions = Object.values(complianceData).reduce((total, category) => total + category.questions.length, 0);
    const answeredQuestions = Object.values(responses).reduce((total, category) => total + Object.keys(category).length, 0);
    
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
      const percentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
      progressBar.style.width = `${percentage}%`;
    }
  }

  function calculateResults() {
    const results = {
      overall: 0,
      categories: {},
      recommendations: []
    };

    let totalQuestions = 0;
    let totalPositive = 0;

    Object.keys(complianceData).forEach(categoryId => {
      const categoryQuestions = complianceData[categoryId].questions.length;
      const categoryResponses = responses[categoryId] || {};
      const categoryPositive = Object.values(categoryResponses).filter(response => response).length;
      
      totalQuestions += categoryQuestions;
      totalPositive += categoryPositive;
      
      const categoryScore = categoryQuestions > 0 ? (categoryPositive / categoryQuestions) * 100 : 0;
      results.categories[categoryId] = {
        score: Math.round(categoryScore),
        title: complianceData[categoryId].title
      };

      // Generate recommendations
      if (categoryScore < 80) {
        results.recommendations.push(`Improve ${complianceData[categoryId].title.toLowerCase()}`);
      }
    });

    results.overall = totalQuestions > 0 ? Math.round((totalPositive / totalQuestions) * 100) : 0;
    
    return results;
  }

  function displayResults() {
    const results = calculateResults();
    const resultsContainer = document.querySelector('.compliance-results') || createResultsContainer();
    
    resultsContainer.innerHTML = `
      <div class="results-header">
        <h3>📊 Your Compliance Assessment Results</h3>
      </div>
      
      <div class="score-display">
        <div class="score-circle">
          <span>${results.overall}%</span>
          <p>Overall Score</p>
        </div>
      </div>
      
      <div class="category-scores">
        ${Object.entries(results.categories).map(([categoryId, data]) => `
          <div class="category-score">
            <h4>${data.title}</h4>
            <span>${data.score}%</span>
          </div>
        `).join('')}
      </div>
      
      <div class="recommendations">
        <h4>🎯 Recommendations for Improvement</h4>
        <ul>
          ${results.recommendations.length > 0 ? 
            results.recommendations.map(rec => `<li>${rec}</li>`).join('') :
            '<li>Great job! You\'re meeting most compliance requirements.</li>'
          }
          <li>Schedule regular compliance reviews every 6 months</li>
          <li>Consider professional cybersecurity consultation</li>
          <li>Implement employee training programs</li>
        </ul>
      </div>
      
      <div class="next-steps">
        <h4>🚀 Ready to Improve Your Security?</h4>
        <p>Contact ShieldNest for personalized compliance assistance and cybersecurity improvements.</p>
        <a href="https://wa.me/233539985980" target="_blank" class="btn-primary">Get Professional Help</a>
      </div>
    `;
    
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }

  function createResultsContainer() {
    const container = document.createElement('div');
    container.className = 'compliance-results';
    container.style.display = 'none';
    document.getElementById('compliance-container').appendChild(container);
    return container;
  }

  function resetAssessment() {
    responses = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    const resultsContainer = document.querySelector('.compliance-results');
    if (resultsContainer) {
      resultsContainer.style.display = 'none';
    }
    
    updateProgressBar();
    showCategory('data-protection');
  }

  // Global functions
  window.updateResponse = updateResponse;
  window.showCategory = showCategory;
  window.displayResults = displayResults;
  window.resetAssessment = resetAssessment;

  // Initialize when DOM is ready
  initializeCompliance();

  // Intersection Observer for animations
  const sections = document.querySelectorAll('.compliance-section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});
