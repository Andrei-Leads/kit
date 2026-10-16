/** Clases compartidas entre secciones y páginas (Specs §1). Todas usan tokens de globals.css. */

/** h1 de páginas interiores: 800 · 34 → 52 px. (Los del hero los define el Hero: 36 / 46 / 76 px.) */
export const h1Interior =
  "m-0 text-[34px] leading-[1.08] font-extrabold tracking-[-0.015em] text-balance lg:text-[52px]";

/** h2 de sección: 700 · 26 → 34 px. */
export const h2 = "m-0 text-[26px] leading-[1.15] font-bold tracking-[-0.01em] text-balance lg:text-[34px]";

/** h3 de tarjetas y pasos: 700 · 20 px. */
export const h3 = "m-0 text-xl leading-[1.2] font-bold";

/** Padding superior de sección: 44 px móvil, 64 px escritorio (Pantalla, L.secY). */
export const seccionY = "pt-11 lg:pt-16";

/** Tarjeta redondeada de 20 px en superficie, sin borde. */
export const tarjeta = "rounded-tarjeta bg-superficie";

/** Chip informativo (no es enlace: <span>) en superficie-2. */
export const chip =
  "inline-flex min-h-[30px] items-center gap-1.5 rounded-pastilla bg-superficie-2 px-3 text-[15px] font-semibold";

/** Clases de la nav de migas (ver components/Migas.tsx). Enlaces de ≥ 44 px de alto (zona táctil). */
export const migas = {
  nav: "text-[15px] text-texto-suave",
  lista: "m-0 flex list-none flex-wrap items-center p-0",
  item: "flex items-center",
  enlace: "inline-flex min-h-11 min-w-11 items-center text-texto-suave underline underline-offset-[3px] hover:text-texto",
  actual: "inline-flex min-h-11 items-center text-texto",
} as const;
