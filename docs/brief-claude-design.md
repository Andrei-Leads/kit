# Brief para Claude Design: templates de Andrei Leads (v2, nueva generación)

> **v2 (20/11/2026).** Sustituye al brief anterior. Recoge el debate «nueva generación de webs del kit»: webs más actuales y premium, dinámicas visuales de verdad distintas, fotografía con dirección de arte, y unos «huesos» comunes (tokens con nombre fijo, piezas base compartidas y contrato de core 0.6.0) sobre los que se monta cada diseño.

> Este documento es la base de todos tus encargos. Léelo entero antes de diseñar. Cada encargo concreto (un nicho y un número de template) llega aparte y se apoya en este brief. Si algo de tu diseño contradice una regla, la regla gana. Si crees que una regla impide un buen diseño, dilo explícitamente en lugar de saltártela.

---

## 1. Qué vas a diseñar

Un **template**: el diseño reutilizable de una **web completa de varias páginas** para un nicho de pymes locales (fontanería, reformas, tejados…). No es la web de un cliente concreto. Se rellenará con los datos de cualquier negocio del nicho.

**Para qué se usa:** como demostración. Se le enseña al dueño de un negocio sin web cómo quedaría la suya, con sus datos reales. Tiene que reconocerse en ella en cinco segundos.

**Objetivo:** que el visitante **llame o escriba por WhatsApp**. Cuál de los dos manda depende del tipo de negocio (§6).

**Quién la visita:** particulares, comunidades de vecinos y administradores de fincas de su ciudad: hoy, Valencia, Barcelona, Sevilla y Madrid, con sus áreas metropolitanas. Buscan en el **móvil**, casi siempre desde Google.

**Quién la compra:** el dueño del negocio. Es de oficio, no de tecnología. Valora que se vea profesional, cercana y clara, no "de agencia".

**Cada nicho tendrá 5 templates por tanda**, distintos, con datos y fotos de ejemplo de su sector. El tipo de negocio del nicho (§6) marca las reglas de conversión; tu diseño marca la identidad.

**Nivel que se busca:** una web que el dueño enseñe con orgullo y que se note de 2026, no una plantilla de WordPress. La competencia local (WordPress con Elementor, banner de cookies, H1 de palabra clave, reseñas viejas, erratas, sin una idea visual) es el listón que hay que dejar muy atrás. Lo premium sale de **cuatro cosas**: una idea visual propia (la «dinámica» de tu encargo), tipografía con carácter y a buen tamaño, fotografía con dirección de arte (§8, reglas 13–14) y acabado impecable (espaciado, estados vacíos, móvil). No sale de efectos pesados: el presupuesto de rendimiento (§8, regla 15) es parte del diseño.

---

## 2. Restricciones técnicas

- **Stack:** Next.js **16.4.6** (App Router, `cacheComponents`, Turbopack) con TypeScript, React **19.3.1**, Tailwind CSS v4 y componentes **shadcn/ui** copiados dentro del template. Las piezas base comunes vienen del registro del kit (§3, «Huesos»).
- **Multipágina** (§3). Cabecera, pie y barra móvil están en `app/layout.tsx` y aparecen en **todas** las páginas, legales incluidas.
- **Móvil primero:** diseña a 375 px de ancho (375×667 como pantalla de referencia) y después adapta a escritorio a 1280 px.
- **Español de España** en todos los textos.
- **Ningún dato del negocio escrito a mano.** Nombres, teléfonos, servicios, fotos, precios y textos salen del contrato de datos (§4). Tampoco la ciudad: el mismo template sirve en Valencia, Barcelona, Sevilla o Madrid. Los textos genéricos de la interfaz sí pueden ser fijos ("Nuestros servicios", "Llamar ahora", los pasos por defecto de "Cómo trabajamos").
- **Sin formularios** ni nada que envíe o guarde datos. El contacto es por llamada, WhatsApp o email.

---

## 3. Páginas y estructura del template

### Rutas (fijas en todos los templates)

| Ruta | Página | Cuándo existe |
|---|---|---|
| `/` | Inicio | Siempre |
| `/servicios` | Lista de servicios | Siempre |
| `/servicios/[slug]` | Una página por servicio | Siempre, una por cada `servicios[]`. Si el servicio no tiene `contenido`, la página existe pero lleva `noindex` |
| `/trabajos` | Trabajos o galería | Solo si hay `trabajos` o `galeria`. Si no, desaparece del menú y la ruta da 404 |
| `/trabajos/[slug]` | Un trabajo | Una por cada `trabajos[]` |
| `/empresa` | Quiénes somos | Siempre. Se compone con lo que haya (historia, equipo, fotos, años, acreditaciones, garantías); cada bloque vacío se oculta |
| `/contacto` | Contacto | Siempre |
| `/comunidades` | Para comunidades de vecinos | Solo si existe el bloque `comunidades` (tipo obra técnica; en urgencias, solo si el encargo la pide) |
| Cualquier URL que no exista | Página no encontrada (404) | Siempre, con tu diseño: un `h1` («No encontramos esta página»), una frase, enlaces a `/`, `/servicios` y `/contacto`, `BotonLlamada` y `BotonWhatsApp` (si hay WhatsApp) |
| `/aviso-legal`, `/privacidad`, `/cookies` | Legales | Siempre. **El texto lo pone core**; tú solo decides cómo se ven dentro de tu layout (cabecera, pie, ancho, tipografía) |

La **etiqueta** del menú la decides tú ("Trabajos", "Proyectos", "Obras"), pero la ruta no cambia. No hay páginas por municipio: las zonas son solo una lista.

### Carpetas

