# Brief para Claude Design: templates de Andrei Leads

> Este documento es la base de todos tus encargos. Léelo entero antes de diseñar. Cada encargo concreto (un nicho y un número de template) llega aparte y se apoya en este brief. Si algo de tu diseño contradice una regla, la regla gana. Si crees que una regla impide un buen diseño, dilo explícitamente en lugar de saltártela.

---

## 1. Qué vas a diseñar

Un **template**: el diseño reutilizable de una **web completa de varias páginas** para un nicho de pymes locales (fontanería, reformas, tejados…). No es la web de un cliente concreto. Se rellenará con los datos de cualquier negocio del nicho.

**Para qué se usa:** como demostración. Se le enseña al dueño de un negocio sin web cómo quedaría la suya, con sus datos reales. Tiene que reconocerse en ella en cinco segundos.

**Objetivo:** que el visitante **llame o escriba por WhatsApp**. Cuál de los dos manda depende del tipo de negocio (§6).

**Quién la visita:** particulares, comunidades de vecinos y administradores de fincas de la provincia de Valencia. Buscan en el **móvil**, casi siempre desde Google.

**Quién la compra:** el dueño del negocio. Es de oficio, no de tecnología. Valora que se vea profesional, cercana y clara, no "de agencia".

**Cada nicho tendrá 3 templates** distintos, con datos y fotos de ejemplo de su sector. El tipo de negocio del nicho (§6) marca las reglas de conversión; tu diseño marca la identidad.

---

## 2. Restricciones técnicas

- **Stack:** Next.js (App Router) con TypeScript, Tailwind CSS v4 y componentes **shadcn/ui** copiados dentro del template.
- **Multipágina** (§3). Cabecera, pie y barra móvil están en `app/layout.tsx` y aparecen en **todas** las páginas, legales incluidas.
- **Móvil primero:** diseña a 375 px de ancho (375×667 como pantalla de referencia) y después adapta a escritorio a 1280 px.
- **Español de España** en todos los textos.
- **Ningún dato del negocio escrito a mano.** Nombres, teléfonos, servicios, fotos, precios y textos salen del contrato de datos (§4). Los textos genéricos de la interfaz sí pueden ser fijos ("Nuestros servicios", "Llamar ahora", los pasos por defecto de "Cómo trabajamos").
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
| `/comunidades` | Para comunidades de vecinos | Solo si existe el bloque `comunidades` (tipo obra técnica) |
| `/aviso-legal`, `/privacidad`, `/cookies` | Legales | Siempre. **El texto lo pone core**; tú solo decides cómo se ven dentro de tu layout (cabecera, pie, ancho, tipografía) |

La **etiqueta** del menú la decides tú ("Trabajos", "Proyectos", "Obras"), pero la ruta no cambia. No hay páginas por municipio: las zonas son solo una lista.

### Carpetas

```
templates/<nicho>/<nicho>-<n>/          p. ej. templates/fontaneria/fontaneria-1/
├─ app/
│  ├─ layout.tsx          # tipografías (next/font), color primario, Cabecera, Pie y BarraMovil
│  ├─ page.tsx            # inicio: compone las secciones en el orden del tipo (§6)
│  ├─ globals.css         # Tailwind + estilos de core + @theme con TUS tokens
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
│  ├─ ui/                 # componentes shadcn que uses
│  └─ secciones/          # un componente por sección: Hero.tsx, Servicios.tsx, BarraMovil.tsx…
├─ lib/                   # utilidades de formato (teléfono visible, estrellas…)
├─ public/
│  └─ ejemplo/            # imágenes de ejemplo neutras del nicho
└─ site.config.ts         # datos de ejemplo del nicho (§4)
```

Cada sección es un componente que recibe **solo su parte** de los datos. Por ejemplo, `Servicios` recibe `servicios` y no el objeto completo. Una misma sección puede aparecer en varias páginas (por ejemplo, Reseñas en inicio y en un servicio).

---

## 4. Contrato de datos (`site.config`, core 0.3.0)

`?` = opcional. "Lista" = puede llegar vacía salvo que se diga otra cosa. **Imagen** = `{ src, alt }`, siempre con `alt`. **Párrafos** = lista de textos, uno por párrafo.

