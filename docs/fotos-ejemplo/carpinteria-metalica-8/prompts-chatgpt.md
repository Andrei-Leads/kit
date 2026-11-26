# Prompts de ChatGPT · fotos de ejemplo de `carpinteria-metalica-8` «Taller de siempre»

**Cómo usarlo:** abre una conversación nueva en ChatGPT por foto. La única excepción es la pareja antes/después del cierre de Badalona (fichas 8.4 y 8.5): va en la misma conversación, **primero el después y luego el antes**. En cada conversación pega primero el **bloque de estilo común** (§2) y, a continuación, el prompt de la **ficha** (§3). Guarda cada resultado como `8.<m>.png` (por ejemplo `8.1.png`) en `andrei-leads-tech/material/fotos-ejemplo/carpinteria-metalica-8/`. Después pásaselas a Claude, que las convierte (ver §4).

**Concepto del template:** «Taller de siempre» es la web de una cerrajería y carpintería metálica familiar de Badalona (Serralleria Bosch Ribalta), tipo proyecto. Hace persianas enrollables y de librillo, cierres metálicos de comercio, ventanas de aluminio, galerías y puertas de seguridad. Es una web **cálida y de barrio**:

- **Colores:** fondo de arcilla clara (`#f2e9dc`), texto marrón oscuro (`#2a2019`), primario **verde oliva** (`#44603f`) y acento barro (`#b8653a`).
- **Formas:** guijarros y arcos, un collage en el hero y la historia del taller.

Su ficha de estilo es **documental y sin posar**:

- **Luz:** suave y difusa de la claraboya o de un ventanal alto, mezclada con una lámpara de trabajo cálida.
- **Encuadre:** a 50 mm y a la altura de los ojos.
- **Color:** blancos crema, sombras marrones y verdes apagados.
- **Materia:** objetos del oficio ordenados con su uso.
- **Personas:** solo de espaldas o fuera de foco. **Nunca una cara**: la del dueño la pone el cliente real.

**Registro:** todas son **fotos de móvil**. Las del taller las hace Laia, que lleva la oficina y las persianas, con su iPhone durante un día normal, sin que nadie pose. Usa el **zoom 2x** (unos 50 mm), a la altura de los ojos. Las obras las hace Quim, el de montaje, con su iPhone al terminar, desde la calle o desde el patio. Lo bonito sale de la luz de la claraboya y del taller de toda la vida, no de un fotógrafo.

**Verde y color primario:** el primario de la web es verde oliva. Las **persianas de librillo verdes** salen porque las pide la ficha (es el verde típico de Barcelona). Tienen que ser un **verde botella oscuro, algo azulado y mate**, el de la pintura de persiana de siempre, nunca el oliva de la web. Así, si el cliente cambia su color, las fotos siguen funcionando. Fuera de las persianas, nada verde vivo.

Cosas propias de este template:

- **Etiqueta «Imagen generada con IA»:** va **debajo** de la foto, como pie en cursiva, no encima. No hace falta reservar ninguna esquina.
- **Máscaras orgánicas:** en el collage del hero y en «El taller», las fotos van recortadas en forma de **guijarro** (esquinas muy redondeadas e irregulares). En los servicios van en **arco** (la parte de arriba en medio punto). Por eso **las esquinas se pierden**: lo importante va en el centro, con aire alrededor.
- **Hero (8.1 y 8.2):** un collage de dos piezas.
  - La A (8.1) es la **foto ancla**, vertical 4:5. Es la primera imagen que se carga y la **imagen de Open Graph** (la vista previa al compartir por WhatsApp).
  - La B (8.2) es cuadrada y se solapa con la esquina de abajo de la A.
- **Servicios (8.9–8.12):** se piden en **4:3**, pero en la home y en su página se pintan en un **arco vertical 4:5**: la web se queda con la columna central del ancho (del 20 al 80 %). También salen a 4:3 en la tarjeta del configurador.
- **Obras (8.3–8.8):** se piden en **4:3**. A 4:3 salen en su página, y en la lista de la home se alternan 4:3 y **4:5**. Por eso el motivo va en la columna central (del 20 al 80 % del ancho).
- **`/empresa` y «El taller» (8.13–8.15):** son guijarros a 3:2, 4:5 y 3:2. La 8.13 y la 8.15 se piden en 4:3 y Claude las recorta a 3:2. La 8.14 se pide en vertical 4:5.

