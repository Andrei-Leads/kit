---
"@andrei-leads/core": minor
---

SEO técnico: sitemap, robots, metadatos por página (canonical, Open Graph, Twitter y descripción generada de los datos; legales con `noindex, follow`), JSON-LD `LocalBusiness` con `description` y `openingHoursSpecification` (sin `aggregateRating`), `formatearHorario` y campo nuevo `seo.indexar` (por defecto `false`: la web lleva `noindex`, robots.txt cerrado y sitemap vacío hasta que se ponga `indexar: true`).

Cambio incompatible: `contacto.horario` pasa de texto libre a franjas estructuradas, y el template lo pinta con `formatearHorario(config.contacto.horario)`. Antes: `horario: [{ dias: "Lunes a viernes", horas: "8:00–14:00 y 16:00–19:00" }, { dias: "Urgencias", horas: "24 horas" }]`. Después: `horario: [{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" }, { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "19:00" }]`, y las urgencias solo con `urgencias24h: true`.
