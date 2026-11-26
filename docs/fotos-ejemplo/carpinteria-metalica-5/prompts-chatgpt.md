# Prompts de ChatGPT · fotos de ejemplo de `carpinteria-metalica-5` «Perfil»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto. La única excepción es la pareja antes/después (fichas 5.3 y 5.4), que va en la misma conversación. En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Guarda cada resultado como `5.<m>.png` (por ejemplo `5.1.png`) en `andrei-leads-tech/material/fotos-ejemplo/carpinteria-metalica-5/`. Después pásaselas a Claude, que las convierte (ver §4). El vídeo del hero queda fuera: solo se pide su **póster** (ficha 5.1).

**Concepto del template:** «Perfil» es la web de un taller de aluminio de gama alta de Madrid (Alcobendas), tipo proyecto, **oscura**: casi negro (`#0d0e0f`), texto hueso (`#eceae4`) y primario champán (`#c8b48c`), con fichas numeradas en romanos y un vídeo en el hero. Su ficha de estilo es de **clave baja**: fondo que cae a negro, **una sola luz lineal y rasante** (como una tira de luz) que dibuja un reflejo largo sobre el aluminio, color neutro frío, altas luces champán, saturación algo apagada y grano fino. Las obras se ven **al anochecer**, con el interior encendido en cálido. Sin personas (como mucho un antebrazo con guante, desenfocado, en el taller).

**Registro:** todas son **fotos de móvil**, no de estudio. Los detalles (póster del hero, soluciones y taller) los hace el dueño con su iPhone en la nave a última hora, con las luces generales apagadas y **una regleta LED de taller** como única luz, rasante: de ahí sale la tira de luz y el negro alrededor. Las obras las hace el encargado con su iPhone al terminar cada instalación, al anochecer, con las luces de la casa encendidas y el móvil apoyado para que no tiemble. El aspecto cuidado sale del momento y de la luz, no de un fotógrafo.

**Champán y color primario:** el anodizado champán aparece porque lo pide la ficha (es un acabado real de perfil), pero **apagado y metálico**, nunca dorado brillante. Si el cliente cambia el primario, la foto sigue leyéndose como material.

**Hora azul y anochecer:** el método común de los prompts los prohíbe, pero la ficha de estilo de este template los pide expresamente para las obras, así que aquí se permiten. Siguen prohibidos el aspecto de cine, la gradación verdeazulada y naranja, la niebla y los filtros.

Cosas propias de este template:

- **Etiqueta «Imagen generada con IA»:** dentro de la foto, **abajo a la izquierda**, a 12 px del borde: esa esquina va en negro o en penumbra lisa, sin detalle. En el hero la etiqueta va **arriba a la izquierda** (abajo va el título): ahí, la esquina superior izquierda en negro.
- **Hero (5.1):** póster del vídeo, a sangre, con un velo oscuro abajo y el título encima. Se pide en **4:3** y Claude lo recorta a **16:9** (1448×815; no se amplía a 1920×1080). En móvil se recorta a la columna central en **4:5**. **Zona segura:** el canto del perfil y la tira de luz entre el 30 y el 70 % del ancho y entre el 20 y el 60 % del alto.
- **Recortes de las obras:** se pintan a 3:2 en la home y en su página, y a **4:5** en `/trabajos`: el motivo va en la columna central (entre el 20 y el 80 % del ancho). Se piden en 4:3 y Claude las recorta a 3:2. La 5.6 (puerta pivotante) se pide **vertical 4:5** y en su página se pinta a 3:2: lo importante, entre el 25 y el 75 % del alto.
- **Antes/después** (ático de Chamberí): deslizador a 3:2 con rótulos arriba.
- **`/empresa`:** las dos del taller se ven casi en blanco y negro (el CSS les quita el 60 % del color).

Ubicación de los datos de ejemplo: Madrid y alrededores (La Moraleja, Chamberí, Pozuelo, Tres Cantos, Las Rozas; el taller, en Alcobendas). Sin monumentos ni rótulos que identifiquen el sitio.

