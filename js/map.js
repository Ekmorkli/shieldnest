document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("ghanaMap");
  const label = document.getElementById("region-highlight");

  map.addEventListener("load", () => {
    const svgDoc = map.contentDocument;
    const regions = svgDoc.querySelectorAll("path");

    regions.forEach((region) => {
      region.addEventListener("mouseover", () => {
        label.textContent = `You're viewing: ${region.id}`;
        region.style.fill = "#38bdf8";
      });

      region.addEventListener("mouseout", () => {
        label.textContent = "Hover over a region to learn more";
        region.style.fill = "#94a3b8";
      });

      region.addEventListener("click", () => {
        alert(`Service available in ${region.id}! Contact us to schedule.`);
      });
    });
  });
});
