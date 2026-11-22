# carpinteria-madera-5 «Restauración»: pasar a cliente real

Template de restauración de madera (tipo proyecto: lacado de puertas, muebles antiguos, tarimas, contraventanas, carcoma). El hero es el antes/después de una pieza dentro de un arco, sobre fondo nogal oscuro. El visitante arrastra el tirador para comparar y luego manda una foto de su pieza por WhatsApp.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Taller Pàtina», un negocio inventado de Valencia. Borra también el comentario de cabecera.

- [ ] `negocio`:
  - `nombre` y `nombreLegal` («Amparo Gil Bonet», autónoma inventada).
  - `nif`: el de ejemplo, 48213765Q, tiene la letra de control inválida.
  - `sector`: sale en el h1 como «{sector} en {ciudad}».
  - `descripcionCorta`: sale en el pie y en el hero sin fotos.
  - `anioFundacion`: sale como «Restaurando desde {año}» y como «{n} años» en `/empresa`.
  - `tipoSchema`.
- [ ] `registroMercantil`: solo en una sociedad, con los datos reales. Si es autónomo, no se pone.
- [ ] `contacto`:
  - `telefono` y `whatsapp` (`+34600000515`).
  - `email` (`.example`).
  - `direccion` («Calle Ejemplo, 88, bajo»).
  - `horario`: debe coincidir con la ficha de Google.
  - `mensajeWhatsapp`.
  - `fichaGoogle` (`cid=000…0515`).
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`:
  - Pon los servicios del cliente. Cada servicio necesita su foto.
  - `contenido`, `incluye` y `preguntas` son de ejemplo, por ejemplo «las devolvemos lacadas en una semana» o «lacas al agua que no amarillean». Revísalos con el cliente.
  - **`precioDesde` son PRECIOS FICTICIOS** («desde 140 € por puerta», «desde 260 €»). Bórralos, o pon solo cifras que el cliente haya validado.
- [ ] `trabajos`:
  - Los 5 trabajos son inventados.
  - **`precio` del trabajo de Mislata es FICTICIO** («1.000–1.200 €»).
  - El `testimonio` de El Carme también es inventado.
  - Para las fotos, mira la sección 2.
- [ ] `valoracion` (4,9 / 74) y `resenas`: son inventadas. Pon solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: los 5 pasos de ejemplo prometen cosas. El paso 1 promete «por WhatsApp te decimos si tiene arreglo y un precio orientativo». El paso 3 promete «presupuesto cerrado con plazo de entrega». Pon los pasos reales, o `[]` para usar los 4 de core.
- [ ] `garantias` y `marcas`:
  - Las garantías de ejemplo son «Presupuesto cerrado», «Recogida y entrega incluidas» y «Lacas al agua de bajo olor».
  - Las marcas de ejemplo son Osmo y Rubio Monocoat.
  - Deja solo lo que el cliente confirme.
- [ ] `empresa`:
  - `historia`: la del ejemplo habla de «Amparo» y «Ciutat Vella».
  - `imagenes`.
  - `equipo`: está vacío en el ejemplo.
- [ ] `galeria`: la silla de enea de ejemplo.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo`:
  - Cambia `seo.titulo`, `seo.descripcion` y `seo.url` (`tallerpatina.example` por el dominio definitivo).
  - Añade **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico), y *Enable* en Vercel.
- [ ] `redes`: cambia `instagram.com/tallerpatina.ejemplo` por las redes reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera: son 15 rellenos grises más `CREDITOS.md`. Pon las fotos del cliente en `public/` con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Pares antes/después, lo más importante del diseño:**
  - Cada trabajo con `antes` sale como un par con deslizador.
  - El primero con `antes` es el hero. Su `imagenes[0]` es el LCP y la imagen de Open Graph si no hay `imagenesHero`.
  - El «antes» y el «después» se hacen desde el mismo punto, a la misma altura y con la misma luz. Sin eso, el deslizador no funciona.
  - Proporción 3:2 o 4:3. En el arco se recortan a 1:1 en el hero móvil, a 4:5 en los pares móviles y a 3:2 en escritorio, así que la pieza va centrada.
  - El «antes» se sirve con calidad 60.
