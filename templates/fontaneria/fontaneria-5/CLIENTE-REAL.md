# fontaneria-5 «Llegamos»: pasar a cliente real

Template de fontanería (tipo urgencias), pensado para un fontanero de comarca. La sección estrella es una **red de tuberías** (SVG generado al compilar) que sale de la ciudad del taller y llega a cada municipio de `zonas`, con el tiempo de llegada en grande. Fotos en duotono con la esquina cortada.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** el diseño vive de `zonas` y `tiempoLlegada`. Con una sola ciudad y sin tiempo de llegada, la red queda pobre: valora otro template.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Alapont», un fontanero autónomo inventado de Torrent. Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal` (persona física en el ejemplo), `nif` (48291736A, letra incorrecta a propósito), `sector` (sale en el h1: «{sector} en {ciudad} y alrededores»), `descripcionCorta` («saliendo cada día desde Torrent»), `anioFundacion` (cifra de contador: años de oficio) y `tipoSchema`.
- [ ] `registroMercantil`: el ejemplo es autónomo y no lo lleva. Solo en una sociedad, con los datos reales.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600005005`), `email` (`.example`), `direccion` («Avinguda al Vedat 88»: la ciudad es el origen de la red), `coordenadas`, `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…005`).
- [ ] `contacto.tiempoLlegada` («30 min», a tamaño display en el hero) y `urgencias24h`: solo si el cliente los cumple **en todos los municipios** de la lista.
- [ ] `zonas`: los municipios reales (16 en el ejemplo). Cada uno es una rama de la red; las reseñas que nombren un municipio de la lista lo marcan en el texto.
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo (plantas bajas, arquetas, humedades por fuga…).
- [ ] `servicios[].precioDesde` y `tarifas`: **precios ficticios** (marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente.
- [ ] `trabajos`: los 5 son inventados. Ver §2.
- [ ] `valoracion` (4,8 / 97) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 3 pasos de ejemplo prometen «Te damos la hora de llegada y la cumplimos». Pon los del cliente, o `[]` para usar los de core.
- [ ] `acreditaciones` (RITE con número ficticio) y `garantias` («Sin recargo de desplazamiento en l'Horta Sud», «Seis meses de garantía»…): solo lo que el cliente confirme.
- [ ] `empresa.historia`, `imagenes` y `equipo`: inventados.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`fontaneria-5.vercel.app` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes` y `marcas`: el ejemplo no trae; añade las reales si las hay.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (15 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Se ven en duotono** (primario + casi negro) con la esquina cortada, nunca a sangre: valen fotos de móvil normales, con encuadres sencillos (tuberías, arquetas, fachadas). Sin caras.
- [ ] **El hero no lleva foto** (`imagenesHero` no existe en el ejemplo). La vista previa de WhatsApp (Open Graph) usa la **foto del primer servicio**. Ordena `servicios` para que el primero tenga una buena foto, o pon una en `imagenesHero` solo para Open Graph.
- [ ] **Servicios, 3:2. Empresa, 3:2** (2 fotos: taller y detalle).
- [ ] **Trabajos, 4:3.** Si hay `antes`, con el mismo encuadre exacto. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Mensaje de servicio con `{titulo}`:** «Hola, necesito {servicio}. Estoy en (pueblo):» choca con algunos títulos («Hola, necesito humedades por fuga»). *Propuesta abierta:* «Hola, os escribo por {servicio}. Estoy en (pueblo):», o `mensajeWhatsapp` propio en cada servicio.
- [ ] **Tiempo de llegada por municipio:** el contrato solo tiene uno (`tiempoLlegada`). Si el cliente tarda distinto según el pueblo, no lo pongas en la red: deja el tiempo del municipio más lejano o quítalo.
- [ ] **Filtro de `/trabajos`:** aquí el ancla salta a la primera tarjeta del servicio, no filtra (abierta en fontanería).
- [ ] **Logo:** con `negocio.logo`, va junto al nombre en la banda de cabecera.
- [ ] **Color primario:** azul agua `#0b6bcb`. Tiñe la red, las fotos en duotono y la banda. *Recomendado:* un color medio; uno muy claro hace ilegibles las fotos en duotono.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, os escribo desde la web. Estoy en (pueblo y calle) y os mando una foto:», el de servicio y el de trabajo («estoy cerca. ¿Podéis venir?»). O pon `contacto.mensajeWhatsapp` propio.
- «Envíanos una foto por WhatsApp» en `app/page.tsx`, `app/trabajos/page.tsx` y `CtaFinal.tsx`: solo si el cliente acepta fotos.
- `components/secciones/CtaFinal.tsx`: «Estamos cerca. Llama.»; `app/servicios/[slug]/page.tsx`: «¿Lo necesitas ya? Llama.».
- `app/trabajos/page.tsx` («Trabajos hechos cerca de ti»), `app/trabajos/[slug]/page.tsx` («¿Tienes algo parecido cerca?»).
- `app/empresa/page.tsx`: «Desde dónde salimos».
- `lib/red.ts`: el bloque «Salimos de {ciudad}» de la red.
- `lib/formato.ts`: «Llamar 24 h · número» o «Llamar · número», y la línea de horario.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/fontaneria-5/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Decisiones de fontanería aún abiertas (carpeta del proyecto `nueva-generacion/fontaneria-integracion/`): etiqueta «Foto de ejemplo», teléfono con formato de core, menú `popover` y foco con teclado, dependencias sin uso.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] La red se ve bien con el número real de municipios (con 1–3 zonas, las ramas son más largas) y ningún nombre largo se sale.
- [ ] Home a 375 px: h1, llamada y WhatsApp sin hacer scroll; el montante muestra los 6 primeros municipios y «y N más».
- [ ] Las reseñas reales marcan los municipios que nombran (y no marcan nombres que no son municipios).
- [ ] Las fotos reales se leen en duotono con el primario del cliente.
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Alapont\|origen: \"ia\"" site.config.ts` no devuelve nada.
