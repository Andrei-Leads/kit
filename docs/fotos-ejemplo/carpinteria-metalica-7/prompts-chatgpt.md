# Prompts de ChatGPT · fotos de ejemplo de `carpinteria-metalica-7` «Forja»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto. La única excepción es la pareja antes/después de Benetússer (fichas 7.7 y 7.8): va en la misma conversación, **primero el después y luego el antes**. En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Guarda cada resultado como `7.<m>.png` (por ejemplo `7.1.png`) en `andrei-leads-tech/material/fotos-ejemplo/carpinteria-metalica-7/`. Después pásaselas a Claude, que las convierte (ver §4).

**Concepto del template:** «Forja» es la web de una herrería de Massanassa (L'Enclusa, en l'Horta Sud de Valencia), tipo proyecto: rejas, barandillas, portones, escaleras y reparaciones con soldadura. Es una web **de hierro y óxido**:

- **Colores:** fondo de óxido de minio (`#a8461f`, el primario), bloques de hierro casi negro (`#1b1714`) y acento chispa (`#f2b544`).
- **Formas:** bloques en diagonal, fotos sin radios con una esquina cortada, tipografía condensada.

Su ficha de estilo es de **taller de verdad**:

- **Luz:** dura y lateral, la que entra por el **portón abierto**, con sombras profundas. Nunca flash.
- **Color:** cálido de sodio, negros con un punto de marrón, el óxido presente en el material.
- **Archivo:** sin grano (el grano lo pone la web).
- **Personas:** solo manos con guantes de soldador o una careta fuera de foco. Nunca una cara.

**Registro:** todas son **fotos de móvil**. Las del taller las hace Vicent, el herrero, con su iPhone, sin pararse a preparar nada: el móvil **a la altura de la cadera**, el banco en primer término y la luz del portón como único foco. Las obras las hace Andreu, el de montaje, con su iPhone al terminar: **de frente**, con algo de calle o de patio alrededor, con el sol bajo de última hora de la tarde, que da duro y de lado. El aspecto potente sale de esa luz dura, no de un fotógrafo.

**Óxido y color primario:** el primario de la web es el rojo óxido del minio. El minio y el óxido salen porque los pide la ficha (son materiales reales), pero **mates, polvorientos y gastados**, nunca un rojo liso y brillante que imite el color de la web. Así, si el cliente cambia su primario, la foto sigue leyéndose como hierro.

**Chispas:** el método común prohíbe fuego y chispas, pero la ficha de este template pide **chispas de soldadura en el hero**, así que ahí se permiten: un abanico corto de chispas como punto más brillante, sin llamas ni humo. En el resto de fotos, sin chispas.

Cosas propias de este template:

- **Etiqueta «Imagen generada con IA»:** una placa de hierro **arriba a la izquierda** de casi todas las fotos. Esa esquina va en sombra lisa, sin detalle.
  - En el **hero** y en la foto grande de cada obra, la placa baja un poco, a unos 76 px del borde, porque encima va la cabecera.
  - En la pareja antes/después, la placa va **abajo**: a la izquierda en el antes y a la derecha en el después. Ahí, las dos esquinas de abajo van lisas.
- **Esquina cortada:** en la galería y en `/empresa`, las fotos llevan la **esquina superior derecha** cortada en diagonal. No pongas nada importante ahí.
- **Hero (7.1):** a sangre, casi a pantalla completa, con un velo oscuro que sube desde abajo y el titular encima.
  - Se pide en **4:3** y Claude lo recorta a **16:9** (1448×815, sin ampliar).
  - En móvil se ve en vertical, con la **columna central** del ancho (del 30 al 70 %): la reja y las chispas van ahí.
  - La **mitad de abajo, más oscura**, para el titular.
  - Es también la **imagen de Open Graph** (la vista previa al compartir por WhatsApp).
- **Obras (7.2–7.8):** cada una se ve a dos tamaños:
  - **Cuadrada** (1:1) en la galería. La primera de cada grupo se ve a 4:3 en escritorio.
  - A **4:3** en su página, con un corte en diagonal abajo.
  - Por eso **lo importante va en el centro**: en las cuadradas, entre el 15 y el 85 % del alto; en las 4:3, entre el 15 y el 85 % del ancho.
