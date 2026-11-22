// Datos FICTICIOS de ejemplo (encargo electricidad-5 «Casa al día», §11), con el patrón ficticio evidente de
// los templates 1–3 (registro, acreditación, email, web y dirección). NIF de ejemplo con dígito de control inválido.
import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Tensa Instalaciones",
    nombreLegal: "Tensa Instalaciones Eléctricas Madrid, S.L.",
    nif: "B87341259",
    sector: "Electricistas",
    descripcionCorta: "Puntos de recarga, domótica, autoconsumo y averías en Madrid. Te damos el precio antes de empezar y legalizamos la instalación.",
    anioFundacion: 2009,
    registroMercantil: "Registro Mercantil de Madrid, tomo 0000, folio 00, hoja M-000000 (ficticio)",
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000205",
    whatsapp: "+34600000205",
    email: "hola@tensaejemplo.example",
    direccion: { calle: "Calle Ejemplo, 5", cp: "28039", ciudad: "Madrid", provincia: "Madrid" },
    horario: [{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "19:00" }],
    urgencias24h: true,
    tiempoLlegada: "45 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000305", // ficticio
  },
  zonas: ["Madrid", "Pozuelo de Alarcón", "Majadahonda", "Las Rozas de Madrid", "Boadilla del Monte", "Villanueva de la Cañada", "Torrelodones", "Collado Villalba"],
  servicios: [
    {
      titulo: "Punto de recarga", slug: "punto-de-recarga",
      descripcion: "Cargador para tu coche en el chalet o en la plaza del garaje comunitario.",
      contenido: [
        "Instalamos el circuito desde tu contador hasta la plaza, con sus protecciones, y dejamos la instalación certificada.",
        "En garaje comunitario te explicamos qué hay que comunicar a la comunidad antes de empezar.",
      ],
      incluye: ["Visita y medición", "Circuito y protecciones", "Certificado de la instalación"],
      imagenes: [{ src: "/ejemplo/servicio-recarga.jpg", alt: "Punto de recarga en la pared de un garaje", origen: "ia" }],
      preguntas: [{ pregunta: "¿Cuánto se tarda?", respuesta: "Un día de trabajo en la mayoría de los garajes." }],
      precioDesde: "desde 690 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    { titulo: "Instalación para autoconsumo", slug: "autoconsumo", descripcion: "La parte eléctrica de tus placas: protecciones, inversor y conexión.", contenido: ["Montamos las protecciones y el cableado del inversor hasta tu cuadro y lo dejamos documentado."], incluye: ["Protecciones", "Cableado del inversor"], imagenes: [{ src: "/ejemplo/servicio-autoconsumo.jpg", alt: "Inversor y protecciones en un trastero", origen: "ia" }], preguntas: [] },
    {
      titulo: "Domótica", slug: "domotica",
      descripcion: "Luces, persianas y calefacción desde el móvil o con un solo pulsador.",
      contenido: [], incluye: ["Persianas", "Iluminación", "Termostato"],
      imagenes: [{ src: "/ejemplo/servicio-domotica.jpg", alt: "Pulsador inteligente junto a mecanismos blancos", origen: "ia" }],
      preguntas: [],
      precioDesde: "desde 180 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    { titulo: "Persianas motorizadas", slug: "persianas-motorizadas", descripcion: "Motor y pulsador para tus persianas de siempre.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-persianas.jpg", alt: "Persiana motorizada a medio bajar", origen: "ia" }], preguntas: [] },
    { titulo: "Aumento de potencia", slug: "aumento-de-potencia", descripcion: "Para la inducción, la aerotermia o el cargador sin que salte el general.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-potencia.jpg", alt: "Cuadro eléctrico moderno empotrado", origen: "ia" }], preguntas: [] },
    { titulo: "Iluminación LED", slug: "iluminacion-led", descripcion: "Iluminación indirecta, focos y tiras para cocina y salón.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-led.jpg", alt: "Tira LED bajo los muebles de una cocina", origen: "ia" }], preguntas: [] },
    {
      titulo: "Averías urgentes", slug: "averias-urgentes",
      descripcion: "Sin luz, diferencial que salta o enchufes que no funcionan.",
      contenido: [], incluye: [],
      imagenes: [{ src: "/ejemplo/servicio-averias.jpg", alt: "Cuadro con un interruptor bajado", origen: "ia" }],
      preguntas: [],
      precioDesde: "desde 55 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
  ],
  imagenesHero: [{ src: "/ejemplo/hero-garaje-recarga.jpg", alt: "Garaje ordenado con un punto de recarga en la pared", origen: "ia" }],
  trabajos: [
    { titulo: "Recarga en un chalet de Pozuelo", slug: "recarga-pozuelo", descripcion: "Punto de recarga de 7,4 kW con circuito nuevo desde el cuadro.", ubicacion: "Pozuelo de Alarcón", anio: 2026, servicio: "punto-de-recarga", duracion: "1 día", contenido: ["El cuadro estaba en la otra punta de la casa: el tubo va por el falso techo del porche."], imagenes: [{ src: "/ejemplo/trabajo-recarga-pozuelo.jpg", alt: "Punto de recarga en el garaje de un chalet", origen: "ia" }], testimonio: { autor: "Marta L.", texto: "Lo dejaron funcionando y nos explicaron la app con calma." } },
    { titulo: "Piso domotizado en Chamberí", slug: "domotica-chamberi", descripcion: "Persianas, luces y termostato con pulsadores nuevos y control desde el móvil.", ubicacion: "Chamberí, Madrid", anio: 2025, servicio: "domotica", superficie: "110 m²", duracion: "4 días", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-domotica-chamberi.jpg", alt: "Pulsadores nuevos en la pared del salón", origen: "ia" }], antes: { src: "/ejemplo/antes-domotica-chamberi.jpg", alt: "Interruptores antiguos en la misma pared", origen: "ia" } },
    { titulo: "Autoconsumo en Majadahonda", slug: "autoconsumo-majadahonda", descripcion: "Protecciones e inversor para 12 placas en una vivienda unifamiliar.", ubicacion: "Majadahonda", anio: 2026, servicio: "autoconsumo", duracion: "2 días", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-autoconsumo-majadahonda.jpg", alt: "Protecciones del autoconsumo montadas en la pared", origen: "ia" }] },
    { titulo: "Cuadro y potencia en Aravaca", slug: "cuadro-aravaca", descripcion: "Cuadro nuevo y subida de potencia para la cocina de inducción.", ubicacion: "Aravaca, Madrid", anio: 2025, servicio: "aumento-de-potencia", duracion: "1 día", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-cuadro-aravaca.jpg", alt: "Cuadro eléctrico nuevo", origen: "ia" }], antes: { src: "/ejemplo/antes-cuadro-aravaca.jpg", alt: "Cuadro antiguo antes del cambio", origen: "ia" } },
  ],
  valoracion: { media: 4.7, total: 163 },
  resenas: [
    { autor: "Pablo S.", texto: "Nos pusieron el cargador en el garaje comunitario y nos ayudaron con el escrito para la comunidad. Muy claros con el precio desde el primer mensaje.", puntuacion: 5, fecha: "2026-11-03", fuente: "google" },
    { autor: "Elena R.", texto: "Vinieron en 40 minutos un sábado.", puntuacion: 5, fecha: "2026-10-18", fuente: "google" },
    { autor: "Carlos M.", texto: "Domótica de las persianas perfecta.", puntuacion: 5, fecha: "2026-10", fuente: "google" },
    { autor: "Nuria F.", texto: "Buen trabajo, tardaron un día más de lo previsto en traer el material, pero avisaron.", puntuacion: 4, fecha: "2026-09-09", fuente: "google" },
    { autor: "Íñigo B.", texto: "Subida de potencia sin dramas y todo legalizado.", puntuacion: 5, fecha: "2026-08-27", fuente: "google" },
  ],
  acreditaciones: [{ nombre: "Empresa instaladora en baja tensión (RII)", corto: "RII", numero: "28/000000 (ficticio)" }],
  garantias: ["Precio cerrado antes de empezar", "Instalación certificada", "Dos años de garantía en mano de obra"],
  empresa: { historia: ["Empezamos en 2009 haciendo reformas eléctricas en Aravaca y hoy somos seis instaladores y una persona en la oficina."], imagenes: [{ src: "/ejemplo/empresa-almacen.jpg", alt: "Almacén con material ordenado", origen: "ia" }], equipo: [{ nombre: "Sergio", cargo: "Instalador" }, { nombre: "Laura", cargo: "Oficina y presupuestos" }] },
  galeria: [{ src: "/ejemplo/galeria-salon-led.jpg", alt: "Salón con iluminación indirecta", origen: "ia", titulo: "Iluminación indirecta" }],
  preguntas: [
    { pregunta: "¿Hacéis visita antes del presupuesto?", respuesta: "Sí, y con fotos por WhatsApp muchas veces ya te damos un precio orientativo." },
    { pregunta: "¿Atendéis urgencias?", respuesta: "Sí, las 24 horas." },
  ],
  marcas: ["Wallbox", "Schneider Electric", "Somfy"],
  seo: { titulo: "Electricistas en Madrid · Tensa Instalaciones", descripcion: "Puntos de recarga, domótica, autoconsumo y averías urgentes en Madrid. Llegamos en 45 min.", url: "https://tensaejemplo.example" },
  redes: { instagram: "https://www.instagram.com/tensa.ejemplo" },
});
