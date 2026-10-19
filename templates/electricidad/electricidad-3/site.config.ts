import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Electro Ejemplo",
    nombreLegal: "Electro Ejemplo Servicios SL",
    nif: "B00000013",
    sector: "Electricista urgente",
    descripcionCorta:
      "Electricistas 24 h en Sevilla y alrededores. Averías, diferenciales, enchufes y cuadros, con los precios a la vista.",
    anioFundacion: 2015,
    registroMercantil: "Inscrita en el Registro Mercantil de Sevilla, tomo 0000, folio 00, hoja SE-000000 (ficticio)",
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000000",
    whatsapp: "+34600000000",
    email: "urgencias@electroejemplo.example",
    direccion: { calle: "Calle Ejemplo, 42", cp: "41005", ciudad: "Sevilla", provincia: "Sevilla" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "21:00" },
      { dias: ["sabado"], abre: "09:00", cierra: "14:00" },
    ],
    mensajeWhatsapp: "Hola, os escribo desde vuestra web. Tengo una avería eléctrica:",
    urgencias24h: true,
    tiempoLlegada: "40 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000303",
  },
  zonas: ["Sevilla", "Nervión", "Triana", "Los Remedios", "Macarena", "Dos Hermanas", "Camas", "Tomares", "Mairena del Aljarafe", "San Juan de Aznalfarache"],
  valoracion: { media: 4.6, total: 58 },
  imagenesHero: [
    { src: "/ejemplo/hero.jpg", alt: "Electricista de espaldas, con chaqueta de trabajo gris oscura, comprobando con un destornillador comprobador el cuadro eléctrico abierto de un recibidor, junto a un perchero con una chaqueta granate" },
  ],
  servicios: [
    {
      titulo: "Averías urgentes",
      descripcion: "Te quedas sin luz o huele a quemado: vamos a buscar el fallo, de día o de noche.",
      contenido: [
        "Si se ha ido la luz en toda la casa o en una parte, primero comprobamos el cuadro y después cada circuito hasta encontrar el fallo.",
        "Por teléfono te decimos el desplazamiento y la hora. Si es de noche o festivo, también el recargo.",
      ],
      incluye: ["Desplazamiento y diagnóstico", "Reparación en el momento si es posible", "Factura con IVA"],
      imagenes: [{ src: "/ejemplo/servicio-averia.jpg", alt: "Mano con linterna iluminando un cuadro eléctrico sobre el marco de una puerta" }],
      preguntas: [
        { pregunta: "¿Cuánto tardáis en llegar?", respuesta: "Normalmente menos de una hora en Sevilla capital. Te decimos la hora al salir." },
      ],
      mensajeWhatsapp: "Hola, me he quedado sin luz. Os mando una foto del cuadro:",
      precioDesde: "desde 35 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Diferencial que salta",
      descripcion: "Buscamos qué lo hace saltar: un aparato, un enchufe con humedad o un cable dañado.",
      imagenes: [{ src: "/ejemplo/servicio-diferencial.jpg", alt: "Diferencial nuevo junto al antiguo, amarillento, en un cuadro eléctrico" }],
      precioDesde: "desde 60 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Enchufes e interruptores",
      descripcion: "Cambiamos enchufes quemados o flojos e instalamos enchufes nuevos.",
      imagenes: [{ src: "/ejemplo/servicio-enchufe.jpg", alt: "Manos colocando un enchufe nuevo con un destornillador junto a una mesilla" }],
      precioDesde: "desde 30 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Línea para el aire acondicionado",
      descripcion: "Si el aire hace saltar la luz, le ponemos su propia línea y su protección.",
      imagenes: [{ src: "/ejemplo/servicio-aire.jpg", alt: "Unidad exterior de aire acondicionado con una canaleta eléctrica nueva" }],
    },
    {
      titulo: "Cuadros eléctricos",
      descripcion: "Cambio de cuadros quemados o antiguos por cuadros con protecciones nuevas.",
    },
    {
      titulo: "Boletín eléctrico",
      descripcion: "Certificado para dar de alta la luz o subir la potencia.",
      precioDesde: "desde 150 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
  ],
  trabajos: [
    {
      titulo: "Cuadro quemado en una casa de Dos Hermanas",
      descripcion: "Un automático en mal estado se calentó hasta quemar el cuadro. Lo cambiamos entero esa misma noche y revisamos los circuitos.",
      ubicacion: "Dos Hermanas",
      anio: 2026,
      servicio: "cuadros-electricos",
      duracion: "4 horas",
      precio: "unos 420 €", // PRECIO FICTICIO: borrar en la web del cliente
      imagenes: [{ src: "/ejemplo/trabajo-cuadro.jpg", alt: "Cuadro eléctrico nuevo con los automáticos alineados" }],
      antes: { src: "/ejemplo/trabajo-cuadro-antes.jpg", alt: "El cuadro antes, chamuscado, con cables derretidos y hollín en la pared" },
      testimonio: { autor: "Juan Antonio R.", texto: "Me dijeron el precio por teléfono y fue exactamente ese. A la una de la madrugada." },
    },
    {
      titulo: "Línea para el aire en Los Remedios",
      descripcion: "El aire del salón hacía saltar la luz cada tarde. Instalamos una línea propia con su automático.",
      ubicacion: "Sevilla (Los Remedios)",
      anio: 2026,
      servicio: "linea-para-el-aire-acondicionado",
      duracion: "3 horas",
      imagenes: [{ src: "/ejemplo/trabajo-aire.jpg", alt: "Línea eléctrica nueva por canaleta hasta el aire acondicionado" }],
    },
    {
      titulo: "Diferencial que saltaba en Triana",
      descripcion: "Una caja de registro con humedad hacía saltar el diferencial al llover. La secamos y rehicimos el empalme.",
      ubicacion: "Sevilla (Triana)",
      anio: 2025,
      servicio: "diferencial-que-salta",
      imagenes: [{ src: "/ejemplo/trabajo-diferencial.jpg", alt: "Caja de registro abierta con empalmes nuevos junto a una mancha de humedad" }],
    },
  ],
  resenas: [
    { autor: "Juan Antonio R.", texto: "Se quemó el cuadro de madrugada. Vinieron en cuarenta minutos y el precio fue el que me dijeron por teléfono.", puntuacion: 5, fecha: "2026-09-26", fuente: "google" },
    { autor: "Rocío M.", texto: "En pleno agosto el aire hacía saltar la luz. Lo solucionaron esa misma tarde.", puntuacion: 5, fecha: "2026-08-11", fuente: "google" },
    { autor: "Fernando C.", texto: "Correctos y rápidos. El recargo de domingo es caro, pero te lo avisan.", puntuacion: 4, fecha: "2026-06-29", fuente: "google" },
  ],
  tarifas: {
    items: [
      { concepto: "Desplazamiento y diagnóstico", precio: "35 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Hora de trabajo", precio: "38 €/h" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Recargo noche, domingo y festivo", precio: "+50 %" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Cambio de enchufe o interruptor", precio: "desde 30 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Cambio de diferencial", precio: "desde 90 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Boletín eléctrico de vivienda", precio: "desde 150 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    ],
    nota: "IVA incluido. El precio final te lo decimos antes de empezar, cuando vemos la avería.",
  },
  acreditaciones: [
    { nombre: "Empresa instaladora en baja tensión (RII), categoría especialista", numero: "41/000000 (ficticio)" },
  ],
  garantias: [
    "Precio antes de empezar",
    "Factura con IVA",
    "6 meses de garantía en la reparación",
    "Seguro de responsabilidad civil",
  ],
  empresa: {
    historia: [
      "Empezamos en 2015 con una furgoneta y un teléfono que siempre se coge. Hoy somos cuatro electricistas en Sevilla y el Aljarafe.",
    ],
    imagenes: [{ src: "/ejemplo/empresa-furgoneta.jpg", alt: "Furgoneta blanca aparcada de noche con las puertas traseras abiertas" }],
  },
  preguntas: [
    { pregunta: "¿Cuánto cuesta una urgencia de noche?", respuesta: "El desplazamiento y la hora, más el recargo de noche. Te lo decimos por teléfono antes de salir." },
    { pregunta: "¿Y si al final no lo podéis arreglar en el momento?", respuesta: "Te dejamos la luz segura y te damos el precio de la reparación antes de hacerla." },
    { pregunta: "¿Dais factura?", respuesta: "Siempre, con IVA." },
  ],
  marca: { colorPrimario: "#7e22ce" },
  seo: {
    titulo: "Electricista urgente 24 h en Sevilla | Electro Ejemplo",
    descripcion: "Electricistas 24 h en Sevilla: averías, diferenciales, enchufes y cuadros. Precios a la vista y presupuesto antes de empezar.",
    url: "https://electroejemplo.example",
  },
  redes: { instagram: "https://instagram.com/electroejemplo" },
});
