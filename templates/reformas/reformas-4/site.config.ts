import { defineSiteConfig } from "@andrei-leads/core";

/*
 * Datos de ejemplo de «Diario de obra» (reformas-4). Negocio FICTICIO de Sevilla: dirección «Calle
 * Ejemplo», email .example, ficha de Google con cid=000…, NIF con dígito de control inválido y números de
 * registro «(ficticio)». Las fotos de public/ejemplo/ son relleno hasta que lleguen las de IA (origen
 * "ia": la pieza Foto pinta «Imagen generada con IA»). Sin seo.indexar ni analítica: los activa cada web.
 * Los precios «desde» son de ejemplo (los pide el diseño): borrarlos en la web del cliente.
 */
const ia = (archivo: string, alt: string) => ({ src: `/ejemplo/${archivo}`, alt, origen: "ia" as const });

export default defineSiteConfig({
  negocio: {
    nombre: "Reformas Hermanos Ojeda Barroso",
    nombreLegal: "Hermanos Ojeda Barroso Reformas, S.L.",
    nif: "B90538175",
    sector: "Reformas integrales",
    descripcionCorta: "Reformas de pisos y casas antiguas en Sevilla con un encargado por obra y un parte semanal con fotos.",
    anioFundacion: 1998,
    registroMercantil: "Registro Mercantil de Sevilla, tomo 0000, folio 00, hoja SE-000000 (ficticio)",
    tipoSchema: ["GeneralContractor"],
  },
  contacto: {
    telefono: "+34600044004",
    whatsapp: "+34600044004",
    email: "obras@ojedabarroso.example",
    direccion: { calle: "Calle Ejemplo, 52", cp: "41008", ciudad: "Sevilla", provincia: "Sevilla" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "07:30", cierra: "15:30" },
      { dias: ["sabado"], abre: "09:00", cierra: "13:00" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000404",
  },
  zonas: ["Sevilla", "Dos Hermanas", "Mairena del Aljarafe", "Tomares", "San Juan de Aznalfarache", "Camas", "Alcalá de Guadaíra", "Bormujos"],
  servicios: [
    {
      titulo: "Reforma integral", slug: "reforma-integral",
      descripcion: "Pisos completos: tabiques, instalaciones, solería, baño y cocina con un solo encargado.",
      contenido: [
        "Una reforma integral es cambiarlo casi todo a la vez: distribución, electricidad, fontanería, solería, carpintería, baño y cocina. Por eso lo primero es el orden.",
        "Antes de empezar firmas un presupuesto por partidas y una fecha de fin. Durante la obra tienes un encargado que coge el teléfono y un parte cada viernes con fotos.",
        "Protegemos zonas comunes, avisamos a la comunidad y retiramos los escombros cada semana. Al terminar, limpieza completa y repaso contigo, habitación por habitación.",
      ],
      incluye: ["Visita y medición", "Presupuesto por partidas", "Derribo y retirada de escombros", "Electricidad y fontanería nuevas", "Solería, alicatado y pintura", "Limpieza final"],
      imagenes: [ia("servicio-integral.jpg", "Pasillo de un piso en obra con borriquetas y plásticos de protección")],
      preguntas: [
        { pregunta: "¿Podemos vivir en el piso durante la obra?", respuesta: "En una integral, no lo recomendamos. Si es por fases, lo organizamos para que tengáis siempre un baño." },
        { pregunta: "¿Quién pide la licencia?", respuesta: "Nosotros. Tramitamos la declaración responsable o la licencia que pida el Ayuntamiento." },
      ],
    },
    {
      titulo: "Rehabilitación de casa antigua", slug: "rehabilitacion-de-casa-antigua",
      descripcion: "Casas del centro y de Heliópolis: vigas, muros de carga, patios y solería de barro.",
      contenido: [
        "Las casas antiguas de Sevilla tienen muros gruesos, vigas de madera y patios que merece la pena conservar. También humedades y tuberías de otra época.",
        "Revisamos la estructura antes de presupuestar y te decimos qué se puede salvar. Lo que se recupera, se recupera con oficio: barro, ladrillo visto y cal.",
        "Una rehabilitación lleva meses. Por eso la dividimos en fases con fecha y ves cada semana en qué punto está.",
      ],
      incluye: ["Revisión de vigas y muros", "Tratamiento de humedades", "Recuperación de solería y ladrillo", "Instalaciones nuevas", "Patio y azotea"],
      imagenes: [ia("servicio-casa-antigua.jpg", "Muro de ladrillo visto con una viga de madera en una casa antigua")],
      preguntas: [],
    },
    {
      titulo: "Reforma de baño", slug: "reforma-de-bano",
      descripcion: "Cambio de bañera por plato, fontanería nueva y alicatado. Unas dos semanas.",
      contenido: [
        "Un baño se reforma en unas dos semanas si no hay sorpresas en las tuberías. Te decimos el plazo exacto por escrito antes de empezar.",
        "Cambiamos la bañera por un plato a ras de suelo, renovamos la fontanería y alicatamos hasta el techo o a media altura, como prefieras.",
      ],
      incluye: ["Retirada de bañera y sanitarios", "Fontanería nueva", "Plato de ducha a ras de suelo", "Alicatado y solería", "Sanitarios y grifería"],
      imagenes: [ia("servicio-bano.jpg", "Plato de ducha recién colocado con cinta de carrocero en los bordes")],
      preguntas: [
        { pregunta: "¿Cuántos días estamos sin baño?", respuesta: "Lo que dure la obra, normalmente unas dos semanas. Si es el único baño, lo planificamos contigo." },
      ],
      precioDesde: "desde 6.500 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Reforma de cocina", slug: "reforma-de-cocina",
      descripcion: "Tomas nuevas, alicatado y montaje de muebles, con el plazo cerrado.",
      contenido: [
        "Coordinamos todo lo que lleva una cocina: tomas de agua y luz, salida de humos, alicatado, solería y montaje de muebles y electrodomésticos.",
        "Si quieres unir la cocina al salón, revisamos antes el tabique y te decimos qué hace falta.",
      ],
      incluye: ["Desmontaje de la cocina vieja", "Tomas de agua, luz y gas", "Alicatado y solería", "Montaje de muebles"],
      imagenes: [],
      preguntas: [],
    },
    {
      titulo: "Solería de barro, terrazo y porcelánico", slug: "soleria-de-barro-terrazo-y-porcelanico",
      descripcion: "Levantamos, nivelamos y colocamos. También recuperamos barro y terrazo antiguos.",
      contenido: [], incluye: [], preguntas: [],
      imagenes: [ia("servicio-soleria.jpg", "Baldosas de barro apiladas junto a una llana sobre el suelo")],
      precioDesde: "desde 38 €/m²", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Patios y azoteas", slug: "patios-y-azoteas",
      descripcion: "Impermeabilización, solado y desagües para que la azotea deje de filtrar.",
      contenido: [], incluye: [], imagenes: [], preguntas: [],
    },
  ],
  trabajos: [
    {
      titulo: "Baño en Triana", slug: "bano-en-triana", ubicacion: "Triana", anio: 2026, servicio: "reforma-de-bano",
      superficie: "9 m²", duracion: "14 días",
      descripcion: "Baño en un tercero sin ascensor: bañera fuera, plato a ras de suelo, fontanería nueva y alicatado hasta el techo.",
      contenido: [
        "Fuimos a medir un lunes y el presupuesto por partidas llegó dos días después. El baño tenía la bañera de origen y las tuberías de hierro.",
        "Picamos hasta el ladrillo, abrimos rozas nuevas y cambiamos la fontanería a multicapa. Cada viernes Rocío y Fernando recibían el parte con fotos.",
        "Al acabar el plazo retiramos los plásticos, limpiamos la escalera y entregamos el baño con la garantía firmada.",
      ],
      imagenes: [
        ia("obra-triana-fin.jpg", "Baño terminado con plato de ducha a ras de suelo y luz de ventana"),
        ia("obra-triana-curso.jpg", "Baño en obra con rozas abiertas, un foco en trípode y plástico en la puerta"),
      ],
      testimonio: { autor: "Rocío y Fernando", texto: "Nos dijeron catorce días y fueron catorce. Lo mejor fue saber cada viernes cómo iba la obra sin tener que llamar." },
    },
    {
      titulo: "Piso de 1965 en Nervión", slug: "piso-de-1965-en-nervion", ubicacion: "Nervión", anio: 2025, servicio: "reforma-integral",
      superficie: "92 m²", duracion: "11 semanas",
      descripcion: "Piso de un bloque de 1965: unimos cocina y salón, electricidad nueva y porcelánico en toda la casa.",
      contenido: [
        "El piso conservaba la distribución original, con una cocina pequeña y cerrada. La familia quería un salón con cocina abierta.",
        "Tiramos dos tabiques, rehicimos la instalación eléctrica entera y colocamos porcelánico de gran formato en toda la vivienda.",
        "La comunidad tuvo el ascensor protegido durante toda la obra y los escombros salieron cada semana.",
      ],
      imagenes: [
        ia("obra-nervion-fin.jpg", "Salón terminado con cocina abierta y suelo porcelánico claro"),
        ia("obra-nervion-curso.jpg", "Piso con tabiques derribados y plásticos de protección en el suelo"),
      ],
    },
    {
      titulo: "Cocina en Los Remedios", slug: "cocina-en-los-remedios", ubicacion: "Los Remedios", anio: 2025, servicio: "reforma-de-cocina",
      superficie: "12 m²",
      descripcion: "Cocina de 1980 renovada entera: tomas nuevas, alicatado y muebles hasta el techo.",
      contenido: [
        "La cocina era de 1980, con azulejo marrón y una sola toma de corriente junto a la nevera.",
        "Desmontamos todo, hicimos tomas nuevas de agua y luz y alicatamos con una pieza clara de formato rectangular.",
        "El montaje de muebles lo coordinamos con el carpintero para que la cocina quedara lista en una sola semana de remates.",
      ],
      imagenes: [
        ia("obra-remedios-fin.jpg", "Cocina terminada con muebles claros hasta el techo"),
        ia("obra-remedios-curso.jpg", "Cocina sin muebles con las tomas nuevas a la vista"),
      ],
      antes: ia("obra-remedios-antes.jpg", "La misma cocina antes de la obra, con azulejo marrón de 1980"),
    },
    {
      titulo: "Casa con patio en Heliópolis", slug: "casa-con-patio-en-heliopolis", ubicacion: "Heliópolis", anio: 2024, servicio: "rehabilitacion-de-casa-antigua",
      superficie: "180 m²", duracion: "6 meses",
      descripcion: "Casa de los años veinte: vigas recuperadas, humedades tratadas y patio con solería de barro.",
      contenido: [
        "La casa llevaba años cerrada. Las vigas del salón estaban sanas, pero había humedad en los muros de planta baja.",
        "Tratamos los muros, recuperamos las vigas y levantamos el patio para colocar barro nuevo con buena pendiente.",
        "Fueron seis meses en cuatro fases, cada una con su fecha. La familia visitaba la obra los sábados con el encargado.",
      ],
      imagenes: [
        ia("obra-heliopolis-fin.jpg", "Patio terminado con solería de barro y paredes encaladas"),
        ia("obra-heliopolis-curso.jpg", "Casa antigua en obra con las vigas de madera al descubierto"),
      ],
    },
    {
      titulo: "Azotea en Dos Hermanas", slug: "azotea-en-dos-hermanas", ubicacion: "Dos Hermanas", anio: 2026, servicio: "patios-y-azoteas",
      superficie: "60 m²", duracion: "8 días",
      descripcion: "Azotea que filtraba al dormitorio: impermeabilización nueva, desagües y solado.",
      contenido: [
        "Cada vez que llovía aparecía una mancha en el techo del dormitorio de abajo.",
        "Levantamos la solería, saneamos el soporte, impermeabilizamos con lámina y rehicimos los desagües.",
        "Después solamos de nuevo y dejamos la azotea limpia. Desde entonces no ha vuelto a filtrar.",
      ],
      imagenes: [ia("obra-dos-hermanas-fin.jpg", "Azotea impermeabilizada y solada de nuevo")],
    },
  ],
  valoracion: { media: 4.8, total: 143 },
  resenas: [
    { autor: "Rocío P.", puntuacion: 5, fecha: "2026-09", fuente: "google", texto: "Cada viernes nos mandaban fotos de cómo iba la obra." },
    { autor: "Manuel G.", puntuacion: 5, fecha: "2026-07", fuente: "google", texto: "Heredamos la casa de mis abuelos en el centro y pensábamos que las vigas no tenían arreglo. Antonio vino a verla, nos explicó qué se podía salvar y qué no, y nos dio un presupuesto por partidas sin sorpresas. La obra duró lo que dijeron. Recuperaron las vigas del salón y el barro del patio. Se nota que conocen este tipo de casas y que les gusta hacerlo bien." },
    { autor: "Ana L.", puntuacion: 4, fecha: "2026-04", fuente: "google", texto: "Acabaron en fecha. El polvo, el justo para una obra así." },
    { autor: "Curro D.", puntuacion: 5, fecha: "2026-02", fuente: "google", texto: "Un encargado que coge el teléfono. Eso no tiene precio." },
    { autor: "Pilar S.", puntuacion: 5, fecha: "2025-11", fuente: "google", texto: "Muy formales." },
    { autor: "Javier M.", puntuacion: 5, fecha: "2025-09", fuente: "google", texto: "La azotea ya no filtra y la dejaron limpia." },
  ],
  proceso: [
    { titulo: "Visita y medición", texto: "Vamos a la obra, medimos y vemos contigo qué quieres hacer. Si hay algo que revisar, como vigas o tuberías, lo miramos ese día." },
    { titulo: "Presupuesto por partidas", texto: "Te mandamos el presupuesto desglosado: cada partida con su precio. Sabes qué pagas y qué no entra." },
    { titulo: "Contrato con fecha de fin", texto: "Firmamos el precio y el día en que acabamos. Si algo cambia, lo hablamos antes y queda por escrito." },
    { titulo: "Obra con parte semanal por WhatsApp", texto: "Tienes un encargado para toda la obra. Cada viernes te manda un parte con fotos de lo que se ha hecho." },
    { titulo: "Limpieza y repaso", texto: "Retiramos plásticos y escombros, limpiamos y repasamos contigo cada estancia antes de entregar." },
    { titulo: "Revisión y garantía", texto: "Volvemos a revisar la obra pasado un tiempo. La albañilería tiene tres años de garantía." },
  ],
  acreditaciones: [{ nombre: "Registro de Empresas Acreditadas (REA)", numero: "n.º 00/0000000 (ficticio)" }],
  garantias: ["Fecha de fin por contrato", "Parte semanal con fotos", "Un encargado por obra", "Garantía de 3 años en albañilería"],
  marcas: ["Weber", "Sika", "Keraben"],
  empresa: {
    historia: [
      "Antonio Ojeda empezó como albañil en 1998 con su hermano Rafael. Las primeras obras fueron baños y cocinas en Triana y Los Remedios.",
      "Con los años llegaron los pisos enteros y las casas antiguas del centro. Inma Barroso se encargó de los presupuestos y de algo que entonces nadie hacía: avisar a cada cliente de cómo iba su obra.",
      "Hoy somos ocho personas con albañiles propios. Seguimos trabajando igual: un encargado por obra, una fecha de fin firmada y un parte cada viernes.",
    ],
    imagenes: [
      ia("empresa-parte.jpg", "Cuaderno de obra y metro sobre un saco de cemento"),
      ia("empresa-andamio.jpg", "Andamio interior al amanecer en una casa en obra"),
    ],
    equipo: [
      { nombre: "Antonio Ojeda", cargo: "Encargado general" },
      { nombre: "Rafael Ojeda", cargo: "Jefe de obra" },
      { nombre: "Inma Barroso", cargo: "Presupuestos y administración" },
    ],
  },
  imagenesHero: [],
  galeria: [],
  preguntas: [
    { pregunta: "¿Cuánto tarda una reforma integral de un piso?", respuesta: "Un piso de unos 90 m² suele llevar entre 10 y 12 semanas. La fecha exacta va en el contrato." },
    { pregunta: "¿Qué pasa si la obra se retrasa?", respuesta: "La fecha de fin está firmada. Si hay un imprevisto, te lo contamos ese mismo día y acordamos por escrito cómo afecta." },
    { pregunta: "¿Cómo sé cómo va mi obra?", respuesta: "Cada viernes el encargado te manda por WhatsApp un parte con fotos. Y puedes llamarle cuando quieras." },
    { pregunta: "¿Os encargáis de los permisos?", respuesta: "Sí. Tramitamos la licencia o la declaración responsable y avisamos a la comunidad." },
    { pregunta: "¿Trabajáis fuera de Sevilla capital?", respuesta: "Sí, en el Aljarafe, Dos Hermanas y Alcalá de Guadaíra. La lista completa está en esta página." },
  ],
  // Vídeo de la sección «Así avanza una obra» (encargo §5). No hay archivos de vídeo todavía:
  // descomentar cuando existan public/ejemplo/video-obra.mp4 y video-obra-av1.mp4.
  // videoPano: {
  //   src: "/ejemplo/video-obra.mp4",
  //   srcAv1: "/ejemplo/video-obra-av1.mp4",
  //   poster: { src: "/ejemplo/video-obra-poster.jpg", alt: "Estancia en obra con andamio y foco", origen: "ia" },
  // },
  redes: { facebook: "https://www.facebook.com/ojedabarroso.ejemplo" },
  seo: {
    titulo: "Reformas integrales en Sevilla | Ojeda Barroso",
    descripcion: "Reformas de pisos y casas antiguas en Sevilla con un encargado por obra, fecha de fin por contrato y parte semanal con fotos.",
    url: "https://ojeda-barroso-ejemplo.example",
  },
});
