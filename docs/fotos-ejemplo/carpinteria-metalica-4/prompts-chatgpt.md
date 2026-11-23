# Prompts de ChatGPT · fotos de ejemplo de `carpinteria-metalica-4` «Plano»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto. La única excepción es la pareja antes/después (fichas 4.2 y 4.3), que va en la misma conversación. En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Empieza por la ficha 4.1, que es la **foto ancla**: si quieres, súbela después como referencia en las conversaciones de las fichas de obra («que se parezca a esta en luz y encuadre»). Guarda cada resultado como `4.<m>.png` (por ejemplo `4.1.png`) en `andrei-leads-tech/material/fotos-ejemplo/carpinteria-metalica-4/`. Después pásaselas a Claude, que las convierte (ver §4).

**Concepto del template:** «Plano» es la web de un taller de aluminio y PVC de tipo proyecto dibujada como un **plano técnico**: fondo papel azulado (`#f4f6f9`), texto azul tinta (`#0f1f33`), primario azul (`#1f5fa8`), retícula, cotas y esquinas rectas. Cada foto va dentro de un marco de 1 px con cotas por fuera, como una lámina. Su ficha de estilo pide **alzados**: el hueco de la ventana visto de frente, centrado y recto, con la cámara perpendicular a la fachada, al **sol duro de mediodía** (la sombra del marco dibuja una línea nítida dentro de la mocheta), **sin cielo**, con blancos neutros, sombras algo azuladas y colores un poco apagados. Nada de personas en las obras; en el taller, como mucho manos con guantes, desenfocadas.

**Registro:** todas son **fotos de móvil**, no de fotógrafo. Las de obra las hace el carpintero con su iPhone al terminar cada instalación, plantado delante del hueco, recto y con la rejilla de la cámara activada, para su web de «trabajos hechos»: por eso parecen alzados. Las de taller y servicios las hace el dueño en la nave, también con su iPhone. El aspecto ordenado sale de cómo las hace (de frente, centradas, con las verticales rectas), no de un equipo profesional.

**El azul del primario no se pone en las fotos:** el cliente puede cambiarlo. Los perfiles son blancos, antracita o imitación madera.

Cosas propias de este template:

- **Etiqueta «Imagen generada con IA»:** va en el **pie de figura, fuera de la foto** («FIG. 01 · Imagen generada con IA»). No hace falta reservar ninguna esquina.
- **Recortes:** las fotos de obra se pintan a 4:3 en las fichas de obra y a **3:2** en la página de cada trabajo: el motivo va en la franja central del alto (entre el 8 y el 92 %). `obra-03-cerramiento-tavernes.jpg` también es la foto del servicio «Cerramientos de terraza», que se pinta **cuadrada**: su motivo va además en el cuadrado central. Las de `/empresa` se pintan a 3:2 y se piden a 4:3 (Claude las recorta por arriba y por abajo).
- **Antes/después** (trabajo de Meliana): se pinta a 3:2 con un deslizador y los rótulos «ANTES» arriba a la izquierda y «DESPUÉS» arriba a la derecha: las dos esquinas superiores quedan tranquilas (muro liso).
- **Sin hero con foto:** el hero es tipográfico. La imagen de Open Graph (la vista previa al compartir el enlace) es `servicio-rpt-detalle.jpg`.

Ubicación de los datos de ejemplo: Alboraya y l'Horta Nord (Meliana, Tavernes Blanques, Benimaclet, Massamagrell). Sin rótulos, matrículas ni nada que identifique una calle concreta.