Cada ficha cambia de pieza, ángulo, lado de la luz, estancia y momento del anochecer, para que la serie no parezca catorce veces el mismo perfil.

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Pedir en | Registro |
|---|---|---|---|---|
| 5.1 | `hero-poster.jpg` | Canto de un perfil de corredera anodizado champán cruzado en diagonal por la tira de luz de una regleta LED, fondo negro | 4:3 (se recorta a 16:9) | Móvil (dueño, taller) |
| 5.2 | `obra-01-moraleja.jpg` | Ventanal corredero de tres hojas desde el jardín a la hora azul, salón encendido en cálido | 4:3 (se recorta a 3:2) | Móvil (encargado, obra) |
| 5.3 | `obra-02-chamberi.jpg` | **Después:** ventana de hoja oculta antracita de un ático, desde dentro, con los tejados de teja árabe a la hora azul | 4:3 (se recorta a 3:2) | Móvil (encargado, obra) |
| 5.4 | `obra-02-antes.jpg` | **Antes:** la misma ventana, de madera vieja pintada de blanco y desconchada, con luz de interior tenue | 4:3 (se recorta a 3:2) | Móvil (encargado, obra) |
| 5.5 | `obra-03-pozuelo.jpg` | Salón abierto al jardín con una corredera minimalista con el carril empotrado en el suelo, al anochecer | 4:3 (se recorta a 3:2) | Móvil (encargado, obra) |
| 5.6 | `obra-04-tres-cantos.jpg` | Puerta pivotante antracita de suelo a techo, entreabierta, de noche, con la luz cálida saliendo por la rendija | 4:5 | Móvil (encargado, obra) |
| 5.7 | `obra-05-las-rozas.jpg` | Porche acristalado con correderas grandes, iluminado por dentro al anochecer, desde el jardín | 4:3 (se recorta a 3:2) | Móvil (encargado, obra) |
| 5.8 | `solucion-elevable.jpg` | Macro del carril inferior de una elevable, con felpudo y tornillería | 4:3 (se recorta a 3:2) | Móvil (dueño, taller) |
| 5.9 | `solucion-hoja-oculta.jpg` | Encuentro de un marco antracita texturado con un muro de ladrillo visto y su sellado | 4:3 (se recorta a 3:2) | Móvil (encargado, obra) |
| 5.10 | `solucion-minimalista.jpg` | Cruce de dos hojas de perfil mínimo con el canto verdoso del vidrio laminado | 4:3 (se recorta a 3:2) | Móvil (dueño, taller) |
| 5.11 | `solucion-pivotante.jpg` | Pivote inferior de acero inoxidable sobre piedra oscura | 4:3 (se recorta a 3:2) | Móvil (encargado, obra) |
| 5.12 | `solucion-oscilobatiente.jpg` | Herraje oscilobatiente con la junta de EPDM en primer plano | 4:3 (se recorta a 3:2) | Móvil (dueño, taller) |
| 5.13 | `taller-ajuste.jpg` | Antebrazo con guante de nitrilo negro, desenfocado, ajustando un herraje sobre el banco | 4:3 (se recorta a 3:2) | Móvil (dueño, taller) |
| 5.14 | `taller-perfiles.jpg` | Perfiles de aluminio apoyados en un caballete, en clave baja | 4:3 (se recorta a 3:2) | Móvil (dueño, taller) |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque).

