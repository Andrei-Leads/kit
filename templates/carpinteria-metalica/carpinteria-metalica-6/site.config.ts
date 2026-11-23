import { defineSiteConfig } from "@andrei-leads/core";

/*
 * carpinteria-metalica-6 «Fachada nueva»: datos de ejemplo de un negocio FICTICIO de Sevilla
 * (contrato de core 0.7.0). Teléfono, email, dirección, NIF, registro y ficha de Google son
 * inventados a propósito; las fotos de public/ejemplo/ son relleno (origen "ia"). Sin `seo.indexar`
 * ni `analitica`: los activa cada web. Lo que hay que cambiar para un cliente real: CLIENTE-REAL.md.
 */
export default defineSiteConfig({
  negocio: {
    nombre: "Aluminios y PVC Hermanos Arjona",
    nombreLegal: "Hermanos Arjona Carpintería de Aluminio, S.L.",
    nif: "B91562384", // FICTICIO: dígito de control inválido
    sector: "Ventanas y cierros de aluminio",
    descripcionCorta: "Cambiamos ventanas, persianas y cierros sin obra en Sevilla y el Aljarafe. Fabricación propia en Dos Hermanas.",
    anioFundacion: 1996,
    registroMercantil: "Registro Mercantil de Sevilla, tomo 0000, folio 00, hoja SE-00000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000606",
    whatsapp: "+34600000606",
    email: "hola@hermanosarjona.example",
    direccion: { calle: "Calle Ejemplo 8, nave 3", cp: "41703", ciudad: "Dos Hermanas", provincia: "Sevilla" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "17:00", cierra: "20:00" },
      { dias: ["sabado"], abre: "09:00", cierra: "13:00" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000606",
  },
  zonas: ["Sevilla", "Dos Hermanas", "Alcalá de Guadaíra", "Mairena del Aljarafe", "Tomares", "San Juan de Aznalfarache", "Bormujos", "Gelves", "Coria del Río", "Camas", "Utrera"],
  valoracion: { media: 4.8, total: 96 },
  servicios: [
    {
      titulo: "Cambio de ventanas sin obra",
      slug: "cambio-ventanas",
      descripcion: "Quitamos la ventana vieja y montamos la nueva en el mismo hueco, sin picar la pared.",
      contenido: [
        "Desmontamos la ventana antigua y colocamos la nueva sobre el premarco que ya tienes. No hay que picar, no hay escombro y la pintura de alrededor queda como estaba.",
        "Fabricamos cada ventana en nuestro taller de Dos Hermanas con la medida exacta de tu hueco. Un piso normal se cambia en un día, y por la noche ya duermes con las ventanas nuevas.",
      ],
      incluye: ["Visita y medición en tu casa", "Retirada de la ventana vieja", "Montaje sobre el premarco", "Sellado y remates por dentro y por fuera", "Limpieza al terminar"],
      imagenes: [{ src: "/ejemplo/servicio-cambio-ventanas.jpg", alt: "Ventana nueva de PVC blanco en la fachada de un bloque, vista desde la calle", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Hace falta picar la pared?", respuesta: "No. La ventana nueva se monta sobre el premarco que ya existe. Solo se sella y se remata el contorno." },
        { pregunta: "¿Cuánto se tarda por vivienda?", respuesta: "Un piso de tres o cuatro ventanas se cambia en un día." },
      ],
      precioDesde: "desde 290 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cierros de balcón",
      slug: "cierros",
      descripcion: "Cierros de aluminio a medida para ganar una habitación sin perder luz.",
      contenido: [
        "Cerramos el balcón con un cierro de aluminio y vidrio hecho a la medida del hueco. Entra la misma luz, pero no entran el ruido, el polvo ni el frío del invierno.",
        "Si el cierro viejo está oxidado, lo desmontamos y nos lo llevamos. Elegimos contigo el color para que case con el resto de la fachada.",
      ],
      incluye: ["Medición del balcón", "Cierro a medida con vidrio laminado", "Retirada del cierro viejo", "Color a juego con la fachada"],
      imagenes: [{ src: "/ejemplo/servicio-cierros.jpg", alt: "Cierro de balcón de aluminio blanco en la primera planta de un edificio", origen: "ia" }],
      preguntas: [{ pregunta: "¿Necesito licencia para cerrar el balcón?", respuesta: "Depende del ayuntamiento y de la comunidad. Te decimos qué pedir antes de fabricar nada." }],
    },
    {
      titulo: "Persianas de aluminio térmico",
      slug: "persianas",
      descripcion: "Persianas con lamas rellenas de espuma que frenan el calor y no se descuelgan.",
      contenido: [
        "Las lamas de aluminio térmico llevan espuma por dentro. En verano frenan el sol de la tarde y la casa se calienta mucho menos.",
        "Cambiamos solo la persiana o también la cinta, el recogedor y el cajón. Si quieres, la dejamos con motor y un pulsador en la pared.",
      ],
      incluye: ["Lamas de aluminio con espuma", "Cinta y recogedor nuevos", "Guías nuevas si hace falta", "Motor opcional"],
      imagenes: [{ src: "/ejemplo/servicio-persianas.jpg", alt: "Persianas grises de aluminio a medio bajar en la fachada de un piso", origen: "ia" }],
      preguntas: [{ pregunta: "¿Se puede motorizar una persiana que ya tengo?", respuesta: "Sí, si el cajón tiene sitio para el motor. Lo vemos en la visita." }],
      precioDesde: "desde 150 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Ventanas iguales para toda la comunidad",
      slug: "ventanas-comunidad",
      descripcion: "Un mismo modelo y color para todo el bloque, aprobado en junta antes de fabricar.",
      contenido: [
        "Preparamos un presupuesto para la junta con el modelo, el color y el precio por vivienda. Así cada vecino sabe lo que paga y la fachada queda igual de arriba abajo.",
        "Montamos piso a piso, con fecha para cada vecino, para que nadie se quede un día entero esperando.",
      ],
      incluye: ["Presupuesto para la junta", "Muestra de color en la fachada", "Calendario de montaje por vivienda", "Precio cerrado por vivienda"],
      imagenes: [{ src: "/ejemplo/servicio-comunidad.jpg", alt: "Fachada de un bloque de pisos con todas las ventanas iguales en blanco", origen: "ia" }],
      preguntas: [{ pregunta: "¿Y si un vecino no quiere cambiarlas?", respuesta: "Se le monta más adelante con el mismo modelo y color, para que la fachada quede igual." }],
    },
    {
      titulo: "Puertas de portal",
      slug: "puertas-portal",
      descripcion: "Puertas de portal de aluminio y vidrio, con cierre y portero integrados.",
      contenido: [
        "Hacemos puertas de portal de aluminio con vidrio de seguridad, cierre electromagnético y el hueco para el portero o el buzón.",
        "Desmontamos la puerta vieja y dejamos la nueva funcionando en el día, para que el portal no se quede abierto.",
      ],
      incluye: ["Diseño a medida del portal", "Vidrio de seguridad", "Cierre y muelle", "Montaje en el día"],
      imagenes: [{ src: "/ejemplo/servicio-portal.jpg", alt: "Puerta de portal de aluminio gris con vidrio, en un bloque de pisos", origen: "ia" }],
      preguntas: [{ pregunta: "¿Podéis aprovechar el portero automático?", respuesta: "Sí, dejamos el hueco a medida y lo conecta vuestro instalador o lo coordinamos nosotros." }],
    },
    {
      titulo: "Cerramientos de azotea",
      slug: "cerramientos-azotea",
      descripcion: "Cerramos azoteas y terrazas con aluminio y vidrio para usarlas todo el año.",
      contenido: [
        "Convertimos la azotea en un espacio cerrado con perfiles de aluminio, vidrio y techo de panel.",
        "Te decimos qué permisos hacen falta en tu municipio antes de empezar.",
      ],
      incluye: ["Estudio del espacio", "Perfiles y vidrio a medida", "Techo de panel aislante", "Montaje y sellado"],
      imagenes: [],
      preguntas: [{ pregunta: "¿Hace falta licencia?", respuesta: "Casi siempre sí. Te ayudamos con los planos y la documentación." }],
    },
  ],
  trabajos: [
    {
      titulo: "Ventanas de un bloque en Dos Hermanas",
      slug: "ventanas-bloque-dos-hermanas",
      descripcion: "Doce ventanas de aluminio viejo cambiadas por PVC blanco con persiana gris, el mismo modelo en todo el bloque.",
      ubicacion: "Dos Hermanas",
      anio: 2025,
      servicio: "ventanas-comunidad",
      superficie: "12 ventanas",
      duracion: "3 días",
      precio: "entre 4.000 y 5.000 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "La comunidad quería acabar con las persianas que no subían y con el calor de las tardes de verano. Llevamos una muestra de color a la junta y se aprobó el gris para las persianas.",
        "Montamos cuatro viviendas por día, sin obra y con la escalera limpia cada tarde.",
      ],
      imagenes: [{ src: "/ejemplo/fachada-01-despues.jpg", alt: "Bloque de cuatro alturas en Dos Hermanas con ventanas nuevas de PVC blanco y persianas grises", origen: "ia" }],
      antes: { src: "/ejemplo/fachada-01-antes.jpg", alt: "El mismo bloque antes, con ventanas de aluminio amarillento y persianas con lamas rotas", origen: "ia" },
      testimonio: { autor: "Manuel G., presidente de la comunidad", texto: "Nos trajeron la muestra a la junta, elegimos el color entre todos y en tres días estaba el bloque entero." },
    },
    {
      titulo: "Cierro nuevo en Nervión",
      slug: "cierro-nervion",
      descripcion: "Un cierro de hierro oxidado sustituido por uno de aluminio blanco con vidrio laminado.",
      ubicacion: "Nervión, Sevilla",
      anio: 2025,
      servicio: "cierros",
      superficie: "3 m²",
      duracion: "1 día",
      contenido: ["El cierro antiguo tenía óxido en la base y no cerraba bien. Lo desmontamos y montamos el nuevo en la misma mañana."],
      imagenes: [{ src: "/ejemplo/fachada-02-despues.jpg", alt: "Cierro nuevo de aluminio blanco en un balcón de Nervión", origen: "ia" }],
      antes: { src: "/ejemplo/fachada-02-antes.jpg", alt: "El mismo balcón antes, con un cierro de hierro oxidado", origen: "ia" },
    },
    {
      titulo: "Casa en Mairena del Aljarafe",
      slug: "casa-mairena",
      descripcion: "Nueve ventanas de una casa de dos plantas cambiadas sin obra en dos días.",
      ubicacion: "Mairena del Aljarafe",
      anio: 2024,
      servicio: "cambio-ventanas",
      superficie: "9 ventanas",
      duracion: "2 días",
      contenido: ["Cambiamos las ventanas de bronce por PVC blanco con doble vidrio. La familia siguió viviendo en la casa durante el montaje."],
      imagenes: [{ src: "/ejemplo/fachada-03-despues.jpg", alt: "Casa de dos plantas en Mairena con ventanas nuevas de PVC blanco", origen: "ia" }],
      antes: { src: "/ejemplo/fachada-03-antes.jpg", alt: "La misma casa antes, con ventanas de aluminio bronce", origen: "ia" },
    },
    {
      titulo: "Persianas en Alcalá de Guadaíra",
      slug: "persianas-alcala",
      descripcion: "Cinco persianas de lamas rotas cambiadas por aluminio térmico gris.",
      ubicacion: "Alcalá de Guadaíra",
      anio: 2026,
      servicio: "persianas",
      superficie: "5 persianas",
      duracion: "1 día",
      precio: "unos 900 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: ["Persianas de PVC con lamas partidas cambiadas por aluminio térmico, con cinta y recogedor nuevos."],
      imagenes: [{ src: "/ejemplo/fachada-04-despues.jpg", alt: "Fachada de un piso en Alcalá con persianas nuevas de aluminio gris", origen: "ia" }],
      antes: { src: "/ejemplo/fachada-04-antes.jpg", alt: "La misma fachada antes, con persianas de lamas rotas", origen: "ia" },
    },
    {
      titulo: "Azotea cerrada en Tomares",
      slug: "azotea-tomares",
      descripcion: "Una azotea cerrada con aluminio y vidrio para usarla como estudio.",
      ubicacion: "Tomares",
      anio: 2024,
      servicio: "cerramientos-azotea",
      superficie: "10 m²",
      contenido: ["Cerramos la azotea con perfiles de aluminio gris y techo de panel aislante."],
      imagenes: [{ src: "/ejemplo/fachada-05.jpg", alt: "Cerramiento de aluminio gris y vidrio en la azotea de una casa en Tomares", origen: "ia" }],
    },
  ],
  resenas: [
    { autor: "Rocío P.", puntuacion: 5, fecha: "2026-10-20", fuente: "google", texto: "En agosto ya no entra el calor por las ventanas." },
    { autor: "Manuel G.", puntuacion: 5, fecha: "2026-09", fuente: "google", texto: "Somos una comunidad de doce vecinos y no era fácil ponernos de acuerdo. Antonio vino a la reunión con una muestra de la ventana y del color de la persiana, nos explicó el precio por piso y respondió a todas las dudas. Elegimos el gris entre todos. Lo hicieron en tres días, cuatro pisos cada día, y la escalera quedaba limpia cada tarde. La fachada parece otra y en casa se nota el silencio." },
    { autor: "Fernando L.", puntuacion: 5, fecha: "2026-07", fuente: "google", texto: "Rápidos y limpios." },
    { autor: "Antonia R.", puntuacion: 4, fecha: "2026-05-08", fuente: "google", texto: "El cierro quedó precioso; tardaron en darme fecha." },
    { autor: "Curro M.", puntuacion: 5, fecha: "2026-03", fuente: "google", texto: "Cambiaron las cinco persianas en una mañana. Ahora suben solas con el motor y no se oye nada." },
    { autor: "Lola S.", puntuacion: 5, fecha: "2025-12", fuente: "google", texto: "Recomendables." },
  ],
  proceso: [
    { titulo: "Nos mandas una foto", texto: "Desde la calle o desde dentro, por WhatsApp." },
    { titulo: "Visita y medición", texto: "Vamos a tu casa y medimos cada hueco." },
    { titulo: "Presupuesto por escrito", texto: "Con el precio de cada ventana." },
    { titulo: "Montaje sin obra", texto: "Un día por vivienda, sin picar." },
    { titulo: "Revisión", texto: "Volvemos a comprobar que todo cierra bien." },
  ],
  garantias: [
    "Sin obra ni escombros",
    "Precio cerrado antes de empezar",
    "Color aprobado por la comunidad antes de fabricar",
    "10 años de garantía en perfiles", // GARANTÍA FICTICIA: borrar en la web del cliente
  ],
  acreditaciones: [
    { nombre: "Taller asociado a la federación regional de carpintería metálica (ficticio)" }, // ACREDITACIÓN FICTICIA: borrar en la web del cliente
  ],
  marcas: ["Cortizo", "Kömmerling", "Persax"], // MARCAS DE EJEMPLO: poner las que use el cliente
  empresa: {
    historia: [
      "Antonio y José Arjona abrieron el taller en 1996 en una nave pequeña de Dos Hermanas. Empezaron haciendo cierros para los vecinos de Dos Hermanas y hoy fabrican ventanas, persianas y puertas para toda la provincia.",
      "Seguimos siendo un taller familiar: medimos, fabricamos y montamos nosotros mismos. El que te mide la ventana es el que luego te la pone.",
    ],
    imagenes: [
      { src: "/ejemplo/taller-nave.jpg", alt: "Nave del taller con perfiles de aluminio apilados y una mesa de trabajo", origen: "ia" },
      { src: "/ejemplo/taller-furgoneta.jpg", alt: "Furgoneta blanca del taller aparcada de espaldas frente a la nave", origen: "ia" },
    ],
    equipo: [
      { nombre: "Antonio Arjona", cargo: "Socio · Taller" },
      { nombre: "José Arjona", cargo: "Socio · Montaje" },
      { nombre: "Mari Carmen", cargo: "Oficina y presupuestos" },
    ],
  },
  imagenesHero: [],
  galeria: [],
  preguntas: [
    { pregunta: "¿Necesito permiso de la comunidad?", respuesta: "Si cambias el aspecto de la fachada, sí. Te preparamos una muestra de color y un presupuesto para llevar a la junta." },
    { pregunta: "¿Las ventanas nuevas aíslan del calor?", respuesta: "Sí. El PVC o el aluminio con rotura de puente térmico y el doble vidrio frenan mucho el calor de la tarde." },
    { pregunta: "¿Cuánto tardáis?", respuesta: "Unas tres semanas en fabricar desde que apruebas el presupuesto, y un día de montaje por vivienda." },
    { pregunta: "¿De verdad es sin obra?", respuesta: "Sí. Montamos sobre el premarco que ya tienes, sin picar la pared ni dejar escombro." },
    { pregunta: "¿Puedo elegir el color?", respuesta: "Sí. Te enseñamos las muestras y, si es una comunidad, la junta aprueba el color antes de fabricar." },
  ],
  redes: { instagram: "https://instagram.com/hermanosarjona.ejemplo" },
  seo: {
    titulo: "Ventanas y cierros en Dos Hermanas | Hermanos Arjona",
    descripcion: "Cambiamos ventanas, persianas y cierros de aluminio sin obra en Sevilla, Dos Hermanas y el Aljarafe. Fabricación propia.",
    url: "https://hermanosarjona.example",
  },
});
