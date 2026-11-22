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

/** Mensaje por defecto de «Antes y después» (encargo §3): inicio, cabecera, barra y contacto. */
export const MENSAJE_POR_DEFECTO = "Hola, he visto vuestros antes y después en la web y quiero presupuesto para mi casa.";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o «Hola, quiero presupuesto para {servicio}.». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero presupuesto para ${minusculaInicial(t)}. ¿Cuándo podríais venir a verlo?`);
}

/** El de core: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}

/** Botón principal de WhatsApp (hero, CTA, contacto, 404). */
export const TEXTO_WHATSAPP = "Pide presupuesto";
/** Ficha de trabajo (encargo §3). */
export const TEXTO_WHATSAPP_TRABAJO = "Quiero algo parecido";
