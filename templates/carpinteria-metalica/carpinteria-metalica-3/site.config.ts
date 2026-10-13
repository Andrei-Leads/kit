// Datos FICTICIOS de ejemplo («Metálicas Ejemplo», Mislata). En la web de un cliente se sustituyen por los suyos.

import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Metálicas Ejemplo",
    nombreLegal: "Metálicas Ejemplo SL",
    nif: "B11223344",
    sector: "Reparación de persianas, cristales y puertas",
    descripcionCorta:
      "Persianas que no suben, cristales rotos, puertas de garaje y cerraduras de aluminio. Vamos hoy en Valencia, Mislata y Xirivella.",
    anioFundacion: 2001,
    registroMercantil: "Inscrita en el Registro Mercantil de Valencia, tomo 0000, folio 00, hoja V-00000 (ficticio)",
    tipoSchema: ["Locksmith", "HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34600000008",
    whatsapp: "+34600000008",
    email: "info@ejemplo.com",
    direccion: { calle: "Calle de Ejemplo 7, bajo", cp: "46920", ciudad: "Mislata", provincia: "Valencia" },
    horario: [
      { dias: "Lunes a viernes", horas: "8:00–19:00" },
      { dias: "Sábados", horas: "9:00–14:00" },
      { dias: "Urgencias", horas: "24 horas, todos los días" },
    ],
    mensajeWhatsapp: "Hola, os escribo desde vuestra web. Se me ha roto algo y os envío una foto:",
    urgencias24h: true,
    tiempoLlegada: "1 hora",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000008",
  },
  zonas: ["Valencia", "Mislata", "Xirivella", "Quart de Poblet", "Manises", "Aldaia", "Alaquàs", "Burjassot", "Paterna"],
  valoracion: { media: 4.7, total: 91 },
  // Viene con datos para comprobar que el hero de «Reparaciones» la ignora (tipográfico por diseño).
  imagenesHero: [{ src: "/ejemplo/empresa-taller.jpg", alt: "Banco de trabajo con perfiles de aluminio y herramientas" }],
  servicios: [
    {
      titulo: "Reparación de persianas",
      descripcion: "La persiana no sube, se ha caído o la cinta se ha roto.",
      contenido: [
        "Si la persiana se ha caído o no sube, no la fuerces: puede romperse el eje o las lamas. Vamos, vemos qué ha fallado y casi siempre la dejamos funcionando en la misma visita.",
        "Cambiamos cintas, recogedores, lamas, ejes y topes. Si es motorizada, revisamos también el motor.",
      ],
      incluye: ["Diagnóstico en el sitio", "Precio antes de empezar", "Cambio de cinta, lamas o eje", "Prueba de subida y bajada"],
      imagenes: [{ src: "/ejemplo/servicio-persiana.jpg", alt: "Persiana de aluminio a medio bajar en una ventana" }],
      preguntas: [
        { pregunta: "¿Hay que cambiar toda la persiana?", respuesta: "Casi nunca. Normalmente basta con cambiar la pieza rota." },
      ],
      mensajeWhatsapp: "Hola, se me ha roto la persiana y no sube. Os envío una foto:",
      precioDesde: "desde 45 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cambio de cristales rotos",
      descripcion: "Cristales de ventanas, puertas y escaparates. Cerramos el hueco el mismo día.",
      contenido: [
        "Si el cristal no se puede cambiar en el momento, tapamos el hueco para que la casa o el local queden cerrados y volvemos con el cristal a medida.",
      ],
      incluye: ["Retirada del cristal roto", "Cierre provisional si hace falta", "Cristal a medida", "Limpieza"],
      imagenes: [{ src: "/ejemplo/servicio-cristal.jpg", alt: "Cristal de ventana con cinta de seguridad" }],
      mensajeWhatsapp: "Hola, tengo un cristal roto. Os envío una foto y las medidas aproximadas:",
      precioDesde: "desde 60 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Puertas de garaje que no abren",
      descripcion: "Motores, mandos, muelles y guías de puertas de garaje y comunidades.",
      imagenes: [{ src: "/ejemplo/servicio-garaje.jpg", alt: "Motor de una puerta de garaje seccional" }],
      mensajeWhatsapp: "Hola, la puerta del garaje no abre. Os envío una foto:",
    },
    {
      titulo: "Cerraduras de puertas de aluminio",
      descripcion: "Cerraduras y bombines que no giran o se han roto.",
      mensajeWhatsapp: "Hola, la cerradura de mi puerta de aluminio no funciona:",
    },
    {
      titulo: "Rejas y barandillas dañadas",
      descripcion: "Soldamos, enderezamos y pintamos rejas, barandillas y vallas.",
    },
    {
      titulo: "Motorización de persianas",
      descripcion: "Ponemos motor a tu persiana manual, con interruptor o mando.",
    },
    {
      titulo: "Ventanas y cerramientos a medida",
      descripcion: "Fabricamos e instalamos ventanas, cerramientos y puertas de aluminio.",
    },
    {
      titulo: "Puertas de portal que no cierran",
      descripcion: "Portales de comunidad que no cierran solos o no encajan.",
    },
  ],
  trabajos: [
    {
      titulo: "Persiana caída en un piso de Valencia",
      descripcion: "Cambio de eje y cinta de una persiana de 2 metros que se había caído.",
      ubicacion: "Valencia (Campanar)",
      anio: 2026,
      servicio: "reparacion-de-persianas",
      duracion: "1 hora",
      imagenes: [{ src: "/ejemplo/trabajo-persiana.jpg", alt: "Persiana de aluminio reparada, subida del todo" }],
      antes: { src: "/ejemplo/trabajo-persiana-antes.jpg", alt: "La misma persiana caída y torcida antes de la reparación" },
      testimonio: { autor: "Elena V.", texto: "Llamé por la mañana y por la tarde ya podía bajarla." },
    },
    {
      titulo: "Puerta de garaje comunitaria en Xirivella",
      descripcion: "Cambio del motor de una puerta seccional de una comunidad de 20 plazas.",
      ubicacion: "Xirivella",
      anio: 2026,
      servicio: "puertas-de-garaje-que-no-abren",
      duracion: "1 día",
      imagenes: [{ src: "/ejemplo/trabajo-garaje.jpg", alt: "Puerta de garaje seccional abierta" }],
    },
    {
      titulo: "Barandilla de balcón en Mislata",
      descripcion: "Soldadura de un tramo suelto y pintura antioxidante.",
      ubicacion: "Mislata",
      anio: 2025,
      servicio: "rejas-y-barandillas-danadas",
      imagenes: [{ src: "/ejemplo/trabajo-barandilla.jpg", alt: "Barandilla metálica de balcón recién pintada" }],
    },
  ],
  resenas: [
    { autor: "Pablo S.", texto: "Se nos cayó la persiana del comercio a las ocho de la tarde y vinieron en una hora. Pudimos cerrar esa misma noche.", puntuacion: 5, fecha: "2026-10-02", fuente: "google" },
    { autor: "Administración de Fincas Turia", texto: "Llevan las puertas de garaje de varias de nuestras comunidades. Responden rápido, explican el presupuesto y no cambian piezas que no hace falta cambiar. Muy recomendables para comunidades.", puntuacion: 5, fecha: "2026-09-15", fuente: "google" },
    { autor: "Nuria L.", texto: "Cristal cambiado al día siguiente.", puntuacion: 5, fecha: "2026-08-28", fuente: "google" },
    { autor: "Jorge T.", texto: "Buen trabajo con la reja, aunque tardaron un par de días en venir.", puntuacion: 4, fecha: "2026-07-19", fuente: "google" },
  ],
  garantias: ["Precio antes de empezar", "Factura con IVA", "Seguro de responsabilidad civil", "Garantía de 1 año en reparaciones"],
  tarifas: {
    items: [
      { concepto: "Desplazamiento en Valencia y l'Horta Oest", precio: "25 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Hora de trabajo", precio: "35 €/h" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Urgencia noche y festivos", precio: "+50 %" }, // PRECIO FICTICIO: borrar en la web del cliente
    ],
    nota: "IVA incluido. Precio final antes de empezar, cuando veamos la avería.",
  },
  empresa: {
    historia: [
      "Somos un taller familiar de Mislata. Desde 2001 reparamos y fabricamos persianas, ventanas, rejas y puertas.",
      "Tenemos taller propio: si una pieza no se encuentra, la hacemos.",
    ],
    imagenes: [
      { src: "/ejemplo/empresa-taller.jpg", alt: "Banco de trabajo con perfiles de aluminio y herramientas" },
      { src: "/ejemplo/empresa-furgoneta.jpg", alt: "Furgoneta de trabajo blanca aparcada" },
    ],
    equipo: [
      { nombre: "Ramón", cargo: "Herrero y fundador" },
      { nombre: "Sergio", cargo: "Persianas y cristalería" },
    ],
  },
  preguntas: [
    { pregunta: "¿Venís el mismo día?", respuesta: "En averías que dejan la casa o el local abierto, sí, normalmente en una hora." },
    { pregunta: "¿Cobráis el desplazamiento?", respuesta: "Sí, y te lo decimos por teléfono antes de ir." },
    { pregunta: "¿Trabajáis con comunidades?", respuesta: "Sí, sobre todo con puertas de garaje y portales." },
    { pregunta: "¿Dais factura?", respuesta: "Siempre, con IVA." },
  ],
  marca: { colorPrimario: "#9a3412" },
  seo: {
    titulo: "Reparación de persianas y cristales en Mislata y Valencia",
    descripcion: "Persianas, cristales rotos, puertas de garaje y cerraduras de aluminio. Vamos hoy en Valencia, Mislata y Xirivella. Precio antes de empezar.",
    url: "https://ejemplo.com",
  },
  redes: { facebook: "https://facebook.com/ejemplo" },
});

