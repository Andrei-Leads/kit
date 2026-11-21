import { defineSiteConfig } from "@andrei-leads/core";

// fontaneria-1 «Qué te pasa» · datos de ejemplo ficticios (Valencia, zona norte y l'Horta Nord).
// Nombre, NIF, registro, teléfono, email y acreditaciones son inventados. Las fotos de
// public/ejemplo/ son de relleno (origen "ia": las generará Ysst con IA; ver CREDITOS.md).
// Sin seo.indexar ni la analítica de Vercel: las activa cada web, nunca el template.

export default defineSiteConfig({
  negocio: {
    nombre: "Aigua Nord",
    nombreLegal: "Aigua Nord Fontaneros, S.L.",
    nif: "B00000005", // ficticio: dígito de control incorrecto a propósito
    sector: "Fontanería",
    descripcionCorta: "Fontaneros en Valencia y l'Horta Nord. Fugas, atascos, termos y cisternas, con presupuesto antes de tocar nada.",
    anioFundacion: 1996,
    registroMercantil: "Registro Mercantil de Valencia, tomo 10482, folio 117, hoja V-182340",
    tipoSchema: ["Plumber"],
  },
  contacto: {
    telefono: "+34600001001",
    whatsapp: "+34600001001",
    email: "hola@aiguanord.example",
    direccion: { calle: "Carrer d'Emili Baró 45, bajo", cp: "46020", ciudad: "Valencia", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:00", cierra: "20:00" },
      { dias: ["sabado"], abre: "09:00", cierra: "14:00" },
    ],
    coordenadas: { lat: 39.4872, lng: -0.3604 },
    urgencias24h: true,
    tiempoLlegada: "40 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000001",
  },
  zonas: ["Valencia", "Alboraya", "Almàssera", "Tavernes Blanques", "Burjassot", "Godella", "Rocafort", "Moncada", "Meliana", "Paterna"],
  servicios: [
    {
      titulo: "Fuga de agua",
      slug: "fuga-de-agua",
      descripcion: "Encontramos la fuga sin romper de más y la reparamos el mismo día.",
      contenido: [
        "Una mancha en el techo del vecino, el contador que gira con todo cerrado o un charco que vuelve: son fugas. Venimos con cámara térmica y geófono para encontrarla sin levantar media cocina.",
        "Te decimos dónde está y cuánto cuesta antes de abrir. Si hay que picar, abrimos lo justo y te enseñamos el tramo nuevo antes de cerrar.",
        "Si el agua ha llegado al piso de abajo, te damos un informe con fotos para el seguro.",
      ],
      incluye: ["Detección con cámara térmica y geófono", "Reparación del tramo dañado", "Prueba de presión", "Informe con fotos para el seguro"],
      imagenes: [{ src: "/ejemplo/fuga-codo.jpg", alt: "Codo de cobre con una gota a punto de caer y un cerco de cal", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Tenéis que romper la pared?", respuesta: "Solo lo justo. Primero localizamos la fuga con aparatos y abrimos un hueco pequeño en el punto exacto." },
        { pregunta: "¿Lo cubre el seguro del hogar?", respuesta: "Muchas pólizas cubren la localización y los daños. Te damos el informe con fotos que pide el perito." },
      ],
      precioDesde: "desde 60 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "El váter o el fregadero no traga",
      slug: "atascos",
      descripcion: "Desatascamos fregaderos, váteres y bajantes con máquina, sin productos que dañen la tubería.",
      contenido: [
        "Si el agua baja despacio, hace gorgoteos o sube por la ducha, hay un atasco. Lo quitamos con máquina de muelle o con agua a presión, según dónde esté.",
        "Al terminar revisamos el sifón y la bajante para que no vuelva a pasar en una semana, y dejamos la zona limpia.",
      ],
      incluye: ["Desatasco con máquina de muelle o agua a presión", "Revisión del sifón y la bajante", "Limpieza de la zona al terminar"],
      imagenes: [{ src: "/ejemplo/sifon.jpg", alt: "Sifón de PVC desmontado sobre una bayeta, con agua turbia", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Sirve el desatascador de bote?", respuesta: "A veces, pero los productos fuertes estropean las tuberías viejas. Si no ha bajado en una hora, llámanos." },
        { pregunta: "¿Desatascáis bajantes de comunidad?", respuesta: "Sí. Damos presupuesto por escrito y factura a nombre de la comunidad." },
      ],
      precioDesde: "desde 70 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "El termo no calienta",
      slug: "termo",
      descripcion: "Reparamos o cambiamos termos eléctricos y calentadores de gas, casi siempre en el día.",
      contenido: [
        "Si el agua sale tibia, el termo gotea por la válvula o salta la luz al encenderlo, suele ser la resistencia, el termostato o la cal.",
        "Te decimos si compensa repararlo o cambiarlo. Si es cambio, traemos el termo nuevo y nos llevamos el viejo.",
      ],
      incluye: ["Diagnóstico de resistencia, termostato y válvula", "Cambio de termo con retirada del viejo", "Válvula de seguridad nueva"],
      imagenes: [{ src: "/ejemplo/termo-valvula.jpg", alt: "Válvula de seguridad de un termo eléctrico goteando", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Compensa reparar o cambiar?", respuesta: "Si el termo tiene más de diez años o el depósito pierde agua, casi siempre compensa cambiarlo. Te lo decimos antes de empezar." },
        { pregunta: "¿Os lleváis el termo viejo?", respuesta: "Sí, lo retiramos y lo llevamos al punto limpio." },
      ],
    },
    {
      titulo: "La cisterna no para de cargar",
      slug: "cisterna",
      descripcion: "Cambiamos el mecanismo de llenado o de descarga y se acaba el ruido y el gasto de agua.",
      contenido: [
        "Una cisterna que no para puede gastar cientos de litros al día. Casi siempre es el mecanismo de llenado o la goma de la descarga.",
        "Llevamos mecanismos universales en la furgoneta, así que se arregla en la misma visita.",
      ],
      incluye: ["Mecanismo de llenado o de descarga nuevo", "Ajuste del nivel de agua", "Revisión de la llave de escuadra"],
      imagenes: [{ src: "/ejemplo/cisterna.jpg", alt: "Mecanismo de descarga de una cisterna abierta, con agua clara", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cuánta agua se pierde?", respuesta: "Una cisterna que no cierra puede perder más de 200 litros al día. Se nota en la factura." },
        { pregunta: "¿Vale para cisternas empotradas?", respuesta: "Sí. Se accede por el pulsador y cambiamos el mecanismo sin romper el azulejo." },
      ],
    },
    {
      titulo: "Grifo que gotea o pierde presión",
      slug: "griferia",
      descripcion: "Cambiamos cartuchos, limpiamos la cal o montamos un grifo nuevo.",
      contenido: [
        "El goteo suele ser el cartucho o la montura; la poca presión, cal en el aireador o en los latiguillos.",
        "Si el grifo no tiene arreglo, te enseñamos dos o tres opciones con precio y lo montamos en el momento.",
      ],
      incluye: ["Cartucho o montura nueva", "Limpieza de aireadores y latiguillos", "Montaje de grifo nuevo si no tiene arreglo"],
      imagenes: [{ src: "/ejemplo/grifo-cal.jpg", alt: "Grifo monomando con cal y una gota colgando", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Traéis vosotros el grifo?", respuesta: "Sí, si quieres. También montamos el que hayas comprado tú." },
        { pregunta: "¿Por qué pierde presión?", respuesta: "Casi siempre es cal. En Valencia el agua es dura y tapa los aireadores en pocos meses." },
      ],
    },
    {
      titulo: "Cambio de bañera por plato de ducha",
      slug: "plato-de-ducha",
      descripcion: "Quitamos la bañera y dejamos un plato de ducha de resina en un día, sin obra en el resto del baño.",
      contenido: [
        "Retiramos la bañera, adaptamos el desagüe y colocamos un plato de resina a medida. El azulejo de alrededor se remata con piezas a juego.",
        "En la mayoría de los pisos se hace en un día y por la noche ya te puedes duchar.",
      ],
      incluye: ["Retirada de la bañera y escombros", "Plato de resina a medida", "Desagüe nuevo y sellado", "Remate de azulejo en la zona"],
      imagenes: [{ src: "/ejemplo/plato-ducha.jpg", alt: "Desagüe de un plato de ducha de resina con agua", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Hay que cambiar todo el azulejo?", respuesta: "No. Solo se remata la franja donde iba la bañera." },
        { pregunta: "¿Cuánto tiempo estoy sin ducha?", respuesta: "Normalmente un día. La silicona necesita unas horas antes de usarla." },
      ],
    },
    {
      titulo: "Tuberías viejas de plomo o hierro",
      slug: "cambio-de-tuberias",
      descripcion: "Sustituimos tuberías de plomo y de hierro galvanizado por multicapa, por tramos o el piso entero.",
      contenido: [
        "En muchos pisos de los años 60 y 70 sigue habiendo plomo o hierro galvanizado. Pierden presión, se oxidan y acaban en fuga.",
        "Lo cambiamos por multicapa con llaves de corte por zonas. Trabajamos por estancias para que no te quedes sin agua más de unas horas.",
      ],
      incluye: ["Estudio de la instalación y presupuesto por escrito", "Multicapa nuevo con llaves de corte por zonas", "Prueba de presión antes de cerrar"],
      imagenes: [{ src: "/ejemplo/tuberia-plomo.jpg", alt: "Tramo de tubería de plomo viejo junto a un tramo de multicapa nuevo", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cómo sé si tengo tuberías de plomo?", respuesta: "El plomo es gris mate y se raya con una llave. Si no lo ves claro, lo miramos en la visita." },
        { pregunta: "¿Hay que levantar el suelo?", respuesta: "Casi nunca. Solemos ir por pared y techo, con rozas pequeñas." },
      ],
    },
    {
      titulo: "Llave de paso que no cierra",
      slug: "llave-de-paso",
      descripcion: "Cambiamos llaves de paso agarrotadas o que gotean, también la general del piso.",
      contenido: [
        "Una llave de paso que no cierra es un problema el día que hay una fuga. Las viejas de compuerta se agarrotan con la cal.",
        "La cambiamos por una de esfera, que cierra con un cuarto de vuelta y no se agarrota.",
      ],
      incluye: ["Llave de esfera nueva", "Corte y reposición del agua", "Prueba de estanqueidad"],
      imagenes: [{ src: "/ejemplo/llave-paso.jpg", alt: "Llave de paso de latón empotrada en azulejo blanco, con una gota", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Hay que cortar el agua del edificio?", respuesta: "Solo si la llave a cambiar es la general del piso y no hay otra antes. Avisamos al presidente o al administrador." },
        { pregunta: "¿Cada cuánto conviene moverla?", respuesta: "Ábrela y ciérrala un par de veces al año para que no se agarrote." },
      ],
    },
  ],
  trabajos: [
    {
      titulo: "Tuberías de plomo fuera en un piso de 1964",
      slug: "tuberias-plomo-benimaclet",
      descripcion: "Toda la instalación de agua de un piso de Benimaclet: fuera el plomo y el hierro, multicapa nuevo y llaves de corte por zonas.",
      ubicacion: "Benimaclet (Valencia)",
      anio: 2025,
      servicio: "cambio-de-tuberias",
      duracion: "3 días",
      contenido: [
        "La propietaria tenía poca presión en la ducha y miedo al plomo. Encontramos tramos de plomo en la cocina y de hierro galvanizado en el baño.",
        "Cambiamos la instalación por estancias, con el agua cortada solo por las mañanas, y dejamos la cocina tapada y limpia cada tarde.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-tuberias.jpg", alt: "Pared de cocina abierta con tubería multicapa nueva donde antes iba el plomo", origen: "ia" }],
      testimonio: { autor: "Pepa M.", texto: "Llevaba años con miedo al plomo. En tres días estaba hecho y cada tarde me dejaban la cocina recogida." },
    },
    {
      titulo: "Bañera por plato de ducha en un piso de Burjassot",
      slug: "plato-ducha-burjassot",
      descripcion: "Bañera de chapa fuera y plato de resina a medida, con el desagüe nuevo y el azulejo rematado.",
      ubicacion: "Burjassot",
      anio: 2026,
      servicio: "plato-de-ducha",
      superficie: "4 m²",
      duracion: "1 día",
      precio: "entre 1.200 y 1.600 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Un matrimonio mayor que ya no podía entrar en la bañera. Quitamos la bañera de chapa, adaptamos el desagüe y colocamos un plato de resina antideslizante.",
        "Rematamos la franja de azulejo con piezas parecidas a las originales y esa misma noche ya se podían duchar.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-bano.jpg", alt: "Plato de ducha de resina nuevo con mampara, en un baño de azulejo blanco", origen: "ia" }],
      antes: { src: "/ejemplo/trabajo-bano-antes.jpg", alt: "La misma pared del baño con la bañera de chapa antigua", origen: "ia" },
    },
    {
      titulo: "Fuga oculta bajo el suelo de la cocina",
      slug: "fuga-cocina-alboraya",
      descripcion: "El contador giraba con todo cerrado. Encontramos la fuga bajo la baldosa sin levantar la cocina.",
      ubicacion: "Alboraya",
      anio: 2026,
      servicio: "fuga-de-agua",
      duracion: "5 horas",
      contenido: [
        "Con el geófono localizamos la fuga en un codo bajo el suelo, a medio metro del fregadero.",
        "Levantamos dos baldosas, cambiamos el codo y volvimos a colocar las mismas piezas.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-fuga.jpg", alt: "Baldosa levantada con la tubería reparada debajo y una gota en el borde", origen: "ia" }],
    },
    {
      titulo: "Termo de 80 litros cambiado en el día",
      slug: "termo-80-paterna",
      descripcion: "Termo de quince años con el depósito picado. Termo nuevo, válvula y latiguillos de latón.",
      ubicacion: "Paterna",
      anio: 2025,
      servicio: "termo",
      duracion: "3 horas",
      contenido: [
        "El termo goteaba por abajo: el depósito estaba picado y no tenía arreglo.",
        "Llevamos uno nuevo de 80 litros esa misma tarde y nos llevamos el viejo.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-termo.jpg", alt: "Termo eléctrico nuevo con su válvula y latiguillos de latón", origen: "ia" }],
    },
    {
      titulo: "Atasco en el fregadero de una cafetería",
      slug: "fregadero-cafeteria-godella",
      descripcion: "Fregadero de barra atascado de grasa en plena mañana. Desatasco y sifón de acero nuevo.",
      ubicacion: "Godella",
      anio: 2024,
      servicio: "atascos",
      duracion: "2 horas",
      contenido: [
        "La grasa del lavavajillas había cerrado el tubo hasta la arqueta.",
        "Desatascamos con agua a presión y montamos un sifón de acero registrable para que el dueño pueda limpiarlo.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-fregadero.jpg", alt: "Sifón de acero de un fregadero de bar recién montado", origen: "ia" }],
    },
  ],
  valoracion: { media: 4.8, total: 127 },
  resenas: [
    { autor: "Amparo R.", puntuacion: 5, fecha: "2026-10-21", fuente: "google", texto: "Vinieron en media hora un domingo. Me dijeron el precio antes de abrir la pared." },
    { autor: "Vicent M.", puntuacion: 5, fecha: "2026-10", fuente: "google", texto: "Rápidos y limpios." },
    { autor: "Lucía P.", puntuacion: 4, fecha: "2026-09-14", fuente: "google", texto: "Teníamos una fuga en el baño que ya manchaba el techo del vecino de abajo y nadie nos cogía el teléfono un viernes por la tarde. Aquí contestaron a la primera, vinieron en menos de una hora, encontraron la fuga en la llave de la ducha casi sin romper y nos dejaron un informe con fotos para el seguro. Le quito una estrella porque el azulejo de repuesto no era igual." },
    { autor: "Rosa T.", puntuacion: 5, fecha: "2026-08", fuente: "google", texto: "Soy administradora de fincas y les llamo para varias comunidades. Presupuesto por escrito para la junta y factura a nombre de la comunidad, sin tener que perseguirles." },
    { autor: "Javier S.", puntuacion: 5, fecha: "2026-06-02", fuente: "google", texto: "Me cambiaron el mecanismo de la cisterna en veinte minutos y me explicaron qué había fallado." },
  ],
  proceso: [
    { titulo: "Nos llamas", texto: "Te cogemos el teléfono y te decimos a qué hora llegamos y cuánto cuesta venir." },
    { titulo: "Vamos hoy", texto: "Miramos la avería y te damos el precio antes de tocar nada." },
    { titulo: "Lo dejamos arreglado", texto: "Reparamos, probamos y recogemos. Factura con IVA y seis meses de garantía." },
  ],
  acreditaciones: [
    { nombre: "Empresa instaladora RITE", numero: "n.º 46/38215" },
    { nombre: "Empresa instaladora de gas, categoría B", numero: "n.º 46/09127" },
  ],
  garantias: ["Presupuesto antes de empezar", "Factura con IVA", "Seis meses de garantía en la reparación", "Seguro de responsabilidad civil"],
  marcas: ["Roca", "Junkers", "Grohe"],
  tarifas: {
    items: [
      { concepto: "Desplazamiento en Valencia", precio: "30 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Primera hora de trabajo", precio: "40 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Recargo nocturno y festivo", precio: "50 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    ],
    nota: "IVA no incluido. Material aparte.",
  },
  empresa: {
    historia: [
      "Vicent Peris abrió el taller en Benimaclet en 1996, con una furgoneta y los vecinos del barrio como clientes. Hoy somos cinco fontaneros y tres furgonetas, en el mismo bajo de Emili Baró.",
      "Trabajamos sobre todo para vecinos y comunidades de la zona norte de Valencia y l'Horta Nord. Muchos nos llaman desde hace veinte años, y eso es lo que cuidamos.",
    ],
    imagenes: [],
    equipo: [
      { nombre: "Vicent Peris", cargo: "Fundador" },
      { nombre: "Marta Peris", cargo: "Fontanera y presupuestos" },
      { nombre: "Rubén Ortí", cargo: "Oficial fontanero" },
    ],
  },
  imagenesHero: [],
  galeria: [
    { src: "/ejemplo/techo-humedad.jpg", alt: "Mancha de humedad en un techo de escayola con una gota colgando", titulo: "Fuga del piso de arriba en Orriols", origen: "ia" },
  ],
  preguntas: [
    { pregunta: "¿Cobráis el desplazamiento?", respuesta: "Sí, y te decimos el importe por teléfono antes de salir. Si hacemos el trabajo, va en la misma factura." },
    { pregunta: "¿Dais factura?", respuesta: "Siempre, con IVA y con el detalle de material y horas." },
    { pregunta: "¿Venís en domingo?", respuesta: "Sí. Atendemos urgencias todos los días, también festivos, con el recargo que te decimos al llamar." },
    { pregunta: "¿Cuánto tardáis en llegar?", respuesta: "En Valencia y l'Horta Nord, unos 40 minutos de media. Al llamar te damos una hora concreta." },
    { pregunta: "¿Qué hago mientras llegáis si sale mucha agua?", respuesta: "Cierra la llave de paso general (suele estar en la cocina, el baño o junto al contador). Si el agua llega a enchufes, baja el interruptor general de la luz." },
  ],
  redes: { instagram: "https://instagram.com/aiguanord.example" },
  seo: {
    titulo: "Fontanero en Valencia · Aigua Nord",
    descripcion: "Fontaneros en Valencia y l'Horta Nord: fugas, atascos, termos y cisternas. Urgencias 24 h y presupuesto antes de empezar.",
    url: "https://fontaneria-1.vercel.app",
  },
});
