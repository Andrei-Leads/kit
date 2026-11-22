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

/** Mensaje por defecto de «Tu casa» (encargo §3): inicio, cabecera, menú, barra y contacto. */
export const MENSAJE_POR_DEFECTO = "Hola, he visto vuestra web y quiero cambiar mi casa. ¿Hablamos?";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o «Hola, quiero presupuesto de {servicio}.». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero presupuesto de ${minusculaInicial(t)}. ¿Cuándo podríais venir a verlo?`);
}

/** El de core: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}

/** Texto del botón principal de WhatsApp (hero, parejas, CTA final). */
export const TEXTO_WHATSAPP = "Cuéntanos tu casa";
/** Botón de WhatsApp de la ficha de servicio: corto; el servicio ya va en el mensaje precargado. */
export const TEXTO_WHATSAPP_SERVICIO = "Pide presupuesto";
/** Botón de WhatsApp de la ficha de trabajo (encargo §3). */
export const TEXTO_WHATSAPP_TRABAJO = "Quiero algo así en mi casa";