- **Piezas de servicio (7.9–7.13):** 4:3 en la tarjeta y en su página (con un corte en diagonal arriba a la izquierda) y cuadradas pequeñas en la lista. El detalle, en el centro.
- **`/empresa` (7.14 y 7.15):** se piden en 4:3 y Claude las recorta a **3:2**.

Ubicación de los datos de ejemplo: l'Horta Sud de Valencia y la ciudad (Massanassa, Catarroja, Albal, Alfafar, Silla, Russafa, Benetússer). Arquitectura de pueblo valenciano: fachadas encaladas o de revoco, bajos con reja, balcones con barandilla, baldosa hidráulica, patios interiores de finca antigua. Sin monumentos ni rótulos.

Cada ficha cambia de pieza, de ángulo, de lado de la luz y de material (pletina, redondo, chapa, cuadradillo), para que la serie no parezca quince veces la misma reja.

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Pedir en | Registro |
|---|---|---|---|---|
| 7.1 | `hero-taller.jpg` | Banco de herrero con una reja de pletina a medio soldar, chispas a la izquierda, guantes desenfocados delante, mitad de abajo en sombra | 4:3 (se recorta a 16:9) | Móvil (herrero, taller) |
| 7.2 | `obra-01-reja-catarroja.jpg` | Reja negra de forja con volutas en la ventana de un bajo encalado, con baldosa hidráulica en la acera | 4:3 | Móvil (montaje, calle) |
| 7.3 | `obra-02-reja-albal.jpg` | Reja lisa de pletina y redondo en una ventana de planta baja con persiana verde | 1:1 | Móvil (montaje, calle) |
| 7.4 | `obra-03-barandilla-alfafar.jpg` | Barandilla de cuadradillo en un balcón de fachada de pueblo, desde la calle | 1:1 | Móvil (montaje, calle) |
| 7.5 | `obra-04-porton-silla.jpg` | Portón corredero de patio, chapa abajo y barrotes arriba, con su guía en el suelo | 4:3 | Móvil (montaje, calle) |
| 7.6 | `obra-05-escalera-russafa.jpg` | Escalera de caracol de hierro negro en el patio interior de una finca antigua | 4:5 | Móvil (montaje, patio) |
| 7.7 | `obra-06-reparacion-benetusser.jpg` | **Después:** barandilla de escalera de comunidad soldada y pintada de negro, peldaños de terrazo | 1:1 | Móvil (herrero, escalera) |
| 7.8 | `obra-06-antes.jpg` | **Antes:** la misma barandilla con la base comida por el óxido y barrotes sueltos | 1:1 | Móvil (herrero, escalera) |
| 7.9 | `pieza-rejas.jpg` | Macro de una voluta de forja con remache y calamina | 4:3 | Móvil (herrero, taller) |
| 7.10 | `pieza-barandillas.jpg` | Pasamanos de forja en primer plano, a 45° | 4:3 | Móvil (herrero, taller) |
| 7.11 | `pieza-portones.jpg` | Bisagra y cerrojo de portón con imprimación de minio | 4:3 | Móvil (herrero, taller) |
| 7.12 | `pieza-escaleras.jpg` | Peldaño de chapa lagrimada con luz rasante | 4:3 | Móvil (herrero, taller) |
| 7.13 | `pieza-soldadura.jpg` | Cordón de soldadura reciente, todavía irisado, sobre una pletina | 4:3 | Móvil (herrero, taller) |
| 7.14 | `taller-yunque.jpg` | Yunque con martillos sobre un tocón, suelo con cascarilla | 4:3 (se recorta a 3:2) | Móvil (herrero, taller) |
| 7.15 | `taller-hierro.jpg` | Barras de hierro en un estante, con la luz lateral del portón | 4:3 (se recorta a 3:2) | Móvil (herrero, taller) |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque).

