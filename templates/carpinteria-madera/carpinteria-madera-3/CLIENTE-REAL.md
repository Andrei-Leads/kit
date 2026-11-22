# carpinteria-madera-3 «Banco de trabajo»: pasar a cliente real

Template de carpintería de madera (tipo proyecto). La web es una hoja de taller: kraft, retícula de 12 columnas, un despiece explosionado de un mueble dibujado a 1 px con las piezas A–F (los servicios), un índice lateral numerado y cada foto como una «lámina» con su pie en mono («Lám. 03 · Imagen generada con IA»). La sección estrella es el proceso del taller, con la lámina de cada paso pegajosa en escritorio.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Banco Siete Carpintería», un taller inventado de Mairena del Aljarafe (Sevilla). Borra también el comentario de cabecera y el ayudante `ia()` si ya no hay fotos de IA.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (el de ejemplo, B41529067, tiene el control inválido), `sector` (sale en el h1 del inicio: «{sector} en {ciudad}», y en el de `/servicios`), `descripcionCorta` (sale bajo el h1 y en el pie), `anioFundacion` (sale en «Hoja 01 · Taller propio desde 1987», en el sello del pie, en «Lo que firmamos» con los años calculados y en `/empresa`) y `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000703`), `email` (`.example`), `direccion` («Calle Ejemplo, 21, nave 4»), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…0703`). El ejemplo no trae `coordenadas` (la dirección es ficticia): con la dirección real, añádelas para que «Cómo llegar» apunte al punto exacto.
- [ ] `zonas`: los municipios reales («Dónde montamos»).
- [ ] `servicios`: los del cliente, **en el orden en que deben salir las letras A, B, C…** del despiece (solo se dibujan 6 piezas; a partir de la séptima sale «y N más →»). `contenido`, `incluye` y `preguntas` son de ejemplo (iroko al sol, huecos fuera de escuadra…).
- [ ] `trabajos`: los 4 son inventados. La referencia («Ref. 004») es la posición en la lista: si se reordena, cambian las referencias. Ver §2 para las fotos.
- [ ] `valoracion` (4,8 / 61) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 6 pasos de ejemplo prometen «volvemos al mes para ajustar». Pon los pasos reales del cliente, cada uno con su `imagen` si la hay, o quita el campo para usar los 6 del diseño (que prometen «presupuesto por escrito», «contrato con fecha», «limpiamos» y «garantía»: revísalos, ver §3).
- [ ] `garantias` («Presupuesto por escrito con plazo», «Visita de ajuste al mes», «Dos años de garantía en ensambles»), `acreditaciones` y `marcas`: solo lo que el cliente confirme.
- [ ] `empresa.historia`, `imagenes` y `equipo` (los Lebrero son inventados).
- [ ] `preguntas`: las de ejemplo hablan de visitar el taller y de que la madera se mueve. Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`bancosiete.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `facebook.com/bancosiete.ejemplo` → las reales, o quita el campo.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` o `trabajos[].precio` solo con cifras validadas por el cliente (el diseño los muestra en mono si existen).

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (15 rellenos grises, lista en `public/ejemplo/CREDITOS.md`) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero, 4:3:** `imagenesHero[0]` es la «Lámina 01» del hero y la imagen de Open Graph (vista previa de WhatsApp). Mejor una foto del taller o del banco con una pieza a medias que un interior terminado. Sin foto, el hero se queda con el despiece y la vista previa usa la galería o el primer servicio.
- [ ] **Proceso, 4:3:** una foto por paso en `proceso[].imagen`. Sin foto, el paso pinta un fragmento del despiece con «sin foto» (está pensado así, no es un hueco).
- [ ] **Servicios, 4:3 en el inicio y `/servicios`, 4:5 en su ficha:** sujeto centrado. Un servicio sin foto sale sin miniatura.
- [ ] **Trabajos, 4:5:** una foto principal y, si hay, `antes` con el mismo encuadre (deslizador). Sin trabajos ni `galeria`, `/trabajos` no existe; con solo `galeria`, salen láminas 1:1.
- [ ] **Empresa, 3:2:** `empresa.imagenes` (la primera se precarga).
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Tipografía:** el diseño eligió Martian Mono + Instrument Sans, pero es exactamente la pareja de reformas-4. *Aceptado en el template (pendiente de Ysst):* JetBrains Mono + Public Sans, la primera alternativa del propio diseño. Cambiarla es tocar `app/layout.tsx` (dos `next/font`).
- [ ] **Fotos del proceso:** el encargo las ponía en `empresa.imagenes[0–5]`; el template usa `proceso[].imagen` (contrato 0.7.0) y deja `empresa.imagenes` para `/empresa`. *Recomendado:* mantenerlo así.
- [ ] **Logo:** con `negocio.logo`, la cabecera muestra un logo de 32 px junto al nombre (el logo va con `alt=""`). Con nombres de más de 28 caracteres, el nombre baja de cuerpo y ocupa 2–4 líneas en móvil (nunca se corta).
- [ ] **Color primario:** el teja `#8a3b12` por defecto; el color «lápiz» (letras del despiece, cotas, números) se deriva del primario y nunca pasa de una luminosidad media, para que se lea sobre el kraft. Probado con `#1e40af` y `#facc15`. *Recomendado:* un color de marca medio u oscuro; mirar el aviso de contraste del build.
- [ ] **Título «Lo que firmamos»** de las garantías (y en `/empresa`): convierte cualquier garantía en una cláusula firmada. *Recomendado:* dejarlo solo si todas las garantías están en el presupuesto o contrato; si no, «Nuestras garantías» (decisión de Ysst aún abierta en otras tandas).
- [ ] **Mensaje general** «Buenas. Necesito un trabajo de carpintería y os paso fotos y medidas para el presupuesto.» (cabecera, barra, pie, inicio, `/contacto`). *Recomendado:* `contacto.mensajeWhatsapp` propio si el cliente prefiere otro tono.
- [ ] Etiqueta de IA en el pie de cada lámina: con fotos reales (`origen: "cliente"`) no sale.

