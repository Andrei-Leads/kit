# Crear la web de un cliente y desplegarla en Vercel

> Agente: guía a Ysst por este proceso **un paso cada vez**, pidiendo la salida de cada comando. Explica el porqué de cada paso la primera vez que salga en la conversación. Antes de cualquier comando que contacte con GitHub (`git push`), avisa: lo ejecuta Ysst.

## Cuándo se usa

Cuando se crea una web nueva (demo para un cliente potencial o web de un cliente real) a partir de un template de `kit`.

Probado de principio a fin con `web-metalicas-ejemplo` (template `carpinteria-metalica-3`, core `0.3.0`, 13/10/2026): https://web-metalicas-ejemplo-nu.vercel.app

## Cómo funciona

La web es una **copia** del template en una carpeta propia, **fuera de `kit`**, con su propio repo de Git. Lo único que la une a `kit` es core, que deja de leerse del monorepo (`workspace:^`) y se descarga de GitHub Packages con una versión fija (`^0.N.0`, la publicada). Vercel compila la web desde su repo de GitHub y descarga core con un token de solo lectura.

Versión simple: fotocopias la maqueta, le pones los datos del cliente y la mandas a la imprenta. La pieza común (core) la imprenta la pide al almacén con una llave que solo sirve para mirar.

## Antes de empezar

- [ ] **Token personal** en `~/.npmrc` (para instalar core en local). Comprobación: `npm whoami --registry=https://npm.pkg.github.com` debe devolver tu usuario. Si falla, ver `docs/publicar-core.md` → «Llave».
- [ ] Acceso a **Bitwarden** (token de Vercel «Vercel — leer @andrei-leads/core»).
- [ ] **Template elegido** (`kit/templates/<nicho>/<nicho>-<n>`) y versión publicada de core que usa (hoy, `0.5.1`).
- [ ] **Datos del cliente** (o ficticios, si es una prueba) y **fotos** (reales del cliente, o las de ejemplo del template para una demo).
- [ ] Nombre de la web: `web-<cliente>` (minúsculas y guiones).

## Procedimiento

En los ejemplos: `<template>` = carpeta del template (p. ej. `carpinteria-metalica-3`), `<nicho>` = su nicho (`carpinteria-metalica`), `<cliente>` = nombre corto del cliente.

### 1. Copiar el template

Desde **`andrei-leads-tech/`** (la carpeta que contiene a `kit`; la web debe quedar **fuera** de `kit`, en `webs/clientes/` o, si es una demo, en `webs/demos/`):

```bash
cp -r kit/templates/<nicho>/<template> webs/clientes/web-<cliente>
cd web-<cliente>
rm -rf node_modules .next
```

`node_modules` y `.next` son del monorepo: se borran para instalar y compilar desde cero.

### 2. Desconectar la web de `kit`

Desde **`web-<cliente>/`**:

```bash
sed -i 's/"workspace:[^"]*"/"^0.N.0"/' package.json
sed -i 's/"name": "<template>"/"name": "web-<cliente>"/' package.json
grep -n -E '"name"|andrei-leads' package.json
echo "@andrei-leads:registry=https://npm.pkg.github.com" > .npmrc
```

- El `grep` debe mostrar `"name": "web-<cliente>"` y `"@andrei-leads/core": "^0.N.0"` (`0.N.0` = la versión publicada actual, hoy `0.5.1`: `sed` con el número real, no con `N`).
- El `.npmrc` lleva **solo la dirección del registro**, nunca el token (el token está en `~/.npmrc`). Si llevara `${NPM_TOKEN}`, en local tendría prioridad sobre `~/.npmrc` y daría 401.

### 3. Instalar core desde GitHub Packages

Desde **`web-<cliente>/`**:

```bash
git init
pnpm install
readlink -f node_modules/@andrei-leads/core
```

`readlink` debe apuntar a `…/web-<cliente>/node_modules/.pnpm/@andrei-leads+core@0.N.0_…`: core **descargado**, no enlazado a `kit`. Un `401` aquí = token personal caducado o mal pegado (ver `docs/publicar-core.md`).

`pnpm install` crea `pnpm-lock.yaml`: se commitea (Vercel detecta pnpm por él).

