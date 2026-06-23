document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Advanced Fixed Responsive Navbar
  const navbarHTML = `
    <nav class="navbar">
      <a href="/" class="logo-area">
        <img src="image/929.png.png" alt="929 Logo">
        <div class="logo-title">
          <h1>929 FIRE AND RESCUE VOLUNTEER</h1>
          <span>Save Lives and Properties</span>
        </div>
      </a>
      <button class="menu-toggle" id="menuToggleBtn" aria-label="Toggle Navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="menu" id="navMenu">
        <li class="menu-item"><a href="/" id="nav-home">HOME</a></li>
        <li class="menu-item">
          <button class="dropdown-toggle" id="nav-officials">OFFICIALS ▾</button>
          <div class="dropdown-menu">
            <a href="/members">Members</a>
            <a href="/officers">Officers</a>
          </div>
        </li>
        <li class="menu-item"><a href="/rules-regulation" id="nav-rules">RULES & REGULATION</a></li>
        <li class="menu-item"><a href="/contact" id="nav-contact">CONTACT</a></li>
        <li class="menu-item"><a href="/support" id="nav-support">SUPPORT</a></li>
      </ul>
    </nav>
  `;
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  // Active States Mapping
  const path = window.location.pathname;
  if (path.includes("officer") || path.includes("probies")) document.getElementById("nav-officials")?.classList.add("active");
  else if (path.includes("rules") || path.includes("regulation")) document.getElementById("nav-rules")?.classList.add("active");
  else if (path.includes("about")) document.getElementById("nav-about")?.classList.add("active");
  else if (path.includes("alerts") || path.includes("updates")) document.getElementById("nav-pages")?.classList.add("active");
  else document.getElementById("nav-home")?.classList.add("active");

  // Mobile Controls Toggle
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const navMenu = document.getElementById("navMenu");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener("click", () => {
      menuToggleBtn.classList.toggle("open");
      navMenu.classList.toggle("active");
    });
  }

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 850) {
        e.preventDefault();
        e.stopPropagation();
        const parent = toggle.parentElement;
        document.querySelectorAll(".menu-item").forEach(item => {
          if (item !== parent) item.classList.remove("open-dropdown");
        });
        parent.classList.toggle("open-dropdown");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 850 && !e.target.closest(".navbar")) {
      menuToggleBtn?.classList.remove("open");
      navMenu?.classList.remove("active");
      document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("open-dropdown"));
    }
  });

  // 2. Slow Motion Clear 3-Slide Carousel Overlay Engine
  const slides = document.querySelectorAll(".main-slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000); // Lilipat nang maayos kada 5 segundo nang walang kahit anong blur sa mismong imahe
  }

  // 3. Inject Clean Footer Architecture
  const footerHTML = `
    <footer class="footer">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Our Offered Services</h4>
          <ul>
            <li>Emergency Medical Services (EMS)</li>
            <li>Stand-by Medical Support (SMS)</li>
            <li>Disaster Radio Communications & Command Support</li>
            <li>Community Hazard Awareness & Safety Trainings</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Group</h4>
          <ul>
            <li><a href="/index">Home</a></li>
             <li><a href="/officer">Officer</a></li>
            <li><a href="/rules-regulations">Rules & Regulations</a></li>
            <li><a href="/contact">Contact</a></li>
             <li><a href="/support">Support</a></li>
            <li><a href="/login">Account Login</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/cookie-policy">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <a href="https://facebook.com/929Volunteers" class="fb-brand" target="_blank">
          <img src="image/facebook.png" alt="FB" class="fb-icon">
          <span>929 FIRE AND RESCUE VOLUNTEER</span>
          <img src="image/meta.png" alt="" class="custom-badge"> <!-- Eto na yung blank image space para sayo pagkatapos ng text -->
        </a>
        <div class="copyright">
          &copy; 2026 929 Fire Rescue Volunteer Radio Communication Group Inc.<br>
          "Save Lives and Properties"
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML("beforeend", footerHTML);
});
