import type { Servicio, SiteConfig, Trabajo } from "@andrei-leads/core";

export const MENSAJE_GENERICO = "Hola, os escribo desde vuestra web.";

/** Inicio, cabecera, barra móvil, pie y contacto: el del cliente o el genérico. */
export function mensajeGeneral(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return contacto.mensajeWhatsapp ?? MENSAJE_GENERICO;
}

/** Destacado, guía y filas de servicio: el del servicio o «Hola, quiero información sobre {titulo}». */
export function mensajeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return servicio.mensajeWhatsapp ?? `Hola, quiero información sobre ${servicio.titulo}`;
}

/** /trabajos/[slug]: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.» */
export function mensajeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return `Hola, he visto el trabajo «${trabajo.titulo}» y quiero algo parecido.`;
}