```
Voy a pedirte una fotografía para la web de ejemplo de una herrería de un pueblo de Valencia (España): rejas, barandillas, portones, escaleras de hierro y reparaciones con soldadura. Estas reglas valen para toda la serie. La escena concreta (quién hace la foto, pieza u obra, luz y composición) te la doy en el siguiente mensaje y manda sobre cualquier costumbre: síguela al pie de la letra.

QUÉ TIPO DE FOTO ES
- Foto de MÓVIL hecha con un iPhone (16, 17 o 18), no de un fotógrafo. La hace el herrero o su compañero de montaje para la web del taller: piezas en el taller y obras ya montadas.
- Cámara principal del iPhone en su modo de 35 mm (en los primeros planos, su modo macro automático), modo foto estándar, sin modo retrato ni filtros. Imagen limpia y nítida, SIN GRANO añadido.
- En el taller, el móvil a la ALTURA DE LA CADERA, un poco desde abajo, con el banco en primer término. En las obras, DE FRENTE, a la altura de los ojos, con algo de calle o de patio alrededor.

LUZ Y COLOR
- En el taller: la ÚNICA luz es la del sol que entra por el PORTÓN ABIERTO, DURA y LATERAL, con sombras PROFUNDAS. El fondo del taller cae a oscuro. Nunca flash ni luz de tubos.
- En las obras: sol bajo de última hora de la tarde, DURO y de LADO, que marca el relieve del hierro y deja sombras largas de los barrotes sobre la pared. Cálido, pero no dorado de postal.
- Color cálido (como luz de farola de sodio), negros con un punto de MARRÓN, saturación natural.

MATERIA
- Hierro de verdad: hierro en bruto con CALAMINA gris azulada, pletinas, redondos y cuadradillos de forja, puntas de lanza, volutas, remaches, tornillo de banco, yunque, electrodos, cepillo de púas, imprimación de MINIO (rojo anaranjado MATE y polvoriento), pintura de forja negra, cascarilla y restos de chispas en el suelo. El óxido, presente y real.
- Obras: arquitectura de pueblo valenciano (fachadas encaladas o de revoco, bajos con reja, balcones, baldosa hidráulica, patios de finca antigua). Real y vivida.
- Personas: como mucho, MANOS con GUANTES de soldador de cuero o una careta de soldar fuera de foco. Nunca una cara ni una persona reconocible.

PROHIBIDO
- Luz plana, flash directo, talleres limpios de catálogo.
- Aluminio, PVC o acero inoxidable brillante como protagonista.
- Fuego, llamas, humo o chispas (salvo que la escena las pida expresamente).
- Caras o personas reconocibles, reflejos del fotógrafo o del móvil.
- Logos o marcas de herramientas y máquinas, texto, números, matrículas, rótulos o números de portal legibles.
- Un rojo liso y brillante en el hierro: el minio y el óxido, siempre mates y gastados.
- Aspecto de cine, gradación verdeazulada y naranja, niebla, viñeteado, HDR, render 3D, banco de imágenes.
- Arquitectura que no sea española.
- Collage o varios paneles: una única fotografía.

COMPOSICIÓN
- El motivo principal en el CENTRO, con margen alrededor.
- La ESQUINA SUPERIOR IZQUIERDA en sombra lisa, sin detalle: ahí la web pone una etiqueta.
- La ESQUINA SUPERIOR DERECHA sin nada importante: la web la corta en diagonal.
- La proporción la indica cada escena.

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 7.1 · `hero-taller.jpg`

**Dónde sale:** hero de la home, a sangre y casi a pantalla completa, con un velo oscuro que sube desde abajo y el titular encima. Es la primera imagen que se carga y la **imagen de Open Graph**. Se pide en 4:3. En escritorio, Claude la recorta a 16:9 (se queda con la franja central del alto, del 12 al 88 %). En móvil, la web la recorta en vertical y se queda con la columna central (del 30 al 70 % del ancho). La etiqueta va arriba a la izquierda, bajo la cabecera.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone sin dejar de trabajar, con el móvil a la altura de la cadera, mientras su compañero suelda una reja en el banco: la foto de portada de la web del taller.

PLANO: desde abajo, a la altura de la cadera, con el borde del banco de trabajo en primer término y profundidad media.

LO QUE CUENTA LA HISTORIA: sobre un banco de trabajo de hierro, marcado y lleno de cascarilla, una REJA de PLETINA negra a MEDIO SOLDAR, tumbada: unos barrotes ya puestos y otros sueltos al lado. A la IZQUIERDA del centro, justo donde se suelda, un ABANICO CORTO de CHISPAS naranjas que saltan hacia la izquierda: es el punto más brillante de la foto (sin llamas ni humo). Delante, en primer término y DESENFOCADOS, los GUANTES de soldador de cuero apoyados en el canto del banco. Al fondo, las paredes oscuras del taller y un tornillo de banco en sombra.

LUZ: el sol entra DURO y LATERAL por el portón abierto, desde la derecha, y raya el banco y la reja. Todo lo demás cae a sombra profunda.

COMPOSICIÓN (la web recorta esta foto en horizontal en el ordenador y en vertical en el móvil):
- La reja y las chispas, en el centro: entre el 30 y el 70 % del ancho y entre el 20 y el 55 % del alto.
- La MITAD DE ABAJO, más oscura (el banco en sombra): ahí va el titular.
- La esquina superior izquierda, pared oscura lisa.
- Sin caras, sin personas reconocibles, sin logos en guantes ni en máquinas.
```

