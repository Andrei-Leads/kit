import type { Resena } from "@andrei-leads/core";

/** Una reseña de más de 280 caracteres se recorta a 6 líneas con «Leer más» (Specs §5). */
export const UMBRAL_RESENA_LARGA = 280;

/** Reseñas visibles en el inicio: las 3 primeras, y hasta 3 más tras «Ver más opiniones». */
export const RESENAS_VISIBLES = 3;
export const RESENAS_MAXIMO = 6;

/**
 * Las `n` reseñas más recientes por `fecha` (AAAA-MM[-DD]); las que no tienen fecha, al final y en
 * su orden original. No modifica la lista de entrada.
 */
export function resenasRecientes(resenas: readonly Resena[], n = RESENAS_MAXIMO): Resena[] {
  return resenas
    .map((r, i) => ({ r, i }))
    .sort((a, b) => {
      if (a.r.fecha && b.r.fecha) return b.r.fecha.localeCompare(a.r.fecha) || a.i - b.i;
      if (a.r.fecha) return -1;
      if (b.r.fecha) return 1;
      return a.i - b.i;
    })
    .slice(0, n)
    .map(({ r }) => r);
}
