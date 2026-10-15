# Contexto para una sesión de Claude Code en la web

> **Agente:** antes de hacer nada, lee entero `AGENTS.md` (contexto, reglas para trabajar con Ysst y decisiones tomadas). Después vuelve aquí. Este archivo explica en qué punto está el trabajo (13/10/2026) y qué hacer en una sesión web. Si algo de aquí contradice `AGENTS.md`, manda `AGENTS.md`. Avisa a Ysst de la contradicción.

---

## 1. Diferencias con la sesión local

- **Trabajas sobre el repo de GitHub `Andrei-Leads/kit`**, no sobre el PC de Ysst.
- **No tienes acceso a nada de fuera de `kit`:** la carpeta `mis_datos/`, los encargos y los diseños de Claude Design (`mis_datos/encargos-claude-design/`, `mis_datos/disenyo-*`), las fotos de ejemplo, `web-prueba` ni `PENDIENTES-kit.md`. Si necesitas algo de eso, pídeselo a Ysst (que lo pegue o te pase un enlace).
- **Git:** trabaja siempre en una rama y abre un PR. **No hagas commit directo en `main` ni fusiones PRs**: los revisa y fusiona Ysst. La regla de `AGENTS.md` sobre no contactar con GitHub sin avisar se cumple así: di siempre antes qué rama vas a crear, qué vas a subir y qué PR vas a abrir.
- **pnpm 9.15.9** (`packageManager` del `package.json` raíz). No actualices pnpm aunque salga el aviso.
- **Para instalar y compilar dentro del monorepo no hace falta ningún token:** core se usa con `workspace:^`. `pnpm install` en la raíz, y luego `pnpm --filter <proyecto> build`.
- **`pnpm changeset` es interactivo.** Si no funciona en este entorno, crea la nota a mano en `.changeset/<nombre>.md` con el formato de las que ya existen.
- **Al terminar, recuerda a Ysst** que ejecute `git pull` desde la raíz de `kit` en su PC antes de seguir trabajando en local.

## 2. Estado actual (14/10/2026)

- **Core 0.4.0 publicada** en GitHub Packages: contrato multipágina (0.3.0), SEO técnico (sitemap, robots, metadatos, JSON-LD, `seo.indexar` con valor por defecto `false`) y horario estructurado `{ dias, abre, cierra }`, que es un cambio incompatible. El estado detallado está en `AGENTS.md` §12.
- **Templates reales** (carpetas por nicho): `templates/carpinteria-metalica/carpinteria-metalica-3` «Reparaciones» y `-1` «Medida», integrados y con el SEO conectado. `-2` «Exposición» está en integración. `templates/jardineria-1` es la referencia one-page antigua, sin SEO.
- **Webs de demo** (repos públicos en Vercel Hobby, fuera de `kit`): `web-metalicas-ejemplo` (`-3`, ya actualizada a 0.4.0) y `web-aluminis-rocamar` (`-1`).
- **Procesos documentados:** `docs/nuevo-cliente.md`, `docs/actualizar-cliente.md` y `docs/cambio-de-plan.md` (SOP provisional; la analítica todavía no está implementada).
- **Los encargos para Claude Design, los diseños, las fotos y los datos ficticios** los tiene Ysst en `mis_datos/`, fuera del repo. Tú no los tienes.

## 3. Tareas que se pueden hacer desde la web

Las tareas de antes (accesibilidad, SEO y primer template) ya están hechas. La lista viva de tareas está en `AGENTS.md` §12; Ysst guarda además la suya en `mis_datos/PENDIENTES-kit.md`. Antes de empezar cualquier tarea, propónsela a Ysst y espera su confirmación. Candidatas que no necesitan nada de fuera de `kit`:

- **Analítica nivel Básico (core 0.5.0):** campo `analitica.vercel` + mención en la política de privacidad, siguiendo `docs/cambio-de-plan.md`. Ysst aún no ha confirmado los límites de Vercel Analytics: pregúntale antes.
- **«Falso 404»:** con Next 16 y el prerender parcial, un slug inexistente devuelve 200 en la primera visita y 404 en las siguientes. Hay que investigarlo y proponer el arreglo.
- **`docs/nuevo-template.md`:** el proceso de diseño a template, a partir de cómo se integraron el `-3` y el `-1` (ver el historial de Git y `AGENTS.md` §7).

## 4. Fuera de alcance en la web

- Cualquier cosa de `mis_datos/` fuera de `kit`.
- La configuración de Vercel y los repos de las webs (`web-*`).
- Fusionar PRs o publicar a mano (`pnpm publish`).