### 4. Compilar fuera de `kit`

Desde **`web-<cliente>/`**:

```bash
pnpm build
```

Prueba de que la web compila con el core descargado, antes de tocar datos. Con `carpinteria-metalica-3` salen 24 páginas. Si luego quieres verla en local, espera a que este build **termine** antes de `pnpm start` (si no: «Could not find a production build»).

### 5. Rellenar `site.config.ts`

Se edita **`web-<cliente>/site.config.ts`**, **nunca** el del template en `kit` (error típico: abrir el archivo equivocado en VS Code; mira la ruta de la pestaña).

- **Cliente real:** sus datos (contrato en `AGENTS.md` §6). Borra todo lo ficticio del ejemplo: precios marcados `PRECIO FICTICIO`, `registroMercantil`, `fichaGoogle`, `valoracion`, reseñas, trabajos y textos que no sean suyos. Precios solo con cifras validadas por el cliente.
- **Demo:** `seo.url` = la URL de Vercel del proyecto (`https://web-<cliente>.vercel.app`), porque de ahí salen el canonical y la imagen de la vista previa al compartir por WhatsApp; con `https://ejemplo.com` la vista previa sale sin foto. Esa URL no se conoce hasta el primer despliegue: pon un valor provisional ahora y corrígelo tras el paso 11 (ver «Corregir `seo.url`» en el paso 12). **Cliente real:** su dominio.
- **Prueba o demo:** en `contacto.telefono` y `contacto.whatsapp`, un número tuyo (formato `+34` + 9 dígitos, sin espacios), para que los botones funcionen sin llamar a un desconocido.
- **Demo para un lead** (SOP de Notion «Lead interesado → web demo»): al revés, los **números reales del negocio**; en el Meet no se pulsan los botones.

Comprobación, desde **`web-<cliente>/`** (no debe salir nada):

```bash
grep -n '+346000000' site.config.ts                            # demo: no queda el número de ejemplo
grep -n -i -E '6000000|ficticio|ejemplo\.com' site.config.ts   # cliente real: no queda nada del ejemplo
```

Si un dato tiene mal formato, `pnpm build` falla con un mensaje en español que dice qué campo corregir.

### 6. Fotos

- **Demo o prueba:** se usan las de ejemplo del template (`public/ejemplo/`, llevan la etiqueta «Foto de ejemplo»). Si `public/ejemplo/CREDITOS.md` marca alguna como `PENDIENTE`:
  1. Genérala con ChatGPT con su prompt de `andrei-leads-tech/material/fotos-ejemplo/<nicho>-<n>/prompts-chatgpt.md`, y guarda el original en `andrei-leads-tech/material/fotos-ejemplo/<nicho>-<n>/`.
  2. Conviértela a JPG: calidad ~82, lado largo ≤ 1600 px (sin ampliar), recortada a la proporción de `CREDITOS.md`, con el **nombre exacto** del hueco.
  3. Actualiza `CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)»).
  4. Revisa que el `alt` en `site.config.ts` describe **lo que se ve en la foto real**, no lo que pedía la ficha.

  Las fotos de ejemplo son del template: hazlo en `kit/templates/<nicho>/<template>/public/ejemplo/` (así sirven a todas las demos) y copia los archivos a la web.
- **Cliente real:** sus fotos reales en `public/` de la web, **fuera de `/ejemplo/`** (la etiqueta desaparece sola), referenciadas desde `site.config.ts` con su `alt`. **Nunca** una foto generada con IA presentada como trabajo suyo.

### 7. Ver la web en local

Desde **`web-<cliente>/`**:

```bash
pnpm build && pnpm start -p 3005
```

Abre `http://localhost:3005`. Se usa modo producción porque `pnpm dev` compila cada página al abrirla (lento). El puerto 3000 lo ocupa otro servicio de Ysst. `Ctrl+C` para pararlo.

### 8. Primer commit

Desde **`web-<cliente>/`**:

```bash
git add -A
git status --short
cat .npmrc
```

Revisa que en `git status` **no** aparecen `node_modules/` ni `.next/`, y que `cat .npmrc` muestra **solo** la línea del registro (sin token). Después:

```bash
git commit -m "Web de <cliente> (template <template>, core 0.N.0)"
git branch -M main
```

