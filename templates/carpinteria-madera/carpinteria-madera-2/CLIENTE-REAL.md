# carpinteria-madera-2 «A medida»: pasar a cliente real

Template de carpintería de madera a medida (tipo proyecto). El hero es un configurador de 3 pasos sobre el color pleno (pieza, tamaño del hueco y acabado) con miniaturas 1:1 de cada pieza; la tarjeta lleva siempre en su base el `BotonWhatsApp` con el mensaje ya escrito, y el visitante solo tiene que añadir la foto del hueco.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Ensamble Norte», un negocio inventado de Tres Cantos (Madrid). Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (el de ejemplo, B87364155, tiene el control inválido), `sector` (sale en el h1: «{sector} en {ciudad}»), `descripcionCorta` (sale en el pie y en `/empresa`), `anioFundacion` (sale como cifra «Desde 2009» en el hero y en `/empresa`) y `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000522`), `email` (`.example`), `direccion` («Calle Ejemplo, 32»), `horario` (debe coincidir con la ficha de Google), `mensajeWhatsapp` y `fichaGoogle` (`cid=000…0522`).
- [ ] `zonas`: los municipios reales. Su número sale como cifra («8 municipios donde montamos»).
- [ ] `servicios`: los del cliente, cada uno con su foto. Son también las opciones del paso 1 del configurador (con más de 6 salen 5 + «Otra cosa»). `contenido`, `incluye`, `preguntas` y el `mensajeWhatsapp` de «Armarios empotrados» son de ejemplo («montamos en un día»).
- [ ] **Precios:** `precioDesde` de «Armarios empotrados», «Vestidores» y «Puertas» son inventados (`// PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente.
- [ ] `trabajos`: los 4 son inventados (con `superficie`, `duracion` y testimonio). Ver §2 para las fotos.
- [ ] `valoracion` (4,8 / 143) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: vacío, así que salen los 4 pasos de core. Si el cliente tiene los suyos, ponlos (máximo 6), sin prometer plazos que no cumpla.
- [ ] `garantias` («Presupuesto cerrado en 48 h», «Fecha de montaje en el contrato», «Tres años de garantía en herrajes») y `marcas` (Blum, Häfele): solo lo que el cliente confirme.
- [ ] `empresa.historia` («Hoy somos siete en una nave de Tres Cantos»), `imagenes` y `equipo` (vacío en el ejemplo).
- [ ] `preguntas`: las de ejemplo hablan de plazos («unas tres semanas») y de retirar el armario viejo. Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`ensamble-norte.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/ensamblenorte.example` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (12 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Servicios, 4:5, las más importantes:** la primera foto de cada servicio es la miniatura 1:1 del configurador (96 px, recorte centrado: la pieza tiene que reconocerse) y la de la tarjeta. Un servicio sin foto sale con su inicial, sin romper nada.
- [ ] **Hero, 4:5 (`imagenesHero[0]`):** en escritorio va detrás de la tarjeta del configurador, a la derecha; en móvil no se pinta ni se descarga. Es también la imagen de Open Graph (vista previa de WhatsApp): elige la mejor pieza, frontal.
- [ ] **Trabajos, 4:5:** una foto principal y, si hay, `antes` con el mismo encuadre (deslizador «El hueco, antes y después»). Sin trabajos ni `galeria`, `/trabajos` no existe y sale del menú.
- [ ] **Empresa, 3:2:** fotos del taller en carrusel. Equipo: foto cuadrada o, sin foto, iniciales (nunca una cara de IA).
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Logo en la cápsula:** con `negocio.logo`, sale el logo a 32 px (`alt=""`) **junto al nombre**, que se ve siempre. Con un nombre de más de 28 caracteres, en móvil la cápsula quita su botón «Llamar» (sigue en la barra inferior y en el menú) y el nombre ocupa 2–3 líneas. *Recomendado:* nombre comercial corto; logo cuadrado o isotipo legible a 32 px.
- [ ] **Color primario:** el campo pleno (hero, cabeceras, CTA final, 404) se calcula del primario del cliente (`oklch` con luminosidad 0,3); el verde por defecto es `#2f6b47`. Con un amarillo (`#facc15`) el pleno sale marrón oscuro y los botones verdes pasan a amarillo con texto casi negro. *Recomendado:* un color de marca medio u oscuro; con uno claro, mirar el aviso de contraste del build.
- [ ] **Título «Lo que firmamos»** de las garantías: convierte cualquier garantía en una cláusula firmada. *Recomendado:* cambiarlo a «Nuestras garantías» (decisión de Ysst aún abierta), salvo que todas las garantías estén en el contrato.
- [ ] **Tamaños y acabados del configurador** (`lib/asistente.ts`: «Menos de 1 m»… «Aún no lo he medido»; «Madera natural», «Lacado», «Aún no lo sé»): pensados para armarios. Si el cliente hace sobre todo cocinas o puertas, ajústalos.
- [ ] **Mensaje compuesto** «Hola, os escribo desde la web. Quiero {servicio en minúscula} para un hueco {tamaño}, {acabado}. ¿Me dais presupuesto?…»: con títulos de servicio que no son una pieza («Huecos difíciles») la frase queda rara. *Recomendado:* titular los servicios como piezas («Armarios bajo escalera»).
- [ ] Etiqueta «IA» en las miniaturas y «Imagen generada con IA» en las fotos: con fotos reales no salen.

## 4. Textos fijos que conviene revisar

- `lib/asistente.ts`: `TAMANOS`, `ACABADOS`, `MENSAJE_BASE` y los mensajes compuestos.
- `components/Asistente.tsx`: «Te enseñamos muestras al medir.» (paso 3) y «Al abrirse WhatsApp, añade una foto del hueco.». Solo si es cierto.
- `components/secciones/Garantias.tsx`: el título «Lo que firmamos» y «Trabajamos con» delante de las marcas.
- `components/secciones/CtaFinal.tsx`: «Dinos el hueco y te decimos la pieza.».
- `app/contacto/page.tsx`: «Respuesta por WhatsApp en horario de trabajo.». Solo es cierto si el cliente contesta.
- `app/servicios/page.tsx`: «Todo se fabrica a la medida de tu hueco…». `app/servicios/[slug]/page.tsx`: «Cuéntanos tu hueco por teléfono» (sin WhatsApp).
- `lib/textos.ts`: las cifras (año, valoración, municipios, trabajos publicados). Salen solas de los datos; comprueba que sean ciertas.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/carpinteria-madera-2/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).
- [ ] `MenuPopover`, `BarraMovil`, `Foto`, `Migas`, `Preguntas` y `AntesDespues` van reestilados desde el registro; no hay que copiar nada.

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Con JS, el configurador compone bien el mensaje con 2–3 servicios reales; «Configurar» de una tarjeta abre el configurador con esa pieza elegida. Sin JS, cada opción abre WhatsApp con su mensaje.
- [ ] Con un solo servicio salen 2 pasos («1 de 2»). Sin `whatsapp`, el hero muestra «¿Qué necesitas?» con enlaces a cada servicio y «Llamar» relleno, y no queda ningún `wa.me`.
- [ ] A 375 × 667, el «Enviar por WhatsApp» del configurador queda por encima de la barra inferior.
- [ ] El texto del campo pleno se lee sobre el color del cliente (aviso de `estiloMarca` en el build).
- [ ] La vista previa de la home en WhatsApp muestra una foto real (`imagenesHero[0]`).
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Ensamble\|origen: \"ia\"" site.config.ts` no devuelve nada.