---

### Ficha 7.2 · `obra-01-reja-catarroja.jpg`

**Dónde sale:** obra «Reja con volutas para un bajo»: primera de su grupo en la galería (4:3 en escritorio, cuadrada en móvil) y foto grande a 4:3 en su página. Lo importante, entre el 15 y el 85 % del ancho.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el de montaje con su iPhone desde la acera, a última hora de la tarde, justo después de dejar puesta la reja en la ventana de un bajo de Catarroja (Valencia).

PLANO: frontal a la ventana, a la altura de los ojos, desde unos tres metros, con algo de fachada y de acera alrededor.

LO QUE CUENTA LA HISTORIA: una REJA NEGRA de FORJA con VOLUTAS en la parte de arriba y de abajo y barrotes redondos rectos en el centro, con remaches en los cruces. Va en la ventana de un BAJO de una casa de pueblo ENCALADA en blanco, con un zócalo de piedra gris. Detrás de la reja, una persiana de madera bajada a medias. En la acera, una franja de BALDOSA HIDRÁULICA con dibujo geométrico gastado. A un lado, el marco de la puerta de la calle, de madera.

LUZ: sol bajo y duro desde la izquierda: los barrotes y las volutas dejan SOMBRAS LARGAS en diagonal sobre la cal.

COMPOSICIÓN: la reja en el centro. La esquina superior izquierda, cal en sombra lisa. Sin números de casa, sin rótulos, sin personas.
```

---

### Ficha 7.3 · `obra-02-reja-albal.jpg`

**Dónde sale:** obra «Rejas lisas de una planta baja»: cuadrada en la galería y a 4:3 en su página. Lo importante, entre el 15 y el 85 % del alto.

```
Fotografía cuadrada 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace el de montaje con su iPhone desde la acera, a última hora de la tarde, al terminar de poner las rejas de una planta baja en Albal (Valencia).

PLANO: frontal, a la altura de los ojos, desde unos dos metros y medio.

LO QUE CUENTA LA HISTORIA: una REJA LISA, sin adornos, de marco de PLETINA y barrotes de REDONDO verticales, pintada de negro mate, en la ventana de una planta baja de REVOCO crema algo gastado. Detrás de la reja, una PERSIANA enrollable de lamas de un VERDE APAGADO y descolorido por el sol, bajada hasta la mitad. Abajo, un alféizar de piedra con una maceta de geranios. A la derecha, un trozo de la ventana de al lado, ya cortado por el borde.

LUZ: sol bajo y duro desde la derecha: los barrotes dejan sombras en diagonal sobre la persiana y el revoco.

COMPOSICIÓN: la reja en el centro, entre el 15 y el 85 % del alto. La esquina superior izquierda, revoco en sombra lisa. Sin números de casa, sin rótulos.
```

---

### Ficha 7.4 · `obra-03-barandilla-alfafar.jpg`

**Dónde sale:** obra «Barandilla de balcón en Alfafar»: cuadrada en la galería (la primera de su grupo, a 4:3 en escritorio) y a 4:3 en su página. El balcón, entre el 15 y el 85 % del alto y del ancho.

```
Fotografía cuadrada 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace el de montaje con su iPhone desde la calle, a última hora de la tarde, cuando terminan de montar la barandilla del balcón de una casa de Alfafar (Valencia).

