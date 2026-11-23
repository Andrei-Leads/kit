# Prompts de ChatGPT · fotos de ejemplo de `fontaneria-1` «Qué te pasa»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto. La única excepción es la pareja antes/después (fichas 1.11 y 1.12), que va en la misma conversación. En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Guarda cada resultado como `1.<m>.png` (por ejemplo `1.1.png`) en `andrei-leads-tech/material/fotos-ejemplo/fontaneria-1/`. Después pásaselas a Claude, que las convierte (ver §4).

**Concepto del template:** «Qué te pasa» es una web de urgencias **oscura y recta**: casi negro (`#0c0f10`, superficies `#15191b`), texto hueso (`#f2efe8`) y primario latón (`#d4a72c`), sin radios. El hero no lleva foto: es un índice de averías por síntoma. Las fotos son pocas y pequeñas (miniaturas cuadradas de 96 px en el índice, 4:3 en cada servicio, 4:3 y 16:9 en trabajos), sin marco y **fundidas con el fondo negro**. Su ficha de estilo es de **detalle técnico en clave baja**: muy de cerca, un único punto de luz lateral duro, el fondo cayendo a negro, casi monocromo, y el agua y el metal como protagonistas. **Sin personas ni manos.**

**Registro:** todas son **fotos de móvil** que hace el propio fontanero con su iPhone durante el aviso, para mandárselas al cliente por WhatsApp o subirlas a su web: «esto es lo que encontré», «así ha quedado». El aspecto oscuro de la ficha de estilo sale de cómo trabaja él: espacios sin luz (bajo el fregadero, una galería, un baño con la luz cortada), su linterna como única luz lateral y la exposición del iPhone fijada en lo iluminado, así que el resto se queda negro. Sin personas ni manos en cuadro: sujeta el móvil con una mano y la linterna con la otra, o la apoya.

**Latón y color primario:** el latón aparece porque es el material real de llaves y latiguillos (lo pide la ficha), pero **envejecido y apagado**, nunca dorado brillante ni saturado: si el cliente cambia el primario, la foto sigue leyéndose como material y no como color de marca.

Tres cosas propias de este template:

- **Recortes.** Las fotos de servicio se piden en 4:3 y, además, se pintan **cuadradas** (96 px) en el índice de la home: el motivo va en el cuadrado central (entre el 12 y el 88 % del ancho). Las de trabajos se pintan en 4:3 y en 16:9: el motivo va en la franja central del alto (entre el 15 y el 85 %). La de la galería (`techo-humedad.jpg`) se pinta cuadrada.
- **Etiqueta «Imagen generada con IA».** Rectángulo casi negro al 85 % con texto de 12 px, **abajo a la izquierda**, a 6 px del borde (en las miniaturas de 96 y 128 px se abrevia a «IA»). Esa esquina va en **negro liso** (el fondo que cae a negro), sin brillos ni detalle: ocupa hasta un 30 % del ancho y un 10 % del alto.
- **Antes/después.** En `/trabajos/plato-ducha-burjassot` las dos fotos se superponen con un deslizador a 16:9, con los rótulos «Antes» y «Después» **arriba a la izquierda y arriba a la derecha**: las dos esquinas superiores también quedan tranquilas en esa pareja.

Ubicación de los datos de ejemplo: Valencia y l'Horta Nord (Benimaclet, Burjassot, Alboraya, Paterna, Godella). Todo es interior, así que no hay calles que identificar.

