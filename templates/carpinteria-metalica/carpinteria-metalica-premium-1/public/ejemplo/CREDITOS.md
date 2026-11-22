# Créditos y tabla de huecos — «Marco» (carpinteria-metalica-premium-1)

**Todas las imágenes de esta carpeta son de RELLENO**: rectángulos grises rayados generados con Pillow, con el nombre del archivo y su proporción escritos encima. No son fotos. Sustituirlas = reemplazar cada archivo por la foto real (o la de IA) con **el mismo nombre**; `site.config.ts` ya las referencia con `origen: "ia"`.

- Mínimos: grande 1600×2000, mediana 1200×1500, miniatura 800×1000. Banda 2400×600. Póster del pano 2000×2000.
- Nada importante donde caen los botones de una pareja (en el pano, el tercio inferior izquierdo).
- **Faltan** `pano.mp4` (H.264, ≤ 2,5 MB) y `pano-av1.mp4` (AV1, ≤ 1,5 MB): el bloque `videoPano` está comentado en `site.config.ts`. Con los dos clips, descomentarlo (`pano-poster.jpg` ya está). Sin vídeo, el pano usa `galeria[0]` → `trabajos[0].imagenes[0]` → `Luz`.
- En la web de un cliente real: nada de IA en `/trabajos` (AI Act, art. 50.4); fotos de equipo solo si no son de IA.

## Ficha de estilo

| Eje | Ficha |
|---|---|
| Luz | Natural de mañana (9–11 h) entrando por la ventana instalada: rectángulos de sol nítidos en suelo y pared, sombra del marco bien dibujada. Exposición para el interior: la ventana puede quemarse un poco, el interior nunca |
| Objetivo y encuadre | Interiores a 35 mm y 1,2 m de altura, verticales corregidas, ventana en un tercio. Detalles a 85 mm (manilla, alféizar, junta, rayo de luz). Siempre vertical 4:5 |
| Color | Sombras neutras frías (grafito, gris aluminio), altas luces cálidas de sol, saturación −10 %. Paredes blancas o de cal |
| Materia | Aluminio lacado antracita y gris texturado, PVC blanco, vidrio con reflejo, alféizar de mármol, suelo hidráulico del Eixample, terrazo, roble, cortina de lino, persiana de lamas, barandilla de hierro |
| Presencia humana | Solo manos o antebrazos, sin caras ni reflejos de personas. Nunca una persona de IA como dueño o equipo |
| En la web | 4:5 a dos o tres escalas, sin marcos, sombras ni filtros CSS, esquinas rectas. Bandas 4:1 solo en `/empresa` |

**Foto ancla:** `hero-1.jpg`. Salón del Eixample con una balconera nueva de aluminio gris, abierta a medias, y la luz de mañana dibujando dos rectángulos de sol en el suelo hidráulico. Genera las demás a partir de ella.

**Prohibido:** caras y personas de cuerpo entero; macro de perfil sobre negro (`-5`); fachadas desde la calle (`-6`); chispas y taller sucio (`-7`); paleta de tierra y madera vieja (`-8`); cielo azul dominante; HDR, destellos y viñeteado; rótulos, logos y valores técnicos; decoración de catálogo nórdico; carpinterías o enchufes no españoles.

## A. Huecos

