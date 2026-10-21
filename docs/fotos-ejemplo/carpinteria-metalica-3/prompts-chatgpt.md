# Prompts de ChatGPT: fotos de ejemplo de `carpinteria-metalica-3` «Reparaciones»

Nueve fotos para `public/ejemplo/`. Cada ficha trae un prompt autosuficiente (estilo común + escena + proporción + exclusiones): se copia entero.

## 1. Cómo usarlo

1. Una conversación nueva de ChatGPT (con generación de imágenes) por foto, salvo la pareja antes/después (ver punto 3).
2. Pega el prompt de la ficha. Si sale mal, pide un ajuste concreto ("sin el rótulo", "más luz lateral") en vez de rehacerlo entero.
3. **Pareja antes/después:** genera primero `trabajo-persiana.jpg` (persiana reparada). En **la misma conversación** pide `trabajo-persiana-antes.jpg` con el prompt de su ficha, que le dice que use la primera como referencia: misma ventana, mismo encuadre, mismo muro; solo cambia la persiana.
4. Descarga y **renombra con el nombre exacto** del archivo. Exporta a **JPG, calidad ~80–85, lado largo ~1600 px** (4:3 → 1600×1200; 1:1 → 1200×1200). Si ChatGPT no respeta la proporción, recorta a mano (Gimp, Squoosh) manteniendo el centro de la ficha.
5. La web pinta la etiqueta «Foto de ejemplo» en la **esquina inferior izquierda** y recorta con `object-fit: cover`: deja libre esa esquina y el sujeto en el centro.
6. **Revisa cada imagen antes de usarla:** sin texto, rótulos, logos ni marcas legibles (ni en el motor, ni en la furgoneta); sin caras; manos y guantes con cinco dedos; perfiles, bisagras y lamas físicamente posibles; sin aspecto de foto de stock exagerada.
7. Al terminar, rellena `public/ejemplo/CREDITOS.md` con origen «Generada con IA (ChatGPT), fecha» y licencia propia.

## 2. Bloque de estilo común

Ya va dentro de cada prompt; aquí está por si quieres ajustar la serie entera.

```
Fotografía realista documental, hecha con cámara réflex y objetivo de 35 mm, luz natural suave, sin retoque exagerado, grano muy ligero, profundidad de campo media. Contexto residencial de la provincia de Valencia: bloque de pisos o chalet mediterráneo con fachada encalada en blanco roto o crema, cerámica clara, cielo azul con algo de bruma. Paleta sobria y coherente en toda la serie: blancos cálidos y grises de chapa galvanizada, acero y aluminio, tinta casi negra en sombras, y un único acento de óxido o terracota (#9a3412) en pequeños detalles. Sin personas reconocibles: como mucho unas manos con guantes de trabajo o una figura de espaldas sin cara. Sin texto, rótulos, logotipos, marcas ni números legibles en ningún sitio. No es una ilustración, ni un render 3D, ni una foto de stock posada; aspecto de trabajo real y cotidiano, sin dramatismo.
```

## 3. Fichas

### 3.1 `servicio-persiana.jpg`

- **Dónde:** fila «Reparación de persianas» en `/servicios` y página del servicio (miniatura 4:3).
- **Transmite:** la avería típica, sin dramatismo: una persiana que se queda a medias.
- **Encuadre:** 4:3 horizontal, plano medio frontal ligeramente de 3/4, ventana centrada; sin nada en la esquina inferior izquierda (etiqueta).

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media mañana, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una ventana de un piso en Valencia, vista desde el interior de la calle en ligero 3/4: persiana enrollable de aluminio lacado en blanco roto, de lamas finas, bajada a medio camino (se ven las lamas hasta la mitad de la ventana y debajo queda el cristal), con guías laterales de aluminio y cinta de recogida. La fachada es de pared encalada en crema, con alféizar de cerámica clara. La ventana ocupa el centro; la esquina inferior izquierda queda despejada y tranquila. Paleta de blancos cálidos, gris chapa galvanizada, sombras de tinta casi negra y un detalle mínimo en terracota. Sin personas. Sin texto, rótulos, logotipos ni marcas legibles. No es ilustración ni render 3D ni foto de stock posada.
```

- **Revisar:** lamas paralelas y continuas (sin lamas fundidas); guías laterales coherentes; sin marca grabada en el cajón.

### 3.2 `servicio-cristal.jpg`

- **Dónde:** fila «Cambio de cristales rotos» en `/servicios` y su página (4:3).
- **Transmite:** cristal roto contenido provisionalmente, "ya está asegurado".
- **Encuadre:** 4:3, plano cercano de una hoja de ventana de aluminio; la cinta en aspa ocupa el centro; esquina inferior izquierda libre.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural lateral suave, grano muy ligero. Proporción 4:3 horizontal. Plano cercano de una hoja de ventana corredera de aluminio lacado en blanco, con un cristal fisurado con una grieta fina en estrella, sujeto con cinta adhesiva de seguridad transparente-grisácea colocada en forma de aspa de esquina a esquina, sin fragmentos sueltos. Al fondo, desenfocado, un balcón de un piso mediterráneo con fachada clara y luz de tarde. El aspa de cinta ocupa el centro; la esquina inferior izquierda queda despejada. Paleta de blancos cálidos, aluminio y gris acero, sombras de tinta casi negra. Sin personas. Sin texto, rótulos, logotipos ni marcas legibles, ni etiqueta en el cristal. No es ilustración ni render 3D ni foto de stock posada.
```

