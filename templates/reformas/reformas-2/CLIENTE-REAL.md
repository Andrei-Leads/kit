# reformas-2 «Planifica tu reforma»: pasar a cliente real

Template de reformas (tipo proyecto). El hero es un planificador sobre el primario a sangre: el visitante elige qué reformar, el tamaño y el plazo, y abre WhatsApp con el mensaje ya escrito.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Tresbolillo Reformas», un negocio inventado de Madrid. Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (el de ejemplo, B88412306, tiene el control inválido), `sector` (sale en el h1: «{sector} en {ciudad}»), `descripcionCorta` (la de ejemplo promete «te respondemos el mismo día»), `anioFundacion` (sale como cifra en el hero) y `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000202`), `email` (`.example`), `direccion` («Calle Ejemplo, 12»), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…0402`).
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo (plazos de «8 a 12 días», «la fecha va en el contrato»…).
- [ ] `trabajos`: los 5 son inventados. Ver §2 para las fotos.
- [ ] `valoracion` (4,9 / 212) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 6 pasos de ejemplo prometen «presupuesto en 72 h», «contrato con fecha» y «revisión al mes». Pon los pasos reales del cliente, o `[]` para usar los 4 de core.
- [ ] `garantias` («Precio cerrado», «Plazo firmado», «Garantía de 2 años»…) y `marcas`: solo lo que el cliente confirme.
- [ ] `empresa.historia`, `imagenes` y `equipo` (vacío en el ejemplo).
- [ ] `preguntas`: las de ejemplo hablan de licencias, plazos y forma de pago. Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`tresbolilloejemplo.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/tresbolillo.ejemplo` → las reales, o quita el campo.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` o `tarifas` solo con cifras validadas por el cliente.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (16 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Servicios, 4:3, las más importantes:** son las miniaturas de 64 px del planificador (recorte 1:1, sujeto centrado y reconocible) y las tarjetas. Un servicio sin foto sale como tarjeta tintada, sin romper nada.
- [ ] **Open Graph:** el hero no lleva foto (`imagenesHero: []`), así que la vista previa de WhatsApp usa la **foto del primer servicio**. Ordena `servicios` para que el primero tenga una buena foto, o pon una en `imagenesHero` (el diseño no la pinta).
- [ ] **Trabajos, 4:3:** una foto principal y, si hay, `antes` con el mismo encuadre (miniatura en la tarjeta). Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] **Empresa, 3:2:** 2 fotos. Equipo: foto cuadrada o, sin foto, iniciales.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Logo en la cápsula:** con `negocio.logo`, la cápsula muestra **solo el logo** (28 px de alto, `alt` = nombre) y el nombre va en el pie. *Recomendado (aceptado en el template):* logo horizontal legible a 28 px; si no lo hay, sin logo, y sale el nombre.
- [ ] **Color primario:** el hero entero va en `--color-primario` (terracota `#b4532a` por defecto). `estiloMarca` calcula el texto encima (blanco o casi negro). *Recomendado:* un color de marca medio u oscuro; con un amarillo, mirar el aviso de contraste del build y el hero.
- [ ] **Título «Lo que firmamos»** de las garantías: convierte cualquier garantía en una cláusula firmada. *Recomendado:* cambiarlo a «Nuestras garantías» (decisión de Ysst aún abierta), salvo que todas las garantías estén en el contrato.
- [ ] **Mensaje general** «Hola, os escribo desde vuestro planificador de reformas.» sale también en la cápsula, la barra y `/contacto`. *Recomendado:* «Hola, os escribo desde vuestra web.» (abierta), o `contacto.mensajeWhatsapp` propio.
- [ ] **Tamaños fijos del planificador** («Pequeño (hasta 5 m²)… Vivienda entera»): con un único servicio integral, valorar quitar el paso.
- [ ] Etiqueta de IA única en el planificador y «Imágenes generadas con IA» en las fichas con «antes»: con fotos reales no salen.

## 4. Textos fijos que conviene revisar

- `lib/planificador.ts`: `TAMANOS`, `PLAZOS`, `MENSAJE_PLANIFICADOR` y el mensaje compuesto «Hola, quiero presupuesto para…».
- `components/secciones/Garantias.tsx`: el título «Lo que firmamos».
- `lib/mensajes.ts`: el de la ficha de servicio, «Hola, quiero información sobre {servicio}.».
- `app/contacto/page.tsx`: «Respuesta por WhatsApp en horario de trabajo.». Solo es cierto si el cliente contesta.
- `components/secciones/HeroPlanificador.tsx`: «Elige y te dejamos el WhatsApp escrito.» y, sin WhatsApp, «Cuéntanos tu reforma por teléfono.».
- `lib/textos.ts`: las cifras del hero (año, valoración, municipios). Salen solas de los datos; comprueba que sean ciertas.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/reformas-2/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).
- [ ] El registro mejorará `MenuPopover` (props `actual` y `pie`), `Migas` y `AntesDespues`. Aquí ya van reestilados; no hay que copiar nada.

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Con JS, el planificador compone bien el mensaje con 2–3 servicios reales (sin «quiero presupuesto para reforma de reforma…»). Sin JS, cada opción abre WhatsApp.
- [ ] Con un solo servicio salen 2 pasos. Sin `whatsapp`, el hero muestra la llamada grande y las píldoras.
- [ ] El texto del hero se lee sobre el primario del cliente (aviso de `estiloMarca` en el build).
- [ ] La vista previa de la home en WhatsApp muestra una foto real (primer servicio o `imagenesHero`).
- [ ] `grep -rn "ejemplo\|ficticio\|Tresbolillo\|origen: \"ia\"" site.config.ts` no devuelve nada.
