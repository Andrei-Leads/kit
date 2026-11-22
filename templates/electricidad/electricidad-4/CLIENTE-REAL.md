# electricidad-4 «Cuadro»: pasar a cliente real

Template de electricidad (tipo urgencias). Sin foto en el hero: los servicios se pintan como **módulos de un cuadro eléctrico** en SVG (cada módulo es un enlace a su ficha, con cinta de rotuladora) y una Leyenda debajo con la descripción. La placa del cuadro muestra la acreditación real.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Quadre Nou», un negocio inventado de Valencia. Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B42918376, control inválido a propósito), `sector` (sale en el h1: «{sector} en {ciudad}»), `descripcionCorta` («te decimos el precio antes de tocar nada»), `anioFundacion` («Desde {año} · N años») y `tipoSchema` (`Electrician`).
- [ ] `registroMercantil`: el de ejemplo pone «(ficticio)». Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000104`), `email` (`.example`), `direccion` («Calle Ejemplo, 23, bajo»), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…304`). Añade `coordenadas` si las tienes.
- [ ] `contacto.urgencias24h` y `tiempoLlegada` («35 min»): salen como chips del hero, «Llamar 24 h» y «Atendemos urgencias las 24 horas.». Solo si el cliente los cumple.
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`: los del cliente; **cada uno es un módulo del cuadro**, así que los títulos deben ser cortos (caben en la cinta). `contenido`, `incluye` y `preguntas` son de ejemplo. Un servicio sin foto sale con la palanca grande y su número en la Leyenda.
- [ ] `servicios[].precioDesde` y `tarifas`: **precios ficticios** (marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente.
- [ ] `trabajos`: los 4 son inventados. Ver §2.
- [ ] `valoracion` (4,8 / 96) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: no está en el ejemplo, así que salen los pasos de urgencias de core. Pon los del cliente si los tiene.
- [ ] `acreditaciones`: la primera sale en la **placa del cuadro** con su número («46/000000 (ficticio)»). Solo la habilitación real (RII) con su número real; sin acreditaciones, la placa muestra solo el nombre y la sección se titula «Por qué fiarte».
- [ ] `garantias` y `marcas` (Schneider, Hager, Simon): solo lo que el cliente confirme.
- [ ] `empresa.historia` («Empezamos en 2008 en Ruzafa…»), `imagenes` y `equipo`: inventados.
- [ ] `galeria`: una foto de ejemplo (mecanismos).
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` («Urgencias 24 h y llegada en 35 min») y `seo.url` (`quadrenouejemplo.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/quadrenou.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (15 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **El hero no lleva foto** (el cuadro es el hero). La vista previa de WhatsApp (Open Graph) usa `galeria[0]` y, sin galería, la primera foto de servicio. Elige bien esa foto, o pon una en `imagenesHero` solo para Open Graph.
- [ ] **Servicios y trabajos, 4:3.** Estilo de la demo: frontal, plano, sin personas ni texto legible (cuadros, mecanismos, contadores).
- [ ] **Trabajos con `antes`:** mismo encuadre exacto que el después (el deslizador los superpone). Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] **Empresa, 3:2** (2 fotos). Galería, 1:1.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Nombre largo (más de 22 caracteres):** en móvil la cabecera pasa a dos filas (nombre arriba, Llamar/Menú abajo) y el menú de escritorio espera a 1280 px. Probado con logo y 45 caracteres.
- [ ] **Logo:** con `negocio.logo`, va junto al nombre en la cabecera.
- [ ] **Cabecera por página** (`components/Marco.tsx`) para marcar la página actual sin JS. Si se añade una página, tiene que montar su `Marco`.
- [ ] **Color primario:** naranja de señal `#c2410c` (cintas, pulsador, módulo activo). *Recomendado:* un color de marca medio u oscuro; mira el aviso de contraste del build.
- [ ] **Barra móvil hasta 1024 px** (no 768), porque entre 768 y 1024 no hay WhatsApp en la cabecera.

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, os escribo desde vuestra web. Me ha saltado algo en el cuadro:», el de servicio («Hola, quiero información sobre {servicio}.») y el de trabajo. O pon `contacto.mensajeWhatsapp` propio.
- `components/Botones.tsx`: «Cuéntanoslo por WhatsApp».
- `app/page.tsx`: «¿Ha saltado algo? Llámanos o escríbenos.», «Te decimos qué es por teléfono.» y «¿Estás en la zona? Te decimos a qué hora llegamos.». Solo si el cliente lo hace así.
- `app/contacto/page.tsx`: «Cuéntanos qué ha pasado y te respondemos.».
- `app/servicios/page.tsx`: «Cada módulo del cuadro es un servicio. Toca el que se parezca a lo que te pasa.»; `app/servicios/[slug]/page.tsx`: «¿Es esto lo que te pasa? Llámanos.».
- `components/secciones/CtaFinal.tsx`: «Atendemos urgencias las 24 horas.» (solo con `urgencias24h`).
- `components/secciones/Confianza.tsx`: «Garantías y habilitación», «Habilitación» o «Por qué fiarte», según los datos.
- `lib/formato.ts`: «Llamar 24 h · número» y «Desde {año} · N años».

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/electricidad-4/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Para core más adelante: la descripción de `/trabajos` dice «N trabajos reales» (en un cliente real es cierto), la privacidad habla de «formulario» y el aviso legal muestra el teléfono sin formato.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El cuadro se ve bien con el número real de servicios (con 1 servicio, un cuadro pequeño; desde 768 px, filas de 5) y ninguna cinta corta el título.
- [ ] Home a 375 px: h1, pulsador de llamada y WhatsApp sin hacer scroll.
- [ ] La placa del cuadro muestra la habilitación real y su número.
- [ ] El deslizador de antes/después no salta al cargar y, sin JS, las dos fotos salen en fila.
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Quadre Nou\|origen: \"ia\"" site.config.ts` no devuelve nada.
