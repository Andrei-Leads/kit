# Fotos de ejemplo — reformas-4 «Diario de obra»

Estado: **relleno** (rayado oscuro con el nombre del archivo), generado con Pillow. Las fotos de IA las pone
Ysst después (paso 9 de `docs/nuevo-template.md`); sustituirlas = reemplazar estos archivos con el mismo
nombre. Todas en `site.config.ts` con `origen: "ia"`: la pieza `Foto` pinta «Imagen generada con IA» como
una tira de cinta de carrocero en la esquina superior izquierda (en miniaturas, «IA»).

Ficha de estilo (encargo §10): luz de obra (foco LED o halógeno en trípode, duro y cálido, con luz fría de
ventana), 35 mm a la altura de los ojos, cámara en mano y encuadre algo imperfecto; desaturado, negros
profundos y grano fino. Obra en curso en Sevilla (ladrillo hueco, rozas con corrugado, plásticos, cinta en
marcos, polvo de yeso, borriquetas, barro levantado, vigas de madera). Como mucho siluetas de espaldas o un
antebrazo con guante; nunca caras. Prohibido: cielos azules, luz de estudio, catálogo, blanco y negro,
plantas o textiles decorativos, marcas legibles, desorden peligroso. Sin foto en el hero.

| Archivo | Qué muestra | Proporción | Dónde | Estado |
|---|---|---|---|---|
| `obra-triana-fin.jpg` | El baño terminado, luz de ventana | 3:2 | Trabajo 1, `imagenes[0]` | Relleno |
| `obra-triana-curso.jpg` | Baño en obra con rozas, foco en trípode y plástico en la puerta (foto ancla) | 3:2 | Trabajo 1, `imagenes[1]` | Relleno |
| `obra-nervion-fin.jpg` | El salón terminado con cocina abierta | 3:2 | Trabajo 2, `imagenes[0]` | Relleno |
| `obra-nervion-curso.jpg` | Piso con tabiques derribados y plásticos | 3:2 | Trabajo 2, `imagenes[1]` | Relleno |
| `obra-remedios-fin.jpg` | Cocina terminada | 3:2 | Trabajo 3, `imagenes[0]` | Relleno |
| `obra-remedios-curso.jpg` | Cocina sin muebles, tomas nuevas | 3:2 | Trabajo 3, `imagenes[1]` | Relleno |
| `obra-remedios-antes.jpg` | La cocina de 1980 antes de la obra, mismo encuadre que la terminada | 3:2 | Trabajo 3, `antes` | Relleno |
| `obra-heliopolis-fin.jpg` | Patio terminado con solería de barro | 3:2 | Trabajo 4, `imagenes[0]` | Relleno |
| `obra-heliopolis-curso.jpg` | Casa antigua con vigas al descubierto | 3:2 | Trabajo 4, `imagenes[1]` | Relleno |
| `obra-dos-hermanas-fin.jpg` | Azotea impermeabilizada y solada | 3:2 | Trabajo 5 | Relleno |
| `servicio-integral.jpg` | Pasillo en obra con borriquetas | 3:2 | Servicio «Reforma integral» | Relleno |
| `servicio-bano.jpg` | Plato de ducha recién colocado con cinta | 3:2 | Servicio «Reforma de baño» | Relleno |
| `servicio-soleria.jpg` | Baldosas de barro apiladas y llana | 3:2 | Servicio «Solería…» | Relleno |
| `servicio-casa-antigua.jpg` | Muro de ladrillo visto con viga | 3:2 | Servicio «Rehabilitación…» | Relleno |
| `empresa-parte.jpg` | Cuaderno y metro sobre un saco, sin texto legible | 3:2 | `/empresa` | Relleno |
| `empresa-andamio.jpg` | Andamio interior al amanecer | 3:2 | `/empresa` | Relleno |
| `video-obra-poster.jpg` | Primer fotograma del vídeo: estancia con andamio y foco | 16:9 | Póster de `videoPano` | Relleno |

**Vídeo** (`video-obra.mp4` y `video-obra-av1.mp4`, aún no existen; `videoPano` está comentado en
`site.config.ts`): 8 s en bucle sin corte, sin audio, imagen a vídeo desde el póster (polvo flotando en el
haz de un foco de obra, andamio de borriquetas, un plástico que se mueve levemente, *dolly-in* muy lento,
sin personas), 720p 16:9, H.264 ≤ 1,5 MB + AV1, 24 fps.
