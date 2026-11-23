# carpinteria-metalica-5 «Perfil»: pasar a cliente real

**Qué es:** el template de carpintería de aluminio de gama alta (tipo proyecto), en clave baja: negro, acento champán anodizado, serif Newsreader.

**Cómo es:**
- **Hero:** un vídeo macro del canto de un perfil, con póster obligatorio.
- **Sección estrella:** «Lo que fabricamos», las soluciones como fichas alternas con números romanos.
- **Asistente «Consulta»:** compone el mensaje de WhatsApp con tres preguntas.
- **Barra móvil:** WhatsApp | Llamar.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Lumbral Ventanas», un negocio inventado de Alcobendas (Madrid). Borra también el comentario de cabecera.

- [ ] **`negocio`:**
  - `nombre` y `nombreLegal`.
  - `nif`: el de ejemplo, B87214590, tiene el dígito de control inválido.
  - `sector`: sale en el h1 como «{sector} en {ciudad}».
  - `descripcionCorta`: sale en el hero.
  - `anioFundacion`: sale como «Desde 2009» en el hero, en `/empresa` y en las garantías.
  - `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] **`contacto`:**
  - `telefono` y `whatsapp` (`+34600000502`).
  - `email` (`.example`).
  - `direccion` («Calle Ejemplo, 31, nave 6»).
  - `horario`: debe coincidir con la ficha de Google.
  - `fichaGoogle` (`cid=000…0402`).
- [ ] `zonas`: los municipios reales.
- [ ] **`servicios` (en la web, «soluciones»):** los del cliente, cada uno con su foto.
  - `contenido`, `incluye` y `preguntas` son de ejemplo y hablan de grúas, licencias y montaje con ventosas.
  - Con más de 4, los demás salen como índice en la home.
- [ ] **`trabajos` («obras»):**
  - Las 5 son inventadas, con superficies, duraciones y el testimonio de «Carlota M.».
  - Fotos: ver §2.
- [ ] **`valoracion` (4,9 / 41) y `resenas`:** inventadas. Pon solo las reales de su ficha de Google, o quita los dos campos.
  - La reseña grande es la más reciente de menos de 280 caracteres.
- [ ] **`proceso`:** los 6 pasos de ejemplo prometen cosas: «Presupuesto cerrado», «fecha de montaje por escrito», «Volvemos a los seis meses». Pon los pasos reales del cliente, o `[]` para usar los 4 de core (sin promesas).
- [ ] **`garantias`** (las de ejemplo son promesas del mismo tipo) **y `marcas`** (Cortizo, Technal): solo lo que el cliente confirme.
  - Sin garantías, el bloque se titula «Nuestro oficio» y muestra el año, las acreditaciones y los sistemas.
- [ ] **`empresa`:** `historia` (cuenta 2009 y «sin subcontratas»), `imagenes` y `equipo` (nombres de pila inventados).
- [ ] **`preguntas`:** las de ejemplo prometen «fecha de montaje por escrito» y la revisión a los seis meses. Revísalas con el cliente.
- [ ] **`seo`:** `titulo`, `descripcion` y `url` (`lumbralejemplo.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] **`analitica: { vercel: true }`** (plan Básico) y *Enable* en Vercel.
- [ ] **`redes`:** `instagram.com/lumbral.ejemplo` → las reales, o quita el campo.
- [ ] **Precios:** el ejemplo no trae ninguno, porque la gama alta se presupuesta por proyecto. Pon `precioDesde` solo con cifras validadas por el cliente.

## 2. Fotos y vídeo

- [ ] **Borra `public/ejemplo/` entera:** 14 JPG de relleno, 2 vídeos de relleno y `CREDITOS.md`.
  - Pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`).
  - En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Vídeo del hero (`videoHero`):** `.mp4` H.264 + AV1 opcional, 8 s en bucle, sin audio, 1280×720, ≤ 1,5 MB.
  - Póster obligatorio: 16:9, 1920×1080, con el motivo en la zona central 4:5, porque en móvil se recorta.
  - Sin vídeo, quita `videoHero`: sale `imagenesHero[0]` con el mismo tratamiento.
  - Sin ninguna foto, sale el hero tipográfico con el dibujo del perfil.
- [ ] **Open Graph:** la vista previa de WhatsApp usa `imagenesHero[0]` (no el póster). Pon ahí la mejor foto de obra.
- [ ] **Soluciones (3:2):**
  - Detalles de producto en clave baja: carril, herraje, encuentro con el muro.
  - Una solución sin foto sale como ficha tipográfica con el romano grande, sin romper nada.
- [ ] **Obras:**
  - Foto principal en 3:2 (la 4:5 también funciona).
  - Si hay, `antes` con **el mismo encuadre**: sale el deslizador antes/después.
  - Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] **Empresa (3:2):** 2 fotos de taller. Se pintan en blanco y negro.
  - El equipo es una lista; con `equipo[].foto` sale una miniatura de 56 px junto al nombre (foto real, nunca una cara de IA).
- [ ] **Formato:** JPG de calidad ~82, lado largo ≤ 1600 px, y un `alt` que describa la foto. La ficha de estilo está en `public/ejemplo/CREDITOS.md`; léela antes de borrarla.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario (`marca.colorPrimario`):** el champán `#c8b48c` es el acento de toda la web: botones, filetes y números romanos.
  - Está probado con `#1e40af` y `#facc15`; `estiloMarca` calcula el texto encima.
  - *Recomendado:* dejar el champán, o un color de marca claro o medio que se lea sobre negro.
