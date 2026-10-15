# Llevar una versión nueva de core a una web ya entregada

> Agente: guía a Ysst por este proceso **un paso cada vez**, pidiendo la salida de cada comando. Explica el porqué de cada paso la primera vez que salga en la conversación. **No copies código del template a ciegas** (paso 1) y, antes de cualquier comando que contacte con GitHub (`git push`), avisa: lo ejecuta Ysst. No pegues tokens ni el móvil de Ysst en ningún archivo ni comando.

## Cuándo se usa

Cuando una web de cliente (o una demo) ya creada con `docs/nuevo-cliente.md` tiene que pasar a una versión más nueva de `@andrei-leads/core`.

No es obligatorio actualizar: core **no empuja** cambios a las webs. La web queda **congelada** en la versión que instaló (`AGENTS.md` §8) y se actualiza cuando Ysst lo decide: mejoras de SEO o legales que quiere en esa web, un cambio de plan (ver `docs/cambio-de-plan.md`), un arreglo que el cliente necesita. Una web que funciona y no necesita nada nuevo se deja como está.

Probado de principio a fin con `web-metalicas-ejemplo` (core `0.3.0` → `0.4.0`, template `carpinteria-metalica-3`, 14/10/2026).

## Cómo funciona

Una web tiene **dos partes** que se actualizan de forma distinta:

| Parte | Qué es | Cómo se actualiza |
|---|---|---|
| **core** | Paquete en `node_modules` (`@andrei-leads/core`) | Se **sube la versión** con `pnpm add` |
| **Código del template** | `app/`, `components/`, `lib/` de la web | Se **copió** al crear la web y **no se actualiza solo** |

Si la versión nueva de core exige cambios en el template (conectar el SEO, un cambio de contrato…), hay que traer **también** el código del template actualizado desde `kit`. Y si cambia el contrato, hay que migrar el `site.config.ts` de la web.

Versión simple: tu web es una casa con una caja de herramientas común (core) y unos muebles que copiaste de la maqueta (el template). Cambiar la caja por una nueva no cambia los muebles; si las herramientas nuevas piden un enganche nuevo en la pared, tienes que poner también los muebles nuevos, sin tirar tus cosas (los datos del cliente).

## Antes de empezar

- [ ] **Token personal** en `~/.npmrc` (para descargar core). Comprobación: `npm whoami --registry=https://npm.pkg.github.com`. Si falla, ver `docs/publicar-core.md` → «Llave».
- [ ] La versión nueva de core **ya está publicada** (pestaña Packages de la org o `packages/core/CHANGELOG.md`).
- [ ] La web está **sin cambios sin commitear** (`git status --short` limpio en `web-<cliente>/`), para poder deshacer.
- [ ] Sabes qué template usó la web (`<nicho>/<template>`) y su versión actual de core: `grep andrei-leads web-<cliente>/package.json`.

En los ejemplos: `<nicho>/<template>` = carpeta del template en `kit/templates/` (p. ej. `carpinteria-metalica/carpinteria-metalica-3`), `<cliente>` = nombre corto, `^0.N.0` = la versión nueva.

## Procedimiento

### 0. Leer qué cambia

Desde **`kit/`**:

```bash
less packages/core/CHANGELOG.md
```

Lee desde la versión de la web hasta la nueva (p. ej. `0.3.0` → `0.4.0`: todas las entradas intermedias). Anota:

- ¿Hay **cambios incompatibles** en `site.config` (campos que cambian de forma)? Mira también «Migraciones con cambios incompatibles» en `docs/publicar-core.md`.
- ¿El **template** tuvo que cambiar (nuevos archivos como `app/sitemap.ts`, otro uso de un componente)? `git log --oneline -- templates/<nicho>/<template>` en `kit/`.

### 1. Comprobar si la web tiene código propio

Desde **`mis_datos/`** (la carpeta que contiene a `kit` y a `web-<cliente>`):

