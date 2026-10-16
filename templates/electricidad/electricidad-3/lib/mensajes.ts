import type { Servicio, SiteConfig, Trabajo } from "@andrei-leads/core";

import { minusculaInicial } from "./formato";

export const MENSAJE_GENERICO = "Hola, os escribo desde vuestra web.";

/** Página 404 (app/not-found.tsx). */
export const MENSAJE_NO_ENCONTRADA = "Hola, buscaba una página en vuestra web y no la encontré.";

/**
 * Mensaje general: barra móvil (todas las páginas, brief §7), cabecera, pie, hero, CTA final y
 * /contacto. El del cliente o el genérico.
 */
export function mensajeGeneral(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return contacto.mensajeWhatsapp ?? MENSAJE_GENERICO;
}

/** Mensaje precargado de un servicio: el del servicio o «Hola, quiero información sobre {titulo}». */
export function mensajeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return servicio.mensajeWhatsapp ?? `Hola, quiero información sobre ${servicio.titulo}`;
}

/**
 * Texto del botón de WhatsApp de un servicio (decisión 4 de Ysst): «Pide presupuesto de {servicio} por
 * WhatsApp» (nunca «Pide tu…»).
 */
export function etiquetaWhatsAppServicio(servicio: Pick<Servicio, "titulo">): string {
  return `Pide presupuesto de ${minusculaInicial(servicio.titulo)} por WhatsApp`;
}

/** /trabajos/[slug]: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.» */
export function mensajeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return `Hola, he visto el trabajo «${trabajo.titulo}» y quiero algo parecido.`;
}
