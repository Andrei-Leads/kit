# Prompts de ChatGPT: fotos de ejemplo de `carpinteria-metalica-2` «Exposición»

Veintitrés fotos para `public/ejemplo/` del template 2 (negocio con exposición o tienda abierta al público: ventanas de aluminio y PVC, cerramientos, toldos, mamparas y puertas), más seis **opcionales** solo para la variante de prueba «galería sin trabajos». Cada ficha trae un prompt autosuficiente (estilo + escena + proporción + exclusiones): se copia entero. Las dos fotos de equipo van sin caras (de espaldas, cuadro cortado a la altura del cuello).

## 0. Resumen: qué hay que generar

**23 fotos necesarias (2.1–2.23) + 6 opcionales (2.24–2.29, solo galería de prueba). Proporción: 4:3 en 15 (más las 6 opcionales) y 1:1 en 8 (2.2, 2.6–2.10 y las dos de equipo, 2.22 y 2.23).**

Guarda cada imagen con el **número de ficha** como nombre (p. ej. `2.1.png`). No hace falta convertir ni renombrar nada más: Claude lo hace después.

| Ficha | Guardar como | Foto final | Qué se ve | Proporción |
|---|---|---|---|---|
| 2.1 | `2.1.png` | `hero-exposicion.jpg` | Interior de una exposición con varios modelos de ventana montados | 4:3 (se recorta a 5:2 y 4:5) |
| 2.2 | `2.2.png` | `cat-ventanas-aluminio.jpg` | Ventana corredera de aluminio gris antracita en un salón | 1:1 (se recorta a 4:5 y 4:3) |
| 2.3 | `2.3.png` | `cat-ventanas-aluminio-2.jpg` | Perfil de aluminio cortado con rotura de puente térmico | 4:3 (también 1:1) |
| 2.4 | `2.4.png` | `cat-ventanas-aluminio-3.jpg` | Muestrario de colores de lacado | 4:3 (también 1:1) |
| 2.5 | `2.5.png` | `cat-ventanas-aluminio-4.jpg` | Ventana oscilobatiente de aluminio abierta en abatible | 4:3 (también 1:1) |
| 2.6 | `2.6.png` | `cat-ventanas-pvc.jpg` | Ventana oscilobatiente de PVC blanco abierta en abatible | 1:1 (se recorta a 4:5 y 4:3) |
| 2.7 | `2.7.png` | `cat-cerramientos.jpg` | Terraza cerrada con correderas de aluminio y cristal | 1:1 (se recorta a 4:5 y 4:3) |
| 2.8 | `2.8.png` | `cat-toldos.jpg` | Toldo de brazo extensible desplegado sobre una terraza | 1:1 (se recorta a 4:5 y 4:3) |
| 2.9 | `2.9.png` | `cat-mamparas.jpg` | Mampara de ducha de cristal templado con perfil negro | 1:1 (se recorta a 4:5 y 4:3) |
| 2.10 | `2.10.png` | `cat-puertas.jpg` | Puerta de entrada de aluminio gris oscuro con fijo lateral de cristal | 1:1 (se recorta a 4:5 y 4:3) |
| 2.11 | `2.11.png` | `trabajo-paterna.jpg` | Dormitorio con ventana nueva de aluminio blanco | 4:3 |
| 2.12 | `2.12.png` | `trabajo-paterna-antes.jpg` | La misma ventana antigua de aluminio, amarillenta, con condensación y moho | 4:3 |
| 2.13 | `2.13.png` | `trabajo-burjassot.jpg` | Terraza cerrada con correderas de aluminio y vistas a la calle | 4:3 (se recorta a 21:9) |
| 2.14 | `2.14.png` | `trabajo-burjassot-2.jpg` | Detalle de las guías de la corredera | 4:3 |
| 2.15 | `2.15.png` | `trabajo-burjassot-3.jpg` | La terraza cerrada vista desde el salón | 4:3 |
| 2.16 | `2.16.png` | `trabajo-burjassot-4.jpg` | Cerramiento con las tres hojas recogidas | 4:3 |
| 2.17 | `2.17.png` | `trabajo-godella.jpg` | Ducha con mampara fija de cristal y perfil negro | 4:3 (se recorta a 21:9) |
| 2.18 | `2.18.png` | `trabajo-rocafort.jpg` | Toldo de cofre desplegado sobre la terraza de un chalet | 4:3 (se recorta a 21:9) |
| 2.19 | `2.19.png` | `expo-1.jpg` | Fachada de una tienda de ventanas con escaparate | 4:3 (alto libre) |
| 2.20 | `2.20.png` | `expo-2.jpg` | Muestrario de colores de perfiles de aluminio en una pared | 4:3 |
| 2.21 | `2.21.png` | `expo-3.jpg` | Mampara de ducha expuesta en una tienda | 4:3 |
| 2.22 | `2.22.png` | `equipo-ricardo.jpg` | Ricardo (de espaldas) midiendo una ventana en la exposición | 1:1 |
| 2.23 | `2.23.png` | `equipo-elena.jpg` | Elena (a contraluz, sin cara) junto al muestrario de colores | 1:1 |
| 2.24 | `2.24.png` | `galeria-1.jpg` | Ventanas correderas de aluminio en un salón | 4:3 |
| 2.25 | `2.25.png` | `galeria-2.jpg` | Terraza cerrada con cortinas de cristal | 4:3 |
| 2.26 | `2.26.png` | `galeria-3.jpg` | Toldo de cofre sobre una terraza | 4:3 |
| 2.27 | `2.27.png` | `galeria-4.jpg` | Mampara de ducha con perfil negro | 4:3 |
| 2.28 | `2.28.png` | `galeria-5.jpg` | Puerta de entrada de aluminio gris | 4:3 |
| 2.29 | `2.29.png` | `galeria-6.jpg` | Mosquitera enrollable en una ventana | 4:3 |