**El taller (8.1 y 8.9–8.15) es el mismo lugar en todas:**

- Una nave antigua de Badalona con claraboyas en el techo.
- Un banco de madera gastado y un tornillo de banco.
- Una plegadora manual.
- Lamas de persiana apiladas.
- Cajas de tornillería etiquetadas a mano (ilegibles).
- Un calendario de pared sin texto legible y una radio vieja.

Ubicación de los datos de ejemplo: Barcelona y el Barcelonès Nord (Gràcia, Eixample, Badalona, Sant Adrià de Besòs, Montgat). Arquitectura del área de Barcelona: galerías acristaladas en patios de manzana, balcones del Eixample con persianas de librillo, bajos comerciales con cierre, pisos de los 70. Sin monumentos ni rótulos.

---

## 1. Tabla resumen

| Ficha | Archivo final | Qué se ve | Pedir en | Registro |
|---|---|---|---|---|
| 8.1 | `hero-taller.jpg` | **Foto ancla:** nave con claraboya, banco de madera con una persiana de librillo a medio restaurar, figura de espaldas desenfocada al fondo | 4:5 | Móvil (oficina, taller) |
| 8.2 | `hero-obra.jpg` | Persiana de librillo verde restaurada en una fachada | 1:1 | Móvil (montaje, calle) |
| 8.3 | `obra-01-galeria-gracia.jpg` | Galería acristalada con perfiles crema en un patio de manzana de Gràcia | 4:3 | Móvil (montaje, patio) |
| 8.4 | `obra-02-cierre-badalona.jpg` | **Después:** cierre microperforado nuevo de una panadería, sin rótulo legible | 4:3 | Móvil (montaje, calle) |
| 8.5 | `obra-02-antes.jpg` | **Antes:** el cierre viejo abollado, con el mismo encuadre | 4:3 | Móvil (montaje, calle) |
| 8.6 | `obra-03-librillo-eixample.jpg` | Balcones del Eixample con persianas de librillo verdes restauradas | 4:3 | Móvil (montaje, calle) |
| 8.7 | `obra-04-persianas-santadria.jpg` | Persianas enrollables nuevas, medio subidas, en un piso de los 70 | 4:3 | Móvil (montaje, calle) |
| 8.8 | `obra-05-puerta-montgat.jpg` | Puerta metálica de seguridad gris de una planta baja | 4:3 | Móvil (montaje, calle) |
| 8.9 | `servicio-persianas.jpg` | Lamas de persiana enrollable apiladas en el banco | 4:3 | Móvil (oficina, taller) |
| 8.10 | `servicio-cierres.jpg` | Eje y muelles de un cierre metálico sobre caballetes | 4:3 | Móvil (oficina, taller) |
| 8.11 | `servicio-aluminio.jpg` | Ventana corredera de aluminio sobre el banco | 4:3 | Móvil (oficina, taller) |
| 8.12 | `servicio-librillo.jpg` | Lamas de librillo sujetas en el tornillo de banco | 4:3 | Móvil (oficina, taller) |
| 8.13 | `taller-banco.jpg` | Banco con herramientas usadas y cajas de tornillería etiquetadas a mano | 4:3 (se recorta a 3:2) | Móvil (oficina, taller) |
| 8.14 | `taller-espalda.jpg` | Una persona de espaldas trabajando en la plegadora | 4:5 | Móvil (oficina, taller) |
| 8.15 | `taller-manos.jpg` | Dos pares de manos sujetando una lama de persiana, desenfocadas | 4:3 (se recorta a 3:2) | Móvil (oficina, taller) |

---

## 2. Bloque de estilo común

Pégalo al principio de **cada** conversación, antes del prompt de la ficha (copia todo el bloque).

