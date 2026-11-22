# fontaneria-premium-1 «Caudal»: pasar a cliente real

Template premium de fontanería (**tipo proyecto, sin urgencias**: baños completos, renovación de tuberías, agua caliente, comunidades). Hero a sangre con foto o vídeo, «pano» con la foto que crece al hacer scroll y una marquesina con los servicios, servicios apilados (`sticky`), collage de trabajos con parallax, cabecera inteligente y View Transitions. Todo con CSS y dos islas de menos de 1 KB.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** premium vive de las fotos. Este template está pensado para un cliente con **sesión de fotos real** (y, si se puede, un clip de vídeo). Con fotos de móvil o de IA pierde casi todo su valor.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Olmedo Instalaciones», un negocio inventado de Madrid. Borra también el comentario de cabecera y la constante `ia` si ya no hay fotos de IA.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B88417263, inventado), `sector` («Instalaciones de fontanería»), `descripcionCorta` («desde 1994»), `anioFundacion` (cifra del lema) y `tipoSchema`.
- [ ] `registroMercantil`: el de ejemplo pone «(ficticio)». Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000006`), `email` (`.example`), `direccion`, `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…006`). `urgencias24h` se queda en `false`: premium nunca es urgencias.
- [ ] `contacto.mensajeWhatsapp`: el de ejemplo («Hola, vengo de vuestra web. Quiero pedir presupuesto para una instalación:») sale en hero, cabecera, barra y contacto. Ponlo a gusto del cliente o quítalo.
- [ ] `zonas`: los municipios reales (la cifra dice «municipios donde trabajamos»).
- [ ] `servicios`: los del cliente; **hasta 6 salen apilados**, el resto va en «Más servicios». Cada uno con su foto 4:5. `contenido`, `incluye` y `preguntas` son de ejemplo.
- [ ] `servicios[].precioDesde` y `trabajos[].precio`: **precios ficticios** (marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente.
- [ ] `trabajos`: los 4 son inventados. Ver §2.
- [ ] `valoracion` (4,8 / 143) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 6 pasos son los del diseño y prometen mucho («Presupuesto por partidas cerrado», «Contrato con fecha», «Garantía escrita»). Pon los del cliente, o `[]` para usar los 4 de proyecto de core.
- [ ] `acreditaciones` (fontanería y RITE, «(ficticio)»), `garantias` («Fecha de inicio y de fin en el contrato», «Dos años de garantía»…) y `marcas` (Uponor, Geberit, Daikin, Roca, Grohe): solo lo que el cliente confirme.
- [ ] `empresa.historia`, `imagenes` y `equipo`: inventados.
- [ ] `galeria[0]`: es **la foto del pano** (la que crece) y la de `/trabajos` sin trabajos.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`fontaneria-premium-1.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/olmedoinstalaciones.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

`public/ejemplo/CREDITOS.md` tiene la tabla completa de huecos (dónde va cada foto, proporción, zona segura, cómo hacerla en la sesión real y qué sale si falta). Úsala como guion de la sesión de fotos.