**Pareja antes/después:** 2.11 `trabajo-paterna.jpg` («después», primero) y 2.12 `trabajo-paterna-antes.jpg` («antes», misma conversación, con la 2.11 como referencia). **Serie de la misma terraza:** 2.13–2.16 (Burjassot): genérala en una sola conversación, empezando por la 2.13. El hero (2.1) y las tres de 21:9 (2.13, 2.17, 2.18) llevan el sujeto en una franja central.

## 1. Cómo usarlo

1. Una conversación nueva de ChatGPT (con generación de imágenes) por foto, salvo la pareja antes/después (ver punto 3).
2. Pega el prompt de la ficha entero. Si sale mal, pide un ajuste concreto («sin el rótulo», «más luz lateral») en vez de rehacerlo.
3. **Pareja antes/después:** genera primero la foto «después» y, en **la misma conversación**, pide el «antes» con el prompt de su ficha, que usa la primera como referencia (misma ventana, mismo encuadre, misma luz; solo cambia el estado). El «antes» debe mostrar la avería o el desgaste **de forma muy visible**: si sale limpio, repite pidiendo «exagera el desgaste: que se vea a primera vista».
4. ChatGPT entrega PNG de 1448×1086 (4:3) o 1254×1254 (1:1). No lo conviertas: guarda el PNG con el número de ficha.
5. La web pinta la etiqueta «Foto de ejemplo» en la **esquina inferior izquierda** y recorta con `object-fit: cover` a varias proporciones: por eso cada ficha deja libre esa esquina y pide el sujeto **centrado con margen alrededor**.
6. **Revisa cada imagen antes de guardarla:** sin texto, rótulos, logos ni marcas legibles; sin caras (si aparece una persona, de espaldas, solo manos o con la cara fuera de cuadro); manos con cinco dedos; perfiles, bisagras y guías físicamente posibles; sin aspecto exagerado de foto de stock.
7. Al terminar, Claude rellena `public/ejemplo/CREDITOS.md` con origen «Generada con IA (ChatGPT), fecha» y licencia propia.

## 2. Bloque de estilo común

Ya va dentro de cada prompt; aquí está por si quieres ajustar toda la serie.

