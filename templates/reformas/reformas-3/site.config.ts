// reformas-3 «Obra con nombre» · datos de ejemplo FICTICIOS (Barcelona).
// Teléfono 600 000 3xx, «Calle Ejemplo», dominios .example, cid=000…, registro y
// acreditación «(ficticio)» y NIF con dígito de control inválido a propósito.
// Sin seo.indexar ni analitica: los activa cada web.
import { defineSiteConfig } from "@andrei-leads/core";

const ia = "ia" as const;

export default defineSiteConfig({
  negocio: {
    nombre: "Bigueta Reformes",
    nombreLegal: "Bigueta Obres i Reformes, S.L.",
    nif: "B67340218",
    sector: "Reformas integrales de pisos",
    descripcionCorta:
      "Reformamos pisos antiguos en Barcelona respetando lo original: volta catalana, suelo hidráulico y carpintería.",
    anioFundacion: 2006,
    registroMercantil: "Registro Mercantil de Barcelona, tomo 00.000, folio 00, hoja B-000000 (ficticio)",
    tipoSchema: ["GeneralContractor"],
  },

  contacto: {
    telefono: "+34600000303",
    whatsapp: "+34600000303",
    email: "obres@bigueta-ejemplo.example",
    direccion: { calle: "Calle Ejemplo, 3", cp: "08005", ciudad: "Barcelona", provincia: "Barcelona" },
    horario: [{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "17:00" }],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000303", // ficticio
  },

  zonas: [
    "Barcelona", "L'Hospitalet de Llobregat", "Badalona", "Sant Cugat del Vallès",
    "Esplugues de Llobregat", "Cornellà de Llobregat", "Sant Adrià de Besòs", "El Prat de Llobregat",
  ],

  servicios: [
    {
      titulo: "Reforma integral",
      slug: "reforma-integral",
      descripcion: "Pisos enteros: instalaciones, distribución y acabados, recuperando lo original.",
      contenido: [
        "Reformamos el piso completo con un solo encargado de principio a fin: demolición, instalaciones nuevas de agua y electricidad, distribución, carpintería y acabados.",
        "Antes de tirar nada vemos qué se puede salvar. La volta catalana se limpia y se deja vista, el hidráulico se levanta y se recoloca y las puertas originales se decapan y se pintan.",
        "El presupuesto va por partidas y con plazo por escrito. Pedimos la licencia y avisamos a la comunidad antes de empezar.",
      ],
      incluye: [
        "Licencia de obras y aviso a la comunidad",
        "Demolición y retirada de escombros",
        "Instalaciones de agua y electricidad nuevas",
        "Recuperación de volta catalana y suelo hidráulico",
        "Carpintería, pintura y limpieza final",
      ],
      imagenes: [{ src: "/ejemplo/servicio-integral.jpg", alt: "Estancia vacía terminada con volta catalana vista y suelo hidráulico", origen: ia }],
      preguntas: [
        { pregunta: "¿Podemos vivir en el piso durante la obra?", respuesta: "En una integral, no. En reformas por fases se puede dejar una zona habitable, y lo pactamos antes de empezar." },
        { pregunta: "¿Qué pasa si aparece algo al abrir?", respuesta: "Te lo enseñamos con fotos y te pasamos la partida aparte antes de hacerla. Nada se cobra sin tu visto bueno." },
      ],
    },
    {
      titulo: "Reforma de baño",
      slug: "reforma-de-bano",
      descripcion: "Baños completos en 3–4 semanas, con plato de obra o microcemento.",
      contenido: [
        "Cambiamos bajantes y tuberías, impermeabilizamos y dejamos el baño listo para usar en tres o cuatro semanas.",
        "Trabajamos con plato de obra, microcemento o azulejo, y aprovechamos la ventana original cuando la hay.",
      ],
      incluye: ["Desmontaje y retirada", "Fontanería y desagües nuevos", "Impermeabilización", "Revestimiento y sanitarios"],
      imagenes: [],
      preguntas: [],
    },
    {
      titulo: "Reforma de cocina",
      slug: "reforma-de-cocina",
      descripcion: "Cocinas lineales o en L, con instalaciones nuevas y encimera a medida.",
      contenido: [
        "Diseñamos la cocina según el espacio real del piso, con la instalación eléctrica y de agua nuevas.",
        "Montamos muebles, encimera y electrodomésticos, y dejamos la cocina limpia y funcionando.",
      ],
      incluye: ["Medición y diseño", "Instalaciones nuevas", "Muebles y encimera", "Montaje de electrodomésticos"],
      imagenes: [{ src: "/ejemplo/servicio-cocina.jpg", alt: "Cocina lineal terminada con vigas de madera en el techo", origen: ia }],
      preguntas: [],
    },
    {
      titulo: "Restauración de suelo hidráulico",
      slug: "restauracion-de-suelo-hidraulico",
      descripcion: "Levantamos, limpiamos y recolocamos las piezas originales, y reponemos las rotas.",
      contenido: [
        "Numeramos cada pieza, la levantamos y la limpiamos. Después la recolocamos sobre una base nueva y nivelada.",
        "Las piezas rotas se reponen con baldosas recuperadas o de reproducción del mismo dibujo.",
      ],
      incluye: ["Numeración y levantado", "Limpieza pieza a pieza", "Recolocación sobre base nueva", "Pulido y tratamiento"],
      imagenes: [{ src: "/ejemplo/servicio-hidraulico.jpg", alt: "Suelo hidráulico restaurado visto desde arriba", origen: ia }],
      preguntas: [],
    },
    {
      titulo: "Redistribución de espacios",
      slug: "redistribucion-de-espacios",
      descripcion: "Abrir la cocina, ganar una habitación o unir estancias sin tocar la estructura.",
      contenido: [], incluye: [], imagenes: [], preguntas: [],
    },
    {
      titulo: "Carpintería y ventanas interiores",
      slug: "carpinteria-y-ventanas-interiores",
      descripcion: "Puertas, ventanas interiores y armarios de madera pintada.",
      contenido: [], incluye: [], imagenes: [], preguntas: [],
    },
  ],

  trabajos: [
    {
      titulo: "Piso Enric Granados",
      slug: "piso-enric-granados",
      descripcion: "Reforma integral de un piso de 1910: volta catalana recuperada, hidráulico restaurado y cocina abierta al salón.",
      ubicacion: "Eixample", anio: 2025, servicio: "reforma-integral", superficie: "94 m²", duracion: "14 semanas",
      precio: "85.000–95.000 €", // PRECIO FICTICIO de ejemplo (enseña la fila de la ficha): borrar en la web del cliente
      contenido: [
        "El piso tenía las instalaciones de los años sesenta y un falso techo que tapaba las bóvedas. Lo quitamos, limpiamos las vigas y dejamos la volta vista en salón y dormitorios.",
        "El hidráulico del pasillo se levantó pieza a pieza y se recolocó. La cocina se abrió al salón con una carpintería de vidrio para no perder la luz del balcón.",
      ],
      imagenes: [
        { src: "/ejemplo/obra-eixample-1.jpg", alt: "Salón con volta catalana, suelo hidráulico y balcón al fondo", origen: ia },
        { src: "/ejemplo/obra-eixample-2.jpg", alt: "Pasillo con suelo hidráulico restaurado", origen: ia },
      ],
      testimonio: { autor: "Núria y Pere", texto: "Nos daba miedo perder el suelo y las bóvedas. Están mejor que cuando compramos el piso, y la obra acabó en la semana prevista." },
    },
    {
      titulo: "Baño Verdi",
      slug: "bano-verdi",
      descripcion: "Baño de 5 m² en microcemento con plato de obra, aprovechando la ventana al patio.",
      ubicacion: "Gràcia", anio: 2026, servicio: "reforma-de-bano", superficie: "5 m²", duracion: "3 semanas",
      contenido: [
        "El baño tenía azulejo de los ochenta y una bañera que ocupaba media estancia. La cambiamos por un plato de obra a ras de suelo.",
        "Todo el revestimiento es microcemento, y la ventana al patio se conservó con su carpintería original pintada.",
      ],
      imagenes: [{ src: "/ejemplo/obra-gracia-1.jpg", alt: "Baño con microcemento y plato de obra", origen: ia }],
      antes: { src: "/ejemplo/obra-gracia-antes.jpg", alt: "El mismo baño antes de la obra, con azulejo antiguo y bañera", origen: ia },
    },
    {
      titulo: "Cocina Parlament",
      slug: "cocina-parlament",
      descripcion: "Cocina lineal bajo vigas de madera, con encimera de piedra y la ventana original.",
      ubicacion: "Sant Antoni", anio: 2025, servicio: "reforma-de-cocina", superficie: "10 m²", duracion: "4 semanas",
      contenido: [
        "Una cocina lineal de 10 m² que aprovecha la pared larga. Dejamos las vigas de madera vistas y tratadas.",
        "La encimera llega hasta la ventana, que se conservó y se pintó en el mismo tono que la carpintería.",
      ],
      imagenes: [
        { src: "/ejemplo/obra-santantoni-1.jpg", alt: "Cocina lineal con vigas de madera vistas", origen: ia },
        { src: "/ejemplo/obra-santantoni-2.jpg", alt: "Detalle de encimera junto a la ventana", origen: ia },
      ],
    },
    {
      titulo: "Loft Pujades",
      slug: "loft-pujades",
      descripcion: "Antiguo taller convertido en vivienda, con dormitorios separados por puertas correderas de cristal.",
      ubicacion: "Poblenou", anio: 2024, servicio: "redistribucion-de-espacios", superficie: "120 m²", duracion: "16 semanas",
      contenido: [
        "El espacio era una nave diáfana. Separamos dos dormitorios con tabiques bajos y puertas correderas de cristal para que la luz llegue al fondo.",
        "Las instalaciones van vistas por el techo y el suelo es microcemento continuo.",
      ],
      imagenes: [
        { src: "/ejemplo/obra-poblenou-1.jpg", alt: "Loft con puertas correderas de cristal", origen: ia },
        { src: "/ejemplo/obra-poblenou-2.jpg", alt: "Dormitorio del loft", origen: ia },
      ],
    },
    {
      titulo: "Baño Major de Sarrià",
      slug: "bano-major-de-sarria",
      descripcion: "Baño en suite con ventana, ducha de obra y azulejo de barro hecho a mano.",
      ubicacion: "Sarrià", anio: 2026, servicio: "reforma-de-bano", superficie: "6 m²",
      contenido: [
        "Un baño en suite con ventana a la calle. Movimos la ducha bajo la ventana y la hicimos de obra.",
        "Las paredes van en azulejo de barro hecho a mano y el suelo en piedra.",
      ],
      imagenes: [{ src: "/ejemplo/obra-sarria-1.jpg", alt: "Baño en suite con ventana y ducha de obra", origen: ia }],
      antes: { src: "/ejemplo/obra-sarria-antes.jpg", alt: "El mismo baño antes de la obra", origen: ia },
    },
    {
      titulo: "Piso Rogent",
      slug: "piso-rogent",
      descripcion: "Piso pequeño que gana luz con un tabique de vidrio y carpintería pintada.",
      ubicacion: "El Clot", anio: 2025, servicio: "reforma-integral", superficie: "58 m²", duracion: "10 semanas",
      contenido: [
        "En 58 m² cabían tres habitaciones oscuras. Dejamos dos y separamos el dormitorio con un tabique de vidrio y madera.",
        "Toda la carpintería se pintó en un mismo tono para unificar el piso.",
      ],
      imagenes: [
        { src: "/ejemplo/obra-clot-1.jpg", alt: "Piso pequeño con tabique de vidrio", origen: ia },
        { src: "/ejemplo/obra-clot-2.jpg", alt: "Detalle de carpintería pintada", origen: ia },
      ],
    },
  ],

  valoracion: { media: 4.7, total: 96 },

  resenas: [
    { autor: "Montse F.", puntuacion: 5, fecha: "2026-10", fuente: "google", texto: "Salvaron todo el hidráulico. Impecables." },
    { autor: "Jordi A.", puntuacion: 5, fecha: "2026-08", fuente: "google", texto: "Teníamos miedo a la comunidad: el edificio es de 1905 y la presidenta lo revisa todo. Ellos pidieron la licencia, avisaron a los vecinos con una semana de antelación, protegieron la escalera y el ascensor cada mañana y bajaban los escombros en sacos a primera hora. Ni una queja en cuatro meses. El hidráulico del pasillo quedó como nuevo y el presupuesto por partidas se cumplió casi al euro." },
    { autor: "Clara N.", puntuacion: 4, fecha: "2026-05", fuente: "google", texto: "Muy buen acabado. La obra se alargó una semana por la licencia." },
    { autor: "Oriol B.", puntuacion: 5, fecha: "2026-01", fuente: "google", texto: "Nos enseñaron tres pisos suyos del Eixample antes de empezar." },
    { autor: "Sara K.", puntuacion: 5, fecha: "2025-10", fuente: "google", texto: "Orden y limpieza." },
  ],

  proceso: [
    { titulo: "Visita con medición y fotos", texto: "Vamos al piso, medimos y fotografiamos lo que se puede recuperar." },
    { titulo: "Presupuesto por partidas", texto: "Cada partida con su precio y el plazo total por escrito." },
    { titulo: "Licencia y aviso a la comunidad", texto: "Tramitamos el permiso y avisamos a vecinos y administrador." },
    { titulo: "Obra con encargado", texto: "Una sola persona responde de la obra de principio a fin." },
    { titulo: "Entrega con repaso", texto: "Repasamos contigo cada estancia antes de darla por acabada." },
  ],

  acreditaciones: [{ nombre: "Registro de Empresas Acreditadas (REA)", numero: "08/0000000 (ficticio)" }],
  garantias: ["Presupuesto cerrado por partidas", "Los elementos originales se protegen y se recuperan", "3 años de garantía en la obra"],
  marcas: ["Technal", "Cosentino", "Mosaics Martí"],

  empresa: {
    historia: [
      "Albert Pons empezó en 2006 como oficial en pisos del Eixample. Hoy Bigueta es un taller de ocho personas con encargado propio y los mismos gremios desde hace años.",
      "Trabajamos sobre todo en fincas de antes de 1940. Antes de tirar nada miramos qué se puede salvar: bóvedas, hidráulico, carpintería y molduras.",
    ],
    imagenes: [{ src: "/ejemplo/empresa-planos.jpg", alt: "Planos impresos sobre una mesa con un metro", origen: ia }],
    equipo: [
      { nombre: "Albert Pons", cargo: "Encargado de obra" },
      { nombre: "Laia Ferrer", cargo: "Presupuestos y compras" },
      { nombre: "Marc Soler", cargo: "Oficial de primera" },
    ],
  },

  imagenesHero: [],
  galeria: [],

  preguntas: [
    { pregunta: "¿Quién pide la licencia de obras al Ayuntamiento?", respuesta: "Nosotros. Tramitamos la comunicación o la licencia y la incluimos en el presupuesto como una partida más." },
    { pregunta: "¿Avisáis a la comunidad de vecinos?", respuesta: "Sí. Antes de empezar avisamos al administrador y a los vecinos, protegemos escalera y ascensor y respetamos el horario de obra." },
    { pregunta: "¿Se puede recuperar el suelo hidráulico?", respuesta: "Casi siempre. Levantamos las piezas, las limpiamos y las recolocamos; las rotas se reponen con piezas recuperadas o de reproducción." },
    { pregunta: "¿Cuánto dura una reforma integral?", respuesta: "Entre 10 y 16 semanas para un piso de 60 a 100 m². El plazo va por escrito en el presupuesto." },
  ],

  redes: { instagram: "https://www.instagram.com/bigueta.ejemplo" },

  seo: {
    titulo: "Reformas integrales de pisos en Barcelona | Bigueta",
    descripcion: "Reformas de pisos antiguos en Barcelona que respetan la volta catalana, el hidráulico y la carpintería. Mira nuestras obras por barrio.",
    url: "https://bigueta-ejemplo.example",
  },
});

// Variante «datos mínimos»: quitar trabajos, galeria, imagenes (de servicios y empresa),
// contenido, acreditaciones, garantias, marcas, proceso, preguntas, empresa y anioFundacion.
// Dejar los 4 primeros servicios (titulo + descripcion), resenas, valoracion y zonas.
