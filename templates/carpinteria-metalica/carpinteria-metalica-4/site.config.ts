// Datos de ejemplo de «Plano» (carpinteria-metalica-4). Negocio FICTICIO de Valencia (taller en
// Alboraya, L'Horta Nord): nombre, NIF (control inválido a propósito), dirección, teléfono, reseñas,
// acreditación y precios inventados. Todas las fotos de public/ejemplo/ son de relleno (origen "ia").
// Sin seo.indexar (noindex), sin analitica y sin marca (color del template).
import { defineSiteConfig } from "@andrei-leads/core";

const ia = (src: string, alt: string) => ({ src: `/ejemplo/${src}`, alt, origen: "ia" as const });

export default defineSiteConfig({
  negocio: {
    nombre: "Albenca Aluminio",
    nombreLegal: "Albenca Carpintería de Aluminio, S.L.",
    nif: "B98431267", // FICTICIO: dígito de control inválido a propósito (el válido sería 5)
    sector: "Ventanas de aluminio y PVC",
    descripcionCorta: "Medimos, fabricamos en nuestro taller de Alboraya e instalamos ventanas, cerramientos y persianas en L'Horta Nord.",
    anioFundacion: 2004,
    registroMercantil: "Registro Mercantil de Valencia, tomo 0000, folio 00, hoja V-00000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600111401",
    whatsapp: "+34600111401",
    email: "taller@albenca-aluminio.example",
    direccion: { calle: "Calle Ejemplo 14, nave 3", cp: "46120", ciudad: "Alboraya", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "19:00" },
    ],
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000401",
  },
  zonas: ["Alboraya", "Valencia", "Meliana", "Almàssera", "Tavernes Blanques", "Massamagrell", "Foios", "Vinalesa", "Bonrepòs i Mirambell"],
  servicios: [
    {
      titulo: "Ventanas de aluminio con rotura de puente térmico",
      slug: "ventanas-aluminio-rpt",
      descripcion: "Perfiles con rotura de puente térmico que no dejan pasar el frío ni el calor por el marco.",
      precioDesde: "desde 390 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "La rotura de puente térmico es una pieza aislante que separa la cara de dentro del perfil de la cara de fuera. Así el marco no se enfría en invierno ni quema en verano, y se acaba la condensación en el cristal.",
        "Trabajamos con sistemas Cortizo y Strugal. Te enseñamos el perfil cortado en la visita para que veas lo que vas a poner en casa.",
        "Cada ventana se fabrica en el taller con las medidas que tomamos en tu hueco, sin piezas de catálogo que haya que forzar.",
      ],
      incluye: ["Medición en casa", "Perfil con RPT y doble acristalamiento", "Desmontaje de la ventana vieja", "Instalación y sellado", "Ajuste a las pocas semanas"],
      imagenes: [ia("servicio-rpt-detalle.jpg", "Canto de un perfil de aluminio con rotura de puente térmico, visto desde arriba")],
      preguntas: [
        { pregunta: "¿Se nota tanto el cambio?", respuesta: "Sí, sobre todo junto a la ventana: el marco deja de estar frío y desaparece el agua en el cristal por las mañanas." },
        { pregunta: "¿Qué marca de perfil ponéis?", respuesta: "Cortizo o Strugal, según el hueco y el presupuesto. Te lo dejamos escrito en el presupuesto." },
      ],
    },
    {
      titulo: "Ventanas de PVC",
      slug: "ventanas-pvc",
      descripcion: "Ventanas de PVC blancas o en color madera, que aíslan bien y casi no piden mantenimiento.",
      precioDesde: "desde 340 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "El PVC aísla bien por sí mismo y es una buena opción cuando buscas ahorro y poco mantenimiento.",
        "Fabricamos oscilobatientes, correderas y balconeras en blanco, gris o imitación madera.",
      ],
      incluye: ["Medición en casa", "Perfil de PVC multicámara", "Instalación y sellado", "Retirada de la ventana vieja"],
      imagenes: [ia("servicio-pvc.jpg", "Ventana de PVC blanca vista de frente")],
      preguntas: [{ pregunta: "¿El PVC amarillea?", respuesta: "Los perfiles actuales llevan protección contra el sol y mantienen el color durante muchos años." }],
    },
    {
      titulo: "Correderas elevables",
      slug: "correderas-elevables",
      descripcion: "Grandes correderas que se levantan al abrir y cierran con un sellado firme contra el aire.",
      contenido: [
        "Una corredera elevable sube la hoja unos milímetros al girar la manilla y la apoya sobre la junta al cerrar. Así se mueve con suavidad y no entra aire.",
        "Es la solución para salidas a terraza y huecos grandes.",
      ],
      incluye: ["Medición en casa", "Corredera elevable a medida", "Instalación con umbral", "Ajuste final"],
      imagenes: [ia("servicio-elevable.jpg", "Corredera elevable abierta vista de frente")],
      preguntas: [{ pregunta: "¿Pesa mucho al abrir?", respuesta: "No. El herraje levanta la hoja y se desliza con una mano." }],
    },
    {
      titulo: "Cerramientos de terraza",
      slug: "cerramientos-terraza",
      descripcion: "Cerramos tu terraza con correderas o paneles plegables para ganar una habitación más.",
      contenido: [
        "Antes de cerrar una terraza revisamos qué permite tu comunidad y te ayudamos con lo que tengas que presentar.",
        "Fabricamos el cerramiento con el mismo perfil del resto de ventanas para que la fachada quede uniforme.",
      ],
      incluye: ["Visita y medición", "Cerramiento a medida", "Instalación y sellado"],
      imagenes: [ia("obra-03-cerramiento-tavernes.jpg", "Cerramiento de terraza en un tercer piso visto de frente")],
      preguntas: [{ pregunta: "¿Necesito permiso de la comunidad?", respuesta: "Normalmente sí. Te explicamos qué tienes que pedir antes de fabricar." }],
    },
    {
      titulo: "Persianas y cajones",
      slug: "persianas",
      descripcion: "Cambiamos persianas y cajones viejos por lamas nuevas de PVC o aluminio, manuales o con motor.",
      precioDesde: "desde 180 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Un cajón viejo deja pasar aire y ruido. Lo cambiamos por uno aislado y montamos lamas nuevas.",
        "Si quieres, ponemos motor para subir y bajar la persiana con un botón.",
      ],
      incluye: ["Medición", "Lamas y cajón nuevos", "Motor opcional", "Retirada de la persiana vieja"],
      imagenes: [], // sin foto a propósito: prueba la ficha rayada
      preguntas: [{ pregunta: "¿Se puede motorizar la persiana que ya tengo?", respuesta: "Muchas veces sí. Lo miramos en la visita." }],
    },
    {
      titulo: "Ventanas contra el ruido de la calle",
      slug: "ventanas-ruido",
      descripcion: "Doble acristalamiento laminado y buenas juntas para dormir sin oír la calle.",
      contenido: [
        "El ruido entra por el cristal y por las rendijas. Montamos doble acristalamiento con vidrio laminado y cuidamos las juntas del marco y del cajón de la persiana.",
        "En la visita miramos de dónde viene el ruido y te proponemos solo lo que hace falta.",
      ],
      incluye: ["Visita y medición", "Vidrio laminado con cámara", "Juntas nuevas", "Sellado del cajón"],
      imagenes: [ia("servicio-ruido.jpg", "Canto de un doble acristalamiento laminado con su cámara")],
      preguntas: [{ pregunta: "¿Basta con cambiar el cristal?", respuesta: "A veces no: si el marco no cierra bien, el ruido entra por las juntas. Lo revisamos todo." }],
    },
    {
      titulo: "Cambio de ventanas sin obra",
      slug: "cambio-sin-obra",
      descripcion: "Montamos la ventana nueva sobre el marco viejo, sin picar paredes ni ensuciar la casa.",
      contenido: [
        "Si el marco viejo está sano, colocamos la ventana nueva encima. No se pica, no hay escombro y la mayoría de casas quedan listas en un día.",
        "Tapamos muebles y suelo y nos llevamos las ventanas viejas.",
      ],
      incluye: ["Revisión del marco viejo", "Ventana nueva sobre el premarco", "Remates interiores y exteriores", "Limpieza al terminar"],
      imagenes: [ia("servicio-sin-obra.jpg", "Marco nuevo de aluminio colocado sobre el premarco viejo con cinta de carrocero")],
      preguntas: [{ pregunta: "¿Se pierde luz?", respuesta: "Muy poca: el marco nuevo es estrecho y se ajusta al hueco." }],
    },
  ],
  trabajos: [
    {
      titulo: "Corredera de salón en Alboraya", ubicacion: "Alboraya", anio: 2025, superficie: "6 m²", duracion: "1 día", servicio: "ventanas-aluminio-rpt",
      descripcion: "Cambio de una corredera de dos hojas sin rotura de puente térmico por una nueva con RPT y doble acristalamiento.",
      contenido: ["La corredera antigua dejaba pasar aire por la guía de abajo y el cristal sudaba cada mañana. Montamos una corredera nueva sobre el mismo hueco y sellamos el contorno por fuera y por dentro.", "Terminamos en el día y dejamos el salón recogido."],
      imagenes: [ia("obra-01-corredera-alboraya.jpg", "Corredera blanca nueva de aluminio en un hueco de salón con fachada de revoco blanco")],
      testimonio: { autor: "Carmen, Alboraya", texto: "Llegaron a las ocho y a las cuatro ya estaba todo montado y limpio." },
    },
    {
      titulo: "Cuatro oscilobatientes en Meliana", ubicacion: "Meliana", anio: 2025, superficie: "8 m²", duracion: "2 días", servicio: "ventanas-aluminio-rpt",
      descripcion: "Cuatro ventanas oscilobatientes en antracita sobre una fachada de ladrillo caravista, con persianas nuevas.",
      contenido: ["Las ventanas viejas eran correderas de aluminio anodizado y la persiana de la habitación principal estaba rota. Las cambiamos por oscilobatientes con RPT en color antracita."],
      imagenes: [ia("obra-02-oscilobatiente-meliana.jpg", "Ventana oscilobatiente antracita en una fachada de ladrillo caravista")],
      antes: ia("obra-02-antes.jpg", "La misma ventana antes: corredera vieja de aluminio anodizado y persiana rota"),
    },
    {
      titulo: "Cerramiento de terraza en Tavernes Blanques", ubicacion: "Tavernes Blanques", anio: 2024, superficie: "14 m²", duracion: "3 días", servicio: "cerramientos-terraza",
      descripcion: "Cerramiento de una terraza de tercer piso con correderas de tres hojas.",
      contenido: ["La terraza se usaba como trastero porque entraba polvo y lluvia. Ahora es una habitación más con luz de todo el día."],
      imagenes: [ia("obra-03-cerramiento-tavernes.jpg", "Cerramiento de terraza en un tercer piso visto de frente")],
    },
    {
      titulo: "Persianas de un piso en Benimaclet", ubicacion: "Benimaclet, Valencia", anio: 2026, duracion: "1 día", servicio: "persianas",
      descripcion: "Cambio de cajones y lamas de todas las persianas de un piso.",
      contenido: ["Seis persianas con cajones nuevos aislados y lamas de PVC."],
      imagenes: [ia("obra-04-persiana-benimaclet.jpg", "Cajón y persiana nuevos de lamas de PVC")],
    },
    {
      titulo: "Balconera de PVC en Massamagrell", ubicacion: "Massamagrell", anio: 2024, superficie: "4 m²",
      descripcion: "Balconera de PVC en imitación madera para una casa de pueblo.",
      contenido: ["Una balconera de dos hojas en PVC imitación madera, a juego con la puerta de la calle."],
      imagenes: [ia("obra-05-balconera-massamagrell.jpg", "Balconera de PVC imitación madera en una casa de pueblo")],
    },
  ],
  valoracion: { media: 4.8, total: 63 },
  resenas: [
    { autor: "Inma R.", puntuacion: 5, fecha: "2026-10", fuente: "google", texto: "Vinieron a medir el martes y el presupuesto llegó el miércoles por escrito." },
    { autor: "Pau M.", puntuacion: 5, fecha: "2026-09-14", fuente: "google", texto: "Vivo en un segundo piso que da a la avenida y el ruido de los autobuses no me dejaba dormir. Toni vino a medir, me explicó la diferencia entre un vidrio normal y uno laminado y me lo dejó todo por escrito. Montaron las cuatro ventanas en un solo día, taparon los muebles y se llevaron las viejas. A las dos semanas una hoja rozaba un poco y vinieron a ajustarla sin que tuviera que insistir. Ahora duermo con la ventana cerrada y no oigo la calle." },
    { autor: "Rosa L.", puntuacion: 4, fecha: "2026-07", fuente: "google", texto: "Buen trabajo; tardaron una semana más de lo previsto en fabricar." },
    { autor: "Jordi S.", puntuacion: 5, fecha: "2026-05", fuente: "google", texto: "Limpios." },
    { autor: "Amparo V.", puntuacion: 5, fecha: "2026-03-02", fuente: "google", texto: "Cambiaron las persianas de todo el piso. Ahora suben sin esfuerzo y no entra aire por el cajón. Muy amables y puntuales." },
  ],
  proceso: [
    { titulo: "Medición en casa", texto: "Vamos a tu casa, medimos cada hueco y miramos el estado del premarco y de la persiana." },
    { titulo: "Presupuesto por escrito", texto: "En uno o dos días te mandamos el presupuesto cerrado, con el perfil, el vidrio y el plazo." },
    { titulo: "Fabricación en el taller", texto: "Cortamos y montamos tus ventanas en nuestra nave con las medidas de tu hueco." },
    { titulo: "Instalación", texto: "Montamos en el día siempre que se puede, sellamos el contorno y dejamos la casa limpia." },
    { titulo: "Ajuste y revisión", texto: "Volvemos a las pocas semanas para ajustar las hojas y comprobar que todo cierra bien." },
  ],
  acreditaciones: [
    { nombre: "Fabricante homologado de sistemas Cortizo" }, // ACREDITACIÓN FICTICIA: borrar en la web del cliente
  ],
  garantias: ["Presupuesto cerrado antes de empezar", "Plazo de entrega por escrito", "Volvemos a ajustar sin coste el primer año", "Retiramos y reciclamos las ventanas viejas"],
  marcas: ["Cortizo", "Strugal", "Technal", "Somfy"],
  empresa: {
    historia: [
      "Albenca empezó en 2004 como un pequeño taller de Alboraya que montaba correderas para los pisos del barrio. Hoy seguimos en la misma nave con la misma idea: medir bien, fabricar aquí y montar nosotros.",
      "No subcontratamos el montaje. El mismo equipo que corta los perfiles va a tu casa a instalarlos y, si algo no cierra como debe, vuelve a ajustarlo.",
    ],
    imagenes: [
      ia("proceso-medicion.jpg", "Flexómetro midiendo un hueco de ventana"),
      ia("taller-mesa-corte.jpg", "Tronzadora y perfiles de aluminio cortados con virutas"),
      ia("taller-perfiles.jpg", "Perfiles de aluminio ordenados en el estante del taller"),
    ],
    equipo: [
      { nombre: "Toni", cargo: "Medición y presupuestos" },
      { nombre: "Lucía", cargo: "Oficina" },
      { nombre: "Rafa", cargo: "Montaje" },
    ],
  },
  imagenesHero: [],
  galeria: [],
  preguntas: [
    { pregunta: "¿Se puede cambiar una ventana sin obra?", respuesta: "Casi siempre. Si el marco viejo está sano, montamos la ventana nueva encima sin picar." },
    { pregunta: "¿Cuánto tardáis en fabricar?", respuesta: "Te damos el plazo por escrito con el presupuesto. Suele ser de tres a cuatro semanas." },
    { pregunta: "¿Qué es la rotura de puente térmico?", respuesta: "Una pieza aislante dentro del perfil que separa la cara de dentro de la de fuera, para que el frío no pase por el marco." },
    { pregunta: "¿Dejáis la casa limpia?", respuesta: "Sí. Tapamos muebles y suelo, recogemos al terminar y nos llevamos las ventanas viejas." },
  ],
  seo: {
    titulo: "Ventanas de aluminio y PVC en Alboraya | Albenca",
    descripcion: "Medimos, fabricamos e instalamos ventanas de aluminio y PVC, cerramientos y persianas en Alboraya y L'Horta Nord.",
    url: "https://albenca-aluminio.example",
  },
});

// Variante «datos mínimos» (encargo §11): sin trabajos, galeria, imagenesHero, imagenes, contenido,
// incluye ni precioDesde de servicios; sin proceso, garantias, acreditaciones, marcas, empresa,
// preguntas, anioFundacion ni logo. 3 servicios con título y descripción.
