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
export { Analitica } from "./analitica";
export {
  telefonoVisible,
  listaY,
  mediaVisible,
  direccionLinea,
  urlComoLlegar,
  listaRedes,
  horarioVisible,
  iniciales,
  minusculaInicial,
  MESES,
  fechaResena,
  precioDesde,
} from "./formato";
export type { Ancla } from "./formato";
export {
  SLUG_RELLENO,
  hayTrabajos,
  parametrosServicios,
  parametrosTrabajos,
  buscarServicio,
  buscarTrabajo,
  otrosServicios,
  trabajosDelServicio,
  otrosTrabajos,
  servicioDelTrabajo,
  PASOS_POR_DEFECTO,
  pasosProceso,
} from "./contenido";
export type { Paso, TipoNegocio } from "./contenido";
export { MENSAJE_GENERICO, MENSAJE_NO_ENCONTRADA, mensajeGeneral, mensajeServicio, mensajeTrabajo } from "./mensajes";
export type { OrigenImagen, VideoHero } from "./site-config";
export { etiquetaOrigen } from "./imagen";
export { estiloMarca, colorSobre, contraste, TEXTO_CLARO, TEXTO_OSCURO } from "./marca";
