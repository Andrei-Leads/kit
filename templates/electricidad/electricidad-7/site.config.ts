import { defineSiteConfig } from "@andrei-leads/core";

/*
 * Datos de ejemplo de «Mándanos una foto» (electricidad-7): electricistas FICTICIOS de Barcelona.
 * El nombre del encargo («Endoll») se cambió por «Fil a Fil»: existe una L'Endoll SL real.
 * Todas las fotos son de relleno (public/ejemplo/) y se marcan como generadas con IA.
 * Sin `seo.indexar` ni la analítica de Vercel: los activa cada web, nunca el template.
 */
export default defineSiteConfig({
  negocio: {
    nombre: "Fil a Fil Electricistes",
    nombreLegal: "Fil a Fil Serveis Elèctrics, S.L.",
    nif: "B67214584", // ficticio: el dígito de control no corresponde a propósito (el correcto sería 5)
    sector: "Electricistas",
    descripcionCorta: "Electricistas en Barcelona. Mándanos una foto por WhatsApp y te decimos qué es y cuánto cuesta antes de venir.",
    anioFundacion: 2014,
    registroMercantil: "Registro Mercantil de Barcelona, tomo 0000, folio 00, hoja B-000000 (ficticio)",
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000407",
    whatsapp: "+34600000407",
    email: "hola@filafilelectricistes.example",
    direccion: { calle: "Calle Ejemplo, 12", cp: "08025", ciudad: "Barcelona", provincia: "Barcelona" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:30", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "15:30", cierra: "19:00" },
    ],
    urgencias24h: false,
    tiempoLlegada: "40 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000307", // ficticio
  },
  zonas: [
    "Barcelona",
    "L'Hospitalet de Llobregat",
    "Badalona",
    "Sant Adrià de Besòs",
    "Esplugues de Llobregat",
    "Cornellà de Llobregat",
    "Sant Just Desvern",
  ],
  servicios: [
    {
      titulo: "Un enchufe se ha quemado",
      slug: "enchufe-quemado",
      descripcion: "Está negro, huele a quemado o se calienta al usarlo.",
      contenido: [
        "Un enchufe quemado suele ser una conexión floja o demasiada carga en una regleta. Con una foto del enchufe y del cuadro ya podemos decirte qué es probable.",
        "Cambiamos el mecanismo, revisamos el cable hasta la caja y te decimos si ese circuito aguanta lo que conectas.",
      ],
      incluye: ["Mecanismo nuevo", "Revisión del cable", "Consejo sobre la carga"],
      imagenes: [{ src: "/ejemplo/servicio-enchufe-quemado.jpg", alt: "Enchufe ennegrecido en una pared con papel pintado", origen: "ia" }],
      preguntas: [{ pregunta: "¿Lo puedo seguir usando?", respuesta: "No. Desconéctalo y baja el interruptor de ese circuito hasta que lo veamos." }],
      mensajeWhatsapp: "Hola, se me ha quemado un enchufe. Ahora os mando una foto.",
    },
    {
      titulo: "Salta el diferencial",
      slug: "salta-el-diferencial",
      descripcion: "Se va la luz de toda la casa y el interruptor no se queda arriba.",
      contenido: ["Mándanos una foto del cuadro con la tapa abierta: así vemos qué interruptor es y qué protecciones tienes."],
      imagenes: [{ src: "/ejemplo/servicio-diferencial.jpg", alt: "Cuadro con el diferencial bajado", origen: "ia" }],
    },
    {
      titulo: "Cuadro antiguo con fusibles",
      slug: "cuadro-antiguo",
      descripcion: "Tu piso aún tiene fusibles o no tiene diferencial.",
      imagenes: [{ src: "/ejemplo/servicio-cuadro-antiguo.jpg", alt: "Cuadro de fusibles de porcelana en un recibidor", origen: "ia" }],
    },
    {
      titulo: "Las luces parpadean",
      slug: "luces-parpadean",
      descripcion: "Parpadean, hacen ruido o se funden muy a menudo.",
      imagenes: [{ src: "/ejemplo/servicio-luces.jpg", alt: "Lámpara en un techo con moldura", origen: "ia" }],
    },
    {
      titulo: "Plafones y lámparas",
      slug: "plafones-y-lamparas",
      descripcion: "Colgar una lámpara o cambiar un plafón que se ha descolgado.",
      imagenes: [{ src: "/ejemplo/servicio-plafon.jpg", alt: "Plafón descolgado con los cables a la vista", origen: "ia" }],
    },
    {
      // Sin foto a propósito: es el caso «servicio sin foto».
      titulo: "Instalación sin toma de tierra",
      slug: "toma-de-tierra",
      descripcion: "Enchufes de dos agujeros o calambre al tocar la lavadora.",
    },
    {
      titulo: "Boletín eléctrico",
      slug: "boletin-electrico",
      descripcion: "Para dar de alta la luz o cambiar el titular del contrato.",
      imagenes: [{ src: "/ejemplo/servicio-boletin.jpg", alt: "Contador antiguo en un armario de escalera", origen: "ia" }],
    },
  ],
  trabajos: [
    {
      titulo: "Adiós a los fusibles en Gràcia",
      slug: "cuadro-gracia",
      descripcion: "Piso de 1930 con fusibles de porcelana. Cuadro nuevo con diferencial y circuitos separados.",
      ubicacion: "Gràcia, Barcelona",
      anio: 2026,
      servicio: "cuadro-antiguo",
      superficie: "70 m²",
      duracion: "1 día",
      contenido: ["La clienta nos mandó la foto del cuadro un lunes y el miércoles ya estaba cambiado."],
      imagenes: [{ src: "/ejemplo/trabajo-gracia.jpg", alt: "Cuadro eléctrico nuevo en un recibidor", origen: "ia" }],
      antes: { src: "/ejemplo/antes-gracia.jpg", alt: "Cuadro antiguo de fusibles en el mismo recibidor", origen: "ia" },
      testimonio: { autor: "Montse P.", texto: "Con la foto ya me dijeron el precio. Ni un euro más." },
    },
    {
      titulo: "Enchufe quemado en el Eixample",
      slug: "enchufe-eixample",
      descripcion: "La regleta del escritorio quemó el enchufe. Mecanismo y cable nuevos.",
      ubicacion: "Eixample, Barcelona",
      anio: 2026,
      servicio: "enchufe-quemado",
      duracion: "1 h",
      imagenes: [{ src: "/ejemplo/trabajo-eixample.jpg", alt: "Enchufe nuevo en la pared", origen: "ia" }],
      antes: { src: "/ejemplo/antes-eixample.jpg", alt: "Enchufe quemado antes de cambiarlo", origen: "ia" },
    },
    {
      titulo: "Lámpara en un techo de cuatro metros",
      slug: "lampara-sants",
      descripcion: "Colgar una lámpara grande en un techo alto con moldura.",
      ubicacion: "Sants, Barcelona",
      anio: 2025,
      servicio: "plafones-y-lamparas",
      duracion: "2 h",
      imagenes: [{ src: "/ejemplo/trabajo-sants.jpg", alt: "Lámpara nueva colgada de un techo alto", origen: "ia" }],
    },
    {
      titulo: "Enchufes nuevos en lugar de regletas",
      slug: "enchufes-hospitalet",
      descripcion: "Tres enchufes dobles nuevos en un salón que vivía de regletas.",
      ubicacion: "L'Hospitalet de Llobregat",
      anio: 2025,
      servicio: "enchufe-quemado",
      duracion: "3 h",
      imagenes: [{ src: "/ejemplo/trabajo-hospitalet.jpg", alt: "Enchufes nuevos en la pared de un salón", origen: "ia" }],
    },
  ],
  valoracion: { media: 4.9, total: 138 },
  resenas: [
    { autor: "Jordi C.", texto: "Les mandé la foto y en diez minutos me contestaron.", puntuacion: 5, fecha: "2026-11-10", fuente: "google" },
    {
      autor: "Sara N.",
      texto: "No sabía ni cómo se llamaba lo que tenía roto. Mandé la foto del cuadro, me dijeron que era el diferencial y el precio aproximado, y vinieron esa misma tarde.",
      puntuacion: 5,
      fecha: "2026-10-25",
      fuente: "google",
    },
    { autor: "Pere M.", texto: "Muy amables.", puntuacion: 5, fecha: "2026-10", fuente: "google" },
    { autor: "Laia R.", texto: "Llegaron un poco tarde pero avisaron por WhatsApp.", puntuacion: 4, fecha: "2026-09-30", fuente: "google" },
    { autor: "Óscar T.", texto: "Cambiaron el cuadro de mi madre en un día y lo dejaron todo limpio.", puntuacion: 5, fecha: "2026-09-02", fuente: "google" },
    { autor: "Ana B.", texto: "Rapidez y buen precio.", puntuacion: 5, fecha: "2026-08-19", fuente: "google" },
  ],
  acreditaciones: [{ nombre: "Empresa instaladora en baja tensión (RII)", numero: "08/000000 (ficticio)" }],
  garantias: ["Precio orientativo por WhatsApp antes de venir", "Factura con IVA"],
  empresa: {
    historia: ["Somos dos socios que empezamos en 2014 arreglando instalaciones de pisos antiguos en Gràcia."],
    imagenes: [{ src: "/ejemplo/empresa-mochila.jpg", alt: "Bolsa de herramientas abierta sobre un suelo hidráulico", origen: "ia" }],
    equipo: [
      { nombre: "Marc", cargo: "Electricista" },
      { nombre: "Dani", cargo: "Electricista" },
    ],
  },
  galeria: [{ src: "/ejemplo/galeria-mecanismos.jpg", alt: "Mecanismos nuevos en una pared recién pintada", origen: "ia" }],
  preguntas: [
    { pregunta: "¿Qué foto os mando?", respuesta: "Una del cuadro con la tapa abierta y otra de lo que falla, de cerca y con luz." },
    { pregunta: "¿El precio por WhatsApp es definitivo?", respuesta: "Es orientativo. Lo confirmamos al verlo, antes de empezar." },
  ],
  seo: {
    titulo: "Electricistas en Barcelona · Fil a Fil Electricistes",
    descripcion: "Mándanos una foto por WhatsApp y te decimos qué es y cuánto cuesta. Electricistas en Barcelona.",
    url: "https://filafilejemplo.example",
  },
  redes: { instagram: "https://www.instagram.com/filafil.ejemplo" },
});
