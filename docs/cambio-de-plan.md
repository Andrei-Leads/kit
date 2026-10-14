# SOP: cambiar de plan la web de un cliente (Básico ⇄ Pro)

> **Agente:** este documento es un procedimiento operativo para ti. Ysst abrirá una sesión y te dirá algo como «pasa a `web-<cliente>` al plan Pro». Sigue los pasos en orden, **pregunta antes los datos de §3** y no inventes ninguno. Antes de empezar, lee `AGENTS.md` (sobre todo §2, la forma de trabajar con Ysst, y §7, las reglas sobre terceros).
>
> **Estado (14/10/2026): diseño PROVISIONAL, todavía sin implementar en core.** El nivel Básico llegará previsiblemente en core 0.5.0 y el Pro en 0.6.0. Los nombres de los campos de `site.config` que aparecen aquí son la propuesta. Antes de seguir, comprueba que existen en `packages/core/src/site-config.ts`. **Si no existen, para y díselo a Ysst:** el cambio de plan todavía no se puede hacer. Ysst aún está evaluando los límites de Vercel Web Analytics por plan; cuando se decida, actualiza este documento.

---

## 1. Qué es cada plan

| | **Básico** | **Pro** |
|---|---|---|
| Analítica | Vercel Web Analytics: visitas, páginas, procedencia y dispositivo. Sin cookies y sin nada guardado en el navegador | Lo del Básico + **GA4** + **píxel de Meta** (+ Google Ads si se contrata) |
| Conversiones | — | Clics en `BotonLlamada` y `BotonWhatsApp` enviados como eventos (los pone core) |
| Banner de cookies | **No** | **Sí** (core): «Aceptar» y «Rechazar» al mismo nivel, y enlace «Configurar cookies» en el pie. Sin aceptación no se carga ningún script |
| Política de privacidad | Menciona la medición anónima de Vercel | Generada por core con las herramientas activas y la transferencia a Google y Meta |
| Política de cookies | «Esta web no usa cookies de terceros» | Lista de las cookies de cada herramienta activa |
| Aviso legal | Igual | Igual (no cambia) |
| SEO | `seo.indexar: true` si es un cliente real | Igual, más Search Console verificado |
| Quién ve los datos | Ysst, en su panel de Vercel | Ysst y, si se quiere, el cliente (acceso a GA4) |

*Para un niño de 12 años:* el Básico cuenta cuánta gente entra en la tienda sin mirarles la cara. El Pro, además, pone cámaras, pero solo graba a quien ha dicho que sí.

**Todo el cambio de plan se hace con datos en `site.config.ts`.** No se toca el código del template. Core lee los datos y pone o quita el banner, los scripts, los eventos y los textos legales.

## 2. Comprobaciones previas (hazlas tú, sin preguntar)

1. **Proyecto:** localiza la carpeta `mis_datos/web-<cliente>` y su repo `Andrei-Leads/web-<cliente>`. Si no existe o no está claro cuál es, pregunta.
2. **Versión de core:** `grep andrei-leads package.json`. Para el Básico hace falta core ≥ 0.5.0 y para el Pro, ≥ 0.6.0, previsiblemente: comprueba en `packages/core/CHANGELOG.md` en qué versión llegó cada cosa. Si la web está por debajo, primero hay que actualizar core, siguiendo `docs/publicar-core.md` (sección «Migraciones con cambios incompatibles») y, cuando exista, `docs/actualizar-cliente.md`. Díselo a Ysst antes de seguir.
3. **Estado actual:** lee `site.config.ts` (bloques `seo` y `analitica`) y di a Ysst en qué plan está la web ahora y qué va a cambiar.
4. **Cliente real:** `seo.url` debe ser el dominio definitivo y `seo.indexar: true`. Si no lo es, pregunta. Nunca actives el Pro en una demo con datos ficticios.

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

## 4. Cambio en `site.config.ts` (propuesta de API)

**Básico:**

```ts
analitica: {
  vercel: true,
},
```

**Pro:**

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
- En DevTools → Red, la única petición de analítica va a `/_vercel/insights/…`, en el mismo dominio.
- En Aplicación → Cookies no hay ninguna cookie.

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

- Decidir los límites y el coste de Vercel Web Analytics en Hobby y Pro, y si el Básico lo lleva siempre activado.
- Implementar `analitica.vercel` (core 0.5.0) y el Pro (core 0.6.0); confirmar los nombres finales de los campos.
- `docs/actualizar-cliente.md`, para subir core en una web entregada.
