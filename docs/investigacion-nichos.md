# Estructura web que más convierte por nicho de oficios en Valencia: guía para un monorepo de plantillas

**Respuesta directa:** la estructura que más convierte no depende del oficio en sí, sino de la *urgencia* del cliente. En los nichos de urgencia (fontanería, electricidad, desatascos) gana una página corta, pensada para móvil, con el teléfono y WhatsApp siempre visibles. En los nichos de comparación (reformas, carpintería, aluminio, tejados) gana una página de prueba visual (antes/después, proyectos con barrio) con un formulario o calculadora de varios pasos. Los datos lo respaldan: según el informe de servicios profesionales de Unbounce de 2024, las páginas de reparación y mantenimiento convierten "almost 3x better" que las de reformas. Tus plantillas deberían separarse por ese eje: urgencia frente a proyecto. El tipo de oficio importa menos.

## TL;DR

- **Urgencias (fontanería, electricidad, desatascos):** la página va en este orden: hero con teléfono, botón grande "Llamar ahora", WhatsApp, tiempo de llegada, zonas, precios orientativos, reseñas y barra fija inferior. El formulario va en segundo plano. La llamada es el CTA principal y WhatsApp el secundario, porque en España WhatsApp lo usa el 94% de los internautas que usan redes (IAB Spain 2026).
- **Proyecto (reformas, carpintería, aluminio, pintura, pladur, tejados):** primero la galería de antes/después con barrio y precio aproximado, luego el proceso, las garantías, las reseñas, y un formulario multipaso o calculadora más WhatsApp. El cliente compara entre 2 y 3 presupuestos; el 72% de los consumidores mira tres negocios o menos (BrightLocal 2026, EE. UU.). Tu objetivo es entrar en esa lista corta con pruebas visuales y reseñas recientes.
- **SEO local:** una página por servicio (el factor nº 1 de ranking orgánico local en Whitespark 2026) y pocas páginas por zona, solo con contenido único (obras reales del barrio). Usa el subtipo de schema.org más específico (Plumber, Electrician, RoofingContractor, HVACBusiness, HousePainter, GeneralContractor; HomeAndConstructionBusiness para el resto). El dato común que más palanca da a todo el sistema es la reseña reciente de Google.

## Key Findings

**Lo que está respaldado por datos (con su alcance real):**

| Hallazgo | Fuente, muestra, país, año | ¿Se traslada a España? |
|---|---|---|
| Las páginas de *reparación y mantenimiento* convierten casi 3 veces más que las de *reformas*. La mediana de servicios profesionales es del 6,1% (frente al 6,6% de todos los sectores)\[1\] | Unbounce Conversion Benchmark Report 2024: 41.000 landing pages, 57 M de conversiones, 464 M de páginas vistas (jul. 2023 – jul. 2024), datos globales con predominio anglosajón\[2\] | Probablemente sí en la dirección (urgencia > proyecto); los porcentajes, no |
| El 81% de las visitas a landings de servicios profesionales llega desde móvil, pero el móvil convierte un 40% menos (8,3% frente a 11,6% en escritorio)\[1\] | Unbounce 2024 | Sí: diseña primero para móvil |
| El texto a nivel de lectura de 5º–7º curso convierte un 12,9%, frente al 6,6% del nivel de 8º–9º. El rango de palabras óptimo es de 275 a 745\[1\] | Unbounce 2024 (servicios profesionales) | Sí como principio (lenguaje llano y corto) |
| El 97% lee reseñas de negocios locales y el 71% usa Google para leerlas. El 74% solo da valor a las reseñas de los últimos 90 días y el 31% descarta negocios con menos de 4,5 estrellas\[3\]\[4\] | BrightLocal Local Consumer Review Survey 2026, 1.002 adultos de EE. UU. (SurveyMonkey)\[5\] | Con cautela: según la misma fuente, en Europa se escriben menos reseñas que en EE. UU.\[6\] |
| El 75% decide en menos de 30 minutos y el 28% en menos de 5. El 72% mira 3 negocios o menos. El 65% de los que rechazan un negocio lo hacen por motivos de reseñas\[3\] | BrightLocal Consumer Search Behavior 2026 (EE. UU.) | Probable en urgencias |
| El uso de herramientas de IA para encontrar negocios locales pasó del 6% al 45% en un año\[7\] | BrightLocal LCRS 2026 (EE. UU.) | Tendencia; magnitud dudosa para España |
| Factores del Local Pack: categoría principal de GBP (227 puntos), proximidad (225), palabras clave en el nombre (223), dirección en la ciudad (213), "abierto en el momento de la búsqueda" (189, nuevo). La recencia de reseñas sube del puesto 93 al 11\[8\]\[9\] | Whitespark Local Search Ranking Factors 2026: encuesta a 47 expertos sobre 187 factores (opinión experta, no experimento)\[9\] | Sí, Google funciona igual |
| Las fotos en GBP se asocian a +25,4 puntos porcentuales de probabilidad de top-3, y la cantidad de reseñas a +33,7 pp\[10\] | Localo, datos de más de 16.000 fichas de GBP (correlación)\[10\] | Sí, como correlación |
| El 70% de quienes buscan en móvil ha llamado a un negocio directamente desde los resultados; al 47% le haría buscar otra marca que no hubiera opción de llamar | Google/Ipsos 2013, 3.000 usuarios de búsqueda móvil (EE. UU.)\[11\]\[12\] | Dato antiguo; la dirección sigue vigente |
| WhatsApp es la red más usada en España: 94% de uso (2026) y 91–96% según el indicador en 2025\[13\]\[14\]\[15\] | IAB Spain, Estudio de Redes Sociales 2025 y 2026 (internautas de 12 a 74 años) | Dato español |
| El 55% de los equipos comerciales en España usa WhatsApp para captar clientes\[16\] | Nota de prensa de HubSpot (Madrid, 26/05/2026); también el 37% de los equipos de marketing | Dato español, de fuente comercial |
| Los formularios multipaso superan a los de un solo paso en varios tests, con resultados muy dispares: Instapage +18% (25.500 visitas por variante); Conversion Fanatics +52,9% frente a +40,3% (unas 1.100 visitas por variante); Venture Harbour del 0,96% al 8,1% (sin tráfico publicado) | Tests publicados por los propios proveedores, casi todos de EE. UU./Reino Unido\[17\]\[18\]\[19\]\[20\] | Úsalo como hipótesis que hay que testear, no como ley |

**Lo que es práctica del sector u opinión (no lo vendas como dato):** botón flotante de WhatsApp frente a uno estático, barra fija inferior en móvil, "llegamos en 30 min" en el hero, precios "desde" visibles, sliders de antes/después. Son patrones que se repiten en webs que funcionan, pero no he encontrado A/B tests públicos y rigurosos para servicios del hogar en España. Las cifras que circulan, como "los leads por teléfono convierten un 46% frente al 8–12% de los formularios", proceden de blogs de agencias sin metodología verificable.\[21\]

## Details

### 1. Principios transversales (aplican a todas las plantillas)

