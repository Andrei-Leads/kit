import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { MENSAJE_BASE, mensajePorServicio } from "@/lib/asistente";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Inicio, cápsula, barra móvil, contacto y CTA: el del cliente o el de «A medida» (encargo §3). */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_BASE);
}

/** Ficha de servicio: `mensajeWhatsapp` del servicio o «Hola, quiero presupuesto para {servicio}. Os mando foto y medidas del hueco.». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => mensajePorServicio(minusculaInicial(t)));
}

/** Ficha de trabajo: el de core («Hola, he visto el trabajo «{titulo}» y quiero algo parecido.»). */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}
