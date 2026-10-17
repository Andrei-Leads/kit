# Prompts de ChatGPT · fotos de ejemplo de `electricidad-3` «Sin sorpresas»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto (la única excepción es la pareja antes/después, ficha 3.6 y 3.7, que va en la misma conversación). En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Guarda cada resultado como `3.<m>.png` (por ejemplo `3.1.png`) en `andrei-leads-tech/material/fotos-ejemplo/electricidad-3/`. Después pásaselas a Claude, que las convierte (ver §4).

Concepto del template: web **oscura** (noche `#121214`, texto casi blanco, primario morado `#7e22ce`). La paleta oscura la pone la web, no la foto. Las fotos van en dos registros. Las de servicios y trabajos son las que un electricista autónomo enseña en su WhatsApp o en su página de «trabajos hechos»: hechas con un iPhone por él mismo para documentar un trabajo en casa o en el local de un cliente o, si sale el trabajador, por el dueño de la empresa o por el propio cliente, con la luz real del sitio (ventana, LED de techo, fluorescente, linterna, flash). La portada (hero) y la furgoneta son profesionales: las hace el fotógrafo que la empresa ha contratado para su web, con luz natural cuidada. Todas con los tonos sobrios y naturales de una casa o una calle corriente, sin oscurecerlas a propósito.

Tres cosas propias de este template:

- **Contorno orgánico.** Las fotos no son rectángulos: se recortan con una forma de mancha que se come las esquinas y los bordes. Por eso el motivo principal va **centrado y con margen** alrededor, y no hay nada importante en bordes ni esquinas.
- **Etiqueta «Foto de ejemplo».** La web la superpone **dentro del contorno, centrada, abajo** (a un 9 % del borde inferior). Por eso cada prompt deja libre la **franja inferior central** (suelo, zócalo o pared lisa).
- **Hero 4:3 con dos recortes.** La foto del hero se pide en 4:3 y la web la recorta por el centro: en móvil sale apaisada encima del texto (2:1 en pantallas bajas como 375×667, 16:9 en el resto y en tableta) y en escritorio sale vertical, 4:5, a la derecha del texto. Todo lo importante va en el **centro** (entre el 30 y el 70 % del ancho y entre el 20 y el 60 % del alto), con los lados y la franja inferior central tranquilos.

Cada ficha cambia a propósito de espacio, momento del día, fuente de luz y persona que hace la foto, para que la serie no parezca diez veces la misma foto.

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Proporción |
|---|---|---|---|
| 3.1 | `hero.jpg` | Foto profesional a media mañana: electricista de espaldas, de cintura para arriba, revisando con un comprobador el cuadro abierto de un recibidor, a la altura de su cabeza; luz de día de la puerta del salón | 4:3 (motivo entre el 30 y el 70 % del ancho y el 20 y el 60 % del alto) |
| 3.2 | `servicio-averia.jpg` | Contrapicado en una cocina por la mañana, sin corriente: mano con linterna hacia el cuadro sobre el marco de la puerta, un diferencial bajado; nevera con imanes al lado | 4:3 |
| 3.3 | `servicio-diferencial.jpg` | Primer plano oblicuo de un diferencial nuevo con la luz del plafón del recibidor; el viejo, amarillento y desenfocado encima del cuadro | 1:1 |
| 3.4 | `servicio-enchufe.jpg` | Picado, foto del cliente: manos cambiando un enchufe junto a una cama, luz de mediodía por la persiana a medio subir | 1:1 |
| 3.5 | `servicio-aire.jpg` | Desde el salón por la puerta abierta del balcón, una tarde nublada: unidad exterior con canaleta nueva, fachada del bloque de enfrente al fondo | 1:1 |
| 3.6 | `trabajo-cuadro.jpg` | Cuadro nuevo en el hueco bajo la escalera de una casa adosada, foto con flash al terminar, cesto de mimbre (después) | 4:3 |
| 3.7 | `trabajo-cuadro-antes.jpg` | El mismo hueco al llegar, con el mismo flash: cuadro fundido y negro, cables derretidos, hollín subiendo por la pared (antes) | 4:3 |
| 3.8 | `trabajo-aire.jpg` | Plano general desde el sofá, foto del cliente al atardecer con el plafón encendido: aire acondicionado arriba y canaleta nueva bajando hasta el zócalo, escalera de mano aún apoyada | 4:3 |
| 3.9 | `trabajo-diferencial.jpg` | Detalle en un pasillo un día de lluvia: caja de registro abierta con empalme nuevo, mancha de humedad, luz gris de la ventana y plafón | 4:3 |
| 3.10 | `empresa-furgoneta.jpg` | Foto profesional en una mañana nublada luminosa: furgoneta blanca en tres cuartos desde atrás, puertas traseras abiertas con estanterías ordenadas, calle de bloques al fondo | 4:3 |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque).

