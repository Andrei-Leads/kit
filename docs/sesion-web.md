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

## 2. Estado actual

- **Core 0.3.0 publicada** en GitHub Packages (PR #2 "Version Packages" fusionado). Incluye:
  - `imagenesHero`;
  - `BotonWhatsApp`;
  - el contrato multipágina: trabajos, empresa, tarifas y precios opcionales, proceso, acreditaciones, garantías, marcas, comunidades, valoración y slugs;
  - dos cambios incompatibles: `servicios[].imagen` → `imagenes[]` y `negocio.logo` → `{src, alt}`;
  - el arreglo de accesibilidad de los botones: sin `aria-label`, el nombre accesible es el texto visible (WCAG 2.5.3).
- **No hay PR "Version Packages" abierto ni notas pendientes en `.changeset/`.**
- **El brief nuevo está en `docs/brief-claude-design.md`:** multipágina y con reglas por tipo de negocio (urgencias, proyecto, obra técnica). Se basa en `docs/investigacion-nichos.md`.
- **Carpetas por nicho:** `templates/<nicho>/<nicho>-<n>`. Todavía no existe ninguna; hoy solo están `templates/pergolas` (prueba) y `templates/jardineria-1` (piloto «Rótulo», como referencia).
- **Primer template real: `carpinteria-metalica-1` «Medida»** (tipo proyecto: aluminio y ventanas). Claude Design lo está diseñando. Se integra **solo este** y se lleva hasta el despliegue antes de hacer `-2` «Exposición» y `-3` «Reparaciones»; fontanería y pérgolas, después.
- **Los encargos para Claude Design** (carpintería metálica, fontanería y pérgolas) los tiene Ysst en `mis_datos/encargos-claude-design/`, fuera del repo. Tú no los tienes.

## 3. Tareas, en orden

### Tarea 1: arreglo de accesibilidad de `BotonLlamada` y `BotonWhatsApp` — HECHA y publicada en 0.3.0 (sáltala)

### Tarea 2: SEO técnico en core (si hay tiempo; primero se propone, después se implementa)

**Objetivo:** que cada web de cliente tenga SEO básico automático a partir de su `site.config`, sin trabajo extra.

**Antes de escribir código**, explica a Ysst qué es cada pieza y para qué sirve, con una versión simple. Propón la API y **espera su confirmación**.

Piezas previstas:
- Funciones en core que los templates usarán en `app/sitemap.ts`, `app/robots.ts` y `generateMetadata`:
  - **`sitemap.xml`:** inicio, servicios, trabajos, empresa, contacto y legales, solo las páginas que existan según los datos;
  - **`robots.txt`**, que apunte al sitemap;
  - **metadatos por página:** título, descripción, canonical y Open Graph (con la imagen de `imagenesHero`, si hay);
  - **`noindex`** en `/servicios/<slug>` cuando el servicio no tenga `contenido`.
- **JSON-LD `LocalBusiness`** con el `@type` de `negocio.tipoSchema`: nombre, teléfono, dirección, horario, `areaServed` (zonas) y `url`. **No** incluir `aggregateRating` a partir de `valoracion` (decisión ya tomada: Google lo considera reseñas autopromocionadas).
- Todo lo que se exporte nuevo sale de `src/index.ts`. Si añades archivos fuera de `src/`, añádelos también a `exports`/`files` de `packages/core/package.json`.
- **Es una funcionalidad nueva (nota *minor*):** saldrá en la **0.4.0**.
- Rama `feat/seo-tecnico` y PR hacia `main` (ver §1, Git).

### Tarea 3: primer template real (solo si Ysst trae el diseño de Claude Design)

Si Ysst te pasa el diseño de `carpinteria-metalica-1` «Medida» (un enlace o archivos; en local lo exportará a `mis_datos/disenyo-carpinteria-metalica-1/`):
1. Revisa que cumple `docs/brief-claude-design.md` y su encargo (`carpinteria-metalica-1.md`; pídeselo a Ysst).
2. **Antes de crear nada, propón el plan y espera su confirmación.** El plan debe cubrir:
   - añadir `"templates/*/*"` a `pnpm-workspace.yaml`;
   - qué hacer con `templates/pergolas`: borrarla o moverla, porque el nicho pergolas tendrá su propia carpeta `templates/pergolas/pergolas-n`;
   - crear `templates/carpinteria-metalica/carpinteria-metalica-1` con nombre de paquete `carpinteria-metalica-1`;
   - qué se reutiliza de `jardineria-1`: conexión con core, rutas legales, shadcn sin ensuciar `globals.css`, el año del pie con `"use cache"` y la caída del hero cuando no hay foto.

   Ysst decidió que el frontend lo construya un subagente con un encargo cerrado.

## 4. Fuera de alcance en la web

- Cualquier cosa de `mis_datos/` fuera de `kit`.
- La configuración de Vercel y los repos de clientes (`web-prueba`).
- Fusionar PRs o publicar a mano (`pnpm publish`).
