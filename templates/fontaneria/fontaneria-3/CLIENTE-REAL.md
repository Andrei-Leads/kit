# fontaneria-3 «La furgoneta»: pasar a cliente real

Template de fontanería (tipo urgencias). Foto documental a sangre en el hero con la cabecera transparente encima, reseñas de vecinos a gran tamaño y un bento de «piedras» con la confianza. Paleta arena, marino y terracota; menú a pantalla completa.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** el hero vive de una foto real de la furgoneta o del barrio del cliente. Sin ella sale un hero tipográfico correcto, pero se pierde la idea del diseño.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Fontanería y Saneamientos Hermanos Rendón», un negocio inventado de Sevilla. Borra también el comentario de cabecera.

- [ ] `negocio.nombre` (se pinta en dos niveles: las dos últimas palabras en grande, «Hermanos Rendón», y lo anterior en pequeño), `nombreLegal`, `nif` (E90345127, inventado), `sector`, `descripcionCorta` («desde 1989»), `anioFundacion` y `tipoSchema`.
- [ ] `registroMercantil`: el ejemplo es una C.B. y no lo lleva. Solo en una sociedad, con los datos reales.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600003003`), `email` (`.example`), `direccion` («Calle San Jacinto 41»), `coordenadas`, `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…003`).
- [ ] `contacto.urgencias24h` y `tiempoLlegada` («30 min»): salen como chips del hero y piedras del bento. Solo si el cliente los cumple.
- [ ] `contacto.mensajeWhatsapp`: el de ejemplo («Hola, os escribo desde la web. Os cuento lo que me pasa:») sale en hero, cabecera, barra y contacto. Ponlo a gusto del cliente o quítalo (entonces sale el de `lib/mensajes.ts`).
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo (casas antiguas, aljibes, baño para mayores…).
- [ ] `trabajos`: los 5 son inventados. Ver §2.
- [ ] `valoracion` (4,9 / 186) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos. Este diseño las pone muy arriba: sin reseñas reales pierde mucho.
- [ ] `proceso: []`: usa los pasos de core. Pon los del cliente si los tiene.
- [ ] `acreditaciones` (gas, número ficticio) y `garantias` («Volvemos si algo falla», «Dejamos todo limpio»…): solo lo que el cliente confirme.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` o `tarifas` solo con cifras validadas por el cliente; sin datos, la sección no sale.
- [ ] `empresa.historia`, `imagenes` y `equipo`: inventados.
- [ ] `galeria`: una foto de ejemplo (zaguán de Triana), que además entra en el bento como piedra con foto.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`fontaneria-3.vercel.app` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: vacío; añade las reales si las hay.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (16 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero, la más importante:** `imagenesHero[0]`, **3:2** (2400 px de ancho). En móvil se recorta en vertical con `object-position: center 70%`; deja aire arriba para el texto y la cabecera. Es también la imagen de Open Graph y el LCP. La furgoneta del cliente en su calle es la foto ideal; matrícula no legible.
- [ ] **Cabecera transparente:** el texto claro va sobre un velo de tinta. Con una foto muy clara, comprueba el contraste del menú y la llamada.
- [ ] **Servicios, 4:5.**
- [ ] **Trabajos, 4:5**, que salen también **a sangre arriba de la ficha** (440 px de alto en móvil, 620 en escritorio): motivo centrado. Si hay `antes`, con el mismo encuadre. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] **Empresa, 4:5:** se ve a sangre en `/empresa`, motivo centrado. Equipo: foto cuadrada o, sin foto, iniciales.
- [ ] Sin caras reconocibles salvo permiso por escrito.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px (hero hasta 2400) y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Botón de WhatsApp de la ficha de servicio:** usa todavía la regla antigua de fontanería, «Pide presupuesto de {servicio} por WhatsApp» (`lib/mensajes.ts`, `etiquetaWhatsappServicio`). La regla aprobada en electricidad es un texto corto («Pregunta por WhatsApp») con el servicio en el mensaje. *Recomendado:* pasar a la regla nueva si el botón se parte en dos líneas o el título del servicio es largo o empieza por verbo.
- [ ] **Nombre en dos niveles:** con nombres cortos va entero; con más de 18 caracteres la llamada dice «Llamar ahora» en vez de «Llama a {nombre}». Comprueba que las dos últimas palabras tengan sentido solas.
- [ ] **Logo:** con `negocio.logo`, va a 32 px a la izquierda del nombre (`alt=""`).
- [ ] **Color primario:** marino de azulejo `#1f3a6b`. El template deriva `--color-primario-texto` (`lib/marca.ts`) para los textos en primario. *Recomendado:* un color medio u oscuro; con uno claro, mira el aviso del build.
- [ ] **Menú a pantalla completa** con la isla `CerrarMenuAlSalir` (cierra el menú si el foco sale con Tab). Aceptada como excepción en menús a pantalla completa (abierta en fontanería).
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` (abierta; se recomienda mantenerlo).

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: el mensaje por defecto, el de servicio («Hola, os escribo por {servicio}. Os mando una foto.») y el de trabajo («Tengo algo parecido en casa.»).
- `components/Pareja.tsx`: «Envíanos una foto por WhatsApp». Solo si el cliente acepta fotos.
- `lib/textos.ts`: «Llamar 24 h», «Llama a {nombre}» o «Llamar ahora», y la línea de valoración u horario.
- `components/secciones/CtaFinal.tsx`: «¿Te lo miramos hoy?». Solo si el cliente sale el mismo día.
- `components/secciones/ResenasVecinos.tsx` («Lo que dicen los vecinos»), `BentoPiedras.tsx` («Por qué nos llaman»), `Servicios.tsx` («Qué arreglamos»).
- `app/trabajos/[slug]/page.tsx`: «¿Tienes algo parecido en casa?» y «Quiero algo parecido».
- `app/servicios/[slug]/page.tsx`: «Lo último que dicen de nosotros».

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/fontaneria-3/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Decisiones de fontanería aún abiertas (carpeta del proyecto `nueva-generacion/fontaneria-integracion/`): etiqueta «Foto de ejemplo», teléfono con formato de core, dependencias sin uso.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Home a 375 px: la llamada del hero se ve sin hacer scroll y el texto se lee sobre la foto real; el botón de llamada de la ficha de servicio queda bajo el pliegue (igual que en el diseño).
- [ ] El menú a pantalla completa abre y cierra sin JS, con Esc y con «Cerrar».
- [ ] El nombre en dos niveles se lee bien en cabecera y pie a 375 px.
- [ ] El bento no deja huecos raros con los datos reales (con pocas piedras, cambia de reparto).
- [ ] La vista previa de la home en WhatsApp muestra la foto real del hero.
- [ ] `grep -rn "ejemplo\|ficticio\|Rendón\|origen: \"ia\"" site.config.ts` no devuelve nada.