```
Voy a pedirte una fotografía para la web de ejemplo de un electricista de urgencias en España. Estas reglas valen para toda la serie. La escena concreta (quién hace la foto, espacio, momento, luz y objetos) te la doy en el siguiente mensaje y manda sobre cualquier costumbre: síguela al pie de la letra aunque no sea la típica foto de electricista con una herramienta delante de una pared.

DOS TIPOS DE FOTO (la escena dice cuál es y quién la hace; si no lo dice, es FOTO DE MÓVIL DEL TRABAJO)
- FOTO DE MÓVIL DEL TRABAJO (servicios, trabajos, antes y después): la hace con su iPhone (16, 17 o 18) el propio electricista para documentar un trabajo real en casa o en el local de un cliente concreto y mandársela por WhatsApp o subirla a su web de «trabajos hechos»: «esto es lo que encontré», «así quedó». Si sale el trabajador, la hace el dueño de la empresa o el cliente. El trabajo es el protagonista y se ve bien claro, como lo enseñaría el técnico. Modo foto estándar de la cámara del iPhone, sin modos creativos: procesado típico de móvil (Smart HDR, Deep Fusion), exposición automática y gran profundidad de campo: casi todo enfocado; solo en un primer plano muy cercano el fondo se desenfoca un poco, como lo hace un móvil. Balance de blancos de la luz que haya en el sitio: plafón LED, fluorescente de cocina, bombilla, ventana de día, linterna. Si está oscuro, el flash del iPhone o una linterna, con su aspecto real: luz directa, sombra dura detrás de los objetos y el fondo algo más oscuro que el primer plano. Encuadre de foto hecha deprisa pero bien enfocada: a la altura de los ojos o del pecho (salvo que la escena pida otra altura), un poco torcido o con algo cortado en un borde.
- FOTO PROFESIONAL (portada de la web y furgoneta): la hace el fotógrafo que la empresa ha contratado para su web. Cámara buena, luz natural cuidada (la del sitio, bien aprovechada), exposición correcta, verticales rectas, composición limpia y ordenada, motivo nítido y fondo reconocible. Pero lugares y personas reales, con sus marcas de uso: nada de banco de imágenes, posados ni decorados.

NADA DE ASPECTO DE CINE (en los dos tipos)
- Prohibido: aspecto cinematográfico, gradación de color, tonos verdeazulados y naranjas, contraluces, iluminación de estudio, luz dramática que deja todo en penumbra menos el motivo, viñeteado, niebla, humo o polvo flotando en haces de luz, velas, «hora azul», bokeh exagerado, filtros, aspecto de banco de imágenes o de render 3D.

CASA DE UN CLIENTE REAL
- La casa o el local de alguien concreto, con sus cosas y marcas de uso: polvo, roces en la pintura, cables de la vida real, objetos del día a día (los que indique la escena). Solo está nuevo lo que acaba de instalar el electricista.
- Pocos objetos y con sentido: solo los que pida la escena. Nada de bodegón.

TONO
- Tonos sobrios y naturales, ni aclarados ni oscurecidos a propósito. Que ninguna ventana, cielo o pared quemada en blanco ocupe un borde de la imagen: la web es oscura y la foto se recorta con contorno orgánico.
- Si aparece un acento de color frío, que sea un morado apagado y natural (lo indica la escena).

SIEMPRE
- Sin caras: si aparece alguien, de espaldas, solo manos o con la cabeza fuera de cuadro. Sin reflejos de personas en cristales ni espejos.
- Sin logos, marcas ni texto legible: herramientas, cajas, electrodomésticos, aparatos de aire, ropa, calendarios, papeles y vehículos son lisos o ilegibles. Las etiquetas de los cuadros, en blanco.
- España corriente: enchufes de dos orificios redondos, cuadros europeos de carril con automáticos blancos. Nada lujoso ni americano. Sin monumentos ni rótulos que identifiquen una ciudad concreta.
- Sin fuego, llamas, chispas ni humo.
- Una única fotografía, no un collage ni varios paneles.
- Composición para un recorte con forma de mancha: el motivo principal CENTRADO y con margen alrededor; nada importante en esquinas ni bordes.
- La FRANJA INFERIOR CENTRAL queda sin detalle (suelo, zócalo o pared lisa): ahí se superpone una etiqueta de la web.
- La proporción la indica cada escena (4:3 o 1:1).

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 3.1 · `hero.jpg`

**Dónde sale:** hero de la home, sin texto encima: en móvil y tableta, apaisada sobre el h1 (2:1 a 375×667, 16:9 a 390×844 y a 768 px); en escritorio, vertical 4:5 a la derecha del texto (398×497 px a 1280 y 1440). Siempre con contorno orgánico y la etiqueta «Foto de ejemplo» abajo en el centro. Foto profesional. Tiene que transmitir «ya ha llegado y está mirando qué pasa, sin sorpresas». Se pide **horizontal 4:3**: el móvil se queda con todo el ancho y la franja central del alto (del 17 al 83 %), y el escritorio con todo el alto y la columna central del ancho (del 20 al 80 %). **Zona segura:** cabeza, mano y cuadro entre el 30 y el 70 % del ancho y entre el 20 y el 60 % del alto; por debajo del 60 %, en el centro, solo la espalda lisa de la chaqueta (ahí cae la etiqueta), y los lados, que en escritorio se pierden, tranquilos.

```
Fotografía HORIZONTAL 4:3, una única imagen.