```
Voy a pedirte una fotografía para la web de ejemplo de una cerrajería y carpintería metálica familiar de Badalona (Barcelona, España): persianas enrollables y de librillo, cierres de comercio, ventanas de aluminio, galerías y puertas metálicas. Estas reglas valen para toda la serie. La escena concreta (quién hace la foto, objeto u obra, luz y composición) te la doy en el siguiente mensaje y manda sobre cualquier costumbre: síguela al pie de la letra.

QUÉ TIPO DE FOTO ES
- Foto de MÓVIL hecha con un iPhone (16, 17 o 18), no de un fotógrafo. La hace alguien del propio taller para su web, durante un día normal: nadie posa, nada se prepara.
- Cámara principal del iPhone con el ZOOM 2x (unos 50 mm), a la ALTURA DE LOS OJOS, modo foto estándar, sin modo retrato ni filtros. Profundidad de campo media, natural de móvil. Procesado típico de móvil, limpio.

LUZ Y COLOR
- En el taller: luz SUAVE y DIFUSA que entra por las CLARABOYAS del techo o por un ventanal alto, mezclada con una LÁMPARA DE TRABAJO cálida sobre el banco. Sombras suaves, nunca duras.
- En las obras: día luminoso pero suave (cielo algo velado o la fachada en sombra abierta), sin sol duro ni sombras marcadas.
- Color cálido pero natural, sin aspecto de película: blancos CREMA, sombras MARRONES y verdes apagados. Saturación natural.

MATERIA
- Un taller de los de siempre, usado y ordenado: banco de madera gastado, tornillo de banco, plegadora manual, lamas de persiana apiladas, ejes y muelles de cierres metálicos, cajas de tornillería etiquetadas a mano con letra ILEGIBLE, un calendario de pared sin texto legible, una radio vieja. Polvo y marcas de uso reales.
- Obras: arquitectura del área de Barcelona (galerías acristaladas en patios de manzana, balcones del Eixample, bajos comerciales con cierre, pisos de los años 70).
- Personas: solo de ESPALDAS o FUERA DE FOCO, con ropa de trabajo lisa. Nunca una cara.

PROHIBIDO
- Chispas, fuego, humo, luz dura, sol directo con sombras marcadas.
- Fluorescente frío de polígono, taller nuevo y vacío, aspecto de catálogo.
- Personas de frente, caras, uniformes con logo, reflejos del fotógrafo o del móvil.
- Logos, marcas de herramientas, texto, números, rótulos de comercios, números de portal o matrículas legibles.
- Arquitectura que no sea del área de Barcelona en las obras.
- Verdes vivos (si hay persianas verdes, verde botella oscuro y mate).
- Aspecto de cine, gradación verdeazulada y naranja, niebla, viñeteado, HDR, render 3D, banco de imágenes.
- Collage o varios paneles: una única fotografía.

COMPOSICIÓN
- El motivo principal en el CENTRO, con aire alrededor: la web recorta las fotos con formas redondeadas y las esquinas se pierden.
- La proporción la indica cada escena.

Cuando lo hayas entendido, espera mi siguiente mensaje con la escena concreta.
```

> Si prefieres ahorrar un mensaje, pega el bloque de estilo y el prompt de la ficha juntos en el mismo mensaje (quitando la última línea del bloque, «Cuando lo hayas entendido…»).

---

## 3. Fichas

### Ficha 8.1 · `hero-taller.jpg` (foto ancla)

**Dónde sale:** pieza A del collage del hero, recortada en forma de guijarro. Es la primera imagen que se carga y la **imagen de Open Graph**. Lo importante, entre el 15 y el 85 % del ancho y del alto.

```
Fotografía vertical 4:5, una única imagen.

QUIÉN Y POR QUÉ: la hace Laia, de la oficina del taller, con su iPhone una mañana cualquiera, desde la puerta de la oficina, sin que su compañero se dé cuenta: la foto que mejor explica cómo es el taller.

PLANO: a la altura de los ojos, con el zoom 2x, desde unos cuatro metros, mirando a lo largo de la nave.

LO QUE CUENTA LA HISTORIA: el interior de una NAVE antigua de Badalona con el techo de vigas y una CLARABOYA por la que entra la luz. En primer término, un BANCO de MADERA gastado y lleno de marcas, con un TORNILLO DE BANCO y, encima, una PERSIANA de LIBRILLO a medio restaurar: unas lamas ya lijadas al hierro y otras con la pintura verde vieja, más un bote de pintura y una brocha. Al fondo, DESENFOCADA y DE ESPALDAS, una persona con ropa de trabajo lisa trabaja en otro banco. En las paredes, estanterías con lamas apiladas y cajas de tornillería etiquetadas a mano (letra ilegible), y una radio vieja en un estante.

LUZ: la luz de la claraboya cae suave y difusa sobre el banco; una lámpara de trabajo cálida, de brazo, ilumina la persiana. Sombras suaves, marrones.

COMPOSICIÓN: el banco con la persiana, en el centro de la imagen, entre el 30 y el 75 % del alto; la figura del fondo, pequeña y por encima. Aire alrededor: la web recorta las esquinas. Sin caras, sin logos, sin texto legible.
```

