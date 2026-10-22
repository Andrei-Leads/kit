# tienda-1 «Almacén» — notas de construcción (21/10/2026)

Template para almacenes y tiendas de recambios. Reproduce la arquitectura, la maquetación y las animaciones de recambioscerda.com según `andrei-leads-tech/material/referencias/recambioscerda/ESPEC.md`. Todo el código es nuestro y no se ha copiado ni texto, ni imagen, ni logo del original. Primer uso previsto: «Suministros y Herrajes para Carpintería S.L.» (Madrid).

## Hecho

- **Esqueleto** copiado de `carpinteria-metalica-2`, sin secciones, imágenes ni `site.config`:
  - Paquete `tienda-1`, con `pnpm install` desde la raíz. `pnpm-workspace.yaml` ya cubría `templates/*/*`.
  - Next 16.4, `cacheComponents`, core `workspace:^`.
- **Tokens** en `app/globals.css`:
  - Burdeos `#A8243C`. El tono oscuro y el claro se derivan del primario con `color-mix`.
  - Grises de la spec y radio 0. Excepción: el radio 40/0/40/0 de las tarjetas.
  - Breakpoint `ancho:` a 1240 px, que es donde el menú pasa a hamburguesa.
  - Raleway 300–900 con `next/font`.
- **Cabecera**:
  - Blanca, de 90 px.
  - Pasa a fija de 60 px al hacer scroll: entra desde arriba en 300 ms, fondo blanco al 80 % con desenfoque y sombra.
  - Menú en Raleway 600 en mayúsculas. El enlace activo lleva una barra de 4 px.
  - «Productos» abre un desplegable de familias en `#F2F2F2`, con hover o con el foco.
  - Botón de WhatsApp desde 768 px, o de llamada si no hay WhatsApp.
  - Por debajo de 1240 px, menú lateral de 250 px en `#191919` con velo al 60 % y submenú «+/−».
- **Pie** negro de 4 columnas (marca, contacto, menú y horario), cada una con su filete. Copyright centrado con los legales de core.
- **Barra móvil**: WhatsApp | Llamar.
- **Inicio** (spec §5.1):
  - S1, hero con slider de 2 diapositivas, Ken Burns del fondo, bodegón y banda diagonal.
  - S2, «Sobre nosotros» con letra tramada.
  - S3, caja de horario de marca con la fachada.
  - S4, rejilla de 8 tiles a sangre.
  - S5, «Cómo trabajamos» con composición circular y 4 tarjetas.
  - S6, carrusel de marcas con scroll-snap.
  - S7, «¡Desde {año}!».
  - S8, separador vertical.
  - S9, banda CTA «¿No sabes qué pieza es?» sobre un mosaico 4 × 2.
- **Productos** (`/servicios`): PageHero, intro centrada, rejilla de familias (línea del 20 % al 60 % en hover, botón dentro de la tarjeta) y banda CTA.
- **Familia** (`/servicios/[slug]`):
  - F1: h1 centrado y 3 columnas en espejo, con precio y botones.
  - F2: subfamilias con el recorte que sobresale y el radio 40/0/40/0.
  - Después, preguntas del servicio y banda CTA.
- **Sobre nosotros** (`/empresa`): PageHero, historia, 4 «trailer boxes» (hover con la franja de marca), equipo si lo hay, 3 familias destacadas, reseñas si las hay y CTA.
- **Contacto**: PageHero, canales (WhatsApp, llamar, email), caja de sede de marca con el horario y foto de la fachada con «Cómo llegar», y preguntas frecuentes.
- **Galería** (`/trabajos` y `/trabajos/[slug]`): solo si hay trabajos o galería. Las legales llevan migas. La `not-found.tsx` tiene «404» tramado.
- **`lib/catalogo.ts`** local y tipado:
  - `familias[]` con `slug`, `tile?`, `lemaIzquierda?`, `lemaDerecha?`, `tituloGama?` y `subfamilias[]` ({`titulo`, `imagen?`, `referencias[]`}).
  - Helpers `familiaCatalogo(slug)` y `fotoTile(servicio)`.
  - `IMAGENES` con `verTodo`, `composicion`, `proceso[]` y `portadas.{productos, empresa, contacto}`.
  - No importa `@/site.config`.
