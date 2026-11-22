// Datos FICTICIOS de ejemplo (encargo reformas-5 «Tu casa», §11, y entrega de Claude Design),
// con el patrón ficticio evidente del kit: «Calle Ejemplo», dominios .example, cid=000…, NIF con
// letra de control inválida y teléfono 600 00 0x xx. Todas las fotos de ejemplo son relleno con
// origen "ia" (public/ejemplo/CREDITOS.md). Sin seo.indexar ni analitica.
import { defineSiteConfig } from "@andrei-leads/core";

const ia = (src: string, alt: string) => ({ src: `/ejemplo/${src}`, alt, origen: "ia" as const });

export default defineSiteConfig({
  negocio: {
    nombre: "Casa Bellver Reformas",
    nombreLegal: "Marta Bellver Climent",
    nif: "20456789A", // letra de control inválida a propósito
    sector: "Reformas de vivienda",
    descripcionCorta: "Reformamos baños, cocinas y casas enteras en Valencia pensando en cómo vas a vivir en ellas.",
    anioFundacion: 2014,
    tipoSchema: ["GeneralContractor"],
  },
  contacto: {
    telefono: "+34600000515",
    whatsapp: "+34600000515",
    email: "hola@casabellver.example",
    direccion: { calle: "Calle Ejemplo, 21", cp: "46018", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "09:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "16:30", cierra: "19:30" },
      { dias: ["viernes"], abre: "09:00", cierra: "14:00" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000515", // ficticio
  },
  zonas: ["Valencia", "Torrent", "Manises", "Aldaia", "Alaquàs", "Picanya", "Paiporta", "Burjassot"],
  servicios: [
    {
      titulo: "Reforma de baño",
      slug: "reforma-de-bano",
      descripcion: "Cambiamos bañera por ducha, alicatado, sanitarios y luz. Un baño que se limpia fácil.",
      contenido: [
        "Miramos cómo usas el baño cada mañana y lo dibujamos para que quepa todo sin estorbar: ducha a ras de suelo, mueble con cajones y buena luz en el espejo.",
        "Un baño completo suele estar listo en dos o tres semanas. La fecha va en el contrato y la casa queda barrida cada tarde.",
      ],
      incluye: ["Retirada de sanitarios y alicatado antiguo", "Fontanería y desagües nuevos", "Plato de ducha a ras de suelo y mampara", "Alicatado o cal en paredes", "Mueble, lavabo y grifería", "Limpieza final"],
      imagenes: [ia("estancia-bano.jpg", "Baño con lavabo de cerámica, grifería de latón y luz de tarde")],
      preguntas: [
        { pregunta: "¿Cuánto tarda?", respuesta: "Entre dos y tres semanas, según el baño. La fecha va en el contrato." },
        { pregunta: "¿Puedo usar otro baño mientras?", respuesta: "Sí. Si solo tienes uno, te dejamos el inodoro en uso todo lo que se pueda." },
      ],
      precioDesde: "desde 5.900 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Reforma de cocina",
      slug: "reforma-de-cocina",
      descripcion: "Distribución, muebles, encimera y luz, pensada para cocinar y para estar.",
      contenido: [
        "Empezamos por cómo cocináis: quién cocina, cuántos sois y dónde os gusta comer. Con eso dibujamos la distribución y elegimos juntos muebles, encimera y luz.",
        "Si la cocina está cerrada, miramos si se puede abrir al salón. Coordinamos fontanería, electricidad y alicatado para que la obra dure lo que dice el contrato, normalmente tres o cuatro semanas.",
      ],
      incluye: ["Diseño de la distribución y plano", "Retirada de la cocina antigua y del escombro", "Fontanería y electricidad nuevas", "Muebles, encimera y fregadero", "Alicatado o pintura y luz bajo mueble", "Limpieza final"],
      imagenes: [
        ia("estancia-cocina.jpg", "Cocina con encimera de microcemento y franjas de sol de tarde"),
        ia("casa-manises.jpg", "Cocina abierta en Manises con muebles de roble"),
        ia("detalle-azulejo.jpg", "Detalle de azulejo hidráulico con sol rasante"),
      ],
      preguntas: [
        { pregunta: "¿Puedo seguir viviendo en casa durante la obra?", respuesta: "Sí. Os dejamos un punto de agua y la casa barrida cada tarde. Lo que no tendréis unas semanas es cocina." },
        { pregunta: "¿Se puede abrir la cocina al salón?", respuesta: "Casi siempre. Antes de presupuestar comprobamos si el tabique es de carga." },
        { pregunta: "¿Quién elige los materiales?", respuesta: "Tú, con nuestra ayuda. Te traemos muestras y te acompañamos a la exposición si quieres." },
      ],
      precioDesde: "desde 7.500 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Reforma integral",
      slug: "reforma-integral",
      descripcion: "La casa entera de una vez: redistribución, instalaciones nuevas y acabados cálidos.",
      contenido: [
        "Una reforma integral empieza por un plano: dónde entra la luz, qué tabiques sobran y cómo os movéis por la casa. Lo dibujamos con vosotros antes de presupuestar.",
        "Renovamos instalaciones, suelos, baños y cocina con un solo responsable de obra y una fecha de entrega en el contrato.",
      ],
      incluye: ["Plano y redistribución", "Licencia o declaración responsable", "Electricidad y fontanería nuevas", "Suelos, carpintería interior y pintura", "Baño y cocina", "Limpieza final"],
      imagenes: [ia("estancia-integral.jpg", "Salón con suelo de terrazo y sofá de lino con luz de tarde")],
      preguntas: [
        { pregunta: "¿Hay que salir de casa?", respuesta: "Normalmente sí, unas semanas. Lo planificamos para que sea el menor tiempo posible." },
      ],
      precioDesde: "desde 18.000 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Ducha de obra",
      slug: "ducha-de-obra",
      descripcion: "Plato a ras de suelo, azulejo artesanal y mampara. Sin escalón.",
      contenido: [], incluye: [], preguntas: [],
      imagenes: [ia("estancia-ducha.jpg", "Ducha de obra con azulejo artesanal verde y grifería de latón")],
      precioDesde: "desde 2.400 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Suelo hidráulico",
      slug: "suelo-hidraulico",
      descripcion: "Colocamos hidráulico nuevo o recuperamos el original: limpieza, reposición y pulido.",
      contenido: [], incluye: [], preguntas: [],
      imagenes: [ia("estancia-hidraulico.jpg", "Suelo hidráulico valenciano con una franja de sol de tarde")],
      precioDesde: "desde 55 €/m²", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Paredes de cal y pintura",
      slug: "paredes-de-cal-y-pintura",
      descripcion: "Cal, estuco y pintura mineral que dejan respirar la pared y dan una luz suave.",
      contenido: [], incluye: [], preguntas: [],
      imagenes: [], // sin foto a propósito: arco tintado con tesela
      precioDesde: "desde 12 €/m²", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Terraza y balcón",
      slug: "terraza-y-balcon",
      descripcion: "Suelo exterior, impermeabilización, barandilla y sitio para las plantas.",
      contenido: [], incluye: [], preguntas: [],
      imagenes: [ia("estancia-terraza.jpg", "Balcón con barandilla de hierro, suelo de barro y plantas")],
      // sin precioDesde, para ver la tarjeta sin píldora
    },
  ],
  trabajos: [
    {
      titulo: "Una casa abierta en Patraix",
      descripcion: "Tiramos el tabique de la cocina, recuperamos la luz del balcón y pusimos terrazo nuevo en toda la casa.",
      ubicacion: "Patraix", anio: 2026, servicio: "reforma-integral", superficie: "70 m²", duracion: "9 semanas",
      precio: "entre 24.000 y 28.000 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "El piso tenía la cocina cerrada y un pasillo largo que se comía la luz. Abrimos la cocina al salón con una barra de roble y movimos el baño unos centímetros para ganar un armario.",
        "Irene y Pablo querían materiales que aguantaran a dos niños: terrazo de grano medio, cal en las paredes y una encimera de microcemento. Entregamos la casa en la semana nueve, como decía el contrato.",
      ],
      imagenes: [
        ia("casa-patraix.jpg", "Salón y cocina abiertos en Patraix con terrazo y luz de tarde"),
        ia("casa-patraix-cocina.jpg", "Barra de roble entre cocina y salón con una taza a medio beber"),
        ia("casa-patraix-balcon.jpg", "Puerta de balcón con contraventana de madera y un poto"),
      ],
      antes: ia("casa-patraix-antes.jpg", "El mismo salón antes: tabique de cocina y terrazo gastado"),
      testimonio: { autor: "Irene y Pablo", texto: "Entramos con dos niños pequeños y la casa estaba recogida cada tarde. Ahora la cocina y el salón son un solo sitio y vivimos ahí." },
    },
    {
      titulo: "Baño con luz en Torrent",
      descripcion: "Cambiamos la bañera por una ducha de obra con azulejo artesanal y una ventana que ahora sí se ve.",
      ubicacion: "Torrent", anio: 2025, servicio: "ducha-de-obra", superficie: "5 m²", duracion: "2 semanas",
      contenido: ["La bañera ocupaba todo el ancho y tapaba la ventana. La sustituimos por una ducha a ras de suelo.", "Elegimos un azulejo verde hecho a mano y grifería de latón cepillado."],
      imagenes: [ia("casa-torrent.jpg", "Baño en Torrent con ducha de obra y azulejo artesanal")],
      antes: ia("casa-torrent-antes.jpg", "El mismo baño antes, con bañera y azulejo blanco antiguo"),
    },
    {
      titulo: "La cocina de Manises",
      descripcion: "Una cocina cerrada que ahora mira al comedor, con cerámica de Manises en el frente.",
      ubicacion: "Manises", anio: 2025, servicio: "reforma-de-cocina", superficie: "10 m²", duracion: "3 semanas",
      contenido: ["Abrimos un hueco al comedor y llevamos el fregadero bajo la ventana.", "El frente es cerámica de Manises, de un taller a dos calles de la casa."],
      imagenes: [ia("casa-manises.jpg", "Cocina abierta en Manises con muebles de roble y cerámica")],
      antes: ia("casa-manises-antes.jpg", "La misma cocina antes, cerrada y con muebles de formica"),
    },
    {
      titulo: "Hidráulico recuperado en el Carmen",
      descripcion: "Levantamos, limpiamos y volvimos a colocar el hidráulico original del dormitorio.",
      ubicacion: "El Carmen", anio: 2024, servicio: "suelo-hidraulico", superficie: "14 m²",
      contenido: ["Recuperamos el 85 % de las piezas originales y repusimos el resto con piezas de un taller de Alaquàs.", "Pulido y tratamiento final con cera."],
      imagenes: [ia("casa-carmen.jpg", "Dormitorio con suelo hidráulico restaurado y unas zapatillas junto a la cama")],
    },
    {
      titulo: "Terraza en Benicalap",
      descripcion: "Impermeabilizamos la terraza y pusimos barro cocido y una jardinera de obra.",
      ubicacion: "Benicalap", anio: 2026, servicio: "terraza-y-balcon", duracion: "6 días",
      contenido: ["La terraza filtraba al piso de abajo. Impermeabilizamos con lámina y pusimos baldosa de barro.", "Añadimos una jardinera de obra para un olivo en maceta."],
      imagenes: [ia("casa-benicalap.jpg", "Terraza en Benicalap con suelo de barro, olivo y luz de tarde")],
    },
  ],
  valoracion: { media: 4.9, total: 88 },
  resenas: [
    { autor: "Irene C.", puntuacion: 5, fecha: "2026-10-05", fuente: "google", texto: "Ahora la casa tiene luz. No sabíamos que podía ser así." },
    { autor: "Pablo S.", puntuacion: 5, fecha: "2026-08", fuente: "google", texto: "Teníamos miedo de la obra con dos niños en casa y fue todo lo contrario. Cada tarde dejaban el piso barrido y los pasillos libres. Nos avisaban el día antes de lo que iban a hacer y Marta contestaba los mensajes siempre. Terminaron en la fecha del contrato. Lo que más valoramos es que nos ayudaron a decidir sin empujarnos a lo caro." },
    { autor: "Amparo V.", puntuacion: 5, fecha: "2026-06", fuente: "google", texto: "Marta nos ayudó a elegir el azulejo y acertó de lleno." },
    { autor: "Toni R.", puntuacion: 4, fecha: "2026-03", fuente: "google", texto: "Algo más caro de lo previsto por un cambio que pedimos, pero bien avisado." },
    { autor: "Neus M.", puntuacion: 5, fecha: "2025-12", fuente: "google", texto: "Un gusto de principio a fin." },
    { autor: "Hugo F.", puntuacion: 5, fecha: "2025-10", fuente: "google", texto: "Recuperaron el suelo de mi abuela. Precioso." },
  ],
  proceso: [], // vacío: salen los pasos por defecto del tipo proyecto
  acreditaciones: [],
  garantias: ["Cualquier cambio de precio, por escrito antes de hacerlo", "Fecha de entrega en el contrato", "Casa barrida y recogida cada tarde", "2 años de garantía"],
  marcas: ["Equipe Cerámicas", "Tres Grifería", "Teka"],
  empresa: {
    historia: [
      "Marta Bellver empezó en 2014 reformando pisos antiguos de Patraix y del Carmen, con una cuadrilla pequeña y una idea: una casa se reforma para vivirla, no para enseñarla.",
      "Hoy somos cuatro. Proponemos materiales que envejecen bien, como el hidráulico, la cal o la cerámica de Manises, y cuidamos lo que no sale en las fotos: el orden, los plazos y la limpieza.",
    ],
    imagenes: [ia("detalle-azulejo.jpg", "Detalle de azulejo hidráulico con sol rasante de tarde")],
    equipo: [
      { nombre: "Marta Bellver", cargo: "Fundadora y jefa de obra" },
      { nombre: "Joan Ferrer", cargo: "Oficial de albañilería" },
      { nombre: "Rosa Llopis", cargo: "Fontanería y alicatado" },
    ],
  },
  imagenesHero: [ia("hero-poster.jpg", "Cocina abierta con suelo hidráulico y luz de tarde")],
  // Vídeo del hero (tipo proyecto). Aún no hay archivos: descomentar cuando existan
  // /ejemplo/hero.mp4 (H.264, ≤ 1,5 MB) y /ejemplo/hero-av1.mp4 (encargo §10).
  // videoHero: {
  //   src: "/ejemplo/hero.mp4",
  //   srcAv1: "/ejemplo/hero-av1.mp4",
  //   poster: { src: "/ejemplo/hero-poster.jpg", alt: "Cocina abierta con suelo hidráulico y luz de tarde", origen: "ia" },
  // },
  galeria: [],
  preguntas: [
    { pregunta: "¿Cuánto tarda una reforma de baño?", respuesta: "Entre dos y tres semanas, según el baño. La fecha va en el contrato." },
    { pregunta: "¿El presupuesto puede cambiar?", respuesta: "Solo si nos pides un cambio, y siempre te lo damos por escrito antes de hacerlo." },
    { pregunta: "¿Os encargáis de los permisos?", respuesta: "Sí. Tramitamos la declaración responsable o la licencia de obra con el ayuntamiento." },
    { pregunta: "¿Puedo vivir en casa durante la obra?", respuesta: "En baños y cocinas, sí. En una reforma integral lo hablamos según la casa y los plazos." },
  ],
  redes: { instagram: "https://www.instagram.com/casabellver.ejemplo", facebook: "https://www.facebook.com/casabellver.ejemplo" },
  seo: {
    titulo: "Reformas de vivienda en Valencia | Casa Bellver",
    descripcion: "Baños, cocinas y casas enteras en Valencia, con precios de partida por estancia y acabados cálidos: hidráulico, madera y cerámica.",
    url: "https://casa-bellver-ejemplo.example",
  },
});


// Variante «datos mínimos»: sin videoHero, imagenesHero, trabajos, galeria, imagenes,
// precioDesde, contenido, garantias, marcas, preguntas, empresa ni anioFundacion.
// 4 servicios (baño, cocina, integral, ducha) con título y descripción + reseñas, valoración y zonas.
