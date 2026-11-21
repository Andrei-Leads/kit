import { MENSAJE_NO_ENCONTRADA, mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial } from "@andrei-leads/core";
import type { Servicio, SiteConfig, Trabajo } from "@andrei-leads/core";

/*
 * Mensajes precargados de WhatsApp de «Apagón» (encargo §3). Core elige el del cliente si existe; aquí
 * solo van los textos por defecto del template (así se sabe de qué template llega el lead).
 */

const GENERAL = "Hola, os escribo desde vuestra web por una urgencia eléctrica. Os mando foto:";

/** Inicio, cabecera, barra móvil, contacto y CTA generales. */
export function mensajeBase(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, GENERAL);
}

/**
 * Ficha de servicio (encargo §3 y decisión del orquestador): `servicios[].mensajeWhatsapp` o «Hola,
 * quiero información sobre {servicio}.» con minúscula inicial. El botón lleva un texto corto
 * («Pregunta por WhatsApp»); el servicio va aquí, en el mensaje.
 */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero información sobre ${minusculaInicial(t)}.`);
}

/** Ficha de trabajo: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto el trabajo «${t}» y quiero algo parecido`);
}

/** 404: el de core. */
export { MENSAJE_NO_ENCONTRADA };