```
Fotografía realista documental, hecha con cámara réflex y objetivo de 35 mm, luz natural suave o luz cálida de tienda, sin retoque exagerado, grano muy ligero, profundidad de campo media. Contexto de la provincia de Valencia: viviendas residenciales mediterráneas y una exposición-tienda de ventanas en l'Horta Nord, fachadas encaladas en crema, cerámica clara, cielo azul con algo de bruma. Paleta cálida coherente en toda la serie: crema y piedra, grafito, tinta casi negra en sombras, toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en detalles mínimos. Sin caras reconocibles (si hay personas, de espaldas o con la cabeza fuera de cuadro). Sin texto, rótulos, logotipos, marcas ni números legibles. No es ilustración, ni render 3D, ni foto de stock posada.
```

## 3. Fichas

### Fotos de la web de ejemplo

#### 2.1 `hero-exposicion.jpg`

- **Dónde:** Hero de inicio.
- **Transmite:** Una tienda real donde se pueden ver y tocar los modelos.
- **Proporción y encuadre:** 4:3 (se recorta a 5:2 y 4:5); sujeto en el CENTRO con margen (el 5:2 pierde casi la mitad del alto y el 4:5 un tercio del ancho); los modelos en una franja central.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz cálida de tienda mezclada con luz natural del escaparate, grano muy ligero. Proporción 4:3 horizontal. Plano general del interior de una exposición de ventanas en Paterna (Valencia): varias ventanas completas montadas en un panel y en soportes de suelo, unas de aluminio gris antracita, otras de PVC blanco y una de aluminio color madera, en una sala diáfana de suelo de microcemento claro. En el centro, una mesa baja con muestras de perfil. Luz de tienda cálida mezclada con luz de escaparate. Ningún cartel con texto; solo paneles lisos. Todo lo importante en la franja central. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** sin precios, carteles ni logos en los expositores; ventanas con perfiles creíbles; sin reflejos que muestren personas.

#### 2.2 `cat-ventanas-aluminio.jpg`

- **Dónde:** Catálogo y servicio «Ventanas de aluminio» (principal).
- **Transmite:** Elegancia sobria del aluminio antracita en una casa real.
- **Proporción y encuadre:** 1:1 (se recorta a 4:5 y 4:3); ventana centrada con margen; valen los recortes 4:5 y 4:3.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media mañana, grano muy ligero. Proporción 1:1 cuadrada. Plano medio frontal de una ventana corredera de aluminio gris antracita de dos hojas en un salón luminoso de un piso de Valencia, con paredes crema, suelo de cerámica clara, una cortina de lino recogida y vistas desenfocadas a una calle con fachadas claras. Ventana centrada con margen amplio alrededor. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** perfil fino y continuo; hojas lógicas; sin marca.

#### 2.3 `cat-ventanas-aluminio-2.jpg`

- **Dónde:** Servicio «Ventanas de aluminio», galería.
- **Transmite:** La ingeniería: el corte del perfil con la barra aislante.
- **Proporción y encuadre:** 4:3 (también 1:1); macro del corte del perfil, centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz lateral suave de taller, grano muy ligero. Proporción 4:3 horizontal. Macro de la sección cortada de un perfil de aluminio lacado gris antracita, donde se aprecian las dos cámaras de aluminio unidas por una barra de poliamida negra (rotura de puente térmico). El corte limpio, brillante, sobre una mesa de taller de madera clara; al fondo desenfocadas, más muestras de perfil. Poca profundidad de campo. Sujeto centrado con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** sección de perfil verosímil (dos cámaras y una barra aislante); sin grabado ni marca.

#### 2.4 `cat-ventanas-aluminio-3.jpg`

