export { BotonLlamada } from "./boton-llamada";
export { BotonWhatsApp } from "./boton-whatsapp";
export { defineSiteConfig, siteConfigSchema, crearSlug } from "./site-config";
export type {
  SiteConfig,
  SiteConfigInput,
  Imagen,
  Servicio,
  Trabajo,
  Resena,
  Pregunta,
  Acreditacion,
  Tarifas,
  Empresa,
  Comunidades,
} from "./site-config";
export {
  AvisoLegal,
  PoliticaPrivacidad,
  PoliticaCookies,
  enlacesLegales,
} from "./legal";
export {
  crearSitemap,
  crearRobots,
  crearMetadatos,
  metadatosPagina,
  metadatosServicio,
  metadatosTrabajo,
  crearDatosEstructurados,
  DatosEstructurados,
} from "./seo";
export type { Metadatos, EntradaSitemap, Robots } from "./seo";
export { formatearHorario } from "./horario";
export type { Dia, FranjaHorario, LineaHorario } from "./horario";