- [ ] **Mensaje general:** «Hola, os escribo desde vuestra web.» El diseño proponía «… y quería enseñaros los planos:».
  - *Recomendado:* el neutro, o `contacto.mensajeWhatsapp` propio.
- [ ] **Nombre largo en la cabecera:** con más de 24 caracteres, el nombre baja a 11 px. Por debajo de 400 px, además, se oculta el [Llamar] de la cabecera, porque la barra móvil ya lo lleva.
  - *Recomendado:* un nombre comercial corto en `negocio.nombre`.
- [ ] **«Taller en {ciudad}»:** el diseño decía «Nave en…».
  - *Recomendado:* la palabra que use el cliente (`lib/textos.ts`, `lineaTaller`).
- [ ] **Etiqueta de IA del hero:** va arriba a la izquierda, bajo la cabecera. Con fotos reales no sale.

## 4. Textos fijos que conviene revisar

- **`lib/mensajes.ts`:** los textos de botón son «Envíanos planos o fotos», «Consultar esta solución», «Quiero algo parecido», «Enviar consulta por WhatsApp» y «Escríbenos por WhatsApp».
  - Los mensajes de servicio y obra son los de core: «Hola, quiero información sobre {solución}.» y «Hola, he visto el trabajo «{obra}» y quiero algo parecido.».
- **`components/cliente/Consulta.tsx`:** los tipos de obra (vivienda nueva, reforma de un piso, chalet o ático, estudio de arquitectura), las fases («Tengo planos»…) y la frase «Os consulto por {solución} para {obra}.».
- **`components/secciones/CtaFinal.tsx`:** «¿Tienes planos?» y «Te decimos qué solución encaja y cuándo podemos montarla.».
- **`app/page.tsx`:**
  - «Lo que fabricamos».
  - La frase de la franja: «Envíanos los planos y te decimos qué solución encaja.».
- **`components/secciones/Compromisos.tsx`:** «Nuestras garantías» y, sin garantías, «Nuestro oficio».
- **`components/secciones/Metodo.tsx`:** «Cómo trabajamos».
- **`lib/textos.ts`:** «O llama al {teléfono}» (solo junto al botón de WhatsApp) y «Desde {año} · Taller en {ciudad}».

## 5. Lo que falta o queda pendiente

- [ ] **Favicon:** `app/favicon.ico` es el de Next. Pon uno del cliente.
- [ ] **Fotos, vídeo y prompts de la demo:** las fotos y el vídeo de IA aún no existen, ni sus prompts en `docs/fotos-ejemplo/carpinteria-metalica-5/` (los prompts están en `CREDITOS.md`). A un cliente real no le hacen falta.
- [ ] **404 sin JS:** un 404 lanzado con `notFound()` sale en blanco sin JS. Es una limitación de Next (AGENTS §11).
- [ ] **Piezas del registro:** `MenuPopover` (a pantalla completa), `BarraMovil`, `Preguntas`, `Migas`, `Foto`, `MedioHero` y `AntesDespues` ya van reestiladas aquí. No hay que copiar nada.

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] **Asistente:** con las soluciones reales, compone frases correctas («Os consulto por … para …»). Sin `whatsapp`, el asistente no sale y el hero muestra «Llamar · {teléfono}».
- [ ] **Vídeo:**
  - Arranca después de cargar la página.
  - El botón de pausa funciona.
  - Con «reducir movimiento», solo sale el póster.
- [ ] **Hero a 375×667:** el h1 y los dos botones caben por encima de la barra móvil.
- [ ] **Deslizador antes/después:** se mueve con el teclado. Sin JS, salen «Antes» y «Después» uno debajo del otro.
- [ ] **Vista previa en WhatsApp:** la de la home muestra una foto real (`imagenesHero[0]`).
- [ ] **Sin restos del ejemplo:** `grep -rn "ejemplo\|ficticio\|Lumbral\|origen: \"ia\"" site.config.ts` no devuelve nada.
