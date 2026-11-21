import { MENSAJE_NO_ENCONTRADA, mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial } from "@andrei-leads/core";
import type { Servicio, SiteConfig, Trabajo } from "@andrei-leads/core";

/*
 * Mensajes precargados de WhatsApp de «Precio cerrado» (encargo §3). Core elige el del cliente si
 * existe; aquí solo van los textos por defecto del template (así se sabe de qué template llega el lead).
 */

const BASE = "Hola, vengo de vuestra web. ¿Me dais precio para esto? Os mando una foto:";

/** Inicio, cabecera, barra móvil, contacto y CTA de las páginas generales. */
export function mensajeBase(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, BASE);
}

/** Ficha de servicio: «Hola, quiero precio para {titulo}. Os mando una foto.» */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero precio para ${minusculaInicial(t)}. Os mando una foto.`);
}

/** Ficha de trabajo: «Hola, he visto «{titulo}» y quiero precio para algo parecido.» */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto «${t}» y quiero precio para algo parecido.`);
}

/** 404: el de core. */
export { MENSAJE_NO_ENCONTRADA };
