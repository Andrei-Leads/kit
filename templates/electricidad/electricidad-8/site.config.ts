/*
 * Datos de ejemplo de «Comunidades y fincas» (electricidad-8): empresa FICTICIA de Valencia
 * (encargo §11). NIF de ejemplo con dígito de control inválido; teléfono de la serie 600 000 5xx.
 * Fotos de public/ejemplo/: relleno gris pendiente de las fotos de IA (ver CREDITOS.md).
 * Sin seo.indexar ni la analítica de Vercel: los activa cada web, nunca el template.
 */
import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Escala Instalaciones",
    nombreLegal: "Escala Instal·lacions Elèctriques, S.L.",
    nif: "B97561842",
    sector: "Electricistas para comunidades y fincas",
    descripcionCorta: "Mantenimiento eléctrico de comunidades, contadores, alumbrado de escalera y averías en Valencia. Habilitados y con seguro.",
    anioFundacion: 2004,
    registroMercantil: "Registro Mercantil de Valencia, tomo 0000, folio 00, hoja V-000000 (ficticio)",
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000508",
    whatsapp: "+34600000508",
    email: "comunidades@escalaejemplo.example",
    direccion: { calle: "Calle Ejemplo, 52", cp: "46008", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "15:30", cierra: "18:30" },
      { dias: ["viernes"], abre: "08:00", cierra: "15:00" },
    ],
    urgencias24h: true,
    tiempoLlegada: "50 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000308", // ficticio
  },
  zonas: ["Valencia", "Burjassot", "Godella", "Mislata", "Quart de Poblet", "Manises", "Paterna", "Torrent", "Alboraya", "Tavernes Blanques", "Xirivella", "Sedaví"],
  servicios: [
    {
      titulo: "Mantenimiento de zonas comunes", slug: "mantenimiento-zonas-comunes",
      descripcion: "Revisión periódica de portal, escalera, garaje y cuarto de contadores.",
      contenido: [
        "Revisamos las protecciones, el alumbrado y el estado de las canalizaciones de las zonas comunes y entregamos un informe que el administrador puede llevar a la junta.",
        "Las averías de las comunidades con mantenimiento tienen prioridad.",
      ],
      incluye: ["Revisión programada", "Informe escrito", "Prioridad en averías"],
      imagenes: [{ src: "/ejemplo/servicio-zonas-comunes.jpg", alt: "Rellano con plafón y detector de presencia", origen: "ia" }],
      preguntas: [{ pregunta: "¿Facturáis a nombre de la comunidad?", respuesta: "Sí, con su CIF y con IVA." }],
    },
    { titulo: "Centralización de contadores", slug: "centralizacion-de-contadores", descripcion: "Renovación del cuarto de contadores y de las líneas a cada vivienda.", contenido: ["Sustituimos la centralización antigua coordinando los cortes con los vecinos para que nadie se quede sin luz más de lo necesario."], incluye: ["Plan de cortes avisado", "Certificado"], imagenes: [{ src: "/ejemplo/servicio-contadores.jpg", alt: "Centralización de contadores en su cuarto", origen: "ia" }], preguntas: [] },
    { titulo: "Alumbrado de escalera y portal", slug: "alumbrado-escalera", descripcion: "LED con detectores para que la luz no se quede encendida toda la noche.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-escalera.jpg", alt: "Hueco de escalera con barandilla de forja", origen: "ia" }], preguntas: [] },
    { titulo: "Recarga en garaje comunitario", slug: "recarga-garaje-comunitario", descripcion: "Preinstalación para toda la comunidad o puntos para cada vecino.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-recarga-garaje.jpg", alt: "Garaje comunitario con dos puntos de recarga", origen: "ia" }], preguntas: [] },
    { titulo: "Corrección de defectos tras inspección", slug: "correccion-de-defectos", descripcion: "Arreglamos lo que señala el informe de la inspección periódica.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-inspeccion.jpg", alt: "Cuadro de zonas comunes abierto", origen: "ia" }], preguntas: [] },
    { titulo: "Averías urgentes", slug: "averias-urgentes", descripcion: "Portal a oscuras, garaje sin luz o una vivienda sin corriente.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-averias.jpg", alt: "Zaguán de terrazo con la luz apagada", origen: "ia" }], preguntas: [] },
    { titulo: "Instalaciones en viviendas", slug: "instalaciones-viviendas", descripcion: "Cuadros, boletines y reformas para los vecinos del edificio.", contenido: [], incluye: [], imagenes: [], preguntas: [] },
  ],
  imagenesHero: [{ src: "/ejemplo/hero-patio-de-luces.jpg", alt: "Patio de luces de un edificio visto desde abajo", origen: "ia" }],
  trabajos: [
    { titulo: "Centralización nueva para 24 viviendas", slug: "contadores-benicalap", descripcion: "Cuarto de contadores renovado con cortes de luz avisados por escalera.", ubicacion: "Benicalap, Valencia", anio: 2025, servicio: "centralizacion-de-contadores", superficie: "24 viviendas", duracion: "3 semanas", contenido: ["Trabajamos por tramos para que cada vivienda estuviera sin luz menos de dos horas."], imagenes: [{ src: "/ejemplo/trabajo-contadores-benicalap.jpg", alt: "Centralización de contadores nueva", origen: "ia" }], antes: { src: "/ejemplo/antes-contadores-benicalap.jpg", alt: "Centralización antigua antes de la renovación", origen: "ia" }, testimonio: { autor: "Administración de fincas del edificio", texto: "Presupuesto claro para la junta y ni una queja de los vecinos." } },
    { titulo: "Escalera con LED y detectores", slug: "escalera-arrancapins", descripcion: "Ocho plantas con alumbrado nuevo y detectores en cada rellano.", ubicacion: "Arrancapins, Valencia", anio: 2026, servicio: "alumbrado-escalera", superficie: "8 plantas", duracion: "4 días", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-escalera-arrancapins.jpg", alt: "Escalera con alumbrado LED nuevo", origen: "ia" }] },
    { titulo: "Preinstalación de recarga en Malilla", slug: "garaje-malilla", descripcion: "Canalización común para 40 plazas de garaje.", ubicacion: "Malilla, Valencia", anio: 2026, servicio: "recarga-garaje-comunitario", superficie: "40 plazas", duracion: "2 semanas", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-garaje-malilla.jpg", alt: "Garaje con canalización nueva en el techo", origen: "ia" }] },
    { titulo: "Zaguán sin cables a la vista", slug: "zaguan-burjassot", descripcion: "Cables grapados sustituidos por canalización y luminarias nuevas.", ubicacion: "Burjassot", anio: 2025, servicio: "correccion-de-defectos", duracion: "3 días", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-zaguan-burjassot.jpg", alt: "Zaguán con la instalación canalizada", origen: "ia" }], antes: { src: "/ejemplo/antes-zaguan-burjassot.jpg", alt: "Zaguán con cables grapados antes del trabajo", origen: "ia" } },
  ],
  valoracion: { media: 4.6, total: 88 },
  resenas: [
    { autor: "Francisco J. (administrador de fincas)", texto: "Llevamos con ellos doce comunidades. Presupuestos claros, factura a nombre de cada comunidad y vienen cuando dicen.", puntuacion: 5, fecha: "2026-10-28", fuente: "google" },
    { autor: "Pilar S.", texto: "Se fue la luz del portal un domingo y vinieron en menos de una hora.", puntuacion: 5, fecha: "2026-10-12", fuente: "google" },
    { autor: "Comunidad Pintor Sorolla", texto: "Muy serios.", puntuacion: 5, fecha: "2026-09", fuente: "google" },
    { autor: "Ramón E.", texto: "El cambio de contadores tardó una semana más de lo previsto, pero nos tuvieron informados.", puntuacion: 4, fecha: "2026-07-21", fuente: "google" },
    { autor: "Teresa V.", texto: "Me hicieron el boletín del piso con el mismo equipo que lleva la escalera. Cómodo y rápido.", puntuacion: 5, fecha: "2026-06-30", fuente: "google" },
  ],
  proceso: [
    { titulo: "Nos llamas o nos escribes", texto: "Si es una avería, salimos. Si es una obra, pedimos fotos y planos." },
    { titulo: "Visita y presupuesto escrito", texto: "Un documento que se puede llevar a la junta." },
    { titulo: "Trabajo con cortes avisados", texto: "Avisamos a los vecinos antes de cada corte de luz." },
  ],
  acreditaciones: [
    { nombre: "Empresa instaladora en baja tensión (RII), categoría especialista", numero: "46/IBTE/0000 (ficticio)" },
    { nombre: "Seguro de responsabilidad civil", numero: "Póliza RC-0000-0000 (ficticia)" },
  ],
  garantias: ["Presupuesto escrito para la junta", "Factura a nombre de la comunidad", "Cortes de luz avisados", "Certificado de cada instalación"],
  comunidades: {
    texto: [
      "Trabajamos con administradores de fincas desde 2004. Damos presupuestos por escrito, organizamos los cortes de luz con los vecinos y entregamos los certificados de cada instalación.",
      "Para las comunidades con mantenimiento, las averías de zonas comunes tienen prioridad.",
    ],
    puntos: ["Presupuesto para la junta en una semana", "Un único contacto para el administrador", "Informe tras cada revisión"],
    ieev: false,
  },
  empresa: {
    historia: ["Empezamos en 2004 haciendo el mantenimiento de tres edificios del Ensanche. Hoy somos nueve técnicos."],
    imagenes: [
      { src: "/ejemplo/empresa-buzones.jpg", alt: "Buzones de latón en un zaguán", origen: "ia" },
      { src: "/ejemplo/empresa-cuarto-tecnico.jpg", alt: "Cuarto técnico ordenado de un edificio", origen: "ia" },
    ],
    equipo: [{ nombre: "Vicente", cargo: "Gerente" }, { nombre: "Marta", cargo: "Atención a administradores" }],
  },
  preguntas: [
    { pregunta: "¿Hacéis presupuestos para la junta?", respuesta: "Sí, por escrito y con el desglose por partidas." },
    { pregunta: "¿Atendéis averías de vecinos particulares?", respuesta: "Sí, también urgencias en viviendas." },
  ],
  marcas: ["Schneider Electric", "ABB", "Legrand"],
  seo: { titulo: "Electricistas para comunidades en Valencia · Escala", descripcion: "Mantenimiento eléctrico de comunidades, contadores y alumbrado de escalera en Valencia. Habilitados y con seguro.", url: "https://escalaejemplo.example" },
  redes: { facebook: "https://www.facebook.com/escala.ejemplo" },
});
