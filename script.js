/**
 * CATALYST IDEAS - Script
 * Maneja el carrusel de subtítulos, testimonios y animaciones
 */

document.addEventListener('DOMContentLoaded', function () {

    // ── Carrusel de subtítulos ──────────────────────────────────────────
    const subtitleTrack = document.getElementById('subtitleTrack');
    if (subtitleTrack) {
        const slides = subtitleTrack.querySelectorAll('.subtitle-slide');
        console.log('✅ Catalyst Ideas cargado correctamente');
        console.log(`📱 Subtítulos: ${slides.length} opciones`);
    }

    // ── Smooth scroll para enlaces internos ────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Navbar: sombra dinámica en scroll ──────────────────────────────
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.style.boxShadow = window.scrollY > 0
                ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
    }

    // ── Rastrear clics en botón WhatsApp ───────────────────────────────
    const ctaButton = document.querySelector('.btn-whatsapp');
    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            console.log('📞 Usuario iniciando asesoría por WhatsApp');
        });
    }

    // ── Rastrear hover en tarjetas de servicios ────────────────────────
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
            const title = this.querySelector('.card-title');
            if (title) {
                console.log(`🎯 Tarjeta ${index + 1} - ${title.textContent}`);
            }
        });
    });

    // ── Carrusel de testimonios ────────────────────────────────────────
    const cardsTestimonio = document.querySelectorAll('.testimonio-card');
    const dotsTestimonio  = document.querySelectorAll('.dot-testimonio');
    let currentTestimonio = 0;

    function irATestimonio(index) {
        if (!cardsTestimonio[index]) return;

        cardsTestimonio.forEach(c => c.classList.remove('activo'));
        cardsTestimonio[index].classList.add('activo');

        if (dotsTestimonio.length > 0 && dotsTestimonio[index]) {
            dotsTestimonio.forEach(d => d.classList.remove('activo'));
            dotsTestimonio[index].classList.add('activo');
        }

        currentTestimonio = index;
    }

    // Clicks en dots (si existen en el HTML)
    dotsTestimonio.forEach((dot, i) => {
        dot.addEventListener('click', () => irATestimonio(i));
    });

    // Inicializar estado limpio y arrancar rotación automática
    if (cardsTestimonio.length > 0) {
        irATestimonio(0);
        setInterval(() => {
            irATestimonio((currentTestimonio + 1) % cardsTestimonio.length);
        }, 4000);
    }

    // ── Detección de dispositivo ───────────────────────────────────────
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('📱 Dispositivo:', isMobile ? 'Móvil' : 'Desktop');

});