Cada ficha cambia a propósito de fachada, altura, tipo de hueco, lado de la sombra y material, para que la serie no parezca catorce veces la misma ventana.

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Proporción | Registro |
|---|---|---|---|---|
| 4.1 | `obra-01-corredera-alboraya.jpg` | **Foto ancla.** Alzado de una corredera blanca de dos hojas en el hueco de un salón de planta baja, revoco blanco, alféizar de mármol crema, sombra del marco en la mocheta | 4:3 (y 3:2) | Móvil (carpintero) |
| 4.2 | `obra-02-oscilobatiente-meliana.jpg` | **Después:** oscilobatiente antracita en ladrillo caravista, persiana nueva subida | 4:3 (se ve 3:2) | Móvil (carpintero) |
| 4.3 | `obra-02-antes.jpg` | **Antes:** el mismo hueco con una corredera vieja de aluminio anodizado y la persiana rota y torcida | 4:3 (se ve 3:2) | Móvil (carpintero) |
| 4.4 | `obra-03-cerramiento-tavernes.jpg` | Cerramiento de una terraza de tercer piso con correderas de tres hojas, desde la terraza de enfrente | 4:3 (se ve 3:2 y 1:1) | Móvil (carpintero) |
| 4.5 | `obra-04-persiana-benimaclet.jpg` | Ventana de un piso con el cajón de persiana nuevo y las lamas de PVC blanco medio bajadas | 4:3 (y 3:2) | Móvil (carpintero) |
| 4.6 | `obra-05-balconera-massamagrell.jpg` | Balconera de PVC imitación madera en una casa de pueblo encalada, con su rejilla de forja | 4:3 (y 3:2) | Móvil (carpintero) |
| 4.7 | `servicio-rpt-detalle.jpg` | Cenital del canto de un perfil de aluminio con rotura de puente térmico, recién cortado, sobre el banco | 1:1 | Móvil (dueño, taller) |
| 4.8 | `servicio-pvc.jpg` | Alzado de una oscilobatiente de PVC blanco en una fachada de monocapa | 1:1 | Móvil (carpintero) |
| 4.9 | `servicio-elevable.jpg` | Alzado de una corredera elevable antracita abierta a media hoja, en un ático | 1:1 | Móvil (carpintero) |
| 4.10 | `servicio-ruido.jpg` | Canto de un doble acristalamiento laminado con su cámara, apoyado en el banco | 1:1 | Móvil (dueño, taller) |
| 4.11 | `servicio-sin-obra.jpg` | Marco nuevo de aluminio sobre el premarco viejo, con cinta de carrocero y tornillos a la vista | 1:1 | Móvil (carpintero) |
| 4.12 | `proceso-medicion.jpg` | Flexómetro extendido de lado a lado de un hueco sin ventana; manos con guantes desenfocadas | 4:3 (se ve 3:2) | Móvil (dueño) |
| 4.13 | `taller-mesa-corte.jpg` | Tronzadora de la nave con perfiles cortados y virutas de aluminio | 4:3 (se ve 3:2) | Móvil (dueño, taller) |
| 4.14 | `taller-perfiles.jpg` | Estante de perfiles blancos, antracita e imitación madera, frontal | 4:3 (se ve 3:2) | Móvil (dueño, taller) |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque).

