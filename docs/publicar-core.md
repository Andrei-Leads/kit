# Publicar una versión nueva de `@andrei-leads/core`

> Agente: guía a Ysst por este proceso **un paso cada vez**, pidiendo la salida de cada comando. Explica el porqué de cada paso la primera vez que salga en la conversación.

## Cuándo se usa

Cuando cambias algo en `packages/core` que tiene que llegar a las webs de clientes.

Los cambios **solo** en `templates/`, `docs/` o en archivos de la raíz no necesitan nada de esto: commit y push normal.

## Cómo funciona

Changesets separa el **momento de anotar** del **momento de publicar**:

1. **Anotar:** al hacer un cambio en core, `pnpm changeset` crea una nota en `.changeset/` con el tipo de cambio y una frase. La nota se commitea **en el mismo commit** que el código.
2. **Preparar la versión:** en cada push a `main` con notas pendientes, la Action abre o actualiza un PR llamado **"Version Packages"**. Ese PR sube la versión según la nota más grave, escribe `packages/core/CHANGELOG.md` y borra las notas consumidas.
3. **Publicar:** al fusionar ese PR, la Action ya no encuentra notas pendientes y ejecuta `changeset publish`, que sube a GitHub Packages cualquier versión que aún no esté publicada.

La Action usa `secrets.GITHUB_TOKEN`, un token temporal que GitHub crea para cada ejecución. El token personal de Ysst no interviene.

Versión simple: cada vez que tocas la receta, dejas una nota en un cajón. El día de la edición nueva, la Action abre el cajón, decide el número de versión, escribe el resumen y te pide el visto bueno. Cuando apruebas, la manda al almacén.

## Elegir el tipo de cambio (core está en 0.x)

| Tipo | Úsalo cuando… | Ejemplo | Efecto en 0.x |
|---|---|---|---|
| **patch** (0.1.1 → 0.1.2) | Corriges algo o mejoras sin cambiar cómo se usa | `aria-label`, un arreglo de estilo, un texto | Las webs con `^0.1.x` lo reciben con `pnpm up` |
| **minor** (0.1.x → 0.2.0) | Añades algo nuevo o cambias algo de forma que las webs pueden necesitar ajustes | Campo obligatorio nuevo en `site.config`, cambio de props de un componente | **No** llega con `pnpm up`: hay que ejecutar `pnpm add @andrei-leads/core@^0.2.0` y revisar la web |
| **major** (→ 1.0.0) | Declarar core estable | — | Decisión de Ysst; no la propongas sin motivo |

En 0.x, `^0.1.0` solo acepta `0.1.x`. Ante la duda entre patch y minor: **¿una web existente puede romperse o necesita tocar su `site.config`?** Si es que sí, es minor.

Si se elige mal el tipo y **aún no se ha publicado**, se corrige gratis: edita la nota en `.changeset/*.md` o, si ya existe el PR, la versión en `packages/core/package.json` y el encabezado de `CHANGELOG.md` dentro del PR.

## Procedimiento

Todos los comandos se ejecutan desde la **raíz de `kit`**.

**1. Haz el cambio en `packages/core` y pruébalo en un template:**

```bash
pnpm --filter pergolas dev
```

Comprueba que el cambio se ve **en algo que la página renderiza de verdad**.

**2. Anota el cambio:**

```bash
pnpm changeset
```

- Selecciona `@andrei-leads/core` con la **barra espaciadora** y pulsa Enter.
- Responde a major y minor según la tabla anterior (si contestas "No" a ambos, queda como patch).
- Resumen: una frase en español que diga qué cambia para la web, no cómo está programado. Por ejemplo: "Botón de llamada accesible para lectores de pantalla".

Comprueba la nota:

```bash
cat .changeset/*.md
```

**3. Haz commit del código y la nota juntos, y súbelo:**

```bash
git add .
git commit -m "core: <qué cambia>"
git push
```

**4. Revisa el PR.** En GitHub, en la pestaña **Pull requests** de `kit`, aparece "Version Packages". Comprueba:

- La versión nueva en `packages/core/package.json`.
- La entrada nueva en `packages/core/CHANGELOG.md`.

Si haces más cambios antes de fusionar, cada push con su nota **actualiza el mismo PR**.

**5. Fusiona el PR (Merge).** Después comprueba:

- Pestaña **Actions**: la ejecución de "Release" sale en verde.
- `https://github.com/orgs/Andrei-Leads/packages` → `core` → **Recent versions**: aparece la versión nueva.

**6. Lleva la versión a las webs que la necesiten** (en la carpeta de cada web):

```bash
pnpm up @andrei-leads/core              # patch, o minor dentro del mismo 0.x
pnpm add @andrei-leads/core@^0.N.0      # nuevo minor en 0.x
grep andrei-leads package.json
```

Después, probar la web y hacer commit y push. Esto lo detallará `docs/actualizar-cliente.md` cuando exista.

## Reglas

