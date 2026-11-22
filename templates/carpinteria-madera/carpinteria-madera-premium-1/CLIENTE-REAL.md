# carpinteria-madera-premium-1 «Oficio»: pasar a cliente real

Template premium de carpintería de madera (tipo proyecto: cocinas, armarios, puertas, mesas y librerías a medida). Hero con vídeo del taller (o foto), lema con viruta, proceso de taller en 6 pasos con foto cada uno, «pano» con vídeo que crece, una regla lateral como índice de la página, cabecera inteligente y pareja flotante. Paleta cal y nogal con almagra como único acento.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** premium vive de las fotos. Este template está pensado para un cliente con **taller propio y sesión de fotos real** (y, si se puede, dos clips: hero y pano). Con fotos de móvil o sin taller pierde casi todo su valor.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Ojeda Ebanistas», un taller inventado de Sevilla. Borra también el comentario de cabecera. Ojo: existe un «Muebles Ojeda, S.L.» real; no reutilices el nombre.

- [ ] `negocio.nombre` (con más de 28 caracteres baja a 15 px y ocupa hasta 3 líneas en la cabecera), `nombreLegal`, `nif` (B00000001, ficticio), `sector` («Carpintería a medida»), `descripcionCorta`, `anioFundacion` y `tipoSchema`.
- [ ] `registroMercantil`: ficticio. Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000000`, ficticios), `email` (`.example`), `direccion` (el taller; sale con «Cómo llegar»), `horario` («Horario del taller»; debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…011`).
- [ ] `zonas`: los municipios reales («Dónde montamos»).
- [ ] `servicios`: los del cliente, cada uno con sus fotos (uno va sin foto a propósito: sale una banda de tinta con veta). `contenido`, `incluye` y `preguntas` son de ejemplo.
- [ ] `servicios[].precioDesde` («desde 1.400 € por metro»…) y `trabajos[].precio`: **precios ficticios** (marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente.
- [ ] `trabajos` (en el menú, «Obras»): los 5 son inventados y **reutilizan las fotos de su servicio**. Con fotos reales, cada obra lleva las suyas. Ver §2.
- [ ] `valoracion` (4,9 / 74) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 6 pasos de ejemplo («Visita y medición», «Dibujo», muestras, tablones, ensamble, montaje), **cada uno con su foto** (`proceso[].imagen`). Pon los del cliente con sus fotos, o `[]` para usar los 4 de proyecto de core.
- [ ] `garantias` («Presupuesto y fecha de montaje por escrito», «Visita de ajuste al mes del montaje», «Cinco años de garantía en ensambles») y `marcas` (Blum, Hettich, Osmo): solo lo que el cliente confirme. El ejemplo no trae `acreditaciones`.
- [ ] `empresa` (en el menú, «El taller»): `historia`, `imagenes` y `equipo` (nombres ficticios, sin foto). Fotos de equipo solo si son reales: nunca una cara de IA.
- [ ] `galeria`: 2 fotos de ejemplo (solo se ven en `/trabajos` sin trabajos).
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`carpinteria-madera-premium-1.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/ojeda.ebanistas.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

`public/ejemplo/CREDITOS.md` tiene la ficha de estilo (taller con claraboyas a última hora, haz lateral cálido, solo manos con delantal), el prefijo de los prompts y la tabla de 22 huecos. Úsala como guion de la sesión de fotos.

- [ ] Borra `public/ejemplo/` entera (22 rellenos) y pon las fotos del cliente en `public/`, con `origen: "cliente"`. En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero sin vídeo:** `imagenesHero[0]` (también es la del pano sin vídeo y la de Open Graph). En móvil, el hero vertical 9:16 es un recorte con `object-fit` del mismo archivo 16:9: deja el sujeto en la zona segura de la tabla. El punto de interés va en el tercio superior (abajo va el texto).
- [ ] **Texto sobre el hero:** comprueba el contraste con la foto real y, si no llega, sube `--velo-hero` en `app/globals.css`.
- [ ] **Lema:** `imagenesHero[1]` (viruta o detalle).
- [ ] **Proceso:** 6 fotos, una por paso, en orden.
- [ ] **Antes y después:** el `antes` y su foto, con **el mismo encuadre exacto** (mismo trípode y altura).
- [ ] **`videoHero` y `videoPano`** están comentados. Actívalos solo con clips reales: ~8 s en bucle, sin audio, H.264 ≤ 1,5 MB (+ AV1 opcional), póster = fotograma 1 de su clip. Sin `videoPano`, el pano usa el vídeo del hero; sin vídeos, `imagenesHero[0]`.
- [ ] Sin caras, sin máquinas CNC de protagonista y sin texto ni logos legibles.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Línea de confianza** (`lib/textos.ts`, `lineaConfianza`; home, `/contacto` y fichas de obra): «Por WhatsApp puedes mandarnos fotos y medidas», como en «Marco». No prometas un tiempo de respuesta salvo que el cliente lo cumpla. Si el cliente acepta visitas al taller, se puede añadir bajo la dirección del CTA final.
- [ ] **Color primario:** almagra `#9a3b26`, único acento (palabra destacada, botón). *Recomendado:* un color cálido medio u oscuro; mira el aviso de contraste del build.
- [ ] **Logo:** el ejemplo no trae; con `negocio.logo`, va junto al nombre.
- [ ] **Fundido de todo el `main` al cambiar de página** (View Transitions); con «reducir movimiento», sin transición. Aceptado.
- [ ] **Los botones del pano** aparecen entre el 45 % y el 60 % del recorrido; antes, la barra móvil y la pareja flotante siguen disponibles. Aceptado.
- [ ] **Pano y apilado sin `animation-timeline`** (Safari y Firefox antiguos): se quedan quietos y legibles. Míralo en un iPhone.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, he visto vuestra web y quiero hablar de una pieza a medida. Os mando fotos y medidas.», el de servicio («Hola, quiero presupuesto de {servicio}. Os mando fotos del sitio.») y el de obra; botones «Pedir presupuesto por WhatsApp», «Envíanos fotos por WhatsApp», «Cuéntanos tu pieza por WhatsApp».
- `components/secciones/Asistente.tsx`: respuestas fijas («Ya tengo el hueco medido», «Estoy en plena reforma», «De momento es una idea», «Quiero ver muestras de madera», «Prefiero que vengáis a medir»). Solo si el cliente enseña muestras y va a medir.
- `app/empresa/page.tsx` («Aquí se dibuja, se elige la madera y se fabrica cada pieza.») y `app/servicios/page.tsx` («Cada pieza se dibuja para su hueco y se fabrica en nuestro taller.»): solo si el cliente fabrica en su taller.
- `components/secciones/Obras.tsx` («Piezas que ya viven»), `CtaFinal.tsx` («¿Tienes un hueco…?»), `app/not-found.tsx` («A esta pieza le falta una tabla.»), `app/trabajos/page.tsx` («Cada obra con su barrio, sus medidas y lo que tardamos.»).

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA y los cuatro vídeos de la demo aún no existen. Los prompts están en `CREDITOS.md`; faltan en `docs/fotos-ejemplo/carpinteria-madera-premium-1/`.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Hero a 375 y 1280 px: el recorte vertical en móvil deja ver el sujeto y el texto se lee; la llamada está en la primera pantalla.
- [ ] El pano crece en Chrome; el botón de pausa para el vídeo **y** la marquesina.
- [ ] El proceso muestra las 6 fotos reales en su orden.
- [ ] Con JS, el asistente compone bien el mensaje; sin JS, cae a la pareja con el mensaje general.
- [ ] Con «reducir movimiento» y sin JS, todo visible y quieto.
- [ ] La vista previa de la home en WhatsApp muestra la foto real del hero.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Ojeda\|origen: \"ia\"" site.config.ts` no devuelve nada.
