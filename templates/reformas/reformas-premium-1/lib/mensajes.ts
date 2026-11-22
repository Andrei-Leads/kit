import { mensajeGeneral, mensajeServicio, mensajeTrabajo, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Mensaje genérico de «Estancia» (encargo §3): inicio, cabecera, barra, contacto y CTA final. */
export const MENSAJE_POR_DEFECTO = "Hola, he visto vuestras obras en la web y me gustaría que vinierais a ver mi casa.";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o el de core («Hola, quiero información sobre {servicio}»), como pide el encargo. */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio);
}

/** El de core: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.» (ficha y pano). */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}
