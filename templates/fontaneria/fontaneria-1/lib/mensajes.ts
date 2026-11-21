/*
 * Textos propios de WhatsApp de «Qué te pasa» (distintos de los otros templates de fontanería, para
 * saber de qué demo llega el mensaje). La lógica (dato del cliente o texto por defecto) es de core.
 */
import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Inicio, cabecera, barra, contacto y CTA: `contacto.mensajeWhatsapp` o el del template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, "Hola, os escribo desde la web. Os mando una foto de la avería:");
}

/** Ficha de servicio: `servicios[].mensajeWhatsapp` o «Hola, tengo este problema: {titulo}. Os mando una foto.». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (titulo) => `Hola, tengo este problema: ${minusculaInicial(titulo)}. Os mando una foto.`);
}

/** Ficha de trabajo. */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (titulo) => `Hola, he visto «${titulo}» en vuestra web y tengo algo parecido.`);
}
