// Enhanced Wedding Invitation JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializePreloader();
  initializeScrollAnimations();
  initializeSmoothScroll();
  initializeCountdown();
  initializeTypewriter();
  initializePhotoGallery();
  initializeMusicToggle();
  initializeEventCards();
  initializeFontSwitcher();
});

// PRELOADER FUNCTIONALITY
function initializePreloader() {
  const preloader = document.getElementById('preloader');
  
  // Hide preloader after 2 seconds
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    
    // Remove preloader from DOM after transition
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 500);
  }, 2000);
}

// COUNTDOWN TIMER FUNCTIONALITY
function initializeCountdown() {
  // More robust date parsing for cross-browser compatibility
  const weddingDate = new Date(2026, 1, 5, 11, 0, 0).getTime(); // Month is 0-indexed, so 1 = February
  
  function updateCountdown() {
    try {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown display with animation
        updateCountdownNumber('days', Math.max(0, days).toString().padStart(3, '0'));
        updateCountdownNumber('hours', Math.max(0, hours).toString().padStart(2, '0'));
        updateCountdownNumber('minutes', Math.max(0, minutes).toString().padStart(2, '0'));
        updateCountdownNumber('seconds', Math.max(0, seconds).toString().padStart(2, '0'));
      } else {
        // Wedding day arrived!
        updateCountdownNumber('days', '000');
        updateCountdownNumber('hours', '00');
        updateCountdownNumber('minutes', '00');
        updateCountdownNumber('seconds', '00');
      }
    } catch (error) {
      console.error('Countdown error:', error);
      // Fallback display
      updateCountdownNumber('days', '000');
      updateCountdownNumber('hours', '00');
      updateCountdownNumber('minutes', '00');
      updateCountdownNumber('seconds', '00');
    }
  }
  
  function updateCountdownNumber(id, newValue) {
    const element = document.getElementById(id);
    if (element) {
      if (element.textContent !== newValue) {
        element.style.transition = 'transform 0.2s ease';
        element.style.transform = 'scale(1.2)';
        element.textContent = newValue;
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 200);
      }
    }
  }
  
  // Update countdown immediately and then every second
  updateCountdown();
  
  // Use both setInterval and requestAnimationFrame for better mobile performance
  let countdownInterval = setInterval(updateCountdown, 1000);
  
  // Handle visibility change to prevent issues when tab is not active on mobile
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      // Clear old interval and restart when tab becomes visible
      clearInterval(countdownInterval);
      updateCountdown(); // Update immediately
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  });
  
  // Additional fallback for mobile devices - update on focus
  window.addEventListener('focus', function() {
    updateCountdown();
  });
}

// TYPEWRITER TEXT ANIMATION
function initializeTypewriter() {
  const typewriterElements = document.querySelectorAll('.typewriter-text');
  
  typewriterElements.forEach((element, index) => {
    const delay = element.getAttribute('data-delay') || (index * 500);
    const text = element.textContent;
    
    // Clear text initially
    element.textContent = '';
    element.style.borderRight = '2px solid rgba(255, 255, 255, 0.8)';
    
    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          // Remove cursor after typing is complete
          setTimeout(() => {
            element.style.borderRight = 'none';
          }, 1000);
        }
      }, 100);
    }, parseInt(delay));
  });
}

// PHOTO GALLERY FUNCTIONALITY
function initializePhotoGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const prevButton = document.querySelector('.gallery-prev');
  const nextButton = document.querySelector('.gallery-next');
  let currentIndex = 0;
  
  if (!galleryItems.length || !prevButton || !nextButton) return;
  
  function showImage(index) {
    // Hide all images
    galleryItems.forEach(item => item.classList.remove('active'));
    
    // Show selected image
    galleryItems[index].classList.add('active');
    
    // Add entrance animation
    galleryItems[index].style.opacity = '0';
    galleryItems[index].style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      galleryItems[index].style.opacity = '1';
      galleryItems[index].style.transform = 'scale(1)';
    }, 50);
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage(currentIndex);
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage(currentIndex);
  }
  
  // Event listeners
  nextButton.addEventListener('click', nextImage);
  prevButton.addEventListener('click', prevImage);
  
  // Auto-advance gallery every 5 seconds
  setInterval(nextImage, 5000);
  
  // Add smooth transition styles
  galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
}

// ENHANCED EVENT CARDS
function initializeEventCards() {
  const eventCards = document.querySelectorAll('.enhanced-card');
  
  eventCards.forEach(card => {
    card.addEventListener('click', function() {
      const eventType = this.getAttribute('data-event');
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Optional: Add more specific event actions here
      console.log(`Event card clicked: ${eventType}`);
    });
    
    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', function() {
      // Subtle hover effect already handled by CSS
      this.style.transition = 'all 0.3s ease';
    });
  });
}