- **Dónde:** Servicio «Ventanas de aluminio», galería.
- **Transmite:** Posibilidades de color: blanco, grises, madera.
- **Proporción y encuadre:** 4:3 (también 1:1); muestrario centrado, algo en picado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de ventana lateral, grano muy ligero. Proporción 4:3 horizontal. Plano cercano, ligeramente en picado, de un muestrario de colores de lacado de aluminio: una fila de unas doce plaquetas rectangulares lisas de perfil lacado en blancos, grises, antracita, negro mate, verde oliva, burdeos y dos imitación madera, apoyadas en una mesa de madera clara. Todas SIN texto ni código impreso. Sujeto centrado. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** plaquetas lisas, sin números ni nombres; colores variados pero armónicos.

#### 2.5 `cat-ventanas-aluminio-4.jpg`

- **Dónde:** Servicio «Ventanas de aluminio», galería.
- **Transmite:** Funcionamiento: la hoja abatible abierta hacia dentro.
- **Proporción y encuadre:** 4:3 (también 1:1); plano medio de la ventana con la hoja abierta hacia dentro; ventana centrada.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una ventana oscilobatiente de aluminio gris antracita con la hoja abierta hacia dentro en posición abatible, en un dormitorio de pared crema, con la manilla visible y el cristal reflejando el cielo. Se ve el marco fijo y el herraje oculto en el canto. Luz de media mañana entrando. Ventana centrada con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** hoja abatible físicamente creíble (bisagras en un lateral); manilla sin marca.

#### 2.6 `cat-ventanas-pvc.jpg`

- **Dónde:** Catálogo y servicio «Ventanas de PVC».
- **Transmite:** PVC blanco, limpio, cálido, funcional.
- **Proporción y encuadre:** 1:1 (se recorta a 4:5 y 4:3); ventana centrada con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 1:1 cuadrada. Plano medio frontal de una ventana oscilobatiente de PVC blanco con la hoja abierta hacia dentro en posición abatible, en un salón crema con suelo de cerámica clara y una planta junto al alféizar. Cristal doble con un reflejo suave. Ventana centrada con margen amplio. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** perfil de PVC con las cámaras sugeridas, no un bloque liso; manilla sin marca.

#### 2.7 `cat-cerramientos.jpg`

- **Dónde:** Catálogo y servicio «Cerramientos de terraza».
- **Transmite:** Una terraza que se usa todo el año.
- **Proporción y encuadre:** 1:1 (se recorta a 4:5 y 4:3); cerramiento centrado con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural de tarde, grano muy ligero. Proporción 1:1 cuadrada. Plano medio-general de una terraza de un chalet de Paterna cerrada con correderas de cristal y aluminio gris claro, con las hojas cerradas, vista desde dentro: baldosa clara, una butaca de mimbre, plantas, y al fondo un jardín y tejados. Cerramiento centrado con margen alrededor. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** perfiles rectos y continuos; reflejos creíbles; sin marca.

#### 2.8 `cat-toldos.jpg`

- **Dónde:** Catálogo y servicio «Toldos».
- **Transmite:** Sombra y confort en la terraza.
- **Proporción y encuadre:** 1:1 (se recorta a 4:5 y 4:3); toldo centrado con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural de mediodía suave, grano muy ligero. Proporción 1:1 cuadrada. Plano medio-general de una terraza de un chalet en la provincia de Valencia con un toldo de brazo extensible desplegado, lona lisa en crudo, brazos de aluminio blanco, sobre una mesa y dos sillas de madera. Fachada encalada y una buganvilla. Toldo centrado con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** brazos y cofre coherentes; lona lisa, sin rayas con texto ni logo.

#### 2.9 `cat-mamparas.jpg`

- **Dónde:** Catálogo y servicio «Mamparas de baño».
- **Transmite:** Baño actual, limpio, con perfil negro mate.
- **Proporción y encuadre:** 1:1 (se recorta a 4:5 y 4:3); mampara centrada con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 1:1 cuadrada. Plano medio frontal de una ducha de obra con una mampara fija de cristal templado transparente con perfil negro mate, azulejo cerámico claro, plato de ducha blanco liso y grifería negra sencilla. Pared crema, luz suave. Mampara centrada con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** cristal con reflejos creíbles; grifería y perfil sin marca ni grabado.

#### 2.10 `cat-puertas.jpg`

