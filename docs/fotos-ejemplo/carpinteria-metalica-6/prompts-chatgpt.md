# Prompts de ChatGPT · fotos de ejemplo de `carpinteria-metalica-6` «Fachada nueva»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto. Las excepciones son las **cuatro parejas antes/después** (6.1 + 6.2, 6.3 + 6.4, 6.5 + 6.6 y 6.7 + 6.8). Cada pareja va en **su** conversación, y dentro de ella se pide **primero el después y luego el antes**: el antes se saca del después cambiando solo carpinterías, persianas y cierros. En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Guarda cada resultado como `6.<m>.png` (por ejemplo `6.1.png`) en `andrei-leads-tech/material/fotos-ejemplo/carpinteria-metalica-6/`. Después pásaselas a Claude, que las convierte (ver §4).

**Concepto del template:** «Fachada nueva» es la web de un taller de aluminio y PVC de Sevilla (fabricación propia en Dos Hermanas), tipo proyecto, que vende el **cambio de ventanas, persianas y cierros sin obra**. La estrella es el **antes/después de fachadas**: un deslizador en el hero y en cada trabajo. Es una web **clara y luminosa**: fondo de cal (`#fbfaf6`), texto tinta verdosa (`#1c2420`), primario **verde persiana** (`#0e7a5c`) y acento **albero** (`#f0b23a`) en la pastilla «Después». Su ficha de estilo es **documental de calle**: fachadas residenciales andaluzas de ladrillo visto y revoco de los años 60 a 80, desde la acera de enfrente, a **media mañana con sol en diagonal**, color natural, blancos cálidos de cal y cielo azul limpio poco saturado. Sin personas reconocibles: como mucho, un peatón desenfocado de espaldas.

**Registro:** todas son **fotos de móvil**. Las fachadas las hace Antonio, el dueño, con su iPhone desde la acera de enfrente: una el día que va a medir (el antes) y otra el día que terminan (el después), **desde el mismo sitio y a la misma hora**, con el modo de **35 mm** de la cámara principal del iPhone. La ligera contrapicada se deja tal cual, sin corregir, como sale al levantar el móvil. Las de los servicios y del taller son igual de directas. Lo que da calidad es el sol de media mañana y que la fachada salga recta y centrada.

**Verde y color primario:** el primario de la web es verde. El **toldo verde** que pide la ficha sale **verde botella apagado y descolorido por el sol**, nunca el verde vivo de la web. Tampoco hay persianas, puertas ni carpinterías verdes. Así, si el cliente cambia su color, las fotos siguen funcionando. El albero (ocre) no se busca: si sale tierra o arena, que sea poca y apagada.

Cosas propias de este template:

- **Etiquetas dentro de la foto:**
  - «Imagen generada con IA»: una pastilla blanca **abajo a la izquierda**, a 10 px del borde. Esa esquina tiene que ser acera, zócalo o asfalto lisos, sin detalle.
  - En los pares, además, las pastillas «Antes» (arriba a la izquierda) y «Después» (arriba a la derecha). Por eso las **esquinas de arriba** de las fachadas van con cielo o con revoco liso, nunca con una ventana.
- **Fachadas (6.1–6.9):** se piden **verticales 4:5** y se usan a dos tamaños:
  - En las tarjetas de `/trabajos` y de la home salen enteras, a 4:5.
  - En el **hero** y en la página de cada trabajo, el deslizador se recorta a **4:3**: la web se queda con la franja central del alto (del 20 al 80 %).
  - Por eso **las ventanas que cambian van entre el 20 y el 80 % del alto**. Arriba, la cornisa y un poco de cielo. Abajo, la planta baja y la acera.
- **Antes y después** (cuatro parejas): mismo punto, misma altura, mismo encuadre y **misma luz y hora**. En el antes cambia **solo** lo que el taller sustituye: ventanas, persianas, cierros y aparatos de aire. El ladrillo, el revoco, los balcones, las macetas y el toldo se quedan igual. El desgaste tiene que verse **mucho**, porque la web vende el cambio.
- **Servicios (6.10–6.14):** se piden en **4:3** y se usan así. La 6.10 (cambio de ventanas) es la **imagen de Open Graph**: la vista previa al compartir la web por WhatsApp.
- **`/empresa` (6.15 y 6.16):** se piden en 4:3 y Claude las recorta a **3:2**.

**Alt y material:** cuando la tabla de `CREDITOS.md` y el `alt` de `site.config.ts` no coinciden, manda el `alt`, porque es lo que se lee en la web. Pasa en tres fotos:

- 6.5: PVC **blanco**, no gris antracita.
- 6.9: aluminio **gris**, no blanco.
- 6.14: portal de aluminio **gris**, no negro.

