// Datos de ejemplo de «Taller de siempre» (carpinteria-metalica-8). Negocio FICTICIO del área
// de Barcelona (taller en Badalona): nombre, NIF (control inválido), dirección, teléfono, reseñas,
// equipo e historia inventados. Todas las fotos de public/ejemplo/ son de relleno (origen "ia").
// Sin seo.indexar (noindex), sin analítica de Vercel y sin marca (color del template). Sin precios.
import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Serralleria Bosch Ribalta",
    nombreLegal: "Bosch Ribalta Serralleria, S.L.",
    nif: "B65839127", // FICTICIO (dígito de control inválido)
    sector: "Cerrajería metálica y persianas",
    descripcionCorta: "Taller familiar en Badalona desde 1978: persianas, cierres de comercio, puertas de seguridad y ventanas de aluminio.",
    anioFundacion: 1978,
    registroMercantil: "Registro Mercantil de Barcelona, tomo 0000, folio 00, hoja B-000000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000408",
    whatsapp: "+34600000408",
    email: "taller@boschribalta.example",
    direccion: { calle: "Calle Ejemplo 48, bajos", cp: "08911", ciudad: "Badalona", provincia: "Barcelona" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "13:30" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "15:30", cierra: "19:00" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000408",
  },
  zonas: ["Badalona", "Barcelona", "Sant Adrià de Besòs", "Santa Coloma de Gramenet", "Montgat", "Tiana", "El Masnou", "Montcada i Reixac"],
  valoracion: { media: 4.7, total: 112 },
  imagenesHero: [
    { src: "/ejemplo/hero-taller.jpg", alt: "Interior del taller con luz de claraboya sobre el banco de trabajo", origen: "ia" },
    { src: "/ejemplo/hero-obra.jpg", alt: "Persiana de librillo verde restaurada en una fachada", origen: "ia" },
  ],
  servicios: [
    {
      titulo: "Persianas enrollables", slug: "persianas",
      descripcion: "Cambiamos lamas, cintas, ejes y motores, o montamos la persiana entera nueva.",
      contenido: [
        "Si la persiana se ha quedado a medias, sube torcida o la cinta se ha roto, normalmente se arregla en una visita. Traemos lamas, cintas y recogedores en la furgoneta.",
        "Si toca cambiarla, la fabricamos a medida en aluminio o PVC, con lama térmica si quieres ganar aislamiento, y la motorizamos si lo pides.",
      ],
      incluye: ["Visita y medición", "Lamas, cinta, eje o motor según el caso", "Montaje y ajuste", "Retirada de la persiana vieja"],
      imagenes: [{ src: "/ejemplo/servicio-persianas.jpg", alt: "Lamas de persiana enrollable apiladas en el taller", origen: "ia" }],
      preguntas: [{ pregunta: "¿Se puede motorizar una persiana que ya tengo?", respuesta: "Sí, en la mayoría de casos cambiamos el eje por uno con motor sin tocar la caja ni la pared." }],
    },
    {
      titulo: "Persianas de librillo", slug: "persianas-librillo",
      descripcion: "Restauramos o hacemos de nuevo las persianas de librillo de toda la vida, también en fincas protegidas.",
      contenido: [
        "Las persianas de librillo del Eixample y de Gràcia se pueden recuperar casi siempre: desmontamos, cambiamos las lamas rotas, rehacemos herrajes y las pintamos con el color original.",
        "Si están perdidas, las fabricamos nuevas en aluminio con el mismo dibujo, para que la fachada no cambie. Trabajamos con los permisos que pida el ayuntamiento.",
      ],
      incluye: ["Desmontaje y traslado al taller", "Cambio de lamas y herrajes", "Pintura en el color original", "Montaje en el balcón"],
      imagenes: [
        { src: "/ejemplo/servicio-librillo.jpg", alt: "Lamas de librillo sujetas en el tornillo de banco", origen: "ia" },
        { src: "/ejemplo/obra-03-librillo-eixample.jpg", alt: "Persianas de librillo restauradas en un balcón del Eixample", origen: "ia" },
      ],
      preguntas: [{ pregunta: "¿Podéis restaurar persianas en un edificio protegido?", respuesta: "Sí. Mantenemos el dibujo y el color, y te ayudamos con lo que pida el ayuntamiento." }],
    },
    {
      titulo: "Cierres metálicos de comercio", slug: "cierres-metalicos",
      descripcion: "Reparamos y montamos cierres de tienda: lama ciega, microperforada o de malla, manual o con motor.",
      contenido: [
        "Un cierre que no baja es una tienda que no puede cerrar. Si nos avisas por la mañana, intentamos pasar el mismo día a dejarlo funcionando.",
        "Para cierres nuevos medimos el hueco, te enseñamos los tipos de lama y montamos con motor, muelles o los dos.",
      ],
      incluye: ["Revisión de eje, muelles y guías", "Cambio de lamas dañadas", "Motor y mando si lo pides", "Retirada del cierre viejo"],
      imagenes: [{ src: "/ejemplo/servicio-cierres.jpg", alt: "Eje y muelles de un cierre metálico en el taller", origen: "ia" }],
      preguntas: [{ pregunta: "¿Trabajáis para comercios?", respuesta: "Sí, buena parte de nuestro trabajo son cierres de tiendas, bares y talleres del barrio." }],
    },
    {
      titulo: "Ventanas de aluminio", slug: "ventanas-aluminio",
      descripcion: "Ventanas a medida con rotura de puente térmico, correderas o practicables.",
      contenido: [
        "Fabricamos las ventanas en el taller con perfiles de calidad y las montamos sin obra en la mayoría de pisos.",
        "Te explicamos las diferencias entre corredera y practicable y qué cristal conviene según la orientación y el ruido de la calle.",
      ],
      incluye: ["Medición en casa", "Fabricación en el taller", "Montaje y sellado", "Retirada de las ventanas viejas"],
      imagenes: [{ src: "/ejemplo/servicio-aluminio.jpg", alt: "Ventana de aluminio sobre el banco del taller", origen: "ia" }],
      preguntas: [],
    },
    {
      titulo: "Puertas metálicas de seguridad", slug: "puertas-seguridad",
      descripcion: "Puertas de planta baja, portería o trastero, con cerradura de seguridad.",
      contenido: [
        "Hacemos puertas metálicas a medida para plantas bajas, porterías, trasteros y locales, con chapa y cerradura de seguridad.",
        "También reparamos bisagras, cerraduras y marcos de puertas que ya tienes.",
      ],
      incluye: ["Medición", "Fabricación a medida", "Cerradura de seguridad", "Montaje"],
      imagenes: [],
      preguntas: [],
    },
    {
      titulo: "Cerramientos de galería", slug: "cerramientos-galeria",
      descripcion: "Cerramos galerías y terrazas con aluminio y vidrio para usarlas todo el año.",
      contenido: [
        "Una galería cerrada es una habitación más. Diseñamos el cerramiento respetando la fachada y las normas de la comunidad.",
        "Usamos correderas o plegables según el espacio, con vidrio de cámara para que no entre el frío.",
      ],
      incluye: ["Visita y propuesta", "Perfilería y vidrio de cámara", "Montaje en 3–5 días", "Limpieza al terminar"],
      imagenes: [{ src: "/ejemplo/obra-01-galeria-gracia.jpg", alt: "Galería acristalada en un piso de Gràcia", origen: "ia" }],
      preguntas: [{ pregunta: "¿Cuánto tarda una galería?", respuesta: "Entre la medición y el montaje suelen pasar 3–4 semanas. El montaje en casa, de 3 a 5 días." }],
    },
    {
      titulo: "Reparaciones en el día", slug: "reparaciones",
      descripcion: "Persianas atascadas, cierres que no bajan, cerraduras y bisagras: vamos el mismo día si podemos.",
      contenido: [
        "Las reparaciones pequeñas no esperan a la semana que viene. Si nos llamas por la mañana, intentamos pasar ese mismo día.",
        "Si la pieza no está en la furgoneta, la hacemos en el taller y volvemos a montarla.",
      ],
      incluye: ["Visita el mismo día si es posible", "Piezas habituales en la furgoneta", "Presupuesto antes de tocar nada"],
      imagenes: [],
      preguntas: [{ pregunta: "¿Venís hoy por una reparación urgente?", respuesta: "Si nos llamas antes de mediodía, muchas veces sí. Si no, al día siguiente a primera hora." }],
    },
  ],
  trabajos: [
    {
      titulo: "Galería acristalada en Gràcia", slug: "galeria-gracia",
      descripcion: "Cerramiento de una galería de 7 m² con correderas de aluminio y vidrio de cámara, respetando la fachada original.",
      ubicacion: "Gràcia, Barcelona", anio: 2025, superficie: "7 m²", duracion: "5 días", servicio: "cerramientos-galeria",
      contenido: ["La galería daba a un patio de manzana y en invierno no se podía usar. Hicimos correderas de tres hojas con perfil fino para que se viera la carpintería de madera de la fachada.", "La comunidad pidió mantener el color: lacamos los perfiles en el mismo tono crema."],
      imagenes: [{ src: "/ejemplo/obra-01-galeria-gracia.jpg", alt: "Galería acristalada en un piso de Gràcia", origen: "ia" }],
      testimonio: { autor: "Elena y Toni, Gràcia", texto: "La galería era un trastero y ahora es donde desayunamos. Vinieron a ver el piso dos veces antes de darnos el precio." },
    },
    {
      titulo: "Cierre de una panadería en Badalona", slug: "cierre-panaderia-badalona",
      descripcion: "Cambio de un cierre abollado por uno de lama microperforada con motor, montado en un día sin cerrar la panadería.",
      ubicacion: "Badalona", anio: 2026, superficie: "9 m²", duracion: "1 día", servicio: "cierres-metalicos",
      contenido: ["El cierre viejo se había doblado tras un golpe y ya no bajaba entero. Lo cambiamos por uno microperforado con motor, que deja ver el escaparate de noche."],
      imagenes: [{ src: "/ejemplo/obra-02-cierre-badalona.jpg", alt: "Cierre metálico nuevo en una panadería de barrio", origen: "ia" }],
      antes: { src: "/ejemplo/obra-02-antes.jpg", alt: "El cierre viejo abollado, con el mismo encuadre", origen: "ia" },
    },
    {
      titulo: "Persianas de librillo en el Eixample", slug: "librillo-eixample",
      descripcion: "Restauración de las persianas de librillo de cuatro balcones en una finca de 1910.",
      ubicacion: "Eixample, Barcelona", anio: 2024, superficie: "4 balcones", duracion: "4 días", servicio: "persianas-librillo",
      contenido: ["Las llevamos al taller, cambiamos un tercio de las lamas y las pintamos en el verde original de la finca."],
      imagenes: [{ src: "/ejemplo/obra-03-librillo-eixample.jpg", alt: "Persianas de librillo restauradas en un balcón del Eixample", origen: "ia" }],
    },
    {
      titulo: "Persianas de un piso en Sant Adrià", slug: "persianas-sant-adria",
      descripcion: "Seis persianas enrollables nuevas con lama térmica, dos de ellas con motor.",
      ubicacion: "Sant Adrià de Besòs", anio: 2025, superficie: "6 persianas", duracion: "2 días", servicio: "persianas",
      contenido: ["Cambiamos las seis persianas del piso por lama térmica de aluminio y motorizamos las dos del salón."],
      imagenes: [{ src: "/ejemplo/obra-04-persianas-santadria.jpg", alt: "Persianas enrollables nuevas en las ventanas de un piso", origen: "ia" }],
    },
    {
      titulo: "Puerta de seguridad en Montgat", slug: "puerta-montgat",
      descripcion: "Puerta metálica a medida para una planta baja, con cerradura de seguridad.",
      ubicacion: "Montgat", anio: 2024, servicio: "puertas-seguridad",
      contenido: ["Puerta de chapa de una hoja con cerradura de seguridad, pintada en gris para la fachada."],
      imagenes: [{ src: "/ejemplo/obra-05-puerta-montgat.jpg", alt: "Puerta metálica de seguridad de una planta baja", origen: "ia" }],
    },
  ],
  resenas: [
    { autor: "Montse R.", puntuacion: 5, fecha: "2026-10", fuente: "google", texto: "Los conozco desde que estaba el padre. Siguen igual de serios." },
    { autor: "Àlex (panadería del barrio)", puntuacion: 5, fecha: "2026-09-02", fuente: "google", texto: "El cierre se nos quedó atascado un sábado por la noche y el lunes teníamos que abrir a las siete. Llamé a primera hora, Marc vino a las ocho y media, lo dejó bajando para salir del paso y esa misma semana nos montaron el nuevo con motor sin cerrar ni un día. Nos explicaron las opciones sin liarnos y el precio fue el que dijeron. Ya les hemos pasado el teléfono a dos vecinos de la calle." },
    { autor: "Jordi P.", puntuacion: 5, fecha: "2026-07", fuente: "google", texto: "Vinieron el mismo día por una persiana." },
    { autor: "Carme V.", puntuacion: 4, fecha: "2026-05", fuente: "google", texto: "Muy buen trabajo; la galería tardó algo más de lo previsto." },
    { autor: "David L.", puntuacion: 5, fecha: "2026-02-17", fuente: "google", texto: "De confianza." },
    { autor: "Núria S.", puntuacion: 5, fecha: "2025-11", fuente: "google", texto: "Nos restauraron las persianas de librillo del balcón y han quedado como el primer día. Respetaron el color original que pedía la comunidad." },
  ],
  proceso: [
    { titulo: "Nos lo cuentas", texto: "Por WhatsApp, con un par de fotos, o por teléfono." },
    { titulo: "Pasamos a verlo", texto: "Medimos y te decimos qué haríamos." },
    { titulo: "Presupuesto por escrito", texto: "Con el precio, antes de empezar." },
    { titulo: "Taller y montaje", texto: "Lo hacemos aquí y lo montamos en tu casa." },
    { titulo: "Revisión", texto: "Comprobamos contigo que todo funciona." },
  ],
  acreditaciones: [
    { nombre: "Socio del gremio local de cerrajería (ficticio)" }, // ACREDITACIÓN FICTICIA: borrar en la web del cliente
  ],
  garantias: ["Presupuesto por escrito antes de empezar", "Las reparaciones pequeñas, en el día", "Volvemos si algo falla", "Retiramos el material viejo"],
  marcas: ["Cortizo", "Somfy"],
  empresa: {
    historia: [
      "Josep Bosch abrió el taller en 1978 en el mismo bajo donde seguimos hoy. Empezó arreglando persianas de los vecinos y cierres de las tiendas de la calle.",
      "Hoy lo llevan sus hijos, Marc y Laia, con Pere y Quim en el taller y en los montajes. Hacemos casi lo mismo que entonces, con mejores máquinas y el mismo trato.",
      "Si nos llamas, te contesta alguien del taller. Y si algo falla, sabes dónde encontrarnos.",
    ],
    imagenes: [
      { src: "/ejemplo/taller-banco.jpg", alt: "Banco de trabajo con herramientas usadas", origen: "ia" },
      { src: "/ejemplo/taller-espalda.jpg", alt: "Una persona de espaldas trabajando en la plegadora", origen: "ia" },
      { src: "/ejemplo/taller-manos.jpg", alt: "Dos pares de manos sujetando una lama de persiana", origen: "ia" },
    ],
    equipo: [
      { nombre: "Marc", cargo: "Gerente y presupuestos" },
      { nombre: "Laia", cargo: "Oficina y persianas" },
      { nombre: "Pere", cargo: "Taller" },
      { nombre: "Quim", cargo: "Montaje" },
    ],
  },
  galeria: [],
  preguntas: [
    { pregunta: "¿Venís hoy por una reparación urgente?", respuesta: "Si nos llamas antes de mediodía, muchas veces sí. Si no, al día siguiente a primera hora." },
    { pregunta: "¿Trabajáis para comercios?", respuesta: "Sí. Buena parte de nuestro trabajo son cierres metálicos de tiendas, bares y talleres del barrio." },
    { pregunta: "¿Podéis restaurar persianas en un edificio protegido?", respuesta: "Sí. Mantenemos el dibujo y el color original y te ayudamos con lo que pida el ayuntamiento." },
    { pregunta: "¿Cuánto tarda una galería?", respuesta: "Entre la medición y el montaje suelen pasar 3–4 semanas. El montaje en casa, de 3 a 5 días." },
  ],
  redes: {},
  seo: {
    titulo: "Cerrajería metálica en Badalona | Bosch Ribalta",
    descripcion: "Taller familiar desde 1978: persianas, cierres de comercio, puertas de seguridad y ventanas de aluminio en Badalona y Barcelona.",
    url: "https://boschribalta.example",
  },
});
