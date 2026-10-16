# kit — fábrica de webs de Andrei Leads

> Agente: lee este archivo entero antes de hacer nada. Contiene el contexto, las decisiones ya tomadas (no las reabras sin que Ysst lo pida), las trampas ya encontradas y las reglas para trabajar con Ysst. Los procesos concretos están en `docs/`.

---

## 1. Qué es esto

`kit` es el monorepo con el que Andrei Leads (agencia de Ysst, autónomo en Valencia) crea webs para pymes locales: jardineros, electricistas, pérgolas, reformas… **Objetivo: la web de un cliente potencial en menos de una tarde.**

Tres piezas:

| Pieza | Dónde | Qué es | Por cliente |
|---|---|---|---|
| **core** | `packages/core` → `@andrei-leads/core` | Esqueleto común: contrato de datos, componentes base, estilos de core | **Se importa** (paquete versionado) |
| **templates** | `templates/<nicho>-<n>` | Un diseño por carpeta; cada uno es una app Next.js que consume core | **Se copia** |
| **webs de clientes** | Repos propios, `web-<cliente>`, fuera de `kit` | Copia de un template + core instalado desde GitHub Packages | Es del cliente |

**Principio rector:** lo que cambias por cliente se copia; lo que nunca cambias por cliente se importa.

---

## 2. Cómo trabajar con Ysst (obligatorio)

- **Idioma:** español. Respuestas cortas, tácticas y concretas, sin relleno.
- **Explica antes de implementar:** para cada cosa nueva, di qué es, para qué sirve y cómo funciona; después, los pasos.
- **No decidas arquitectura ni diseño por tu cuenta.** Propón (con una recomendación clara y su porqué) y **espera confirmación explícita**. Ysst prefiere una opción recomendada antes que un menú.
- **Guía paso a paso:** un paso, pide la salida del comando, verifica y pasa al siguiente. No encadenes diez pasos de golpe.
- **Método de aprendizaje:** "a mano una vez, automatiza la segunda". No automatices un proceso que Ysst no haya hecho antes a mano.
- **Sé explícito:** indica siempre desde qué carpeta se ejecuta cada comando y distingue entre "comando de terminal" y "contenido de un archivo". (Ya pasó: pegó una línea JSON en la terminal.)
- **Si te equivocas, dilo y corrígelo.** Comprueba las rutas reales antes de darlas (el template no tiene `src/`; ver §7).
- **No ejecutes comandos que contacten con GitHub (`git fetch`/`pull`/`push`, `gh`) sin avisar antes a Ysst.**
- **Secretos:** nunca escribas tokens en archivos del repo ni en comandos que queden en el historial (`echo TOKEN`). Usa `nano`.
- **Validación en Python:** si se añade un script en Python que valide datos (por ejemplo, el generador de `site.config` desde Postgres), recuerda a Ysst usar **Marshmallow**.
- Cuando expliques un concepto, añade una versión simple ("para un niño de 12 años").

---

## 3. Entorno

- **SO:** Kubuntu. **Editor:** VS Code con la extensión *Tailwind CSS IntelliSense*. `.vscode/settings.json` asocia `*.css` a `tailwindcss` (sin eso, VS Code marca `@source` y `@theme` como "Unknown at rule"; es solo un aviso del editor).
- **Ruta del repo:** `/media/ysst/aca7d5ae-9e94-46b2-b2a7-2ecf69a2bf93/docker_data/mis_datos/kit` (disco montado). El store de pnpm está en `/home`, que es otro sistema de archivos, así que pnpm **copia** en vez de enlazar con hardlinks. Si aparece un aviso de pnpm sobre esto, es normal.
- **Node:** ≥ 20 en local; la CI usa Node 22.
- **pnpm:** 9.15.9, fijado en el `package.json` raíz (`"packageManager": "pnpm@9.15.9"`).
- **GitHub:**
  - Organización `Andrei-Leads` (nombre visible "Andrei Leads"), plan Free, creada como "My personal account" porque un autónomo es persona física (no hay entidad jurídica distinta). Si algún día hay una SL, se puede pasar a términos corporativos (cambio en un solo sentido).
  - Repo **privado** `https://github.com/Andrei-Leads/kit`, rama `main`.
- **Scope npm:** `@andrei-leads` (siempre en **minúsculas**: npm y GitHub Packages rechazan mayúsculas, aunque el identificador de la org sea `Andrei-Leads`).

---

## 4. Mapa del repo

```
kit/
├─ AGENTS.md                 # este archivo
├─ CLAUDE.md                 # importa AGENTS.md para Claude Code
├─ package.json              # raíz: private, packageManager, devDeps (@changesets/cli)
├─ pnpm-workspace.yaml       # define el monorepo: packages/*, templates/*, templates/*/*, apps/*
├─ pnpm-lock.yaml            # versiones exactas; se commitea siempre
├─ .npmrc                    # DIRECCIÓN del registro para @andrei-leads (sin token)
├─ .gitignore                # node_modules, .next, .turbo
├─ .vscode/settings.json     # *.css → tailwindcss
├─ .changeset/               # config.json + notas de cambios pendientes
├─ .github/workflows/release.yml   # Action de versionado y publicación
├─ docs/                     # procesos paso a paso (ver §9)
├─ packages/
│  └─ core/                  # @andrei-leads/core
│     ├─ package.json
│     ├─ styles.css          # @source "./src"; + --color-primario por defecto
│     ├─ CHANGELOG.md        # lo genera Changesets
│     └─ src/
│        ├─ index.ts         # API pública (todo lo exportado sale de aquí)
│        ├─ site-config.ts   # esquema Zod del contrato de contenido
│        ├─ boton-llamada.tsx
│        ├─ boton-whatsapp.tsx
│        ├─ legal.tsx        # AvisoLegal, PoliticaPrivacidad, PoliticaCookies, enlacesLegales
│        ├─ horario.ts       # días de la semana y formatearHorario
│        ├─ seo.tsx          # sitemap, robots, metadatos por página y JSON-LD
│        ├─ analitica.tsx    # <Analitica>: componente de servidor; sin analitica.vercel no pinta nada
│        └─ analitica-cliente.tsx  # "use client": carga diferida de @vercel/analytics + clics de contacto como eventos
├─ templates/
│  └─ carpinteria-metalica/
│     ├─ carpinteria-metalica-1/   # «Medida» (tipo proyecto: asistente de WhatsApp en el hero; fotos de relleno)
│     ├─ carpinteria-metalica-2/   # «Exposición» (tipo proyecto, variante tienda: «Cómo llegar» + llamada; fotos de relleno)
│     └─ carpinteria-metalica-3/   # «Reparaciones» (primer template real, multipágina; ver §7)
└─ apps/                     # vacío por ahora (reservado, p. ej. playground)
```

`pnpm-workspace.yaml`:

