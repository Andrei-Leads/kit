# Prompts de ChatGPT: fotos de ejemplo de `tienda-1` «Almacén»

Este documento tiene 21 prompts para las fotos de `public/ejemplo/` del template `tienda-1`: un almacén de herrajes y recambios para carpintería de aluminio y PVC, con mostrador abierto al público, en un polígono del sur de Madrid. Son las fotos que necesita la demo para verse completa.

Quedan fuera las 11 fotos de familia (`familia-*.jpg`) y los 11 recortes de subfamilia (`sub-*.png`). Se piden cuando el cliente confirme su lista de familias.

Cada ficha trae un prompt completo: se copia entero.

## 0. Resumen: qué hay que generar

Guarda cada imagen con el **número de ficha** como nombre (por ejemplo `1.1.png`) en `andrei-leads-tech/material/fotos-ejemplo/tienda-1/`. No conviertas ni renombres nada: Claude lo hace después.

| Ficha | Guardar como | Foto final | Qué se ve | Pedir en | Registro |
|---|---|---|---|---|---|
| 1.1 | `1.1.png` | `hero-bodegon-1.png` | Bodegón de herrajes en semicírculo, **fondo transparente** | 4:3 | Profesional (estudio) |
| 1.2 | `1.2.png` | `hero-bodegon-2.png` | Mano con móvil fotografiando una manilla gastada, **fondo transparente** | 4:3 | Profesional (estudio) |
| 1.3 | `1.3.png` | `tile-herrajes-de-aluminio.jpg` | Cremonas y escuadras de aluminio, fondo oscuro | 4:3 | Profesional |
| 1.4 | `1.4.png` | `tile-herrajes-de-pvc.jpg` | Herraje oscilobatiente de PVC, fondo oscuro | 4:3 | Profesional |
| 1.5 | `1.5.png` | `tile-cerraduras-y-cilindros.jpg` | Cerradura de embutir y cilindros, fondo oscuro | 4:3 | Profesional |
| 1.6 | `1.6.png` | `tile-bisagras-y-pernios.jpg` | Bisagras y pernios en fila, fondo oscuro | 4:3 | Profesional |
| 1.7 | `1.7.png` | `tile-manillas-y-tiradores.jpg` | Manillas y tiradores de varios acabados, fondo oscuro | 4:3 | Profesional |
| 1.8 | `1.8.png` | `tile-ruedas-y-rodamientos.jpg` | Ruedas de corredera, fondo oscuro | 4:3 | Profesional |
| 1.9 | `1.9.png` | `tile-juntas-y-felpudos.jpg` | Rollos de junta y felpudo, fondo oscuro | 4:3 | Profesional |
| 1.10 | `1.10.png` | `tile-ver-todo.jpg` | Pasillo de estanterías con cajetines, en penumbra | 4:3 | Profesional |
| 1.11 | `1.11.png` | `composicion.png` | Herrajes y herramientas en corona con el centro vacío, **fondo transparente** | 1:1 | Profesional (estudio) |
| 1.12 | `1.12.png` | `proceso-1.jpg` | Mano con móvil y la foto de una pieza en la pantalla | 4:3 | Móvil |
| 1.13 | `1.13.png` | `proceso-2.jpg` | Mostrador: pieza vieja y pieza nueva comparadas | 4:3 | Móvil |
| 1.14 | `1.14.png` | `proceso-3.jpg` | Carpintero instalando una ventana de aluminio, de espaldas | 4:3 | Móvil |
| 1.15 | `1.15.png` | `proceso-4.jpg` | Cajas de pedido preparadas en el almacén | 4:3 | Móvil |
| 1.16 | `1.16.png` | `portada-productos.jpg` | Surtido de herrajes sobre chapa oscura, centro libre | 4:3 | Profesional |
| 1.17 | `1.17.png` | `portada-empresa.jpg` | Flat-lay de herrajes y herramientas sobre burdeos oscuro | 4:3 | Profesional |
| 1.18 | `1.18.png` | `portada-contacto.jpg` | Persona hablando por el móvil en un taller, de espaldas | 4:3 | Profesional |
| 1.19 | `1.19.png` | `fachada.jpg` | Fachada de la nave con la persiana abierta | 4:3 | Profesional |
| 1.20 | `1.20.png` | `almacen.jpg` | Interior del almacén: estanterías altas con cajetines | 4:3 | Profesional |
| 1.21 | `1.21.png` | `mostrador.jpg` | Mostrador atendiendo a un profesional, sin caras | 4:3 | Profesional |

