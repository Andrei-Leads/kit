// Datos de ejemplo de «Forja» (carpinteria-metalica-7). Negocio FICTICIO de L'Horta Sud
// (Valencia): nombre, NIF (control inválido), dirección, teléfono, reseñas y trabajos inventados.
// Todas las fotos de public/ejemplo/ son de relleno (origen "ia"). Sin precios, sin
// seo.indexar (noindex), sin analitica y sin marca (color del template).
import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "L'Enclusa",
    nombreLegal: "Vicent Grau Roig", // FICTICIO: autónomo, sin registroMercantil
    nif: "24381796A", // FICTICIO (letra de control inválida)
    sector: "Herrería y forja",
    descripcionCorta: "Rejas, barandillas, portones y escaleras de hierro a medida, hechos en nuestro taller de Massanassa.",
    anioFundacion: 1991,
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600111404",
    whatsapp: "+34600111404",
    email: "taller@lenclusa.example",
    direccion: { calle: "Calle Ejemplo 22, bajo", cp: "46470", ciudad: "Massanassa", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "07:30", cierra: "13:30" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "15:30", cierra: "18:30" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000404",
  },
  zonas: ["Massanassa", "Valencia", "Catarroja", "Alfafar", "Benetússer", "Sedaví", "Albal", "Silla", "Picassent", "Beniparrell"],
  valoracion: { media: 4.9, total: 58 },
  imagenesHero: [{ src: "/ejemplo/hero-taller.jpg", alt: "Banco de taller con una reja a medio soldar y chispas", origen: "ia" }],
  servicios: [
    {
      titulo: "Rejas de ventana", slug: "rejas-ventana",
      descripcion: "Rejas lisas o con volutas, hechas a la medida de tu ventana y tratadas contra el óxido.",
      contenido: [
        "Venimos, medimos el hueco y te dibujamos la reja antes de cortar el hierro. Puede ser lisa, de pletina, de cuadradillo o con volutas como las de los bajos de antes.",
        "La forjamos en el taller, le damos imprimación antioxidante y la pintamos con pintura de forja. El montaje lo hacemos nosotros, con anclaje químico o soldada a la obra.",
      ],
      incluye: ["Visita y medida del hueco", "Dibujo de la reja antes de empezar", "Imprimación antioxidante y pintura de forja", "Montaje y retirada de la reja vieja"],
      imagenes: [{ src: "/ejemplo/pieza-rejas.jpg", alt: "Detalle de una voluta de forja con remache", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Podéis copiar una reja que ya tengo?", respuesta: "Sí. Mándanos una foto de la reja y la medida del hueco, y la hacemos igual o muy parecida." },
        { pregunta: "¿Hace falta obra para montarla?", respuesta: "Casi nunca. La anclamos a la fachada con taco químico y tapamos los agujeros al acabar." },
      ],
    },
    {
      titulo: "Barandillas de balcón y escalera", slug: "barandillas",
      descripcion: "Barandillas de hierro para balcones, terrazas y escaleras, rectas o con dibujo.",
      contenido: [
        "Hacemos barandillas nuevas y rehacemos las de los balcones de fachada de pueblo, respetando el dibujo de la casa. También pasamanos para escaleras de interior y de comunidad.",
        "Cumplen la altura y la separación entre barrotes que pide la normativa, para que un niño no pueda pasar la cabeza.",
      ],
      incluye: ["Medida en obra", "Altura y separación según normativa", "Pasamanos a juego si lo necesitas", "Pintura de forja del color que elijas"],
      imagenes: [{ src: "/ejemplo/pieza-barandillas.jpg", alt: "Pasamanos de forja de una barandilla", origen: "ia" }],
      preguntas: [{ pregunta: "¿Trabajáis para comunidades?", respuesta: "Sí. Os damos el presupuesto por escrito para la junta y la factura a nombre de la comunidad." }],
    },
    {
      titulo: "Portones y puertas de patio", slug: "portones",
      descripcion: "Portones batientes o correderos y puertas de patio, con su cerradura y sus guías.",
      contenido: [
        "Portones de patio, de garaje y de nave, batientes o correderos, con chapa ciega, con barrotes o con una mezcla de los dos.",
        "Si quieres motorizarlo, dejamos la guía y los anclajes preparados para el motor.",
      ],
      incluye: ["Medida y dibujo", "Guías, ruedas y bisagras", "Cerradura y cerrojo", "Preparado para motor si lo pides"],
      imagenes: [{ src: "/ejemplo/pieza-portones.jpg", alt: "Bisagra y cerrojo de un portón de hierro", origen: "ia" }],
      preguntas: [{ pregunta: "¿Cuánto tarda un portón?", respuesta: "Entre dos y tres semanas desde que apruebas el dibujo, según el tamaño." }],
    },
    {
      titulo: "Cancelas de jardín", slug: "cancelas",
      descripcion: "Cancelas pequeñas para jardín, chalet o huerto, a juego con la valla.",
      contenido: [
        "Cancelas de una o dos hojas, con cerradura o con pestillo, a juego con la valla que ya tienes.",
        "Las galvanizamos o les damos imprimación según dónde vayan, para que aguanten la humedad del jardín.",
      ],
      incluye: ["Medida en obra", "Pestillo o cerradura", "Tratamiento para exterior", "Postes nuevos si hacen falta"],
      imagenes: [],
      preguntas: [{ pregunta: "¿Podéis hacerla a juego con mi valla?", respuesta: "Sí. Con una foto de la valla vemos el perfil y el dibujo, y la cancela sale igual." }],
    },
    {
      titulo: "Escaleras metálicas", slug: "escaleras",
      descripcion: "Escaleras de caracol, de patio o de altillo, con peldaño de chapa o de madera.",
      contenido: [
        "Escaleras de caracol para patios y terrazas, escaleras rectas para altillos y escaleras de servicio para naves.",
        "Las fabricamos por piezas en el taller y las montamos en tu casa, para no tener que meter una escalera entera por la puerta.",
      ],
      incluye: ["Medida y cálculo de peldaños", "Peldaño de chapa lagrimada o preparado para madera", "Barandilla a juego", "Montaje por piezas"],
      imagenes: [{ src: "/ejemplo/pieza-escaleras.jpg", alt: "Peldaño de chapa lagrimada de una escalera", origen: "ia" }],
      preguntas: [{ pregunta: "¿Cabe una escalera de caracol en mi patio?", respuesta: "Con un hueco de unos 140 cm de diámetro ya cabe una cómoda. Lo vemos en la visita." }],
    },
    {
      titulo: "Estructuras de hierro", slug: "estructuras",
      descripcion: "Altillos, marquesinas, soportes y pequeñas estructuras para obra y reforma.",
      contenido: [
        "Hacemos altillos, marquesinas, pérgolas de hierro, soportes para aparatos de aire y pequeñas estructuras para reformistas.",
        "Si la obra necesita cálculo, trabajamos con el técnico de la obra y seguimos sus planos.",
      ],
      incluye: ["Medida y despiece", "Trabajo con los planos del técnico", "Imprimación antioxidante", "Montaje en obra"],
      imagenes: [],
      preguntas: [{ pregunta: "¿Trabajáis para otros oficios?", respuesta: "Sí. Muchos encargos nos llegan de reformistas y albañiles de la zona." }],
    },
    {
      titulo: "Reparación y soldadura a domicilio", slug: "reparacion-soldadura",
      descripcion: "Soldamos en tu casa barandillas, rejas y portones rotos, sin desmontar si no hace falta.",
      contenido: [
        "Venimos con el equipo de soldar y arreglamos en el sitio barandillas sueltas, rejas dobladas, bisagras rotas y portones que rozan.",
        "Cuando el óxido ya se ha comido el hierro, cambiamos el tramo dañado y lo pintamos para que no se note el arreglo.",
      ],
      incluye: ["Desplazamiento con equipo de soldar", "Cambio de tramos oxidados", "Imprimación y pintura del arreglo", "Presupuesto antes de empezar"],
      imagenes: [{ src: "/ejemplo/pieza-soldadura.jpg", alt: "Cordón de soldadura reciente sobre hierro", origen: "ia" }],
      preguntas: [{ pregunta: "¿Cuánto tarda un arreglo?", respuesta: "La mayoría, una mañana. Si hay que cambiar un tramo, lo forjamos en el taller y volvemos a montarlo." }],
    },
  ],
  trabajos: [
    {
      titulo: "Reja con volutas para un bajo", slug: "reja-con-volutas-para-un-bajo",
      descripcion: "Reja de forja negra con volutas para la ventana de un bajo de Catarroja, copiada de la reja original de la casa.",
      ubicacion: "Catarroja", anio: 2025, servicio: "rejas-ventana", superficie: "2 m²", duracion: "4 días",
      contenido: [
        "La dueña quería recuperar la reja de su abuela, que se perdió en una reforma. Con una foto antigua dibujamos las volutas y las forjamos a mano en el taller.",
        "Lleva imprimación antioxidante, dos manos de pintura de forja negra y anclaje químico a la fachada.",
      ],
      imagenes: [{ src: "/ejemplo/obra-01-reja-catarroja.jpg", alt: "Reja negra de forja con volutas en la ventana de un bajo", origen: "ia" }],
      testimonio: { autor: "Amparo, Catarroja", texto: "Es igual que la que tenía mi abuela. Me la dibujaron antes de empezar y no cambiaron ni el precio ni la fecha." },
    },
    {
      titulo: "Rejas lisas de una planta baja", slug: "rejas-lisas-de-una-planta-baja",
      descripcion: "Cinco rejas de pletina y redondo para las ventanas de una planta baja en Albal, todas con el mismo dibujo.",
      ubicacion: "Albal", anio: 2026, servicio: "rejas-ventana", superficie: "5 rejas", duracion: "1 semana",
      contenido: ["Cinco ventanas de distinta medida con el mismo dibujo, para que la fachada se vea ordenada. Las montamos todas en una mañana."],
      imagenes: [{ src: "/ejemplo/obra-02-reja-albal.jpg", alt: "Reja lisa de pletina en una ventana de planta baja", origen: "ia" }],
    },
    {
      titulo: "Barandilla de balcón en Alfafar", slug: "barandilla-de-balcon-en-alfafar",
      descripcion: "Barandilla nueva para un balcón de fachada de pueblo, con el mismo dibujo que las de la calle.",
      ubicacion: "Alfafar", anio: 2025, servicio: "barandillas", superficie: "4 m lineales", duracion: "3 días",
      contenido: ["Había que mantener el estilo de la calle. Hicimos la barandilla con barrotes de cuadradillo y un pasamanos de pletina, como las de las casas vecinas."],
      imagenes: [{ src: "/ejemplo/obra-03-barandilla-alfafar.jpg", alt: "Barandilla de hierro en un balcón de fachada de pueblo", origen: "ia" }],
    },
    {
      titulo: "Portón corredero de patio", slug: "porton-corredero-de-patio",
      descripcion: "Portón corredero de chapa y barrotes para el patio de una casa en Silla, preparado para motor.",
      ubicacion: "Silla", anio: 2024, servicio: "portones", superficie: "9 m²", duracion: "2 semanas",
      contenido: [
        "El patio daba a una calle estrecha y no había sitio para un portón batiente. Montamos una guía al suelo y dejamos el anclaje del motor listo para el electricista.",
        "Chapa ciega abajo, barrotes arriba y pintura de forja gris oscuro.",
      ],
      imagenes: [{ src: "/ejemplo/obra-04-porton-silla.jpg", alt: "Portón corredero de chapa y barrotes en un patio", origen: "ia" }],
    },
    {
      titulo: "Escalera de caracol en Russafa", slug: "escalera-de-caracol-en-russafa",
      descripcion: "Escalera de caracol de 3 metros para subir del patio interior a la terraza, montada por piezas.",
      ubicacion: "Russafa, Valencia", anio: 2024, servicio: "escaleras", superficie: "3 m de altura", duracion: "10 días",
      contenido: ["El único acceso al patio era un pasillo de 80 cm, así que la fabricamos por piezas y la montamos allí, peldaño a peldaño."],
      imagenes: [{ src: "/ejemplo/obra-05-escalera-russafa.jpg", alt: "Escalera de caracol de hierro en un patio interior", origen: "ia" }],
    },
    {
      titulo: "Barandilla reparada en Benetússer", slug: "barandilla-reparada-en-benetusser",
      descripcion: "Barandilla de escalera de comunidad con la base comida por el óxido: cortamos el tramo dañado, soldamos uno nuevo y la pintamos.",
      ubicacion: "Benetússer", anio: 2026, duracion: "1 día",
      contenido: ["Los barrotes de abajo estaban sueltos y el pasamanos se movía. Lo arreglamos en un día, sin desmontar la barandilla entera."],
      imagenes: [{ src: "/ejemplo/obra-06-reparacion-benetusser.jpg", alt: "Barandilla de escalera soldada y pintada de negro", origen: "ia" }],
      antes: { src: "/ejemplo/obra-06-antes.jpg", alt: "La misma barandilla antes del arreglo, rota y oxidada", origen: "ia" },
    },
  ],
  resenas: [
    { autor: "Paco T.", puntuacion: 5, fecha: "2026-10", fuente: "google", texto: "Me hizo la reja como la de mi abuela." },
    { autor: "Neus B.", puntuacion: 5, fecha: "2026-08-21", fuente: "google", texto: "Necesitábamos un portón corredero para el patio y nos habían dado dos presupuestos sin venir ni a medir. Vicent vino el mismo jueves, nos dibujó el portón en una hoja con las medidas y nos explicó por qué la guía tenía que ir al suelo. Tardaron lo que dijeron, lo montaron en una mañana y dejaron el patio barrido. Cuando el electricista puso el motor, todo encajó a la primera. Trato directo con el herrero, sin intermediarios. Repetiremos con la reja de la cocina." },
    { autor: "Ximo (comunidad de la calle Major)", puntuacion: 5, fecha: "2026-06", fuente: "google", texto: "Arreglaron la barandilla en una mañana." },
    { autor: "Sergio A.", puntuacion: 4, fecha: "2026-04", fuente: "google", texto: "Buen trabajo; cuesta que coja el teléfono por la tarde." },
    { autor: "Maite C.", puntuacion: 5, fecha: "2026-01-15", fuente: "google", texto: "Recomendable." },
  ],
  proceso: [
    { titulo: "Nos mandas la foto", texto: "Por WhatsApp, con el sitio donde va la pieza y una medida aproximada." },
    { titulo: "Medimos y dibujamos la pieza", texto: "Vamos a medir y te enseñamos el dibujo antes de cortar el hierro." },
    { titulo: "Forja en el taller", texto: "Cortamos, soldamos y tratamos el hierro en Massanassa." },
    { titulo: "Montaje y pintura", texto: "La montamos, la pintamos y recogemos al acabar." },
  ],
  garantias: ["Imprimación antioxidante en todas las piezas", "Diseño a medida antes de cortar", "Montaje incluido"],
  empresa: {
    historia: [
      "Vicent Grau abrió el taller en un bajo de Massanassa en 1991, después de diez años de aprendiz en una herrería de Catarroja. Empezó con rejas para las casas del pueblo y hoy hace barandillas, portones y escaleras para toda L'Horta Sud.",
      "Seguimos siendo dos: Vicent dibuja y forja en el taller, y Andreu monta y pinta en obra. Cuando llamas, te coge el teléfono uno de los dos.",
    ],
    imagenes: [
      { src: "/ejemplo/taller-yunque.jpg", alt: "Yunque y martillos en el taller", origen: "ia" },
      { src: "/ejemplo/taller-hierro.jpg", alt: "Barras de hierro en el estante del taller con luz lateral", origen: "ia" },
    ],
    equipo: [{ nombre: "Vicent", cargo: "Herrero" }, { nombre: "Andreu", cargo: "Montaje" }],
  },
  preguntas: [
    { pregunta: "¿Hacéis el diseño?", respuesta: "Sí. Antes de cortar el hierro te enseñamos un dibujo con las medidas. Si traes la foto de una reja que te gusta, partimos de ella." },
    { pregunta: "¿Cuánto tarda una reja?", respuesta: "Una reja de ventana, entre una y dos semanas desde que apruebas el dibujo. El montaje suele ser cosa de una mañana." },
    { pregunta: "¿Venís a soldar a casa?", respuesta: "Sí. Para arreglos y trabajos pequeños venimos con el equipo de soldar a toda L'Horta Sud y Valencia." },
    { pregunta: "¿Cómo evitáis el óxido?", respuesta: "Limpiamos el hierro, le damos imprimación antioxidante y dos manos de pintura de forja. Cerca del mar, recomendamos galvanizar." },
  ],
  redes: { instagram: "https://www.instagram.com/lenclusa.ejemplo" },
  seo: {
    titulo: "Herrería y forja en Massanassa | L'Enclusa",
    descripcion: "Rejas, barandillas, portones y escaleras de hierro a medida para L'Horta Sud. Taller propio en Massanassa desde 1991.",
    url: "https://carpinteria-metalica-7.example",
  },
});
