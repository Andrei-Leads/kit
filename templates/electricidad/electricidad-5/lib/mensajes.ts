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

/** Mensaje por defecto de «Casa al día» (encargo §3): inicio, cabecera, menú, barra y contacto. */
export const MENSAJE_POR_DEFECTO = "Hola, os escribo desde vuestra web. Quiero poner al día la instalación de mi casa:";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o «Hola, quiero información sobre {servicio}.» (el servicio va en el mensaje). */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero información sobre ${minusculaInicial(t)}.`);
}

/** «Hola, he visto el trabajo «{titulo}» y quiero algo parecido». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto el trabajo «${t}» y quiero algo parecido.`);
}

/**
 * Texto del botón de WhatsApp de la ficha de servicio: corto, el del diseño (decisión del
 * orquestador). El servicio ya va en el mensaje precargado (`mensajeDeServicio`).
 */
export const TEXTO_WHATSAPP_SERVICIO = "Pregunta por WhatsApp";

/** Botón de WhatsApp de la 404: texto neutro. */
export const TEXTO_WHATSAPP_404 = "Escríbenos por WhatsApp";
