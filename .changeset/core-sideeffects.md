---
"@andrei-leads/core": patch
---

Menos JavaScript en el navegador: core declara `"sideEffects": ["./styles.css"]`. Cuando un componente cliente del template usa un botón de core (por ejemplo, el `BotonWhatsApp` del asistente de WhatsApp), el navegador ya no descarga zod con todos sus idiomas, el contrato, las legales ni el SEO: unos 300 KB sin comprimir (~65 KB gzip) menos por página (la home de `carpinteria-metalica-1` pasa de 868 a 571 KB). No cambia nada visible ni en `site.config`.

Webs ya entregadas: lo reciben con `pnpm up @andrei-leads/core` desde la carpeta de la web, y después `pnpm build`, commit y push.
