# electricidad-6 «Apagón»: pasar a cliente real

Template de electricidad (tipo urgencias pura). Paleta negra con amarillo de señal, **teléfono gigante** en el hero (sin foto, con un haz de linterna estático) y la sección estrella «De guardia» con cifras grandes (24 h, llegada, años). Barra móvil combinada [Menú][Llamar][WhatsApp].

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

> **Ojo:** el diseño es para un electricista que **coge el teléfono de noche**. Sin `urgencias24h` ni `tiempoLlegada`, «De guardia» pasa a «Cuándo llamarnos» con el horario: funciona, pero pierde la idea. Para un negocio sin urgencias, valora otro template.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Luz de Guardia», un electricista autónomo inventado de Sevilla. Borra también el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal` (persona física en el ejemplo), `nif` (28734519X, letra incorrecta a propósito), `sector` (sale en el h1: «{sector} en {ciudad}»; aquí «Electricista urgente»), `descripcionCorta` («Te decimos cuánto tardamos y cuánto cuesta la salida antes de ir»), `anioFundacion` («Desde {año}» en Guardia) y `tipoSchema`.
- [ ] `registroMercantil`: el ejemplo es autónomo y no lo lleva. Solo en una sociedad, con los datos reales.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600000306`; el teléfono sale a tamaño gigante), `email` (`.example`), `direccion` («Calle Ejemplo, 23»), `horario` («Horario de oficina»; debe coincidir con la ficha de Google) y `fichaGoogle` (`cid=000…306`).
- [ ] `contacto.urgencias24h` y `tiempoLlegada` («30 min»): son las cifras gigantes de Guardia y los chips del hero. **Solo si el cliente los cumple de verdad.**
- [ ] `zonas`: los municipios reales («Llegamos a…»).
- [ ] `servicios`: los del cliente, cada uno con su foto. `contenido`, `incluye` y `preguntas` son de ejemplo (agua tras tormenta, diferencial que no sube…).
- [ ] `tarifas`: **precios ficticios** (salida nocturna, festivo…; marcados `PRECIO FICTICIO`). Bórralos o pon solo cifras validadas por el cliente. La sección se titula «Lo que cuesta».
- [ ] `trabajos`: los 4 son inventados («Avisos resueltos»). Ver §2.
- [ ] `valoracion` (4,9 / 211) y `resenas`: inventadas. Solo las reales de su ficha de Google, o quita los dos campos.
- [ ] `proceso`: no está en el ejemplo, así que salen los pasos de urgencias de core. Pon los del cliente si los tiene.
- [ ] `acreditaciones` (RII «41/000000 (ficticio)») y `garantias` («Precio de la salida antes de ir»…): solo lo que el cliente confirme; en `/empresa` salen bajo «Lo que te garantizamos».
- [ ] `empresa.historia` («Llevo desde 2011…», en primera persona) e `imagenes`: inventados. `equipo` vacío.
- [ ] `preguntas`: revísalas con el cliente.
- [ ] `seo.titulo`, `seo.descripcion` («Llegamos en 30 min y te decimos el precio antes») y `seo.url` (`luzdeguardiaejemplo.example` → el dominio definitivo), más **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes` y `marcas`: vacíos; añade las reales si las hay (`marcas` sale en `/empresa`).

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (13 rellenos grises) y pon las fotos del cliente en `public/`, con `origen: "cliente"` (o `"ficha-google"`). En `/trabajos` no puede haber ni una foto de IA.
- [ ] **El hero no lleva foto** (teléfono gigante sobre negro). La vista previa de WhatsApp (Open Graph) usa la **foto del primer servicio**. Ordena `servicios` para que el primero tenga una buena foto, o pon una en `imagenesHero` solo para Open Graph.
- [ ] **Se recortan en paralelogramo.** Servicios 1:1, trabajos 4:3 (miniaturas de 104–180 px), empresa 3:2. Fotos oscuras con un foco de luz encajan con el diseño; fotos de día muy claras desentonan.
- [ ] **Trabajos con `antes`:** mismo encuadre exacto. Sin trabajos ni `galeria`, `/trabajos` no existe.
- [ ] Sin vídeo: el diseño no usa `videoHero` ni `videoPano`.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y un `alt` que describa la foto.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **Color primario:** amarillo `#ffd21f` sobre negro (cintas, teléfono, botones). Con un primario oscuro del cliente (p. ej. `#1e40af`) la cinta pierde fuerza: la entrega propone un ajuste en core, no hecho. *Recomendado:* mantener un amarillo o naranja claro; si el cliente insiste en su azul, revisa cinta, botones y teléfono en el build.
- [ ] **Página actual en el menú:** este template **no la marca** (para no añadir una isla de JS). Aceptado.
- [ ] **Logo:** con `negocio.logo`, va junto al nombre en la cabecera.
- [ ] **Filtro de `/trabajos`** con anclas `#servicio-<slug>` y `:target` (aceptado).

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, os escribo desde vuestra web por una urgencia eléctrica. Os mando foto:», el de servicio («Hola, quiero información sobre {servicio}.») y el de trabajo («me pasa algo parecido»). O pon `contacto.mensajeWhatsapp` propio.
- `components/Botones.tsx`: «Envíanos una foto de la avería». Solo si el cliente acepta fotos.
- `components/secciones/Guardia.tsx`: «De guardia», «También de madrugada», «Cuándo llamarnos» y «Horario de oficina».
- `components/secciones/CtaFinal.tsx` («¿Sin luz ahora?»), `app/servicios/[slug]/page.tsx` («¿Te pasa ahora?»), `app/trabajos/[slug]/page.tsx` («¿Te ha pasado algo parecido?» · «Cuéntanoslo por WhatsApp»).
- `components/secciones/Resenas.tsx`: «Lo que dicen de noche» (solo con `urgencias24h`).
- `app/empresa/page.tsx`: «Quién coge el teléfono», «De guardia desde {año}» (solo con 24 h o llegada) y «Lo que te garantizamos».
- `app/not-found.tsx`: «Si tienes una avería, llámanos.».

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos de IA de la demo y sus prompts (`docs/fotos-ejemplo/electricidad-6/`) aún no existen. A un cliente real no le hacen falta.
- [ ] Para core más adelante: la descripción de `/trabajos` dice «N trabajos reales» (en un cliente real es cierto), la privacidad habla de «formulario» y el aviso legal muestra el teléfono sin formato.
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (limitación de Next, AGENTS §11).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] Home a 375 px: el teléfono gigante cabe entero en una línea y se puede pulsar; WhatsApp y la barra combinada se ven.
- [ ] Guardia muestra solo cifras ciertas (24 h, llegada, años).
- [ ] Con el primario del cliente, la cinta, los botones y el teléfono se leen sobre negro (aviso de `estiloMarca` en el build).
- [ ] El deslizador de antes/después no salta al cargar y, sin JS, las dos fotos salen en fila.
- [ ] La vista previa de la home en WhatsApp muestra una foto real.
- [ ] `grep -rn "ejemplo\|ficticio\|FICTICIO\|Luz de Guardia\|origen: \"ia\"" site.config.ts` no devuelve nada.
