# carpinteria-metalica-8 «Taller de siempre»: pasar a cliente real

Template de carpintería metálica (tipo proyecto) para un taller familiar de cerrajería metálica y persianas. Es un álbum del taller: collage orgánico de la nave y de una obra en el hero, «El taller» (años, equipo e historia) como sección estrella y un configurador de tres toques que deja el WhatsApp escrito.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Serralleria Bosch Ribalta», un negocio inventado de Badalona. Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (el de ejemplo, B65839127, tiene el control inválido), `sector` (sale en el h1: «{sector} en {ciudad}»), `descripcionCorta` (la de ejemplo dice «desde 1978»), `anioFundacion` (sale en el sello del hero, en «El taller», en `/empresa`, en el pie y bajo cada servicio) y `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000408`), `email` (`.example`), `direccion` («Calle Ejemplo 48, bajos»), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…0408`).
- [ ] `zonas`: los municipios reales (salen como cifra «N municipios» y en «Dónde trabajamos»).
- [ ] `servicios`: los del cliente. `contenido`, `incluye` y `preguntas` son de ejemplo y prometen cosas («intentamos pasar el mismo día», «3–4 semanas», «sin obra»). Revísalos uno a uno.
- [ ] `trabajos`: los 5 son inventados, con su testimonio. Ver §2 para las fotos.
- [ ] `valoracion` (4,7 / 112) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 5 pasos de ejemplo (el primero nombra WhatsApp). Pon los reales o `[]` para usar los 4 de core.
- [ ] `garantias` («Las reparaciones pequeñas, en el día», «Volvemos si algo falla»…): solo lo que el cliente confirme.
- [ ] `marcas` (Cortizo, Somfy) y `acreditaciones` («Socio del gremio local de cerrajería (ficticio)»): bórralas o pon las reales.
- [ ] `empresa.historia` (Josep, Marc y Laia son inventados), `imagenes` y `equipo` (4 personas: sale la cifra «4 personas en el taller»).
- [ ] `preguntas`: hablan de urgencias, comercios, edificios protegidos y plazos de galería. Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`boschribalta.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: vacío en el ejemplo; añade las reales si las hay.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` o `tarifas` solo con cifras validadas por el cliente.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (15 rellenos grises, tabla en `CREDITOS.md`) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero:** `imagenesHero[0]` = el taller por dentro (4:5, es el LCP: ≤ 120 KB) e `imagenesHero[1]` = una obra terminada (1:1, ≤ 40 KB). Sin la segunda, se usa la primera foto de `trabajos[0]`. Sin ninguna, el collage pasa a tres guijarros de color con la inicial (no queda hueco). `imagenesHero[0]` es también la imagen de Open Graph.
- [ ] **Servicios, 4:3:** se recortan en arco 4:5 y en tarjetas 4:3 del configurador: sujeto centrado. Un servicio sin foto sale con su inicial.
- [ ] **Trabajos, 4:3:** una foto principal y, si hay, `antes` con el mismo encuadre (comparador en la ficha).
- [ ] **Empresa:** 3 fotos del taller (3:2, 4:5, 3:2). **Equipo:** sin foto salen iniciales en guijarros; con `equipo[].foto` (real, nunca de IA) sale la foto. Nunca caras generadas con IA.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Nombre largo en la cabecera:** hasta 22 caracteres, a 20 px; de 23 a 36, a 15 px en dos líneas; desde 37, a 13 px y el botón «Menú» pasa a icono (☰ con texto para lector de pantalla). *Recomendado:* el nombre comercial corto.
- [ ] **Mensaje general** «Hola, os escribo desde vuestra web. Quería pediros un trabajo:» (encargo). Sale en la cabecera, la barra, el CTA y `/contacto`. *Recomendado:* dejarlo, o `contacto.mensajeWhatsapp` propio.
- [ ] **Color primario:** botones, círculos del proceso y el guijarro del CTA final. `estiloMarca` calcula el texto encima (con un amarillo sale casi negro, probado con `#facc15`). *Recomendado:* un color medio u oscuro.
- [ ] **Sello del hero:** «Desde {año}»; sin año, la valoración; sin las dos, no sale.
- [ ] Opciones fijas del configurador («un piso / un local o comercio / una comunidad / una casa» y «esta semana / este mes / sin prisa»): valorar con el cliente si encajan.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: `MENSAJE_TALLER` y `MENSAJE_NO_ENCONTRADA`.
- `components/cliente/Configurador.tsx`: `DONDES`, `CUANDOS` y el mensaje «Necesito {servicio} para {dónde}, {cuándo}. ¿Cuándo podéis pasar a verlo?».
- `components/secciones/CtaFinal.tsx` y `app/contacto/page.tsx`: «Te contesta alguien del taller.» Solo es cierto si quien coge el teléfono es del taller.
- `components/secciones/ZonasPreguntas.tsx`: «Si estás cerca y no ves tu municipio, pregúntanos.» y el recordatorio «Desde {año} en {ciudad}».
- `lib/textos.ts`: los sellos («años de taller», «personas en el taller», «N reseñas en Google», «municipios»). Salen de los datos; comprueba que sean ciertos.
- `app/contacto/page.tsx`: «Mándanos fotos y te decimos algo» (tarjeta de WhatsApp).

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/carpinteria-metalica-8/`) aún no existen. A un cliente real no le hacen falta.
- [ ] La cabecera no marca la página actual (está en el layout, sin JavaScript no sabe la ruta).
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Con JS, el configurador compone bien el mensaje con los servicios reales (título en minúscula dentro de la frase; siglas se respetan). Sin JS, sale la lista de servicios y el WhatsApp general.
- [ ] Sin `whatsapp`: no hay configurador, la barra lleva solo «Llamar» y los textos no nombran WhatsApp.
- [ ] El collage del hero se ve bien con las fotos reales (sujeto centrado en las máscaras de guijarro).
- [ ] La vista previa de la home en WhatsApp muestra la foto real del taller.
- [ ] `grep -rn "ejemplo\|ficticio\|Bosch\|origen: \"ia\"" site.config.ts` no devuelve nada.
