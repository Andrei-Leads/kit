# reformas-3 «Obra con nombre»: pasar a cliente real

Template de reformas (tipo proyecto) con forma de portfolio. Cada obra lleva su número (su posición en `trabajos`), nombre, barrio y año. La sección estrella es la rejilla de obras en blanco y negro con filtro por servicio.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Bigueta Reformes», un negocio inventado de Barcelona. Borra el comentario de cabecera y la nota «Variante datos mínimos» del final.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B67340218 tiene el control inválido), `sector` y `descripcionCorta` (la de ejemplo promete respetar la volta catalana y el hidráulico), `anioFundacion` y `tipoSchema`.
- [ ] `registroMercantil` («(ficticio)»): solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000303`), `email` (`.example`), `direccion` («Calle Ejemplo, 3»), `horario` (el de la ficha de Google) y `fichaGoogle` (`cid=000…303`).
- [ ] `acreditaciones`: el REA de ejemplo es `08/0000000 (ficticio)`. Solo números reales; si no hay, `[]`.
- [ ] `zonas`, `servicios` (`contenido`, `incluye` y `preguntas` son de ejemplo) y `marcas`.
- [ ] `trabajos`: las obras son inventadas. **Borra el `precio` de la obra 01** («85.000–95.000 €», PRECIO FICTICIO). Pon precio solo si el cliente lo valida.
- [ ] `valoracion` (4,7 / 96) y `resenas`: inventadas. Solo las reales de Google, o quita los dos campos.
- [ ] `proceso` (presupuesto por partidas, licencia, aviso a la comunidad…) y `garantias` («3 años de garantía», «presupuesto cerrado»): solo lo que el cliente haga de verdad. Con `proceso: []` salen los 4 pasos de core.
- [ ] `empresa.historia` y `equipo` (Albert Pons, Laia Ferrer y Marc Soler son personas inventadas). Con el equipo real, y su permiso para salir en la web, o `[]`.
- [ ] `preguntas`: las de ejemplo prometen tramitar la licencia y dan plazos. Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` (dice «Mira nuestras obras por barrio») y `seo.url` (`bigueta-ejemplo.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/bigueta.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (16 rellenos) y pon las del cliente en `public/`, con `origen: "cliente"`. En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Obras: son lo más importante del diseño.** `imagenes[0]` a **4:5** (collage del hero y rejilla). La **obra 1 es la foto ancla**: sale en color y grande. Las demás fotos de la ficha y el `antes`, a 3:2 y con el mismo encuadre. Entrégalas en color: el blanco y negro lo pone el CSS.
- [ ] Con 1–2 obras el collage pasa a 1–2 columnas. Sin trabajos pero con `galeria`, la galería rellena el collage. Sin ninguna de las dos cosas, el hero es un índice tipográfico y `/trabajos` no existe.
- [ ] Rellena `ubicacion` (barrio), `anio`, `superficie` y `duracion` de cada obra: la ficha técnica y la tarjeta los pintan, y el diseño se apoya en ellos. Lo que falte se oculta.
- [ ] **Servicios, 3:2** (`ServiciosIndice`, fichas). Empresa: 1 foto.
- [ ] **Open Graph:** `imagenesHero` está vacío, así que la vista previa usa la foto del primer servicio. Ordena `servicios` en consecuencia.
- [ ] El diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y `alt` descriptivo.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Orden de `trabajos`** = número de obra (01, 02…). *Recomendado:* la mejor obra, con foto en vertical, la primera.
- [ ] **Color primario:** bermellón `#d12f16` en el filtro, los números y la barra. Con un amarillo (`#facc15`), las estrellas quedan a 1,5:1 sobre blanco; son decorativas y la nota va en texto. *Recomendado:* dejarlo así (abierta).
- [ ] **Filtro con radios + `:has()`** y la isla `CerrarMenu`. *Recomendado:* aceptarlos (abiertas). Sin efecto en los datos.
- [ ] **Descripción SEO propia de `/trabajos`** (la de core dice «trabajos reales»; esta dice «Obras de {nombre} en {ciudad}, con lo que hicimos en cada una»). Abierta; con fotos reales vale cualquiera de las dos.
- [ ] **Mensaje general:** «Hola, he visto vuestras obras en la web y quiero presupuesto para mi piso.». Si el cliente reforma casas o locales, cámbialo o pon `contacto.mensajeWhatsapp`.
- [ ] **Hoja de encargo** (asistente): opciones fijas «Vivienda: Hasta 60 m²…» e «Inicio: Ya / Este trimestre / Estoy comparando». Ajusta si el cliente no hace pisos.
- [ ] **Logo:** va a 36 px junto al nombre. Con un nombre de más de 40 caracteres, ocupa 3 líneas en móvil.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: `MENSAJE_OBRAS` («…para mi piso») y el de la ficha de servicio.
- `components/secciones/HojaEncargo.tsx`: `VIVIENDA`, `INICIO` y «Marca y envía. No guardamos nada.».
- `components/secciones/CtaFinal.tsx`: «Mándanos fotos por WhatsApp y, si lo tienes, el plano. Vamos a medir y te damos el presupuesto por escrito.». Solo vale si el cliente va a medir y presupuesta por escrito.
- `components/secciones/RejillaObras.tsx`: «La obra {n} puede ser la tuya».
- `app/not-found.tsx`: «Esta obra no existe. Estas sí:».
- `app/trabajos/page.tsx`: la entradilla y la descripción SEO (ver §3).

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/reformas-3/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).
- [ ] La variante del crédito de foto bajo la imagen podría pasar al registro; aquí ya está.

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El filtro de `/trabajos`, con los servicios reales, deja el recuento correcto («2 obras de reforma de baño»), con JS y sin él.
- [ ] Ninguna obra enseña un `precio` que el cliente no haya validado.
- [ ] El collage del hero se ve bien con las fotos 4:5 reales, y la obra 01 se reconoce en color.
- [ ] El menú a pantalla completa se cierra al pulsar un enlace.
- [ ] `grep -rn "ejemplo\|ficticio\|Bigueta\|origen: ia\|origen: \"ia\"" site.config.ts` no devuelve nada.
