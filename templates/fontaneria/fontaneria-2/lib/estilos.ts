/*
 * Variantes de botón con nombre de «Precio cerrado» (revisión de CTAs v2 de la entrega). Son clases
 * para el `className` de `BotonLlamada` y `BotonWhatsApp` de core: core pone el enlace y el
 * comportamiento; el aspecto, aquí. El relleno de primario es solo para Llamar; WhatsApp va siempre
 * con contorno de 2 px en tinta. Pulsado = solo transform; hover solo con puntero (Tailwind v4).
 */
const BASE =
  "foco inline-flex items-center justify-center gap-2.5 rounded-boton font-bold leading-tight text-center no-underline transition-[background-color,transform] duration-150 active:translate-y-px active:scale-[.98] motion-reduce:transition-none";

const RELLENO = "bg-primario text-sobre-primario hover:bg-primario-hover tabular-nums";
const CONTORNO = "border-2 border-texto bg-fondo text-texto hover:bg-superficie";

export const boton = {
  /** Hero, cierres, servicio, contacto y 404: 60 px. */
  llamadaPrincipal: `${BASE} ${RELLENO} min-h-15 px-5.5 text-[1.0625rem]`,
  /** Siempre junto a la llamada: 60 px. */
  whatsappSecundario: `${BASE} ${CONTORNO} min-h-15 px-5.5 text-[1.0625rem]`,
  /** Cierres de sección (tras el bento, tras las reseñas, «Qué incluye», ficha de trabajo): 56 px. */
  llamadaCierre: `${BASE} ${RELLENO} min-h-14 px-5.5 text-[1.0625rem]`,
  whatsappCierre: `${BASE} ${CONTORNO} min-h-14 px-5.5 text-[1.0625rem]`,
  /** Cabecera: 48 px, «Llamar» por debajo de 768 px. */
  llamadaCabecera: `${BASE} ${RELLENO} min-h-12 px-4.5 text-base whitespace-nowrap`,
  /** Cabecera de escritorio (≥ 960 px). */
  whatsappCabecera: `${BASE} ${CONTORNO} min-h-12 px-4.5 text-base whitespace-nowrap`,
  /** Dentro de cada tarjeta de precio: contorno, 48 px, a todo el ancho. */
  llamadaTarifa: `${BASE} ${CONTORNO} min-h-12 w-full px-4.5 text-base`,
  /** CTA final sobre el bloque primario: 64 px, invertido. */
  llamadaCta: `${BASE} min-h-16 px-5.5 text-[1.1875rem] font-extrabold bg-sobre-primario text-primario tabular-nums hover:opacity-90`,
  /** CTA final: contorno de 2 px en sobre-primario, 56 px. */
  whatsappCta: `${BASE} min-h-14 px-5 border-2 border-sobre-primario text-sobre-primario hover:bg-sobre-primario/10`,
};

/** Píldora de enlace secundario (migas no; «Ver todas en Google», «Cómo llegar», 404): 44 px. */
export const pildoraEnlace =
  "foco inline-flex min-h-11 items-center rounded-boton border border-borde bg-fondo px-5 font-semibold no-underline hover:bg-alterna";

/** Tarjeta blanca con borde y sombra del diseño. */
export const tarjeta = "rounded-tarjeta border border-borde bg-fondo shadow-tarjeta";

/** Elevación al pasar o enfocar (sombra ya puesta; sin desplazamiento con «reducir movimiento»). */
export const elevar =
  "transition-transform duration-150 ease-out hover:-translate-y-0.5 focus-within:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0";

/** Títulos. */
export const h2Seccion = "m-0 text-h2 font-extrabold";
export const h1Pagina = "m-0 font-titulo text-pagina font-extrabold";