- **`site.config.ts`** con datos ficticios genéricos («Herrajes Ejemplo», Madrid): 8 familias, 3 con ficha completa en el catálogo y «Persiana y mosquitera» sin entrada, para probar el caso sin datos locales.
- **Imágenes**: 43 de relleno en `public/ejemplo/`. La lista de huecos está en `public/ejemplo/CREDITOS.md`.

## Comprobaciones

| Comprobación | Resultado |
|---|---|
| `NODE_ENV=production pnpm build` | Verde |
| `pnpm lint` | Limpio |
| `tsc --noEmit` | Limpio |
| `pnpm -r --filter "./templates/**" build` y `lint` | Los 7 templates en verde |
| Rutas `/`, `/servicios`, 2 familias, `/empresa`, `/contacto` y las 3 legales | 200 y `h1=1` |
| `/no-existe` | 404 con `h1=1` |
| `/servicios/no-existe`, `/trabajos/no-existe` y `/trabajos` (sin datos) | 404 ya en la 1.ª petición |
| `robots` | `noindex, nofollow` |
| Canonical | El propio en las legales y en las familias |
| `openingHoursSpecification` / `aggregateRating` | 1 / 0 |
| `<Analitica>` | Una vez en el layout; `site.config.ts` no activa `analitica` |
| Greps del §7 (`<form`, `<iframe`, Google Fonts, `tel:`/`wa.me` a mano, `aria-label` en botones, `new Date`, librerías de animación, imports de valores en componentes cliente, tokens del origen) | Sin resultados (salvo `lib/anio.ts`) |
| Enlaces `tel:+34600000000` y `wa.me/34600000000?text=…` | Correctos, con el mensaje de cada página |
| JS de `/empresa` | 557.920 bytes (`/`: 563.159); dentro de la referencia de 545–575 KB |
| Variante mínimos sin WhatsApp | Compila; 0 `wa.me` y la CTA cae a email + llamada |
| Variante mínimos con WhatsApp | Compila |
| Variante 1 servicio | Compila |
| Variante solo galería | `/trabajos` 200, «Galería» entra en el menú |
| Variante con trabajo | Ficha 200 |
| Variante logo + nombre de 44 caracteres + `#1e40af` + horario de 4 filas | Compila. A 375 px el nombre cabe en 2 líneas; el acento del pie es legible |
| Desbordamiento horizontal (`scrollWidth` = `clientWidth`) | Ninguno a 1440, 390 y 375 en todas las páginas capturadas |
| Pliegue a 375 × 667 | El CTA del hero se ve sin scroll y por encima de la barra |
| `prefers-reduced-motion: reduce` | Ken Burns y barrido en `none`; el slider no rota |
| Sin JavaScript | Todo visible (marcas incluidas). Lo único oculto es la diapositiva 2 del slider |
| `site.config.ts` restaurado tras las variantes | `diff` vacío |

Las capturas están en `/tmp/claude-1000/-media-ysst-aca7d5ae-9e94-46b2-b2a7-2ecf69a2bf93-docker-data-mis-datos-andrei-leads-scraper/ded61c1f-35fe-46f3-9a1b-49be9f8edd1d/scratchpad/tienda-1/` (las de inicio, con el slider en pausa):
- `{home,productos,familia,contacto,empresa}-{escritorio,movil}.png` (1440 y 390).
- `home-375x667-pliegue.png`, `home-escritorio-diapositiva2.png`, `productos-barrido-300ms.png`.
- `estado-{cabecera-fija-escritorio,menu-movil,desplegable}.png`, `sin-js-home.png` y `variantes/`.

Comparadas con las de la spec, coinciden en estructura, ritmo y estados. Las diferencias son intencionadas y están en «Desviaciones».

## Decisiones (y por qué)