```
Voy a pedirte una fotografía para la web de ejemplo de un taller de ventanas de aluminio y PVC de Alboraya (Valencia, España). Estas reglas valen para toda la serie. La escena concreta (quién hace la foto, hueco, fachada, luz y composición) te la doy en el siguiente mensaje y manda sobre cualquier costumbre: síguela al pie de la letra.

QUÉ TIPO DE FOTO ES
- Foto de MÓVIL hecha con un iPhone (16, 17 o 18) por el propio carpintero al terminar una instalación, o por el dueño en su taller, para enseñarla en la web de «trabajos hechos» del taller. No es de un fotógrafo profesional ni de un banco de imágenes.
- Modo foto estándar del iPhone, sin modos creativos ni modo retrato. Procesado típico de móvil, exposición automática, gran profundidad de campo: todo enfocado.
- Hecha con cuidado, como quien enseña su trabajo: de pie justo DELANTE del hueco, el móvil a la altura del centro de la ventana y PERPENDICULAR a la fachada, con la rejilla de la cámara activada. Las líneas verticales y horizontales salen RECTAS, como en un alzado de arquitecto. Nada de perspectivas en ángulo, ni contrapicados ni picados (salvo que la escena diga otra cosa).

LUZ Y COLOR
- En las fotos de fachada: SOL DURO DE MEDIODÍA, alto y un poco lateral. La sombra del marco y del alféizar dibuja una línea nítida y oscura dentro de la mocheta (el grosor del muro alrededor de la ventana). Sin contraluces, sin luz de atardecer.
- Colores neutros y un poco apagados, como un móvil a pleno sol: blancos limpios y neutros, sombras ligeramente azuladas, nada saturado. Sin filtros.
- SIN CIELO: el encuadre se ajusta al hueco con un 20-30 % de muro alrededor. Nunca la fachada entera.

ESPAÑA CORRIENTE
- Fachadas de pueblos y barrios de l'Horta de Valencia: revoco blanco, monocapa, ladrillo caravista o casas de pueblo encaladas. Alféizares de mármol crema, cajones de persiana, persianas de lamas de PVC, rejas sencillas.
- Ventanas y persianas españolas: correderas, oscilobatientes, balconeras. Nada de ventanas de guillotina americanas ni contraventanas de madera.
- Solo está nuevo lo que acaba de instalar el taller; el resto con su uso real.

NADA DE ASPECTO DE CINE NI DE CATÁLOGO
- Prohibido: aspecto cinematográfico, gradación de color verdeazulada y naranja, luz dramática, viñeteado, niebla o polvo en haces de luz, hora azul, velas, bokeh exagerado, filtros, render 3D, foto de catálogo de fabricante.

SIEMPRE
- Sin personas en las fotos de fachada. Sin caras nunca. Sin reflejos de personas ni del móvil en los cristales: los cristales reflejan, como mucho, el muro de enfrente desenfocado o un interior en penumbra.
- Sin logos, marcas, rótulos, matrículas, pegatinas de fabricante ni texto legible en perfiles, vidrios, cajas o herramientas.
- Sin fuego, chispas ni humo.
- Una única fotografía, no un collage ni varios paneles.
- Sin ningún elemento azul llamativo.
- La proporción la indica cada escena (4:3 o 1:1).

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 4.1 · `obra-01-corredera-alboraya.jpg`

**Dónde sale:** trabajo «Corredera de salón en Alboraya»: ficha de obra a 4:3 en la home y en `/trabajos`, y lámina a 3:2 en su página. Es la **foto ancla**: las demás fotos de fachada tienen que parecer de la misma serie (misma luz, mismo encuadre frontal).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el carpintero con su iPhone a mediodía, nada más terminar de montar la corredera en una casa de planta baja de Alboraya, de pie en la acera de enfrente del hueco, para su web: «así ha quedado».

PLANO: alzado frontal. El móvil a la altura del centro de la ventana, perpendicular a la fachada, a unos tres metros. Verticales y horizontales rectas.

LO QUE CUENTA LA HISTORIA: una ventana corredera NUEVA de aluminio blanco, de dos hojas, en el hueco de un salón. Perfiles limpios, un cordón de silicona blanca fresca en el contorno del marco. Encima, el cajón de persiana con las lamas recogidas, blancas. Debajo, un alféizar de mármol crema con el canto algo gastado. La fachada, de revoco blanco con algún desconchón pequeño y una mancha de humedad antigua cerca del suelo. Por el cristal se intuyen unas cortinas claras y el salón en penumbra.

LUZ: sol duro de mediodía, alto y desde la izquierda: la sombra del marco cae dentro de la mocheta como una línea oscura y nítida en el lado derecho y bajo el alféizar. Blancos neutros, sombras ligeramente azuladas.

COMPOSICIÓN: la ventana en el centro, ocupando más o menos la mitad del ancho, con un 20-30 % de revoco alrededor. Sin cielo, sin suelo de la calle. Todo lo importante entre el 10 y el 90 % del alto.
```

---

### Ficha 4.2 · `obra-02-oscilobatiente-meliana.jpg` (el «después»)

