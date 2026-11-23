# Fotos de ejemplo de «Galería» (carpinteria-madera-4)

**Todas son relleno gris** (JPG rayado con el nombre del archivo y la proporción) **pendientes de la foto generada con IA** según la ficha de estilo fotográfico del encargo (§10): luz natural difusa de galería, uniforme y con sombras muy suaves; 50–85 mm con la pieza como protagonista, encuadre cerrado, fondo de pared lisa y verticales rectas; color neutro y fiel, con los detalles y el obrador en blanco y negro de contraste medio; roble, nogal y fresno sobre paredes encaladas y suelo hidráulico; nunca personas, texto, rótulos ni logos. En `site.config.ts` todas llevan `origen: "ia"` (etiqueta «Imagen generada con IA» pegada al borde inferior izquierdo de cada foto).

Al sustituirlas: mismo nombre, JPG calidad ~82, recortado a la proporción indicada, lado largo ≤ 1600 px (docs/nuevo-template.md, paso 9). Origen: «Generada con IA (ChatGPT, OpenAI)». Los prompts van a `kit/docs/fotos-ejemplo/carpinteria-madera-4/` cuando se generen.

| Archivo | Qué muestra | Proporción | Dónde | Estado |
|---|---|---|---|---|
| `hero-aparador-nogal.jpg` | Foto ancla: aparador bajo de nogal contra una pared encalada de un piso del Eixample, con un poco de suelo hidráulico | 4:5 | Collage del hero (pieza grande), servicio «Mesas y aparadores», trabajo «Aparador de nogal» | Relleno |
| `cocina-fresno-gracia.jpg` | Frente de cocina de fresno con encimera de mármol | 4:5 | Collage, servicio «Cocinas», trabajo «Cocina de fresno» | Relleno |
| `armario-roble-eixample.jpg` | Armario de roble de suelo a techo con molduras originales | 4:5 | Servicio «Armarios y vestidores», trabajo «Armario con molduras» | Relleno |
| `mesa-comedor.jpg` | Mesa de comedor de roble macizo | 3:2 | Trabajo «Mesa de comedor» (en la rejilla se recorta a 4:5) | Relleno |
| `estanteria-modular.jpg` | Estantería de pared de nogal | 4:5 | Servicio «Estanterías y librerías» | Relleno |
| `lamas-roble-poblenou.jpg` | Lamas verticales de roble con una puerta enrasada casi invisible | 4:5 | Collage, servicio «Revestimientos», trabajo «Pared de lamas» | Relleno |
| `mostrador-born.jpg` | Mostrador y estantes de roble en una tienda vacía, sin rótulos ni producto de marca | 4:5 | Servicio «Encargos para interioristas», trabajo «Mostrador en el Born» | Relleno |
| `banco-recibidor.jpg` | Banco recibidor sobre baldosa hidráulica | 4:5 | Trabajo «Banco de entrada» (sin servicio) | Relleno |
| `cocina-antes-gracia.jpg` | La cocina de Gràcia antes, mismo encuadre que `cocina-fresno-gracia.jpg` | 4:5 | Trabajo «Cocina de fresno», `antes` (deslizador) | Relleno |
| `detalle-ensamble-bn.jpg` | Ensamble a inglete, blanco y negro | 1:1 | `galeria` (rejilla sin trabajos, collage si faltan trabajos) | Relleno |
| `detalle-tirador-bn.jpg` | Tirador mecanizado en el canto, blanco y negro | 1:1 | `galeria` | Relleno |
| `cabecero-nogal.jpg` | Cabecero de cama de nogal | 4:5 | `galeria` | Relleno |
| `obrador-bn.jpg` | Obrador con piezas en proceso, blanco y negro | 3:2 | `/empresa` (`empresa.imagenes[0]`, ancha) | Relleno |
| `obrador-tablones-bn.jpg` | Tablones apoyados en la pared, blanco y negro | 4:5 | `/empresa` (`empresa.imagenes[1]`) | Relleno |

La rejilla recorta todo a 4:5 y la pieza grande del collage también; las pequeñas del collage van a 1:1 en móvil y 3:2 en escritorio, en blanco y negro (`filter: grayscale(1)`): conviene el sujeto centrado con aire alrededor. Las fotos del obrador también se pintan en gris.
