// Datos de ejemplo de «Galería» (carpinteria-madera-4): negocio FICTICIO del Poblenou, en Barcelona
// (encargo §11), con el patrón ficticio evidente del kit (Calle Ejemplo, dominio .example, cid de
// ceros, registro «(ficticio)», nombre legal con «Ejemplo»). NIF de ejemplo con dígito de control
// inválido. Fotos de public/ejemplo/: relleno pendiente de las fotos de IA (CREDITOS.md), todas con
// origen "ia". Sin seo.indexar ni analítica: las activa cada web, nunca el template. Sin precios: el
// diseño funciona sin ellos (si se añaden, cada uno con su comentario de precio ficticio).
import { defineSiteConfig, type Imagen } from "@andrei-leads/core";

const ia = (src: string, alt: string): Imagen => ({ src: `/ejemplo/${src}`, alt, origen: "ia" });

export default defineSiteConfig({
  negocio: {
    nombre: "Obrador Mallol",
    nombreLegal: "Obrador Mallol Ejemplo, S.L.",
    nif: "B08245178", // ficticio: el dígito de control no corresponde a propósito (el correcto sería 7)
    sector: "Carpintería y mobiliario a medida",
    descripcionCorta: "Obrador de carpintería en el Poblenou. Cocinas, armarios y muebles de madera a medida para casas de Barcelona.",
    anioFundacion: 2011,
    registroMercantil: "Registro Mercantil de Barcelona, tomo 0000, folio 00, hoja B-000000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000604",
    whatsapp: "+34600000604",
    email: "obrador@mallol.example",
    direccion: { calle: "Calle Ejemplo, 112, bajos", cp: "08005", ciudad: "Barcelona", provincia: "Barcelona" },
    horario: [{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:30", cierra: "17:30" }],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000604", // ficticio
  },
  zonas: [
    "Barcelona",
    "L'Hospitalet de Llobregat",
    "Sant Cugat del Vallès",
    "Badalona",
    "Esplugues de Llobregat",
    "Sant Just Desvern",
    "Cornellà de Llobregat",
    "El Prat de Llobregat",
  ],
  servicios: [
    {
      titulo: "Cocinas",
      slug: "cocinas",
      descripcion: "Cocinas de madera y lacadas, diseñadas con tu interiorista o con nosotros.",
      contenido: ["Fabricamos cada módulo en el obrador.", "Coordinamos con marmolista y electricista."],
      incluye: ["Diseño", "Fabricación", "Montaje"],
      imagenes: [ia("cocina-fresno-gracia.jpg", "Cocina de fresno con encimera de mármol")],
    },
    {
      titulo: "Armarios y vestidores",
      slug: "armarios-y-vestidores",
      descripcion: "De suelo a techo, también en pisos con molduras.",
      imagenes: [ia("armario-roble-eixample.jpg", "Armario de roble con molduras")],
    },
    {
      titulo: "Mesas y aparadores",
      slug: "mesas-y-aparadores",
      descripcion: "Mobiliario de madera maciza a medida.",
      imagenes: [ia("hero-aparador-nogal.jpg", "Aparador de nogal")],
    },
    {
      titulo: "Estanterías y librerías",
      slug: "estanterias",
      descripcion: "Estanterías de pared y librerías de suelo a techo.",
      imagenes: [ia("estanteria-modular.jpg", "Estantería de nogal")],
    },
    {
      titulo: "Revestimientos de lamas y paneles",
      slug: "revestimientos",
      descripcion: "Paredes y techos de madera, con puertas enrasadas que desaparecen.",
      imagenes: [ia("lamas-roble-poblenou.jpg", "Pared de lamas de roble con una puerta enrasada")],
    },
    {
      titulo: "Encargos para interioristas",
      slug: "interioristas",
      descripcion: "Fabricamos a partir de los planos de tu estudio, en viviendas y locales.",
      // «Hola, quiero presupuesto para encargos para interioristas.» sonaba raro: mensaje propio.
      mensajeWhatsapp: "Hola, soy interiorista y quiero presupuesto para un encargo.",
      imagenes: [ia("mostrador-born.jpg", "Mostrador de roble en una tienda")],
    },
  ],
  trabajos: [
    {
      titulo: "Cocina de fresno",
      slug: "cocina-fresno-gracia",
      descripcion: "Cocina en U con frentes de fresno y encimera de mármol.",
      ubicacion: "Gràcia, Barcelona",
      anio: 2026,
      servicio: "cocinas",
      superficie: "9 m²",
      duracion: "6 semanas",
      contenido: ["Diseñada con el interiorista del cliente."],
      imagenes: [ia("cocina-fresno-gracia.jpg", "Cocina de fresno terminada")],
      antes: ia("cocina-antes-gracia.jpg", "La cocina antes de la reforma"),
      testimonio: { autor: "Marta P.", texto: "Exactamente lo que dibujamos, y en el plazo." },
    },
    {
      titulo: "Armario con molduras",
      slug: "armario-eixample",
      descripcion: "Armario que respeta las molduras de un piso modernista.",
      ubicacion: "Eixample, Barcelona",
      anio: 2025,
      servicio: "armarios-y-vestidores",
      superficie: "3,1 m lineales",
      duracion: "4 semanas",
      imagenes: [ia("armario-roble-eixample.jpg", "Armario de roble")],
    },
    {
      titulo: "Aparador de nogal",
      slug: "aparador-nogal",
      descripcion: "Aparador bajo de nogal macizo con tiradores mecanizados.",
      ubicacion: "Sant Gervasi, Barcelona",
      anio: 2026,
      servicio: "mesas-y-aparadores",
      superficie: "2,2 m",
      imagenes: [ia("hero-aparador-nogal.jpg", "Aparador de nogal")],
    },
    {
      titulo: "Mesa de comedor",
      slug: "mesa-sant-cugat",
      descripcion: "Mesa de roble macizo para ocho.",
      ubicacion: "Sant Cugat del Vallès",
      anio: 2025,
      servicio: "mesas-y-aparadores",
      duracion: "3 semanas",
      imagenes: [ia("mesa-comedor.jpg", "Mesa de comedor de roble")],
    },
    {
      titulo: "Pared de lamas",
      slug: "lamas-poblenou",
      descripcion: "Revestimiento de lamas de roble que esconde la puerta del estudio.",
      ubicacion: "Poblenou, Barcelona",
      anio: 2026,
      servicio: "revestimientos",
      superficie: "12 m²",
      duracion: "2 semanas",
      imagenes: [ia("lamas-roble-poblenou.jpg", "Pared de lamas de roble con puerta enrasada")],
    },
    {
      titulo: "Mostrador en el Born",
      slug: "mostrador-born",
      descripcion: "Mostrador y estantes de roble para una tienda de cerámica, a partir del plano del interiorista.",
      ubicacion: "El Born, Barcelona",
      anio: 2025,
      servicio: "interioristas",
      duracion: "5 semanas",
      imagenes: [ia("mostrador-born.jpg", "Mostrador de roble en una tienda")],
    },
    // Sin servicio a propósito: solo sale con el filtro «Todas».
    {
      titulo: "Banco de entrada",
      slug: "banco-sant-andreu",
      descripcion: "Banco con zapatero sobre baldosa hidráulica.",
      ubicacion: "Sant Andreu, Barcelona",
      anio: 2024,
      imagenes: [ia("banco-recibidor.jpg", "Banco recibidor de roble sobre baldosa hidráulica")],
    },
  ],
  valoracion: { media: 4.9, total: 52 },
  resenas: [
    { autor: "Marta P.", texto: "Precisión total.", puntuacion: 5, fecha: "2026-10-18", fuente: "google" },
    {
      autor: "Oriol B.",
      texto: "Trabajamos con ellos en tres proyectos de interiorismo. Entienden un plano a la primera, proponen soluciones y entregan cuando dicen. Los cantos y juntas son de mueble de diseño.",
      puntuacion: 5,
      fecha: "2026-09-05",
      fuente: "google",
    },
    { autor: "Laia F.", texto: "El armario parece original del piso.", puntuacion: 5, fecha: "2026-07-22", fuente: "google" },
    { autor: "David R.", texto: "Caros, pero valen lo que cuestan. El montaje, impecable.", puntuacion: 4, fecha: "2026-06", fuente: "google" },
    { autor: "Núria V.", texto: "La mesa es una maravilla.", puntuacion: 5, fecha: "2026-04-11", fuente: "google" },
  ],
  garantias: ["Presupuesto cerrado con plano", "Plazo de entrega en contrato", "Cinco años de garantía en estructura"],
  marcas: ["Blum", "Salice"],
  galeria: [
    { ...ia("detalle-ensamble-bn.jpg", "Ensamble a inglete en blanco y negro"), titulo: "Ensamble a inglete" },
    { ...ia("detalle-tirador-bn.jpg", "Tirador mecanizado en el canto de un frente, en blanco y negro"), titulo: "Tirador mecanizado" },
    { ...ia("cabecero-nogal.jpg", "Cabecero de nogal"), titulo: "Cabecero" },
  ],
  empresa: {
    historia: ["Abrimos el obrador en 2011 en un antiguo taller textil del Poblenou."],
    imagenes: [ia("obrador-bn.jpg", "Obrador con piezas en proceso"), ia("obrador-tablones-bn.jpg", "Tablones apoyados en la pared del obrador")],
    equipo: [
      { nombre: "Jaume M.", cargo: "Carpintero" },
      { nombre: "Clara S.", cargo: "Diseño y presupuestos" },
    ],
  },
  preguntas: [{ pregunta: "¿Trabajáis con interioristas?", respuesta: "Sí, a partir de sus planos o con los nuestros." }],
  seo: {
    titulo: "Obrador Mallol · Carpintería a medida en Barcelona",
    descripcion: "Cocinas, armarios y muebles de madera a medida hechos en nuestro obrador del Poblenou.",
    url: "https://obrador-mallol.example",
  },
  redes: { instagram: "https://www.instagram.com/obradormallol.example" },
});