Ubicación de los datos de ejemplo: Sevilla y el Aljarafe (Dos Hermanas, Nervión, Mairena del Aljarafe, Alcalá de Guadaíra, Tomares). Arquitectura residencial corriente, sin monumentos, rótulos de comercios ni números de portal legibles.

Cada fachada cambia de tipo de edificio, material, color de carpintería, ángulo del sol y calle, para que la serie no parezca nueve veces el mismo bloque.

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Pedir en | Registro |
|---|---|---|---|---|
| 6.1 | `fachada-01-despues.jpg` | **Después (foto ancla):** bloque de cuatro alturas de ladrillo visto y revoco en Dos Hermanas, doce ventanas nuevas de PVC blanco con persianas grises, macetas y un toldo | 4:5 | Móvil (dueño, acera) |
| 6.2 | `fachada-01-antes.jpg` | **Antes:** el mismo bloque con aluminio blanco amarillento, persianas de lamas rotas y dos aparatos de aire | 4:5 | Móvil (dueño, acera) |
| 6.3 | `fachada-02-despues.jpg` | **Después:** primer piso de ladrillo en Nervión con un cierro nuevo de aluminio blanco y macetas detrás | 4:5 | Móvil (dueño, acera) |
| 6.4 | `fachada-02-antes.jpg` | **Antes:** el mismo balcón con un cierro de hierro oxidado y un cristal rayado | 4:5 | Móvil (dueño, acera) |
| 6.5 | `fachada-03-despues.jpg` | **Después:** casa encalada de dos plantas en Mairena del Aljarafe con nueve ventanas de PVC blanco | 4:5 | Móvil (dueño, acera) |
| 6.6 | `fachada-03-antes.jpg` | **Antes:** la misma casa con aluminio anodizado bronce y persianas de PVC descoloridas | 4:5 | Móvil (dueño, acera) |
| 6.7 | `fachada-04-despues.jpg` | **Después:** fachada de un piso en Alcalá de Guadaíra con cinco persianas nuevas de aluminio gris a media altura | 4:5 | Móvil (dueño, acera) |
| 6.8 | `fachada-04-antes.jpg` | **Antes:** las mismas ventanas con persianas de lamas rotas, una caída del todo | 4:5 | Móvil (dueño, acera) |
| 6.9 | `fachada-05.jpg` | Azotea de un adosado en Tomares cerrada con aluminio gris y vidrio, desde la calle (sin antes) | 4:5 | Móvil (dueño, acera) |
| 6.10 | `servicio-cambio-ventanas.jpg` | Plano medio de una ventana nueva de PVC blanco en una fachada de ladrillo visto | 4:3 | Móvil (dueño, calle) |
| 6.11 | `servicio-cierros.jpg` | Cierro de balcón de aluminio blanco en un primer piso, con macetas tras el cristal | 4:3 | Móvil (dueño, calle) |
| 6.12 | `servicio-persianas.jpg` | Tres persianas grises de aluminio a medio bajar en una fachada al sol | 4:3 | Móvil (dueño, calle) |
| 6.13 | `servicio-comunidad.jpg` | Bloque de cinco alturas con todas las ventanas blancas iguales | 4:3 | Móvil (dueño, calle) |
| 6.14 | `servicio-portal.jpg` | Puerta de portal de aluminio gris y vidrio, sin número ni rótulo | 4:3 | Móvil (dueño, calle) |
| 6.15 | `taller-nave.jpg` | Nave del taller con perfiles en estanterías y una mesa de corte con virutas, luz de lucernario | 4:3 (se recorta a 3:2) | Móvil (dueño, taller) |
| 6.16 | `taller-furgoneta.jpg` | Furgoneta blanca sin rotular, de espaldas, con perfiles en la baca, frente a la nave | 4:3 (se recorta a 3:2) | Móvil (dueño, polígono) |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque).

