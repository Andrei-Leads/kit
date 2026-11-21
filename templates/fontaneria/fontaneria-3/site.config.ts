// fontaneria-3 «La furgoneta» · datos de ejemplo (ficticios) · core 0.6.0
// Negocio inventado (Sevilla). Sin precios en este juego de datos.
// Sin indexación ni analítica: las activa cada web, nunca el template.
import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Fontanería y Saneamientos Hermanos Rendón",
    nombreLegal: "Hermanos Rendón Gallardo, C.B.",
    nif: "E90345127",
    sector: "Fontanería",
    descripcionCorta: "Fontaneros de Triana desde 1989. Fugas, desatascos, termos y casas antiguas en Sevilla y el Aljarafe.",
    anioFundacion: 1989,
    tipoSchema: ["Plumber"],
  },
  contacto: {
    telefono: "+34600003003",
    whatsapp: "+34600003003",
    email: "hola@hermanosrendon.example",
    direccion: { calle: "Calle San Jacinto 41", cp: "41010", ciudad: "Sevilla", provincia: "Sevilla" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"], abre: "08:30", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "17:00", cierra: "20:30" },
    ],
    coordenadas: { lat: 37.3842, lng: -6.0035 },
    urgencias24h: true,
    tiempoLlegada: "30 min",
    mensajeWhatsapp: "Hola, os escribo desde la web. Os cuento lo que me pasa:",
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000003",
  },
  zonas: ["Sevilla", "Tomares", "Camas", "San Juan de Aznalfarache", "Mairena del Aljarafe", "Bormujos", "Gelves", "Dos Hermanas"],
  servicios: [
    {
      titulo: "Fugas de agua",
      slug: "fugas-de-agua",
      descripcion: "Encontramos la fuga sin romper de más y la dejamos arreglada el mismo día.",
      contenido: [
        "Una mancha en el techo del vecino, el contador que no para o un charco bajo el fregadero. Venimos, cerramos la llave y buscamos de dónde sale el agua antes de tocar nada.",
        "Abrimos solo lo necesario, cambiamos el tramo dañado y te enseñamos la pieza vieja. Si hace falta un parte para el seguro, te lo dejamos hecho con fotos.",
        "Al terminar probamos la instalación con la llave abierta delante de ti y recogemos el escombro.",
      ],
      incluye: ["Localización de la fuga", "Cambio del tramo dañado", "Prueba de presión al terminar", "Fotos y parte para el seguro"],
      imagenes: [{ src: "/ejemplo/fuga.jpg", alt: "Tubería de cobre bajo un fregadero de mármol con luz de tarde", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Tenéis que romper la pared?", respuesta: "Solo si la fuga está dentro. Primero la localizamos y abrimos lo justo para llegar a ella." },
        { pregunta: "¿Me ayudáis con el seguro del hogar?", respuesta: "Sí. Te damos fotos, la factura y un parte con la causa para que lo presentes." },
      ],
    },
    {
      titulo: "Desatascos",
      slug: "desatascos",
      descripcion: "Fregaderos, váteres, bajantes y arquetas de patio. Sin productos que estropeen la tubería.",
      contenido: [
        "Desatascamos fregaderos, lavabos, váteres y bajantes de casas y comunidades. Para atascos de arqueta o de patio usamos máquina de muelle y, si hace falta, cámara.",
        "Te decimos qué lo ha provocado para que no vuelva a pasar: grasa, raíces, una pendiente mal hecha o un tubo roto.",
      ],
      incluye: ["Desatasco con máquina", "Revisión con cámara si hace falta", "Limpieza de la zona", "Consejo para que no se repita"],
      imagenes: [{ src: "/ejemplo/desatasco.jpg", alt: "Arqueta abierta en un patio andaluz rodeada de macetas", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Venís también a bares y comercios?", respuesta: "Sí, y procuramos ir antes de abrir o después de cerrar para no pararte el negocio." },
        { pregunta: "¿Usáis productos químicos?", respuesta: "No. Los desatascadores fuertes dañan las tuberías viejas. Trabajamos con máquina." },
      ],
    },
    {
      titulo: "Termos y calentadores",
      slug: "termos-y-calentadores",
      descripcion: "Reparamos o cambiamos tu termo eléctrico o calentador de gas, y nos llevamos el viejo.",
      contenido: [
        "Si el termo gotea, no calienta o salta la luz, lo revisamos y te decimos si compensa arreglarlo o cambiarlo, con el precio antes de empezar.",
        "Si lo cambiamos, subimos el nuevo a la azotea o al lavadero, lo dejamos funcionando y nos llevamos el viejo al punto limpio.",
        "Como empresa instaladora de gas, también revisamos y cambiamos calentadores con su certificado.",
      ],
      incluye: ["Diagnóstico de la avería", "Instalación del termo o calentador", "Retirada del aparato viejo", "Certificado de gas cuando toca"],
      imagenes: [{ src: "/ejemplo/termo.jpg", alt: "Termo eléctrico en una azotea con tendedero y sol rasante", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cuánto tardáis en cambiar un termo?", respuesta: "Normalmente una mañana. Si tenemos el modelo en la furgoneta, el mismo día del aviso." },
        { pregunta: "¿Os lleváis el termo viejo?", respuesta: "Sí, lo bajamos y lo llevamos al punto limpio." },
      ],
    },
    {
      titulo: "Cisternas y grifería",
      slug: "cisternas-y-griferia",
      descripcion: "Cisternas que no paran, grifos que gotean y mecanismos que ya no se fabrican.",
      contenido: [
        "Una cisterna que pierde agua puede gastar miles de litros al mes. Cambiamos el mecanismo o la cisterna entera, también las altas de cadena de las casas antiguas.",
        "Montamos grifos nuevos o reparamos los de toda la vida cuando todavía tienen arreglo.",
      ],
      incluye: ["Cambio de mecanismo de cisterna", "Montaje de grifería", "Llaves de corte nuevas", "Revisión de latiguillos"],
      imagenes: [{ src: "/ejemplo/cisterna.jpg", alt: "Baño antiguo con cisterna alta de cadena y grifo de latón", origen: "ia" }],
      preguntas: [
        { pregunta: "Mi cisterna es antigua, ¿tiene arreglo?", respuesta: "Casi siempre. Hay mecanismos universales que encajan en cisternas de cadena." },
        { pregunta: "¿Traéis vosotros el grifo?", respuesta: "Podemos traerlo o montar el que tú compres. Te avisamos si no encaja con tu instalación." },
      ],
    },
    {
      titulo: "Baño adaptado para mayores",
      slug: "bano-para-mayores",
      descripcion: "Cambiamos la bañera por un plato de ducha a ras de suelo, con barras y asiento.",
      contenido: [
        "Quitamos la bañera y ponemos un plato extraplano antideslizante, con barras de apoyo y asiento abatible. Lo normal es dejarlo terminado en uno o dos días.",
        "Trabajamos con cuidado y con la casa habitada: protegemos el suelo, avisamos de los ruidos y dejamos el baño usable cada noche si hace falta.",
        "Antes de empezar pasamos a medir y te damos el presupuesto cerrado por escrito.",
      ],
      incluye: ["Retirada de la bañera", "Plato de ducha extraplano", "Barras de apoyo y asiento", "Grifo termostático"],
      imagenes: [{ src: "/ejemplo/bano-mayores.jpg", alt: "Plato de ducha extraplano con barra de apoyo y asiento abatible junto a una ventana de patio", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cuántos días está el baño sin usar?", respuesta: "Normalmente uno. Si la obra lleva dos días, dejamos el váter funcionando la primera noche." },
        { pregunta: "¿Venís a ver el baño antes?", respuesta: "Sí, pasamos a medir sin compromiso y te damos el presupuesto cerrado." },
      ],
    },
    {
      titulo: "Tuberías de casas antiguas",
      slug: "casas-antiguas",
      descripcion: "Plomo, hierro y bajantes de fibrocemento en casas de vecinos y pisos viejos.",
      contenido: [
        "En Triana y en el centro quedan muchas casas con tuberías de plomo o de hierro. Las cambiamos por multicapa o cobre por tramos, sin levantar la casa entera.",
        "En casas de vecinos y comunidades coordinamos la obra con el presidente y avisamos a cada vecino del corte de agua.",
      ],
      incluye: ["Revisión de la instalación", "Cambio de plomo o hierro", "Bajantes y desagües nuevos", "Coordinación con la comunidad"],
      imagenes: [{ src: "/ejemplo/manos-llave.jpg", alt: "Antebrazo desenfocado cerrando una llave de paso en un zaguán", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Hay que cambiar toda la instalación de una vez?", respuesta: "No. Podemos hacerlo por tramos, empezando por lo que está peor." },
        { pregunta: "¿Trabajáis con administradores de fincas?", respuesta: "Sí. Les mandamos el presupuesto por escrito para la junta." },
      ],
    },
    {
      titulo: "Bombas de agua y aljibes",
      slug: "bombas-y-aljibes",
      descripcion: "Grupos de presión, bombas y aljibes de casas y comunidades del Aljarafe.",
      contenido: [
        "Si en tu casa o tu bloque el agua llega sin fuerza, revisamos el grupo de presión o el aljibe. Cambiamos bombas, presostatos y depósitos de expansión.",
        "Dejamos la bomba ajustada y te explicamos cómo funciona para que sepas qué mirar si vuelve a fallar.",
      ],
      incluye: ["Revisión del grupo de presión", "Cambio de bomba", "Limpieza del aljibe", "Ajuste de presión"],
      imagenes: [{ src: "/ejemplo/aljibe.jpg", alt: "Bomba de agua en el patio de una casa antigua", origen: "ia" }],
      preguntas: [
        { pregunta: "¿Cada cuánto hay que limpiar el aljibe?", respuesta: "Lo recomendable es una vez al año, y siempre después de una avería o una obra." },
        { pregunta: "¿Tenéis bombas en la furgoneta?", respuesta: "Llevamos las más comunes. Si la tuya es especial, la pedimos y volvemos en uno o dos días." },
      ],
    },
  ],
  trabajos: [
    {
      titulo: "Bajante del patio de una casa de vecinos",
      slug: "bajante-patio-casa-de-vecinos",
      descripcion: "Cambiamos la bajante de fibrocemento del patio por una nueva de PVC y rehicimos la arqueta, sin dejar a los vecinos sin agua más de una mañana.",
      ubicacion: "Triana (Sevilla)",
      anio: 2026,
      servicio: "casas-antiguas",
      duracion: "2 días",
      contenido: [
        "La bajante del patio llevaba años filtrando a los bajos. Avisamos a los doce vecinos, cortamos el agua solo la primera mañana y retiramos el tramo viejo con las medidas de seguridad que pide el fibrocemento.",
        "Pusimos bajante nueva de PVC insonorizado, una arqueta registrable y dejamos el patio barrido y con las macetas en su sitio.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-patio.jpg", alt: "Patio de vecinos con una bajante nueva de PVC junto a las macetas", origen: "ia" }],
      antes: { src: "/ejemplo/trabajo-patio-antes.jpg", alt: "El mismo patio antes de la obra, con la bajante vieja manchada", origen: "ia" },
      testimonio: { autor: "Rafael, presidente de la comunidad", texto: "Nos avisaron a todos por escrito, cumplieron los dos días y el patio quedó más limpio que antes de empezar." },
    },
    {
      titulo: "Fregadero y desagüe de un bar de barrio",
      slug: "fregadero-desague-bar-de-barrio",
      descripcion: "Fregadero nuevo de acero y desagüe con separador de grasas, montado antes de la hora de abrir.",
      ubicacion: "Los Remedios (Sevilla)",
      anio: 2025,
      servicio: "desatascos",
      duracion: "1 mañana",
      contenido: [
        "El desagüe de la barra se atascaba cada dos semanas. Entramos a las siete, cambiamos el fregadero y pusimos un separador de grasas registrable.",
        "A las doce el bar estaba abierto. Desde entonces no ha vuelto a atascarse.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-bar.jpg", alt: "Barra de bar de barrio con un fregadero de acero renovado", origen: "ia" }],
    },
    {
      titulo: "Tuberías de la azotea",
      slug: "tuberias-de-la-azotea",
      descripcion: "Sustituimos las tuberías de hierro de la azotea por multicapa protegido del sol.",
      ubicacion: "Tomares",
      anio: 2026,
      servicio: "casas-antiguas",
      superficie: "60 m²",
      duracion: "3 días",
      contenido: [
        "La azotea tenía tuberías de hierro oxidadas que perdían presión en toda la casa. Las cambiamos por multicapa con aislamiento contra el sol.",
        "Aprovechamos para mover el termo a un sitio con sombra y dejar una llave de corte a mano.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-azotea.jpg", alt: "Azotea con tuberías nuevas aisladas y un tendedero", origen: "ia" }],
    },
    {
      titulo: "Baño adaptado para una vecina de 84 años",
      slug: "bano-adaptado-vecina-84-anos",
      descripcion: "Quitamos la bañera y pusimos un plato extraplano con barras y asiento, en un solo día.",
      ubicacion: "Camas",
      anio: 2026,
      servicio: "bano-para-mayores",
      superficie: "3 m²",
      duracion: "1 día",
      contenido: [
        "Carmen ya no podía meterse en la bañera. Su hija nos llamó un lunes y el jueves el baño estaba terminado.",
        "Plato extraplano antideslizante, grifo termostático, dos barras y un asiento abatible a la altura que ella pidió.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-bano.jpg", alt: "Baño de un piso adaptado con una toalla colgada en la barra de apoyo", origen: "ia" }],
      testimonio: { autor: "Mari Carmen, su hija", texto: "Le explicaron todo a mi madre con paciencia y ahora se ducha sola. Para nosotras ha sido un cambio enorme." },
    },
    {
      titulo: "Bomba nueva para un aljibe",
      slug: "bomba-nueva-aljibe",
      descripcion: "Cambio de la bomba del aljibe de un chalé y ajuste del grupo de presión.",
      ubicacion: "Bormujos",
      anio: 2024,
      servicio: "bombas-y-aljibes",
      duracion: "4 horas",
      contenido: [
        "La bomba antigua arrancaba cada pocos minutos y hacía ruido toda la noche. La cambiamos por una de velocidad variable.",
        "Ajustamos el presostato y revisamos el depósito de expansión. Ahora el agua llega igual a la planta de arriba.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-aljibe.jpg", alt: "Cuarto de un aljibe con una bomba nueva y tubería de presión", origen: "ia" }],
    },
  ],
  valoracion: { media: 4.9, total: 186 },
  resenas: [
    {
      autor: "Rocío M.", puntuacion: 5, fecha: "2026-11-08", fuente: "google",
      texto: "Llamé un sábado por la mañana porque a mi madre, que vive sola en Triana, se le había roto la llave de paso y el agua salía por debajo del fregadero. En media hora estaba Manuel en la puerta. Lo primero que hizo fue tranquilizarla y explicarle lo que pasaba, sin prisas y sin hablarle como si no entendiera. Cambió la llave y el tramo de tubería, recogió todo y le dejó apuntado el teléfono en la nevera por si acaso. Me cobró lo que me había dicho por teléfono. Ya son nuestros fontaneros.",
    },
    { autor: "Paco J.", puntuacion: 5, fecha: "2026-10", fuente: "google", texto: "Los de toda la vida. Formales." },
    { autor: "Inma C.", puntuacion: 5, fecha: "2026-10-02", fuente: "google", texto: "Se nos rompió el termo un domingo y el lunes a las diez ya teníamos uno nuevo. Se llevaron el viejo y dejaron el lavadero como estaba." },
    { autor: "Celestino R.", puntuacion: 5, fecha: "2026-08", fuente: "web", texto: "Me arreglaron el desagüe del bar antes de abrir, a las siete de la mañana. Llevo dos meses sin un atasco." },
    { autor: "Antonio G.", puntuacion: 4, fecha: "2026-07-19", fuente: "google", texto: "Tardaron un poco más de lo dicho, pero trabajo impecable." },
    { autor: "Lola S.", puntuacion: 5, fecha: "2026-05", fuente: "google", texto: "Nos cambiaron la bañera de mi suegro por un plato de ducha. Limpios y muy amables." },
  ],
  proceso: [], // vacío: el template usa los pasos por defecto de core para urgencias
  acreditaciones: [{ nombre: "Empresa instaladora de gas, categoría B", numero: "n.º 41/07734" }], // número ficticio
  garantias: ["Presupuesto antes de empezar", "Volvemos si algo falla", "Factura con IVA", "Dejamos todo limpio"],
  marcas: [],
  empresa: {
    historia: [
      "Nuestro padre, Manuel Rendón, abrió el taller de la calle San Jacinto en 1989. Empezó con una bicicleta y una caja de herramientas, arreglando las tuberías de las casas de vecinos del barrio.",
      "Hoy seguimos los dos hermanos, Manuel y Juan, con dos furgonetas y el mismo teléfono. Muchos de nuestros clientes son hijos y nietos de los que llamaban a nuestro padre.",
      "Trabajamos en Sevilla y el Aljarafe para casas, comunidades y bares del barrio. Damos el precio antes de empezar y volvemos si algo falla.",
    ],
    imagenes: [{ src: "/ejemplo/furgoneta-puerta.jpg", alt: "Puerta lateral abierta de una furgoneta con estanterías, tubos y herramientas", origen: "ia" }],
    equipo: [
      { nombre: "Manuel Rendón", cargo: "Fontanero" },
      { nombre: "Juan Rendón", cargo: "Fontanero" },
    ],
  },
  imagenesHero: [
    { src: "/ejemplo/hero-calle.jpg", alt: "Furgoneta blanca con una franja azul aparcada junto a un portal con zócalo de azulejo, con luz de tarde", origen: "ia" },
  ],
  galeria: [{ src: "/ejemplo/portal-cancela.jpg", alt: "Cancela de forja abierta y zaguán con zócalo de azulejo", titulo: "Zaguán en Triana", origen: "ia" }],
  preguntas: [
    { pregunta: "¿Cuánto tardáis en llegar?", respuesta: "En Triana, Los Remedios y el centro solemos llegar en unos 30 minutos. En el Aljarafe, algo más según el tráfico." },
    { pregunta: "¿Cobráis por ir a ver la avería?", respuesta: "Te decimos por teléfono cuánto cuesta la salida antes de ir. Si hacemos el trabajo, va incluida." },
    { pregunta: "¿Trabajáis de noche y en festivos?", respuesta: "Sí, para urgencias de verdad: fugas, atascos que inundan o casas sin agua. Te decimos el precio antes de salir." },
    { pregunta: "¿Dais factura?", respuesta: "Siempre, con IVA. La necesitas para el seguro y para la garantía." },
    { pregunta: "¿Qué pasa si vuelve a fallar?", respuesta: "Volvemos sin coste si el fallo es de lo que hemos arreglado." },
  ],
  marca: {},
  seo: {
    titulo: "Fontanero en Sevilla · Hermanos Rendón",
    descripcion: "Fontaneros de Triana desde 1989: fugas, desatascos, termos y casas antiguas en Sevilla y el Aljarafe. Urgencias 24 h.",
    url: "https://fontaneria-3.vercel.app",
  },
  redes: {},
});
