# Catalyst Ideas — Entrega de archivos

Carpeta con los archivos fuente de la landing page finalizada y responsiva.

## Archivos incluidos

| Archivo | Descripción |
|--------|-------------|
| `index.tsx` | Ruta principal de TanStack Start con toda la lógica interactiva (menú, modal, scroll, WhatsApp). |
| `__root.tsx` | Layout raíz con SEO, fuentes (Fraunces + Inter) y metadata Open Graph / Twitter. |
| `catalyst-body.html` | Marcado completo de la landing: navbar, hero, planes, beneficios, testimonios, FAQ, footer y modal. |
| `catalyst.css` | Hoja de estilos premium mobile-first con sistema de diseño, breakpoints y animaciones. |
| `jsonld.json` | Datos estructurados Schema.org (Organization, LocalBusiness, FAQPage, Service, BreadcrumbList). |
| `robots.txt` | Permite indexación a todos los robots. |
| `logo.png` | Logo de Catalyst Ideas. |
| `hero.jpg` | Imagen de fondo del hero (Puerto Montt / volcán). |
| `favicon.ico` | Favicon del sitio. |

## Cómo usar

- **Proyecto TanStack Start (actual):** coloca `index.tsx` en `src/routes/`, `__root.tsx` en `src/routes/`, `catalyst-body.html` y `jsonld.json` en `src/components/site/`, `catalyst.css` en `src/`, y los assets en `public/`.
- **HTML/CSS estático:** pega el contenido de `catalyst-body.html` dentro de `<body>`, enlaza `catalyst.css` en `<head>`, y coloca `logo.png`, `hero.jpg` y `favicon.ico` en la raíz del sitio. El JavaScript interactivo (menú hamburguesa, modal, formulario a WhatsApp) deberás replicarlo manualmente o usar `index.tsx` como referencia.

## Notas

- El formulario de auditoría redirige a WhatsApp con un mensaje profesional pre-formateado.
- Los enlaces de planes ya apuntan a WhatsApp con el mensaje correspondiente.
- Diseño 100% responsivo: mobile-first con breakpoints en 480px, 768px, 1024px y 1440px.