```
templates/<nicho>/<nicho>-<n>/          p. ej. templates/fontaneria/fontaneria-1/
├─ app/
│  ├─ layout.tsx          # tipografías (next/font), color primario, Cabecera, Pie y BarraMovil
│  ├─ page.tsx            # inicio: compone las secciones en el orden del tipo (§6)
│  ├─ globals.css         # Tailwind + estilos de core + @theme con TUS tokens
│  ├─ not-found.tsx       # página 404, con tu diseño
│  ├─ servicios/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ trabajos/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ empresa/page.tsx
│  ├─ contacto/page.tsx
│  ├─ comunidades/page.tsx   # solo en obra técnica
│  ├─ aviso-legal/page.tsx   # solo renderiza el componente de core
│  ├─ privacidad/page.tsx    # ídem
│  └─ cookies/page.tsx       # ídem
├─ components/
│  ├─ ui/                 # componentes shadcn que uses (botón, etc.)
│  ├─ base/               # piezas base copiadas del registro del kit (ver «Huesos»), adaptables
│  └─ secciones/          # un componente por sección: Hero.tsx, Servicios.tsx…
├─ lib/                   # solo lo propio del diseño; el formato y los mensajes vienen de core
├─ public/
│  └─ ejemplo/            # imágenes de ejemplo neutras del nicho
└─ site.config.ts         # datos de ejemplo del nicho (§4)
```

### Huesos: lo que no cambia entre templates

La web se construye en tres capas. **Tú diseñas la tercera**; las dos primeras son fijas y tu diseño se apoya en ellas:

| Capa | Qué es | Qué significa para tu diseño |
|---|---|---|
| **core** (`@andrei-leads/core` 0.6.0, se importa) | Contrato de datos, SEO, legales, `BotonLlamada`, `BotonWhatsApp` y lógica pura: teléfono visible, listas («A, B y C»), media de reseñas, horario (`formatearHorario`), mensajes de WhatsApp por página, pasos por defecto del proceso, servicios y trabajos relacionados, año actual | No rediseñes esa lógica ni la escribas en `lib/`: úsala. **Nada visual vive en core.** |
| **Registro del kit** (piezas base, se copian a `components/base/`) | `Foto` (pinta la etiqueta según `imagen.origen`), `MedioHero` (foto o vídeo con póster), `AntesDespues` (`<input type="range">` nativo + `clip-path`; sin JS, las dos fotos en fila), `Preguntas` (`<details name>` nativo), `MenuPopover` (API `popover` nativa), `BarraMovil` (variantes `dos` y `combinada`), `Migas`, `aparecer.css` (animaciones de aparición solo con CSS) | Están escritas **solo con los tokens comunes** (§8, regla 3), así que heredan tu diseño sin tocarlas. Puedes reestilarlas o sustituir una por una tuya si tu dinámica lo pide; dilo en la entrega |
| **Template** (lo que diseñas) | Hero, sección estrella, firma visual, valores de los tokens, tipografía, cabecera y pie, orden de la home, ficha de estilo fotográfico | Es lo único que distingue un template de otro: aquí va toda la ambición |

Cada sección es un componente que recibe **solo su parte** de los datos. Por ejemplo, `Servicios` recibe `servicios` y no el objeto completo. Una misma sección puede aparecer en varias páginas (por ejemplo, Reseñas en inicio y en un servicio).

---

## 4. Contrato de datos (`site.config`, core 0.6.0)

Es el contrato de core 0.5.1 más tres novedades **opcionales** de 0.6.0 (al final de la tabla). **Core lo valida al compilar: si un dato no cumple su formato, la web no compila.** Los datos de ejemplo que entregues (§9) tienen que cumplir todo lo de esta tabla. Un campo que no esté aquí no existe: no lo inventes; si tu diseño lo necesita, proponlo aparte.

`?` = opcional. "Lista" = puede llegar vacía salvo que se diga otra cosa. **Imagen** = `{ src, alt }`: `src` es una ruta (`"/ejemplo/hero.jpg"`) y `alt` es obligatorio y no puede estar vacío. **Párrafos** = lista de textos, uno por párrafo (sin Markdown ni HTML). Los máximos son en caracteres.

