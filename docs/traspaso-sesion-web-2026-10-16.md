# Traspaso: sesión de Claude Code en la web del 16/10/2026

> **Agente (sesión local):** lee primero `AGENTS.md` entero y después este documento. Aquí está lo que se hizo en la sesión web del 16/10/2026, lo que quedó a medias y en qué orden seguir. Si algo de aquí contradice `AGENTS.md`, manda `AGENTS.md`: avisa a Ysst de la contradicción. Las reglas para trabajar con Ysst (§2 de `AGENTS.md`: un paso cada vez, avisar antes de contactar con GitHub, explicar antes de implementar) siguen igual.

## 1. Resumen en una frase

Se integraron los 3 templates de electricidad (`templates/electricidad/electricidad-1/2/3`), se crearon y desplegaron 3 demos con datos ficticios (`Andrei-Leads/electricidad_1/2/3`) y quedaron pendientes las fotos de IA, la limpieza de los `PENDIENTES.md` de las demos y dos datos por confirmar.

## 2. Lo que se hizo

### 2.1 `kit` (todo fusionado en `main`)

| PR | Qué |
|---|---|
| #5 | Documentación al día: core 0.5.0 publicada, `docs/sesion-web.md` con el estado y cómo integrar templates desde una sesión web |
| #6 | Templates `electricidad-1` «Boletín», `-2` «Del barrio» y `-3` «Sin sorpresas», prompts de fotos en `docs/fotos-ejemplo/electricidad-<n>/prompts-chatgpt.md` y `AGENTS.md` (§4 y §12) |

Los 3 templates siguieron `docs/nuevo-template.md`, pasos 4–7: revisión de la entrega de Claude Design, plan, construcción por fases y comprobaciones completas del paso 7. Esto último incluye build, lint, greps, HTML, variantes de datos y Playwright a 320, 375 y 1280 px. Los 6 templates del repo compilan y pasan el lint juntos.

| Template | Concepto | Pieza clave | Tipografía | Prompts de fotos |
|---|---|---|---|---|
| `electricidad-1` «Boletín» | Urgencias, objetivo contenido/SEO. Documento técnico en papel blanco | El trámite paso a paso y una guía larga por servicio | JetBrains Mono + Hanken Grotesk | 9 fotos, 4:3 |
| `electricidad-2` «Del barrio» | Urgencias, objetivo confianza. Foto a sangre y cortes diagonales | Reseñas a gran tamaño (con 0 reseñas, «Por qué fiarte»). Barra móvil combinada [Menú][Llamar][WhatsApp] | Source Serif 4 (eje `opsz`) + Source Sans 3 | 11 fotos (hero 4:5, servicios 3:2, resto 4:3) |
| `electricidad-3` «Sin sorpresas» | Urgencias, objetivo urgencia. Paleta oscura y manchas orgánicas | «Lo que cuesta», con 3 modos según haya tarifas, solo precio «desde» o ningún precio. Índice lateral en escritorio | Fira Sans | 10 fotos (hero 16:9, 4:3 y 1:1) |

**Decisiones de Ysst que valen para los 3** (y conviene repetir en los próximos templates):

1. **Nombre y logo:** el nombre del negocio se ve siempre (máximo 2 líneas, nunca «…»). El logo va a 32 px con `alt=""`. No hay variante «solo logo».
2. **Preguntas frecuentes:** Accordion de shadcn con `forceMount`, para que las respuestas cerradas sigan en el HTML (solo se ocultan con JS) y sin animar `height`.
3. **Precio:** la etiqueta «DESDE» solo sale si `precioDesde` empieza por «desde». Si no, se muestra el texto tal cual.
4. **WhatsApp de servicio:** el botón dice «Pide presupuesto de {servicio} por WhatsApp», nunca «Pide tu…».
5. **Barra móvil:** el WhatsApp lleva el mensaje general en todas las páginas (brief §7).
6. **Transición del botón de llamada del hero:** solo cambia el color en hover y se deja.
7. **Página 404 propia en español:** se hará en un PR aparte, para todos los templates.

**Decisiones propias de cada template:**
- `-2`: las acreditaciones se muestran con el nombre completo (el diseño lo recortaba en la primera coma).
- `-3`: `/servicios` va con la rejilla primero, sin el bloque «Precios por servicio». Si no hay tarifas, «Lo que cuesta» en `/servicios` pasa a «¿Cuánto me costará?».

### 2.2 Demos (repos públicos en Vercel Hobby)

| Repo | Template | Negocio ficticio | Municipio |
|---|---|---|---|
| `Andrei-Leads/electricidad_1` | `electricidad-1` | Llopis Electricistas | Paterna |
| `Andrei-Leads/electricidad_2` | `electricidad-2` | Ribes e Hijo Electricistas | Patraix (Valencia) |
| `Andrei-Leads/electricidad_3` | `electricidad-3` | Corrent Electricistas | Torrent |

- **Origen:** copia del template con core `^0.5.0`, `.npmrc` con solo el registro y datos ficticios validados contra el contrato. Cada repo trae su `PENDIENTES.md`.
- **Hecho por Ysst en local:** el lockfile (commit `pnpm-lock`), su móvil en `telefono` y `whatsapp`, el commit «Datos: móvil de Ysst y seo.url de Vercel», el despliegue en Vercel y la comprobación del paso 12 desde el móvil.
- **Nombres:** comprobados en Google y Maps; no existen.
- **Precios ficticios:** se quedan de momento.
- **Analítica** (commit «Analítica: Vercel Web Analytics (plan Básico)» en los 3 repos): `analitica: { vercel: true }`. El build de cada demo se probó dentro de `kit` y `/privacidad` sale con «Estadísticas de visitas».
- **Nombre de los repos:** no siguen la convención `web-<cliente>` de `AGENTS.md`; fue decisión de Ysst para las demos.