TIPO: FOTO PROFESIONAL. QUIÉN Y POR QUÉ: la hace el fotógrafo que la empresa ha contratado para la portada de su web, durante un aviso real en casa de un cliente que les ha dejado hacer la foto. Quiere enseñar al técnico recién llegado, revisando el cuadro con calma: urgencia resuelta con orden, sin dramatismo.

CÓMO ES LA FOTO: cámara buena con un objetivo normal, a la altura de los ojos, desde un par de metros detrás del electricista y un poco a un lado. Verticales rectas, exposición correcta en toda la escena, colores naturales, el cuadro y la mano nítidos y el recibidor reconocible detrás.

PLANO: el electricista de cintura para arriba, DE ESPALDAS: nuca, hombros y espalda de una chaqueta de trabajo gris oscuro lisa. La cara queda completamente oculta, mirando al cuadro.

ACCIÓN: delante de él, empotrado en la pared a la altura de su cabeza, un cuadro eléctrico doméstico con la tapa abierta. Con una mano sujeta la tapa y con la otra apoya la punta de un comprobador de tensión liso en un automático. Fila de automáticos blancos y un diferencial, etiquetas en blanco, todo bien legible como forma (sin texto).

ESPACIO: recibidor de un piso corriente, a media mañana. Pared pintada de color hueso con algún roce. A la izquierda, un mueble zapatero bajo con unas zapatillas de casa delante y un llavero colgado encima; a la derecha, en el suelo, su caja de herramientas gris recién dejada, abierta. En el perchero, junto al zapatero, una chaqueta de un morado apagado: el único acento de color.

LUZ: luz de día natural que entra por la puerta abierta del salón, a un lado y fuera de cuadro, suave y pareja; el plafón del recibidor, encendido, la completa. Sin linterna, sin flash, sin manchas de sol. Ninguna ventana a la vista.

COMPOSICIÓN (la web recorta esta foto en apaisado en el móvil y en vertical en el ordenador; respeta estas posiciones):
- Cabeza, mano con el comprobador y cuadro abierto, juntos y compactos en el centro: entre el 30 % y el 70 % del ancho y entre el 20 % y el 60 % del alto (contando desde arriba). El cuadro, ligeramente a la derecha de su cabeza.
- Por debajo del 60 % del alto, en el centro, solo la espalda lisa de la chaqueta, sin objetos, bolsillos ni reflejos.
- El 20 % de arriba, pared o techo lisos.
- Los dos lados (el 20 % de cada borde): el zapatero a la izquierda y la caja de herramientas a la derecha, con poco detalle; pueden perderse.
- Ninguna zona quemada en blanco en los bordes.
```

---

### Ficha 3.2 · `servicio-averia.jpg`

**Dónde sale:** servicio «Averías y urgencias». El diferencial bajado que deja la casa sin luz.

```
Fotografía horizontal 4:3.

