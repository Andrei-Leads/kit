// Datos de ejemplo de carpinteria-metalica-1 «Medida». Ficticios.
// Los precios y los números de registro son inventados y van marcados.
// Las marcas de perfil son reales y solo ilustran el campo: en la web del
// cliente van solo las marcas con las que trabaje de verdad.
import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Aluminios Ejemplo",
    nombreLegal: "Aluminios Ejemplo SL",
    nif: "B98765432",
    sector: "Ventanas de aluminio y PVC",
    descripcionCorta:
      "Fabricamos e instalamos ventanas, cerramientos y persianas a medida en L'Horta Oest. Medición sin compromiso.",
    anioFundacion: 1998,
    registroMercantil: "Inscrita en el Registro Mercantil de Valencia, tomo 0000, folio 00, hoja V-00000 (ficticio)", // REGISTRO FICTICIO
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000006",
    whatsapp: "+34600000006",
    email: "info@ejemplo.com",
    direccion: { calle: "Polígono Ejemplo, calle 3, nave 12", cp: "46960", ciudad: "Aldaia", provincia: "Valencia" },
    horario: [
      { dias: "Lunes a viernes", horas: "8:00–14:00 y 16:00–19:00" },
      { dias: "Sábados", horas: "9:00–13:00" },
    ],
    mensajeWhatsapp: "Hola, os escribo desde vuestra web. Quiero presupuesto para:",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000006",
  },
  zonas: ["Aldaia", "Alaquàs", "Quart de Poblet", "Manises", "Xirivella", "Mislata", "Torrent", "Paterna", "Picanya", "Valencia"],
  valoracion: { media: 4.7, total: 89 },
  imagenesHero: [
    { src: "/ejemplo/hero.jpg", alt: "Salón con ventanal corredero de aluminio gris antracita abierto a una terraza" },
  ],
  servicios: [
    {
      titulo: "Ventanas correderas",
      descripcion: "Correderas de aluminio con rotura de puente térmico para terrazas y salones.",
      contenido: [
        "Las correderas ocupan poco espacio al abrir y son las más pedidas para salones y terrazas. Las fabricamos a medida de tu hueco en nuestro taller.",
        "Te ayudamos a elegir el perfil y el vidrio según el ruido de la calle y la orientación de la casa.",
      ],
      incluye: ["Medición en casa", "Fabricación a medida", "Retirada de la ventana vieja", "Instalación y sellado", "Limpieza al terminar"],
      imagenes: [{ src: "/ejemplo/servicio-corredera.jpg", alt: "Ventana corredera de aluminio en un salón luminoso" }],
      preguntas: [
        { pregunta: "¿Hay que hacer obra para cambiar la ventana?", respuesta: "Normalmente no. Quitamos la vieja y colocamos la nueva sobre el mismo hueco." },
      ],
      mensajeWhatsapp: "Hola, quiero presupuesto para ventanas correderas. Os envío una foto del hueco con un metro:",
      precioDesde: "desde 290 €/ud", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Ventanas oscilobatientes",
      descripcion: "Abren hacia dentro y en abatible para ventilar. Ideales para dormitorios.",
      imagenes: [{ src: "/ejemplo/servicio-oscilobatiente.jpg", alt: "Ventana oscilobatiente blanca entreabierta en un dormitorio" }],
      precioDesde: "desde 340 €/ud", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cerramientos de terraza",
      descripcion: "Cierra tu terraza con correderas o sistemas sin perfiles verticales.",
      imagenes: [{ src: "/ejemplo/servicio-cerramiento.jpg", alt: "Terraza cerrada con cristal y perfiles de aluminio" }],
      mensajeWhatsapp: "Hola, quiero cerrar mi terraza. Os envío fotos y medidas aproximadas:",
      precioDesde: "desde 1.900 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Mosquiteras",
      descripcion: "Enrollables, correderas o plisadas, a medida de cada ventana.",
      imagenes: [{ src: "/ejemplo/servicio-mosquitera.jpg", alt: "Mosquitera enrollable instalada en una ventana" }],
      precioDesde: "desde 60 €/ud", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Persianas y motorización",
      descripcion: "Persianas de aluminio, cambio de lamas y motores para subirlas con un botón.",
      imagenes: [{ src: "/ejemplo/servicio-persiana.jpg", alt: "Persiana de aluminio a medio bajar en una fachada" }],
    },
    {
      titulo: "Puertas de entrada",
      descripcion: "Puertas de aluminio para chalets y entradas de comunidades.",
      imagenes: [{ src: "/ejemplo/servicio-puerta.jpg", alt: "Puerta de entrada de aluminio gris en un chalet" }],
    },
    {
      titulo: "Mamparas de baño",
      descripcion: "Mamparas de cristal templado a medida para ducha y bañera.",
    },
  ],
  trabajos: [
    {
      titulo: "Cambio de ventanas en un piso de Aldaia",
      descripcion: "6 ventanas correderas con RPT y doble vidrio en un piso de 1975 que daba a una avenida con mucho tráfico.",
      ubicacion: "Aldaia",
      anio: 2026,
      servicio: "ventanas-correderas",
      duracion: "1 día de instalación",
      precio: "entre 2.000 y 2.500 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Las ventanas de hierro antiguas dejaban pasar el ruido y el frío. Medimos, fabricamos en el taller y en un solo día cambiamos las seis sin obra.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-aldaia.jpg", alt: "Salón con ventanas correderas nuevas de aluminio blanco" }],
      antes: { src: "/ejemplo/trabajo-aldaia-antes.jpg", alt: "Las ventanas antiguas de hierro antes del cambio" },
      testimonio: { autor: "Amparo L.", texto: "Ahora no se oye la avenida y en invierno la casa coge otra temperatura." },
    },
    {
      titulo: "Cerramiento de terraza en Quart de Poblet",
      descripcion: "Cerramiento corredero de 4 hojas en una terraza de ático, con persianas a juego.",
      ubicacion: "Quart de Poblet",
      anio: 2025,
      servicio: "cerramientos-de-terraza",
      superficie: "9 m²",
      duracion: "2 días",
      imagenes: [{ src: "/ejemplo/trabajo-quart.jpg", alt: "Terraza de ático cerrada con correderas de aluminio" }],
    },
    {
      titulo: "Ventanas oscilobatientes en un chalet de Manises",
      descripcion: "8 oscilobatientes de PVC blanco con persiana motorizada en toda la casa.",
      ubicacion: "Manises",
      anio: 2025,
      servicio: "ventanas-oscilobatientes",
      duracion: "3 días",
      imagenes: [
        { src: "/ejemplo/trabajo-manises.jpg", alt: "Fachada de chalet con ventanas oscilobatientes blancas" },
        { src: "/ejemplo/trabajo-manises-2.jpg", alt: "Detalle del herraje de una ventana oscilobatiente" },
      ],
      testimonio: { autor: "Jordi y Eva", texto: "Nos explicaron las diferencias sin liarnos y cumplieron el día de montaje." },
    },
    {
      titulo: "Mosquiteras en Xirivella",
      descripcion: "5 mosquiteras enrollables a medida en un piso, instaladas en una mañana.",
      ubicacion: "Xirivella",
      anio: 2026,
      servicio: "mosquiteras",
      imagenes: [{ src: "/ejemplo/trabajo-xirivella.jpg", alt: "Mosquitera enrollable bajada en una ventana de cocina" }],
    },
  ],
  resenas: [
    { autor: "Amparo L.", texto: "Cambiaron todas las ventanas en un día y lo dejaron todo limpio. Se nota muchísimo el ruido.", puntuacion: 5, fecha: "2026-09-25", fuente: "google" },
    { autor: "Paco R.", texto: "Les mandé fotos del hueco por WhatsApp y al día siguiente tenía una idea del precio. Luego vinieron a medir y el presupuesto final fue el mismo.", puntuacion: 5, fecha: "2026-09-02", fuente: "google" },
    { autor: "Jordi M.", texto: "Muy profesionales con el cerramiento de la terraza.", puntuacion: 5, fecha: "2026-07-19", fuente: "google" },
    { autor: "Nuria G.", texto: "Buen resultado; la fabricación tardó una semana más de lo previsto.", puntuacion: 4, fecha: "2026-05-30", fuente: "google" },
  ],
  marcas: ["Cortizo", "Technal", "Veka"],
  acreditaciones: [
    { nombre: "Marcado CE en todas las ventanas que fabricamos" },
    { nombre: "Socios de la asociación provincial de carpintería metálica (ficticio)" }, // ACREDITACIÓN FICTICIA: borrar en la web del cliente
  ],
  garantias: [
    "Presupuesto por escrito tras medir",
    "Fabricación propia en nuestro taller",
    "Garantía de 10 años en la fabricación",
    "Garantía de 2 años en la instalación",
    "Seguro de responsabilidad civil",
  ],
  empresa: {
    historia: [
      "Somos un taller familiar de Aldaia. Desde 1998 fabricamos e instalamos ventanas, cerramientos y persianas de aluminio y PVC.",
      "Medimos, fabricamos y colocamos nosotros: así respondemos de todo el trabajo.",
    ],
    imagenes: [
      { src: "/ejemplo/empresa-taller.jpg", alt: "Taller de aluminio con perfiles y máquina de corte" },
      { src: "/ejemplo/empresa-perfiles.jpg", alt: "Perfiles de aluminio apilados por colores" },
    ],
    equipo: [
      { nombre: "Ramón", cargo: "Fundador y jefe de taller" },
      { nombre: "Sara", cargo: "Presupuestos y mediciones" },
    ],
  },
  preguntas: [
    { pregunta: "¿Cobráis por ir a medir?", respuesta: "No. Medimos en tu casa y te damos el presupuesto por escrito." },
    { pregunta: "¿Aluminio o PVC?", respuesta: "Los dos aíslan bien con un buen perfil y un buen vidrio. Te explicamos las diferencias según tu casa y tu presupuesto." },
    { pregunta: "¿Hay que hacer obra?", respuesta: "En la mayoría de los cambios, no: la ventana nueva va sobre el mismo hueco." },
    { pregunta: "¿Cuánto tardáis?", respuesta: "Depende del trabajo y del perfil. Te damos la fecha de instalación con el presupuesto." },
  ],
  seo: {
    titulo: "Ventanas de aluminio y PVC en Aldaia | Aluminios Ejemplo",
    descripcion: "Ventanas, cerramientos de terraza, mosquiteras y persianas a medida en Aldaia y L'Horta Oest. Taller propio y medición sin compromiso.",
    url: "https://ejemplo.com",
  },
  redes: { instagram: "https://instagram.com/ejemplo", facebook: "https://facebook.com/ejemplo" },
});