---

### Ficha 8.2 · `hero-obra.jpg`

**Dónde sale:** pieza B del collage del hero, cuadrada y recortada en forma de guijarro, encima de la esquina de la pieza A. Lo importante, en el centro (del 20 al 80 % del ancho y del alto).

```
Fotografía cuadrada 1:1, una única imagen.

QUIÉN Y POR QUÉ: la hace Quim, el de montaje, con su iPhone desde la calle, al terminar de colgar una persiana de librillo restaurada en una fachada de Badalona.

PLANO: de cerca, desde la acera, con el zoom 2x y la contrapicada natural de mirar a un primer piso, frontal a la persiana.

LO QUE CUENTA LA HISTORIA: una PERSIANA de LIBRILLO de dos hojas, RESTAURADA, pintada de VERDE BOTELLA oscuro, algo azulado y MATE, con las lamas inclinadas y rectas y sus pernios de hierro negros. Está en una ventana de una fachada de estuco color crema algo gastado, con el marco de piedra y un trozo de barandilla de hierro debajo. Las lamas, medio abiertas, dejan ver la oscuridad de dentro.

LUZ: día luminoso con la fachada en sombra abierta: luz suave y pareja, sin sombras marcadas.

COMPOSICIÓN: la persiana llena el centro de la imagen, con algo de estuco alrededor. Sin números, sin rótulos, sin personas.
```

---

### Ficha 8.3 · `obra-01-galeria-gracia.jpg`

**Dónde sale:** trabajo «Galería acristalada en Gràcia» (4:3 en su página; 4:3 o 4:5 en la home) y foto en arco del servicio «Cerramientos de galería» (4:5). Lo importante, entre el 20 y el 80 % del ancho.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Quim con su iPhone desde el patio de manzana, al terminar de montar una galería en un piso de Gràcia (Barcelona).

PLANO: desde el patio de manzana, a la altura de los ojos con el zoom 2x, con una contrapicada suave hacia el primer piso.

LO QUE CUENTA LA HISTORIA: una GALERÍA ACRISTALADA en la fachada trasera de una finca de Gràcia, que da al patio de manzana: un cerramiento corrido de paños de vidrio con PERFILES de aluminio de color CREMA, de suelo a techo del balcón, con unas ventanas correderas. Por dentro se intuyen plantas y un tendedero. La fachada trasera, de estuco ocre claro algo desconchado, con otras galerías viejas de madera a los lados. En primer término, la copa de un limonero del patio, desenfocada.

LUZ: día luminoso, el patio en sombra abierta: luz suave y pareja.

COMPOSICIÓN: la galería nueva en el centro, entre el 20 y el 80 % del ancho. Sin personas, sin rótulos, sin texto.
```

---

### Ficha 8.4 · `obra-02-cierre-badalona.jpg` (el «después»)

**Dónde sale:** trabajo «Cierre de una panadería en Badalona» (Después): 4:3 en su página y en el deslizador antes/después, 4:3 o 4:5 en la home. **Va en la misma conversación que la ficha 8.5.** Genera esta primera y NO cambies de conversación.

```
Fotografía horizontal 4:3, una única imagen. Es el "DESPUÉS" del cambio del cierre metálico de una panadería de barrio en Badalona (Barcelona).

QUIÉN Y POR QUÉ: la hace Quim con su iPhone desde la acera de enfrente, a primera hora, cuando dejan el cierre nuevo montado y bajado antes de que abra la panadería.