Cada ficha cambia a propósito de estancia, ángulo, lado y tipo de la luz, y de la cantidad de negro, para que la serie no parezca quince veces la misma foto.

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Proporción | Registro |
|---|---|---|---|---|
| 1.1 | `llave-paso.jpg` | **Foto ancla.** Llave de paso de latón empotrada en azulejo blanco de 15×15 con la junta gastada, una gota a punto de caer; luz lateral dura desde la izquierda, el resto negro | 1:1 | Móvil (fontanero) |
| 1.2 | `fuga-codo.jpg` | Codo de cobre soldado en el hueco bajo un fregadero, cerco blanco de cal y una gota colgando; luz rasante desde abajo a la derecha | 4:3 | Móvil (fontanero) |
| 1.3 | `sifon.jpg` | Sifón de PVC gris desmontado sobre una bayeta, agua turbia saliendo de la botella; cenital, luz desde arriba a la izquierda | 4:3 | Móvil (fontanero) |
| 1.4 | `termo-valvula.jpg` | Válvula de seguridad de latón bajo un termo eléctrico, goteando; contrapicado, luz lateral desde la derecha | 4:3 | Móvil (fontanero) |
| 1.5 | `cisterna.jpg` | Mecanismo de doble descarga dentro de una cisterna de porcelana sin tapa, agua clara; picado desde el borde, luz que entra por un lado y se refleja en el agua | 4:3 | Móvil (fontanero) |
| 1.6 | `grifo-cal.jpg` | Caño de un grifo monomando con costra de cal y una gota colgando; perfil, luz de contra lateral que hace brillar la gota | 4:3 | Móvil (fontanero) |
| 1.7 | `plato-ducha.jpg` | Rejilla de desagüe de un plato de ducha de resina pizarra con una lámina de agua; muy rasante, luz lateral baja | 4:3 | Móvil (fontanero) |
| 1.8 | `tuberia-plomo.jpg` | Tramo de plomo viejo, gris mate y abollado, junto a multicapa blanco nuevo con su racor de latón, sobre un tablero; luz lateral desde la derecha | 4:3 | Móvil (fontanero) |
| 1.9 | `techo-humedad.jpg` | Mancha de humedad con cerco en un techo de escayola y una gota colgando; contrapicado, luz rasante desde un lado | 4:3 (se ve 1:1) | Móvil (fontanero) |
| 1.10 | `trabajo-tuberias.jpg` | Roza abierta en la pared de una cocina con el multicapa nuevo y sus llaves de corte; luz de linterna lateral | 4:3 (y 16:9) | Móvil (fontanero) |
| 1.11 | `trabajo-bano.jpg` | **Después:** plato de ducha de resina nuevo con mampara fija, azulejo blanco rematado; luz lateral desde la izquierda | 4:3 (se ve 16:9) | Móvil (fontanero) |
| 1.12 | `trabajo-bano-antes.jpg` | **Antes:** el mismo rincón con la bañera de chapa vieja, esmalte saltado y óxido | 4:3 (se ve 16:9) | Móvil (fontanero) |
| 1.13 | `trabajo-fuga.jpg` | Dos baldosas levantadas en el suelo de una cocina, el codo nuevo debajo y una gota en el borde; picado, luz rasante | 4:3 (y 16:9) | Móvil (fontanero) |
| 1.14 | `trabajo-termo.jpg` | Parte baja de un termo nuevo blanco, con la válvula y dos latiguillos de latón; frontal, luz lateral, fondo negro | 4:3 (y 16:9) | Móvil (fontanero) |
| 1.15 | `trabajo-fregadero.jpg` | Sifón de acero inoxidable registrable bajo el fregadero de la barra de un bar; luz lateral desde la izquierda | 4:3 (y 16:9) | Móvil (fontanero) |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque).

