# Prompts de ChatGPT · fotos de ejemplo de `electricidad-3` «Sin sorpresas»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto (la única excepción es la pareja antes/después, ficha 3.6 y 3.7, que va en la misma conversación). En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Guarda cada resultado como `3.<m>.png` (por ejemplo `3.1.png`) en `mis_datos/fotos-ejemplo/electricidad-3/`. Después pásaselas a Claude, que las revisa y las convierte (ver §5).

Concepto del template: web **oscura** (noche `#121214`, texto casi blanco, primario morado `#7e22ce`) con **luz cálida** como protagonista. Las fotos tienen que sentirse nocturnas o de interior a media luz: fondos oscuros, un foco cálido (linterna frontal, lámpara, farola, bombilla) que ilumina solo el motivo. Evita blancos quemados y fondos claros: se pegarían al borde de una web oscura.

Tres cosas propias de este template:

- **Contorno orgánico.** Las fotos no son rectángulos: se recortan con una forma de mancha. Las esquinas y los bordes se pierden, así que el motivo principal va **centrado y con margen** alrededor.
- **Etiqueta «Foto de ejemplo».** La web la superpone **dentro del contorno, centrada, abajo** (a un 9 % del borde inferior). Por eso cada prompt deja libre la **franja inferior central** (suelo, pared lisa o zona oscura y desenfocada).
- **Hero 16:9 con recorte 4:5.** La foto del hero se ve apaisada en escritorio y recortada en vertical (4:5, centro) en móvil. Todo lo importante va en la **columna central** (~ el 35 % central del ancho).

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Proporción |
|---|---|---|---|
| 3.1 | `hero.jpg` | Electricista de espaldas con linterna frontal abriendo un cuadro eléctrico en un recibidor a media luz; el cuadro, en el centro | 16:9 (admite recorte 4:5 centrado) |
| 3.2 | `servicio-averia.jpg` | Mano con linterna revisando un cuadro con un diferencial bajado | 4:3 |
| 3.3 | `servicio-diferencial.jpg` | Detalle de un diferencial nuevo en un cuadro | 1:1 |
| 3.4 | `servicio-enchufe.jpg` | Manos cambiando un enchufe con un destornillador, pared limpia | 1:1 |
| 3.5 | `servicio-aire.jpg` | Unidad exterior de aire acondicionado en un balcón con canaleta eléctrica nueva hasta ella | 1:1 |
| 3.6 | `trabajo-cuadro.jpg` | Cuadro nuevo con los automáticos alineados en una casa adosada (después) | 4:3 |
| 3.7 | `trabajo-cuadro-antes.jpg` | El mismo cuadro antes: plásticos chamuscados, cables derretidos y hollín (antes) | 4:3 |
| 3.8 | `trabajo-aire.jpg` | Línea eléctrica nueva por canaleta hasta el aire acondicionado en un salón | 4:3 |
| 3.9 | `trabajo-diferencial.jpg` | Caja de registro abierta en un pasillo con un empalme nuevo y bien aislado | 4:3 |
| 3.10 | `empresa-furgoneta.jpg` | Furgoneta blanca sin rotular aparcada de noche bajo una farola | 4:3 |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque). La proporción cambia según la ficha: cada prompt la repite, y esa manda sobre la del bloque.