PLANO: desde la acera de enfrente, con la ligera contrapicada de mirar a un primer piso, frontal al balcón.

LO QUE CUENTA LA HISTORIA: un BALCÓN de una fachada de pueblo de dos plantas, de revoco ocre claro, con una BARANDILLA nueva de CUADRADILLO de hierro pintada de negro: barrotes verticales sencillos con un pasamanos de pletina, sobre una losa de balcón vieja con el canto de piedra. Detrás, una puerta balconera de madera abierta con una cortina clara. En la barandilla, una maceta colgada con gitanillas. Abajo se intuye la puerta de la planta baja.

LUZ: sol bajo y duro desde la izquierda: los barrotes proyectan su sombra sobre la fachada.

COMPOSICIÓN: el balcón en el centro. La esquina superior izquierda, fachada en sombra lisa. La esquina superior derecha, sin nada importante. Sin números de casa, sin rótulos.
```

---

### Ficha 7.5 · `obra-04-porton-silla.jpg`

**Dónde sale:** obra «Portón corredero de patio»: cuadrada en la galería y a 4:3 en su página. Lo importante, entre el 15 y el 85 % del ancho.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el de montaje con su iPhone desde la calle, a última hora de la tarde, al terminar de montar un portón en una casa de Silla (Valencia).

PLANO: frontal al portón, a la altura de los ojos, desde unos cinco metros, con la acera y un poco de calle delante.

LO QUE CUENTA LA HISTORIA: un PORTÓN CORREDERO de patio, de unos cuatro metros, de hierro pintado de negro mate: CHAPA lisa en la mitad de ABAJO y BARROTES verticales con puntas de lanza en la mitad de ARRIBA. Se ve su GUÍA de hierro empotrada en el suelo y una rueda en el carril. Por los barrotes se intuye un patio con una higuera y el suelo de hormigón. A los lados, los muros de bloque enlucidos y encalados de la valla.

LUZ: sol bajo y duro desde la derecha: los barrotes dejan sombras largas en el suelo del patio y en la chapa.

COMPOSICIÓN: el portón en el centro, entre el 15 y el 85 % del ancho. La esquina superior izquierda, cielo o muro lisos. Sin números, sin rótulos, sin buzones con nombres, sin coches.
```

---

### Ficha 7.6 · `obra-05-escalera-russafa.jpg`

**Dónde sale:** obra «Escalera de caracol en Russafa»: cuadrada en la galería y a 4:3 en su página. Se pide **vertical 4:5**: la web la recorta a cuadrada y a 4:3, así que la escalera va **en el centro** (entre el 20 y el 80 % del alto).

```
Fotografía vertical 4:5, una única imagen.

QUIÉN Y POR QUÉ: la hace el de montaje con su iPhone desde el suelo del patio, a última hora de la tarde, al dejar montada una escalera de caracol en el patio interior de una finca antigua del barrio de Russafa (Valencia).

PLANO: frontal, a la altura de los ojos, desde unos cuatro metros, con algo de patio alrededor.

LO QUE CUENTA LA HISTORIA: una ESCALERA DE CARACOL de HIERRO NEGRO con peldaños de chapa lagrimada y una barandilla de barrotes finos, que sube girando hasta una galería del primer piso. Alrededor, el PATIO de luces de una finca antigua: paredes de revoco desconchado en tonos ocre y gris, ventanas con persianas de librillo, una bajante, unas macetas en el suelo de baldosa hidráulica gastada y una bicicleta apoyada al fondo, en sombra.

LUZ: un rayo de sol bajo y duro entra de lado por arriba del patio y raya la escalera; el fondo del patio queda en sombra profunda.

COMPOSICIÓN: la escalera en el centro, entre el 20 y el 80 % del alto. La esquina superior izquierda, pared en sombra lisa. Sin números, sin rótulos, sin personas.
```

