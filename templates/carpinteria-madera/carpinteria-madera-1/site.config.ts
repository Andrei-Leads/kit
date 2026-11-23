// Datos FICTICIOS de ejemplo de «Veta» (carpinteria-madera-1): encargo §11 y datos de la entrega de
// Claude Design, con el patrón ficticio evidente del kit: «Calle Ejemplo», dominios .example,
// cid=000…, teléfono 600 00 01 01, registro «(ficticio)» y NIF con dígito de control inválido.
// Todas las fotos de ejemplo son relleno con origen "ia" (public/ejemplo/CREDITOS.md). Sin
// seo.indexar ni analitica: las activa cada web, nunca el template.
import { defineSiteConfig, type Imagen } from "@andrei-leads/core";

const ia = (src: string, alt: string): Imagen => ({ src: `/ejemplo/${src}`, alt, origen: "ia" });

export default defineSiteConfig({
  negocio: {
    nombre: "Fusteria Ebri",
    nombreLegal: "Fusteria Ebri Ejemplo, S.L.",
    nif: "B46281738", // ficticio: el dígito de control no corresponde a propósito (el correcto sería 9)
    sector: "Carpintería a medida",
    descripcionCorta:
      "Taller de carpintería en Valencia: cocinas, armarios, puertas y muebles a medida fabricados en nuestro taller y montados en tu casa.",
    anioFundacion: 1994,
    registroMercantil: "Registro Mercantil de Valencia, tomo 10432, folio 118, hoja V-185204 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000101",
    whatsapp: "+34600000101",
    email: "taller@fusteriaebri.example",
    direccion: { calle: "Calle Ejemplo, 41, bajo", cp: "46015", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "19:00" },
      { dias: ["sabado"], abre: "09:00", cierra: "13:00" },
    ],
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000101",
  },
  zonas: ["Valencia", "Burjassot", "Godella", "Rocafort", "Alboraya", "Moncada", "Paterna", "Bétera"],
  servicios: [
    {
      titulo: "Cocinas a medida",
      slug: "cocinas-a-medida",
      descripcion: "Cocinas de madera maciza o chapada, diseñadas para tu espacio.",
      contenido: [
        "Medimos la cocina, dibujamos la distribución contigo y fabricamos cada módulo en el taller.",
        "Montamos en dos o tres días y dejamos los frentes ajustados al milímetro.",
      ],
      incluye: ["Medición en casa", "Diseño y muestras de madera", "Fabricación y montaje"],
      imagenes: [ia("cocina-roble.jpg", "Cocina con frentes de roble y suelo hidráulico")],
      preguntas: [
        { pregunta: "¿Hacéis también la encimera?", respuesta: "Sí, de madera o de piedra, a través de marmolistas de confianza." },
      ],
    },
    {
      titulo: "Armarios empotrados y vestidores",
      slug: "armarios-y-vestidores",
      descripcion: "Aprovechamos cada centímetro del hueco, del suelo al techo.",
      contenido: ["Interiores pensados para tu ropa: barras, cajones y baldas donde las necesitas."],
      incluye: ["Interior a medida", "Puertas abatibles o correderas"],
      imagenes: [ia("vestidor-fresno.jpg", "Vestidor de fresno en un dormitorio")],
    },
    {
      titulo: "Puertas de paso",
      slug: "puertas-de-paso",
      descripcion: "Puertas de madera maciza o lacadas, con sus marcos y herrajes.",
      imagenes: [
        ia("puerta-paso.jpg", "Puerta de paso de roble en un pasillo"),
        ia("puerta-herraje.jpg", "Manilla de latón en el canto de una puerta de roble"),
      ],
    },
    {
      titulo: "Librerías y muebles de salón",
      slug: "librerias-y-salon",
      descripcion: "Librerías en hueco, muebles de televisión y aparadores.",
      imagenes: [ia("libreria-salon.jpg", "Librería de madera en un hueco de pared")],
    },
    {
      titulo: "Muebles de baño",
      slug: "muebles-de-bano",
      descripcion: "Muebles de lavabo de madera tratada para la humedad.",
      imagenes: [ia("bano-mueble.jpg", "Mueble de lavabo de roble")],
    },
    // Sin foto a propósito: enseña la ficha tipográfica de servicio.
    {
      titulo: "Recibidores y bancos",
      slug: "recibidores",
      descripcion: "Bancos con zapatero, percheros y muebles de entrada.",
    },
  ],
  trabajos: [
    {
      titulo: "Cocina de fresno en Alboraya",
      slug: "cocina-fresno-alboraya",
      descripcion: "Cocina lineal de fresno con isla en una casa de huerta reformada.",
      ubicacion: "Alboraya",
      anio: 2026,
      servicio: "cocinas-a-medida",
      superficie: "14 m²",
      duracion: "6 semanas",
      imagenes: [ia("cocina-fresno-alboraya.jpg", "Cocina de fresno con isla junto a una ventana con persiana")],
    },
    {
      titulo: "Cocina de roble en Russafa",
      slug: "cocina-roble-russafa",
      descripcion: "Cocina en L con frentes de roble aceitado en un piso de 1930.",
      ubicacion: "Russafa, Valencia",
      anio: 2025,
      servicio: "cocinas-a-medida",
      superficie: "11 m²",
      duracion: "5 semanas",
      contenido: ["Conservamos el suelo hidráulico original y ajustamos los zócalos a su desnivel."],
      imagenes: [ia("cocina-roble.jpg", "Cocina de roble terminada"), ia("cocina-canto.jpg", "Detalle del canto de la encimera")],
      antes: ia("cocina-roble-antes.jpg", "La misma cocina antes, con muebles de formica"),
      testimonio: { autor: "Clara M.", texto: "Ajustaron todo a un suelo que no estaba recto. Parece que la cocina siempre estuvo ahí." },
    },
    {
      titulo: "Vestidor de fresno en Godella",
      slug: "vestidor-godella",
      descripcion: "Vestidor abierto de pared a pared con cajonera central.",
      ubicacion: "Godella",
      anio: 2026,
      servicio: "armarios-y-vestidores",
      superficie: "4,2 m lineales",
      duracion: "3 semanas",
      imagenes: [ia("vestidor-fresno.jpg", "Vestidor de fresno"), ia("vestidor-cajon.jpg", "Cajón con cola de milano")],
    },
    {
      titulo: "Ocho puertas de roble en Benimaclet",
      slug: "puertas-benimaclet",
      descripcion: "Cambio de todas las puertas de un piso, con marcos nuevos.",
      ubicacion: "Benimaclet, Valencia",
      anio: 2025,
      servicio: "puertas-de-paso",
      duracion: "2 días de montaje",
      imagenes: [ia("puerta-paso.jpg", "Puerta de roble en un pasillo")],
    },
    {
      titulo: "Librería del Cabanyal",
      slug: "libreria-cabanyal",
      descripcion: "Librería de suelo a techo con escalera corredera.",
      ubicacion: "El Cabanyal, Valencia",
      anio: 2024,
      servicio: "librerias-y-salon",
      superficie: "3,6 m lineales",
      imagenes: [ia("libreria-salon.jpg", "Librería de madera en un salón")],
    },
    {
      titulo: "Mueble de baño en Burjassot",
      slug: "bano-burjassot",
      descripcion: "Mueble suspendido de roble con dos cajones.",
      ubicacion: "Burjassot",
      anio: 2026,
      servicio: "muebles-de-bano",
      imagenes: [ia("bano-mueble.jpg", "Mueble de lavabo suspendido")],
    },
  ],
  valoracion: { media: 4.9, total: 86 },
  resenas: [
    { autor: "Clara Martí", texto: "Ajustaron la cocina a un suelo nada recto. Impecable.", puntuacion: 5, fecha: "2026-10-02", fuente: "google" },
    {
      autor: "Jordi Puchades",
      texto:
        "Nos hicieron el vestidor en tres semanas, como dijeron. Vinieron a medir dos veces para no fallar y el montaje fue limpio: barrieron hasta el rellano. Los cajones cierran solos y no hay ni un hueco entre puertas.",
      puntuacion: 5,
      fecha: "2026-09-14",
      fuente: "google",
    },
    { autor: "Marisa Gil", texto: "Buen trato y buen acabado.", puntuacion: 5, fecha: "2026-08", fuente: "google" },
    {
      autor: "Andrés Sanchis",
      texto: "Tardaron una semana más de lo previsto por la madera, pero avisaron y el resultado lo compensa.",
      puntuacion: 4,
      fecha: "2026-06-20",
      fuente: "google",
    },
    { autor: "Neus Ferrando", texto: "La librería es lo primero que mira todo el que entra en casa.", puntuacion: 5, fecha: "2026-04", fuente: "google" },
  ],
  proceso: [
    { titulo: "Medimos", texto: "Vamos a tu casa, medimos el hueco y vemos cómo vives el espacio." },
    { titulo: "Dibujamos", texto: "Te enseñamos el diseño y las muestras de madera." },
    { titulo: "Presupuesto cerrado", texto: "Precio y fecha de montaje por escrito." },
    { titulo: "Fabricamos", texto: "Cada pieza se hace en nuestro taller." },
    { titulo: "Montamos y limpiamos", texto: "Montaje en casa y todo recogido al terminar." },
  ],
  garantias: ["Presupuesto cerrado por escrito", "Fecha de montaje en el contrato", "Dos años de garantía en herrajes y montaje"],
  marcas: ["Blum", "Hettich", "Grass"],
  empresa: {
    historia: [
      "Abrimos el taller en 1994 en Campanar.",
      "Hoy somos cuatro y seguimos fabricando cada pieza a mano y a máquina en el mismo sitio.",
    ],
    imagenes: [ia("taller-banco.jpg", "Banco de trabajo con tablones de roble"), ia("taller-tablones.jpg", "Tablones apilados en el taller")],
    equipo: [
      { nombre: "Vicent Ebri", cargo: "Fundador" },
      { nombre: "Pau Ebri", cargo: "Taller y montaje" },
    ],
  },
  imagenesHero: [
    ia("hero-veta.jpg", "Canto de una encimera de roble con un cajón entreabierto y tirador de latón"),
    ia("tarima-luz.jpg", "Tarima de roble con luz rasante"),
  ],
  galeria: [
    { ...ia("escalera-pasamanos.jpg", "Pasamanos de nogal sobre escalera de terrazo"), titulo: "Pasamanos en Rocafort" },
    { ...ia("recibidor-banco.jpg", "Banco recibidor con zapatero sobre suelo de terrazo"), titulo: "Banco de entrada en Godella" },
  ],
  preguntas: [
    { pregunta: "¿Cuánto tarda un armario a medida?", respuesta: "Entre tres y cinco semanas desde que aceptas el presupuesto." },
    { pregunta: "¿Venís a medir?", respuesta: "Sí, la medición en casa va incluida en el presupuesto." },
  ],
  seo: {
    titulo: "Fusteria Ebri · Carpintería a medida en Valencia",
    descripcion: "Cocinas, armarios, puertas y muebles a medida fabricados en nuestro taller de Valencia.",
    url: "https://fusteriaebri.example",
  },
  redes: { instagram: "https://www.instagram.com/fusteria.ebri.ejemplo" },
});
