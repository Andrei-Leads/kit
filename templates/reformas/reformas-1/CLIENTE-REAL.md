# reformas-1 «Antes y después» → web de un cliente real

## 1. Qué es

Template de **reformas, tipo proyecto**: el hero es un deslizador antes/después (`AntesDespues`) del primer trabajo con `antes`; la sección estrella son las obras en pares. Serif editorial (Newsreader + Inter), filetes de 1 px, radios 0, paleta cal y papel con primario añil `#2c4a6b`.

**Lee esto antes de rellenar `site.config.ts` de un cliente real; sigue también `docs/nuevo-cliente.md`.** Se rellena el `site.config.ts` de la web del cliente, nunca el del template.

## 2. Datos ficticios que hay que sustituir (todos)

- [ ] `negocio.nombre`, `nombreLegal`, `sector`, `descripcionCorta` (≤ 160), `anioFundacion` (o quitarlo: desaparecen «Desde 2009» y «N años»).
- [ ] `negocio.nif`: `B4618273X` es inválido a propósito.
- [ ] `negocio.registroMercantil`: «… (ficticio)». Solo si es sociedad; si es autónomo, quitarlo.
- [ ] `contacto.telefono` y `whatsapp` (`+34600000110` es ficticio), `email` (`.example`).
- [ ] `contacto.direccion`: «Calle Ejemplo, 41».
- [ ] `contacto.horario`: el de la ficha de Google del cliente, en franjas.
- [ ] `contacto.fichaGoogle`: `cid=0000…110` es ficticio.
- [ ] `zonas`: municipios reales donde trabaja.
- [ ] `servicios`: títulos, descripciones, `contenido`, `incluye` y `preguntas` del cliente. Los textos de ejemplo prometen cosas («precio cerrado», «fecha de fin por contrato», «garantía de 2 años»): solo si el cliente las cumple.
- [ ] `trabajos`: los 5 son inventados (barrios, metros, plazos, testimonios de «Lucía M.»).
- [ ] `trabajos[0].precio`: **PRECIO FICTICIO**, borrarlo salvo cifra validada por el cliente.
- [ ] `valoracion` (4,8 · 127) y las 6 `resenas`: inventadas. Usar las reales de Google o dejar `resenas: []` y quitar `valoracion` (se ocultan).
- [ ] `acreditaciones`: «n.º 00/0000000 (ficticio)». Solo números reales.
- [ ] `garantias`, `marcas`: solo si son ciertas.
- [ ] `empresa.historia` y `equipo`: inventados (Jordi Albardí, etc.).
- [ ] `preguntas`: revisar cada respuesta con el cliente (licencias, plazos, forma de pago).
- [ ] `seo.titulo`, `seo.descripcion`, `seo.url` (`https://reformesalbardi.example` → dominio real o `https://web-<cliente>.vercel.app`) y `seo.indexar: true` solo con datos y fotos reales.
- [ ] `redes.instagram`: `albardi.ejemplo` es ficticio.
- [ ] `analitica: { vercel: true }` si el plan lo incluye (`docs/cambio-de-plan.md`).

## 3. Fotos

Todas las de `public/ejemplo/` son **relleno gris** (tabla en `public/ejemplo/CREDITOS.md`). Las del cliente van en `public/` con `origen: "cliente"` (o `"ficha-google"`). **Nada de IA en `/trabajos` de un cliente real.**

- [ ] **Pares antes/después tomados desde el mismo punto, a la misma altura y con la misma proporción (4:3).** Es la regla de oro del diseño: si el encuadre no coincide, el deslizador no funciona. Pedir al cliente que haga la foto del «antes» antes de empezar cada obra, con el móvil en horizontal y desde la puerta.
- [ ] `trabajos[].imagenes[0]` = «después» 4:3; `trabajos[].antes` = «antes» 4:3. Más fotos de la obra en `imagenes[1…]` (salen en la ficha, 4:3).
- [ ] El hero usa el **primer trabajo con `antes`**: poner primero la mejor obra. Sin ningún `antes`, el hero muestra la foto del primer trabajo; sin trabajos, `imagenesHero[0]`; sin nada, hero tipográfico.
- [ ] `imagenesHero[0]` es también la imagen de Open Graph (vista previa en WhatsApp): poner la mejor foto «después».
- [ ] `servicios[].imagenes[0]` (4:3, miniatura de 120 px y foto de la ficha). Sin foto, la fila no deja hueco.
- [ ] `empresa.imagenes` (3:2). `empresa.equipo[].foto` **no se pinta** en este template (solo nombre y cargo entre filetes): no hace falta pedirla.
- [ ] `galeria`: solo se ve si no hay ningún trabajo (rejilla de 3 en la home y en `/trabajos`). Con trabajos, se ignora.
- [ ] Reescribir el `alt` de cada foto con lo que se ve en la del cliente (los de ejemplo describen las fotos ficticias).
- [ ] La 404 muestra el «antes» de la primera obra que lo tenga; sin ninguno, no hay foto.
- [ ] Sin vídeo: este diseño no usa `videoHero` ni `videoPano`.

