# Contexto para una sesión de estrategia (15/10/2026)

> **Agente (Opus 5.5, sesión web):** esta sesión es **una conversación estratégica, no de implementación**. Ysst quiere decidir qué piezas le faltan al `kit` para gestionar muchas webs de clientes con el mínimo mantenimiento, cómo enfocar el SEO y qué llevar a sus webs ya existentes (Pavimentos Albufera y Pavivasa).
>
> 1. Lee `AGENTS.md` entero (sobre todo §2, cómo trabajar con Ysst, §10 decisiones y §12 estado) y después este documento.
> 2. No escribas código ni abras PRs salvo que Ysst lo pida. El resultado esperado es un **plan priorizado**. Si Ysst lo aprueba, se guarda en `docs/plan-estrategico.md` en una rama y PR (ver `docs/sesion-web.md` §1).
> 3. Estilo: español, breve (Pareto), una recomendación clara antes que un menú, y explicación simple («para un niño de 12 años») de cada concepto nuevo. Ysst decide la arquitectura: tú propones y esperas.
> 4. Lo que está fuera de este repo (otros repos y la carpeta local `mis_datos/`) **no lo puedes ver**. Aquí tienes un resumen; si necesitas más detalle, pídeselo a Ysst.

---

## 1. Qué quiere conseguir Ysst

- **Negocio:** Andrei Leads (Ysst, autónomo en Valencia) hace webs para pymes locales de oficios (carpintería metálica, fontanería, pérgolas, reformas, pavimentos…). Las encuentra con un scraper de Google Maps (gosom/google-maps-scraper → DuckDB → Postgres) y les enseña una demo con sus datos.
- **Escala:** muchas webs de clientes a la vez, con **el menor mantenimiento posible**. Le interesan tests, comprobaciones automáticas y todo lo que evite romper webs ya entregadas.
- **Visión a medio plazo:** abrir `kit`, decirle a un agente «web para este cliente, de este nicho, con estos datos», y que el agente elija el mejor template y la monte solo.
- **Planes:** **Básico** (web + analítica sin cookies, sin banner) y **Pro** (+ GA4/Meta con banner de consentimiento, SEO, etc.). Pasar de uno a otro debería ser solo un cambio de datos en `site.config`, que puede hacer un agente siguiendo `docs/cambio-de-plan.md` (provisional, sin implementar).

## 2. Estado de `kit` hoy

| Pieza | Estado |
|---|---|
| **core** `@andrei-leads/core` **0.4.0** (GitHub Packages, privado) | Contrato `site.config` con Zod 4 (multipágina, slugs, precios opcionales, horario estructurado), `BotonLlamada`, `BotonWhatsApp`, legales LSSI/RGPD/cookies y SEO técnico: sitemap, robots, metadatos por página, JSON-LD `LocalBusiness` sin `aggregateRating`, y `seo.indexar` con valor por defecto `false` |
| **Templates** (Next 16, Tailwind 4, App Router, `cacheComponents`) | `carpinteria-metalica-3` «Reparaciones», `-1` «Medida» y `-2` «Exposición», multipágina, con fotos de ejemplo generadas por IA (al `-2` le faltan algunas). `jardineria-1` (piloto one-page) se borró el 15/10/2026 |
| **Webs de demo** (repos públicos `Andrei-Leads/web-*`, Vercel Hobby, `noindex`) | `web-metalicas-ejemplo` (`-3`, actualizada a 0.4.0) y `web-aluminis-rocamar` (`-1`). Falta Finestral Nord (`-2`) |
| **Procesos probados y documentados** | `docs/publicar-core.md` (Changesets + Action), `docs/nuevo-cliente.md`, `docs/actualizar-cliente.md` (0.3.0 → 0.4.0 probado), `docs/cambio-de-plan.md` (SOP provisional), `docs/brief-claude-design.md` (encargos de diseño) |
| **Flujo de producción de un template** | Encargo → Claude Design → revisión con agentes → integración con un orquestador Opus y subagentes Sonnet/Haiku → comprobaciones → commit. Fotos de ejemplo generadas con ChatGPT a partir de prompts escritos por agentes |
| **CI** | Solo la Action de Changesets, que versiona y publica core. **No hay** build, lint ni tests en los PR |
| **Tests** | **Ninguno.** Las comprobaciones (un `<h1>` por página, `noindex`, sin formularios ni iframes, JSON-LD…) las hacen los agentes a mano en cada integración |

