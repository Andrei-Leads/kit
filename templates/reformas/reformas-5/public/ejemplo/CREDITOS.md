# Fotos de ejemplo de reformas-5 «Tu casa»

Estado: **relleno**. Son imágenes en gris rayado con el nombre del archivo, generadas con Pillow al integrar el template (22/11/2026). Ysst genera las fotos definitivas con IA siguiendo la ficha de estilo fotográfico de la entrega: interiores habitados, luz de tarde cálida, materiales mediterráneos (terrazo, hidráulico, barro, cal, roble) y sin caras. Para sustituir una foto, basta con reemplazar el archivo manteniendo el mismo nombre. Todas llevan `origen: "ia"` en `site.config.ts`.

Las tarjetas pintan las fotos recortadas en arco 3:4. Los archivos de tarjeta están a 900×1200, y el póster a 1600×900.

| Archivo | Qué muestra | Proporción | Dónde |
|---|---|---|---|
| `hero-poster.jpg` | Cocina abierta con suelo hidráulico y luz de tarde | 16:9 | `imagenesHero[0]` (hero, Open Graph) y póster de `videoHero` |
| `estancia-bano.jpg` | Baño con lavabo de cerámica y grifería de latón | 3:4 | Servicio `reforma-de-bano` |
| `estancia-cocina.jpg` | Cocina con encimera de microcemento y franjas de sol | 3:4 | Servicio `reforma-de-cocina` |
| `estancia-integral.jpg` | Salón con terrazo y sofá de lino | 3:4 | Servicio `reforma-integral` |
| `estancia-ducha.jpg` | Ducha de obra con azulejo artesanal verde | 3:4 | Servicio `ducha-de-obra` |
| `estancia-hidraulico.jpg` | Suelo hidráulico valenciano con una franja de sol | 3:4 | Servicio `suelo-hidraulico` |
| `estancia-terraza.jpg` | Balcón con barandilla de hierro, barro y plantas | 3:4 | Servicio `terraza-y-balcon` |
| `detalle-azulejo.jpg` | Detalle de azulejo hidráulico con sol rasante | 3:4 | Servicio `reforma-de-cocina` y `/empresa` |
| `casa-patraix.jpg` | Salón y cocina abiertos con terrazo | 3:4 | Trabajo `una-casa-abierta-en-patraix` (portada) |
| `casa-patraix-cocina.jpg` | Barra de roble entre cocina y salón, una taza | 3:4 | Trabajo de Patraix (galería) |
| `casa-patraix-balcon.jpg` | Puerta de balcón con contraventana y un potos | 3:4 | Trabajo de Patraix (galería) |
| `casa-patraix-antes.jpg` | El mismo salón antes: tabique y terrazo gastado | 3:4 | Trabajo de Patraix (`antes`) |
| `casa-torrent.jpg` | Baño con ducha de obra y azulejo artesanal | 3:4 | Trabajo `bano-con-luz-en-torrent` |
| `casa-torrent-antes.jpg` | El mismo baño antes, con bañera | 3:4 | Trabajo de Torrent (`antes`) |
| `casa-manises.jpg` | Cocina abierta con muebles de roble | 3:4 | Trabajo `la-cocina-de-manises` y servicio de cocina |
| `casa-manises-antes.jpg` | La misma cocina antes, cerrada, con formica | 3:4 | Trabajo de Manises (`antes`) |
| `casa-carmen.jpg` | Dormitorio con hidráulico restaurado | 3:4 | Trabajo `hidraulico-recuperado-en-el-carmen` |
| `casa-benicalap.jpg` | Terraza con suelo de barro y olivo | 3:4 | Trabajo `terraza-en-benicalap` |

Faltan los vídeos `hero.mp4` (H.264, ≤ 1,5 MB, unos 8 s en bucle sin audio) y `hero-av1.mp4`. `videoHero` está comentado en `site.config.ts` hasta que existan. Las antes/después deben compartir encuadre exacto para que el deslizador funcione.
