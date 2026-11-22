# Fotos de ejemplo de electricidad-premium-1 «Tensión»

Estado: **relleno**. Son imágenes en gris rayado con el nombre del archivo, la proporción y el tamaño, generadas con Pillow al integrar el template (22/11/2026). Ysst genera las definitivas con IA siguiendo esta ficha. Para sustituir una foto, basta con reemplazar el archivo con el mismo nombre. Todas llevan `origen: "ia"` en `site.config.ts`, y la web pinta «Imagen generada con IA» fuera del marco (nunca encima del `h1`).

Los rellenos están a 1000×1250 (4:5 grandes), 800×1000 (4:5 miniaturas), 800×800 (1:1) y 1920×1080 (póster). Las definitivas deben tener el tamaño mínimo de la tabla.

**Faltan los vídeos** `pano.mp4` (H.264, 1280×720, unos 8 s en bucle, sin audio, 1–3 MB) y `pano.av1.mp4` (opcional). `videoPano` está comentado en `site.config.ts` hasta que existan. Sin vídeo, el pano pinta `imagenesHero[3]` (`pano-poster.jpg`); al activar `videoPano`, esa misma imagen es su póster.

## Ficha de estilo

- **Luz:** clave baja con una sola fuente rasante desde la izquierda. El fondo cae a negro. Sin flash frontal ni luz de día.
- **Óptica:** macro de 100 mm u 85 mm a f/4, con un plano nítido (borne, etiqueta o peine), verticales rectas y formato de la casa 4:5 vertical.
- **Color:** neutro frío casi monocromo. El único color es el de los conductores normativos (marrón, negro, gris, azul, verde-amarillo) y, como mucho, un piloto encendido.
- **Personas:** solo manos y antebrazos, con camisa de trabajo gris y, opcionalmente, guantes de nitrilo negros. Nunca caras.
- **Prohibido:** caras, técnicos sonrientes, rayos, chispas, arcos, humo, cables enredados como trabajo terminado, marcas legibles, pantallas con cifras, enchufes no europeos, placas vistas con dron, renders y matrículas. Si una imagen sale con alguno, se repite.

**Prompt de IA** = base común + la frase de la columna «Qué se ve». Base común:

> Low-key studio photograph, single hard raking light from the left, background falling to black, cool neutral near-monochrome palette, the only colours are European wire colours brown, black, grey, blue and green-yellow, shallow depth of field, 100mm macro at f/4, no logos, no readable brands, no faces, no sparks, photorealistic Spanish residential installation, vertical 4:5.

**Común a todas las filas:**

- **Zona segura:** en las 4:5 grandes, el tercio superior queda libre en móvil, porque ahí va el número o la ficha.
- **Sesión real:** un foco a 45° desde la izquierda con la sala a oscuras, macro a 30–50 cm, sin anillos ni relojes con marca. En un cliente real, **nunca IA en `/trabajos`**.
- **Estado vacío:** trama DIN en el mismo formato con el número del bloque o la ficha en grande. Nunca un rectángulo gris.

## Tabla de huecos (P5)