| # | Archivo | Página · campo | Proporción | Zona segura | Qué se ve | Sesión real | `alt` |
|---|---|---|---|---|---|---|---|
| 1 | `hero-1.jpg` | Inicio, hero, grande (LCP) · `imagenesHero[0]`; Open Graph | 4:5 grande | 80 % central | Salón del Eixample, balconera gris, sol en suelo hidráulico | Obra terminada, 9–10 h, 1,2 m, ventana en el tercio derecho | Salón con una balconera de aluminio gris y la luz de la mañana sobre el suelo hidráulico |
| 2 | `hero-2.jpg` | Hero, mediana · `imagenesHero[1]`; hero de `/servicios` | 4:5 mediana | Mitad superior (la inferior se solapa) | Mano abriendo la manilla de una oscilobatiente | 85 mm, mano del montador, luz lateral | Mano abriendo la manilla de una ventana de aluminio |
| 3 | `hero-3.jpg` | Hero, pequeña · `imagenesHero[2]`; miniatura de `/servicios` | 4:5 miniatura | Un motivo simple (se ve a 96 px) | Rayo de sol en un alféizar de mármol junto al marco | Detalle de la misma obra | Luz de sol sobre un alféizar de mármol junto al marco de la ventana |
| 4 | `pano.mp4`, `pano-av1.mp4`, `pano-poster.jpg` | Inicio, pano · `videoPano` | 1:1, 1080×1080 (póster 2000×2000) | Ventana y luz en el cuadrado central del 56 % (sirve para el 9:16 del móvil y el 16:9 del escritorio); tercio inferior izquierdo sin nada importante (pareja de CTAs) | Habitación vacía, ventana nueva, la luz avanza por el suelo, la cortina apenas se mueve | Trípode fijo, 8 s, luz real o time-lapse corto; primer y último fotograma iguales | Habitación con una ventana nueva por la que entra la luz de la mañana |
| 5 | `servicio-ventanas-1.jpg` | Apilado y servicio · `servicios[0].imagenes[0]` | 4:5 grande | Franja central 3:2 (recorte móvil) | Dormitorio con oscilobatiente gris en oscilo | 35 mm, ventana a un lado | Dormitorio con una ventana oscilobatiente de aluminio gris entreabierta |
| 6 | `servicio-ventanas-2.jpg` | Miniatura del bloque · `servicios[0].imagenes[1]` | 4:5 miniatura | Centrado | Encuentro del marco con el alféizar | 85 mm | Encuentro del marco nuevo de aluminio con el alféizar |
| 7 | `servicio-balconeras-1.jpg` | `servicios[1].imagenes[0]` | 4:5 grande | Franja central 3:2 | Corredera abierta a un balcón con barandilla de hierro | Desde dentro, calle desenfocada | Balconera corredera abierta a un balcón con barandilla de hierro |
| 8 | `servicio-cerramientos-1.jpg` | `servicios[2].imagenes[0]` | 4:5 grande | Franja central 3:2 | Galería cerrada con correderas y plantas | Desde el salón | Galería cerrada con hojas correderas de aluminio |
| 9 | `servicio-puertas-1.jpg` | `servicios[3].imagenes[0]` | 4:5 grande | Franja central 3:2 | Puerta de patio acristalada abierta, suelo de barro | Desde dentro, 35 mm | Puerta de patio acristalada de aluminio abierta |
| 10 | `servicio-herreria-1.jpg` | `servicios[5].imagenes[0]` | 4:5 grande | Franja central 3:2 | Barandilla de pletina gris en un balcón | Luz rasante | Barandilla de pletina de hierro gris en un balcón |
| 11 | `trabajo-eixample-1.jpg` | Trabajo 1, grande · `trabajos[0].imagenes[0]` | 4:5 grande | 80 % central | Salón con dos balconeras iguales nuevas | Foto final, 9–10 h | Salón de un piso del Eixample con dos balconeras nuevas |
| 12 | `trabajo-eixample-2.jpg` | Trabajo 1, miniatura · `trabajos[0].imagenes[1]` | 4:5 miniatura | Centrado | Manilla y persiana de lamas recogida | 85 mm | Manilla de la balconera y persiana de lamas recogida |
| 13 | `trabajo-sant-gervasi-1.jpg` | Trabajo 2, después · `trabajos[1].imagenes[0]` | 4:5 grande | Idéntico encuadre al 14 | Galería cerrada nueva | Trípode en el punto del «antes» | Galería cerrada con aluminio gris después de la obra |
| 14 | `trabajo-sant-gervasi-antes.jpg` | Trabajo 2 · `trabajos[1].antes` (miniatura en el inicio) | 4:5 grande | Idéntico encuadre al 13 | La misma galería con aluminio blanco amarillento | Antes de empezar, misma altura y objetivo | La misma galería antes, con carpintería vieja de aluminio blanco |
| 15 | `trabajo-valldoreix-1.jpg` | Trabajo 3 · `trabajos[2].imagenes[0]` | 4:5 grande | 80 % central | Sala con ventanal a un jardín con pinos | Interior hacia fuera, mañana | Sala de una casa con un ventanal nuevo hacia el jardín |
| 16 | `trabajo-gracia-1.jpg` | Trabajo 4 · `trabajos[3].imagenes[0]` | 4:5 grande | 80 % central | Cocina abierta a un patio por una puerta acristalada | Desde la cocina | Cocina con una puerta acristalada nueva hacia el patio |
| 17 | `taller-1.jpg` | `/empresa`, grande · `empresa.imagenes[0]` | 4:5 grande | Manos en el tercio central | Antebrazos con guantes ajustando un herraje | Nave, luz de lucernario, sin caras | Manos con guantes ajustando el herraje de una hoja en el taller |
| 18 | `taller-2.jpg` | `/empresa`, miniatura · `empresa.imagenes[1]` | 4:5 miniatura | Centrado | Perfiles grises en un caballete | Luz cenital | Perfiles de aluminio gris apoyados en un caballete |
| 19 | `taller-banda.jpg` | `/empresa`, banda · `empresa.imagenes[2]` | 4:1, 2400×600 | Franja central; extremos recortados a 3:1 en móvil | Hojas terminadas en fila en la nave | Panorámica a 35 mm, horizonte centrado | Hojas de ventana terminadas en fila dentro de la nave |

