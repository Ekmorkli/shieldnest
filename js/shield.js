let shieldRotation = 0;

function rotateShield() {
  shieldRotation += 90;
  const layers = document.querySelectorAll('.shield-layer');
  layers.forEach((layer, i) => {
    layer.style.transform = `rotateY(${shieldRotation + i * 90}deg) translateZ(${i * 20}px)`;
  });
}