## 4. Decisiones con el cliente o con Ysst

- **¿Cuántas obras tienen par antes/después?** Con 0, el template pierde su idea: recomiendo otro template (reformas-3 o -5) o esperar a tener 2–3 pares.
- **Orden de `trabajos`:** la home enseña 4 (primero las que tienen `antes`, en el orden de la lista) y «Ver las N obras» si hay más.
- **`precio` por obra:** convierte, pero solo con cifras del cliente.
- **Color:** `marca.colorPrimario` cambia botones, cursivas y enlaces. Probado con `#1e40af`. Un color claro avisa en el build si no llega a 4,5:1 con su texto.
- **Mensaje de WhatsApp:** por defecto «Hola, he visto vuestros antes y después en la web y quiero presupuesto para mi casa.» (cabecera, barra móvil, hero, CTA, contacto), **aunque ningún trabajo tenga `antes`**: en ese caso, poner `contacto.mensajeWhatsapp`. El de la ficha de servicio es «Hola, quiero presupuesto para {servicio}. ¿Cuándo podríais venir a verlo?» (se cambia con `servicios[].mensajeWhatsapp`); el de la ficha de trabajo, el de core («…he visto el trabajo «{titulo}» y quiero algo parecido.»).
- **Tarifas:** este template no pinta `tarifas` (solo `servicios[].precioDesde` y `trabajos[].precio`). Si el cliente las tiene, van en `precioDesde`.
- **`negocio.tipoSchema`:** `["GeneralContractor"]` en el ejemplo; ajustarlo al negocio (p. ej. `HomeAndConstructionBusiness`).

## 5. Textos fijos que conviene revisar

- `components/secciones/ParesAntesDespues.tsx`: «Obras reales, antes y después.»
- `components/secciones/Asistente.tsx`: «Tres preguntas y *te contestamos* por WhatsApp.» y «No pedimos nombre ni correo…».
- `components/secciones/AsistenteReforma.tsx`: tamaños, plazos y el mensaje («Hola, quiero presupuesto para… Os mando fotos de cómo está ahora.»).
- `components/secciones/Proceso.tsx`: «N pasos, de principio a fin.» (pasos de core si `proceso` está vacío).
- `app/page.tsx` («Lo que reformamos.», «¿Hablamos de tu *reforma*?»), `app/empresa/page.tsx` («Reformamos casas desde {año}.»), `app/contacto/page.tsx` («Escríbenos con fotos y medidas, o llama.»), `app/trabajos/page.tsx`, `app/not-found.tsx` («Esta página está por reformar.»).
- `app/trabajos/page.tsx`: «Obras reales de {ciudad} y alrededores.»; `app/trabajos/[slug]/page.tsx`: «{autor} · Cliente de esta obra».
- `components/secciones/ListaServicios.tsx`: «Ver {servicio}» (suena raro con títulos que empiezan por verbo: «Ver quitar gotelé y pintar»).
- `app/servicios/[slug]/page.tsx`: «Pide presupuesto de {servicio}», «Preguntas sobre {servicio}».
- `components/secciones/Resenas.tsx` («Lo que dicen de nuestras obras»), `PreguntasFrecuentes.tsx` («Lo que nos preguntan antes de firmar.»), `Garantias.tsx` («Desde {año}»).
- `lib/mensajes.ts`: mensajes de WhatsApp por defecto y textos de botón.

## 6. Pendiente

- [ ] Favicon: `app/favicon.ico` es el genérico; poner el del cliente.
- [ ] Prompts de las fotos de ejemplo (`docs/fotos-ejemplo/reformas-1/`, aún sin escribir) y fotos de IA para la demo.
- [ ] Logo: si hay, `negocio.logo` (32 px de alto, `alt=""` junto al nombre).

## 7. Comprobación final

- [ ] `pnpm build` sin errores ni avisos de contraste.
- [ ] Home a 375 px: el botón «Pide presupuesto» se ve sin hacer scroll; el deslizador se arrastra con el dedo y con las flechas del teclado (foco visible en el asa).
- [ ] Sin JavaScript: el par se ve en fila con «Antes» y «Después».
- [ ] En cada par, el «antes» y el «después» coinciden al deslizar (mismo encuadre).
- [ ] Ninguna foto del cliente lleva «Imagen generada con IA» (origen correcto).
- [ ] Rutas 200, slugs inexistentes 404, un `<h1>` por página, `noindex` solo si `indexar` no es `true`.
- [ ] Mensajes de WhatsApp de hero, ficha de servicio, ficha de trabajo y asistente.
