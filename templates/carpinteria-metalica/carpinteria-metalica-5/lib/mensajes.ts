import { mensajeGeneral, mensajeServicio, mensajeTrabajo, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/**
 * Mensaje general por defecto (cabecera, barra, menú, inicio, contacto): el neutro de core
 * (regla de Ysst). El del diseño era «… Tengo un proyecto y me gustaría enseñaros los planos:».
 */
export const MENSAJE_POR_DEFECTO = "Hola, os escribo desde vuestra web.";

/** 404 (encargo §3). */
export const MENSAJE_NO_ENCONTRADA = "Hola, he llegado a una página de vuestra web que no existe. Quería consultaros:";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o el de core («Hola, quiero información sobre {servicio}.»). */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio);
}

/** El de core: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}

/** Textos de los botones (encargo §3). El servicio va en el mensaje, nunca en el botón. */
export const TEXTO_WA = "Envíanos planos o fotos";
export const TEXTO_WA_SERVICIO = "Consultar esta solución";
export const TEXTO_WA_TRABAJO = "Quiero algo parecido";
export const TEXTO_WA_CONSULTA = "Enviar consulta por WhatsApp";
export const TEXTO_WA_404 = "Escríbenos por WhatsApp";
