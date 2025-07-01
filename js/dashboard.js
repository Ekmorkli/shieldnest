// Fake Ghanaian regions for simulation
const regions = ["Greater Accra", "Ashanti", "Volta", "Eastern", "Northern"];

let threatsBlocked = 0;

function updateDashboard() {
  threatsBlocked += Math.floor(Math.random() * 10 + 1);
  document.getElementById("threat-counter").textContent = threatsBlocked.toLocaleString();

  // Simulate system health
  const health = ["Excellent", "Good", "Warning"][Math.floor(Math.random() * 3)];
  document.getElementById("system-health").textContent = health;
  document.getElementById("system-health").style.color = (health === "Warning") ? "#f97316" : "#22c55e";

  // Simulate top attack region
  const region = regions[Math.floor(Math.random() * regions.length)];
  document.getElementById("top-region").textContent = region;
}

// Run update every 3 seconds
setInterval(updateDashboard, 3000);