---

### Ficha 7.7 · `obra-06-reparacion-benetusser.jpg` (el «después»)

**Dónde sale:** obra «Barandilla reparada en Benetússer» (Después): cuadrada en la galería, a 4:3 en su página y en el deslizador antes/después, cuadrado. En el deslizador, la etiqueta va **abajo a la derecha**. **Va en la misma conversación que la ficha 7.8.** Genera esta primera y NO cambies de conversación.

```
Fotografía cuadrada 1:1, una única imagen. Es el "DESPUÉS" de la reparación de una barandilla de escalera en una finca de pisos de Benetússer (Valencia).

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone en la escalera de la comunidad, al terminar de soldar y pintar.

ENCUADRE FIJO (lo repetiré en la versión "antes"): desde el rellano, mirando el arranque de un tramo de escalera que sube hacia la derecha, a la altura de la cadera. Cuatro anclajes que no se moverán:
1. Los PELDAÑOS de TERRAZO gris con chinas blancas, en diagonal de abajo a la izquierda hacia arriba a la derecha.
2. La BARANDILLA de hierro de barrotes verticales sencillos con pasamanos de madera barnizada, que sube con los peldaños.
3. A la izquierda, la pared de la escalera con un zócalo de azulejo liso de color crema.
4. Al fondo, arriba a la derecha, una ventana de la escalera que deja entrar la luz.

LUZ FIJA: la luz dura de la tarde entra de lado por la ventana de la escalera y raya los barrotes y los peldaños; el rellano queda en penumbra.

DESPUÉS: la barandilla está ARREGLADA: los barrotes de la base, nuevos y SOLDADOS al zanco, con el cordón de soldadura limpio y amolado. Toda la barandilla PINTADA de NEGRO de forja satinado, uniforme. Los barrotes rectos y firmes. El terrazo limpio.

COMPOSICIÓN: la base de la barandilla (lo que se arregló), en el centro. Las dos ESQUINAS DE ABAJO, terrazo o pared lisos (ahí van etiquetas). Sin texto, sin buzones ni nombres, sin personas.
```

---

### Ficha 7.8 · `obra-06-antes.jpg` (el «antes»)

**Dónde sale:** el «Antes» de la obra de Benetússer, en el deslizador cuadrado. La etiqueta va **abajo a la izquierda**. **Misma conversación que la 7.7.** El desgaste tiene que verse **mucho**.

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo herrero con su iPhone el día que fue a ver la avería, desde el mismo sitio y a la misma altura.

MISMO ENCUADRE y mismos cuatro anclajes: los peldaños de terrazo gris con chinas blancas en diagonal hacia arriba a la derecha; la barandilla de barrotes verticales con el pasamanos de madera barnizada; la pared de la izquierda con el zócalo de azulejo crema; la ventana de la escalera arriba a la derecha. MISMA LUZ: la luz dura de la tarde entrando de lado por la ventana.

Solo cambia el estado de la barandilla, con el desgaste MUY visible:
- La BASE de los barrotes COMIDA por el ÓXIDO: el hierro hinchado, en escamas naranjas y marrones, con el terrazo de debajo manchado de óxido.
- Dos o tres BARROTES SUELTOS: uno doblado hacia fuera y otro que ya no toca el peldaño.
- La pintura negra vieja, levantada y descascarillada.
- Un trozo de alambre atado a un barrote como apaño.
El pasamanos de madera, la pared, el terrazo y la ventana, igual que antes.

Sin texto, sin logos.
```

---

### Ficha 7.9 · `pieza-rejas.jpg`

**Dónde sale:** tarjeta y página del servicio «Rejas de ventana», a 4:3, y en pequeño, cuadrada, en la lista de piezas. El detalle, en el centro.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone en el banco del taller, en modo macro, para enseñar en la web cómo se hace una voluta a mano.

PLANO: muy de cerca, ligeramente desde arriba, sobre el banco.

LO QUE CUENTA LA HISTORIA: una VOLUTA de FORJA (una espiral de pletina doblada a mano), sin pintar, con la CALAMINA gris azulada y algún punto de óxido. Donde se une a un barrote, un REMACHE de cabeza redonda. Se ven las marcas del martillo en el hierro. Debajo, el banco de hierro con cascarilla y un poco de polvo de hierro.

LUZ: el sol entra duro y lateral por el portón, desde la izquierda, rasante: marca el relieve de la espiral y deja el fondo en sombra.

COMPOSICIÓN: la voluta en el centro, con margen alrededor. La esquina superior izquierda, sombra lisa. Sin texto, sin marcas.
```

