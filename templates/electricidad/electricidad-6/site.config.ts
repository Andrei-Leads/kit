import { defineSiteConfig } from "@andrei-leads/core";

// electricidad-6 «Apagón»: datos de ejemplo FICTICIOS (Sevilla). Sin seo.indexar ni analítica:
// los activa cada web. Fotos de relleno con origen "ia" (public/ejemplo/CREDITOS.md).

export default defineSiteConfig({
  negocio: {
    nombre: "Luz de Guardia",
    nombreLegal: "Joaquín Rengel Ortiz",
    nif: "28734519X", // NIF FICTICIO: la letra no corresponde al número a propósito (la correcta sería K)
    sector: "Electricista urgente",
    descripcionCorta: "Urgencias eléctricas en Sevilla a cualquier hora. Te decimos cuánto tardamos y cuánto cuesta la salida antes de ir.",
    anioFundacion: 2011,
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000306",
    whatsapp: "+34600000306",
    email: "avisos@luzdeguardia.example",
    direccion: { calle: "Calle Ejemplo, 23", cp: "41020", ciudad: "Sevilla", provincia: "Sevilla" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "15:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "17:00", cierra: "20:00" },
    ],
    urgencias24h: true,
    tiempoLlegada: "30 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000306", // ficticio
  },
  zonas: ["Sevilla", "Alcalá de Guadaíra", "La Rinconada", "Bormujos", "Gines", "Espartinas", "Castilleja de la Cuesta", "Coria del Río"],
  servicios: [
    {
      titulo: "Urgencias sin luz", slug: "urgencias-sin-luz",
      descripcion: "Toda la casa o medio piso a oscuras. Vamos ahora.",
      contenido: [
        "Por teléfono te pedimos que mires el cuadro: muchas veces sabemos qué pasa antes de salir.",
        "Llegamos con material para las averías más habituales y te decimos el precio antes de empezar.",
      ],
      incluye: ["Salida en el momento", "Diagnóstico", "Reparación provisional o definitiva"],
      imagenes: [{ src: "/ejemplo/servicio-sin-luz.jpg", alt: "Cuadro eléctrico abierto iluminado con una linterna", origen: "ia" }],
      preguntas: [{ pregunta: "¿Cuánto cuesta de noche?", respuesta: "La salida nocturna tiene un precio fijo que te decimos al llamar." }],
    },
    { titulo: "El diferencial no se queda arriba", slug: "diferencial-no-sube", descripcion: "Lo subes y vuelve a bajar, o salta al encender algo.", contenido: ["Buscamos el circuito con la fuga y lo reparamos o lo aislamos para que tengas luz esa misma noche."], incluye: [], imagenes: [{ src: "/ejemplo/servicio-diferencial.jpg", alt: "Diferencial bajado en un cuadro", origen: "ia" }], preguntas: [] },
    { titulo: "Enchufes y cables quemados", slug: "enchufes-quemados", descripcion: "Olor a quemado, enchufe negro o un chispazo.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-quemado.jpg", alt: "Enchufe ennegrecido en una pared", origen: "ia" }], preguntas: [] },
    { titulo: "Agua en la instalación tras una tormenta", slug: "agua-tormenta", descripcion: "Ha entrado agua en una caja, en el patio o en el cuadro y se ha ido la luz.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-agua.jpg", alt: "Caja de registro abierta con gotas de agua", origen: "ia" }], preguntas: [] },
    { titulo: "Reparación de cuadros", slug: "reparacion-de-cuadros", descripcion: "Cuadros viejos, sin diferencial o que se calientan.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-cuadro.jpg", alt: "Cuadro eléctrico nuevo cerrado", origen: "ia" }], preguntas: [] },
    { titulo: "Averías en locales", slug: "averias-en-locales", descripcion: "Bares, tiendas y bajos que no pueden abrir sin luz.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-local.jpg", alt: "Persiana metálica de un local a medio subir", origen: "ia" }], preguntas: [] },
  ],
  trabajos: [
    { titulo: "Sin luz en plena tormenta", slug: "tormenta-bermejales", descripcion: "Entró agua en la caja del patio y saltaba todo. Caja estanca nueva esa misma noche.", ubicacion: "Los Bermejales, Sevilla", anio: 2026, servicio: "agua-tormenta", duracion: "2 h", contenido: ["Dejamos la casa con luz antes de la una y volvimos por la mañana a revisar el resto de cajas del patio."], imagenes: [{ src: "/ejemplo/trabajo-bermejales.jpg", alt: "Caja de registro estanca nueva", origen: "ia" }], antes: { src: "/ejemplo/antes-bermejales.jpg", alt: "Caja de registro con agua y bornes oxidados antes de la reparación", origen: "ia" }, testimonio: { autor: "Rocío V.", texto: "Cogió el teléfono a la primera y en media hora estaba en casa." } },
    { titulo: "Bar sin luz un sábado", slug: "bar-macarena", descripcion: "Avería en la línea de las cámaras frigoríficas antes del servicio de mediodía.", ubicacion: "La Macarena, Sevilla", anio: 2026, servicio: "averias-en-locales", duracion: "2 h", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-local-macarena.jpg", alt: "Cuadro de un bar con la luz de emergencia encendida", origen: "ia" }] },
    { titulo: "Enchufe de la cocina quemado", slug: "enchufe-sevilla-este", descripcion: "El enchufe del horno se quemó un domingo por la noche. Mecanismo y cable nuevos.", ubicacion: "Sevilla Este", anio: 2025, servicio: "enchufes-quemados", duracion: "1 h", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-sevilla-este.jpg", alt: "Enchufe nuevo en la pared de una cocina", origen: "ia" }] },
    { titulo: "El riego hacía saltar la luz", slug: "riego-bormujos", descripcion: "Humedad en la caja del jardín que hacía saltar el diferencial al encender el riego.", ubicacion: "Bormujos", anio: 2025, servicio: "diferencial-no-sube", duracion: "1 h 30 min", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-bormujos.jpg", alt: "Caja exterior estanca nueva en la pared de un patio", origen: "ia" }] },
  ],
  valoracion: { media: 4.9, total: 211 },
  resenas: [
    { autor: "Manuel A.", texto: "A las once de la noche y en 25 minutos estaba aquí.", puntuacion: 5, fecha: "2026-11-08", fuente: "google" },
    { autor: "Álvaro G.", texto: "Serio y rápido.", puntuacion: 5, fecha: "2026-10-29", fuente: "google" },
    { autor: "Lola C.", texto: "Un poco caro el festivo, pero lo avisó antes.", puntuacion: 4, fecha: "2026-10", fuente: "google" },
    { autor: "Bar Los Naranjos", texto: "Nos salvó el servicio del sábado.", puntuacion: 5, fecha: "2026-09-20", fuente: "google" },
    { autor: "Inmaculada P.", texto: "Nos quedamos sin luz en plena ola de calor con una persona mayor en casa. Me dijo por teléfono lo que costaba la salida y lo que podía ser. Llegó, lo arregló y no cobró ni un euro más.", puntuacion: 5, fecha: "2026-08-12", fuente: "google" },
  ],
  acreditaciones: [{ nombre: "Instalador habilitado en baja tensión (RII)", numero: "41/000000 (ficticio)" }],
  garantias: ["Precio de la salida antes de ir", "Factura con IVA", "Seguro de responsabilidad civil"],
  tarifas: {
    items: [
      { concepto: "Salida en horario de oficina", precio: "30 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Salida nocturna (22:00–8:00)", precio: "70 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Salida en festivo", precio: "80 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Hora de trabajo", precio: "35 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    ],
    nota: "IVA no incluido. El material va aparte.",
  },
  empresa: {
    historia: ["Llevo desde 2011 atendiendo urgencias en Sevilla y el Aljarafe."],
    imagenes: [
      { src: "/ejemplo/empresa-linterna.jpg", alt: "Linterna frontal y guantes sobre la caja de herramientas", origen: "ia" },
      { src: "/ejemplo/empresa-portal.jpg", alt: "Zaguán a oscuras con la luz de emergencia encendida", origen: "ia" },
    ],
    equipo: [],
  },
  preguntas: [
    { pregunta: "¿Cogéis el teléfono de madrugada?", respuesta: "Sí. Si no lo cogemos al momento, devolvemos la llamada en minutos." },
    { pregunta: "¿Puedo pagar con tarjeta?", respuesta: "Sí, con tarjeta o Bizum." },
  ],
  seo: { titulo: "Electricista urgente en Sevilla 24 h · Luz de Guardia", descripcion: "Urgencias eléctricas en Sevilla y el Aljarafe las 24 horas. Llegamos en 30 min y te decimos el precio antes.", url: "https://luzdeguardiaejemplo.example" },
  redes: {},
});
