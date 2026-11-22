# Fotos de ejemplo de reformas-1 «Antes y después»

Estado: **relleno**. Son imágenes en gris rayado con el nombre del archivo (las «antes», en un tono más oscuro para que se vea el corte del deslizador), generadas con Pillow al integrar el template (22/11/2026). Ysst genera las fotos definitivas con IA siguiendo la ficha de estilo fotográfico del encargo (§10): luz de mañana de ventana lateral, 28 mm a 1,5 m, verticales rectas, interiores mediterráneos, sin personas. **Regla de oro: cada par se toma desde el mismo punto y a la misma altura**: primero el «después» y, editando esa misma imagen, el «antes» (versión de 1985). Para sustituir una foto, basta con reemplazar el archivo manteniendo el mismo nombre. Todas llevan `origen: "ia"` en `site.config.ts`.

| Archivo | Qué muestra | Proporción | Dónde |
|---|---|---|---|
| `hero-despues.jpg` | Baño de 5 m² reformado: plato extraplano, mampara, ventana a la izquierda | 4:3 | Hero, trabajo 1, `imagenesHero[0]` (Open Graph) — Relleno |
| `hero-antes.jpg` | El mismo baño en 1985: bañera, azulejo beis con cenefa, grifería de dos mandos | 4:3 | Hero, trabajo 1 (`antes`), 404 — Relleno |
| `cocina-despues.jpg` | Cocina en L abierta con encimera de cuarzo | 4:3 | Trabajo 2 — Relleno |
| `cocina-antes.jpg` | La misma cocina cerrada con alicatado hasta el techo | 4:3 | Trabajo 2 (`antes`) — Relleno |
| `salon-despues.jpg` | Salón sin tabique con suelo de porcelánico | 4:3 | Trabajo 3 — Relleno |
| `salon-antes.jpg` | El mismo salón con tabique, gotelé y terrazo gastado | 4:3 | Trabajo 3 (`antes`) — Relleno |
| `ducha-despues.jpg` | Plato extraplano con mampara | 4:3 | Trabajo 4 — Relleno |
| `ducha-antes.jpg` | La misma zona con bañera de chapa | 4:3 | Trabajo 4 (`antes`) — Relleno |
| `terrazo-despues.jpg` | Pasillo con terrazo pulido | 4:3 | Trabajo 5 (sin `antes`) — Relleno |
| `servicio-bano.jpg` | Detalle de grifería y azulejo | 4:3 | Servicio `reforma-de-bano` — Relleno |
| `servicio-cocina.jpg` | Encimera y frentes | 4:3 | Servicio `reforma-de-cocina` — Relleno |
| `servicio-integral.jpg` | Salón terminado visto desde el pasillo | 4:3 | Servicio `reforma-integral` — Relleno |
| `servicio-ducha.jpg` | Plato de ducha con desagüe lineal | 4:3 | Servicio `cambio-banera-por-plato-de-ducha` — Relleno |
| `servicio-suelos.jpg` | Gres colocado, junta fina | 4:3 | Servicio `suelos-y-alicatados` — Relleno |
| `obra-detalle.jpg` | Nivel y llana sobre una mesa de obra junto a una ventana | 3:2 | `/empresa`, trabajo 1 — Relleno |
| `obra-material.jpg` | Muestras de azulejo sobre una encimera | 3:2 | `/empresa`, trabajo 1 — Relleno |

El encargo pedía además `404-antes.jpg`: la 404 usa el `antes` de la primera obra que lo tenga (dato del cliente), así que no hace falta.
