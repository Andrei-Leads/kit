import { MENSAJE_GENERICO, mensajeGeneral, mensajeServicio, mensajeTrabajo, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/**
 * Inicio, cabecera, barra móvil, contacto y CTA final: el del cliente o el genérico de core
 * («Hola, os escribo desde vuestra web.»). Regla común de Ysst: mensaje general neutro. El encargo
 * proponía «… Quiero que vengáis a medir:» (decisión pendiente en el informe).
 */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_GENERICO);
}

/** Ficha de servicio: `mensajeWhatsapp` del servicio o el de core («Hola, quiero información sobre {servicio}.»). */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio);
}

/** Ficha de trabajo: el de core («Hola, he visto el trabajo «{titulo}» y quiero algo parecido.»). */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}