```yaml
packages:
  - "packages/*"
  - "templates/*"
  - "templates/*/*"
  - "apps/*"
```

`templates/*` cubriría templates planos (hoy no hay ninguno) y `templates/*/*` los anidados por nicho (`templates/<nicho>/<nicho>-<n>`); sin esa línea, pnpm no ve los anidados.

Cada carpeta dentro de esas rutas que tenga un `package.json` es un proyecto del workspace. Para listarlos: `pnpm ls -r --depth -1` (`pnpm ls -r` sin `--depth -1` lista dependencias, no proyectos).

Para ejecutar algo en un solo proyecto desde la raíz: `pnpm --filter <nombre> <comando>` (por ejemplo, `pnpm --filter carpinteria-metalica-3 dev`).

---

## 5. core (`@andrei-leads/core`)

### package.json (campos clave)

```json
{
  "name": "@andrei-leads/core",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./styles.css": "./styles.css"
  },
  "files": ["src", "styles.css"],
  "peerDependencies": { "react": "^19.0.0" },
  "dependencies": { "zod": "…", "@vercel/analytics": "^2.0.1" },
  "devDependencies": { "@types/react": "…" },
  "repository": { "type": "git", "url": "https://github.com/Andrei-Leads/kit.git" },
  "publishConfig": { "registry": "https://npm.pkg.github.com" }
}
```

- `exports` es la lista de puertas de entrada del paquete; lo que no esté ahí no se puede importar desde fuera.
- **Se publica TypeScript sin compilar.** No hay paso de build; quien lo consume lo compila con `transpilePackages`.
- `files` es la lista blanca del paquete publicado. Un archivo nuevo fuera de `src/` debe añadirse aquí.
- `react` es `peerDependency`: core usa el React de la web que lo instala (dos copias de React rompen los hooks).
- `repository` vincula el paquete al repo `kit`, y por eso hereda su visibilidad privada.

### API pública actual

| Export | Qué es | Nota |
|---|---|---|
| `defineSiteConfig(config)` | Valida el `site.config` con Zod; si falla, detiene la compilación con un error legible en español | Núcleo del contrato |
| `siteConfigSchema` | El esquema Zod | |
| `SiteConfig`, `SiteConfigInput` | Tipos de salida (con valores por defecto aplicados y `slug` relleno) y de entrada | |
| `Imagen`, `Servicio`, `Trabajo`, `Resena`, `Pregunta`, `Acreditacion`, `Tarifas`, `Empresa`, `Comunidades` | Tipos de salida de cada pieza del contrato (desde 0.3.0) | Para las props de las secciones del template |
| `crearSlug(texto)` | `"Reformas de baño"` → `"reformas-de-bano"` | La misma función que usa el esquema cuando falta `slug` (desde 0.3.0) |
| `BotonLlamada({ telefono, className?, children? })` | Enlace `tel:`; el nombre accesible es el texto visible (WCAG 2.5.3, desde 0.3.0) | Core pone el comportamiento; el aspecto lo decide el template con `className`. Sin `className`, usa un estilo por defecto con `bg-primario` |
| `BotonWhatsApp({ numero, mensaje?, className?, children? })` | Enlace `wa.me` con mensaje precargado opcional | Mismo reparto que `BotonLlamada` |
| `AvisoLegal`, `PoliticaPrivacidad`, `PoliticaCookies` | Páginas legales (LSSI, RGPD, cookies) generadas desde `config` | El template solo crea las rutas (ver §7) |
| `enlacesLegales` | Lista `{ href, texto }` de las tres rutas legales | El pie de cada template **debe** enlazarlas |
| `crearSitemap(config)` | Lista `{ url }` de las páginas que existen según los datos: `/`, `/servicios`, cada servicio **con `contenido`**, `/trabajos` y cada trabajo (si hay trabajos o `galeria`), `/empresa`, `/contacto` y `/comunidades` (si existe). Sin legales; URLs absolutas con `seo.url` | Vacía si `seo.indexar` es `false` (desde 0.4.0). Para `app/sitemap.ts` |
| `crearRobots(config)` | `indexar: true`: todo permitido + `Sitemap:`; `false`: `Disallow: /` | Para `app/robots.ts` (desde 0.4.0) |
| `crearMetadatos(config)` | Metadatos del layout: `metadataBase`, plantilla de título `%s · <nombre>`, descripción, `robots`, canonical `/`, Open Graph y Twitter (imagen: `imagenesHero[0]` → `galeria[0]` → primera foto de servicio) | `export const metadata = crearMetadatos(config)` (desde 0.4.0) |
| `metadatosPagina(config, { ruta, titulo, descripcion?, indexable? })` | Metadatos de una página estática con su canonical. Sin `descripcion`, la genera de los datos según la ruta (`/servicios`, `/trabajos`, `/empresa`, `/contacto`, legales; ≤ 160 caracteres sin cortar palabras). `indexable: false` → `noindex, follow` | Todas las páginas que no son la home ni `[slug]`. Legales con `indexable: false` (desde 0.4.0) |
| `metadatosServicio(config, slug)`, `metadatosTrabajo(config, slug)` | Título, descripción, canonical e imagen OG de su primera foto. Servicio sin `contenido`: `noindex, follow`. Slug inexistente: `{}` | Para `generateMetadata` (desde 0.4.0) |
| `DatosEstructurados({ config })` | `<script type="application/ld+json">` con el `LocalBusiness` (`@type` = `tipoSchema`, dirección, `geo`, `areaServed`, `image`, `logo`, `sameAs`, `foundingDate`, `description` = `descripcionCorta`, `openingHoursSpecification` del horario). **Nunca** `aggregateRating` ni `review`. `urgencias24h` no se convierte en 24/7 | En el `<body>` del layout; siempre, aunque no se indexe (desde 0.4.0). `crearDatosEstructurados(config)` devuelve el objeto |
| `Analitica({ config })` | Vercel Web Analytics. Si `config.analitica.vercel` es `false`, devuelve `null` y el navegador no descarga nada de `@vercel/analytics`. Si es `true`, carga la librería con `import()` (chunk aparte, unos 3 KB), llama a su `inject()` y pone un listener de clics que envía `phone_click` / `whatsapp_click` (con `path`) al pulsar un enlace `tel:` o `wa.me`, sin tocar `BotonLlamada` ni `BotonWhatsApp`. Sin cookies ni almacenamiento. Con `vercel: true`, `PoliticaPrivacidad` añade el apartado «Estadísticas de visitas»; `PoliticaCookies` no cambia | Una vez en el `<body>` del layout (desde 0.5.0) |
| `formatearHorario(horario)` | Franjas → `{ dias, horas }[]` para pintar: agrupa días con las mismas franjas (`{ dias: "Lunes a viernes", horas: "8:00–14:00 y 16:00–19:00" }`, `"Lunes, miércoles y viernes"`). Los días sin franja no salen | Desde 0.4.0. Tipos `Dia`, `FranjaHorario`, `LineaHorario` |
| `Metadatos`, `EntradaSitemap`, `Robots` | Tipos de salida de los ayudantes de SEO | Objetos planos compatibles con `Metadata` y `MetadataRoute` de Next: core no depende de `next` |

