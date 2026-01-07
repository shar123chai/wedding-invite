gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  smooth: true,
  lerp: 0.08
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Hero text animation
gsap.from('.intro', { opacity: 0, y: 20, duration: 1 });
gsap.from('.names', { opacity: 0, y: 30, duration: 1.2, delay: 0.5 });

// Fade out video and overlay as user scrolls
gsap.to('.hero-video, .overlay', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  opacity: 0,
  ease: 'none'
});

// Cinematic scroll reveals with scrub
document.querySelectorAll('.reveal').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      end: 'top 40%',
      scrub: true
    },
    opacity: 0,
    y: 60,
    ease: 'power2.out'
  });
});

// Cards stagger animation
gsap.from('.card', {
  scrollTrigger: {
    trigger: '.cards',
    start: 'top 80%',
    end: 'top 40%',
    scrub: true
  },
  opacity: 0,
  y: 50,
  stagger: 0.1,
  ease: 'power2.out'
});

// Music toggle
const music = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');
let playing = false;

toggle.addEventListener('click', () => {
  if (!playing) {
    music.play();
    toggle.textContent = '🔊';
  } else {
    music.pause();
    toggle.textContent = '🎵';
  }
  playing = !playing;
});
