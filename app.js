// Smile Pediatric Therapy Centre - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav__list');
  
  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      navList.classList.toggle('mobile-open');
      navToggle.classList.toggle('active');
    });

    // Close mobile nav when clicking on links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navList.classList.remove('mobile-open');
        navToggle.classList.remove('active');
      });
    });
  }

  // Smooth scrolling for navigation links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active navigation state
        updateActiveNavLink(href);
      }
    });
  });

  // Update active navigation link
  function updateActiveNavLink(activeHref) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activeHref) {
        link.classList.add('active');
      }
    });
  }

  // Update active nav on scroll
  function handleScrollNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        updateActiveNavLink(`#${sectionId}`);
      }
    });
  }

  // Throttled scroll handler for performance
  let scrollTimer = null;
  window.addEventListener('scroll', function() {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(handleScrollNavigation, 10);
  });

  // Add entrance animations
  function addEntranceAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll(
      '.service-card, .team-member, .value-item, .cta-card'
    );
    
    animateElements.forEach(element => {
      element.classList.add('animate-ready');
      observer.observe(element);
    });
  }

  // Initialize animations
  addEntranceAnimations();

  // Add hover effects for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add click tracking for appointment buttons (for analytics)
  const appointmentButtons = document.querySelectorAll('a[href*="forms.google.com"]');
  appointmentButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Track appointment button clicks
      console.log('Appointment button clicked:', button.textContent.trim());
      
      // You can add Google Analytics or other tracking here
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Appointment',
          event_label: button.textContent.trim()
        });
      }
    });
  });

  // Enhance form validation and user experience for contact links
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      console.log('Phone link clicked:', this.href);
    });
  });
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function() {
      console.log('Email link clicked:', this.href);
    });
  });

  // Add subtle parallax effect to hero section
  function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero__background');
    
    if (hero && heroBackground) {
      window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < hero.offsetHeight) {
          heroBackground.style.transform = `translateY(${rate}px)`;
        }
      });
    }
  }

  // Initialize parallax on larger screens
  if (window.innerWidth > 768) {
    addParallaxEffect();
  }

  // Handle window resize for responsive behavior
  window.addEventListener('resize', function() {
    // Close mobile nav on resize
    if (window.innerWidth > 768) {
      navList?.classList.remove('mobile-open');
      navToggle?.classList.remove('active');
    }
  });

  // Initialize active nav link based on current hash or default to home
  const initialHash = window.location.hash || '#home';
  updateActiveNavLink(initialHash);
  
  console.log('Smile Pediatric Therapy Centre website initialized successfully!');
});