| Archivo | Dónde · campo | Formato mínimo · zona segura | Qué se ve (frase del prompt) | Sesión real | `alt` | Vacío |
|---|---|---|---|---|---|---|
| `hero-peine-cobre.jpg` | Inicio, hero, foto grande (LCP en escritorio, Open Graph) · `imagenesHero[0]` | 4:5, 1600×2000 · cuarto inferior izquierdo libre (lo tapa la miniatura) | Freshly assembled consumer unit: copper busbar comb and a row of white circuit breakers on a DIN rail with small handwritten labels, focus on the labels in the upper third. | El cuadro terminado del cliente | Peine de cobre y magnetotérmicos etiquetados en un cuadro nuevo | Trama DIN con la valoración |
| `hero-manos-cableado.jpg` | Hero, miniatura · `imagenesHero[1]` | 4:5, 800×1000 · 15 % de cada borde libre | Two forearms in a rolled-up dark grey work shirt combing brown, blue and green-yellow conductors inside an open flush junction box, thin black nitrile gloves. | Manos del instalador | Manos ordenando conductores en una caja de registro | Se omite |
| `hero-mecanismo.jpg` | Hero, tercera pieza (escritorio) · `imagenesHero[2]` | 1:1, 800×800 · centro | Brushed brass light switch on freshly plastered white wall, grazing light on the plaster, square. | Un mecanismo de una obra suya, de lado | Interruptor de latón sobre una pared de yeso | Se omite |
| `pano.mp4` (+ `pano.av1.mp4`) y `pano-poster.jpg` | Inicio, pano · `videoPano.src`, `videoPano.srcAv1`, `videoPano.poster`; hoy el póster va también en `imagenesHero[3]` | 16:9 (recorte 9:16 en móvil); vídeo 1280×720, 8 s; póster 2400×1350 · sujeto en la franja central del 40 %, tercio inferior oscuro y limpio (cifras) | Clip: Slow lateral dolly along a row of breakers and RCDs in a dark consumer unit, raking light gliding over copper, at second 4 a small green LED turns on; first and last frames identical for a seamless loop; no shake, no text, silent. Póster: el fotograma 1 | Slider o gimbal a lo largo del cuadro del cliente | Fila de interruptores de un cuadro eléctrico en penumbra | `videoHero` si existe; si no, `imagenesHero[3]`; si no, trama DIN con las cifras |
| `servicio-reforma-1.jpg` | `/servicios` (bloque) y hero de su ficha · `servicios[0].imagenes[0]` | 4:5, 1600×2000 | Freshly cut wall chases in a brick partition with grey corrugated conduit and new round flush boxes, plaster dust. | Obra con rozas abiertas | Rozas abiertas con tubo corrugado en una reforma | Trama «01» |
| `servicio-reforma-2.jpg` | Ficha, miniatura · `servicios[0].imagenes[1]` | 4:5, 800×1000 | Finished apartment consumer unit, door open, breakers aligned and labelled, cables bundled with cut ties. | El cuadro final de esa obra | Cuadro de vivienda terminado con la tapa abierta | Se omite |
| `servicio-domotica.jpg` | `/servicios`, ficha · `servicios[1].imagenes[0]` | 4:5, 1600×2000 | Home automation modules on a DIN rail, tiny blue and green status LEDs glowing, cable labels. | Cuadro domótico con pilotos encendidos | Módulos de domótica con pilotos encendidos en un cuadro | Trama «02» |
| `servicio-recarga.jpg` | `/servicios`, ficha · `servicios[2].imagenes[0]` | 4:5, 1600×2000 · borde derecho recortable | Wall-mounted EV charging point on raw concrete garage wall, cable coiled, single spotlight, no car. | Garaje de un cliente, coche fuera de cuadro | Punto de recarga en la pared de hormigón de un garaje | Trama «03» |
| `servicio-autoconsumo.jpg` | `/servicios`, ficha · `servicios[3].imagenes[0]` | 4:5, 1600×2000 · pantalla apagada | Solar inverter with screen off and DC protection box in a storage room, cables combed in grey trunking. | Instalación en penumbra | Inversor y protecciones de autoconsumo en un trastero | Trama «04» |
| `servicio-iluminacion.jpg` | `/servicios`, ficha · `servicios[4].imagenes[0]` | 4:5, 1600×2000 | Recessed linear LED profile glowing in a plasterboard ceiling of a dark empty room, clean shadow line. | Obra al anochecer con solo esa luz | Perfil de luz empotrado encendido en un techo | Trama «05» |
| (sin foto, a propósito) | `/servicios/certificados-y-boletines` · `servicios[5].imagenes = []` | — | Caso «servicio sin foto» | — | — | Trama «06» |
| `trabajo-ruzafa.jpg` | Inicio, `/trabajos`, ficha · `trabajos[0].imagenes[0]` | 4:5, 1600×2000 | New flush consumer unit recessed in the corridor of an early 20th century Valencian apartment, ornate cornice and hydraulic tiles at the bottom edge. | Foto final de la obra real | Cuadro nuevo empotrado en el pasillo de un piso antiguo | Trama con la ficha |
| `antes-ruzafa.jpg` | Ficha, deslizador · `trabajos[0].antes` | 4:5, mismo encuadre exacto | Same framing: old porcelain fuse box with cloth-covered wires on the same corridor wall. | El antes desde el mismo punto en la primera visita | Cuadro antiguo de fusibles antes de la reforma | Foto sola |
| `trabajo-domotica-rocafort.jpg` | `/trabajos`, ficha · `trabajos[1].imagenes[0]` | 4:5, 1600×2000 | Matte black backlit push-button panel on a living room wall at night, faint glow. | Obra real al anochecer | Pulsadores retroiluminados en la pared de un salón | Trama |
| `trabajo-recarga-leliana.jpg` | `/trabajos`, ficha · `trabajos[2].imagenes[0]` | 4:5, 1600×2000 · sin matrículas | EV charging point and exposed grey conduit on a whitewashed villa garage wall, concrete floor, no car. | Obra real | Punto de recarga con canalización en un garaje | Trama |
| `trabajo-autoconsumo-betera.jpg` | `/trabajos`, ficha · `trabajos[3].imagenes[0]` | 4:5, 1600×2000 | Mounted and labelled photovoltaic AC and DC protection boxes on a storage room wall. | Obra real | Protecciones de autoconsumo montadas y etiquetadas | Trama |
| `antes-autoconsumo-betera.jpg` | Ficha, deslizador · `trabajos[3].antes` | 4:5, mismo encuadre exacto | Same framing: the same wall bare with only a small old fuse box. | El antes | Pared del trastero antes de montar las protecciones | Foto sola |
| `empresa-taller.jpg` | `/empresa`, grande · `empresa.imagenes[0]` | 4:5, 1600×2000 · sin rótulos | Workbench in a small electrical workshop, a consumer unit half assembled, spools of coloured cable, one desk lamp. | Taller o almacén del cliente | Banco de trabajo con un cuadro a medio montar | Trama |
| `empresa-herramientas.jpg` | `/empresa`, miniatura · `empresa.imagenes[1]` | 4:5, 800×1000 | A forearm taking an insulated voltage tester out of an orderly tool case. | Herramientas reales | Herramientas aisladas ordenadas en una maleta | Se omite |

En las fichas de trabajo, el deslizador de antes y después recorta a 16:9 en escritorio. Por eso, en las fotos de `antes` y en su pareja, el sujeto debe quedar en la franja central.
