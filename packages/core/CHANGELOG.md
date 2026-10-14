# @andrei-leads/core

## 0.4.0

### Minor Changes

- cff17a7: SEO técnico: sitemap, robots, metadatos por página (canonical, Open Graph, Twitter y descripción generada de los datos; legales con `noindex, follow`), JSON-LD `LocalBusiness` con `description` y `openingHoursSpecification` (sin `aggregateRating`), `formatearHorario` y campo nuevo `seo.indexar` (por defecto `false`: la web lleva `noindex`, robots.txt cerrado y sitemap vacío hasta que se ponga `indexar: true`).
  
  Cambio incompatible: `contacto.horario` pasa de texto libre a franjas estructuradas, y el template lo pinta con `formatearHorario(config.contacto.horario)`. Antes: `horario: [{ dias: "Lunes a viernes", horas: "8:00–14:00 y 16:00–19:00" }, { dias: "Urgencias", horas: "24 horas" }]`. Después: `horario: [{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" }, { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "19:00" }]`, y las urgencias solo con `urgencias24h: true`.

## 0.3.0

### Minor Changes

- 3a82b31: Contrato site.config 0.3.0 para webs multipágina: slugs de servicios y trabajos, trabajos, proceso, acreditaciones, garantías, marcas, precios opcionales, empresa, comunidades, valoración y datos registrales en el aviso legal; cambio incompatible: `servicios[].imagen` (texto) pasa a `servicios[].imagenes` (lista de `{ src, alt }`) y `negocio.logo` (texto) pasa a `{ src, alt }`.
- 77ca4a1: Fotos del hero (imagenesHero) en site.config
- 572a88a: Botón de WhatsApp (BotonWhatsApp) con aspecto personalizable

### Patch Changes

- 24ee09d: Botones de llamada y WhatsApp: el nombre accesible es el texto visible (WCAG 2.5.3)

## 0.2.0

### Minor Changes

- 7c19e5a: Galería y FAQ en site.config
- 7810d7c: Páginas legales, BotonLlamada personalizable, email obligatorio y eliminación de saludo

## 0.1.1

### 0.1.1

- prueba