**Dónde sale:** trabajo «Cuatro oscilobatientes en Meliana» (Después): ficha de obra a 4:3 y, en su página, deslizador antes/después a 3:2 con el rótulo «DESPUÉS» arriba a la derecha. **Va en la misma conversación que la ficha 4.3.** Genera esta primera y NO cambies de conversación: la 4.3 tiene que heredar su encuadre.

```
Fotografía horizontal 4:3, una única imagen. Es el "DESPUÉS" del cambio de una ventana en un piso de Meliana.

QUIÉN Y POR QUÉ: la hace el carpintero con su iPhone desde la terraza del piso de enfrente, a mediodía, para ponerla junto a la del "antes" en su web.

ENCUADRE FIJO (lo repetiré en la versión "antes"): alzado frontal, el móvil a la altura del centro de la ventana y perpendicular a la fachada, a unos cuatro metros. Cuatro anclajes que no se moverán:
1. Fachada de LADRILLO CARAVISTA rojizo, con juntas claras, ocupando toda la imagen alrededor del hueco.
2. El hueco de la ventana en el centro, con un dintel de ladrillo a sardinel encima.
3. Debajo, un alféizar de piedra artificial gris claro que sobresale un poco.
4. A la izquierda del hueco, un tubo de bajante gris pegado a la fachada, vertical.

LUZ FIJA: sol duro de mediodía desde la DERECHA y alto: la sombra del marco cae dentro de la mocheta como una línea nítida en el lado izquierdo y bajo el dintel, y el alféizar proyecta una sombra corta sobre el ladrillo de debajo.

DESPUÉS: una ventana OSCILOBATIENTE NUEVA de una hoja, de aluminio ANTRACITA mate, con la manilla a la derecha y un cordón de silicona gris oscuro en el contorno. Encima, un cajón de persiana nuevo antracita, con la persiana de lamas antracita subida del todo. El cristal limpio refleja, desenfocado, el ladrillo de enfrente.

COMPOSICIÓN: la ventana en el centro, con un 25 % de ladrillo alrededor. Sin cielo. Las dos esquinas de arriba son ladrillo liso, sin nada.
```

---

### Ficha 4.3 · `obra-02-antes.jpg` (el «antes»)

**Dónde sale:** trabajo «Cuatro oscilobatientes en Meliana» (Antes), en el deslizador a 3:2 con el rótulo «ANTES» arriba a la izquierda. **Misma conversación que la 4.2.** El desgaste tiene que verse **mucho**.

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo carpintero con su iPhone el día que fue a medir, desde el mismo sitio.

MISMO ENCUADRE y mismos cuatro anclajes: la fachada de ladrillo caravista rojizo alrededor del hueco, el hueco en el centro con el dintel de ladrillo a sardinel, el alféizar de piedra artificial gris claro debajo y el tubo de bajante gris vertical a la izquierda. MISMA LUZ: sol duro de mediodía desde la DERECHA y alto, con la sombra del marco como una línea nítida en el lado izquierdo de la mocheta y bajo el dintel, y la sombra corta del alféizar sobre el ladrillo.

Solo cambia la ventana y la persiana, con el desgaste MUY visible:
- En lugar de la oscilobatiente, una CORREDERA VIEJA de dos hojas de aluminio ANODIZADO plateado, sin rotura de puente térmico, con el anodizado opaco, manchado y picado.
- Las gomas del cristal ennegrecidas y salidas de su sitio en una esquina; la silicona del contorno amarillenta y agrietada.
- El cajón de persiana viejo, de chapa beige descolorida, y la PERSIANA de lamas de plástico beige ROTA: bajada hasta la mitad y TORCIDA en diagonal, con dos lamas partidas colgando.
- En el ladrillo bajo el alféizar, un chorreón oscuro de agua de años.

