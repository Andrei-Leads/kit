import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Mensaje general de «Obra con nombre» (encargo §3): dice de dónde viene el lead. */
export const MENSAJE_OBRAS = "Hola, he visto vuestras obras en la web y quiero presupuesto para mi piso.";

export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_OBRAS);
}

/** Ficha de servicio: el de los datos o «Hola, quiero información sobre reforma de baño.» */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero información sobre ${minusculaInicial(t)}.`);
}

/** Ficha de trabajo: el de core («…he visto el trabajo «{titulo}» y quiero algo parecido.»). */
export function mensajeDeObra(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo);
}