// MUSIC TOGGLE FUNCTIONALITY WITH AUTOPLAY
function initializeMusicToggle() {
  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  let isPlaying = false;
  
  if (!musicToggle || !bgMusic) return;
  
  // Set initial volume and prepare audio
  bgMusic.volume = 0.7;
  
  // Function to play music
  function playMusic() {
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        musicToggle.textContent = '🎶';
        musicToggle.style.opacity = '1';
        musicToggle.style.animation = 'pulse 2s infinite';
        console.log('Music started playing');
      }).catch(error => {
        console.log('Audio playback failed:', error);
        isPlaying = false;
        musicToggle.textContent = '🎵';
        musicToggle.style.opacity = '0.8';
        musicToggle.style.animation = 'none';
        
        // Show subtle indication that user can click to play
        musicToggle.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
      });
    }
  }
  
  // Function to pause music
  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    musicToggle.textContent = '🎵';
    musicToggle.style.opacity = '0.7';
    musicToggle.style.animation = 'none';
    musicToggle.style.boxShadow = 'none';
  }
  
  // Music toggle click handler
  musicToggle.addEventListener('click', function() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
  
  // Try to autoplay after a short delay (after preloader)
  setTimeout(() => {
    // Attempt autoplay after page has loaded
    playMusic();
  }, 2500);
  
  // Alternative: Try autoplay on first user interaction
  function enableAutoplayOnInteraction() {
    if (!isPlaying) {
      playMusic();
    }
    // Remove listeners after first attempt
    document.removeEventListener('click', enableAutoplayOnInteraction);
    document.removeEventListener('scroll', enableAutoplayOnInteraction);
    document.removeEventListener('keydown', enableAutoplayOnInteraction);
  }
  
  // Add event listeners for user interaction
  document.addEventListener('click', enableAutoplayOnInteraction, { once: true });
  document.addEventListener('scroll', enableAutoplayOnInteraction, { once: true });
  document.addEventListener('keydown', enableAutoplayOnInteraction, { once: true });
  
  // Handle audio events
  bgMusic.addEventListener('loadeddata', function() {
    console.log('Audio loaded successfully');
  });
  
  bgMusic.addEventListener('canplaythrough', function() {
    console.log('Audio ready to play');
  });
  
  bgMusic.addEventListener('error', function(e) {
    console.log('Audio loading error:', e);
    musicToggle.textContent = '🔇';
    musicToggle.style.opacity = '0.5';
    musicToggle.style.animation = 'none';
  });
  
  bgMusic.addEventListener('ended', function() {
    isPlaying = false;
    musicToggle.textContent = '🎵';
    musicToggle.style.opacity = '0.7';
    musicToggle.style.animation = 'none';
  });
  
  bgMusic.addEventListener('pause', function() {
    isPlaying = false;
    musicToggle.textContent = '🎵';
    musicToggle.style.opacity = '0.7';
    musicToggle.style.animation = 'none';
  });
  
  bgMusic.addEventListener('play', function() {
    isPlaying = true;
    musicToggle.textContent = '🎶';
    musicToggle.style.opacity = '1';
    musicToggle.style.animation = 'pulse 2s infinite';
  });
}

// SMOOTH SCROLL INITIALIZATION
function initializeSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
  }
}

// SCROLL ANIMATIONS WITH GSAP
function initializeScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.log('GSAP or ScrollTrigger not loaded');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Reveal animations for sections
  const revealElements = document.querySelectorAll('.reveal');
  
  revealElements.forEach(element => {
    gsap.fromTo(element, {
      opacity: 0,
      y: 100
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
  });
  
  // Enhanced card animations
  const cards = document.querySelectorAll('.enhanced-card');
  
  cards.forEach((card, index) => {
    gsap.fromTo(card, {
      opacity: 0,
      y: 50,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay: index * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });
  
  // Photo gallery entrance animation
  const gallery = document.querySelector('.photo-gallery');
  if (gallery) {
    gsap.fromTo(gallery, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gallery,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }
  
  // Countdown timer entrance
  const countdown = document.querySelector('.countdown-timer');
  if (countdown) {
    gsap.fromTo(countdown.children, {
      opacity: 0,
      y: 30,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: countdown,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }
}

// FLOATING ELEMENTS ENHANCEMENT
function enhanceFloatingElements() {
  const floatingElements = document.querySelectorAll('#floating-elements > div');
  
  // Add random horizontal movement
  floatingElements.forEach(element => {
    const randomDelay = Math.random() * 5000;
    const randomDuration = 8000 + Math.random() * 4000;
    
    setTimeout(() => {
      element.style.animationDuration = randomDuration + 'ms';
    }, randomDelay);
  });
}

// Initialize floating elements enhancement
setTimeout(enhanceFloatingElements, 3000);

// Add some interactive easter eggs
document.addEventListener('keydown', function(e) {
  // Press 'H' for hearts burst
  if (e.key.toLowerCase() === 'h') {
    createHeartsEffect();
  }
});

function createHeartsEffect() {
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 3s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 3000);
  }
}

// FONT SWITCHER FUNCTIONALITY
function initializeFontSwitcher() {
  const selectedFont = localStorage.getItem('selectedFont');
  
  if (selectedFont) {
    applySelectedFont(selectedFont);
  }
}

function applySelectedFont(fontName) {
  const fontMapping = {
    'Playfair Display': "'Playfair Display', serif",
    'Dancing Script': "'Dancing Script', cursive",
    'Great Vibes': "'Great Vibes', cursive",
    'Cinzel': "'Cinzel', serif",
    'Cormorant Garamond': "'Cormorant Garamond', serif",
    'Libre Baskerville': "'Libre Baskerville', serif",
    'Crimson Text': "'Crimson Text', serif",
    'Philosopher': "'Philosopher', sans-serif"
  };
  
  const fontFamily = fontMapping[fontName] || "'Playfair Display', serif";
  
  // Apply font to main text elements
  const elementsToStyle = [
    '.hero h1.names',
    '.section h2',
    '.section-title',
    '.countdown-section h2',
    '.countdown-section .date',
    '.card h3',
    '.closing h2',
    '.closing p'
  ];
  
  // Create or update dynamic stylesheet
  let styleElement = document.getElementById('dynamic-font-styles');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'dynamic-font-styles';
    document.head.appendChild(styleElement);
  }
  
  const css = elementsToStyle.map(selector => 
    `${selector} { font-family: ${fontFamily} !important; }`
  ).join('\n');
  
  styleElement.textContent = css;
  
  console.log(`Applied font: ${fontName}`);
}


console.log('Enhanced Wedding Invitation loaded successfully! 💕');
