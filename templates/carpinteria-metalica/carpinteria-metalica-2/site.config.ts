import { defineSiteConfig } from "@andrei-leads/core";

// Datos de ejemplo de carpinteria-metalica-2 «Exposición». Todo es ficticio.
// Exposición en Paterna (l'Horta Nord). Sin ayudas ni subvenciones con fechas.

export default defineSiteConfig({
  negocio: {
    nombre: "Aluminios Ejemplo",
    nombreLegal: "Aluminios Ejemplo SL",
    nif: "B11223344",
    sector: "Ventanas, cerramientos y toldos",
    descripcionCorta:
      "Exposición de ventanas de aluminio y PVC, cerramientos, toldos y mamparas en Paterna. Medimos, fabricamos e instalamos.",
    anioFundacion: 1998,
    registroMercantil: "Inscrita en el Registro Mercantil de Valencia, tomo 0000, folio 00, hoja V-00000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness", "Store"],
  },
  contacto: {
    telefono: "+34600000007",
    whatsapp: "+34600000007",
    email: "info@ejemplo.com",
    direccion: { calle: "Avenida de Ejemplo 45", cp: "46980", ciudad: "Paterna", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "09:00", cierra: "13:30" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:30", cierra: "20:00" },
      { dias: ["sabado"], abre: "10:00", cierra: "13:30" },
    ],
    coordenadas: { lat: 39.5027, lng: -0.4404 },
    mensajeWhatsapp: "Hola, os escribo desde vuestra web. Quería preguntaros por:",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000007",
  },
  zonas: ["Paterna", "Burjassot", "Godella", "Rocafort", "Bétera", "La Cañada", "L'Eliana", "Manises", "Valencia (Benicalap y Campanar)"],
  valoracion: { media: 4.7, total: 89 },
  imagenesHero: [
    { src: "/ejemplo/hero-exposicion.jpg", alt: "Interior de una exposición de ventanas con varios modelos de aluminio y PVC montados" },
  ],
  servicios: [
    {
      titulo: "Ventanas de aluminio",
      descripcion: "Correderas y oscilobatientes con rotura de puente térmico, en el color que elijas.",
      contenido: [
        "Cambiamos tus ventanas por otras de aluminio con rotura de puente térmico: aíslan del frío, del calor y del ruido de la calle.",
        "En la exposición puedes ver los perfiles cortados, abrir y cerrar cada modelo y elegir el color del lacado con la muestra en la mano.",
      ],
      incluye: ["Medición en tu casa", "Perfil con rotura de puente térmico", "Doble vidrio con cámara", "Retirada de la ventana vieja", "Instalación y sellado"],
      imagenes: [
        { src: "/ejemplo/cat-ventanas-aluminio.jpg", alt: "Ventana corredera de aluminio gris antracita en un salón" },
        { src: "/ejemplo/cat-ventanas-aluminio-2.jpg", alt: "Perfil de aluminio cortado con rotura de puente térmico" },
        { src: "/ejemplo/cat-ventanas-aluminio-3.jpg", alt: "Muestrario de colores de lacado" },
        { src: "/ejemplo/cat-ventanas-aluminio-4.jpg", alt: "Ventana oscilobatiente de aluminio abierta en abatible" },
      ],
      preguntas: [
        { pregunta: "¿Hay que hacer obra para cambiar las ventanas?", respuesta: "Normalmente no: se cambia sobre el mismo hueco y en el día. Te lo confirmamos al medir." },
      ],
      mensajeWhatsapp: "Hola, quiero presupuesto para cambiar ventanas por unas de aluminio. Os envío foto del hueco:",
      precioDesde: "desde 290 €/ud", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Ventanas de PVC",
      descripcion: "Máximo aislamiento térmico y acústico, en blanco o imitación madera.",
      imagenes: [{ src: "/ejemplo/cat-ventanas-pvc.jpg", alt: "Ventana oscilobatiente de PVC blanco abierta en abatible" }],
      precioDesde: "desde 260 €/ud", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cerramientos de terraza",
      descripcion: "Cierra la terraza con correderas o cortinas de cristal y gana una habitación.",
      imagenes: [{ src: "/ejemplo/cat-cerramientos.jpg", alt: "Terraza cerrada con correderas de aluminio y cristal" }],
      precioDesde: "desde 1.500 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Toldos",
      descripcion: "Toldos de brazo, cofre y estor, manuales o con motor.",
      imagenes: [{ src: "/ejemplo/cat-toldos.jpg", alt: "Toldo de brazo extensible desplegado sobre una terraza" }],
    },
    {
      titulo: "Mamparas de baño",
      descripcion: "Mamparas de ducha y bañera a medida, fijas, correderas o abatibles.",
      imagenes: [{ src: "/ejemplo/cat-mamparas.jpg", alt: "Mampara de ducha de cristal templado con perfil negro" }],
      precioDesde: "desde 240 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Puertas de entrada",
      descripcion: "Puertas de aluminio para chalets y casas, con buen aislamiento.",
      imagenes: [{ src: "/ejemplo/cat-puertas.jpg", alt: "Puerta de entrada de aluminio en gris oscuro con fijo lateral de cristal" }],
    },
    {
      titulo: "Mosquiteras",
      descripcion: "Enrollables, correderas o plisadas, a la medida de tu ventana.",
    },
    {
      titulo: "Cristalería a medida",
      descripcion: "Cristales, espejos y vidrios de seguridad cortados a medida.",
    },
  ],
  trabajos: [
    {
      titulo: "Cambio de ventanas en un piso de Paterna",
      descripcion: "Seis ventanas de aluminio con rotura de puente térmico en lugar de las correderas antiguas.",
      ubicacion: "Paterna",
      anio: 2026,
      servicio: "ventanas-de-aluminio",
      duracion: "1 día",
      precio: "entre 2.000 y 2.500 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "El piso daba a una avenida con mucho tráfico. Cambiamos las seis ventanas en un solo día, sin obra, y el ruido bajó muchísimo.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-paterna.jpg", alt: "Dormitorio con ventana nueva de aluminio blanco" }],
      antes: { src: "/ejemplo/trabajo-paterna-antes.jpg", alt: "La misma ventana antigua de aluminio sin rotura de puente térmico" },
      testimonio: { autor: "Mari Carmen L.", texto: "Fuimos a la exposición un sábado, elegimos el color allí y en dos semanas las teníamos puestas." },
    },
    {
      titulo: "Cerramiento de terraza en Burjassot",
      descripcion: "Terraza de 12 m² cerrada con correderas de tres hojas.",
      ubicacion: "Burjassot",
      anio: 2026,
      servicio: "cerramientos-de-terraza",
      superficie: "12 m²",
      duracion: "2 días",
      contenido: [
        "Era una terraza abierta que apenas se usaba en invierno. Con las correderas de tres hojas ahora es una zona más del salón.",
      ],
      imagenes: [
        { src: "/ejemplo/trabajo-burjassot.jpg", alt: "Terraza cerrada con correderas de aluminio y vistas a la calle" },
        { src: "/ejemplo/trabajo-burjassot-2.jpg", alt: "Detalle de las guías de la corredera" },
        { src: "/ejemplo/trabajo-burjassot-3.jpg", alt: "La terraza cerrada vista desde el salón" },
        { src: "/ejemplo/trabajo-burjassot-4.jpg", alt: "Cerramiento con las tres hojas recogidas" },
      ],
    },
    {
      titulo: "Mampara a medida en Godella",
      descripcion: "Mampara de ducha fija con perfil negro en un baño reformado.",
      ubicacion: "Godella",
      anio: 2025,
      servicio: "mamparas-de-bano",
      imagenes: [{ src: "/ejemplo/trabajo-godella.jpg", alt: "Ducha con mampara fija de cristal y perfil negro" }],
    },
    {
      titulo: "Toldo con motor en Rocafort",
      descripcion: "Toldo de cofre de 5 metros con motor y mando para la terraza de un chalet.",
      ubicacion: "Rocafort",
      anio: 2025,
      servicio: "toldos",
      imagenes: [{ src: "/ejemplo/trabajo-rocafort.jpg", alt: "Toldo de cofre desplegado sobre la terraza de un chalet" }],
    },
  ],
  resenas: [
    { autor: "Mari Carmen L.", texto: "Fuimos a ver las ventanas a la exposición y nos explicaron todo sin prisas. Instalación limpia y en un día.", puntuacion: 5, fecha: "2026-09-25", fuente: "google" },
    { autor: "Jorge F.", texto: "Mampara perfecta y a medida.", puntuacion: 5, fecha: "2026-09-02", fuente: "google" },
    { autor: "Amparo V.", texto: "Pedí presupuesto en tres sitios. Aquí pude ver los perfiles cortados, los colores y hasta abrir las ventanas. El precio fue el que nos dijeron y vinieron el día acordado. Ahora en casa no se oye el tráfico.", puntuacion: 5, fecha: "2026-08-14", fuente: "google" },
    { autor: "Pablo S.", texto: "Buen producto; el toldo tardó una semana más de lo previsto.", puntuacion: 4, fecha: "2026-06-20", fuente: "google" },
  ],
  marcas: ["Cortizo", "Strugal", "Veka", "Gaviota"], // MARCAS DE EJEMPLO: poner solo las que trabaje el cliente
  garantias: [
    "Presupuesto por escrito tras medir",
    "Instalación por nuestro propio equipo",
    "Retirada de las ventanas viejas",
    "Garantía de fabricación e instalación",
    "Seguro de responsabilidad civil",
  ],
  empresa: {
    historia: [
      "Abrimos la exposición de Paterna en 1998. Desde entonces medimos, fabricamos e instalamos ventanas, cerramientos y toldos en l'Horta Nord.",
      "En la tienda tienes montados los modelos más habituales para que los abras, los compares y elijas color con la muestra en la mano.",
    ],
    imagenes: [
      { src: "/ejemplo/expo-1.jpg", alt: "Fachada de una tienda de ventanas con escaparate" },
      { src: "/ejemplo/expo-2.jpg", alt: "Muestrario de colores de perfiles de aluminio en una pared" },
      { src: "/ejemplo/expo-3.jpg", alt: "Mampara de ducha expuesta en una tienda" },
    ],
    equipo: [
      { nombre: "Ricardo", cargo: "Fundador y medición", foto: { src: "/ejemplo/equipo-ricardo.jpg", alt: "Ricardo en la exposición" } },
      { nombre: "Elena", cargo: "Atención en la exposición", foto: { src: "/ejemplo/equipo-elena.jpg", alt: "Elena junto al muestrario de colores" } },
      { nombre: "Dani", cargo: "Instalación" }, // sin foto a propósito: muestra la variante con iniciales
    ],
  },
  preguntas: [
    { pregunta: "¿Hace falta cita para ir a la exposición?", respuesta: "No. Ven en el horario de tienda; si quieres que te atienda alguien en concreto, llama antes." },
    { pregunta: "¿Venís a medir a casa?", respuesta: "Sí. Medimos en tu casa y te damos el presupuesto por escrito." },
    { pregunta: "¿Cuánto se tarda en fabricar?", respuesta: "Depende del producto; te damos el plazo en el presupuesto." },
    { pregunta: "¿Aluminio o PVC?", respuesta: "Los dos aíslan bien. En la exposición te enseñamos la diferencia y te ayudamos a elegir." },
  ],
  seo: {
    titulo: "Ventanas de aluminio y PVC en Paterna | Aluminios Ejemplo",
    descripcion: "Exposición de ventanas, cerramientos, toldos y mamparas en Paterna. Ven a ver muestras. Medimos, fabricamos e instalamos.",
    url: "https://ejemplo.com",
  },
  redes: { instagram: "https://instagram.com/ejemplo", facebook: "https://facebook.com/ejemplo" },
});
