# Fotos y vídeo de ejemplo de «Perfil» (carpinteria-metalica-5)

**Todo es relleno**: JPG oscuro rayado con el nombre del archivo y un vídeo de relleno (una banda de luz que barre el póster). Está **pendiente de la foto o del vídeo generados con IA** según la ficha fotográfica de la entrega de Claude Design. En `site.config.ts` todas las imágenes llevan `origen: "ia"`, con la etiqueta «Imagen generada con IA».

**Prompt base**, que se antepone a cada prompt de la tabla:

> «Fotografía de producto de clave baja, fondo negro profundo, una sola luz lineal de tira de softbox rasante a 15°, reflejo largo sobre aluminio anodizado, color neutro frío, altas luces champán, saturación reducida un 25 %, grano fino, sin personas, sin texto, sin logotipos.»

**Al sustituir una foto:**
- mismo nombre de archivo;
- JPG con calidad ~82;
- recortado a la proporción de la tabla;
- lado largo ≤ 1600 px, salvo el póster, que va a 1920 × 1080 (`docs/nuevo-template.md`, paso 9).

Origen: «Generada con IA (ChatGPT, OpenAI)».

| Archivo | Prompt (se añade al base) | Proporción | Dónde | Estado |
|---|---|---|---|---|
| `hero-poster.jpg` | Macro de 100 mm a f/8 del canto de un perfil de corredera anodizado en champán, con la tira de luz cruzándolo en diagonal. El perfil ocupa un tercio del encuadre, con algo de polvo de taller. Motivo en la zona central 4:5 | 16:9 (1920 × 1080) | Póster del vídeo del hero, que es el LCP. En móvil se recorta a la zona central | Relleno |
| `obra-01-moraleja.jpg` | 35 mm a la altura de los ojos, frontal. Ventanal corredero de tres hojas en un salón a la hora azul, interior iluminado en cálido y jardín en penumbra | 3:2 | `imagenesHero[0]` (Open Graph) y obra «Ventanal de salón en La Moraleja» | Relleno |
| `obra-02-chamberi.jpg` | Ático madrileño, ventana de hoja oculta antracita y tejados de teja árabe a la hora azul | 3:2 | Obra «Ático en Chamberí» | Relleno |
| `obra-02-antes.jpg` | El mismo encuadre que obra-02: ventana de madera vieja pintada de blanco y desconchada, luz de interior tenue | 3:2 | Ídem, `antes` (deslizador antes/después) | Relleno |
| `obra-03-pozuelo.jpg` | Salón abierto a un jardín con una corredera minimalista empotrada en el suelo, al anochecer | 3:2 | Obra «Salón abierto al jardín en Pozuelo» y segunda foto de «Correderas elevables» | Relleno |
| `obra-04-tres-cantos.jpg` | Puerta pivotante antracita de suelo a techo, entreabierta, de noche, con luz cálida saliendo por la rendija | 4:5 | Obra «Puerta pivotante en Tres Cantos» | Relleno |
| `obra-05-las-rozas.jpg` | Porche acristalado con correderas grandes, iluminado por dentro al anochecer | 3:2 | Obra «Porche acristalado en Las Rozas» | Relleno |
| `solucion-elevable.jpg` | Macro del carril inferior de una corredera elevable, con felpudo y tornillería visibles | 3:2 | Solución «Correderas elevables de gran formato» | Relleno |
| `solucion-hoja-oculta.jpg` | Encuentro de un marco antracita texturado con un muro de ladrillo visto y sellado perimetral | 3:2 | Solución «Ventanas de hoja oculta» | Relleno |
| `solucion-minimalista.jpg` | Cruce de dos hojas de perfil mínimo con el canto verdoso del vidrio laminado | 3:2 | Solución «Correderas minimalistas» | Relleno |
| `solucion-pivotante.jpg` | Pivote inferior de acero inoxidable sobre un pavimento de piedra oscura | 3:2 | Solución «Puertas pivotantes de entrada» | Relleno |
| `solucion-oscilobatiente.jpg` | Herraje oscilobatiente con una junta de EPDM en primer plano | 3:2 | Solución «Oscilobatientes con rotura de puente térmico» | Relleno |
| `taller-ajuste.jpg` | Antebrazo con guante de nitrilo negro, desenfocado, ajustando un herraje sobre el banco. Es la única presencia humana | 3:2 | `/empresa` (en blanco y negro) | Relleno |
| `taller-perfiles.jpg` | Perfiles de aluminio apoyados en un caballete del taller, en clave baja | 3:2 | `/empresa` (en blanco y negro) | Relleno |

«Cerramientos de porche» no lleva foto a propósito: así se ve la ficha tipográfica, con el número romano grande.

## Vídeo del hero (`hero.mp4`, `hero-av1.mp4`)

Los dos archivos actuales son de relleno: 163 KB y 142 KB, 1280 × 720, una banda de luz que barre el póster de relleno. El vídeo real se hace así:

- **Herramienta:** Veo 3.1 Lite o Kling 3.0, a partir del póster aprobado.
- **Prompt:** «Travelling lateral muy lento de unos 2 cm a lo largo del canto del perfil, mientras la tira de luz lo recorre de izquierda a derecha y vuelve. El primer fotograma es igual al último. 8 s, 24 fps, 1280×720, sin audio, sin personas, sin texto».
- **Exportación:**
  - `hero.mp4`: H.264 con CRF 28 y `-movflags +faststart`.
  - `hero-av1.mp4`: AV1.

El vídeo se monta después del `load`. No se monta con «reducir movimiento» ni con ahorro de datos, y nunca es el LCP.

## Prohibido en las fotos

- Luz de día plana o cielo azul.
- Blancos puros de catálogo, o producto aislado sobre blanco.
- Personas reconocibles, o reflejos del fotógrafo.
- Cotas o valores técnicos rotulados.
- Logos de sistemistas.