```
Voy a pedirte una fotografía para la web de ejemplo de un taller de ventanas, persianas y cierros de aluminio y PVC de Sevilla (España). Estas reglas valen para toda la serie. La escena concreta (quién hace la foto, edificio, luz y composición) te la doy en el siguiente mensaje y manda sobre cualquier costumbre: síguela al pie de la letra.

QUÉ TIPO DE FOTO ES
- Foto de MÓVIL hecha con un iPhone (16, 17 o 18), no de un fotógrafo. La hace el dueño del taller para enseñar en su web cómo quedan las fachadas cuando cambian ventanas, persianas y cierros.
- Cámara principal del iPhone en su modo de 35 mm, modo foto estándar, sin modo retrato ni filtros. Procesado típico de móvil: nítido, natural, sin retoque.
- Las fachadas, desde la ACERA DE ENFRENTE, a la altura de los ojos, con el móvil algo levantado: una LIGERA CONTRAPICADA natural, con las verticales un poco convergentes, sin corregir del todo. Fachada de frente y centrada.

LUZ Y COLOR
- Día despejado a MEDIA MAÑANA. El sol da en DIAGONAL sobre la fachada y los balcones dejan sombras suaves pero presentes.
- Color natural y luminoso: blancos cálidos de cal, ladrillo con su tono real y cielo azul limpio, poco saturado.

MATERIA
- Arquitectura residencial corriente de Sevilla y su área (bloques y casas de los años 60 a 80): ladrillo visto, revoco, cal, rejas, balcones con macetas, cableado de fachada, desagües. Real y vivida, sin maquillar.
- Carpinterías nuevas: PVC o aluminio blanco o gris, persianas térmicas de aluminio y cierros de aluminio con vidrio.
- Carpinterías viejas (en los "antes"): aluminio blanco amarillento o anodizado bronce, persianas de lamas rotas, cierros de hierro oxidados y aparatos de aire acondicionado.

PROHIBIDO
- Hora dorada, atardecer, cielo dramático, nubes de tormenta, cielo muy saturado.
- Interiores de viviendas.
- Personas reconocibles o caras. Como mucho, un peatón desenfocado de espaldas. Reflejos del fotógrafo o del móvil en los cristales.
- Matrículas, rótulos de comercios, números de portal, placas de calle, logos o cualquier texto legible.
- Aspecto de cine, HDR exagerado, viñeteado, filtros, render 3D, banco de imágenes, foto de catálogo inmobiliario.
- Arquitectura que no sea española, y capturas de Street View.
- Toldos, persianas, puertas o carpinterías de un verde vivo (si hay un toldo verde, verde botella apagado y descolorido por el sol).
- Collage o varios paneles: una única fotografía.

COMPOSICIÓN
- El motivo en el CENTRO, con aire alrededor.
- La ESQUINA INFERIOR IZQUIERDA lisa (acera, zócalo o asfalto, sin detalle): ahí la web pone una etiqueta.
- La proporción la indica cada escena.

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 6.1 · `fachada-01-despues.jpg` (el «después», foto ancla)

**Dónde sale:** es la foto principal del template. Sale en el **hero** (deslizador recortado a 4:3, a la derecha en escritorio; es lo primero que se ve) y en el trabajo «Ventanas de un bloque en Dos Hermanas» (tarjeta a 4:5 y deslizador a 4:3 en su página). **Va en la misma conversación que la ficha 6.2.** Genera esta primera y NO cambies de conversación.

```
Fotografía vertical 4:5, una única imagen. Es el "DESPUÉS" del cambio de todas las ventanas de un bloque de pisos en Dos Hermanas (Sevilla).

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la acera de enfrente, a media mañana, el día que terminan la obra, para enseñarla en su web junto al "antes".

ENCUADRE FIJO (lo repetiré en la versión "antes"): de frente al bloque, desde la acera de enfrente, a la altura de los ojos, con una ligera contrapicada. Cuatro anclajes que no se moverán:
1. Un bloque de CUATRO ALTURAS de los años 70, centrado: la planta baja de revoco crema con un portal de aluminio sin número legible, y las tres plantas de arriba de LADRILLO VISTO rojizo.
2. Doce ventanas en total, en tres plantas de cuatro ventanas, con dos BALCONES con barandilla de hierro en la planta primera.
3. En uno de los balcones, MACETAS con geranios. En la segunda planta a la derecha, un TOLDO verde botella apagado y descolorido, medio recogido.
4. Arriba, la cornisa del edificio y una franja de cielo azul limpio. Abajo, la acera y el borde de la calzada.

LUZ FIJA: media mañana, sol en diagonal desde la izquierda: las barandillas y los alféizares dejan sombras suaves hacia la derecha.

DESPUÉS: las doce ventanas son NUEVAS de PVC BLANCO, todas iguales, con PERSIANAS TÉRMICAS de aluminio GRIS medio, unas subidas y otras a media altura. Cristales limpios, sin reflejos de personas. Alféizares limpios, ningún aparato de aire acondicionado en la fachada.