### 9. Repo en GitHub

En el **navegador**: `https://github.com/organizations/Andrei-Leads/repositories/new`

- Nombre: `web-<cliente>`.
- **Vacío:** sin README, sin `.gitignore`, sin licencia (si no, el primer push choca).
- Visibilidad: **Public** solo para pruebas con datos ficticios (Vercel Hobby). **Cliente real: Private** (y Vercel Pro).

Desde **`web-<cliente>/`** (contacta con GitHub; lo ejecuta Ysst):

```bash
git remote add origin https://github.com/Andrei-Leads/web-<cliente>.git
git push -u origin main
```

### 10. Dar acceso a Vercel al repo

En el **navegador**: `https://github.com/organizations/Andrei-Leads/settings/installations` → **Vercel** → **Configure** → *Repository access*: **Only select repositories** → añadir `web-<cliente>` → **Save**.

Sin esto, Vercel no ve el repo al importarlo.

### 11. Proyecto en Vercel

En el **navegador**: `https://vercel.com/new` → **Import** junto a `web-<cliente>`.

- Framework: **Next.js**. Root Directory: `./`. Comandos de build e install: **por defecto**.
- **Environment Variables:** nombre `NPM_RC`, entornos **Production** y **Preview**, marcada **Sensitive**. Valor (**contenido de la variable, no un comando**):

  ```
  @andrei-leads:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=<token de solo lectura>
  ```

  El token es el de Bitwarden «Vercel — leer @andrei-leads/core» (classic, solo `read:packages`). **Empieza por `ghp_`**: si lo que copias no empieza así, es otro campo.
- **Deploy.**

Vercel usa `NPM_RC` como `.npmrc` durante el build. La URL que asigna puede llevar un sufijo (p. ej. `web-metalicas-ejemplo-nu.vercel.app`).

### 12. Comprobar el despliegue

Desde **cualquier carpeta**, con la URL de Vercel y un slug real de servicio y de trabajo (salen del título: «Reparación de persianas» → `reparacion-de-persianas`):

```bash
URL=https://web-<cliente>.vercel.app
for r in / /servicios /servicios/<slug> /trabajos /trabajos/<slug> /empresa /contacto /aviso-legal /privacidad /cookies /no-existe; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' "$URL$r") $r"
done
curl -s "$URL/" | grep -o '<meta name="robots"[^>]*>'
curl -s "$URL/robots.txt"
curl -s "$URL/sitemap.xml" | grep -o '<loc>' | wc -l
curl -s "$URL/" | grep -o '<h1' | wc -l
curl -s "$URL/" | grep -o -E 'href="(tel:|https://wa\.me/)[^"?]*' | sort -u
```

Debe salir:

- `200` en todas las rutas y `404` en `/no-existe`.
- Demo (sin `seo.indexar`): `<meta name="robots" content="noindex, nofollow"/>`, `robots.txt` con `Disallow: /` y `0` URLs en el sitemap.
- Cliente real (`seo.indexar: true`, core ≥ 0.4.0): `index, follow`, `robots.txt` con `Allow: /` y `Sitemap: <url>/sitemap.xml`, y en el sitemap una URL por página (sin legales ni servicios sin `contenido`).
- `1` (un solo `<h1>`).
- `tel:` y `wa.me/` con el número correcto.

**Corregir `seo.url` (solo demos):** la URL sale del nombre del **proyecto de Vercel** (el del repo), que puede no coincidir con la carpeta local (pasó: carpeta `web-talleres-martin-valencia-s-l`, repo y URL `web-talleres-martin-valencia-sl`). Con la URL real a la vista, edita `web-<cliente>/site.config.ts` (`seo.url: "https://web-<cliente>.vercel.app"`), `pnpm build`, commit y `git push` (lo ejecuta Ysst); Vercel redespliega solo. Comprueba con `curl -s "$URL/" | grep -o '<link rel="canonical"[^>]*>'` que sale esa URL.

Después, **desde un móvil**: pulsar Llamar y WhatsApp y comprobar que abren con el número y el mensaje precargado.

### 13. Activar la analítica (plan Básico)