```
Voy a pedirte una fotografía para la web de ejemplo de un fontanero de urgencias en Valencia (España). Estas reglas valen para toda la serie. La escena concreta (quién hace la foto, plano, objeto, espacio, luz y composición) te la doy en el siguiente mensaje y manda sobre cualquier costumbre: síguela al pie de la letra.

QUÉ TIPO DE FOTO ES
- Foto de MÓVIL en CLAVE BAJA. La hace el propio fontanero con su iPhone (16, 17 o 18) durante un aviso real en casa o en el local de un cliente, para mandársela por WhatsApp o subirla a su web: «esto es lo que encontré», «así ha quedado». Objetos reales en su sitio real, no un estudio ni un bodegón montado.
- Modo foto estándar del iPhone, muy cerca del objeto (el propio iPhone pasa a su modo macro automático en los primeros planos), sin modos creativos ni modo retrato. Procesado típico de móvil y gran profundidad de campo: el detalle principal (una gota, una junta, una costra de cal) bien nítido; solo en los planos más cercanos el fondo se suaviza un poco, como lo hace un móvil. Encuadre de foto hecha deprisa pero bien enfocada, quizá un poco torcido.
- UNA ÚNICA LUZ, LATERAL Y DURA: la linterna de mano del fontanero, sujeta con la otra mano o apoyada, fuera de cuadro (la escena dice de qué lado). El sitio está oscuro (bajo un fregadero, una galería sin luz, un baño con la luz apagada) y la exposición del iPhone está fijada en la zona iluminada, así que el resto de la imagen se queda casi NEGRO. Sombras duras, brillos pequeños y nítidos en el agua y el metal, algo de ruido de móvil en las sombras. Sin flash del móvil.
- Mucho negro alrededor del objeto. Los negros son neutros y profundos, no azulados ni verdosos: la foto se pinta sobre una web casi negra y debe fundirse con ella.

COLOR
- Casi monocromo: negros, grises, el blanco apagado del azulejo o la porcelana y el agua con brillos fríos y limpios.
- El único color cálido es el del metal: latón ENVEJECIDO y apagado (con algo de verdín o pátina) y cobre. Nunca dorado brillante, saturado o de catálogo.
- Ningún otro acento de color.

MATERIA
- Agua y metal: gotas, latón con verdín, cobre soldado, cal blanca en la grifería, sifones de PVC, cinta de teflón. Objetos de una casa o un bar españoles corrientes, con uso y desgaste real: juntas gastadas, cal, roces. Solo está nuevo lo que acaba de instalar el fontanero.
- Pocos objetos: solo los que pida la escena. Nada de bodegón decorativo.

PROHIBIDO EN ESTA SERIE
- Personas, manos, brazos o cualquier parte del cuerpo; reflejos de personas en el metal, el agua o los cristales.
- Herramientas en uso. Ventanas, cielos o luz de día entrando. Luz ambiente suave o pareja.
- Cromados nuevos de catálogo. Grifería, desagües o enchufes de modelo americano.
- Logos, marcas, texto, cifras o escalas legibles en grifos, termos, válvulas, tubos o etiquetas: todo liso o ilegible.
- Fuego, llamas, chispas, humo o vapor.
- Aspecto de cine o de anuncio: gradación verdeazulada y naranja, niebla o polvo flotando en el haz de luz, velas, viñeteado artificial, filtros, bokeh exagerado, aspecto de banco de imágenes o de render 3D.
- Collage o varios paneles: una única fotografía.

COMPOSICIÓN (la web recorta la foto)
- El motivo principal en el CENTRO, con negro alrededor; nada importante en los bordes.
- La ESQUINA INFERIOR IZQUIERDA es negro liso, sin brillos ni detalle: ahí la web pone una etiqueta.
- La proporción la indica cada escena (4:3 o 1:1).

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 1.1 · `llave-paso.jpg`

**Dónde sale:** servicio «Llave de paso que no cierra»: miniatura cuadrada de 96 px en el índice de la home y foto 4:3 en su página (recortada desde el cuadrado). Es la **foto ancla** de la serie: las demás tienen que parecer hechas con el mismo móvil y la misma linterna.

```
Fotografía CUADRADA 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en el baño de un piso antiguo del barrio, durante un aviso por una llave de paso que ya no cierra bien. Es la foto que abre la serie: el detalle que todo el mundo tiene en casa y nadie mira hasta que gotea.

PLANO: muy de cerca, frontal y ligeramente oblicuo (unos 20 grados desde la izquierda), a la altura de la llave, muy cerca.

OBJETO: una llave de paso de latón empotrada en una pared de azulejo blanco de 15×15 cm, con el embellecedor redondo y el maneral en forma de cruz. El latón está envejecido y apagado, con pátina oscura y un poco de verdín en la unión con la pared. Las juntas del azulejo, gastadas y algo amarillentas. Del cuerpo de la llave cuelga UNA GOTA de agua a punto de caer, nítida, con un brillo pequeño.

ESPACIO: pared de un baño de los años setenta, nada más a la vista.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde la IZQUIERDA y a la altura de la llave: luz dura y rasante que saca la textura del latón y un brillo en la gota. Los azulejos se iluminan solo cerca de la llave y caen a negro hacia los bordes.

