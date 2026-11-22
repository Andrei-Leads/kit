import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Mensaje por defecto de «Tensión» (encargo §3): inicio, cabecera, barra, menú y contacto. */
export const MENSAJE_POR_DEFECTO =
  "Hola, os escribo desde vuestra web. Estoy preparando una obra y querría presupuesto para la instalación eléctrica:";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o «Hola, quiero presupuesto de {servicio}». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero presupuesto de ${minusculaInicial(t)}.`);
}

/** «Hola, he visto el proyecto «{titulo}» y quiero algo parecido». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto el proyecto «${t}» y quiero algo parecido.`);
}

/** Texto de la píldora principal (encargo §3). */
export const TEXTO_WHATSAPP = "Pedir presupuesto por WhatsApp";
/** Ficha de trabajo (encargo §7). */
export const TEXTO_WHATSAPP_TRABAJO = "Quiero algo parecido";