1. **Móvil primero y una sola acción dominante por plantilla.** El 81% del tráfico es móvil y convierte un 40% menos (Unbounce). En móvil, el CTA principal debe estar siempre al alcance del pulgar: una barra fija inferior con 2 botones (Llamar | WhatsApp) o (WhatsApp | Presupuesto).
2. **Textos cortos y llanos.** Unos 500 palabras en la home y frases de nivel escolar básico (Unbounce: el lenguaje simple duplica la mediana).
3. **Reseñas de Google recientes, visibles arriba.** Muestra la nota, el número de reseñas y 3 reseñas de menos de 90 días. Si el cliente tiene menos de 4,5★ o pocas reseñas, el upsell de "gestión de reseñas" es tu producto principal (BrightLocal 2026: el 31% descarta por debajo de 4,5).
4. **Coherencia web↔GBP.** Usa el mismo nombre, teléfono, horario y categoría. "Abierto en el momento de la búsqueda" pesa en el Local Pack (Whitespark 2026), así que la web debe mostrar el horario real y, si es 24 h, decirlo y cumplirlo.
5. **WhatsApp con mensaje precargado por página.** Usa el enlace `wa.me/34XXXXXXXXX?text=...` con un texto distinto por servicio ("Hola, tengo una fuga en…" o "Hola, quiero presupuesto para reformar mi baño de __ m²"). Así sabes de dónde viene cada lead y le ahorras fricción al usuario. Atención: un botón de WhatsApp sin respuesta rápida solo traslada el problema; incluye el tiempo de respuesta en la venta.\[22\]
6. **Medición.** Registra como evento cada clic en `tel:`, en `wa.me` y cada envío de formulario (GA4). Sin esto no puedes demostrarle al cliente el valor de sus 20 €/mes, y medirlo es tu mejor argumento de retención.
7. **Habilitaciones como argumento de confianza (y legal).** En España, las empresas instaladoras de baja tensión, de instalaciones térmicas (RITE) y de gases fluorados se inscriben en el Registro Integrado Industrial (RII). En la Comunitat Valenciana se tramita en la sede de la GVA, y las empresas de otras comunidades deben comunicar a sus instaladores para poder usar los trámites telemáticos.\[23\]\[24\] Mostrar el número de RII o de habilitación es un factor diferencial real, porque el miedo nº 1 del cliente es la chapuza o el intruso.

### 2. Grupo URGENCIAS — fontanería, electricidad, desatascos

**Qué comparten:** decisión en minutos, búsqueda en móvil, miedo a "que no vengan" y a la factura sorpresa. Según BrightLocal 2026, el 28% decide en menos de 5 minutos.

**Estructura recomendada (en orden):**
1. **Hero:** "Fontanero urgente en Valencia · Llegamos en X min" + botón grande "Llamar ahora" (tel:) + botón WhatsApp + estrellas de Google (4,8★ · 120 reseñas) + chip "Abierto ahora / 24 h".
2. Franja de confianza: años de experiencia, empresa habilitada (n.º RII), garantía por escrito, seguro de RC.
3. "Cómo funciona" en 3 pasos (Llamas → Llegamos → Solucionamos).
4. Servicios (tarjetas con precio "desde").
5. Tabla de precios orientativos (desplazamiento, hora, recargo nocturno/festivo).
6. Zonas que cubrimos (lista de barrios y municipios con enlaces a las pocas páginas de zona que tengan contenido real).
7. Reseñas de Google (3–6, recientes).
8. FAQ ("¿Cuánto cuesta?", "¿Cobráis desplazamiento?", "¿Dais factura?").
9. CTA final + barra fija inferior en móvil.

**CTA principal:** llamada. **Secundario:** WhatsApp, que es útil para enviar una foto de la avería, algo muy práctico en fugas y atascos. **El formulario** va solo al pie, para quien no quiere llamar.

**Qué NO funciona:** sliders automáticos en el hero, formularios largos arriba, páginas de "Quiénes somos" extensas, fotos de banco de imagen con fontaneros sonrientes, pop-ups y vídeos pesados que ralentizan la carga en 4G.