QUIÉN Y POR QUÉ: la hace el electricista con su iPhone nada más llegar, con el móvil en una mano y la linterna en la otra, para guardar cómo estaba el cuadro antes de tocar nada: «esto es lo que encontré».

PLANO: CONTRAPICADO. Él está debajo y mira hacia arriba, hacia el cuadro eléctrico, colocado en lo alto de la pared, encima del marco de la puerta de una cocina, como en muchos pisos antiguos. Solo entra su mano con la linterna y la muñeca con manga oscura por el lado derecho; nada más de su cuerpo.

LO QUE CUENTA LA HISTORIA: el haz de una linterna de mano lisa ilumina el cuadro con la tapa abierta: una fila de automáticos blancos con las palancas ARRIBA y un único diferencial, más ancho, con la palanca claramente ABAJO. Etiquetas en blanco. En el marco de la puerta, la pintura un poco amarillenta y una muesca.

ESPACIO Y LUZ: media mañana. La cocina no tiene corriente (los fluorescentes del techo, apagados), pero entra la luz de día, grisácea y suave, por una ventana a la izquierda: la cocina se ve normal, y solo el cuadro, en lo alto y en sombra, necesita la linterna. En el borde izquierdo, la puerta del frigorífico con unos imanes y un calendario de pared sin texto legible.

COMPOSICIÓN: cuadro y diferencial bajado en el centro, con margen alrededor. La franja inferior central es el hueco de la puerta y la pared lisa, sin detalle.
```

---

### Ficha 3.3 · `servicio-diferencial.jpg`

**Dónde sale:** servicio «Diferencial que salta». **1:1.** Un detalle: el diferencial nuevo manda.

```
Fotografía CUADRADA 1:1.

QUIÉN Y POR QUÉ: la hace el electricista con su iPhone, acercándose mucho, justo después de montar el diferencial, para mandársela al cliente con el presupuesto cerrado: «diferencial nuevo puesto».

PLANO: primer plano muy cercano, de móvil, en ángulo oblicuo de unos 45 grados desde la izquierda, no de frente. Un interruptor diferencial NUEVO, blanco mate y limpio, en el carril metálico de un cuadro, con la palanca arriba, el botón de prueba sin letras y el frontal sin grabados. Entran por arriba un cable azul y uno marrón con el cobre recién pelado en el borne.

LUZ: la del plafón LED del techo del recibidor, ya con corriente: blanca neutra, desde arriba, uniforme, con una sombra suave bajo cada automático. Los automáticos de al lado se ven con normalidad, algo menos nítidos.

LO QUE CUENTA LA HISTORIA: apoyado encima del cuadro, desenfocado como lo desenfoca un móvil de cerca, el diferencial VIEJO retirado, de plástico amarillento, con un trozo de cable colgando. En el carril, un par de virutas de aislante recién cortado y algo de polvo de taladro.

COMPOSICIÓN: el diferencial nuevo en el centro, con margen alrededor. La franja inferior central es la parte baja del cuadro, lisa y sin detalle.
```

---

### Ficha 3.4 · `servicio-enchufe.jpg`

**Dónde sale:** servicio «Enchufes e interruptores». **1:1.**

```
Fotografía CUADRADA 1:1.

QUIÉN Y POR QUÉ: la hace el cliente con su iPhone, de pie detrás del electricista, mientras este le cambia el enchufe de la mesilla, para enseñársela a su pareja: «ya está cambiando el enchufe que chispeaba».

PLANO: PICADO, el móvil por encima y por detrás de las manos del electricista, mirando hacia abajo y hacia la pared; la cabeza y la cara del electricista quedan fuera de cuadro.

ACCIÓN: dos manos sin guantes, con mangas oscuras lisas, cambian un enchufe en una pared limpia de un dormitorio, a la altura de la mesilla: una mano sostiene el mecanismo nuevo, blanco, de dos orificios redondos; la otra aprieta un tornillo con un destornillador de mango morado apagado. Los cables azul, marrón y verde-amarillo salen ordenados de la caja.