- **Rutas fijas del kit, no las de la spec.**
  - Las familias van en `/servicios/[slug]` (etiqueta «PRODUCTOS») y «Sobre nosotros» en `/empresa`.
  - Motivo: core genera el sitemap y los canonical con `/servicios/…` y `/empresa`, y AGENTS.md §7 dice que la etiqueta es libre y la ruta no.
  - «Cómo trabajamos» va en la home (S5, ancla `/#como-trabajamos`), como recomienda la spec. No tiene página propia.
- **Jerarquía de títulos.** Los «h3 de marca» que Cerda pone encima de un h2 se pintan como `<p>` con estilo de antetítulo. Así no hay saltos h1 → h3.
- **H1 de la home**: `{sector} en {ciudad}`, en la diapositiva 1. La diapositiva 2 lleva su titular en un `<p>`, para que solo haya un h1.
- **LCP y animaciones.**
  - El h1, la foto y el botón de la diapositiva 1 salen del servidor en su estado final. Las entradas A6/A7 solo corren al rotar.
  - Ken Burns: solo `transform` desde `scale(1)`, así que la foto se pinta en el primer frame. Es una excepción consciente a «la foto del hero no se anima», porque Ysst pidió las animaciones del original.
  - Barrido A10: solo se anima el `::after` de marca, que tapa el título y se retira. El texto nunca pasa por `opacity: 0`.
- **Slider**:
  - 6 s por diapositiva (Cerda usa 4 s) para que se pueda leer tras la entrada de 2 s.
  - Botón de pausa visible (WCAG 2.2.2). Se pausa con el foco dentro y con la pestaña oculta.
  - Con *reduce* no rota.
- **Entrada de marcas (A11)**: −40 px y opacidad en 1 s. Solo empieza oculta bajo `html.js`. No se ha añadido la entrada general al hacer scroll (A12).
- **Marcas**: el contrato solo trae nombres, así que las celdas son texto en mayúsculas, nunca logos.
- **WhatsApp en cabecera** desde 768 px, solo si existe. Sin WhatsApp aparece el teléfono, por coherencia con la barra móvil.
- **«Mándanos foto de la pieza»** (hero D2 y banda CTA): por WhatsApp con un mensaje precargado. Sin WhatsApp, `mailto:` con asunto + llamada.
- **Contacto sin formulario ni iframe** (regla del kit):
  - La columna del formulario pasa a ser la lista de canales.
  - El mapa embebido se sustituye por la foto de la fachada con «Cómo llegar» a Google Maps.
  - Sin banda CTA en Contacto (spec C4).
- **Colores**:
  - Texto atenuado `#6e7275` (Cerda usa `#a6a8a9`, 2,3:1) y listas `#6b7378`, para llegar a AA.
  - El acento del pie es `color-mix(primario 60 %, blanco)`: 7,2:1 sobre negro con el burdeos y 6,6:1 con `#1e40af`.
- **Datos**:
  - Se usa primero el contrato: `empresa.historia` (S2), `formatearHorario` (S3, pie y contacto), `proceso` con pasos por defecto en `lib/proceso.ts` (S5), `anioFundacion` (S7), `servicios[].imagenes[0]` (tarjetas) e `imagenes[1]` (foto central de la familia).
  - `lib/catalogo.ts` solo guarda lo que falta.
  - El microcopy de la plantilla («¿No sabes qué pieza es?», «Encuentra la pieza sin perder la mañana»…) es genérico de almacén de recambios y no contiene datos del negocio.
- **Sin asistente de WhatsApp** (el §6.2 lo incluye y `-2` lo tenía): en un almacén su papel lo hace el CTA «mándanos foto de la pieza» (hero D2, banda final, contacto) con mensaje precargado.
- **Campos del contrato que el template no pinta**: `zonas`, `garantias`, `acreditaciones` y `tarifas` (no están en la spec). Si el cliente los trae, no saldrán: habría que añadir sección.
- **Reseñas**: no están en la spec. Se pintan en `/empresa` porque las trae el scraper y la demo debe verse completa con ellas.

## Desviaciones respecto a la spec