```
Voy a pedirte una fotografía para la web de ejemplo de un taller de ventanas y puertas de aluminio de gama alta de Madrid (España). Estas reglas valen para toda la serie. La escena concreta (quién hace la foto, pieza o casa, luz y composición) te la doy en el siguiente mensaje y manda sobre cualquier costumbre: síguela al pie de la letra.

QUÉ TIPO DE FOTO ES
- Foto de MÓVIL hecha con un iPhone (16, 17 o 18), no de un fotógrafo de estudio. La hace el dueño del taller o su encargado para la web del taller: detalles de piezas en la nave y obras terminadas en casas de clientes.
- Modo foto estándar del iPhone (en los primeros planos, su modo macro automático; al anochecer, su modo noche, con el móvil apoyado para que no tiemble). Sin modo retrato ni modos creativos. Procesado típico de móvil, con algo de grano fino en las sombras.

LUZ Y TONO: CLAVE BAJA
- En los detalles del taller: la nave está a oscuras y la ÚNICA luz es una REGLETA LED alargada de taller, colocada a un lado y RASANTE (unos 15 grados sobre la pieza): dibuja una TIRA DE LUZ larga y nítida sobre el aluminio y deja el resto de la imagen cayendo a NEGRO.
- En las obras: al ANOCHECER o a la HORA AZUL, con las luces de dentro de la casa encendidas en cálido. Fuera, luz azulada y suave; dentro, cálido. Nada de luz de día plana.
- Color neutro y frío, saturación un poco apagada. Los brillos del aluminio, en un tono champán apagado. Negros profundos y neutros: la foto se pinta sobre una web casi negra.

MATERIA
- Aluminio anodizado (champán apagado, antracita, plata), vidrio con su canto verdoso, juntas de EPDM negras, tornillería de acero inoxidable, felpudos, polvo fino de taller. Casas de gama alta de Madrid, pero vividas y reales.
- Pocos objetos: solo los que pida la escena.

PROHIBIDO
- Luz de día plana, cielo azul de día, sol directo.
- Blancos puros de catálogo, producto aislado sobre fondo blanco, render 3D, banco de imágenes.
- Aspecto de cine: gradación verdeazulada y naranja, niebla, humo o polvo flotando en el haz de luz, velas, viñeteado artificial, filtros, bokeh exagerado.
- Personas reconocibles o caras. Reflejos del fotógrafo, del móvil o de cualquier persona en cristales o en el aluminio.
- Logos, marcas de sistemistas, texto, cotas o cifras legibles en perfiles, vidrios, etiquetas o cajas. Matrículas.
- Fuego, chispas o humo.
- Collage o varios paneles: una única fotografía.

COMPOSICIÓN
- El motivo principal en el CENTRO, con margen alrededor.
- La ESQUINA INFERIOR IZQUIERDA en negro o en penumbra lisa, sin detalle: ahí la web pone una etiqueta.
- La proporción la indica cada escena.

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 5.1 · `hero-poster.jpg`

**Dónde sale:** póster del vídeo del hero, a sangre, con un velo oscuro abajo y el título encima. Es la primera imagen que se carga. Se pide en 4:3: en escritorio se recorta a 16:9 (se queda con la franja central del alto, del 12 al 88 %) y en móvil a 4:5 (la columna central del ancho, del 20 al 80 %). **Zona segura:** el canto del perfil y la tira de luz entre el 30 y el 70 % del ancho y entre el 20 y el 60 % del alto. La etiqueta va arriba a la izquierda.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone, en la nave a última hora, con las luces generales apagadas, para la portada de la web: el perfil que fabrican, visto como una pieza.

PLANO: muy de cerca (modo macro del iPhone), ligeramente desde arriba, sobre el banco de trabajo.

LO QUE CUENTA LA HISTORIA: el CANTO de un perfil de corredera de aluminio anodizado en CHAMPÁN apagado, tumbado sobre el banco y cruzando la imagen en DIAGONAL, de abajo a la izquierda hacia arriba a la derecha. Se ven sus aristas, una ranura para la junta y la superficie satinada del anodizado. El perfil ocupa más o menos un tercio de la imagen. Sobre el banco, oscuro, un poco de polvo fino de taller.

LUZ: una única regleta LED de taller, fuera de cuadro a la izquierda y rasante: dibuja una TIRA DE LUZ larga y nítida a lo largo del perfil, con altas luces champán. Todo lo demás cae a negro.

COMPOSICIÓN (la web recorta esta foto en horizontal en el ordenador y en vertical en el móvil):
- El tramo más iluminado del perfil, en el centro: entre el 30 y el 70 % del ancho y entre el 20 y el 60 % del alto.
- Por debajo del 60 % del alto, sobre todo en el centro, negro o casi (ahí va el título).
- La esquina superior izquierda, negro liso (ahí va la etiqueta).
- Sin texto ni marcas en el perfil.
```

---

### Ficha 5.2 · `obra-01-moraleja.jpg`