`saludo` se eliminó en 0.2.0. `AvisoLegal` muestra `negocio.registroMercantil` si existe (desde 0.3.0).

`packages/core/styles.css` define el color por defecto (`@theme { --color-primario: #1f2937; }`), así que `bg-primario` existe aunque el template no lo defina.

### Requisitos para consumir core (en un template o en una web de cliente)

1. **Dependencia:**
   - Dentro del monorepo: `"@andrei-leads/core": "workspace:^"`. Así lo guarda pnpm al hacer `pnpm add @andrei-leads/core@workspace:* --filter <app>`: aunque escribas `*`, queda `^`.
   - En una web de cliente: `"@andrei-leads/core": "^x.y.z"`, descargado de GitHub Packages.
2. **`next.config.ts`:** `transpilePackages: ["@andrei-leads/core"]`, porque core es TypeScript sin compilar y Next no compila `node_modules` por defecto.
3. **`app/globals.css`:**

   ```css
   @import "tailwindcss";
   @import "@andrei-leads/core/styles.css";
   ```

   Tailwind v4 solo genera las clases que encuentra en los archivos que lee, ignora `node_modules` y **no sigue el symlink** de pnpm. Por eso core declara sus propias fuentes en `packages/core/styles.css` (`@source "./src";`), con una ruta relativa a core que funciona en el monorepo y en cualquier web de cliente. **No uses `@source` apuntando a `node_modules` ni a `../../packages/core`** desde los templates.

Consecuencia: **toda clase de Tailwind usada por core tiene que estar dentro de `packages/core/src/`.**

---

## 6. Contrato de contenido: `site.config`

Cada template (y cada web de cliente) tiene un `site.config.ts` en la raíz con `export default defineSiteConfig({...})`. **Los templates no contienen ningún dato del negocio escrito a mano: todo sale de `config`.** Crear una web nueva consiste en rellenar ese archivo.

Contrato **0.3.0** (+ `seo.indexar` y `contacto.horario` estructurado en 0.4.0; + `analitica` en 0.5.0). *Imagen* = `{src, alt}` (alt obligatorio). *Párrafos* = `string[]`. Las listas sin "mínimo" son `[]` por defecto.

| Bloque | Campos (`?` = opcional) | Sin datos |
|---|---|---|
| `negocio` | `nombre`, `nombreLegal`, `nif` (9 caracteres), `sector`, `descripcionCorta` (≤ 160), `logo?` (imagen), `anioFundacion?`, `registroMercantil?`, `tipoSchema` (lista de tipos de schema.org; por defecto `["HomeAndConstructionBusiness"]`) | — |
| `contacto` | `telefono` (`+34` + 9 dígitos), `whatsapp?`, `email` (obligatorio: lo exigen las legales), `direccion` {`calle`, `cp` (5 dígitos), `ciudad`, `provincia`}, `horario` [{`dias` (lista de `lunes`…`domingo`, sin tildes), `abre`, `cierra` (`HH:MM`; cierra > abre; medianoche = `"23:59"`)}] (jornada partida = dos franjas), `coordenadas?` {`lat`, `lng`}, `mensajeWhatsapp?` (≤ 200), `urgencias24h` (por defecto `false`), `tiempoLlegada?` (≤ 20), `fichaGoogle?` (URL) | Sin `whatsapp`, no hay botones de WhatsApp |
| `zonas` | lista de municipios (solo lista, nunca páginas) | Sección oculta |
| `servicios` | **mínimo 1**: {`titulo`, `descripcion`, `slug?`, `contenido` (párrafos), `incluye`, `imagenes` (imagen[]), `preguntas`, `mensajeWhatsapp?`, `precioDesde?`} | Página `/servicios/<slug>` siempre; sin `contenido`, `noindex` |
| `trabajos` | {`titulo`, `slug?`, `descripcion` (≤ 300), `ubicacion?`, `anio?`, `servicio?` (slug de un servicio existente), `superficie?`, `duracion?`, `precio?`, `contenido` (párrafos), `imagenes` (imagen[], **mínimo 1**), `antes?` (imagen), `testimonio?` {`autor`, `texto`}} | Sin trabajos ni `galeria`, no hay `/trabajos` |
| `valoracion` | opcional: {`media` 1–5, `total`} (resumen de Google) | Sin estrellas. **No** va al JSON-LD (`aggregateRating`) |
| `resenas` | {`autor`, `texto`, `puntuacion` 1–5, `fecha?` (`AAAA-MM[-DD]`), `fuente?` (`google`, `web`, `otra`)} | Sección oculta |
| `proceso` | ≤ 6 × {`titulo`, `texto`} | El template usa sus pasos por defecto según el tipo |
| `acreditaciones` | {`nombre`, `numero?`} (solo números reales) | Se oculta |
| `garantias` | ≤ 6 textos (≤ 80) | Se oculta |
| `marcas` | lista de nombres | Se oculta |
| `tarifas` | opcional: {`items` [{`concepto`, `precio`}] (mínimo 1), `nota?`} | Sin sección de precios |
| `empresa` | {`historia` (párrafos), `imagenes` (imagen[]), `equipo` [{`nombre`, `cargo?`, `foto?` (imagen)}]}; por defecto, todo vacío | `/empresa` existe siempre; cada bloque vacío se oculta |
| `comunidades` | opcional: {`texto` (párrafos, mínimo 1), `puntos`, `ieev` (por defecto `false`)} | Sin bloque ni `/comunidades` |
| `imagenesHero` | imagen[] | Hero sin foto (o con la que elija el template) |
| `galeria` | imagen[] con `titulo?` | Se oculta |
| `preguntas` | {`pregunta`, `respuesta`} | Se oculta |
| `marca` | `colorPrimario?` (hex `#rrggbb`); por defecto `{}` | Color del template |
| `seo` | `titulo` (≤ 60), `descripcion` (≤ 160), `url`, `indexar?` (por defecto `false`; desde 0.4.0) | Sin `indexar: true`: `noindex` en todas las páginas, robots cerrado y sitemap vacío |
| `analitica` | `vercel` (por defecto `false`; desde 0.5.0); el bloque entero es `{}` por defecto | Sin `vercel: true`, no se carga nada ni cambia la privacidad |
| `redes` | `instagram?`, `facebook?`; por defecto `{}` | — |

`nombreLegal`, `nif` y `registroMercantil` existen para el aviso legal que exige la LSSI (`registroMercantil` solo en sociedades).

**Cambios incompatibles en 0.3.0:** `servicios[].imagen?: string` pasó a `servicios[].imagenes: {src, alt}[]`, y `negocio.logo` (texto) pasó a `{src, alt}`.