| Bloque | Campos |
|---|---|
| `negocio` | `nombre`, `nombreLegal`, `nif` (9 caracteres, mayúsculas y números: `"B12345678"`), `sector`, `descripcionCorta` (≤ 160), `logo?` (imagen), `anioFundacion?` (número, 1900–2100), `registroMercantil?` (solo sociedades), `tipoSchema` (tipo para Google: lista con uno o más de `Plumber`, `Electrician`, `Locksmith`, `RoofingContractor`, `HVACBusiness`, `HousePainter`, `GeneralContractor`, `HomeAndConstructionBusiness`, `Store`; por defecto `["HomeAndConstructionBusiness"]`) |
| `contacto` | `telefono` y `whatsapp?` (`+34` y 9 dígitos, sin espacios: `"+34600000000"`), `email` (obligatorio), `direccion` {`calle`, `cp` (5 dígitos, como texto: `"46001"`), `ciudad`, `provincia`}, `horario` (mínimo 1 franja; formato debajo), `coordenadas?` {`lat`, `lng`} (números), `mensajeWhatsapp?` (mensaje por defecto, ≤ 200), `urgencias24h` (`true`/`false`; por defecto `false`), `tiempoLlegada?` (≤ 20: `"45 min"`), `fichaGoogle?` (enlace a la ficha de Google, con `https://`) |
| `zonas` | lista de municipios |
| `servicios` | lista, **mínimo 1**, de {`titulo`, `descripcion` (corta), `slug?` (si falta, se genera del título), `contenido` (párrafos), `incluye` (lista), `imagenes` (lista de imagen), `preguntas` (lista de {`pregunta`, `respuesta`}), `mensajeWhatsapp?` (≤ 200), `precioDesde?` (≤ 40: `"desde 60 €"`)} |
| `trabajos` | lista de {`titulo`, `slug?` (si falta, se genera del título), `descripcion` (≤ 300), `ubicacion?`, `anio?` (número), `servicio?` (el `slug` de un servicio que exista), `superficie?` (≤ 20: `"5 m²"`), `duracion?` (≤ 20: `"10 días"`), `precio?` (≤ 40, rango aproximado), `contenido` (párrafos), `imagenes` (**mínimo 1**; la primera es el "después"), `antes?` (imagen), `testimonio?` {`autor`, `texto`}} |
| `valoracion` | opcional: {`media` (1–5), `total` (entero)} de Google ("4,8 · 127 reseñas") |
| `resenas` | lista de {`autor`, `texto`, `puntuacion` (1–5), `fecha?` (`"2026-09"` o `"2026-09-14"`), `fuente?` (`"google"`, `"web"` u `"otra"`)} |
| `proceso` | lista (máx. 6) de {`titulo`, `texto`} |
| `acreditaciones` | lista de {`nombre`, `numero?`, `corto?`} ("Empresa instaladora RII", "n.º 46/12345", "RII"; `corto` ≤ 12 caracteres, desde 0.8.0) |
| `garantias` | lista (máx. 6) de textos de ≤ 80 ("Presupuesto cerrado antes de empezar") |
| `marcas` | lista de nombres ("Cortizo", "Daikin") |
| `tarifas` | opcional: {`items` [{`concepto`, `precio` (≤ 40)}] (mínimo 1), `nota?`} |
| `empresa` | {`historia` (párrafos), `imagenes` (lista), `equipo` [{`nombre`, `cargo?`, `foto?` (imagen)}]}; todo vacío por defecto |
| `comunidades` | opcional: {`texto` (párrafos, mínimo 1), `puntos` (lista), `ieev` (`true`/`false`; por defecto `false`)} |
| `imagenesHero` | lista de imagen (fotos reales para el hero) |
| `galeria` | lista de imagen con `titulo?` |
| `preguntas` | lista de {`pregunta`, `respuesta`} |
| `marca` | `colorPrimario?`: color de marca del cliente en hex `#rrggbb` (`"#1e40af"`; §8, regla 3) |
| `seo` | `titulo` (≤ 60), `descripcion` (≤ 160), `url` (con `https://`: `"https://web-ejemplo.vercel.app"`), `indexar?` (`true`/`false`; por defecto `false`, que pone `noindex` en toda la web) |
| `analitica` | `vercel?` (`true`/`false`; por defecto `false`). Lo activa cada web, no el template; no diseñes nada para ello (§8, regla 5) |
| `redes` | `instagram?`, `facebook?` (enlaces con `https://`) |
| **Novedad 0.6.0:** imagen `origen?` | Toda imagen puede llevar `origen`: `"cliente"`, `"ficha-google"`, `"ia"` o `"stock"`. La pieza `Foto` pinta una etiqueta discreta: «Imagen generada con IA» (obligatoria por el AI Act) o «Foto de tu ficha de Google» (en una demo, vende). Diseña esa etiqueta (posición, tamaño, contraste) para que se lea sin estorbar |
| **Novedad 0.6.0:** `videoHero?` | `{ src, srcAv1?, poster }` (`poster` es una imagen obligatoria). Vídeo corto en bucle, sin sonido. **Solo tipo proyecto.** El póster es el LCP, la imagen de Open Graph de respaldo y lo que se ve con «reducir movimiento» o sin vídeo. `imagenesHero` sigue siendo solo de fotos |
| **Novedad 0.6.0:** `sobre-primario` calculado | Si el cliente trae `marca.colorPrimario`, core calcula el color del texto sobre él (blanco o casi negro) y lo pone en `--color-sobre-primario`. Tu diseño usa siempre ese token para el texto sobre primario: así aguanta incluso un amarillo de furgoneta |

**Horario:** lista de franjas `{ dias, abre, cierra }`.
- `dias`: lista de `"lunes"`, `"martes"`, `"miercoles"`, `"jueves"`, `"viernes"`, `"sabado"`, `"domingo"`, en minúsculas, **sin tildes** y sin repetir.
- `abre` y `cierra`: `"HH:MM"` (`"08:00"`, no `"8:00"`), y `cierra` posterior a `abre`. Si cierra a medianoche, `"23:59"`.
- Jornada partida = dos franjas con los mismos días: `{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" }` y otra igual de `"16:00"` a `"19:00"`.
- Las urgencias no van en el horario: solo `urgencias24h`.
- El template no lee las franjas: las pinta con `formatearHorario` de core, que da filas `{ dias, horas }` («Lunes a viernes» · «8:00–14:00 y 16:00–19:00»).

**Slugs:** solo minúsculas sin acentos, números y guiones (`"reformas-de-bano"`). Si falta, se genera del título. No se puede repetir dentro de `servicios` ni dentro de `trabajos`.

**En los datos de ejemplo no pongas `seo.indexar` ni `analitica`:** los activa cada web, nunca el template.

**Datos mínimos reales.** La demo se hace con lo que da Google Maps: nombre, sector, contacto, horario, zonas, reseñas, valoración y alguna red. Todo lo demás puede faltar. **El diseño tiene que verse completo solo con el núcleo** (`negocio`, `contacto`, `zonas`, `servicios` con título y descripción, `resenas`, `valoracion`, `seo`).