- **Dónde:** Catálogo y servicio «Puertas de entrada».
- **Transmite:** Seguridad con buena presencia.
- **Proporción y encuadre:** 1:1 (se recorta a 4:5 y 4:3); puerta centrada con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 1:1 cuadrada. Plano medio frontal de la entrada de una vivienda en Paterna: puerta de aluminio gris oscuro, lisa, con un fijo lateral de cristal translúcido y un tirador de acero inoxidable sencillo, muro encalado y suelo de gres claro, una maceta. Puerta centrada con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** sin número de portal ni placa; tirador sin marca.

#### 2.11 `trabajo-paterna.jpg` (generar ANTES que 2.12)

- **Dónde:** Trabajo «Cambio de ventanas en un piso de Paterna» («Después»).
- **Transmite:** Resultado: ventana nueva, aislada y limpia.
- **Proporción y encuadre:** 4:3; plano medio frontal de un hueco de ventana en un dormitorio, encuadre simple y repetible.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media tarde, grano muy ligero. Proporción 4:3 horizontal. Plano medio frontal de un hueco de ventana en un dormitorio de un piso en Paterna con una ventana de aluminio blanco nueva, de dos hojas correderas, con rotura de puente térmico (perfil grueso y limpio). Pared crema recién pintada, alféizar de mármol claro, suelo de parquet claro, cortina de lino recogida. Fuera, desenfocados, bloques de pisos claros. Encuadre sencillo y centrado. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** genérica para repetirla en el «antes»; sin marca.

#### 2.12 `trabajo-paterna-antes.jpg` (generar DESPUÉS de 2.11, en la misma conversación)

- **Dónde:** Trabajo «Cambio de ventanas en un piso de Paterna», panel «Antes» (lado a lado con la 2.11).
- **Transmite:** El problema: ventana vieja, fría y mal sellada.
- **Proporción y encuadre:** 4:3; IDÉNTICO a la 2.11 (mismo hueco, ángulo, luz, pared y suelo).

```
Usa la imagen anterior (la 2.11, el hueco con la ventana nueva de aluminio blanco) como referencia exacta: mismo hueco, misma pared, mismo suelo, mismo ángulo de cámara, misma luz, mismo encuadre 4:3 horizontal y mismas proporciones. Cambia SOLO la ventana, que ahora es una ventana antigua de aluminio de los años 90, sin rotura de puente térmico y con el desgaste MUY visible: perfiles de aluminio con el anodizado amarillento y picado, fino y plano; gotas de condensación abundantes en la cara interior del cristal simple; moho negro en la masilla y en el sellado del marco; rendija visible entre la hoja corredera y el marco y una mancha de humedad con vetas en la pared bajo el alféizar; el burlete de las hojas gastado y cuarteado. Fotografía realista documental, luz natural suave, grano ligero. La esquina inferior izquierda queda despejada. Sin personas. Sin texto, rótulos, logotipos ni marcas legibles. No es ilustración ni render 3D.
```

- **Revisar:** que sea el MISMO hueco que la 2.11 y que el desgaste se vea a primera vista (anodizado amarillento, condensación, moho en las juntas, rendijas); si sale limpio, repite con «exagera el desgaste».

#### 2.13 `trabajo-burjassot.jpg` (la serie 2.13–2.16 es la misma terraza: genéralas en la misma conversación)

- **Dónde:** Trabajo «Cerramiento de terraza en Burjassot» (principal, también en panorámica).
- **Transmite:** El gran resultado: terraza cerrada y luminosa.
- **Proporción y encuadre:** 4:3 (se recorta a 21:9); sujeto en una franja horizontal central (el 21:9 pierde 43 % del alto); cerramiento centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural de tarde suave, grano muy ligero. Proporción 4:3 horizontal. Plano general de una terraza de un piso de Burjassot (Valencia) cerrada con tres hojas correderas de cristal y aluminio gris claro, vista desde fuera hacia el cerramiento y la calle: el cerramiento ocupa la franja horizontal central de la imagen, con suficiente margen por arriba y abajo. Suelo de baldosa clara, plantas, calle con bloques claros al fondo y cielo azul. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** tres hojas coherentes; perfiles rectos; sin cartel de comercio en la calle.