**Cambio incompatible en 0.4.0:** `contacto.horario` pasó de `[{dias: "Lunes a viernes", horas: "8:00–19:00"}]` (texto libre) a franjas `[{dias: ["lunes", …, "viernes"], abre: "08:00", cierra: "19:00"}]`. Las urgencias ya no van en el horario: solo `urgencias24h`. Migración en `docs/publicar-core.md`.

**Reglas decididas:**

- **Validación con Zod** (Zod 4: `z.email()`, `z.url()`, `z.prettifyError`). Si un dato obligatorio falta o tiene mal formato, la web **no compila**; nunca se entrega una web rota.
- **Mensajes de error en español:** los propios del esquema y, para los genéricos de Zod, la traducción `z.locales.es()` aplicada solo dentro de `defineSiteConfig` (no toca la configuración global de Zod).
- **Un único tipo de imagen** `{src, alt}` en todo el contrato, incluido `negocio.logo` (desde 0.3.0). Si el logo va junto al nombre escrito, el template puede usar `alt=""` para no repetirlo al lector de pantalla.
- **Textos largos como lista de párrafos** (`string[]`): `contenido`, `historia`, `comunidades.texto`. El template pinta un `<p>` por elemento; no hay Markdown ni HTML en los datos.
- **`slug`:** opcional en `servicios` y `trabajos`. Si falta, se genera del título con `crearSlug` (sin acentos, minúsculas, guiones). Debe ser único dentro de su lista; si se repite, la compilación falla con un mensaje en español. `trabajos[].servicio` debe ser el slug de un servicio existente.
- **Precios (`precioDesde`, `trabajos[].precio`, `tarifas`):** opcionales y **solo con cifras validadas por el cliente**. Nunca se inventan ni se copian de la competencia. Sin datos, la sección no sale.
- **Bloques opcionales** (`tarifas`, `comunidades`, `valoracion`): si faltan, su página o sección no existe.
- **`analitica.vercel`:** `false` por defecto. Se activa en la web de un cliente con plan Básico **y también en demos**, para saber si el prospecto abrió su demo. Además hay que activar Analytics en el proyecto de Vercel (dashboard → Analytics → Enable). Los clics de contacto como eventos propios solo cuentan en Vercel Pro; en Hobby se ignoran sin error.
- **`seo.indexar`:** `false` por defecto (demos y pruebas, con datos ficticios). Solo se pone `indexar: true` en la web de un cliente real, con sus datos y fotos reales.
- **El template decide qué secciones salen y en qué orden.** Si una sección no tiene datos (por ejemplo, `resenas` vacío), se oculta: `{resenas.length > 0 && (...)}`.
- **Color de marca:** tres niveles, de menos a más prioridad: core (`styles.css`, `#1f2937`) → template (`globals.css`, después del `@import` de core) → `site.config` (`marca.colorPrimario`). El template define el suyo así:

  ```css
  @theme {
    --color-primario: #b45309;
  }
  ```

  Con eso existen `bg-primario`, `text-primario`, etc. El `layout.tsx` lo sobrescribe si `site.config` trae `marca.colorPrimario`:

  ```tsx
  <html lang="es" style={{ "--color-primario": config.marca.colorPrimario } as React.CSSProperties}>
  ```

  Si el campo no existe, React omite el estilo y se usa el color del template.

**Datos que vendrán del scraper de leads** (gosom/google-maps-scraper → DuckDB → Postgres): nombre, sector, la mayor parte de `contacto` (y `fichaGoogle`), parte de `zonas`, `resenas`, `valoracion` y a veces `redes`. La demo debe verse completa solo con eso; todo lo demás es opcional. Esto es la base de un futuro generador de `site.config` (§12).

---

## 7. Templates

- **Nombre:** `templates/<nicho>/<nicho>-<n>`, por ejemplo `templates/fontaneria/fontaneria-1`. **3 templates por nicho**, cada uno con datos (`site.config.ts`) y fotos de ejemplo (`public/ejemplo/`) de su sector. `pnpm-workspace.yaml` ya los incluye (`templates/*/*`, §4).
- **El tipo de negocio es la guía de diseño, no la carpeta.** Cada nicho sigue las reglas de su tipo (objetivo, páginas, orden de la home, CTA, barra móvil, qué no llevar), detalladas en `docs/brief-claude-design.md` §6:

  | Tipo | Nichos | Objetivo | Barra móvil |
  |---|---|---|---|
  | urgencias | fontanería, electricidad, desatascos, cerrajería | Llamada en < 5 min | Llamar \| WhatsApp |
  | proyecto | reformas, carpintería, pérgolas, pintura, alicatado/pladur, aluminio y ventanas | Entrar en la lista corta de presupuestos | WhatsApp \| Llamar |
  | obra-tecnica | albañilería, pavimentos y hormigón, tejados, humedades y fachadas, movimiento de tierras | Visita técnica; presupuesto para junta | Llamar \| WhatsApp |
  | recurrente *(aplazado)* | jardinería, piscinas, climatización | Contrato periódico | Por definir |

  Los 3 templates de un nicho difieren en al menos 4 ejes de estructura (hero, orden, sección estrella, trabajos, navegación, botones, tipografía, densidad), no solo en el color.