- **Revisar:** que la grieta parezca real (líneas radiales, no un dibujo); cinta sin texto impreso; marco de aluminio con perfiles verosímiles.

### 3.3 `servicio-garaje.jpg`

- **Dónde:** fila «Puertas de garaje que no abren» y su página (4:3).
- **Transmite:** el elemento técnico que se arregla: el motor, no la puerta entera.
- **Encuadre:** 4:3, plano medio-cercano en contrapicado suave del motor en el techo; motor en el centro; esquina inferior izquierda libre.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz de tubo fluorescente de garaje mezclada con luz natural de la entrada, grano ligero. Proporción 4:3 horizontal. Plano medio-cercano, en ligero contrapicado, del motor de una puerta de garaje seccional de comunidad: operador gris metálico sin marca visible colgado del techo de hormigón, con el raíl de arrastre, el brazo de unión y los muelles de torsión sobre la puerta de paneles lacados en blanco, replegada en el techo del garaje. El motor ocupa el centro; la esquina inferior izquierda queda despejada. Paleta de grises de chapa, blancos cálidos, sombras de tinta casi negra, un único detalle en terracota (cable o tornillo). Sin personas. Sin texto, rótulos, logotipos, pegatinas ni marcas legibles en el motor. No es ilustración ni render 3D ni foto de stock posada.
```

- **Revisar:** sin logotipo ni etiqueta en la carcasa; raíl y brazo coherentes con una puerta seccional; sin cables imposibles.

### 3.4 `trabajo-persiana-antes.jpg` (generar DESPUÉS de 3.5)

- **Dónde:** panel «Antes» del trabajo «Persiana caída en un piso de Valencia» (lado a lado con el «Después»).
- **Transmite:** la avería, sin dramatismo; debe ser **la misma ventana** que el «Después».
- **Encuadre:** igual que 3.5 (mismo plano, ángulo y luz), 4:3.

```
Usa la imagen anterior (la persiana reparada) como referencia exacta: misma ventana, mismo muro encalado, mismo ángulo de cámara, misma luz, mismo encuadre 4:3 horizontal, mismas proporciones y mismos colores. Cambia SOLO la persiana, que ahora está en estado de avería: caída y torcida, la mitad de las lamas descolgadas formando una diagonal, una guía lateral algo separada de la pared, la cinta suelta colgando, sin dramatismo (no está rota en pedazos, solo mal asentada). Fotografía realista documental, luz natural suave, grano ligero. La esquina inferior izquierda queda despejada. Sin personas. Sin texto, rótulos, logotipos ni marcas legibles. No es ilustración ni render 3D.
```

- **Revisar:** que sea realmente la misma ventana y muro (si cambia, repite con "mantén idéntico todo salvo la persiana"); lamas torcidas físicamente creíbles; mismo punto de vista que el "después".

### 3.5 `trabajo-persiana.jpg` (generar ANTES que 3.4)

- **Dónde:** foto principal del trabajo «Persiana caída en un piso de Valencia» (4:3).
- **Transmite:** resultado limpio: persiana subida del todo, recta.
- **Encuadre:** 4:3, plano medio frontal de la ventana desde dentro de la calle ligeramente en 3/4; ventana centrada; esquina inferior izquierda libre.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media tarde, grano muy ligero. Proporción 4:3 horizontal. Plano medio de una ventana de un piso en Valencia (barrio de Campanar), vista desde la calle en ligero 3/4: persiana enrollable de aluminio lacado en blanco roto subida del todo, con las lamas recogidas en el cajón superior y las guías laterales rectas y bien fijadas; el cristal de la ventana queda totalmente despejado y refleja un cielo azul con bruma. Fachada encalada en crema y alféizar de cerámica clara, cajón de persiana limpio. Ventana centrada; esquina inferior izquierda despejada. Paleta de blancos cálidos, gris acero, sombras de tinta casi negra y un detalle mínimo en terracota. Sin personas. Sin texto, rótulos, logotipos ni marcas legibles. No es ilustración ni render 3D ni foto de stock posada.
```

- **Revisar:** guías rectas y paralelas; el cajón no muestra marca; ventana y muro lo bastante genéricos para repetirlos en el "antes".

### 3.6 `trabajo-garaje.jpg`

