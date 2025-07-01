
function showResponsePlan(incidentType) {
  // Hide incident selector
  document.getElementById('incident-selector').style.display = 'none';
  
  // Hide all response plans
  const allPlans = document.querySelectorAll('.response-plan');
  allPlans.forEach(plan => plan.classList.remove('active'));
  
  // Show selected response plan
  const selectedPlan = document.getElementById(incidentType + '-plan');
  if (selectedPlan) {
    selectedPlan.classList.add('active');
  } else {
    console.log('Plan not found:', incidentType + '-plan');
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

function hideResponsePlan() {
  // Hide all response plans
  const allPlans = document.querySelectorAll('.response-plan');
  allPlans.forEach(plan => plan.classList.remove('active'));
  
  // Show incident selector
  document.getElementById('incident-selector').style.display = 'block';
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Add click handlers for checklist items
document.addEventListener('DOMContentLoaded', function() {
  const checklistItems = document.querySelectorAll('.checklist li');
  
  checklistItems.forEach(item => {
    item.addEventListener('click', function() {
      if (this.style.textDecoration === 'line-through') {
        this.style.textDecoration = 'none';
        this.style.opacity = '1';
        this.innerHTML = this.innerHTML.replace('☑', '☐');
      } else {
        this.style.textDecoration = 'line-through';
        this.style.opacity = '0.6';
        this.innerHTML = this.innerHTML.replace('☐', '☑');
      }
      updateProgress();
    });
  });
});

// Emergency contact quick dial
function emergencyCall(number) {
  if (confirm(`Call ${number} now?`)) {
    window.location.href = `tel:${number}`;
  }
}

// Print incident response plan
function printResponsePlan() {
  window.print();
}

// Export incident log
function exportIncidentLog() {
  const activePlan = document.querySelector('.response-plan.active');
  if (!activePlan) {
    alert('Please select an incident response plan first');
    return;
  }
  
  const activeSteps = activePlan.querySelectorAll('.response-step');
  let logContent = `INCIDENT RESPONSE LOG\n`;
  logContent += `Date: ${new Date().toLocaleString()}\n`;
  logContent += `Incident Type: ${activePlan.querySelector('h2').textContent}\n\n`;
  
  activeSteps.forEach((step, index) => {
    const title = step.querySelector('.step-title').textContent;
    const time = step.querySelector('.step-time').textContent;
    logContent += `STEP ${index + 1}: ${title}\n`;
    logContent += `Timeline: ${time}\n`;
    
    const checkedItems = step.querySelectorAll('.checklist li[style*="line-through"]');
    if (checkedItems.length > 0) {
      logContent += `Completed Actions:\n`;
      checkedItems.forEach(item => {
        logContent += `- ${item.textContent.replace('☑', '').trim()}\n`;
      });
    }
    logContent += `\n`;
  });
  
  // Create and download file
  const blob = new Blob([logContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `incident_response_log_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Calculate completion progress
function updateProgress() {
  const activePlan = document.querySelector('.response-plan.active');
  if (!activePlan) return;
  
  const allItems = activePlan.querySelectorAll('.checklist li');
  const checkedItems = activePlan.querySelectorAll('.checklist li[style*="line-through"]');
  
  if (allItems.length > 0) {
    const progress = Math.round((checkedItems.length / allItems.length) * 100);
    console.log(`Progress: ${progress}% (${checkedItems.length}/${allItems.length} tasks completed)`);
  }
}