COMPOSICIÓN (la web recorta esta foto a 4:3 quedándose con la franja central del alto):
- Las doce ventanas, entre el 20 y el 80 % del alto.
- Las esquinas de ARRIBA, cielo o ladrillo liso, sin ventanas (ahí van las pastillas "Antes" y "Después").
- La esquina inferior izquierda, acera lisa.
- Sin personas, sin coches aparcados delante, sin números de portal ni rótulos.
```

---

### Ficha 6.2 · `fachada-01-antes.jpg` (el «antes»)

**Dónde sale:** el «Antes» del deslizador del hero y del trabajo de Dos Hermanas. **Misma conversación que la 6.1.** El desgaste tiene que verse **mucho**.

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo dueño con su iPhone el día que fue a medir, desde el mismo sitio de la acera y a la misma hora.

MISMO ENCUADRE y mismos cuatro anclajes: el bloque de cuatro alturas centrado, con la planta baja de revoco crema y el portal, y las tres plantas de ladrillo visto rojizo; las doce ventanas en el mismo sitio, con los dos balcones de barandilla de hierro en la planta primera; las mismas macetas con geranios y el mismo toldo verde botella apagado en la segunda planta a la derecha; la cornisa con la franja de cielo arriba y la acera abajo. MISMA LUZ: media mañana, sol en diagonal desde la izquierda.

Solo cambian las ventanas y lo que cuelga de ellas, con el desgaste MUY visible:
- Ventanas viejas de ALUMINIO BLANCO AMARILLENTO, con los marcos sucios y alguna goma negra salida.
- PERSIANAS de lamas de PVC envejecidas, de tonos distintos de una ventana a otra: en varias faltan LAMAS o están ROTAS, y una persiana se ha quedado TORCIDA, más baja de un lado.
- DOS APARATOS de AIRE ACONDICIONADO colgados de la fachada bajo dos ventanas, con la mancha de agua que dejan en el ladrillo.
- Suciedad real en los alféizares: churretes oscuros bajo cada ventana.
La fachada se ve algo más apagada por esa suciedad, no por un filtro.

Sin texto, sin logos.
```

---

### Ficha 6.3 · `fachada-02-despues.jpg` (el «después»)

**Dónde sale:** trabajo «Cierro nuevo en Nervión»: tarjeta a 4:5 y deslizador a 4:3 en su página. **Va en la misma conversación que la ficha 6.4.** Genera esta primera.

```
Fotografía vertical 4:5, una única imagen. Es el "DESPUÉS" del cambio de un cierro (mirador acristalado andaluz) en un primer piso del barrio de Nervión (Sevilla).

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la acera de enfrente de una calle estrecha, a media mañana, el día que lo dejan montado.

ENCUADRE FIJO (lo repetiré en la versión "antes"): de frente, desde la acera de enfrente, algo más cerca que de costumbre por ser una calle estrecha, con la contrapicada de mirar a un primer piso. Cuatro anclajes que no se moverán:
1. Un edificio de tres plantas de LADRILLO VISTO anaranjado, del que se ve la planta baja y la primera entera, y el arranque de la segunda arriba.
2. En el centro de la primera planta, el CIERRO: un mirador volado sobre una losa de balcón, de unos dos metros de ancho.
3. A la izquierda del cierro, una ventana con reja de hierro negra. A la derecha, una bajante de agua gris que baja por la fachada.
4. En la planta baja, una puerta de madera cerrada y un zócalo de azulejo liso de un solo color, sin dibujos ni texto.

LUZ FIJA: media mañana, sol en diagonal desde la derecha, que entra en la calle estrecha y deja la losa del balcón dibujando una sombra suave sobre la planta baja.

DESPUÉS: el cierro es NUEVO, de ALUMINIO BLANCO con VIDRIO limpio, en paños verticales, con su tejadillo de aluminio arriba. Detrás del cristal se ven MACETAS con plantas verdes y una buganvilla. Ni rastro de óxido.

COMPOSICIÓN (la web recorta esta foto a 4:3 quedándose con la franja central del alto):
- El cierro, entre el 25 y el 70 % del alto y en el centro del ancho.
- Las esquinas de ARRIBA, ladrillo liso, sin ventanas.
- La esquina inferior izquierda, acera lisa.
- Sin personas, sin coches, sin números de portal ni rótulos.
```

---

### Ficha 6.4 · `fachada-02-antes.jpg` (el «antes»)

**Dónde sale:** el «Antes» del trabajo de Nervión, en el deslizador. **Misma conversación que la 6.3.**

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo dueño con su iPhone el día que fue a medir, desde el mismo sitio y a la misma hora.

MISMO ENCUADRE y mismos cuatro anclajes: el edificio de ladrillo visto anaranjado; el cierro en el centro de la primera planta, volado sobre la losa del balcón; la ventana con reja negra a la izquierda y la bajante gris a la derecha; la puerta de madera y el zócalo de azulejo liso en la planta baja. MISMA LUZ: media mañana, sol en diagonal desde la derecha.