Requiere core ≥ 0.5.0 en la web. Sin este paso la web no mide nada. Sirve también en demos (así se sabe si el prospecto abrió su demo).

1. Desde `web-<cliente>/` (comando de terminal): `grep -n Analitica app/layout.tsx`. Debe salir el import y un `<Analitica config={config} />`. Si no sale nada (web creada desde un template anterior a 0.5.0), añade `Analitica` al import de `@andrei-leads/core` y `<Analitica config={config} />` una vez en el `<body>`, justo después de `<DatosEstructurados config={config} />`.
2. En el **navegador**: dashboard de Vercel → el proyecto → **Analytics** → *Enable*. **Antes** del push del paso 4: la ruta del script se mete en el JavaScript durante el build, así que un despliegue anterior al *Enable* pide un `script.js` que da **404** (pasó con 5 demos el 16/10/2026).
3. En `web-<cliente>/site.config.ts` (**contenido de archivo**, no comando; es el de la web, no el del template), añade:

   ```ts
   analitica: {
     vercel: true,
   },
   ```

4. Desde `web-<cliente>/` (comandos de terminal): `pnpm build`, `git add -A` y `git commit -m "Analítica: Vercel Web Analytics"`. El `git push` lo ejecuta Ysst; Vercel redespliega solo.
5. Si *Enable* se pulsó **después** del último despliegue (o ya estaba `vercel: true` y no hay nada que subir): Deployments → el último → **⋯** → **Redeploy**, **desmarcando «Use existing Build Cache»**.

Comprobación con la web desplegada (en el **navegador**, DevTools):

- Red: se carga un `script.js` del propio dominio (`/_vercel/insights/script.js` u otra ruta propia del proyecto) y, al navegar entre páginas, hay envíos al mismo dominio. El script lo inyecta el navegador: no sale en «ver código fuente». Debe dar **200**; un **404** = desplegado antes del *Enable* (paso 5).
- Aplicación → Cookies: vacío. Almacenamiento local: vacío.
- `/privacidad` muestra «Estadísticas de visitas»; `/cookies` no cambia.

Qué se ve en el panel y los límites por plan de Vercel: `docs/cambio-de-plan.md`.

### 14. Cambios posteriores

- Cambios de datos, fotos o diseño en la web: commit y `git push` a `main` desde `web-<cliente>/`; Vercel redespliega solo. Comprobado el 14/10/2026 con `web-metalicas-ejemplo`.
- Llevar una versión nueva de core a una web ya entregada: `docs/actualizar-cliente.md`. La web queda **congelada** en su versión de core hasta que se actualiza a mano.