---

### Ficha 7.10 · `pieza-barandillas.jpg`

**Dónde sale:** tarjeta y página del servicio «Barandillas de balcón y escalera», a 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone en el taller, con un tramo de barandilla recién pintada apoyado en el caballete.

PLANO: de cerca, a la altura de la cadera, con el PASAMANOS cruzando la imagen a 45 grados, de abajo a la izquierda hacia arriba a la derecha.

LO QUE CUENTA LA HISTORIA: el PASAMANOS de FORJA de una barandilla, de pletina redondeada, pintado de NEGRO de forja satinado, con el arranque de dos barrotes cuadrados que bajan desde él, cada uno con un pequeño anillo forjado. El resto de la barandilla se pierde desenfocado. Detrás, el taller en sombra.

LUZ: sol duro y lateral del portón, desde la derecha: deja un brillo largo y fino a lo largo del pasamanos.

COMPOSICIÓN: el tramo central del pasamanos en el centro de la imagen. La esquina superior izquierda, sombra lisa. La esquina superior derecha, sin nada importante (el pasamanos sale de la foto antes de llegar a ella). Sin texto.
```

---

### Ficha 7.11 · `pieza-portones.jpg`

**Dónde sale:** tarjeta y página del servicio «Portones y puertas de patio», a 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone en el taller, con la hoja de un portón tumbada en los caballetes, recién imprimada y antes de pintar.

PLANO: de cerca, ligeramente desde arriba.

LO QUE CUENTA LA HISTORIA: en la esquina de una hoja de portón de chapa y tubo, una BISAGRA de pernio gruesa soldada y un CERROJO de pasador de hierro. Todo con IMPRIMACIÓN de MINIO, de un rojo anaranjado MATE y polvoriento, con algún goterón y la marca de la brocha. Junto al cerrojo, el hierro sin imprimar asoma gris en un borde. Debajo, la madera de un caballete y polvo de taller.

LUZ: sol duro y lateral del portón, desde la izquierda: el pasador del cerrojo deja una sombra marcada sobre la chapa.

COMPOSICIÓN: la bisagra y el cerrojo en el centro. La esquina superior izquierda, sombra lisa. Sin texto, sin marcas.
```

---

### Ficha 7.12 · `pieza-escaleras.jpg`

**Dónde sale:** tarjeta y página del servicio «Escaleras metálicas», a 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone en el taller, con un peldaño de escalera recién cortado sobre el banco.

PLANO: de cerca y muy bajo, casi rasante a la superficie del peldaño, a la altura de la cadera.

LO QUE CUENTA LA HISTORIA: un PELDAÑO de CHAPA LAGRIMADA (chapa con el relieve de lágrimas en diagonal), de hierro sin pintar con algo de calamina, con su canto doblado y dos pletinas soldadas por debajo para fijarlo al zanco. El relieve de las lágrimas se va perdiendo hacia el fondo.

LUZ: el sol duro del portón entra RASANTE desde la derecha: cada lágrima tiene su brillo y su sombra. El fondo, en sombra.

COMPOSICIÓN: el peldaño en el centro, con el relieve más marcado en el centro de la imagen. La esquina superior izquierda, sombra lisa. Sin texto.
```

---

### Ficha 7.13 · `pieza-soldadura.jpg`

**Dónde sale:** tarjeta y página del servicio «Reparación y soldadura a domicilio», a 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone en modo macro, justo después de soldar, antes de cepillar la escoria.

PLANO: muy de cerca, ligeramente desde arriba.

LO QUE CUENTA LA HISTORIA: un CORDÓN de SOLDADURA reciente, en línea recta y bien hecho, que une dos PLETINAS de hierro en ángulo. El cordón aún tiene los tonos IRISADOS del calor (azulados, pajizos y violáceos) en el hierro de alrededor. Junto a él, un poco de escoria gris y un electrodo gastado sobre el banco. Sin llamas, sin chispas, sin humo.

LUZ: sol duro y lateral del portón, desde la izquierda, que marca las ondas del cordón.

COMPOSICIÓN: el cordón cruza el centro de la imagen en horizontal. La esquina superior izquierda, sombra lisa. Sin texto.
```