**Las tres últimas (1.19–1.21) son provisionales.** En la web del cliente se sustituyen por sus fotos reales.

**Las 7 fotos de familia (1.3–1.9) forman una serie.** Genéralas en una sola conversación, empezando por la 1.3, y pide que mantengan el mismo fondo y la misma luz. Así la rejilla se ve homogénea.

## 1. Cómo usarlo

1. **Una conversación nueva por foto**, salvo la serie de familia 1.3–1.9.
2. **Pega el prompt de la ficha entero.** Si sale mal, pide un ajuste concreto («quita la etiqueta», «más margen a la derecha») en vez de rehacerlo.
3. **Fondo transparente** (1.1, 1.2 y 1.11): si llega con fondo, pide en la misma conversación «Hazla otra vez igual pero con fondo transparente, PNG con canal alfa».
4. **Formato de entrega:** ChatGPT entrega PNG de 1448×1086 (4:3) o 1254×1254 (1:1). Guárdalo tal cual.
5. **La web recorta las fotos** con `object-fit: cover`, por eso cada prompt pide el sujeto centrado y con margen. Proporciones finales:
   - Fachada: 2:1, 4:3 y 16:10.
   - Almacén: 16:9.
   - Mostrador y «cómo trabajamos»: 6:5.
   - Portadas: unos 2,9:1 en escritorio y unos 1,5:1 en móvil.
6. **Etiqueta «Foto de ejemplo»:**
   - En casi todas va en la **esquina superior izquierda**.
   - En las portadas va en la **inferior derecha**.
   - En las portadas, además, el centro lleva encima el título en blanco sobre un velo negro al 50 %.
   - En las fotos de familia, el nombre de la familia va centrado en blanco sobre un velo negro al 45 %.

## 2. Bloque de estilo común

Fija solo la paleta, los dos registros de foto y las prohibiciones. Ya va resumido dentro de cada prompt; aquí está entero por si quieres ajustar toda la serie. La escena, el plano y la luz cambian en cada ficha: si no, ChatGPT repite la misma foto.

```
Paleta: grises de nave (cemento, chapa galvanizada, estanterías gris claro), metal plateado, negro y bronce de los herrajes, tinta casi negra en sombras (#20292c) y un único acento burdeos (#A8243C) en un detalle pequeño. Contexto: almacén mayorista de herrajes para carpintería de aluminio y PVC en un polígono del sur de Madrid; trato de mostrador de toda la vida.

Registro «foto profesional»: fotógrafo contratado por la empresa, cámara buena, luz natural o de estudio cuidada, composición limpia y ordenada, lugares y objetos reales; nada de banco de imágenes.

Registro «foto de móvil»: la hace con su iPhone alguien del almacén o un cliente profesional para enseñarla por WhatsApp; modo foto estándar, casi todo enfocado, luz real del sitio (fluorescentes de nave, luz de obra), encuadre natural algo imperfecto y cosas reales alrededor.

Prohibido en todas: texto, rótulos, etiquetas, logotipos, marcas o números legibles (en cajas, cajetines, herrajes, pantallas o persianas); caras reconocibles (personas de espaldas, solo manos o con la cabeza fuera de cuadro); aspecto de cine (luz dramática, hora azul, contraluces, velas, niebla, bokeh exagerado, gradación de color); ilustración, render 3D o foto de stock posada.
```