- **No ejecutes `pnpm changeset version` en local.** Ese paso lo hace la Action en el PR (opción A, con revisión). La única excepción fue la `0.1.1`, durante el aprendizaje.
- **No ejecutes `pnpm publish` a mano**, salvo una emergencia con la Action caída y con el visto bueno de Ysst.
- **Una versión publicada no se puede volver a publicar.** Cada cambio necesita una versión nueva.
- **No edites `CHANGELOG.md` a mano**, salvo para corregir un PR antes de fusionarlo.

## Antes de anotar: checklist de core

- [ ] Todo lo nuevo se exporta desde `src/index.ts`. Si es un archivo nuevo fuera de `src/`, añádelo a `exports` y a `files` en `packages/core/package.json`.
- [ ] Las clases de Tailwind de core están dentro de `src/`, porque `styles.css` solo lee `./src`.
- [ ] No añadas `react` como dependencia normal: es `peerDependency`.
- [ ] Opcional, para ver qué entraría en el paquete: `cd packages/core && pnpm pack && tar -tzf andrei-leads-core-*.tgz`, y **borra el `.tgz`** después.

## Configuración única (ya hecha): por si hay que rehacerla

Situaciones: un PC nuevo, el token caducado o la Action rota.

### Dirección del registro: `kit/.npmrc` (se commitea)

```
@andrei-leads:registry=https://npm.pkg.github.com
```

Cada web de cliente lleva la misma línea en su propio `.npmrc`.

### Llave: `~/.npmrc` (en `/home`, **nunca** en Git)

1. GitHub → foto de perfil → Settings → Developer settings → Personal access tokens → **Tokens (classic)** (`https://github.com/settings/tokens`). Tiene que ser **classic**: GitHub Packages no acepta *fine-grained*.
2. Scopes: `write:packages` (incluye lectura) y `repo` (porque `kit` es privado). Caducidad: 90 días. Nota descriptiva, por ejemplo `kit — publicar e instalar @andrei-leads/core (PC Kubuntu)`.
3. Guárdalo en Bitwarden (GitHub solo lo muestra una vez).
4. Ábrelo con `nano ~/.npmrc` (no con `echo`, para que no quede en el historial) y pon la línea:

   ```
   //npm.pkg.github.com/:_authToken=ghp_…
   ```

   El token se pega completo, tal cual: ya empieza por `ghp_`.
5. `chmod 600 ~/.npmrc`

Comprobación:

```bash
pnpm config get @andrei-leads:registry           # → https://npm.pkg.github.com
npm whoami --registry=https://npm.pkg.github.com  # → tu usuario de GitHub
```

### Campos de publicación en `packages/core/package.json`

`repository` (apunta a `https://github.com/Andrei-Leads/kit.git`), `publishConfig.registry` (`https://npm.pkg.github.com`) y `files` (`["src", "styles.css"]`).

### `.changeset/config.json`

`"access": "restricted"`, `"baseBranch": "main"`, `"commit": false` y changelog por defecto (sin integración de GitHub).

### `.github/workflows/release.yml`

```yaml
name: Release

on:
  push:
    branches: [main]

concurrency: ${{ github.workflow }}-${{ github.ref }}

permissions:
  contents: write
  pull-requests: write
  packages: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4          # lee la versión de "packageManager"
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
          registry-url: https://npm.pkg.github.com
          scope: "@andrei-leads"
      - run: pnpm install --frozen-lockfile
      - uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Ajustes de GitHub

En la **organización** y en el **repo** `kit`: Settings → Actions → General → Workflow permissions → marcar **"Allow GitHub Actions to create and approve pull requests"**.

## Problemas conocidos

| Síntoma | Causa probable | Solución |
|---|---|---|
| `401` al publicar o instalar en local | Token caducado, ausente o mal pegado (por ejemplo, con `ghp_` duplicado) | `npm whoami --registry=https://npm.pkg.github.com`; si falla, regenera el token (sección anterior) |
| `403` al publicar desde la Action | El repo `kit` no tiene permiso de escritura sobre el paquete | Página del paquete `core` → Package settings → Manage Actions access → añadir `kit` con rol **Write** |
| La Action no abre el PR | Falta el permiso de crear PRs | Ver "Ajustes de GitHub" |
| `--frozen-lockfile` falla en la Action | `pnpm-lock.yaml` desactualizado o sin commitear | `pnpm install` en local, commit del lockfile y push |
| "cannot publish over the previously published version" | Cambio publicado sin nota nueva | Crear una nota con `pnpm changeset` |
| Nombre de paquete rechazado | Mayúsculas en el scope | Siempre `@andrei-leads` |
| `pnpm publish` dice que el árbol de Git no está limpio | Archivo sin commitear (por ejemplo, un `.tgz`) | Borrar el archivo o hacer commit |
| Una web no recibe la versión nueva con `pnpm up` | Es un minor en 0.x | `pnpm add @andrei-leads/core@^0.N.0` |

## Historial

- `0.1.0`: publicada a mano (oct 2026), durante el aprendizaje del flujo.
- `0.1.1`: publicada por la Action. `BotonLlamada` con `aria-label`. Se versionó en local de forma excepcional.
