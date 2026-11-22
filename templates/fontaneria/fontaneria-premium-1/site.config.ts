/*
 * Datos de ejemplo de «Caudal» (fontaneria-premium-1): negocio FICTICIO de
 * Madrid (encargo §11). NIF, registro, acreditaciones, teléfono, dirección,
 * email y ficha de Google son inventados. Las fotos de public/ejemplo/ son de
 * relleno (origen "ia": se sustituirán por imágenes de IA y, en la web del
 * cliente, por las de su sesión de fotos). Sin `seo.indexar` (noindex) ni
 * `analitica`: los activa cada web.
 */
import { defineSiteConfig } from "@andrei-leads/core";

const ia = "ia" as const;
const lv = ["lunes", "martes", "miercoles", "jueves", "viernes"] as const;

export default defineSiteConfig({
  negocio: {
    nombre: "Olmedo Instalaciones", nombreLegal: "Olmedo Instalaciones Hidráulicas, S.L.", nif: "B88417263", // FICTICIO
    sector: "Instalaciones de fontanería",
    descripcionCorta: "Instaladores de fontanería en Madrid desde 1994: baños completos, renovación de tuberías, agua caliente con aerotermia y comunidades.",
    anioFundacion: 1994, registroMercantil: "Registro Mercantil de Madrid, tomo 0000, folio 00, hoja M-000000 (ficticio)",
    tipoSchema: ["Plumber"],
  },
  contacto: {
    telefono: "+34600000006", whatsapp: "+34600000006", email: "hola@olmedoinstalaciones.example",
    direccion: { calle: "Calle Ejemplo 47", cp: "28006", ciudad: "Madrid", provincia: "Madrid" },
    horario: [{ dias: [...lv], abre: "08:00", cierra: "14:00" }, { dias: [...lv], abre: "15:00", cierra: "18:30" }],
    coordenadas: { lat: 40.4296, lng: -3.6697 },
    mensajeWhatsapp: "Hola, vengo de vuestra web. Quiero pedir presupuesto para una instalación:",
    urgencias24h: false, fichaGoogle: "https://maps.google.com/?cid=0000000000000000006",
  },
  zonas: ["Madrid", "Pozuelo de Alarcón", "Majadahonda", "Las Rozas de Madrid", "Boadilla del Monte", "Alcobendas", "San Sebastián de los Reyes", "Tres Cantos"],
  servicios: [
    { titulo: "Baños completos", slug: "banos-completos",
      descripcion: "Quitamos el baño viejo y lo dejamos nuevo: tuberías, desagües, plato de ducha, sanitarios y grifería, con fecha de fin por contrato.",
      contenido: ["Un baño empieza por lo que no se ve: cambiamos tomas y desagües antes de alicatar y probamos la presión con la pared abierta.",
        "Coordinamos al alicatador y al electricista: un solo interlocutor y una sola fecha. En un piso, lo normal son dos o tres semanas."],
      incluye: ["Tomas y desagües nuevos", "Plato de ducha o bañera", "Sanitarios y grifería", "Prueba de presión y certificado"],
      imagenes: [{ src: "/ejemplo/servicio-banos-1.jpg", alt: "Baño terminado con plato de resina, mampara y grifería negra", origen: ia },
        { src: "/ejemplo/servicio-banos-2.jpg", alt: "Tomas de multicapa en una pared de baño antes de alicatar", origen: ia }],
      preguntas: [{ pregunta: "¿Cuánto tiempo estaré sin baño?", respuesta: "En un piso, dos o tres semanas. La fecha va en el contrato." }],
      precioDesde: "desde 6.900 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    { titulo: "Renovación de tuberías de plomo y hierro", slug: "renovacion-de-tuberias",
      descripcion: "Cambiamos las tuberías de plomo o hierro galvanizado de tu piso por multicapa o cobre, sin levantar más de lo necesario.",
      contenido: ["Muchos pisos de Madrid de los años 50 a 70 siguen con plomo o hierro: pierden presión, dan agua turbia y acaban en fuga.",
        "Hacemos un recorrido nuevo, cambiamos la llave general y te dejamos un plano sencillo de por dónde va cada tubo."],
      incluye: ["Visita y plano del recorrido", "Multicapa o cobre", "Llave general nueva", "Rozas tapadas y suelo protegido"],
      imagenes: [{ src: "/ejemplo/servicio-tuberias.jpg", alt: "Tubo de plomo retirado junto al tubo nuevo de multicapa", origen: ia }],
      preguntas: [{ pregunta: "¿Cómo sé si mis tuberías son de plomo?", respuesta: "Mándanos por WhatsApp una foto del tubo que sale del contador. Casi siempre basta." }],
      precioDesde: "desde 2.400 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    { titulo: "Agua caliente y aerotermia", slug: "agua-caliente-y-aerotermia",
      descripcion: "Cambiamos el termo o la caldera por aerotermia para el agua caliente, con el depósito dimensionado para tu casa.",
      contenido: ["Calculamos cuánta agua caliente usa tu casa, elegimos el depósito justo y lo dejamos programado para las horas más baratas."],
      incluye: ["Cálculo de consumo", "Equipo y depósito", "Retirada del equipo viejo", "Puesta en marcha"],
      imagenes: [{ src: "/ejemplo/servicio-acs.jpg", alt: "Depósito de agua caliente con bomba de calor en un lavadero", origen: ia }],
      preguntas: [{ pregunta: "¿Cabe en un piso?", respuesta: "En muchos sí, en el lavadero o la terraza. Lo vemos en la visita." }],
      precioDesde: "desde 3.200 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    { titulo: "Descalcificación y tratamiento de agua", slug: "descalcificacion",
      descripcion: "Descalcificadores y filtros que protegen tuberías, termos y electrodomésticos, montados con bypass.",
      contenido: ["Medimos la dureza del agua en tu casa y te recomendamos el equipo justo. Si no hace falta, te lo decimos."],
      incluye: ["Medición de dureza", "Equipo con bypass", "Primera revisión programada"],
      imagenes: [{ src: "/ejemplo/servicio-descalcificador.jpg", alt: "Descalcificador con bypass de latón bajo un fregadero", origen: ia }],
      preguntas: [] },
    { titulo: "Instalaciones para comunidades", slug: "comunidades-de-vecinos",
      descripcion: "Montantes, bajantes, contadores y grupos de presión, con presupuesto por partidas para presentar en la junta.",
      contenido: ["Trabajamos con administradores de fincas: visitamos el edificio y preparamos un presupuesto por partidas para la junta.",
        "Planificamos los cortes de agua por portales y los avisamos con carteles en el portal y el ascensor."],
      incluye: ["Presupuesto para la junta", "Montantes y bajantes", "Batería de contadores", "Cortes planificados"],
      imagenes: [{ src: "/ejemplo/servicio-comunidades.jpg", alt: "Batería de contadores de agua nueva en un portal", origen: ia }],
      preguntas: [{ pregunta: "¿Trabajáis con mi administrador?", respuesta: "Sí. Le mandamos el presupuesto, la planificación y un parte semanal." }] },
    { titulo: "Cocinas y lavaderos", slug: "cocinas-y-lavaderos",
      descripcion: "Tomas de agua, desagües y conexiones para la cocina nueva o el lavadero, coordinados con el montador.",
      contenido: [], incluye: ["Tomas y desagües", "Conexión de lavavajillas y lavadora"], imagenes: [], preguntas: [] },
  ],
  trabajos: [
    { titulo: "Baño completo en un piso de Chamberí", slug: "bano-chamberi",
      descripcion: "Baño de 1972 con techos altos. Tuberías nuevas, plato de ducha en lugar de bañera y mampara fija, respetando la ventana original.",
      ubicacion: "Chamberí (Madrid)", anio: 2026, servicio: "banos-completos", superficie: "6 m²", duracion: "16 días",
      precio: "8.000–9.000 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: ["Abrimos, cambiamos tomas y desagües y probamos la presión antes de cerrar. Terminamos un día antes de la fecha del contrato."],
      imagenes: [{ src: "/ejemplo/trabajo-bano.jpg", alt: "Baño reformado en Chamberí con plato de ducha y mampara fija", origen: ia }],
      antes: { src: "/ejemplo/trabajo-bano-antes.jpg", alt: "El mismo baño antes, con bañera y azulejo de los 70", origen: ia },
      testimonio: { autor: "Inés M.", texto: "Nos dieron fecha de fin y la cumplieron. El baño parece otro y no hubo ni un extra." } },
    { titulo: "Tuberías de plomo fuera en un piso de Retiro", slug: "tuberias-retiro",
      descripcion: "Piso de 1958 con plomo y montante de hierro. Renovación completa por rozas con multicapa y llave general nueva.",
      ubicacion: "Retiro (Madrid)", anio: 2025, servicio: "renovacion-de-tuberias", superficie: "92 m²", duracion: "6 días",
      precio: "3.500–4.000 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: ["Los propietarios siguieron en el piso: trabajamos por tramos y nunca estuvieron más de una mañana sin agua."],
      imagenes: [{ src: "/ejemplo/trabajo-tuberias.jpg", alt: "Patinillo con montante de cobre nuevo", origen: ia }] },
    { titulo: "Montantes nuevos para una comunidad de Arganzuela", slug: "montantes-arganzuela",
      descripcion: "Edificio de 1964 con 24 viviendas. Montantes y contadores nuevos, aprobados en junta con nuestro presupuesto por partidas.",
      ubicacion: "Arganzuela (Madrid)", anio: 2025, servicio: "comunidades-de-vecinos", duracion: "5 semanas",
      contenido: ["Obra por portales, cortes avisados con dos días de antelación y un parte semanal al administrador."],
      imagenes: [{ src: "/ejemplo/trabajo-montantes.jpg", alt: "Montantes de cobre nuevos en el armario de la escalera", origen: ia }],
      testimonio: { autor: "Jorge A., administrador de fincas", texto: "Presupuesto claro para la junta y ni una queja de los vecinos." } },
    { titulo: "Aerotermia en un chalé de Pozuelo", slug: "aerotermia-pozuelo",
      descripcion: "Caldera de gasóleo sustituida por aerotermia para el agua caliente de una familia de cinco, con depósito de 200 litros.",
      ubicacion: "Pozuelo de Alarcón", anio: 2026, servicio: "agua-caliente-y-aerotermia", duracion: "3 días", contenido: [],
      imagenes: [{ src: "/ejemplo/trabajo-aerotermia.jpg", alt: "Unidad exterior de aerotermia en el patio de un chalé", origen: ia }] },
  ],
  valoracion: { media: 4.8, total: 143 },
  // Pasos de «Cómo trabajamos» del diseño. Sin `proceso`, salen los pasos por defecto de proyecto de core.
  proceso: [
    { titulo: "Visita", texto: "Vemos la instalación, medimos y hacemos fotos." },
    { titulo: "Presupuesto por partidas", texto: "Cerrado, con cada partida y su precio." },
    { titulo: "Contrato con fecha", texto: "Fecha de inicio y de fin, por escrito." },
    { titulo: "Obra", texto: "Cortes de agua avisados y suelo protegido." },
    { titulo: "Limpieza", texto: "Retiramos escombro y dejamos la casa limpia." },
    { titulo: "Garantía", texto: "Prueba de presión, certificado y garantía escrita." },
  ],
  resenas: [
    { autor: "Inés M.", texto: "Nos dieron fecha de fin y la cumplieron. El baño parece otro.", puntuacion: 5, fecha: "2026-11-04", fuente: "google" },
    { autor: "Alberto R.", texto: "Cambiaron todas las tuberías de plomo del piso con nosotros dentro. Avisaban de cada corte el día antes, protegieron el suelo y lo dejaron todo limpio. El presupuesto fue el que firmamos, sin sorpresas. Muy recomendables para pisos antiguos.", puntuacion: 5, fecha: "2026-10", fuente: "google" },
    { autor: "Carmen L.", texto: "Serios y ordenados.", puntuacion: 5, fecha: "2026-09-18", fuente: "google" },
    { autor: "Jorge A.", texto: "Presupuesto por partidas para la junta y obra sin quejas de los vecinos.", puntuacion: 5, fecha: "2026-08", fuente: "google" },
    { autor: "Pablo S.", texto: "La aerotermia va perfecta. El depósito llegó un día tarde, pero avisaron.", puntuacion: 4, fecha: "2026-06-02", fuente: "web" },
  ],
  acreditaciones: [{ nombre: "Empresa instaladora de fontanería", numero: "n.º 0000-IF (ficticio)" }, { nombre: "Empresa instaladora RITE", numero: "n.º 0000-RITE (ficticio)" }],
  garantias: ["Presupuesto cerrado por partidas antes de empezar", "Fecha de inicio y de fin en el contrato", "Prueba de presión y certificado al terminar", "Dos años de garantía en la mano de obra", "Seguro de responsabilidad civil"],
  marcas: ["Uponor", "Geberit", "Daikin", "Roca", "Grohe"],
  empresa: {
    historia: ["Olmedo Instalaciones nació en 1994 en el barrio de Salamanca, renovando las tuberías de los pisos antiguos de la zona.",
      "Hoy somos catorce personas con almacén propio y seguimos igual: instalaciones ordenadas aunque vayan detrás de la pared."],
    imagenes: [{ src: "/ejemplo/empresa-almacen.jpg", alt: "Almacén con tubos de cobre y multicapa ordenados por diámetro", origen: ia },
      { src: "/ejemplo/empresa-manos.jpg", alt: "Manos con guantes prensando un racor de multicapa", origen: ia }],
    equipo: [{ nombre: "Andrés Olmedo", cargo: "Gerente e instalador" }, { nombre: "Sonia Pardo", cargo: "Presupuestos y obras" }],
  },
  imagenesHero: [{ src: "/ejemplo/hero.jpg", alt: "Colector de latón con circuitos de multicapa y tuberías de cobre aisladas", origen: ia }],
  // Vídeo del hero: aún no hay clip. Cuando exista (8 s en bucle, H.264 de 1–3 MB a 720p, sin audio;
  // CREDITOS.md), se guarda como public/ejemplo/hero.mp4 (+ hero.av1.mp4 opcional) y se descomenta.
  // El póster es la misma foto del hero y es el LCP. Sin vídeo, el hero usa imagenesHero[0].
  // videoHero: {
  //   src: "/ejemplo/hero.mp4",
  //   // srcAv1: "/ejemplo/hero.av1.mp4",
  //   poster: { src: "/ejemplo/hero.jpg", alt: "Colector de latón con circuitos de multicapa y tuberías de cobre aisladas", origen: ia },
  // },
  // videoPano: no se usa en «Caudal» (encargo §5.3: el pano es una foto, galeria[0]).
  galeria: [{ src: "/ejemplo/instalacion-vista.jpg", alt: "Sala de agua caliente con depósito, bomba y tuberías aisladas", titulo: "Sala de agua caliente en Chamberí", origen: ia }],
  preguntas: [
    { pregunta: "¿La visita para el presupuesto tiene coste?", respuesta: "No. Visitamos, medimos y te mandamos el presupuesto por partidas en unos días." },
    { pregunta: "¿Hacéis reparaciones urgentes?", respuesta: "No. Nos dedicamos a obras planificadas para poder cumplir las fechas." },
    { pregunta: "¿Dais factura y certificado?", respuesta: "Siempre: factura con IVA y certificado de la instalación." },
  ],
  redes: { instagram: "https://www.instagram.com/olmedoinstalaciones.ejemplo" },
  seo: {
    titulo: "Instalaciones de fontanería en Madrid · Olmedo",
    descripcion: "Baños completos, renovación de tuberías de plomo, agua caliente con aerotermia y comunidades en Madrid. Presupuesto por partidas y fecha por contrato.",
    url: "https://fontaneria-premium-1.example",
  },
});