**Variabilidad real:** de 1 a 10 servicios; servicios con 0 o varias fotos; reseñas de una línea o de un párrafo; nombres cortos ("Verde") y largos ("Reformas y Construcciones Hermanos García"); 0 o 20 trabajos.

**Precios:** son opcionales y solo aparecen si el cliente los ha validado. Nunca rellenes precios inventados en un diseño que vaya a enseñarse como "su" web; en los datos de ejemplo, márcalos como ficticios.

---

## 5. Catálogo de secciones

Tú eliges cuáles usar en cada página, respetando el orden del tipo (§6). **Si una sección opcional no tiene datos, desaparece sin dejar hueco** (ni título suelto ni espacio vacío).

| Sección | Campos que usa | Sin datos |
|---|---|---|
| Cabecera | `negocio.nombre`, `negocio.logo?`, `contacto.telefono`, rutas | Siempre. Con el **botón de llamada visible siempre**, también en móvil. Sin `/trabajos` si no hay trabajos ni galería; sin `/comunidades` si no hay `comunidades` |
| Barra móvil | `contacto.telefono`, `contacto.whatsapp?` | Siempre en móvil, fija abajo, en todas las páginas. Dos botones en el orden de su tipo (§6); en urgencias se admite la barra combinada de tres. Sin WhatsApp, solo "Llamar" a todo el ancho (o [Menú] + Llamar) |
| Hero | `negocio`, `zonas`, `imagenesHero`, `valoracion?`, `contacto.urgencias24h`, `contacto.tiempoLlegada?` | Siempre. Sin fotos, hero tipográfico. Sin `valoracion`, sin estrellas. Chips "24 h" y "Llegamos en X" solo si hay dato |
| Franja de confianza | `negocio.anioFundacion?`, `acreditaciones`, `garantias`, `valoracion?` | Se recompone con lo que haya; si no hay nada, se oculta |
| Cómo trabajamos | `proceso` | Sin datos, usa los pasos por defecto del tipo (§6), escritos en el template |
| Servicios (tarjetas) | `servicios`: `titulo`, `descripcion`, `imagenes[0]`, `precioDesde?` | Siempre (mínimo 1). Tarjeta sin foto con un diseño propio, no con un hueco gris |
| Tarifas | `tarifas` | Se oculta |
| Trabajos / antes-después | `trabajos` (o `galeria` si no hay trabajos) | Se oculta |
| Reseñas | `resenas`, `valoracion?`, `contacto.fichaGoogle?` | Se oculta. Muestra primero las más recientes; enlace "Ver todas en Google" solo si hay `fichaGoogle` |
| Asistente de WhatsApp | `servicios`, `contacto.whatsapp` | Se oculta si no hay `whatsapp` (§7) |
| Marcas | `marcas` | Se oculta |
| Comunidades (bloque de inicio) | `comunidades` | Se oculta |
| Zonas | `zonas` | Se oculta. Siempre como lista, nunca como enlaces a páginas |
| Preguntas frecuentes | `preguntas` (acordeón) | Se oculta. Las respuestas cerradas siguen en el HTML (se leen sin JavaScript y Google las ve) y el desplegable no anima la altura |
| CTA final | `contacto` | Siempre |
| Contacto | `contacto`: teléfono, WhatsApp, email, dirección, horario | Siempre. La ubicación es texto + enlace "Cómo llegar" (nunca un mapa incrustado) |
| Pie | `negocio.nombre`, rutas, `enlacesLegales`, `redes` | Siempre |

### Contenido de las páginas interiores

| Página | Contenido | Estados vacíos |
|---|---|---|
| `/servicios` | Todas las tarjetas de servicio, más reseñas y CTA | — |
| `/servicios/[slug]` | Título, `contenido`, `imagenes`, `incluye`, `precioDesde?`, trabajos de ese servicio (`trabajos[].servicio`), `preguntas` del servicio, CTA con su `mensajeWhatsapp` | Sin `contenido`, usa `descripcion` y la página lleva `noindex`. Cada bloque vacío se oculta |
| `/trabajos` | Rejilla de trabajos con su contexto (ubicación, superficie, plazo); filtro por servicio opcional. Si no hay trabajos, la `galeria` | — |
| `/trabajos/[slug]` | Fotos (con `antes` si existe), datos de contexto, `contenido`, `testimonio`, enlace al servicio, CTA "quiero algo parecido" | Cada dato que falte se omite sin dejar etiqueta vacía |
| `/empresa` | `historia`, `imagenes`, `equipo`, años desde `anioFundacion`, `acreditaciones`, `garantias`, `marcas` | Con todo vacío queda una página corta con descripción, zonas y CTA |
| `/contacto` | Botones, horario, dirección, zonas, enlace a la ficha de Google | — |
| `/comunidades` | `comunidades.texto`, `puntos`, bloque IEEV si `ieev`, acreditaciones y seguros, trabajos | — |

---

## 6. Reglas por tipo de negocio

El **tipo** no es el nombre de la carpeta: es la guía de diseño que sigue cada nicho. Cada encargo te dirá el nicho y su tipo.

| Tipo | Nichos | El cliente… |
|---|---|---|
| **urgencias** | fontanería, electricidad, desatascos, cerrajería | Decide en minutos, en el móvil, con una avería |
| **proyecto** | reformas, carpintería, pérgolas, pintura, alicatado/pladur, aluminio y ventanas | Compara 2–3 presupuestos en días o semanas; decide por lo que ve |
| **obra-tecnica** | albañilería, pavimentos y hormigón, tejados, humedades y fachadas, movimiento de tierras | No sabe qué necesita (busca por síntoma); a menudo es una comunidad |
| **recurrente** *(aplazado)* | jardinería, piscinas, climatización | Contrata un mantenimiento periódico. Sus reglas se escribirán más adelante |

