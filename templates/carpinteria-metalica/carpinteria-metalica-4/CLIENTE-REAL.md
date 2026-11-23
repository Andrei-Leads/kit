# carpinteria-metalica-4 «Plano»: pasar a cliente real

Template de carpintería metálica (aluminio y PVC, tipo proyecto). La web es una lámina de taller: retícula de cianotipia, cotas con datos reales, cajetín con el nombre del negocio y obras numeradas como láminas. El hero es tipográfico, sin foto. La sección estrella, «De la medida a la obra», dibuja una ventana capa a capa con el scroll. La «Hoja de medición» compone el mensaje de WhatsApp en tres casillas.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Albenca Aluminio», un negocio inventado de Alboraya (Valencia). Borra también el comentario de cabecera y el de la variante «datos mínimos» del final.

- [ ] **`negocio`:**
  - `nombre` sale en el cajetín del índice, en el cajetín del hero y en el pie.
  - `nombreLegal`.
  - `nif`: el de ejemplo, B98431267, tiene el dígito de control inválido.
  - `sector` sale en el h1: «{sector} en {ciudad}».
  - `descripcionCorta`.
  - `anioFundacion` sale como cota «Desde 2004 · N años» en `/empresa`.
  - `tipoSchema`.
- [ ] `registroMercantil` lleva «(ficticio)». Ponlo solo si es una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] **`contacto`:**
  - `telefono` y `whatsapp`: `+34600111401`.
  - `email`: dominio `.example`.
  - `direccion`: «Calle Ejemplo 14, nave 3».
  - `horario`: debe coincidir con la ficha de Google.
  - `fichaGoogle`: `cid=000…0401`.
- [ ] `zonas`: los municipios reales. En el hero salen 3 y «N más».
- [ ] **`servicios`:**
  - Pon los del cliente.
  - `contenido`, `incluye` y `preguntas` son de ejemplo.
  - `precioDesde` lleva `// PRECIO FICTICIO`. Usa solo cifras validadas por el cliente, o quita el campo.
- [ ] `trabajos`: los 5 son inventados, con `superficie`, `duracion` y `precio` de ejemplo (`// PRECIO FICTICIO`). Ver §2 para las fotos.
- [ ] `valoracion` (4,8 / 63) y `resenas`: son inventadas. Pon solo las reales de su ficha de Google, o quita los dos campos.
- [ ] **`proceso`:** los 5 pasos de ejemplo incluyen «En uno o dos días te mandamos el presupuesto cerrado», «Montamos en el día» y «Volvemos a las pocas semanas». Elige una:
  - Pon los pasos reales del cliente.
  - Pon `[]` para usar los 4 de core. El dibujo de la ventana se reparte igual.
- [ ] `acreditaciones`: «Instalador homologado de sistemas de aluminio (ficticio)» es **ficticia**. Pon solo acreditaciones reales y con su número si lo tienen.
- [ ] `garantias` («Volvemos a ajustar sin coste el primer año»…) y `marcas` (Cortizo, Strugal, Technal, Somfy): pon solo lo que el cliente confirme.
- [ ] `empresa.historia`, `imagenes` y `equipo`. El equipo tiene nombres de ejemplo («Toni», «Lucía», «Rafa»), que también aparecen en una reseña.
- [ ] `preguntas`: las de ejemplo hablan de plazos de fabricación («de tres a cuatro semanas»). Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion`, `seo.url` (`albenca-aluminio.example` → el dominio definitivo) y **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes` no viene en el ejemplo. Añádelo si el cliente tiene redes; el pie las enlaza.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (14 rellenos grises; tabla en `public/ejemplo/CREDITOS.md`).
- [ ] Pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Trabajos, 4:3, las más importantes:** son las láminas de «Obras recientes» (la primera sección de la home) y de `/trabajos`.
  - Alzado frontal, sin cielo y con algo de muro alrededor.
  - Si hay `antes`, con el mismo encuadre: sale el deslizador.
  - Sin trabajos ni `galeria`, la sección y `/trabajos` desaparecen.
- [ ] **Servicios, 1:1:** son miniaturas de 88 px en el despiece y la foto de la ficha.
  - Un servicio sin foto sale como bloque rayado con su REF, sin romper nada.
  - En el ejemplo, «Persianas y cajones» va sin foto a propósito.
