# Prompts de ChatGPT · fotos de ejemplo de `electricidad-3` «Sin sorpresas»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto (la única excepción es la pareja antes/después, ficha 3.6 y 3.7, que va en la misma conversación). En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Guarda cada resultado como `3.<m>.png` (por ejemplo `3.1.png`) en `mis_datos/fotos-ejemplo/electricidad-3/`. Después pásaselas a Claude, que las convierte (ver §4).

Concepto del template: web **oscura** (noche `#121214`, texto casi blanco, primario morado `#7e22ce`) con **luz cálida** como protagonista. Las fotos son nocturnas o de interior a media luz: fondos oscuros y una fuente de luz concreta y distinta en cada foto (linterna frontal en un apagón, linterna de mano, bombilla de obra, lámpara de mesilla, farola, anochecer azul con ventanas encendidas) que ilumina solo el motivo. Evita blancos quemados y fondos claros: se pegarían al borde de una web oscura.

Tres cosas propias de este template:

- **Contorno orgánico.** Las fotos no son rectángulos: se recortan con una forma de mancha. Las esquinas y los bordes se pierden, así que el motivo principal va **centrado y con margen** alrededor, y los bordes son siempre oscuros.
- **Etiqueta «Foto de ejemplo».** La web la superpone **dentro del contorno, centrada, abajo** (a un 9 % del borde inferior). Por eso cada prompt deja libre la **franja inferior central** (suelo, sombra o zona oscura desenfocada).
- **Hero 16:9 con recorte 4:5.** La foto del hero se ve apaisada en escritorio y recortada en vertical (4:5, centro) en móvil. Todo lo importante va en la **columna central** (~ el 35 % central del ancho).

Cada ficha cambia a propósito de plano, fuente de luz y espacio, para que la serie no parezca diez veces la misma foto.

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Proporción |
|---|---|---|---|
| 3.1 | `hero.jpg` | Apagón: electricista de espaldas, visto por encima del hombro, con linterna frontal abriendo el cuadro del recibidor; vela en la consola y luz azulada de la calle por el cristal de la puerta | 16:9 (admite recorte 4:5 centrado) |
| 3.2 | `servicio-averia.jpg` | Contrapicado en una cocina a oscuras: mano con linterna hacia el cuadro sobre el marco de la puerta, un diferencial bajado; luz fría de farola por la ventana | 4:3 |
| 3.3 | `servicio-diferencial.jpg` | Macro oblicuo de un diferencial nuevo con luz rasante de lámpara de obra; el viejo, amarillento y desenfocado encima del cuadro | 1:1 |
| 3.4 | `servicio-enchufe.jpg` | Picado sobre las manos cambiando un enchufe junto a una cama, iluminadas por la lámpara de la mesilla puesta en el suelo | 1:1 |
| 3.5 | `servicio-aire.jpg` | A través del cristal de la puerta del balcón al anochecer: unidad exterior con canaleta nueva, ventanas cálidas del bloque de enfrente | 1:1 |
| 3.6 | `trabajo-cuadro.jpg` | Cuadro nuevo en el hueco bajo la escalera de una casa adosada, bombilla de obra colgando, cesto de mimbre (después) | 4:3 |
| 3.7 | `trabajo-cuadro-antes.jpg` | El mismo hueco antes: cuadro fundido y negro, cables derretidos, hollín subiendo por la pared (antes) | 4:3 |
| 3.8 | `trabajo-aire.jpg` | Plano general desde el sofá: salón a media luz con lámpara de pie, aire acondicionado arriba y canaleta nueva bajando hasta el zócalo | 4:3 |
| 3.9 | `trabajo-diferencial.jpg` | Detalle en un pasillo una noche de lluvia: caja de registro abierta con empalme nuevo, mancha de humedad, gotas en la ventana | 4:3 |
| 3.10 | `empresa-furgoneta.jpg` | Desde dentro de un portal oscuro: furgoneta blanca bajo una farola, con las puertas traseras abiertas y su luz interior encendida | 4:3 |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque).

