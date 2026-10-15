---
"@andrei-leads/core": minor
---

Analítica del plan Básico: `analitica.vercel` (por defecto `false`) con Vercel Web Analytics sin cookies, medición de clics en llamada y WhatsApp (`phone_click`, `whatsapp_click`) y párrafo en la política de privacidad. Nuevo componente `<Analitica config={config} />`, que cada template pone una vez en el `<body>` de `app/layout.tsx`. Sin `analitica.vercel: true`, no cambia nada.

Webs ya entregadas: al actualizar a esta versión no se mide nada hasta añadir `Analitica` al import de `@andrei-leads/core` y `<Analitica config={config} />` en `app/layout.tsx` (después de `<DatosEstructurados>`). Sin ese componente, `analitica: { vercel: true }` solo cambiaría el texto de `/privacidad`.