COMPOSICIÓN: la llave y la gota en el centro, ocupando más o menos un tercio de la imagen; todo lo demás, azulejo que se apaga hasta negro. La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.2 · `fuga-codo.jpg`

**Dónde sale:** servicio «Fuga de agua»: miniatura cuadrada de 96 px en el índice y foto 4:3 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone agachado ante el mueble bajo el fregadero de una cocina, con las puertas abiertas, para enseñar cómo empieza una fuga pequeña: una gota que nadie ve hasta que el mueble se hincha.

PLANO: muy de cerca, oblicuo, desde abajo y desde la derecha, a la altura del codo.

OBJETO: un codo de cobre soldado de 90 grados que une dos tramos de tubería de cobre. En la soldadura, un CERCO BLANCO DE CAL seca y un poco de óxido verde; de la parte más baja del codo cuelga UNA GOTA a punto de caer. Detrás, desenfocado y casi negro, el fondo del mueble de aglomerado con una mancha de humedad.

ESPACIO: el hueco bajo el fregadero, oscuro, sin productos de limpieza a la vista.

LUZ: la linterna del fontanero, apoyada en el suelo del mueble abajo a la DERECHA, fuera de cuadro: luz rasante y dura que sube por el codo, hace brillar el cobre y la gota y deja el resto del mueble en negro.

COMPOSICIÓN: el codo y la gota en el centro, con negro alrededor; nada importante en los bordes (en la home esta foto se recorta cuadrada). La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.3 · `sifon.jpg`

**Dónde sale:** servicio «El váter o el fregadero no traga»: miniatura cuadrada de 96 px en el índice y foto 4:3 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en una cocina, justo después de que el fontanero desmonte el sifón atascado del fregadero: enseña lo que había dentro, sin asco y sin dramatismo.

PLANO: CENITAL, la cámara justo encima, mirando hacia abajo.

OBJETO: un sifón de botella de PVC gris, desmontado en tres piezas (la botella, la tuerca y el tubo), apoyadas sobre una bayeta de microfibra gris oscura y mojada. De la botella, tumbada, sale un charquito de AGUA TURBIA y grisácea con restos de grasa. Al lado, un trozo de cinta de teflón blanca enrollada.

ESPACIO: el suelo de la cocina, de terrazo oscuro, apenas visible alrededor de la bayeta.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde ARRIBA A LA IZQUIERDA, con el haz cerrado sobre la bayeta: sombras duras de las piezas hacia la derecha, brillos fríos en el agua, y el terrazo cayendo a negro hacia los bordes.

COMPOSICIÓN: las piezas del sifón agrupadas en el centro, con negro alrededor (en la home esta foto se recorta cuadrada). La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.4 · `termo-valvula.jpg`

**Dónde sale:** servicio «El termo no calienta»: miniatura cuadrada de 96 px en el índice y foto 4:3 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en la galería de un piso, debajo de un termo eléctrico que ha empezado a gotear: es lo primero que ve el cliente antes de llamar.

PLANO: CONTRAPICADO, desde abajo, mirando hacia la parte inferior del termo.

OBJETO: la parte baja de un termo eléctrico blanco, viejo, con la chapa un poco amarillenta y una marca de óxido. Saliendo de él, una VÁLVULA DE SEGURIDAD de latón envejecido con su palanca pequeña y un tubito de desagüe transparente; de la boca de la válvula cae UNA GOTA, y otra está formándose. Junto a la válvula, el latiguillo de agua fría de malla metálica, gastado. Sin etiquetas ni texto en el termo.

ESPACIO: la galería, con el techo y la pared detrás en negro.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde la DERECHA y un poco por debajo: luz dura que recorta la válvula y las gotas, saca un brillo en la curva blanca del termo y deja el resto en negro.

COMPOSICIÓN: válvula y gota en el centro, el termo entrando desde arriba; nada importante en los bordes (en la home esta foto se recorta cuadrada). La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.5 · `cisterna.jpg`

**Dónde sale:** servicio «La cisterna no para de cargar»: miniatura cuadrada de 96 px en el índice y foto 4:3 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en el baño de un cliente, con la tapa de la cisterna quitada, para enseñar el mecanismo que no cierra y deja correr el agua.

