# reformas-4 «Diario de obra»: pasar a cliente real

Template de reformas (tipo proyecto) que cuenta la obra como el cuaderno del encargado: tipografía mono sobre negro cálido con latón. El hero es tipográfico, con una cronología de pasos, y las obras se presentan como entradas de diario con fotos **en curso** y terminadas.

**Lee esto antes de rellenar `site.config.ts` de un cliente real. Sigue también `docs/nuevo-cliente.md` de kit.** Todo se cambia en la copia de la web, nunca en `kit/templates/`.

## 1. Datos que hay que sustituir (`site.config.ts`)

Todo el archivo es de «Reformas Hermanos Ojeda Barroso», un negocio inventado de Sevilla. Borra el comentario de cabecera.

- [ ] `negocio.nombre`, `nombreLegal`, `nif` (B90538175 tiene el control inválido), `sector` (sale en el h1: «{sector} en {ciudad}»), `descripcionCorta` (promete «un parte semanal con fotos»), `anioFundacion` y `tipoSchema`.
- [ ] `registroMercantil` («(ficticio)»): solo en una sociedad. Si es autónomo, quita el campo.
- [ ] `contacto`: `telefono`/`whatsapp` (`+34600044004`), `email` (`.example`), `direccion` («Calle Ejemplo, 52»), `horario` y `fichaGoogle` (`cid=000…404`).
- [ ] `acreditaciones`: el REA de ejemplo es «n.º 00/0000000 (ficticio)». Solo números reales.
- [ ] `servicios`: **borra los dos `precioDesde`** de ejemplo («desde 6.500 €» y «desde 38 €/m²», PRECIO FICTICIO), salvo que el cliente valide sus cifras. El `contenido` de ejemplo promete «presupuesto por partidas, fecha de fin y parte cada viernes».
- [ ] `trabajos`: inventados (Triana, Nervión…). Ver §2.
- [ ] `valoracion` (4,8 / 143) y `resenas`: inventadas. Solo las reales de Google, o quita los dos campos.
- [ ] `proceso`: **sale en el hero** (cronología) y en el relato. Los 6 pasos de ejemplo prometen «contrato con fecha de fin», presupuesto por partidas y repaso. Pon los del cliente.
- [ ] `garantias` («Fecha de fin por contrato», «Parte semanal con fotos», «Garantía de 3 años en albañilería»): solo lo que el cliente firme.
- [ ] `empresa.historia` y `equipo` (Antonio y Rafael Ojeda e Inma Barroso son personas inventadas).
- [ ] `zonas`, `marcas` y `preguntas`.
- [ ] `seo.titulo`, `seo.descripcion` (promete «fecha de fin por contrato y parte semanal»), `seo.url` (`ojeda-barroso-ejemplo.example` → el dominio definitivo) y **`seo.indexar: true`**.
- [ ] `analitica: { vercel: true }` (plan Básico) y *Enable* en Vercel.
- [ ] `redes`: `facebook.com/ojedabarroso.ejemplo` → las reales, o quita el campo.

## 2. Fotos y vídeo

- [ ] Borra `public/ejemplo/` entera (17 rellenos) y pon las del cliente en `public/`, con `origen: "cliente"`. En `/trabajos` no puede haber ni una foto de IA.
- [ ] **El diseño pide fotos de obra en curso**, no solo de catálogo: rozas, plásticos, andamio, foco. Pregunta al cliente si tiene fotos del móvil durante sus obras: son las más importantes y no hace falta que sean perfectas.
- [ ] **Trabajos, 3:2:** `imagenes[0]` = terminada (tarjeta), `imagenes[1…]` = en curso (ficha) y `antes` opcional, con el mismo encuadre que la terminada. El diario va ordenado por `anio`, del más reciente al más antiguo, y la primera obra sale en el hero como «Última entrada»: pon `anio` y `duracion`.
- [ ] **Servicios, 3:2.** Empresa: 2 fotos a 3:2.
- [ ] **El hero no lleva foto.** Open Graph usa la foto del primer servicio (`imagenesHero` está vacío).
- [ ] **Vídeo (`videoPano`, sección «Así avanza una obra»):** está comentado. Actívalo solo con un vídeo real del cliente: 16:9, ~8 s en bucle, sin audio, H.264 ≤ 1,5 MB (+ AV1 opcional) y un póster 16:9 con `origen: "cliente"`. Sin vídeo, la sección no sale.
- [ ] JPG de calidad ~82, con el lado largo ≤ 1600 px y `alt` descriptivo.

