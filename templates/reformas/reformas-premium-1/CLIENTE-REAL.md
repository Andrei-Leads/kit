# reformas-premium-1 «Estancia»: pasar a cliente real

Template premium de reformas (tipo proyecto: reforma integral de pisos, baños y cocinas). Portada editorial con vídeo o foto, lema con dos fotos, obras «en portada», «pano» con el antes y después de una obra que crece al hacer scroll, servicios apilados, asistente de WhatsApp, cabecera inteligente y pareja flotante. Paleta cálida con almagre. Todo con CSS y islas pequeñas.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** premium vive de las fotos. Este template está pensado para un cliente con **sesión de fotos real** de sus obras, con pares antes/después hechos desde el mismo punto. Con fotos de móvil pierde casi todo su valor.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Lucernario Reformas», un negocio inventado de Madrid. Borra también el comentario de cabecera y el ayudante `img()` si ya no hay fotos en `/ejemplo/`.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B00000001, ficticio), `sector` («Reforma integral de pisos»), `descripcionCorta` (promete «precio cerrado y fecha de entrega en el contrato»), `anioFundacion` (lema «Reformando casas desde…») y `tipoSchema` (`GeneralContractor`).
- [ ] `registroMercantil`: ficticio. Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono` (`+34910000000`) y `whatsapp` (`+34600000000`), ambos ficticios; `email` (`.example`), `direccion`, `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid` de ceros). `urgencias24h` se queda en `false`.
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`: los del cliente, cada uno con su foto 4:5; hasta los primeros salen apilados y el resto en «Más servicios». `contenido`, `incluye` y `preguntas` son de ejemplo.
- [ ] `servicios[].precioDesde` («desde 850 €/m²»…) y `trabajos[].precio`: **precios ficticios** (marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente. El precio de la obra del pano sale como «Precio aproximado».
- [ ] `trabajos` (en el menú, «Obras»): los 5 son inventados; el primero es **la obra del pano** y la de portada. Ver §2.
- [ ] `valoracion` (4,9 / 96) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: no está en el ejemplo, así que salen los 4 pasos de proyecto de core. Pon los del cliente si los tiene (con `proceso[].imagen` 4:5 opcional encima de cada paso).
- [ ] `acreditaciones` (REA, «(ficticio)»), `garantias` («Precio cerrado y firmado», «Fecha de entrega en el contrato», «3 años de garantía»…) y `marcas` (Cosentino, Laufen, Hansgrohe, Finsa): solo lo que el cliente confirme. Salen bajo «Nuestras garantías».
- [ ] `empresa` (en el menú, «Estudio»): `historia`, `imagenes` (3) y `equipo`, inventados. Equipo: solo fotos reales; sin foto, la inicial en cursiva.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`reformas-premium-1.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` y *Enable* en Vercel.
- [ ] `redes`: `instagram.example/lucernario` → las reales, o quita el campo.

## 2. Fotos y vídeo

`public/ejemplo/CREDITOS.md` tiene la tabla completa de huecos (dónde va cada foto, campo, tamaño mínimo, prompt y cómo hacerla en la sesión real). Úsala como guion de la sesión de fotos.

- [ ] Borra `public/ejemplo/` entera (22 rellenos) y pon las fotos del cliente en `public/`, con `origen: "cliente"`. En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Portada, la más importante:** `imagenesHero[0]`, **16:9** (1920×1080). Es Open Graph, el LCP y el póster del vídeo. Sin fotos, la portada sale tipográfica.
- [ ] **Texto sobre la portada:** con el relleno gris, el texto pequeño no llegaba a 4,5:1. Compruébalo con la foto real y, si no llega, sube `--velo-hero` (y `--velo-cabecera` para la cabecera transparente) en `app/globals.css`.
- [ ] **Lema:** `imagenesHero[1]` (4:5, moldura o detalle) e `imagenesHero[2]` (4:5, miniatura de manos trabajando).
- [ ] **Obras, 3:2** (2400×1600), con detalle 4:5 opcional. El `antes` de cada obra, **desde el mismo punto y con la misma luz** (marca el trípode): el pano y la ficha los superponen.
- [ ] **Servicios, 4:5** (1600×2000). **Empresa:** 4:5, una banda 4:1 (2400×600) y una miniatura 4:5.
- [ ] **`videoHero`** está comentado. Actívalo solo con un clip real: 16:9 a 720p, 6–8 s en bucle, sin audio, H.264 ≤ 2 MB (+ AV1 opcional), primer fotograma = póster. `videoPano` no se usa (el pano es de fotos).
- [ ] Sin caras (manos sí), sin obra a medio hacer y sin texto ni logos legibles.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:** almagre `#9b3b22`. El template deriva `--color-primario-texto` (oscurecido para texto sobre claro) y `--color-primario-claro`. *Recomendado:* un color cálido medio u oscuro; mira el aviso de contraste del build.
- [ ] **Logo:** con `negocio.logo`, va a 28 px de alto junto al nombre (`alt=""`).
- [ ] **Apilado:** el bloque tapado no se escala (se quitó hasta poder probarlo en Safari). Pano y apilado sin `animation-timeline` se quedan quietos y legibles: míralo en un iPhone.
- [ ] **Cabecera inteligente y pareja flotante:** transparente sobre la portada, sólida sin JS.
- [ ] **Menú a pantalla completa** con la pareja de botones dentro.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, he visto vuestras obras en la web y me gustaría que vinierais a ver mi casa.». Servicio y trabajo usan los mensajes por defecto de core. O pon `contacto.mensajeWhatsapp` propio.
- `components/secciones/AsistenteEstancia.tsx`: preguntas («¿Qué quieres reformar?», «¿Cómo es la casa?», «¿Para cuándo?») y respuestas fijas («De 60 a 120 m²», «Un ático o un chalé», «Estoy comparando»…). El mensaje empieza «Hola, vengo de vuestra web.» y pide presupuesto.
- `components/secciones/Asistente.tsx`: «Elige tres respuestas y te dejamos el mensaje escrito. No guardamos nada: se envía desde tu WhatsApp.».
- `lib/textos.ts`: el lema «Reformar es volver a casa.», «Enséñanos tu casa por WhatsApp» y «Llamar al {teléfono}».
- `app/contacto/page.tsx`: «Mándanos fotos y medidas por WhatsApp o llámanos, y quedamos para ir a verla.». Solo si el cliente va a ver la casa.
- `app/trabajos/page.tsx` («Cada obra con su barrio, sus metros y lo que tardamos.»), `app/trabajos/[slug]/page.tsx` («¿Una obra parecida en tu casa?»), `app/not-found.tsx` («Esta estancia todavía no existe.»).

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA y el vídeo de la demo aún no existen (empezar por la foto ancla `hero-poster.jpg`). Los prompts están en `CREDITOS.md`; faltan en `docs/fotos-ejemplo/reformas-premium-1/`.
- [ ] El nombre «Lucernario Reformas» no se ha comprobado: búscalo antes de publicar la demo.
- [ ] LCP sin medir y sin probar en Safari ni Firefox.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Portada a 375 y 1280 px: el texto se lee sobre la foto real y la llamada está en la primera pantalla.
- [ ] El pano: el antes y el después de la primera obra coinciden al crecer; el botón de pausa para el vídeo **y** la marquesina.
- [ ] Con JS, el asistente compone bien el mensaje con los servicios reales; sin JS, cae a la pareja con el mensaje general.
- [ ] Con «reducir movimiento» y sin JS, todo visible y quieto.
- [ ] La vista previa de la home en WhatsApp muestra la foto real de la portada.
- [ ] `grep -rn "ejemplo\|ficticio\|ficticia\|FICTICIO\|Lucernario\|origen: \"ia\"" site.config.ts` no devuelve nada.
