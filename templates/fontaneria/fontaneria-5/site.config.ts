import { defineSiteConfig } from "@andrei-leads/core";

/*
 * Datos de ejemplo de «Llegamos» (fontaneria-5): fontanero autónomo FICTICIO de l'Horta Sud
 * (Valencia). Todas las fotos son de relleno (public/ejemplo/) y se marcan como generadas con IA.
 * Sin `seo.indexar` ni la analítica de Vercel: los activa cada web, nunca el template.
 */
export default defineSiteConfig({
  negocio: {
    nombre: "Alapont",
    nombreLegal: "Vicent Alapont Ribera",
    nif: "48291736A", // ficticio: la letra no corresponde al número a propósito (la correcta sería Q)
    sector: "Fontanería",
    descripcionCorta: "Fontanero en Torrent y l'Horta Sud. Desatascos, fugas y termos, saliendo cada día desde Torrent.",
    anioFundacion: 2011,
    tipoSchema: ["Plumber"],
  },
  contacto: {
    telefono: "+34600005005",
    whatsapp: "+34600005005",
    email: "hola@alapontfontaner.example",
    direccion: { calle: "Avinguda al Vedat 88", cp: "46900", ciudad: "Torrent", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "20:00" },
      { dias: ["sabado", "domingo"], abre: "10:00", cierra: "14:00" },
    ],
    coordenadas: { lat: 39.4371, lng: -0.4655 },
    urgencias24h: true,
    tiempoLlegada: "30 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000005",
  },
  zonas: [
    "Torrent",
    "Alaquàs",
    "Aldaia",
    "Xirivella",
    "Picanya",
    "Paiporta",
    "Catarroja",
    "Benetússer",
    "Alfafar",
    "Sedaví",
    "Massanassa",
    "Quart de Poblet",
    "Manises",
    "Valencia",
  ],
  servicios: [
    {
      titulo: "Desatascos urgentes",
      slug: "desatascos-urgentes",
      descripcion: "Fregaderos, váteres, arquetas y bajantes. Con máquina si hace falta.",
      contenido: [
        "Un atasco no espera. Si el agua no baja en el fregadero, el váter rebosa o la arqueta del patio huele, llámanos y te decimos a qué hora llegamos.",
        "Trabajamos con máquina de muelle y, cuando hace falta, con cámara para ver dónde está el tapón. En las plantas bajas de los años 60 y 70 muchas veces el problema está en un bajante antiguo o en una arqueta rota.",
        "Antes de empezar te decimos el precio. Al acabar, dejamos todo limpio y te damos factura con IVA.",
      ],
      incluye: [
        "Desplazamiento en l'Horta Sud",
        "Máquina desatascadora",
        "Revisión con cámara si hace falta",
        "Prueba de evacuación al acabar",
        "Limpieza de la zona",
      ],
      imagenes: [
        { src: "/ejemplo/arqueta.jpg", alt: "Arqueta de patio abierta vista desde arriba, con la tapa de fundición al lado", origen: "ia" },
      ],
      preguntas: [
        { pregunta: "¿Cuánto cuesta un desatasco?", respuesta: "Depende de dónde esté el tapón. Te damos el precio antes de empezar." },
        { pregunta: "¿Venís un domingo?", respuesta: "Sí, atendemos urgencias las 24 horas, también festivos." },
      ],
      precioDesde: "desde 70 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Fugas en paredes y suelos",
      slug: "fugas-en-paredes-y-suelos",
      descripcion: "Encontramos la fuga sin romper de más y dejamos la pared cerrada.",
      contenido: [
        "Una mancha que crece, el contador que gira con los grifos cerrados o un ruido de agua por la noche: casi siempre es una tubería picada dentro de la pared o del suelo.",
        "Buscamos el punto exacto antes de abrir, para romper lo mínimo. Cambiamos el tramo dañado y cerramos la roza con yeso el mismo día.",
      ],
      incluye: ["Localización de la fuga", "Apertura mínima de pared o suelo", "Cambio del tramo dañado", "Cierre de la roza con yeso"],
      imagenes: [
        { src: "/ejemplo/fuga-pared.jpg", alt: "Pared de planta baja abierta con la tubería reparada a la vista", origen: "ia" },
      ],
      preguntas: [
        { pregunta: "¿Tenéis que romper mucho?", respuesta: "No. Localizamos la fuga antes de abrir y solo rompemos el trozo necesario." },
        { pregunta: "¿Lo cubre el seguro de hogar?", respuesta: "Muchas veces sí. Te damos factura y fotos para que lo presentes." },
      ],
      precioDesde: "desde 55 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Termos: reparación y cambio",
      slug: "termos",
      descripcion: "Termos eléctricos y de gas. Cambio en el día si hay modelo.",
      contenido: [
        "Si el termo no calienta, gotea o salta el diferencial, venimos a verlo y te decimos si compensa arreglarlo o cambiarlo.",
        "Si hay que cambiarlo, traemos uno de la misma medida, lo instalamos y nos llevamos el viejo.",
      ],
      incluye: ["Diagnóstico del termo", "Cambio de resistencia o termostato", "Instalación del termo nuevo", "Retirada del viejo"],
      imagenes: [{ src: "/ejemplo/termo.jpg", alt: "Termo eléctrico colgado en un lavadero de planta baja", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cuánto tardáis en cambiarlo?", respuesta: "Unas dos horas si el modelo está en el almacén." },
        { pregunta: "¿Os lleváis el termo viejo?", respuesta: "Sí, lo llevamos al punto limpio." },
      ],
      precioDesde: "desde 90 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cisternas y grifos",
      slug: "cisternas-y-grifos",
      descripcion: "Cisternas que no paran de cargar, grifos que gotean, latiguillos.",
      contenido: [
        "Una cisterna que no para de cargar puede gastar miles de litros al mes. Cambiamos el mecanismo, la boya o el grifo entero en una sola visita.",
        "Traemos en la furgoneta los mecanismos y latiguillos más habituales.",
      ],
      incluye: ["Mecanismo de cisterna", "Cambio de grifo o cartucho", "Latiguillos nuevos", "Prueba de estanqueidad"],
      imagenes: [{ src: "/ejemplo/cisterna.jpg", alt: "Mecanismo de cisterna nuevo dentro del tanque", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Traéis las piezas?", respuesta: "Llevamos las más habituales en la furgoneta." },
        { pregunta: "¿Cambiáis grifos que compro yo?", respuesta: "Sí, lo instalamos y comprobamos que no gotee." },
      ],
    },
    {
      titulo: "Arquetas y bajantes de patio",
      slug: "arquetas-y-bajantes",
      descripcion: "Arquetas rotas o atascadas y bajantes antiguos de patio.",
      contenido: [
        "En las casas de planta baja la arqueta del patio recoge todo. Si está rota o el bajante es de fibrocemento antiguo, el agua acaba saliendo por donde no debe.",
        "Cambiamos la arqueta por una de PVC registrable y el bajante por uno nuevo, y reponemos la baldosa.",
      ],
      incluye: ["Arqueta de PVC registrable", "Tapa de fundición", "Cambio de bajante", "Reposición de baldosa"],
      imagenes: [{ src: "/ejemplo/bajante-fachada.jpg", alt: "Bajante de PVC gris en una fachada de ladrillo caravista", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Hay que levantar todo el patio?", respuesta: "No, solo la zona de la arqueta y el tramo de tubo afectado." },
        { pregunta: "¿Cuánto dura la obra?", respuesta: "Normalmente una mañana." },
      ],
    },
    {
      titulo: "Tuberías de planta baja",
      slug: "tuberias-planta-baja",
      descripcion: "Cambiamos la tubería vieja de hierro o plomo por multicapa.",
      contenido: [
        "Las plantas bajas de los años 60 y 70 suelen tener tubería de hierro o de plomo. Con los años se pica, pierde presión y da agua con óxido.",
        "La cambiamos por multicapa, por rozas estrechas, y dejamos el suelo y las paredes cerrados.",
      ],
      incluye: ["Tubería multicapa", "Llaves de corte nuevas", "Rozas y cierre", "Prueba de presión"],
      imagenes: [{ src: "/ejemplo/tuberia-patio.jpg", alt: "Tubería multicapa nueva sujeta a la pared de un patio", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Puedo seguir viviendo en casa?", respuesta: "Sí. Cortamos el agua solo las horas imprescindibles." },
        { pregunta: "¿Me dais el precio cerrado?", respuesta: "Sí, después de verlo en persona." },
      ],
    },
    {
      titulo: "Humedades por fuga",
      slug: "humedades-por-fuga",
      descripcion: "Si la mancha viene de una tubería, la encontramos y la cortamos.",
      contenido: [
        "No todas las humedades son de fontanería. Venimos, comprobamos si hay una fuga detrás y, si la hay, la reparamos.",
        "Si la mancha no viene de una tubería, te lo decimos y no cobramos la reparación.",
      ],
      incluye: ["Comprobación de fugas", "Reparación de la tubería", "Informe para el seguro"],
      imagenes: [{ src: "/ejemplo/humedad-zocalo.jpg", alt: "Zócalo de una planta baja con la pintura abombada por una fuga", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cómo sé si es una fuga?", respuesta: "Si la mancha crece con los días o el contador se mueve con todo cerrado, probablemente sí." },
        { pregunta: "¿Pintáis la pared?", respuesta: "Dejamos la pared cerrada; la pintura la puedes hacer tú o te recomendamos a alguien." },
      ],
    },
  ],
  trabajos: [
    {
      titulo: "Arqueta nueva en un patio",
      slug: "arqueta-nueva-en-un-patio",
      descripcion: "La arqueta del patio estaba rota y salía agua al llover. La cambiamos por una de PVC con tapa de fundición.",
      ubicacion: "Picanya",
      anio: 2026,
      servicio: "arquetas-y-bajantes",
      superficie: "1 m²",
      duracion: "5 horas",
      contenido: [
        "La arqueta del patio estaba rota y cada vez que llovía fuerte salía agua por la tapa. Levantamos la vieja, de ladrillo, y pusimos una de PVC registrable con tapa de fundición.",
        "Aprovechamos para cambiar el tramo de tubo que entraba torcido. En cinco horas el patio quedó cerrado y con la baldosa repuesta.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-arqueta.jpg", alt: "Arqueta nueva de PVC con tapa de fundición, vista desde arriba", origen: "ia" }],
      antes: { src: "/ejemplo/trabajo-arqueta-antes.jpg", alt: "Arqueta antigua de ladrillo rota, vista desde arriba", origen: "ia" },
    },
    {
      titulo: "Tubería general de una planta baja de 1968",
      slug: "tuberia-general-planta-baja-1968",
      descripcion: "Cambiamos toda la tubería de hierro de una planta baja por multicapa, por una zanja estrecha en el pasillo.",
      ubicacion: "Xirivella",
      anio: 2025,
      servicio: "tuberias-planta-baja",
      duracion: "2 días",
      contenido: [
        "La casa tenía la tubería original de hierro y el agua salía con óxido. Abrimos una zanja estrecha en el pasillo y pasamos multicapa nueva hasta la cocina y el baño.",
        "En dos días quedó todo cerrado, con llaves de corte nuevas en cada cuarto húmedo.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-planta-baja.jpg", alt: "Zanja estrecha en el suelo de un pasillo con tubería multicapa nueva", origen: "ia" }],
      testimonio: { autor: "Paco R.", texto: "Pensaba que habría que levantar toda la casa y en dos días estaba hecho." },
    },
    {
      titulo: "Fuga en la pared de una cocina",
      slug: "fuga-en-la-pared-de-una-cocina",
      descripcion: "Localizamos una tubería picada dentro de la pared de la cocina y la cambiamos abriendo solo un palmo.",
      ubicacion: "Aldaia",
      anio: 2026,
      servicio: "fugas-en-paredes-y-suelos",
      duracion: "4 horas",
      contenido: [
        "La pared de la cocina estaba húmeda y nadie sabía de dónde venía el agua. Localizamos la tubería picada antes de abrir.",
        "Abrimos solo un palmo, cambiamos el tramo y cerramos la roza con yeso el mismo día.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-fuga.jpg", alt: "Rozas cerradas con yeso fresco en la pared de una cocina", origen: "ia" }],
    },
    {
      titulo: "Fregadero y desagüe de un horno",
      slug: "fregadero-y-desague-de-un-horno",
      descripcion: "Desatascamos el desagüe del fregadero de un horno de barrio un sábado por la mañana.",
      ubicacion: "Alaquàs",
      anio: 2026,
      servicio: "desatascos-urgentes",
      duracion: "3 horas",
      contenido: [
        "El desagüe del fregadero del obrador se atascó un sábado por la mañana. Llegamos en media hora y lo desatascamos con máquina.",
        "Cambiamos el sifón y dejamos la tubería vista nueva para que se pueda registrar.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-bajo.jpg", alt: "Fregadero de un bajo comercial con la tubería nueva a la vista", origen: "ia" }],
    },
    {
      titulo: "Humedad en el salón por una fuga del baño de arriba",
      slug: "humedad-en-el-salon",
      descripcion: "La mancha del techo del salón venía del baño del piso de arriba. Reparamos la fuga y la pared quedó seca.",
      ubicacion: "Torrent",
      anio: 2024,
      servicio: "humedades-por-fuga",
      duracion: "1 día",
      contenido: [
        "Una mancha en el techo del salón crecía cada semana. Comprobamos que venía del desagüe de la ducha del piso de arriba.",
        "Reparamos la fuga y, cuando secó, la pared quedó lista para pintar.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-humedad.jpg", alt: "Pared del salón seca y pintada bajo el techo donde estaba la mancha", origen: "ia" }],
    },
  ],
  valoracion: { media: 4.8, total: 97 },
  resenas: [
    {
      autor: "Carmen V.",
      texto: "Llamé a las diez de la noche desde Picanya y a las diez y media estaba aquí.",
      puntuacion: 5,
      fecha: "2026-11-15",
      fuente: "google",
    },
    { autor: "Toni B.", texto: "Rápido y buen precio.", puntuacion: 5, fecha: "2026-10", fuente: "google" },
    {
      autor: "Rafa S.",
      texto: "Se nos atascó el desagüe del horno en Alaquàs un sábado por la mañana. Vino en media hora, lo desatascó con máquina y nos explicó cómo evitar que vuelva a pasar.",
      puntuacion: 5,
      fecha: "2026-09-09",
      fuente: "google",
    },
    {
      autor: "Encarna L.",
      texto: "Teníamos una fuga en la pared de la cocina en Aldaia y no sabíamos de dónde venía. Vicent vino esa misma tarde, encontró la tubería picada sin abrir media pared y nos dio el precio antes de empezar. Tardó algo más de lo que dijo porque le faltaba una pieza y tuvo que ir al almacén, pero nos avisó. La pared quedó cerrada y limpia. Le pongo cuatro estrellas por la espera, pero repetiría.",
      puntuacion: 4,
      fecha: "2026-08",
      fuente: "google",
    },
    {
      autor: "Raúl M.",
      texto: "Cambió el termo en una mañana y se llevó el viejo. Muy limpio trabajando.",
      puntuacion: 5,
      fecha: "2026-06-20",
      fuente: "google",
    },
    {
      autor: "Pilar G.",
      texto: "La cisterna no paraba de cargar. Vino a Paiporta al día siguiente a primera hora y en veinte minutos estaba arreglada.",
      puntuacion: 5,
      fecha: "2026-04",
      fuente: "google",
    },
  ],
  proceso: [
    { titulo: "Llamas o escribes", texto: "Nos dices qué pasa y en qué pueblo y calle estás." },
    { titulo: "Salimos hacia ti", texto: "Te damos la hora de llegada y la cumplimos." },
    { titulo: "Precio y arreglo", texto: "Vemos la avería, te damos el precio y, si te parece bien, lo arreglamos." },
  ],
  acreditaciones: [{ nombre: "Empresa instaladora RITE", numero: "n.º 46/41108" }], // número ficticio
  garantias: ["Sin recargo de desplazamiento en l'Horta Sud", "Precio antes de empezar", "Factura con IVA", "Seis meses de garantía"],
  tarifas: {
    items: [
      { concepto: "Salida + primera hora", precio: "55 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Hora siguiente", precio: "35 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Urgencia nocturna (22:00–8:00)", precio: "+45 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    ],
    nota: "IVA no incluido.",
  },
  empresa: {
    historia: [
      "Vicent empezó en 2011 con una furgoneta y un taller pequeño en Torrent. Desde entonces sale cada mañana desde el mismo sitio hacia los pueblos de alrededor.",
      "Conocemos las casas de la zona: plantas bajas con patio, bajantes antiguos y tuberías de hierro de los años 60. Por eso solemos saber qué pasa antes de abrir.",
    ],
    imagenes: [
      { src: "/ejemplo/taller.jpg", alt: "Estantería del taller con tubos y codos ordenados", origen: "ia" },
      { src: "/ejemplo/registro.jpg", alt: "Tapa de registro de fundición en una acera", origen: "ia" },
    ],
  },
  preguntas: [
    {
      pregunta: "¿Cobráis el desplazamiento a mi pueblo?",
      respuesta: "No dentro de l'Horta Sud. Pagas la salida con la primera hora incluida, vengamos de donde vengamos.",
    },
    {
      pregunta: "¿Venís de noche?",
      respuesta: "Sí, atendemos urgencias las 24 horas. De 22:00 a 8:00 hay un recargo que te decimos por teléfono antes de salir.",
    },
    {
      pregunta: "¿Cuánto tardáis en llegar?",
      respuesta: "Normalmente unos 30 minutos desde Torrent. Si estamos en otro aviso, te lo decimos al llamar.",
    },
    { pregunta: "¿Me dais el precio antes de empezar?", respuesta: "Sí. Vemos la avería, te decimos el precio y solo empezamos si te parece bien." },
    { pregunta: "¿Hacéis factura?", respuesta: "Siempre, con IVA. Y el trabajo tiene seis meses de garantía." },
  ],
  seo: {
    titulo: "Fontanero en Torrent y l'Horta Sud · Alapont",
    descripcion:
      "Fontanero en Torrent y l'Horta Sud: desatascos, fugas y termos. Llegamos en 30 minutos a Torrent y 13 municipios de alrededor. Urgencias 24 h.",
    url: "https://fontaneria-5.vercel.app",
  },
});