## 3. Fichas

### 1.1 `hero-bodegon-1.png`

- **Dónde:** hero de inicio, diapositiva 1, a la derecha del titular. Sobresale por el borde derecho en escritorio. En móvil va arriba, en una caja 16:9 que la muestra entera (`object-contain`).
- **Quién hace la foto y por qué:** un fotógrafo de producto en estudio, para el catálogo del almacén.

```
Fotografía de producto profesional en estudio, cámara buena, luz de estudio suave y uniforme desde arriba a la izquierda, sombras suaves de contacto, sin efectos. Proporción 4:3 horizontal, FONDO TRANSPARENTE (PNG con canal alfa), sin suelo ni pared. Bodegón de herrajes para ventanas y puertas de aluminio y PVC agrupados formando un semicírculo abierto hacia la izquierda, como flotando y ligeramente superpuestos: dos bisagras de ventana, una manilla negra, una cremona plateada, tres ruedas de corredera, una escuadra de unión de aluminio, un cierre de gancho y un cilindro de cerradura dorado. Metal plateado, negro y algún bronce; una sola pieza pequeña en burdeos (#A8243C), por ejemplo el tapón de una manilla. El grupo ocupa el 85 % del ancho, centrado en vertical, con margen arriba y abajo; la esquina superior izquierda queda vacía. Piezas físicamente creíbles, a escala real entre ellas. Sin texto, marcas, logotipos ni números grabados legibles en ninguna pieza. No es render 3D ni ilustración.
```

### 1.2 `hero-bodegon-2.png`

- **Dónde:** hero de inicio, diapositiva 2 («¿No sabes qué pieza es? Mándanos una foto»). Mismo hueco que la 1.1.
- **Quién hace la foto y por qué:** el mismo fotógrafo de estudio, para explicar en una imagen el servicio de «mándanos foto».

```
Fotografía de producto profesional en estudio, cámara buena, luz de estudio suave desde la izquierda, sombras suaves, sin efectos. Proporción 4:3 horizontal, FONDO TRANSPARENTE (PNG con canal alfa), sin suelo ni pared. En el centro, una mano de adulto (solo la mano y parte del antebrazo, entrando desde la derecha, cinco dedos bien formados) sujeta un smartphone en horizontal que está fotografiando una manilla de ventana vieja y gastada, con la pintura blanca saltada y el eje marcado; en la pantalla del móvil se ve la propia manilla en la cámara, sin iconos ni texto de la interfaz. Alrededor, como flotando en semicírculo, tres o cuatro manillas y piezas nuevas equivalentes en plateado y negro, una con un pequeño detalle burdeos (#A8243C). El conjunto ocupa el 85 % del ancho con margen arriba y abajo; la esquina superior izquierda queda vacía. Sin texto, marcas ni logotipos en el móvil ni en las piezas. No es render 3D ni ilustración.
```

### Serie de familias (1.3–1.9) y «ver todo» (1.10)

- **Dónde:** rejilla de 8 tiles a sangre en inicio y mosaico del fondo de la banda «¿No sabes qué pieza es?».
- **Recortes:** 4:3 en móvil y unos 1,38:1 en escritorio.
- **Encima de cada foto:** el nombre de la familia en blanco, centrado, sobre un velo negro al 45 %. Por eso el producto debe leerse bien aunque quede algo tapado en el centro.
- **Quién hace la foto y por qué:** el fotógrafo, en la misma sesión, para las portadas de cada familia.
- **Cómo generarlas:** en una sola conversación, empezando por la 1.3. Para cada siguiente, pega su prompt y añade «misma luz, mismo fondo y mismo encuadre que la primera».

### 1.3 `tile-herrajes-de-aluminio.jpg`