- **Webs multipágina.** Rutas fijas en todos los templates: `/`, `/servicios`, `/servicios/[slug]`, `/trabajos`, `/trabajos/[slug]`, `/empresa`, `/contacto`, las tres legales y `/comunidades` (solo obra técnica, si existe `comunidades`). La etiqueta del menú es libre; la ruta no. Sin páginas por municipio. Cabecera, pie y barra móvil en `app/layout.tsx`, presentes en todas las páginas.
- **`templates/carpinteria-metalica/carpinteria-metalica-3`** («Reparaciones», sigue las reglas de urgencias) es el primer template real. El piloto one-page `templates/jardineria-1` («Rótulo») se borró el 15/10/2026; el tipo recurrente tendrá un template nuevo. El template de prueba `pergolas` ya se borró.
- **Estructura de un template** (la de `carpinteria-metalica-3`, con el esqueleto del antiguo piloto `jardineria-1`, ya borrado: Next 16, TypeScript, ESLint, Tailwind v4, App Router, Turbopack, `cacheComponents: true`, **sin `src/`**):
  - `app/` en la raíz del template: `layout.tsx`, `page.tsx`, `globals.css` y una carpeta por ruta fija. Además, `components/ui/` (shadcn), `components/secciones/`, `lib/` y `public/ejemplo/`.
  - `site.config.ts` en la raíz del template.
  - Alias `@/*` → `./*`, así que se importa con `import config from "@/site.config"`.
  - El `AGENTS.md` del template lo genera Next.js (apunta a su documentación en `node_modules/next/dist/docs/`); no es de este proyecto.
  - Lleva su propio `.gitignore` (de `create-next-app`); es correcto. Un `.git` dentro de un template **no**, y habría que borrarlo.
  - Con `cacheComponents`, `generateStaticParams` no puede devolver `[]` (falla el build): sin trabajos, devuelve un slug de relleno (`[{ slug: "_" }]`) que hace `notFound()`. Nada de `new Date()` en el render: el año sale de `lib/anio.ts` (`"use cache"` + `cacheLife("days")`).
  - **SEO técnico (core 0.4.0):** `app/sitemap.ts` (`crearSitemap`), `app/robots.ts` (`crearRobots`), `metadata = crearMetadatos(config)` y `<DatosEstructurados config={config} />` en `app/layout.tsx`, `generateMetadata` con `metadatosServicio`/`metadatosTrabajo` en las páginas `[slug]` y `metadatosPagina` en el resto (legales incluidas: si no, heredan el canonical `/` del layout). El `noindex` ya no se pone a mano: sale de `seo.indexar`. Las legales llevan `indexable: false`. Tipa cada uno con `Metadata` / `MetadataRoute` de Next.
  - **Analítica (core 0.5.0):** `app/layout.tsx` lleva `<Analitica config={config} />` una sola vez en el `<body>`, justo después de `<DatosEstructurados config={config} />`. Los `site.config.ts` de los templates **no** activan `analitica`: la activa cada web.
  - **Horario:** se pinta con `formatearHorario(config.contacto.horario)`, nunca leyendo las franjas a mano. Si el diseño muestra una fila de urgencias, la añade el template cuando `contacto.urgencias24h` es `true` (como `horarioVisible` en `carpinteria-metalica-3/lib/formato.ts`).
- Si `create-next-app` deja un `pnpm-lock.yaml` o un `pnpm-workspace.yaml` dentro del template, se borra: en el monorepo solo cuentan los de la raíz.
- **Qué pone cada template (frontera con core):**
  - **Componentes shadcn:** dentro del template (copiados), nunca en core.
  - **Cabecera y pie:** del template. El pie **debe** enlazar `enlacesLegales` de core.
  - **Rutas legales obligatorias:** `app/aviso-legal/page.tsx`, `app/privacidad/page.tsx` y `app/cookies/page.tsx`. Core pone el texto; el template lo envuelve con su layout (cabecera, pie, barra móvil). El `<h1>` lo pone core: el template puede añadir migas, pero **no un segundo título**. Cada ruta solo renderiza el componente de core:

    ```tsx
    import { AvisoLegal } from "@andrei-leads/core";
    import config from "@/site.config";

    export default function Page() {
      return <AvisoLegal config={config} />;
    }
    ```

  - **Botones:** todo botón de llamada es `BotonLlamada` y todo botón de WhatsApp es `BotonWhatsApp`. Aspecto vía `className`, distinto por sección. Cada `BotonWhatsApp` lleva un `mensaje` precargado según la página (servicio, trabajo…).
  - **Asistente de WhatsApp** (componente cliente del template): 2–3 preguntas con botones que solo componen el `mensaje` de `BotonWhatsApp`. Sustituye a formularios y calculadoras: no guarda ni envía datos.
  - **Tokens de diseño:** cada template define los suyos en `@theme` de `globals.css` (colores, radios, sombras…). Solo `--color-primario` se puede sobrescribir desde `site.config`; el resto es diseño del template.
  - **Imágenes:** el template trae imágenes de ejemplo **neutras** en `public/ejemplo/`. Las fotos reales del cliente van en `public/` de su web y se referencian desde `site.config` (por ejemplo, `galeria[].src`).
  - **Tipografías:** siempre con `next/font` (se sirven desde la propia web: sin peticiones a Google Fonts ni cookies de terceros).
- **Nada de iframes ni scripts de terceros sin consentimiento** (Google Maps, YouTube, píxeles de Meta/Google, analítica de terceros…). La política de cookies de core declara que la web **no usa cookies de terceros**; uno de estos elementos la convierte en falsa. Alternativas: imagen estática del mapa con enlace a Google Maps, miniatura con enlace al vídeo. Si algún día hace falta, primero hay que añadir consentimiento a core y actualizar la política.
- **Qué puede tocar Claude Design:** solo `templates/<nicho>/<nicho>-<n>` (diseño, secciones y tokens). Nunca core. El encargo para Claude Design está en `docs/brief-claude-design.md`.

---

## 8. Webs de clientes

**Proceso completo, paso a paso: `docs/nuevo-cliente.md`** (probado con `web-metalicas-ejemplo`, 13/10/2026). Resumen:

1. Desde `mis_datos/` (la web queda **fuera** de `kit`): `cp -r kit/templates/<nicho>/<nicho>-<n> web-<cliente>`, borrar `node_modules` y `.next`, cambiar `workspace:^` por la versión publicada de core (`^X.Y.Z`) y el `name` en `package.json`, `.npmrc` con **solo** la línea del registro, `git init`, `pnpm install` (core descargado de GitHub Packages) y `pnpm build`.
2. Rellenar `site.config.ts` **de la web** (nunca el del template) y poner las fotos.
3. Commit, repo vacío `Andrei-Leads/web-<cliente>`, push, acceso de la GitHub App de Vercel al repo, proyecto en Vercel con la variable `NPM_RC` y comprobación de rutas, `noindex`, `<h1>` y botones.

**Comportamiento esperado:** la web queda **congelada** en la versión de core que instaló. Los cambios en `kit/packages/core` no le afectan hasta que se ejecuta `pnpm up @andrei-leads/core` (o `pnpm add @andrei-leads/core@^0.N.0` si es un minor en 0.x; ver `docs/publicar-core.md`).

**`NPM_RC` en Vercel** (contenido de la variable, no un comando). Vercel lo usa como `.npmrc` durante el build. **El `.npmrc` del repo no lleva la línea del token**: si llevara `${NPM_TOKEN}`, en local tendría prioridad sobre `~/.npmrc` y `pnpm install` daría 401.

```
@andrei-leads:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<token de solo lectura>
```

**Token de Vercel:** classic, **solo `read:packages`**, 1 año, nota `Vercel — leer @andrei-leads/core (despliegues de clientes)`, guardado en Bitwarden y con recordatorio en el calendario dos semanas antes de que caduque. Es distinto del token personal de publicación (§12): si el de Vercel se filtra, solo permite leer core. Cuando caduca, las webs publicadas siguen funcionando, pero **fallan todos los despliegues nuevos** hasta actualizar `NPM_RC` en cada proyecto y hacer *Redeploy*.

**Plan de Vercel:** Hobby no despliega repos **privados de una organización** y no permite uso comercial. `web-prueba` y `web-metalicas-ejemplo` se hicieron **públicos** para las pruebas (datos ficticios y sin secretos; el código de core sigue privado porque solo se descarga en el build). **Clientes reales: Vercel Pro (unos 20 $/mes por miembro, proyectos ilimitados) y repos privados**, para que no se vea el código del template.

