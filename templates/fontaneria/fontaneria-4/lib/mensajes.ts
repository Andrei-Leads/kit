/*
 * Mensajes de WhatsApp propios de «Parte de trabajo» (encargo §3). La lógica es de core
 * (mensajeGeneral, mensajeServicio, mensajeTrabajo): aquí solo van los textos por defecto del diseño.
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

/** Inicio, cabecera, índice, barra móvil y contacto. */
export function mensajeAviso(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, "Hola, quiero abrir un aviso desde la web. Dirección y foto de la avería:");
}

/** Ficha de servicio: el del servicio o «Hola, quiero abrir un aviso de {titulo}. Os mando una foto.». */
export function mensajeAvisoServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero abrir un aviso de ${minusculaInicial(t)}. Os mando una foto.`);
}

/** Ficha de trabajo: «Hola, he leído el parte «{titulo}» y tengo algo parecido.». */
export function mensajeParte(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he leído el parte «${t}» y tengo algo parecido.`);
}
