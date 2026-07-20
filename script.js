// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    // Animate hamburger
    hamburger.style.transform = navLinks.classList.contains('active') 
      ? 'rotate(90deg)' 
      : 'rotate(0deg)';
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.style.transform = 'rotate(0deg)';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburger.style.transform = 'rotate(0deg)';
    }
  });
}

// Toggle Details in Service Pages
document.querySelectorAll('.toggle-details').forEach(button => {
  button.addEventListener('click', () => {
    const details = button.previousElementSibling;
    details.classList.toggle('hidden');
    button.textContent = details.classList.contains('hidden')
      ? 'Show Details'
      : 'Hide Details';
  });
});

// Scroll-triggered fade-in animations
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in class to animatable elements
  const fadeTargets = document.querySelectorAll(
    'section, .card, .service-card, .board-card, .internship-card, .trainer-card, .mou-card, .contact-page .container, .service-detail .container'
  );

  fadeTargets.forEach(el => {
    if (!el.classList.contains('hero')) {
      el.classList.add('fade-in');
    }
  });

  // Add stagger class to grid containers
  document.querySelectorAll('.service-cards, .board-grid').forEach(grid => {
    grid.classList.add('fade-in-stagger');
  });

  // Intersection Observer for fade-in
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-in, .fade-in-stagger').forEach(el => {
    fadeObserver.observe(el);
  });

  // Active nav link highlight based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // Smooth hover ripple effect on buttons
  document.querySelectorAll('.btn, .apply-btn, .view-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });
});

// Navbar scroll effect - subtle background darkening on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(37, 99, 235, 0.3)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(37, 99, 235, 0.25)';
    navbar.style.backdropFilter = 'none';
  }
  lastScroll = scrollY;
});

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1800;
        const start = performance.now();
        
        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
          }
        }
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(el => counterObserver.observe(el));
}

// ===== Typing Text Animation =====
const typedEl = document.querySelector('.typed-text');
if (typedEl) {
  const words = ['Digital Solutions', 'Future Leaders', 'Smart Applications', 'Career Success', 'Global Impact'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = words[wordIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 40);
    } else {
      typedEl.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 80);
    }
  }
  setTimeout(typeLoop, 800);
}