---

## 9. Procesos documentados (`docs/`)

| Documento | Estado | Úsalo cuando… |
|---|---|---|
| `docs/publicar-core.md` | Listo | Se cambia algo en `packages/core` que debe llegar a las webs |
| `docs/sesion-web.md` | Listo (estado al 16/10/2026, con 0.5.0 publicada) | Se trabaja desde Claude Code en la web: qué cambia respecto a local, estado actual y tareas pendientes en orden |
| `docs/contexto-estrategia.md` | Listo (15/10/2026) | Sesión de estrategia: qué le falta a `kit` para mantener muchas webs, SEO, relación con Pavimentos Albufera, Pavivasa y `monorepo_root` |
| `docs/brief-claude-design.md` | Listo (contrato 0.3.0, multipágina, reglas por tipo) | Se va a pedir un diseño a Claude Design. Es genérico: el encargo concreto de cada template se escribe aparte |
| `docs/investigacion-nichos.md` | Referencia («investigación por nichos») | Se quiere el porqué de las reglas por tipo (estructura que más convierte por nicho) |
| `docs/nuevo-template.md` | Listo (a partir de `carpinteria-metalica-1/2/3`, 15/10/2026) | Se convierte un diseño en `templates/<nicho>/<nicho>-<n>` |
| `docs/nuevo-cliente.md` | Listo (probado con `web-metalicas-ejemplo`, 13/10/2026) | Se crea la web de un cliente a partir de un template y se despliega |
| `docs/actualizar-cliente.md` | Listo (probado con `web-metalicas-ejemplo` 0.3.0 → 0.4.0, 14/10/2026) | Se lleva una versión nueva de core a una web ya entregada |
| `docs/cambio-de-plan.md` | Básico publicado en core 0.5.0 (16/10/2026); Pro provisional (core 0.6.0) | Un cliente pasa de plan Básico a Pro (analítica con consentimiento) o al revés. El agente pregunta los datos y hace el cambio en `site.config` |

Si Ysst pide un proceso cuyo documento aún no existe, guíale con lo que hay en este archivo y propón escribir el documento cuando el proceso funcione.

---

## 10. Decisiones tomadas (no reabrir sin que Ysst lo pida)

| Decisión | Por qué |
|---|---|
| **Diseños en carpetas, no en ramas de Git** | Una rama es una versión temporal que vuelve a `main`; un diseño es una variante permanente. Con ramas, cada mejora del esqueleto habría que copiarla a mano a cada rama. |
| **Un repo de GitHub por cliente** | Aislamiento, y el traspaso al cliente es fácil. |
| **Core como paquete versionado** (no copia ni resincronización) | Las mejoras (legales, seguridad, SEO) llegan a las webs ya entregadas, y cada cliente se actualiza cuando Ysst decide. Un fallo en core no tumba todas las webs. |
| **GitHub Packages, privado, scope `@andrei-leads`** | Registro privado gratuito dentro de la org. |
| **Se publica TS sin compilar + `transpilePackages`** | Más simple que montar un build del paquete. |
| **`styles.css` en core con `@source "./src"`** | Tailwind no sigue el symlink de pnpm; la ruta relativa a core funciona en todas partes. |
| **Contrato `site.config` con Zod** | Una sola fuente de verdad para datos y tipos; la compilación falla si faltan datos. |
| **El template decide las secciones; sin datos, se ocultan** | El template es diseño, y `site.config` son solo datos. |
| **Color de marca opcional en `site.config`** | Un mismo template sirve para clientes con colores distintos. |
| **Changesets con opción A** (PR "Version Packages" y publicación al fusionarlo) | Punto de revisión antes de que nada llegue a los clientes. |
| **Changelog sin integración de GitHub; Changesets sin autocommit** | Trabaja solo; la nota de cambio va en el mismo commit que el código. |
| **shadcn en cada template, no en core** | Son piezas de diseño que cada template personaliza; en core obligarían a versionar cambios visuales. |
| **`BotonLlamada`: core da el comportamiento, el template el aspecto (`className`; por defecto `bg-primario`)** | Lo que debe ser igual en todas las webs (`tel:`, accesibilidad) se importa; lo visual se decide en el template. |
| **`--color-primario` por defecto en core; el template lo sobrescribe** | `bg-primario` funciona siempre, aunque un template olvide definirlo. |
| **Cabecera y pie en el template; el pie enlaza `enlacesLegales`** | Son diseño; los enlaces legales salen de core para no olvidarlos. |
| **Páginas legales en core; rutas en el template** | El texto legal se mejora una vez y llega a todas las webs. |
| **`contacto.email` obligatorio** | El aviso legal y la privacidad necesitan un email de contacto. |
| **Sin iframes ni scripts de terceros sin consentimiento** | La política de cookies declara que no hay cookies de terceros. |
| **`galeria` y `preguntas` en `site.config`, por defecto `[]`** | Secciones opcionales: sin datos, el template las oculta. `alt` obligatorio por accesibilidad. |
| **Tokens de diseño en cada template; solo `--color-primario` sobrescribible desde `site.config`** | El diseño es del template; el cliente solo personaliza su color de marca. |
| **Imágenes de ejemplo neutras en `public/ejemplo/`; fotos del cliente en `public/`** | El template se ve completo sin datos reales, y las fotos del cliente no se mezclan con las de ejemplo. |
| **Tipografías siempre con `next/font`** | Rendimiento y sin peticiones a terceros. |
| **Turborepo aplazado** | Con un solo template no aporta nada; se añade con 3 o 4 templates. |
| **Organización como "My personal account"** | Autónomo = persona física. |
| **Webs multipágina con rutas fijas** (página por servicio y por trabajo; sin páginas por municipio) | La página por servicio es el primer factor de SEO local; las páginas por zona son contenido duplicado ("doorway"). Rutas fijas = mismo `create-site` y mismos enlaces en todos los templates (investigación por nichos) |
| **Carpetas por nicho (`templates/<nicho>/<nicho>-<n>`), 3 por nicho** | La demo debe parecer del oficio del cliente, con datos y fotos de su sector |
| **El tipo de negocio (urgencias, proyecto, obra-tecnica, recurrente) es la guía de diseño, no la carpeta** | La estructura que convierte depende de la urgencia del cliente, no del oficio (investigación por nichos) |
| **Contrato 0.3.0: núcleo común + bloques opcionales; todo lo nuevo es opcional o con `default`** | La demo se hace con los datos del scraper; lo que falte oculta su sección |
| **`servicios[].imagen` → `servicios[].imagenes`** (cambio incompatible) | Varias fotos por servicio y un único tipo de imagen con `alt`. Se hizo antes de entregar ninguna web |
| **`slug` opcional generado del título, único por lista** | Rutas legibles sin trabajo extra; el error salta al compilar, no en producción |
| **Textos largos como `string[]`** | Sin Markdown ni HTML en los datos; el template decide cómo pinta cada párrafo |
| **Precios opcionales, solo con cifras validadas por el cliente** | Los precios orientativos convierten (sobre todo en urgencias), pero una cifra inventada es un problema con el cliente y con su clientela |
| **`valoracion` se muestra pero no va al JSON-LD** | Las directrices de Google no permiten `aggregateRating` con reseñas de Google |
| **Sin formularios; asistente de WhatsApp en su lugar** | Sin backend ni datos personales que custodiar; WhatsApp lo usa el 94 % en España |
| **`BotonLlamada` y `BotonWhatsApp` para todo botón de contacto; mensaje de WhatsApp precargado por página** | Accesibilidad y enlaces iguales en todas las webs; el mensaje dice de dónde viene el lead |
| **`seo.indexar` por defecto `false`** (noindex, robots cerrado y sitemap vacío) | Las demos y pruebas llevan datos ficticios y no deben aparecer en Google; olvidarse de activarlo en un cliente real se ve en la comprobación del despliegue, mientras que olvidarse de desactivarlo en una demo indexaría un negocio inventado |
| **Horario estructurado** (franjas `{dias, abre, cierra}`; el texto lo genera `formatearHorario`) | Google necesita `openingHoursSpecification` en el JSON-LD y el horario debe coincidir con la ficha de Google; con texto libre no se puede generar. Las urgencias van solo en `urgencias24h` y no se declaran como 24/7 en el schema |
| **Legales con `noindex, follow` y fuera del sitemap** | No aportan nada a la búsqueda; `follow` deja que Google siga los enlaces |
| **Descripciones por página generadas en core desde los datos** | Cada página con su meta description sin trabajo extra por cliente; el template puede pasar la suya |
| **SEO técnico en core, sin dependencia de `next`** (objetos planos compatibles con `Metadata` y `MetadataRoute`) | Canonical, sitemap, robots y JSON-LD iguales en todas las webs y mejorables una vez; core sigue sin atarse a una versión de Next |
| **Legales con el layout del template; el `<h1>` lo pone core** | Core da el texto; navbar y pie en todas las páginas para no dejar al visitante sin salida. Un solo `<h1>` por página (accesibilidad y SEO): el template solo añade migas |
| **Planes por datos: Básico = Vercel Web Analytics sin cookies ni banner (implementado en 0.5.0, con los clics de llamada y WhatsApp como eventos propios, que solo cuentan en Vercel Pro); Pro = + GA4/Meta con banner de consentimiento de core (provisional, pendiente para 0.6.0)** | El cambio de plan es solo un cambio en `site.config` (sin tocar el template) y lo puede hacer un agente siguiendo `docs/cambio-de-plan.md`. Vercel Web Analytics se sirve desde la propia web y no usa cookies: es la única analítica permitida sin consentimiento. Límites (Vercel, 15/10/2026): Hobby 50.000 eventos/mes sin eventos propios; Pro 0,03 $ por 1.000 eventos, con eventos propios |
| **`analitica.vercel` por defecto `false`** | Nada de terceros sin decidirlo web por web |
| **Analítica también en demos** | Saber si el prospecto abrió su demo; sin cookies, no necesita banner |
| **`@vercel/analytics` con `import()` + `inject()`, no `/next` ni `next/dynamic`** | Core no depende de `next`. Con `import()` la librería va en un chunk aparte: con `vercel: false` no se descarga. Las variables `NEXT_PUBLIC_VERCEL_OBSERVABILITY_*` se pasan a mano para el Resilient Intake |

