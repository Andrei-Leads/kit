import { defineSiteConfig } from "@andrei-leads/core";

/*
 * Datos de ejemplo de «Parte de trabajo» (fontaneria-4). Negocio ficticio de Barcelona.
 * Las fotos de public/ejemplo/ son relleno hasta que lleguen las de IA (origen "ia": la pieza Foto
 * pinta «Imagen generada con IA»). Sin seo.indexar ni analítica: los activa cada web.
 */
const ia = (src: string, alt: string, extra: { titulo?: string } = {}) => ({
  src: `/ejemplo/${src}`,
  alt,
  origen: "ia" as const,
  ...extra,
});

export default defineSiteConfig({
  negocio: {
    nombre: "Lampisteria Puigvert",
    nombreLegal: "Puigvert Instal·lacions i Manteniment, S.L.",
    nif: "B08615379",
    sector: "Fontanería",
    descripcionCorta: "Fontanería en Barcelona con parte de trabajo firmado en cada aviso. Fugas, montantes, termos y comunidades.",
    anioFundacion: 2002,
    registroMercantil: "Registro Mercantil de Barcelona, tomo 34.611, folio 52, hoja B-254.908",
    tipoSchema: ["Plumber"],
  },
  contacto: {
    telefono: "+34600004004",
    whatsapp: "+34600004004",
    email: "avisos@puigvert.example",
    direccion: { calle: "Carrer de Sants 156", cp: "08028", ciudad: "Barcelona", provincia: "Barcelona" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "07:30", cierra: "15:30" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "16:30", cierra: "19:00" },
    ],
    coordenadas: { lat: 41.3757, lng: 2.1335 },
    urgencias24h: true,
    tiempoLlegada: "60 min",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000004",
  },
  zonas: ["Barcelona", "L'Hospitalet de Llobregat", "Esplugues de Llobregat", "Cornellà de Llobregat", "Sant Just Desvern", "Badalona", "Santa Coloma de Gramenet", "Sant Adrià de Besòs"],
  proceso: [
    { titulo: "Llamas o nos mandas una foto", texto: "Abrimos el aviso con tu dirección y lo que ves." },
    { titulo: "Salimos hacia tu casa", texto: "Te decimos quién va y a qué hora llega." },
    { titulo: "Diagnóstico y precio", texto: "Antes de tocar nada, te explicamos qué pasa y cuánto cuesta." },
    { titulo: "Reparación", texto: "Trabajamos con protección en el suelo y recogemos al terminar." },
    { titulo: "Parte firmado y factura", texto: "Te dejamos por escrito lo hecho, el material y la garantía." },
  ],
  servicios: [
    {
      titulo: "Fugas y roturas de tubería", slug: "fugas",
      descripcion: "Cortamos el agua, localizamos la rotura y la reparamos el mismo día.",
      contenido: [
        "Una fuga no espera. Lo primero que hacemos al llegar es cortar el agua en el punto justo, para que el resto de la casa pueda seguir funcionando mientras trabajamos.",
        "Después buscamos el origen. A veces está a la vista, debajo del fregadero o detrás del inodoro. Otras veces el agua sale lejos de donde se rompe la tubería, y hay que seguir el rastro.",
        "Antes de abrir nada te explicamos qué hemos encontrado y cuánto va a costar la reparación. Si hay que picar, te decimos dónde y cuánto, y protegemos el suelo y los muebles.",
        "Cambiamos el tramo dañado por material nuevo: cobre, multicapa o PVC, según lo que tenga tu instalación. Probamos la presión antes de dar el trabajo por terminado.",
        "Al acabar te dejamos el parte de trabajo firmado, con lo que hemos hecho, el material usado y la garantía. Si tienes seguro de hogar, ese parte es lo que te van a pedir.",
      ],
      incluye: ["Corte y control del agua", "Localización de la rotura", "Reparación con material nuevo", "Prueba de presión", "Parte firmado con lo hecho"],
      imagenes: [ia("fuga.jpg", "Tubería goteando bajo un fregadero, con un cubo de plástico debajo")],
      preguntas: [
        { pregunta: "¿Tengo que cortar el agua antes de que lleguéis?", respuesta: "Si sabes dónde está la llave de paso, sí. Si no, te guiamos por teléfono mientras vamos." },
        { pregunta: "¿Picáis la pared para encontrar la fuga?", respuesta: "Solo cuando sabemos dónde está. Si no se ve, primero hacemos una detección." },
        { pregunta: "¿La reparación tiene garantía?", respuesta: "Sí, un año. Queda escrita en el parte de trabajo." },
      ],
    },
    {
      titulo: "Detección de fugas ocultas", slug: "deteccion-de-fugas",
      descripcion: "Encontramos fugas dentro de paredes y suelos sin romper a ciegas.",
      contenido: [
        "Si el contador gira con todo cerrado, si aparece una mancha en el techo del vecino o si la factura del agua sube sin motivo, probablemente hay una fuga que no se ve.",
        "Usamos un detector acústico, cámara térmica y gas trazador para localizarla. Así abrimos solo en el punto exacto, no media pared.",
        "Te entregamos un informe con el punto de la fuga marcado y fotos. Sirve para el seguro y para la comunidad si la fuga afecta a zonas comunes.",
        "Si quieres, reparamos en la misma visita. Si no, el informe te sirve para pedir presupuesto a quien prefieras.",
      ],
      incluye: ["Detección acústica y térmica", "Gas trazador si hace falta", "Informe con fotos y punto marcado", "Presupuesto de reparación"],
      imagenes: [ia("deteccion.jpg", "Detector acústico apoyado en un suelo de baldosa hidráulica, con auriculares al lado")],
      preguntas: [
        { pregunta: "¿Cuánto dura una detección?", respuesta: "Entre una y tres horas, según la vivienda." },
        { pregunta: "¿El seguro cubre la detección?", respuesta: "Muchas pólizas sí. Te damos el informe que piden." },
        { pregunta: "¿Hace falta romper algo?", respuesta: "Para detectar, no. Solo para reparar, y en el punto exacto." },
      ],
    },
    {
      titulo: "Desatascos con máquina", slug: "desatascos-con-maquina",
      descripcion: "Desatascamos fregaderos, bajantes y arquetas con máquina eléctrica y de presión.",
      contenido: [
        "Cuando el agua no baja o sube por el plato de ducha, el problema suele estar más lejos de lo que parece. Con un desatascador de mano no se llega.",
        "Trabajamos con máquina de cable y con agua a presión. Entramos por el registro más cercano y limpiamos la tubería entera, no solo el tapón.",
        "Si el atasco se repite, pasamos una cámara para ver si hay una tubería rota, mal inclinada o con raíces. Te enseñamos la grabación.",
        "En comunidades desatascamos bajantes y arquetas de patio, y dejamos parte para el administrador.",
      ],
      incluye: ["Máquina de cable o de presión", "Limpieza de la tubería completa", "Inspección con cámara si se repite", "Parte para el administrador"],
      imagenes: [ia("desatasco.jpg", "Arqueta de patio abierta con la guía metálica de la máquina de desatascos")],
      preguntas: [
        { pregunta: "¿Usáis productos químicos?", respuesta: "No. Desatascamos de forma mecánica y con agua." },
        { pregunta: "¿Y si vuelve a atascarse?", respuesta: "Pasamos la cámara para ver la causa y te damos el presupuesto." },
        { pregunta: "¿Desatascáis bajantes de comunidad?", respuesta: "Sí, con parte para el administrador de fincas." },
      ],
    },
    {
      titulo: "Termos y agua caliente", slug: "termos",
      descripcion: "Reparamos y cambiamos termos eléctricos y de gas, con la retirada del viejo.",
      contenido: [
        "Si el termo no calienta, gotea por abajo o salta el diferencial, puede ser la resistencia, el termostato o la válvula de seguridad. Muchas veces se arregla sin cambiarlo.",
        "Si el termo tiene más de diez años o el depósito está picado, te recomendamos cambiarlo. Te damos el precio cerrado del termo y de la instalación.",
        "Instalamos el termo nuevo con válvula de seguridad y desagüe, como pide la normativa, y nos llevamos el viejo.",
        "En las galerías de Barcelona el espacio es justo: medimos antes para que el termo nuevo quepa y se pueda revisar.",
      ],
      incluye: ["Diagnóstico de la avería", "Cambio de resistencia o termostato", "Termo nuevo con válvula de seguridad", "Retirada del termo viejo"],
      imagenes: [ia("termo.jpg", "Termo eléctrico en una galería con tendedero")],
      preguntas: [
        { pregunta: "¿Cuánto dura un termo?", respuesta: "Entre 8 y 12 años, según el agua y el uso." },
        { pregunta: "¿Os lleváis el termo viejo?", respuesta: "Sí, lo retiramos y lo llevamos al punto limpio." },
        { pregunta: "¿Qué capacidad necesito?", respuesta: "Para dos personas, 50 litros. Para cuatro, 80 o 100." },
      ],
    },
    {
      titulo: "Cambio de montantes y bajantes", slug: "montantes-y-bajantes",
      descripcion: "Renovamos montantes y bajantes de comunidad con presupuesto para la junta.",
      contenido: [
        "En muchas fincas de Barcelona los montantes siguen siendo de hierro o de plomo. Pierden presión, se oxidan y acaban en fugas que afectan a varios vecinos.",
        "Visitamos la finca, revisamos el estado y preparamos un presupuesto por escrito para presentarlo en la junta.",
        "Hacemos el cambio por tramos para que cada vecino esté el menor tiempo posible sin agua. Avisamos con carteles en la escalera.",
        "Al terminar entregamos al administrador el parte completo, con fotos del antes y el después y la garantía de la obra.",
      ],
      incluye: ["Visita técnica a la finca", "Presupuesto para la junta", "Cambio por tramos con avisos", "Fotos del antes y el después"],
      imagenes: [ia("montante.jpg", "Montante de multicapa nuevo en un patio de luces")],
      preguntas: [
        { pregunta: "¿Cuántos días sin agua?", respuesta: "Cada vivienda, unas horas. Cortamos por tramos y avisamos antes." },
        { pregunta: "¿Hacéis el presupuesto para la junta?", respuesta: "Sí, por escrito y explicado para los vecinos." },
        { pregunta: "¿Trabajáis con administradores?", respuesta: "Sí, es buena parte de nuestro trabajo." },
      ],
    },
    {
      titulo: "Baterías de contadores para comunidades", slug: "contadores",
      descripcion: "Renovamos baterías de contadores según la normativa de la compañía de aguas.",
      contenido: [
        "La compañía de aguas puede pedir a la comunidad que renueve la batería de contadores. También conviene hacerlo si hay fugas o llaves que no cierran.",
        "Montamos la batería nueva con llaves de corte por vivienda, válvula antirretorno y espacio para la lectura.",
        "Coordinamos el corte de agua con el administrador y avisamos a los vecinos con tiempo.",
        "Dejamos la documentación que pide la compañía y el parte firmado para la comunidad.",
      ],
      incluye: ["Batería según normativa", "Llaves de corte por vivienda", "Coordinación con el administrador", "Documentación para la compañía"],
      imagenes: [ia("contadores.jpg", "Batería de contadores renovada en un cuarto de instalaciones")],
      preguntas: [
        { pregunta: "¿Cuánto tarda el cambio?", respuesta: "Entre uno y tres días, según el número de viviendas." },
        { pregunta: "¿Hay que pedir permiso a la compañía?", respuesta: "Nosotros hacemos el trámite con la compañía de aguas." },
        { pregunta: "¿Quién paga la batería?", respuesta: "La comunidad. Te damos el presupuesto para la junta." },
      ],
    },
    {
      titulo: "Averías con parte para el seguro", slug: "averias-para-el-seguro",
      descripcion: "Reparamos y dejamos el informe que pide tu aseguradora.",
      contenido: [
        "Cuando una fuga daña tu casa o la del vecino, el seguro pide saber qué ha pasado, dónde y qué se ha hecho. Sin ese papel, el expediente se alarga.",
        "Reparamos la avería y te dejamos un parte con la causa, el punto de la rotura, fotos y el material usado.",
        "Si el perito necesita ver la tubería, la guardamos o la dejamos documentada antes de cambiarla.",
        "Trabajamos con varias aseguradoras y sabemos qué información piden. Si lo prefieres, hablamos nosotros con el perito.",
      ],
      incluye: ["Reparación de la avería", "Informe con causa y fotos", "Atención al perito", "Factura con IVA"],
      imagenes: [ia("danos-agua.jpg", "Pared de pladur con un cerco de agua y un medidor de humedad de pinchos")],
      preguntas: [
        { pregunta: "¿Puedo llamaros si el seguro manda a otro?", respuesta: "Sí. Te hacemos el informe y la reparación por tu cuenta." },
        { pregunta: "¿Qué pone el parte?", respuesta: "Causa, punto de rotura, fotos, material y garantía." },
        { pregunta: "¿Habláis con el perito?", respuesta: "Si nos lo pides, sí." },
      ],
    },
  ],
  trabajos: [
    {
      titulo: "Montante de una finca de 1920 en el Eixample", slug: "montante-finca-eixample",
      descripcion: "Cambio del montante general de hierro por multicapa en una finca de seis plantas, por tramos y sin dejar a ningún vecino un día sin agua.",
      ubicacion: "Eixample (Barcelona)", anio: 2026, servicio: "montantes-y-bajantes", duracion: "4 días",
      contenido: [
        "El montante original era de hierro galvanizado y tenía fugas en tres plantas. La administradora nos pidió un presupuesto para la junta de marzo.",
        "Hicimos el cambio en cuatro días, por tramos de dos plantas. Cada vecino estuvo sin agua menos de cuatro horas, con aviso en la escalera dos días antes.",
        "Entregamos el parte con fotos de cada tramo, el material y la garantía.",
      ],
      imagenes: [ia("trabajo-montante.jpg", "Montante nuevo de multicapa en el patio de luces de la finca")],
      antes: ia("trabajo-montante-antes.jpg", "Montante viejo de hierro oxidado en el mismo patio de luces"),
      testimonio: { autor: "Elena M., administradora de fincas", texto: "Presupuesto claro para la junta, avisos a los vecinos y el parte con fotos al terminar. Así da gusto trabajar." },
    },
    {
      titulo: "Fuga oculta en el falso techo de un ático", slug: "fuga-oculta-atico-sants",
      descripcion: "Mancha en el techo del vecino de abajo. Localizamos la fuga con detector acústico y abrimos solo 40 centímetros de falso techo.",
      ubicacion: "Sants (Barcelona)", anio: 2026, servicio: "deteccion-de-fugas", duracion: "6 horas",
      contenido: [
        "La mancha aparecía en el piso de abajo, pero la fuga estaba en la unión de la toma del lavabo del ático.",
        "Con el detector la localizamos en una hora. Abrimos el falso techo en el punto exacto, cambiamos la unión, cerramos y pintamos.",
      ],
      imagenes: [ia("trabajo-falso-techo.jpg", "Falso techo de un ático cerrado y pintado después de la reparación")],
    },
    {
      titulo: "Batería de 18 contadores", slug: "bateria-18-contadores",
      descripcion: "Renovación de la batería de contadores de una finca de 18 viviendas, con la documentación para la compañía de aguas.",
      ubicacion: "L'Hospitalet de Llobregat", anio: 2025, servicio: "contadores", duracion: "2 días",
      contenido: [
        "La compañía de aguas había pedido a la comunidad renovar la batería. Coordinamos el corte con la administración y lo hicimos en dos mañanas.",
        "Montamos 18 llaves nuevas con antirretorno y dejamos la documentación lista para la compañía.",
      ],
      imagenes: [ia("trabajo-contadores.jpg", "Cuarto de contadores de una finca con 18 llaves nuevas")],
    },
    {
      titulo: "Termo de 100 litros en una galería", slug: "termo-100-litros-esplugues",
      descripcion: "Cambio de un termo de 15 años por uno de 100 litros, con válvula de seguridad y desagüe nuevos.",
      ubicacion: "Esplugues de Llobregat", anio: 2026, servicio: "termos", duracion: "3 horas",
      contenido: [
        "El termo goteaba por la base y el depósito estaba picado. Medimos la galería y elegimos un modelo que cupiera con espacio para revisarlo.",
        "Lo instalamos con válvula de seguridad y desagüe conducido, y nos llevamos el viejo.",
      ],
      imagenes: [ia("trabajo-termo.jpg", "Termo nuevo con válvula de seguridad en una galería")],
    },
    {
      titulo: "Avería en la cocina con parte para el seguro", slug: "averia-cocina-seguro-gracia",
      descripcion: "Fuga en la toma del lavavajillas que levantó el zócalo. Reparación e informe para la aseguradora el mismo día.",
      ubicacion: "Gràcia (Barcelona)", anio: 2025, servicio: "averias-para-el-seguro", duracion: "1 día",
      contenido: [
        "La toma del lavavajillas había cedido y el agua se metió bajo el zócalo de la cocina. Protegimos el suelo, cortamos el agua y cambiamos la toma.",
        "El informe con fotos y la causa llegó a la aseguradora esa misma tarde.",
      ],
      imagenes: [ia("trabajo-seguro.jpg", "Cocina con el zócalo levantado y el suelo protegido con cartón")],
    },
  ],
  valoracion: { media: 4.8, total: 143 },
  resenas: [
    { autor: "Núria V.", puntuacion: 5, fecha: "2026-11-12", fuente: "google", texto: "Tuvimos una fuga en el baño que estaba mojando el techo de la vecina. Vinieron en menos de una hora, cortaron el agua y nos explicaron qué pasaba antes de tocar nada. Lo mejor fue el parte: nos dejaron por escrito la causa, el material y unas fotos, y el seguro lo aceptó sin pedir nada más. Precio claro desde el principio y factura con IVA. Muy recomendables." },
    { autor: "Jordi P.", puntuacion: 5, fecha: "2026-10", fuente: "google", texto: "Puntuales y con todo por escrito." },
    { autor: "Xavier F., administrador de fincas", puntuacion: 5, fecha: "2026-09-03", fuente: "google", texto: "Cambiaron los montantes de una finca que administro sin una sola queja de los vecinos. Presupuesto claro para la junta y parte con fotos al acabar." },
    { autor: "Montse L.", puntuacion: 4, fecha: "2026-08", fuente: "google", texto: "Me cambiaron el termo en una mañana y se llevaron el viejo." },
    { autor: "Pau R.", puntuacion: 5, fecha: "2026-06-27", fuente: "google", texto: "Desatasco de la bajante resuelto en una hora. Muy limpios." },
  ],
  acreditaciones: [
    { nombre: "Empresa instaladora de agua (RASIC)", numero: "n.º 08/051.223" },
    { nombre: "Empresa instaladora RITE", numero: "n.º 08/061.874" },
  ],
  garantias: ["Parte de trabajo firmado en cada aviso", "Precio antes de empezar", "Factura con IVA", "Un año de garantía en la reparación"],
  marcas: ["Saunier Duval", "Ariston", "Uponor"],
  tarifas: {
    items: [
      { concepto: "Salida y primera hora", precio: "65 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Hora siguiente", precio: "45 €" }, // PRECIO FICTICIO: borrar en la web del cliente
      { concepto: "Recargo nocturno y festivo", precio: "60 €" }, // PRECIO FICTICIO: borrar en la web del cliente
    ],
    nota: "IVA no incluido. El material se detalla en el parte.",
  },
  empresa: {
    historia: [
      "Marc Puigvert empezó en 2002 con una furgoneta y los avisos de tres administradores de fincas de Sants. La forma de trabajar ya era la de ahora: cada aviso, con su parte.",
      "Con los años llegaron las comunidades del Eixample y de L'Hospitalet, los montantes y las baterías de contadores. El equipo creció, pero el parte siguió igual.",
      "Hoy somos siete personas. Seguimos contestando el teléfono nosotros y seguimos dejando por escrito lo que hacemos.",
    ],
    imagenes: [],
    equipo: [
      { nombre: "Marc Puigvert", cargo: "Gerente" },
      { nombre: "Laia Soler", cargo: "Avisos y administradores" },
      { nombre: "Òscar Ribas", cargo: "Oficial de primera" },
    ],
  },
  imagenesHero: [],
  galeria: [
    ia("paso-aviso.jpg", "Móvil sobre una encimera con la foto de una fuga en la pantalla", { titulo: "Aviso recibido" }),
    ia("paso-llegada.jpg", "Antebrazo con guante azul abriendo el armario de contadores de una escalera", { titulo: "Llegada" }),
    ia("paso-diagnostico.jpg", "Falso techo abierto con una tubería mojada iluminada con linterna", { titulo: "Diagnóstico" }),
    ia("paso-reparado.jpg", "Unión de cobre recién soldada sujeta con un guante", { titulo: "Reparación" }),
    ia("paso-parte.jpg", "Parte de trabajo en papel autocopiativo con un bolígrafo azul encima", { titulo: "Parte firmado" }),
  ],
  preguntas: [
    { pregunta: "¿Cuánto tardáis en llegar?", respuesta: "En Barcelona, unos 60 minutos. Al abrir el aviso te decimos quién va y la hora aproximada." },
    { pregunta: "¿Me decís el precio antes de empezar?", respuesta: "Sí. Primero vemos la avería, te explicamos qué hay que hacer y cuánto cuesta. Si no te convence, solo pagas la salida." },
    { pregunta: "¿Qué es el parte de trabajo?", respuesta: "Un papel firmado con lo que hemos hecho, el material, las horas y la garantía. Te quedas una copia." },
    { pregunta: "¿Trabajáis para comunidades y administradores?", respuesta: "Sí. Hacemos presupuestos para la junta y dejamos el parte al administrador en cada aviso." },
    { pregunta: "¿Me hacéis el informe para el seguro?", respuesta: "Sí, con la causa, fotos y el material usado. Es el papel que pide la aseguradora." },
    { pregunta: "¿Cómo puedo pagar?", respuesta: "Con tarjeta, transferencia o Bizum. Siempre con factura." },
  ],
  marca: {},
  seo: {
    titulo: "Fontanero en Barcelona · Lampisteria Puigvert",
    descripcion: "Fontanería en Barcelona con parte de trabajo firmado: fugas, montantes, termos y contadores para comunidades. Urgencias 24 h.",
    url: "https://fontaneria-4.vercel.app",
  },
  redes: {},
});