#### 2.14 `trabajo-burjassot-2.jpg`

- **Dónde:** Trabajo «Cerramiento… Burjassot», rejilla.
- **Transmite:** El detalle técnico: guías y felpudos.
- **Proporción y encuadre:** 4:3; plano cercano de la guía inferior, centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Usa la imagen anterior de la terraza como referencia (mismo cerramiento, mismos colores y misma luz). Plano muy cercano de la guía inferior del cerramiento: el carril de aluminio gris claro con las ruedas de la hoja corredera y el cepillo de felpudo negro, con el suelo de baldosa clara de fondo. Poca profundidad de campo; sujeto centrado. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** carril y ruedas físicamente posibles; sin grabado ni marca.

#### 2.15 `trabajo-burjassot-3.jpg`

- **Dónde:** Trabajo «Cerramiento… Burjassot», rejilla.
- **Transmite:** La terraza integrada con el salón.
- **Proporción y encuadre:** 4:3; plano medio desde el interior del salón hacia la terraza cerrada; terraza al centro.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Usa la imagen de la terraza como referencia (mismo cerramiento). Plano medio desde el interior del salón hacia la terraza cerrada: en primer término un sofá liso color crema desenfocado y suelo continuo de cerámica clara, al fondo el cerramiento de cristal con las tres hojas cerradas y la luz de la tarde entrando. Terraza al centro, con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** mismo cerramiento que la 2.13; sin cuadros con texto ni libros legibles.

#### 2.16 `trabajo-burjassot-4.jpg`

- **Dónde:** Trabajo «Cerramiento… Burjassot», rejilla.
- **Transmite:** Se abre del todo: aire y vistas.
- **Proporción y encuadre:** 4:3; mismo punto de vista que la 2.13, con las hojas recogidas a un lado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Usa la imagen de la terraza como referencia (mismo cerramiento y encuadre). Ahora las tres hojas correderas están recogidas y apiladas en un lado, dejando la terraza abierta a la calle. Mismo punto de vista, misma luz, mismo suelo y plantas. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** las hojas apiladas de manera creíble (en carriles distintos); mismo punto de vista que la 2.13.

#### 2.17 `trabajo-godella.jpg`

- **Dónde:** Trabajo «Mampara a medida en Godella».
- **Transmite:** Un baño reformado, limpio y ligero.
- **Proporción y encuadre:** 4:3 (se recorta a 21:9); mampara en una franja horizontal central (el 21:9 pierde 43 % del alto).

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio-general, algo abierto, de un baño de un chalet en Godella (Valencia) con una ducha de obra y una mampara fija de cristal templado con perfil negro mate: el conjunto ocupa la franja horizontal central de la imagen. Azulejo grande beige claro, plato de ducha blanco, grifería negra sencilla, una toalla gris colgada, luz suave de una ventana. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** perfil negro recto; cristal con reflejos creíbles; sin marca en grifería.

#### 2.18 `trabajo-rocafort.jpg`

- **Dónde:** Trabajo «Toldo con motor en Rocafort».
- **Transmite:** Sombra automatizada y sin esfuerzo.
- **Proporción y encuadre:** 4:3 (se recorta a 21:9); toldo en una franja horizontal central (el 21:9 pierde 43 % del alto).

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano general de la terraza de un chalet en Rocafort (Valencia) con un toldo de cofre desplegado de lona lisa gris claro, cofre y brazos de aluminio blanco, sobre una mesa y sillas de madera, con jardín de césped y un naranjo. El toldo ocupa la franja horizontal central, con margen por arriba y por abajo. Luz natural de mediodía suave. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** cofre y brazos coherentes; lona lisa sin logo ni rayas con texto.

#### 2.19 `expo-1.jpg`

