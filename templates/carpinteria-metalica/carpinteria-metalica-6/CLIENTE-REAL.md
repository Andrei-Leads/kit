# carpinteria-metalica-6 «Fachada nueva»: pasar a cliente real

Template de carpintería metálica (aluminio y PVC, tipo proyecto). La sección estrella son las fachadas antes y después: el hero es el deslizador del primer trabajo con `antes`, y debajo van hasta 5 fachadas más. Hay un asistente de WhatsApp («Tu fachada, en tres preguntas») que solo compone el mensaje.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Aluminios y PVC Hermanos Arjona», un negocio inventado de Dos Hermanas (Sevilla). Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (el de ejemplo, B91562384, tiene el control inválido), `sector` (sale en el h1 del hero: «{sector} en {ciudad}»), `descripcionCorta`, `anioFundacion` (sale como cifra «N años») y `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000606`), `email` (`.example`), `direccion` («Calle Ejemplo 8, nave 3»), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…0606`).
- [ ] `zonas`: los municipios reales (su número sale como cifra).
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo («un piso se cambia en un día», «precio cerrado por vivienda»…). Revísalos con el cliente.
- [ ] `trabajos`: los 5 son inventados, con `superficie`, `duracion`, `precio` y un `testimonio` de ejemplo. Ver §2 para las fotos.
- [ ] `valoracion` (4,8 / 96) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: 5 pasos de ejemplo («Nos mandas una foto», «Visita y medición», «Presupuesto por escrito», «Montaje sin obra», «Revisión»). Pon los pasos reales del cliente, o `[]` para usar los 4 de core. Nada que el cliente no cumpla siempre.
- [ ] `garantias`: «Sin obra ni escombros», «Precio cerrado antes de empezar», «Color aprobado por la comunidad…» y «10 años de garantía en perfiles» (`// GARANTÍA FICTICIA`). Solo lo que el cliente confirme.
- [ ] `acreditaciones`: la de ejemplo es inventada (`// ACREDITACIÓN FICTICIA`). Solo las reales, con `numero` solo si existe.
- [ ] `marcas` (Cortizo, Kömmerling, Persax, `// MARCAS DE EJEMPLO`): solo las que use el cliente.
- [ ] Precios: `precioDesde` de dos servicios y `precio` de dos trabajos llevan `// PRECIO FICTICIO`. Bórralos o pon cifras validadas por el cliente.
- [ ] `empresa.historia`, `imagenes` y `equipo` (3 personas de ejemplo).
- [ ] `preguntas`: las de ejemplo hablan de permisos de la comunidad, aislamiento, plazos («unas tres semanas») y colores. Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`hermanosarjona.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/hermanosarjona.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (16 rellenos grises y `CREDITOS.md`) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Fachadas (trabajos), 4:5, las más importantes:** foto del después y, si la hay, `antes` desde **el mismo punto, la misma altura y el mismo encuadre** (desde la acera de enfrente). Con `antes`, el trabajo sale con deslizador; los trabajos con `antes` van primero. El primero con `antes` es el hero (LCP y vista previa de WhatsApp si no hay `imagenesHero`). En la ficha del trabajo se ven a 4:3: deja aire alrededor.
- [ ] **Sin ningún trabajo con `antes`:** el hero usa `imagenesHero[0]`; sin ella, un dibujo de dos ventanas (sin foto). Pon al menos una pareja real si el cliente la tiene: es lo que vende el diseño.
- [ ] **Servicios, 4:3:** tarjetas y cabecera de su ficha. Un servicio sin foto sale con un icono de ventana sobre primario suave.
- [ ] **Empresa, 3:2:** el taller, la furgoneta… El equipo sale con iniciales: `equipo[].foto` no se pinta (ver §3).
- [ ] `galeria`: si el cliente solo tiene fotos sueltas (sin trabajos), salen como rejilla 4:5 en «Fachadas antes y después» y en `/trabajos`.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Mensaje general:** el encargo pedía «Hola, os escribo desde vuestra web. Os mando una foto de mi fachada para cambiar las ventanas:». Va el neutro de core, «Hola, os escribo desde vuestra web.» (regla común de Ysst), en la cabecera, la barra, el hero y `/contacto`. *Recomendado:* dejarlo, o un `contacto.mensajeWhatsapp` propio si el cliente solo hace ventanas.
- [ ] **Opciones del asistente** («¿Cuántas?»: 1 o 2, de 3 a 5, toda la vivienda, todo el edificio; «¿Dónde?»: un piso, una casa, un bajo, una comunidad): pensadas para ventanas. Con servicios como puertas de portal o azoteas, el mensaje queda raro («Os consulto por puertas de portal: toda la vivienda…»). *Recomendado:* con un catálogo variado, quitar el paso «¿Cuántas?» o adaptar las opciones en `components/secciones/TuFachadaIsla.tsx`.
- [ ] **Logo:** 32 px junto al nombre (el diseño dibuja 36). Con `logo`, el nombre baja a 14 px; con un nombre de más de 34 caracteres, en móvil «Llamar» y «Menú» se quedan en icono. *Recomendado:* logo cuadrado legible a 32 px.
- [ ] **Equipo con foto:** el diseño solo dibuja iniciales; a 56 px no cabe la etiqueta de origen. *Recomendado:* iniciales; si el cliente quiere fotos, añadirlas con `origen: "cliente"` (sin etiqueta) en `app/empresa/page.tsx`.
- [ ] **Color primario:** botones, cifras, checks y el fondo del asistente. `estiloMarca` calcula el texto encima; las cifras y enlaces en primario se oscurecen solos si el color es claro (`--color-primario-texto`). Probado con `#1e40af` y `#facc15`.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: textos de los botones («Mándanos una foto de tu fachada», «Pedir precio», «Quiero este cambio», «Quiero algo parecido») y los mensajes de core por servicio y por trabajo.
- `components/secciones/TuFachadaIsla.tsx`: `CUANTAS`, `DONDE` y el mensaje compuesto «Hola, os escribo desde vuestra web. Os consulto por {servicio}: {cuántas}, en {dónde}. Os mando una foto de la fachada.».
- `components/secciones/TuFachada.tsx`: «Elige y te dejamos el mensaje escrito. Solo tienes que enviarlo con una foto. No te pedimos ningún dato.».
- `app/page.tsx` y `app/servicios/page.tsx`: CTA final «¿Cómo quedaría tu fachada?» y «Hazle una foto desde la acera de enfrente y mándanosla. Te decimos qué cambiaríamos.».
- `app/contacto/page.tsx`: «Mándanos una foto desde la acera y te contestamos.». Solo es cierto si el cliente contesta por WhatsApp.
- `components/secciones/FachadasAntesDespues.tsx`: «Desliza cada foto para ver el cambio.».
- `lib/textos.ts`: las cifras (años, valoración, municipios, fachadas con antes si hay 3 o más). Salen solas de los datos; comprueba que sean ciertas.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo no existen todavía: prompts en `public/ejemplo/CREDITOS.md` (no en `docs/fotos-ejemplo/`). A un cliente real no le hacen falta.
- [ ] `/servicios` no venía dibujada en la exportación: se montó con las piezas del inicio (tarjetas, reseñas y CTA).
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).
- [ ] El filtro de `/trabajos` por servicio es con anclas (`/trabajos#servicio-…`, CSS `:target`), no con `?servicio=`.

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El hero muestra la pareja real antes/después, y en móvil (375 × 667) los dos botones se ven sin bajar, por encima de la barra.
- [ ] Sin JS, las fotos antes y después salen una al lado de la otra; con JS, el deslizador funciona con el dedo y con el teclado.
- [ ] Con JS, el asistente compone un mensaje con sentido para cada servicio real. Sin JS, cada opción abre WhatsApp. Sin `whatsapp`, el asistente no sale y Llamar pasa a ser el botón relleno.
- [ ] Las cifras son ciertas, y el texto de botones y cifras se lee sobre el primario del cliente (aviso de `estiloMarca` en el build).
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICI\|Arjona\|origen: \"ia\"" site.config.ts` no devuelve nada.
