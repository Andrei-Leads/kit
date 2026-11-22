/*
 * Mensajes de WhatsApp de «Diario de obra» (encargo §3). La lógica es de core (mensajeGeneral,
 * mensajeServicio, mensajeTrabajo): aquí solo van los textos por defecto del diseño.
 */
import { mensajeGeneral, mensajeServicio, minusculaInicial, type Servicio, type SiteConfig } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA, mensajeTrabajo } from "@andrei-leads/core";

/** Inicio, índice, barra móvil, contacto y CTA final. */
export function mensajeDiario(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, "Hola, he leído vuestro diario de obra y quiero presupuesto.");
}

/** Ficha de servicio: el del servicio o el de core con el título en minúscula («… sobre reforma de baño»). */
export function mensajeObraServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero información sobre ${minusculaInicial(t)}.`);
}