```
Voy a pedirte una fotografía para la web de ejemplo de un electricista de España. Aplica SIEMPRE estas reglas de estilo:

- Fotografía realista, como la haría un electricista con un móvil bueno: encuadre natural, grano suave de móvil en poca luz, profundidad de campo de móvil. Sin filtros, sin retoques HDR, sin aspecto de banco de imágenes ni de render 3D, sin dramatismo de película.
- Ambiente OSCURO y LUZ CÁLIDA: la escena es de noche o de interior a media luz, con fondos oscuros (negro azulado o gris muy oscuro) y un foco de luz cálida (linterna frontal, lámpara, farola, bombilla de filamento) que ilumina solo el motivo. Tonos cálidos, ámbar suave. Nada de blancos quemados ni de fondos claros, sobre todo en los bordes de la imagen. Si aparece algún acento de color frío, que sea un morado apagado y natural (un mango de destornillador, una cinta), nunca forzado ni saturado.
- SIN CARAS: si aparece una persona, de espaldas, solo manos o fuera de cuadro. Nada de técnico sonriente posando.
- SIN logos, marcas ni texto legible en ningún sitio: ni en cuadros eléctricos, interruptores, enchufes, herramientas, cajas, aire acondicionado ni furgoneta. Las etiquetas y rótulos, en blanco o con rayas ilegibles.
- Escena en España: vivienda corriente, casa adosada, calle de ciudad española. Nada lujoso ni americano: enchufes (dos orificios redondos) y cuadros eléctricos europeos.
- Composición para recorte con forma de mancha: el motivo principal CENTRADO y con margen de aire alrededor; no pongas nada importante en las esquinas ni en los bordes.
- Deja libre la FRANJA INFERIOR CENTRAL de la imagen (suelo oscuro, pared lisa o zona oscura desenfocada, sin objetos ni detalles): ahí se superpone una etiqueta de la web.
- La proporción de la imagen es la que indique cada petición (4:3, 1:1 o 16:9).

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 3.1 · `hero.jpg`

**Dónde sale:** hero de la home. Es la foto más importante: tiene que transmitir «alguien acude de noche y lo arregla». **16:9**, y en móvil se recorta a **4:5 por el centro**, así que cuadro, linterna y espalda van en la columna central.

```
Genera una fotografía horizontal 16:9 con el estilo que te he indicado. Un electricista visto DE ESPALDAS, de cintura para arriba (sin cara, sin perfil, solo la nuca cubierta por la banda de una linterna frontal y el cuello de una chaqueta de trabajo gris oscuro lisa, sin logos), de pie en el recibidor de una vivienda española a media luz, de noche. Delante de él, en el CENTRO exacto de la imagen, hay un cuadro eléctrico doméstico empotrado en la pared, con la tapa abierta: filas de diferenciales y automáticos blancos y grises, alineados, con las etiquetas en blanco y sin texto. La linterna frontal (que lleva puesta) lanza un cono de luz cálida y suave sobre el cuadro; una de sus manos, con guante oscuro liso, sujeta la tapa. El resto del recibidor queda en penumbra: pared de color gris cálido oscuro, un zócalo de madera oscura y una puerta apenas intuida al fondo. Una lámpara de pie o de mesa muy tenue fuera de cuadro da un resplandor ámbar muy bajo. Composición muy centrada: la persona y el cuadro ocupan la franja central de la imagen (aproximadamente el 35 % central del ancho), con bastante pared oscura a izquierda y derecha, para que un recorte vertical 4:5 por el centro siga funcionando. La franja inferior central es suelo oscuro liso y desenfocado, sin objetos. Sin caras, sin logos, sin ningún texto legible, sin blancos quemados en los bordes.
```

**Comprobar al recibirla:**
- No se ve la cara: ni de perfil ni reflejada.
- Persona y cuadro están en el centro; si recortas mentalmente un 4:5 central, siguen enteros.
- La luz es de linterna creíble, cálida, no un foco de cine.
- La franja inferior central está limpia.

**Errores típicos:** salir la persona de lado, mostrando mejilla o barbilla (pide «estrictamente de espaldas, la cámara detrás de él»); cuadro desplazado a un lado; recibidor demasiado iluminado y claro; ChatGPT entrega 3:2 en vez de 16:9 (ver §5).

---

### Ficha 3.2 · `servicio-averia.jpg`

**Dónde sale:** servicio «Averías y urgencias».

```
Genera una fotografía horizontal 4:3 con el estilo que te he indicado. Primer plano de un cuadro eléctrico doméstico español empotrado en una pared oscura, con la tapa abierta, de noche. Un diferencial (el bloque más ancho, con la palanca en la parte izquierda) tiene la palanca BAJADA, claramente distinta de las demás, que están arriba; el resto son automáticos blancos y grises idénticos, con las etiquetas en blanco y sin texto. Una mano (solo la mano y parte del antebrazo con manga oscura lisa, SIN cara y SIN cuerpo) sujeta una linterna pequeña de mano que ilumina el cuadro con un haz de luz cálida desde la derecha; el borde de la linterna se ve apenas, sin marca. Todo lo demás queda en penumbra. Ambiente tenso pero sobrio, sin humo, sin chispas, sin dramatismo exagerado. Composición con el cuadro y el diferencial bajado en el centro y bastante pared oscura alrededor. La franja inferior central es pared oscura lisa y desenfocada. Sin caras, sin logos, sin texto legible.
```

**Comprobar al recibirla:**
- El diferencial bajado se distingue a primera vista (palanca abajo y el resto arriba).
- La mano tiene cinco dedos y sostiene realmente la linterna.
- Ningún interruptor lleva números o letras.

**Errores típicos:** todos los interruptores en la misma posición (reenvía: «solo UN diferencial con la palanca abajo»); luz azulada de película de miedo; humo o chispas; cuadro americano (caja metálica con tapa redonda).

---

### Ficha 3.3 · `servicio-diferencial.jpg`

**Dónde sale:** servicio «Diferencial». **1:1.** Es un detalle: el diferencial nuevo manda.

```
Genera una fotografía CUADRADA 1:1 con el estilo que te he indicado. Detalle muy cercano (macro suave, como una foto de móvil muy cerca) de un interruptor diferencial NUEVO, blanco mate, instalado en el carril metálico de un cuadro eléctrico doméstico español. Se ve su palanca arriba y los bornes con cable de cobre brillante entrando y los cables azul y marrón atornillados. A su lado, partes de dos automáticos blancos más estrechos, más desenfocados. Sin ningún grabado: la serigrafía del frontal, en blanco o con rayas ilegibles, sin números ni letras. Un resplandor cálido y suave de una linterna fuera de cuadro ilumina el diferencial desde un lado y deja el resto del cuadro en sombra. Fondo muy oscuro, negro azulado. El diferencial ocupa el centro de la imagen, con aire alrededor. La franja inferior central es la zona oscura del cuadro, desenfocada y sin detalles. Sin personas, sin logos, sin texto legible.
```

**Comprobar al recibirla:**
- Se ve claramente que es nuevo (limpio, sin polvo) y que es un diferencial (ancho, con botón de test sin texto).
- Ni un solo número, letra o logo en el frontal.
- Cable de cobre y colores correctos (azul, marrón).

**Errores típicos:** texto falso grabado en el frontal (pide «frontal completamente liso, sin escritura»); fondo blanco o gris claro; cortarlo demasiado en los bordes (pídelo «más lejos, con aire alrededor»).

---

### Ficha 3.4 · `servicio-enchufe.jpg`

**Dónde sale:** servicio «Enchufes». **1:1.**

```
Genera una fotografía CUADRADA 1:1 con el estilo que te he indicado. Dos manos (sin guantes, solo las manos y las muñecas con las mangas oscuras lisas de una camisa de trabajo, SIN cara y SIN cuerpo) cambiando un enchufe en una pared de una vivienda española: una mano sujeta un mecanismo de enchufe blanco europeo de dos orificios redondos recién sacado de la caja empotrada, y la otra gira un destornillador de punta plana con mango morado oscuro apagado, sin marca, sobre un tornillo del mecanismo. La pared es lisa y limpia, pintada de un gris cálido oscuro, sin desconchones. Es de noche: una linterna frontal, fuera de cuadro, da una luz cálida sobre las manos y el enchufe, y el resto de la habitación queda en penumbra. Los cables (azul, marrón y verde-amarillo) cuelgan ordenados de la caja. Composición con las manos y el enchufe en el centro, con margen de aire a los lados. La franja inferior central es pared oscura lisa y desenfocada. Sin caras, sin logos, sin ningún texto legible.
```

**Comprobar al recibirla:**
- Las manos tienen cinco dedos y el destornillador está agarrado de verdad.
- El enchufe es europeo (dos orificios redondos, sin las tres rayas americanas).
- La pared está limpia: sin cables sueltos ni marcas.

**Errores típicos:** enchufe americano; manos fusionadas o con dedos de más; pared llena de mugre (queremos «pared limpia»); luz de flash frontal que quema los blancos.

---

### Ficha 3.5 · `servicio-aire.jpg`

**Dónde sale:** servicio «Aire acondicionado». **1:1.**

```
Genera una fotografía CUADRADA 1:1 con el estilo que te he indicado. El balcón de un piso español al anochecer: una unidad exterior de aire acondicionado (una caja blanca grisácea con rejilla y ventilador, sin marca ni logo ni etiqueta con texto) fijada sobre soportes metálicos junto a la barandilla de obra. Desde la pared interior sube hasta la unidad una canaleta eléctrica blanca nueva, recta y limpia, con una esquina en ángulo de 90° bien rematada y un tubo flexible gris entrando en la unidad. La luz cálida de una farola de la calle y de la ventana iluminada del salón (fuera de cuadro) ilumina la unidad y la canaleta; el fondo es el cielo oscuro y los edificios de enfrente, muy desenfocados, con luces cálidas pequeñas e ilegibles. Composición: la unidad y la canaleta en el centro, con margen de aire. La franja inferior central es suelo del balcón oscuro y liso. Sin personas, sin logos, sin ningún texto legible.
```

**Comprobar al recibirla:**
- La canaleta es continua, del interior hasta la unidad, sin cortes en el aire.
- La unidad no tiene marca ni etiqueta con texto.
- El fondo no tiene carteles legibles.

**Errores típicos:** logotipo del fabricante en el frontal; cables colgando sin canaleta; tubos que no llegan a ningún sitio; cielo todavía azul claro (pide «ya de noche, cielo casi negro»).

---

### Ficha 3.6 · `trabajo-cuadro.jpg` (el «después»)

**Dónde sale:** trabajo «Cuadro nuevo…» (Después). **Va en la misma conversación que la ficha 3.7.** Genera esta primera y NO cambies de conversación: la 3.7 tiene que heredar su encuadre.

```
Genera una fotografía horizontal 4:3 con el estilo que te he indicado. Es el "DESPUÉS" de una reforma de un cuadro eléctrico en una casa adosada de España.

