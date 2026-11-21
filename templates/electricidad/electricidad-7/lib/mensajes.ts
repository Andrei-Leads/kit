import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_GENERICO, MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Inicio, cabecera, barra móvil, contacto y CTA: el del cliente o el de «Mándanos una foto». */
export const MENSAJE_FOTO = "Hola, os escribo desde vuestra web. Ahora os mando una foto de lo que me pasa:";

export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_FOTO);
}

/**
 * Ficha de servicio: `mensajeWhatsapp` del servicio o «Hola, os escribo por: {servicio}. Ahora os
 * mando una foto.». Los títulos de este template son síntomas («Un enchufe se ha quemado»): la
 * plantilla de core («información sobre un enchufe se ha quemado») daba una frase rota.
 */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, os escribo por: ${minusculaInicial(t)}. Ahora os mando una foto.`);
}

/** Ficha de trabajo: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.» (el de core). */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}
