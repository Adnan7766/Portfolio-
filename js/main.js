// --- PARTICLE BACKGROUND (Three.js) ---
const canvas = document.getElementById('particles-canvas');
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const geometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3).map(() => (Math.random()-0.5)*10);
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({
  size: 0.005,
  color: new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--primary').trim())
});
const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animateParticles() {
  requestAnimationFrame(animateParticles);
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animateParticles();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- GSAP SCROLL ANIMATIONS & SMOOTH SCROLL ---
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: a.getAttribute('href'), ease: 'power2.inOut' });
  });
});

// Reveal on scroll
gsap.utils.toArray('.section-entrance, .project-card, .timeline-item').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 80%' },
    opacity: 0,
    y: 50,
    duration: 1
  });
});

// Stagger timeline
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: { trigger: item, start: 'top center' },
    x: -100,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.2
  });
});

// --- SKILL CUBE INTERACTION ---
document.querySelectorAll('.skill-cube').forEach(cube => {
  cube.addEventListener('mousemove', e => {
    const r = cube.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    gsap.to(cube, { rotationY: x*30, rotationX: y*-30, duration: 0.8, ease: 'power2.out' });
  });
  cube.addEventListener('mouseleave', () => {
    gsap.to(cube, { rotationY:0, rotationX:0, duration:1.2, ease:'elastic.out(1,0.3)' });
  });
});
