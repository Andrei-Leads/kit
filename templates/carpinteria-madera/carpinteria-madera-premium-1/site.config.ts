import { defineSiteConfig } from "@andrei-leads/core";

/*
 * Datos de ejemplo de «Oficio» (carpinteria-madera-premium-1): un taller de
 * ebanistería FICTICIO de Sevilla. NIF, dirección, teléfono, dominios y
 * registro son inventados. Las fotos de public/ejemplo/ son relleno (ver
 * public/ejemplo/CREDITOS.md) y llevan origen "ia".
 */
export default defineSiteConfig({
  negocio: {
    nombre: "Ojeda Ebanistas",
    nombreLegal: "Ojeda Ebanistas, S.L.",
    nif: "B00000000", // FICTICIO
    sector: "Carpintería a medida",
    descripcionCorta:
      "Taller de ebanistería en Sevilla: cocinas, vestidores, portones y muebles de madera maciza, hechos en nuestra nave y montados en tu casa.",
    anioFundacion: 1991,
    registroMercantil: "Registro Mercantil de Sevilla, tomo 0000, folio 00, hoja SE-00000", // FICTICIO
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000000", // FICTICIO
    whatsapp: "+34600000000", // FICTICIO
    email: "taller@ojeda-ebanistas.example",
    direccion: { calle: "Calle Ejemplo 14, nave 3 (Polígono Calonge)", cp: "41007", ciudad: "Sevilla", provincia: "Sevilla" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "16:30", cierra: "19:30" },
    ],
    coordenadas: { lat: 37.4117, lng: -5.9563 },
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000011",
  },
  zonas: ["Sevilla", "Dos Hermanas", "Alcalá de Guadaíra", "La Rinconada", "Carmona", "Utrera", "Mairena del Alcor", "Espartinas"],
  servicios: [
    {
      titulo: "Cocinas a medida",
      slug: "cocinas-a-medida",
      descripcion: "Cocinas de madera maciza o chapada, dibujadas para tu casa y fabricadas en el taller.",
      contenido: [
        "Medimos, dibujamos la distribución contigo y elegimos la madera con muestras reales.",
        "Cada módulo se fabrica en la nave. El montaje dura de tres a cinco días.",
        "Encimeras de madera, piedra o porcelánico, con marmolistas de confianza.",
      ],
      incluye: ["Medición en casa", "Dibujo y muestras de madera", "Fabricación en el taller", "Montaje y repaso al mes"],
      imagenes: [
        { src: "/ejemplo/servicio-cocina.jpg", alt: "Cocina de nogal con suelo de barro en una casa antigua", origen: "ia" },
        { src: "/ejemplo/servicio-cocina-detalle.jpg", alt: "Canto de una encimera de nogal con tirador de latón", origen: "ia" },
      ],
      preguntas: [
        {
          pregunta: "¿La madera aguanta el calor de Sevilla?",
          respuesta: "Sí, si se seca bien y se deja moverse. Por eso volvemos al mes a ajustar.",
        },
      ],
      precioDesde: "desde 9.000 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Armarios y vestidores",
      slug: "armarios-y-vestidores",
      descripcion: "Del suelo al techo, con el interior pensado para tu ropa.",
      contenido: ["Barras, cajones y baldas donde los necesitas, con herrajes de cierre suave."],
      incluye: ["Interior a medida", "Puertas abatibles o correderas", "Luz interior"],
      imagenes: [
        { src: "/ejemplo/servicio-armario.jpg", alt: "Vestidor de roble de suelo a techo", origen: "ia" },
        { src: "/ejemplo/servicio-armario-interior.jpg", alt: "Cajón de roble abierto con cola de milano", origen: "ia" },
      ],
      preguntas: [],
      precioDesde: "desde 1.400 € por metro", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Puertas y portones",
      slug: "puertas-y-portones",
      descripcion: "Puertas de paso y portones de zaguán en madera maciza, también para huecos antiguos.",
      imagenes: [{ src: "/ejemplo/servicio-porton.jpg", alt: "Portón de iroko en el zaguán de una casa encalada", origen: "ia" }],
    },
    {
      titulo: "Mesas y muebles a medida",
      slug: "mesas-y-muebles",
      descripcion: "Mesas de comedor, aparadores y bancos de madera maciza.",
      imagenes: [{ src: "/ejemplo/servicio-mesa.jpg", alt: "Mesa de comedor de nogal macizo con una mariposa", origen: "ia" }],
    },
    {
      titulo: "Librerías y paneles de madera",
      slug: "librerias-y-paneles",
      descripcion: "Librerías en hueco, paredes de lamas y revestimientos.",
      imagenes: [{ src: "/ejemplo/servicio-libreria.jpg", alt: "Librería de fresno de suelo a techo", origen: "ia" }],
    },
    // Sin foto a propósito: enseña la banda de tinta con veta.
    {
      titulo: "Restauración de carpintería antigua",
      slug: "restauracion",
      descripcion: "Recuperamos puertas, contraventanas y muebles de casas antiguas.",
    },
  ],
  trabajos: [
    {
      titulo: "Cocina de nogal en Santa Cruz",
      slug: "cocina-santa-cruz",
      descripcion: "Cocina en L de nogal macizo en una casa del siglo XIX, con el suelo de barro original.",
      ubicacion: "Barrio de Santa Cruz, Sevilla",
      anio: 2026,
      servicio: "cocinas-a-medida",
      superficie: "12 m²",
      duracion: "7 semanas",
      precio: "entre 18.000 y 22.000 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Las paredes no estaban a plomo: tomamos plantillas de cada hueco antes de fabricar.",
        "Conservamos el suelo de barro; los zócalos siguen su desnivel.",
      ],
      imagenes: [
        { src: "/ejemplo/servicio-cocina.jpg", alt: "Cocina de nogal terminada en una casa de Santa Cruz", origen: "ia" },
        { src: "/ejemplo/servicio-cocina-detalle.jpg", alt: "Detalle del canto de la encimera de nogal", origen: "ia" },
      ],
      antes: { src: "/ejemplo/obra-cocina-santa-cruz-antes.jpg", alt: "La misma cocina antes, con muebles de formica beige", origen: "ia" },
      testimonio: {
        autor: "Inmaculada R.",
        texto: "Fuimos al taller a elegir la madera. Ver cómo hacían nuestra cocina nos quitó cualquier duda.",
      },
    },
    {
      titulo: "Vestidor en Los Remedios",
      slug: "vestidor-los-remedios",
      descripcion: "Vestidor de roble de pared a pared con cajonera central y luz interior.",
      ubicacion: "Los Remedios, Sevilla",
      anio: 2026,
      servicio: "armarios-y-vestidores",
      superficie: "5,1 m lineales",
      duracion: "4 semanas",
      imagenes: [
        { src: "/ejemplo/servicio-armario.jpg", alt: "Vestidor de roble de pared a pared", origen: "ia" },
        { src: "/ejemplo/servicio-armario-interior.jpg", alt: "Cajonera central del vestidor", origen: "ia" },
      ],
    },
    {
      titulo: "Portón de zaguán en Carmona",
      slug: "porton-carmona",
      descripcion: "Portón de dos hojas en iroko con postigo, hecho con la plantilla del hueco antiguo.",
      ubicacion: "Carmona",
      anio: 2025,
      servicio: "puertas-y-portones",
      superficie: "3,4 m²",
      duracion: "6 semanas",
      imagenes: [{ src: "/ejemplo/servicio-porton.jpg", alt: "Portón de iroko en un zaguán de Carmona", origen: "ia" }],
    },
    {
      titulo: "Mesa de comedor en Nervión",
      slug: "mesa-nervion",
      descripcion: "Mesa de nogal macizo de 2,6 m con mariposas en las uniones del tablero.",
      ubicacion: "Nervión, Sevilla",
      anio: 2025,
      servicio: "mesas-y-muebles",
      duracion: "3 semanas",
      imagenes: [{ src: "/ejemplo/servicio-mesa.jpg", alt: "Mesa de comedor de nogal en un salón", origen: "ia" }],
    },
    {
      titulo: "Librería en El Porvenir",
      slug: "libreria-el-porvenir",
      descripcion: "Librería de fresno de suelo a techo con escalera corredera.",
      ubicacion: "El Porvenir, Sevilla",
      anio: 2024,
      servicio: "librerias-y-paneles",
      superficie: "4,8 m lineales",
      duracion: "5 semanas",
      imagenes: [{ src: "/ejemplo/servicio-libreria.jpg", alt: "Librería de fresno con escalera corredera", origen: "ia" }],
    },
  ],
  valoracion: { media: 4.9, total: 74 },
  resenas: [
    { autor: "Inmaculada Ruiz", texto: "Nos invitaron al taller a elegir la madera. La cocina es lo mejor de la casa.", puntuacion: 5, fecha: "2026-10-18", fuente: "google" },
    {
      autor: "Fernando Gallardo",
      texto:
        "El vestidor llegó el día que dijeron. Midieron dos veces, montaron en tres días y dejaron la casa más limpia que antes. Se nota que lo fabrican ellos: cada cajón cierra igual.",
      puntuacion: 5,
      fecha: "2026-09-30",
      fuente: "google",
    },
    { autor: "Lola Benjumea", texto: "Caros, pero es otra liga.", puntuacion: 5, fecha: "2026-08", fuente: "google" },
    { autor: "Javier Montero", texto: "El portón tardó dos semanas más por el secado del iroko. Avisaron a tiempo y lo merece.", puntuacion: 4, fecha: "2026-06-11", fuente: "google" },
    { autor: "Rocío Asencio", texto: "La mesa es una pieza para toda la vida.", puntuacion: 5, fecha: "2026-04", fuente: "google" },
  ],
  proceso: [
    {
      titulo: "Visita y medición",
      texto: "Vamos a tu casa, medimos el hueco y escuchamos cómo lo vas a usar.",
      imagen: { src: "/ejemplo/proceso-medir.jpg", alt: "Medición de un hueco de pared con un metro plegable", origen: "ia" },
    },
    {
      titulo: "Dibujo",
      texto: "Te enseñamos el diseño a escala antes de cortar nada.",
      imagen: { src: "/ejemplo/proceso-dibujo.jpg", alt: "Dibujo a lápiz de una cocina junto a muestras de madera", origen: "ia" },
    },
    {
      titulo: "Madera y presupuesto",
      texto: "Eliges la madera con muestras reales. Precio y fecha, por escrito.",
      imagen: { src: "/ejemplo/proceso-muestras.jpg", alt: "Muestras de nogal, roble y fresno aceitadas", origen: "ia" },
    },
    {
      titulo: "Selección de tablones",
      texto: "Escogemos y secamos cada tablón en la nave.",
      imagen: { src: "/ejemplo/proceso-tablones.jpg", alt: "Tablones de nogal apilados con las testas marcadas", origen: "ia" },
    },
    {
      titulo: "Fabricación",
      texto: "Ensambles de carpintería, hechos en nuestro banco.",
      imagen: { src: "/ejemplo/proceso-ensamble.jpg", alt: "Ajuste de una cola de milano con un formón", origen: "ia" },
    },
    {
      titulo: "Montaje y repaso",
      texto: "Montamos, limpiamos y volvemos al mes a ajustar.",
      imagen: { src: "/ejemplo/proceso-montaje.jpg", alt: "Montaje de un frente de roble con un nivel", origen: "ia" },
    },
  ],
  garantias: ["Presupuesto y fecha de montaje por escrito", "Visita de ajuste al mes del montaje", "Cinco años de garantía en ensambles"],
  marcas: ["Blum", "Hettich", "Osmo"],
  empresa: {
    historia: [
      "Manuel Ojeda abrió el taller en 1991 en un bajo de San Bernardo.",
      "Hoy somos siete en una nave de Calonge y seguimos fabricando cada pieza aquí, de la medición al montaje.",
    ],
    imagenes: [
      { src: "/ejemplo/taller-nave.jpg", alt: "Interior del taller con bancos y tablones bajo las claraboyas", origen: "ia" },
      { src: "/ejemplo/taller-herramientas.jpg", alt: "Formones colgados en la pared del taller", origen: "ia" },
    ],
    // Nombres FICTICIOS; sin foto: nunca una cara de IA como dueño o equipo.
    equipo: [
      { nombre: "Manuel Ojeda", cargo: "Fundador" },
      { nombre: "Elena Ojeda", cargo: "Diseño y presupuestos" },
      { nombre: "Curro Ojeda", cargo: "Taller y montaje" },
    ],
  },
  /*
   * Vídeos: aún no hay archivos (CREDITOS.md, filas 1 y 2b). Cuando existan en
   * public/ejemplo/, descomentar. Mientras, el hero usa imagenesHero[0] y el pano
   * su respaldo (imagenesHero[0] quieta). Los pósters ya están como relleno.
   *
   * videoHero: {
   *   src: "/ejemplo/hero-lijado.mp4",
   *   srcAv1: "/ejemplo/hero-lijado-av1.mp4",
   *   poster: { src: "/ejemplo/hero-lijado-poster.jpg", alt: "Manos lijando un tablero de nogal bajo un haz de luz", origen: "ia" },
   * },
   * videoPano: {
   *   src: "/ejemplo/pano-taller.mp4",
   *   srcAv1: "/ejemplo/pano-taller-av1.mp4",
   *   poster: { src: "/ejemplo/pano-taller-poster.jpg", alt: "Interior del taller con haces de luz sobre los bancos", origen: "ia" },
   * },
   */
  imagenesHero: [
    { src: "/ejemplo/banco-nogal.jpg", alt: "Banco de trabajo con un tablero de nogal recién aceitado", origen: "ia" },
    { src: "/ejemplo/lema-viruta.jpg", alt: "Viruta de roble saliendo de un cepillo de mano", origen: "ia" },
  ],
  galeria: [
    { src: "/ejemplo/galeria-escalera.jpg", alt: "Pasamanos de nogal sobre una escalera de mármol", titulo: "Pasamanos en el Arenal", origen: "ia" },
    { src: "/ejemplo/galeria-celosia.jpg", alt: "Celosía de madera en un patio sevillano", titulo: "Celosía en un patio de San Lorenzo", origen: "ia" },
  ],
  preguntas: [
    { pregunta: "¿Cuánto tarda una cocina a medida?", respuesta: "Entre seis y ocho semanas desde que aceptas el presupuesto." },
    { pregunta: "¿Puedo visitar el taller?", respuesta: "Sí, de lunes a viernes por la mañana. Avísanos antes por WhatsApp." },
    { pregunta: "¿Trabajáis con interioristas?", respuesta: "Sí, fabricamos con sus planos o los dibujamos juntos." },
  ],
  seo: {
    titulo: "Ojeda Ebanistas · Carpintería a medida en Sevilla",
    descripcion: "Cocinas, vestidores, portones y muebles de madera maciza, hechos en nuestro taller de Sevilla.",
    url: "https://carpinteria-madera-premium-1.example",
  },
  redes: { instagram: "https://www.instagram.com/ojeda.ebanistas.ejemplo" },
});
