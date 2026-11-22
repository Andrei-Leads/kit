import { defineSiteConfig } from "@andrei-leads/core";

// reformas-premium-1 «Estancia» · datos de ejemplo (Madrid). Negocio, teléfonos, NIF,
// dirección, dominios y precios FICTICIOS: en la web de un cliente se sustituye todo.
// Fotos de ejemplo: relleno gris con el nombre y la proporción de cada hueco
// (public/ejemplo/CREDITOS.md tiene la tabla de huecos y los prompts de IA).
const ia = "ia" as const;
const img = (archivo: string, alt: string) => ({ src: `/ejemplo/${archivo}`, alt, origen: ia });

export default defineSiteConfig({
  negocio: {
    nombre: "Lucernario Reformas",
    nombreLegal: "Lucernario Obras e Interiores, S.L.",
    nif: "B00000000", // NIF ficticio
    sector: "Reforma integral de pisos",
    descripcionCorta: "Reformamos pisos enteros, baños y cocinas en Madrid, con un solo interlocutor, precio cerrado y fecha de entrega en el contrato.",
    anioFundacion: 2008,
    registroMercantil: "Registro Mercantil de Madrid, tomo 0, folio 0, hoja M-000000", // ficticio
    tipoSchema: ["GeneralContractor"],
  },
  contacto: {
    telefono: "+34910000000", // ficticio
    whatsapp: "+34600000000", // ficticio
    email: "estudio@lucernario.example",
    direccion: { calle: "Calle Ejemplo 38", cp: "28009", ciudad: "Madrid", provincia: "Madrid" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "09:00", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "15:30", cierra: "19:00" },
      { dias: ["viernes"], abre: "09:00", cierra: "15:00" },
    ],
    coordenadas: { lat: 40.4189, lng: -3.6721 },
    urgencias24h: false,
    fichaGoogle: "https://www.google.com/maps?cid=0000000000000000000", // ficticia
  },
  zonas: ["Madrid", "Pozuelo de Alarcón", "Majadahonda", "Las Rozas", "Boadilla del Monte", "Alcobendas", "Tres Cantos", "Rivas-Vaciamadrid"],
  // Vídeo de la portada: se activa al tener los archivos (H.264 720p ≤ 2 MB y AV1 opcional,
  // 6–8 s en bucle, primer fotograma = póster). Ver public/ejemplo/CREDITOS.md.
  // videoHero: {
  //   src: "/ejemplo/hero.mp4",
  //   srcAv1: "/ejemplo/hero-av1.mp4",
  //   poster: img("hero-poster.jpg", "Salón reformado con tarima en espiga, molduras y dos balcones"),
  // },
  imagenesHero: [
    img("hero-poster.jpg", "Salón reformado con tarima en espiga, molduras y dos balcones"),
    img("lema-moldura.jpg", "Encuentro de moldura de escayola y techo recién pintado"),
    img("lema-manos-espiga.jpg", "Manos colocando una lama de roble en espiga"),
  ],
  servicios: [
    {
      titulo: "Reforma integral",
      slug: "reforma-integral",
      descripcion: "El piso entero, de la instalación al último rodapié, con un solo interlocutor.",
      contenido: [
        "Empezamos con una visita y un levantamiento de la casa: instalaciones, tabiques, techos y lo que merece la pena conservar.",
        "Con el proyecto cerrado firmamos precio y fecha. Coordinamos todos los oficios y te contamos cada semana cómo va la obra.",
        "En fincas antiguas recuperamos molduras, puertas y tarima siempre que se puede, y tramitamos los permisos con la comunidad.",
      ],
      incluye: ["Proyecto y licencia", "Instalaciones nuevas", "Tabiquería, techos y molduras", "Suelos, carpintería y pintura", "Limpieza final"],
      imagenes: [img("servicio-integral.jpg", "Pasillo de piso antiguo con puertas de cuarterones lacadas")],
      preguntas: [
        { pregunta: "¿Cuánto dura una reforma integral?", respuesta: "Un piso de 80 a 120 m² lleva entre 10 y 16 semanas. La fecha exacta va en el contrato." },
        { pregunta: "¿Hay que pedir licencia?", respuesta: "Sí. Nos encargamos de la licencia y del aviso a la comunidad." },
      ],
      precioDesde: "desde 850 €/m²", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Reforma de baño",
      slug: "reforma-de-bano",
      descripcion: "Baños de mármol, microcemento o cerámica, con ducha de obra y grifería a la vista.",
      contenido: [
        "Medimos, te proponemos dos o tres materiales y cerramos el diseño antes de tocar nada.",
        "Un baño completo lleva unas tres semanas. Cada tarde dejamos la zona recogida y protegida.",
      ],
      incluye: ["Fontanería y desagües nuevos", "Impermeabilización", "Revestimientos", "Sanitarios y grifería", "Mampara a medida"],
      imagenes: [
        img("servicio-bano.jpg", "Ducha de obra con mampara fija y grifería de latón"),
        img("servicio-bano-detalle.jpg", "Grifo de latón cepillado sobre mármol"),
      ],
      preguntas: [{ pregunta: "¿Puedo seguir viviendo en casa?", respuesta: "Sí, si hay otro baño. Si no, organizamos la obra para devolverte el agua cuanto antes." }],
      precioDesde: "desde 9.500 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Reforma de cocina",
      slug: "reforma-de-cocina",
      descripcion: "Cocinas abiertas al salón o cerradas, con encimeras de piedra y muebles a medida.",
      contenido: ["Antes de proponer abrir la cocina, comprobamos qué hay detrás del tabique y si se puede."],
      incluye: ["Proyecto de distribución", "Instalaciones", "Muebles a medida", "Encimera de piedra"],
      imagenes: [img("servicio-cocina.jpg", "Canto de una encimera de piedra junto a frentes de roble")],
      precioDesde: "desde 14.000 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Suelos de madera y tarima",
      slug: "suelos-de-madera-y-tarima",
      descripcion: "Tarima nueva en espiga o en lama, y restauración de la original.",
      incluye: ["Lijado y barnizado", "Reposición de lamas", "Tarima nueva", "Rodapié lacado"],
      imagenes: [img("servicio-suelos.jpg", "Tarima de roble en espiga con luz rasante")],
    },
    {
      titulo: "Carpintería a medida",
      slug: "carpinteria-a-medida",
      descripcion: "Armarios empotrados, puertas lacadas y librerías hechas para tu casa.",
      imagenes: [img("servicio-carpinteria.jpg", "Armario empotrado lacado con tiradores de latón")],
    },
    {
      titulo: "Proyecto e interiorismo",
      slug: "proyecto-e-interiorismo",
      descripcion: "Distribución, materiales y luz decididos antes de empezar la obra.", // sin foto ni contenido: bloque en tinta con espiga, noindex
    },
  ],
  trabajos: [
    {
      titulo: "Piso de 1925 en Chamberí",
      slug: "piso-de-1925-en-chamberi",
      descripcion: "Un piso de finca antigua abierto a la luz: fuera el tabique de la cocina, tarima en espiga recuperada y molduras restauradas.",
      ubicacion: "Chamberí",
      anio: 2026,
      servicio: "reforma-integral",
      superficie: "112 m²",
      duracion: "14 semanas",
      precio: "entre 95.000 y 110.000 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Querían una cocina abierta sin perder el carácter de la casa. Abrimos el tabique, reforzamos el dintel y conservamos las molduras.",
        "La tarima original estaba gris y suelta: la lijamos, repusimos 30 lamas de roble y la barnizamos al agua.",
      ],
      imagenes: [
        img("obra-chamberi.jpg", "Salón y cocina abiertos con tarima en espiga en un piso de 1925"),
        img("obra-chamberi-detalle.jpg", "Detalle del encuentro entre la tarima y el rodapié lacado"),
      ],
      antes: img("obra-chamberi-antes.jpg", "El mismo salón antes: tabique, gotelé y terrazo gastado"),
      testimonio: { autor: "Beatriz y Andrés", texto: "Nos dieron una fecha y la cumplieron. Lo que más miedo nos daba, perder el suelo de la casa, es lo que más nos gusta ahora." },
    },
    {
      titulo: "Baño de mármol en Ibiza",
      slug: "bano-de-marmol-en-ibiza",
      descripcion: "La bañera de 1985 deja sitio a una ducha de obra con mármol blanco y grifería de latón.",
      ubicacion: "Ibiza (Retiro)",
      anio: 2025,
      servicio: "reforma-de-bano",
      superficie: "6 m²",
      duracion: "3 semanas",
      contenido: ["Cambiamos tuberías y desagüe, impermeabilizamos y dejamos la ducha a ras de suelo. El mármol se cortó en taller para que las vetas siguieran de una pieza a otra."],
      imagenes: [img("obra-ibiza-bano.jpg", "Baño con mármol blanco y lavabo de obra")],
      antes: img("obra-ibiza-bano-antes.jpg", "El baño antes, con bañera y azulejo beis"),
    },
    {
      titulo: "Cocina abierta en Goya",
      slug: "cocina-abierta-en-goya",
      descripcion: "Una cocina cerrada y oscura convertida en el centro de la casa, con isla de piedra.",
      ubicacion: "Goya (Salamanca)",
      anio: 2025,
      servicio: "reforma-de-cocina",
      superficie: "18 m²",
      duracion: "5 semanas",
      contenido: ["La pared que separaba la cocina del comedor no era de carga: la quitamos y ganamos una isla con frentes de roble."],
      imagenes: [img("obra-goya-cocina.jpg", "Cocina abierta con isla de piedra y frentes de roble")],
      antes: img("obra-goya-cocina-antes.jpg", "La cocina antes, cerrada y alicatada hasta el techo"),
    },
    {
      titulo: "Ático con terraza en Pozuelo",
      slug: "atico-con-terraza-en-pozuelo",
      descripcion: "Un ático de los noventa con suelo continuo de microcemento y un ventanal nuevo hacia la terraza.",
      ubicacion: "Pozuelo de Alarcón",
      anio: 2024,
      servicio: "reforma-integral",
      superficie: "140 m²",
      imagenes: [img("obra-pozuelo.jpg", "Salón de un ático con ventanal y suelo de microcemento")], // sin antes ni duración
    },
    {
      titulo: "Espiga recuperada en Lavapiés",
      slug: "espiga-recuperada-en-lavapies",
      descripcion: "La tarima original de un piso de 1910, lijada, repuesta y barnizada en diez días.",
      ubicacion: "Lavapiés",
      anio: 2026,
      servicio: "suelos-de-madera-y-tarima",
      superficie: "54 m²",
      duracion: "10 días",
      contenido: ["Numeramos las lamas sueltas y las volvimos a colocar en su sitio; las que no se podían salvar, con roble viejo del mismo tono."],
      imagenes: [img("obra-lavapies.jpg", "Tarima en espiga original restaurada y barnizada")],
      antes: img("obra-lavapies-antes.jpg", "La misma tarima antes, gris y con lamas sueltas"),
    },
  ],
  valoracion: { media: 4.9, total: 96 },
  resenas: [
    { autor: "Beatriz L.", texto: "Nos dieron una fecha y la cumplieron. El suelo de la abuela está mejor que nunca.", puntuacion: 5, fecha: "2026-10-12", fuente: "google" },
    { autor: "Jorge M.", texto: "Hicimos el piso entero con ellos. Lo mejor fue tener a una sola persona al teléfono durante catorce semanas: cada viernes nos contaba cómo iba la obra, qué se había retrasado y por qué. Hubo un cambio de precio por una viga que apareció al abrir el tabique y nos lo explicaron con fotos antes de seguir. La comunidad ni se quejó.", puntuacion: 5, fecha: "2026-08", fuente: "google" },
    { autor: "Carmen R.", texto: "El baño parece de hotel y lo terminaron en tres semanas.", puntuacion: 5, fecha: "2026-06", fuente: "google" },
    { autor: "Íñigo P.", texto: "Buen trabajo. La encimera llegó una semana tarde, pero avisaron con tiempo.", puntuacion: 4, fecha: "2026-03", fuente: "google" },
    { autor: "Lucía S.", texto: "Muy limpios y muy serios.", puntuacion: 5, fecha: "2025-12", fuente: "google" },
    { autor: "Fernando G.", texto: "Nos enseñaron dos obras parecidas antes de firmar. Eso nos convenció.", puntuacion: 5, fecha: "2025-10", fuente: "google" },
  ],
  acreditaciones: [{ nombre: "Registro de Empresas Acreditadas (REA)", numero: "n.º 13/0034871" }],
  garantias: ["Precio cerrado y firmado antes de empezar", "Fecha de entrega en el contrato", "Un solo interlocutor durante toda la obra", "Casa protegida y recogida cada tarde", "3 años de garantía en la obra"],
  marcas: ["Cosentino", "Laufen", "Hansgrohe", "Finsa"],
  empresa: {
    historia: [
      "Lucernario nació en 2008 en el barrio de Ibiza, haciendo baños y cocinas en las fincas del Retiro.",
      "Hoy somos catorce personas entre arquitectura técnica, jefes de obra y oficiales propios, y hacemos sobre todo pisos completos en fincas antiguas.",
    ],
    imagenes: [
      img("empresa-llana.jpg", "Manos pasando la llana sobre una pared de microcemento"),
      img("empresa-muestrario.jpg", "Muestras de madera, mármol y azulejo sobre una mesa de obra"),
      img("empresa-plano.jpg", "Plano de planta y metro de carpintero sobre una mesa"),
    ],
    equipo: [
      { nombre: "Elena Varela", cargo: "Arquitecta técnica y directora de obra" }, // sin foto: nunca una cara de IA
      { nombre: "Rubén Ortega", cargo: "Jefe de obra" },
    ],
  },
  preguntas: [
    { pregunta: "¿Hacéis visita antes del presupuesto?", respuesta: "Sí. Vemos la casa, tomamos medidas y en unos diez días te mandamos el presupuesto cerrado." },
    { pregunta: "¿Cómo se paga la obra?", respuesta: "Por fases: una parte al firmar, otras al cerrar cada etapa y la última al entregar." },
    { pregunta: "¿Os encargáis de la licencia?", respuesta: "Sí, de la licencia y de avisar a la comunidad de propietarios." },
  ],
  redes: { instagram: "https://instagram.example/lucernario" }, // ficticia
  seo: {
    titulo: "Reforma integral de pisos en Madrid | Lucernario",
    descripcion: "Reformas integrales, baños y cocinas en Madrid con precio cerrado y fecha en el contrato. Mira nuestras obras en Chamberí, Salamanca y Retiro.",
    url: "https://reformas-premium-1.example",
  },
  // proceso: sin datos → pasos por defecto de proyecto (core).
  // Sin seo.indexar (demo: noindex) ni analitica (la activa cada web).
});
