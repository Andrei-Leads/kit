/*
 * Mensajes de WhatsApp de «Banco de trabajo» (encargo §3, tono de taller). La lógica es de core
 * (mensajeGeneral, mensajeServicio, mensajeTrabajo): aquí solo van los textos por defecto del diseño.
 */
import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { refTrabajo } from "@/lib/formato";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Inicio, cabecera, barra móvil, contacto, empresa y CTA final. */
export function mensajeTaller(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, "Buenas. Necesito un trabajo de carpintería y os paso fotos y medidas para el presupuesto.");
}

/** Ficha de servicio: el del servicio o «Buenas. Necesito {servicio}; os paso fotos y medidas.» */
export function mensajePieza(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Buenas. Necesito ${minusculaInicial(t)}; os paso fotos y medidas.`);
}

/** Ficha de trabajo: «Buenas. He visto el trabajo «{titulo}» (ref. 004) y quiero algo parecido.» */
export function mensajeReferencia(trabajo: Pick<Trabajo, "titulo">, indice: number): string {
  const ref = refTrabajo(indice).toLowerCase();
  return mensajeTrabajo(trabajo, (t) => `Buenas. He visto el trabajo «${t}» (${ref}) y quiero algo parecido.`);
}