- [ ] Borra `public/ejemplo/` entera (15 rellenos) y pon las fotos del cliente en `public/`, con `origen: "cliente"`. En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Tamaños mínimos:** 3:2 a 2400×1600 y 4:5 a 1600×2000.
- [ ] **Hero, la más importante:** `imagenesHero[0]`, **3:2**, con el **tercio inferior izquierdo vacío** (va el texto); en móvil se recorta con `object-position: 68% center`. Es también Open Graph, el LCP y el póster del vídeo. Sin foto, el hero sale tipográfico con textura.
- [ ] **Texto sobre la foto del hero:** con el relleno gris, el texto pequeño no llegaba a 4,5:1. Compruébalo con la foto real y, si no llega, sube el velo (`--velo-hero` en `app/globals.css`).
- [ ] **Pano:** `galeria[0]`, 3:2, sujeto en el tercio central (la marquesina cruza la franja media). Sin foto, textura con marquesina.
- [ ] **Servicios y trabajos, 4:5**, sujeto centrado (en las bandas se recortan a 4:1). El `antes` de un trabajo, con **el mismo encuadre exacto** (marca el trípode).
- [ ] **Empresa, 4:5:** almacén y manos trabajando; equipo a 72 px.
- [ ] **`videoHero`** está comentado. Actívalo solo con un clip real: 16:9 a 720p, 8 s en bucle (primer y último fotograma iguales), sin audio, H.264 de 1–3 MB (+ AV1 opcional); el póster es la foto del hero. Se monta tras cargar la página, nunca con «reducir movimiento» ni con ahorro de datos, y lleva botón de pausa.
- [ ] `videoPano` no se usa en «Caudal»: el pano es una foto.
- [ ] Sin caras, sin furgonetas rotuladas y sin texto legible en las fotos.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:** azul de agua `#0e6ba8`, el único acento sobre tinta. La palabra destacada usa `--color-primario-claro` (mezcla al 45 % con blanco), que sale algo más saturada que en el diseño: revísala en local con el color del cliente.
- [ ] **Logo:** con `negocio.logo`, va junto al nombre; nombres muy largos bajan de tamaño en la cabecera.
- [ ] **Cabecera inteligente** (`CabeceraScroll`): transparente sobre el hero, cambia de color según la sección y en escritorio se esconde al bajar, y entonces aparece la **pareja flotante**. Sin JS, cabecera fija y sólida.
- [ ] **Pano y apilado sin `animation-timeline`** (Safari y Firefox antiguos): se quedan quietos y legibles. Aceptado; míralo en un iPhone.
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` (aceptado).
- [ ] **Teléfono** con el formato de core («600 00 60 06»), no el 3-3-3 del diseño (aceptado).

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: el mensaje por defecto, el de servicio («Hola, quiero presupuesto de {servicio}. Os cuento la vivienda:») y el de trabajo.
- `components/secciones/AsistentePresupuesto.tsx`: preguntas («¿Qué necesitas?», «¿Dónde es la obra?», «¿Para cuándo?») y respuestas fijas («Casa o chalé», «Comunidad de vecinos», «En 1–3 meses», «Estoy comparando presupuestos»).
- `components/secciones/LemaCifras.tsx` y `Pie.tsx`: el lema «El agua, bien llevada.».
- `components/secciones/CtaFinal.tsx` («Pide presupuesto de tu instalación»), `app/servicios/[slug]/page.tsx` («¿Hablamos de…?»), `app/trabajos/[slug]/page.tsx` («¿Quieres algo parecido?»).
- `components/Botones.tsx`: «Pedir presupuesto por WhatsApp» y «Llamar ahora».
- `components/secciones/PanoInstalacion.tsx`: «Lo que hacemos, en una instalación».

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/fontaneria-premium-1/`) aún no existen. Los prompts están en `CREDITOS.md`.
- [ ] El nombre «Olmedo Instalaciones» no se ha comprobado en Google: no lo uses para una demo pública sin buscarlo.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Home a 375 y 1280 px: el texto del hero se lee sobre la foto real; nada animado entre el h1 y el botón de llamada.
- [ ] El pano crece y la marquesina se mueve en Chrome; el botón de pausa para el vídeo **y** la marquesina; con «reducir movimiento», todo quieto y legible.
- [ ] Servicios apilados con los reales: con más de 6, «Más servicios»; en pantallas de menos de 600 px de alto, lista normal.
- [ ] La foto de un trabajo pasa de la tarjeta a su ficha (View Transition) en Chrome.
- [ ] El vídeo, si lo hay, no carga con ahorro de datos y el póster es el LCP.
- [ ] La vista previa de la home en WhatsApp muestra la foto real del hero.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Olmedo\|origen: ia" site.config.ts` no devuelve nada.