## 3. Decisiones que tomar con el cliente o con Ysst

- [ ] **¿El cliente encaja con el concepto?** Todo el diseño («diario», «parte», «Abre el parte», «he leído vuestro diario de obra») supone que cuenta sus obras y manda partes con fotos. *Recomendado:* si no lo hace, usa otro template de reformas.
- [ ] **Pasos por defecto** (`PASOS_DIARIO` en `lib/formato.ts`, salen si `proceso` está vacío): incluyen «Contrato con fecha» y «Garantía: volvemos si algo falla». *Recomendado:* rellenar siempre `proceso` con los pasos reales, o quitar esos dos pasos o usar los de core (`pasosProceso(proceso, "proyecto")`). Decisión de Ysst abierta.
- [ ] **Título «Lo que firmamos»** de las garantías. *Recomendado:* «Nuestras garantías» (abierta), salvo que estén todas en el contrato.
- [ ] **Color primario:** latón `#d6a24c` sobre negro. Con otro color, `--color-primario-claro` se ajusta solo. Comprueba que el texto de los botones se lea.
- [ ] **Botón de la ficha de servicio** «Pide presupuesto de {servicio}»: cabe, pero con títulos muy largos usa uno corto.
- [ ] **Logo + nombre largo:** con más de 32 caracteres, la cabecera móvil baja a 11 px; con logo, 3–4 líneas. *Recomendado:* nombre comercial corto.
- [ ] «Ver servicio →» con altura mínima de 44 px deja filas más altas que el diseño (abierta; recomendado quitar la altura mínima).

## 4. Textos fijos que conviene revisar

- `lib/mensajes.ts`: «Hola, he leído vuestro diario de obra y quiero presupuesto.» y el de la ficha de servicio.
- `lib/formato.ts`: `PASOS_DIARIO` (ver §3).
- `components/secciones/Garantias.tsx`: «Lo que firmamos».
- `components/secciones/CtaFinal.tsx`: «Vamos a ver la obra y te damos el presupuesto por escrito.».
- `components/AbrirParte.tsx`: las opciones de superficie y plazo y el mensaje compuesto.
- `components/VideoObra.tsx`: «Vídeo generado con IA» solo sale si el póster es `ia`.

## 5. Lo que falta o queda pendiente

- [ ] `app/favicon.ico` es el de Next: pon uno del cliente.
- [ ] Las fotos y el vídeo de IA de la demo, con sus prompts (`docs/fotos-ejemplo/reformas-4/`), aún no existen.
- [ ] El índice móvil (popover) no se cierra al pulsar una sección (igual que fontaneria-4).
- [ ] Un 404 lanzado con `notFound()` sale en blanco sin JS (AGENTS §11).
- [ ] Martian Mono la usa también fontaneria-4 (aceptado: otro nicho).

## 6. Comprobación final (además del paso 12 de `nuevo-cliente.md`)

- [ ] La cronología del hero y el relato muestran los pasos reales del cliente, sin promesas que no haga.
- [ ] «Última entrada» del hero apunta a la obra más reciente.
- [ ] Con `videoPano` activo, el vídeo se monta tras cargar la página y con «reducir movimiento» solo sale el póster. Sin vídeo, no queda una sección vacía.
- [ ] No queda ningún `precioDesde` sin validar.
- [ ] `grep -rn "ejemplo\|ficticio\|Ojeda\|origen: \"ia\"\|PRECIO FICTICIO" site.config.ts` no devuelve nada.
