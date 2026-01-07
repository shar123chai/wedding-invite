gsap.registerPlugin(ScrollTrigger);

// Hero text animation
gsap.from('.intro', { opacity: 0, y: 20, duration: 1 });
gsap.from('.names', { opacity: 0, y: 30, duration: 1.2, delay: 0.5 });

// Scroll reveals
document.querySelectorAll('.reveal').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%'
    },
    opacity: 0,
    y: 40,
    duration: 1
  });
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