PLANO: PICADO, desde el borde de la cisterna, mirando hacia dentro y hacia abajo.

OBJETO: el interior de una cisterna de porcelana blanca: AGUA CLARA, quieta y transparente, y dentro el mecanismo de doble descarga de plástico blanco y gris, con el flotador y la campana. En el borde del mecanismo, algo de cal. Un hilo fino de agua corre por la rampa del rebosadero, lo único que se mueve. Sin texto ni marcas en el mecanismo.

ESPACIO: solo el borde de la cisterna de porcelana, que se apaga hasta negro.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde la IZQUIERDA, rasante sobre el borde de la cisterna: entra en el agua, se refleja en la superficie con brillos fríos y deja el fondo de la cisterna y los bordes en negro.

COMPOSICIÓN: el mecanismo y el agua en el centro, con negro alrededor (en la home esta foto se recorta cuadrada). La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.6 · `grifo-cal.jpg`

**Dónde sale:** servicio «Grifo que gotea o pierde presión»: miniatura cuadrada de 96 px en el índice y foto 4:3 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en el lavabo de un piso de Valencia, donde el agua es muy dura: enseña la cal que acaba con los grifos.

PLANO: muy de cerca, de PERFIL, a la altura del caño.

OBJETO: el caño de un grifo monomando de lavabo, de cromo viejo y mate, con una COSTRA BLANCA DE CAL alrededor del aireador y manchas de cal en la superficie. De la boca cuelga UNA GOTA alargada, a punto de caer. Por debajo, desenfocado, el borde del lavabo de porcelana.

ESPACIO: el resto del baño, invisible: negro.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde DETRÁS Y A LA DERECHA (un contraluz lateral): dibuja el perfil del caño con una línea de brillo, ilumina la gota desde dentro y deja la cal visible con su textura. Todo lo demás, negro.

COMPOSICIÓN: el caño entra desde la izquierda y la gota queda en el centro, con negro alrededor; nada importante en los bordes (en la home esta foto se recorta cuadrada). La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.7 · `plato-ducha.jpg`

**Dónde sale:** servicio «Cambio de bañera por plato de ducha»: miniatura cuadrada de 96 px en el índice y foto 4:3 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en un baño recién reformado, el día que el cliente se ducha por primera vez en su plato nuevo: el agua se va donde tiene que irse.

PLANO: MUY RASANTE, la cámara casi apoyada en el plato, a ras de la superficie.

OBJETO: un plato de ducha de resina gris pizarra, con su textura de piedra antideslizante. Sobre él, una lámina fina de agua con unas gotas que se deslizan hacia la REJILLA del desagüe, alargada, de acero mate. El agua forma pequeños brillos sobre la textura.

ESPACIO: el fondo del baño, desenfocado y casi negro; ni mampara ni grifería a la vista.

LUZ: la linterna del fontanero, apoyada en el plato fuera de cuadro, desde la DERECHA y a ras de la superficie: luz rasante que saca la textura de la resina y hace brillar el agua y el borde de la rejilla. El resto cae a negro.

COMPOSICIÓN: la rejilla y el agua que llega a ella en el centro, con negro arriba y en los bordes (en la home esta foto se recorta cuadrada). La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.8 · `tuberia-plomo.jpg`

**Dónde sale:** servicio «Tuberías viejas de plomo o hierro»: miniatura cuadrada de 96 px en el índice y foto 4:3 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en una obra de cambio de tuberías, con un tramo de plomo recién sacado de la pared junto al tubo nuevo que lo sustituye: «esto es lo que tenías, esto es lo que te queda».

PLANO: frontal, ligeramente desde arriba, sobre un tablero de obra.

OBJETO: dos tramos de tubería paralelos, de unos 40 cm, sobre un tablero de madera oscuro y gastado. Arriba, un tramo de PLOMO viejo: gris mate, blando, abollado y con una curva irregular, con restos de yeso pegados. Abajo, un tramo de MULTICAPA blanco nuevo, recto y limpio, con un racor de latón en un extremo. Nada más.