```
Fotografía de producto profesional, cámara buena, luz lateral suave desde la izquierda que saca brillo al metal, sin efectos ni contraluz. Proporción 4:3 horizontal. Primer plano en picado a 45° de herrajes para ventana de aluminio sobre una chapa de acero negro mate con ligera textura: dos cremonas plateadas, tres escuadras de unión de aluminio en bruto y unos tornillos sueltos, colocados con cierto orden pero no perfecto. Fondo oscuro (casi negro, #20292c), el metal es lo único claro. Las piezas ocupan la zona central con margen alrededor; la esquina superior izquierda queda oscura y vacía. Sin texto, marcas ni números legibles. Sin personas. No es render 3D, ni ilustración, ni foto de stock posada.
```

### 1.4 `tile-herrajes-de-pvc.jpg`

```
Fotografía de producto profesional, cámara buena, luz lateral suave desde la izquierda, sin efectos. Proporción 4:3 horizontal. Misma chapa de acero negro mate y misma luz que la foto anterior, pero esta vez visto en plano cenital: un kit de herraje oscilobatiente para ventana de PVC desplegado en diagonal (compás, cremona perimetral, bisagra de hoja y bulones), plateado con algún componente negro, y una bisagra blanca de PVC al lado. Fondo casi negro (#20292c). Piezas en la zona central con margen; esquina superior izquierda oscura y vacía. Sin texto, marcas ni números legibles. Sin personas. No es render 3D ni ilustración.
```

### 1.5 `tile-cerraduras-y-cilindros.jpg`

```
Fotografía de producto profesional, cámara buena, luz lateral suave desde la izquierda, sin efectos. Proporción 4:3 horizontal. Plano a ras de la superficie, bajo y cercano: una cerradura de embutir para puerta de aluminio tumbada sobre la misma chapa negra mate, y delante tres cilindros de seguridad (dos plateados y uno dorado) de pie, con sus llaves de serreta sin marcas. Profundidad de campo media: lo del fondo ligeramente desenfocado. Fondo casi negro (#20292c). Grupo en el centro con margen; esquina superior izquierda oscura y vacía. Sin texto, marcas ni números legibles. Sin personas. No es render 3D ni ilustración.
```

### 1.6 `tile-bisagras-y-pernios.jpg`

```
Fotografía de producto profesional, cámara buena, luz lateral suave desde la izquierda, sin efectos. Proporción 4:3 horizontal. Plano cenital: una fila diagonal de bisagras de distintos tamaños (bisagras de ventana de aluminio, pernios de puerta, una bisagra de corredera) en plateado, negro y bronce, algunas abiertas y otras cerradas, sobre la misma chapa negra mate. Fondo casi negro (#20292c). Fila en el centro con margen; esquina superior izquierda oscura y vacía. Sin texto, marcas ni números legibles. Sin personas. No es render 3D ni ilustración.
```

### 1.7 `tile-manillas-y-tiradores.jpg`

```
Fotografía de producto profesional, cámara buena, luz lateral suave desde la izquierda, sin efectos. Proporción 4:3 horizontal. Plano a 30° sobre la misma chapa negra mate: cinco manillas de ventana y de puerta alineadas en abanico en acabados distintos (aluminio plateado, negro mate, blanco, bronce viejo y una en burdeos #A8243C) y dos tiradores rectos de puerta corredera. Fondo casi negro (#20292c). Grupo en el centro con margen; esquina superior izquierda oscura y vacía. Sin texto, marcas ni números legibles. Sin personas. No es render 3D ni ilustración.
```

### 1.8 `tile-ruedas-y-rodamientos.jpg`

```
Fotografía de producto profesional, cámara buena, luz lateral suave desde la izquierda, sin efectos. Proporción 4:3 horizontal. Macro cercano: un montón suelto de ruedas de corredera para ventanas de aluminio y PVC (ruedas de nailon blanco y negro con rodamiento metálico, algunas montadas en su carro de aluminio) sobre la misma chapa negra mate; una rueda en primer plano nítida y el resto algo desenfocado. Fondo casi negro (#20292c). Grupo en el centro con margen; esquina superior izquierda oscura y vacía. Sin texto, marcas ni números legibles. Sin personas. No es render 3D ni ilustración.
```