- **Dónde:** foto del trabajo «Puerta de garaje comunitaria en Xirivella» (4:3).
- **Transmite:** puerta seccional funcionando, abierta, en un garaje de comunidad.
- **Encuadre:** 4:3, plano general frontal desde la rampa/calle; hueco de puerta centrado; esquina inferior izquierda libre.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de media mañana, grano muy ligero. Proporción 4:3 horizontal. Plano general frontal de la entrada al garaje de una comunidad de vecinos de un bloque de pisos en Xirivella (Valencia): puerta seccional de paneles de aluminio lacado en gris claro, abierta del todo y recogida en el techo, mostrando el interior con plazas, suelo de hormigón y luz tenue. Fachada del bloque encalada en blanco roto, bordillo y acera de cemento. El hueco de la puerta ocupa el centro; la esquina inferior izquierda queda despejada. Paleta de blancos cálidos, grises de chapa, sombras de tinta casi negra. Sin personas, sin coches reconocibles ni matrículas legibles. Sin texto, rótulos, logotipos ni números de portal legibles. No es ilustración ni render 3D ni foto de stock posada.
```

- **Revisar:** sin matrículas, números ni carteles; paneles bien alineados y recogidos de forma verosímil; sin coches con marca visible.

### 3.7 `trabajo-barandilla.jpg`

- **Dónde:** foto del trabajo «Barandilla de balcón en Mislata» (4:3).
- **Transmite:** acabado limpio tras soldadura y pintura antioxidante.
- **Encuadre:** 4:3, plano medio-cercano de un tramo de barandilla en diagonal suave; un montante con soldadura limpia en el centro; esquina inferior izquierda libre.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural dorada de tarde, grano muy ligero. Proporción 4:3 horizontal. Plano medio-cercano de la barandilla metálica de un balcón de un piso de Mislata (Valencia): barrotes verticales de acero cuadrado con pasamanos plano, recién pintada en gris antracita satinado, con la pintura uniforme y sin goteos; en el centro, un montante con un cordón de soldadura limpio y recién rematado. Al fondo, desenfocada, una calle de bloques de pisos con fachadas claras. La esquina inferior izquierda queda despejada. Paleta de grises acero, blancos cálidos, sombras de tinta casi negra y un detalle mínimo en terracota. Sin personas. Sin texto, rótulos, logotipos ni marcas legibles. No es ilustración ni render 3D ni foto de stock posada.
```

- **Revisar:** barrotes verticales y equidistantes (sin barrotes fusionados o cortados); soldadura creíble; ningún cartel de "pintura fresca".

### 3.8 `empresa-taller.jpg`

- **Dónde:** `/empresa` (rejilla 1:1) y, en los datos de ejemplo, también `imagenesHero` (que el diseño ignora).
- **Transmite:** taller propio, orden, oficio: "si no se encuentra la pieza, la hacemos".
- **Encuadre:** 1:1, plano medio-cercano del banco desde un lado, algo en picado; perfiles en el centro; esquina inferior izquierda libre.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural de lucernario de taller y un tubo fluorescente, grano ligero. Proporción 1:1 cuadrada. Plano medio-cercano, ligeramente en picado, de un banco de trabajo de carpintería metálica en un taller familiar de Mislata: perfiles de aluminio lacado y anodizado apoyados en el banco y cortados a medida, una escuadra, un flexómetro, unos guantes de trabajo de cuero, una atornilladora inalámbrica y una sierra de inglete al fondo desenfocada. Todo en uso real, con algo de polvo de aluminio, sin postureo. Perfiles y herramientas ocupan el centro; la esquina inferior izquierda queda despejada. Paleta de grises de chapa, aluminio plateado, blancos cálidos, sombras de tinta casi negra y un detalle mínimo en terracota. Sin personas. Sin texto, rótulos, logotipos ni marcas legibles en herramientas ni cajas. No es ilustración ni render 3D ni foto de stock posada.
```

- **Revisar:** herramientas sin logotipo ni marca; escuadra y flexómetro sin números/letras legibles (si salen, no importa si son ilegibles); perfiles con secciones verosímiles.

### 3.9 `empresa-furgoneta.jpg`

- **Dónde:** `/empresa` (rejilla 1:1), junto a la del taller.
- **Transmite:** servicio móvil, "vamos a tu casa", sin rotular.
- **Encuadre:** 1:1, plano general en 3/4 delantero, furgoneta en el tercio central, calle a su alrededor; esquina inferior izquierda libre.

```
Fotografía realista documental, cámara réflex y objetivo de 35 mm, luz natural suave de primera hora de la mañana, grano ligero. Proporción 1:1 cuadrada. Plano general en tres cuartos delantero de una furgoneta de trabajo blanca, lisa y sin rotular, de tipo furgón mediano, aparcada junto al bordillo en una calle de un barrio de Valencia con bloques de pisos de fachada clara y alguna palmera o naranjo al fondo desenfocado. Se aprecian la baca con una escalera de aluminio atada y puertas traseras cerradas. Sin matrícula legible (de frente y ladeada, matrícula no visible) y sin logotipos del fabricante: ni emblema en la calandra ni rótulos. La furgoneta ocupa el centro; la esquina inferior izquierda queda despejada. Paleta de blancos cálidos, grises de asfalto, sombras de tinta casi negra y un detalle mínimo en terracota. Sin personas. Sin texto ni números legibles. No es ilustración ni render 3D ni foto de stock posada.
```

- **Revisar:** matrícula, emblema del fabricante y cualquier texto en la carrocería (si salen, repite o retoca); escalera de la baca bien atada; no debe parecer un modelo concreto reconocible con su logo.