ESPACIO: el tablero apoyado en el suelo de una cocina en obra, solo se ve el tablero.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde la DERECHA, rasante sobre el tablero: saca las abolladuras del plomo y el brillo del racor, sombras duras hacia la izquierda, y el tablero cae a negro hacia los bordes.

COMPOSICIÓN: los dos tubos cruzando el centro de la imagen, con los extremos dentro del cuadro y negro alrededor (en la home esta foto se recorta cuadrada: lo importante en el centro). La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.9 · `techo-humedad.jpg`

**Dónde sale:** galería de `/trabajos`, con el título «Fuga del piso de arriba en Orriols». Se pinta **cuadrada**: el motivo va en el cuadrado central de la foto 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en el baño de un piso de Orriols (Valencia), donde la fuga del vecino de arriba ha empezado a asomar por el techo: es la foto que el cliente necesita para el seguro.

PLANO: CONTRAPICADO, mirando al techo, con la cámara casi vertical.

OBJETO: un techo de escayola blanca con una MANCHA DE HUMEDAD redonda, de bordes marrones y amarillentos, con varios cercos concéntricos. En el centro de la mancha, la pintura algo abombada y UNA GOTA colgando, a punto de caer.

ESPACIO: solo el techo; sin lámparas ni ventanas.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde un LADO, rasante sobre el techo: saca el relieve de la pintura abombada y el brillo de la gota; la escayola se apaga hasta negro lejos de la mancha.

COMPOSICIÓN: la mancha y la gota en el centro exacto, con negro alrededor; nada importante fuera del cuadrado central. La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.10 · `trabajo-tuberias.jpg`

**Dónde sale:** trabajo «Tuberías de plomo fuera en un piso de 1964» (Benimaclet). Se pinta a 4:3 en `/trabajos` y a 16:9 en su página: el motivo va en la franja central del alto.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en la cocina de un piso de 1964 en Benimaclet, el tercer día de obra, antes de tapar la roza: enseña la instalación nueva que va a quedar escondida en la pared.

PLANO: frontal y ligeramente oblicuo, a un metro de la pared, a la altura del pecho.

LO QUE CUENTA LA HISTORIA: en la pared de la cocina, entre azulejos blancos antiguos, una ROZA horizontal abierta en el ladrillo, con el borde de yeso roto. Dentro, recién colocados, dos tubos de MULTICAPA blanco paralelos con sus codos y dos llaves de corte de latón envejecido. Restos de polvo de ladrillo en el borde de la roza.

ESPACIO: el resto de la cocina, en negro.

LUZ: la linterna del fontanero desde la IZQUIERDA, apoyada en la encimera y fuera de cuadro: luz lateral dura que entra en la roza, saca la textura del ladrillo y el brillo de las llaves, y deja los azulejos de los extremos cayendo a negro.

COMPOSICIÓN: la roza y los tubos cruzando la imagen por el centro, dentro de la franja entre el 25 y el 75 % del alto; arriba y abajo, azulejo oscuro sin detalle. La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.11 · `trabajo-bano.jpg` (el «después»)

**Dónde sale:** trabajo «Bañera por plato de ducha en un piso de Burjassot» (Después). Se superpone a la 1.12 con un deslizador a 16:9 (rótulos «Antes» y «Después» arriba a la izquierda y arriba a la derecha) y se pinta sola a 4:3 en `/trabajos`. **Va en la misma conversación que la ficha 1.12.** Genera esta primera y NO cambies de conversación: la 1.12 tiene que heredar su encuadre.