### 1.9 `tile-juntas-y-felpudos.jpg`

```
Fotografía de producto profesional, cámara buena, luz lateral suave desde la izquierda, sin efectos. Proporción 4:3 horizontal. Plano cenital: tres rollos de junta de goma negra (EPDM) de distintos perfiles y dos rollos de felpudo gris (cepillo para correderas), uno de ellos desenrollado en curva, sobre la misma chapa negra mate. Fondo casi negro (#20292c); los rollos se distinguen por su textura gracias a la luz rasante. Grupo en el centro con margen; esquina superior izquierda oscura y vacía. Sin texto, marcas, etiquetas ni números legibles. Sin personas. No es render 3D ni ilustración.
```

### 1.10 `tile-ver-todo.jpg`

- **Dónde:** último tile, «Ver todos los productos», que enlaza al índice. Va con el mismo velo que el resto.
- **Quién hace la foto y por qué:** el fotógrafo, para enseñar el volumen de stock del almacén.

```
Fotografía profesional, cámara buena, objetivo de 35 mm, luz real de nave con fluorescentes del techo algo apagados, ambiente en penumbra pero legible, sin efectos. Proporción 4:3 horizontal. Plano a la altura de los ojos por el centro de un pasillo largo entre dos estanterías metálicas grises muy altas, llenas de cajetines de plástico y cajas de cartón ordenadas, que se pierde en profundidad (punto de fuga en el centro). Suelo de cemento pulido. Colores apagados: grises, azul oscuro de los cajetines y marrón de las cajas; una caja con una cinta burdeos (#A8243C) como único acento. Sin personas. Esquina superior izquierda tranquila. Sin texto, etiquetas, códigos de barras, logotipos ni números legibles en cajetines o cajas. No es render 3D ni foto de stock.
```

### 1.11 `composicion.png`

- **Dónde:** sección «Cómo trabajamos» de inicio y /contacto.
- **Encima de la foto:** la web pinta un círculo blanco en el centro, del 38 % del ancho, con el nombre del negocio (o su logo). Por eso el centro debe quedar vacío y transparente.
- **Quién hace la foto y por qué:** el fotógrafo de estudio, como imagen de marca del almacén.

```
Fotografía de producto profesional en estudio, cámara buena, luz de estudio suave y uniforme, sombras suaves, sin efectos. Proporción 1:1 cuadrada, FONDO TRANSPARENTE (PNG con canal alfa). Composición circular tipo corona: herrajes y herramientas de carpintería metálica dispuestos en abanico alrededor de un círculo central completamente VACÍO y transparente que ocupa el 40 % del ancho (en ese hueco no debe haber nada). Piezas que apuntan hacia fuera desde el borde del hueco: un atornillador, una remachadora, una escuadra metálica, una sierra de arco pequeña, dos bisagras, dos manillas, una cremona, ruedas de corredera, un rollo de junta y un cilindro de cerradura. Metal plateado, negro y bronce, con un mango de herramienta en burdeos (#A8243C). La corona ocupa casi todo el cuadrado con un margen fino; la esquina superior izquierda queda vacía. Sin texto, marcas ni logotipos. No es render 3D ni ilustración.
```

### «Cómo trabajamos» (1.12–1.15)

- **Dónde:** las 4 tarjetas de la sección, en recorte 6:5. La 1.12 se usa también como caja «Cómo trabajamos» en /empresa (16:10).
- **Cómo pedirlas:** en 4:3 con el sujeto en el centro.

### 1.12 `proceso-1.jpg` (Mándanos una foto)

- **Quién hace la foto y por qué:** la hace un carpintero cliente con su iPhone. Es la foto de su propia mano enviando la pieza por WhatsApp, y el almacén la usa con su permiso.