---

### Ficha 7.14 · `taller-yunque.jpg`

**Dónde sale:** `/empresa`, a 3:2, con la esquina superior derecha cortada. Se pide en 4:3 y Claude la recorta por arriba y por abajo: lo importante, entre el 15 y el 85 % del alto.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone en su taller de Massanassa, a primera hora, antes de empezar, para la página "Quiénes somos" de la web.

PLANO: a la altura de la cadera, a unos dos metros del yunque, algo de lado.

LO QUE CUENTA LA HISTORIA: un YUNQUE de hierro viejo, gastado y brillante en la cara de trabajo, sobre un TOCÓN de madera grueso y agrietado. Sobre el yunque, dos MARTILLOS de forja con el mango de madera oscurecido por el uso, y unas tenazas apoyadas en el tocón. En el suelo de cemento, CASCARILLA y restos negros de chispas. Al fondo, la pared del taller en sombra con herramientas colgadas sin detalle.

LUZ: el sol entra duro y lateral por el portón, desde la derecha, y saca brillo a la cara del yunque; el fondo cae a sombra profunda.

COMPOSICIÓN: el yunque en el centro. La esquina superior izquierda, sombra lisa. La esquina superior derecha, sin nada importante. Sin logos ni texto, sin personas.
```

---

### Ficha 7.15 · `taller-hierro.jpg`

**Dónde sale:** `/empresa`, a 3:2, con la esquina superior derecha cortada. Se pide en 4:3 y Claude la recorta por arriba y por abajo: lo importante, entre el 15 y el 85 % del alto.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el herrero con su iPhone en el fondo del taller, donde guarda el material.

PLANO: a la altura de la cadera, en diagonal a lo largo del estante, con las barras fugando hacia el fondo.

LO QUE CUENTA LA HISTORIA: un ESTANTE de hierro con BARRAS de HIERRO en bruto apiladas en horizontal: redondos, cuadradillos y pletinas de distintos gruesos, con la calamina gris azulada y puntos de óxido. Los cantos cortados de las barras, a la vista en primer término, unos más brillantes que otros. Alguna barra con una marca de tiza blanca sin letras ni números.

LUZ: un rayo de sol duro entra de lado por el portón, desde la izquierda, y cruza las barras en diagonal: unas se iluminan y las de atrás caen a sombra.

COMPOSICIÓN: los cantos iluminados en el centro. La esquina superior izquierda, sombra lisa. Sin texto, sin etiquetas ni marcas.
```

---

## 4. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1448×1086 (4:3)**, **de 1254×1254 (1:1)** o **de 1122×1402 (4:5)**.
- **Hero (7.1):** Claude lo recorta a **16:9** (1448×815) por arriba y por abajo, conservando la zona segura. No se amplía a 1920 px: la regla es no ampliar.
- **Obras:** se quedan como se piden. La 7.2 y la 7.5 en 4:3, la 7.3, la 7.4 y la pareja 7.7/7.8 en 1:1, y la 7.6 en 4:5. Si la pareja llega con un píxel de diferencia, Claude la iguala.
- **Piezas (7.9–7.13):** se quedan en 4:3.
- **Taller (7.14 y 7.15):** Claude las recorta a **3:2** (1448×965).
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**, sin metadatos) con el **nombre exacto** de la tabla de §1, en `templates/carpinteria-metalica/carpinteria-metalica-7/public/ejemplo/`.
- Después actualiza `public/ejemplo/CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)»), comprueba que cada `alt` de `site.config.ts` describe lo que se ve (con tu OK si hay que cambiarlo) y que todas siguen con `origen: "ia"`.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente real: en la web de un cliente, `/trabajos` lleva sus fotos.
