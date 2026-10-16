import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Electricidad Ejemplo",
    nombreLegal: "Electricidad Ejemplo Instalaciones SL",
    nif: "B00000011",
    sector: "Electricista autorizado",
    descripcionCorta:
      "Empresa instaladora habilitada. Boletines, aumentos de potencia, puntos de recarga y averías eléctricas en Madrid norte.",
    anioFundacion: 2009,
    registroMercantil: "Inscrita en el Registro Mercantil de Madrid, tomo 0000, folio 00, hoja M-000000 (ficticio)",
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000000",
    whatsapp: "+34600000000",
    email: "avisos@electricidadejemplo.example",
    direccion: { calle: "Calle de Ejemplo, 18, local", cp: "28020", ciudad: "Madrid", provincia: "Madrid" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "20:00" },
      { dias: ["sabado"], abre: "09:00", cierra: "14:00" },
    ],
    mensajeWhatsapp: "Hola, os escribo desde vuestra web. Necesito un electricista para:",
    tiempoLlegada: "60 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000301",
  },
  zonas: ["Madrid", "Tetuán", "Chamartín", "Fuencarral", "Chamberí", "Alcobendas", "San Sebastián de los Reyes", "Tres Cantos"],
  valoracion: { media: 4.8, total: 64 },
  servicios: [
    {
      titulo: "Boletín eléctrico (CIE)",
      descripcion: "El certificado de instalación que te pide la compañía para dar de alta la luz o cambiar de titular.",
      contenido: [
        "El boletín eléctrico, o Certificado de Instalación Eléctrica (CIE), es el documento que dice que la instalación de tu vivienda cumple el reglamento. Lo firma una empresa instaladora habilitada.",
        "Te lo piden para dar de alta la luz en un piso que lleva tiempo sin suministro, para cambiar de titular en algunos casos o cuando subes la potencia contratada.",
        "Primero revisamos la instalación: el cuadro, la toma de tierra, el aislamiento de los cables. Si todo está bien, emitimos el certificado y lo registramos.",
        "Si hay que corregir algo, te lo decimos con su precio antes de tocar nada. El boletín no incluye esas correcciones: así no hay sorpresas.",
      ],
      incluye: [
        "Revisión completa de la instalación",
        "Medición de la toma de tierra y del aislamiento",
        "Certificado firmado por instalador habilitado",
        "Registro del certificado",
        "Factura con IVA",
      ],
      imagenes: [{ src: "/ejemplo/servicio-boletin.jpg", alt: "Manos midiendo con un comprobador en un cuadro eléctrico" }],
      preguntas: [
        { pregunta: "¿Cuánto tarda el boletín?", respuesta: "Depende de si la instalación necesita correcciones. Te damos la fecha cuando la revisamos." },
        { pregunta: "¿Qué pasa si mi instalación no cumple?", respuesta: "Te decimos qué hay que cambiar y cuánto cuesta. Tú decides si lo hacemos." },
        { pregunta: "¿Sirve para cualquier compañía?", respuesta: "Sí. El certificado es de la instalación, no de la compañía con la que contrates." },
      ],
      mensajeWhatsapp: "Hola, necesito un boletín eléctrico para mi vivienda. ¿Qué datos os paso?",
      precioDesde: "desde 160 € + IVA", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Aumento de potencia",
      descripcion: "Si te salta el diferencial al poner varios aparatos, revisamos y adaptamos la instalación para subir la potencia.",
      contenido: [
        "Cuando saltan los plomos al encender el horno y la lavadora a la vez, normalmente la potencia contratada se queda corta.",
        "Para subirla, la instalación tiene que soportarlo: revisamos la sección de los cables y el interruptor general, y si hace falta los cambiamos.",
      ],
      incluye: ["Revisión de la instalación", "Cambio del interruptor general si hace falta", "Boletín actualizado"],
      imagenes: [{ src: "/ejemplo/servicio-potencia.jpg", alt: "Cuadro eléctrico con un interruptor general nuevo" }],
      precioDesde: "desde 220 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Punto de recarga para coche eléctrico",
      descripcion: "Instalamos el cargador en tu garaje, también en garajes comunitarios.",
      imagenes: [{ src: "/ejemplo/servicio-recarga.jpg", alt: "Punto de recarga de pared en un garaje" }],
      mensajeWhatsapp: "Hola, quiero instalar un punto de recarga. Os mando foto del garaje y del cuadro:",
    },
    {
      titulo: "Averías y urgencias",
      descripcion: "Te quedas sin luz, salta el diferencial o huele a quemado: vamos a buscar el fallo.",
      imagenes: [{ src: "/ejemplo/servicio-averia.jpg", alt: "Técnico revisando un enchufe con una linterna frontal" }],
    },
    {
      titulo: "Cuadros eléctricos",
      descripcion: "Cambiamos cuadros antiguos de fusibles por cuadros con diferenciales y automáticos.",
      imagenes: [{ src: "/ejemplo/servicio-cuadro.jpg", alt: "Cuadro eléctrico nuevo con los automáticos alineados" }],
    },
    {
      titulo: "Instalaciones en reformas",
      descripcion: "Instalación eléctrica nueva para pisos en reforma, con su boletín.",
    },
  ],
  trabajos: [
    {
      titulo: "Cuadro nuevo en un piso de los años 70",
      descripcion: "Cambio de un cuadro de fusibles con cables quemados por un cuadro con diferenciales y automáticos, y boletín para el alta.",
      ubicacion: "Madrid (Tetuán)",
      anio: 2026,
      servicio: "cuadros-electricos",
      duracion: "1 día",
      precio: "unos 650 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "La vivienda llevaba años cerrada y la compañía pedía el boletín para dar de alta la luz. Al revisar el cuadro encontramos fusibles de porcelana y cables ennegrecidos.",
        "Montamos un cuadro nuevo, comprobamos la toma de tierra y emitimos el certificado.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-cuadro.jpg", alt: "Cuadro eléctrico renovado con diferenciales y automáticos nuevos" }],
      antes: { src: "/ejemplo/trabajo-cuadro-antes.jpg", alt: "El cuadro antiguo con fusibles de porcelana y cables quemados" },
      testimonio: { autor: "Elena S.", texto: "Me explicaron qué estaba mal antes de hacer nada. En una semana tenía luz." },
    },
    {
      titulo: "Punto de recarga en un garaje comunitario",
      descripcion: "Cargador de pared en una plaza de garaje, con la línea desde el contador del vecino.",
      ubicacion: "Alcobendas",
      anio: 2025,
      servicio: "punto-de-recarga-para-coche-electrico",
      duracion: "1 día",
      imagenes: [{ src: "/ejemplo/trabajo-recarga.jpg", alt: "Punto de recarga junto a una plaza de garaje" }],
    },
  ],
  resenas: [
    { autor: "Elena S.", texto: "Necesitaba el boletín para dar de alta la luz y me lo explicaron todo paso a paso. Muy serios.", puntuacion: 5, fecha: "2026-09-29", fuente: "google" },
    { autor: "Raúl G.", texto: "Llamé porque saltaba el diferencial y en una hora estaban en casa. Encontraron un enchufe con humedad.", puntuacion: 5, fecha: "2026-09-03", fuente: "google" },
    { autor: "Ana B.", texto: "Buen trabajo con el punto de recarga. El presupuesto fue el que dijeron.", puntuacion: 5, fecha: "2026-07-21", fuente: "google" },
    { autor: "Tomás P.", texto: "Correctos. Tuvieron que volver un segundo día por una pieza.", puntuacion: 4, fecha: "2026-06-10", fuente: "google" },
  ],
  proceso: [
    { titulo: "Nos llamas o escribes", texto: "Nos cuentas qué te piden: boletín, más potencia o una avería." },
    { titulo: "Revisamos", texto: "Vamos a tu casa y comprobamos cuadro, toma de tierra y cables." },
    { titulo: "Precio antes de empezar", texto: "Si hay que corregir algo, te lo decimos con su precio." },
    { titulo: "Certificado", texto: "Firmamos el boletín como empresa habilitada." },
    { titulo: "Registro y alta", texto: "Lo registramos y te damos los papeles para la compañía." },
  ],
  acreditaciones: [
    { nombre: "Empresa instaladora en baja tensión (RII), categoría especialista", numero: "28/000000 (ficticio)" },
  ],
  garantias: [
    "Presupuesto antes de empezar",
    "Factura con IVA",
    "Seguro de responsabilidad civil",
    "1 año de garantía en la mano de obra",
  ],
  empresa: {
    historia: [
      "Somos una empresa instaladora de Tetuán. Desde 2009 hacemos boletines, cuadros e instalaciones en el norte de Madrid.",
    ],
    imagenes: [{ src: "/ejemplo/empresa-furgoneta.jpg", alt: "Furgoneta blanca con las puertas traseras abiertas y material" }],
    equipo: [
      { nombre: "Sergio", cargo: "Instalador autorizado" },
      { nombre: "Iván", cargo: "Oficial electricista" },
    ],
  },
  preguntas: [
    { pregunta: "¿Qué es el boletín eléctrico?", respuesta: "Es el certificado que dice que tu instalación cumple el reglamento. Lo firma una empresa instaladora habilitada." },
    { pregunta: "¿Cobráis por ir a ver una avería?", respuesta: "Sí, el desplazamiento. Te decimos el precio por teléfono antes de ir." },
    { pregunta: "¿Dais factura?", respuesta: "Siempre, con IVA." },
    { pregunta: "¿Trabajáis en fin de semana?", respuesta: "Los sábados por la mañana. Fuera de ese horario, llámanos y te decimos si podemos ir." },
  ],
  marca: { colorPrimario: "#854d0e" },
  seo: {
    titulo: "Electricista autorizado en Madrid | Electricidad Ejemplo",
    descripcion: "Boletín eléctrico, aumento de potencia, puntos de recarga y averías en Tetuán y Madrid norte. Empresa instaladora habilitada.",
    url: "https://electricidadejemplo.example",
  },
  redes: { facebook: "https://facebook.com/electricidadejemplo" },
});