## Problemas frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| `ERR_PNPM_WORKSPACE_PKG_NOT_FOUND` al instalar | `package.json` sigue con `workspace:^` | Paso 2 (`sed` de `workspace`) |
| `401` en `pnpm install` en local | Token personal caducado o mal pegado en `~/.npmrc`, o el `.npmrc` de la web lleva una línea de token | `npm whoami --registry=https://npm.pkg.github.com`; regenerar según `docs/publicar-core.md`. `.npmrc` de la web: solo la línea del registro |
| `ERR_PNPM_FETCH_401 … Unauthorized` en el build de Vercel, y el log muestra `_authToken=` seguido de algo que **no** es `ghp_…` (pasó: `cn24[hidden]`) | Se copió otro campo de Bitwarden en `NPM_RC` | Project → **Settings → Environment Variables** → editar `NPM_RC` con el token `ghp_…` → Save → **Deployments** → ⋯ → **Redeploy**. Si lo pegado era una contraseña, cámbiala |
| `401` en Vercel con `ghp_…` correcto | Falta `NPM_RC`, está en otro entorno o el token de Vercel ha caducado | Revisar `NPM_RC` (Production y Preview); si caducó, token nuevo en Bitwarden y actualizar `NPM_RC` en **cada** proyecto → Redeploy |
| Cambias datos y la web no cambia | Has editado el `site.config.ts` del template en `kit`, no el de la web | Editar `web-<cliente>/site.config.ts`; mirar la ruta en la pestaña de VS Code |
| `pnpm start` falla con `EADDRINUSE` | El puerto 3000 está ocupado por otro servicio | `pnpm start -p 3005` |
| `pnpm dev` muy lento | Compila cada página al abrirla | `pnpm build && pnpm start -p 3005` |
| Vercel no muestra el repo o pide Pro al importarlo | La GitHub App de Vercel no tiene acceso al repo, o el repo es privado en Hobby | Paso 10; repo público solo para pruebas, Vercel Pro para clientes |
| El primer `git push` es rechazado | El repo se creó con README o `.gitignore` | Borrar el repo y crearlo vacío |
| `node_modules` o `.next` en `git status` | Falta el `.gitignore` del template | Copiar el `.gitignore` del template; `git rm -r --cached node_modules .next` |
| En local se ven fotos antiguas o de otra web | Next cachea `/_next/image` ~4 h y otra web se abrió antes en el mismo puerto | DevTools → Red → **Disable cache** y recargar, o otro puerto (`docs/actualizar-cliente.md` → Problemas frecuentes) |
| `pnpm start` dice «Could not find a production build» | Se lanzó mientras `pnpm build` aún compilaba | Esperar a que termine el build |
| Al compartir la demo por WhatsApp la vista previa sale sin foto | `seo.url` sigue en `https://ejemplo.com` | Poner la URL de Vercel (paso 5 y paso 12) |
| Analytics activado, pero el `script.js` de la ruta propia (`/<16 caracteres>/script.js`) da `404` y el panel no recibe visitas | Se desplegó antes del *Enable*: la ruta va dentro del JavaScript del build | Redeploy sin «Use existing Build Cache», o un `git push` (paso 13.5) |
| `pnpm build` acaba con `SecurityFatalError: Your version of Next.js is affected by a known security vulnerability` | Aviso de Next 16.4.0 (a 22/10/2026); sale una vez y para el build | Repetir `pnpm build` (pasa). En Vercel no apareció. La subida de `next` está pendiente de decidir (`PENDIENTES.md`) |
| `pnpm build` falla con «useContext null» | `NODE_ENV=development` en el shell | `NODE_ENV=production pnpm build` |
| Se pega el contenido de `NPM_RC` en la terminal | Confusión entre comando y contenido | Va en el campo *Value* de Vercel, no en la terminal |

## Antes de un cliente real

- [ ] **Vercel Pro** (Hobby no admite uso comercial ni repos privados de una organización) y repo **privado**.
- [ ] Core **≥ 0.4.0** (SEO técnico) y `seo: { …, indexar: true }` en `site.config.ts`, con `seo.url` = dominio definitivo. Comprobar con el paso 12.
- [ ] **Analítica** activada (paso 13): *Enable* en Vercel y `analitica: { vercel: true }` en el `site.config.ts` de la web.
- [ ] **Fotos reales** del cliente fuera de `public/ejemplo/`; ninguna foto de ejemplo ni generada con IA.
- [ ] `site.config.ts` sin nada ficticio (paso 5) y precios validados por el cliente.

## Qué automatizará `create-site` (más adelante)

Pasos 1 a 4: copiar el template fuera de `kit`, borrar `node_modules` y `.next`, cambiar `workspace:^` por la versión publicada de core y el `name`, crear `.npmrc`, `git init`, `pnpm install`, comprobar `readlink` y `pnpm build`. Más adelante, rellenar `site.config.ts` desde Postgres. GitHub y Vercel siguen a mano hasta que se hayan hecho varias veces.

## Historial

- `web-prueba` (oct 2026): primera prueba de despliegue en Vercel (proceso provisional).
- `web-metalicas-ejemplo` (13/10/2026): proceso completo con `carpinteria-metalica-3` y core `0.3.0` (hoy `0.4.0`); repo público y Vercel Hobby. Trampa encontrada: `NPM_RC` con otro campo de Bitwarden (401).
- `web-talleres-martin-valencia-sl` (22/10/2026): primera demo de un **lead real** con este documento (`carpinteria-metalica-1`, core `0.5.1`). Pasos 9-12 sin problemas; Deployment Protection por defecto no bloquea el dominio de producción `.vercel.app` (rutas 200 desde fuera). Hallazgos: el nombre del repo cambió respecto a la carpeta (corregir `seo.url`), aviso de seguridad de Next en el build local y números reales del negocio en vez de los de Ysst.