LUZ: mediodía. Entra luz de día por la ventana del dormitorio, con la persiana a medio subir: luz natural suave y bastante uniforme sobre las manos y la pared, con el balance de blancos del día.

LO QUE CUENTA LA HISTORIA: a un lado, la mesilla apartada de la pared, con un cargador de móvil desenchufado colgando, y el borde de la cama con su colcha. En el suelo, sobre un trapo, el enchufe viejo, amarillento y flojo, y los tornillos en una tapa de tarro.

COMPOSICIÓN: manos y enchufe en el centro, algo hacia arriba, con margen alrededor; el enchufe viejo, en el lado izquierdo. La franja inferior central es suelo liso, sin objetos.
```

---

### Ficha 3.5 · `servicio-aire.jpg`

**Dónde sale:** servicio «Línea para el aire acondicionado». **1:1.**

```
Fotografía CUADRADA 1:1.

QUIÉN Y POR QUÉ: la hace el electricista con su iPhone desde dentro del salón, al terminar, para enseñar en su web cómo queda la canaleta hasta la máquina de fuera.

PLANO: desde dentro del salón, a un paso de la puerta corredera del balcón, que está ABIERTA de par en par, a la altura del pecho. El marco de aluminio de la puerta enmarca la escena por los lados; no hay cristal delante de la unidad, así que no hay reflejos.

LO QUE CUENTA LA HISTORIA: fuera, en el balcón, la unidad exterior de un aire acondicionado, gris clara y lisa, sobre soportes metálicos. Desde un agujero en la pared, junto a la puerta, sale una canaleta eléctrica blanca NUEVA, recta, con un codo de 90 grados bien rematado, que llega hasta la unidad. En el suelo del balcón, unas macetas, un tendedero plegable cerrado apoyado en la pared y un poco de polvo de taladro bajo el agujero.

LUZ: tarde nublada, luz de día gris y suave, sin sombras marcadas. El fondo no es cielo: es la fachada del bloque de enfrente, de ladrillo o enfoscado claro, con sus ventanas y persianas, nítida como sale en un móvil.

COMPOSICIÓN: unidad y canaleta en el centro, con margen alrededor. La franja inferior central es el suelo del balcón y la guía de la corredera, sin objetos.
```

---

### Ficha 3.6 · `trabajo-cuadro.jpg` (el «después»)

**Dónde sale:** trabajo «Cuadro quemado en una casa…» (Después). **Va en la misma conversación que la ficha 3.7.** Genera esta primera y NO cambies de conversación: la 3.7 tiene que heredar su encuadre.

```
Fotografía horizontal 4:3, una única imagen. Es el "DESPUÉS" del cambio de un cuadro eléctrico quemado en una casa adosada, terminado esa misma noche.

QUIÉN Y POR QUÉ: la hace el electricista con su iPhone a las tantas de la madrugada, al terminar, para mandársela al cliente junto a la del "antes": «así ha quedado».

ENCUADRE FIJO (lo repetiré en la versión "antes"): de pie, móvil a la altura del pecho, frontal, a metro y medio, mirando al hueco que queda bajo la escalera de la casa. Cuatro anclajes que no se moverán:
1. Arriba, la parte de abajo de la escalera de madera oscura cruza la imagen en DIAGONAL, de arriba a la izquierda hacia abajo a la derecha.
2. En el centro, en la pared del fondo del hueco, pintada de gris cálido, el cuadro eléctrico empotrado.
3. Abajo a la izquierda, un cesto de mimbre con zapatillas.
4. A la derecha del cuadro, apoyada en la pared del hueco, una aspiradora de escoba lisa.

LUZ FIJA: el hueco no tiene luz propia y la foto está hecha con el flash del iPhone: luz blanca, directa y frontal, que ilumina de lleno el cuadro y la pared, deja una sombra dura y fina detrás del cesto y de la aspiradora, y hace que el fondo del hueco y la escalera queden algo más oscuros que el centro.

DESPUÉS: un cuadro nuevo de plástico blanco mate, con la tapa transparente ahumada abierta; dos filas de automáticos y diferenciales blancos, alineados y del mismo ancho, con las etiquetas en blanco; cables nuevos azules, marrones y verde-amarillo peinados con bridas negras. La pared de alrededor, limpia, con el gris un poco más claro justo encima del cuadro, donde se ha frotado el hollín. Detalle morado apagado: un destornillador olvidado sobre el cesto.

