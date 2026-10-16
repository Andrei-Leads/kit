/** Clases compartidas entre secciones y páginas (Specs §1). */

/** h1 (inicio e interiores): Source Serif 4 600 · 38 → 60 px. */
export const h1 =
  "m-0 font-serif text-[38px] leading-[1.06] font-semibold tracking-[-0.01em] text-balance lg:text-[60px]";

/** h1 de páginas interiores: igual que el del inicio, con un ancho máximo de 22 caracteres. */
export const h1Interior = `${h1} max-w-[22ch]`;

/** h2 de sección: Source Serif 4 600 · 32 → 46 px. */
export const h2 =
  "m-0 font-serif text-[32px] leading-[1.1] font-semibold text-balance lg:text-[46px]";

/** h3 de tarjetas: Source Serif 4 600 · 23 px. */
export const h3 = "m-0 font-serif text-[23px] leading-[1.2] font-semibold";

/** Cifra grande en serif cursiva (nota media, años en el barrio): 92 px. */
export const cifraGrande =
  "font-serif text-[92px] leading-[0.9] font-normal tracking-[-0.02em] italic";

/** Párrafo de lectura: 17 px a 60ch en tinta suave. */
export const lectura = "m-0 max-w-[60ch] text-tinta-suave text-pretty";

/** Tarjeta blanca con sombra suave (reseñas, servicios, acreditaciones). */
export const tarjeta = "rounded-tarjeta bg-tarjeta shadow-resena";

/** Todo enlace de lista (pie, hoja del menú): ≥ 44 px de alto (zona táctil). */
export const enlaceLista = "flex min-h-11 items-center no-underline hover:underline hover:underline-offset-4";