ENCUADRE FIJO (lo repetiré en la versión "antes"): frontal al bajo, desde la acera de enfrente, a la altura de los ojos, con el zoom 2x. Cuatro anclajes que no se moverán:
1. El hueco del local, en el centro, con el CIERRE BAJADO del todo, de unos tres metros y medio de ancho.
2. Sobre el hueco, una franja de fachada de azulejo crema liso donde iría el rótulo, VACÍA (sin letras).
3. A la izquierda, el portal de la finca con una puerta de madera; a la derecha, una bajante y un trozo del local de al lado con la persiana subida, en sombra.
4. En la acera, una papelera y el bordillo; arriba, el canto de un balcón con barandilla de hierro.

LUZ FIJA: primera hora, la calle en sombra abierta con luz suave y pareja, sin sol directo.

DESPUÉS: un CIERRE NUEVO de lamas MICROPERFORADAS (agujeritos finos que dejan ver un poco el interior), de aluminio lacado en gris claro, recto y limpio, con sus guías laterales nuevas y su cajón de cierre limpio arriba. Ni una abolladura, ni una pintada.

COMPOSICIÓN: el cierre en el centro, entre el 20 y el 80 % del ancho. Sin rótulos, sin letras, sin números de portal, sin personas, sin coches.
```

---

### Ficha 8.5 · `obra-02-antes.jpg` (el «antes»)

**Dónde sale:** el «Antes» del trabajo de Badalona, en el deslizador a 4:3. **Misma conversación que la 8.4.** El desgaste tiene que verse **mucho**.

```
Ahora, en esta misma conversación, la versión "ANTES" de la imagen anterior. Una única fotografía, no un collage ni dos paneles. La hace el mismo Quim con su iPhone el día que fue a medir, desde el mismo sitio de la acera y a la misma hora.

MISMO ENCUADRE y mismos cuatro anclajes: el hueco del local en el centro con el cierre bajado; la franja de azulejo crema vacía encima; el portal de madera a la izquierda y la bajante con el local vecino a la derecha; la papelera, el bordillo y el canto del balcón. MISMA LUZ: primera hora, sombra abierta.

Solo cambia el cierre, con el desgaste MUY visible:
- Un cierre VIEJO de lamas CIEGAS de chapa ondulada, galvanizado y pintado de gris, con la pintura levantada a trozos y ÓXIDO en la parte de abajo.
- Varias ABOLLADURAS grandes a la altura de las rodillas, como de golpes, y una lama doblada que asoma por fuera de la guía.
- PINTADAS garabateadas de spray SIN LETRAS LEGIBLES (solo trazos y manchas).
- La guía de un lado, torcida, y el cajón de arriba con la chapa abollada.
La franja de azulejo, el portal y la acera, igual que en el después.

Sin texto legible, sin logos.
```

---

### Ficha 8.6 · `obra-03-librillo-eixample.jpg`

**Dónde sale:** trabajo «Persianas de librillo en el Eixample» (4:3 en su página; 4:3 o 4:5 en la home) y segunda foto del servicio «Persianas de librillo» (3:2 en su página). Lo importante, entre el 20 y el 80 % del ancho y entre el 15 y el 85 % del alto.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Quim con su iPhone desde la acera de enfrente, al terminar de colgar las persianas de librillo restauradas de un piso del Eixample (Barcelona).

PLANO: desde la acera de enfrente, con el zoom 2x y la contrapicada natural de mirar a un principal, frontal a la fachada.

LO QUE CUENTA LA HISTORIA: dos BALCONES de una finca modernista sencilla del Eixample, con BARANDILLAS de hierro forjado y losas de piedra, y en cada balcón dos PERSIANAS de LIBRILLO RESTAURADAS, de VERDE BOTELLA oscuro, algo azulado y MATE, unas cerradas y otras medio abiertas. La fachada, de piedra y estuco crema con molduras sencillas. En un balcón, una maceta con una planta colgante. Arriba se intuye el balcón del piso de encima con sus persianas viejas, más claras y descoloridas.

LUZ: día luminoso con la fachada en sombra abierta: luz suave y pareja.

COMPOSICIÓN: los dos balcones en el centro. Sin números de portal, sin rótulos, sin personas.
```

---

### Ficha 8.7 · `obra-04-persianas-santadria.jpg`

