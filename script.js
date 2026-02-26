/**
 * Care Systems — Landing Page
 * Vanilla JS | Interactions & Micro-animations
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. STICKY HEADER
  ────────────────────────────────────────── */
  const header = document.querySelector('.header');

  const handleHeaderScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });


  /* ──────────────────────────────────────────
     2. HAMBURGER MENU
  ────────────────────────────────────────── */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ──────────────────────────────────────────
     3. BIOTECH SCANNER & PARALLAX
  ────────────────────────────────────────── */
  const heroSection = document.querySelector('.hero');
  const heroRight = document.querySelector('.hero-right');
  const heroDoctorImg = document.querySelector('.hero-doctor-img');
  const particlesContainer = document.querySelector('.hero-particles-container');

  if (heroSection && heroRight && heroDoctorImg) {
    const MAX_TILT = 2.4; // degrees — ultra subtle

    // Initialize Molecular Particles
    const createParticles = () => {
      const particleCount = 12;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'molecular-particle';

        // Randomize properties
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = 4 + Math.random() * 8;
        const delay = Math.random() * -10;
        const size = 3 + Math.random() * 6;
        const opacity = 0.2 + Math.random() * 0.4;

        // Random movement paths
        const moveX20 = (Math.random() - 0.5) * 40;
        const moveY20 = (Math.random() - 0.5) * 40;
        const moveX100 = (Math.random() - 0.5) * 150;
        const moveY100 = (Math.random() - 0.5) * 150;

        particle.style.cssText = `
          left: ${startX}%;
          top: ${startY}%;
          width: ${size}px;
          height: ${size}px;
          --duration: ${duration}s;
          --delay: ${delay}s;
          --max-opacity: ${opacity};
          --move-x-20: ${moveX20}px;
          --move-y-20: ${moveY20}px;
          --move-x-100: ${moveX100}px;
          --move-y-100: ${moveY100}px;
          animation-delay: ${delay}s;
        `;

        particlesContainer.appendChild(particle);
      }
    };

    createParticles();

    // Mouse interaction interaction
    heroSection.addEventListener('mouseenter', () => {
      heroDoctorImg.style.animationPlayState = 'paused';
    });

    // Unified mouse tracking: 3D Tilt + Scanner Position
    heroSection.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        const rect = heroRight.getBoundingClientRect();

        // Parallax / Tilt
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = xPos * MAX_TILT;
        const rotX = yPos * -MAX_TILT;

        heroDoctorImg.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

        // Scanner Spotlight (CSS Variables)
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

        heroRight.style.setProperty('--mouse-x', `${mouseX}%`);
        heroRight.style.setProperty('--mouse-y', `${mouseY}%`);
      });
    });

    // Reset smoothly
    heroSection.addEventListener('mouseleave', () => {
      heroDoctorImg.style.transform = '';
      heroDoctorImg.style.animationPlayState = '';
    });
  }


  /* ──────────────────────────────────────────
     4. SCROLL-REVEAL (Intersection Observer)
  ────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-up').forEach(el => revealObserver.observe(el));






  /* ──────────────────────────────────────────
     5. FAQ ACCORDION
  ────────────────────────────────────────── */
  const accItems = document.querySelectorAll('.acc-item');

  accItems.forEach(item => {
    const btn = item.querySelector('.acc-header');
    const body = item.querySelector('.acc-body');

    if (!btn || !body) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all open items
      accItems.forEach(other => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.acc-header');
        const otherBody = other.querySelector('.acc-body');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      // Open clicked item if it was closed
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });


});
