# electricidad-8 «Comunidades y fincas»: pasar a cliente real

Template de electricidad (tipo urgencias, orientado a comunidades de vecinos y administradores de fincas). Estética de dossier en serif (Newsreader) con latón: un «Dossier» con habilitación, seguros y datos de la sociedad para adjuntar al presupuesto, bloque de comunidades en el inicio y página `/comunidades` (excepción aceptada para urgencias, AGENTS §7).

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** el diseño está hecho para un electricista que **trabaja con comunidades**. Sin bloque `comunidades` no hay ni sección ni `/comunidades`, y el resto sigue hablando de edificios y juntas (§4). Para un electricista de particulares, valora otro template.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Escala Instalaciones», un negocio inventado de Valencia. Borra también el comentario de cabecera. Ojo: `web-escala.vercel.app` es la web de otra persona; no lo uses.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B97561842, inventado), `sector` (sale en el h1; aquí «Electricistas para comunidades y fincas»), `descripcionCorta` («Habilitados y con seguro»), `anioFundacion` (cifra «Año de fundación») y `tipoSchema`.
- [ ] `registroMercantil`: el de ejemplo pone «(ficticio)» y sale en el Dossier. Solo en una sociedad, con los datos reales; si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000508`), `email` (`comunidades@…example`), `direccion` («Calle Ejemplo, 52»), `horario` («Horario de oficina»; debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…308`).
- [ ] `contacto.urgencias24h` y `tiempoLlegada` («50 min»): salen en la franja, las cifras y «Llámanos y vamos.». Solo si el cliente los cumple.
- [ ] `zonas`: los municipios reales (también es la cifra «Municipios»).
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo (centralización de contadores, recarga en garaje comunitario, defectos tras inspección…).
- [ ] `trabajos`: los 4 son inventados. Ver §2.
- [ ] `valoracion` (4,6 / 88) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos. Las estrellas se pintan hacia abajo (4,6 → 4 llenas).
- [ ] `proceso`: los 3 pasos de ejemplo prometen «Presupuesto escrito que se puede llevar a la junta» y «Avisamos a los vecinos antes de cada corte». Pon los del cliente, o `[]` para usar los de core.
- [ ] `acreditaciones`: RII («46/IBTE/0000 (ficticio)») y **seguro de responsabilidad civil con su póliza** («(ficticia)»). Son lo que lee el administrador en el Dossier: solo datos reales, con sus números reales.
- [ ] `garantias` («Presupuesto escrito para la junta», «Cortes de luz avisados», «Certificado de cada instalación») y `marcas`: solo lo que el cliente confirme.
- [ ] `comunidades`: `texto` («Trabajamos con administradores de fincas desde 2004…»), `puntos` («Presupuesto para la junta en una semana», «Un único contacto…», «Informe tras cada revisión») e `ieev` (`false`; con `true` sale el aviso «¿Tu edificio tiene más de 50 años?»). Todo es de ejemplo y son promesas: confírmalas con el cliente.
- [ ] `empresa.historia` («hoy somos nueve técnicos»), `imagenes` y `equipo` (Vicente y Marta): inventados.
- [ ] Precios: el ejemplo no trae ninguno. Pon `precioDesde` o `tarifas` solo con cifras validadas por el cliente.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` y `seo.url` (`escalaejemplo.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `facebook.com/escala.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (15 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **Hero:** `imagenesHero[0]`, **4:5** (en móvil se recorta a 3:2 y va bajo el pliegue). Espacios del edificio con verticales corregidas, sin personas. Es también la imagen de Open Graph (vista previa de WhatsApp).
- [ ] **Servicios, trabajos y empresa, 3:2.** Zaguanes, escaleras, cuartos de contadores; nunca vecinos reconocibles ni buzones con nombres legibles.
- [ ] **Trabajos con `antes`:** mismo encuadre exacto. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`. `proceso[].imagen` no se pinta (el proceso es tipográfico).
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Nombre largo (más de 26 caracteres):** la llamada del menú pierde el número (sigue en la franja), el nombre ocupa 2 líneas en escritorio y baja a 14 px en móvil. El menú completo sale desde 1280 px; entre 1024 y 1279, «Menú».
- [ ] **Logo:** con `negocio.logo`, va junto al nombre en la cabecera.
- [ ] **Cabecera por página** (`components/Marco.tsx`) para marcar la página actual sin JS. Si se añade una página, tiene que montar su `Marco`.
- [ ] **Color primario:** latón `#b8892d` (rombos, filetes, botones). *Recomendado:* un color medio u oscuro; mira el aviso de contraste del build.
- [ ] **Cifras del hero a 1280×800:** la fila asoma pero no entra entera (aceptado). Si se quiere entera, bajar `text-display` solo en este template.
- [ ] **Preload de la foto del hero en móvil**, aunque va bajo el pliegue (lo pide el encargo; se podría bajar a `loading="eager"`).
- [ ] **Testimonio en redonda** (no se carga la cursiva de Newsreader, para no sumar una fuente).

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, os escribo desde vuestra web por la instalación eléctrica de un edificio:», el de servicio («Hola, quiero información sobre {servicio}.»), el de trabajo y `MENSAJE_JUNTA` («…querría un presupuesto para la junta:»). O pon `contacto.mensajeWhatsapp` propio.
- `components/Botones.tsx`: «Envíanos fotos de la instalación».
- `components/secciones/Dossier.tsx`: «Lo que el administrador presenta a la junta», «Los números que pide el administrador antes de contratar.» y «Habilitación, garantías y datos de la sociedad en una sola hoja, para adjuntar al presupuesto.».
- `components/secciones/BloqueComunidades.tsx`: «Te ayudamos con la parte eléctrica de lo que pida su inspección.» (con `ieev`).
- `app/comunidades/page.tsx`: «Electricidad para comunidades de vecinos» y «Pide el presupuesto para la próxima junta».
- `components/secciones/CtaFinal.tsx`: «¿Una avería en el edificio? Llámanos y vamos.» (con `urgencias24h`).
- `app/trabajos/page.tsx` («Obras terminadas, con su lugar, su año y su alcance.»), `app/trabajos/[slug]/page.tsx` («¿Quieres algo parecido en tu edificio?»), `app/contacto/page.tsx` («Urgencias las 24 horas», «Horario de oficina»).

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/electricidad-8/`) aún no existen. A un cliente real no le hacen falta.
- [ ] `components/base/MedioHero` no se usa; se puede borrar.
- [ ] Para core más adelante: la descripción de `/trabajos` dice «N trabajos reales» (en un cliente real es cierto), la privacidad habla de «formulario» y el aviso legal muestra el teléfono sin formato.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] El Dossier muestra la habilitación, la póliza y los datos de la sociedad reales, sin ningún «(ficticio)».
- [ ] `/comunidades` existe y sale en el menú, el pie y el sitemap solo si hay bloque `comunidades`; sin él, da 404.
- [ ] Home a 375 px: llamada y WhatsApp sin hacer scroll; el nombre cabe en 2 líneas.
- [ ] El deslizador de antes/después no salta al cargar y, sin JS, las dos fotos salen en fila.
- [ ] La vista previa de la home en WhatsApp muestra la foto real del hero.
- [ ] `grep -rn "ejemplo\|ficticio\|ficticia\|Escala\|origen: \"ia\"" site.config.ts` no devuelve nada.