Solo cambia el cierro, con el desgaste MUY visible:
- Un cierro VIEJO de HIERRO pintado de negro, con la pintura levantada y ÓXIDO naranja que chorrea desde la BASE hasta la losa del balcón, dejando manchas en el canto.
- Uno de los cristales RAYADO y opaco, y otro con una esquina rota tapada con cinta.
- Un tejadillo de chapa abollado.
- Detrás del cristal, las mismas macetas, pero se ven peor por la suciedad del vidrio.

Sin texto, sin logos.
```

---

### Ficha 6.5 · `fachada-03-despues.jpg` (el «después»)

**Dónde sale:** trabajo «Casa en Mairena del Aljarafe»: tarjeta a 4:5 y deslizador a 4:3 en su página. **Va en la misma conversación que la ficha 6.6.** Genera esta primera.

```
Fotografía vertical 4:5, una única imagen. Es el "DESPUÉS" del cambio de todas las ventanas de una casa de dos plantas en Mairena del Aljarafe (Sevilla).

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la acera de enfrente de una calle tranquila de casas bajas, a media mañana, al terminar.

ENCUADRE FIJO (lo repetiré en la versión "antes"): de frente a la casa, desde la acera de enfrente, con una ligera contrapicada. Cuatro anclajes que no se moverán:
1. Una casa ENCALADA en blanco de DOS PLANTAS, centrada, con un zócalo gris claro de revoco y un pretil con tejas árabes arriba.
2. NUEVE ventanas: cinco en la planta de arriba y cuatro abajo, más la puerta de la calle de madera en el centro de la planta baja.
3. A la izquierda de la puerta, una maceta grande con un limonero pequeño. Sobre la puerta, un farol de hierro apagado.
4. Arriba, el pretil y una franja ancha de cielo azul limpio. Abajo, la acera de losetas y el bordillo.

LUZ FIJA: media mañana, sol en diagonal desde la izquierda: la cal brilla cálida y las rejas dejan sombras suaves.

DESPUÉS: las nueve ventanas son NUEVAS de PVC BLANCO, con PERSIANAS de aluminio BLANCAS a juego, la mayoría a media altura. Rejas de hierro negras, limpias, delante de las ventanas de abajo. Todo recto y limpio.

COMPOSICIÓN (la web recorta esta foto a 4:3 quedándose con la franja central del alto):
- Las nueve ventanas, entre el 25 y el 75 % del alto.
- Las esquinas de ARRIBA, cielo liso.
- La esquina inferior izquierda, acera lisa.
- Sin personas, sin coches, sin números de casa ni rótulos.
```

---

### Ficha 6.6 · `fachada-03-antes.jpg` (el «antes»)

**Dónde sale:** el «Antes» del trabajo de Mairena, en el deslizador. **Misma conversación que la 6.5.**

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo dueño con su iPhone el día que fue a medir, desde el mismo sitio y a la misma hora.

MISMO ENCUADRE y mismos cuatro anclajes: la casa encalada de dos plantas centrada, con el zócalo gris y el pretil con tejas árabes; las nueve ventanas en el mismo sitio y la puerta de madera en el centro de abajo; la maceta con el limonero y el farol de hierro; el cielo arriba y la acera de losetas abajo. MISMA LUZ: media mañana, sol en diagonal desde la izquierda.

Solo cambian las ventanas y sus persianas, con el desgaste MUY visible:
- Ventanas viejas de ALUMINIO ANODIZADO BRONCE (marrón oscuro metálico), con el anodizado gastado y blanquecino a trozos.
- PERSIANAS de PVC DESCOLORIDAS por el sol, de un beis amarillento distinto en cada ventana, con lamas combadas.
- En dos ventanas de arriba, la persiana bajada del todo y sucia.
- Bajo los alféizares, la cal manchada de gris por el agua.
La fachada se ve algo más apagada por esa suciedad, no por un filtro.

Sin texto, sin logos.
```

---

### Ficha 6.7 · `fachada-04-despues.jpg` (el «después»)

**Dónde sale:** trabajo «Persianas en Alcalá de Guadaíra»: tarjeta a 4:5 y deslizador a 4:3 en su página. **Va en la misma conversación que la ficha 6.8.** Genera esta primera.

