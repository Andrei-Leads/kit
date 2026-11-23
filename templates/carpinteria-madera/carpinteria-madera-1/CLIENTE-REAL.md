# carpinteria-madera-1 «Veta»: pasar a cliente real

Template de carpintería de madera (tipo proyecto). Parece una revista de interiores que habla de un solo taller: un hero con una foto de detalle a sangre, Newsreader en tamaño grande, filetes de 1 px y ningún radio. La sección estrella es «Trabajos por estancia»: los trabajos se agrupan por servicio, y cada grupo lleva una foto grande, hasta dos pequeñas y el botón «Quiero algo así».

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Fusteria Ebri», un taller inventado de Valencia. Borra también el comentario de cabecera.

- [ ] Datos de `negocio`:
  - `nombre`.
  - `nombreLegal` («Fusteria Ebri Ejemplo, S.L.»).
  - `nif`: el de ejemplo, B46281738, tiene el dígito de control inválido.
  - `sector`: sale en el h1, «{sector} en {ciudad}».
  - `descripcionCorta`.
  - `anioFundacion`: sale como cifra grande en «Garantías» y en `/empresa`.
  - `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, quita el campo.
- [ ] Datos de `contacto`:
  - `telefono` y `whatsapp` (`+34600000101`).
  - `email` (dominio `.example`).
  - `direccion` («Calle Ejemplo, 41, bajo»).
  - `horario`: debe coincidir con la ficha de Google.
  - `fichaGoogle` (`cid=000…0101`).
- [ ] `zonas`: los municipios reales. Salen en «Dónde montamos» y en `/empresa` («Montamos en …»).
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo.
- [ ] `trabajos`: los 6 son inventados. Cada trabajo necesita `servicio`: es lo que lo agrupa por estancia (ver §3). Sin `servicio`, el trabajo va al grupo «Otros trabajos».
- [ ] `valoracion` (4,9 / 86) y `resenas`: son inventadas. Pon solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 5 pasos de ejemplo hablan de «Presupuesto cerrado» y de «Precio y fecha de montaje por escrito». Pon los pasos reales del cliente, o `[]` para usar los de core.
- [ ] `garantias` («Presupuesto cerrado por escrito», «Fecha de montaje en el contrato», «Dos años de garantía en herrajes y montaje») y `marcas` (Blum, Hettich, Grass): solo lo que el cliente confirme.
- [ ] `empresa.historia`, `imagenes` y `equipo`: Vicent y Pau Ebri son inventados.
- [ ] `preguntas` (plazos de «tres a cinco semanas», «la medición va incluida»): revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`fusteriaebri.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/fusteria.ebri.ejemplo` → las reales, o quita el campo.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` o `tarifas` solo con cifras validadas por el cliente. Con `precioDesde`, la ficha de servicio muestra «Desde …».

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (16 rellenos grises más `CREDITOS.md`, donde están las proporciones). Pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero, 3:2, la más importante:** `imagenesHero[0]` es una foto de **detalle**, no una estancia: un canto, una veta o un tirador, a sangre y con un velo oscuro abajo. El texto blanco va encima, en la parte inferior. También es la imagen de Open Graph.
- [ ] **CTA final:** usa `imagenesHero[1]` (o, si no existe, `galeria[0]`). Sin ninguna de las dos, el bloque va sobre `alterna`.
- [ ] **Trabajos, 4:3 o 4:5:** la primera foto de cada trabajo es la grande del grupo (16:9 en escritorio, 4:5 en móvil, recortada con `object-cover`). Las pequeñas son 4:5. Si hay `antes`, necesita el mismo encuadre que la primera foto: la ficha monta un deslizador antes/después.
- [ ] **Servicios, 4:5:** las tarjetas y `/servicios`. Un servicio sin foto sale como ficha tipográfica (número en cursiva y descripción entre filetes), sin romper nada.
- [ ] **Empresa, 4:5:** 2 fotos a sangre. Equipo: foto cuadrada pequeña, o solo la lista de nombres (nunca un hueco de retrato).
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto. El hero y la foto principal de cada ficha se sirven a calidad 60.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Agrupar por estancia:** hoy los grupos de «Trabajos por estancia» son los **servicios** (`trabajos[].servicio`). Si el cliente piensa en estancias (cocina, dormitorio…) y no en servicios, el contrato no tiene un campo `estancia`. *Recomendado:* que los servicios sean las estancias («Cocinas a medida», «Armarios y vestidores», «Muebles de baño»…), como en el ejemplo.
- [ ] **Nombre largo:** la cabecera muestra el nombre completo en serif (nunca con «…»). Con un nombre de más de unos 30 caracteres, en móvil ocupa 4 o 5 líneas y la cabecera crece. *Recomendado:* el nombre comercial corto en `negocio.nombre` (el largo va en `nombreLegal`).
- [ ] **Color primario:** solo pinta botones, números y la capitular. Si el primario es claro, el texto en color primario se oscurece solo (`--color-primario-texto`), y `estiloMarca` calcula el color del texto de los botones. *Recomendado:* un tono madera medio u oscuro. Con un amarillo funciona, pero conviene mirar el aviso de contraste del build.
- [ ] **«Nuestras garantías»** (en la entrega, «Por escrito») y **«Marcas»** (en la entrega, «Herrajes»): son los títulos genéricos del template. Si todas las garantías están en el contrato, se puede volver a «Por escrito».
- [ ] La etiqueta «Imagen generada con IA» del equipo y de las fotos: con fotos reales no sale.

