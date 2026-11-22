import { defineSiteConfig } from "@andrei-leads/core";

/*
 * Datos de ejemplo de «Tensión» (electricidad-premium-1). Negocio FICTICIO de
 * Valencia: nombre, NIF, registro, teléfono, email, números de habilitación y
 * precios son inventados. Sin `seo.indexar` (noindex) y sin `analitica`: los
 * activa cada web.
 */
export default defineSiteConfig({
  negocio: {
    nombre: "Borne Instalaciones",
    nombreLegal: "Borne Instal·lacions Elèctriques, S.L.",
    nif: "B00000001", // NIF FICTICIO
    sector: "Instalaciones eléctricas",
    descripcionCorta:
      "Reforma eléctrica integral, domótica, puntos de recarga y autoconsumo en Valencia. Presupuesto por partidas y la instalación legalizada.",
    anioFundacion: 2008,
    registroMercantil: "Registro Mercantil de Valencia, tomo 0000, folio 00, hoja V-000000 (ficticio)",
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000901",
    whatsapp: "+34600000901",
    email: "proyectos@borne-instalaciones.example",
    direccion: { calle: "Calle Ejemplo, 210", cp: "46007", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "15:30", cierra: "18:30" },
      { dias: ["viernes"], abre: "08:00", cierra: "15:00" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000000", // FICTICIO
  },
  zonas: [
    "Valencia",
    "L'Eliana",
    "Bétera",
    "Rocafort",
    "Godella",
    "Burjassot",
    "Paterna",
    "La Pobla de Vallbona",
    "Alboraya",
    "Torrent",
    "Mislata",
    "Moncada",
  ],
  servicios: [
    {
      titulo: "Reforma eléctrica integral",
      slug: "reforma-electrica-integral",
      descripcion: "Instalación nueva de la vivienda, del cuadro al último mecanismo, coordinada con el resto de la obra.",
      contenido: [
        "Cuadro nuevo, circuitos separados para cocina, climatización y recarga, y los mecanismos que elijas.",
        "Trabajamos sobre el plano de tu reforma y coordinamos las rozas con albañilería y pladur.",
        "Al terminar entregamos el certificado y el esquema del cuadro con cada circuito etiquetado.",
      ],
      incluye: ["Circuitos sobre tu plano", "Cuadro nuevo etiquetado", "Coordinación con los gremios", "Certificado de instalación"],
      imagenes: [
        { src: "/ejemplo/servicio-reforma-1.jpg", alt: "Rozas abiertas con tubo corrugado en una reforma", origen: "ia" },
        { src: "/ejemplo/servicio-reforma-2.jpg", alt: "Cuadro de vivienda terminado con la tapa abierta", origen: "ia" },
      ],
      preguntas: [{ pregunta: "¿Cuánto dura en un piso?", respuesta: "Entre dos y cuatro semanas para 80–110 m², según la obra." }],
      precioDesde: "desde 4.800 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Domótica",
      slug: "domotica",
      descripcion: "Luces, persianas y climatización con un pulsador o desde el móvil, montadas en el cuadro.",
      contenido: ["Los módulos van en el cuadro y los pulsadores son los de tu reforma. Te dejamos la configuración documentada."],
      incluye: ["Persianas e iluminación", "Escenas y horarios", "Configuración documentada"],
      imagenes: [{ src: "/ejemplo/servicio-domotica.jpg", alt: "Módulos de domótica con pilotos encendidos en un cuadro", origen: "ia" }],
      preguntas: [],
    },
    {
      titulo: "Punto de recarga",
      slug: "punto-de-recarga",
      descripcion: "Cargador para tu coche eléctrico en el chalet o en el garaje comunitario, legalizado.",
      contenido: ["Comprobamos la potencia, llevamos el circuito hasta la plaza con sus protecciones y legalizamos la instalación."],
      incluye: ["Estudio de potencia", "Circuito y protecciones", "Legalización"],
      imagenes: [{ src: "/ejemplo/servicio-recarga.jpg", alt: "Punto de recarga en la pared de hormigón de un garaje", origen: "ia" }],
      preguntas: [],
      precioDesde: "desde 890 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Autoconsumo",
      slug: "autoconsumo",
      descripcion: "La instalación eléctrica de tus placas: protecciones, inversor y conexión al cuadro.",
      contenido: [],
      incluye: ["Protecciones de continua y alterna", "Conexión al cuadro"],
      imagenes: [{ src: "/ejemplo/servicio-autoconsumo.jpg", alt: "Inversor y protecciones de autoconsumo en un trastero", origen: "ia" }],
      preguntas: [],
    },
    {
      titulo: "Iluminación de proyecto",
      slug: "iluminacion-de-proyecto",
      descripcion: "Perfiles empotrados, luz indirecta y circuitos regulables pensados con tu interiorista.",
      contenido: [],
      incluye: [],
      imagenes: [{ src: "/ejemplo/servicio-iluminacion.jpg", alt: "Perfil de luz empotrado encendido en un techo", origen: "ia" }],
      preguntas: [],
    },
    {
      // Sin foto a propósito: caso «servicio sin foto» (trama DIN con su número).
      titulo: "Certificados y boletines",
      slug: "certificados-y-boletines",
      descripcion: "El certificado de tu instalación nueva o reformada, tramitado como parte de la obra.",
      contenido: [],
      incluye: [],
      imagenes: [],
      preguntas: [],
    },
  ],
  imagenesHero: [
    { src: "/ejemplo/hero-peine-cobre.jpg", alt: "Peine de cobre y magnetotérmicos etiquetados en un cuadro nuevo", origen: "ia" },
    { src: "/ejemplo/hero-manos-cableado.jpg", alt: "Manos ordenando conductores en una caja de registro", origen: "ia" },
    { src: "/ejemplo/hero-mecanismo.jpg", alt: "Interruptor de latón sobre una pared de yeso", origen: "ia" },
    // [3] = respaldo del pano mientras no haya vídeo: el póster esperado de videoPano.
    { src: "/ejemplo/pano-poster.jpg", alt: "Fila de interruptores de un cuadro eléctrico en penumbra", origen: "ia" },
  ],
  // Vídeo del pano: aún no hay clip. Cuando llegue, poner pano.mp4 (H.264, 720p, 8 s,
  // 1–3 MB), opcionalmente pano.av1.mp4, y descomentar. Sin él, el pano usa imagenesHero[3].
  // videoPano: {
  //   src: "/ejemplo/pano.mp4",
  //   srcAv1: "/ejemplo/pano.av1.mp4",
  //   poster: { src: "/ejemplo/pano-poster.jpg", alt: "Fila de interruptores de un cuadro eléctrico en penumbra", origen: "ia" },
  // },
  trabajos: [
    {
      titulo: "Instalación nueva en un piso de Ruzafa",
      slug: "reforma-ruzafa",
      descripcion: "Piso de 1925 con fusibles de porcelana: instalación completa, cuadro nuevo y preinstalación de climatización.",
      ubicacion: "Ruzafa, Valencia",
      anio: 2026,
      servicio: "reforma-electrica-integral",
      superficie: "92 m²",
      duracion: "3 semanas",
      precio: "entre 6.500 y 7.500 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: ["Respetamos las molduras del pasillo: el cuadro va empotrado en un tabique nuevo."],
      imagenes: [{ src: "/ejemplo/trabajo-ruzafa.jpg", alt: "Cuadro nuevo empotrado en el pasillo de un piso antiguo", origen: "ia" }],
      antes: { src: "/ejemplo/antes-ruzafa.jpg", alt: "Cuadro antiguo de fusibles antes de la reforma", origen: "ia" },
      testimonio: { autor: "Clara M.", texto: "Nos enseñaron el cuadro circuito a circuito antes de cerrar las paredes. Ni un día de retraso." },
    },
    {
      titulo: "Domótica en un adosado de Rocafort",
      slug: "domotica-rocafort",
      descripcion: "Persianas, luces y climatización con pulsadores retroiluminados y escenas.",
      ubicacion: "Rocafort",
      anio: 2026,
      servicio: "domotica",
      superficie: "180 m²",
      duracion: "6 días",
      contenido: [],
      imagenes: [{ src: "/ejemplo/trabajo-domotica-rocafort.jpg", alt: "Pulsadores retroiluminados en la pared de un salón", origen: "ia" }],
    },
    {
      titulo: "Recarga en un chalet de L'Eliana",
      slug: "recarga-leliana",
      descripcion: "Punto de recarga de 7,4 kW con circuito nuevo y canalización vista.",
      ubicacion: "L'Eliana",
      anio: 2025,
      servicio: "punto-de-recarga",
      duracion: "1 día",
      contenido: [],
      imagenes: [{ src: "/ejemplo/trabajo-recarga-leliana.jpg", alt: "Punto de recarga con canalización en un garaje", origen: "ia" }],
    },
    {
      titulo: "Autoconsumo en una casa de Bétera",
      slug: "autoconsumo-betera",
      descripcion: "Protecciones e inversor para 14 placas, conectados al cuadro de la vivienda.",
      ubicacion: "Bétera",
      anio: 2025,
      servicio: "autoconsumo",
      duracion: "2 días",
      contenido: [],
      imagenes: [
        { src: "/ejemplo/trabajo-autoconsumo-betera.jpg", alt: "Protecciones de autoconsumo montadas y etiquetadas", origen: "ia" },
      ],
      antes: { src: "/ejemplo/antes-autoconsumo-betera.jpg", alt: "Pared del trastero antes de montar las protecciones", origen: "ia" },
    },
  ],
  valoracion: { media: 4.9, total: 61 },
  resenas: [
    {
      autor: "Clara M.",
      texto: "Toda la instalación del piso durante la reforma. Presupuesto por partidas, plazo cumplido y el cuadro etiquetado como un libro.",
      puntuacion: 5,
      fecha: "2026-11-04",
      fuente: "google",
    },
    { autor: "Jordi P.", texto: "Cargador instalado y legalizado en un día.", puntuacion: 5, fecha: "2026-10-21", fuente: "google" },
    {
      autor: "Amparo G.",
      texto: "La domótica funciona y nos dejaron un documento con todo. Tardaron una semana más en empezar de lo que dijeron.",
      puntuacion: 4,
      fecha: "2026-09-12",
      fuente: "google",
    },
    { autor: "Héctor R.", texto: "Muy limpios trabajando.", puntuacion: 5, fecha: "2026-08", fuente: "google" },
  ],
  acreditaciones: [
    { nombre: "Empresa instaladora en baja tensión (RII), categoría especialista", numero: "46/IBTE/0000-EJ" }, // NÚMERO FICTICIO: sustituir por el real del cliente
    { nombre: "Seguro de responsabilidad civil", numero: "Póliza RC-0000-EJ" }, // NÚMERO FICTICIO: sustituir por el real del cliente
  ],
  garantias: [
    "Presupuesto por partidas antes de empezar",
    "Plazo de obra por escrito",
    "Cuadro etiquetado y esquema entregado",
    "Tres años de garantía en mano de obra",
  ],
  marcas: ["Schneider Electric", "Hager", "Simon", "Jung"],
  empresa: {
    historia: [
      "Empezamos en 2008 con la instalación eléctrica de reformas en el centro de Valencia. Hoy somos ocho instaladores y una oficina técnica que prepara cada presupuesto sobre el plano.",
    ],
    imagenes: [
      { src: "/ejemplo/empresa-taller.jpg", alt: "Banco de trabajo con un cuadro a medio montar", origen: "ia" },
      { src: "/ejemplo/empresa-herramientas.jpg", alt: "Herramientas aisladas ordenadas en una maleta", origen: "ia" },
    ],
    equipo: [
      { nombre: "Andreu", cargo: "Dirección técnica" },
      { nombre: "Sara", cargo: "Oficina técnica y presupuestos" },
    ],
  },
  preguntas: [
    { pregunta: "¿Trabajáis con mi arquitecto o interiorista?", respuesta: "Sí, presupuestamos sobre su plano y coordinamos los tiempos con la obra." },
    { pregunta: "¿Atendéis averías?", respuesta: "Solo de instalaciones nuestras. Nos dedicamos a obra planificada." },
  ],
  seo: {
    titulo: "Instalaciones eléctricas en Valencia · Borne",
    descripcion:
      "Reforma eléctrica integral, domótica, puntos de recarga y autoconsumo en Valencia. Presupuesto por partidas y la instalación legalizada.",
    url: "https://electricidad-premium-1.example",
  },
  redes: { instagram: "https://www.instagram.com/borne.ejemplo" },
});
