# electricidad-5 «Casa al día»: pasar a cliente real

Template de electricidad (tipo urgencias, orientado a instalaciones nuevas: recarga, autoconsumo, domótica). Hero en bento con cifras («Habilitados», años, valoración), servicios en bento de tarjetas con foto, color pleno y menú a pantalla completa.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Tensa Instalaciones», un negocio inventado de Madrid. Borra también el comentario de cabecera. Ojo: `tensa.es` existe; no reutilices el nombre.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B87341259, control inválido a propósito), `sector`, `descripcionCorta` («Te damos el precio antes de empezar y legalizamos la instalación»), `anioFundacion` (cifra de años del hero y de `/empresa`) y `tipoSchema`.
- [ ] `registroMercantil`: el de ejemplo pone «(ficticio)». Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000205`), `email` (`.example`), `direccion` («Calle Ejemplo, 5»), `horario` (debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…305`). Añade `coordenadas` si las tienes.
- [ ] `contacto.urgencias24h` y `tiempoLlegada` («45 min»): solo si el cliente los cumple.
- [ ] `zonas`: los municipios reales.
- [ ] `servicios`: los del cliente, cada uno con su foto (el bento los reparte por tamaño). `contenido`, `incluye` y `preguntas` son de ejemplo.
- [ ] `servicios[].precioDesde`: **precios ficticios** (marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente. Sin ningún `precioDesde`, la home deja de decir «y cuánto cuesta».
- [ ] `trabajos`: los 4 son inventados. Ver §2.
- [ ] `valoracion` (4,7 / 163) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: no está en el ejemplo, así que salen los pasos de urgencias de core. Pon los del cliente si los tiene.
- [ ] `acreditaciones`: la primera da la cifra «Habilitados» del hero con su campo **`corto`** («RII»). Pon la habilitación real con su número real y un `corto` de ≤ 12 caracteres; sin `corto`, sale el nombre completo más pequeño.
- [ ] `garantias` («Precio cerrado antes de empezar», «Instalación certificada», «Dos años de garantía en mano de obra») y `marcas` (Wallbox, Schneider, Somfy): solo lo que el cliente confirme.
- [ ] `empresa.historia` («Empezamos en 2009… seis instaladores»), `imagenes` y `equipo` (Sergio y Laura): inventados.
- [ ] `galeria`: una foto de ejemplo (salón con LED).
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` («Llegamos en 45 min») y `seo.url` (`tensaejemplo.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `instagram.com/tensa.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (16 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero, la más importante:** `imagenesHero[0]`, **4:3** (en escritorio se recorta más ancha). Va dentro de una tarjeta del bento, nunca a sangre ni con texto encima. También es la imagen de Open Graph (vista previa de WhatsApp) y el LCP.
- [ ] **Servicios, 4:3** (algunos 1:1 en el bento; en móvil las tarjetas pequeñas recortan a 1:1). Estilo de la demo: luz natural, casas ordenadas, sin personas ni pantallas legibles.
- [ ] **Trabajos, 4:3.** Si hay `antes`, con el mismo encuadre exacto. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] **Empresa, 3:2.** Galería, 4:3.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Nombre largo (más de 24 caracteres):** en móvil el nombre va en su propia fila y los botones debajo; logo de 36 px + nombre siempre visibles.
- [ ] **Logo:** con `negocio.logo`, va a 36 px junto al nombre.
- [ ] **Color primario:** verde eucalipto `#0f5c4a`. **Tiñe también el fondo y las secciones alternas** (mezclas del 5–20 %), así que cambia toda la web. *Recomendado:* un color de marca medio u oscuro; con uno muy saturado, revisa los fondos y el aviso de contraste del build.
- [ ] **Página actual del menú:** punto de color por CSS (`data-pagina`), sin `aria-current`. Menú a pantalla completa con la isla `CerrarMenuAlSalir` (aceptada).
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` (aceptado).
- [ ] Reseñas muy largas: no se recortan (el diseño cortaba a 6 líneas con «Leer en Google»).

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, os escribo desde vuestra web. Quiero poner al día la instalación de mi casa:», el de servicio («Hola, quiero información sobre {servicio}.»), el de trabajo y los botones «Pregunta por WhatsApp» y «Escríbenos por WhatsApp». O pon `contacto.mensajeWhatsapp` propio.
- `lib/textos.ts`: «Pídenos precio por WhatsApp» (hero y CTA) y «Llamar 24 h» o «Llamar». Sin precios, valora «Escríbenos por WhatsApp».
- `app/servicios/[slug]/page.tsx`: «Precio orientativo» y «Te confirmamos el precio antes de empezar.».
- `components/secciones/CtaFinal.tsx`: «Llámanos y dejamos tu casa al día».
- `app/not-found.tsx`, `app/servicios/page.tsx` («Instalaciones nuevas y averías…»), `components/secciones/ServiciosBento.tsx` («Instalaciones y averías»): si el cliente solo hace averías, cámbialos.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/electricidad-5/`) aún no existen. A un cliente real no le hacen falta.
- [ ] `components/base/BarraMovil`, `MedioHero` y `MenuPopover` no se usan (la barra y el menú son propios en `components/secciones/`); se pueden borrar.
- [ ] Para core más adelante: la descripción de `/trabajos` dice «N trabajos reales» (en un cliente real es cierto), la privacidad habla de «formulario» y el aviso legal muestra el teléfono sin formato.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El bento de servicios no deja huecos con el número real de servicios (en móvil, el último impar ocupa 2 columnas).
- [ ] La cifra «Habilitados» muestra el `corto` real.
- [ ] Con el primario del cliente, fondos, tarjetas y texto se leen (aviso de `estiloMarca` en el build).
- [ ] El menú a pantalla completa abre y cierra sin JS y con Esc.
- [ ] La vista previa de la home en WhatsApp muestra la foto real del hero.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Tensa\|origen: \"ia\"" site.config.ts` no devuelve nada.
