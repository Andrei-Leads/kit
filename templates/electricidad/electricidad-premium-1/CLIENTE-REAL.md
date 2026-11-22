# electricidad-premium-1 «Tensión»: pasar a cliente real

Template premium de electricidad (**tipo proyecto, sin urgencias**: instalaciones de reformas, domótica, recarga, autoconsumo). Paleta oscura con un azul «de arco», collage de tres fotos en el hero, «pano» con vídeo o foto que crece al hacer scroll y las cifras de la empresa encima, credenciales como sección estrella, cabecera inteligente y pareja de botones flotante. Todo con CSS y islas pequeñas.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** premium vive de las fotos. Este template está pensado para un cliente con **sesión de fotos real** en clave baja (y, si se puede, un clip para el pano). Con fotos de móvil a plena luz pierde casi todo su valor.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Borne Instalaciones», un negocio inventado de Valencia. Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B00000001, ficticio), `sector` («Instalaciones eléctricas»), `descripcionCorta`, `anioFundacion` (cifra «Años de oficio» del pano) y `tipoSchema`.
- [ ] `registroMercantil`: el de ejemplo pone «(ficticio)». Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000901`), `email` (`.example`), `direccion`, `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid` de ceros). `urgencias24h` se queda en `false`: premium nunca es urgencias.
- [ ] `zonas`: los municipios reales (también es la cifra «Municipios»).
- [ ] `servicios`: los del cliente, cada uno con su foto 4:5. Uno va sin foto a propósito (sale una trama DIN con su número). `contenido`, `incluye` y `preguntas` son de ejemplo.
- [ ] `servicios[].precioDesde` y `trabajos[].precio`: **precios ficticios** (marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente.
- [ ] `trabajos` (en el menú, «Proyectos»): los 4 son inventados. Ver §2.
- [ ] `valoracion` (4,9 / 61) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: no está en el ejemplo, así que salen los 4 pasos de proyecto de core. Pon los del cliente si los tiene.
- [ ] `acreditaciones`: RII («46/IBTE/0000-EJ») y póliza de responsabilidad civil («RC-0000-EJ»), marcadas `NÚMERO FICTICIO`. Son la sección estrella: solo datos reales, con sus números reales.
- [ ] `garantias` («Plazo de obra por escrito», «Cuadro etiquetado y esquema entregado», «Tres años de garantía en mano de obra»…) y `marcas` (Schneider, Hager, Simon, Jung): solo lo que el cliente confirme.
- [ ] `empresa.historia` («ocho instaladores y una oficina técnica»), `imagenes` y `equipo` (Andreu y Sara): inventados.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`electricidad-premium-1.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/borne.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

`public/ejemplo/CREDITOS.md` tiene la ficha de estilo (clave baja, una luz rasante desde la izquierda, macro, solo manos) y la tabla completa de huecos. Úsala como guion de la sesión de fotos.

- [ ] Borra `public/ejemplo/` entera (19 rellenos) y pon las fotos del cliente en `public/`, con `origen: "cliente"`. En `/trabajos` no puede haber ni una foto de IA.
- [ ] **`imagenesHero` lleva 4 fotos, cada una con su papel:** `[0]` foto grande 4:5 (1600×2000, LCP y Open Graph; cuarto inferior izquierdo libre, lo tapa la miniatura), `[1]` miniatura 4:5, `[2]` tercera pieza 1:1 (solo escritorio) y `[3]` **respaldo del pano** mientras no haya vídeo (16:9, 2400×1350, sujeto en la franja central y tercio inferior oscuro para las cifras).
- [ ] **Servicios, trabajos y empresa, 4:5** (1600×2000). En las 4:5 grandes, el tercio superior queda libre en móvil.
- [ ] **Antes y después:** mismo encuadre exacto; en escritorio el deslizador recorta a 16:9, así que el sujeto va en la franja central.
- [ ] **`videoPano`** está comentado. Actívalo solo con un clip real: 16:9 a 720p, ~8 s en bucle, sin audio, H.264 de 1–3 MB (+ AV1 opcional), con póster = la foto de `imagenesHero[3]`. Solo arranca con JS, y nunca con «reducir movimiento». En móvil se recorta a 9:16.
- [ ] Sin caras, chispas, rayos, marcas legibles ni matrículas.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:** azul de arco `#4fc3ff`, claro sobre fondo oscuro (el hover **aclara**, no oscurece). Con un primario oscuro del cliente, la señal y los botones se pierden sobre negro. *Recomendado:* un color claro y saturado; mira el aviso de contraste del build.
- [ ] **Pareja flotante en escritorio:** a mitad de página puede quedar sobre texto de la columna derecha unos segundos; se retira al llegar al pie (aceptado).
- [ ] **Cabecera inteligente:** solo se esconde desde 1024 px (en móvil ya está la barra fija). Aceptado.
- [ ] **Pano y apilado sin `animation-timeline`** (Safari y Firefox antiguos): se quedan quietos y legibles. Aceptado; míralo en un iPhone.
- [ ] **Logo:** con `negocio.logo`, va junto al nombre en la cabecera.
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` (aceptado). **Teléfono** con el formato de core.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, os escribo desde vuestra web. Estoy preparando una obra y querría presupuesto para la instalación eléctrica:», el de servicio («Hola, quiero presupuesto de {servicio}.») y el de trabajo («…el proyecto…»); botones «Pedir presupuesto por WhatsApp» y «Quiero algo parecido».
- `components/Asistente.tsx` y `components/secciones/AsistenteInstalacion.tsx`: preguntas, respuestas fijas («Chalet o adosado», «Garaje comunitario», «En 1–3 meses», «Estoy comparando presupuestos») y «Tres preguntas y te dejamos el mensaje escrito. No guardamos nada: lo envías tú.».
- `app/contacto/page.tsx`: «Escríbenos por WhatsApp con el plano o unas fotos, o llámanos en horario de oficina.».
- `app/servicios/[slug]/page.tsx`: «Precio orientativo» y «El precio cerrado va en el presupuesto, sobre tu obra.».
- `app/servicios/page.tsx` («La instalación ordenada, documentada y legalizada.»), `app/trabajos/page.tsx` («Cada proyecto con su lugar, su superficie y su plazo.»), `components/secciones/Pano.tsx` («La instalación, por dentro»).
- `components/secciones/Credenciales.tsx`: «Acreditaciones y garantías», «Nuestras acreditaciones» o «Nuestras garantías», según los datos.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA y el vídeo del pano de la demo aún no existen (empezar por `hero-peine-cobre.jpg`). Los prompts están en `CREDITOS.md`; faltan en `docs/fotos-ejemplo/electricidad-premium-1/`.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Home a 375 y 1280 px: el collage del hero se ve sin saltos al cargar (el parallax arranca en 0) y la llamada está en la primera pantalla.
- [ ] El pano crece en Chrome y las cifras se leen sobre el tercio inferior del vídeo o la foto; el botón de pausa para el vídeo **y** la marquesina.
- [ ] Con «reducir movimiento» y sin JS, todo está visible y quieto; el pano pinta `imagenesHero[3]`.
- [ ] Las credenciales muestran la habilitación y la póliza reales.
- [ ] La vista previa de la home en WhatsApp muestra la foto real de `imagenesHero[0]`.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Borne\|-EJ\|origen: \"ia\"" site.config.ts` no devuelve nada.
