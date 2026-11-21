import {
  mensajeGeneral,
  mensajeServicio,
  mensajeTrabajo,
  minusculaInicial,
  type Servicio,
  type SiteConfig,
  type Trabajo,
} from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Mensaje por defecto de «La furgoneta» (inicio, cabecera, menú, barra y contacto). */
export const MENSAJE_POR_DEFECTO = "Hola, os he encontrado en la web. Os cuento lo que me pasa:";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o «Hola, os escribo por {titulo}. Os mando una foto.» */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, os escribo por ${minusculaInicial(t)}. Os mando una foto.`);
}

/** «Hola, he visto «{titulo}» en vuestra web. Tengo algo parecido en casa.» */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto «${t}» en vuestra web. Tengo algo parecido en casa.`);
}

/** Texto del botón de WhatsApp de la ficha de servicio (regla del kit): nunca «Pide tu…». */
export function etiquetaWhatsappServicio(servicio: Pick<Servicio, "titulo">): string {
  return `Pide presupuesto de ${minusculaInicial(servicio.titulo)} por WhatsApp`;
}