**Dónde sale:** obra «Ventanal de salón en La Moraleja»: tarjeta a 3:2 en la home, 4:5 en `/trabajos` y foto grande a 3:2 en su página. También es la **imagen de Open Graph** (la vista previa al compartir el enlace por WhatsApp). Motivo en la columna central (del 20 al 80 % del ancho).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el encargado de la obra con su iPhone desde el jardín de un chalé de La Moraleja, a la hora azul, el día que terminan de montar el ventanal, con el móvil apoyado en una silla del jardín para que no tiemble (modo noche).

PLANO: frontal al ventanal, a la altura de los ojos, desde unos seis metros, recto.

LO QUE CUENTA LA HISTORIA: un VENTANAL CORREDERO de tres hojas grandes, de suelo a techo, con perfiles finos de aluminio antracita, en la fachada de un salón. Dentro, el salón encendido en CÁLIDO: una lámpara de pie, un sofá claro, un cuadro sin detalle en la pared. Fuera, en primer plano, el césped y el borde de una tarima de madera en penumbra, y a los lados unos arbustos oscuros. La fachada, de piedra clara, apenas visible.

LUZ: hora azul. El cielo queda fuera de cuadro (como mucho, una franja azul oscura arriba); la luz de fuera es azulada y suave, y la de dentro, cálida y de lámparas. Ningún reflejo de personas en el cristal: refleja, como mucho, el jardín oscuro.

COMPOSICIÓN: el ventanal en el centro, entre el 20 y el 80 % del ancho, con el salón encendido como foco. La esquina inferior izquierda, césped en penumbra lisa.
```

---

### Ficha 5.3 · `obra-02-chamberi.jpg` (el «después»)

**Dónde sale:** obra «Ático en Chamberí» (Después): 3:2 en la home y en su página, 4:5 en `/trabajos`, y deslizador antes/después a 3:2. **Va en la misma conversación que la ficha 5.4.** Genera esta primera y NO cambies de conversación.

```
Fotografía horizontal 4:3, una única imagen. Es el "DESPUÉS" del cambio de una ventana en un ático de Chamberí (Madrid).

QUIÉN Y POR QUÉ: la hace el encargado con su iPhone desde dentro del ático, a la hora azul, al terminar, con el móvil apoyado en una mesa (modo noche).

ENCUADRE FIJO (lo repetiré en la versión "antes"): desde dentro de una buhardilla, frontal a la ventana, a unos tres metros, a la altura de los ojos. Cuatro anclajes que no se moverán:
1. La ventana en el centro de una pared gruesa encalada en blanco roto, con una mocheta profunda.
2. A la izquierda, una viga de madera oscura del techo que baja en diagonal.
3. A la derecha, el borde de una estantería baja con unos libros sin texto legible.
4. Por la ventana, los TEJADOS de TEJA ÁRABE de Madrid y alguna chimenea, sin monumentos ni rótulos.

LUZ FIJA: hora azul fuera (los tejados en azul oscuro suave) y, dentro, una lámpara de mesa cálida a la derecha, fuera de cuadro, que ilumina la pared y la mocheta.

DESPUÉS: una ventana de HOJA OCULTA de aluminio ANTRACITA texturado: por fuera solo se ve el marco fino, sin la hoja; un cordón de sellado negro perfecto en el contorno; manilla antracita discreta. El cristal limpio deja ver los tejados.

COMPOSICIÓN: la ventana en el centro, entre el 20 y el 80 % del ancho. La esquina inferior izquierda, pared en penumbra.
```

---

### Ficha 5.4 · `obra-02-antes.jpg` (el «antes»)

**Dónde sale:** obra «Ático en Chamberí» (Antes), en el deslizador a 3:2. **Misma conversación que la 5.3.** El desgaste tiene que verse **mucho**.

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo encargado con su iPhone el día que fue a medir, desde el mismo sitio.

MISMO ENCUADRE y mismos cuatro anclajes: la ventana en el centro de la pared gruesa encalada en blanco roto con la mocheta profunda, la viga de madera oscura en diagonal a la izquierda, el borde de la estantería baja con libros a la derecha y, por la ventana, los tejados de teja árabe con alguna chimenea. MISMA LUZ, pero más tenue: hora azul fuera y la lámpara de mesa cálida a la derecha, fuera de cuadro.

Solo cambia la ventana, con el desgaste MUY visible:
- Una ventana VIEJA de MADERA de dos hojas abatibles, pintada de blanco, con la pintura DESCONCHADA y levantada en escamas, y la madera gris y agrietada a la vista en la parte baja.
- Un cristal simple, con una esquina rajada y masilla seca cuarteada.
- Una falleba de hierro antigua, oxidada.
- Bajo la ventana, en la pared, una mancha de humedad y la pintura ampollada.

Sin texto, sin logos.
```

