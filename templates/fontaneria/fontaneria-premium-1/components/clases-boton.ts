/*
 * Variantes de botón de «Caudal» (encargo §3). Todas son `className` de
 * BotonLlamada / BotonWhatsApp de core. El relleno de primario es SOLO del
 * WhatsApp principal (o de Llamar cuando no hay WhatsApp y pasa a ser el
 * principal). Llamar nunca es un enlace de texto: contorno de 2 px.
 * Hover: WhatsApp a --color-primario-hover; Llamar, de contorno a relleno.
 */
const BASE =
  "boton inline-flex items-center justify-center gap-2.5 rounded-boton border-2 text-center leading-none font-medium whitespace-nowrap no-underline";

export const ALTURA = { hero: "h-14 px-[26px] text-base", cierre: "h-12 px-5 text-[15px]", cta: "h-[60px] px-[30px] text-base" } as const;

/** WhatsApp relleno de primario (el principal). */
export const waRelleno = `${BASE} border-primario bg-primario text-sobre-primario hover:border-primario-hover hover:bg-primario-hover`;
/** Llamar con contorno de tinta (sobre claro); al pasar, relleno de tinta. */
export const llamarTinta = `${BASE} border-tinta bg-transparent text-tinta hover:bg-tinta hover:text-white`;
/** Llamar con contorno blanco (sobre tinta o foto); al pasar, relleno blanco. */
export const llamarBlanco = `${BASE} border-white bg-transparent text-white hover:bg-white hover:text-tinta`;
