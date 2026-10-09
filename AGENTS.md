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
├─ pnpm-workspace.yaml       # define el monorepo: packages/*, templates/*, apps/*
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
│     ├─ styles.css          # @source "./src";
│     ├─ CHANGELOG.md        # lo genera Changesets
│     └─ src/
│        ├─ index.ts         # API pública (todo lo exportado sale de aquí)
│        ├─ site-config.ts   # esquema Zod del contrato de contenido
│        └─ boton-llamada.tsx
├─ templates/
│  └─ pergolas/              # template DE PRUEBA (no es un diseño real)
└─ apps/                     # vacío por ahora (reservado, p. ej. playground)
```

`pnpm-workspace.yaml`:

```yaml
packages:
  - "packages/*"
  - "templates/*"
  - "apps/*"
```

Cada carpeta dentro de esas rutas que tenga un `package.json` es un proyecto del workspace. Para listarlos: `pnpm ls -r --depth -1` (`pnpm ls -r` sin `--depth -1` lista dependencias, no proyectos).

Para ejecutar algo en un solo proyecto desde la raíz: `pnpm --filter <nombre> <comando>` (por ejemplo, `pnpm --filter pergolas dev`).

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
  "dependencies": { "zod": "…" },
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
| `SiteConfig`, `SiteConfigInput` | Tipos de salida (con valores por defecto aplicados) y de entrada | |
| `BotonLlamada({ telefono })` | Enlace `tel:` con `aria-label` | Usa `bg-emerald-600` **fijo**: decisión pendiente (¿pasar a `bg-primario`?), ver §12 |
| `saludo(nombre)` | Función de prueba del aprendizaje | Candidata a eliminar |

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

| Bloque | Campos (`?` = opcional) |
|---|---|
| `negocio` | `nombre`, `nombreLegal`, `nif` (9 caracteres), `sector`, `descripcionCorta` (≤ 160), `logo?` |
| `contacto` | `telefono` (`+34` + 9 dígitos), `whatsapp?`, `email?`, `direccion` {`calle`, `cp` (5 dígitos), `ciudad`, `provincia`}, `horario` [{`dias`, `horas`}], `coordenadas?` {`lat`, `lng`} |
| `zonas` | lista de municipios (SEO local); por defecto `[]` |
| `servicios` | lista de {`titulo`, `descripcion`, `imagen?`}; **mínimo 1** |
| `resenas` | lista de {`autor`, `texto`, `puntuacion` 1–5}; por defecto `[]` |
| `marca` | `colorPrimario?` (hex `#rrggbb`); por defecto `{}` |
| `seo` | `titulo` (≤ 60), `descripcion` (≤ 160), `url` |
| `redes` | `instagram?`, `facebook?`; por defecto `{}` |

`nombreLegal` y `nif` existen para el aviso legal que exige la LSSI.

**Reglas decididas:**

- **Validación con Zod** (Zod 4: `z.email()`, `z.url()`, `z.prettifyError`). Si un dato obligatorio falta o tiene mal formato, la web **no compila**; nunca se entrega una web rota.
- **El template decide qué secciones salen y en qué orden.** Si una sección no tiene datos (por ejemplo, `resenas` vacío), se oculta: `{resenas.length > 0 && (...)}`.
- **Color de marca:** el template define el suyo por defecto en `globals.css`:

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

**Datos que vendrán del scraper de leads** (gosom/google-maps-scraper → DuckDB → Postgres): nombre, sector, la mayor parte de `contacto`, parte de `zonas`, `resenas` y a veces `redes`. Esto es la base de un futuro generador de `site.config` (§12).

---

## 7. Templates