---

## 11. Trampas ya encontradas

| Síntoma | Causa | Solución |
|---|---|---|
| Componentes de core sin estilos | Tailwind no lee core | `@import "@andrei-leads/core/styles.css";` en `globals.css` |
| Ruta `@source` que no hace nada | Ruta mal contada (el template no tiene `src/`) | Contar los saltos desde la ubicación real del archivo |
| "Unknown at rule @source" | Aviso de VS Code, no de la compilación | Extensión Tailwind + `files.associations` |
| `ERR_PNPM_WORKSPACE_PKG_NOT_FOUND` en una web de cliente | Sigue con `workspace:^` | `sed -i 's/"workspace:[^"]*"/"^X.Y.Z"/' package.json` |
| Publicación rechazada por mayúsculas | Scope `@Andrei-Leads` | Siempre `@andrei-leads` |
| `node_modules` en Git | Faltaba en `.gitignore` | Corregir `.gitignore` y luego `git rm -r --cached . && git add .` (sigue en el historial antiguo; no se reescribe) |
| `pnpm publish` se niega a publicar | Árbol de Git sucio (por ejemplo, un `.tgz` de `pnpm pack`) | Borrar el archivo o hacer commit |
| Al cambiar core, la web no se actualiza | En una web de cliente es lo esperado (versión congelada); en el monorepo, puede que la página no use lo que cambiaste | Comprobar qué se renderiza realmente |
| Texto claro sobre fondo oscuro "sin estilos" | `globals.css` por defecto + modo oscuro de Kubuntu | Normal; mirar si existen las clases, no el color |
| Vercel no muestra el repo o pide Pro al importarlo | Hobby no despliega repos privados de una organización, o la GitHub App de Vercel no tiene acceso a ese repo | Pro (o repo público solo para pruebas); añadir el repo en los permisos de la GitHub App |
| `401` en el build de Vercel al instalar core | Falta `NPM_RC`, está mal pegada o el token de Vercel ha caducado | Revisar y actualizar `NPM_RC` en el proyecto y hacer *Redeploy* (§8) |
| `ERR_PNPM_FETCH_401` en el build de Vercel y el log muestra `_authToken=` con algo que no empieza por `ghp_` | Se copió otro campo de Bitwarden en `NPM_RC` | Editar `NPM_RC` con el token `ghp_…` → Save → Deployments → ⋯ → Redeploy; si lo pegado era una contraseña, cambiarla (`docs/nuevo-cliente.md`) |
| VS Code marca errores de tipos que citan `@andrei-leads+core@<versión vieja>` y el build compila | El servidor de TypeScript tiene la versión vieja en memoria | `Ctrl+Shift+P` → «TypeScript: Restart TS Server»; manda el build |
| En local se ven imágenes antiguas o de otra web | Next cachea `/_next/image` ~4 h y otra web se abrió antes en el mismo puerto; `Ctrl+Shift+R` no basta | DevTools → Red → «Disable cache» y recargar, o otro puerto |
| `pnpm start`: «Could not find a production build» | Se lanzó mientras `pnpm build` compilaba | Esperar a que termine el build |
| Build: `site.config inválido: Inválido URL → at seo.url` | `seo.url` sin `https://`, o se copió la URL de un despliegue concreto (`web-x-ab12cd-…vercel.app`) | `url: "https://web-<cliente>.vercel.app"` (dominio fijo del proyecto) o el dominio del cliente |
| Se pega JSON en la terminal | Confusión entre comando y archivo | Decir siempre "esto va en el archivo X" |

