/** Clases compartidas entre secciones y páginas (Specs §1). */

/** Etiqueta de campo: mono 11 px, mayúsculas, +0,14 em, tinta suave. */
export const etiquetaCampo =
  "font-mono text-[11px] leading-none font-medium tracking-[0.14em] text-tinta-suave uppercase";

/** Número de sección «02 —»: mono 13 px, +0,08 em. */
export const numeroSeccion = "font-mono text-[13px] font-medium tracking-[0.08em] text-tinta-suave";

/** h1 del inicio: mono 700 · 30 → 54 px. */
export const h1Inicio =
  "m-0 font-mono text-[30px] leading-[1.1] font-bold tracking-[-0.025em] text-balance md:text-[54px]";

/** h1 de páginas interiores: mono 700 · 30 → 46 px (guías: 28 → 46). */
export const h1Interior =
  "m-0 max-w-[26ch] font-mono text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-balance md:text-[46px]";

/** h2 de sección: mono 700 · 26 → 38 px. */
export const h2 =
  "m-0 font-mono text-[26px] leading-[1.15] font-bold tracking-[-0.02em] text-balance md:text-[38px]";

/** h3 de tarjetas y pasos: mono 700 · 22 → 30 px. */
export const h3 = "m-0 font-mono text-[22px] leading-[1.2] font-bold tracking-[-0.02em] md:text-[30px]";

/** Párrafo de lectura de guía: 18 px / 1,6 a 66ch. */
export const lectura = "m-0 max-w-[66ch] text-[18px] leading-[1.6] text-tinta-cuerpo text-pretty";

/** Clases de la nav de migas (ver components/Migas.tsx). */
export const migas = {
  nav: "font-mono text-xs font-medium tracking-[0.06em] text-tinta-suave",
  lista: "m-0 flex list-none flex-wrap items-center p-0",
  item: "flex items-center",
  enlace: "inline-flex min-h-11 items-center text-tinta-suave underline underline-offset-4 hover:text-tinta",
  actual: "inline-flex min-h-11 items-center text-tinta",
} as const;

/**
 * Sección sin fondo propio: contenedor con padding solo arriba (56 → 96 px). La separación con lo
 * que sigue la pone la sección siguiente (las de fondo, con su margen superior; el CTA final, con el suyo).
 */
export const seccionPlana = "contenedor pt-14 md:pt-24";

/** Título de caja del documento («Qué incluye», «Desde»…): etiqueta de campo con regla inferior. */
export const cabeceraCaja = "border-b border-regla pb-2.5 " + etiquetaCampo;