```
Foto de móvil realista: hecha con un iPhone en modo foto estándar, casi todo enfocado, luz real de un taller (fluorescente y luz de ventana), encuadre natural algo imperfecto. Proporción 4:3 horizontal. Primer plano de una mano de hombre con algo de grasa en los dedos (cinco dedos bien formados) que sostiene un smartphone en vertical encima de un banco de trabajo; en la pantalla se ve una conversación de chat genérica con burbujas de colores y, dentro, la foto de una rueda de corredera vieja; los textos de la pantalla son líneas grises ilegibles. Al fondo, desenfocado, el banco con perfiles de aluminio cortados y la rueda vieja real junto al móvil. Sujeto centrado con margen; esquina superior izquierda tranquila. Sin texto legible, logotipos ni marcas (tampoco de la app ni del móvil). Sin caras. No es foto de stock posada.
```

### 1.13 `proceso-2.jpg` (La identificamos en el mostrador)

- **Quién hace la foto y por qué:** la hace el dependiente con su móvil, para enseñar a un cliente por WhatsApp que la pieza nueva es igual a la vieja.

```
Foto de móvil realista: iPhone en modo foto estándar, casi todo enfocado, luz real de mostrador (fluorescentes del techo), encuadre algo imperfecto. Proporción 4:3 horizontal. Plano cenital cercano sobre un mostrador de melamina gris gastado: a la izquierda una cremona vieja, sucia y con el plástico roto; a la derecha la misma cremona nueva y brillante; dos manos (solo manos, con un guante de trabajo en una) las señalan para compararlas. Alrededor, una libreta cerrada, un calibre metálico y una bolsa de tornillos. Sujeto centrado con margen; esquina superior izquierda tranquila. Sin texto, etiquetas, logotipos ni números legibles. Sin caras. No es foto de stock posada.
```

### 1.14 `proceso-3.jpg` (Atención a profesionales)

- **Quién hace la foto y por qué:** la hace el encargado de una carpintería cliente con su móvil, durante una obra, para mandársela al almacén y mostrar dónde ha ido el material.

```
Foto de móvil realista: iPhone en modo foto estándar, casi todo enfocado, luz natural de un piso en obra (ventana sin cortinas, día nublado), encuadre natural. Proporción 4:3 horizontal. Un carpintero de aluminio de espaldas (con la cabeza fuera de cuadro o de espaldas, sin cara), con camiseta gris y pantalón de trabajo, está ajustando con un destornillador la hoja de una ventana corredera de aluminio blanco recién colocada en un salón vacío de paredes en yeso. En el suelo, la caja de herramientas abierta, recortes de perfil y una caja de cartón de herrajes. Sujeto centrado con margen; esquina superior izquierda tranquila. Sin texto, logotipos ni marcas legibles en ropa, herramientas o cajas. No es foto de stock posada.
```

### 1.15 `proceso-4.jpg` (Listo para recoger)

- **Quién hace la foto y por qué:** la hace el mozo de almacén con su móvil, para avisar por WhatsApp a un cliente de que su pedido ya está preparado.

```
Foto de móvil realista: iPhone en modo foto estándar, casi todo enfocado, luz real de nave (fluorescentes, algo de luz de la persiana abierta al fondo), encuadre algo torcido. Proporción 4:3 horizontal. Plano en picado de un palé de madera junto a la zona de expedición con cuatro cajas de cartón de distintos tamaños cerradas con cinta marrón, una de ellas con una cinta burdeos (#A8243C), y encima un manojo de perfiles de junta enrollados y atados con brida. Suelo de cemento con marcas de uso. Al fondo, desenfocada, una estantería. Sujeto centrado con margen; esquina superior izquierda tranquila. Sin texto, etiquetas de envío, códigos de barras, logotipos ni números legibles. Sin personas. No es foto de stock posada.
```

### Portadas de página (1.16–1.18)

