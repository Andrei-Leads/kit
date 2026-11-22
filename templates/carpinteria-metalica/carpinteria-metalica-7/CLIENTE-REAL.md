# carpinteria-metalica-7 «Forja»: pasar a cliente real

Template de carpintería metálica, herrería y forja (tipo proyecto). La web es de óxido (el primario a sangre) con bloques de hierro cortados en diagonal. El hero lleva una foto del taller a sangre, y la sección estrella son las obras agrupadas por tipo de pieza, con chips de ancla. En la home, el asistente «Encarga tu pieza» compone el mensaje de WhatsApp.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «L'Enclusa», una herrería inventada de Massanassa (Valencia). Borra también el comentario de cabecera.

- [ ] `negocio`:
  - `nombre`. Con más de 24 caracteres, la cápsula lo pasa a 2–3 líneas y «Menú» queda como icono en móvil.
  - `nombreLegal` (Vicent Grau Roig).
  - `nif`: el de ejemplo, 24381796A, tiene la letra de control inválida.
  - `sector`: sale en el h1 como «{sector} en {ciudad}».
  - `descripcionCorta`: sale bajo el hero y en `/empresa`.
  - `anioFundacion`: sale como «En el oficio desde 1991».
  - `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. El ejemplo es un autónomo.
- [ ] `contacto`:
  - `telefono` y `whatsapp` (`+34600111404`).
  - `email` (`.example`).
  - `direccion` («Calle Ejemplo 22, bajo»).
  - `horario`: debe coincidir con la ficha de Google.
  - `fichaGoogle` (`cid=000…0404`).
- [ ] `zonas`: los municipios reales. Salen separados por « / ».
- [ ] `servicios`:
  - Los del cliente, con su foto.
  - `contenido`, `incluye` y `preguntas` son de ejemplo: plazos de «una a dos semanas», «taco químico», «recomendamos galvanizar»…
  - Cada servicio sale como «Pieza 01, 02…» por su orden.
- [ ] `trabajos`:
  - Los 6 son inventados (Catarroja, Albal, Alfafar, Silla, Russafa, Benetússer).
  - `trabajos[].servicio` decide el grupo de la galería. Sin servicio, la obra va a «Otros trabajos».
  - El testimonio de Amparo es inventado.
- [ ] `valoracion` (4,9 / 58) y `resenas`: inventadas. Pon solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`:
  - Los 4 pasos de ejemplo hablan de «mandar la foto», «dibujo antes de cortar» y «recogemos al acabar».
  - Pon los pasos reales del cliente, o `[]` para usar los 4 de core (`pasosProceso`).
- [ ] `garantias`: «Imprimación antioxidante en todas las piezas», «Diseño a medida antes de cortar» y «Montaje incluido». Solo deja lo que el cliente confirme.
- [ ] `empresa`:
  - `historia`: dice «Seguimos siendo dos» y «te coge el teléfono uno de los dos». Es una promesa: confírmala o quítala.
  - `imagenes`.
  - `equipo` (Vicent y Andreu: iniciales en rombo, sin foto).
- [ ] `preguntas`: revísalas con el cliente (diseño, plazos, soldadura a domicilio, óxido).
- [ ] `seo`:
  - `seo.titulo` y `seo.descripcion`.
  - `seo.url`: cambia `carpinteria-metalica-7.example` por el dominio definitivo.
  - Añade **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: cambia `instagram.com/lenclusa.ejemplo` por las reales, o quita el campo.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` (sale en la ficha y en la cabecera del servicio, con «Desde») o `tarifas` solo con cifras validadas por el cliente.

## 2. Fotos

- [ ] Borra `public/ejemplo/` entera y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`).
  - Son 15 rellenos oscuros rayados; la tabla de huecos está en `public/ejemplo/CREDITOS.md`.
  - En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero (`imagenesHero[0]`), 16:9:**
  - La más importante: va a sangre, con el h1 y los botones encima sobre un velo oscuro.
  - La mitad inferior debe ser oscura, y el sujeto, centrado para el recorte 3:4 del móvil.
  - Es también la imagen de Open Graph (la vista previa de WhatsApp).
  - Sin foto, el hero pasa a la versión «taller cerrado»: el h1 gigante sobre el óxido.
