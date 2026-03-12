// ── GSAP ANIMATIONS ──
gsap.registerPlugin(ScrollTrigger);

// Hero animation - elements slide in on page load
gsap.from(".hero-tag", { opacity: 0, y: -20, duration: 0.6, delay: 0.2 });
gsap.from(".hero-name", { opacity: 0, y: 40, duration: 0.8, delay: 0.4 });
gsap.from(".hero-title", { opacity: 0, y: 20, duration: 0.6, delay: 0.6 });
gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 0.6, delay: 0.8 });
gsap.from(".hero-buttons", { opacity: 0, y: 20, duration: 0.6, delay: 1.0 });
gsap.from(".hero-stats", { opacity: 0, y: 20, duration: 0.6, delay: 1.2 });
gsap.from(".hero-visual", { opacity: 0, x: 60, duration: 0.8, delay: 0.4 });

// About section animate in on scroll
gsap.from(".about-left", {
  scrollTrigger: { trigger: ".about", start: "top 80%" },
  opacity: 0, x: -60, duration: 0.8
});
gsap.from(".about-card", {
  scrollTrigger: { trigger: ".about-right", start: "top 80%" },
  opacity: 0, y: 40, duration: 0.6,
  stagger: 0.15
});

// Projects animate in on scroll
gsap.from(".project-card", {
  scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
  opacity: 0, y: 60, duration: 0.6,
  stagger: 0.2
});

// Skills animate in on scroll
gsap.from(".skill-row", {
  scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
  opacity: 0, x: -30, duration: 0.5,
  stagger: 0.1
});

// Contact animate in on scroll
gsap.from(".contact-left", {
  scrollTrigger: { trigger: ".contact", start: "top 80%" },
  opacity: 0, x: -60, duration: 0.8
});
gsap.from(".contact-form", {
  scrollTrigger: { trigger: ".contact", start: "top 80%" },
  opacity: 0, x: 60, duration: 0.8
});

// Section titles animate in on scroll
gsap.utils.toArray(".section-title").forEach(title => {
  gsap.from(title, {
    scrollTrigger: { trigger: title, start: "top 85%" },
    opacity: 0, y: 30, duration: 0.6
  });
});



// 1. DECLARATIONS FIRST
const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-links');
const viewProjectsBtn = document.querySelector('.btn-primary');
const backToTop = document.querySelector('.footer-top');

// 2. HAMBURGER MENU
hamburger.addEventListener('click', function() {
  navMenu.classList.toggle('open');
});

// 3. NAV SMOOTH SCROLL
navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    navMenu.classList.remove('open');
    const linkText = link.textContent.toLowerCase();
    const targetSection = document.querySelector('#' + linkText);
    if(targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 4. ACTIVE NAV ON SCROLL
window.addEventListener('scroll', function() {
  let current = '';
  sections.forEach(function(section) {
    const sectionTop = section.offsetTop;
    if(window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if(link.textContent.toLowerCase() === current) {
      link.classList.add('active');
    }
  });
});

// 5. VIEW MY PROJECTS BUTTON
viewProjectsBtn.addEventListener('click', function() {
  const projectsSection = document.querySelector('#projects');
  projectsSection.scrollIntoView({ behavior: 'smooth' });
});

// 6. BACK TO TOP
backToTop.addEventListener('click', function() {
  const homeSection = document.querySelector('#home');
  homeSection.scrollIntoView({ behavior: 'smooth' });
});