`servicios[4]` («Persianas y mallorquinas») va **sin `imagenes`** a propósito, para probar `Luz`.

## B. Prompts de IA (listos para pegar)

| # | Prompt |
|---|---|
| 1 | Vertical 4:5 interior photo, Barcelona Eixample flat living room, new slim graphite-grey aluminium balcony door half open, 9 am sun casting two crisp light rectangles with mullion shadows on patterned hydraulic floor tiles, white lime walls, linen curtain, 35mm at 1.2 m, corrected verticals, door in right third, cool neutral shadows, warm highlights, saturation -10%, no people, no text |
| 2 | Vertical 4:5 close-up, a hand with rolled-up sleeve turning the handle of a graphite aluminium tilt-and-turn window, side morning light, 85mm, shallow depth of field, white wall, no face, no jewellery, no text |
| 3 | Vertical 4:5 detail, a beam of morning sun crossing a cream marble window sill beside a grey aluminium frame, simple bold composition, 85mm, faint dust in the light, cool shadows, warm highlight, no people, no text |
| 4 | Image-to-video from the approved poster, square 1:1, locked-off tripod, empty white room with a new grey aluminium window, morning sunlight slowly advancing across the floor, sheer linen curtain barely moving, light dust in the air, no camera motion, no people, no text, 8 seconds, 24 fps, first and last frame identical for a seamless loop, lower left area calm and plain. Poster: the same scene as a still, window and light patch centred |
| 5 | Vertical 4:5 interior, calm bedroom in a Barcelona flat, graphite aluminium tilt-and-turn window tilted open, morning light on white bedding and oak floor, 35mm at 1.2 m, window in left third, no people, no text |
| 6 | Vertical 4:5 detail, joint between a new grey aluminium window frame and a stone sill, neat fresh seal, raking morning light, 85mm, no logos, no text |
| 7 | Vertical 4:5 interior looking out, grey aluminium sliding balcony door open onto a narrow Barcelona balcony with wrought iron railing, street blurred, morning light on patterned tiles, 35mm, no people, no text |
| 8 | Vertical 4:5 interior, enclosed Barcelona gallery with new grey aluminium sliding panels and potted plants, bright diffuse light, seen from the living room, 35mm, cool neutral palette, no people, no text |
| 9 | Vertical 4:5 interior, glazed grey aluminium patio door open to a small courtyard with terracotta floor and plants, morning light, 35mm from inside, no people, no text |
| 10 | Vertical 4:5 detail, simple grey painted flat-bar iron balcony railing, raking morning light, white wall behind, 85mm, no people, no text |
| 11 | Vertical 4:5 interior, Eixample living room with two identical new grey aluminium balcony doors, high moulded ceiling, hydraulic tile floor with sun rectangles, 35mm at 1.2 m, corrected verticals, no people, no text |
| 12 | Vertical 4:5 detail, aluminium balcony door handle with a rolled-up slatted blind above, morning light, 85mm, no people, no text |
| 13 | Vertical 4:5 interior, bright enclosed gallery after renovation, new grey aluminium sliding windows, white walls, tripod at 1.2 m, centred framing, no people, no text |
| 14 | Exactly the same framing as the previous image, before renovation: old yellowed white aluminium sliding windows, single glazing, worn seals, dull light, no people, no text |
| 15 | Vertical 4:5 interior, living room of a house in the hills near Barcelona, large new grey aluminium window onto a garden with pine trees, morning sun on oak floor, 35mm, no people, no text |
| 16 | Vertical 4:5 interior, kitchen opening to an interior courtyard through a new glazed grey aluminium door, morning light, 35mm, no people, no text |
| 17 | Vertical 4:5, workshop bench, gloved forearms adjusting the hinge of an aluminium window sash, skylight light, shallow depth of field, no face, no logos, no text |
| 18 | Vertical 4:5, grey aluminium profiles leaning on a trestle in a clean workshop, overhead skylight, cool neutral tones, no people, no text |
| 19 | Panoramic 4:1, long clean aluminium workshop with finished window sashes standing in a row, skylight light, horizon centred, cool neutral palette, no people, no logos, no text |

**Estado vacío de cada hueco:** 1–3, `Luz` en la que falte y, sin ninguna, hero tipográfico (§5.1) · 4, foto de respaldo o pano de `Luz` (§5.2) · 5–10, bloque con `Luz` y número grande, sin miniatura si falta `imagenes[1]`, y en `/servicios/[slug]` hero con `Luz` y `contenido` en una columna · 11–16, sin miniatura con una sola foto, collage sin `antes`, y sin trabajos ni galería la sección y `/trabajos` desaparecen · 17–19, hero interior con `Luz`, sin banda. En todos los casos, las parejas de CTAs siguen en su sitio.
