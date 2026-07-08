import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import bodyHtml from "../components/site/catalyst-body.html?raw";
import jsonLd from "../components/site/jsonld.json?raw";
import "../catalyst.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Catalyst Ideas | SEO Local y Presencia Digital para Empresas en Puerto Montt" },
      {
        name: "description",
        content:
          "Ayudamos a empresas y emprendedores a mejorar su presencia digital mediante auditorías, SEO local y desarrollo web estratégico para conseguir más clientes.",
      },
      { name: "author", content: "Catalyst Ideas" },
      { property: "og:title", content: "Catalyst Ideas | SEO Local y Presencia Digital en Puerto Montt" },
      {
        property: "og:description",
        content:
          "Ayudamos a empresas y emprendedores a mejorar su presencia digital mediante auditorías, SEO local y desarrollo web estratégico para conseguir más clientes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CL" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Catalyst Ideas | SEO Local y Presencia Digital" },
      {
        name: "twitter:description",
        content:
          "Mejora tu presencia digital, SEO local y consigue más clientes con una auditoría digital y desarrollo estratégico.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: jsonLd }],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler, options);
      cleanups.push(() => target.removeEventListener(type, handler, options));
    };

    // ── Hamburger menu ──
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    if (menuToggle && navMenu) {
      on(menuToggle, "click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));
        menuToggle.classList.toggle("is-active");
        navMenu.classList.toggle("is-active");
      });
    }

    // ── Modal ──
    const modal = document.getElementById("auditModal");
    const closeAuditModal = () => {
      if (!modal) return;
      modal.classList.remove("is-active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    const openAuditModal = (e?: Event) => {
      if (e) e.preventDefault();
      if (!modal) return;
      modal.classList.add("is-active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const firstInput = modal.querySelector("input");
      if (firstInput) setTimeout(() => (firstInput as HTMLInputElement).focus(), 100);
    };
    document.querySelectorAll(".btn-open-audit").forEach((btn) => on(btn, "click", openAuditModal));
    const closeBtn = document.getElementById("closeModalBtn");
    if (closeBtn) on(closeBtn, "click", closeAuditModal);
    const overlay = document.querySelector(".audit-modal__overlay");
    if (overlay) on(overlay, "click", closeAuditModal);
    on(document, "keydown", (e) => {
      if ((e as KeyboardEvent).key === "Escape" && modal?.classList.contains("is-active")) {
        closeAuditModal();
      }
    });

    // ── Smooth scroll anchors ──
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      on(anchor, "click", (e) => {
        const id = anchor.getAttribute("href") || "";
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeAuditModal();
        if (menuToggle && navMenu && navMenu.classList.contains("is-active")) {
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.classList.remove("is-active");
          navMenu.classList.remove("is-active");
        }
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // ── Navbar shadow ──
    const nav = document.querySelector<HTMLElement>(".nav");
    if (nav) {
      const onScroll = () => {
        if (window.scrollY > 15) {
          nav.classList.add("nav--scrolled");
        } else {
          nav.classList.remove("nav--scrolled");
        }
      };
      on(window, "scroll", onScroll, { passive: true });
      onScroll();
    }

    // ── Audit form → WhatsApp ──
    const auditForm = document.getElementById("auditRequestForm") as HTMLFormElement | null;
    if (auditForm) {
      on(auditForm, "submit", (e) => {
        e.preventDefault();
        const val = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value.trim() || "";
        const name = val("bizName");
        const web = val("bizWeb") || "No tiene web actual";
        const phone = val("bizPhone");
        const email = val("bizEmail");
        const message =
          "🔥 *SOLICITUD DE AUDITORÍA GRATUITA - CATALYST IDEAS* 🔥\n\n" +
          "Hola, acabo de ver la web de Catalyst Ideas y me gustaría solicitar la auditoría digital para conocer mi situación y cómo puedo mejorar:\n\n" +
          "🏢 *Negocio:* " + name + "\n" +
          "🌐 *Web actual:* " + web + "\n" +
          "📱 *WhatsApp:* " + phone + "\n" +
          "✉️ *Email:* " + email + "\n\n" +
          "_Quedo atento al informe con las oportunidades de crecimiento digital._";
        window.open("https://wa.me/56974330304?text=" + encodeURIComponent(message), "_blank");
        auditForm.reset();
        closeAuditModal();
      });
    }

    // ── Scroll reveals ──
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      const revealElements = document.querySelectorAll<HTMLElement>(
        ".section-title, .solutions-subtitle, .trust-card, .plan-new, .beneficio-card, .testi-card, .faq__item, .cta-card, .beneficios-section__info, .testimonios-section__info",
      );
      revealElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        el.style.transition =
          "opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1)";
      });
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).style.opacity = "1";
              (entry.target as HTMLElement).style.transform = "translateY(0)";
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
      );
      revealElements.forEach((el) => observer?.observe(el));
    }

    return () => {
      cleanups.forEach((fn) => fn());
      observer?.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  return <div className="catalyst-site" dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
