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

/** Mensaje por defecto de «Restauración» (encargo §3): inicio, cabecera, barra y contacto. */
export const MENSAJE_POR_DEFECTO = "Hola, tengo una pieza de madera que quiero restaurar. Os mando una foto.";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o «Hola, quiero presupuesto para {servicio}. Os mando una foto de cómo está.» */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero presupuesto para ${minusculaInicial(t)}. Os mando una foto de cómo está.`);
}

/** «Hola, he visto la restauración «{titulo}» y tengo algo parecido.» (encargo §3). */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto la restauración «${t}» y tengo algo parecido.`);
}

/** Botón principal de WhatsApp (hero, cierres, contacto, CTA final, 404). */
export const TEXTO_WHATSAPP = "Mándanos una foto de tu pieza";
/** Ficha de servicio: texto corto; el servicio va en el mensaje (Ysst, 22/11/2026). */
export const TEXTO_WHATSAPP_SERVICIO = "Pide presupuesto";
/** Cada par antes/después y la ficha de trabajo (encargo §3). */
export const TEXTO_WHATSAPP_TRABAJO = "Tengo algo parecido";
