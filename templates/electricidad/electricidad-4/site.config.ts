// Datos de ejemplo de «Cuadro» (electricidad-4): negocio FICTICIO de Valencia (encargo §11), con
// el patrón ficticio evidente de electricidad-1/2/3 (Calle Ejemplo, dominio .example, cid de ceros,
// registro y acreditación «(ficticio)»).
// NIF de ejemplo con dígito de control inválido. Fotos de public/ejemplo/: relleno gris pendiente
// de las fotos de IA (CREDITOS.md), todas con origen "ia". Sin seo.indexar ni analítica: las activa
// cada web, nunca el template.
import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Quadre Nou",
    nombreLegal: "Quadre Nou Instal·lacions, S.L.",
    nif: "B42918376",
    sector: "Electricista",
    descripcionCorta: "Averías, cuadros y boletines en Valencia. Empresa instaladora habilitada; te decimos el precio antes de tocar nada.",
    anioFundacion: 2008,
    registroMercantil: "Inscrita en el Registro Mercantil de Valencia, tomo 0000, folio 00, hoja V-000000 (ficticio)",
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000104",
    whatsapp: "+34600000104",
    email: "hola@quadrenouejemplo.example",
    direccion: { calle: "Calle Ejemplo, 23, bajo", cp: "46005", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "19:30" },
      { dias: ["sabado"], abre: "09:00", cierra: "13:00" },
    ],
    urgencias24h: true,
    tiempoLlegada: "35 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000304"
  },
  zonas: ["Valencia", "Paiporta", "Catarroja", "Alfafar", "Benetússer", "Picanya", "Massanassa", "Alaquàs"],
  servicios: [
    {
      titulo: "Reparación de averías", slug: "averias",
      descripcion: "Salta el diferencial, media casa sin luz o un enchufe que huele a quemado.",
      contenido: [
        "Si salta el diferencial y no se queda arriba, hay una fuga a tierra en algún circuito. Lo localizamos desconectando circuito a circuito y medimos el aislamiento.",
        "Antes de reparar te decimos qué es y cuánto cuesta. Si hay que cambiar una pieza, la llevamos en la furgoneta.",
      ],
      incluye: ["Localización de la avería", "Medición de aislamiento", "Factura con IVA"],
      imagenes: [{ src: "/ejemplo/servicio-averias.jpg", alt: "Fila de interruptores automáticos con uno bajado", origen: "ia" }],
      preguntas: [{ pregunta: "¿Venís de noche?", respuesta: "Sí, las urgencias se atienden las 24 horas." }],
      precioDesde: "desde 45 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cambio de cuadro eléctrico", slug: "cuadro-electrico",
      descripcion: "Cuadro viejo con fusibles, sin diferencial o que se calienta.",
      contenido: ["Sustituimos el cuadro completo por uno con diferencial y un circuito por uso: alumbrado, enchufes, cocina, baño y aire acondicionado."],
      incluye: ["Cuadro nuevo con diferencial", "Rotulado de circuitos", "Certificado de la instalación"],
      imagenes: [{ src: "/ejemplo/servicio-cuadro.jpg", alt: "Cuadro eléctrico nuevo con los cables ordenados", origen: "ia" }],
      preguntas: [],
      precioDesde: "desde 390 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Boletín eléctrico (CIE)", slug: "boletin-electrico",
      descripcion: "Para dar de alta la luz, cambiar de titular o subir la potencia.",
      contenido: ["Revisamos la instalación, la certificamos y tramitamos el certificado. Si hay que corregir algo, te lo presupuestamos aparte antes de hacerlo."],
      incluye: ["Revisión", "Certificado firmado", "Tramitación"],
      imagenes: [{ src: "/ejemplo/servicio-boletin.jpg", alt: "Contador digital en una centralización de contadores", origen: "ia" }],
      preguntas: [],
      precioDesde: "desde 140 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    { titulo: "Aumento de potencia", slug: "aumento-de-potencia", descripcion: "Se va la luz de toda la casa al encender varias cosas a la vez.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-potencia.jpg", alt: "Interruptor general en caja precintada", origen: "ia" }], preguntas: [] },
    { titulo: "Circuito nuevo para horno o termo", slug: "circuito-nuevo", descripcion: "Salta siempre el mismo automático al usar el horno, la placa o el termo.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-circuito.jpg", alt: "Interruptor automático nuevo añadido en un cuadro con su cable", origen: "ia" }], preguntas: [] },
    { titulo: "Instalaciones en locales", slug: "instalaciones-locales", descripcion: "Un bajo comercial que no pasa la revisión o se queda corto de enchufes.", contenido: [], incluye: [], imagenes: [{ src: "/ejemplo/servicio-local.jpg", alt: "Cuadro de un bajo comercial con diferenciales en fila", origen: "ia" }], preguntas: [] },
    { titulo: "Instalación en reformas", slug: "instalacion-reformas", descripcion: "Instalación nueva de una cocina, un baño o el piso entero.", contenido: [], incluye: [], imagenes: [], preguntas: [] },
  ],
  trabajos: [
    { titulo: "Cuadro nuevo en un piso de 1962", slug: "cuadro-ruzafa", descripcion: "Cuadro de fusibles de porcelana sustituido por uno con diferencial y seis circuitos.", ubicacion: "Ruzafa, Valencia", anio: 2025, servicio: "cuadro-electrico", superficie: "85 m²", duracion: "1 día", contenido: ["La vivienda no tenía diferencial. Separamos los circuitos y rotulamos cada uno."], imagenes: [{ src: "/ejemplo/trabajo-cuadro-ruzafa.jpg", alt: "Cuadro eléctrico nuevo instalado", origen: "ia" }], antes: { src: "/ejemplo/antes-cuadro-ruzafa.jpg", alt: "Cuadro antiguo con fusibles de porcelana", origen: "ia" }, testimonio: { autor: "Amparo G.", texto: "Vinieron a las nueve y a las cinco estaba todo hecho y limpio." } },
    { titulo: "Circuito propio para la inducción", slug: "circuito-paiporta", descripcion: "La placa nueva hacía saltar el automático de la cocina. Circuito propio desde el cuadro.", ubicacion: "Paiporta", anio: 2026, servicio: "circuito-nuevo", duracion: "Medio día", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-circuito-paiporta.jpg", alt: "Cuadro de una vivienda con un circuito nuevo", origen: "ia" }] },
    { titulo: "Ordenar la instalación de una panadería", slug: "local-catarroja", descripcion: "Cableado suelto recogido en canaleta y cuadro nuevo para los hornos.", ubicacion: "Catarroja", anio: 2025, servicio: "instalaciones-locales", superficie: "60 m²", duracion: "2 días", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-local-catarroja.jpg", alt: "Canaleta y cuadro ordenados en un local", origen: "ia" }], antes: { src: "/ejemplo/antes-local-catarroja.jpg", alt: "Cables sueltos en la pared del local antes del trabajo", origen: "ia" } },
    { titulo: "Subida a 6,9 kW", slug: "potencia-alfafar", descripcion: "Cambio de la caja general y del interruptor general para la cocina de inducción y el aire.", ubicacion: "Alfafar", anio: 2026, servicio: "aumento-de-potencia", duracion: "Medio día", contenido: [], imagenes: [{ src: "/ejemplo/trabajo-potencia-alfafar.jpg", alt: "Caja general de protección nueva", origen: "ia" }] },
  ],
  valoracion: { media: 4.8, total: 96 },
  resenas: [
    { autor: "Vicent R.", texto: "Saltaba el diferencial cada noche. En media hora encontró la fuga en la terraza.", puntuacion: 5, fecha: "2026-10-21", fuente: "google" },
    { autor: "Lucía M.", texto: "Rápidos.", puntuacion: 5, fecha: "2026-10-02", fuente: "google" },
    { autor: "Javier P.", texto: "Nos hicieron el boletín para el alta del piso. Me dijeron el precio por teléfono antes de venir y no cambió ni un euro. En dos días lo tenían todo tramitado.", puntuacion: 5, fecha: "2026-09-14", fuente: "google" },
    { autor: "Rosa T.", texto: "Muy limpios trabajando. Repetiría.", puntuacion: 4, fecha: "2026-08", fuente: "google" },
    { autor: "Andrés C.", texto: "Vinieron un domingo a las once de la noche. Precio razonable para la hora.", puntuacion: 5, fecha: "2026-07-30", fuente: "google" },
  ],
  acreditaciones: [{ nombre: "Empresa instaladora en baja tensión (RII), categoría especialista", numero: "46/000000 (ficticio)" }],
  garantias: ["Precio antes de empezar", "Factura con IVA", "Seguro de responsabilidad civil"],
  tarifas: {
    items: [
      { concepto: "Desplazamiento en Valencia", precio: "25 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Hora de trabajo", precio: "35 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Urgencia nocturna o festivo", precio: "+ 40 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    ],
    nota: "IVA no incluido.",
  },
  empresa: {
    historia: ["Empezamos en 2008 en Ruzafa con una furgoneta. Hoy somos cuatro electricistas."],
    imagenes: [
      { src: "/ejemplo/empresa-almacen.jpg", alt: "Bobinas de cable en el almacén", origen: "ia" },
      { src: "/ejemplo/empresa-furgoneta-interior.jpg", alt: "Interior de la furgoneta con el material ordenado", origen: "ia" },
    ],
    equipo: [],
  },
  galeria: [{ src: "/ejemplo/galeria-mecanismos.jpg", alt: "Mecanismos nuevos en una pared lisa", origen: "ia", titulo: "Mecanismos" }],
  preguntas: [
    { pregunta: "¿Cobráis por venir?", respuesta: "Sí, el desplazamiento. Te lo decimos por teléfono antes de ir." },
    { pregunta: "¿Hacéis factura?", respuesta: "Siempre, con IVA." },
  ],
  marcas: ["Schneider Electric", "Hager", "Simon"],
  seo: { titulo: "Electricista en Valencia · Quadre Nou", descripcion: "Averías, cuadros eléctricos y boletines en Valencia. Urgencias 24 h y llegada en 35 min.", url: "https://quadrenouejemplo.example" },
  redes: { instagram: "https://www.instagram.com/quadrenou.ejemplo" },
});