- **Dónde:** Mosaico de inicio y /empresa (la grande).
- **Transmite:** Se ve el local: abierto, ordenado, cercano.
- **Proporción y encuadre:** 4:3 (alto libre); fachada en 3/4 desde la acera, escaparate centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media mañana, grano muy ligero. Proporción 4:3 horizontal. Plano general en ligero 3/4 de la fachada de una tienda de ventanas en una avenida de Paterna (Valencia): bajo comercial con un gran escaparate de cristal y una puerta de aluminio gris, y dentro del escaparate se adivinan ventanas montadas en expositor. La parte superior de la fachada donde iría el rótulo se ve como un panel liso y vacío, sin ningún texto. Acera de baldosa gris, un naranjo, bloques de pisos claros. Escaparate centrado con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** ningún texto ni rótulo (ni en el escaparate, ni en la puerta, ni en el toldo); sin matrículas ni coches con marca; sin personas dentro.

#### 2.20 `expo-2.jpg`

- **Dónde:** Mosaico (pequeña).
- **Transmite:** Para elegir color con calma.
- **Proporción y encuadre:** 4:3; plano frontal del panel de muestras, centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz cálida de tienda, grano muy ligero. Proporción 4:3 horizontal. Plano frontal de una pared de una exposición con un panel de madera clara en el que cuelgan unas veinte muestras rectangulares de perfil de aluminio lacado en blancos, grises, antracita, negro, verdes y burdeos y varios acabados imitación madera, ordenadas en filas. Todas las muestras SIN etiqueta ni texto. Luz de tienda cálida. Panel centrado con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** muestras lisas sin números ni nombres; filas alineadas.

#### 2.21 `expo-3.jpg`

- **Dónde:** Mosaico (pequeña).
- **Transmite:** Los modelos se ven montados, no en catálogo.
- **Proporción y encuadre:** 4:3; mampara centrada en un expositor.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz cálida de tienda, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una mampara de ducha de cristal templado con perfil negro mate montada en un expositor de tienda, sobre un plato de ducha blanco sobre una tarima baja, con un panel de pared de cerámica clara detrás. Sala de exposición con suelo de microcemento claro. Mampara centrada con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** sin etiquetas de precio ni cartel; cristal con reflejos creíbles.

#### 2.22 `equipo-ricardo.jpg`

- **Dónde:** /empresa, equipo (tarjeta de Ricardo).
- **Transmite:** Medición cuidadosa, oficio.
- **Proporción y encuadre:** 1:1; cuadro CORTADO por encima de los hombros (la cabeza queda fuera de cuadro) o de espaldas; metro y ventana centrados.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz cálida de tienda, grano muy ligero. Proporción 1:1 cuadrada. Plano medio-cercano de un hombre adulto visto de espaldas, con camisa azul grisáceo remangada y un lápiz en el bolsillo, midiendo con un flexómetro una ventana montada en una exposición de ventanas: el encuadre corta justo por encima de los hombros, de modo que la cabeza queda fuera de cuadro y no se ve ninguna cara. Se ven las manos, el flexómetro y el marco de la ventana. Luz cálida de tienda. Sujeto centrado. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Una única persona de espaldas, sin cara visible. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** que NO se vea la cara (ni de perfil); manos con cinco dedos; flexómetro sin marca.

#### 2.23 `equipo-elena.jpg`

- **Dónde:** /empresa, equipo (tarjeta de Elena).
- **Transmite:** Atención en la exposición, cercana.
- **Proporción y encuadre:** 1:1; cuadro cortado en el cuello o mujer de espaldas; muestrario centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz cálida de tienda, grano muy ligero. Proporción 1:1 cuadrada. Plano medio-cercano de una mujer adulta de espaldas, con una blusa blanca y una libreta en la mano, junto a un panel de muestras de colores de perfiles de aluminio en una exposición: el encuadre corta a la altura del cuello, de modo que la cabeza queda fuera de cuadro y no se ve ninguna cara. Se ve su mano señalando una muestra. Luz cálida de tienda. Sujeto centrado. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Una única persona de espaldas, sin cara visible. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** que NO se vea la cara ni de perfil; mano con cinco dedos; libreta sin texto legible.

