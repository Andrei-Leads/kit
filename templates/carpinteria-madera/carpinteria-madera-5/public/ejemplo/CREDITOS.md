# Fotos de ejemplo de «Restauración» (carpinteria-madera-5)

**Todas son relleno gris** (JPG rayado con el nombre del archivo) **pendientes de la foto generada con IA** según la ficha de estilo fotográfico del encargo (§10): clave baja, una sola luz lateral cálida, bodegón de 50–85 mm con la pieza aislada, ámbar y nogal, manos sin cara. Los pares antes/después se hacen desde el mismo punto, a la misma altura y con la misma luz, y el «antes» lleva la misma corrección de color que el «después». En `site.config.ts` todas llevan `origen: "ia"` (etiqueta «Imagen generada con IA»).

Al sustituirlas: mismo nombre, JPG de calidad ~82, recortado a la proporción indicada y con el lado largo ≤ 1600 px (docs/nuevo-template.md, paso 9). Origen: «Generada con IA (ChatGPT, OpenAI)». Pesos objetivo del encargo (§9): la foto «después» del hero ≤ 120 KB y la del «antes» ≤ 80 KB. Todas las fotos «antes» se sirven con calidad 60.

| Archivo | Qué muestra | Proporción | Dónde | Estado |
|---|---|---|---|---|
| `hero-puerta-despues.jpg` | Puerta de entrada de pino restaurada y aceitada en un zaguán con suelo hidráulico (foto ancla) | 3:2 (recortable a 1:1) | Hero, Open Graph, trabajo «Puerta de entrada en El Carme», servicio «Restauración de puertas» | Relleno |
| `hero-puerta-antes.jpg` | La misma puerta antes, con el barniz cuarteado | 3:2 | `antes` del hero y del trabajo | Relleno |
| `comoda-despues.jpg` | Cómoda de nogal con marquetería recuperada | 4:3 | Trabajo «Cómoda de la abuela», servicio «Muebles antiguos» | Relleno |
| `comoda-antes.jpg` | La cómoda antes, con manchas de agua y una pata suelta | 4:3 | `antes` | Relleno |
| `puertas-lacadas-despues.jpg` | Puerta de paso lacada en blanco roto en un pasillo | 4:5 | Trabajo «Siete puertas lacadas en Mislata», servicio «Lacado de puertas» | Relleno |
| `puertas-sapelli-antes.jpg` | La misma puerta en sapelli oscuro | 4:5 | `antes` | Relleno |
| `tarima-despues.jpg` | Tarima de roble acuchillada y barnizada en mate | 3:2 | Trabajo «Tarima en Algirós», servicio «Acuchillado» | Relleno |
| `tarima-antes.jpg` | La misma tarima gastada y manchada | 3:2 | `antes` | Relleno |
| `contraventana-despues.jpg` | Contraventana de lamas restaurada y pintada en verde | 4:5 | Trabajo «Contraventanas en Picanya», servicio «Contraventanas» | Relleno |
| `silla-enea.jpg` | Silla de enea restaurada, en bodegón | 4:5 | `galeria`, CTA final | Relleno |
| `manos-lijando.jpg` | Manos con guantes lijando un tablero, fuera de foco | 4:5 | `/empresa`, «En el taller» sin vídeo | Relleno |
| `aceite-brocha.jpg` | Brocha aplicando aceite sobre la veta | 1:1 | `/empresa` | Relleno |
| `carcoma-detalle.jpg` | Macro de orificios de carcoma en una pata torneada | 1:1 | Servicio «Tratamiento de carcoma» | Relleno |
| `taller-restauracion.jpg` | Rincón del taller con piezas esperando, en clave baja | 3:2 | `/empresa` | Relleno |
| `poster-taller.jpg` | Póster del vídeo: su primer fotograma | 16:9 (se recorta a 4:5 en móvil) | `videoPano.poster` | Relleno (sin usar hasta que exista el vídeo) |

## Vídeo (pendiente)

`taller.mp4` (H.264, ≤ 2 MB) y `taller-av1.mp4` (AV1) **no existen todavía**. En `site.config.ts`, el bloque `videoPano` está comentado; se descomenta cuando estén los dos archivos en esta carpeta. Qué tiene que mostrar (encargo §10): 8 s en bucle sin corte visible; una lijadora orbital (manos con guantes, sin cara) pasa sobre una puerta con barniz viejo y deja ver la madera; en los últimos 2 s, una brocha aplica aceite y la veta se oscurece. Plano fijo cenital a 45°, clave baja, 720p, 24 fps, sin audio. Se genera de imagen a vídeo a partir de `poster-taller.jpg`, con la acción en el centro para el recorte 4:5 de móvil y 16:9 de escritorio. En la web lleva la etiqueta «Vídeo generado con IA».