Sin texto, sin logos. Las dos esquinas de arriba, ladrillo liso.
```

---

### Ficha 4.4 · `obra-03-cerramiento-tavernes.jpg`

**Dónde sale:** trabajo «Cerramiento de terraza en Tavernes Blanques» (4:3 en la ficha de obra, 3:2 en su página) **y** foto del servicio «Cerramientos de terraza», que se pinta **cuadrada**. El motivo tiene que caber en el cuadrado central.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el carpintero con su iPhone desde la terraza del bloque de enfrente, al mismo nivel (un tercer piso de Tavernes Blanques), a la una del mediodía, cuando ya está montado el cerramiento: es la foto que enseña cómo queda desde fuera.

PLANO: alzado frontal, el móvil a la altura del centro del cerramiento, perpendicular a la fachada, a unos ocho metros (la anchura de la calle).

LO QUE CUENTA LA HISTORIA: una terraza de un tercer piso cerrada con un CERRAMIENTO NUEVO de aluminio blanco: correderas de TRES hojas sobre el antepecho de obra de la terraza, de lado a lado, con perfiles finos y cristal transparente. Detrás del cristal se intuyen unas plantas en macetas y un tendedero plegado, en penumbra. La fachada del bloque, de monocapa color arena con las juntas de forjado marcadas. Por encima y por debajo, el canto de los forjados de las terrazas vecinas, sin cerrar, con sus barandillas de obra.

LUZ: sol duro de mediodía desde arriba y a la izquierda: el forjado de arriba proyecta una franja de sombra nítida sobre la parte alta del cerramiento. Blancos neutros, sombras ligeramente azuladas.

COMPOSICIÓN: el cerramiento en el centro, todo él dentro del cuadrado central de la imagen (entre el 12 y el 88 % del ancho), con fachada alrededor. Sin cielo. Ninguna persona en las terrazas.
```

---

### Ficha 4.5 · `obra-04-persiana-benimaclet.jpg`

**Dónde sale:** trabajo «Persianas de un piso en Benimaclet»: ficha de obra a 4:3 y lámina a 3:2 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el carpintero con su iPhone desde el balcón de enfrente, en un patio de manzana de Benimaclet, a mediodía, al terminar de cambiar los cajones y las lamas de todas las persianas del piso.

PLANO: alzado frontal de una sola ventana de dormitorio, a la altura del cajón de persiana, perpendicular a la fachada.

LO QUE CUENTA LA HISTORIA: una ventana corredera de aluminio blanco antigua pero cuidada (no es lo nuevo). Lo NUEVO es el CAJÓN DE PERSIANA de PVC blanco, recto y limpio, con su tapa de registro, y la PERSIANA de lamas de PVC BLANCO, bajada hasta la mitad de la ventana, con las lamas rectas y alineadas y las guías laterales nuevas. La fachada, de revoco blanco algo envejecido, con un tendedero metálico de pared, vacío, a un lado de la ventana.

LUZ: sol duro de mediodía desde la DERECHA: las lamas proyectan una sombra a rayas finas sobre la parte baja del cristal y la guía derecha deja una línea de sombra nítida en la mocheta.

COMPOSICIÓN: ventana y persiana en el centro, con un 25 % de muro alrededor. Sin cielo. Todo lo importante entre el 10 y el 90 % del alto.
```

---

### Ficha 4.6 · `obra-05-balconera-massamagrell.jpg`

**Dónde sale:** trabajo «Balconera de PVC en Massamagrell»: ficha de obra a 4:3 y lámina a 3:2 en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el carpintero con su iPhone desde la calle estrecha de enfrente, en el casco antiguo de Massamagrell, a mediodía, al terminar de montar la balconera de una casa de pueblo.

PLANO: alzado frontal del balcón del primer piso, desde la calle, con el móvil levantado a la altura del pecho y ligeramente hacia arriba, pero con las verticales corregidas y rectas.

LO QUE CUENTA LA HISTORIA: una BALCONERA NUEVA de PVC en IMITACIÓN MADERA (tono nogal medio, con la veta impresa sutil), de dos hojas abatibles con cristal, en un hueco alto y estrecho de casa de pueblo. Delante, un balcón pequeño con una barandilla de forja negra antigua, sencilla, y una maceta de geranios. La fachada, ENCALADA en blanco, gruesa y algo irregular, con un zócalo de color gris en la parte baja que apenas entra por abajo. Encima del hueco, un tejadillo pequeño de teja árabe que apenas se ve.

LUZ: sol duro de mediodía desde la IZQUIERDA y alto: la barandilla proyecta su sombra de barrotes sobre la parte baja de la balconera, y la mocheta, muy profunda, tiene una franja de sombra nítida a la derecha.

COMPOSICIÓN: la balconera y el balcón en el centro, con cal blanca alrededor. Sin cielo. Todo lo importante entre el 10 y el 90 % del alto.
```