- [ ] **Trabajos:**
  - En la galería, la primera obra de cada grupo es 4:3 en escritorio y el resto 1:1. Sirve una foto cuadrada o 4:3 con el sujeto centrado.
  - En la ficha, la foto principal va 4:3 con un corte diagonal.
  - Con `antes`, mismo encuadre: sale el deslizador «Antes y después».
- [ ] **Servicios, 4:3:**
  - En móvil se ven como miniatura cuadrada de 104 px: sujeto centrado y reconocible.
  - Un servicio sin foto sale con su número gigante en contorno, sin romper nada.
- [ ] **Empresa, 3:2:** dos fotos del taller.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px (el hero, 1920) y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:**
  - El fondo entero de la web es `--color-primario` (óxido `#a8461f` por defecto). `estiloMarca` calcula el texto encima.
  - Probado con `#1e40af` y `#facc15`: se lee. Con un amarillo, la web pasa a ser amarilla con texto casi negro.
  - *Recomendado:* un color de marca medio u oscuro y cálido; si no hay, dejar el óxido.
- [ ] **Logo:** con `negocio.logo`, la cápsula muestra el logo (32 px, `alt=""`) **junto al** nombre. *Recomendado:* un logo cuadrado legible a 32 px; si no lo hay, sin logo.
- [ ] **Mensaje general:**
  - Es el genérico de core («Hola, os escribo desde vuestra web…»).
  - El diseño proponía «…Os mando una foto del sitio para un trabajo de forja:», que se dejó fuera por la regla de mensaje neutro.
  - *Recomendado:* `contacto.mensajeWhatsapp` propio si el cliente lo quiere.
- [ ] **Asistente «Encarga tu pieza»** (solo con WhatsApp): las opciones de «¿Dónde va?» y «¿Tienes medidas?» son fijas (`lib/encargo.ts`). Revísalas si el cliente no hace escaleras ni trabaja para comunidades.
- [ ] Etiquetas «Imagen generada con IA»: con fotos reales (`origen` distinto de `ia`) no salen.

## 4. Textos fijos que conviene revisar

- `lib/encargo.ts`: las listas `DONDE` y `MEDIDAS`, y el mensaje compuesto («Hola, os escribo desde vuestra web. Quiero {pieza} para {sitio}. {medidas}. Os mando una foto.»; lo que no se elige se omite).
- `components/secciones/CtaFinal.tsx`:
  - El título «¿Qué necesitas forjar?».
  - Con WhatsApp, «Mándanos una foto del sitio y una medida aproximada.».
  - Sin WhatsApp, «Llámanos y cuéntanos qué pieza necesitas y dónde va.».
- `app/page.tsx`: los títulos «Obras del taller», «Piezas que forjamos» y «Encarga tu pieza». La entradilla «cada una con su pueblo y su año» solo sale si todas las obras tienen `ubicacion` y `anio`.
- `components/Botones.tsx` y las páginas: «Mándanos una foto», «Mándanos una foto del sitio» y «Quiero una así».
- `components/secciones/Garantias.tsx`: «Nuestras garantías» y «En el oficio desde {año}» (solo con `anioFundacion`).
- `lib/mensajes.ts`: `MENSAJE_NO_ENCONTRADA` (el de la 404).

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/carpinteria-metalica-7/`) aún no existen. Los prompts están en `public/ejemplo/CREDITOS.md`. A un cliente real no le hacen falta.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).
- [ ] El build avisa «Failed to find font override values for Big Shoulders». Es inofensivo: la fuente se sirve igual, solo falta el ajuste del fallback.

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Con JS, el asistente compone bien el mensaje con las piezas reales. Sin elegir nada, manda el mensaje general.
- [ ] La galería de la home enseña como mucho 4 grupos; los chips enlazan a grupos que existen.
- [ ] Sin `whatsapp`:
  - El hero muestra «Llamar al taller · teléfono».
  - El asistente desaparece.
  - No queda ningún `wa.me` en la web.
- [ ] El nombre del negocio cabe en la cápsula a 375 px sin tapar el h1.
- [ ] La vista previa de la home en WhatsApp muestra la foto real del taller.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Enclusa\|origen: \"ia\"" site.config.ts` no devuelve nada.