COMPOSICIÓN: el cuadro en el centro, con pared alrededor. La franja inferior central es suelo de gres, sin objetos.
```

---

### Ficha 3.7 · `trabajo-cuadro-antes.jpg` (el «antes»)

**Dónde sale:** trabajo «Cuadro quemado en una casa…» (Antes). **Misma conversación que la 3.6.** El daño tiene que verse **mucho**.

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo electricista con su iPhone a la una de la madrugada, nada más llegar, antes de tocar nada: «esto es lo que encontré».

MISMO ENCUADRE y mismos cuatro anclajes: la escalera de madera oscura en diagonal arriba, el cuadro empotrado en el centro de la pared gris del hueco, el cesto de mimbre abajo a la izquierda y la aspiradora de escoba lisa apoyada a la derecha del cuadro. MISMA LUZ: el hueco no tiene luz propia y la foto está hecha con el flash del iPhone: luz blanca, directa y frontal, que ilumina de lleno el cuadro y la pared, deja una sombra dura y fina detrás del cesto y de la aspiradora, y hace que el fondo del hueco y la escalera queden algo más oscuros que el centro. Sin el destornillador morado.

Solo cambia el cuadro y la pared de encima, con el daño MUY visible desde lejos:
- La caja es antigua, de plástico crema amarillento, DEFORMADA por el calor: la tapa abombada y combada en una esquina, con el plástico marrón y negro.
- Los automáticos viejos tienen la carcasa FUNDIDA y ennegrecida; dos de ellos se han escurrido y pegado entre sí.
- Los cables tienen el aislante DERRETIDO y agrietado, pegados en una masa marrón oscura, con el cobre a la vista en varios tramos.
- Una lengua de HOLLÍN negro sube por la pared gris desde el cuadro hasta la parte de abajo de la escalera, que también tiene la madera tiznada.

Sin fuego, sin llamas, sin humo, sin chispas: solo las señales del calentamiento ya pasado.
```

---

### Ficha 3.8 · `trabajo-aire.jpg`

**Dónde sale:** trabajo «Línea para el aire», el aire del salón que hacía saltar la luz cada tarde.

```
Fotografía horizontal 4:3.

QUIÉN Y POR QUÉ: la hace el cliente con su iPhone, sentado en su sofá, al atardecer, con el aire ya puesto y sin que salte la luz, para mandársela al electricista con un «ni un salto, gracias». El electricista está recogiendo en otra habitación, fuera de cuadro.

PLANO: plano general tomado desde el sofá, a la altura de una persona sentada, un poco torcido: en primer término, cortado en el borde inferior izquierdo, el brazo del sofá de tela con un cojín.

LO QUE CUENTA LA HISTORIA: en la pared de enfrente, cerca del techo, la unidad interior de un aire acondicionado, blanca mate y lisa, con un pequeño piloto encendido. Desde ella baja en vertical una canaleta eléctrica blanca NUEVA, recta, con un codo de 90 grados limpio, hasta una caja de mecanismo nueva junto al zócalo. Apoyada en la pared, a la derecha de la canaleta, la escalera de mano plegada del electricista y, en el suelo junto a sus patas, un recorte sobrante de canaleta y algo de polvo de taladro. En una estantería al lado, cosas de la casa: unos libros, un mando de la tele y una planta.

LUZ: última hora de la tarde. El plafón del techo del salón está encendido, con su luz cálida de bombilla LED, y por la ventana de la izquierda, con visillos, entra todavía algo de luz de día. Exposición automática de móvil: el salón se ve claro y normal, sin rincones oscuros a propósito.

COMPOSICIÓN: la unidad y la canaleta en el centro, con margen alrededor. La franja inferior central es suelo liso, sin objetos.
```

---

### Ficha 3.9 · `trabajo-diferencial.jpg`

**Dónde sale:** trabajo «Diferencial que saltaba»: una caja de registro con humedad hacía saltar el diferencial cada vez que llovía. Aunque el archivo se llame `-diferencial`, lo que se ve es el empalme rehecho en la caja.

