import type { Servicio, SiteConfig, Trabajo } from "@andrei-leads/core";

import { minusculaInicial } from "./formato";

export const MENSAJE_GENERICO = "Hola, os escribo desde vuestra web.";

/**
 * Mensaje general: inicio, hero («Envíanos una foto de la avería»), CTA final, cabecera, hoja del menú,
 * pie, contacto y BARRA MÓVIL (decisión 5 de Ysst: la barra lleva el mensaje general en todas las
 * páginas, también en servicios y trabajos). El del cliente o el genérico.
 */
export function mensajeGeneral(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return contacto.mensajeWhatsapp ?? MENSAJE_GENERICO;
}

/** Mensaje precargado de un servicio: el suyo o «Hola, quiero información sobre {titulo}». */
export function mensajeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return servicio.mensajeWhatsapp ?? `Hola, quiero información sobre ${servicio.titulo}`;
}

/**
 * Texto del botón de WhatsApp de la ficha de servicio (decisiones 4 y 7 de Ysst):
 * «Pide presupuesto de {servicio} por WhatsApp», nunca «Pide tu…» ni «Mándanos una foto por WhatsApp».
 */
export function etiquetaWhatsappServicio(servicio: Pick<Servicio, "titulo">): string {
  return `Pide presupuesto de ${minusculaInicial(servicio.titulo)} por WhatsApp`;
}

/** /trabajos/[slug]: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.» */
export function mensajeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return `Hola, he visto el trabajo «${trabajo.titulo}» y quiero algo parecido.`;
}
