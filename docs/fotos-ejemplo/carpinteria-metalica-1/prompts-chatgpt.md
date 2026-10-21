# Prompts de ChatGPT: fotos de ejemplo de `carpinteria-metalica-1` «Medida»

Quince fotos para `public/ejemplo/` del template 1 (taller que fabrica e instala ventanas, cerramientos, persianas, mosquiteras y puertas de aluminio/PVC). Cada ficha trae un prompt autosuficiente (estilo + escena + proporción + exclusiones): se copia entero. El `logo.svg` no es una foto y no está aquí.

## 0. Resumen: qué hay que generar

**15 fotos: 14 independientes + 1 pareja antes/después (1.8 y 1.9). Las 15 son 4:3 (ninguna 1:1).**

Guarda cada imagen con el **número de ficha** como nombre (p. ej. `1.1.png`). No hace falta convertir ni renombrar nada más: Claude lo hace después.

| Ficha | Guardar como | Foto final | Qué se ve | Proporción |
|---|---|---|---|---|
| 1.1 | `1.1.png` | `hero.jpg` | Salón con ventanal corredero antracita abierto a una terraza | 4:3 (se recorta a 2:1 y 4:5) |
| 1.2 | `1.2.png` | `servicio-corredera.jpg` | Ventana corredera de aluminio en un salón luminoso | 4:3 |
| 1.3 | `1.3.png` | `servicio-oscilobatiente.jpg` | Ventana oscilobatiente blanca entreabierta en un dormitorio | 4:3 |
| 1.4 | `1.4.png` | `servicio-cerramiento.jpg` | Terraza cerrada con cristal y perfiles de aluminio | 4:3 |
| 1.5 | `1.5.png` | `servicio-mosquitera.jpg` | Mosquitera enrollable instalada en una ventana | 4:3 |
| 1.6 | `1.6.png` | `servicio-persiana.jpg` | Persiana de aluminio a medio bajar en una fachada | 4:3 |
| 1.7 | `1.7.png` | `servicio-puerta.jpg` | Puerta de entrada de aluminio gris en un chalet | 4:3 |
| 1.8 | `1.8.png` | `trabajo-aldaia.jpg` | Salón con ventanas correderas nuevas de aluminio blanco | 4:3 |
| 1.9 | `1.9.png` | `trabajo-aldaia-antes.jpg` | Ventanas antiguas de hierro, oxidadas y deterioradas (mismo hueco) | 4:3 |
| 1.10 | `1.10.png` | `trabajo-quart.jpg` | Terraza de ático cerrada con correderas de aluminio | 4:3 |
| 1.11 | `1.11.png` | `trabajo-manises.jpg` | Fachada de chalet con ventanas oscilobatientes blancas | 4:3 |
| 1.12 | `1.12.png` | `trabajo-manises-2.jpg` | Detalle del herraje de una ventana oscilobatiente | 4:3 |
| 1.13 | `1.13.png` | `trabajo-xirivella.jpg` | Mosquitera enrollable bajada en una ventana de cocina | 4:3 |
| 1.14 | `1.14.png` | `empresa-taller.jpg` | Taller de aluminio con perfiles y máquina de corte | 4:3 |
| 1.15 | `1.15.png` | `empresa-perfiles.jpg` | Perfiles de aluminio apilados por colores | 4:3 |

**Pareja antes/después:** 1.8 `trabajo-aldaia.jpg` («después», se genera primero) y 1.9 `trabajo-aldaia-antes.jpg` («antes», en la misma conversación, con la 1.8 como referencia). El hero (1.1) se recorta a 2:1 y 4:5: por eso el sujeto va en el centro.

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
Fotografía realista documental, hecha con cámara réflex y objetivo de 35 mm, luz natural suave, sin retoque exagerado, grano muy ligero, profundidad de campo media. Contexto residencial de la provincia de Valencia: pisos y chalets mediterráneos con fachada encalada en blanco roto o crema, cerámica clara, cielo azul con algo de bruma. Paleta sobria y coherente en toda la serie: blancos fríos y grises claros, aluminio, tinta casi negra en sombras y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles. Sin personas reconocibles. Sin texto, rótulos, logotipos, marcas ni números legibles. No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

## 3. Fichas

#### 1.1 `hero.jpg`

