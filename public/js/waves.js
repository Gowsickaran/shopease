document.addEventListener("DOMContentLoaded", () => {
  // 🌊 Add animated wave to body
  const svgWave = document.createElement("div");
  svgWave.innerHTML = `
    <svg class="wave-svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
      <path d="M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z" fill="#3498db">
        <animate attributeName="d" dur="8s" repeatCount="indefinite"
          values="
            M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z;
            M0,100 C300,150 900,50 1200,100 L1200,200 L0,200 Z;
            M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z
          " />
      </path>
    </svg>
  `;
  document.body.appendChild(svgWave);

  // ⏳ Wait for wave to rise
  setTimeout(() => {
    const droplet = document.querySelector('.droplet');
    if (droplet) droplet.classList.add('active');

    // ⏳ Wait for droplet to fall
    setTimeout(() => {
      const loginPopup = document.getElementById('loginPopup');
      if (loginPopup) {
        loginPopup.classList.add('show');
      }
    }, 2000); // after droplet fall
  }, 2000); // after water rise
});