### urgencias — objetivo: **llamada en menos de 5 minutos**

- **Páginas, por prioridad en el menú:** Inicio › Servicios › Contacto › Trabajos › Empresa (corta, la última o solo en el pie).
- **Inicio, en orden:**
  1. Hero: "{sector} en {ciudad}" + `BotonLlamada` grande con el número visible + `BotonWhatsApp` "Envíanos una foto de la avería" + valoración + chips "24 h" / "Llegamos en X".
  2. Franja de confianza: años, acreditaciones con número, garantías (factura con IVA, presupuesto antes de empezar, seguro).
  3. Cómo trabajamos, 3 pasos (por defecto: Llamas → Vamos → Lo arreglamos).
  4. Servicios (tarjetas → página propia), con "desde" si hay precio.
  5. Tarifas (si hay).
  6. Reseñas (3–6, las más recientes).
  7. Zonas.
  8. Preguntas frecuentes.
  9. CTA final de llamada.
- **CTA:** llamada principal en todas partes; WhatsApp secundario. Barra móvil: **Llamar | WhatsApp**, o la **barra combinada [Menú] [Llamar] [WhatsApp]** (solo en urgencias, por debajo de 1024 px): «Menú» abre la navegación en una hoja inferior y sustituye al menú de la cabecera en móvil. Sin WhatsApp: [Menú] + Llamar a todo el ancho restante.
- **Confianza:** reseñas que hablan de rapidez, acreditaciones con número, fotos reales de furgoneta y técnico.
- **Imágenes:** pocas y reales. Una foto en el hero como máximo, o ninguna (hero tipográfico con el teléfono).
- **No debe llevar:** sliders ni carruseles en el hero, "quiénes somos" largo, fotos de banco con técnicos sonrientes, pop-ups, vídeo, animaciones pesadas (se carga en 4G).

### proyecto — objetivo: **entrar en la lista corta de 2–3 presupuestos**

- **Páginas:** Inicio › Trabajos › Servicios › Empresa (taller, proceso, equipo) › Contacto.
- **Inicio, en orden:**
  1. Hero: la mejor foto real (`imagenesHero`) + titular de resultado ("Reformas de baño en {ciudad} en 10 días") + `BotonWhatsApp` "Pide presupuesto" + valoración.
  2. Trabajos o antes/después **con contexto**: ubicación, superficie, plazo (y precio si existe).
  3. Servicios, con "desde" si hay precio.
  4. Cómo trabajamos (por defecto: visita → presupuesto → contrato con fecha → obra → limpieza → garantía).
  5. Garantías concretas (precio cerrado, plazo por contrato, años de garantía, seguro).
  6. Reseñas + testimonio ligado a un trabajo.
  7. Asistente de WhatsApp (§7).
  8. Zonas, preguntas frecuentes y CTA final.
- **CTA:** WhatsApp principal ("Envíanos fotos y medidas"); llamada secundaria. Barra móvil: **WhatsApp | Llamar**.
- **Confianza:** trabajos con contexto, taller propio, marcas con las que trabaja, garantías concretas.
- **Imágenes:** protagonistas. Pares antes/después, galería por trabajo, mosaico o carrusel en el hero permitidos.
- **No debe llevar:** galerías sin contexto (100 fotos sin lugar ni datos), renders 3D presentados como trabajos, "presupuesto gratis" como único argumento, textos de "calidad y profesionalidad".

### obra-tecnica — objetivo: **visita técnica** y, en comunidades, **presupuesto para la junta**

- **Páginas:** Inicio › Servicios (redactados como problemas) › Trabajos (casos con proceso) › Comunidades › Empresa (solvencia) › Contacto.
- **Inicio, en orden:**
  1. Hero: síntoma + solución ("Goteras y humedades en {ciudad} · Diagnóstico y reparación") + `BotonLlamada` "Pide visita técnica" + `BotonWhatsApp` "Envía fotos del problema".
  2. Problemas que resolvemos (son los `servicios`, con títulos de síntoma).
  3. Casos con fotos de proceso (andamio, antes/después).
  4. Bloque comunidades (si hay): presupuesto para junta, seguro con importe y "¿Tu edificio tiene más de 50 años?" si `ieev`.
  5. Acreditaciones, seguros y garantías.
  6. Reseñas, zonas, preguntas frecuentes y CTA final.
- **CTA:** llamada principal; WhatsApp secundario con fotos. Barra móvil: **Llamar | WhatsApp**.
- **Confianza:** solvencia técnica, REA, seguro con importe, maquinaria propia, obras parecidas.
- **No debe llevar:** ayudas o subvenciones con fechas (caducan), lenguaje técnico sin traducir a síntomas.

### Comunes a todos los tipos

- **Textos cortos y llanos:** unas 500 palabras en el inicio, frases de nivel escolar básico.
- **Reseñas en la mitad superior del inicio** (o al menos la valoración en el hero).
- **El CTA principal se ve sin hacer scroll** a 375×667.

### Qué debe variar entre los 5 templates de una tanda

Cada template debe diferir de los otros cuatro de su tanda en **al menos 4** de estos ejes: composición del hero (número de fotos o ninguna), orden de las secciones del inicio (dentro de lo que permite el tipo), sección "estrella", forma de trabajos/galería, estilo de navegación, estilo de los botones por sección, tipografía y densidad. **No vale cambiar solo el color.**

