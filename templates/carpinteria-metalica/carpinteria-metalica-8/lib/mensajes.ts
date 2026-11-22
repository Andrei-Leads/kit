import { mensajeGeneral, mensajeServicio, mensajeTrabajo, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Mensaje general del diseño (encargo §3): inicio, cabecera, barra móvil, contacto y CTA final. */
export const MENSAJE_TALLER = "Hola, os escribo desde vuestra web. Quería pediros un trabajo:";

/** Página 404 (encargo §3). */
export const MENSAJE_NO_ENCONTRADA = "Hola, he llegado a una página de vuestra web que no existe. Quería preguntaros:";

/** El del cliente (`contacto.mensajeWhatsapp`) o el del diseño. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_TALLER);
}

/** Ficha de servicio: `mensajeWhatsapp` del servicio o el de core («Hola, quiero información sobre…»). */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio);
}

/** Ficha de trabajo: el de core («…he visto el trabajo «{titulo}» y quiero algo parecido.»). */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}