```
Voy a pedirte una fotografía para la web de ejemplo de un electricista de urgencias en España. Estas reglas valen para toda la serie. La escena concreta (plano, fuente de luz, espacio y objetos) te la doy en el siguiente mensaje y manda sobre cualquier costumbre: síguela al pie de la letra aunque no sea la típica foto de electricista con una herramienta delante de una pared.

REALISMO
- Que parezca una foto hecha de verdad con un buen móvil en poca luz, por alguien que estaba allí: grano visible de modo noche, profundidad de campo de móvil, encuadre un poco imperfecto, el color real de cada luz (una vela es naranja, una farola de sodio es anaranjada, un LED de linterna es casi blanco cálido, el anochecer es azul). Sin filtros, sin HDR, sin aspecto de banco de imágenes ni de render 3D, sin dramatismo de película.
- Espacios vividos: marcas de uso, polvo, cables de la vida real, cosas del cliente. Solo está nuevo lo que acaba de instalar el electricista.
- Pocos objetos y con sentido: solo los que pida la escena.

LUZ Y PALETA
- La escena es de noche o a media luz. Una fuente de luz concreta, la que diga la escena, ilumina solo el motivo; el resto cae en penumbra. Los BORDES de la imagen son siempre oscuros, sin blancos quemados ni cielos claros.
- Si aparece un acento de color frío, que sea un morado apagado y natural (lo indica la escena).

SIEMPRE
- Sin caras: si aparece alguien, de espaldas, solo manos o con la cabeza fuera de cuadro. Sin reflejos de personas en cristales ni espejos.
- Sin logos, marcas ni texto legible: herramientas, cajas, electrodomésticos, aparatos de aire, ropa y vehículos son lisos. Las etiquetas de los cuadros, en blanco.
- España corriente: enchufes de dos orificios redondos, cuadros europeos de carril con automáticos blancos. Nada lujoso ni americano. Sin monumentos ni rótulos que identifiquen una ciudad concreta.
- Sin fuego, llamas, chispas ni humo (una vela encendida en un platito sí, si la escena la pide).
- Una única fotografía, no un collage ni varios paneles.
- Composición para un recorte con forma de mancha: el motivo principal CENTRADO y con margen de aire alrededor; nada importante en esquinas ni bordes.
- La FRANJA INFERIOR CENTRAL queda sin detalle (suelo, sombra o zona oscura desenfocada): ahí se superpone una etiqueta de la web.
- La proporción la indica cada escena (4:3, 1:1 o 16:9).

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 3.1 · `hero.jpg`

**Dónde sale:** hero de la home. Tiene que transmitir «se ha ido la luz y alguien ya está aquí arreglándolo». **16:9**, y en móvil se recorta a **4:5 por el centro**, así que cuadro, linterna y espalda van en la columna central.

```
Fotografía horizontal 16:9.

PLANO: por encima del hombro, desde detrás y un poco más alto que el electricista, a un metro de su espalda. Se ven su nuca con la banda elástica de una linterna frontal, el cuello y un hombro de una chaqueta de trabajo gris oscuro lisa; la cara queda completamente oculta, mirando al frente.

ACCIÓN: delante de él, empotrado en la pared, un cuadro eléctrico doméstico con la tapa abierta, que sujeta con una mano enguantada de negro. El haz de la linterna frontal cae sobre la fila de automáticos blancos, con etiquetas en blanco, y deja ver motas de polvo flotando en el cono de luz.

ESPACIO Y LUZ: recibidor de un piso durante un apagón; la única luz es la de la linterna. Abajo a la izquierda, sobre una consola, una vela encendida en un platito, pequeña y naranja, que la dueña ha puesto al quedarse a oscuras. A la derecha, la puerta de entrada tiene un cristal esmerilado por el que entra un resplandor azulado y débil de la escalera. Paredes y techo, casi negros.

COMPOSICIÓN: espalda, cabeza, haz de luz y cuadro dentro del 35 % central del ancho, para que un recorte vertical 4:5 por el centro siga funcionando; a los lados, penumbra con la vela y el cristal como puntos de luz secundarios. La franja inferior central es la espalda en sombra y oscuridad, sin objetos.
```

---

### Ficha 3.2 · `servicio-averia.jpg`

**Dónde sale:** servicio «Averías y urgencias». El diferencial bajado que deja la casa a oscuras.

```
Fotografía horizontal 4:3.

PLANO: CONTRAPICADO. La cámara está baja y mira hacia arriba, hacia el cuadro eléctrico, colocado en lo alto de la pared, encima del marco de la puerta de una cocina, como en muchos pisos antiguos. La foto la hace la propia persona que sostiene la linterna: solo entra su mano y la muñeca con manga oscura por el lado derecho; nada más de su cuerpo.

LO QUE CUENTA LA HISTORIA: el haz cálido de una linterna de mano lisa ilumina el cuadro con la tapa abierta: una fila de automáticos blancos con las palancas ARRIBA y un único diferencial, más ancho, con la palanca claramente ABAJO. Etiquetas en blanco. En el marco de la puerta, la pintura un poco amarillenta y una muesca.