```
Fotografía vertical 4:5, una única imagen. Es el "DESPUÉS" del cambio de las persianas de un piso en Alcalá de Guadaíra (Sevilla).

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la acera de enfrente, a media mañana, cuando terminan de montar las persianas con motor.

ENCUADRE FIJO (lo repetiré en la versión "antes"): de frente a un tramo de fachada de un bloque de REVOCO ocre claro, desde la acera de enfrente, más cerca que en un bloque entero: se ven dos plantas y media. Cuatro anclajes que no se moverán:
1. Las CINCO ventanas del piso, en fila en la misma planta, en el centro de la imagen: tres a la izquierda y dos a la derecha de un balcón estrecho con barandilla de hierro.
2. En la planta de arriba, el borde inferior de otras ventanas con persianas de vecinos, ya fuera de la obra.
3. En el balcón, un tendedero plegado y una maceta con un potus.
4. Abajo, una franja de la planta inferior con su cableado de fachada en grapas.

LUZ FIJA: media mañana, sol en diagonal desde la derecha.

DESPUÉS: las cinco persianas son NUEVAS de ALUMINIO TÉRMICO GRIS medio, todas a la MISMA altura, a media ventana, con las lamas rectas y sus guías nuevas. Los cajones de persiana, limpios.

COMPOSICIÓN (la web recorta esta foto a 4:3 quedándose con la franja central del alto):
- La fila de las cinco ventanas, entre el 30 y el 65 % del alto.
- Las esquinas de ARRIBA, revoco liso.
- La esquina inferior izquierda, revoco o acera lisos.
- Sin personas, sin números ni rótulos.
```

---

### Ficha 6.8 · `fachada-04-antes.jpg` (el «antes»)

**Dónde sale:** el «Antes» del trabajo de Alcalá, en el deslizador. **Misma conversación que la 6.7.**

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo dueño con su iPhone el día que fue a medir, desde el mismo sitio y a la misma hora.

MISMO ENCUADRE y mismos cuatro anclajes: el tramo de fachada de revoco ocre claro con las cinco ventanas en fila en el centro, tres a la izquierda y dos a la derecha del balcón estrecho con barandilla; el borde de las ventanas de los vecinos arriba; el tendedero plegado y la maceta con el potus en el balcón; el cableado de fachada abajo. MISMA LUZ: media mañana, sol en diagonal desde la derecha.

Solo cambian las persianas, con el desgaste MUY visible:
- Persianas viejas de LAMAS de PVC blanco amarillento, cada una a una altura distinta.
- En tres de ellas faltan LAMAS o están PARTIDAS, dejando huecos.
- Una persiana se ha CAÍDO del todo y está desenrollada de lado, colgando torcida de una guía.
- Las guías, sucias y con churretes en el revoco debajo.

Sin texto, sin logos.
```

---

### Ficha 6.9 · `fachada-05.jpg`

**Dónde sale:** trabajo «Azotea cerrada en Tomares» (sin antes): tarjeta a 4:5 y foto a 4:3 en su página. Lo importante, entre el 20 y el 80 % del alto.

```
Fotografía vertical 4:5, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la calle, a media mañana, cuando dejan terminado el cerramiento de la azotea de un adosado en Tomares (Sevilla).

PLANO: desde la acera de enfrente, con una contrapicada algo más marcada que de costumbre, porque la azotea está arriba.

LO QUE CUENTA LA HISTORIA: un ADOSADO de dos plantas de los años 90, de revoco blanco con un zócalo de ladrillo visto, en una fila de adosados iguales (los vecinos, cortados a los lados). En la AZOTEA, encima de la segunda planta, un CERRAMIENTO NUEVO de ALUMINIO GRIS y VIDRIO: un cuarto acristalado de paños correderos con su techo plano, que ocupa media azotea. Por el vidrio se intuye una mesa y unas sillas plegadas, sin detalle. En las plantas de abajo, ventanas con persianas a media altura y una buganvilla subiendo por la esquina.

LUZ: media mañana, sol en diagonal desde la izquierda; el vidrio refleja un poco el cielo, sin reflejos de personas.

COMPOSICIÓN:
- El cerramiento de la azotea, entre el 20 y el 50 % del alto y en el centro del ancho, con una franja de cielo azul limpio encima.
- La esquina inferior izquierda, acera lisa.
- Sin personas, sin coches, sin números de casa ni rótulos.
```

---

### Ficha 6.10 · `servicio-cambio-ventanas.jpg`

**Dónde sale:** tarjeta y ficha del servicio «Cambio de ventanas», a 4:3. También es la **imagen de Open Graph** (la vista previa al compartir el enlace por WhatsApp).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la calle, a media mañana, para la ficha del servicio de cambio de ventanas: una ventana recién puesta, vista de cerca.

PLANO: plano medio de UNA ventana de un primer piso, desde la acera, frontal y con una ligera contrapicada.

LO QUE CUENTA LA HISTORIA: una VENTANA NUEVA de PVC BLANCO de dos hojas, en una fachada de LADRILLO VISTO rojizo, con su alféizar de piedra artificial claro y una REJA de hierro negra delante. La persiana térmica de aluminio gris, subida a tres cuartos. El sellado blanco perfecto alrededor del marco. A los lados, ladrillo; arriba, el cajón de persiana tapado y limpio. Detrás del cristal, una cortina clara cerrada, sin interior a la vista.

LUZ: media mañana, sol en diagonal desde la izquierda; la reja deja una sombra suave sobre el cristal y el alféizar.

COMPOSICIÓN: la ventana en el centro, con ladrillo alrededor. La esquina inferior izquierda, ladrillo liso en penumbra suave. Sin personas, sin reflejos del fotógrafo, sin texto.
```