- **Dónde:** banda de 500 px de alto a todo el ancho en escritorio (unos 2,9:1). En móvil, 260 px de alto (unos 1,5:1).
- **Encima de la foto:** velo negro al 50 % y título de página en blanco, centrado, de 80 px. Además hay una animación de zoom lento.
- **Zona segura:** pídelas en 4:3, con todo lo interesante en una **franja horizontal central del 35 % del alto** y el **centro exacto tranquilo** para el título. Lo de arriba y abajo se pierde en escritorio.
- **Etiqueta:** en la esquina inferior derecha.

### 1.16 `portada-productos.jpg`

- **Quién hace la foto y por qué:** el fotógrafo contratado, como imagen de cabecera del catálogo.

```
Fotografía profesional, cámara buena, luz de estudio suave lateral desde la derecha, sin efectos. Proporción 4:3 horizontal. Plano cenital de un surtido amplio de herrajes (bisagras, manillas, cremonas, escuadras, ruedas, tornillos) repartidos sobre una chapa de acero oscuro con un ligero brillo cepillado, formando DOS grupos a izquierda y derecha y dejando el CENTRO de la imagen casi vacío (solo chapa). Todo dentro de una franja horizontal central: la parte de arriba y la de abajo son chapa lisa. Paleta: acero oscuro, plata, negro y bronce, con una sola pieza burdeos (#A8243C). Esquina inferior derecha tranquila. Sin texto, marcas ni números legibles. Sin personas. No es render 3D ni ilustración.
```

### 1.17 `portada-empresa.jpg`

- **Quién hace la foto y por qué:** el fotógrafo contratado, como imagen de marca para «Sobre nosotros». Tiene el fondo del color de la empresa.

```
Fotografía profesional, cámara buena, luz natural suave cenital, sin efectos. Proporción 4:3 horizontal. Flat-lay sobre un fondo liso de cartulina o lona en burdeos oscuro mate (#5c1420, un tono más oscuro que #A8243C): herramientas y herrajes de carpintería metálica ordenados en una banda horizontal por el centro del alto (un metro de carpintero plegado, una escuadra, unos alicates, un atornillador, bisagras, una manilla, ruedas de corredera, tornillos), dispersos hacia los lados y con el CENTRO exacto despejado. Arriba y abajo, solo fondo burdeos liso. Metal plateado y negro sobre el burdeos. Esquina inferior derecha tranquila. Sin texto, marcas, logotipos ni números legibles (tampoco en el metro). Sin personas. No es render 3D ni ilustración.
```

### 1.18 `portada-contacto.jpg`

- **Quién hace la foto y por qué:** el fotógrafo contratado, para la página de contacto: un profesional llamando al almacén desde su taller.

```
Fotografía profesional, cámara buena, objetivo de 35 mm, luz natural de un taller con portón abierto a un lado, sin efectos. Proporción 4:3 horizontal. Un hombre de unos cuarenta años con ropa de trabajo azul marino, DE ESPALDAS y a la derecha del encuadre (cabeza de espaldas o fuera de foco, sin cara visible), habla por el móvil apoyado en un banco de trabajo de un taller de carpintería metálica; sobre el banco, perfiles de aluminio, una ingletadora y cajas de herrajes. Todo lo importante dentro de una franja horizontal central; el centro exacto de la imagen es una zona tranquila del taller (pared o estantería desenfocada). Colores: azul marino, gris de taller, aluminio. Esquina inferior derecha tranquila. Sin texto, logotipos ni marcas legibles en ropa, máquinas o cajas. No es foto de stock posada.
```

### Tienda (1.19–1.21): provisionales

Se sustituyen por las fotos reales del cliente.

### 1.19 `fachada.jpg`

- **Dónde y recortes:**
  - Junto al horario en inicio, en 2:1.
  - Fondo de la ficha de la sede en /contacto, en unos 4:3, con la dirección y «Cómo llegar» abajo a la izquierda sobre un degradado oscuro.
  - Caja «Cómo llegar» en /empresa, en 16:10.
