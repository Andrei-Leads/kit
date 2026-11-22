# fontaneria-1 «Qué te pasa»: pasar a cliente real

Template de fontanería (tipo urgencias). El hero es un índice por síntomas, sin foto: cada servicio es una fila grande («El váter no traga», «El termo no calienta») que lleva a su ficha. Paleta oscura con latón y barra móvil combinada [Menú][Llamar][WhatsApp].

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Aigua Nord», un negocio inventado de Valencia. Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B00000005, control inválido a propósito), `sector` (sale en el h1: «{sector} en {ciudad}»), `descripcionCorta` (promete «presupuesto antes de tocar nada»), `anioFundacion` (sale como cifra: «Abiertos desde») y `tipoSchema` (`Plumber`).
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600001001`), `email` (`.example`), `direccion` («Carrer d'Emili Baró 45»), `coordenadas`, `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…001`).
- [ ] `contacto.urgencias24h` y `tiempoLlegada` («40 min»): salen como chips del hero y cifras. Solo si el cliente los cumple de verdad; si no, quítalos.
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`: los del cliente, **con títulos en forma de síntoma** («El termo no calienta»), que es lo que hace funcionar el índice. `contenido`, `incluye` y `preguntas` son de ejemplo (cámara térmica, geófono, «informe para el seguro»…): quita lo que el cliente no haga.
- [ ] `trabajos`: los 5 son inventados. Ver §2 para las fotos.
- [ ] `valoracion` (4,8 / 127) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 3 pasos de ejemplo prometen «te decimos a qué hora llegamos», «precio antes de tocar nada» y «seis meses de garantía». Pon los del cliente, o `[]` para usar los de core.
- [ ] `acreditaciones` (RITE y gas con números inventados), `garantias` y `marcas`: solo lo que el cliente confirme. Los números de acreditación, solo reales.
- [ ] `tarifas` y `precioDesde`: **todos los precios son ficticios** (van marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente; sin datos, la sección de precios no sale.
- [ ] `trabajos[].precio` («entre 1.200 y 1.600 €»): ficticio, bórralo.
- [ ] `empresa.historia` y `equipo` (Vicent Peris y compañía son inventados).
- [ ] `preguntas`: hablan de desplazamiento, domingos, 40 minutos y recargo. Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`fontaneria-1.vercel.app` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/aiguanord.example` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (15 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **El hero no lleva foto** (`imagenesHero: []`, el diseño no la pinta aunque la haya). La vista previa de WhatsApp (Open Graph) usa la **foto de la primera de `galeria`** y, sin galería, la del primer servicio. Ordena los datos para que esa foto sea buena, o pon una en `imagenesHero` solo para Open Graph.
- [ ] **Servicios, 4:3:** detalle de la avería o la pieza (estilo de la demo: macro, clave baja, sin caras).
- [ ] **Trabajos, 4:3**, que se recortan a **16:9 en la ficha**: el motivo debe caber en la franja central. Si hay `antes`, con el mismo encuadre. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] Deja libre la esquina de abajo a la izquierda solo si alguna foto sigue siendo de IA (ahí va la etiqueta).
- [ ] Empresa: `imagenes` vacío en el ejemplo; equipo con foto cuadrada o, sin foto, iniciales.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Logo:** con `negocio.logo`, va a 32 px a la izquierda del nombre (`alt=""`) y el nombre se ve siempre. Nombres de más de 28 caracteres bajan de tamaño en móvil. *Recomendado:* logo cuadrado o símbolo legible a 32 px.
- [ ] **Color primario:** latón `#d4a72c` sobre fondo casi negro. `estiloMarca` calcula el texto encima. *Recomendado:* un color claro o medio que se lea sobre oscuro; un azul marino del cliente se pierde en este fondo (mira el build y la home).
- [ ] **Página actual en el menú** sin JS con el slot `app/@navegacion/` (decisión abierta de fontanería). Si se añade una ruta, añade su página en `@navegacion`.
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` en vez de `?servicio=` (abierta; se recomienda mantenerlo: página estática y sin JS).
- [ ] **Etiqueta «IA»** abreviada en las miniaturas de 96–128 px: con fotos reales no sale.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, os escribo desde la web. Os mando una foto de la avería:», el de servicio («Hola, tengo este problema: {servicio}. Os mando una foto.») y el de trabajo («…y tengo algo parecido.»). O pon `contacto.mensajeWhatsapp` propio.
- `components/ParCta.tsx`: botón «Envíanos una foto por WhatsApp». Solo si el cliente acepta fotos por WhatsApp.
- `lib/textos.ts`: «Llamar 24 h» (con `urgencias24h`) o «Llamar ahora», y la línea de confianza (valoración o horario).
- `lib/cifras.ts`: cifras de la franja («Abiertos desde», «Llegamos en», «Urgencias 24 h todos los días»). Salen de los datos; comprueba que sean ciertas.
- `app/page.tsx`: «¿Te está pasando ahora?», «Pregunta el precio antes de que vayamos», «¿Estás en una de estas zonas?».
- `components/secciones/CtaFinal.tsx` («¿Sigue goteando?»), `FranjaCifras.tsx` («Con quién hablas»), `components/FilaLlamada.tsx` («¿No está tu problema?»).
- `app/trabajos/[slug]/page.tsx`: «¿Tienes algo parecido?» y «Quiero algo parecido por WhatsApp».

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/fontaneria-1/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Decisiones de fontanería aún abiertas (carpeta del proyecto `nueva-generacion/fontaneria-integracion/`): etiqueta «Foto de ejemplo», teléfono con formato de core, menú `popover` y foco con teclado, dependencias sin uso.
- [ ] La descripción SEO de `/trabajos` de core dice «N trabajos reales»: en un cliente real es cierto; en una demo, no.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Home a 375 px: el h1, los chips y la pareja Llamar/WhatsApp se ven sin hacer scroll; la barra combinada abre el menú.
- [ ] El índice se lee bien con los títulos reales (con 7 o más servicios baja al 70 %).
- [ ] Sin `whatsapp`, no sale ningún botón de WhatsApp y la pareja queda solo con la llamada.
- [ ] El primario del cliente se lee sobre el fondo oscuro (aviso de `estiloMarca` en el build).
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Aigua Nord\|origen: \"ia\"" site.config.ts` no devuelve nada.
