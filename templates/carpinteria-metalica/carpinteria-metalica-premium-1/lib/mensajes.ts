import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Mensaje general por defecto de «Marco» (encargo §3): cabecera, barra, menú, inicio, contacto. */
export const MENSAJE_POR_DEFECTO = "Hola, os escribo desde vuestra web. Os mando fotos de la ventana que quiero cambiar:";

/** 404 (encargo §3). */
export const MENSAJE_NO_ENCONTRADA = "Hola, he llegado a una página de vuestra web que no existe. Quería consultaros:";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o el de core («Hola, quiero información sobre {servicio}»). */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero información sobre ${minusculaInicial(t)}.`);
}

/** El de core: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}

/** Textos de los botones (encargo §3). */
export const TEXTO_WA = "Envíanos fotos por WhatsApp";
export const TEXTO_WA_CORTO = "Escribir por WhatsApp";
export const TEXTO_WA_TRABAJO = "Quiero algo parecido";
/** Botón de WhatsApp de un servicio: genérico, sin el título (puede empezar por verbo). */
export const TEXTO_WA_SERVICIO = "Consultar por WhatsApp";

/** Línea de confianza por defecto (sin valoración ni horario). */
export const RESPUESTA = "Por WhatsApp puedes mandarnos fotos y medidas";