- [ ] **Open Graph:** el hero no lleva foto (`imagenesHero: []`), así que la vista previa de WhatsApp usa la **foto del primer servicio**. Elige una:
  - Ordena `servicios` para que el primero tenga una buena foto.
  - Pon una foto en `imagenesHero` (el diseño no la pinta).
- [ ] **Empresa, 3:2:** 1–3 fotos del taller.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.
- [ ] La etiqueta de origen va **fuera** de la foto, como pie de figura («FIG. 03 · Foto de tu ficha de Google»). Con `origen: "cliente"` no sale.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:** todos los azules (retícula, cotas, caja del CTA, menú, barra móvil) salen del primario con `oklch(from …)`. En navegadores viejos se usa `color-mix` como respaldo.
  - El azul plano `#1d4f91` es el color por defecto.
  - *Recomendado:* un azul o un color medio u oscuro.
  - Con un amarillo (`#facc15`, probado), el texto del botón pasa a casi negro y la retícula se tiñe de amarillo. Funciona, pero pierde el aire de plano.
- [ ] **Logo:** sale a 32 px junto al nombre en el cajetín del índice (escritorio) y en la cabecera móvil, con `alt=""` porque el nombre va al lado. *Recomendado:* un logo cuadrado o un símbolo legible a 32 px. Si es horizontal con el nombre dentro, mejor sin logo.
- [ ] **Nombre largo en móvil:** a partir de 26 caracteres, la cabecera móvil lo estrecha (Martian Mono al 75 % de ancho) y lo parte en dos líneas, sin puntos suspensivos. Si el nombre comercial tiene más de unos 40 caracteres, valora un nombre corto.
- [ ] **Mensaje general** «Hola, os escribo desde vuestra web.»: es el neutro de core y sale en la cabecera, la barra, `/contacto` y el CTA. Si el cliente quiere otro, ponlo en `contacto.mensajeWhatsapp`.
- [ ] **Hoja de medición:** las casillas fijas («1 ventana / 2 o 3 / 4 o más / Toda la casa» y la de persiana) asumen ventanas. Si el cliente hace sobre todo cerramientos o puertas, cambia `lib/hoja.ts`.
- [ ] **Título de las notas:** con `garantias` sale «Nuestras garantías»; si solo hay acreditaciones, «Notas del plano».

## 4. Textos fijos que conviene revisar

- `lib/hoja.ts`: `HUECOS`, `PERSIANA` y el mensaje compuesto «… Hoja de medición: {servicio} · Huecos: {huecos} · Persiana: {persiana}. ¿Cuándo podéis venir a medir?».
- `lib/mensajes.ts`: el de la ficha de servicio, «Hola, quiero información sobre {servicio}.», y el de la ficha de trabajo.
- `components/secciones/CtaFinal.tsx`: «¿Vamos a medir?» y «Te decimos qué día podemos pasar.».
- `components/secciones/HojaMedicionServidor.tsx`: «Rellena la hoja y vamos a medir».
- `components/secciones/RelatoObra.tsx`: el título «De la medida a la obra». El texto de cada paso sale de `proceso`.
- `components/Botones.tsx`: «Envíanos fotos y medidas». Solo tiene sentido si el cliente contesta con fotos por WhatsApp.
- `app/servicios/[slug]/page.tsx`: el botón «Pedir medición».
- `lib/textos.ts`: las cotas del hero (año, valoración, municipios). Salen solas de los datos; comprueba que sean ciertas.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/carpinteria-metalica-4/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).
- [ ] La animación del dibujo de la ventana usa `animation-timeline: view()`. En Firefox y Safari sin soporte, el dibujo sale completo y quieto (es lo previsto).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] **Hoja de medición:**
  - Con JS, compone bien el mensaje con 2–3 servicios reales.
  - Sin JS, cada opción abre WhatsApp.
  - Con un solo servicio empieza en la casilla 2.
  - Sin `whatsapp` no sale, y los botones pasan a «Llamar».
- [ ] La cabecera móvil a 375 px muestra el nombre entero (con 54 caracteres y logo ocupa tres líneas) junto a «Llamar» y «Menú».
- [ ] La retícula y las cotas se leen con el primario del cliente (aviso de `estiloMarca` en el build).
- [ ] La vista previa de la home en WhatsApp muestra una foto real (primer servicio o `imagenesHero`).
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICI\|Albenca\|origen: \"ia\"" site.config.ts` no devuelve nada.