- **Nombre:** `templates/<nicho>-<n>`, por ejemplo `jardineria-1`, `jardineria-2`, `electricistas-1`. Objetivo: al menos 3 diseños por nicho.
- **`templates/pergolas` es un template de prueba** del aprendizaje, no un diseño real.
- **Estructura de `pergolas`** (creado con `create-next-app`: TypeScript, ESLint, Tailwind v4, App Router, Turbopack, **sin `src/`**):
  - `app/` en la raíz del template (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`).
  - `site.config.ts` en la raíz del template.
  - Alias `@/*` → `./*`, así que se importa con `import config from "@/site.config"`.
  - `templates/pergolas/AGENTS.md` lo generó Next.js (apunta a su documentación); no es de este proyecto.
  - Lleva su propio `.gitignore` (de `create-next-app`); es correcto. Un `.git` dentro de un template **no**, y habría que borrarlo.
- Si `create-next-app` deja un `pnpm-lock.yaml` o un `pnpm-workspace.yaml` dentro del template, se borra: en el monorepo solo cuentan los de la raíz.
- **Qué puede tocar Claude Design:** solo `templates/<nicho>-<n>` (diseño, secciones y tokens). Nunca core. El brief para Claude Design irá en `docs/brief-claude-design.md` (pendiente).

---

## 8. Webs de clientes (proceso manual provisional)

Mientras no existan `docs/nuevo-cliente.md` y el script `create-site`, este es el proceso que se probó con `web-prueba` (carpeta hermana de `kit`, solo local):

```bash
# Desde mis_datos/ (la carpeta que contiene a kit). La web debe quedar FUERA de kit.
cp -r kit/templates/<template> web-<cliente>
cd web-<cliente>
rm -rf node_modules .next
sed -i 's/"workspace:[^"]*"/"^X.Y.Z"/' package.json          # versión publicada de core
sed -i 's/"name": "<template>"/"name": "web-<cliente>"/' package.json
grep andrei-leads package.json                                 # comprobar
echo "@andrei-leads:registry=https://npm.pkg.github.com" > .npmrc
git init
pnpm install
readlink -f node_modules/@andrei-leads/core   # debe apuntar a node_modules/.pnpm/@andrei-leads+core@X.Y.Z…
```

Después hay que rellenar `site.config.ts` con los datos del cliente.

**Comportamiento esperado:** la web queda **congelada** en la versión de core que instaló. Los cambios en `kit/packages/core` no le afectan hasta que se ejecuta `pnpm up @andrei-leads/core` (o `pnpm add @andrei-leads/core@^0.N.0` si es un minor en 0.x; ver `docs/publicar-core.md`).

**Pendiente:** el despliegue en Vercel necesita un token para instalar paquetes privados de GitHub Packages (variable de entorno más `.npmrc`). Está sin resolver; se hará en el piloto.

---

## 9. Procesos documentados (`docs/`)

| Documento | Estado | Úsalo cuando… |
|---|---|---|
| `docs/publicar-core.md` | Listo | Se cambia algo en `packages/core` que debe llegar a las webs |
| `docs/brief-claude-design.md` | Pendiente | Se va a pedir un diseño a Claude Design |
| `docs/nuevo-template.md` | Pendiente (se escribe tras el piloto) | Se convierte un diseño en `templates/<nicho>-<n>` |
| `docs/nuevo-cliente.md` | Pendiente (se escribe tras el piloto) | Se crea la web de un cliente a partir de un template y se despliega |
| `docs/actualizar-cliente.md` | Pendiente | Se lleva una versión nueva de core a una web ya entregada |

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
| **Turborepo aplazado** | Con un solo template no aporta nada; se añade con 3 o 4 templates. |
| **Organización como "My personal account"** | Autónomo = persona física. |

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
| Se pega JSON en la terminal | Confusión entre comando y archivo | Decir siempre "esto va en el archivo X" |

---

## 12. Estado y hoja de ruta

**Hecho (oct 2026):** monorepo pnpm, core con contrato `site.config`, template de prueba `pergolas`, publicación en GitHub Packages, web de cliente de prueba (`web-prueba`), Changesets y Action. Versiones publicadas: `0.1.0` (a mano) y `0.1.1` (por la Action: `aria-label` en `BotonLlamada`).

**Siguiente, en orden:**

1. **Frontera core / template.** Decisiones abiertas que debe tomar Ysst:
   - ¿Componentes shadcn en core (importados) o en cada template (copiados)?
   - ¿`BotonLlamada` pasa a usar `bg-primario`? (Hoy lleva `bg-emerald-600` fijo; usarlo crearía un contrato: todo template debe definir `--color-primario`.)
   - ¿Cabecera, pie de página, aviso legal, privacidad y cookies/consentimiento van en core por defecto?
   - ¿Se elimina `saludo`?
2. **`docs/brief-claude-design.md`:** el mapa visual para Claude Design (estructura del template, catálogo de secciones, tokens, contrato `site.config`). Sin backend ni procesos.
3. **Piloto `jardineria-1`:** Claude Design → template → web de prueba → despliegue en Vercel (resolver el token de paquetes privados).
4. **Escribir `nuevo-template.md`, `nuevo-cliente.md` y `actualizar-cliente.md`** a partir del piloto.
5. **Escalar:** 3 templates por nicho (jardineros, electricistas y los nichos que Ysst decida).

**Más adelante:** Turborepo (con 3 o 4 templates); script `create-site` (automatiza §8); generador de `site.config` desde Postgres (Marshmallow si es Python); integración del changelog con GitHub si llega a haber equipo.

**Avisos con fecha:**

- **Rebrand pendiente** ("Fragua" era la candidata). Si cambia el nombre de la org, cambia el scope del paquete. Hacerlo **antes de entregar la primera web de cliente**; después obliga a tocar cada repo.
- **Token personal de GitHub** (classic, `write:packages` + `repo`, 90 días, guardado en Bitwarden). Si aparece un 401, probablemente ha caducado: ver `docs/publicar-core.md`.
