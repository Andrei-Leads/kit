# carpinteria-metalica-premium-1 «Marco»: pasar a cliente real

Template premium de carpintería metálica (tipo proyecto: ventanas, balconeras, cerramientos y puertas de aluminio y PVC). Todo gira en torno a **la luz que entra por la ventana**: hero con tres fotos 4:5 a tres escalas, «pano» cuadrado con vídeo o foto que crece y una marquesina, soluciones apiladas, asistente «Tu ventana», cabecera inteligente y pareja flotante. Paleta gris aluminio con **un solo acento, reservado al botón de WhatsApp**.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** premium vive de las fotos. Este template está pensado para un cliente con **sesión de fotos real** en interiores con luz de mañana. Con fotos de fachada o de móvil pierde casi todo su valor.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Lluerna Tancaments», un negocio inventado de Sant Cugat del Vallès. Borra también el comentario de cabecera y la constante `ia` si ya no hay fotos de IA.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B00000001, ficticio), `sector` («Carpintería de aluminio»), `descripcionCorta` («Fabricamos e instalamos…»), `anioFundacion` y `tipoSchema`.
- [ ] `registroMercantil`: el de ejemplo pone «(ficticio)». Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000451`), `email` (`.example`), `direccion` (el taller), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…451`). `urgencias24h` se queda en `false`.
- [ ] `contacto.mensajeWhatsapp` («…Os mando fotos de la ventana que quiero cambiar:») y los `mensajeWhatsapp` de dos servicios: de ejemplo, revísalos.
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`: los del cliente, cada uno con su foto 4:5 (uno va sin foto a propósito: sale el dibujo `Luz` con su número). `contenido`, `incluye` y `preguntas` son de ejemplo («Cortamos y montamos cada ventana en Sant Cugat»…).
- [ ] `servicios[].precioDesde` y `trabajos[].precio`: **precios ficticios** (marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente.
- [ ] `trabajos`: los 4 son inventados. Ver §2.
- [ ] `valoracion` (4,9 / 58) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 5 pasos de ejemplo prometen «Precio cerrado y fecha de montaje», «Fabricación en el taller» y «Volvemos a revisar las hojas». Pon los del cliente, o `[]` para usar los 4 de proyecto de core.
- [ ] `acreditaciones`: la del gremio es **ficticia** (marcada). Solo reales.
- [ ] `garantias` («Fecha de montaje por escrito», «Montaje con nuestro equipo, sin subcontratas», «Revisión de ajuste incluida»…) y `marcas` (Cortizo, Technal, Somfy): solo lo que el cliente confirme. Salen bajo «Nuestras garantías».
- [ ] `empresa.historia`, `imagenes` (3: grande, miniatura y banda) y `equipo`: inventados. Fotos de equipo solo si son reales.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`carpinteria-metalica-premium-1.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/lluerna.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

`public/ejemplo/CREDITOS.md` tiene la ficha de estilo (luz de mañana entrando por la ventana instalada, 35 mm a 1,2 m, solo manos), la tabla de 19 huecos y un prompt por foto. Úsala como guion de la sesión de fotos.

- [ ] Borra `public/ejemplo/` entera (19 rellenos) y pon las fotos del cliente en `public/`, con `origen: "cliente"`. En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Todo vertical 4:5** a tres escalas: grande 1600×2000, mediana 1200×1500, miniatura 800×1000. Solo la banda de `/empresa` es 4:1 (2400×600).
- [ ] **Hero:** `imagenesHero[0]` (grande; LCP y Open Graph), `[1]` (mediana; también hero de `/servicios`) y `[2]` (miniatura). Sin ninguna, hero tipográfico.
- [ ] **Pano:** con `videoPano`, su póster 1:1 (2000×2000). Sin vídeo, el pano usa `galeria[0]` → `trabajos[0].imagenes[0]` → el dibujo `Luz`, y la marquesina queda quieta. Deja tranquilo el tercio inferior izquierdo (van los botones).
- [ ] **`videoPano`** está comentado. Actívalo solo con un clip real: cuadrado 1:1 a 1080, 8 s en bucle (primer y último fotograma iguales), trípode fijo, sin audio, H.264 ≤ 2,5 MB (+ AV1 ≤ 1,5 MB).
- [ ] **Trabajos:** el `antes`, con **el mismo encuadre exacto** (trípode a 1,2 m).
- [ ] Sin caras, sin fachadas desde la calle y sin rótulos ni logos legibles.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:** verde canto de vidrio `#2f6b5f`, **solo en el botón de WhatsApp** (el resto es gris aluminio). Con el color del cliente, el WhatsApp debe seguir destacando. Sin WhatsApp, el primario casi no se ve.
- [ ] **Logo:** con `negocio.logo`, va junto al nombre en la cabecera.
- [ ] **Sin vídeo, la marquesina del pano queda quieta** y el respaldo repite la foto de un trabajo (aceptado hasta tener `pano.mp4`).
- [ ] **Pano y apilado sin `animation-timeline`** (Safari y Firefox antiguos): se quedan quietos y legibles. Míralo en un iPhone.
- [ ] **Filtro de `/trabajos`** y **teléfono** con el formato de core: como el resto de premium.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: el mensaje por defecto, el de 404 («Hola, he llegado a una página de vuestra web que no existe…»), el de servicio («Hola, quiero información sobre {servicio}.») y los botones «Envíanos fotos por WhatsApp», «Consultar por WhatsApp», «Quiero algo parecido». También `RESPUESTA` («Por WhatsApp puedes mandarnos fotos y medidas»), la línea de confianza bajo las parejas.
- `components/cliente/AsistenteVentana.tsx`: preguntas («¿Qué necesitas?», «¿Qué te importa más?»), respuestas fijas («Que entre más luz», «Quitar el ruido», «El frío y el calor», «Un ático o terraza»…) y el cierre «¿Podéis venir a medir?».
- `components/secciones/TuVentana.tsx`: «Tres preguntas y te dejamos el mensaje escrito. No pedimos ningún dato.» y, sin WhatsApp, «Llámanos y te decimos cuándo podemos ir a medir.».
- `components/secciones/PanoLuz.tsx` («Que entre la luz»), `CtaFinal.tsx` («Mándanos una foto de tu…»), `app/not-found.tsx` («Aquí no hay ventana, pero sí salida.»), `app/trabajos/page.tsx` («Cada obra con su lugar, su superficie y su plazo.»).

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA y el vídeo del pano de la demo aún no existen (empezar por la foto ancla `hero-1.jpg`). Los prompts están en `CREDITOS.md`; faltan en `docs/fotos-ejemplo/carpinteria-metalica-premium-1/`.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Home a 375 y 1280 px: las tres fotos del hero cargan sin saltos y la llamada está en la primera pantalla.
- [ ] El pano crece en Chrome; el botón de pausa para el vídeo **y** la marquesina; sin botón de pausa (sin vídeo), la marquesina queda quieta.
- [ ] Con JS, el asistente compone bien el mensaje con los servicios reales; sin JS, cada respuesta abre WhatsApp.
- [ ] Con «reducir movimiento» y sin JS, todo visible y quieto.
- [ ] La vista previa de la home en WhatsApp muestra la foto real de `imagenesHero[0]`.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|FICTICIA\|Lluerna\|origen: ia" site.config.ts` no devuelve nada.