#### Fontanería
- **Cliente y decisión:** particular con avería (fuga, termo, cisterna) en urgencia; comunidades y administradores de fincas como cliente recurrente. **Ticket en Valencia:** mano de obra de 20–36 €/h (Cronoshare Valencia 2026); servicio urgente a domicilio de 150–250 € (Cronoshare Valencia); el recargo de urgencia se sitúa en 60–150 €/h a nivel nacional (Cronoshare).\[25\]\[26\] **Miedos:** que no venga, el precio inflado en urgencia, que lo deje todo mojado o sucio, que sea un "fontanero pirata" de anuncio.
- **Confianza:** precio de desplazamiento visible, "presupuesto antes de empezar", factura con IVA, fotos reales de la furgoneta y del técnico, reseñas que mencionen la rapidez.
- **SEO:** keywords de tipo "fontanero valencia", "fontanero urgente valencia", "fontanero 24 horas valencia", "fontanero [barrio: Ruzafa, Benimaclet, Campanar…]", "fontanero torrent / paterna / mislata". **No he encontrado volúmenes publicados y fiables para España**: obtenlos con Google Keyword Planner o Semrush con la base de datos de España antes de priorizar.\[27\] Un blog SEO local estima 25–70 búsquedas al mes por combinación servicio+barrio, pero es una cifra sin herramienta citada.\[28\] **Schema:** `Plumber`.\[29\]
- **Pedir al cliente:** horario real (y si hace 24 h de verdad), tarifas (desplazamiento, hora, urgencia), municipios cubiertos, 10+ fotos reales (furgoneta, trabajos, equipo), número de RII si lo tiene, enlace a la ficha de GBP.
- **Upsells:** optimización de GBP y campaña de reseñas; Google Ads o Local Services Ads con extensión de llamada; seguimiento de llamadas; páginas de servicio (termos, desatascos, fugas); contrato de mantenimiento para comunidades.
- **Ejemplos:** **smefontaneria24h.com** (Valencia), que tiene un banner de "Urgencias 24 horas" con el teléfono en el hero, botón "Llámanos Ahora" repetido, proceso en 3 pasos y lista de municipios; le falta WhatsApp y precios.\[30\] **servicioxpress.com/fontanero-valencia/**, con tabla de tarifas visible (urgente 24 h, 100–250 €) y promesa de disponibilidad 365 días;\[31\] es una red multiciudad, no un negocio local puro, así que no copies su estrategia de páginas.\[32\]

#### Electricidad
- **Cliente y decisión:** mezcla de urgencia (apagón, diferencial que salta) y trámite (boletín/CIE para el alta de luz, aumento de potencia, punto de recarga). La parte de trámite es *comparativa* y sensible al precio. **Miedos:** seguridad, intrusismo, que el boletín no sea válido.
- **Confianza (crítico):** "Empresa instaladora habilitada en baja tensión", con n.º de RII y categoría (básica/especialista). Es el elemento diferencial nº 1 de este nicho.
- **Estructura:** la plantilla de urgencias, más un bloque destacado de "Boletín eléctrico / CIE" con precio cerrado y lo que incluye. Es un patrón muy convertible: dybspain.com vende el boletín eléctrico a "precio fijo 181 € + IVA" con entrega en 24/48 h, detalla que incluye revisión, firma y tramitación y avisa de que "no incluye posibles correcciones/obras".
- **SEO:** "electricista valencia", "electricista urgente valencia", "boletín eléctrico valencia", "instalación punto de recarga valencia", "aumento de potencia". Volúmenes por validar. **Schema:** `Electrician`.
- **Pedir:** n.º de RII y categoría, si hace boletines/CIE y su precio, si instala puntos de recarga o fotovoltaica, fotos de cuadros eléctricos terminados.
- **Upsells:** página específica de boletín o punto de recarga (alta intención); reseñas; Ads.
- **Ejemplos:** **pcaelectricistasvalencia.es**, con teléfono y botón de WhatsApp en la cabecera, acreditación de instalador autorizado (enlaza al carné) y páginas por municipio (Aldaia, Quart, Manises, Alaquàs).\[33\] **fringenieros.es/electricista-valencia/**, que dice "Somos instaladores autorizados", ofrece presupuesto por WhatsApp y tiene una sección específica de boletín/CIE.\[34\]

#### Desatascos (prioridad 2)
- **Cliente:** particular, hostelería y comunidades; urgencia máxima y olor o suciedad como miedo principal. **Ticket:** desatasco de 75–150 € según PresuNow (precio nacional 2026, fuente secundaria).\[35\]
- **Estructura:** como fontanería, con el énfasis en "precio desde" + tiempo de llegada + "limpiamos al terminar" + camión o cámara de inspección.
- **SEO:** "desatascos valencia", "desatasco urgente valencia", "camión cuba valencia". **Schema:** `Plumber` (no existe un subtipo específico).
- **Upsells:** inspección con cámara, contratos de mantenimiento con hostelería y comunidades.
- **Ejemplo:** **servicioxpress.com/desatascos-valencia/**, con título y meta que muestran el teléfono, "Desde 60 €" y "Llegamos en 30 min"; un buen anclaje de precio y tiempo.\[36\]

### 3. Grupo VISUAL/PROYECTO — reformas integrales, carpintería de madera, pintura, alicatado y solados, escayola y pladur

**Qué comparten:** compra comparativa de semanas, ticket alto, el cliente pide 2–3 presupuestos y decide por *pruebas visuales + confianza en que cumplan plazos*. Unbounce: las páginas de reformas convierten unas 3 veces menos que las de reparación, así que no esperes llamadas inmediatas: optimiza para *lead cualificado*.

**Estructura recomendada:**
1. **Hero:** foto real del mejor trabajo (no de banco) + titular con resultado ("Reformas de baño en Valencia en 10 días, precio cerrado") + CTA "Pide presupuesto" (formulario multipaso) + WhatsApp + estrellas.
2. **Antes/después** (slider o pares) con *barrio + m² + plazo + rango de precio*. Es lo que más diferencia y lo que el cliente comparte con su pareja.
3. Servicios con precio "desde".
4. Proceso (visita → presupuesto detallado en X días → contrato con fecha → obra → limpieza → garantía).
5. Garantías: precio cerrado por contrato, plazo por contrato, garantía de X años, seguro de RC, limpieza diaria.
6. Reseñas de Google + 1–2 testimonios con foto del proyecto.
7. Calculadora orientativa o formulario multipaso (tipo de obra → m² → calidad → plazo → contacto).
8. Zonas + FAQ (licencias, plazos, financiación, IVA reducido) + CTA final.

**CTA principal:** formulario multipaso o calculadora. **Secundario:** WhatsApp ("envíanos fotos y medidas"). **La llamada** pasa a un tercer plano.

**Qué NO funciona:** galerías sin contexto (100 fotos sin barrio ni precio), renders 3D presentados como trabajos reales, "presupuesto gratis" como único argumento (todos lo dicen), formularios de un paso con 10 campos, textos genéricos sobre "calidad y profesionalidad".

#### Reformas integrales (viviendas, baños, cocinas)
- **Ticket en Valencia:** baño de 4 m² entre 1.800 y 4.000 € según Habitissimo; 4.000–12.000 € (lo habitual, 8.000–10.000 €) según Cronoshare Valencia (mayo de 2026); presupuestos reales recibidos en septiembre de 2026 en PlanReforma Valencia, entre 5.900 y 10.000 €.\[37\]\[38\]\[39\] **Las fuentes divergen bastante**: usa rangos amplios y "desde" en la web. Cocina y baño en Valencia: 650–1.500 €/m² (Habitissimo).\[40\] Reforma integral de vivienda: media de 21.621 € (rango 11.156–36.000 €), según datos de Habitissimo citados por un tercero.\[41\] **Miedos:** que se alargue la obra, sobrecostes, chapuzas, abandono de la obra, suciedad y vecinos.
- **Confianza:** precio cerrado y fecha de fin por contrato, un único interlocutor, fotos por fases, garantía, seguro, REA si subcontrata (Registro de Empresas Acreditadas en construcción).
- **SEO:** "reformas valencia", "reforma integral valencia", "reforma baño valencia", "reforma cocina valencia", "cambiar bañera por plato de ducha valencia", "reformas [barrio]". **Una página por servicio** (baño, cocina, integral, plato de ducha): es el factor nº 1 de orgánico local en Whitespark 2026.\[42\] **Schema:** `GeneralContractor`.
- **Pedir:** 5–10 proyectos con fotos de antes/después, barrio, m², plazo y rango de precio; servicios; si hace proyecto técnico o licencias; garantía que ofrece; si financia; seguro de RC.
- **Upsells:** sesión de fotos profesional de obras terminadas (gran palanca en este nicho); calculadora; páginas por servicio; Google Ads (CPC alto pero ticket alto); campañas de reseñas tras cada obra.
- **Ejemplos:** **reformasvalencia10.es/reforma-bano/**, con formulario de presupuesto arriba con desplegable de tipo de obra, "presupuesto en 72 h", fecha de fin garantizada por contrato y precio cerrado.\[43\] **empresareformaenvalencia.com/reforma-de-bano/**, que publica tablas de precios por tamaño y calidad y desglosa partidas: transparencia que filtra leads.\[44\] **cefvalencia.es/reformas-integrales/**, con bloque de antes/después en reforma de dúplex en Valencia.\[45\]

#### Carpintería de madera (muebles a medida, armarios, puertas)
- **Cliente:** particular en reforma o mudanza; compara por estilo y acabado. **Ticket:** no he encontrado datos fiables de Valencia; pide a cada cliente sus rangos reales ("armario empotrado desde X €/ml"). **Miedos:** que no encaje, plazo de fabricación, acabados pobres.
- **Estructura:** galería por tipo (armarios, vestidores, puertas, cocinas) + "taller propio" (fotos del taller, gran señal de confianza) + proceso medición → diseño → fabricación → montaje + formulario con subida de fotos o medidas.
- **SEO:** "carpintero valencia", "armarios a medida valencia", "puertas de madera valencia", "muebles a medida valencia". **Schema:** `HomeAndConstructionBusiness` (no hay subtipo de carpintero; si vende en tienda o taller con atención al público, puedes añadir `FurnitureStore` en un array de tipos).\[29\]
- **Upsells:** fotos profesionales, Instagram/Pinterest conectado, ficha de GBP con fotos por categoría.
- **Ejemplos:** **carpinteriamartinfernandez.es**, cuyo portfolio por proyecto (armario plegable, vestidor, armario bajo escalera) hace de vendedor.\[46\] **carpinteriasanjose.es/empresa-de-carpinteria-en-valencia/**, que destaca la dirección del taller propio en Valencia.\[47\]

#### Pintura (prioridad 2)
- **Cliente:** particular (piso), comunidades (escalera, fachada). Ticket bajo-medio, muy comparativo. **Miedo principal:** suciedad, muebles y plazos.
- **Estructura:** visual simplificada: precio orientativo por m² o por estancia, "protegemos y limpiamos", fotos de antes y después y presupuesto rápido por WhatsApp con fotos.
- **SEO:** "pintor valencia", "pintores valencia", "pintar piso valencia precio". **Schema:** `HousePainter`.

#### Alicatado y solados; escayola y pladur (prioridad 2)
- Suelen ser subcontratas de reformistas, así que conviene un segundo CTA dirigido a profesionales ("¿Eres empresa de reformas? Trabajamos para ti"). Galería de detalle (juntas, cortes, techos con foseado e iluminación) + precio por m².
- **SEO:** "alicatador valencia", "solados valencia", "pladur valencia", "falso techo valencia", "escayolista valencia". **Schema:** `HomeAndConstructionBusiness` (o `GeneralContractor` si hace obra completa).

### 4. Grupo PRODUCTO A MEDIDA — carpintería metálica y de aluminio (ventanas, cerramientos, rejas)

**Cliente y decisión:** comparación por producto (marca de perfil, rotura de puente térmico, vidrio) y precio por unidad. Muy sensible a ayudas de eficiencia energética. **Ticket:** cambiar una ventana en Valencia cuesta alrededor de 350 €/unidad, y la de aluminio con RPT puede doblarlo (Habitissimo); una ventana de aluminio de 120×120 cuesta 260–480 € instalada (Cronoshare 2026); aluminio RPT oscilobatiente en Valencia, 400–540 € instalada (deventanas.es, fuente comercial).\[48\]\[49\]\[50\] **Miedos:** mala instalación (filtraciones, ruido), plazos de fabricación, obra y suciedad, no saber qué perfil elegir.

**Estructura:**
1. Hero con producto estrella + "Presupuesto en 24–48 h" + CTA calculadora o configurador simple (tipo de ventana → medidas aproximadas → nº de unidades → contacto) + WhatsApp ("envía foto del hueco").
2. Catálogo por tipo (correderas, oscilobatientes, cerramientos de terraza, rejas, puertas de garaje) con precio "desde".
3. Marcas de perfil (Cortizo, Strugal, Technal…) y explicación sencilla de RPT y vidrio. Aquí es donde el cliente compara.
4. Proyectos instalados (barrio, unidades, sistema).
5. Ayudas y eficiencia energética (con cuidado, ver Caveats), garantía de fabricación y de instalación, reseñas, zonas, FAQ.

**CTA principal:** calculadora/configurador o formulario multipaso. **Qué NO funciona:** catálogos técnicos en PDF como único contenido, fichas sin precio ni foto real instalada.
- **Confianza:** marcas homologadas, taller propio, exposición física (mostrar la dirección), garantía, fotos instaladas.
- **SEO:** "ventanas aluminio valencia", "cerramientos terraza valencia", "carpintería aluminio valencia", "rejas a medida valencia", "puertas de garaje valencia". **Una página por producto.** **Schema:** `HomeAndConstructionBusiness` (y `Store` en un array si tiene exposición abierta al público).
- **Pedir:** catálogo real con marcas y precios desde, fotos de instalaciones, dirección de exposición o taller, plazos de fabricación, garantía.
- **Upsells:** calculadora, fotos, páginas de producto, Google Ads en temporada (antes del verano y del invierno), contenido sobre ayudas.
- **Ejemplos:** **aluminiovalencia.com/presupuesto** (Aluvista), con una página de presupuesto donde primero se elige el tipo de producto, marcas visibles (Cortizo, Technal), teléfono y dirección en Aldaia.\[51\] **tecniventana.com**, con catálogo por tipo de apertura, CTA repetido "Pide presupuesto sin compromiso" y dos exposiciones (Quart de Poblet y Ruzafa).\[52\]

### 5. Grupo OBRA TÉCNICA — albañilería, pavimentos y hormigón, tejados, humedades y fachadas, movimiento de tierras

**Qué comparten:** el cliente a menudo *no sabe qué necesita* (diagnóstico) y en muchos casos el comprador es una **comunidad de propietarios o un administrador de fincas**, no un particular. Decisión lenta, por junta. La confianza se apoya en solvencia técnica, seguros, REA y experiencia en obras parecidas.

**Estructura:**
1. Hero: "Reparación de tejados y humedades en Valencia · Diagnóstico e informe" + CTA "Solicita visita técnica" + teléfono.
2. Problemas que resolvemos (goteras, humedad por capilaridad o condensación, fisuras, desprendimientos de fachada), con lenguaje de síntoma, no de técnica.
3. Casos con fotos de proceso (andamio o trabajos verticales, antes/después).
4. Para comunidades: bloque específico (IEEV.CV, ayudas, presupuesto para junta, seguro de RC con importe).
5. Garantías, certificaciones (REA, seguros), reseñas, zonas, FAQ.

**Contexto normativo valenciano (oportunidad comercial real):** el **IEEV.CV** (Decreto 53/2018) es obligatorio para edificios de vivienda de más de 50 años. Hay que presentarlo antes del 31 de diciembre del año siguiente al que el edificio cumple 50 años y tiene una validez de 10 años; también es necesario para optar a ayudas públicas de rehabilitación.\[53\]\[54\] La propia Generalitat cifró en 407.711 los edificios de más de 50 años en la Comunitat (Héctor Illueca, vicepresidente segundo de la GVA, al presentar las ayudas IEEV.CV en febrero de 2023), y en 2021 situó el grado de cumplimiento del informe en no más del 4%. Los informes desfavorables generan obra de fachadas, cubiertas y humedades: tu plantilla de obra técnica debería tener una sección "¿Tu edificio tiene más de 50 años?".

#### Albañilería; pavimentos y hormigón (prioridad 1)
- **Cliente:** particular (pequeñas obras, muros, solera de patio o garaje), naves y empresas (pavimento industrial, hormigón pulido o impreso). **Ticket:** variable; no he encontrado datos fiables específicos de Valencia; pide tarifas por m² al cliente.
- **SEO:** "albañil valencia", "hormigón impreso valencia", "hormigón pulido valencia", "pavimento industrial valencia", "solera hormigón valencia". **Schema:** `GeneralContractor` (albañilería y obra) o `HomeAndConstructionBusiness`.
- **Confianza:** fotos de m² ejecutados, maquinaria propia, REA, clientes empresa.
- **Upsells:** fotos con dron, páginas por tipo de pavimento, perfil en directorios B2B.

#### Tejados (prioridad 2)
- **Miedo:** goteras recurrentes, seguridad del trabajo en altura, precio. **Schema:** `RoofingContractor`. **SEO:** "reparación tejados valencia", "goteras valencia", "impermeabilización terrazas valencia".
- **Ejemplo:** **tejadosdevalencia.com**, con el teléfono en el título y los CTA, 20+ años de experiencia y sección de opiniones.\[55\]

#### Humedades y fachadas (prioridad 2)
- **SEO:** "humedades valencia", "rehabilitación fachadas valencia", "trabajos verticales valencia", "IEE valencia". **Schema:** `GeneralContractor`.
- **Ejemplo:** **fachadas-k2-valencia.com**, con 25+ años, "cientos de edificios rehabilitados", opiniones y enfoque a comunidades con trabajos verticales.\[56\]\[57\]

#### Movimiento de tierras (prioridad 2)
- **Cliente:** constructoras, promotores, particulares con parcela; casi B2B. Web más corporativa: maquinaria (con fotos y capacidades), obras, certificados y seguros, formulario con ubicación de la parcela. **Schema:** `HomeAndConstructionBusiness` o `GeneralContractor`.

### 6. Grupo RECURRENTE — jardinería, piscinas, climatización

**Qué comparten:** el valor está en el **contrato periódico** (LTV), no en el primer servicio. La web debe vender *planes* (mensual, temporada) además de intervenciones sueltas, y aprovechar la estacionalidad (piscinas en primavera, aire acondicionado de mayo a julio).

**Estructura:**
1. Hero con beneficio ("Tu piscina lista todo el verano sin preocuparte") + CTA "Pide tu plan" (formulario corto) + WhatsApp.
2. Planes con precio desde (tabla de 2–3 planes).
3. Servicios puntuales.
4. Zonas (urbanizaciones y municipios: en jardinería y piscinas, l'Horta, Camp de Túria y urbanizaciones de chalets).
5. Reseñas, años de experiencia, equipo, FAQ, CTA.

#### Climatización (prioridad 2)
- **Ticket en Valencia (fuentes comerciales, octubre de 2026):** instalación de split desde 200 € solo mano de obra; con equipo, desde unos 850 €; conductos desde unos 2.050 € (listas de precios publicadas por instaladores valencianos).\[58\]\[59\]\[60\] **Miedo:** instalador no habilitado y garantía del fabricante (que exige instalación por empresa habilitada).
- **Confianza (crítico):** empresa habilitada RITE + certificado de empresa de gases fluorados (obligatorio para manipular refrigerante) + marcas oficiales.\[61\]\[62\]
- **SEO:** "instalación aire acondicionado valencia", "aire acondicionado por conductos valencia", "mantenimiento aire acondicionado valencia", "aerotermia valencia". **Schema:** `HVACBusiness`.
- **Ejemplos:** **valenciaservicios.com/instalacion/aire-acondicionado-valencia/**, con lista explícita de precios de instalación (split desde 200 €, 2x1 desde 380 €, conductos desde 400 €, IVA incluido) y "Tu aire en menos de 24 hs".\[59\] **climelectric.com/ofertas-aire-acondicionado-conductos-valencia**, con precio por producto con instalación incluida.\[60\]

#### Jardinería y piscinas (prioridad 2)
- **SEO:** "jardinero valencia", "mantenimiento jardines valencia", "poda palmeras valencia", "mantenimiento piscinas valencia", "construcción piscinas valencia". **Schema:** `HomeAndConstructionBusiness` (no hay subtipo específico; `LocalBusiness` como alternativa genérica).
- **Ejemplos:** **jardinerianarcis.es**, con dos teléfonos, radio de servicio "Valencia +50 km" y servicios claros (jardines, piscinas, césped, riego, poda de palmeras).\[63\] **piscilimp.es**, que cuenta su historia (desde 1988) y se diferencia con "No somos una franquicia".\[64\]

### 7. SEO local común: páginas por servicio y riesgo de doorway pages

- **Páginas por servicio: sí, siempre.** Es el factor que más ha subido en Whitespark 2026 para el orgánico local.\[65\]
- **Páginas por zona: pocas y reales.** La política de spam de Google incluye como doorway abuse "tener varios dominios o páginas dirigidas a regiones o ciudades específicas que canalizan a los usuarios a una sola página".\[66\] Tras la actualización de spam de octubre de 2022, un artículo de Jake Hundley en Search Engine Land (diciembre de 2022), basado en la revisión de Schieler Mew de más de 200 webs de negocios con área de servicio, documentó que las páginas de ubicación duplicadas no perdían posiciones sino que se desindexaban automáticamente. Sterling Sky documentó el caso de una web con más de 3.000 páginas de ubicación que recibió una acción manual por "thin content with little or no added value", aunque el contenido de cada página lo habían escrito personas. **Regla para tu monorepo:** una página de zona solo se genera si `serviceArea[i].hasPage = true` Y tiene al menos 1 proyecto real en esa zona + texto propio + reseña o foto local. Si no, la zona aparece solo en la lista "Zonas que cubrimos".
- **GBP sin dirección visible si el cliente no atiende en local** (negocio con área de servicio), coherente con la web. La categoría principal de GBP es el factor nº 1 del Local Pack (Whitespark 2026): elige la categoría correcta en cada alta.\[67\]
- **Schema:** el JSON-LD se genera desde la config. Usa el `@type` más específico y un array si hace falta (`["Plumber","HVACBusiness"]`), además de `areaServed`, `openingHoursSpecification`, `aggregateRating` (solo con reseñas propias de la web, no copiadas de Google, para no infringir las directrices de datos estructurados de reseñas) y `hasOfferCatalog`.\[68\]

### 8. Contexto de mercado España: por qué tu propuesta de 20 €/mes es vendible

Las plataformas de leads cobran por contacto: el centro de ayuda de Habitissimo indica que "la media está en 12-14 €, según la zona" y que un máximo de cuatro profesionales pueden contactar con cada cliente, y Cronoshare cobra en "cronos" entre el 2% y el 15% del presupuesto estimado del servicio. Un fontanero que compra 10 contactos al mes ya gasta más de 120 €, y esos contactos se reparten entre varios profesionales. Una web propia + GBP optimizada que genere 2–3 llamadas directas al mes ya justifica los 20 €. Usa este argumento en la venta, y el tracking de llamadas y WhatsApp como prueba.

## Tabla comparativa por tipo de plantilla

| | Urgencias | Visual/proyecto | Producto a medida | Obra técnica | Recurrente |
|---|---|---|---|---|---|
| Nichos | Fontanería, electricidad, desatascos | Reformas, carpintería de madera, pintura, alicatado, pladur | Aluminio, metálica, ventanas, cerramientos | Albañilería, pavimentos, tejados, humedades/fachadas, tierras | Jardinería, piscinas, climatización |
| Decisión | Minutos, móvil | Semanas, 2–3 presupuestos | Días–semanas, por producto y precio | Diagnóstico; a menudo comunidad o empresa | Contrato periódico, estacional |
| CTA principal | Llamada | Formulario multipaso / calculadora | Configurador / calculadora | Visita técnica (formulario) + llamada | Plan (formulario corto) |
| CTA secundario | WhatsApp (foto de la avería) | WhatsApp (fotos y medidas) | WhatsApp (foto del hueco) | WhatsApp / descarga de informe | WhatsApp |
| Hero | Teléfono, tiempo de llegada, "abierto ahora", ★ | Mejor foto real + resultado + ★ | Producto + "presupuesto 24–48 h" | Síntoma + "diagnóstico" | Beneficio + planes |
| Prueba clave | Reseñas recientes + habilitación | Antes/después con barrio, m², precio | Marcas, instalaciones, exposición | Casos con proceso, REA, seguros | Planes, antigüedad, equipo |
| Precios | Tabla de tarifas | "Desde" + rangos por proyecto | "Desde" por unidad | Rara vez; "visita gratuita" | Precio por plan |
| Configurable | `emergency24h`, `responseTimeMin`, tarifas, certificaciones | Proyectos, pasos del formulario, calculadora | Catálogo, marcas, campos del configurador | Bloque comunidades, IEEV, B2B | Planes, temporadas |
| Schema típico | Plumber, Electrician | GeneralContractor, HousePainter, HomeAndConstructionBusiness | HomeAndConstructionBusiness (+Store) | RoofingContractor, GeneralContractor | HVACBusiness, HomeAndConstructionBusiness |

## Propuesta de variantes de plantilla (3–5 por grupo)

**Urgencias**
1. **U1 "Llamada pura"**: hero a pantalla completa con teléfono gigante, barra fija Llamar/WhatsApp y una sola página. Para autónomos 24 h.
2. **U2 "Precio transparente"**: añade la tabla de tarifas arriba (justo tras el hero). Para quien compite contra los "piratas" de anuncios.
3. **U3 "Habilitado/legal"**: bloque destacado de habilitación y boletín/CIE a precio cerrado. Para electricistas.
4. **U4 "Multiservicio"**: hub con páginas por servicio (fugas, termos, desatascos) y por zona solo si hay contenido real. Para empresas con 2+ furgonetas.

**Visual/proyecto**
1. **V1 "Portfolio primero"**: antes/después en el hero, formulario multipaso. Reformas.
2. **V2 "Calculadora"**: calculadora orientativa como pieza central (baño, cocina, pintura por m²).
3. **V3 "Taller/artesano"**: storytelling del taller y del proceso de fabricación, galería por categorías. Carpintería de madera.
4. **V4 "Express"**: una página, precio por m², presupuesto por WhatsApp con fotos. Pintura, alicatado, pladur.
5. **V5 "B2B + particular"**: doble CTA (particulares / empresas de reformas). Subcontratas.

**Producto a medida**
1. **P1 "Configurador"**: tipo → medidas → unidades → contacto.
2. **P2 "Catálogo + exposición"**: catálogo por producto y showroom con mapa.
3. **P3 "Eficiencia y ayudas"**: argumento de ahorro energético y RPT, sección de ayudas actualizable.

**Obra técnica**
1. **T1 "Diagnóstico"**: problema → síntoma → solución, CTA "visita técnica".
2. **T2 "Comunidades"**: IEEV.CV, ayudas, presupuesto para junta, referencias de edificios.
3. **T3 "Industrial/B2B"**: maquinaria, m² ejecutados, certificados, clientes empresa (pavimentos, tierras).

**Recurrente**
1. **R1 "Planes"**: tabla de planes como sección central.
2. **R2 "Temporada"**: hero y banner que cambian según la fecha (`seasonalBanners`).
3. **R3 "Instalador certificado"**: RITE, gases fluorados y marcas oficiales al frente (climatización).

## Esquema de datos común (JSON para `site.config`)

Principios: todo lo opcional que venga vacío oculta su sección; las plantillas leen el mismo esquema y cada una decide qué bloques usa; solo `branding.primaryColor` sobrescribe los tokens. En Zod, define `.optional()` en cada bloque y valida formatos (teléfono E.164, URLs, enums de `schemaType`, `certifications[].type`, `cta.primary`).

```json
{
  "templateId": "urgencias-u2",
  "locale": "es-ES",
  "business": {
    "name": "Fontanería Ejemplo",
    "legalName": "Juan Pérez García",
    "taxId": "12345678Z",
    "schemaType": ["Plumber"],
    "foundedYear": 2009,
    "tagline": "Fontanero urgente en Valencia",
    "description": "Texto corto (máx. 300 caracteres)",
    "logo": "/img/logo.svg"
  },
  "branding": { "primaryColor": "#0E7490" },
  "contact": {
    "phone": "+34600000000",
    "whatsapp": "+34600000000",
    "whatsappDefaultMessage": "Hola, necesito un fontanero en Valencia",
    "email": "info@ejemplo.es",
    "emergency24h": true,
    "responseTimeMinutes": 45,
    "replyTimeWhatsappMinutes": 15
  },
  "location": {
    "showAddress": false,
    "address": { "street": "", "postalCode": "46001", "city": "Valencia", "region": "Comunitat Valenciana" },
    "geo": { "lat": 39.4699, "lng": -0.3763 },
    "gbpUrl": "https://g.page/...",
    "googlePlaceId": "ChIJ..."
  },
  "hours": [
    { "days": ["Mo","Tu","We","Th","Fr"], "opens": "08:00", "closes": "20:00" },
    { "days": ["Sa"], "opens": "09:00", "closes": "14:00" }
  ],
  "serviceArea": [
    { "name": "Ruzafa", "type": "barrio", "slug": "ruzafa", "hasPage": true, "intro": "Texto propio", "projectIds": ["p1"] },
    { "name": "Torrent", "type": "municipio", "slug": "torrent", "hasPage": false }
  ],
  "cta": {
    "primary": "call",
    "secondary": "whatsapp",
    "stickyMobileBar": true,
    "formType": "multistep",
    "formSteps": [
      { "id": "service", "type": "select", "label": "¿Qué necesitas?", "optionsFrom": "services" },
      { "id": "urgency", "type": "radio", "label": "¿Para cuándo?", "options": ["Hoy", "Esta semana", "Sin prisa"] },
      { "id": "photos", "type": "file", "label": "Fotos (opcional)", "optional": true },
      { "id": "contact", "type": "contact", "fields": ["name", "phone", "postalCode"] }
    ]
  },
  "hero": {
    "headline": "Fontanero urgente en Valencia",
    "subheadline": "Llegamos en 45 min · Presupuesto antes de empezar",
    "image": "/img/hero.jpg",
    "badges": ["24h", "Empresa habilitada", "Factura con IVA"]
  },
  "services": [
    {
      "slug": "reparacion-fugas",
      "name": "Reparación de fugas",
      "short": "Localizamos y reparamos fugas",
      "body": "Texto propio de la página de servicio",
      "priceFrom": 60,
      "priceUnit": "servicio",
      "image": "/img/fugas.jpg",
      "whatsappMessage": "Hola, tengo una fuga en…",
      "hasPage": true,
      "faqs": [{ "q": "¿Cobráis desplazamiento?", "a": "…" }]
    }
  ],
  "pricing": {
    "showTable": true,
    "vatIncluded": true,
    "items": [
      { "label": "Desplazamiento", "price": "30 €" },
      { "label": "Hora de trabajo", "price": "35 €/h" },
      { "label": "Recargo nocturno/festivo", "price": "+50 %" }
    ],
    "disclaimer": "Precios orientativos. Presupuesto cerrado antes de empezar."
  },
  "calculator": {
    "enabled": false,
    "unit": "m2",
    "basePricePerUnit": 650,
    "qualityMultipliers": { "basica": 0.8, "media": 1, "alta": 1.4 }
  },
  "products": [
    { "slug": "oscilobatiente-rpt", "name": "Ventana oscilobatiente RPT", "brand": "Cortizo", "priceFrom": 400, "priceUnit": "ud", "image": "/img/v1.jpg" }
  ],
  "plans": [
    { "name": "Mantenimiento piscina", "priceMonthly": 0, "includes": ["…"], "season": "abr-oct" }
  ],
  "projects": [
    {
      "id": "p1",
      "title": "Reforma de baño",
      "serviceSlug": "reforma-bano",
      "area": "ruzafa",
      "sizeM2": 5,
      "durationDays": 10,
      "priceRange": "6.000–8.000 €",
      "before": ["/img/p1-antes.jpg"],
      "after": ["/img/p1-despues.jpg"],
      "date": "2026-05",
      "testimonial": { "author": "María", "text": "…" }
    }
  ],
  "reviews": {
    "source": "google",
    "rating": 4.8,
    "count": 127,
    "lastSyncedAt": "2026-10-01",
    "featured": [{ "author": "Luis", "rating": 5, "date": "2026-09-20", "text": "…" }]
  },
  "trust": {
    "yearsExperience": 17,
    "certifications": [
      { "type": "RII_BAJA_TENSION", "number": "XX-XXXX", "category": "especialista" },
      { "type": "RITE", "number": "" },
      { "type": "GASES_FLUORADOS_EMPRESA", "number": "" },
      { "type": "REA", "number": "" }
    ],
    "insurance": { "type": "RC", "amount": 300000 },
    "guarantees": ["Garantía de 1 año en mano de obra", "Precio cerrado por contrato"],
    "brands": ["Cortizo", "Daikin"]
  },
  "process": [
    { "title": "Llamas", "text": "…" },
    { "title": "Llegamos", "text": "…" },
    { "title": "Solucionamos", "text": "…" }
  ],
  "audiences": { "particulares": true, "comunidades": false, "empresas": false },
  "regulatoryBlocks": { "ieevcv": false, "ayudas": { "enabled": false, "text": "", "updatedAt": "" } },
  "seasonalBanners": [{ "from": "05-01", "to": "07-31", "text": "Instala tu aire antes del calor" }],
  "faq": [{ "q": "¿Dais factura?", "a": "Sí, siempre con IVA." }],
  "team": [{ "name": "Juan", "role": "Fontanero", "photo": "/img/juan.jpg" }],
  "social": { "instagram": "", "facebook": "", "tiktok": "" },
  "seo": {
    "titleTemplate": "%s | Fontanería Ejemplo Valencia",
    "defaultTitle": "Fontanero urgente en Valencia 24h",
    "description": "…",
    "ogImage": "/img/og.jpg"
  },
  "tracking": { "ga4Id": "", "callTrackingNumber": "", "events": ["click_tel", "click_whatsapp", "form_submit"] },
  "legal": { "avisoLegal": true, "privacidad": true, "cookies": true }
}
```

Reglas de render clave:
- `serviceArea[].hasPage` solo genera una URL si hay `intro` y al menos un `projectIds`.
- `reviews.featured` se oculta si todas las reseñas tienen más de 12 meses.
- `pricing` se oculta si `items` está vacío.
- `regulatoryBlocks.ayudas` se oculta si `updatedAt` tiene más de 6 meses, para no publicar convocatorias caducadas.

## Recommendations

1. **Construye primero 2 plantillas base, no 5 grupos:** "Urgencias" (U1/U2) y "Proyecto" (V1 con antes/después + formulario multipaso). Cubren tus leads de prioridad 1. Producto a medida y obra técnica salen de V1 con bloques activables (configurador, comunidades).
2. **En cada cierre, pide como mínimo:** enlace a GBP, 10–20 fotos reales (si no hay, véndele la sesión de fotos como primer upsell), servicios con precio desde, zonas, horario real, números de habilitación (RII/RITE/gases fluorados/REA), seguro de RC, años de experiencia, 3–5 proyectos con barrio/m²/plazo/rango de precio y el número de WhatsApp Business.
3. **Ordena los upsells por palanca demostrable:** (1) campaña de reseñas y gestión de GBP (las reseñas recientes son el filtro nº 1 del consumidor y un factor de ranking al alza); (2) fotos profesionales (+25,4 pp en correlación con top-3, Localo);\[10\] (3) páginas de servicio adicionales; (4) dominio propio + email; (5) seguimiento de llamadas e informe mensual; (6) Google Ads / Local Services Ads para urgencias.
4. **Testea tú, no copies benchmarks de EE. UU.:** con el tracking de eventos, compara en tus propios clientes la barra fija frente a no tenerla, WhatsApp primero frente a llamada primero y formulario multipaso frente a uno de un paso. Con decenas de clientes del mismo nicho tendrás datos españoles que nadie publica, y eso también es un activo comercial.
5. **Antes de priorizar páginas por keyword, saca los volúmenes reales** en Google Keyword Planner (ubicación: Valencia/España). No he encontrado volúmenes publicados fiables para "fontanero valencia", "reformas valencia", "electricista valencia" o "desatascos valencia".

## Caveats

- **Casi todos los datos de conversión son de EE. UU. o globales anglosajones** (Unbounce, BrightLocal, Google/Ipsos 2013). Úsalos para la dirección (urgencia > proyecto, móvil, reseñas), no para prometer porcentajes a clientes españoles.
- **Whitespark es una encuesta de expertos**, no un experimento; Localo es correlación. Ninguno prueba causalidad.
- **Los tests de formularios multipaso** proceden de proveedores de formularios o agencias con incentivo comercial; algunos no publican tráfico ni significación.
- **Los precios** proceden de plataformas (Cronoshare, Habitissimo, PlanReforma) y de webs comerciales, con divergencias notables (por ejemplo, baño en Valencia: 1.800–4.000 € frente a 8.000–10.000 € "habitual").\[37\]\[39\] Publica siempre "desde" y rangos validados con cada cliente.
- **Ayudas:** la convocatoria valenciana de rehabilitación energética 2024–2026 (73,38 M€ en total; Programa 3 con 24,75 M€ y Programa 4 con 2 M€, fondos Next Generation) tenía plazo de solicitud hasta el 27 de febrero de 2026 y cubría obras hasta el 30 de junio de 2026.\[69\]\[70\]\[71\] A fecha de octubre de 2026 **no la anuncies como vigente** sin comprobar nuevas convocatorias; por eso el esquema incluye `ayudas.updatedAt`.
- **Ejemplos de webs:** son webs reales de Valencia identificadas en octubre de 2026; tres se revisaron completas y el resto solo por su descripción en buscadores. No he podido verificar widgets de reseñas ni notas de Google. Algunos (servicioxpress) son redes multiciudad cuyo modelo de páginas por zona roza el patrón doorway: inspírate en su CTA, no en su arquitectura. No incluyo ejemplos internacionales verificados; los referentes de EE. UU. (franquicias de fontanería y ventanas) siguen el mismo patrón descrito, pero no los he auditado en esta investigación.
- **Habilitaciones:** la fontanería no tiene en España una habilitación estatal equivalente a la de baja tensión; depende de normativa autonómica.\[72\] Muestra solo números de registro reales del cliente.

## Fuentes

1. [Commercial & Professional Services conversion rate benchmarks by Unbounce](https://unbounce.com/conversion-benchmark-report/professional-services-conversion-rate/)
2. [What's a good conversion rate? (Based on 41,000 landing pages)](https://unbounce.com/landing-pages/whats-a-good-conversion-rate/)
3. [35+ Local SEO Statistics You Need for 2026 - BrightLocal](https://www.brightlocal.com/resources/local-seo-statistics/)
4. [How to build a review strategy that works in 2026 - BrightLocal](https://www.brightlocal.com/webinars/how-to-build-a-review-strategy-that-works-in-2026/)
5. [Local Consumer Review Survey 2026: Star Ratings Keep ...](https://www.brightlocal.com/research/local-consumer-review-survey/)
6. [Online Reviews Statistics 2026](https://searchlab.nl/en/statistics/online-reviews-statistics-2026)
7. [Online Review Statistics 2026: Trust and Local SEO Data](https://www.digitalapplied.com/blog/online-review-statistics-2026-consumer-trust-data)
8. [Whitespark's Local Ranking Factors: 2023 vs. 2026](https://gmbapi.com/news/local-ranking-factors-comparison-2026-2023/)
9. [Whitespark's 2026 local ranking factors: what actually moved](https://seomadman.com/reports/whitespark-local-ranking-factors-2026)
10. [Whitespark's Local Search Ranking Factors Survey Meets Localo Data](https://localo.com/blog/whitespark-localo-data)
11. [Inside AdWords: New research shows that 70% of mobile searchers call a business directly from search results](https://adwords.googleblog.com/2013/09/new-research-shows-that-70-of-mobile.html?m=1)
12. [How to Use Google Call Extensions to Maximize Ad Revenue](https://www.invoca.com/blog/how-to-use-google-call-extensions-to-maximize-ad-revenue)
13. [Claves del Estudio Anual de Redes Sociales de IAB Spain 2025](https://blog.elogia.net/claves-del-estudio-anual-de-redes-sociales-de-iab-spain-2025)
14. [Así usamos las redes sociales en 2025 según el Informe de IAB Spain](https://www.ultimahora.es/noticias/economico/2025/05/30/2397293/asi-usamos-redes-sociales-2025-segun-informe-iab-spain.html)
15. [📊 Ayer se presentó, como cada año, el estudio de ...](https://x.com/xtomas/status/2056967982962594029)
16. [El 55% de las empresas españolas ya utiliza WhatsApp para comunicarse con sus clientes](https://www.periodicopublicidad.com/articulo/estudios/whatsapp-gana-peso-relacion-entre-empresas-clientes/20260526101512173926.html)
17. [Why Multi-Step Lead Forms Get up to 300% More Conversions](https://ventureharbour.com/multi-step-lead-forms-get-300-conversions/)
18. [Multi-Step Or Single-Step Forms? - Conversion Fanatics](https://conversionfanatics.com/multi-step-or-single-step-forms/)
19. [Why Multi-Step Forms Can Increase Conversions (Examples & Data)](https://instapage.com/blog/multi-step-form-part-2)
20. [Multi-Step vs Single-Step Form Statistics 2026 - Milan Novotný](https://www.milan-novotny.com/statistics/multi-step-vs-single-step-form-statistics/)
21. [Home Services Marketing Benchmarks 2026](https://foundrycro.com/blog/home-services-marketing-benchmarks-by-trade/)
22. [Turn Web Traffic Into Sales with Conversational AI - Invent](https://www.useinvent.com/blog/how-to-convert-website-traffic-into-sales-with-conversational-ai-and-whatsapp)
23. [Comunicación de instaladores/as que trabajan en empresas instaladoras/mantenedoras de instalaciones ELÉCTRICAS en BAJA TENSIÓN y de instalaciones TÉRMICAS, inscritas en el Registro Integrado Industrial (RII) y habilitadas para el ejercicio de esas actividades EN OTRAS COMUNIDADES AUTÓNOMAS (distintas a la Comunidad Valenciana). Alta y baja. Industria. - Sede PROP electrónica - Generalitat Valenciana](https://sede.gva.es/es/detall-tramit?id_proc=21282)
24. [Inscripción en el Registro Integrado Industrial (RII) de EMPRESAS instaladoras o mantenedoras de INSTALACIONES TÉRMICAS DE EDIFICIOS (calefacción, climatización y agua caliente sanitaria). Alta, modificación y cese. Industria - Sede electronica - Generalitat Valenciana](https://sede.gva.es/en/inicio/procedimientos?id_proc=403)
25. [¿Cuánto cuesta un fontanero en Valencia? Precios 2026](https://www.cronoshare.com/cuanto-cuesta/fontanero/valencia)
26. [¿Cuánto cuesta un servicio de fontanería? Precios 2026](https://www.cronoshare.com/cuanto-cuesta/servicio-fontaneria)
27. [Comprobador de Volumen de búsqueda de Palabra clave](https://es.semrush.com/free-tools/keyword-search-volume-checker)
28. [Cómo conseguir más clientes locales en Valencia con SEO](https://cristianprograma.com/blog/conseguir-clientes-locales-valencia/)
29. [HomeAndConstructionBusiness - Schema.org Type](https://schema.org/HomeAndConstructionBusiness)
30. [Fontanero Urgente Valencia 24 Horas | SME Fontanería y Reformas](https://smefontaneria24h.com/)
31. [Fontanero Valencia 24H](https://servicioxpress.com/fontanero-valencia/)
32. [Fontanero Valencia económico](https://servicioxpress.com/fontanero-valencia-economico/)
33. [Electricistas en Valencia](https://pcaelectricistasvalencia.es/)
34. [Electricista autorizado](https://fringenieros.es/electricista-valencia/)
35. [Cuánto cobra un fontanero por hora en 2026](https://presunow.com/es/blog/cuanto-cobra-fontanero)
36. [Desatascos Valencia 24H](https://servicioxpress.com/desatascos-valencia/)
37. [¿Cuánto cuesta reformar un baño? \[Precios 2026\]](https://www.habitissimo.es/presupuestos/reformas-banos)
38. [Precio Reforma baño en Valencia](https://planreforma.com/presupuestos/valencia/valencia/reforma_bano/)
39. [¿Cuánto cuesta reformar el baño en Valencia? Precios en 2026](https://www.cronoshare.com/cuanto-cuesta/reformar-bano/valencia)
40. [¿Cuánto cuesta reforma la cocina y el baño?](https://habitissimo.es/presupuestos/reforma-cocina-y-bano/valencia)
41. [Cuánto cuesta reformar una vivienda en Valencia](https://www.reformasdevalencia.com/cuanto-cuesta-reformar-una-vivienda-valencia/)
42. [Whitespark Local Search Ranking Factors 2026: Everything you need to know about the world's largest study on Local SEO - Harmo](https://harmo.me/en/blog/local-seo-ranking-factors-2026-whitespark)
43. [Reforma de Baños en Valencia | Precio y Garantía](https://reformasvalencia10.es/reforma-bano/)
44. [Reforma baño Valencia](https://empresareformaenvalencia.com/reforma-de-bano/)
45. [Reformas Integrales Valencia](https://www.cefvalencia.es/reformas-integrales/)
46. [Carpintería y Montaje a Medida en Valencia](https://carpinteriamartinfernandez.es/)
47. [Carpintería San José](https://carpinteriasanjose.es/empresa-de-carpinteria-en-valencia/)
48. [Ventanas de Aluminio en Valencia: precios 2026](https://deventanas.es/ventanas-aluminio-valencia/)
49. [¿Cuánto cuesta cambiar las ventanas de una casa?](https://www.habitissimo.es/presupuestos/cambiar-ventanas)
50. [¿Cuánto cuesta cambiar las ventanas de casa? Precios 2026](https://www.cronoshare.com/cuanto-cuesta/cambiar-ventanas-casa)
51. [Presupuesto Aluminio Valencia| Carpintería de aluminio, PVC, Hierro y acero](https://www.aluminiovalencia.com/presupuesto)
52. [Carpintería de aluminio y Ventanas PVC Castellón](https://www.tecniventana.com/)
53. [La obligatoriedad del IEEV CV Comunidad Valenciana](https://www.arquinvest.es/post/la-obligatoriedad-del-ieev-cv-comunidad-valenciana)
54. [Informe IEEV.CV](https://www.desproval.es/informe-ieev-cv/)
55. [Reparación de Tejados y Cubiertas en Valencia](https://www.tejadosdevalencia.com/)
56. [Rehabilitación de fachadas en Valencia](https://www.fachadas-k2-valencia.com/)
57. [Solucionar humedades en Valencia](https://www.fachadas-k2-valencia.com/es/solucionar-humedades-valencia)
58. [Aire Acondicionado Valencia - Instalación y Mantenimiento](https://vainsmon.es/aire-acondicionado-valencia/)
59. [Instalación aire acondicionado valencia - Instaladores Valencia](https://www.valenciaservicios.com/instalacion/aire-acondicionado-valencia/)
60. [Instalacion AIRE ACONDICIONADO por CONDUCTOS Valencia - CLIMELECTRIC](https://www.climelectric.com/ofertas-aire-acondicionado-conductos-valencia)
61. [El carné RITE ¿Qué es, para que sirve y cómo obtenerlo?](https://www.dcdformacion.com/que-es-el-carne-rite-y-como-obtenerlo/)
62. [Pasos para dar de alta una empresa RITE - DCDFORMACION](https://www.dcdformacion.com/pasos-para-dar-de-alta-una-empresa-rite/)
63. [Jardinero en Valencia](https://jardinerianarcis.es/)
64. [Mantenimiento de jardines y piscinas - Piscilimp SL](https://www.piscilimp.es/mantenimiento-de-jardines-y-piscinas/)
65. [Local SEO Ranking Factors in 2026: What the Whitespark Data Says (With Weights)](https://w3marketinghub.com/seo/local-seo-ranking/)
66. [Wedding Photographer Location Pages: Google's Doorway Rule](https://pixally.com/blog/wedding-photographer-location-pages)
67. [Local pack ranking factors: what moves the map - SERPHeroes](https://serpheroes.io/blog/local-pack-ranking-factors/)
68. [Definitive Plumber Schema Markup Guide: Technical SEO in 2026](https://plumberranks.com/plumber-schema-markup/)
69. [Vivienda convoca las ayudas para la rehabilitación energética en edificios del periodo 2024-2026](https://valenciaplaza.com/valenciaplaza/vivienda-convoca-ayudas-rehabilitacion-energetica-edificiosl-periodo-2024-2026)
70. [Vivienda convoca las ayudas para actuaciones de rehabilitación energética en edificios para el periodo 2024-2026](https://comunica.gva.es/es/detalle?id=388930192&site=373431293)
71. [Vivienda convoca las ayudas para actuaciones de rehabilitación energética en edificios para el periodo 2024-2026](https://gvanext.gva.es/es-es/contenido/1624/vivienda-convoca-las-ayudas-para-actuaciones-de-rehabilitacion-energetica-en-edificios-para-el-periodo-2024-2026)
72. [Cómo puedo verificar que una empresa instaladora o ...](https://www.cni-instaladores.com/wp-content/uploads/2025/09/CNI-DT-verificar-habilitacion-certificacion-empresa-instaladora.pdf)