```
Fotografía horizontal 4:3, una única imagen. Es el "DESPUÉS" del cambio de una bañera por un plato de ducha en un piso de Burjassot.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone la misma tarde en que se termina la obra, para ponerla junto a la del "antes": un matrimonio mayor que ya puede ducharse sin saltar el borde de la bañera.

ENCUADRE FIJO (lo repetiré en la versión "antes"): de pie en la puerta del baño, a la altura del pecho, frontal al rincón donde estaba la bañera, a unos dos metros. Cuatro anclajes que no se moverán:
1. La pared del fondo, de azulejo blanco de 20×20 con juntas grises, ocupa todo el ancho.
2. Una llave de paso de latón envejecido empotrada en el azulejo a la izquierda, a la altura del hombro.
3. La esquina del baño, una línea vertical en el lado derecho de la imagen (a un 80 % del ancho).
4. El suelo de gres gris claro en la franja de abajo.

LUZ FIJA: la luz del baño está apagada y la única luz es la linterna del fontanero, apoyada sobre una banqueta fuera de cuadro, desde la IZQUIERDA, a la altura de la llave, con el haz cerrado sobre el rincón: luz lateral dura que ilumina el centro, deja sombras marcadas hacia la derecha y hace que los bordes y el techo caigan a negro.

DESPUÉS: en el rincón, un plato de ducha de resina gris pizarra, a ras del suelo, con su rejilla alargada de acero mate y unas gotas de agua sobre la textura. Una mampara fija de cristal transparente con perfil de aluminio mate, sin reflejos de personas. La franja de azulejo donde iba la bañera, rematada con piezas blancas casi iguales a las originales, las juntas nuevas un poco más blancas. Todo limpio.

COMPOSICIÓN: plato y mampara en el centro, dentro de la franja entre el 15 y el 85 % del alto; las dos esquinas de arriba y la esquina inferior izquierda, en negro liso.
```

---

### Ficha 1.12 · `trabajo-bano-antes.jpg` (el «antes»)

**Dónde sale:** trabajo «Bañera por plato de ducha en un piso de Burjassot» (Antes). **Misma conversación que la 1.11.** El desgaste tiene que verse **mucho**.

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo fontanero con su iPhone el primer día, antes de que se toque nada.

MISMO ENCUADRE y mismos cuatro anclajes: la pared del fondo de azulejo blanco de 20×20 con juntas grises ocupando todo el ancho, la llave de paso de latón envejecido empotrada a la izquierda a la altura del hombro, la esquina del baño como línea vertical a un 80 % del ancho y el suelo de gres gris claro en la franja de abajo. MISMA LUZ: la luz del baño está apagada y la única luz es la linterna del fontanero, apoyada sobre una banqueta fuera de cuadro, desde la IZQUIERDA, a la altura de la llave, con el haz cerrado sobre el rincón: luz lateral dura que ilumina el centro, deja sombras marcadas hacia la derecha y hace que los bordes y el techo caigan a negro.

Solo cambia el rincón, con el desgaste MUY visible:
- En lugar del plato, una BAÑERA DE CHAPA esmaltada blanca, vieja y alta, de borde a la altura de la rodilla.
- El esmalte SALTADO en varios puntos del borde, con manchas de ÓXIDO marrón alrededor y una raya de óxido bajando desde el desagüe.
- La junta de silicona entre la bañera y el azulejo, NEGRA de moho y despegada.
- Unas juntas del azulejo amarillentas, y en el suelo, delante de la bañera, una alfombrilla de baño gastada.
- Sin mampara: una barra de cortina con la cortina recogida a un lado, lisa y sin dibujo.