---

### Ficha 4.7 · `servicio-rpt-detalle.jpg`

**Dónde sale:** servicio «Ventanas de aluminio con rotura de puente térmico»: miniatura cuadrada de 88 px y lámina cuadrada de 300 px. Es también la **imagen de Open Graph** (la vista previa al compartir la web por WhatsApp).

```
Fotografía CUADRADA 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone en la nave, sobre el banco de trabajo, para explicar en la web qué es la rotura de puente térmico: el plástico que separa el aluminio de dentro del de fuera.

PLANO: CENITAL, el móvil justo encima y paralelo al banco, mirando hacia abajo.

LO QUE CUENTA LA HISTORIA: el CANTO de un perfil de ventana de aluminio blanco recién cortado, apoyado de pie sobre el banco, visto desde arriba: se ve su sección, con las cámaras huecas del aluminio y, en medio, las dos pletinas de POLIAMIDA negra (la rotura de puente térmico) que separan la parte interior de la exterior. El corte, limpio y brillante. Alrededor, sobre el banco de madera contrachapada gastada, unas virutas finas de aluminio y un trozo de cinta de carrocero.

LUZ: la luz del portón abierto de la nave, lateral desde la IZQUIERDA y dura, que saca el brillo del corte y una sombra nítida del perfil hacia la derecha.

COMPOSICIÓN: el canto del perfil en el centro exacto, ocupando un tercio de la imagen, con banco alrededor.
```

---

### Ficha 4.8 · `servicio-pvc.jpg`

**Dónde sale:** servicio «Ventanas de PVC»: miniatura cuadrada de 88 px y lámina cuadrada de 300 px.

```
Fotografía CUADRADA 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace el carpintero con su iPhone desde el patio de una casa adosada, a mediodía, nada más montar la ventana de la cocina.

PLANO: alzado frontal, a la altura del centro de la ventana, perpendicular a la fachada, a dos metros.

LO QUE CUENTA LA HISTORIA: una ventana OSCILOBATIENTE de PVC BLANCO, de una hoja, con los perfiles de PVC de cantos algo redondeados (distintos del aluminio) y la manilla blanca. Abierta en posición de abatible (inclinada hacia dentro por arriba), que se nota por la rendija en la parte alta. Fachada de MONOCAPA color hueso rugoso, alféizar de mármol crema y, a un lado, una rejilla de ventilación pequeña en la pared.

LUZ: sol duro de mediodía desde arriba y desde la DERECHA: la sombra del alféizar cae nítida sobre el monocapa y la mocheta izquierda queda con una línea de sombra.

COMPOSICIÓN: la ventana en el centro, con un 25 % de muro alrededor. Sin cielo.
```

---

### Ficha 4.9 · `servicio-elevable.jpg`

**Dónde sale:** servicio «Correderas elevables»: miniatura cuadrada de 88 px y lámina cuadrada de 300 px.