1. Rutas `/servicios/[slug]` y `/empresa` en vez de `/productos/[familia]` y `/sobre-nosotros`. No hay página `/como-trabajamos`.
2. Logo de 32 px junto al nombre escrito (regla del kit), no el logo grande del original (60 px; el 65 % del ancho en móvil).
3. Contacto sin formulario, sin reCAPTCHA y sin iframe de mapa.
4. Marcas en texto, sin logos.
5. Slider de 6 s con botón de pausa. Los puntos siguen ocultos por debajo de 768 px; el botón de pausa se ve en todos los tamaños.
6. Barrido A10 en una sola fase (el bloque ya tapa el título al empezar y se retira hacia la derecha), en vez de entrar y salir: así el texto se pinta desde el primer frame.
7. Ken Burns con un desplazamiento del 3 % (la spec también lo recomienda; el original usa el 15 %).
8. Móvil con las propuestas de la spec, no el móvil del original:
   - hero apilado (bodegón 16:9 arriba y botón antes del subtítulo, para que se vea sin scroll);
   - tiles en 2 columnas;
   - PageHero de 260 px como mínimo;
   - texto alineado a la izquierda (sin justificar).
9. Contenedor con 24 px de margen en móvil (la spec dice 33 px; se mantienen 33 px desde 768).
10. Celdas de marcas de 220 px de alto en escritorio (la spec dice 300) y 120 px en móvil.
11. Títulos de subfamilia a 26–34 px (la spec dice 40): a 1/4 de columna, «Oscilobatientes» desbordaba.
12. Añadidos que no están en la spec:
    - migas en la familia;
    - «Conócenos» en S2;
    - precio «desde» en tarjetas y familia;
    - preguntas (familia y contacto), reseñas y equipo en `/empresa`;
    - galería en `/trabajos`.

## Pendiente / preguntas para Ysst

- **Lista de familias y subfamilias reales**: la valida el cliente, y después se rellenan `site.config.ts` y `lib/catalogo.ts`. Hay otro agente escribiendo los textos reales.
- **Fotos**: las 43 son relleno gris. Faltan los prompts (`docs/fotos-ejemplo/tienda-1/prompts-chatgpt.md`) y las fotos reales del cliente: fachada, almacén y mostrador.
- **Marcas que distribuye**: hay que confirmar los nombres. Si se quieren logos, primero hace falta un campo en core (propuesta de cambio de contrato).
- **Color**: `#A8243C` provisional. Hay que muestrearlo del cartel y ponerlo en `marca.colorPrimario` de la web del cliente.
- **Slider**: 2 diapositivas o una fija. Con una sola imagen en `imagenesHero`, el hero queda fijo automáticamente.
- **Tipo de negocio**: «tienda» no está en la tabla de tipos de AGENTS.md §7. Se ha tratado como proyecto: barra WhatsApp | Llamar.
- **AGENTS.md** (§4, §7 y §12): falta añadir `templates/tienda/tienda-1`. No se ha tocado porque está fuera de la carpeta.
- **Imágenes propias del template** en una web de cliente: las de `lib/catalogo.ts` (`IMAGENES`, tiles, subfamilias) siguen en `/ejemplo/` hasta que se sustituyan, y mientras tanto llevan la etiqueta «Foto de ejemplo».
- **Commit (Ysst)**: `git add templates/tienda/tienda-1 pnpm-lock.yaml`.

## Archivos fuera del template

- `pnpm-lock.yaml`, por el `pnpm install` que enlaza el paquete nuevo. Nada más: `git status --short` muestra solo `M pnpm-lock.yaml` y `?? templates/tienda/`.
- Diff del lockfile (+56/−1): el bloque `importers` de `templates/tienda/tienda-1` y **una línea ajena**: pnpm normaliza en `templates/electricidad/electricidad-2` la resolución de peers de `eslint-config-next@16.4.0` (de la variante con `@typescript-eslint/parser` a la variante sin él; ambas ya estaban en el lock). No cambia ninguna versión; no se ha tocado a mano.
