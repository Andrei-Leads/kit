# fontaneria-4 «Parte de trabajo»: pasar a cliente real

Template de fontanería (tipo urgencias). Toda la web es un parte de trabajo en papel: cabecera con número de parte, índice lateral («Campos del parte») en escritorio, fotos pequeñas como polaroids y una **cronología del aviso** como sección estrella, con relato al hacer scroll (solo CSS). Pensado para negocios que trabajan con comunidades y administradores de fincas.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** el diseño promete un **parte firmado en cada aviso** (garantías, títulos y textos fijos). Si el cliente no deja parte por escrito, hay que revisar esos textos (§4) o elegir otro template.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Lampisteria Puigvert», un negocio inventado de Barcelona. Borra también el comentario de cabecera y el ayudante `ia()` si ya no hay fotos de IA.

- [ ] `negocio.nombre` (se pinta en mono mayúsculas, en las líneas que haga falta), `nombreLegal`, `nif` (B08615379, inventado), `sector`, `descripcionCorta` («parte de trabajo firmado en cada aviso»), `anioFundacion` y `tipoSchema`.
- [ ] `registroMercantil`: inventado, y sale en `/empresa` como dato de la «Ficha de empresa». Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600004004`), `email` (`.example`), `direccion` («Carrer de Sants 156»), `coordenadas`, `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…004`).
- [ ] `contacto.urgencias24h` y `tiempoLlegada` («60 min»: sale como «Llegada estimada» en el hero y en el paso 2 de la cronología). Solo si el cliente los cumple.
- [ ] `zonas`: los municipios reales.
- [ ] `proceso`: los 5 pasos de ejemplo son la cronología («Te decimos quién va y a qué hora llega», «Te dejamos por escrito lo hecho, el material y la garantía»). Pon los pasos reales del cliente, o `[]` para usar los de core.
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo (detección acústica, montantes, «averías para el seguro»…).
- [ ] `trabajos`: los 5 son inventados («partes archivados»). Ver §2.
- [ ] `valoracion` (4,8 / 143) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `acreditaciones` (RASIC y RITE con números inventados), `garantias` («Parte de trabajo firmado en cada aviso», «Un año de garantía»…) y `marcas`: solo lo que el cliente confirme. Los números de acreditación, solo reales.
- [ ] `tarifas`: **precios ficticios** (marcados `PRECIO FICTICIO`) y la nota «El material se detalla en el parte». Bórralos o pon solo cifras validadas por el cliente.
- [ ] `empresa.historia` (Marc Puigvert, «hoy somos siete personas») y `equipo` («Quién firma los partes»): inventados.
- [ ] `galeria`: las 5 fotos son **las de cada paso de la cronología** (`galeria[N-1]` = paso N, con su `titulo`). Sin galería, el paso usa la foto del trabajo N y, sin ella, una casilla con el número.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`fontaneria-4.vercel.app` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: vacío; añade las reales si las hay.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (18 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Todas a 4:5 (vertical).** Se ven pequeñas, como polaroids giradas ±2°, nunca a sangre. El estilo de la demo es flash de compacta, antebrazos con guantes y nada de caras ni texto legible: fotos de móvil del propio fontanero encajan bien.
- [ ] **El hero no lleva foto** (`imagenesHero: []`). La vista previa de WhatsApp (Open Graph) usa `galeria[0]` (la del paso 1) y, sin galería, la primera foto de servicio. Elige bien esa foto, o pon una en `imagenesHero` solo para Open Graph.
- [ ] **Cronología:** 5 fotos en `galeria`, una por paso y en orden (aviso, llegada, diagnóstico, reparación, parte).
- [ ] **Trabajos:** si hay `antes`, con el mismo encuadre; el comparador recorta a 4:3, así que el motivo va centrado. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] Equipo: foto cuadrada o, sin foto, iniciales.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Cabecera e índice en cada página** (`components/Marco.tsx`), no en el layout, para marcar la página actual sin JS (precedente: electricidad-3). Si se añade una página, tiene que montar su `Marco`.
- [ ] **Nombre largo con logo:** con un nombre de ~54 caracteres y logo, el nombre ocupa 5 líneas en móvil (conocido). *Recomendado:* nombre comercial corto o sin logo en la cabecera.
- [ ] **Logo:** con `negocio.logo`, va a 32 px a la izquierda del nombre (`alt=""`).
- [ ] **Color primario:** rojo sello `#b42318` (sellos, casillas y botones). *Recomendado:* un color de marca medio u oscuro; mira el aviso de contraste del build.
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` (abierta en fontanería; se recomienda mantenerlo).

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, quiero abrir un aviso desde la web. Dirección y foto de la avería:», el de servicio («…abrir un aviso de {servicio}. Os mando una foto.») y el de trabajo («he leído el parte…»). O pon `contacto.mensajeWhatsapp` propio.
- `components/Pareja.tsx` y `CronologiaAviso.tsx`: «Envíanos una foto por WhatsApp». Solo si el cliente acepta fotos.
- `components/secciones/CasillasConfianza.tsx`: «Lo que queda por escrito» sobre las garantías. Solo si están por escrito; si no, «Nuestras garantías».
- `app/empresa/page.tsx`: «Quién firma los partes» (equipo) y «Ficha de empresa».
- `app/trabajos/page.tsx`: «Cada trabajo, con su parte: dónde, cuándo y cuánto duró.»; `app/trabajos/[slug]/page.tsx`: «Parte archivado», «Conformidad del cliente» (sobre el testimonio) y «¿Tienes algo parecido? Abrimos el aviso.».
- `components/secciones/CtaFinal.tsx`: «¿Tienes una avería ahora?», «Copia para el cliente» y la línea decorativa «Firma del cliente: ____».
- `components/secciones/ServiciosParte.tsx` («Un parte para cada avería»), `Zonas.tsx` («Dónde abrimos avisos»), `Resenas.tsx` («Reverso del parte»).
- `lib/formato.ts`: «Llamar 24 h» o «Llamar», y la línea de valoración u horario.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/fontaneria-4/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Decisiones de fontanería aún abiertas (carpeta del proyecto `nueva-generacion/fontaneria-integracion/`): etiqueta «Foto de ejemplo», teléfono con formato de core, menú `popover` y foco con teclado, dependencias sin uso. El nombre de ejemplo «Lampisteria Puigvert» recuerda a la Fundació Puigvert: no lo uses para una demo pública.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Home a 375 px: la llamada se ve sin hacer scroll y el nombre cabe sin romper la cabecera.
- [ ] Cronología: en escritorio, las polaroids cambian al hacer scroll (Chrome); con «reducir movimiento», en Safari o en móvil, cada paso lleva su foto en línea.
- [ ] Con los pasos reales, el paso 2 solo dice «Llegada: …» si hay `tiempoLlegada`.
- [ ] El índice lateral marca la página actual en cada ruta.
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Puigvert\|origen: \"ia\"" site.config.ts` no devuelve nada.