**Dónde sale:** trabajo «Persianas de un piso en Sant Adrià» (4:3 en su página; 4:3 o 4:5 en la home). Lo importante, entre el 20 y el 80 % del ancho.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Quim con su iPhone desde la calle, al terminar de cambiar las persianas de un piso de Sant Adrià de Besòs (Barcelona).

PLANO: desde la acera de enfrente, con el zoom 2x, frontal a un tramo de fachada de un bloque, a la altura de un segundo piso.

LO QUE CUENTA LA HISTORIA: un tramo de fachada de un BLOQUE de pisos de los años 70, de ladrillo visto marrón claro con franjas de hormigón, con TRES ventanas de un mismo piso y sus PERSIANAS ENROLLABLES NUEVAS de lamas de aluminio color crema, MEDIO SUBIDAS y a la misma altura, con sus guías limpias. Una de las ventanas tiene un pequeño balcón con barandilla de tubo y un tendedero. Arriba y abajo, las ventanas de los vecinos con persianas viejas, de lamas de PVC gris amarillento y alturas distintas.

LUZ: día luminoso, la fachada en sombra abierta: luz suave y pareja.

COMPOSICIÓN: las tres ventanas nuevas en el centro, entre el 20 y el 80 % del ancho. Sin números, sin rótulos, sin personas.
```

---

### Ficha 8.8 · `obra-05-puerta-montgat.jpg`

**Dónde sale:** trabajo «Puerta de seguridad en Montgat» (4:3 en su página; 4:3 o 4:5 en la home). Lo importante, entre el 20 y el 80 % del ancho.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Quim con su iPhone desde la calle, al dejar montada la puerta metálica de una planta baja en Montgat (Barcelona).

PLANO: frontal a la puerta, a la altura de los ojos, con el zoom 2x, desde unos cuatro metros, con algo de fachada y de acera.

LO QUE CUENTA LA HISTORIA: una PUERTA METÁLICA de SEGURIDAD de una planta baja, de chapa lacada en GRIS medio con un relieve sencillo de cuarterones, una mirilla discreta y una manilla y un escudo de seguridad de acero mate. Está en una casa baja de pueblo de costa, de estuco blanco algo gastado con un zócalo de piedra, junto a una ventana con reja. En el suelo, un felpudo liso y una maceta con una buganvilla que sube por la pared.

LUZ: día luminoso, la puerta en sombra abierta: luz suave y pareja.

COMPOSICIÓN: la puerta en el centro, entre el 20 y el 80 % del ancho. Sin números de portal, sin buzones con nombres, sin rótulos, sin personas.
```

---

### Ficha 8.9 · `servicio-persianas.jpg`

**Dónde sale:** servicio «Persianas enrollables»: arco vertical 4:5 en la home y en su página, y tarjeta a 4:3 del configurador. Lo importante, en la columna central (del 20 al 80 % del ancho).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Laia con su iPhone en el taller, mientras preparan un pedido de persianas.

PLANO: a la altura de los ojos, con el zoom 2x, de cerca, algo desde arriba sobre el banco.

LO QUE CUENTA LA HISTORIA: un montón de LAMAS de PERSIANA ENROLLABLE de aluminio, de color crema y gris claro, APILADAS en orden sobre el banco de madera gastado, con sus cantos a la vista. Al lado, un metro plegable de madera abierto, un lápiz de carpintero y unos topes de persiana en una caja de cartón con una etiqueta escrita a mano ilegible.

LUZ: la luz de la claraboya cae suave desde arriba, y la lámpara de trabajo cálida da un brillo suave en los cantos de las lamas.

