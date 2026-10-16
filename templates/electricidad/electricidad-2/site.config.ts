import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Electricistas Ejemplo",
    nombreLegal: "Vicent Ejemplo Martí",
    nif: "00000012V",
    sector: "Electricista",
    descripcionCorta:
      "Electricistas de barrio con urgencias 24 h. Averías, cuadros, enchufes e iluminación. Te decimos el precio antes de empezar.",
    anioFundacion: 2003,
    tipoSchema: ["Electrician"],
  },
  contacto: {
    telefono: "+34600000000",
    whatsapp: "+34600000000",
    email: "hola@electricistasejemplo.example",
    direccion: { calle: "Carrer d'Exemple, 9, bajo", cp: "46020", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "20:00" },
      { dias: ["sabado"], abre: "09:00", cierra: "13:00" },
    ],
    mensajeWhatsapp: "Hola, os escribo desde vuestra web. Tengo un problema con la luz:",
    urgencias24h: true,
    tiempoLlegada: "45 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000302",
  },
  zonas: ["Valencia", "Benimaclet", "Campanar", "Russafa", "Algirós", "Alboraia", "Burjassot", "Mislata", "Paterna", "Tavernes Blanques"],
  valoracion: { media: 4.9, total: 112 },
  imagenesHero: [
    { src: "/ejemplo/hero.jpg", alt: "Electricista de espaldas revisando un cuadro eléctrico en el recibidor de un piso" },
  ],
  servicios: [
    {
      titulo: "Averías y urgencias",
      descripcion: "Te quedas sin luz, salta el diferencial o huele a quemado. Vamos a buscar el fallo, también de noche.",
      contenido: [
        "Cuando salta el diferencial y no vuelve a subir, casi siempre hay un aparato o un enchufe con un problema. Lo buscamos por partes hasta encontrarlo.",
        "Antes de reparar nada te decimos qué pasa y cuánto cuesta. Si es de noche o festivo, te avisamos del recargo por teléfono.",
      ],
      incluye: ["Diagnóstico del fallo", "Reparación en el momento si es posible", "Factura con IVA"],
      imagenes: [{ src: "/ejemplo/servicio-averia.jpg", alt: "Mano con un comprobador de tensión en un enchufe" }],
      preguntas: [
        { pregunta: "¿Venís de noche?", respuesta: "Sí, tenemos urgencias 24 h. Te decimos el recargo antes de ir." },
      ],
      mensajeWhatsapp: "Hola, tengo una avería eléctrica. Os mando una foto del cuadro:",
      precioDesde: "desde 45 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cuadros y diferenciales",
      descripcion: "Cambiamos cuadros antiguos y diferenciales que saltan sin motivo.",
      imagenes: [{ src: "/ejemplo/servicio-cuadro.jpg", alt: "Cuadro eléctrico doméstico con diferenciales nuevos" }],
      precioDesde: "desde 280 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Enchufes e iluminación",
      descripcion: "Enchufes nuevos, lámparas, apliques y luces LED en casa o en la escalera.",
      imagenes: [{ src: "/ejemplo/servicio-iluminacion.jpg", alt: "Manos instalando una lámpara de techo en un salón" }],
    },
    {
      titulo: "Boletín eléctrico",
      descripcion: "El certificado para dar de alta la luz o subir la potencia.",
      imagenes: [{ src: "/ejemplo/servicio-boletin.jpg", alt: "Carpeta con documentos y un comprobador sobre una mesa" }],
    },
    {
      titulo: "Instalaciones en reformas",
      descripcion: "Instalación eléctrica completa para pisos y locales en reforma.",
    },
  ],
  trabajos: [
    {
      titulo: "Enchufe quemado en una cocina",
      descripcion: "Un enchufe de la encimera se había derretido por una regleta sobrecargada. Cambiamos el enchufe y el cable hasta la caja.",
      ubicacion: "Valencia (Benimaclet)",
      anio: 2026,
      servicio: "averias-y-urgencias",
      duracion: "2 horas",
      imagenes: [{ src: "/ejemplo/trabajo-enchufe.jpg", alt: "Enchufe nuevo en la pared de una cocina" }],
      antes: { src: "/ejemplo/trabajo-enchufe-antes.jpg", alt: "El enchufe antes, derretido y con la pared ennegrecida" },
      testimonio: { autor: "Mari Carmen T.", texto: "Llamé asustada a las once de la noche y en media hora estaban aquí." },
    },
    {
      titulo: "Cuadro nuevo en un bajo comercial",
      descripcion: "Cambio de cuadro y separación de circuitos en un bajo que se quedaba sin luz al encender el aire.",
      ubicacion: "Alboraia",
      anio: 2025,
      servicio: "cuadros-y-diferenciales",
      duracion: "1 día",
      imagenes: [{ src: "/ejemplo/trabajo-cuadro.jpg", alt: "Cuadro eléctrico renovado en la trastienda de un local, con los cables en canaleta" }],
    },
    {
      titulo: "Luces LED en la escalera de una comunidad",
      descripcion: "Apliques LED con detector de presencia en los cinco rellanos de una finca.",
      ubicacion: "Valencia (Campanar)",
      anio: 2025,
      servicio: "enchufes-e-iluminacion",
      imagenes: [{ src: "/ejemplo/trabajo-iluminacion.jpg", alt: "Rellano de la escalera de una comunidad con apliques LED encendidos" }],
    },
  ],
  resenas: [
    { autor: "Mari Carmen T.", texto: "Se nos fue la luz a las once de la noche y en media hora estaban aquí. Encontraron el enchufe quemado y me explicaron todo con calma.", puntuacion: 5, fecha: "2026-10-04", fuente: "google" },
    { autor: "Pau R.", texto: "Llevo años llamándoles para todo. Puntuales, limpios y con precio claro.", puntuacion: 5, fecha: "2026-09-12", fuente: "google" },
    { autor: "Lorena G.", texto: "Me cambiaron el cuadro en una mañana. Muy recomendables.", puntuacion: 5, fecha: "2026-08-27", fuente: "google" },
    { autor: "Javier M.", texto: "Rápidos. Algo caros en urgencia, pero te lo dicen antes.", puntuacion: 4, fecha: "2026-07-30", fuente: "google" },
    { autor: "Amparo S.", texto: "Arreglaron la luz de la escalera de la comunidad y quedó estupenda.", puntuacion: 5, fecha: "2026-06-18", fuente: "google" },
  ],
  acreditaciones: [
    { nombre: "Empresa instaladora en baja tensión (RII), categoría básica", numero: "46/000000 (ficticio)" },
  ],
  garantias: [
    "Precio antes de empezar",
    "Factura con IVA",
    "Seguro de responsabilidad civil",
    "Dejamos todo limpio",
  ],
  empresa: {
    historia: [
      "Somos electricistas de Benimaclet desde 2003. La mayoría de nuestros clientes nos conocen porque se lo dijo un vecino.",
    ],
    imagenes: [
      { src: "/ejemplo/empresa-furgoneta.jpg", alt: "Furgoneta blanca en una calle de barrio con naranjos" },
      { src: "/ejemplo/empresa-equipo.jpg", alt: "Dos técnicos de espaldas caminando hacia un portal" },
    ],
    equipo: [
      { nombre: "Vicent", cargo: "Electricista" },
      { nombre: "Dani", cargo: "Electricista" },
    ],
  },
  preguntas: [
    { pregunta: "¿Cuánto cuesta que vengáis?", respuesta: "Te lo decimos por teléfono antes de ir, según la hora y la zona." },
    { pregunta: "¿Venís de noche y en festivo?", respuesta: "Sí, tenemos urgencias 24 h, con recargo. Te lo decimos antes." },
    { pregunta: "¿Dais factura?", respuesta: "Siempre, con IVA." },
  ],
  marca: { colorPrimario: "#be185d" },
  seo: {
    titulo: "Electricista 24 h en Valencia | Electricistas Ejemplo",
    descripcion: "Electricistas en Benimaclet y Valencia: averías 24 h, cuadros, enchufes e iluminación. Precio antes de empezar.",
    url: "https://electricistasejemplo.example",
  },
  redes: { instagram: "https://instagram.com/electricistasejemplo" },
});