```
Fotografía CUADRADA 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace el carpintero con su iPhone desde la terraza de un ático, a mediodía, para enseñar lo grande que es la hoja de una elevable.

PLANO: alzado frontal desde la terraza, a la altura del pecho, perpendicular a la fachada, a cuatro metros.

LO QUE CUENTA LA HISTORIA: una CORREDERA ELEVABLE de aluminio ANTRACITA, de dos hojas grandes del suelo al techo, con una hoja ABIERTA hasta la mitad, corrida detrás de la otra. Perfiles finos, un tirador vertical largo antracita, el carril a ras del suelo de la terraza. Por el hueco abierto se ve el interior del salón en penumbra, con el borde de un sofá gris. El suelo de la terraza, de baldosa de gres gris; la fachada, de revoco blanco.

LUZ: sol duro de mediodía desde arriba y desde la IZQUIERDA: el voladizo del techo de la terraza deja una franja de sombra nítida en la parte alta de la corredera; el resto, a pleno sol.

COMPOSICIÓN: la corredera en el centro, ocupando casi todo el alto, con fachada a los lados. Sin cielo.
```

---

### Ficha 4.10 · `servicio-ruido.jpg`

**Dónde sale:** servicio «Ventanas contra el ruido de la calle»: miniatura cuadrada de 88 px y lámina cuadrada de 300 px.

```
Fotografía CUADRADA 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone en la nave, para enseñar en la web cómo es por dentro un vidrio contra el ruido.

PLANO: muy de cerca, frontal al CANTO del vidrio, a la altura del banco.

LO QUE CUENTA LA HISTORIA: un DOBLE ACRISTALAMIENTO apoyado de pie sobre el banco de trabajo, visto por su canto: dos vidrios, uno de ellos LAMINADO (con la lámina intermedia visible como una línea fina en el canto), separados por una CÁMARA de aire con su perfil separador de aluminio gris y el sellado negro alrededor. Detrás, desenfocado como lo desenfoca un móvil de cerca, el resto del vidrio y la nave. Sobre el banco, unos tacos de calzar de plástico.

LUZ: luz dura que entra por el portón de la nave, desde la DERECHA, y hace brillar los cantos verdosos de los vidrios.

COMPOSICIÓN: el canto del vidrio vertical en el centro, con margen alrededor.
```

---

### Ficha 4.11 · `servicio-sin-obra.jpg`

**Dónde sale:** servicio «Cambio de ventanas sin obra»: miniatura cuadrada de 88 px y lámina cuadrada de 300 px.

```
Fotografía CUADRADA 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace el carpintero con su iPhone desde dentro de un dormitorio, a media instalación, para enseñar al cliente que no hace falta picar: el marco nuevo va encima del premarco viejo.

PLANO: frontal a la esquina inferior izquierda del marco, de cerca, a la altura del alféizar interior.

LO QUE CUENTA LA HISTORIA: el PREMARCO VIEJO de madera pintada de blanco, algo descascarillado, todavía empotrado en el muro. Encima, atornillado, el MARCO NUEVO de aluminio blanco: se ven DOS TORNILLOS de fijación con la cabeza a la vista y, alrededor del marco, tiras de CINTA DE CARROCERO beige protegiendo la pared antes de sellar. Una pistola de silicona apoyada en el alféizar, quieta. Por el cristal, de día, la fachada de enfrente, desenfocada.

LUZ: la luz de día que entra por la propia ventana, dura y lateral desde la IZQUIERDA, que hace sombra en el escalón entre el premarco y el marco nuevo.

COMPOSICIÓN: la unión entre premarco y marco nuevo, con los tornillos y la cinta, en el centro; sin ventana quemada en blanco en ningún borde.
```

---

### Ficha 4.12 · `proceso-medicion.jpg`

**Dónde sale:** `/empresa`, lámina a 3:2 (se pide 4:3: todo lo importante entre el 10 y el 90 % del alto).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone mientras su compañero mide un hueco en una casa, el día de la visita, para enseñar en la web cómo empiezan todos los trabajos.

PLANO: alzado frontal del hueco desde dentro de una habitación vacía en obra, a la altura del flexómetro.

