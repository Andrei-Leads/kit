# Fotos de ejemplo de «Plano» (carpinteria-metalica-4)

**Todas son relleno gris** (JPG rayado con el nombre del archivo) **pendientes de la foto generada con IA** según la ficha de estilo fotográfico del encargo (§10): alzado frontal a 24 mm con verticales corregidas, sol duro de mediodía (la sombra del marco dibuja una línea nítida en la mocheta), sin cielo, blancos neutros con sombras algo azuladas, saturación −15 %, sin personas ni reflejos. Generar primero la ancla (`obra-01`) y usarla como referencia de las demás. Prompts completos en la nota de entrega de Claude Design (§08, «Prompts de las fotos de ejemplo»). En `site.config.ts` todas llevan `origen: "ia"` (pie de figura «Imagen generada con IA»).

El hero no lleva foto (es tipográfico): no hay foto LCP. `imagenesHero` va vacío, así que la imagen de Open Graph es la primera foto de servicio (`servicio-rpt-detalle.jpg`).

Al sustituirlas: mismo nombre, JPG calidad ~82, recortado a la proporción indicada, lado largo ≤ 1600 px (docs/nuevo-template.md, paso 9). Origen: «Generada con IA (ChatGPT, OpenAI)».

| Archivo | Qué muestra | Proporción | Dónde | Estado |
|---|---|---|---|---|
| `obra-01-corredera-alboraya.jpg` | Corredera blanca de dos hojas en un hueco de salón, revoco blanco (foto ancla) | 4:3 | Trabajo «Corredera de salón en Alboraya» (FichasObra, `/trabajos`) | Relleno |
| `obra-02-oscilobatiente-meliana.jpg` | Oscilobatiente antracita en ladrillo caravista | 4:3 | Trabajo «Cuatro oscilobatientes en Meliana», «después» | Relleno |
| `obra-02-antes.jpg` | La misma ventana antes: corredera anodizada vieja y persiana rota, mismo encuadre | 4:3 | Ídem, «antes» (deslizador) | Relleno |
| `obra-03-cerramiento-tavernes.jpg` | Cerramiento de terraza de tercer piso, correderas de tres hojas | 3:2 | Trabajo «Cerramiento de terraza en Tavernes Blanques» y servicio «Cerramientos de terraza» | Relleno |
| `obra-04-persiana-benimaclet.jpg` | Cajón y lamas de PVC blanco nuevos | 4:3 | Trabajo «Persianas de un piso en Benimaclet» | Relleno |
| `obra-05-balconera-massamagrell.jpg` | Balconera de PVC imitación madera en casa de pueblo encalada | 4:3 | Trabajo «Balconera de PVC en Massamagrell» | Relleno |
| `servicio-rpt-detalle.jpg` | Canto de un perfil con RPT recién cortado, cenital | 1:1 | Servicio «Ventanas de aluminio con rotura de puente térmico» (Despiece) y Open Graph | Relleno |
| `servicio-pvc.jpg` | Oscilobatiente de PVC blanca, frontal | 1:1 | Servicio «Ventanas de PVC» | Relleno |
| `servicio-elevable.jpg` | Corredera elevable antracita abierta a media hoja | 1:1 | Servicio «Correderas elevables» | Relleno |
| `servicio-ruido.jpg` | Canto de un doble acristalamiento laminado con cámara | 1:1 | Servicio «Ventanas contra el ruido de la calle» | Relleno |
| `servicio-sin-obra.jpg` | Marco nuevo sobre premarco viejo con cinta de carrocero | 1:1 | Servicio «Cambio de ventanas sin obra» | Relleno |
| `proceso-medicion.jpg` | Flexómetro extendido en un hueco, manos desenfocadas, sin caras | 3:2 | `/empresa` | Relleno |
| `taller-mesa-corte.jpg` | Tronzadora y perfiles cortados en la nave | 3:2 | `/empresa` | Relleno |
| `taller-perfiles.jpg` | Estante de perfiles blancos, antracita e imitación madera | 3:2 | `/empresa` | Relleno |

El servicio «Persianas y cajones» no lleva foto a propósito: muestra el bloque rayado con su REF (comportamiento previsto del diseño sin foto).
