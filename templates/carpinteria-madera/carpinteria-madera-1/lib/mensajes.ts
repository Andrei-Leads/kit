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

/** Mensaje por defecto de «Veta» (encargo §3): inicio, cabecera, barra, contacto y CTA final. */
export const MENSAJE_POR_DEFECTO =
  "Hola, he visto vuestra web y quiero presupuesto para un mueble a medida. Os mando fotos y medidas del hueco.";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/**
 * `servicios[].mensajeWhatsapp` o «Hola, quiero presupuesto para {servicio}. Os mando fotos del
 * sitio.» (encargo §3). «Quiero presupuesto para…» se lee bien con cualquier título (lección de la
 * tanda: «quiero huecos difíciles» daba frases rotas).
 */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero presupuesto para ${minusculaInicial(t)}. Os mando fotos del sitio.`);
}

/** «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.» (encargo §3). */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}

/** Textos de botón (entrega, mapa de CTAs). El servicio va en el mensaje, no en el botón (Ysst, 22/11/2026). */
export const TEXTO_WHATSAPP = "Pide presupuesto";
export const TEXTO_WHATSAPP_FOTOS = "Envíanos fotos y medidas";
export const TEXTO_WHATSAPP_TRABAJO = "Quiero algo parecido";
export const TEXTO_ESTANCIA = "Quiero algo así";
export const TEXTO_ESTANCIA_LLAMAR = "Llamar para algo así";
