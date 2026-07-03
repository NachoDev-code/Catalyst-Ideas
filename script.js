/**
 * CATALYST IDEAS · script premium
 * Testimonios en carrusel + smooth scroll + navbar dinámica + reveals
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ── Smooth scroll anchors ─────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length <= 1) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // ── Navbar sombra dinámica ────────────────────────────
    var nav = document.querySelector('.nav');
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 8) {
          nav.style.boxShadow = '0 6px 24px rgba(17,26,23,.08)';
        } else {
          nav.style.boxShadow = 'none';
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // ── Testimonios carrusel ──────────────────────────────
    var cards = document.querySelectorAll('.testimonio');
    var dots = document.querySelectorAll('.dot');
    var current = 0;
    var timer = null;

    function goTo(i) {
      if (!cards.length) return;
      current = (i + cards.length) % cards.length;
      cards.forEach(function (c, idx) {
        c.classList.toggle('active', idx === current);
      });
      dots.forEach(function (d, idx) {
        d.classList.toggle('active', idx === current);
      });
    }

    function start() {
      stop();
      timer = setInterval(function () { goTo(current + 1); }, 5500);
    }
    function stop() { if (timer) clearInterval(timer); }

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { goTo(i); start(); });
    });

    if (cards.length) { goTo(0); start(); }

    // Pausa carrusel cuando la pestaña está oculta
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    // ── Reveals on scroll ─────────────────────────────────
    if ('IntersectionObserver' in window) {
      var els = document.querySelectorAll(
        '.section-title, .beneficio, .plan, .faq__item, .problema__inner, .cta__inner'
      );
      els.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1)';
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (el) { io.observe(el); });
    }

    console.log('%c✦ Catalyst Ideas', 'color:#4ade80;font-weight:700;font-size:14px;');
  });
})();