ESPACIO Y LUZ: la cocina está a oscuras. Por una ventana a la izquierda entra la luz fría de una farola y dibuja en el techo el rectángulo de la ventana. Desenfocado en el borde izquierdo, el frigorífico liso con la puerta un dedo abierta y su luz interior apagada.

COMPOSICIÓN: cuadro y diferencial bajado en el centro, con aire alrededor. La franja inferior central es el hueco oscuro de la puerta, sin detalle.
```

---

### Ficha 3.3 · `servicio-diferencial.jpg`

**Dónde sale:** servicio «Diferencial que salta». **1:1.** Un detalle: el diferencial nuevo manda.

```
Fotografía CUADRADA 1:1.

PLANO: macro suave de móvil, en ángulo oblicuo de unos 45 grados desde la izquierda, no de frente. Un interruptor diferencial NUEVO, blanco mate y limpio, en el carril metálico de un cuadro, con la palanca arriba, el botón de prueba sin letras y el frontal sin grabados. Entran por arriba un cable azul y uno marrón con el cobre recién pelado y brillante en el borne.

LUZ: una lámpara de obra con bombilla incandescente, fuera de cuadro a la izquierda, lo ilumina de forma RASANTE: se ve la textura del plástico y un brillo en el cobre. Los automáticos de al lado, ya en sombra, caen enseguida en la oscuridad.

LO QUE CUENTA LA HISTORIA: encima del cuadro, muy desenfocado, el diferencial VIEJO retirado, de plástico amarillento, con un trozo de cable colgando. En el carril, un par de virutas de aislante recién cortado.

COMPOSICIÓN: el diferencial nuevo en el centro, con mucho aire oscuro alrededor. La franja inferior central es la parte baja del cuadro, en sombra y sin detalle.
```

---

### Ficha 3.4 · `servicio-enchufe.jpg`

**Dónde sale:** servicio «Enchufes e interruptores». **1:1.**

```
Fotografía CUADRADA 1:1.

PLANO: PICADO, la cámara por encima de las manos del electricista, mirando hacia abajo y hacia la pared; su cabeza queda detrás de la cámara.

ACCIÓN: dos manos sin guantes, con mangas oscuras lisas, cambian un enchufe en una pared limpia de un dormitorio, a la altura de la mesilla: una mano sostiene el mecanismo nuevo, blanco, de dos orificios redondos; la otra aprieta un tornillo con un destornillador de mango morado apagado. Los cables azul, marrón y verde-amarillo salen ordenados de la caja.

LUZ: la lámpara de la propia mesilla, sin pantalla, está puesta en el suelo y enchufada en otra toma; su bombilla cálida ilumina las manos desde abajo y a un lado. El resto del dormitorio, en penumbra: se intuye el borde de una cama con una colcha oscura.

LO QUE CUENTA LA HISTORIA: en el suelo, sobre un trapo, el enchufe viejo, amarillento y flojo, y los tornillos en una tapa de tarro.

COMPOSICIÓN: manos y enchufe en el centro, algo hacia arriba, con aire alrededor; el enchufe viejo, en el lado izquierdo. La franja inferior central es suelo en sombra, sin objetos.
```

---

### Ficha 3.5 · `servicio-aire.jpg`

**Dónde sale:** servicio «Línea para el aire acondicionado». **1:1.**

```
Fotografía CUADRADA 1:1.

PLANO: desde dentro del salón, A TRAVÉS del cristal de la puerta del balcón, a un metro del cristal. El marco de aluminio de la puerta queda oscuro en los bordes. En el cristal no se refleja ninguna persona, solo un brillo cálido muy tenue de una lámpara del salón.

LO QUE CUENTA LA HISTORIA: fuera, en el balcón, la unidad exterior de un aire acondicionado, gris clara y lisa, sobre soportes metálicos. Desde un agujero en la pared, junto a la puerta, sale una canaleta eléctrica blanca NUEVA, recta, con un codo de 90 grados bien rematado, que llega hasta la unidad. Unas macetas oscuras en el suelo del balcón.

LUZ: anochecer, hora azul. El cielo es azul profundo y se oscurece casi a negro hacia los bordes de la imagen. En el bloque de enfrente, muy desenfocado, varias ventanas encendidas en tonos cálidos y pequeños. La unidad y la canaleta reciben la luz cálida de la farola de la calle desde abajo.