- **Dónde:** Hero de inicio.
- **Transmite:** El producto en su sitio: luz, terraza, vida mediterránea.
- **Proporción y encuadre:** 4:3 (se recorta a 2:1 y 4:5); sujeto en el CENTRO (el recorte 2:1 pierde un tercio de alto y el 4:5 un tercio de ancho); ventanal ocupando la franja central; esquina inferior izquierda libre.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural de media mañana, grano muy ligero. Proporción 4:3 horizontal. Plano general del interior de un salón luminoso de un chalet mediterráneo en la provincia de Valencia, con un gran ventanal corredero de aluminio gris antracita (dos hojas de suelo a techo) abierto una de ellas hacia una terraza con baldosa clara, una palmera pequeña y cielo azul con algo de bruma. Suelo de cerámica clara, pared blanca, un sofá liso gris claro a un lado, sin objetos en primer plano. Todo lo importante en la franja central de la imagen, con margen amplio arriba, abajo y a los lados. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** perfil antracita fino y continuo, sin marca grabada; las dos hojas coherentes (una abierta, una cerrada); horizonte recto.

#### 1.2 `servicio-corredera.jpg`

- **Dónde:** Servicio «Ventanas correderas» (tarjeta y página).
- **Transmite:** Producto limpio, bien instalado, luminoso.
- **Proporción y encuadre:** 4:3; plano medio frontal de la ventana, centrada.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio frontal de una ventana corredera de aluminio blanco de dos hojas en un salón luminoso de un piso de Valencia, con vistas desenfocadas a una calle de bloques claros y un árbol. Alféizar interior blanco, pared blanca, una planta pequeña a un lado. Ventana centrada con margen alrededor. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** dos hojas con perfiles lógicos (una por delante de la otra), sin manilla deformada ni marca.

#### 1.3 `servicio-oscilobatiente.jpg`

- **Dónde:** Servicio «Ventanas oscilobatientes».
- **Transmite:** La posición oscilante (abierta por arriba), ventilación segura.
- **Proporción y encuadre:** 4:3; plano medio, ventana centrada; la hoja inclinada hacia dentro por la parte alta.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una ventana oscilobatiente de PVC blanco en un dormitorio sencillo: la hoja está en posición oscilante, inclinada hacia dentro por el borde superior y cerrada por abajo, con la manilla girada hacia arriba. Una cortina de lino claro se mueve un poco por la rendija. Pared blanca, alféizar blanco, luz suave. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** la hoja inclinada de forma físicamente creíble (bisagras por abajo); manilla sin marca; que se entienda que es oscilante y no abierta del todo.

#### 1.4 `servicio-cerramiento.jpg`

- **Dónde:** Servicio «Cerramientos de terraza».
- **Transmite:** Una terraza ganada para la casa: cristal y aluminio ligeros.
- **Proporción y encuadre:** 4:3; plano medio-general desde dentro de la terraza, cerramiento centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural de tarde suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio-general de una terraza de un piso en Valencia cerrada con correderas de cristal y perfiles finos de aluminio gris claro, vista desde dentro. Se ve el suelo de baldosa clara, una silla de mimbre y una planta, y a través del cristal la calle y otros bloques de pisos claros. Cerramiento centrado con margen alrededor. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** perfiles finos, rectos y continuos; reflejos creíbles en el cristal; sin marca grabada.

#### 1.5 `servicio-mosquitera.jpg`

- **Dónde:** Servicio «Mosquiteras».
- **Transmite:** Detalle útil: ventilar sin insectos.
- **Proporción y encuadre:** 4:3; plano cercano de la ventana con la mosquitera parcialmente bajada; el cajón superior y el tejido visibles.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano cercano de una ventana de aluminio blanco con una mosquitera enrollable de tejido gris fino, bajada a la mitad, con su cajón blanco arriba y las guías laterales. A través de la malla se ve, desenfocado, un patio con una buganvilla. Ventana centrada. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** la malla fina debe verse como malla (sin moiré exagerado); guías laterales a ambos lados; cajón sin marca.

#### 1.6 `servicio-persiana.jpg`

- **Dónde:** Servicio «Persianas y motorización».
- **Transmite:** Persiana correcta y a punto: control de luz.
- **Proporción y encuadre:** 4:3; plano medio frontal de una ventana desde fuera, persiana a medio bajar.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano medio frontal, desde fuera, de una ventana de un piso en Valencia con una persiana enrollable de aluminio lacado en gris claro bajada hasta la mitad: lamas finas y paralelas, cajón arriba y guías laterales. Fachada encalada en blanco roto, alféizar de cerámica clara. Ventana centrada. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** lamas paralelas y continuas, sin lamas fundidas; guías laterales coherentes; sin marca en el cajón.