```
Fotografía horizontal 4:3.

QUIÉN Y POR QUÉ: la hace el electricista con su iPhone después de secar la caja y rehacer el empalme, un día de lluvia, para enseñarle al cliente dónde estaba el problema y cómo ha quedado.

PLANO: detalle cercano, ligeramente de lado, a la altura de los ojos, en el pasillo de una vivienda junto a la pared exterior.

LO QUE CUENTA LA HISTORIA: una caja de registro cuadrada de plástico blanco empotrada, con la tapa quitada y colgando de un lado. Dentro, un EMPALME NUEVO y seco: los cables azul, marrón y verde-amarillo unidos con tres conectores de palanca transparentes, con el cobre visible dentro de cada uno; nada de cinta aislante. Alrededor de la caja, en la pintura, una mancha de humedad oscura y seca con un cerco amarillento. En el alféizar de la ventana de al lado, un secador de pelo doméstico liso, el que se usó para secar la caja, con el cable enrollado de cualquier manera.

LUZ: de día, con lluvia. El plafón del pasillo está encendido (luz blanca de LED) y por la ventana de la derecha entra la luz gris y plana de un día nublado; en el cristal hay unas gotas de lluvia normales y, detrás, se ve borrosa la fachada de enfrente.

COMPOSICIÓN: la caja y el empalme en el centro, con margen alrededor; la ventana, en el lado derecho, sin que ocupe el borde con un blanco quemado. La franja inferior central es pared y zócalo lisos.
```

---

### Ficha 3.10 · `empresa-furgoneta.jpg`

**Dónde sale:** `/empresa`. La furgoneta que llega a tu calle, ordenada: «sin sorpresas». Foto profesional.

```
Fotografía horizontal 4:3.

TIPO: FOTO PROFESIONAL. QUIÉN Y POR QUÉ: la hace el fotógrafo que la empresa ha contratado para su web, en una calle del barrio donde trabajan, para presentar la furgoneta con la que llegan a los avisos.

PLANO: desde la acera, a la altura del pecho, a unos cinco metros de la furgoneta, con cámara buena y las verticales de los edificios rectas.

LO QUE CUENTA LA HISTORIA: aparcada junto a la acera, una furgoneta blanca de tamaño medio, en tres cuartos desde atrás, con la carrocería lisa y limpia, sin rótulos ni logos y con la matrícula fuera de la vista. Sus puertas traseras están abiertas y dejan ver estanterías metálicas ordenadas con cajas lisas, un rollo de cable y una escalera de mano sujeta en un lateral. Nadie a la vista.

ESPACIO: al fondo, una calle corriente de bloques de pisos de ladrillo y revoco claro, con coches aparcados y algún árbol de alcorque, sin carteles ni rótulos legibles. El encuadre deja el cielo fuera o casi: fachada detrás de la furgoneta.

LUZ: mañana nublada y luminosa: luz natural pareja, sin sombras duras; la carrocería blanca conserva el detalle, sin quemarse. Asfalto seco. Colores naturales y sobrios.

COMPOSICIÓN: la furgoneta en el centro, con margen alrededor. La franja inferior central es la acera, sin objetos.
```

---

## 4. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1448×1086 (4:3) o de 1254×1254 (1:1)**. Las fichas 4:3 y 1:1 se piden directamente en su proporción y no hace falta recortar nada.
- **La ficha 3.1 (hero) se pide en 4:3**, nunca recortada por los lados (el 4:5 de escritorio perdería el motivo). Al convertirla, Claude simula los recortes (2:1, 16:9 y 4:5) y, si el cuadro se corta en el 2:1 del móvil, recorta **por abajo**: el de 16/10/2026 quedó en 1448×828. Si llega en otra proporción horizontal (por ejemplo, 1536×1024, 3:2), Claude la **normaliza a 4:3 recortando solo por los lados** (conserva todo el alto). Si llega cuadrada o vertical, se vuelve a pedir. Los recortes de la web (2:1 o 16:9 en móvil y tableta, 4:5 en escritorio) los hace el CSS sobre la misma foto.
- Los recortes conservan el centro, así que no pongas nada importante en los bordes superior e inferior ni en las esquinas (el contorno orgánico los come igualmente).
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**) con el **nombre exacto** de la tabla de §1, en `public/ejemplo/` del template.
- Después actualiza `CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)») y comprueba que cada `alt` de `site.config.ts` describe lo que se ve.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente. La web las marca con la etiqueta «Foto de ejemplo».
