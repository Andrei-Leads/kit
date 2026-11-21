# @andrei-leads/core

## 0.6.0

### Minor Changes

- 58b3dd2: Lógica común de los templates en core (todo nuevo, nada cambia en lo que ya existía):
  
  - **Formato:** `telefonoVisible`, `listaY`, `mediaVisible`, `direccionLinea` (con `{ provincia: true }` opcional), `urlComoLlegar`, `listaRedes`, `horarioVisible` (fila de urgencias con texto opcional), `iniciales`, `minusculaInicial`, `MESES`, `fechaResena` y `precioDesde`. Tipo `Ancla`.
  - **Mensajes de WhatsApp:** `MENSAJE_GENERICO`, `MENSAJE_NO_ENCONTRADA`, `mensajeGeneral`, `mensajeServicio` y `mensajeTrabajo`. Cada uno acepta el texto por defecto del template.
  - **Rutas y contenido:** `hayTrabajos`, `parametrosServicios` y `parametrosTrabajos` (con el slug de relleno `"_"`, `SLUG_RELLENO`), `buscarServicio`, `buscarTrabajo`, `otrosServicios`, `trabajosDelServicio`, `otrosTrabajos`, `servicioDelTrabajo`, `PASOS_POR_DEFECTO` (urgencias, proyecto y obra técnica) y `pasosProceso`. Tipos `Paso` y `TipoNegocio`.
  
  Una web que no los use no cambia. Para usarlos: importarlos de `@andrei-leads/core` y borrar la copia de `lib/`.
- 2a98eab: Novedades del contrato y de marca (todo opcional; una web que no las use no cambia):
  
  - **`origen?` en toda imagen:** `"cliente"`, `"ficha-google"`, `"ia"` o `"stock"`. `etiquetaOrigen(imagen)` devuelve la etiqueta que hay que pintar: «Imagen generada con IA» (AI Act, art. 50.4) o «Foto de tu ficha de Google». Tipo `OrigenImagen`.
  - **`videoHero?`:** `{ src, srcAv1?, poster }`, con el póster obligatorio. Solo tipo proyecto. El póster entra como imagen de Open Graph después de `imagenesHero[0]`. Tipo `VideoHero`.
  - **`--color-sobre-primario`:** `estiloMarca(config)` devuelve el `style` del `<html>`, con `--color-primario` y el texto que va encima (blanco o `#111111`, el que más contraste dé). Si ninguno llega a 4,5:1, `defineSiteConfig` avisa en la consola sin romper el build. `styles.css` pone `--color-sobre-primario: #ffffff` por defecto. Funciones `colorSobre` y `contraste`.
  
  Para usar el color calculado: en `app/layout.tsx`, `<html lang="es" style={estiloMarca(config)}>`, y en el CSS, el texto sobre el primario con `text-sobre-primario`.

## 0.5.1

### Patch Changes

- 3186b39: Menos JavaScript en el navegador: core declara `"sideEffects": ["./styles.css"]`. Cuando un componente cliente del template usa un botón de core (por ejemplo, el `BotonWhatsApp` del asistente de WhatsApp), el navegador ya no descarga zod con todos sus idiomas, el contrato, las legales ni el SEO: unos 300 KB sin comprimir (~65 KB gzip) menos por página (la home de `carpinteria-metalica-1` pasa de 868 a 571 KB). No cambia nada visible ni en `site.config`.
  
  Webs ya entregadas: lo reciben con `pnpm up @andrei-leads/core` desde la carpeta de la web, y después `pnpm build`, commit y push.

## 0.5.0

### Minor Changes

- 6229939: Analítica del plan Básico: `analitica.vercel` (por defecto `false`) con Vercel Web Analytics sin cookies, medición de clics en llamada y WhatsApp (`phone_click`, `whatsapp_click`) y párrafo en la política de privacidad. Nuevo componente `<Analitica config={config} />`, que cada template pone una vez en el `<body>` de `app/layout.tsx`. Sin `analitica.vercel: true`, no cambia nada.
  
  Webs ya entregadas: al actualizar a esta versión no se mide nada hasta añadir `Analitica` al import de `@andrei-leads/core` y `<Analitica config={config} />` en `app/layout.tsx` (después de `<DatosEstructurados>`). Sin ese componente, `analitica: { vercel: true }` solo cambiaría el texto de `/privacidad`.

## 0.4.0

### Minor Changes

- cff17a7: SEO técnico: sitemap, robots, metadatos por página (canonical, Open Graph, Twitter y descripción generada de los datos; legales con `noindex, follow`), JSON-LD `LocalBusiness` con `description` y `openingHoursSpecification` (sin `aggregateRating`), `formatearHorario` y campo nuevo `seo.indexar` (por defecto `false`: la web lleva `noindex`, robots.txt cerrado y sitemap vacío hasta que se ponga `indexar: true`).
  
  Cambio incompatible: `contacto.horario` pasa de texto libre a franjas estructuradas, y el template lo pinta con `formatearHorario(config.contacto.horario)`. Antes: `horario: [{ dias: "Lunes a viernes", horas: "8:00–14:00 y 16:00–19:00" }, { dias: "Urgencias", horas: "24 horas" }]`. Después: `horario: [{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" }, { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "19:00" }]`, y las urgencias solo con `urgencias24h: true`.

## 0.3.0

### Minor Changes

- 3a82b31: Contrato site.config 0.3.0 para webs multipágina: slugs de servicios y trabajos, trabajos, proceso, acreditaciones, garantías, marcas, precios opcionales, empresa, comunidades, valoración y datos registrales en el aviso legal; cambio incompatible: `servicios[].imagen` (texto) pasa a `servicios[].imagenes` (lista de `{ src, alt }`) y `negocio.logo` (texto) pasa a `{ src, alt }`.
- 77ca4a1: Fotos del hero (imagenesHero) en site.config
- 572a88a: Botón de WhatsApp (BotonWhatsApp) con aspecto personalizable

### Patch Changes

- 24ee09d: Botones de llamada y WhatsApp: el nombre accesible es el texto visible (WCAG 2.5.3)

## 0.2.0

### Minor Changes

- 7c19e5a: Galería y FAQ en site.config
- 7810d7c: Páginas legales, BotonLlamada personalizable, email obligatorio y eliminación de saludo

## 0.1.1

### 0.1.1

- prueba