---

### Ficha 5.5 · `obra-03-pozuelo.jpg`

**Dónde sale:** obra «Salón abierto al jardín en Pozuelo» (3:2 y 4:5) y segunda foto del servicio «Correderas elevables».

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el encargado con su iPhone desde dentro del salón de una casa de Pozuelo, al anochecer, para enseñar que el suelo sigue sin escalón de dentro afuera.

PLANO: desde dentro, a la altura del pecho, frontal a la corredera, a cinco metros.

LO QUE CUENTA LA HISTORIA: una CORREDERA MINIMALISTA de perfil mínimo, de suelo a techo, con el CARRIL EMPOTRADO en el suelo: el pavimento de gran formato gris claro sigue igual de dentro afuera sin escalón. Las hojas, CERRADAS, con perfiles casi invisibles. Fuera, el jardín al anochecer: césped, un olivo joven y una luz de jardín baja encendida. Dentro, en primer término, el borde de una alfombra y la sombra de un sillón, iluminados en cálido por una lámpara.

LUZ: anochecer, fuera azulado y oscuro; dentro, cálido. Sin reflejos de personas en el cristal.

COMPOSICIÓN: la corredera y el encuentro del suelo en el centro, entre el 20 y el 80 % del ancho. La esquina inferior izquierda, suelo en penumbra.
```

---

### Ficha 5.6 · `obra-04-tres-cantos.jpg`

**Dónde sale:** obra «Puerta pivotante en Tres Cantos»: 4:5 en `/trabajos` y foto a 3:2 en su página. Se pide **vertical 4:5**: lo importante, entre el 25 y el 75 % del alto.

```
Fotografía VERTICAL 4:5, una única imagen.

QUIÉN Y POR QUÉ: la hace el encargado con su iPhone desde el camino de entrada de una casa de Tres Cantos, de noche, el día que dejan la puerta montada, con el móvil apoyado en el murete (modo noche).

PLANO: frontal a la puerta, a la altura del pecho, a unos cuatro metros, recto.

LO QUE CUENTA LA HISTORIA: una PUERTA PIVOTANTE de entrada, de aluminio ANTRACITA liso, de suelo a techo, ENTREABIERTA un palmo sobre su eje: por la RENDIJA sale una franja de LUZ CÁLIDA del recibidor que cae sobre el suelo de piedra oscura de la entrada. Tirador vertical largo antracita. La fachada alrededor, de hormigón visto o enfoscado gris oscuro, en penumbra. Un aplique de pared encendido a un lado, sin marca.

LUZ: de noche: la luz cálida de la rendija y el aplique. El resto, en penumbra azulada.

COMPOSICIÓN: la puerta en el centro, ocupando la mayor parte del alto, con la rendija de luz entre el 25 y el 75 % del alto. La esquina inferior izquierda, suelo oscuro.
```

---

### Ficha 5.7 · `obra-05-las-rozas.jpg`

**Dónde sale:** obra «Porche acristalado en Las Rozas» (3:2 y 4:5).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el encargado con su iPhone desde el fondo del jardín de una casa de Las Rozas, al anochecer, con el porche ya cerrado y las luces de dentro encendidas.

PLANO: frontal al porche, a la altura de los ojos, desde unos ocho metros, ligeramente más bajo que el porche.

LO QUE CUENTA LA HISTORIA: un PORCHE ACRISTALADO bajo una pérgola de obra, cerrado con CORREDERAS GRANDES de aluminio antracita de cuatro hojas. Dentro, iluminado en CÁLIDO: una mesa de comedor de madera con sillas y unas plantas. En primer plano, el césped en penumbra y una tumbona de jardín plegada, oscura.

LUZ: anochecer: el porche brilla en cálido; el jardín y la casa, en azul oscuro suave. Sin cielo en el encuadre o, como mucho, una franja arriba muy oscura.

COMPOSICIÓN: el porche en el centro, entre el 20 y el 80 % del ancho. La esquina inferior izquierda, césped oscuro.
```

