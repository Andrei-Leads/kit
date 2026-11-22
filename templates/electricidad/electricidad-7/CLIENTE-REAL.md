# electricidad-7 «Mándanos una foto»: pasar a cliente real

Template de electricidad (tipo urgencias). El hero es un **asistente de WhatsApp con aspecto de chat**: tres preguntas con botones («¿Qué te pasa?», «¿Desde cuándo?», «¿Dónde?») que componen el mensaje y abren WhatsApp para mandar la foto. Fotos verticales 3:4 como recibidas en un chat.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** el diseño necesita `contacto.whatsapp` y un cliente que conteste por WhatsApp. Sin WhatsApp, el hero pasa a «Llámanos y cuéntanos qué te pasa» y pierde la idea: valora otro template.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Fil a Fil Electricistes», un negocio inventado de Barcelona. Borra también el comentario de cabecera. Que «Fil a Fil» no exista en Barcelona está sin comprobar.

- [ ] `negocio.nombre` (siempre entero en la cápsula; con más de 26 caracteres ocupa su propia fila), `nombreLegal`, `nif` (B67214584, control inválido a propósito), `sector`, `descripcionCorta` («Mándanos una foto por WhatsApp y te decimos qué es y cuánto cuesta antes de venir»), `anioFundacion` y `tipoSchema`.
- [ ] `registroMercantil`: el de ejemplo pone «(ficticio)». Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000407`), `email` (`.example`), `direccion` («Calle Ejemplo, 12»), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…307`).
- [ ] `contacto.urgencias24h` (`false` en el ejemplo) y `tiempoLlegada` («40 min»): solo si el cliente los cumple.
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`: los del cliente, **con títulos en forma de síntoma** («Se ha quemado un enchufe»): son las respuestas de la primera pregunta del asistente y van dentro de la frase «Es por: {servicio}.». Un servicio tiene `mensajeWhatsapp` propio de ejemplo; revísalo. `contenido`, `incluye` y `preguntas` son de ejemplo.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` o `tarifas` solo con cifras validadas por el cliente; sin datos, no salen.
- [ ] `trabajos`: los 4 son inventados. Ver §2.
- [ ] `valoracion` (4,9 / 138) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: no está en el ejemplo, así que salen los pasos de urgencias de core. Pon los del cliente si los tiene (por ejemplo, el de la foto por WhatsApp).
- [ ] `acreditaciones` (RII «08/000000 (ficticio)») y `garantias` («Precio orientativo por WhatsApp antes de venir», «Factura con IVA»): solo lo que el cliente confirme.
- [ ] `empresa.historia`, `imagenes` y `equipo`: inventados.
- [ ] `galeria`: una foto de ejemplo (solo se ve si no hay trabajos).
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`filafilejemplo.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/filafil.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (14 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Todas verticales 3:4**, con radio de 18 px, nunca a sangre. Fotos de móvil del propio electricista encajan perfectamente con el diseño. Sin caras.
- [ ] **El hero no lleva foto** (es el chat). La vista previa de WhatsApp (Open Graph) usa `galeria[0]` y, sin galería, la primera foto de servicio. Elige bien esa foto, o pon una en `imagenesHero` solo para Open Graph.
- [ ] **Trabajos con `antes`:** mismo encuadre exacto. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`. `proceso[].imagen` no se pinta.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:** verde azulado `#0e7490` (burbujas, bordes de respuesta, CTA). Si el primario del cliente no llega a 3:1 sobre la superficie (un amarillo), `lib/marca.ts` cambia el borde de las respuestas por el gris del template. *Recomendado:* un color medio u oscuro; mira el aviso de contraste del build.
- [ ] **Logo:** con `negocio.logo`, va en la cápsula junto al nombre.
- [ ] **Página actual del menú** con la isla mínima `NavEscritorio` (`usePathname`). Aceptado.
- [ ] **Respuestas fijas del asistente** (`lib/asistente.ts`): «Ahora mismo / Desde hoy / Hace días» y «En casa / En un local / En una zona común del edificio». Si el cliente solo trabaja para particulares o solo para comunidades, ajústalas.
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` (aceptado).

## 4. Textos fijos que conviene revisar

- `lib/asistente.ts`: preguntas, respuestas, «Listo. Este es el mensaje que vas a enviar:» y la frase final «Ahora os mando una foto.». Mensaje compuesto: «Hola, os escribo desde vuestra web. Es por: … Empezó hoy. Es en casa. Ahora os mando una foto.».
- `lib/mensajes.ts`: «Hola, os escribo desde vuestra web. Ahora os mando una foto de lo que me pasa:», el de servicio («Hola, os escribo por: {servicio}. Ahora os mando una foto.») y el de trabajo. O pon `contacto.mensajeWhatsapp` propio.
- `components/Botones.tsx`: «Mándanos una foto».
- `components/secciones/HeroChat.tsx`: «Mándanos una foto y te decimos qué es» (sin WhatsApp, «Llámanos y cuéntanos qué te pasa»).
- `components/secciones/CtaFinal.tsx` («¿Nos mandas la foto?» o «¿Nos llamas?»), `app/page.tsx` («¿Lo tienes delante ahora?»), `components/secciones/Confianza.tsx` («Por qué fiarte»).
- `lib/textos.ts`: «Llamar 24 h · número» o «Llamar · número», y las fichas de confianza.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/electricidad-7/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Para core más adelante: la privacidad habla de «formulario» y el aviso legal muestra el teléfono sin formato.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Con JS, el asistente compone bien el mensaje con 2–3 servicios reales (sin frases rotas como «Es por: reparación de reparación…»). Sin JS, cada respuesta abre WhatsApp con el mensaje hasta ese paso.
- [ ] Home a 375 px: el chat, la llamada y «Mándanos una foto» se ven sin hacer scroll; el botón final no queda bajo la barra móvil.
- [ ] Sin `whatsapp`, no sale ningún botón de WhatsApp ni el asistente.
- [ ] Con el primario del cliente, las burbujas y los bordes de respuesta se leen.
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Fil a Fil\|origen: \"ia\"" site.config.ts` no devuelve nada.
