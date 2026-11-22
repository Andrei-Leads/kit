// Datos de ejemplo de «Planifica tu reforma» (reformas-2): negocio FICTICIO de Madrid (encargo §11),
// con el patrón ficticio evidente de electricidad (Calle Ejemplo, dominio .example, cid de ceros,
// registro «(ficticio)»). NIF de ejemplo con dígito de control inválido. Fotos de public/ejemplo/:
// relleno pendiente de las fotos de IA (CREDITOS.md), todas con origen "ia". Sin seo.indexar ni
// analítica: las activa cada web, nunca el template. Sin precios: el diseño funciona sin ellos.
import { defineSiteConfig, type Imagen } from "@andrei-leads/core";

const ia = (src: string, alt: string): Imagen => ({ src: `/ejemplo/${src}`, alt, origen: "ia" });

export default defineSiteConfig({
  negocio: {
    nombre: "Tresbolillo Reformas",
    nombreLegal: "Tresbolillo Obras y Reformas, S.L.",
    nif: "B88412306", // ficticio: el dígito de control no corresponde a propósito (el correcto sería 9)
    sector: "Reformas de pisos",
    descripcionCorta: "Baños, cocinas y pisos completos en Madrid. Nos cuentas qué quieres y te respondemos el mismo día.",
    anioFundacion: 2011,
    registroMercantil: "Registro Mercantil de Madrid, tomo 0000, folio 00, hoja M-000000 (ficticio)",
    tipoSchema: ["GeneralContractor"],
  },
  contacto: {
    telefono: "+34600000202",
    whatsapp: "+34600000202",
    email: "hola@tresbolilloejemplo.example",
    direccion: { calle: "Calle Ejemplo, 12", cp: "28026", ciudad: "Madrid", provincia: "Madrid" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "08:30", cierra: "18:30" },
      { dias: ["viernes"], abre: "08:30", cierra: "15:00" },
    ],
    urgencias24h: false,
    fichaGoogle: "https://maps.google.com/?cid=0000000000000000402", // ficticio
  },
  zonas: ["Madrid", "Getafe", "Leganés", "Alcorcón", "Pozuelo de Alarcón", "Las Rozas de Madrid", "Alcobendas", "Rivas-Vaciamadrid"],
  servicios: [
    {
      titulo: "Reforma de baño", slug: "reforma-de-bano",
      descripcion: "Azulejo, sanitarios, mueble y fontanería nuevos, con plato de ducha si lo prefieres.",
      contenido: [
        "Desmontamos el baño hasta dejar paredes y suelo a la vista y cambiamos las tuberías viejas antes de alicatar. Así no hay sorpresas dentro de cinco años.",
        "Un baño de 4 a 6 m² suele estar listo en 8 a 12 días laborables. La fecha de entrega va por escrito en el contrato.",
      ],
      incluye: ["Desescombro y retirada de residuos", "Fontanería nueva", "Alicatado y solado", "Sanitarios, mueble y grifería", "Limpieza final"],
      imagenes: [ia("estancia-bano.jpg", "Baño reformado con mueble de roble, azulejo metro blanco y plato de ducha")],
      preguntas: [
        { pregunta: "¿Puedo elegir yo los azulejos?", respuesta: "Sí. Te acompañamos a la exposición o te traemos muestras a casa." },
        { pregunta: "¿Me quedo sin baño muchos días?", respuesta: "Si es el único baño, dejamos el inodoro conectado hasta el último momento posible." },
      ],
    },
    {
      titulo: "Reforma de cocina", slug: "reforma-de-cocina",
      descripcion: "Muebles, encimera, electricidad y alicatado, con la distribución que mejor te encaje.",
      contenido: [
        "Medimos, te proponemos la distribución y la dibujamos antes de pedir nada. Los muebles se encargan con las medidas de obra, no con las del plano.",
        "Una cocina de 8 a 12 m² con cambio de muebles, electricidad y alicatado suele llevar entre dos y tres semanas.",
      ],
      incluye: ["Muebles y encimera", "Electricidad y enchufes nuevos", "Alicatado o panelado", "Fregadero, grifo y electrodomésticos integrados"],
      imagenes: [ia("estancia-cocina.jpg", "Cocina en paralelo con encimera de madera, azulejo metro blanco y lámpara encendida al fondo")],
      preguntas: [{ pregunta: "¿Puedo aprovechar mis electrodomésticos?", respuesta: "Sí, si caben en la nueva distribución. Lo vemos en la visita." }],
    },
    {
      titulo: "Reforma integral de piso", slug: "reforma-integral-de-piso",
      descripcion: "El piso entero de una vez: instalaciones, suelos, baño, cocina y pintura.",
      contenido: [
        "Reformamos el piso entero con un solo encargado y un calendario por semanas: primero instalaciones, después suelos y alicatados, y al final carpintería y pintura.",
        "En pisos de los años 60 a 80 cambiamos siempre la instalación eléctrica y la fontanería. Es lo que no se ve y lo que más problemas da.",
      ],
      incluye: ["Instalación eléctrica y fontanería", "Baño y cocina", "Suelos y puertas", "Alisado de paredes y pintura", "Gestión de la licencia"],
      imagenes: [ia("estancia-salon.jpg", "Salón reformado con tarima de roble, molduras en el techo y radiador de hierro blanco")],
      preguntas: [{ pregunta: "¿Cuánto dura una reforma integral?", respuesta: "Un piso de 70 a 90 m² suele llevar entre 8 y 12 semanas. La fecha va en el contrato." }],
    },
    {
      titulo: "Cambio de bañera por plato de ducha", slug: "cambio-de-banera-por-plato-de-ducha",
      descripcion: "Quitamos la bañera y ponemos un plato extraplano con mampara, normalmente en un día.",
      contenido: [], incluye: ["Retirada de la bañera", "Plato extraplano antideslizante", "Mampara", "Alicatado de la zona"], preguntas: [],
      imagenes: [ia("estancia-ducha.jpg", "Plato de ducha extraplano blanco con mampara de cristal y azulejo claro")],
    },
    {
      titulo: "Pladur y redistribución", slug: "pladur-y-redistribucion",
      descripcion: "Tabiques nuevos, techos bajados y puertas correderas para ganar una habitación o abrir la cocina.",
      contenido: [], incluye: [], preguntas: [],
      imagenes: [ia("estancia-pladur.jpg", "Tabique nuevo pintado de blanco con puerta corredera de madera")],
    },
    {
      titulo: "Suelos de tarima y porcelánico", slug: "suelos-tarima-y-porcelanico",
      descripcion: "Tarima flotante, porcelánico imitación madera o restauración del suelo que ya tienes.",
      contenido: [], incluye: [], preguntas: [],
      imagenes: [ia("estancia-suelo.jpg", "Pasillo con porcelánico imitación madera y rodapié blanco")],
    },
    {
      titulo: "Quitar gotelé y pintar", slug: "quitar-gotele-y-pintar",
      descripcion: "Alisamos las paredes y pintamos el piso entero, con los muebles protegidos.",
      contenido: [], incluye: [], preguntas: [],
      imagenes: [ia("estancia-pared-lisa.jpg", "Dormitorio con paredes lisas en blanco roto y cama hecha")],
    },
    {
      titulo: "Reforma de terraza", slug: "reforma-de-terraza",
      descripcion: "Suelo antideslizante, impermeabilización y cerramiento de la terraza.",
      contenido: [], incluye: [], preguntas: [], imagenes: [], // sin foto a propósito: opción y tarjeta tintadas
    },
  ],
  trabajos: [
    {
      titulo: "Piso con molduras en Chamberí", slug: "piso-con-molduras-en-chamberi",
      descripcion: "Reforma integral de un piso de 1925 conservando las molduras de escayola del techo.",
      ubicacion: "Chamberí", anio: 2025, servicio: "reforma-integral-de-piso", superficie: "86 m²", duracion: "10 semanas",
      contenido: [
        "Piso de 1925 con techos de 3,20 m y molduras de escayola en todas las estancias. Las desmontamos donde hacía falta, las restauramos y las volvimos a colocar.",
        "Cambiamos la instalación eléctrica y la fontanería, pusimos tarima de roble en todo el piso y abrimos la cocina al salón.",
      ],
      imagenes: [ia("trabajo-chamberi.jpg", "Salón reformado en Chamberí con molduras restauradas y tarima de roble")],
      antes: ia("trabajo-chamberi-antes.jpg", "El mismo salón antes de la obra, con gotelé y suelo de terrazo gastado"),
      testimonio: { autor: "Elena y Marcos", texto: "Nos daba miedo tocar las molduras y han quedado como nuevas. Nos dieron una fecha y la cumplieron." },
    },
    {
      titulo: "Baño de los 70 en Carabanchel", slug: "bano-de-los-70-en-carabanchel",
      descripcion: "Baño de 4 m² con bañera y azulejo de los 70, convertido en un baño con ducha y mueble de roble.",
      ubicacion: "Carabanchel", anio: 2026, servicio: "reforma-de-bano", superficie: "4 m²", duracion: "9 días",
      contenido: ["Quitamos bañera, azulejo y suelo, y cambiamos las tuberías de hierro por multicapa.", "Plato de ducha extraplano, azulejo metro blanco y mueble suspendido de roble."],
      imagenes: [ia("trabajo-carabanchel.jpg", "Baño reformado en Carabanchel con ducha y mueble de roble")],
      antes: ia("trabajo-carabanchel-antes.jpg", "El mismo baño antes, con bañera y azulejo marrón de los 70"),
    },
    {
      titulo: "Cocina abierta en Delicias", slug: "cocina-abierta-en-delicias",
      descripcion: "Tiramos el tabique entre cocina y salón y montamos una cocina en paralelo con encimera de madera.",
      ubicacion: "Delicias", anio: 2025, servicio: "reforma-de-cocina", superficie: "12 m²", duracion: "3 semanas",
      contenido: ["Retiramos el tabique y reforzamos el hueco con una viga.", "Muebles blancos, encimera de roble macizo y azulejo metro hasta el techo."],
      imagenes: [ia("trabajo-delicias.jpg", "Cocina abierta al salón con muebles blancos y encimera de roble")],
    },
    {
      titulo: "Baño en suite en Pozuelo de Alarcón", slug: "bano-en-suite-en-pozuelo-de-alarcon",
      descripcion: "Baño en suite de 6 m² con ducha de obra y doble lavabo.",
      ubicacion: "Pozuelo de Alarcón", anio: 2024, servicio: "reforma-de-bano", superficie: "6 m²", // sin plazo a propósito
      contenido: ["Ganamos espacio moviendo la puerta y quitando un armario empotrado.", "Ducha de obra con mampara fija, doble lavabo y porcelánico gran formato."],
      imagenes: [ia("trabajo-pozuelo.jpg", "Baño en suite con doble lavabo y ducha de obra")],
    },
    {
      titulo: "Adiós al gotelé en Getafe", slug: "adios-al-gotele-en-getafe",
      descripcion: "Quitamos el gotelé de todo un piso de 70 m² y lo pintamos en blanco roto.",
      ubicacion: "Getafe", anio: 2026, servicio: "quitar-gotele-y-pintar", superficie: "70 m²", duracion: "5 días",
      contenido: ["Protegimos suelos y muebles, rascamos el gotelé y aplicamos dos manos de plaste.", "Lijado, imprimación y dos manos de pintura blanco roto en todo el piso."],
      imagenes: [ia("trabajo-getafe.jpg", "Salón con paredes lisas recién pintadas y suelo de tarima")],
    },
  ],
  valoracion: { media: 4.9, total: 212 },
  resenas: [
    { autor: "Nuria G.", puntuacion: 5, fecha: "2026-10-02", fuente: "google", texto: "Elegí baño, tamaño y plazo en la web y al rato me llamaron." },
    { autor: "Elena R.", puntuacion: 5, fecha: "2026-09", fuente: "google", texto: "Hicimos la reforma integral de nuestro piso con ellos. Desde la primera visita tuvimos un solo encargado, Julián, que nos explicaba cada semana qué tocaba y qué faltaba. El presupuesto venía por partidas y no cambió. Hubo un retraso de dos días con la cocina por un proveedor y nos avisaron antes de que preguntáramos. Lo volveríamos a hacer con ellos sin dudarlo, y ya se los hemos recomendado a dos vecinos." },
    { autor: "Íñigo L.", puntuacion: 4, fecha: "2026-06", fuente: "google", texto: "Bien hecho y limpio. El presupuesto tardó un par de días más de lo dicho." },
    { autor: "Rosa M.", puntuacion: 5, fecha: "2026-04", fuente: "google", texto: "Rápidos y claros." },
    { autor: "David P.", puntuacion: 5, fecha: "2026-02", fuente: "google", texto: "Nos quitaron el gotelé de todo el piso en una semana." },
    { autor: "Fátima B.", puntuacion: 5, fecha: "2025-11", fuente: "google", texto: "El plato de ducha ha quedado perfecto." },
  ],
  proceso: [
    { titulo: "Visita", texto: "Vamos a tu casa, medimos y te escuchamos." },
    { titulo: "Presupuesto por partidas en 72 h", texto: "Cada partida con su precio, para que sepas qué pagas." },
    { titulo: "Contrato con fecha", texto: "La fecha de entrega va firmada." },
    { titulo: "Obra", texto: "Un solo encargado te cuenta cómo va cada semana." },
    { titulo: "Limpieza", texto: "Te devolvemos la casa limpia y sin escombros." },
    { titulo: "Revisión al mes", texto: "Volvemos para comprobar que todo sigue bien." },
  ],
  acreditaciones: [],
  garantias: ["Precio cerrado por escrito", "Plazo de entrega firmado", "Un solo encargado de principio a fin", "Garantía de 2 años"],
  marcas: ["Hansgrohe", "Quick-Step", "Placo"],
  empresa: {
    historia: [
      "Empezamos en 2011 haciendo baños en Carabanchel. Hoy somos ocho personas y hacemos sobre todo baños, cocinas y pisos completos en Madrid y alrededores.",
      "Cada obra tiene un solo encargado: la misma persona que te visita, te presenta el presupuesto y está en la obra hasta el final.",
    ],
    imagenes: [
      ia("empresa-muestras.jpg", "Muestras de azulejo y tarima sobre una mesa de trabajo"),
      ia("empresa-herramienta.jpg", "Caja de herramientas ordenada sobre un suelo protegido"),
    ],
    equipo: [],
  },
  imagenesHero: [], // el hero no usa fotos (Open Graph usa la primera foto de servicio)
  galeria: [],
  preguntas: [
    { pregunta: "¿Cuánto tarda una reforma de baño?", respuesta: "Entre 8 y 12 días laborables para un baño de 4 a 6 m². La fecha va en el contrato." },
    { pregunta: "¿Tengo que pedir licencia?", respuesta: "Para un baño o una cocina suele bastar una declaración responsable en el ayuntamiento. La tramitamos nosotros." },
    { pregunta: "¿Puedo vivir en casa durante la obra?", respuesta: "En baño, cocina o pintura, sí. En una integral te recomendamos que no, por el polvo y los cortes de agua y luz." },
    { pregunta: "¿Cómo se paga?", respuesta: "Una parte al firmar, otra a mitad de obra y el resto al terminar y revisarlo contigo." },
  ],
  marca: {},
  seo: {
    titulo: "Reformas de pisos en Madrid | Tresbolillo",
    descripcion: "Baños, cocinas y reformas integrales en Madrid. Elige qué quieres reformar y te respondemos el mismo día por WhatsApp.",
    url: "https://tresbolilloejemplo.example",
  },
  redes: { instagram: "https://www.instagram.com/tresbolillo.ejemplo" },
});