Sin texto, sin logos. Las dos esquinas de arriba y la esquina inferior izquierda, en negro liso.
```

---

### Ficha 1.13 · `trabajo-fuga.jpg`

**Dónde sale:** trabajo «Fuga oculta bajo el suelo de la cocina» (Alboraya). Se pinta a 4:3 en `/trabajos` y en la ficha del servicio, y a 16:9 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en la cocina de una casa de Alboraya, con el suelo todavía abierto, justo después de cambiar el codo que perdía agua: enseña que solo se han levantado dos baldosas.

PLANO: PICADO, de pie, mirando al suelo a un metro y medio.

LO QUE CUENTA LA HISTORIA: en un suelo de baldosa de gres beis, un hueco rectangular del tamaño de DOS BALDOSAS levantadas, con el mortero roto en los bordes. Dentro del hueco, sobre tierra y mortero húmedos y oscuros, un CODO DE COBRE nuevo y brillante soldado a una tubería vieja. En el borde del hueco, UNA GOTA de agua. Las dos baldosas que se han quitado, enteras, apoyadas una sobre otra junto al hueco: se volverán a poner.

ESPACIO: alrededor, el suelo de la cocina cayendo a negro; el zócalo de un mueble apenas se intuye arriba.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde ABAJO A LA DERECHA, rasante sobre el suelo: brillo en el cobre y en la gota, sombras duras en el borde del hueco, y el resto del suelo cayendo a negro.

COMPOSICIÓN: el hueco y el codo en el centro, dentro de la franja entre el 20 y el 80 % del alto; las baldosas sueltas a la derecha del hueco. La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.14 · `trabajo-termo.jpg`

**Dónde sale:** trabajo «Termo de 80 litros cambiado en el día» (Paterna). Se pinta a 4:3 en `/trabajos` y a 16:9 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone en el lavadero de una casa de Paterna, la misma tarde en que se cambia el termo picado: enseña el montaje nuevo, limpio y bien rematado.

PLANO: frontal, a la altura de la parte baja del termo, a un metro.

LO QUE CUENTA LA HISTORIA: la mitad inferior de un TERMO ELÉCTRICO NUEVO, blanco mate, liso y sin etiquetas ni texto, colgado en la pared. De su base salen dos LATIGUILLOS de latón nuevos, rectos y paralelos, y la VÁLVULA DE SEGURIDAD de latón con su tubito de desagüe transparente bajando hacia un sumidero. En una de las conexiones, unas vueltas de cinta de teflón blanca asomando.

ESPACIO: la pared del lavadero y todo lo demás, en negro.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde la IZQUIERDA, con el haz cerrado sobre la base del termo y los latiguillos: luz lateral dura que hace brillar el latón y dibuja la curva blanca del termo; el resto, negro.

COMPOSICIÓN: la base del termo, la válvula y los latiguillos en el centro, dentro de la franja entre el 15 y el 85 % del alto; nada importante en los bordes. La esquina inferior izquierda, negro liso.
```

---

### Ficha 1.15 · `trabajo-fregadero.jpg`

**Dónde sale:** trabajo «Atasco en el fregadero de una cafetería» (Godella). Se pinta a 4:3 en `/trabajos` y a 16:9 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el fontanero con su iPhone agachado detrás de la barra de una cafetería de Godella, antes de que abran, con el fregadero ya desatascado: enseña el sifón nuevo que el dueño podrá abrir y limpiar él mismo.

PLANO: oblicuo desde la izquierda, agachado, a la altura del sifón, bajo la pila.

LO QUE CUENTA LA HISTORIA: bajo una pila de acero inoxidable de bar, un SIFÓN DE ACERO INOXIDABLE nuevo, brillante pero no de catálogo, con su tapón de registro abajo y la tuerca de unión, conectado a un tubo de PVC gris que se pierde hacia la pared. Unas gotas de agua limpia en la parte baja del sifón. A un lado, el borde de un cubo de fregar.

ESPACIO: el hueco bajo la barra, con el fondo de baldosa de bar oscura cayendo a negro; ni cajas ni productos con marca.

LUZ: la linterna del fontanero, sujeta con la otra mano fuera de cuadro, desde la IZQUIERDA, a la altura del sifón: brillo lineal en la curva del acero, gotas brillantes, sombras duras hacia la derecha, y el resto del hueco en negro.

COMPOSICIÓN: el sifón en el centro, dentro de la franja entre el 15 y el 85 % del alto, con negro alrededor. La esquina inferior izquierda, negro liso.
```

---

## 4. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1448×1086 (4:3)** o **de 1254×1254 (1:1)**. Todas las fichas se piden directamente en su proporción y no hace falta recortar nada; los recortes de la web (cuadrado en el índice y en la galería, 16:9 en las páginas de trabajo) los hace el CSS sobre la misma foto. Si una llega en otra proporción horizontal (por ejemplo 1536×1024, 3:2), Claude la normaliza a 4:3 recortando solo por los lados.
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**, sin metadatos) con el **nombre exacto** de la tabla de §1, en `templates/fontaneria/fontaneria-1/public/ejemplo/`.
- Después actualiza `public/ejemplo/CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)»), comprueba que cada `alt` de `site.config.ts` describe lo que se ve (con tu OK si hay que cambiarlo) y que todas siguen con `origen: "ia"`.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente real: en la web de un cliente, `/trabajos` lleva sus fotos.