## 4. Textos fijos que conviene revisar

- `lib/formato.ts`: los 6 pasos por defecto (`PASOS_TALLER`: «Presupuesto por escrito», «Contrato con fecha», «Limpiamos», «Garantía») y `notaHorario` («Respondemos por WhatsApp en horario de taller»: solo es cierto si el cliente contesta).
- `lib/mensajes.ts`: el mensaje general, el de cada pieza («Buenas. Quiero presupuesto para {servicio}; os paso fotos y medidas.») y el de cada referencia («He visto el trabajo «…» (ref. 004) y quiero algo parecido.»).
- `components/Asistente.tsx`: las preguntas («¿Qué pieza?», «¿Va dentro o fuera?», «¿Tienes medidas?»), la nota «Fuera usamos maderas que aguantan el sol.» y el mensaje compuesto.
- `components/secciones/ProcesoTaller.tsx`: la entradilla «Así sale una pieza de nuestro banco… Sin prisas que luego se pagan.».
- `components/secciones/Garantias.tsx`: «Sello del taller» y «{N} años en el mismo banco».
- `components/secciones/HeroDespiece.tsx`: «Hoja 01 · Taller propio desde {año}». Solo si el cliente tiene taller propio.
- `components/secciones/CtaFinal.tsx`: «Pásate por el taller o escríbenos». Solo si el taller recibe visitas; si no, «Escríbenos o llámanos».
- `app/servicios/[slug]/page.tsx`: «Empezamos por medir el hueco». `app/trabajos/page.tsx`: «Cada trabajo con su referencia, dónde está, cuánto ocupa y lo que tardamos.».

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/carpinteria-madera-3/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).
- [ ] El índice lateral marca la sección activa solo con CSS (`animation-timeline`); en Firefox y Safari antiguos el índice funciona sin la marca.

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El despiece del hero y de `/servicios` muestra tantas letras como servicios (máx. 6) y la leyenda enlaza a cada ficha.
- [ ] Con JS, el asistente compone bien el mensaje con los servicios reales (sin «Quiero presupuesto para puertas de madera de madera…»). Con un solo servicio se salta la primera pregunta. Sin `whatsapp`, la sección del asistente no sale y la pareja pasa a «Llamar al taller» a todo el ancho.
- [ ] Las referencias («Ref. 00N») de `/trabajos` y de cada ficha son las que el cliente espera.
- [ ] La vista previa de la home en WhatsApp muestra una foto real (`imagenesHero`).
- [ ] `grep -rn "ejemplo\|ficticio\|Banco Siete\|Lebrero\|origen: \"ia\"" site.config.ts` no devuelve nada.