## 3. Pendiente, en orden

1. **Activar Analytics en los 3 proyectos de Vercel** (lo hace Ysst en el navegador: proyecto → *Analytics* → *Enable*). Sin eso, el script no recibe nada. Comprobación: `docs/nuevo-cliente.md`, paso 13 (en DevTools → Red, un `script.js` del propio dominio y ninguna cookie).
2. **Confirmar el teléfono de `electricidad_2`:** en su `site.config.ts`, `telefono` y `whatsapp` difieren en un dígito; en `_1` y `_3` coinciden. Lo más probable es una errata. Pregunta a Ysst cuál es el bueno, corrígelo, haz `pnpm build`, el commit y el push (lo ejecuta Ysst).
3. **Confirmar `seo.url` en las 3 demos:** sigue siendo `https://electricidad-<n>.vercel.app` con el comentario `// PROVISIONAL…`.
   - **Si es el dominio fijo real del proyecto** (Vercel → *Domains*): quita solo el comentario.
   - **Si no:** pon el real.
   - Comprobación: `curl -s "$URL/" | grep -o '<link rel="canonical"[^>]*>'` debe mostrar esa URL.
4. **`PENDIENTES.md` de cada demo:** tacha o borra lo ya hecho (lockfile, móvil, nombre, Vercel, paso 12, analítica) y deja solo lo que falte: precios ficticios y fotos. Cuando no quede nada, borra el archivo.
5. **Fotos de IA de los 3 templates** (30 en total). Ysst las genera con ChatGPT siguiendo `docs/fotos-ejemplo/electricidad-<n>/prompts-chatgpt.md` y las guarda como `mis_datos/fotos-ejemplo/electricidad-<n>/<n>.<m>.png`. Después, el agente (proceso de `docs/nuevo-template.md`, paso 9):
   1. Hace una hoja de contactos y revisa: sin caras, sin texto ni logos legibles, el «antes» con el daño visible y la esquina o franja de la etiqueta «Foto de ejemplo» libre. Esa zona cambia por template: `-1` abajo a la izquierda, `-2` arriba a la derecha y `-3` en la franja inferior central.
   2. Convierte cada foto a JPG con Pillow (`python3 -I`): calidad ~82, recortada a la proporción de su `CREDITOS.md`, lado largo ≤ 1600 px sin ampliar y con el **nombre exacto** del archivo de relleno.
   3. Sustituye el relleno en `kit/templates/electricidad/electricidad-<n>/public/ejemplo/` y actualiza `CREDITOS.md` (origen «Generada con IA (ChatGPT, OpenAI)»).
   4. Revisa que cada `alt` de `site.config.ts` describe lo que se ve de verdad. Hazlo en el template **y** en el `site.config.ts` de la demo, porque los datos de las demos son distintos.
   5. Copia las mismas fotos a `public/ejemplo/` de cada demo.
   6. Hace commit en `kit` (rama y PR) y en cada demo (Ysst hace el push).
6. **Página 404 propia** (`app/not-found.tsx`) en español, con el diseño de cada template, en los 6 templates y en un PR aparte. Hoy sale el 404 de Next en inglés y, en una ruta sin datos como `/trabajos` sin trabajos ni galería, la página sale en blanco sin JavaScript. Al hacerlo, mira también el «falso 404»: con `cacheComponents`, un slug dinámico inexistente puede devolver 200 en la primera petición.
7. **Más adelante:** nichos de fontanería y pérgolas (encargos ya escritos en `mis_datos/encargos-claude-design/`).

## 4. Lecciones de la sesión web (para no repetirlas)

- **Sin token de GitHub Packages en la nube.** Una sesión web no puede hacer `pnpm install` de una web de cliente: da `401`. El lockfile de una demo lo genera Ysst en local. Lo que sí se puede hacer es validar los datos de una demo copiándolos al template de `kit` (core sale del workspace), compilar y restaurar el original.
- **GitHub App de Claude.** Para que una sesión web haga push, la app tiene que estar instalada en la org `Andrei-Leads` con acceso al repo. Sin ella: `403`.
- **Varios agentes en paralelo sobre el mismo template:**
  - comparten `.next`, así que todo build, servidor o variante de `site.config.ts` va dentro de `flock`;
  - un `next start` lanzado dentro de `flock` hereda el descriptor y retiene el lock: hay que cerrar los descriptores 3–9 al arrancarlo;
  - con `pnpm install` una sola vez para todos los esqueletos, `pnpm-lock.yaml` cambia una sola vez.
- **Archivos sueltos de los agentes.** Hay que revisarlos antes de cada commit: aparecieron logs y PID en la raíz de `kit` y un `srv-probe.log` llegó a commitearse dentro de un template (ya borrado).
- **Revisión visual de las entregas de Claude Design.** Los `.dc.html` se pueden renderizar con Playwright sirviendo React y Babel en local; sirve para medir el hero a 375×667 antes de construir.

## 5. Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Templates | `kit/templates/electricidad/electricidad-{1,2,3}` |
| Prompts de fotos | `kit/docs/fotos-ejemplo/electricidad-{1,2,3}/prompts-chatgpt.md` |
| Entregas de Claude Design y encargos | Los zips que subió Ysst, con el encargo dentro de `uploads/`; consérvalos en `mis_datos/designs/electricidad/<n>/` |
| Demos | Repos `Andrei-Leads/electricidad_{1,2,3}` (clonados por Ysst en `mis_datos/`) |
| Proceso de template | `docs/nuevo-template.md` (con la nota de sesión web de `docs/sesion-web.md` §3) |
| Proceso de demo o cliente | `docs/nuevo-cliente.md` |
