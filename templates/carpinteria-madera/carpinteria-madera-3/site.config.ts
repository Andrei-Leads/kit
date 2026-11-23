// Datos de ejemplo de «Banco de trabajo» (carpinteria-madera-3): negocio FICTICIO de Sevilla y el
// Aljarafe (encargo §11), con el patrón ficticio evidente del kit (Calle Ejemplo, dominio .example,
// cid de ceros, registro «(ficticio)»). NIF de ejemplo con dígito de control inválido. Fotos de
// public/ejemplo/: relleno pendiente de las fotos de IA (CREDITOS.md), todas con origen "ia". Sin
// seo.indexar ni analítica: las activa cada web, nunca el template. Sin precios: el diseño funciona
// sin ellos (si se añaden, cada uno con su comentario de precio ficticio).
import { defineSiteConfig, type Imagen } from "@andrei-leads/core";

const ia = (src: string, alt: string): Imagen => ({ src: `/ejemplo/${src}`, alt, origen: "ia" });

export default defineSiteConfig({
  negocio: {
    nombre: "Banco Siete Carpintería",
    nombreLegal: "Banco Siete Carpintería, S.L.",
    nif: "B41529067", // ficticio: el dígito de control no corresponde a propósito (el correcto sería 6)
    sector: "Carpintería de madera",
    descripcionCorta: "Taller de carpintería en el Aljarafe: puertas, celosías, cocinas y armarios de madera maciza, fabricados en nuestro banco.",
    anioFundacion: 1987,
    registroMercantil: "Registro Mercantil de Sevilla, tomo 0000, folio 00, hoja SE-000000 (ficticio)",
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000703",
    whatsapp: "+34600000703",
    email: "taller@bancosiete.example",
    direccion: { calle: "Calle Ejemplo, 21, nave 4", cp: "41927", ciudad: "Mairena del Aljarafe", provincia: "Sevilla" },
    horario: [{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "07:30", cierra: "15:30" }],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000703", // ficticio
  },
  zonas: ["Sevilla", "Mairena del Aljarafe", "Tomares", "Bormujos", "San Juan de Aznalfarache", "Camas", "Dos Hermanas", "Alcalá de Guadaíra"],
  servicios: [
    {
      titulo: "Puertas de madera",
      slug: "puertas-de-madera",
      descripcion: "Puertas de entrada y de paso en madera maciza.",
      contenido: [
        "Para exterior usamos iroko o sapelli, que aguantan el sol de Sevilla.",
        "Ajustamos la puerta a huecos antiguos fuera de escuadra.",
      ],
      incluye: ["Medición", "Fabricación en taller", "Herrajes y colocación"],
      imagenes: [ia("puerta-iroko-patio.jpg", "Puerta de iroko en una casa de patio")],
      preguntas: [
        { pregunta: "¿Qué madera aguanta mejor el sol?", respuesta: "El iroko, con un aceite de exterior que se renueva cada dos o tres años." },
      ],
    },
    {
      titulo: "Celosías y contraventanas",
      slug: "celosias",
      descripcion: "Celosías para patios y terrazas, y contraventanas a medida.",
      imagenes: [ia("celosia-patio.jpg", "Celosía de madera en un patio")],
    },
    {
      titulo: "Cocinas de madera",
      slug: "cocinas",
      descripcion: "Cocinas de madera maciza o tablero chapado.",
      imagenes: [ia("cocina-pino.jpg", "Cocina de pino aceitado")],
    },
    {
      titulo: "Armarios a medida",
      slug: "armarios",
      descripcion: "Armarios empotrados con puertas de cuarterones o lisas.",
      imagenes: [ia("armario-dormitorio.jpg", "Armario con puertas de cuarterones")],
    },
    {
      titulo: "Escaleras y barandillas",
      slug: "escaleras",
      descripcion: "Peldaños, pasamanos y barandillas de madera.",
      imagenes: [ia("escalera-madera.jpg", "Escalera con peldaños de roble")],
    },
    // Sin foto a propósito: enseña la fila de pieza sin miniatura.
    {
      titulo: "Ventanas de madera",
      slug: "ventanas",
      descripcion: "Ventanas nuevas de madera para casas antiguas.",
    },
  ],
  // La puerta de Triana va la cuarta a propósito: su ficha muestra «Ref. 004» (encargo §11).
  trabajos: [
    {
      titulo: "Celosía del patio en Tomares",
      slug: "celosia-tomares",
      descripcion: "Celosía de pino tratado para dar sombra a un patio.",
      ubicacion: "Tomares",
      anio: 2026,
      servicio: "celosias",
      superficie: "7 m²",
      duracion: "3 semanas",
      imagenes: [ia("celosia-patio.jpg", "Celosía en un patio")],
    },
    {
      titulo: "Cocina de pino en Bormujos",
      slug: "cocina-bormujos",
      descripcion: "Cocina de pino aceitado con encimera de madera.",
      ubicacion: "Bormujos",
      anio: 2025,
      servicio: "cocinas",
      superficie: "10 m²",
      duracion: "6 semanas",
      imagenes: [ia("cocina-pino.jpg", "Cocina de pino")],
    },
    {
      titulo: "Escalera en Dos Hermanas",
      slug: "escalera-dos-hermanas",
      descripcion: "Revestimiento de peldaños y pasamanos de roble.",
      ubicacion: "Dos Hermanas",
      anio: 2024,
      servicio: "escaleras",
      duracion: "2 semanas",
      imagenes: [ia("escalera-madera.jpg", "Escalera de roble")],
    },
    {
      titulo: "Puerta de entrada en Triana",
      slug: "puerta-triana",
      descripcion: "Puerta de iroko de dos hojas con postigo para una casa de patio.",
      ubicacion: "Triana, Sevilla",
      anio: 2025,
      servicio: "puertas-de-madera",
      superficie: "2,6 m²",
      duracion: "5 semanas",
      contenido: ["El hueco tenía 2 cm de desplome; la puerta se hizo siguiendo la plantilla del marco."],
      imagenes: [ia("puerta-iroko-patio.jpg", "Puerta de iroko terminada")],
      antes: ia("puerta-antigua-antes.jpg", "La puerta antigua, con la madera agrietada"),
      testimonio: { autor: "Manuel O.", texto: "Nos explicaron cada paso. La puerta cierra como el primer día." },
    },
  ],
  valoracion: { media: 4.8, total: 61 },
  resenas: [
    { autor: "Manuel O.", texto: "Oficio de verdad.", puntuacion: 5, fecha: "2026-10-09", fuente: "google" },
    {
      autor: "Rocío D.",
      texto:
        "Nos hicieron la celosía del patio. Vinieron a medir, nos enseñaron la madera en el taller y nos dijeron cuánto iban a tardar. Tardaron eso. El patio ahora se puede usar en agosto.",
      puntuacion: 5,
      fecha: "2026-08-27",
      fuente: "google",
    },
    { autor: "Javier P.", texto: "Buen trabajo, algo más caros que otros, pero se nota.", puntuacion: 4, fecha: "2026-07-15", fuente: "google" },
    { autor: "Carmen V.", texto: "La cocina de pino huele a madera todavía. Encantados.", puntuacion: 5, fecha: "2026-05", fuente: "google" },
    { autor: "Alberto R.", texto: "Muy serios con los plazos.", puntuacion: 5, fecha: "2026-03-02", fuente: "google" },
  ],
  // Una foto por paso (`proceso[].imagen`, core 0.7.0): la lámina pegajosa del proceso. Sin foto, un dibujo.
  proceso: [
    { titulo: "Medimos en tu casa", texto: "Tomamos medidas y comprobamos escuadras y desplomes.", imagen: ia("paso-medir.jpg", "Metro y libreta junto a un hueco de pared") },
    { titulo: "Dibujamos el despiece", texto: "Pieza a pieza, con sus medidas y uniones.", imagen: ia("paso-despiece.jpg", "Despiece a lápiz sobre el banco") },
    { titulo: "Elegimos la madera", texto: "Según dónde va: iroko al sol, pino o roble dentro.", imagen: ia("paso-tablones.jpg", "Tablones de iroko marcados") },
    { titulo: "Cortamos y ensamblamos", texto: "En nuestro banco, con uniones de carpintería.", imagen: ia("paso-corte.jpg", "Sierra de mesa con virutas") },
    { titulo: "Montamos", texto: "Colocamos y ajustamos en tu casa.", imagen: ia("paso-ensamble.jpg", "Marco encolado con sargentos") },
    { titulo: "Repasamos", texto: "Volvemos al mes para ajustar si la madera se ha movido.", imagen: ia("paso-montaje.jpg", "Puerta colgada con un nivel apoyado") },
  ],
  garantias: ["Presupuesto por escrito con plazo", "Visita de ajuste al mes", "Cinco años de garantía en ensambles"],
  empresa: {
    historia: ["El taller lo abrió Antonio L. en 1987 en Mairena.", "Hoy lo llevan sus dos hijos con tres oficiales."],
    imagenes: [ia("formones-detalle.jpg", "Formones ordenados sobre el banco")],
    equipo: [
      { nombre: "Antonio L.", cargo: "Fundador" },
      { nombre: "Rafael L.", cargo: "Taller" },
      { nombre: "Pilar L.", cargo: "Presupuestos y montaje" },
    ],
  },
  imagenesHero: [ia("hero-banco-cenital.jpg", "Banco de trabajo con una puerta de iroko a medio ensamblar")],
  galeria: [{ ...ia("virutas-macro.jpg", "Virutas de madera rizadas a contraluz"), titulo: "Virutas de iroko" }],
  preguntas: [
    { pregunta: "¿Puedo ver el taller?", respuesta: "Sí, avísanos antes y te enseñamos la madera." },
    { pregunta: "¿La madera se mueve?", respuesta: "Un poco, sobre todo el primer verano; por eso volvemos a ajustar." },
  ],
  seo: {
    titulo: "Banco Siete · Carpintería de madera en Sevilla",
    descripcion: "Puertas, celosías, cocinas y armarios de madera maciza, hechos en nuestro taller del Aljarafe.",
    url: "https://bancosiete.example",
  },
  redes: { facebook: "https://www.facebook.com/bancosiete.ejemplo" },
});
