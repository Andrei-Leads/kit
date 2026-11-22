// Datos FICTICIOS de ejemplo (encargo reformas-1 «Antes y después», §11, y Datos de la entrega de
// Claude Design), con el patrón ficticio evidente del kit: «Calle Ejemplo», dominios .example,
// cid=000…, NIF con letra de control inválida y acreditación «(ficticio)». Todas las fotos de
// ejemplo son relleno con origen "ia" (public/ejemplo/CREDITOS.md). Sin seo.indexar ni analitica.
import { defineSiteConfig } from "@andrei-leads/core";

const ia = (src: string, alt: string) => ({ src: `/ejemplo/${src}`, alt, origen: "ia" as const });

export default defineSiteConfig({
  negocio: {
    nombre: "Reformes Albardí",
    nombreLegal: "Albardí Interiors i Reformes, S.L.",
    nif: "B4618273X", // control inválido a propósito
    sector: "Reformas de baño y cocina",
    descripcionCorta:
      "Reformamos baños, cocinas y pisos enteros en Valencia, con precio cerrado y fecha de fin por contrato.",
    anioFundacion: 2009,
    registroMercantil: "Registro Mercantil de Valencia, tomo 00.000, folio 000, hoja V-000000 (ficticio)",
    tipoSchema: ["GeneralContractor"],
  },
  contacto: {
    telefono: "+34600000110",
    whatsapp: "+34600000110",
    email: "hola@reformesalbardi.example",
    direccion: { calle: "Calle Ejemplo, 41", cp: "46006", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "19:00" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000110", // ficticio
  },
  zonas: ["Valencia", "Mislata", "Alboraia", "Tavernes Blanques", "Paterna", "Xirivella", "Quart de Poblet", "Catarroja"],
  servicios: [
    {
      titulo: "Reforma de baño",
      slug: "reforma-de-bano",
      descripcion: "Baño nuevo de principio a fin, con plato de ducha, mampara y alicatado.",
      contenido: [
        "Un baño de piso suele tener entre 3 y 6 m². Con tan poco espacio, cada centímetro cuenta: la ducha, el mueble y la ventana tienen que estar bien pensados antes de picar.",
        "Empezamos con una visita: medimos, miramos las tuberías y te enseñamos obras parecidas. Después te damos un precio cerrado y una fecha de fin por escrito.",
        "Durante la obra hay una sola persona de contacto. Al final de cada jornada dejamos el baño recogido y la escalera limpia.",
      ],
      incluye: [
        "Derribo y retirada de escombros",
        "Fontanería y electricidad nuevas",
        "Alicatado y solado",
        "Plato de ducha, mampara y sanitarios",
        "Limpieza final y garantía de 2 años",
      ],
      imagenes: [ia("servicio-bano.jpg", "Grifería de ducha cromada sobre azulejo claro de junta fina")],
      preguntas: [
        {
          pregunta: "¿Cuánto tarda reformar un baño?",
          respuesta:
            "Entre una y dos semanas, según el tamaño y los materiales. La fecha exacta de fin va escrita en el contrato antes de empezar.",
        },
        {
          pregunta: "¿Hay que quitar la bañera por completo?",
          respuesta:
            "No siempre. Si solo quieres cambiarla por un plato de ducha, lo hacemos en pocos días sin tocar el resto. Lo vemos en la visita.",
        },
      ],
    },
    {
      titulo: "Reforma de cocina",
      slug: "reforma-de-cocina",
      descripcion: "Cocina a medida, abierta o cerrada, con encimera, frentes y electrodomésticos.",
      contenido: [
        "Una cocina se usa cada día, así que se diseña desde lo que cocinas tú: dónde pones la placa, cuánto fondo necesitas, si quieres abrirla al salón.",
        "Preparamos la instalación, montamos los muebles y la encimera y dejamos todo conectado y probado antes de irnos.",
      ],
      imagenes: [ia("servicio-cocina.jpg", "Encimera de cuarzo claro y frentes de cocina en blanco roto")],
    },
    {
      titulo: "Reforma integral",
      slug: "reforma-integral",
      descripcion: "Tu piso entero con un solo interlocutor, un precio cerrado y una fecha de fin.",
      contenido: [
        "Reformar un piso entero asusta por el polvo, los plazos y los gremios. Por eso trabajas con una sola persona que coordina fontanería, electricidad, albañilería y acabados.",
        "Antes de empezar firmamos el plan de obra con fechas por fases, para que sepas qué se hace cada semana.",
      ],
      imagenes: [ia("servicio-integral.jpg", "Salón diáfano terminado visto desde el pasillo")],
    },
    {
      titulo: "Cambio de bañera por plato de ducha",
      slug: "cambio-banera-por-plato-de-ducha",
      descripcion: "Quitamos la bañera y dejamos un plato extraplano en pocos días.",
      imagenes: [ia("servicio-ducha.jpg", "Plato de ducha extraplano con desagüe lineal")],
    },
    {
      titulo: "Suelos y alicatados",
      slug: "suelos-y-alicatados",
      descripcion: "Gres, microcemento y terrazo, con juntas finas y bien niveladas.",
      imagenes: [ia("servicio-suelos.jpg", "Suelo de gres claro recién colocado con junta fina")],
    },
    {
      titulo: "Pintura y alisado",
      slug: "pintura-y-alisado",
      descripcion: "Paredes lisas, sin gotelé, listas para pintar.",
      contenido: [
        "Quitamos el gotelé, alisamos las paredes y las dejamos listas para pintar, con las mismas protecciones en suelos y muebles que en una obra grande.",
      ],
    },
    {
      titulo: "Carpintería interior",
      slug: "carpinteria-interior",
      descripcion: "Puertas, rodapiés y armarios empotrados a medida.",
    },
  ],
  trabajos: [
    {
      titulo: "Baño con ventana en Benimaclet",
      slug: "bano-con-ventana-en-benimaclet",
      descripcion:
        "Un baño de 1985 con bañera y azulejo beis. Ahora tiene plato de ducha extraplano, microcemento claro y la ventana como protagonista.",
      ubicacion: "Benimaclet",
      anio: 2026,
      servicio: "reforma-de-bano",
      superficie: "5 m²",
      duracion: "12 días",
      precio: "entre 7.000 y 8.500 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Este baño de 1985 tenía bañera, azulejo beis con cenefa y una ventana que casi no se veía. Lucía y su pareja querían más luz y una ducha cómoda sin ampliar la superficie.",
        "Derribamos el alicatado, renovamos fontanería y electricidad y pusimos un plato extraplano con mampara. Las paredes van en microcemento claro y el suelo en gres de junta fina. Acabamos en 12 días, como decía el contrato.",
      ],
      imagenes: [
        ia("hero-despues.jpg", "Baño reformado de 5 m² con plato de ducha extraplano, mampara y ventana a la izquierda"),
        ia("obra-material.jpg", "Muestras de azulejo sobre una encimera"),
        ia("obra-detalle.jpg", "Nivel y llana sobre una mesa de obra junto a una ventana"),
      ],
      antes: ia("hero-antes.jpg", "El mismo baño antes de la reforma, con bañera, azulejo beis con cenefa y grifería de dos mandos"),
      testimonio: {
        autor: "Lucía M.",
        texto: "Cada tarde dejaban el baño limpio y los vecinos ni se enteraron. Acabaron el día que dijeron.",
      },
    },
    {
      titulo: "Cocina abierta en Russafa",
      slug: "cocina-abierta-en-russafa",
      descripcion: "Quitamos la pared de la cocina cerrada y la abrimos al salón. Encimera de cuarzo y frentes claros.",
      ubicacion: "Russafa",
      anio: 2025,
      servicio: "reforma-de-cocina",
      superficie: "11 m²",
      duracion: "3 semanas",
      contenido: [
        "La cocina era un cuarto cerrado con alicatado hasta el techo. Los dueños querían verla desde el salón y ganar encimera.",
        "Derribamos el tabique no estructural, renovamos la instalación y montamos una cocina en L con encimera de cuarzo.",
      ],
      imagenes: [ia("cocina-despues.jpg", "Cocina en L abierta al salón con encimera de cuarzo y frentes claros")],
      antes: ia("cocina-antes.jpg", "La misma cocina antes, cerrada, con alicatado hasta el techo y armarios oscuros"),
    },
    {
      titulo: "Piso de 1978 en Campanar",
      slug: "piso-de-1978-en-campanar",
      descripcion: "Reforma integral: tabiques fuera, suelo nuevo de porcelánico y el gotelé eliminado en todo el piso.",
      ubicacion: "Campanar",
      anio: 2025,
      servicio: "reforma-integral",
      superficie: "78 m²",
      duracion: "9 semanas",
      contenido: [
        "Un piso de 1978 con distribución antigua: pasillo largo, cocina cerrada y gotelé en todas las paredes.",
        "Tiramos tabiques, cambiamos las instalaciones, pusimos suelo de porcelánico claro y alisamos todas las paredes.",
      ],
      imagenes: [ia("salon-despues.jpg", "Salón diáfano con suelo de porcelánico claro y ventana a la izquierda")],
      antes: ia("salon-antes.jpg", "El mismo salón antes, con tabique, gotelé y terrazo gastado"),
    },
    {
      titulo: "Adiós a la bañera en Mislata",
      slug: "adios-a-la-banera-en-mislata",
      descripcion: "Cambiamos la bañera de chapa por un plato extraplano con mampara, sin tocar el resto del baño.",
      ubicacion: "Mislata",
      anio: 2026,
      servicio: "cambio-banera-por-plato-de-ducha",
      superficie: "3 m²",
      duracion: "4 días",
      contenido: [
        "La madre de Joan ya no podía saltar el borde de la bañera. Querían una ducha accesible sin reformar todo el baño.",
        "Quitamos la bañera, pusimos plato extraplano con desagüe lineal y mampara fija, y repusimos el alicatado de la zona.",
      ],
      imagenes: [ia("ducha-despues.jpg", "Plato de ducha extraplano con mampara")],
      antes: ia("ducha-antes.jpg", "La misma ducha antes, con bañera de chapa"),
    },
    {
      titulo: "Terrazo recuperado en El Cabanyal",
      slug: "terrazo-recuperado-en-el-cabanyal",
      descripcion: "Pulimos y restauramos el terrazo original del pasillo y de las habitaciones.",
      ubicacion: "El Cabanyal",
      anio: 2024,
      servicio: "suelos-y-alicatados",
      superficie: "22 m²",
      contenido: [
        "El pasillo y las tres habitaciones conservaban el terrazo original bajo una capa de cera y manchas.",
        "Lo pulimos en tres pasadas, rellenamos las grietas con resina del mismo tono y lo sellamos con un acabado mate. Quedó como nuevo, sin levantar nada.",
      ],
      imagenes: [ia("terrazo-despues.jpg", "Pasillo con terrazo pulido")],
    },
  ],
  valoracion: { media: 4.8, total: 127 },
  resenas: [
    { autor: "Pau R.", texto: "En 12 días teníamos baño. Ni un día más.", puntuacion: 5, fecha: "2026-10", fuente: "google" },
    {
      autor: "Lucía M.",
      texto:
        "Teníamos miedo de vivir en casa durante la obra y fue mucho más llevadero de lo que pensábamos. Cada tarde dejaban todo recogido y barrido, el portal limpio y la escalera sin una mota de polvo. Avisaron a los vecinos antes de empezar y con el presidente de la comunidad siempre fueron educados. El baño quedó tal como nos lo enseñaron en el presupuesto y lo entregaron el día firmado. Repetiremos con la cocina.",
      puntuacion: 5,
      fecha: "2026-09-14",
      fuente: "google",
    },
    {
      autor: "Andrés T.",
      texto: "Buen trabajo, se retrasaron dos días por el material pero avisaron.",
      puntuacion: 4,
      fecha: "2026-07",
      fuente: "google",
    },
    { autor: "Carmen V.", texto: "Nos enseñaron obras parecidas antes de firmar.", puntuacion: 5, fecha: "2026-05", fuente: "google" },
    {
      autor: "Joan S.",
      texto: "Cambiamos la bañera por una ducha y mi madre ya entra sola. Muy limpios.",
      puntuacion: 5,
      fecha: "2026-03",
      fuente: "google",
    },
    { autor: "Marisa P.", texto: "Serios y puntuales.", puntuacion: 5, fecha: "2025-12", fuente: "google" },
  ],
  proceso: [], // salen los pasos por defecto de core (tipo proyecto)
  acreditaciones: [{ nombre: "Registro de Empresas Acreditadas (REA)", numero: "n.º 00/0000000 (ficticio)" }],
  garantias: [
    "Precio cerrado antes de empezar",
    "Fecha de fin en el contrato",
    "Limpieza al final de cada jornada",
    "2 años de garantía en la obra",
  ],
  marcas: ["Porcelanosa", "Roca", "Grohe"],
  empresa: {
    historia: [
      "Reformes Albardí nació en 2009 en el barrio de Russafa, con un solo equipo y un compromiso: dar el precio antes de empezar y no moverlo. Hoy somos un equipo pequeño que reforma baños, cocinas y pisos enteros por toda el área de Valencia.",
      "Trabajamos con los mismos oficiales de siempre y revisamos cada obra con el cliente antes de cerrarla. Preferimos hacer pocas obras y que se vean bien que hacer muchas deprisa.",
    ],
    imagenes: [
      ia("obra-detalle.jpg", "Nivel y llana sobre una mesa de obra junto a una ventana"),
      ia("obra-material.jpg", "Muestras de azulejo sobre una encimera"),
    ],
    // Sin fotos: nunca una persona generada con IA.
    equipo: [
      { nombre: "Jordi Albardí", cargo: "Gerente" },
      { nombre: "Marta Soler", cargo: "Jefa de obra" },
      { nombre: "Vicent Mollà", cargo: "Encargado de alicatados" },
    ],
  },
  imagenesHero: [ia("hero-despues.jpg", "Baño reformado de 5 m² con plato de ducha extraplano, mampara y ventana a la izquierda")],
  preguntas: [
    {
      pregunta: "¿Necesito licencia de obra para reformar un baño?",
      respuesta:
        "Para un baño o una cocina sin tocar la estructura suele bastar con el trámite de obra menor del ayuntamiento (declaración responsable o comunicación previa, según el municipio). Antes de empezar te decimos qué toca en tu caso.",
    },
    {
      pregunta: "¿Puedo vivir en casa durante la obra?",
      respuesta:
        "En un baño o una cocina, casi siempre. Dejamos una zona usable y limpiamos al acabar cada jornada. En una reforma integral lo hablamos en la visita.",
    },
    {
      pregunta: "¿Cuánto tarda una reforma?",
      respuesta:
        "Un baño, entre una y dos semanas. Una cocina, unas tres. Una reforma integral, desde ocho. La fecha exacta de fin va escrita en el contrato.",
    },
    {
      pregunta: "¿Cómo se paga?",
      respuesta:
        "Por fases: una señal al firmar, pagos intermedios según avanza la obra y el resto al entregarla. Todo queda por escrito en el presupuesto.",
    },
  ],
  seo: {
    titulo: "Reformas de baño y cocina en Valencia | Albardí",
    descripcion:
      "Reformas de baño, cocina e integrales en Valencia con precio cerrado y fecha de fin por contrato. Mira nuestros antes y después.",
    url: "https://reformesalbardi.example",
  },
  redes: { instagram: "https://www.instagram.com/albardi.ejemplo" },
});
