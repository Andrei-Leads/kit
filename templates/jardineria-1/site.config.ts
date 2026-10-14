import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Jardines Ejemplo",
    nombreLegal: "Jardines Ejemplo SL",
    nif: "B12345678",
    sector: "Jardinería y mantenimiento de jardines",
    descripcionCorta:
      "Mantenimiento, poda y diseño de jardines en la Ribera. Presupuesto sin compromiso.",
  },
  contacto: {
    telefono: "+34600000000",
    whatsapp: "+34600000000",
    email: "info@ejemplo.com",
    direccion: { calle: "Calle Mayor 1", cp: "46460", ciudad: "Silla", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "18:00" },
      { dias: ["sabado"], abre: "09:00", cierra: "13:00" },
    ],
  },
  zonas: ["Silla", "Almussafes", "Sollana", "Benifaió", "Alginet", "Picassent"],
  servicios: [
    { titulo: "Mantenimiento de jardines", descripcion: "Visitas periódicas: corte de césped, recorte de setos y limpieza." },
    { titulo: "Poda y tala", descripcion: "Poda de árboles, palmeras y setos con retirada de restos." },
    { titulo: "Diseño de jardines", descripcion: "Proyectamos e instalamos tu jardín desde cero." },
    { titulo: "Césped natural y artificial", descripcion: "Instalación y renovación de césped." },
    { titulo: "Riego automático", descripcion: "Instalación y reparación de sistemas de riego por goteo y aspersión." },
    { titulo: "Desbroce de parcelas", descripcion: "Limpieza de parcelas y solares con retirada de residuos." },
  ],
  resenas: [
    { autor: "María L.", texto: "Puntuales y muy limpios. El jardín ha quedado como nuevo.", puntuacion: 5 },
    { autor: "Comunidad Residencial Los Pinos", texto: "Llevan el mantenimiento de nuestras zonas verdes desde hace dos años. Siempre responden rápido y el trato es excelente; lo recomendamos a cualquier comunidad.", puntuacion: 5 },
    { autor: "José R.", texto: "Buen precio en la poda de las palmeras.", puntuacion: 4 },
  ],
  preguntas: [
    { pregunta: "¿El presupuesto tiene coste?", respuesta: "No. Vamos a ver el jardín y te damos un presupuesto sin compromiso." },
    { pregunta: "¿Trabajáis con comunidades de vecinos?", respuesta: "Sí, hacemos contratos de mantenimiento periódico para comunidades." },
    { pregunta: "¿Os lleváis los restos de poda?", respuesta: "Sí, la retirada de restos vegetales está incluida." },
    { pregunta: "¿Cada cuánto conviene el mantenimiento?", respuesta: "Depende del jardín; lo habitual es cada dos o cuatro semanas." },
  ],
  marca: { colorPrimario: "#2f6b3a" },
  seo: {
    titulo: "Jardinero en Silla y la Ribera | Jardines Ejemplo",
    descripcion: "Mantenimiento, poda y diseño de jardines. Presupuesto sin compromiso.",
    url: "https://ejemplo.com",
  },
  redes: { instagram: "https://instagram.com/ejemplo" },
});