---

### Ficha 6.11 · `servicio-cierros.jpg`

**Dónde sale:** tarjeta y ficha del servicio «Cierros», a 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la calle, a media mañana, para la ficha del servicio de cierros: un cierro terminado en una casa de Sevilla.

PLANO: desde la acera de enfrente, con la contrapicada de mirar a una primera planta, en ligera diagonal (no del todo frontal, para que se vea el vuelo del cierro).

LO QUE CUENTA LA HISTORIA: en la primera planta de una casa ENCALADA en blanco con el recercado de las ventanas pintado de albero apagado, un CIERRO de ALUMINIO BLANCO y vidrio, volado sobre el balcón, con su tejadillo. Tras el cristal, MACETAS con gitanillas y una aspidistra. Debajo, el canto del balcón y una parte de la puerta de la calle. A un lado, una ventana con reja.

LUZ: media mañana, sol en diagonal desde la derecha: el cierro dibuja su sombra sobre la cal.

COMPOSICIÓN: el cierro en el centro. Las esquinas, cal o cielo lisos. La esquina inferior izquierda, cal lisa. Sin personas, sin números de casa ni rótulos.
```

---

### Ficha 6.12 · `servicio-persianas.jpg`

**Dónde sale:** tarjeta y ficha del servicio «Persianas», a 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la calle, a media mañana, para la ficha del servicio de persianas.

PLANO: desde la acera de enfrente, frontal, de un tramo de fachada.

LO QUE CUENTA LA HISTORIA: TRES ventanas seguidas de una misma planta en una fachada de REVOCO blanco roto, con TRES PERSIANAS TÉRMICAS de aluminio GRIS, nuevas, BAJADAS A MEDIA ALTURA y a la misma altura las tres, con las lamas rectas y las guías limpias. Debajo de cada ventana, un alféizar de piedra clara. Un poco de ladrillo visto en el zócalo de la planta de abajo, cortado en el borde inferior de la imagen.

LUZ: sol en diagonal desde la izquierda, fuerte de media mañana: las lamas brillan un poco y dejan una línea de sombra sobre el cristal.

COMPOSICIÓN: las tres ventanas en el centro, en fila horizontal. La esquina inferior izquierda, revoco liso. Sin personas, sin texto.
```

---

### Ficha 6.13 · `servicio-comunidad.jpg`

**Dónde sale:** tarjeta y ficha del servicio «Comunidades de vecinos», a 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde el otro lado de una avenida, a media mañana, al terminar de cambiar todas las ventanas de una comunidad de vecinos.

PLANO: el bloque entero, desde la acera de enfrente de una avenida ancha, con la contrapicada natural de mirar un edificio alto (verticales algo convergentes).

LO QUE CUENTA LA HISTORIA: un BLOQUE de CINCO ALTURAS de los años 70 de REVOCO crema con franjas horizontales de ladrillo visto entre plantas. TODAS las ventanas son iguales: PVC BLANCO con persianas grises, la mayoría a media altura, y se ven ordenadas en una cuadrícula regular. En algunos balcones, macetas y un tendedero. En la planta baja, un portal de aluminio y vidrio sin número legible y dos persianas de local cerradas, sin rótulos. Delante, unos naranjos de la avenida que tapan solo la planta baja.

LUZ: media mañana, sol en diagonal desde la derecha.

COMPOSICIÓN: el bloque centrado, con una franja de cielo azul limpio arriba. La esquina inferior izquierda, copa de naranjo en sombra o acera lisa. Sin personas reconocibles, sin coches en primer plano, sin rótulos ni números.
```

---

### Ficha 6.14 · `servicio-portal.jpg`

**Dónde sale:** tarjeta y ficha del servicio «Puertas de portal», a 4:3.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño del taller con su iPhone desde la acera, a media mañana, al dejar montada la puerta nueva del portal de una comunidad.

PLANO: frontal a la puerta, a la altura de los ojos, desde unos cuatro metros.

LO QUE CUENTA LA HISTORIA: una PUERTA de PORTAL NUEVA de ALUMINIO GRIS medio con grandes paños de VIDRIO, de dos hojas, una fija y una practicable con una barra tirador vertical de acero. Encima, un montante de vidrio. A su alrededor, el recercado de piedra artificial clara y la fachada de ladrillo visto a los lados. Al lado de la puerta, en la pared, un portero automático liso, sin nombres ni números. Por el vidrio, el zaguán en penumbra con el suelo de terrazo, sin detalle.

LUZ: media mañana; el portal queda en una sombra suave del vuelo del balcón de arriba, con la luz del sol bañando la acera.

COMPOSICIÓN: la puerta en el centro. La esquina inferior izquierda, acera lisa. Sin números de portal, sin rótulos, sin nombres en el portero, sin reflejos del fotógrafo en el vidrio.
```

