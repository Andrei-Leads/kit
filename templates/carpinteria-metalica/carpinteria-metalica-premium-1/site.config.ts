// Datos de ejemplo de «Marco» (carpinteria-metalica-premium-1). Negocio FICTICIO de
// Barcelona (taller en Sant Cugat del Vallès): nombre, NIF, dirección, teléfono, reseñas
// y precios inventados. Todas las fotos de public/ejemplo/ son de relleno (origen "ia").
// Sin seo.indexar (noindex), sin analitica y sin marca (color del template).
import { defineSiteConfig } from "@andrei-leads/core";

const ia = "ia" as const;

export default defineSiteConfig({
  negocio: {
    nombre: "Lluerna Tancaments",
    nombreLegal: "Lluerna Cerramientos de Aluminio, S.L.",
    nif: "B00000001", // FICTICIO
    sector: "Carpintería de aluminio",
    descripcionCorta: "Fabricamos e instalamos ventanas, balconeras, cerramientos y puertas de aluminio y PVC en Barcelona y el Vallès.",
    anioFundacion: 2007,
    registroMercantil: "Registro Mercantil de Barcelona, tomo 0000, folio 00, hoja B-000000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600111451",
    whatsapp: "+34600111451",
    email: "taller@lluerna-tancaments.example",
    direccion: { calle: "Calle Ejemplo 18, nave 4", cp: "08174", ciudad: "Sant Cugat del Vallès", provincia: "Barcelona" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "15:00", cierra: "18:00" },
      { dias: ["viernes"], abre: "08:00", cierra: "14:00" },
    ],
    mensajeWhatsapp: "Hola, os escribo desde vuestra web. Os mando fotos de la ventana que quiero cambiar:",
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000451",
  },
  zonas: ["Sant Cugat del Vallès", "Barcelona", "Rubí", "Cerdanyola del Vallès", "Sant Quirze del Vallès", "Terrassa", "Sabadell", "Esplugues de Llobregat", "Sant Just Desvern"],
  imagenesHero: [
    { src: "/ejemplo/hero-1.jpg", alt: "Salón con una balconera de aluminio gris y la luz de la mañana sobre el suelo hidráulico", origen: ia },
    { src: "/ejemplo/hero-2.jpg", alt: "Mano abriendo la manilla de una ventana de aluminio", origen: ia },
    { src: "/ejemplo/hero-3.jpg", alt: "Luz de sol sobre un alféizar de mármol junto al marco de la ventana", origen: ia },
  ],
  // Vídeo del pano (core 0.7.0). Aún no hay clips: el pano usa su foto de respaldo
  // (galeria[0] → trabajos[0].imagenes[0] → Luz). Cuando existan public/ejemplo/pano.mp4
  // (H.264, ≤ 2,5 MB) y pano-av1.mp4 (AV1, ≤ 1,5 MB), descomenta el bloque
  // (pano-poster.jpg ya está en public/ejemplo/; ver CREDITOS.md, hueco 4).
  // videoPano: {
  //   src: "/ejemplo/pano.mp4",
  //   srcAv1: "/ejemplo/pano-av1.mp4",
  //   poster: { src: "/ejemplo/pano-poster.jpg", alt: "Habitación con una ventana nueva por la que entra la luz de la mañana", origen: ia },
  // },
  valoracion: { media: 4.9, total: 58 },
  servicios: [
    {
      titulo: "Ventanas de aluminio y PVC",
      slug: "ventanas",
      descripcion: "Ventanas a medida, practicables u oscilobatientes, con el perfil más fino que permite el hueco.",
      contenido: [
        "Medimos cada hueco en casa y fabricamos la ventana en nuestro taller de Sant Cugat, así controlamos plazo y acabado.",
        "Te enseñamos muestras de perfil y de color en tu propia ventana, con la luz real de la habitación.",
        "El día del montaje retiramos la ventana vieja, colocamos la nueva y sellamos por dentro y por fuera.",
      ],
      incluye: ["Medición en casa", "Retirada de la ventana antigua", "Montaje y sellado", "Ajuste final de las hojas"],
      imagenes: [
        { src: "/ejemplo/servicio-ventanas-1.jpg", alt: "Dormitorio con una ventana oscilobatiente de aluminio gris entreabierta", origen: ia },
        { src: "/ejemplo/servicio-ventanas-2.jpg", alt: "Encuentro del marco nuevo de aluminio con el alféizar", origen: ia },
      ],
      preguntas: [
        { pregunta: "¿Hay que hacer obra para cambiar las ventanas?", respuesta: "En la mayoría de pisos no: colocamos la ventana nueva en el hueco existente y rematamos el contorno." },
      ],
      mensajeWhatsapp: "Hola, quiero cambiar las ventanas de casa. Os mando fotos de los huecos:",
      precioDesde: "desde 420 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Balconeras y correderas",
      slug: "balconeras-correderas",
      descripcion: "Balconeras para pisos de techos altos y correderas que se abren sin esfuerzo.",
      contenido: [
        "En los pisos del Eixample y de Gràcia la balconera es la pieza que más luz da. La hacemos a medida de huecos altos y estrechos.",
        "Respetamos la persiana de lamas o la cambiamos por una igual, para que la fachada no cambie.",
      ],
      incluye: ["Medición de huecos altos", "Persiana de lamas a juego", "Montaje en un día por hueco"],
      imagenes: [{ src: "/ejemplo/servicio-balconeras-1.jpg", alt: "Balconera corredera abierta a un balcón con barandilla de hierro", origen: ia }],
      preguntas: [{ pregunta: "¿Se mantiene el aspecto de la fachada?", respuesta: "Sí: elegimos color y despiece para que desde la calle se vea como el resto del edificio." }],
      mensajeWhatsapp: "Hola, quiero cambiar las balconeras. Os mando fotos:",
    },
    {
      titulo: "Cerramientos de terraza y galería",
      slug: "cerramientos",
      descripcion: "Cerramos galerías y terrazas con hojas correderas para ganar una habitación con luz.",
      contenido: [
        "Una galería bien cerrada se usa todo el año. Dibujamos las hojas para que se abra entera en verano.",
        "Antes de empezar te explicamos qué permisos pide tu comunidad y tu ayuntamiento.",
      ],
      incluye: ["Visita y propuesta de despiece", "Hojas correderas", "Remates interiores"],
      imagenes: [{ src: "/ejemplo/servicio-cerramientos-1.jpg", alt: "Galería cerrada con hojas correderas de aluminio", origen: ia }],
      preguntas: [],
      precioDesde: "desde 1.200 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Puertas de entrada y de patio",
      slug: "puertas",
      descripcion: "Puertas acristaladas de patio y puertas de entrada de aluminio con cerradura de seguridad.",
      contenido: ["Una puerta de patio acristalada cambia la cocina o el salón: entra la luz y se sale sin escalón."],
      incluye: ["Cerradura de seguridad", "Umbral sin escalón si el hueco lo permite", "Retirada de la puerta antigua"],
      imagenes: [{ src: "/ejemplo/servicio-puertas-1.jpg", alt: "Puerta de patio acristalada de aluminio abierta", origen: ia }],
      preguntas: [],
    },
    {
      titulo: "Persianas y mallorquinas",
      slug: "persianas",
      descripcion: "Persianas de lamas, cajones y mallorquinas de aluminio, manuales o motorizadas.",
      contenido: ["Cambiamos persianas atascadas y cajones que dejan pasar el aire, y fabricamos mallorquinas con el color de la fachada."],
      incluye: ["Cajón nuevo", "Lamas de aluminio", "Motor opcional"],
      imagenes: [], // sin fotos: prueba la pieza Luz
      preguntas: [],
    },
    {
      titulo: "Barandillas y herrería ligera",
      slug: "herreria",
      descripcion: "Barandillas de balcón, rejas discretas y pequeños trabajos de herrería a medida.",
      contenido: [], // sin contenido: la página lleva noindex
      incluye: [],
      imagenes: [{ src: "/ejemplo/servicio-herreria-1.jpg", alt: "Barandilla de pletina de hierro gris en un balcón", origen: ia }],
      preguntas: [],
    },
  ],
  trabajos: [
    {
      titulo: "Balconeras de un piso en el Eixample",
      slug: "balconeras-eixample",
      descripcion: "Dos balconeras nuevas en un piso de techos altos, con la persiana de lamas de siempre y el suelo hidráulico protegido durante la obra.",
      ubicacion: "Eixample, Barcelona",
      anio: 2025,
      servicio: "balconeras-correderas",
      superficie: "9 m²",
      duracion: "2 días",
      precio: "entre 6.000 y 7.500 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Las balconeras de madera tenían holgura y dejaban pasar el ruido. Se cambiaron por dos hojas de aluminio gris con el mismo despiece.",
        "Se montaron en dos días, una por jornada, con la casa habitada.",
      ],
      imagenes: [
        { src: "/ejemplo/trabajo-eixample-1.jpg", alt: "Salón de un piso del Eixample con dos balconeras nuevas", origen: ia },
        { src: "/ejemplo/trabajo-eixample-2.jpg", alt: "Manilla de la balconera y persiana de lamas recogida", origen: ia },
      ],
      testimonio: { autor: "Núria P.", texto: "Lo que más noto es el silencio. Y que el salón tiene más luz que antes." },
    },
    {
      titulo: "Cerramiento de galería en Sant Gervasi",
      slug: "galeria-sant-gervasi",
      descripcion: "Una galería con carpintería vieja de aluminio blanco convertida en una habitación más de la casa.",
      ubicacion: "Sant Gervasi, Barcelona",
      anio: 2025,
      servicio: "cerramientos",
      superficie: "7 m²",
      duracion: "3 días",
      contenido: ["La galería se usaba de trastero porque en invierno hacía frío. Ahora es el despacho de la casa."],
      imagenes: [{ src: "/ejemplo/trabajo-sant-gervasi-1.jpg", alt: "Galería cerrada con aluminio gris después de la obra", origen: ia }],
      antes: { src: "/ejemplo/trabajo-sant-gervasi-antes.jpg", alt: "La misma galería antes, con carpintería vieja de aluminio blanco", origen: ia },
    },
    {
      titulo: "Ventanas de una casa en Valldoreix",
      slug: "casa-valldoreix",
      descripcion: "Todas las ventanas de una casa de los años ochenta, con un ventanal nuevo hacia el jardín.",
      ubicacion: "Valldoreix, Sant Cugat del Vallès",
      anio: 2024,
      servicio: "ventanas",
      superficie: "14 m²",
      duracion: "4 días",
      contenido: ["Se cambiaron once ventanas y se agrandó el hueco del salón. Se trabajó por plantas para que la familia siguiera en casa."],
      imagenes: [{ src: "/ejemplo/trabajo-valldoreix-1.jpg", alt: "Sala de una casa con un ventanal nuevo hacia el jardín", origen: ia }],
    },
    {
      titulo: "Puerta de patio en Gràcia",
      slug: "puerta-patio-gracia",
      descripcion: "Una puerta acristalada que abre la cocina a un patio interior de manzana.",
      ubicacion: "Gràcia, Barcelona",
      anio: 2026,
      servicio: "puertas",
      duracion: "1 día",
      contenido: [],
      imagenes: [{ src: "/ejemplo/trabajo-gracia-1.jpg", alt: "Cocina con una puerta acristalada nueva hacia el patio", origen: ia }],
    },
  ],
  resenas: [
    { autor: "Núria P.", texto: "Cambiaron las balconeras con la casa habitada y lo dejaron todo limpio. El salón ha ganado luz.", puntuacion: 5, fecha: "2026-10-08", fuente: "google" },
    { autor: "Marc T.", texto: "Vinieron a medir, nos enseñaron muestras de color en la propia ventana y el presupuesto llegó por escrito en dos días. Montaron las once ventanas por plantas, como pedimos, y el jefe de montaje volvió a ajustar dos hojas a las pocas semanas sin que tuviéramos que insistir. Se nota que fabrican ellos: una duda con un hueco la resolvieron en el taller el mismo día.", puntuacion: 5, fecha: "2026-09", fuente: "google" },
    { autor: "Laia G.", texto: "La galería ya no es un trastero.", puntuacion: 5, fecha: "2026-07", fuente: "google" },
    { autor: "Jordi R.", texto: "Buen acabado. La fabricación tardó una semana más de lo previsto, pero avisaron.", puntuacion: 4, fecha: "2026-05", fuente: "google" },
    { autor: "Elena M.", texto: "Silencio total en el dormitorio.", puntuacion: 5, fecha: "2026-03-12", fuente: "google" },
  ],
  proceso: [
    { titulo: "Visita y medición", texto: "Medimos cada hueco y vemos la luz de cada habitación." },
    { titulo: "Presupuesto por escrito", texto: "Precio cerrado y fecha de montaje antes de empezar." },
    { titulo: "Fabricación en el taller", texto: "Cortamos y montamos cada ventana en Sant Cugat." },
    { titulo: "Montaje", texto: "Una habitación por jornada, protegiendo suelos y muebles." },
    { titulo: "Ajuste y revisión", texto: "Volvemos a revisar las hojas a las pocas semanas." },
  ],
  acreditaciones: [
    { nombre: "Taller asociado al gremio de carpintería metálica de Cataluña" }, // ACREDITACIÓN FICTICIA: borrar en la web del cliente
  ],
  garantias: ["Presupuesto cerrado antes de empezar", "Fecha de montaje por escrito", "Montaje con nuestro equipo, sin subcontratas", "Revisión de ajuste incluida"],
  marcas: ["Cortizo", "Technal", "Somfy"],
  empresa: {
    historia: [
      "Empezamos en 2007 en una nave pequeña de Rubí, cambiando ventanas de pisos de Barcelona. Hoy fabricamos en Sant Cugat con equipo propio de montaje.",
      "Seguimos midiendo cada hueco en persona: una ventana bien hecha empieza por una medida bien tomada.",
    ],
    imagenes: [
      { src: "/ejemplo/taller-1.jpg", alt: "Manos con guantes ajustando el herraje de una hoja en el taller", origen: ia },
      { src: "/ejemplo/taller-2.jpg", alt: "Perfiles de aluminio gris apoyados en un caballete", origen: ia },
      { src: "/ejemplo/taller-banda.jpg", alt: "Hojas de ventana terminadas en fila dentro de la nave", origen: ia },
    ],
    equipo: [
      { nombre: "Oriol", cargo: "Medición y presupuestos" },
      { nombre: "Sílvia", cargo: "Proyectos con interioristas" },
      { nombre: "Ramon", cargo: "Jefe de montaje" },
    ],
  },
  preguntas: [
    { pregunta: "¿Venís a medir sin compromiso?", respuesta: "Sí. Medimos, te enseñamos muestras y te mandamos el presupuesto por escrito." },
    { pregunta: "¿Puedo seguir en casa durante el montaje?", respuesta: "Sí. Trabajamos habitación por habitación y protegemos suelos y muebles." },
    { pregunta: "¿Trabajáis con mi interiorista?", respuesta: "Sí: revisamos sus planos y acordamos con él colores y despiece." },
    { pregunta: "¿Qué mantenimiento necesita el aluminio?", respuesta: "Limpiar perfiles y carriles con agua y jabón neutro y revisar las juntas de vez en cuando." },
  ],
  redes: { instagram: "https://www.instagram.com/lluerna.example" },
  seo: {
    titulo: "Ventanas de aluminio en Sant Cugat y Barcelona | Lluerna",
    descripcion: "Ventanas, balconeras, cerramientos y puertas de aluminio y PVC fabricados en Sant Cugat e instalados en Barcelona y el Vallès.",
    url: "https://carpinteria-metalica-premium-1.example",
  },
});