## 4. Textos fijos que conviene revisar

- `app/servicios/page.tsx`: «Todo se fabrica en nuestro taller y lo montamos nosotros en tu casa.». Solo es cierto si el cliente fabrica y monta él mismo.
- `components/secciones/AsistenteHueco.tsx`: «Tres toques y te preparamos el mensaje de WhatsApp. No guardamos nada.».
- `components/Asistente.tsx`: `ESTANCIAS` y `PLAZOS` (las opciones fijas) y el mensaje compuesto «Hola, quiero presupuesto para {pieza}. Es para {estancia}. {plazo} Os mando fotos y medidas.».
- `lib/mensajes.ts`:
  - el mensaje general, «Hola, he visto vuestra web y quiero presupuesto para un mueble a medida. Os mando fotos y medidas del hueco.»;
  - el de la ficha de servicio, «Hola, quiero presupuesto para {servicio}. Os mando fotos del sitio.»;
  - los textos de los botones («Pide presupuesto», «Envíanos fotos y medidas», «Quiero algo parecido», «Quiero algo así»).
- `components/secciones/Garantias.tsx`: «{N} años de taller.», calculado desde `anioFundacion`.
- `app/empresa/page.tsx`: el h1 «Nuestro taller» y «Montamos en {zonas}.».
- `app/contacto/page.tsx`: la columna «El taller» supone que la dirección es un taller visitable. Si es un domicilio, cámbiala.
- `components/secciones/Resenas.tsx`: sin `valoracion`, el h2 es «Lo que dicen de nosotros».

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/carpinteria-madera-1/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Un 404 lanzado con `notFound()` (`/trabajos` sin datos, un slug que no existe) sale en blanco sin JS. Es una limitación de Next (AGENTS §11).
- [ ] La página actual del menú se marca solo con CSS (filete de tinta), sin `aria-current`.

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] «Trabajos por estancia» agrupa bien: no hay grupos de un solo trabajo sin sentido ni un grupo «Otros trabajos» que no debería existir. La fila de anclas sale solo con 2 grupos o más.
- [ ] Con JS, el asistente compone bien el mensaje con los servicios reales (sin «presupuesto para cocinas a medida a medida»). Sin JS, se ve el texto guía y un botón de WhatsApp genérico.
- [ ] Sin `whatsapp`, no queda ningún enlace `wa.me` y la llamada pasa a relleno (cabecera, hero y barra).
- [ ] A 375×667, «Pide presupuesto» del hero cabe por encima de la barra móvil.
- [ ] La vista previa de la home en WhatsApp muestra la foto real del hero.
- [ ] `grep -rn "ejemplo\|ficticio\|Fusteria\|Ebri\|origen: \"ia\"" site.config.ts` no devuelve nada.