#### 1.7 `servicio-puerta.jpg`

- **Dónde:** Servicio «Puertas de entrada».
- **Transmite:** Seguridad y buena presencia en la entrada de la casa.
- **Proporción y encuadre:** 4:3; plano medio frontal de la puerta cerrada, centrada.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media mañana, grano muy ligero. Proporción 4:3 horizontal. Plano medio frontal de la entrada de un chalet mediterráneo en la provincia de Valencia: puerta de entrada de aluminio gris antracita, lisa, con un fijo lateral de cristal translúcido y un tirador vertical de acero inoxidable sencillo. Muro encalado, suelo de gres claro, una maceta con un limonero pequeño. Puerta centrada con margen alrededor. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** sin número de portal, buzón con texto ni placa; tirador sin marca; puerta y fijo alineados.

#### 1.8 `trabajo-aldaia.jpg` (generar ANTES que 1.9)

- **Dónde:** Trabajo «Cambio de ventanas en un piso de Aldaia» (principal y «Después»).
- **Transmite:** Resultado limpio: ventanas nuevas, luminosas.
- **Proporción y encuadre:** 4:3; plano medio frontal de un hueco de ventana en un salón; encuadre simple y repetible para el «antes».

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media tarde, grano muy ligero. Proporción 4:3 horizontal. Plano medio frontal de un hueco de ventana en un salón de un piso de Aldaia (Valencia) con una ventana corredera de aluminio blanco nueva, de dos hojas, bien ajustada al hueco. Pared blanca recién pintada, alféizar de mármol claro, suelo de terrazo claro, cortina de lino recogida a un lado. Fuera, desenfocada, una calle de bloques de pisos claros. Encuadre sencillo y centrado, con la ventana ocupando el centro y poco más. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** genérica para repetirla en el «antes»; hojas y perfiles creíbles; sin marca.

#### 1.9 `trabajo-aldaia-antes.jpg` (generar DESPUÉS de 1.8, en la misma conversación)

- **Dónde:** Trabajo «Cambio de ventanas en un piso de Aldaia», panel «Antes» (lado a lado con la 1.8).
- **Transmite:** El problema: ventanas viejas de hierro, mal selladas.
- **Proporción y encuadre:** 4:3; IDÉNTICO a la 1.8 (mismo hueco, ángulo, luz, pared y suelo).

```
Usa la imagen anterior (la 1.8, el hueco con la ventana corredera blanca nueva) como referencia exacta: mismo hueco, misma pared, mismo suelo, mismo ángulo de cámara, misma luz, mismo encuadre 4:3 horizontal y mismas proporciones. Cambia SOLO la ventana, que ahora es una ventana antigua de hierro, en muy mal estado y con el deterioro MUY visible: marco de perfiles de hierro finos pintados en verde oscuro, con la pintura descascarillada a grandes trozos y manchas de óxido naranja que gotean desde las esquinas; cristal simple con un cerco de suciedad y condensación; una de las hojas ligeramente descolgada, con una rendija visible entre hoja y marco; la masilla agrietada y caída en el perímetro del cristal; cierres de hierro oxidados. Mancha de humedad en la pared bajo el alféizar. Fotografía realista documental, luz natural suave, grano ligero. La esquina inferior izquierda queda despejada. Sin personas. Sin texto, rótulos, logotipos ni marcas legibles. No es ilustración ni render 3D.
```

- **Revisar:** que sea claramente el MISMO hueco que la 1.8 y que el deterioro se vea a primera vista (óxido, pintura descascarillada, rendijas, manchas); si sale limpio, repite con «exagera el desgaste»; hierro creíble, no pintado como dibujo.

#### 1.10 `trabajo-quart.jpg`

- **Dónde:** Trabajo «Cerramiento de terraza en Quart de Poblet».
- **Transmite:** Una terraza de ático convertida en espacio útil todo el año.
- **Proporción y encuadre:** 4:3; plano medio-general desde dentro de la terraza, correderas centradas.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural de tarde, grano muy ligero. Proporción 4:3 horizontal. Plano medio-general de la terraza de un ático en Quart de Poblet (Valencia) cerrada con correderas de cristal y aluminio gris claro, vista desde dentro: suelo de baldosa clara, una mesa pequeña y dos sillas lisas, y al fondo, a través del cristal, tejados y azoteas con un cielo azul. Cerramiento centrado, con margen. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** perfiles rectos y continuos; reflejos creíbles; sin marca.