**Los 5 templates de una tanda tienen que parecer de estudios distintos**, no variaciones de uno solo: distinta estructura, distinto diseño, distintas formas y distintas fuentes. Para conseguirlo, antes de escribir los encargos de un nicho se rellena una **matriz de variedad**. Cada eje tiene varias opciones, a cada template le toca una combinación **al azar** y **ninguna opción se repite entre los 5 de la tanda** (salvo densidad, que tiene menos opciones). Una segunda tanda del mismo nicho (carpintería metálica 4–6) tampoco puede parecerse a la primera: no repite la combinación de hero, tipografía y paleta de ningún template anterior del nicho:

| Eje | Opciones (ejemplos) |
|---|---|
| Objetivo del negocio | urgencia (llamada inmediata) · confianza (obras grandes, reseñas y trabajos) · contenido/SEO (texto por servicio, guías, preguntas) · exposición/tienda |
| Hero | foto a sangre · partido foto/texto · tipográfico sin foto · collage o carrusel (no en urgencias) · asistente como protagonista · índice por síntomas · antes/después · vídeo con póster (solo proyecto) |
| Tipografía | sans geométrica · sans humanista · serif editorial · display condensada · mono técnica (máximo 2 familias por template) |
| Formas | rectas y duras · redondeadas · orgánicas/blob · diagonales y cortes · líneas de plano y cotas |
| Paleta | clara · oscura · color pleno de fondo · neutra con acento fuerte · terrosa cálida · duotono/monocromo |
| Densidad | aireada · compacta tipo catálogo · editorial con mucho texto |
| Navegación | barra clásica · menú a pantalla completa · barra combinada en el pie del móvil · índice lateral en escritorio · cápsula flotante · doble barra (franja de acreditaciones + menú) · cabecera transparente que se vuelve sólida al bajar |
| Sección estrella | trabajos/antes-después · tarifas · proceso · reseñas · catálogo · asistente |

El encargo de cada template dice qué combinación le ha tocado. Claude Design la respeta y, en su entrega, dice en qué ejes difiere de los otros cuatro. Además, cada encargo trae una **dinámica visual** (la idea que hace memorable al template) sacada del catálogo de abajo.

### Catálogo de dinámicas visuales

Cada encargo combina una o dos. Todas funcionan **sin JavaScript** (se ven estáticas) y respetan §8.

| Dinámica | Qué es | Tipo | Ojo con |
|---|---|---|---|
| Foto documental a sangre | Foto real a pantalla completa (el profesional, su furgoneta, la obra) con velo degradado bajo el titular | urgencias, proyecto | Sin foto real del dueño no funciona; **nunca una persona de IA como el dueño** |
| Vídeo corto en bucle con póster | 6–10 s sin sonido (manos, perfil, lijado), `videoHero` | solo proyecto | Póster precargado; > 5 s exige botón de pausa; «reducir movimiento» = solo póster |
| Tipografía editorial gigante | Titular de 64–120 px (escritorio) con una palabra en cursiva o en primario | proyecto, obra técnica; urgencias si el teléfono sigue a la vista | `text-wrap: balance`; tamaño fluido con `clamp(rem + vw)` |
| Bento de confianza | 5–7 tarjetas desiguales: valoración, años, llegada, acreditación con número, zonas, foto | urgencias | Cada tarjeta existe solo con datos; la rejilla se recompone (`:has()`) |
| Tarjetas de precio cerrado | Precio en grande, «Precio cerrado», qué incluye | urgencias | Solo con `tarifas`/`precioDesde`; sin datos, la sección no existe |
| Antes/después con deslizador | Pieza `AntesDespues` sobre `trabajos[].antes` | proyecto | Sin `antes`, foto sola; el `alt` describe las dos |
| Relato con scroll (CSS) | Proceso o trabajo en 4–6 pasos *sticky*; la foto se revela con `animation-timeline: view()` | proyecto, obra técnica | Nunca secuestrar el scroll; en navegador viejo, estático |
| Transición miniatura → ficha | La foto de la tarjeta «vuela» al hero de `/trabajos/[slug]` (`<ViewTransition>` de React) | proyecto | **Mejora opcional pendiente de una prueba técnica:** el diseño no puede depender de ella |
| Portfolio protagonista | La home es una rejilla de trabajos con nombre, municipio y año; filtro `?servicio=` sin JS | proyecto | Con fotos de relleno queda pobre: diseña bien la tarjeta sin foto real |
| Cifras de credibilidad | 3–4 números grandes salidos de los datos («Desde 1998», «4,9 de 212 reseñas», «Llegamos en 40 min») | todos | La cifra final está en el HTML; nunca cifras inventadas |
| Asistente con aspecto de configurador | El asistente de WhatsApp con tarjetas, progreso y resumen del mensaje | proyecto (obligatorio un asistente), opcional en urgencias | Componente cliente pequeño; recibe los datos como props |
| Oscuro de lujo | Casi negro + un acento metálico, mucho aire, fotos de poco color | todos | Contraste del texto secundario ≥ 4,5:1 |
| Textura de oficio | Retícula de plano en SVG en línea, cotas, sellos, etiquetas mono («Ref. 014 · Paterna · 2025 · 32 m²») | obra técnica, metálica, carpintería | SVG pequeño en línea, nunca PNG de textura |
| Índice por síntomas | La entrada principal son problemas («Salta el diferencial») que enlazan a cada servicio con su llamada | urgencias | Los títulos salen de `servicios`; nada escrito a mano |
| Diagrama del oficio | Un esquema SVG propio del oficio (un cuadro eléctrico, una red de tuberías, una sección de ventana) donde cada pieza es un servicio enlazado | urgencias, proyecto | SVG en línea accesible (cada pieza es un enlace con texto); en móvil se convierte en lista |

---

## 7. Botones de llamada y WhatsApp

