import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Mensaje general de «Caudal» (encargo §3): inicio, cabecera, barra, flotante y contacto. */
export const MENSAJE_POR_DEFECTO = "Hola, vengo de vuestra web. Quiero pedir presupuesto para una instalación:";

/** `contacto.mensajeWhatsapp` o el de este template. */
export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_POR_DEFECTO);
}

/** `servicios[].mensajeWhatsapp` o «Hola, quiero presupuesto de {titulo}. Os cuento la vivienda:». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero presupuesto de ${minusculaInicial(t)}. Os cuento la vivienda:`);
}

/** «Hola, he visto «{titulo}» en vuestra web y quiero algo parecido.» */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto «${t}» en vuestra web y quiero algo parecido.`);
}