#### 1.11 `trabajo-manises.jpg`

- **Dónde:** Trabajo «Ventanas oscilobatientes en un chalet de Manises» (principal).
- **Transmite:** Una casa entera con ventanas nuevas, homogéneas.
- **Proporción y encuadre:** 4:3; plano general de la fachada, centrado en la planta con dos ventanas.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media mañana, grano muy ligero. Proporción 4:3 horizontal. Plano general frontal de la fachada de un chalet adosado en Manises (Valencia): muro encalado en crema, dos ventanas grandes de PVC blanco oscilobatientes cerradas, con persianas de aluminio subidas, un pequeño jardín con un naranjo y una valla baja. Ventanas en la franja central de la imagen, con margen alrededor. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** ventanas alineadas y proporcionadas; sin número de casa ni placa; sin coches con marca.

#### 1.12 `trabajo-manises-2.jpg`

- **Dónde:** Trabajo «Ventanas oscilobatientes… Manises» (segunda foto).
- **Transmite:** El detalle técnico: herraje y cierre.
- **Proporción y encuadre:** 4:3; macro-plano cercano del herraje y la manilla; herraje centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano muy cercano, con poca profundidad de campo, del herraje de una ventana oscilobatiente de PVC blanco: la manilla en posición horizontal (cerrada), el cierre perimetral con su pestillo visible en el canto de la hoja y el burlete negro de goma. Luz lateral suave que resalta el relieve. Al fondo, desenfocado, un dormitorio claro. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** manilla y cierre físicamente posibles; sin marca ni grabado en el herraje; sin texto en el canto.

#### 1.13 `trabajo-xirivella.jpg`

- **Dónde:** Trabajo «Mosquiteras en Xirivella».
- **Transmite:** Mosquitera instalada en el día a día: una cocina real.
- **Proporción y encuadre:** 4:3; plano medio de la ventana de una cocina con la mosquitera bajada del todo.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media mañana, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una ventana de aluminio blanco en una cocina de un piso de Xirivella (Valencia), con una mosquitera enrollable gris bajada del todo y la ventana abierta detrás. Encimera blanca con una planta de albahaca en una maceta, azulejo blanco. Se adivinan, desenfocados, patios y bloques claros al fondo. Ventana centrada con margen. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** malla creíble; sin vajilla con marcas ni etiquetas en la maceta.

#### 1.14 `empresa-taller.jpg`

- **Dónde:** /empresa (galería del taller).
- **Transmite:** Taller propio y orden: «lo fabricamos nosotros».
- **Proporción y encuadre:** 4:3; plano medio-general del taller, perfiles y sierra en el centro.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz de lucernario mezclada con tubo fluorescente, grano muy ligero. Proporción 4:3 horizontal. Plano medio-general del interior de un taller de carpintería de aluminio en un polígono de Aldaia (Valencia): una sierra de corte de perfiles al fondo, perfiles de aluminio blancos y grises apoyados en un soporte de pared, un banco de trabajo ordenado con una escuadra, un flexómetro y guantes de cuero. Suelo de hormigón con algo de polvo de aluminio. Luz de lucernario y de un tubo fluorescente. Sujeto centrado. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** máquina sin marca ni placa; perfiles con secciones verosímiles; sin cartelería ni pantallas con texto.

#### 1.15 `empresa-perfiles.jpg`

- **Dónde:** /empresa (galería del taller, segunda foto).
- **Transmite:** Variedad de acabados y orden de almacén.
- **Proporción y encuadre:** 4:3; plano cercano frontal de las puntas de los perfiles, centrado.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave, grano muy ligero. Proporción 4:3 horizontal. Plano cercano frontal de un rack de almacén con las puntas de perfiles de aluminio apilados por colores: blanco, gris antracita, gris plata y un perfil imitación madera, ordenados por filas. Luz de nave suave. Perfiles en el centro con un poco de margen. Paleta sobria: blancos fríos y grises claros (#f6f8f9, #eceff2), aluminio, tinta casi negra en sombras (#1c232b) y un único acento petróleo azul-verdoso (#275d6e) en pequeños detalles (un cojín, una maceta, un objeto). Sin personas. La esquina inferior izquierda queda despejada y tranquila. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio (perfiles, herrajes, cristales, pegatinas, cajas). No es ilustración, ni render 3D, ni foto de stock posada; aspecto de trabajo real y cotidiano.
```

- **Revisar:** secciones de perfil verosímiles y repetidas; sin etiquetas ni códigos legibles en las puntas.