ENCUADRE FIJO (lo repetiré en la versión "antes", así que respétalo): pared del recibidor de una casa adosada, pintada de gris cálido oscuro; zócalo de madera oscura; la cámara está a la altura del pecho, frontal, a unos 80 cm de la pared, perfectamente centrada en un nicho rectangular empotrado en la pared a unos 1,6 m de altura. Ese nicho ocupa el centro de la imagen, con bastante pared oscura a su alrededor (más o menos el 55 % del ancho de la imagen). A la izquierda del nicho hay un interruptor de luz blanco sencillo y, por debajo, un tubo de cable grapado a la pared. La única luz es la de una lámpara cálida de pie fuera de cuadro, a la derecha, que da un resplandor ámbar suave sobre el nicho; el resto, en penumbra.

DESPUÉS: dentro del nicho hay un cuadro eléctrico moderno nuevo, de plástico blanco mate, con la tapa transparente ahumada abierta. Dos filas de diferenciales y automáticos blancos y grises, perfectamente alineados y del mismo ancho, con las etiquetas en BLANCO sin texto. Cables nuevos azules, marrones y verde-amarillo, bien peinados con bridas negras. El marco del nicho está limpio, recién rematado. Aspecto de trabajo profesional recién terminado. Sin personas, sin logos, sin texto legible. La franja inferior central es zócalo y suelo oscuros y lisos.
```

**Comprobar al recibirla:**
- Se reconocen el nicho rectangular, el interruptor blanco a la izquierda, el tubo grapado y la lámpara cálida a la derecha: son los **anclajes** para que la 3.7 coincida.
- Tapa abierta y automáticos alineados y del mismo ancho (si no, es el «error de IA» más visible).
- Nada de texto legible.

**Errores típicos:** cuadro «de catálogo», sin huella de vivienda real; fondo demasiado claro; sin interruptor ni tubo de referencia (sin ellos el «antes» no encaja); cuadro saliente en vez de empotrado.

---

### Ficha 3.7 · `trabajo-cuadro-antes.jpg` (el «antes»)

**Dónde sale:** trabajo «Cuadro nuevo…» (Antes). **Misma conversación que la 3.6.** El daño tiene que verse **mucho**: es lo que da sentido al par.

```
Ahora genera, en esta misma conversación, la versión "ANTES" de la imagen anterior. MISMA fotografía en todo: mismo encuadre horizontal 4:3, misma pared gris cálido oscuro, mismo zócalo de madera oscura, mismo nicho rectangular empotrado en el centro, mismo interruptor blanco a la izquierda con el tubo de cable grapado, misma altura de cámara a la altura del pecho, mismo ángulo frontal, misma luz cálida de lámpara a la derecha. Solo cambia lo que hay DENTRO del nicho, que ahora es el cuadro viejo después de un calentamiento, con el daño MUY visible:

