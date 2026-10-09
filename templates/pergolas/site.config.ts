import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Pérgolas Ejemplo",
    nombreLegal: "Pérgolas Ejemplo SL",
    nif: "B12345678",
    sector: "Pérgolas y estructuras bioclimáticas",
    descripcionCorta: "Diseñamos e instalamos pérgolas a medida en Valencia.",
  },
  contacto: {
    telefono: "+34600000000",
    direccion: {
      calle: "Calle Mayor 1",
      cp: "46440",
      ciudad: "Almussafes",
      provincia: "Valencia",
    },
    horario: [{ dias: "Lunes a viernes", horas: "9:00–18:00" }],
  },
  zonas: ["Almussafes", "Sollana", "Benifaió"],
  servicios: [
    { titulo: "Pérgolas bioclimáticas", descripcion: "Lamas orientables de aluminio." },
    { titulo: "Toldos", descripcion: "Protección solar a medida." },
  ],
  seo: {
    titulo: "Pérgolas en Valencia | Pérgolas Ejemplo",
    descripcion: "Pérgolas bioclimáticas a medida en la Ribera Baixa.",
    url: "https://ejemplo.com",
  },
});