---

### Ficha 5.8 · `solucion-elevable.jpg`

**Dónde sale:** solución «Correderas elevables de gran formato», a todo el ancho en la home y en su página.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone en la nave a oscuras, sobre una elevable montada para una prueba, para enseñar en la web el carril por el que corre.

PLANO: muy de cerca (modo macro), a ras del carril, mirándolo a lo largo.

LO QUE CUENTA LA HISTORIA: el CARRIL INFERIOR de una corredera elevable de aluminio antracita, visto a lo largo, perdiéndose hacia el fondo: la guía, el FELPUDO negro de cepillo a lo largo de la hoja, dos TORNILLOS de acero inoxidable con su cabeza a la vista y un poco de polvo fino de taller en la ranura.

LUZ: una regleta LED rasante desde la DERECHA, a ras del carril: tira de luz larga a lo largo de la guía, brillos en los tornillos; el resto en negro.

COMPOSICIÓN: el carril cruza el centro de la imagen en horizontal, entre el 30 y el 70 % del alto. La esquina inferior izquierda, negro.
```

---

### Ficha 5.9 · `solucion-hoja-oculta.jpg`

**Dónde sale:** solución «Ventanas de hoja oculta».

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el encargado con su iPhone en la fachada de un piso de Madrid, al anochecer, con una linterna de mano apoyada en el andamio, para enseñar el remate de una ventana recién montada.

PLANO: muy de cerca, frontal a la esquina inferior del marco, desde fuera.

LO QUE CUENTA LA HISTORIA: el ENCUENTRO entre un MARCO de aluminio ANTRACITA de textura fina y un muro de LADRILLO VISTO rojizo, con un cordón de SELLADO negro perimetral perfecto en la junta. Se ve el grosor del marco y, detrás, el cristal oscuro.

LUZ: anochecer, casi de noche; la única luz es una linterna de mano RASANTE desde la IZQUIERDA, que saca la textura del ladrillo y del antracita y deja el resto en negro.

COMPOSICIÓN: la esquina del marco y el sellado en el centro. La esquina inferior izquierda, ladrillo en sombra.
```

---

### Ficha 5.10 · `solucion-minimalista.jpg`

**Dónde sale:** solución «Correderas minimalistas».

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone en la nave a oscuras, sobre una corredera minimalista montada de pie para un cliente, para enseñar lo fino que es el cruce de hojas.

PLANO: muy de cerca (modo macro), en el CRUCE de las dos hojas, a la altura del encuentro.

LO QUE CUENTA LA HISTORIA: el cruce vertical de dos hojas correderas de PERFIL MÍNIMO (unos 2 cm de aluminio negro), y a cada lado el CANTO VERDOSO del vidrio laminado, grueso, con sus capas visibles. Detrás, la nave en negro.

LUZ: una regleta LED vertical, fuera de cuadro a la DERECHA y rasante: tira de luz a lo largo del perfil y brillo verde en los cantos del vidrio.

COMPOSICIÓN: el cruce de hojas en el centro, vertical. La esquina inferior izquierda, negro.
```

---

### Ficha 5.11 · `solucion-pivotante.jpg`

**Dónde sale:** solución «Puertas pivotantes de entrada».

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el encargado con su iPhone en el recibidor de una casa, de noche, agachado junto a la puerta pivotante que acaba de montar, para enseñar el pivote.

PLANO: muy de cerca, a ras del suelo, oblicuo al canto de la puerta.

LO QUE CUENTA LA HISTORIA: el PIVOTE INFERIOR de ACERO INOXIDABLE de una puerta pivotante de aluminio antracita, anclado en un pavimento de PIEDRA OSCURA pulida. Se ven el canto de la puerta, el eje y la placa del pivote con dos tornillos.

LUZ: la única luz es la del recibidor, una tira LED baja empotrada en el zócalo, rasante desde la IZQUIERDA: brillo en el acero y reflejo largo en la piedra; el resto, en negro.

COMPOSICIÓN: el pivote en el centro. La esquina inferior izquierda, piedra oscura sin brillos.
```