COMPOSICIÓN: el montón de lamas en el centro, con aire alrededor (la web lo recorta en forma de arco). Sin texto legible, sin logos.
```

---

### Ficha 8.10 · `servicio-cierres.jpg`

**Dónde sale:** servicio «Cierres metálicos de comercio»: arco vertical 4:5 en la home y en su página, y tarjeta a 4:3. Lo importante, en la columna central (del 20 al 80 % del ancho).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Laia con su iPhone en el taller, con el eje de un cierre desmontado para cambiarle los muelles.

PLANO: a la altura de los ojos, con el zoom 2x, de frente a los caballetes, desde un metro y medio.

LO QUE CUENTA LA HISTORIA: el EJE de un CIERRE METÁLICO de comercio (un tubo largo de acero) apoyado sobre dos CABALLETES de madera, con los MUELLES en espiral a la vista, unos viejos con óxido y uno nuevo, más brillante. Debajo, en el suelo, una caja con tornillería y unas llaves fijas viejas. Al fondo, desenfocada, la pared del taller con lamas apiladas.

LUZ: luz suave y difusa de la claraboya, más el brillo cálido de la lámpara de trabajo en el muelle nuevo.

COMPOSICIÓN: los muelles en el centro de la imagen. Sin texto legible, sin logos de herramientas.
```

---

### Ficha 8.11 · `servicio-aluminio.jpg`

**Dónde sale:** servicio «Ventanas de aluminio»: arco vertical 4:5 en la home y en su página, y tarjeta a 4:3. Lo importante, en la columna central (del 20 al 80 % del ancho).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Laia con su iPhone en el taller, con una ventana recién montada antes de llevarla a la obra.

PLANO: a la altura de los ojos, con el zoom 2x, de frente al banco.

LO QUE CUENTA LA HISTORIA: una VENTANA CORREDERA de ALUMINIO lacado en blanco crema, de dos hojas, APOYADA en vertical contra el banco de madera, con el vidrio aún con sus calzos y una de las esquinas protegida con cartón. Sobre el banco, junto a ella, unas escuadras, una caja de tornillería etiquetada a mano (ilegible) y un destornillador de mango de madera.

LUZ: la luz de la claraboya cae suave desde arriba; el vidrio refleja un poco la claraboya, sin reflejos de personas.

COMPOSICIÓN: la ventana en el centro, con aire alrededor. Sin texto legible, sin logos.
```

---

### Ficha 8.12 · `servicio-librillo.jpg`

**Dónde sale:** servicio «Persianas de librillo»: arco vertical 4:5 en la home y en su página, y tarjeta a 4:3. Lo importante, en la columna central (del 20 al 80 % del ancho).

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Laia con su iPhone en el taller, mientras restauran una persiana de librillo de un piso del Eixample.

PLANO: de cerca, a la altura de los ojos, con el zoom 2x.

LO QUE CUENTA LA HISTORIA: una HOJA de PERSIANA de LIBRILLO sujeta en el TORNILLO DE BANCO, con las lamas inclinadas: la mitad de arriba ya lijada hasta el hierro y la madera, y la mitad de abajo todavía con la PINTURA VERDE VIEJA, cuarteada y descolorida. Sobre el banco, papel de lija usado, un cepillo de púas y un trapo.

LUZ: luz suave de la claraboya y la lámpara de trabajo cálida acercada a la hoja: brillo suave en las lamas lijadas.

COMPOSICIÓN: la hoja en el centro, en vertical, con el tornillo de banco abajo. Sin texto, sin logos.
```

---

### Ficha 8.13 · `taller-banco.jpg`

**Dónde sale:** «El taller» de la home (mini collage, guijarro a 3:2) y galería de `/empresa` (3:2). Se pide en 4:3 y Claude la recorta a 3:2 por arriba y por abajo: lo importante, entre el 15 y el 85 % del alto y en el centro del ancho.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Laia con su iPhone al llegar por la mañana, antes de que se encienda nada, para la página "Quiénes somos" de la web.

PLANO: a la altura de los ojos, con el zoom 2x, de frente al banco, desde dos metros.

LO QUE CUENTA LA HISTORIA: el BANCO de MADERA del taller, gastado y lleno de marcas, con HERRAMIENTAS USADAS en su sitio: martillos, alicates, limas y un tornillo de banco. Encima, una estantería con CAJAS de TORNILLERÍA de cartón y de plástico, etiquetadas A MANO con rotulador (letra ILEGIBLE). En la pared, un CALENDARIO de pared sin texto legible y una RADIO vieja en un estante. Todo usado pero ordenado.

LUZ: la luz de la claraboya entra suave desde arriba a la izquierda y la lámpara de trabajo, cálida y apagada a medias, da un tono crema al banco.

