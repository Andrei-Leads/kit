import type { Resena, SiteConfig } from "@andrei-leads/core";

/** Una reseña de más de 170 caracteres se recorta a 4 líneas con «Leer más» (Specs §2). */
export const UMBRAL_RESENA_LARGA = 170;

/**
 * Las `n` reseñas más recientes por `fecha` (AAAA-MM[-DD]); las que no tienen fecha, al final y en
 * su orden original (la fecha es opcional en el contrato). No modifica la lista de entrada.
 */
export function resenasRecientes(resenas: readonly Resena[], n = 3): Resena[] {
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

/** La valoración de Google solo se muestra con datos (sin ella, ni estrellas ni hueco). */
export function valoracionVisible(valoracion: SiteConfig["valoracion"]): NonNullable<SiteConfig["valoracion"]> | undefined {
  return valoracion && valoracion.total > 0 ? valoracion : undefined;
}
