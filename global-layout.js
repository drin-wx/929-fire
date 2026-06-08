document.addEventListener("DOMContentLoaded", () => {
  // Inject Header / Navbar
  const navbarHTML = `
    <nav class="navbar">
      <div class="logo-area">
        <img src="image/929.png.png" alt="929 Logo">
        <div class="logo-title">
          <h1>929 FIRE AND RESCUE VOLUNTEER</h1>
          <span>Save Lives and Properties</span>
        </div>
      </div>
      <div class="menu-toggle" id="menuToggleBtn">☰</div>
      <div class="menu" id="navMenu">
        <a href="/" id="nav-home">HOME</a>
        <a href="/officer" id="nav-officer">OFFICERS</a>
        <a href="/rules-regulation" id="nav-rules">RULES & REGULATION</a>
        <a href="/about" id="nav-about">ABOUT</a>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  // Setup Dynamic Active Navigation Link base sa URL path
  const currentPath = window.location.pathname;
  if (currentPath.includes("officer")) document.getElementById("nav-officer")?.classList.add("active");
  else if (currentPath.includes("rules-regulation")) document.getElementById("nav-rules")?.classList.add("active");
  else if (currentPath.includes("about")) document.getElementById("nav-about")?.classList.add("active");
  else document.getElementById("nav-home")?.classList.add("active");

  // Inject Footer at Details Modal sa hulihan ng body
  const footerAndModalHTML = `
    <div class="modal" id="detailsModal">
      <div class="modal-content">
        <h3>ALERTS DETAILS</h3>
        <div class="modal-body" id="modalDetails"></div>
        <div class="modal-actions">
          <button class="btn-modal btn-copy" id="copyBtn">Copy</button>
          <button class="btn-modal btn-share" id="shareBtn">Share</button>
          <button class="btn-modal btn-close" id="closeModalBtn">Close</button>
        </div>
      </div>
    </div>

    <footer class="footer" id="about">
      <div class="footer-bottom-grid">
        <div class="info-grid">
          <div>
            <h4>Our Mission</h4>
            <p>To serve our community with the highest level of care, protection, and education by providing timely and efficient emergency response and proactive safety awareness.</p>
          </div>
          <div>
            <h4>Our Vision</h4>
            <p>To be a leading and trusted emergency service provider in the Philippines, driven by innovation, dedication, and excellence in public safety and education.</p>
          </div>
        </div>
        <div class="social-legal">
          <a href="https://facebook.com/929Volunteers" class="fb-link">
            <img src="image/facebook.png" alt="FB"> 929 FIRE AND RESCUE VOLUNTEER
          </a>
          <p style="font-size: 0.8rem; opacity: 0.6;">&copy; 2026 - 929 Fire & Rescue Volunteer, Radio Communication Group Inc.
             <br> <br>"Save Lives and Properties"</p>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML("beforeend", footerAndModalHTML);

  // Menu Toggle handler para sa mobile view
  const menuToggle = document.getElementById("menuToggleBtn");
  const navMenu = document.getElementById("navMenu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});