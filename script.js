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