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

// Skill bars fill up on scroll
gsap.utils.toArray(".skill-fill").forEach(bar => {
  const targetWidth = bar.style.width;
  gsap.from(bar, {
    scrollTrigger: { trigger: bar, start: "top 90%" },
    width: "0%",
    duration: 1.2,
    ease: "power2.out"
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

// ── THREE.JS HERO BACKGROUND ──
const canvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
camera.position.z = 80;

// Create particles
const particleCount = 120;
const positions = [];
const velocities = [];

for (let i = 0; i < particleCount; i++) {
  positions.push({
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 200,
    z: (Math.random() - 0.5) * 50
  });
  velocities.push({
    x: (Math.random() - 0.5) * 0.15,
    y: (Math.random() - 0.5) * 0.15
  });
}

// Particle dots
const dotGeometry = new THREE.BufferGeometry();
const dotPositions = new Float32Array(particleCount * 3);
positions.forEach((p, i) => {
  dotPositions[i * 3] = p.x;
  dotPositions[i * 3 + 1] = p.y;
  dotPositions[i * 3 + 2] = p.z;
});
dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
const dotMaterial = new THREE.PointsMaterial({
  color: 0x00f5c4,
  size: 1.2,
  transparent: true,
  opacity: 0.7
});
const dots = new THREE.Points(dotGeometry, dotMaterial);
scene.add(dots);

// Connection lines
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x00f5c4,
  transparent: true,
  opacity: 0.15
});

function getLines() {
  const group = new THREE.Group();
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 35) {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(positions[i].x, positions[i].y, positions[i].z),
          new THREE.Vector3(positions[j].x, positions[j].y, positions[j].z)
        ]);
        group.add(new THREE.Line(geo, lineMaterial));
      }
    }
  }
  return group;
}

let lineGroup = getLines();
scene.add(lineGroup);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Move particles
  positions.forEach((p, i) => {
    p.x += velocities[i].x;
    p.y += velocities[i].y;
    if (p.x > 100 || p.x < -100) velocities[i].x *= -1;
    if (p.y > 100 || p.y < -100) velocities[i].y *= -1;
    dotPositions[i * 3] = p.x;
    dotPositions[i * 3 + 1] = p.y;
  });
  dotGeometry.attributes.position.needsUpdate = true;

  // Rebuild lines
  scene.remove(lineGroup);
  lineGroup = getLines();
  scene.add(lineGroup);

  renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
  camera.updateProjectionMatrix();
});