- **Zona segura:** la fachada entera, centrada en una franja central.
- **Quién hace la foto y por qué:** el fotógrafo contratado, para que el cliente reconozca la nave al llegar.

```
Fotografía profesional, cámara buena, objetivo de 28 mm, mañana de día claro con luz suave de lado, sin efectos ni cielo dramático. Proporción 4:3 horizontal. Fachada frontal de una nave industrial de un polígono del sur de Madrid: muro de bloque gris claro y chapa gris, una persiana metálica grande levantada que deja ver el interior iluminado con estanterías y un mostrador al fondo, una puerta peatonal de aluminio a un lado y un rótulo rectangular burdeos (#A8243C) SIN NINGÚN TEXTO sobre la persiana. Acera, un bordillo y una furgoneta blanca sin rotular aparcada de lado a la izquierda. La nave ocupa la franja central del alto con margen a ambos lados. Esquina superior izquierda tranquila (cielo o muro). Sin texto, rótulos, matrículas, logotipos ni números legibles. Sin personas reconocibles. No es render 3D ni foto de stock.
```

### 1.20 `almacen.jpg`

- **Dónde:** bloque «¡Desde 1986!» en inicio, en 16:9.
- **Quién hace la foto y por qué:** el fotógrafo contratado, para transmitir «almacén de toda la vida».

```
Fotografía profesional, cámara buena, objetivo de 24 mm, luz cálida de nave (fluorescentes y luz natural que entra por una claraboya), sin efectos. Proporción 4:3 horizontal, con lo importante en la franja central (se recorta a 16:9). Vista en diagonal del interior de un almacén veterano: estanterías metálicas altas hasta el techo llenas de cajetines de plástico azul y gris y cajas de cartón ordenadas, una escalera de almacén con ruedas apoyada en una estantería, una carretilla manual y suelo de cemento pulido con marcas de uso. Sensación de orden y de muchos años de oficio. Sin personas. Esquina superior izquierda tranquila. Sin texto, etiquetas, códigos de barras, logotipos ni números legibles. No es render 3D ni foto de stock.
```

### 1.21 `mostrador.jpg`

- **Dónde:** foto de la historia en /empresa, en 6:5.
- **Quién hace la foto y por qué:** el fotógrafo contratado, para enseñar el trato de mostrador.

```
Fotografía profesional, cámara buena, objetivo de 35 mm, luz real de mostrador (fluorescentes) equilibrada con luz de la puerta, sin efectos. Proporción 4:3 horizontal, sujeto en el centro (se recorta a 6:5). Mostrador largo de un almacén de herrajes: detrás, un dependiente veterano con canas y bata gris, de perfil girado de espaldas (sin cara visible), enseña una bisagra a un carpintero que está delante, de espaldas a la cámara, con ropa de trabajo. Sobre el mostrador, cajas de herrajes abiertas, un catálogo cerrado sin texto visible y un calibre. Detrás, estanterías con cajetines. Esquina superior izquierda tranquila. Sin caras, sin texto, etiquetas, logotipos ni números legibles. No es foto de stock posada.
```

## 4. Después

Cuando estén en `material/fotos-ejemplo/tienda-1/`, Claude:

1. Las revisa en una hoja de contactos: sin texto, logos ni caras.
2. Las convierte con Pillow:
   - JPG de calidad ~82, recortado a la proporción de `CREDITOS.md` y con el lado largo ≤ 1600 px sin ampliar.
   - Las 1.1, 1.2 y 1.11 se quedan en PNG con transparencia.
3. Las copia con el nombre exacto a `templates/tienda/tienda-1/public/ejemplo/`.
4. Actualiza `CREDITOS.md` con el origen «Generada con IA (ChatGPT, OpenAI)».

Las fotos de IA son solo para demos: nunca se presentan como trabajos o instalaciones de un cliente.