---

### Ficha 5.12 · `solucion-oscilobatiente.jpg`

**Dónde sale:** solución «Oscilobatientes con rotura de puente térmico».

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone en la nave, sobre una hoja oscilobatiente tumbada en el banco, para enseñar la junta que la hace estanca.

PLANO: muy de cerca (modo macro), oblicuo al canto de la hoja.

LO QUE CUENTA LA HISTORIA: en primer plano, la JUNTA de EPDM negra mate, con su forma de labio, encajada en el perfil de aluminio plata de la hoja; un poco más atrás, nítido, el HERRAJE oscilobatiente de acero con su bulón. Detrás, el banco en negro.

LUZ: una regleta LED rasante desde arriba a la IZQUIERDA: tira de luz sobre el perfil, la junta con su textura mate, brillo pequeño en el bulón.

COMPOSICIÓN: la junta y el herraje en el centro. La esquina inferior izquierda, negro.
```

---

### Ficha 5.13 · `taller-ajuste.jpg`

**Dónde sale:** `/empresa`, a todo el ancho de su columna; la web la pinta casi en blanco y negro.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone en la nave, a última hora, mientras un compañero ajusta un herraje sobre el banco: es la única foto de la web con presencia humana.

PLANO: de cerca, ligeramente desde arriba, sobre el banco.

LO QUE CUENTA LA HISTORIA: sobre el banco, un perfil de aluminio con un herraje a medio ajustar, nítido. Entrando desde el borde derecho, un ANTEBRAZO con GUANTE de NITRILO negro sujetando una llave Allen, DESENFOCADO por el movimiento. No se ve nada más de la persona: ni cara, ni cuerpo.

LUZ: una regleta LED rasante desde la IZQUIERDA sobre el banco; el resto de la nave, en negro.

COMPOSICIÓN: el herraje nítido en el centro y el antebrazo desenfocado a la derecha. La esquina inferior izquierda, negro.
```

---

### Ficha 5.14 · `taller-perfiles.jpg`

**Dónde sale:** `/empresa`; la web la pinta casi en blanco y negro.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone en la nave casi a oscuras, para enseñar el material con el que trabajan.

PLANO: a la altura del pecho, ligeramente oblicuo, a un metro y medio.

LO QUE CUENTA LA HISTORIA: varios PERFILES largos de aluminio (champán apagado, antracita y plata) apoyados en diagonal en un CABALLETE de taller, juntos, con sus bocas hacia la cámara. Un poco de polvo de taller en el caballete.

LUZ: una regleta LED colgada a la DERECHA, fuera de cuadro: tiras de luz paralelas a lo largo de cada perfil; el resto de la nave, en negro.

COMPOSICIÓN: los perfiles en el centro, en diagonal. La esquina inferior izquierda, negro.
```

---

## 4. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1448×1086 (4:3)** o **de 1122×1402 (4:5)**.
- **Hero (5.1):** Claude lo recorta a **16:9** (1448×815, por arriba y por abajo, conservando la zona segura). No se amplía a 1920×1080: la regla es no ampliar.
- **Resto en 4:3:** Claude las recorta a **3:2** (1448×965) por arriba y por abajo. La 5.6 se queda en 4:5.
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**, sin metadatos) con el **nombre exacto** de la tabla de §1, en `templates/carpinteria-metalica/carpinteria-metalica-5/public/ejemplo/`.
- Después actualiza `public/ejemplo/CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)»), comprueba que cada `alt` de `site.config.ts` describe lo que se ve (con tu OK si hay que cambiarlo) y que todas siguen con `origen: "ia"`.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente real: en la web de un cliente, `/trabajos` lleva sus fotos.
- El vídeo del hero (`hero.mp4`) no entra aquí: sus instrucciones están en `CREDITOS.md`.
