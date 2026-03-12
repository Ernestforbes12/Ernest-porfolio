// Select all nav links
const navLinks = document.querySelectorAll('.nav-links li');

// Loop through each link
navLinks.forEach(function(link) {

  link.addEventListener('click', function() {

    // Get the text of the clicked link e.g "About", "Projects"
    const linkText = link.textContent.toLowerCase();

    // Find the section with that id
    const targetSection = document.querySelector('#' + linkText);
   
    // Scroll smoothly to it
    if(targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

  });

});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {

  let current = '';

  sections.forEach(function(section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

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

//Project View Scroll Element//
const viewProjectsBtn = document.querySelector('.btn-primary');

viewProjectsBtn.addEventListener('click', function() {
  const projectsSection = document.querySelector('#projects');
  projectsSection.scrollIntoView({ behavior: 'smooth' });
});

//Footer Scroll Element//
const backToTop = document.querySelector('.footer-top');

backToTop.addEventListener('click', function() {
  const homeSection = document.querySelector('#home');
  homeSection.scrollIntoView({ behavior: 'smooth' });
});