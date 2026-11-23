// Datos de ejemplo de «Perfil» (carpinteria-metalica-5). Negocio FICTICIO del norte de
// Madrid (taller en Alcobendas): nombre, NIF, dirección, teléfono, obras y reseñas inventados.
// Sin precios: la gama alta se presupuesta por proyecto. Todas las fotos y el vídeo de
// public/ejemplo/ son de relleno (origen "ia"; ver CREDITOS.md). Sin seo.indexar (noindex),
// sin analitica y sin marca (color del template).
import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Lumbral Ventanas",
    nombreLegal: "Lumbral Sistemas de Aluminio, S.L.",
    nif: "B87214590", // FICTICIO: dígito de control inválido
    sector: "Carpintería de aluminio",
    descripcionCorta: "Fabricamos e instalamos correderas minimalistas, hojas ocultas y puertas pivotantes para viviendas del norte de Madrid.",
    anioFundacion: 2009,
    registroMercantil: "Registro Mercantil de Madrid, tomo 0000, folio 00, hoja M-000000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000502",
    whatsapp: "+34600000502",
    email: "estudio@lumbralejemplo.example",
    direccion: { calle: "Calle Ejemplo, 31, nave 6", cp: "28108", ciudad: "Alcobendas", provincia: "Madrid" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "08:30", cierra: "18:30" },
      { dias: ["viernes"], abre: "08:30", cierra: "15:00" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000402",
  },
  zonas: ["Madrid", "Alcobendas", "San Sebastián de los Reyes", "Tres Cantos", "Pozuelo de Alarcón", "Las Rozas de Madrid", "Majadahonda", "Boadilla del Monte", "Colmenar Viejo"],
  valoracion: { media: 4.9, total: 41 },
  videoHero: {
    src: "/ejemplo/hero.mp4",
    srcAv1: "/ejemplo/hero-av1.mp4",
    poster: { src: "/ejemplo/hero-poster.jpg", alt: "Canto de un perfil de aluminio anodizado iluminado por una línea de luz", origen: "ia" },
  },
  imagenesHero: [
    { src: "/ejemplo/obra-01-moraleja.jpg", alt: "Ventanal corredero de tres hojas a la hora azul, con el salón iluminado", origen: "ia" },
  ],
  servicios: [
    {
      titulo: "Correderas elevables de gran formato",
      slug: "correderas-elevables",
      descripcion: "Hojas grandes que se elevan para correr sin esfuerzo y bajan para cerrar con firmeza.",
      contenido: [
        "Una corredera elevable mueve hojas de vidrio de gran tamaño con la fuerza de una mano. Al girar la manilla, la hoja sube unos milímetros, corre sobre su carril y, al cerrar, baja y queda apretada contra la junta.",
        "La fabricamos a medida en nuestra nave a partir de tus planos o de la medición en obra. Las piezas llegan numeradas y las montamos con ventosas, sin forzar el vidrio ni el hueco.",
        "Es la solución habitual para abrir un salón a la terraza o al jardín cuando el hueco es ancho y se quiere ver el mínimo de perfil.",
      ],
      incluye: ["Medición en obra", "Fabricación a medida en nuestro taller", "Montaje con ventosas", "Sellado perimetral", "Retirada de la carpintería antigua"],
      imagenes: [
        { src: "/ejemplo/solucion-elevable.jpg", alt: "Carril de una corredera elevable de aluminio en primer plano", origen: "ia" },
        { src: "/ejemplo/obra-03-pozuelo.jpg", alt: "Salón abierto a un jardín con la corredera cerrada", origen: "ia" },
      ],
      preguntas: [
        { pregunta: "¿Hace falta obra para instalarla?", respuesta: "Depende del hueco. Si se quiere el carril enrasado con el suelo, sí hay que rebajar el pavimento; lo vemos en la visita con tus planos." },
        { pregunta: "¿Se puede poner en un piso, no solo en un chalet?", respuesta: "Sí. Lo que manda es el tamaño de las hojas y cómo subirlas: si no caben por la escalera, estudiamos la grúa o el montaje por fachada." },
      ],
    },
    {
      titulo: "Ventanas de hoja oculta",
      slug: "hoja-oculta",
      descripcion: "Por fuera solo se ve el marco: la hoja queda escondida y el vidrio parece fijo.",
      contenido: [
        "En una ventana de hoja oculta la hoja que se abre queda escondida detrás del marco. Desde la calle se ve una línea fina de aluminio y el vidrio, como si fuera un paño fijo.",
        "Es la ventana que más se pide en reformas de pisos señoriales y áticos, donde se quiere luz sin cambiar el aspecto de la fachada.",
      ],
      incluye: ["Medición en obra", "Retirada de la carpintería antigua", "Premarco y remates interiores", "Sellado perimetral"],
      imagenes: [{ src: "/ejemplo/solucion-hoja-oculta.jpg", alt: "Encuentro de un marco de aluminio antracita con el muro de ladrillo", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Necesita permiso de la comunidad?", respuesta: "Si cambia el color o el despiece de la fachada, normalmente sí. Te preparamos la documentación para la junta." },
      ],
    },
    {
      titulo: "Correderas minimalistas",
      slug: "correderas-minimalistas",
      descripcion: "Perfiles casi invisibles entre hojas para que el salón y el exterior parezcan uno.",
      contenido: [
        "En una corredera minimalista el cruce entre hojas es tan estrecho que casi desaparece. El marco se empotra en suelo, techo y muros, y lo que queda a la vista es el vidrio.",
        "Exige una obra bien preparada: trabajamos con tu arquitecto o tu constructor desde el principio para que los huecos y los niveles estén listos cuando llega la carpintería.",
        "La fabricamos y la montamos nosotros, con el mismo equipo de principio a fin.",
      ],
      incluye: ["Revisión de planos con tu estudio", "Marcos empotrados en suelo y techo", "Montaje con ventosas", "Sellado perimetral"],
      imagenes: [{ src: "/ejemplo/solucion-minimalista.jpg", alt: "Cruce de dos hojas correderas de perfil mínimo con luz rasante", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cuándo tenemos que llamaros en la obra?", respuesta: "Antes de cerrar huecos y hacer el suelo. Así dejamos los premarcos y los rebajes en su sitio." },
      ],
    },
    {
      titulo: "Puertas pivotantes de entrada",
      slug: "puertas-pivotantes",
      descripcion: "Una puerta de entrada que gira sobre un eje y se abre con un dedo.",
      contenido: [
        "La puerta pivotante no cuelga de bisagras: gira sobre un pivote en el suelo y otro en el techo. Así puede ser más ancha y más alta que una puerta normal y abrirse sin esfuerzo.",
        "La fabricamos en aluminio lacado, con el tirador que elijas, y la montamos con el pivote nivelado al milímetro.",
      ],
      incluye: ["Medición en obra", "Pivote inferior y superior de acero inoxidable", "Montaje y regulación", "Retirada de la puerta antigua"],
      imagenes: [{ src: "/ejemplo/solucion-pivotante.jpg", alt: "Pivote inferior de acero inoxidable de una puerta de aluminio", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cuánto tarda en fabricarse?", respuesta: "Te damos la fecha de montaje por escrito al cerrar el presupuesto." },
      ],
    },
    {
      titulo: "Cerramientos de porche",
      slug: "cerramientos-porche",
      descripcion: "Convierte el porche en una estancia más de la casa, cerrada y luminosa.",
      contenido: [
        "Cerramos porches con correderas de vidrio grande para que se puedan abrir del todo en verano y usar en invierno.",
        "Estudiamos la estructura existente y te decimos qué se puede hacer antes de presupuestar.",
      ],
      incluye: ["Visita y estudio de la estructura", "Correderas de vidrio de gran formato", "Remates con la cubierta"],
      imagenes: [],
      preguntas: [
        { pregunta: "¿Necesito licencia?", respuesta: "Depende del ayuntamiento. Te decimos qué piden en el tuyo y te pasamos la documentación técnica." },
      ],
    },
    {
      titulo: "Oscilobatientes con rotura de puente térmico",
      slug: "oscilobatientes-rpt",
      descripcion: "La ventana de siempre, bien hecha: abre en batiente y en abatible para ventilar.",
      contenido: [
        "La oscilobatiente abre hacia dentro como una ventana normal o se inclina por arriba para ventilar sin abrir del todo.",
        "La montamos con rotura de puente térmico y sellado perimetral, retirando la ventana antigua el mismo día.",
      ],
      incluye: ["Medición en obra", "Retirada de la carpintería antigua", "Montaje el mismo día", "Sellado perimetral"],
      imagenes: [{ src: "/ejemplo/solucion-oscilobatiente.jpg", alt: "Herraje de una ventana oscilobatiente en primer plano", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Se cambian sin obra?", respuesta: "En la mayoría de los casos, sí: se retira la ventana vieja y se coloca la nueva en el mismo hueco." },
      ],
    },
  ],
  trabajos: [
    {
      titulo: "Ventanal de salón en La Moraleja",
      slug: "ventanal-la-moraleja",
      descripcion: "Una corredera elevable de tres hojas que abre todo el salón al jardín.",
      ubicacion: "La Moraleja, Alcobendas",
      anio: 2025,
      servicio: "correderas-elevables",
      superficie: "18 m²",
      duracion: "3 días",
      contenido: [
        "Sustituimos un ventanal de tres piezas fijas por una corredera elevable de tres hojas. Las hojas se subieron por el jardín y se montaron con ventosas.",
        "La obra se coordinó con el interiorista para que el suelo y el carril quedaran a nivel.",
      ],
      imagenes: [{ src: "/ejemplo/obra-01-moraleja.jpg", alt: "Ventanal corredero de tres hojas a la hora azul, con el salón iluminado", origen: "ia" }],
      testimonio: { autor: "Carlota M.", texto: "Ahora el salón y el jardín son la misma habitación." },
    },
    {
      titulo: "Ático en Chamberí",
      slug: "atico-chamberi",
      descripcion: "Ventanas de hoja oculta en un ático con vistas a los tejados, sin cambiar la fachada.",
      ubicacion: "Chamberí, Madrid",
      anio: 2025,
      servicio: "hoja-oculta",
      superficie: "11 m²",
      duracion: "2 días",
      contenido: [
        "Las ventanas de madera originales estaban pintadas y no cerraban. Las cambiamos por ventanas de hoja oculta en antracita, con el mismo despiece que pedía la comunidad.",
      ],
      imagenes: [{ src: "/ejemplo/obra-02-chamberi.jpg", alt: "Ático con ventanas de hoja oculta y vistas a los tejados de Madrid", origen: "ia" }],
      antes: { src: "/ejemplo/obra-02-antes.jpg", alt: "La misma ventana antes: madera vieja pintada de blanco", origen: "ia" },
    },
    {
      titulo: "Salón abierto al jardín en Pozuelo",
      slug: "salon-pozuelo",
      descripcion: "Correderas minimalistas empotradas en suelo y techo en una vivienda nueva.",
      ubicacion: "Pozuelo de Alarcón",
      anio: 2024,
      servicio: "correderas-minimalistas",
      superficie: "14 m²",
      contenido: [
        "Trabajamos con el estudio de arquitectura desde los planos para dejar los rebajes de suelo y techo preparados.",
      ],
      imagenes: [{ src: "/ejemplo/obra-03-pozuelo.jpg", alt: "Salón abierto a un jardín con una corredera minimalista", origen: "ia" }],
    },
    {
      titulo: "Puerta pivotante en Tres Cantos",
      slug: "pivotante-tres-cantos",
      descripcion: "Puerta de entrada pivotante en antracita para una vivienda unifamiliar.",
      ubicacion: "Tres Cantos",
      anio: 2026,
      servicio: "puertas-pivotantes",
      superficie: "3 m²",
      duracion: "1 día",
      contenido: [
        "Puerta de entrada de suelo a techo con pivote de acero inoxidable y tirador vertical.",
      ],
      imagenes: [{ src: "/ejemplo/obra-04-tres-cantos.jpg", alt: "Puerta pivotante antracita de noche, entreabierta", origen: "ia" }],
    },
    {
      titulo: "Porche acristalado en Las Rozas",
      slug: "porche-las-rozas",
      descripcion: "Cerramiento de un porche con correderas de vidrio grande.",
      ubicacion: "Las Rozas de Madrid",
      anio: 2024,
      servicio: "cerramientos-porche",
      superficie: "22 m²",
      duracion: "4 días",
      contenido: [
        "Cerramos un porche de 22 m² con correderas que se abren del todo en verano.",
      ],
      imagenes: [{ src: "/ejemplo/obra-05-las-rozas.jpg", alt: "Porche acristalado iluminado por dentro al anochecer", origen: "ia" }],
    },
  ],
  galeria: [],
  resenas: [
    { autor: "Carlota M.", puntuacion: 5, fecha: "2026-10-03", fuente: "google", texto: "El montaje del ventanal de 3 metros fue impecable. Vinieron tres personas, protegieron el suelo y en dos días estaba todo sellado y limpio. Se nota que lo fabrican ellos." },
    { autor: "Javier P.", puntuacion: 5, fecha: "2026-08", fuente: "google", texto: "Soy arquitecto y les he pasado ya tres obras. Lo que más valoro es la coordinación: vienen a obra antes de que cerremos huecos, revisan niveles con el constructor y dejan los premarcos donde tienen que ir. En la última, una corredera minimalista empotrada en suelo y techo, no hubo que repasar nada. Cumplen la fecha que ponen por escrito y, cuando algo cambia, avisan con tiempo. Para un estudio pequeño como el nuestro es muy difícil encontrar un taller así." },
    { autor: "Elena G.", puntuacion: 5, fecha: "2026-06", fuente: "google", texto: "Silencio total en el salón. Vivimos junto a una carretera y ahora no se oye nada." },
    { autor: "Luis F.", puntuacion: 4, fecha: "2026-04", fuente: "google", texto: "Muy buen acabado; el plazo se alargó dos semanas, pero avisaron con tiempo." },
    { autor: "Marta S.", puntuacion: 5, fecha: "2026-02-11", fuente: "google", texto: "Cuidan cada remate. La junta con el muro ha quedado perfecta." },
  ],
  proceso: [
    { titulo: "Visita con planos", texto: "Vemos la obra y tus planos, o los del estudio." },
    { titulo: "Propuesta técnica", texto: "Te proponemos el sistema y el despiece." },
    { titulo: "Presupuesto cerrado", texto: "Un precio por proyecto, sin sorpresas." },
    { titulo: "Fabricación", texto: "En nuestra nave, con fecha de montaje por escrito." },
    { titulo: "Montaje", texto: "Nuestro equipo, con ventosas y el suelo protegido." },
    { titulo: "Revisión", texto: "Volvemos a los seis meses a ajustar." },
  ],
  acreditaciones: [],
  garantias: [
    "Presupuesto cerrado por proyecto",
    "Fecha de montaje por escrito",
    "Montaje con nuestro equipo, sin subcontratas",
    "Revisión de ajuste a los seis meses",
  ],
  marcas: ["Cortizo", "Technal"],
  empresa: {
    historia: [
      "Lumbral empezó en 2009 en una nave pequeña de Alcobendas, fabricando ventanas para reformas de pisos. Con los años fuimos especializándonos en piezas grandes: correderas de salón, puertas de entrada y cerramientos que otros talleres no querían montar.",
      "Hoy trabajamos sobre todo con estudios de arquitectura e interiorismo del norte de Madrid. Fabricamos, montamos y revisamos con el mismo equipo, sin subcontratas.",
    ],
    imagenes: [
      { src: "/ejemplo/taller-ajuste.jpg", alt: "Antebrazo con guante ajustando un herraje en el taller", origen: "ia" },
      { src: "/ejemplo/taller-perfiles.jpg", alt: "Perfiles de aluminio apoyados en un caballete del taller", origen: "ia" },
    ],
    equipo: [
      { nombre: "Andrés", cargo: "Dirección técnica" },
      { nombre: "Beatriz", cargo: "Proyectos con estudios" },
      { nombre: "Iván", cargo: "Jefe de montaje" },
    ],
  },
  preguntas: [
    { pregunta: "¿Cuánto tardáis en fabricar?", respuesta: "Depende del sistema y del tamaño. Al cerrar el presupuesto te damos la fecha de montaje por escrito." },
    { pregunta: "¿Montáis vidrios de gran formato?", respuesta: "Sí. Los subimos con ventosas y, si no caben por la escalera, estudiamos grúa o montaje por fachada." },
    { pregunta: "¿Trabajáis con mi arquitecto?", respuesta: "Sí, es lo más habitual. Revisamos los planos con el estudio y vamos a obra antes de cerrar huecos." },
    { pregunta: "¿Qué mantenimiento necesita?", respuesta: "Limpiar los carriles y revisar el ajuste. Volvemos a los seis meses del montaje para hacerlo contigo." },
  ],
  redes: { instagram: "https://instagram.com/lumbral.ejemplo" },
  seo: {
    titulo: "Carpintería de aluminio en Alcobendas | Lumbral",
    descripcion: "Correderas minimalistas, hojas ocultas y puertas pivotantes fabricadas e instaladas en el norte de Madrid.",
    url: "https://lumbralejemplo.example",
  },
});