**Cómo se reparte el trabajo:** lo que es igual en todos los clientes va en core y se importa; el código del template se **copia** a la web del cliente. Por eso actualizar core en una web entregada a veces obliga a volver a copiar código del template (`docs/actualizar-cliente.md`). Cuantas más webs haya, más pesa ese coste de mantenimiento.

### Huecos ya conocidos (anotados en `AGENTS.md` y en la lista de Ysst)

- **«Falso 404»:** un slug inexistente devuelve 200 en la primera visita y 404 en las siguientes (prerender parcial de Next 16).
- **Analítica y consentimiento:** core 0.5.0 (Básico) y 0.6.0 (Pro). Falta confirmar los límites y el coste de Vercel Web Analytics.
- **Logo:** `negocio.logo.formato`, para la variante «solo logo» con nombres muy largos.
- **Vercel Pro y repos privados** antes del primer cliente real.
- **Automatización:** script o agente `create-site`.
- **Documentación:** `docs/nuevo-template.md` (de diseño a template) ya está escrito; falta probarlo con el próximo nicho.
- **Catálogo de templates** desplegado (`apps/catalogo`).
- **Turborepo:** aplazado hasta tener 3–4 templates; ya hay 3.

## 3. Otras bases que existen (importante para la estrategia)

Además de `kit` (organización `Andrei-Leads`), Ysst tiene **otros tres proyectos** en su cuenta personal de GitHub (`DreiSup`), todos más pesados. **Se solapan con `kit` y nadie ha decidido todavía cómo se relacionan.**

### 3.1 Pavimentos Albufera, cliente real (`DreiSup/pavimentos_albufera_web`, pavimentos-albufera.com)

- **Stack:** monorepo pnpm + Turborepo, Next 15.5, React 19, Tailwind 3, Zod 3. Una app `apps/web` y 4 paquetes `@site/*` (`content`, `config`, `seo`, `tracking`). Viene de WordPress.
- **Contenido:** 6 servicios, 9 obras, 16 acabados, 8 zonas, 3 artículos, 4 landings de campaña `/lp/*` (`noindex`) y 34 redirecciones 308.
- **Captación:** formulario de presupuesto (Server Action) con honeypot, Zod, límite por IP y **filtro de leads por código postal y superficie**. Avisos por Resend (email) y Telegram.
- **Tracking:** consentimiento propio; GA4, Google Ads y Meta Pixel cargados solo después de aceptar; **Meta CAPI** desde el servidor con `event_id` compartido; atribución (`/api/atribucion`, cookies `pa_*`).
- **Calidad (lo que más interesa para `kit`):**
  - **Gates:** `content:validate` → `lint` → `typecheck` → `next build` con **5 verificadores postbuild** (redirecciones, imágenes, **presupuesto de JS por ruta**, LCP visible, landings) → `pnpm verify`.
  - **`pnpm verify`** comprueba: sitemap frente a las páginas reales, enlaces internos sin 404, redirects, JSON-LD válido, un solo H1, canonical, títulos y descripciones únicos, robots, `alt` en las imágenes, presencia de `tel:`/`wa.me`, fugas de secretos al bundle y número de páginas.
  - **`known-issues.json`** como baseline: un fallo nuevo rompe el run, y una entrada obsoleta también.
  - **CI de GitHub Actions** en cada push y PR. Lighthouse CI existe, pero queda fuera de CI a propósito.
- **Pendientes que tiene anotados:** ramas sin fusionar (`seo/port-09af74a`: índice `/zonas/` y breadcrumbs), CI sin comprobar en GitHub, `pnpm test` (9 tests) fuera de CI, textos legales sin confirmar con el dueño, mejoras de SEO detectadas sin corregir (`og:url`, descripciones duplicadas en las legales, `Service` sin `description`) y medición de los CTA antes de la hidratación.

### 3.2 Pavivasa, cliente real (`DreiSup/pavivasa_web`)

Es el «hermano» de Albufera, con la misma arquitectura de monorepo y `@site/*`. Aporta `robots.txt` con grupos para rastreadores de IA, `llms.txt`, JSON-LD de `Article` y conversiones de Ads. Hay guías para replicar en Pavivasa los cambios de Albufera.

### 3.3 `monorepo_root`, «repositorio base» (`DreiSup/monorepo_root`)