COMPOSICIÓN: el banco en el centro, con aire alrededor (la web lo recorta en forma de guijarro). Sin texto legible, sin logos de herramientas, sin personas.
```

---

### Ficha 8.14 · `taller-espalda.jpg`

**Dónde sale:** «El taller» de la home (mini collage, guijarro a 4:5) y galería de `/empresa` (4:5). Lo importante, en el centro (del 20 al 80 % del ancho y del alto).

```
Fotografía vertical 4:5, una única imagen.

QUIÉN Y POR QUÉ: la hace Laia con su iPhone desde la puerta de la oficina, mientras Pere dobla una chapa en la plegadora, sin que él se dé cuenta.

PLANO: a la altura de los ojos, con el zoom 2x, desde unos tres metros, por detrás de él.

LO QUE CUENTA LA HISTORIA: una persona DE ESPALDAS, con camiseta de trabajo lisa gris y pantalón de trabajo sin logos, de pie frente a una PLEGADORA MANUAL vieja de hierro pintado, bajando la palanca para doblar una chapa. No se le ve la cara ni el perfil. Al lado, apoyadas en la pared, chapas y lamas. Arriba, la claraboya.

LUZ: la luz de la claraboya cae suave sobre la plegadora y la espalda; el resto del taller, en penumbra cálida.

COMPOSICIÓN: la persona y la plegadora en el centro. Sin cara, sin logos en la ropa ni en la máquina, sin texto.
```

---

### Ficha 8.15 · `taller-manos.jpg`

**Dónde sale:** «El taller» de la home (mini collage, guijarro a 3:2) y galería de `/empresa` (3:2). Se pide en 4:3 y Claude la recorta a 3:2 por arriba y por abajo: lo importante, entre el 15 y el 85 % del alto.

```
Fotografía horizontal 4:3, una única imagen.

QUIÉN Y POR QUÉ: la hace Laia con su iPhone mientras dos compañeros miden una lama sobre el banco.

PLANO: de cerca, a la altura de los ojos, con el zoom 2x. Las manos, algo DESENFOCADAS por el movimiento.

LO QUE CUENTA LA HISTORIA: DOS PARES de MANOS, de dos personas distintas (unas mayores y curtidas y otras más jóvenes), sujetando entre las dos una LAMA larga de persiana de aluminio color crema sobre el banco de madera, mientras una de ellas apoya un metro plegable de madera. Solo se ven las manos y el arranque de los antebrazos, con ropa de trabajo lisa. Sin caras.

LUZ: luz suave de la claraboya y el brillo cálido de la lámpara de trabajo en la lama.

COMPOSICIÓN: las manos y la lama en el centro, cruzando la imagen en horizontal. Sin caras, sin texto legible, sin logos.
```

---

## 4. Nota final: formato y conversión

- ChatGPT entrega **PNG de 1448×1086 (4:3)**, **de 1254×1254 (1:1)** o **de 1122×1402 (4:5)**.
- **Hero (8.1 y 8.2):** se quedan en 4:5 y 1:1. Peso tras optimizar: la A, **≤ 120 KB**; la B, **≤ 40 KB**. Si con la calidad ~82 se pasan, Claude baja la calidad o el lado largo hasta entrar.
- **Obras y servicios (8.3–8.12):** se quedan en **4:3**. Si la pareja 8.4/8.5 llega con un píxel de diferencia, Claude la iguala.
- **Taller:** la 8.13 y la 8.15 se recortan a **3:2** (1448×965); la 8.14 se queda en 4:5.
- Claude las revisa en una hoja de contactos y las convierte a **JPG** (calidad ~82, lado largo ≤ 1600 px, **sin ampliar**, sin metadatos) con el **nombre exacto** de la tabla de §1, en `templates/carpinteria-metalica/carpinteria-metalica-8/public/ejemplo/`.
- Después actualiza `public/ejemplo/CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)»), comprueba que cada `alt` de `site.config.ts` describe lo que se ve (con tu OK si hay que cambiarlo) y que todas siguen con `origen: "ia"`.
- **Las fotos de IA son solo para demos.** Nunca se presentan como trabajos de un cliente real: en la web de un cliente, `/trabajos` lleva sus fotos (y la cara del dueño, si la quiere, la pone él).
