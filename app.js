/**
 * CATALYST IDEAS - LÓGICA DE INTERACTIVIDAD & EXPERIENCIA DE USUARIO
 * Creado en 2026 para máxima velocidad y cero dependencias pesadas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. CONTROL DEL MENÚ MÓVIL (DRAWER)
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. HEADER CON EFECTO DE SCROLL
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. TABS DINÁMICOS: SITIOS WEB VS APP WEBS
  const tabWebsites = document.getElementById('tabWebsites');
  const tabAppWebs = document.getElementById('tabAppWebs');
  const panelWebsites = document.getElementById('panel-websites');
  const panelAppWebs = document.getElementById('panel-appwebs');

  if (tabWebsites && tabAppWebs) {
    tabWebsites.addEventListener('click', () => {
      tabWebsites.classList.add('active');
      tabWebsites.setAttribute('aria-selected', 'true');
      tabAppWebs.classList.remove('active');
      tabAppWebs.setAttribute('aria-selected', 'false');

      panelWebsites.classList.add('active');
      panelAppWebs.classList.remove('active');
    });

    tabAppWebs.addEventListener('click', () => {
      tabAppWebs.classList.add('active');
      tabAppWebs.setAttribute('aria-selected', 'true');
      tabWebsites.classList.remove('active');
      tabWebsites.setAttribute('aria-selected', 'false');

      panelAppWebs.classList.add('active');
      panelWebsites.classList.remove('active');
    });
  }

  // 4. CANVAS SUTIL DE LUZ AMBIENTAL EN EL HERO (60 FPS, LIGERO)
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Partículas de luz bioluminiscente sutil
    const particles = [];
    const count = window.innerWidth < 768 ? 15 : 28;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 255, ${p.alpha})`;
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // 5. ENLACES CON SCROLL SUAVE
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. CONTROL DE TABS DEL PROCESO INTERACTIVO
  const procTabs = document.querySelectorAll('.proc-tab');
  const procPanels = document.querySelectorAll('.process-panel');

  if (procTabs.length > 0) {
    procTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Desactivar todos los tabs
        procTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });

        // Ocultar todos los paneles
        procPanels.forEach(p => p.classList.remove('active'));

        // Activar tab actual
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Mostrar panel correspondiente
        const processName = tab.getAttribute('data-process');
        const targetPanel = document.getElementById(`proc-${processName}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
});
