# carpinteria-madera-4 «Galería»: pasar a cliente real

Template de carpintería de madera (tipo proyecto). La web es un catálogo de galería: blanco roto, negro y un solo color de acento, titulares en Big Shoulders condensada en mayúsculas, líneas negras de 2 px y radio 0. El hero es un collage de las tres piezas más recientes (la grande en color, las pequeñas en blanco y negro) con el `h1` montado encima. La sección estrella es la rejilla de piezas numeradas («N.º 01», «N.º 02»…) con filtro por servicio sin JavaScript.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Obrador Mallol», un obrador inventado del Poblenou (Barcelona). Borra también el comentario de cabecera y el ayudante `ia()` si ya no hay fotos de IA.

- [ ] `negocio.nombre`, `nombreLegal` («Obrador Mallol Ejemplo, S.L.»), `nif` (el de ejemplo, B08245178, tiene el control inválido), `sector` (sale en el h1 del inicio: «{sector} en {ciudad}»), `descripcionCorta` (sale en el pie y, sin `empresa.historia`, en `/empresa`), `anioFundacion` (sale en la franja negra «Desde 2011» y en la fila «Desde» de `/empresa`, con los años calculados) y `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000604`), `email` (`.example`), `direccion` («Calle Ejemplo, 112, bajos»), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…0604`). El ejemplo no trae `coordenadas`: con la dirección real, añádelas para que «Cómo llegar» apunte al punto exacto.
- [ ] `zonas`: los municipios reales («Trabajamos en», separados por barras).
- [ ] `servicios`: los del cliente, en el orden del catálogo (el número «01», «02»… y el «Catálogo 01» de cada ficha es la posición en la lista). `contenido` e `incluye` de «Cocinas» son de ejemplo.
- [ ] `trabajos`: los 7 son inventados. **El número de pieza («N.º 07») es la posición en la lista**: si se reordena, cambian los números (y los mensajes de WhatsApp que los citan). El collage y la rejilla del inicio ordenan por `anio`, de más reciente a más antiguo. Ver §2 para las fotos.
- [ ] `valoracion` (4,9 / 52) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `garantias` («Presupuesto cerrado con plano», «Plazo de entrega en contrato», «Cinco años de garantía en estructura»), `acreditaciones` y `marcas` (Blum y Salice): solo lo que el cliente confirme. Salen juntas en la franja negra del inicio y en `/empresa`.
- [ ] `empresa.historia`, `imagenes` y `equipo` (Jaume M. y Clara S. son inventados).
- [ ] `preguntas`: la de ejemplo («¿Trabajáis con interioristas?») hay que confirmarla.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`obrador-mallol.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/obradormallol.example` → las reales, o quita el campo.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` o `trabajos[].precio` solo con cifras validadas por el cliente (salen tal cual, en mayúsculas condensadas).

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (14 rellenos grises, lista en `public/ejemplo/CREDITOS.md`) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Trabajos, 4:5:** es lo más importante del template. La primera foto de cada trabajo sale en la rejilla (4:5), en el collage del inicio si está entre las tres más recientes (la grande en color y 4:5; las otras dos en blanco y negro, 1:1 en móvil y 3:2 en escritorio) y en su ficha. Sujeto centrado con aire alrededor. `antes`, con el mismo encuadre que la primera foto, activa el deslizador «Antes y después».
- [ ] **Open Graph:** la vista previa de WhatsApp usa `imagenesHero[0]` → `galeria[0]` → la primera foto de un servicio. El hero de este diseño no usa `imagenesHero` salvo que falten trabajos y galería, pero conviene ponerla (la mejor pieza) para la vista previa.
- [ ] **Servicios, 1:1:** la miniatura del catálogo es la pieza más reciente de ese servicio o, si no tiene, `servicios[].imagenes[0]`. Sin ninguna, la fila va sin miniatura.
- [ ] **Galería, 4:5 en la rejilla:** solo sale sin trabajos (en el collage y en `/trabajos`). Cada foto con `titulo` lo muestra bajo el número; sin `titulo`, solo el número.
- [ ] **Empresa:** la primera 3:2 y ancha, el resto 4:5. Se pintan en blanco y negro (`filter: grayscale(1)`).
- [ ] Una foto rota o que falta muestra la tarjeta sin foto (número enorme y título sobre gris), nunca un hueco.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Tipografía:** Big Shoulders (eje óptico a 72, que es la antigua «Big Shoulders Display» del diseño) e Instrument Sans, con `next/font`. Big Shoulders no tiene métricas para ajustar el respaldo: va con «Arial Narrow» sin ajuste.
- [ ] **Color primario:** el rojo `#c4341a` por defecto, en números, filtro activo y el botón de la ficha de pieza. Si el primario del cliente no llega a 3:1 sobre el blanco roto (`#facc15`, por ejemplo), los números pasan a negro subrayado en el color del cliente (`app/layout.tsx`). Probado con `#1e40af` y `#facc15`.
- [ ] **Logo:** con `negocio.logo`, la cabecera muestra un logo de 32 px junto al nombre (`alt=""`). Con nombres de más de 22 caracteres, el nombre baja de cuerpo y ocupa varias líneas en móvil, sin cortarse.
- [ ] **«Herrajes Blum y Salice»:** el diseño presenta `marcas` como herrajes. *Recomendado:* dejarlo si las marcas del cliente son de herrajes; si son de otra cosa (barnices, tableros), cambiar la palabra en `Garantias.tsx` y `app/empresa/page.tsx`.
- [ ] **Mensaje general** «Hola, he visto vuestras piezas en la web y quiero presupuesto para un mueble a medida.» (cabecera, barra, inicio, `/contacto`). *Recomendado:* `contacto.mensajeWhatsapp` propio si el cliente prefiere otro tono.
- [ ] Etiqueta de IA en el borde inferior de cada foto (y «IA» en las miniaturas): con fotos reales (`origen: "cliente"`) no sale.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: el mensaje general, el de cada servicio («Hola, quiero presupuesto para {servicio}.») y el de cada pieza («Hola, he visto la pieza n.º 07, «…», y quiero algo parecido.»).
- `components/Asistente.tsx`: las preguntas («Qué pieza», «Qué madera o acabado»: roble, nogal, fresno, lacado; «Qué tienes»: plano del interiorista, fotos, solo la idea) y sus frases. Ajusta las maderas a las que trabaja el cliente.
- `components/secciones/ComoTrabajamos.tsx`: usa los 4 pasos de core para tipo proyecto, o `proceso` del cliente si lo trae.
- `components/secciones/Garantias.tsx`: «Desde {año}» y «Herrajes {marcas}».
- `components/secciones/CtaFinal.tsx`: «Cuéntanos tu pieza» (y «Pide presupuesto de {servicio}» en cada ficha). Bajo los botones, solo el horario: sin promesa de tiempo de respuesta.
- `app/trabajos/[slug]/page.tsx`: «Quiero algo parecido» y «¿Algo parecido a la N.º 07?».
- `app/empresa/page.tsx`: el `h1` «El obrador» y el menú «Obrador» (`lib/piezas.ts`). Si el cliente no tiene obrador propio, «El taller» o «Quiénes somos».
- `app/not-found.tsx`: «Esta pieza no está en el catálogo.».

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/carpinteria-madera-4/`) aún no existen. A un cliente real no le hacen falta.
- [ ] La transición entre la tarjeta y la ficha (View Transitions) que proponía el diseño no está hecha.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El collage del inicio muestra las tres piezas más recientes, y el número de cada pieza es el que el cliente espera.
- [ ] El filtro de la rejilla sale con 2 servicios o más con piezas; cada chip cuenta bien y «Todas» incluye las piezas sin servicio.
- [ ] Con JS, el asistente compone bien el mensaje con los servicios reales. Con un solo servicio se salta la primera pregunta («Tu pieza en dos toques»). Sin `whatsapp`, el asistente no sale y Llamar ocupa el sitio de la pareja.
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|Ejemplo\|ficticio\|Mallol\|origen: \"ia\"" site.config.ts` no devuelve nada.
