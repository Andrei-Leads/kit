# SOP: cambiar de plan la web de un cliente (Básico ⇄ Pro)

> **Agente:** este documento es un procedimiento operativo para ti. Ysst abrirá una sesión y te dirá algo como «pasa a `web-<cliente>` al plan Pro». Sigue los pasos en orden, **pregunta antes los datos de §3** y no inventes ninguno. Antes de empezar, lee `AGENTS.md` (sobre todo §2, la forma de trabajar con Ysst, y §7, las reglas sobre terceros).
>
> **Estado (15/10/2026): el Básico está implementado en core 0.5.0** (rama `feat/analitica-vercel`, pendiente de revisión y publicación; hasta que se publique, no está en ninguna web). **El Pro sigue siendo un diseño PROVISIONAL** (core 0.6.0): sus nombres de campos (`ga4`, `metaPixel`, `googleAds`) son la propuesta. Antes de seguir, comprueba en `packages/core/src/site-config.ts` que existen los campos que vas a usar. **Si no existen, para y díselo a Ysst:** ese cambio de plan todavía no se puede hacer.

---

## 1. Qué es cada plan

| | **Básico** | **Pro** |
|---|---|---|
| Analítica | Vercel Web Analytics: visitas, páginas, procedencia y dispositivo. Sin cookies y sin nada guardado en el navegador | Lo del Básico + **GA4** + **píxel de Meta** (+ Google Ads si se contrata) |
| Conversiones | Clics en llamada y WhatsApp (`phone_click`, `whatsapp_click`), **solo visibles con Vercel Pro** | Clics en `BotonLlamada` y `BotonWhatsApp` enviados como eventos (los pone core) |
| Banner de cookies | **No** | **Sí** (core): «Aceptar» y «Rechazar» al mismo nivel, y enlace «Configurar cookies» en el pie. Sin aceptación no se carga ningún script |
| Política de privacidad | Apartado «Estadísticas de visitas» (Vercel Web Analytics, sin cookies) | Generada por core con las herramientas activas y la transferencia a Google y Meta |
| Política de cookies | «Esta web no usa cookies de terceros» | Lista de las cookies de cada herramienta activa |
| Aviso legal | Igual | Igual (no cambia) |
| SEO | `seo.indexar: true` si es un cliente real | Igual, más Search Console verificado |
| Quién ve los datos | Ysst, en su panel de Vercel | Ysst y, si se quiere, el cliente (acceso a GA4) |

*Para un niño de 12 años:* el Básico cuenta cuánta gente entra en la tienda sin mirarles la cara. El Pro, además, pone cámaras, pero solo graba a quien ha dicho que sí.

**Todo el cambio de plan se hace con datos en `site.config.ts`.** No se toca el código del template. Core lee los datos y pone o quita el banner, los scripts, los eventos y los textos legales.

## 1 bis. Plan Básico: activarlo y qué se ve (implementado en core 0.5.0)

**Activarlo** (necesita core ≥ 0.5.0 en la web):
1. Vercel → proyecto → **Analytics** → *Enable*. Sin esto, el script no recibe nada.
2. En el `site.config.ts` **de la web** (contenido de archivo, no comando): `analitica: { vercel: true }` (ver §4).
3. Commit y push (el push lo hace Ysst, §6).

Sirve también en demos: así se sabe si el prospecto abrió su demo. Sin cookies, no necesita banner.

**Qué se ve en el panel de Vercel:** visitas, visitantes, páginas, procedencia, países, dispositivos, navegadores y sistemas operativos. Las navegaciones sin recarga también cuentan. Con Vercel Pro, además, el panel **Events** con `phone_click` y `whatsapp_click` (propiedad `path`: la página donde se hizo el clic). Core los envía sin tocar `BotonLlamada` ni `BotonWhatsApp`. En Hobby los eventos propios se ignoran sin error.

