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

/** Mensaje por defecto de «Oficio» (encargo §3): inicio, cabecera, barra, menú y contacto. */
export const MENSAJE_POR_DEFECTO = "Hola, he visto vuestra web y quiero hablar de una pieza a medida. Os mando fotos y medidas.";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o «Hola, quiero presupuesto de {servicio}. Os mando fotos del sitio.». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero presupuesto de ${minusculaInicial(t)}. Os mando fotos del sitio.`);
}

/** «Hola, he visto la obra «{titulo}» y quiero algo parecido.». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto la obra «${t}» y quiero algo parecido.`);
}

/** Textos de botón (encargo §3). */
export const TEXTO_WA = "Pedir presupuesto por WhatsApp";
export const TEXTO_WA_PROCESO = "Envíanos fotos por WhatsApp";
export const TEXTO_WA_FINAL = "Cuéntanos tu pieza por WhatsApp";
export const TEXTO_WA_TRABAJO = "Quiero algo parecido";
export const TEXTO_WA_ESCRIBIR = "Escribir por WhatsApp";

/** Botón de WhatsApp de un servicio: genérico, sin el título (puede empezar por verbo). */
export const TEXTO_WA_SERVICIO = "Pedir presupuesto por WhatsApp";