---

## 12. Estado y hoja de ruta

**Hecho (oct 2026):** monorepo pnpm, core con contrato `site.config`, template de prueba `pergolas` (ya borrado), piloto `jardineria-1` («Rótulo»), publicación en GitHub Packages, webs de cliente de prueba desplegadas en Vercel (`web-prueba` y `web-metalicas-ejemplo`), Changesets y Action. Versiones: `0.1.0` (a mano), `0.1.1` (por la Action: `aria-label` en `BotonLlamada`), `0.2.0` (frontera core/template: páginas legales, `BotonLlamada` con `className`, `email` obligatorio, sin `saludo`, y `galeria` y `preguntas` en `site.config`) y `0.3.0` (por la Action, PR #2: contrato multipágina, `BotonWhatsApp`, `imagenesHero`, slugs, `servicios[].imagenes` y `negocio.logo` como `{src, alt}`, y botones sin `aria-label`: el nombre accesible es el texto visible, WCAG 2.5.3), `0.4.0` (por la Action, PR #3: SEO técnico y horario estructurado) y `0.5.0` (por la Action, PR #4, 16/10/2026: analítica del plan Básico). Brief reescrito para webs multipágina y reglas por tipo. Encargos de Claude Design escritos (3 por nicho: carpintería metálica, fontanería y pérgolas), fuera del repo en `mis_datos/encargos-claude-design/`.

**En curso:** `templates/carpinteria-metalica/carpinteria-metalica-3` «Reparaciones» integrado y subido, con las 9 fotos de ejemplo (IA). `-1` «Medida» (tipo proyecto) integrado el 14/10/2026 y revisado por Ysst: compila, rutas fijas, asistente de WhatsApp paso a paso en el hero, probado con datos completos, mínimos (con y sin WhatsApp), 1 servicio, solo galería + logo y primario `#1e40af`; sus 15 fotos de `public/ejemplo/` son **relleno gris** con los nombres de su `CREDITOS.md` (sustituirlas = reemplazar archivos) . `-2` «Exposición» (tipo proyecto, variante tienda) integrado el 14/10/2026, revisado y subido: compila con lint limpio, rutas fijas, SEO de core conectado, bloque «Visítanos» (dirección, horario con `formatearHorario`, «Cómo llegar» como enlace a Google Maps + llamada) en hero, `/empresa`, `/contacto` y CTA, catálogo por familias con precio «desde» y asistente compacto; probado con datos completos, mínimos (con y sin WhatsApp), 1 servicio, solo galería, horario de 3 filas, sector largo, primario `#1e40af` y con `mis_datos/datos-ficticios/carpinteria-metalica-2` (defecto conocido: con logo y nombre muy largo, el nombre se corta en móvil); sus fotos de `public/ejemplo/` son **relleno gris** con los nombres de su `CREDITOS.md`.

**Siguiente, en orden:**

1. ~~**Frontera core / template.**~~ **Resuelta en core 0.2.0** (ver §5, §7 y §10).
2. ~~**`docs/brief-claude-design.md`**~~ **Hecho.** El mapa visual para Claude Design (estructura del template, catálogo de secciones, tokens, contrato `site.config`). Sin backend ni procesos.
3. ~~**Piloto `jardineria-1`**~~ **Hecho** (one-page; borrado el 15/10/2026: queda en el historial de Git; el tipo recurrente tendrá un template nuevo multipágina). Despliegue probado con `web-prueba` (§8).
4. **Templates de carpintería metálica.** `-3` «Reparaciones», `-1` «Medida» y `-2` «Exposición» (tipo proyecto: aluminio y ventanas) ya están integrados . Fontanería (`fontaneria-1/2/3`) y pérgolas (`pergolas-1/2/3`) van después.
5. ~~**Prueba con cliente ficticio**~~ **Hecha (13/10/2026):** `web-metalicas-ejemplo` (template `carpinteria-metalica-3`, core `^0.3.0`, datos ficticios, `noindex`), repo público en Vercel Hobby: https://web-metalicas-ejemplo-nu.vercel.app. Proceso en `docs/nuevo-cliente.md`. Redespliegue automático con `git push` a `main` comprobado (14/10/2026).
6. ~~**SEO técnico en core**~~ **Publicado en 0.4.0 (14/10/2026)**: fusionado en `main` (rama `feat/seo-tecnico`) con su nota en `.changeset/` (incluye el horario estructurado, cambio incompatible); conectado en `carpinteria-metalica-3`, `-1` y `-2`; `jardineria-1` solo migrado al horario nuevo. `web-metalicas-ejemplo` ya actualizada a 0.4.0 (`docs/actualizar-cliente.md`).
7. ~~**Escribir `nuevo-template.md` y `actualizar-cliente.md`**~~ **Hecho:** `actualizar-cliente.md` (14/10/2026) y `nuevo-template.md` (15/10/2026, a partir de `carpinteria-metalica-1/2/3`).
8. **Escalar:** 3 templates por nicho, empezando por urgencias y proyecto; obra técnica después; recurrente al final.
9. ~~**Analítica del plan Básico**~~ **Publicada en core 0.5.0 (16/10/2026, PR #4 «Version Packages»)**: `analitica.vercel`, componente `Analitica`, apartado en la política de privacidad y clics de contacto como eventos; conectada en `carpinteria-metalica-1/2/3`. El Pro (GA4/Meta con consentimiento) queda para 0.6.0 (`docs/cambio-de-plan.md`).

**Más adelante:** Turborepo (con 3 o 4 templates); script `create-site` (automatiza los pasos 1–4 de `docs/nuevo-cliente.md`); generador de `site.config` desde Postgres (Marshmallow si es Python); integración del changelog con GitHub si llega a haber equipo.

**Avisos con fecha:**

- **Nombre decidido:** "Andrei Leads" es la marca personal de Ysst; no habrá rebrand, así que el scope `@andrei-leads` se mantiene.
- **Token personal de GitHub** (classic, `write:packages` + `repo`, 90 días, guardado en Bitwarden). Si aparece un 401, probablemente ha caducado: ver `docs/publicar-core.md`.
- **Token de Vercel** (classic, `read:packages`, caduca el 12/10/2027; recordatorio el 28/09/2027). Ver §8.
- **Antes del primer cliente real:** core ≥ 0.4.0 (hoy 0.5.0) y `seo.indexar: true` en su `site.config.ts` (sin él, la web va con `noindex`), Vercel Pro y repo privado (§8), y fotos reales del cliente (checklist en `docs/nuevo-cliente.md`).