```bash
diff -rq --exclude=node_modules --exclude=.next --exclude=.git --exclude=tsconfig.tsbuildinfo --exclude=next-env.d.ts kit/templates/<nicho>/<template> web-<cliente>
```

- **Solo difieren** `site.config.ts`, `public/`, `package.json`, `.npmrc`, `pnpm-lock.yaml` y los archivos que el template cambió en `kit` → la web no tiene código propio: **se puede copiar el código** del template (paso 2).
- **Difiere código** de `app/`, `components/` o `lib/` que el template no cambió (cambios propios de la web) → **NO copies a ciegas**: se pisarían. Aplica a mano los cambios del template (míralos con `git log -p -- templates/<nicho>/<template>` en `kit/`) y **pregunta a Ysst** cómo hacerlo.

### 2. Copiar el código del template

Desde **`mis_datos/`**:

```bash
cp -r kit/templates/<nicho>/<template>/app kit/templates/<nicho>/<template>/components kit/templates/<nicho>/<template>/lib web-<cliente>/
cd web-<cliente>
git status --short
```

- `site.config.ts` **no** debe aparecer en `git status` (no se ha tocado; son los datos del cliente). Tampoco `public/`.
- `cp -r` **añade y sobrescribe, pero no borra**: si el template eliminó un archivo, sigue en la web. Compara con el `diff -rq` del paso 1 (aparece como «Only in web-…») y bórralo a mano.
- Si el template no tiene `components/` o `lib/`, quita esa ruta del `cp`.

### 3. Subir core

Desde **`web-<cliente>/`**:

```bash
pnpm add @andrei-leads/core@^0.N.0
grep andrei-leads package.json
readlink -f node_modules/@andrei-leads/core | grep -o 'core@[0-9.]*'
```

- En 0.x, `^0.3.0` **nunca salta a 0.4.0**: hay que pedir la versión nueva de forma explícita (`pnpm up` no basta; ver `docs/publicar-core.md` paso 6).
- El `grep` debe mostrar `"^0.N.0"` y el `readlink` + `grep -o`, `core@0.N.0`. Un `401` = token caducado (ver «Antes de empezar»).

### 4. Migrar `site.config.ts`

Se edita **`web-<cliente>/site.config.ts`** (contenido de un archivo, no comandos), según las notas del paso 0. Ejemplo real **0.3 → 0.4** (horario estructurado):

```ts
// Antes (0.3.x)
horario: [
  { dias: "Lunes a viernes", horas: "8:00–19:00" },
  { dias: "Urgencias", horas: "24 horas" },
],
// Después (0.4.0)
horario: [
  { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "19:00" },
],
urgencias24h: true, // la fila «Urgencias» desaparece: ya la pone esta opción
```

Además, en una **demo**: `seo.url` = la URL de Vercel del proyecto (`https://web-<cliente>.vercel.app`), sin `seo.indexar` (la demo lleva `noindex`). En un cliente real: su dominio y `seo.indexar: true`. Detalle en `docs/nuevo-cliente.md` paso 5.

Si algo no cuadra, el siguiente paso lo dirá en español.

### 5. Compilar

Desde **`web-<cliente>/`**:

```bash
pnpm build
```

**El build es el que manda.** Si un dato tiene mal formato, falla con un mensaje en español que dice qué campo corregir; arréglalo y repite. Si VS Code marca errores de tipos pero el build compila, ver «Problemas frecuentes».

### 6. Verlo en local

Espera a que **termine** el build y, desde **`web-<cliente>/`**:

```bash
pnpm start -p 3005
```

Abre `http://localhost:3005` y revisa lo que cambió (horario, pie, página de contacto…). `Ctrl+C` para pararlo. Si ves fotos antiguas o de otra web, ver «Problemas frecuentes».

### 7. Commit, push y comprobar en producción

Desde **`web-<cliente>/`**:

```bash
git add -A
git status --short
cat .npmrc
git commit -m "Core ^0.N.0: <qué se actualiza>"
```

Revisa que no hay `node_modules/` ni `.next/` y que `.npmrc` tiene solo la línea del registro. Después, **Ysst** ejecuta (contacta con GitHub):

