/* ============================================
   ESTUDIO BARBER — JavaScript
   Animations, Parallax, Custom Cursor, 3D Cards
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────
  // Custom Cursor
  // ──────────────────────────────────
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, select, input, .servicio-card, .membresia-card, .barbero-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  // ──────────────────────────────────
  // Navbar Scroll Effect
  // ──────────────────────────────────
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('#hero');

  function handleNavbarScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // ──────────────────────────────────
  // Mobile Menu
  // ──────────────────────────────────
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navbar-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ──────────────────────────────────
  // Smooth Scroll for anchor links
  // ──────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // ──────────────────────────────────
  // Parallax on Hero
  // ──────────────────────────────────
  const heroVideo = document.querySelector('.hero-video-wrap');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;

    if (scrolled < heroHeight) {
      if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.35}px)`;
      }
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroHeight) * 1.2;
      }
    }
  });

  // ──────────────────────────────────
  // Intersection Observer — Scroll Reveals
  // ──────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ──────────────────────────────────
  // 3D Card Tilt on Services
  // ──────────────────────────────────
  const servicioCards = document.querySelectorAll('.servicio-card');

  servicioCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ──────────────────────────────────
  // Particle Effect (Canvas)
  // ──────────────────────────────────
  const particleCanvases = document.querySelectorAll('.particles-canvas');

  particleCanvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40;

    function resizeCanvas() {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    initParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  });

  // ──────────────────────────────────
  // Reservation Form
  // ──────────────────────────────────
  const reservaForm = document.querySelector('#reserva-form');
  const toast = document.querySelector('.toast');

  if (reservaForm) {
    // Set minimum date to today
    const dateInput = reservaForm.querySelector('#fecha');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    reservaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const barbero = reservaForm.querySelector('#barbero').value;
      const servicio = reservaForm.querySelector('#servicio').value;
      const fecha = reservaForm.querySelector('#fecha').value;
      const hora = reservaForm.querySelector('#hora').value;
      const membresia = reservaForm.querySelector('#membresia').value;
      const whatsapp = reservaForm.querySelector('#whatsapp').value;

      if (!barbero || !servicio || !fecha || !hora || !whatsapp) {
        showToast('⚠️ Por favor completa todos los campos obligatorios');
        return;
      }

      let mensaje = '✓ ¡Cita agendada! Te confirmaremos al WhatsApp ' + whatsapp;
      if (membresia && membresia !== 'ninguna') {
        mensaje = `✓ ¡Reserva y Solicitud de Membresía ${membresia.toUpperCase()} recibida! Te contactaremos al WhatsApp ${whatsapp}`;
      }

      showToast(mensaje);

      // Reset form
      setTimeout(() => {
        reservaForm.reset();
        if (dateInput) {
          const today = new Date().toISOString().split('T')[0];
          dateInput.value = today;
        }
      }, 1000);
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // ──────────────────────────────────
  // Counter Animation for stats (if any)
  // ──────────────────────────────────
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(eased * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ──────────────────────────────────
  // Navbar active link highlight
  // ──────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.navbar-links a[href^="#"]');

  function setActiveLink() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);

});