- **Todo botón de llamada** es el componente `BotonLlamada` del paquete core. Props: `telefono`, `className?`, `children?`.
- **Todo botón de WhatsApp** es `BotonWhatsApp` de core. Props: `numero`, `mensaje?`, `className?`, `children?`. Solo aparece si existe `contacto.whatsapp`.
- Core pone el comportamiento (enlace, accesibilidad); **tú pones el aspecto con `className`**, y puede ser **distinto en cada sección** (grande y relleno en el hero, compacto en la cabecera, a todo el ancho en la barra móvil, con contorno en una tarjeta…). Diseña esos estilos como variantes con nombre.
- **Mensaje precargado según la página:**

  | Dónde | Mensaje |
  |---|---|
  | Inicio, cabecera, barra móvil, contacto | `contacto.mensajeWhatsapp` o uno genérico del template ("Hola, os escribo desde vuestra web…") |
  | `/servicios/[slug]` | `servicios[].mensajeWhatsapp` o "Hola, quiero información sobre {servicio}" |
  | `/trabajos/[slug]` | "Hola, he visto el trabajo «{titulo}» y quiero algo parecido" |
  | `/comunidades` | "Hola, escribo por una comunidad de vecinos…" |

### Asistente de WhatsApp

Sustituye al formulario o a la calculadora de presupuesto. Son 2–3 preguntas con botones (por ejemplo: qué trabajo ← `servicios`, tamaño aproximado, para cuándo) que **solo componen el texto** del mensaje y terminan en un `BotonWhatsApp` con ese mensaje. No guarda ni envía nada; no pide nombre, email ni teléfono. Es un componente cliente del template. Obligatorio en proyecto; opcional en los demás tipos.

---

## 8. Reglas fijas

1. **Botones:** los de §7. El de llamada aparece como mínimo en la cabecera, el hero, la barra móvil y contacto.
2. **Barra móvil fija** en todas las páginas: dos botones en el orden de su tipo o, solo en urgencias, la barra combinada de tres (§6). No debe tapar contenido: deja espacio al final de la página.
3. **Tokens con nombre fijo.** En `@theme` defines **valores** para este vocabulario común, siempre con estos nombres: `--color-fondo`, `--color-superficie`, `--color-alterna`, `--color-texto`, `--color-texto-suave`, `--color-borde`, `--color-primario`, `--color-sobre-primario`, `--color-acento`, `--color-foco`, `--font-titulo`, `--font-texto`, `--radius-boton`, `--radius-tarjeta`, `--radius-foto`, `--text-display`. Las piezas base solo usan estos. Puedes **añadir** tokens propios para tu firma visual (`--color-cota`, `--color-mancha`…), nunca renombrar los comunes. `--color-primario` es el acento principal y **el cliente puede sustituirlo por su color de marca**: el diseño no puede depender de un tono concreto. Deriva hover, tintes y bordes del primario con `oklch(from var(--color-primario) …)` (con `color-mix()` de respaldo) y pon el texto sobre primario siempre con `--color-sobre-primario`.
4. **Tipografías:** siempre con `next/font` (autoalojadas). Máximo dos familias.
5. **Nada de terceros:** ni iframes (Google Maps, YouTube), ni scripts externos, ni fuentes de servidores de Google, ni píxeles ni analítica de terceros. La única analítica la pone core (Vercel Web Analytics, sin cookies, cuando la web la activa): no diseñes nada para ella, ni banner ni aviso. La política de cookies declara que no hay cookies de terceros. Ubicación = dirección en texto + **enlace** "Cómo llegar"; vídeo = miniatura con enlace.
6. **Imágenes:** con `next/image` (formatos AVIF y WebP), y el `alt` sale de los datos. La foto principal de la primera pantalla lleva `preload` (no `priority`, obsoleto) y `sizes` real; ninguna otra imagen se precarga. Las de ejemplo son **neutras** (sin logos ni caras reconocibles) y están en `public/ejemplo/`. Aguantan fotos reales hechas con el móvil del cliente: proporciones fijas con recorte (`object-cover`) y nunca texto sobre una foto sin una capa oscura debajo.
7. **Accesibilidad:** contraste WCAG AA, un solo `h1` por página, jerarquía de títulos sin saltos, foco visible, zonas táctiles de al menos 44 px, navegación móvil usable con teclado y lector de pantalla.
8. **Legal:** el pie enlaza a `/aviso-legal`, `/privacidad` y `/cookies` (lista `enlacesLegales` de core). Esas páginas usan el layout del template.
9. **Ligera y con animaciones baratas:** nada que retrase la primera carga. Pensada para 4G. Las animaciones siguen las reglas de «Animación» (abajo).
10. **SEO local:** un servicio = una página; las zonas, solo como lista. Nada de páginas por municipio.
11. **Móvil primero.** La mayoría de las visitas llegan desde el móvil. Se diseña y se pule **primero a 375 px**, incluidas las animaciones, y después se adapta a tablet y escritorio con la misma estructura, sin rehacerla. La entrega muestra el móvil primero, y el móvil es lo que se revisa con más detalle.
12. **Vídeo:** solo en tipo proyecto y solo vía `videoHero` o como sección con póster. `muted`, `playsinline`, `loop`, sin sonido, H.264 MP4 de 1–3 MB (720p) + AV1 opcional, alojado en la propia web. Nunca YouTube, Vimeo ni reproductores de terceros. Con «reducir movimiento», solo el póster. Si dura más de 5 s, botón de pausa visible.
13. **Fotografía con dirección de arte:** cada template tiene su **ficha de estilo fotográfico** (§9) y todas sus fotos de ejemplo la siguen. Dos templates no comparten estilo. Fotos creíbles de oficio: materiales españoles con nombre (terrazo, persiana de lamas, azulejo hidráulico), imperfección real (cinta de carrocero, virutas, polvo de obra), como mucho manos o antebrazos; nada de técnicos sonrientes de banco de imágenes.
14. **Legal de imágenes:** las fotos de IA llevan `origen: "ia"` y su etiqueta; **nunca** una persona de IA presentada como el dueño o el equipo, y nunca IA en `/trabajos` de un cliente real (en la demo, sí, etiquetada). Prohibidas las capturas de Street View. De la ficha de Google solo valen las fotos «Del propietario».
15. **Presupuesto de rendimiento** (se comprueba antes de aceptar el template): JS ≤ 200 KB comprimido por página; foto LCP ≤ 120 KB; LCP ≤ 2,5 s en móvil; accesibilidad 100 en Lighthouse; nada animado entre el `h1` y el `BotonLlamada` del hero; la web se ve completa solo con los datos del scraper (§4, «Datos mínimos»).
16. **Interacción nativa primero:** menú con la API `popover`, preguntas con `<details name>`, filtros con enlaces `?servicio=`. Un componente cliente solo cuando no hay alternativa (el asistente, el deslizador), y recibe los datos como props: nunca importa `site.config` en el navegador.
17. **Tipografía:** tamaños fluidos con `clamp()` en `rem + vw` (nunca solo `vw`, por el zoom), `text-wrap: balance` en títulos y `pretty` en párrafos, fuentes variables sin lista de pesos.

