import { mensajeGeneral, mensajeServicio, mensajeTrabajo, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/**
 * 404 (encargo §3). Propio del diseño: así se sabe que el lead llega de una página que no existe.
 */
export const MENSAJE_NO_ENCONTRADA = "Hola, he llegado a una página de vuestra web que no existe. Quería preguntaros:";

/**
 * Inicio, cápsula, barra móvil, contacto y CTA: `contacto.mensajeWhatsapp` o el genérico de core
 * («Hola, os escribo desde vuestra web.»). El del encargo («…Os mando una foto del sitio para un
 * trabajo de forja:») queda como decisión pendiente (regla de Ysst: mensaje general neutro).
 */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto);
}

/** Ficha de servicio: `servicios[].mensajeWhatsapp` o el de core («…información sobre {servicio}.»). */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio);
}

/** Ficha de trabajo y «Quiero una así»: el de core. */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}