---

### Ficha 6.15 · `taller-nave.jpg`

**Dónde sale:** `/empresa`, a 3:2. Se pide en 4:3 y Claude la recorta por arriba y por abajo: lo importante, entre el 15 y el 85 % del alto.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone dentro de su nave de Dos Hermanas, a media mañana, un día normal de trabajo, para la página "Quiénes somos" de su web.

PLANO: desde una esquina de la nave, a la altura de los ojos, abarcando el fondo.

LO QUE CUENTA LA HISTORIA: una nave de taller de aluminio y PVC, ordenada pero usada. A la izquierda, ESTANTERÍAS metálicas con PERFILES de aluminio y PVC blancos y grises apilados en horizontal. En el centro, una MESA DE CORTE con una tronzadora de disco, VIRUTAS de aluminio en el suelo y en la mesa. Al fondo, ventanas a medio montar apoyadas en un caballete. Sin personas.

LUZ: luz de día que entra desde arriba por los LUCERNARIOS del techo, suave y algo cenital, más los tubos fluorescentes encendidos. Nada de rayos de luz con polvo flotando.

COMPOSICIÓN: la mesa de corte en el centro. La esquina inferior izquierda, suelo de hormigón liso. Sin logos de máquinas ni marcas en los perfiles, sin carteles, sin texto.
```

---

### Ficha 6.16 · `taller-furgoneta.jpg`

**Dónde sale:** `/empresa`, a 3:2. Se pide en 4:3 y Claude la recorta por arriba y por abajo: lo importante, entre el 15 y el 85 % del alto.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace el dueño con su iPhone en la calle del polígono, delante de la nave, a primera hora de la mañana, con la furgoneta ya cargada para salir a una obra.

PLANO: la furgoneta de ESPALDAS y algo de lado (en tres cuartos trasero), desde unos seis metros, a la altura de los ojos.

LO QUE CUENTA LA HISTORIA: una FURGONETA blanca mediana, SIN ROTULAR, aparcada de espaldas junto a la acera. En la BACA, PERFILES de aluminio largos atados con cinchas. Las puertas traseras cerradas. Al fondo, la fachada de chapa gris de una nave de polígono con su puerta seccional subida (dentro, penumbra sin detalle). En el suelo, el asfalto y un bordillo.

MATRÍCULA: la placa trasera NO se ve. Delante de la parte baja de la furgoneta, en primer plano y desenfocado, hay un palé con perfiles envueltos en film que tapa el parachoques y la placa. Si aun así se viera, que sea una placa lisa en blanco, sin letras ni números.

LUZ: mañana despejada, sol en diagonal desde la izquierda.

COMPOSICIÓN: la furgoneta en el centro. La esquina inferior izquierda, asfalto liso. Sin rótulos en la nave ni en la furgoneta, sin marcas de coche visibles, sin personas.
```

---

## 4. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1122×1402 (4:5)** o **de 1448×1086 (4:3)**.
- **Fachadas (6.1–6.9):** se quedan en **4:5** (1122×1402). La web las recorta a 4:3 en el hero y en la página de cada trabajo. En cada pareja, Claude comprueba que el antes y el después tienen **el mismo tamaño y encuadre**. Si ChatGPT entrega uno con un píxel de más, lo ajusta al tamaño de su pareja.
- **Servicios (6.10–6.14):** se quedan en **4:3** (1448×1086).
- **Taller (6.15 y 6.16):** Claude las recorta a **3:2** (1448×965) por arriba y por abajo.
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**, sin metadatos) con el **nombre exacto** de la tabla de §1, en `templates/carpinteria-metalica/carpinteria-metalica-6/public/ejemplo/`.
- Después actualiza `public/ejemplo/CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)»), comprueba que cada `alt` de `site.config.ts` describe lo que se ve (con tu OK si hay que cambiarlo) y que todas siguen con `origen: "ia"`.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente real: en la web de un cliente, `/trabajos` lleva sus fotos (y sus antes y después reales).
