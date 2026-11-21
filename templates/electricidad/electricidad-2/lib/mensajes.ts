import { minusculaInicial, type Servicio } from "@andrei-leads/core";

/**
 * Texto del botón de WhatsApp de la ficha de servicio (decisiones 4 y 7 de Ysst):
 * «Pide presupuesto de {servicio} por WhatsApp», nunca «Pide tu…» ni «Mándanos una foto por WhatsApp».
 */
export function etiquetaWhatsappServicio(servicio: Pick<Servicio, "titulo">): string {
  return `Pide presupuesto de ${minusculaInicial(servicio.titulo)} por WhatsApp`;
}