```bash
git push
```

Vercel redespliega solo. Cuando termine, desde **cualquier carpeta**:

```bash
URL=https://web-<cliente>.vercel.app
for r in / /servicios /trabajos /empresa /contacto /aviso-legal /no-existe; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' "$URL$r") $r"
done
curl -s "$URL/robots.txt"
curl -s "$URL/sitemap.xml" | grep -o '<loc>' | wc -l
curl -s "$URL/" | grep -o '<link rel="canonical"[^>]*>'
curl -s "$URL/" | grep -o '<meta name="robots"[^>]*>'
curl -s "$URL/" | grep -o 'openingHoursSpecification' | wc -l
```

Debe salir: `200` en las rutas y `404` en `/no-existe`; el canonical con la URL correcta; demo con `noindex, nofollow`, `Disallow: /` y `0` URLs en el sitemap (cliente real: `index, follow` y una URL por página); y el JSON-LD con `openingHoursSpecification` (una por franja del horario). Comprobación completa en `docs/nuevo-cliente.md` paso 12.

## Problemas frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| VS Code marca errores de tipos que citan la ruta `@andrei-leads+core@0.3.0` (versión vieja), pero `pnpm build` compila bien | El servidor de TypeScript tiene la versión vieja de core en memoria | `Ctrl+Shift+P` → «TypeScript: Restart TS Server». Manda el build, no el editor |
| En local se ven las imágenes de relleno antiguas (o las de otra web) aunque has cambiado las fotos | Next sirve `/_next/image?url=…` con caché de ~4 h y otra web o template se abrió antes en el mismo puerto; `Ctrl+Shift+R` no basta | DevTools (F12) → pestaña **Red** → marcar **Disable cache** y recargar; o usar otro puerto (`pnpm start -p 3006`) |
| `pnpm start` dice «Could not find a production build» | Se lanzó mientras `pnpm build` aún compilaba (o sin build previo) | Esperar a que el build termine; si no se hizo, `pnpm build && pnpm start -p 3005` |
| `pnpm up` no sube core a la versión nueva | Es un minor en 0.x: `^0.3.0` no acepta 0.4.0 | `pnpm add @andrei-leads/core@^0.N.0` (paso 3) |
| `pnpm build` falla con un campo de `site.config.ts` | Cambio incompatible de contrato sin migrar | Paso 4 y `docs/publicar-core.md` → «Migraciones con cambios incompatibles» |
| El build falla en archivos de `app/` tras subir core | El código del template de la web es de la versión vieja | Paso 2 (copiar el código del template) o aplicar a mano sus cambios |
| Tras copiar el template aparecen páginas o archivos que ya no existen en el template | `cp -r` no borra lo eliminado | Borrarlos a mano (los marca el `diff -rq`) |
| `site.config.ts` aparece en `git status` tras el paso 2 | Se copió toda la carpeta del template y se pisaron los datos | `git checkout -- site.config.ts` y repetir copiando solo `app`, `components` y `lib` |
| `401` en `pnpm add` | Token personal caducado | `docs/publicar-core.md` → «Llave» |
| `401` en el build de Vercel | `NPM_RC` mal o token de Vercel caducado | `docs/nuevo-cliente.md` → tabla de problemas |

## Reglas

- **Una web cada vez**, y probada en local antes de `git push`.
- **No toques `public/` ni los datos** del cliente al actualizar, salvo lo que pida la migración.
- Si la web tiene código propio, pregunta a Ysst antes de copiar nada.

## Qué automatizará un script (más adelante)

Pasos 1 a 3 (comprobar diferencias, copiar `app/components/lib`, subir core). La migración de `site.config.ts` y la revisión visual siguen a mano hasta haberlo hecho varias veces.

## Historial

- 14/10/2026: primera actualización real, `web-metalicas-ejemplo` 0.3.0 → 0.4.0. Trampas encontradas: tipos viejos en VS Code, caché de imágenes de Next en el mismo puerto y «Could not find a production build».
