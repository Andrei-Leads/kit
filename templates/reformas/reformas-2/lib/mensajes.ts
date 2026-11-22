import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { MENSAJE_PLANIFICADOR } from "@/lib/planificador";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Inicio, cápsula, barra móvil, contacto y CTA: el del cliente o «…desde vuestro planificador de reformas.». */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_PLANIFICADOR);
}

/** Ficha de servicio: `mensajeWhatsapp` del servicio o «Hola, quiero información sobre {servicio}». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero información sobre ${minusculaInicial(t)}.`);
}

/** Ficha de trabajo: el de core. */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}
