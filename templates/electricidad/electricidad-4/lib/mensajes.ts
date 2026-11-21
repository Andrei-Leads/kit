/*
 * Mensajes de WhatsApp propios de «Cuadro» (encargo §3). La lógica es de core (mensajeGeneral,
 * mensajeServicio, mensajeTrabajo): aquí solo van los textos por defecto del diseño.
 */
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

/** Inicio, cabecera, barra móvil y contacto. */
export function mensajeCuadro(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, "Hola, os escribo desde vuestra web. Me ha saltado algo en el cuadro:");
}

/** Ficha de servicio: el del servicio o «Hola, quiero información sobre {servicio}.». */
export function mensajeModulo(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero información sobre ${minusculaInicial(t)}.`);
}

/** Ficha de trabajo: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido». */
export function mensajeParecido(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto el trabajo «${t}» y quiero algo parecido.`);
}