**Límites** (https://vercel.com/docs/analytics/limits-and-pricing, comprobado el 15/10/2026):

| | Hobby | Pro |
|---|---|---|
| Eventos incluidos | 50.000 al mes | Ninguno; 0,03 $ por cada 1.000 eventos |
| Eventos propios | No | Sí, con 2 propiedades por evento |
| Historial | 1 mes | 12 meses |

- Un evento es una visita a una página o un evento propio. Se comparten entre todos los proyectos del equipo.
- En Hobby, al pasar el límite hay 3 días de gracia y después se pausa la recogida hasta el siguiente ciclo de facturación o hasta pasar a Pro (la misma página dice en otro apartado «7 días»); no se cobra nada. Las demos también gastan eventos.

## 2. Comprobaciones previas (hazlas tú, sin preguntar)

1. **Proyecto:** localiza la carpeta `mis_datos/web-<cliente>` y su repo `Andrei-Leads/web-<cliente>`. Si no existe o no está claro cuál es, pregunta.
2. **Versión de core:** `grep andrei-leads package.json`. Para el Básico hace falta core ≥ 0.5.0 y para el Pro, ≥ 0.6.0 (previsto): comprueba en `packages/core/CHANGELOG.md` en qué versión llegó cada cosa. Si la web está por debajo, primero hay que actualizar core, siguiendo `docs/publicar-core.md` (sección «Migraciones con cambios incompatibles») y, cuando exista, `docs/actualizar-cliente.md`. Díselo a Ysst antes de seguir.
3. **`<Analitica>` en el layout:** `grep -n Analitica app/layout.tsx` en la web. Las webs creadas desde un template anterior a 0.5.0 no lo llevan: sin él no se mide nada, aunque `/privacidad` diga que sí. Si no sale nada, añade `Analitica` al import de `@andrei-leads/core` y `<Analitica config={config} />` una vez en el `<body>`, justo después de `<DatosEstructurados config={config} />`. Es el único cambio de código, y solo en esas webs.
4. **Estado actual:** lee `site.config.ts` (bloques `seo` y `analitica`) y di a Ysst en qué plan está la web ahora y qué va a cambiar.
5. **Cliente real:** `seo.url` debe ser el dominio definitivo y `seo.indexar: true`. Si no lo es, pregunta. Nunca actives el Pro en una demo con datos ficticios.

## 3. Datos que debes pedir a Ysst (pide solo los que falten)

| Dato | Formato | Dónde lo encuentra Ysst | Plan |
|---|---|---|---|
| ¿Analytics activado en Vercel para este proyecto? | Sí / no | Vercel → proyecto → pestaña **Analytics** → *Enable* | Básico |
| ID de medición de GA4 | `G-XXXXXXXXXX` | GA4 → Administrar → Flujos de datos → Web | Pro |
| ID del píxel de Meta | Solo números (15–16 dígitos) | Meta Business → Administrador de eventos → Orígenes de datos | Pro, opcional |
| Verificación de Search Console | Valor del meta tag `google-site-verification`, o «verificado por DNS» | Search Console → Añadir propiedad | Pro (recomendable también en el Básico) |
| Google Ads: ID y etiqueta de conversión | `AW-XXXXXXXXX` y `etiqueta` | Google Ads → Objetivos → Conversiones | Pro, solo si hay campañas |
| Confirmación de que el cliente ha contratado el Pro | Sí / no | — | Pro |
| Email de contacto de privacidad, si no es `contacto.email` | email | Cliente | Pro |

Reglas:
- Estos IDs **no son secretos**, porque acaban en el HTML público. Aun así, solo se usan los **del cliente**: nunca reutilices los de otro cliente ni los de Ysst.
- Valida el formato antes de escribirlos. Si alguno no cuadra, pregunta.
- Los tokens o contraseñas de las cuentas de Google o Meta **no se piden nunca**: no hacen falta.

## 4. Cambio en `site.config.ts`

**Básico** (el campo ya existe en core 0.5.0; `vercel` es `false` por defecto):

```ts
analitica: {
  vercel: true,
},
```

**Pro** (propuesta, aún no existe):

```ts
analitica: {
  vercel: true,
  ga4: "G-XXXXXXXXXX",
  metaPixel: "123456789012345", // opcional
  googleAds: { id: "AW-XXXXXXXXX", etiqueta: "xxxx" }, // opcional
},
seo: { titulo: "…", descripcion: "…", url: "https://dominio-del-cliente.es", indexar: true, verificacionGoogle: "…" },
```

**Bajar de Pro a Básico:** quita `ga4`, `metaPixel` y `googleAds`. Core retira solo el banner, los scripts y los textos legales que sobran.

Antes de escribir, enseña a Ysst el diff del bloque. Es un cambio de un archivo de datos, pero altera los textos legales de la web.

## 5. Comprobación en local

Desde `mis_datos/web-<cliente>/` (comando de terminal):

```bash
pnpm install
pnpm build && pnpm start -p 3005
```

Puerto 3005: el 3000 lo usa otro servicio de Ysst. Para el servidor con Ctrl+C, o matando **solo** su PID. Nunca uses `pkill`.

**Básico:**
- No aparece ningún banner.
- El script lo inyecta el navegador: no sale en «ver código fuente». Mira DevTools → Red (o Elementos → `<head>`).
- En DevTools → Red se carga un `script.js` del propio dominio: en local, `/_vercel/insights/script.js`; en Vercel, esa ruta u otra ruta propia del proyecto (`/<ruta-aleatoria>/script.js`). Al navegar entre páginas, envíos al mismo dominio.
- En Aplicación → Cookies no hay ninguna cookie y en Almacenamiento local no hay nada.
- `/privacidad` muestra «Estadísticas de visitas»; `/cookies` no cambia.

**Pro:**
1. Ventana de incógnito: aparece el banner, y antes de aceptar **no hay ninguna petición** a `googletagmanager.com`, `google-analytics.com` ni `connect.facebook.net`.
2. **Rechazar:** sigue sin haber peticiones ni cookies `_ga`/`_fbp`. Al recargar, el banner no vuelve a salir.
3. **Aceptar:** se cargan los scripts y aparecen las cookies.
4. El enlace «Configurar cookies» del pie vuelve a abrir el banner, y al retirar el consentimiento se dejan de enviar datos.
5. Un clic en Llamar y otro en WhatsApp aparecen en GA4 → Informes → **Tiempo real** y en **Probar eventos** de Meta.
6. `/privacidad` y `/cookies` nombran las herramientas activas; `/aviso-legal` no cambia.

## 6. Publicar

1. Commit en la web (`git add -A`, revisa `git status --short` y `git commit -m "Plan Pro: GA4 y Meta con consentimiento"`).
2. **El push lo hace Ysst.** Avísale; no ejecutes comandos que contacten con GitHub sin su permiso. Vercel redespliega solo.
3. Repite en la URL de producción las comprobaciones 1–3 y 6 de §5.
4. **Después:** si Ysst quiere, dale acceso de lectura al cliente en GA4 (Administrar → Gestión de acceso) y apunta en la ficha del cliente la fecha del cambio de plan y los IDs.

## 7. Qué no hacer

- No añadir scripts de terceros a mano en el template o en `layout.tsx`: siempre a través de `site.config` y core.
- No cargar GA4 ni Meta «solo un momento» sin banner, ni siquiera para probar.
- No marcar casillas por defecto en el banner ni esconder «Rechazar».
- No activar el Pro en demos ni con `seo.indexar: false`.
- No tocar el aviso legal por el cambio de plan.

## 8. Pendiente (actualiza este documento al implementarlo)

- Pro (core 0.6.0): GA4, píxel de Meta y Google Ads con banner de consentimiento; confirmar los nombres finales de los campos.
- Publicar core 0.5.0 (revisar y fusionar la rama `feat/analitica-vercel`).
- Mejora del Básico: agrupar en el panel las rutas dinámicas (`/servicios/[slug]`, `/trabajos/[slug]`). Hoy cada URL sale por separado porque core no pasa la `route` a Vercel (lo hace `@vercel/analytics/next`, que core no usa para no depender de `next`).
