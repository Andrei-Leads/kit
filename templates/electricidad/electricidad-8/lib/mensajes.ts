/*
 * Mensajes de WhatsApp propios de «Comunidades y fincas» (encargo §3). La lógica es de core
 * (mensajeGeneral, mensajeServicio, mensajeTrabajo): aquí solo van los textos por defecto del diseño.
 */
import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Inicio, cabecera, barra móvil y contacto. */
export function mensajeEdificio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, "Hola, os escribo desde vuestra web por la instalación eléctrica de un edificio:");
}

/** Ficha de servicio: el del servicio o «Hola, quiero información sobre {servicio}.» (el servicio va en el mensaje). */
export function mensajeFichaServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero información sobre ${minusculaInicial(t)}.`);
}

/** Ficha de trabajo: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.» (por defecto de core). */
export function mensajeFichaTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}

/** /comunidades y el botón presupuesto-junta. */
export const MENSAJE_JUNTA = "Hola, escribo por una comunidad de vecinos y querría un presupuesto para la junta:";