COMPOSICIÓN: unidad y canaleta en el centro, con aire alrededor. La franja inferior central es la parte baja oscura de la puerta y el suelo del balcón en sombra.
```

---

### Ficha 3.6 · `trabajo-cuadro.jpg` (el «después»)

**Dónde sale:** trabajo «Cuadro quemado en una casa…» (Después). **Va en la misma conversación que la ficha 3.7.** Genera esta primera y NO cambies de conversación: la 3.7 tiene que heredar su encuadre.

```
Fotografía horizontal 4:3, una única imagen. Es el "DESPUÉS" del cambio de un cuadro eléctrico quemado en una casa adosada, terminado esa misma noche.

ENCUADRE FIJO (lo repetiré en la versión "antes"): cámara a la altura del pecho, frontal, a metro y medio, mirando al hueco que queda bajo la escalera de la casa. Cuatro anclajes que no se moverán:
1. Arriba, la parte de abajo de la escalera de madera oscura cruza la imagen en DIAGONAL, de arriba a la izquierda hacia abajo a la derecha.
2. En el centro, en la pared del fondo del hueco, pintada de gris cálido, el cuadro eléctrico empotrado.
3. Abajo a la izquierda, un cesto de mimbre con zapatillas.
4. A la derecha del cuadro, colgando de su cable, un portalámparas con una bombilla desnuda de filamento encendida, de luz suave que no deslumbra.

LUZ FIJA: la bombilla desnuda colgada a la derecha del cuadro es la única luz: cálida, ilumina el cuadro de lado y deja la escalera y los bordes en sombra.

DESPUÉS: un cuadro nuevo de plástico blanco mate, con la tapa transparente ahumada abierta; dos filas de automáticos y diferenciales blancos, alineados y del mismo ancho, con las etiquetas en blanco; cables nuevos azules, marrones y verde-amarillo peinados con bridas negras. La pared de alrededor, repintada, con el gris un poco más limpio justo encima del cuadro. Detalle morado apagado: un destornillador olvidado sobre el cesto.

COMPOSICIÓN: el cuadro en el centro, con pared oscura alrededor. La franja inferior central es suelo de gres oscuro, sin objetos.
```

---

### Ficha 3.7 · `trabajo-cuadro-antes.jpg` (el «antes»)

**Dónde sale:** trabajo «Cuadro quemado en una casa…» (Antes). **Misma conversación que la 3.6.** El daño tiene que verse **mucho**.

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. MISMO ENCUADRE y mismos cuatro anclajes: la escalera de madera oscura en diagonal arriba, el cuadro empotrado en el centro de la pared gris del hueco, el cesto de mimbre abajo a la izquierda y el portalámparas con la bombilla desnuda colgando a la derecha del cuadro. MISMA LUZ: la bombilla desnuda colgada a la derecha del cuadro es la única luz: cálida, ilumina el cuadro de lado y deja la escalera y los bordes en sombra. Sin el destornillador morado.

Solo cambia el cuadro y la pared de encima, con el daño MUY visible desde lejos:
- La caja es antigua, de plástico crema amarillento, DEFORMADA por el calor: la tapa abombada y combada en una esquina, con el plástico marrón y negro.
- Los automáticos viejos tienen la carcasa FUNDIDA y ennegrecida; dos de ellos se han escurrido y pegado entre sí.
- Los cables tienen el aislante DERRETIDO y agrietado, pegados en una masa marrón oscura, con el cobre a la vista en varios tramos.
- Una lengua de HOLLÍN negro sube por la pared gris desde el cuadro hasta la parte de abajo de la escalera, que también tiene la madera tiznada.

Sin fuego, sin llamas, sin humo activo, sin chispas: solo las señales del calentamiento ya pasado. Que parezca la foto que hace el electricista con el móvil al llegar de madrugada.
```

---

### Ficha 3.8 · `trabajo-aire.jpg`

**Dónde sale:** trabajo «Línea para el aire», el aire del salón que hacía saltar la luz cada tarde.