- **Qué es:** una especificación normativa (`docs/SPEC.md` v1.0, del 08/10/2026) y un `BUILD-PLAN.md` para una **plantilla madre**: Turborepo, pnpm, Next 16, next-intl, Tailwind 4 y Zod 4, con un cliente ficticio («Empresa Demo»). Toma la capa técnica de Albufera (tracking, verify, CI) y lo mejor de Pavivasa.
- **Estado:** **el repo está vacío.** Solo tiene la especificación y el plan; no se ha construido.
- **Modelo:** un repo por cliente con «Use this template», `base_version` y CHANGELOG SemVer. Las mejoras se llevan **a mano** a cada cliente.
- **Alcance:** incluye formulario de leads (`@site/leads`), i18n desde el primer día, verificadores y CI. Albufera y Pavivasa **no** se migran a esta base de forma automática.

### 3.4 `kit` frente a `monorepo_root`

| | `kit` (existe y funciona) | `monorepo_root` (solo especificado) |
|---|---|---|
| Para quién | Oficios pequeños, webs de demo en una tarde | Negocios con captación seria, campañas y tracking avanzado |
| Lo común | **Se importa** (core versionado en npm privado): las mejoras llegan con `pnpm add` | **Se copia** (plantilla): las mejoras se aplican a mano por versión |
| Formularios | No (solo llamada y WhatsApp) | Sí (`@site/leads`, Resend, Telegram, CAPI) |
| Tracking | Pendiente (0.5.0 y 0.6.0) | Completo en la especificación |
| Calidad automática | Ninguna (los agentes comprueban a mano) | Gates, `verify`, CI y tests |
| Diseño | Varios templates por nicho, hechos con Claude Design | UI neutra; cada cliente diseña la suya |

**Pregunta de fondo para esta sesión:** ¿se unifican (por ejemplo, `kit` adopta la capa de calidad y tracking de Albufera, o `kit` es el plan Básico y `monorepo_root` el Pro), o se mantienen separados con fronteras claras?

## 4. Preguntas que Ysst quiere tratar

1. **Mantenimiento con muchas webs.** Qué falta en `kit` para que cada web dé el mínimo trabajo. Candidatos:
   - **tests de core:** esquema Zod, `crearSlug`, `formatearHorario`, SEO y JSON-LD;
   - **CI en los PR:** build, lint y typecheck de todos los templates;
   - **un `verify` como el de Albufera** sobre el HTML generado;
   - **presupuesto de JS** y Lighthouse;
   - **accesibilidad automática** (axe) y **regresión visual**;
   - **Renovate o Dependabot**;
   - **monitorización:** uptime y errores;
   - **avisos de caducidad** de tokens;
   - **propagar las actualizaciones a N webs:** script, o reducir el código copiado.
2. **Estrategia de SEO:**
   - qué añadir sobre la 0.4.0: `llms.txt` y rastreadores de IA, `Service` y `FAQPage`, breadcrumbs, `og:url`, Search Console por cliente, Google Business Profile, contenido por servicio, zonas sin páginas «doorway»;
   - cómo medirlo.
3. **Albufera y Pavivasa:**
   - qué llevar de `kit` a sus webs, y al revés (sus gates y su tracking hacia `kit`);
   - cómo hacerlo sin romper sus contratos (cookies, eventos, redirects).
   - Para tocar su código hay que abrir sesiones sobre **sus** repos (`DreiSup/...`); desde aquí solo se planifica.
4. **Relación `kit` / `monorepo_root`** (ver §3.4).
5. **Orden:** qué hacer antes del primer cliente real y qué puede esperar.

## 5. Datos útiles

- **Decisiones que no se reabren sin que Ysst lo pida:** `AGENTS.md` §10. Entre ellas:
  - sin formularios en `kit` (asistente de WhatsApp);
  - nada de terceros sin consentimiento;
  - `valoracion` fuera del JSON-LD;
  - páginas por servicio y por trabajo, pero no por municipio;
  - templates en carpetas por nicho.
- **Referencias de SEO local** (fuera de este repo, en el disco de Ysst):
  - `IOSIF/SEO-Local-Contexto-Claude-Code.md` (reglas de SEO local, GEO y AEO);
  - `docs/investigacion-nichos.md` (este repo: estructura que convierte por tipo de negocio).
- **Cuentas:** GitHub, organización `Andrei-Leads` (plan Free) y cuenta personal `DreiSup`; Vercel Hobby (pasar a Pro antes del primer cliente real); token de Vercel de solo lectura, que caduca el 12/10/2027.
