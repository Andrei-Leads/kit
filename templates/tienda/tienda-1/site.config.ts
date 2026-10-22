import { defineSiteConfig } from "@andrei-leads/core";

// Datos de ejemplo de tienda-1 «Almacén». Todo es ficticio y genérico: almacén de herrajes
// para carpintería de aluminio y PVC en Madrid. Las familias completan su ficha en lib/catalogo.ts
// (mismo slug). Fotos de relleno en public/ejemplo/ (ver CREDITOS.md).

export default defineSiteConfig({
  negocio: {
    nombre: "Herrajes Ejemplo",
    nombreLegal: "Herrajes Ejemplo SL",
    nif: "B00000000",
    sector: "Almacén de herrajes de aluminio y PVC",
    descripcionCorta:
      "Herrajes, cerraduras y accesorios para ventanas y puertas de aluminio y PVC. Venta a profesionales y particulares en Madrid.",
    anioFundacion: 1986,
    registroMercantil: "Inscrita en el Registro Mercantil de Madrid, tomo 0000, folio 00, hoja M-000000 (ficticio)",
    tipoSchema: ["Store", "HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000000",
    whatsapp: "+34600000000",
    email: "info@ejemplo.com",
    direccion: { calle: "Calle de Ejemplo 12, nave 3", cp: "28031", ciudad: "Madrid", provincia: "Madrid" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "15:30", cierra: "18:30" },
      { dias: ["sabado"], abre: "09:00", cierra: "13:00" },
    ],
    coordenadas: { lat: 40.3721, lng: -3.6205 },
    mensajeWhatsapp: "Hola, os escribo desde vuestra web. Busco esta pieza:",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000000",
  },
  zonas: ["Madrid", "Vallecas", "Rivas-Vaciamadrid", "Getafe", "Leganés"],
  valoracion: { media: 4.6, total: 58 },
  imagenesHero: [
    { src: "/ejemplo/hero-bodegon-1.png", alt: "Bodegón de herrajes de aluminio y PVC: bisagras, manillas, cremonas y ruedas de corredera" },
    { src: "/ejemplo/hero-bodegon-2.png", alt: "Mano con un móvil fotografiando una manilla desgastada, con piezas nuevas alrededor" },
  ],
  servicios: [
    {
      titulo: "Herrajes de aluminio",
      descripcion: "Cierres, cremonas, escuadras y bisagras para ventanas y puertas de aluminio.",
      contenido: [
        "Herraje para practicables, correderas y puertas de las series más habituales del mercado.",
        "Si no sabes la referencia, tráenos la pieza vieja o mándanos una foto y te buscamos la equivalente.",
      ],
      incluye: ["Cierres y cremonas", "Escuadras de unión", "Bisagras de ventana y puerta", "Tornillería"],
      imagenes: [
        { src: "/ejemplo/familia-herrajes-de-aluminio.jpg", alt: "Herrajes de aluminio sobre fondo gris claro" },
        { src: "/ejemplo/familia-herrajes-de-aluminio-contexto.jpg", alt: "Cremona montada en una ventana practicable de aluminio" },
      ],
      preguntas: [
        { pregunta: "¿Tenéis herraje para series antiguas?", respuesta: "Muchas veces sí, o una pieza equivalente. Mándanos foto de la pieza y de la ventana." },
      ],
      precioDesde: "desde 3 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Herrajes de PVC",
      descripcion: "Herraje perimetral oscilobatiente, compases y cierres para ventanas de PVC.",
      contenido: ["Kits completos y piezas sueltas para reparar ventanas y balconeras de PVC."],
      imagenes: [
        { src: "/ejemplo/familia-herrajes-de-pvc.jpg", alt: "Herrajes de PVC sobre fondo gris claro" },
        { src: "/ejemplo/familia-herrajes-de-pvc-contexto.jpg", alt: "Compás de herraje oscilobatiente en una ventana de PVC" },
      ],
    },
    {
      titulo: "Cerraduras y cilindros",
      descripcion: "Cerraduras de embutir y de sobreponer, cilindros de seguridad y cerraderos.",
      imagenes: [
        { src: "/ejemplo/familia-cerraduras-y-cilindros.jpg", alt: "Cerraduras y cilindros sobre fondo gris claro" },
        { src: "/ejemplo/familia-cerraduras-y-cilindros-contexto.jpg", alt: "Cerradura montada en una puerta de aluminio" },
      ],
    },
    {
      titulo: "Bisagras y pernios",
      descripcion: "Bisagras de ventana, de puerta y de corredera, pernios y tapetas.",
      imagenes: [{ src: "/ejemplo/familia-bisagras-y-pernios.jpg", alt: "Bisagras y pernios sobre fondo gris claro" }],
    },
    {
      titulo: "Manillas y tiradores",
      descripcion: "Manillas de ventana y de puerta, tiradores y uñeros en varios acabados.",
      imagenes: [{ src: "/ejemplo/familia-manillas-y-tiradores.jpg", alt: "Manillas y tiradores sobre fondo gris claro" }],
    },
    {
      titulo: "Ruedas y rodamientos",
      descripcion: "Ruedas y rodamientos para correderas de aluminio y PVC.",
      imagenes: [{ src: "/ejemplo/familia-ruedas-y-rodamientos.jpg", alt: "Ruedas de corredera sobre fondo gris claro" }],
    },
    {
      titulo: "Juntas y felpudos",
      descripcion: "Juntas de goma, felpudos y burletes para cerrar el paso del aire y del ruido.",
      imagenes: [{ src: "/ejemplo/familia-juntas-y-felpudos.jpg", alt: "Rollos de junta y felpudo sobre fondo gris claro" }],
    },
    {
      titulo: "Persiana y mosquitera",
      descripcion: "Lamas, cintas, recogedores y accesorios de persiana y mosquitera.",
      imagenes: [{ src: "/ejemplo/familia-persiana-y-mosquitera.jpg", alt: "Accesorios de persiana sobre fondo gris claro" }],
    },
  ],
  resenas: [
    { autor: "Javier M.", texto: "Llevé la cremona rota y en cinco minutos tenía la equivalente. Muy buen trato.", puntuacion: 5, fecha: "2026-09-12", fuente: "google" },
    { autor: "Carpintería R.", texto: "Les compro casi todo el herraje de las obras. Si no lo tienen, lo piden.", puntuacion: 5, fecha: "2026-07-03", fuente: "google" },
    { autor: "Lucía G.", texto: "Mandé foto por WhatsApp de una rueda de corredera y me la apartaron.", puntuacion: 4, fecha: "2026-05-21", fuente: "google" },
  ],
  proceso: [
    { titulo: "Mándanos una foto", texto: "Haz una foto de la pieza rota o de su etiqueta y envíanosla por WhatsApp." },
    { titulo: "La identificamos en el mostrador", texto: "Tráenos la pieza vieja y la comparamos con lo que tenemos en el almacén." },
    { titulo: "Atención a profesionales", texto: "Carpinteros e instaladores: preparamos pedidos completos para cada obra." },
    { titulo: "Listo para recoger", texto: "Si está en stock, te la apartamos y pasas a recogerla cuando te venga bien." },
  ],
  marcas: ["Marca Uno", "Marca Dos", "Marca Tres", "Marca Cuatro", "Marca Cinco", "Marca Seis", "Marca Siete", "Marca Ocho"], // MARCAS DE EJEMPLO: poner solo las que distribuya el cliente
  empresa: {
    historia: [
      "Abrimos el almacén en 1986 para dar servicio a los carpinteros de aluminio del barrio.",
      "Hoy atendemos a profesionales y a particulares que necesitan una pieza concreta.",
      "Si no sabes cómo se llama lo que buscas, tráenos la pieza vieja o mándanos una foto: entre el mostrador y el almacén, casi siempre damos con ella o con una equivalente.",
    ],
    imagenes: [
      { src: "/ejemplo/fachada.jpg", alt: "Fachada del almacén: nave con persiana metálica abierta" },
      { src: "/ejemplo/almacen.jpg", alt: "Interior del almacén con estanterías altas llenas de cajetines" },
      { src: "/ejemplo/mostrador.jpg", alt: "Mostrador del almacén atendiendo a un cliente profesional" },
    ],
  },
  preguntas: [
    { pregunta: "¿Vendéis a particulares?", respuesta: "Sí. Atendemos a profesionales y a particulares en el mostrador." },
    { pregunta: "¿Cómo sé qué pieza necesito?", respuesta: "Tráenos la pieza vieja o mándanos una foto por WhatsApp y te ayudamos a identificarla." },
    { pregunta: "¿Hacéis envíos?", respuesta: "Pregúntanos por WhatsApp o por teléfono según la pieza y la zona." },
  ],
  seo: {
    titulo: "Herrajes de aluminio y PVC en Madrid | Herrajes Ejemplo",
    descripcion: "Almacén de herrajes, cerraduras y accesorios para ventanas y puertas de aluminio y PVC en Madrid. Mándanos foto de la pieza.",
    url: "https://ejemplo.com",
  },
  redes: { instagram: "https://instagram.com/ejemplo" },
});
