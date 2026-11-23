import {
  MENSAJE_GENERICO,
  mensajeGeneral,
  mensajeServicio,
  mensajeTrabajo,
  type Servicio,
  type SiteConfig,
  type Trabajo,
} from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/**
 * Mensaje general (inicio, cabecera, barra, contacto): `contacto.mensajeWhatsapp` o el neutro de
 * core, «Hola, os escribo desde vuestra web.» (regla común de Ysst). El del encargo («…Os mando una
 * foto de mi fachada para cambiar las ventanas:») da por hecho el servicio: queda como propuesta.
 */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_GENERICO);
}

/** `servicios[].mensajeWhatsapp` o el de core: «Hola, quiero información sobre {servicio}.». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio);
}

/** El de core: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}

/** Textos de los botones de WhatsApp (encargo §3). */
export const TEXTO_WA_HERO = "Mándanos una foto de tu fachada";
export const TEXTO_WA = "Mándanos una foto";
/** Ficha de servicio: texto corto; el servicio va en el mensaje (regla común de Ysst). */
export const TEXTO_WA_SERVICIO = "Pedir precio";
export const TEXTO_WA_TARJETA = "Quiero este cambio";
export const TEXTO_WA_TRABAJO = "Quiero algo parecido";
export const TEXTO_WA_404 = "Escríbenos";
