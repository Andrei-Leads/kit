// Datos FICTICIOS de ejemplo de «Restauración» (carpinteria-madera-5): encargo §11 y datos de la
// entrega de Claude Design, con el patrón ficticio evidente del kit: «Calle Ejemplo», dominios
// .example, cid=000…, teléfono 600 00 05 15 y NIF con letra de control inválida. Todas las fotos de
// ejemplo son relleno con origen "ia" (public/ejemplo/CREDITOS.md). Sin seo.indexar ni analitica:
// las activa cada web, nunca el template.
import { defineSiteConfig, type Imagen } from "@andrei-leads/core";

const ia = (src: string, alt: string): Imagen => ({ src: `/ejemplo/${src}`, alt, origen: "ia" });

export default defineSiteConfig({
  negocio: {
    nombre: "Taller Pàtina",
    nombreLegal: "Amparo Gil Bonet", // autónoma ficticia: sin registroMercantil
    nif: "48213765Q", // ficticio: la letra de control no corresponde a propósito (la correcta sería S)
    sector: "Restauración de madera",
    descripcionCorta: "Restauramos y lacamos puertas, recuperamos muebles antiguos y acuchillamos tarimas en Valencia y su área.",
    anioFundacion: 2003,
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000515",
    whatsapp: "+34600000515",
    email: "hola@tallerpatina.example",
    direccion: { calle: "Calle Ejemplo, 88, bajo", cp: "46007", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "09:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "16:30", cierra: "19:30" },
    ],
    mensajeWhatsapp: "Hola, tengo una pieza de madera que quiero restaurar. Os mando una foto.",
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000515", // ficticio
  },
  zonas: ["Valencia", "Mislata", "Xirivella", "Torrent", "Paiporta", "Picanya", "Alaquàs", "Aldaia"],
  servicios: [
    {
      titulo: "Lacado de puertas",
      slug: "lacado-de-puertas",
      descripcion: "Tus puertas de sapelli, lacadas en blanco o en color, sin cambiarlas.",
      precioDesde: "desde 140 € por puerta", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Desmontamos las hojas, las llevamos al taller y las devolvemos lacadas en una semana.",
        "Los marcos se lacan en casa, protegiendo suelos y paredes.",
      ],
      incluye: ["Desmontaje y montaje", "Lijado y fondo", "Lacado al agua"],
      imagenes: [ia("puertas-lacadas-despues.jpg", "Puerta de paso lacada en blanco roto en un pasillo con terrazo")],
      preguntas: [{ pregunta: "¿Amarillea el lacado?", respuesta: "Usamos lacas al agua que no amarillean con el tiempo." }],
    },
    {
      titulo: "Restauración de puertas",
      slug: "restauracion-de-puertas",
      descripcion: "Puertas de entrada y de paso antiguas, recuperadas.",
      precioDesde: "desde 260 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [],
      incluye: [],
      imagenes: [ia("hero-puerta-despues.jpg", "Puerta de entrada de pino restaurada y aceitada en un zaguán")],
      preguntas: [],
    },
    {
      titulo: "Muebles antiguos",
      slug: "muebles-antiguos",
      descripcion: "Cómodas, mesas, sillas y armarios de familia.",
      contenido: [],
      incluye: [],
      imagenes: [ia("comoda-despues.jpg", "Cómoda de nogal con marquetería recién encerada")],
      preguntas: [],
    },
    {
      titulo: "Acuchillado de tarima y parquet",
      slug: "acuchillado-tarima",
      descripcion: "Lijado y barnizado de suelos de madera.",
      contenido: [],
      incluye: [],
      imagenes: [ia("tarima-despues.jpg", "Tarima de roble acuchillada y barnizada en mate")],
      preguntas: [],
    },
    {
      titulo: "Contraventanas y ventanas",
      slug: "contraventanas",
      descripcion: "Contraventanas y ventanas de madera reparadas y pintadas.",
      contenido: [],
      incluye: [],
      imagenes: [ia("contraventana-despues.jpg", "Contraventana de lamas restaurada y pintada en verde")],
      preguntas: [],
    },
    {
      titulo: "Tratamiento de carcoma",
      slug: "carcoma",
      descripcion: "Tratamiento y consolidación de madera atacada.",
      contenido: [],
      incluye: [],
      imagenes: [ia("carcoma-detalle.jpg", "Orificios de carcoma en la pata torneada de un mueble")],
      preguntas: [],
    },
  ],
  trabajos: [
    {
      titulo: "Puerta de entrada en El Carme",
      slug: "puerta-el-carme",
      descripcion: "Puerta de pino de 1920 decapada, reparada y aceitada.",
      ubicacion: "El Carme, Valencia",
      anio: 2026,
      servicio: "restauracion-de-puertas",
      duracion: "3 semanas",
      contenido: ["Quitamos cinco capas de barniz y repusimos dos cuarterones."],
      imagenes: [ia("hero-puerta-despues.jpg", "Puerta de entrada de pino restaurada y aceitada")],
      antes: ia("hero-puerta-antes.jpg", "La misma puerta antes, con el barniz oscuro cuarteado"),
      testimonio: { autor: "Ferran C.", texto: "Pensábamos cambiarla. Ahora es lo que más nos gusta de la casa." },
    },
    {
      titulo: "Siete puertas lacadas en Mislata",
      slug: "puertas-mislata",
      descripcion: "Puertas de sapelli lacadas en blanco roto.",
      ubicacion: "Mislata",
      anio: 2026,
      servicio: "lacado-de-puertas",
      duracion: "8 días",
      precio: "1.000–1.200 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [],
      imagenes: [ia("puertas-lacadas-despues.jpg", "Puerta de paso lacada en blanco roto")],
      antes: ia("puertas-sapelli-antes.jpg", "La misma puerta en sapelli oscuro, con el barniz gastado junto al pomo"),
    },
    {
      titulo: "Cómoda de la abuela",
      slug: "comoda-torrent",
      descripcion: "Cómoda de nogal con marquetería, limpiada y encerada.",
      ubicacion: "Torrent",
      anio: 2025,
      servicio: "muebles-antiguos",
      duracion: "4 semanas",
      contenido: [],
      imagenes: [ia("comoda-despues.jpg", "Cómoda de nogal restaurada")],
      antes: ia("comoda-antes.jpg", "La cómoda antes, con manchas de agua y una pata suelta"),
    },
    {
      titulo: "Tarima en Algirós",
      slug: "tarima-algiros",
      descripcion: "Acuchillado y barniz mate en un piso de 70 m².",
      ubicacion: "Algirós, Valencia",
      anio: 2025,
      servicio: "acuchillado-tarima",
      superficie: "70 m²",
      duracion: "4 días",
      contenido: [],
      imagenes: [ia("tarima-despues.jpg", "Tarima de roble barnizada en mate")],
      antes: ia("tarima-antes.jpg", "La misma tarima antes, gastada y con manchas de agua"),
    },
    {
      titulo: "Contraventanas en Picanya",
      slug: "contraventanas-picanya",
      descripcion: "Seis contraventanas reparadas y pintadas en verde.",
      ubicacion: "Picanya",
      anio: 2024,
      servicio: "contraventanas",
      contenido: [],
      imagenes: [ia("contraventana-despues.jpg", "Contraventana de lamas restaurada y pintada en verde")],
    },
  ],
  valoracion: { media: 4.9, total: 74 },
  resenas: [
    { autor: "Ferran Cervera", texto: "La puerta ha vuelto a nacer.", puntuacion: 5, fecha: "2026-10-27", fuente: "google" },
    {
      autor: "Rosa Alapont",
      texto:
        "Lacaron todas las puertas del piso en ocho días. Se llevaron las hojas, las trajeron perfectas y los marcos los hicieron en casa sin manchar nada. El cambio es enorme y costó mucho menos que puertas nuevas.",
      puntuacion: 5,
      fecha: "2026-09-19",
      fuente: "google",
    },
    { autor: "Pepa Soriano", texto: "Restauraron la cómoda de mi abuela con muchísimo cariño.", puntuacion: 5, fecha: "2026-08", fuente: "google" },
    { autor: "Óscar Llorens", texto: "Buen trabajo en la tarima. Algo de polvo el primer día, aunque avisaron.", puntuacion: 4, fecha: "2026-06-08", fuente: "google" },
    { autor: "Teresa Mora", texto: "Amables y cumplidores.", puntuacion: 5, fecha: "2026-04-14", fuente: "google" },
  ],
  proceso: [
    { titulo: "Nos mandas una foto", texto: "Por WhatsApp te decimos si tiene arreglo y un precio orientativo." },
    { titulo: "Vamos a verla", texto: "O la traes al taller." },
    { titulo: "Presupuesto cerrado", texto: "Con plazo de entrega." },
    { titulo: "Restauramos", texto: "Decapado, reparación, lijado y acabado." },
    { titulo: "Te la devolvemos", texto: "La montamos en su sitio." },
  ],
  garantias: ["Presupuesto cerrado", "Recogida y entrega incluidas", "Lacas al agua de bajo olor"],
  marcas: ["Osmo", "Rubio Monocoat"],
  empresa: {
    historia: ["Amparo aprendió el oficio en el taller de su padre, en Ciutat Vella.", "Desde 2003 restaura puertas y muebles de toda la ciudad."],
    imagenes: [
      ia("manos-lijando.jpg", "Manos con guantes lijando un tablero"),
      ia("taller-restauracion.jpg", "Rincón del taller con puertas y sillas esperando"),
      ia("aceite-brocha.jpg", "Brocha aplicando aceite sobre la veta"),
    ],
    equipo: [],
  },
  imagenesHero: [ia("hero-puerta-despues.jpg", "Puerta de entrada de pino restaurada en un zaguán")],
  // Vídeo de la sección «En el taller» (encargo §5): va en `videoPano` (vídeo de sección, core 0.7.0), no
  // en el hero. No hay archivos de vídeo todavía: descomentar cuando existan public/ejemplo/taller.mp4 y
  // taller-av1.mp4 (el póster ya está).
  // videoPano: {
  //   src: "/ejemplo/taller.mp4",
  //   srcAv1: "/ejemplo/taller-av1.mp4",
  //   poster: ia("poster-taller.jpg", "Lijadora orbital sobre una puerta con barniz viejo"),
  // },
  galeria: [{ ...ia("silla-enea.jpg", "Silla de enea restaurada"), titulo: "Silla de enea" }],
  preguntas: [
    { pregunta: "¿Merece la pena lacar en vez de cambiar las puertas?", respuesta: "Si la puerta está sana, sí: cuesta bastante menos y no hay obra." },
    { pregunta: "¿Os lleváis las puertas?", respuesta: "Las hojas sí; los marcos se hacen en casa." },
  ],
  seo: {
    titulo: "Taller Pàtina · Lacado y restauración de madera, Valencia",
    descripcion: "Lacamos y restauramos puertas, recuperamos muebles antiguos y acuchillamos tarimas en Valencia.",
    url: "https://tallerpatina.example",
  },
  redes: { instagram: "https://www.instagram.com/tallerpatina.ejemplo" },
});