| Bloque | Campos |
|---|---|
| `negocio` | `nombre`, `nombreLegal`, `nif`, `sector`, `descripcionCorta` (≤ 160), `logo?` (imagen), `anioFundacion?`, `registroMercantil?`, `tipoSchema` (tipo para Google; tiene valor por defecto) |
| `contacto` | `telefono`, `whatsapp?`, `email`, `direccion` {`calle`, `cp`, `ciudad`, `provincia`}, `horario` (franjas `{dias, abre, cierra}`; el template lo pinta con `formatearHorario`, que da filas `{dias, horas}`: «Lunes a viernes» · «8:00–19:00»), `coordenadas?`, `mensajeWhatsapp?` (mensaje por defecto), `urgencias24h` (sí/no), `tiempoLlegada?` ("45 min"), `fichaGoogle?` (enlace a la ficha de Google) |
| `zonas` | lista de municipios |
| `servicios` | lista, **mínimo 1**, de {`titulo`, `descripcion` (corta), `slug?` (si falta, se genera del título), `contenido` (párrafos), `incluye` (lista), `imagenes` (lista de imagen), `preguntas` (lista), `mensajeWhatsapp?`, `precioDesde?` ("desde 60 €")} |
| `trabajos` | lista de {`titulo`, `slug?` (si falta, se genera del título), `descripcion` (≤ 300), `ubicacion?`, `anio?`, `servicio?` (slug de un servicio), `superficie?` ("5 m²"), `duracion?` ("10 días"), `precio?` (rango aproximado), `contenido` (párrafos), `imagenes` (**mínimo 1**; la primera es el "después"), `antes?` (imagen), `testimonio?` {`autor`, `texto`}} |
| `valoracion` | `{ media, total }` de Google, opcional ("4,8 · 127 reseñas") |
| `resenas` | lista de {`autor`, `texto`, `puntuacion` 1–5, `fecha?` ("2026-09"), `fuente?` (google, web, otra)} |
| `proceso` | lista (máx. 6) de {`titulo`, `texto`} |
| `acreditaciones` | lista de {`nombre`, `numero?`} ("Empresa instaladora RII", "n.º 46/12345") |
| `garantias` | lista (máx. 6) de textos cortos ("Presupuesto cerrado antes de empezar") |
| `marcas` | lista de nombres ("Cortizo", "Daikin") |
| `tarifas` | opcional: {`items` [{`concepto`, `precio`}] (mínimo 1), `nota?`} |
| `empresa` | {`historia` (párrafos), `imagenes` (lista), `equipo` [{`nombre`, `cargo?`, `foto?`}]} |
| `comunidades` | opcional: {`texto` (párrafos), `puntos` (lista), `ieev` (sí/no)} |
| `imagenesHero` | lista de imagen (fotos reales para el hero) |
| `galeria` | lista de imagen con `titulo?` |
| `preguntas` | lista de {`pregunta`, `respuesta`} |
| `marca` | `colorPrimario?`: color de marca del cliente (§8, regla 3) |
| `seo` | `titulo` (≤ 60), `descripcion` (≤ 160), `url` |
| `redes` | `instagram?`, `facebook?` |

**Datos mínimos reales.** La demo se hace con lo que da Google Maps: nombre, sector, contacto, horario, zonas, reseñas, valoración y alguna red. Todo lo demás puede faltar. **El diseño tiene que verse completo solo con el núcleo** (`negocio`, `contacto`, `zonas`, `servicios` con título y descripción, `resenas`, `valoracion`, `seo`).

**Variabilidad real:** de 1 a 10 servicios; servicios con 0 o varias fotos; reseñas de una línea o de un párrafo; nombres cortos ("Verde") y largos ("Reformas y Construcciones Hermanos García"); 0 o 20 trabajos.

**Precios:** son opcionales y solo aparecen si el cliente los ha validado. Nunca rellenes precios inventados en un diseño que vaya a enseñarse como "su" web; en los datos de ejemplo, márcalos como ficticios.

---

## 5. Catálogo de secciones

Tú eliges cuáles usar en cada página, respetando el orden del tipo (§6). **Si una sección opcional no tiene datos, desaparece sin dejar hueco** (ni título suelto ni espacio vacío).

| Sección | Campos que usa | Sin datos |
|---|---|---|
| Cabecera | `negocio.nombre`, `negocio.logo?`, `contacto.telefono`, rutas | Siempre. Con el **botón de llamada visible siempre**, también en móvil. Sin `/trabajos` si no hay trabajos ni galería; sin `/comunidades` si no hay `comunidades` |
| Barra móvil | `contacto.telefono`, `contacto.whatsapp?` | Siempre en móvil, fija abajo, en todas las páginas. Sin WhatsApp, solo "Llamar" a todo el ancho |
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
| Preguntas frecuentes | `preguntas` (acordeón) | Se oculta |
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
- **CTA:** llamada principal en todas partes; WhatsApp secundario. Barra móvil: **Llamar | WhatsApp**.
- **Confianza:** reseñas que hablan de rapidez, acreditaciones con número, fotos reales de furgoneta y técnico.
- **Imágenes:** pocas y reales. Una foto en el hero como máximo, o ninguna (hero tipográfico con el teléfono).
- **No debe llevar:** sliders ni carruseles en el hero, "quiénes somos" largo, fotos de banco con técnicos sonrientes, pop-ups, vídeo, animaciones pesadas (se carga en 4G).

### proyecto — objetivo: **entrar en la lista corta de 2–3 presupuestos**