- [ ] **Sin ningún `antes`:** el hero muestra `imagenesHero[0]` sola en el arco (o la primera foto del primer trabajo). Sin fotos, el hero es tipográfico, con el arco dibujado.
- [ ] **Servicios, 4:3:** la tarjeta lleva la foto. Un servicio sin foto sale con un icono de línea de la pieza (puerta, mueble, tarima o ventana, según el título).
- [ ] **Empresa, 4:5:** las fotos del taller van en arcos. La primera sale también en «En el taller» cuando no hay vídeo. En el equipo, la foto es cuadrada; sin foto, salen las iniciales. Nunca una cara de IA.
- [ ] **CTA final, 4:5:** usa `galeria[0]` o, si no hay, la primera foto de `empresa.imagenes`.
- [ ] **Vídeo «En el taller»** (opcional):
  - `videoPano` está comentado en el ejemplo.
  - Con un vídeo real del cliente, descoméntalo y pon `src` (H.264, ≤ 2 MB), `srcAv1` y `poster` (16:9, con la acción en el centro: en móvil se recorta a 4:5).
  - Si es de IA, lleva `origen: "ia"` en el póster y sale la etiqueta «Vídeo generado con IA».
  - Sin vídeo, la sección muestra los pasos junto a la primera foto del taller.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto. Si es un par, el `alt` del «antes» describe cómo estaba.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:**
  - El primario es ámbar `#d4893a` por defecto. Va en los botones, los subrayados, las píldoras de precio y el arco dibujado.
  - `estiloMarca` calcula el texto encima de los botones.
  - Si el primario del cliente no llega a 3:1 sobre el nogal, el arco dibujado pasa a crema solo.
  - *Recomendado:* un color medio o claro. Con un azul oscuro, los subrayados y bordes quedan poco visibles sobre el nogal; con `#1e40af` se probó y se lee, pero justo.
- [ ] **Mensaje del asistente** «Hola, quiero {servicio}. {cantidad} {dónde} Os mando una foto.»:
  - Con títulos de servicio como «Muebles antiguos» queda «Hola, quiero muebles antiguos.».
  - *Recomendado:* pendiente de Ysst. La opción es «Hola, quiero presupuesto para {servicio}.».
  - Mientras tanto, conviene elegir títulos de servicio que se lean bien detrás de «quiero».
- [ ] **Texto del botón de la ficha de servicio:**
  - El texto es «Pide presupuesto», sin el nombre del servicio.
  - El nombre del servicio ya va en el mensaje.
- [ ] **Etiqueta «Taller»** en la tarjeta de dirección de `/contacto`: cámbiala si el cliente no tiene taller abierto al público.
- [ ] **Nombre largo:** a partir de 28 caracteres, el nombre baja a 14 px en móvil y el botón «Menú» se queda solo con el icono. Con un logo, el logo va a 32 px al lado del nombre.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: el mensaje general, los de servicio y de trabajo, y los textos de botón «Mándanos una foto de tu pieza», «Pide presupuesto» y «Tengo algo parecido».
- `components/AsistentePieza.tsx`: `CANTIDADES` y `DONDE` (frases fijas del encargo) y «Enviar por WhatsApp».
- `components/secciones/Asistente.tsx`: «Cuéntanos qué pieza tienes» y «Al abrirse WhatsApp, añade una foto.».
- `components/secciones/Restauraciones.tsx`: «Piezas que han vuelto a casa» y «Desliza sobre cada foto para ver cómo llegaron al taller.».
- `components/secciones/CtaFinal.tsx`: «¿Qué pieza quieres recuperar?» y «Mándanos una foto y te decimos qué se puede hacer con ella.». Sin WhatsApp, esta frase pasa a «Llámanos…».
- `app/not-found.tsx`: «Esta página no tiene restauración posible.».
- `components/Iconos.tsx`: `piezaDelServicio` elige el icono por palabras del título (ventan, tarima, mueble, silla…). Un servicio que no encaja sale con la puerta.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos y el vídeo de IA de la demo, y sus prompts (`docs/fotos-ejemplo/carpinteria-madera-5/`), aún no existen. A un cliente real no le hacen falta.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS. Es una limitación de Next (AGENTS §11).
- [ ] Commissioner se carga sin el eje FLAR (el diseño no lo usa).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El deslizador del hero compara bien el par real: la misma pieza, el mismo encuadre y la pieza centrada en el arco 1:1 del móvil.
- [ ] A 375 × 667, el h1 y los dos botones del hero caben encima de la barra móvil. Si el `sector` o la ciudad son largos, el h1 crece; comprueba que «Llamar» sigue visible.
- [ ] El asistente compone bien el mensaje con los servicios reales. Sin JS sale la frase guía y un solo botón con el mensaje general.
- [ ] Sin `whatsapp`: no hay asistente, y los botones pasan a «Llamar al {número}» en relleno.
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Pàtina\|origen: \"ia\"" site.config.ts` no devuelve nada.
