# reformas-5 «Tu casa»: pasar a cliente real

Template de reformas (tipo proyecto), cálido y centrado en la casa vivida. El hero va a sangre, con foto o vídeo, y una cabecera transparente encima. Las estancias van en arcos con su precio de partida, y las casas (trabajos) también en arco, con antes/después.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Casa Bellver Reformas», un negocio inventado de Valencia. Borra el comentario de cabecera y la nota «Variante datos mínimos» del final.

- [ ] `negocio.nombre`, `nombreLegal` (en el ejemplo, una autónoma inventada: «Marta Bellver Climent») y `nif` (20456789A, con la letra inválida). Si es una sociedad, añade `registroMercantil`.
- [ ] `sector`, `descripcionCorta`, `anioFundacion` (sale como «años reformando casas») y `tipoSchema`.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000515`), `email` (`.example`), `direccion` («Calle Ejemplo, 21»), `horario` y `fichaGoogle` (`cid=000…515`).
- [ ] `servicios` (estancias): **borra los 6 `precioDesde`** («desde 5.900 €»… «desde 12 €/m²», PRECIO FICTICIO) salvo los que el cliente valide. Sin ningún precio, desaparece la frase «Cada estancia con su precio orientativo de partida.».
- [ ] `trabajos`: inventados. **Borra el `precio`** del de Patraix («entre 24.000 y 28.000 €», PRECIO FICTICIO). Los testimonios son inventados («como decía el contrato»).
- [ ] `valoracion` (4,9 / 88) y `resenas`: inventadas. Solo las reales de Google, o quita los dos campos.
- [ ] `garantias` («Fecha de entrega en el contrato», «Casa barrida cada tarde», «2 años de garantía»): solo lo que el cliente firme.
- [ ] `proceso` está vacío: salen los 4 pasos de core. Si el cliente tiene los suyos, ponlos (≤ 6).
- [ ] `empresa.historia` y `equipo` (Marta Bellver, Joan Ferrer y Rosa Llopis son personas inventadas).
- [ ] `zonas`, `marcas` y `preguntas`.
- [ ] `seo.titulo`, `seo.descripcion` (dice «con precios de partida por estancia»: quítalo si no hay precios), `seo.url` (`casa-bellver-ejemplo.example` → el dominio definitivo) y **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram`/`facebook` `casabellver.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (18 rellenos) y pon las del cliente en `public/`, con `origen: "cliente"`. En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero, la más importante:** `imagenesHero[0]`, a 16:9 (1600×900). También es la imagen de Open Graph (vista previa de WhatsApp) y el LCP. Interior luminoso y habitado, sin caras. Sin foto, el hero sale como un arco tipográfico.
- [ ] **Cabecera transparente:** el texto blanco va sobre un velo del 35 %. Con una foto clara (paredes de cal), comprueba el contraste y, si no llega, sube `--velo-cabecera` a 0,5 en `app/globals.css`.
- [ ] **Estancias y casas, 3:4** (se recortan en arco: deja aire arriba). Un `antes` con **el mismo encuadre exacto** que la foto de después, o el deslizador no funciona. Sin `antes`, no hay deslizador.
- [ ] Empresa: un detalle (`detalle-azulejo.jpg` en el ejemplo). Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] **`videoHero`** está comentado. Actívalo solo con un vídeo real: 16:9, ~8 s en bucle, sin audio, H.264 ≤ 1,5 MB (+ AV1 opcional) y póster = la foto del hero, con `origen: "cliente"`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y `alt` descriptivo.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Proceso:** salen los 4 pasos de core, en lugar de los 6 del diseño, que prometían «presupuesto en 48 h» y «limpieza diaria». *Recomendado:* los de core, o los reales del cliente.
- [ ] **Mensaje del asistente:** «Hola, quiero cambiar mi casa: {estancia} ({tamaño})…». *Recomendado (abierta):* «Hola, quiero presupuesto para {estancia} ({tamaño}). Me gustaría empezar {cuándo}. ¿Cuándo podríais venir a verlo?», como en -2 y -4.
- [ ] **«Ver {servicio}»** en las tarjetas de estancia y en la ficha de trabajo suena raro con títulos que empiezan por verbo («Ver quitar gotelé…»). *Recomendado (abierta):* «Ver el servicio →».
- [ ] **Nombre largo + logo en móvil:** a partir de 28 caracteres el nombre baja de tamaño, y con unos 54 se corta con «…». *Recomendado:* nombre comercial corto, o esconder «Llamar» de la cabecera cuando el nombre pase de 40 (abierta).
- [ ] **Color primario:** verde salvia `#56704f`, con acento terracota fijo `#b8693d`. Con un primario de marca muy distinto, revisa que siga casando con el acento.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, he visto vuestra web y quiero cambiar mi casa. ¿Hablamos?», el de la ficha de servicio y los textos de los botones («Cuéntanos tu casa», «Quiero algo así en mi casa»).
- `components/secciones/AsistenteCasa.tsx`: las preguntas, las opciones de tamaño y cuándo, y el mensaje compuesto.
- `components/secciones/EstanciasDesde.tsx` y `app/trabajos/[slug]/page.tsx`: «Ver {servicio}».
- `components/secciones/CtaFinal.tsx`: «Mándanos unas fotos y unas medidas por WhatsApp y te decimos por dónde empezar.» y «Te decimos qué se puede hacer y cuánto cuesta.».
- `components/secciones/Garantias.tsx`: «Nuestras garantías» (ya neutro).

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos y el vídeo de IA de la demo, con sus prompts (`docs/fotos-ejemplo/reformas-5/`), aún no existen.
- [ ] `AntesDespues`, `Migas` y `MedioHero` llevan aquí arreglos que el registro adoptará más adelante: no hay que copiar nada.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El menú y el nombre de la cabecera transparente se leen sobre la foto real del hero, a 375 y a 1280 px.
- [ ] La vista previa de la home en WhatsApp muestra la foto real del hero.
- [ ] Cada deslizador antes/después cuadra: mismo encuadre y las dos fotos alineadas.
- [ ] No queda ningún `precioDesde` ni `precio` sin validar, y `seo.descripcion` no habla de precios si no los hay.
- [ ] `grep -rn "ejemplo\|ficticio\|Bellver\|origen: \"ia\"\|PRECIO FICTICIO" site.config.ts` no devuelve nada.