- Una caja de plástico antigua, de color crema amarillento, DEFORMADA por el calor: la tapa está abombada, DERRETIDA y combada en una esquina, con el plástico chamuscado en marrón y negro.
- Interruptores automáticos viejos con la carcasa FUNDIDA, ennegrecida y abombada, algunos con el plástico escurrido y pegado al de al lado; varios con manchas negras de quemado alrededor de los bornes.
- Cables con el aislante DERRETIDO y agrietado, pegados entre sí en una masa, de color marrón oscuro y negro, con el cobre a la vista en varios tramos; algunos cables colgando sueltos y retorcidos.
- HOLLÍN negro y denso en todo el interior de la caja, en el carril y sobre los automáticos, y una mancha grande de hollín que sube por la pared encima del nicho, como una lengua oscura.
- Alguna cinta aislante negra requemada y despegándose.

Nada de fuego, ni llamas, ni humo activo, ni chispas: solo las señales del calentamiento ya pasado. Sin personas, sin herramientas, sin logos, sin ningún texto legible. La franja inferior central sigue siendo zócalo y suelo oscuros y lisos. Que parezca una foto real hecha con un móvil, sin dramatismo de película.
```

**Comprobar al recibirla:**
- Mismo encuadre que la 3.6 (superponlas mentalmente: nicho, interruptor, tubo grapado y zócalo en el mismo sitio).
- El daño se lee **a primera vista, incluso en miniatura**: plásticos chamuscados, cables derretidos, hollín en la caja y en la pared.
- No hay fuego ni humo activo, y no hay texto en ninguna parte.

**Errores típicos:** que solo salga «viejo» y no «peligroso» (reenvía: «mucho más daño: plásticos derretidos y negros, cables fundidos, más hollín en la caja y en la pared»); cambiar el color de la pared o la posición del interruptor; llamas o incendio (no queremos fuego); una luz demasiado fuerte que quema los blancos.

> **Si ChatGPT entrega una sola imagen con las dos (antes y después juntas):** descártala y regenera cada una por separado, pidiendo explícitamente «una única fotografía, no un collage ni dos paneles».

---

### Ficha 3.8 · `trabajo-aire.jpg`

**Dónde sale:** trabajo «Línea eléctrica para aire acondicionado…».

```
Genera una fotografía horizontal 4:3 con el estilo que te he indicado. El salón de un piso español de noche, con la luz de una lámpara de mesa cálida (fuera de cuadro) como única iluminación. En la pared, cerca del techo, una unidad interior de aire acondicionado blanca mate (sin marca, sin logo, sin pantalla con números). Desde la unidad baja por la pared, en vertical, una canaleta eléctrica blanca nueva, recta, con una esquina en ángulo de 90° perfectamente rematada, hasta una caja de mecanismos junto al zócalo; la canaleta se ve limpia y bien fijada, sin cables fuera. La pared es de un gris cálido oscuro y el zócalo, de madera oscura. Un sofá oscuro desenfocado al borde, sin detalles. Composición: la canaleta y la unidad, en el centro de la imagen, con aire alrededor. La franja inferior central es zócalo y suelo oscuros y lisos. Sin personas, sin logos, sin ningún texto legible.
```

**Comprobar al recibirla:**
- La canaleta es continua de la unidad a la caja, con el ángulo limpio.
- La unidad no tiene marca ni números.
- No hay fondo claro ni ventanas con blancos quemados.

**Errores típicos:** logotipo del fabricante; cables sueltos fuera de la canaleta; salón demasiado luminoso y claro; muebles o cuadros con texto.

---

### Ficha 3.9 · `trabajo-diferencial.jpg`

**Dónde sale:** trabajo «Empalme y caja de registro…». Aunque el archivo se llame `-diferencial`, lo que se ve es el empalme bien hecho en una caja de registro.

```
Genera una fotografía horizontal 4:3 con el estilo que te he indicado. Un pasillo de una vivienda española de noche. En la pared, a la altura de los ojos, una caja de registro cuadrada de plástico blanco con la tapa abierta y apoyada a un lado. Dentro de la caja se ve un EMPALME NUEVO y bien hecho: cables azul, marrón y verde-amarillo unidos con tres conectores de palanca transparentes (tipo regleta), con el cobre bien visible dentro de cada conector, los cables limpios, sin cinta y sin empalmes retorcidos. Los cables entran por tubos corrugados grises ordenados. Una mano (solo la mano y la muñeca con manga oscura lisa, SIN cara) sujeta una linterna pequeña que ilumina la caja con una luz cálida; el resto del pasillo queda en penumbra, con la pared gris cálido oscuro y el zócalo de madera oscura. Composición con la caja y el empalme en el centro. La franja inferior central es zócalo y suelo oscuros y lisos. Sin caras, sin logos, sin texto legible.
```

**Comprobar al recibirla:**
- El empalme se entiende: tres conectores, tres colores de cable, sin cinta aislante.
- Los cables entran por los tubos, no salen de la nada.
- Mano correcta y sin texto en ninguna parte.

**Errores típicos:** empalmes retorcidos con cinta aislante (es lo contrario de lo que queremos); caja americana metálica; linterna con marca; pasillo iluminado y claro.

---

### Ficha 3.10 · `empresa-furgoneta.jpg`

**Dónde sale:** `/empresa`.

```
Genera una fotografía horizontal 4:3 con el estilo que te he indicado. Una furgoneta comercial blanca, de tamaño medio, SIN ROTULAR (carrocería completamente lisa, sin pegatinas, sin logos, sin números de teléfono), aparcada de noche en una calle de una ciudad española, bajo una farola de luz cálida que la ilumina desde arriba y deja el resto de la calle en penumbra. Al fondo, fachadas de cuatro o cinco plantas con balcones y alguna ventana encendida, muy desenfocadas y sin carteles. Vista en 3/4 desde atrás, a la altura de los ojos, con la furgoneta en el centro de la imagen y aire alrededor. Matrícula no visible o desenfocada. Las puertas traseras están cerradas (o apenas entreabiertas, mostrando una caja de herramientas gris oscura lisa). El asfalto, mojado y oscuro, refleja la luz de la farola. Nadie a la vista. La franja inferior central es asfalto oscuro liso. Sin caras, sin logos, sin ningún texto legible (ni en carteles, ni en tiendas, ni en señales del fondo), sin blancos quemados en los bordes: la carrocería blanca recibe la luz de la farola pero conserva detalle.
```

**Comprobar al recibirla:**
- La furgoneta es blanca y lisa: ni rótulos ni logo del fabricante legible.
- Matrícula ilegible o ausente; sin carteles del fondo con texto.
- La carrocería no está quemada de blanco.

**Errores típicos:** logotipo del fabricante en la parrilla o la puerta; matrícula nítida; calle de aspecto americano; farola demasiado fuerte que quema el techo de la furgoneta (pide «luz de farola más suave»).

---

## 4. Revisión rápida antes de entregar a Claude

Para las 10: sin caras, sin logos, sin texto legible, fondo oscuro con luz cálida, sin blancos quemados en los bordes, motivo centrado con margen y franja inferior central limpia. Proporciones: 3.1 en 16:9 (con el motivo en la columna central), 3.3, 3.4 y 3.5 en 1:1, el resto en 4:3. Para la pareja 3.6 / 3.7: mismo encuadre, y el «antes» con el daño visible a primera vista y sin fuego. Si alguna falla, regenera con una instrucción corta y concreta («quita todo el texto de los interruptores», «mismo encuadre que la imagen anterior», «más oscuro, sin blancos quemados»).

---

## 5. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1448×1086 (4:3) o de 1254×1254 (1:1)**. Las fichas 4:3 y 1:1 se piden directamente en su proporción y no hace falta recortar nada.
- **La ficha 3.1 (16:9):** pide **horizontal** y, si ChatGPT entrega 3:2 o 4:3 en vez de 16:9, **Claude recortará** a 16:9 por el centro al convertirla (por eso el motivo va en la columna central y la franja inferior central queda libre). El recorte 4:5 de móvil lo hace la web con CSS sobre la misma foto.
- Los recortes conservan el centro, así que no pongas nada importante en los bordes superior e inferior ni en las esquinas (el contorno orgánico los come igualmente).
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**) con el **nombre exacto** de la tabla de §1, en `public/ejemplo/` del template.
- Después actualiza `CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)») y comprueba que cada `alt` de `site.config.ts` describe lo que se ve.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente. La web las marca con la etiqueta «Foto de ejemplo».