### Animación (todos los templates)

Todo template lleva **animaciones básicas que llamen la atención**, pensadas para el móvil y **sin empeorar el rendimiento**:

- **Solo CSS** (`@keyframes`, `transition`, `@starting-style` y `animation-timeline: view()` dentro de `@supports`). Las apariciones al hacer scroll usan la pieza `aparecer.css` del registro; **sin `IntersectionObserver`** ni JavaScript para animar. El estado por defecto es el visible: si el navegador no entiende la animación, simplemente no anima. **Ninguna librería de animación** (Motion, GSAP, AOS, Lenis…).
- **Solo se animan `transform` y `opacity`**. Nunca `width`, `height`, `top`, `margin` ni sombras grandes, porque obligan a recalcular la página.
- **Lo primero que se ve no se anima:** el `h1`, la foto del hero y el botón de llamada del hero están visibles desde el primer pintado. Si se anima el elemento más grande de la primera pantalla (LCP), la web «tarda» más para Google.
- **`prefers-reduced-motion: reduce`:** sin desplazamientos ni bucles; el contenido aparece directamente.
- **Sin JavaScript** el contenido se ve entero: nada empieza oculto si depende de un script para aparecer (tampoco las respuestas de las preguntas frecuentes).
- **Tipos recomendados:** aparecer al hacer scroll (fundido + desplazamiento corto, 200–400 ms, escalonado en listas), respuesta al tocar o pasar por encima en botones y tarjetas, subrayados o cotas que se dibujan, contadores en cifras clave y la barra móvil que entra al cargar.
- **Prohibido:** parallax pesado, vídeo de fondo sin póster o en urgencias, carruseles automáticos que se mueven solos, animaciones en bucle que distraigan del botón de llamada, y cualquier cosa que mueva el contenido mientras se lee.
- En la entrega, describe cada animación: qué elemento, qué propiedad, cuánto dura y qué pasa con «reducir movimiento».

---

## 9. Qué entregar

1. **Inicio, una página de servicio, `/trabajos`, un trabajo, `/empresa` y `/contacto`** a **375 px** y a **1280 px**, con los datos de ejemplo completos del encargo. Más una página legal para ver cómo la envuelve tu layout y la **página 404**.
2. **El inicio con datos mínimos** (solo el núcleo de §4: sin trabajos, sin fotos, sin acreditaciones, sin precios), para comprobar que los estados vacíos funcionan.
3. **El inicio con otro primario** (por ejemplo, `#1e40af`), para comprobar que el diseño aguanta el cambio de color.
4. Los **tokens**: colores en hex, tipografías, radios y sombras.
5. Las **variantes de botón** por sección (§7) con su nombre.
6. Por cada sección y página: el **nombre del componente**, los **campos** que usa y cómo se comporta cuando falta algo (servicio sin foto, reseña muy larga, sin WhatsApp, sin trabajos).
7. Los **datos de ejemplo** del nicho en formato `site.config.ts`, ficticios y realistas de la ciudad que diga el encargo (Valencia, Barcelona, Sevilla o Madrid), y que cumplan los formatos de §4. Si llevan precios, cada uno con el comentario `// PRECIO FICTICIO: borrar en la web del cliente`. Dirección, email, web, ficha de Google y números de registro tienen que **verse ficticios**: «Calle Ejemplo, NN», dominios `.example`, `cid=000…`, «(ficticio)». Nunca la dirección, la web o el nombre de una empresa real.
8. La lista de **componentes shadcn** usados y de **piezas base** del registro que usas tal cual, reestilas o sustituyes (y por qué).
9. Un **nombre y una frase** que definan el concepto, y en qué ejes (§6) difiere de los otros templates de su nicho.
10. La **ficha de estilo fotográfico**: luz, objetivo y encuadre, color o tratamiento, materia, presencia humana y tratamiento en la web; la foto ancla (la del hero) y una lista de prohibiciones propia. Más los **prompts de cada foto de ejemplo** (y del vídeo si lo hay) para generarlas con IA siguiendo esa ficha, con su nombre de archivo en `public/ejemplo/`, su `alt` y `origen: "ia"`.
11. La comprobación del **presupuesto de rendimiento** (§8, regla 15) tal como lo estimas, y la descripción de cada animación.