LO QUE CUENTA LA HISTORIA: un hueco de ventana SIN VENTANA, con el premarco desnudo, en una pared de yeso. De lado a lado del hueco, un FLEXÓMETRO amarillo y negro EXTENDIDO en horizontal, recto y nítido, con la cinta tensa (sin números legibles). En cada extremo, una MANO con GUANTE de trabajo gris sujetándolo, DESENFOCADAS y cortadas en el borde: no se ve nada más de la persona. En el alféizar, un lápiz de carpintero y una libreta cerrada.

LUZ: luz de mediodía que entra dura por el hueco, desde fuera, y la de la habitación, de día y uniforme. Sin cielo quemado: por el hueco se ve la fachada del edificio de enfrente.

COMPOSICIÓN: el flexómetro cruzando el centro, entre el 30 y el 70 % del alto. Sin caras.
```

---

### Ficha 4.13 · `taller-mesa-corte.jpg`

**Dónde sale:** `/empresa`, lámina a 3:2 (se pide 4:3: todo lo importante entre el 10 y el 90 % del alto).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone en su nave de Alboraya, a última hora de la mañana, en una pausa del corte, para la página «quiénes somos».

PLANO: frontal a la mesa de corte, a la altura del pecho, a dos metros.

LO QUE CUENTA LA HISTORIA: una TRONZADORA de aluminio de doble cabezal (o de un cabezal) sobre su bancada larga, con el disco protegido y quieta, sin nadie trabajando. A los lados, en la bancada, varios PERFILES de aluminio blanco y antracita ya cortados a inglete, apilados. En el suelo de hormigón, VIRUTAS de aluminio brillantes. Al fondo, desenfocado poco, la pared de la nave con un tablero de herramientas.

LUZ: la luz de los fluorescentes del techo de la nave y la que entra por el portón abierto a un lado: luz de taller real, algo dura, sin sombras dramáticas. Colores neutros.

COMPOSICIÓN: la tronzadora en el centro, entre el 15 y el 85 % del alto, con los perfiles a los lados. Sin personas.
```

---

### Ficha 4.14 · `taller-perfiles.jpg`

**Dónde sale:** `/empresa`, lámina a 3:2 (se pide 4:3: todo lo importante entre el 10 y el 90 % del alto).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone en la nave, para enseñar que trabajan con los tres acabados.

PLANO: alzado frontal del estante, de frente y recto, como un dibujo: el móvil perpendicular a las bocas de los perfiles, a la altura del centro del estante.

LO QUE CUENTA LA HISTORIA: un ESTANTE metálico gris de la nave con PERFILES de ventana largos guardados en horizontal, vistos de frente por sus BOCAS (la sección de cada perfil). Tres grupos ordenados: perfiles BLANCOS, perfiles ANTRACITA y perfiles en IMITACIÓN MADERA. Algunos con su film protector transparente, sin texto legible. Cartones lisos entre los grupos.

LUZ: luz de la nave, de los fluorescentes del techo, uniforme, con una sombra suave dentro de cada boca.

COMPOSICIÓN: el estante llena la imagen, con los tres grupos de perfiles en la franja entre el 15 y el 85 % del alto. Sin personas.
```

---

## 4. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1448×1086 (4:3)** o **de 1254×1254 (1:1)**. Las fichas 4:3 y 1:1 se piden directamente en su proporción.
- Las tres fotos de `/empresa` (4.12–4.14) se piden en 4:3 y Claude las **recorta a 3:2** por arriba y por abajo (quedan en 1448×965). Las de obra se guardan en 4:3: la web las recorta a 3:2 en la página de cada trabajo y la 4.4, también a cuadrado, con CSS.
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**, sin metadatos) con el **nombre exacto** de la tabla de §1, en `templates/carpinteria-metalica/carpinteria-metalica-4/public/ejemplo/`.
- Después actualiza `public/ejemplo/CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)»), comprueba que cada `alt` de `site.config.ts` describe lo que se ve (con tu OK si hay que cambiarlo) y que todas siguen con `origen: "ia"`.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente real: en la web de un cliente, `/trabajos` lleva sus fotos.
