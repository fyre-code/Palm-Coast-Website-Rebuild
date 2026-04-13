/* ============================================================
   PALM COAST PHYSICAL THERAPY — MAIN JS
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Mobile Navigation Toggle
     ---------------------------------------------------------- */
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close nav when a link is clicked (single-page nav)
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------------------------
     Active Nav Link on Scroll (Intersection Observer)
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + entry.target.id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ----------------------------------------------------------
     Dynamic Copyright Year
     ---------------------------------------------------------- */
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------
     Sticky Header Shadow on Scroll
     ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.12)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Team Carousel
     ---------------------------------------------------------- */
  const carousel = document.getElementById('team-carousel');

  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel__slide');
    const dots   = carousel.querySelectorAll('.carousel__dot');
    const btnPrev = carousel.querySelector('.carousel__btn--prev');
    const btnNext = carousel.querySelector('.carousel__btn--next');
    let current = 0;

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }

    if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    // Swipe support for mobile
    let touchStartX = 0;
    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) goTo(delta < 0 ? current + 1 : current - 1);
    }, { passive: true });
  }

})();
