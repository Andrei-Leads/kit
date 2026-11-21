/*
 * Variantes de botón de «La furgoneta» (entrega §3 y §3 bis). Todas son
 * `className` de `BotonLlamada` / `BotonWhatsApp` de core. Todos los botones
 * primarios llevan siempre un borde de 2 px en --color-texto (regla fija: un
 * primario amarillo no se funde con la arena). `.boton` (globals.css) añade la
 * transición y el pulsado.
 */

const PAR = "boton inline-flex flex-[1_1_15rem] items-center rounded-boton border-2 no-underline leading-tight";

/** llamada-hero: piedra primaria de 64 px, texto + número en dos líneas. */
export const llamadaHero = `${PAR} min-h-16 gap-3 border-texto bg-primario px-[1.375rem] py-2.5 text-sobre-primario hover:bg-primario-hover`;

/** whatsapp-pagina: piedra superficie con borde texto, 56 px. */
export const whatsappPagina = `${PAR} min-h-14 gap-2.5 border-texto bg-superficie px-[1.375rem] py-2 text-[1.0625rem] font-bold text-texto hover:bg-secundario-hover`;

/** whatsapp-hero: sobre la foto, blanco al 16 % con borde blanco. */
export const whatsappFoto = `${PAR} min-h-14 gap-2.5 border-white bg-white/16 px-[1.375rem] py-2 text-[1.0625rem] font-bold text-white hover:bg-white/30`;

/** llamada-cta: piedra arena grande (72 px) sobre la tinta. */
export const llamadaCta = `${PAR} min-h-18 flex-[1_1_16rem] gap-3 border-fondo bg-fondo px-6 py-3 text-texto hover:bg-alterna`;

/** whatsapp-cta: contorno arena sobre la tinta. */
export const whatsappCta = `${PAR} min-h-14 flex-[1_1_16rem] gap-2.5 border-fondo bg-transparent px-[1.375rem] py-2 text-[1.0625rem] font-bold text-sobre-tinta hover:bg-fondo/16`;

/** llamada-cabecera: píldora primaria de 48 px. */
export const llamadaCabecera =
  "boton inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border-2 border-texto bg-primario px-3 text-base font-bold text-sobre-primario no-underline tabular-nums hover:bg-primario-hover sm:px-4";

/** whatsapp-cabecera (≥ 1024 px). */
export const whatsappCabecera =
  "boton hidden h-12 items-center gap-2 whitespace-nowrap rounded-full border-2 border-texto bg-superficie px-4 text-base font-bold text-texto no-underline hover:bg-secundario-hover lg:inline-flex";

/** llamada-menu: piedra de 72 px con el número en Fraunces. */
export const llamadaMenu =
  "boton inline-flex min-h-18 max-w-[520px] flex-[1_1_18rem] items-center gap-3.5 rounded-boton border-2 border-texto bg-primario px-6 py-3 leading-tight text-sobre-primario no-underline hover:bg-primario-hover";

/** Enlace con flecha («Cómo llegar →», «Ver todas las reseñas en Google →»). */
export const enlaceFlecha = "inline-flex min-h-11 w-fit items-center font-bold text-texto underline-offset-4 hover:underline";
