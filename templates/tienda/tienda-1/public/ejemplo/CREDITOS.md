# Fotos de ejemplo · tienda-1 «Almacén»

Por ahora **todas son relleno gris** (rayado con el nombre del archivo y la proporción), generadas con Pillow. Sustituirlas = reemplazar el archivo con el mismo nombre. Los ids `IMG-xx` son los de la spec (`material/referencias/recambioscerda/ESPEC.md` §7).

Reglas para las definitivas:
- Producto y espacios reales en apariencia; luz de almacén o de estudio suave, sin efectos.
- **Sin texto, logos ni marcas legibles** (el texto de la web es HTML). Sin caras reconocibles.
- JPG calidad ~82, lado largo ≤ 1600 px salvo indicación; los recortes de producto, **PNG transparente**.
- Todo `src` que empieza por `/ejemplo/` lleva la etiqueta «Foto de ejemplo».
- Logos de marcas: nunca con IA (el contrato solo trae nombres; la web los pinta en texto).

| Archivo | Prop. | Spec | Dónde se usa (campo) | Qué debe mostrar |
|---|---|---|---|---|
| `hero-bodegon-1.png` | 10:7 · PNG transp. | IMG-01 | Hero, diapositiva 1 (`imagenesHero[0]`) | Bodegón de herrajes de aluminio y PVC en semicírculo (bisagras, manillas, cremonas, ruedas, escuadras) |
| `hero-bodegon-2.png` | 10:7 · PNG transp. | IMG-02 | Hero, diapositiva 2 (`imagenesHero[1]`) | Mano con un móvil fotografiando una manilla desgastada, con piezas nuevas alrededor |
| `fachada.jpg` | 2:1 | IMG-03 | Horario + fachada, /contacto, «Cómo llegar» (`empresa.imagenes[0]`) | Fachada del almacén (nave con persiana abierta), rótulo sin texto legible. **Foto real del cliente** |
| `almacen.jpg` | 16:9 | IMG-17 | Bloque «Desde {año}» (`empresa.imagenes[1]`) | Estanterías altas con cajetines. **Foto real** |
| `mostrador.jpg` | 6:5 | IMG-46 | /empresa, historia (`empresa.imagenes[2]`) | Mostrador atendiendo a un profesional. **Foto real** |
| `tile-<familia>.jpg` ×7 | 4:3 (≈ 1,38:1 en escritorio) · oscura | IMG-04…10 | Rejilla de familias de inicio y mosaico CTA (`lib/catalogo.ts` → `tile`) | Primer plano del producto de la familia sobre fondo oscuro, sin texto |
| `tile-ver-todo.jpg` | 4:3 · oscura | IMG-11 | Último tile «Ver todos» (`IMAGENES.verTodo`) | Pasillo de estanterías con cajetines |
| `composicion.png` | 1:1 · PNG transp. | IMG-12 | «Cómo trabajamos» y /contacto (`IMAGENES.composicion`) | Herrajes y herramientas en abanico alrededor de un **círculo blanco vacío** (ahí va el nombre o logo, ≈ 38 % del ancho) |
| `proceso-1…4.jpg` | 6:5 | IMG-13…16 | Tarjetas de «Cómo trabajamos» (`IMAGENES.proceso`) | 1 móvil con chat y foto de una pieza · 2 mostrador identificando un herraje · 3 carpintero instalando una ventana · 4 cajas de pedido preparadas |
| `portada-productos.jpg` | ≈ 2,75:1 | IMG-19 | PageHero de /servicios (`IMAGENES.portadas.productos`) | Surtido de herrajes sobre superficie metálica oscura; centro libre para el título |
| `portada-empresa.jpg` | ≈ 2,7:1 | IMG-45 | PageHero de /empresa (`IMAGENES.portadas.empresa`) | Flat-lay de herrajes y herramientas sobre fondo burdeos oscuro |
| `portada-contacto.jpg` | ≈ 2,75:1 | IMG-54 | PageHero de /contacto (`IMAGENES.portadas.contacto`) | Persona hablando por el móvil en un taller (sin cara reconocible) |
| `familia-<familia>.jpg` ×8 | 3:2 · clara | IMG-20…27 | Tarjetas de /servicios y familias destacadas (`servicios[].imagenes[0]`) | Producto de la familia sobre gris claro |
| `familia-<familia>-contexto.jpg` ×3 | 3:2 | IMG-F{nn}-00 | Foto central de la página de familia (`servicios[].imagenes[1]`) | Herraje montado en una ventana o puerta real |
| `sub-<familia>-<n>.png` ×11 | 1:1 · PNG transp. | IMG-F{nn}-01… | Tarjetas de subfamilia (`lib/catalogo.ts` → `subfamilias[].imagen`) | Un producto aislado por subfamilia, foto de catálogo con sombra suave |

`<familia>`: `herrajes-de-aluminio`, `herrajes-de-pvc`, `cerraduras-y-cilindros`, `bisagras-y-pernios`, `manillas-y-tiradores`, `ruedas-y-rodamientos`, `juntas-y-felpudos` (+ `persiana-y-mosquitera` solo en `familia-`). Contexto y subfamilias: solo las 3 primeras.
