/**
 * Textos fijos de interfaz de «Del barrio»: los de la Specs §9 más los que los mockups usan y la
 * Specs no listaba (revisión, menor 15). Ninguno nombra una ciudad ni un dato del negocio: eso sale
 * siempre de `site.config`. Plurales y datos variables, en lib/formato.ts.
 */
export const textos = {
  // Hero, botones y chips
  llamar: "Llamar",
  llamanos: "Llámanos",
  fotoAveria: "Envíanos una foto de la avería",
  urgencias24h: "Urgencias 24 h",
  llegamosEn: "Llegamos en",
  menu: "Menú",
  cerrar: "Cerrar",
  escribenosWhatsapp: "Escríbenos por WhatsApp",
  whatsapp: "WhatsApp",

  // Reseñas
  tituloResenas: "Lo que dicen tus vecinos",
  verMasOpiniones: "Ver más opiniones",
  verTodasGoogle: "Ver todas en Google",
  leerMas: "Leer más",
  leerMenos: "Leer menos",

  // Franja de confianza (nombre accesible de la lista)
  confianza: "Confianza",

  // Sin reseñas
  porQueFiarte: "Por qué fiarte",
  enElBarrio: "en el barrio",

  // Secciones
  comoTrabajamos: "Cómo trabajamos",
  servicios: "Servicios",
  verServicio: "Ver servicio",
  verTodosServicios: "Ver todos los servicios",
  desde: "desde",
  queIncluye: "Qué incluye",
  otrosServicios: "Otros servicios",
  trabajosDelServicio: "Trabajos de este servicio",
  verElServicio: "Ver el servicio:",
  tarifas: "Tarifas",
  dondeTrabajamos: "Dónde trabajamos",
  preguntasFrecuentes: "Preguntas",
  preguntasFrecuentesInicio: "Preguntas frecuentes",
  trabajos: "Trabajos",
  todos: "Todos",
  antes: "Antes",
  despues: "Después",
  otrosTrabajos: "Otros trabajos",
  quienesSomos: "Quiénes somos",
  elEquipo: "El equipo",
  contacto: "Contacto",
  horario: "Horario",
  direccion: "Dirección",
  comoLlegar: "Cómo llegar",
  verFichaGoogle: "Ver ficha en Google",
  paginas: "Páginas",

  // CTA final
  ctaTitulo: "¿Se te ha ido la luz?",
  ctaTexto: "Llámanos y te decimos a qué hora podemos ir.",

  // Fotos y legales
  fotoEjemplo: "Foto de ejemplo",
  avisoLegal: "Aviso legal",
  privacidad: "Privacidad",
  cookies: "Cookies",
  inicio: "Inicio",
} as const;
