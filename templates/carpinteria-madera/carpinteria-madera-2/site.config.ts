// Datos de ejemplo de «A medida» (carpinteria-madera-2): negocio FICTICIO de Tres Cantos (encargo §11),
// con el patrón ficticio evidente de la nueva generación (Calle Ejemplo, dominio .example, cid de
// ceros, registro «(ficticio)»). NIF de ejemplo con dígito de control inválido. Fotos de
// public/ejemplo/: relleno pendiente de las fotos de IA (CREDITOS.md), todas con origen "ia". Sin
// seo.indexar ni analítica: las activa cada web, nunca el template. Los precios son de ejemplo y
// llevan su marca: en la web de un cliente solo van cifras que él haya validado.
import { defineSiteConfig, type Imagen } from "@andrei-leads/core";

const ia = (src: string, alt: string): Imagen => ({ src: `/ejemplo/${src}`, alt, origen: "ia" });

export default defineSiteConfig({
  negocio: {
    nombre: "Ensamble Norte",
    nombreLegal: "Ensamble Norte Carpinteros, S.L.",
    nif: "B87364155", // ficticio: el dígito de control no corresponde a propósito (el correcto sería 4)
    sector: "Carpintería a medida",
    descripcionCorta: "Armarios empotrados, vestidores, cocinas y puertas a medida en Madrid norte. Medimos, fabricamos en nuestro taller y montamos.",
    anioFundacion: 2009,
    registroMercantil: "Registro Mercantil de Madrid, tomo 0000, folio 00, hoja M-000000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000522",
    whatsapp: "+34600000522",
    email: "hola@ensamblenorte.example",
    direccion: { calle: "Calle Ejemplo, 32", cp: "28760", ciudad: "Tres Cantos", provincia: "Madrid" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "08:00", cierra: "18:00" },
      { dias: ["viernes"], abre: "08:00", cierra: "15:00" },
    ],
    mensajeWhatsapp: "Hola, os escribo desde la web. Quiero presupuesto para un mueble a medida; os mando foto del hueco.",
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000522", // ficticio
  },
  zonas: ["Madrid", "Tres Cantos", "Alcobendas", "San Sebastián de los Reyes", "Colmenar Viejo", "Las Rozas", "Majadahonda", "Pozuelo de Alarcón"],
  servicios: [
    {
      titulo: "Armarios empotrados", slug: "armarios-empotrados",
      descripcion: "De suelo a techo, con el interior que necesitas.",
      precioDesde: "desde 690 €/ml", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: ["Medimos el hueco y te proponemos puertas e interior.", "Fabricamos en Tres Cantos y montamos en un día."],
      incluye: ["Medición", "Interior a medida", "Montaje"],
      imagenes: [ia("armario-empotrado.jpg", "Armario empotrado de roble claro")],
      preguntas: [{ pregunta: "¿Lacado o madera?", respuesta: "Las dos opciones; te enseñamos muestras." }],
      mensajeWhatsapp: "Hola, quiero presupuesto para un armario empotrado. Os mando foto y medidas del hueco.",
    },
    {
      titulo: "Vestidores", slug: "vestidores",
      descripcion: "Abiertos o con puertas, aprovechando la habitación.",
      precioDesde: "desde 1.900 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [], incluye: [],
      imagenes: [ia("vestidor-abierto.jpg", "Vestidor abierto lacado en blanco")],
      preguntas: [],
    },
    {
      titulo: "Frentes e interiores de armario", slug: "frentes-e-interiores",
      descripcion: "Puertas nuevas e interior a medida para tu armario de obra, sin tocar el hueco.",
      contenido: [], incluye: [],
      imagenes: [ia("armario-interior.jpg", "Interior de armario con barra, cajones y baldas")],
      preguntas: [],
    },
    {
      titulo: "Puertas correderas y de paso", slug: "puertas",
      descripcion: "Abatibles o correderas que se esconden en la pared, con marco enrasado.",
      precioDesde: "desde 320 €/puerta", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [], incluye: [],
      imagenes: [ia("puerta-paso-lacada.jpg", "Puerta de paso lacada"), ia("puerta-corredera.jpg", "Puerta corredera escondida en la pared")],
      preguntas: [],
    },
    {
      titulo: "Cocinas", slug: "cocinas",
      descripcion: "Cocinas de madera o lacadas con perfil gola.",
      contenido: [], incluye: [],
      imagenes: [ia("cocina-roble-claro.jpg", "Cocina lineal de roble claro"), ia("cocina-gola.jpg", "Detalle del perfil gola de un frente de cocina")],
      preguntas: [],
    },
    {
      titulo: "Huecos difíciles", slug: "huecos-dificiles",
      descripcion: "Bajo escalera, buhardillas y esquinas imposibles.",
      contenido: [], incluye: [],
      imagenes: [ia("armario-bajo-escalera.jpg", "Armario con cajones bajo una escalera")],
      preguntas: [],
    },
    {
      // Sin foto a propósito: así se ve una tarjeta y una opción del asistente sin miniatura.
      titulo: "Armarios de terraza y lavadero", slug: "armarios-de-terraza",
      descripcion: "Para la terraza o el tendedero, con madera tratada para exterior.",
      contenido: [], incluye: [], imagenes: [], preguntas: [],
    },
  ],
  trabajos: [
    {
      titulo: "Armario de tres puertas en Las Tablas", slug: "armario-las-tablas",
      descripcion: "Armario de roble claro en un dormitorio de obra nueva.",
      ubicacion: "Las Tablas, Madrid", anio: 2026, servicio: "armarios-empotrados",
      superficie: "2,4 m lineales", duracion: "3 semanas",
      contenido: ["El hueco tenía un pilar; lo integramos en el costado."],
      imagenes: [ia("armario-empotrado.jpg", "Armario de tres puertas terminado"), ia("armario-interior.jpg", "Interior del armario")],
      antes: ia("armario-hueco-antes.jpg", "El hueco vacío antes del armario"),
      testimonio: { autor: "Lucía R.", texto: "Les mandé la foto del hueco por WhatsApp y en dos días tenía el presupuesto." },
    },
    {
      titulo: "Cocina de roble en Tres Cantos", slug: "cocina-tres-cantos",
      descripcion: "Cocina lineal con gola y columna de horno.",
      ubicacion: "Tres Cantos", anio: 2025, servicio: "cocinas", superficie: "9 m²", duracion: "4 semanas",
      contenido: [],
      imagenes: [ia("cocina-roble-claro.jpg", "Cocina de roble claro")],
    },
    {
      titulo: "Armario bajo escalera en Alcobendas", slug: "bajo-escalera-alcobendas",
      descripcion: "Cajones de distinta altura siguiendo los peldaños.",
      ubicacion: "Alcobendas", anio: 2025, servicio: "huecos-dificiles", duracion: "2 semanas",
      contenido: [],
      imagenes: [ia("armario-bajo-escalera.jpg", "Armario bajo escalera")],
    },
    {
      titulo: "Estantería en buhardilla de Colmenar", slug: "buhardilla-colmenar",
      descripcion: "Estantería que sigue la pendiente del tejado.",
      ubicacion: "Colmenar Viejo", anio: 2024, servicio: "huecos-dificiles", superficie: "5 m lineales",
      contenido: [],
      imagenes: [ia("buhardilla-estanteria.jpg", "Estantería bajo cubierta inclinada")],
    },
  ],
  valoracion: { media: 4.8, total: 143 },
  // Reseñas de ejemplo (inventadas): en la web del cliente, las suyas de Google.
  resenas: [
    { autor: "Lucía Romero", texto: "Rápidos y claros con el precio.", puntuacion: 5, fecha: "2026-10-21", fuente: "google" },
    { autor: "Sergio Navas", texto: "Teníamos un hueco con un pilar en medio y nadie quería hacerlo. Vinieron a medir, nos dieron dos opciones y el armario quedó integrado como si fuera de obra. Montaje en una mañana.", puntuacion: 5, fecha: "2026-09-30", fuente: "google" },
    { autor: "Elena Bravo", texto: "La cocina, perfecta. El plazo se alargó una semana por los electrodomésticos, no por ellos.", puntuacion: 4, fecha: "2026-08-12", fuente: "google" },
    { autor: "Raúl Medina", texto: "Muy recomendables.", puntuacion: 5, fecha: "2026-07", fuente: "google" },
    { autor: "Inés Castro", texto: "Las puertas correderas no hacen ni un ruido. Un acierto.", puntuacion: 5, fecha: "2026-05-03", fuente: "google" },
  ],
  // Sin proceso propio: el template usa los 4 pasos por defecto de core para el tipo proyecto.
  proceso: [],
  acreditaciones: [],
  garantias: ["Presupuesto cerrado en 48 h", "Fecha de montaje en el contrato", "Tres años de garantía en herrajes"],
  marcas: ["Blum", "Häfele"],
  imagenesHero: [ia("hero-armario-hueco.jpg", "Armario empotrado de roble claro de suelo a techo")],
  galeria: [],
  empresa: {
    historia: ["Empezamos en 2009 con una furgoneta y una sierra. Hoy somos siete en una nave de Tres Cantos."],
    imagenes: [ia("taller-piezas.jpg", "Piezas cortadas y etiquetadas en el taller")],
    equipo: [],
  },
  preguntas: [
    { pregunta: "¿Cuánto tarda un armario?", respuesta: "Unas tres semanas desde la medición." },
    { pregunta: "¿Retiráis el armario viejo?", respuesta: "Sí, si nos lo pides en el presupuesto." },
  ],
  seo: {
    titulo: "Ensamble Norte · Armarios y muebles a medida en Madrid",
    descripcion: "Armarios empotrados, vestidores, cocinas y puertas a medida en Madrid norte, con taller propio en Tres Cantos.",
    url: "https://ensamble-norte.example",
  },
  redes: { instagram: "https://www.instagram.com/ensamblenorte.example" },
});
