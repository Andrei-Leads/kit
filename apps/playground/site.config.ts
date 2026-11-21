import { defineSiteConfig } from "@andrei-leads/core";

/**
 * Datos ficticios del banco de pruebas. Solo sirven para ver las piezas del
 * registro (kit/registry/base/) con datos reales del contrato.
 */
export default defineSiteConfig({
  negocio: {
    nombre: "Banco de pruebas",
    nombreLegal: "Banco de pruebas, S.L.",
    nif: "B00000000",
    sector: "Pruebas del kit",
    descripcionCorta: "Banco de pruebas de las piezas base del kit.",
  },
  contacto: {
    telefono: "+34600000000",
    whatsapp: "+34600000000",
    email: "pruebas@example.com",
    direccion: { calle: "Carrer de Prova, 1", cp: "46001", ciudad: "Valencia", provincia: "Valencia" },
    horario: [{ dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "08:00", cierra: "19:00" }],
    urgencias24h: true,
  },
  servicios: [
    {
      titulo: "Cuadros eléctricos",
      descripcion: "Cambio y revisión de cuadros.",
      imagenes: [{ src: "/ejemplo/servicio-cuadro.jpg", alt: "Cuadro eléctrico abierto", origen: "ficha-google" }],
    },
  ],
  trabajos: [
    {
      titulo: "Enchufe quemado en una cocina",
      descripcion: "Cambio de base de enchufe y línea.",
      imagenes: [{ src: "/ejemplo/trabajo-enchufe.jpg", alt: "Enchufe nuevo en la cocina", origen: "ia" }],
      antes: { src: "/ejemplo/trabajo-enchufe-antes.jpg", alt: "Enchufe quemado antes de cambiarlo", origen: "ia" },
    },
  ],
  imagenesHero: [{ src: "/ejemplo/hero.jpg", alt: "Electricista revisando un cuadro", origen: "ia" }],
  preguntas: [
    { pregunta: "¿Cuánto tardáis en llegar?", respuesta: "Depende de la zona; te lo decimos al llamar." },
    { pregunta: "¿Hacéis boletines?", respuesta: "Sí, con instalador autorizado." },
    { pregunta: "¿Trabajáis en festivos?", respuesta: "Para urgencias, sí." },
  ],
  seo: {
    titulo: "Banco de pruebas del kit",
    descripcion: "Piezas base del registro del kit.",
    url: "https://playground.example.com",
  },
});