- **Páginas:** Inicio › Trabajos › Servicios › Empresa (taller, proceso, equipo) › Contacto.
- **Inicio, en orden:**
  1. Hero: la mejor foto real (`imagenesHero`) + titular de resultado ("Reformas de baño en Valencia en 10 días") + `BotonWhatsApp` "Pide presupuesto" + valoración.
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
  1. Hero: síntoma + solución ("Goteras y humedades en Valencia · Diagnóstico y reparación") + `BotonLlamada` "Pide visita técnica" + `BotonWhatsApp` "Envía fotos del problema".
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

### Qué debe variar entre los 3 templates de un nicho

Cada template debe diferir de los otros dos en **al menos 4** de estos ejes: composición del hero (número de fotos o ninguna), orden de las secciones del inicio (dentro de lo que permite el tipo), sección "estrella", forma de trabajos/galería, estilo de navegación, estilo de los botones por sección, tipografía y densidad. **No vale cambiar solo el color.**

Variantes de referencia por tipo (el encargo te dirá cuál toca):

| Tipo | Template 1 | Template 2 | Template 3 |
|---|---|---|---|
| urgencias | **Llamada pura:** hero tipográfico sin foto, teléfono gigante, inicio corto | **Transparente:** tarifas y garantías justo tras el hero; una foto real del técnico | **Habilitado:** acreditaciones al frente y un servicio destacado con "qué incluye" (p. ej. boletín eléctrico) |
| proyecto | **Portfolio primero:** antes/después en el hero; trabajos como sección estrella | **Asistente:** el asistente de WhatsApp como pieza central del inicio | **Taller/artesano:** historia del taller y del proceso; galería por servicio |
| obra-tecnica | **Diagnóstico:** problema → síntoma → solución | **Comunidades:** IEEV, presupuesto para junta, referencias de edificios | **Industrial:** maquinaria, m² ejecutados, clientes empresa |

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
2. **Barra móvil fija** con dos botones en todas las páginas. No debe tapar contenido: deja espacio al final de la página.
3. **Color:** define tus propios tokens en `@theme` (colores, radios, sombras). `--color-primario` es el acento principal **y el cliente puede sustituirlo por su color de marca**. Úsalo donde funcione con cualquier color medio u oscuro con texto blanco encima. El diseño no puede depender de un tono concreto de primario.
4. **Tipografías:** siempre con `next/font` (autoalojadas). Máximo dos familias.
5. **Nada de terceros:** ni iframes (Google Maps, YouTube), ni scripts externos, ni fuentes de servidores de Google, ni píxeles ni analítica. La política de cookies declara que no hay cookies de terceros. Ubicación = dirección en texto + **enlace** "Cómo llegar"; vídeo = miniatura con enlace.
6. **Imágenes:** con `next/image`, y el `alt` sale de los datos. Las de ejemplo son **neutras** (sin logos ni caras reconocibles) y están en `public/ejemplo/`. Aguantan fotos reales hechas con el móvil del cliente: proporciones fijas con recorte (`object-cover`) y nunca texto sobre una foto sin una capa oscura debajo.
7. **Accesibilidad:** contraste WCAG AA, un solo `h1` por página, jerarquía de títulos sin saltos, foco visible, zonas táctiles de al menos 44 px, navegación móvil usable con teclado y lector de pantalla.
8. **Legal:** el pie enlaza a `/aviso-legal`, `/privacidad` y `/cookies` (lista `enlacesLegales` de core). Esas páginas usan el layout del template.
9. **Ligera:** sin animaciones pesadas ni nada que retrase la primera carga. Pensada para 4G.
10. **SEO local:** un servicio = una página; las zonas, solo como lista. Nada de páginas por municipio.

---

## 9. Qué entregar

1. **Inicio, una página de servicio, `/trabajos`, un trabajo, `/empresa` y `/contacto`** a **375 px** y a **1280 px**, con los datos de ejemplo completos del encargo. Más una página legal para ver cómo la envuelve tu layout.
2. **El inicio con datos mínimos** (solo el núcleo de §4: sin trabajos, sin fotos, sin acreditaciones, sin precios), para comprobar que los estados vacíos funcionan.
3. **El inicio con otro primario** (por ejemplo, `#1e40af`), para comprobar que el diseño aguanta el cambio de color.
4. Los **tokens**: colores en hex, tipografías, radios y sombras.
5. Las **variantes de botón** por sección (§7) con su nombre.
6. Por cada sección y página: el **nombre del componente**, los **campos** que usa y cómo se comporta cuando falta algo (servicio sin foto, reseña muy larga, sin WhatsApp, sin trabajos).
7. Los **datos de ejemplo** del nicho en formato `site.config.ts`, ficticios y realistas de la provincia de Valencia. Si llevan precios, cada uno con el comentario `// PRECIO FICTICIO: borrar en la web del cliente`.
8. La lista de **componentes shadcn** usados.
9. Un **nombre y una frase** que definan el concepto, y en qué ejes (§6) difiere de los otros templates de su nicho.