```
Fotografía horizontal 4:3.

PLANO: plano general tomado desde el sofá, a la altura de una persona sentada: en primer término, desenfocado en el borde inferior izquierdo, el brazo del sofá de tela oscura.

LO QUE CUENTA LA HISTORIA: en la pared de enfrente, cerca del techo, la unidad interior de un aire acondicionado, blanca mate y lisa, con un pequeño piloto encendido. Desde ella baja en vertical una canaleta eléctrica blanca NUEVA, recta, con un codo de 90 grados limpio, hasta una caja de mecanismo nueva junto al zócalo. Apoyada en la pared, a la derecha de la canaleta, una escalera de mano plegada y, en el suelo junto a sus patas, un recorte sobrante de canaleta: el trabajo se acaba de terminar.

LUZ: noche. Una lámpara de pie con pantalla de tela, a la derecha, da un círculo de luz cálida en la pared; por los visillos de la ventana de la izquierda entra la luz anaranjada y difusa de una farola. Lo demás, en penumbra: pared gris cálido oscuro, zócalo de madera oscura.

COMPOSICIÓN: la unidad y la canaleta en el centro, con aire alrededor. La franja inferior central es suelo oscuro, sin objetos.
```

---

### Ficha 3.9 · `trabajo-diferencial.jpg`

**Dónde sale:** trabajo «Diferencial que saltaba»: una caja de registro con humedad hacía saltar el diferencial cada vez que llovía. Aunque el archivo se llame `-diferencial`, lo que se ve es el empalme rehecho en la caja.

```
Fotografía horizontal 4:3.

PLANO: detalle cercano, ligeramente de lado, a la altura de los ojos, en el pasillo de una vivienda junto a la pared exterior.

LO QUE CUENTA LA HISTORIA: una caja de registro cuadrada de plástico blanco empotrada, con la tapa quitada y colgando de un lado. Dentro, un EMPALME NUEVO y seco: los cables azul, marrón y verde-amarillo unidos con tres conectores de palanca transparentes, con el cobre visible dentro de cada uno; nada de cinta aislante. Alrededor de la caja, en la pintura, una mancha de humedad oscura y seca con un cerco amarillento. En el alféizar de la ventana de al lado, un secador de pelo doméstico liso, el que se usó para secar la caja.

LUZ: una lámpara de trabajo de pinza, enganchada al marco de una puerta a la izquierda, da una luz cálida y concentrada sobre la caja. A la derecha, la ventana del pasillo, de noche, con gotas de lluvia en el cristal que convierten las farolas de la calle en manchas cálidas desenfocadas.

COMPOSICIÓN: la caja y el empalme en el centro, con aire alrededor; la ventana con gotas, en el lado derecho. La franja inferior central es pared y zócalo en sombra.
```

---

### Ficha 3.10 · `empresa-furgoneta.jpg`

**Dónde sale:** `/empresa`. La furgoneta que llega de noche.

```
Fotografía horizontal 4:3.

PLANO: desde DENTRO de un portal de vecinos oscuro, mirando hacia la calle a través de la puerta abierta. El marco de la puerta y el vestíbulo, casi negros, enmarcan la imagen por los lados y por arriba.

LO QUE CUENTA LA HISTORIA: fuera, aparcada junto a la acera bajo una farola, una furgoneta blanca de tamaño medio, en tres cuartos desde atrás, con la carrocería lisa, sin rótulos ni logos y con la matrícula fuera de la vista. Sus puertas traseras están abiertas y la luz interior encendida deja ver estanterías metálicas con cajas lisas y un rollo de cable. Nadie a la vista.

LUZ: la farola da una luz anaranjada desde arriba; la carrocería blanca conserva el detalle, sin quemarse. El asfalto está seco. Al fondo, fachadas oscuras con alguna ventana encendida, desenfocadas y sin carteles.

COMPOSICIÓN: la furgoneta en el centro del hueco de la puerta, con aire alrededor. La franja inferior central es el umbral y el suelo del portal, en sombra, sin objetos.
```

---

## 4. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1448×1086 (4:3) o de 1254×1254 (1:1)**. Las fichas 4:3 y 1:1 se piden directamente en su proporción y no hace falta recortar nada.
- **La ficha 3.1 (16:9):** pide **horizontal** y, si ChatGPT entrega 3:2 o 4:3 en vez de 16:9, **Claude recortará** a 16:9 por el centro al convertirla (por eso el motivo va en la columna central y la franja inferior central queda libre). El recorte 4:5 de móvil lo hace la web con CSS sobre la misma foto.
- Los recortes conservan el centro, así que no pongas nada importante en los bordes superior e inferior ni en las esquinas (el contorno orgánico los come igualmente).
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**) con el **nombre exacto** de la tabla de §1, en `public/ejemplo/` del template.
- Después actualiza `CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)») y comprueba que cada `alt` de `site.config.ts` describe lo que se ve.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente. La web las marca con la etiqueta «Foto de ejemplo».
