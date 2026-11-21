import type { Resena } from "@andrei-leads/core";

/** Las `max` reseñas más recientes (las que no tienen fecha, al final), sin cambiar el orden entre iguales. */
export function resenasRecientes(resenas: readonly Resena[], max = 6): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, max);
}