### Fotos opcionales (solo variante de prueba «galería sin trabajos»)

#### 2.24 `galeria-1.jpg` (OPCIONAL)

- **Dónde:** Solo variante de prueba «galería sin trabajos» (lienzos G1–G4). Pie: «Ventanas correderas en Paterna».
- **Transmite:** Una foto de galería suelta, sin contexto de obra.
- **Proporción y encuadre:** 4:3; sujeto centrado con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio frontal de dos ventanas correderas de aluminio gris claro, una junto a otra, en un salón luminoso de un piso de Paterna (Valencia), con pared crema, cortinas de lino y vistas desenfocadas a bloques claros. Ventanas centradas con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** sin marca; hojas lógicas.

#### 2.25 `galeria-2.jpg` (OPCIONAL)

- **Dónde:** Solo variante de prueba «galería sin trabajos» (lienzos G1–G4). Pie: «Cortina de cristal en Godella».
- **Transmite:** Una foto de galería suelta, sin contexto de obra.
- **Proporción y encuadre:** 4:3; sujeto centrado con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una terraza de un chalet en Godella (Valencia) cerrada con una cortina de cristal sin perfiles verticales (hojas de vidrio plegables apiladas a un lado), baldosa clara y plantas, luz de tarde. Cerramiento centrado con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** hojas de vidrio sin marcos verticales; guías coherentes.

#### 2.26 `galeria-3.jpg` (OPCIONAL)

- **Dónde:** Solo variante de prueba «galería sin trabajos» (lienzos G1–G4). Pie: «Toldo de cofre».
- **Transmite:** Una foto de galería suelta, sin contexto de obra.
- **Proporción y encuadre:** 4:3; sujeto centrado con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio de un toldo de cofre desplegado de lona lisa gris claro sobre la terraza de una casa mediterránea, con mesa y sillas de madera, luz de mediodía suave. Toldo centrado con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** lona lisa sin logo; cofre coherente.

#### 2.27 `galeria-4.jpg` (OPCIONAL)

- **Dónde:** Solo variante de prueba «galería sin trabajos» (lienzos G1–G4). Pie: «Mampara a medida».
- **Transmite:** Una foto de galería suelta, sin contexto de obra.
- **Proporción y encuadre:** 4:3; sujeto centrado con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una mampara fija de ducha de cristal con perfil negro mate, azulejo beige claro y plato blanco, luz suave. Mampara centrada con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** perfil negro recto; grifería sin marca.

#### 2.28 `galeria-5.jpg` (OPCIONAL)

- **Dónde:** Solo variante de prueba «galería sin trabajos» (lienzos G1–G4). Pie: «Puerta de entrada en Bétera».
- **Transmite:** Una foto de galería suelta, sin contexto de obra.
- **Proporción y encuadre:** 4:3; sujeto centrado con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio frontal de una puerta de entrada de aluminio gris con tirador de acero inoxidable sencillo, muro encalado y una maceta con un limonero, en una vivienda de Bétera (Valencia). Puerta centrada con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** sin número de portal ni placa.

#### 2.29 `galeria-6.jpg` (OPCIONAL)

- **Dónde:** Solo variante de prueba «galería sin trabajos» (lienzos G1–G4). Pie: «(sin título, a propósito)».
- **Transmite:** Una foto de galería suelta, sin contexto de obra.
- **Proporción y encuadre:** 4:3; sujeto centrado con margen.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una ventana de aluminio blanco con una mosquitera enrollable gris bajada a la mitad, su cajón blanco arriba y guías laterales; al fondo, desenfocado, un patio con una buganvilla. Ventana centrada con margen. Paleta cálida de tienda y casa: crema y piedra (#f5f3ef, #ebe7e0), grafito (#2f3437), tinta casi negra en sombras (#1c1b19), pequeños toques de latón apagado (#a07a3c) y un único acento burdeos (#8a2c32) en un detalle mínimo (un cojín, un cartel liso sin texto, una muestra). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** malla creíble; cajón sin marca.
