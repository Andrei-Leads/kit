import { mensajeGeneral, mensajeServicio, mensajeTrabajo, minusculaInicial, type SiteConfig, type Servicio, type Trabajo } from "@andrei-leads/core";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Inicio, cápsula, barra móvil y contacto: el del cliente o el de «Llegamos». */
export const MENSAJE_LLEGAMOS = "Hola, os escribo desde la web. Estoy en (pueblo y calle) y os mando una foto:";

export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_LLEGAMOS);
}

/** Ficha de servicio: `mensajeWhatsapp` del servicio o «Hola, necesito {titulo}. Estoy en (pueblo):». */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, necesito ${minusculaInicial(t)}. Estoy en (pueblo):`);
}

/** Ficha de trabajo: «Hola, he visto «{titulo}» y estoy cerca. ¿Podéis venir?». */
export function mensajeDeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return mensajeTrabajo(trabajo, (t) => `Hola, he visto «${t}» y estoy cerca. ¿Podéis venir?`);
}

/** Texto del botón de WhatsApp de la ficha de servicio (requisito del kit; nunca «Pide tu…»). */
export function textoWhatsappServicio(servicio: Pick<Servicio, "titulo">): string {
  return `Pide presupuesto de ${minusculaInicial(servicio.titulo)} por WhatsApp`;
}
