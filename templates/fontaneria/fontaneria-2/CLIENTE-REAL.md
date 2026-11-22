# fontaneria-2 «Precio cerrado»: pasar a cliente real

Template de fontanería (tipo urgencias). Hero partido foto/texto con la tarjeta de la primera tarifa solapada sobre la foto; la sección estrella son las **tarifas** y la confianza va en un bento (valoración, años, llegada, acreditaciones, garantías, zonas).

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** este diseño vende precios. Sin `tarifas` ni `precioDesde` validados por el cliente pierde su sección estrella (no se rompe: el hero pinta la valoración y las garantías). Si el cliente no quiere publicar precios, valora otro template.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Fontanería Cerezo», un negocio inventado de Madrid. Borra también el comentario de cabecera y el ayudante `img()` si ya no hay fotos en `/ejemplo/`.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B28730415, control inválido a propósito), `sector` (sale en el h1: «{sector} en {ciudad}»), `descripcionCorta` («con precios publicados»), `anioFundacion` (tarjeta «Desde» del bento) y `tipoSchema`.
- [ ] `registroMercantil`: el de ejemplo pone «(dato ficticio)». Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600002002`), `email` (`.example`), `direccion` («Calle de Bravo Murillo 214»), `coordenadas`, `horario` (debe coincidir con la ficha de Google), `tiempoLlegada` («90 min», sale en el bento) y `fichaGoogle` (`cid=000…002`). Con `urgencias24h: true` salen «Urgencias 24 h» y «Llamar 24 h».
- [ ] `zonas`: los municipios reales (el bento resume «Madrid y N municipios más»).
- [ ] `tarifas` y `servicios[].precioDesde`: **todos los precios son ficticios** (marcados `PRECIO FICTICIO`), igual que `tarifas.nota` («IVA incluido…»). Solo cifras validadas por el cliente.
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo.
- [ ] `trabajos`: los 5 son inventados, y `trabajos[].precio` («400–450 €») es ficticio. Ver §2.
- [ ] `valoracion` (4,7 / 212) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: vacío en el ejemplo, así que salen los pasos de core. Pon los del cliente si los tiene.
- [ ] `acreditaciones` (RITE con número ficticio), `garantias` y `marcas`: solo lo que el cliente confirme. Las garantías de ejemplo prometen mucho: «El precio de la web es el de la factura», «Un año de garantía en la mano de obra», «Precio por escrito antes de empezar».
- [ ] `empresa.historia` (Rubén Cerezo, «en 2019 decidimos publicar nuestras tarifas»…), `imagenes` y `equipo`: inventados.
- [ ] `preguntas`: hablan de IVA, desplazamiento dentro de la primera hora, precio por WhatsApp y formas de pago. Revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` (promete «un año de garantía») y `seo.url` (`fontaneria-2.vercel.app` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: el ejemplo no trae; añade las reales si las hay.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (15 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero, la más importante:** `imagenesHero[0]`, **4:5** (1600 px de alto); en móvil se recorta a 4:3 con `object-position: center 40%`, así que el motivo va en el 40 % superior. También es la imagen de Open Graph (vista previa de WhatsApp) y el LCP. Sin foto, el hero sale como un bloque en primario suave con la valoración en grande.
- [ ] **Servicios, 3:2.** Estilo de la demo: luz de día plana, baños y cocinas limpios, sin personas.
- [ ] **Trabajos, 4:3.** Si hay `antes`, con **el mismo encuadre exacto** que el después. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] **Empresa, 3:2:** una foto (furgoneta en el ejemplo). Equipo: foto cuadrada o, sin foto, iniciales.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **«Precio cerrado» o «Precio desde»:** la etiqueta de la tarjeta sale sola de la cifra (`lib/precios.ts`): «Precio cerrado» solo si el precio es un importe único; con «desde», «Precio desde». *Recomendado:* que el cliente confirme que ese importe es el de la factura antes de dejar una cifra única.
- [ ] **Logo:** con `negocio.logo`, va a 32 px junto al nombre. Con un nombre muy largo, el logo se oculta en móvil y entre 960 y 1279 px para que el nombre quepa en 2 líneas.
- [ ] **Color primario:** naranja butano `#c2410c`. `estiloMarca` calcula el texto encima. *Recomendado:* un color de marca medio u oscuro; con un amarillo, mira el aviso de contraste del build.
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` (abierta en fontanería; se recomienda mantenerlo).

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, vengo de vuestra web. ¿Me dais precio para esto? Os mando una foto:», el de servicio («Hola, quiero precio para {servicio}. Os mando una foto.») y el de trabajo. O pon `contacto.mensajeWhatsapp` propio.
- `components/secciones/TarifasCerradas.tsx`: «Llama, cuéntanos qué te pasa y te confirmamos el precio antes de salir hacia tu casa.» (con precio cerrado) y «Precios orientativos…». Solo si el cliente lo hace así.
- `components/secciones/CtaFinal.tsx`: «Te decimos el precio por teléfono» y «Antes de ir, ya sabes lo que vas a pagar.».
- «Envíanos una foto por WhatsApp» en `app/page.tsx`, `app/servicios/[slug]/page.tsx` y `CtaFinal.tsx`: solo si el cliente acepta fotos por WhatsApp.
- `app/trabajos/[slug]/page.tsx`: «Quiero algo parecido» y «Quiero precio para algo parecido».
- `lib/formato.ts`: «Llamar 24 h · número» o «Llamar · número», y la línea de horario o valoración.
- `lib/bento.ts`: las tarjetas («Desde {año}», «Llegamos en», «Trabajamos en»). Salen de los datos; comprueba que sean ciertas.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/fontaneria-2/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Decisiones de fontanería aún abiertas (carpeta del proyecto `nueva-generacion/fontaneria-integracion/`): etiqueta «Foto de ejemplo», teléfono con formato de core, menú `popover` y foco con teclado, dependencias sin uso.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Home a 375 px: h1, «Llamar · número» y WhatsApp sin hacer scroll; la tarjeta de precio no tapa el motivo de la foto.
- [ ] Sin precios: no sale la sección de tarifas ni la tarjeta del hero, y nada dice «Precio cerrado».
- [ ] Con un nombre largo y logo, la cabecera cabe en 2 líneas a 375 y a 1024 px.
- [ ] El texto sobre el primario se lee (aviso de `estiloMarca` en el build).
- [ ] La vista previa de la home en WhatsApp muestra la foto real del hero.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Cerezo\|origen: \"ia\"" site.config.ts` no devuelve nada.
