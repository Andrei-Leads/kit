import { mensajeGeneral, mensajeServicio, minusculaInicial, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { numeroPieza } from "@/lib/piezas";

export { MENSAJE_NO_ENCONTRADA } from "@andrei-leads/core";

/** Mensaje general de «Galería» (encargo §3): inicio, cabecera, barra, menú, contacto y CTA final. */
export const MENSAJE_PIEZAS = "Hola, he visto vuestras piezas en la web y quiero presupuesto para un mueble a medida.";

export function mensajeInicio(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return mensajeGeneral(contacto, MENSAJE_PIEZAS);
}

/** Ficha de servicio: el de los datos o «Hola, quiero presupuesto para cocinas.» (frase que funciona con cualquier título). */
export function mensajeDeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return mensajeServicio(servicio, (t) => `Hola, quiero presupuesto para ${minusculaInicial(t)}.`);
}

/** Ficha de pieza: «Hola, he visto la pieza n.º 01, «Cocina de fresno», y quiero algo parecido.» */
export function mensajeDePieza(trabajo: Pick<Trabajo, "titulo">, indice: number): string {
  return `Hola, he visto la pieza n.º ${numeroPieza(indice)}, «${trabajo.titulo}», y quiero algo parecido.`;
}
