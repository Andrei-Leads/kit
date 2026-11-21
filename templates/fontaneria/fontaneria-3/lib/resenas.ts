import type { Resena } from "@andrei-leads/core";

/** Más recientes primero; las que no tienen fecha, al final (orden estable). */
export function resenasRecientes(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
}

/** «Google», «En la web» o nada. */
export function fuenteResena(fuente: Resena["fuente"]): string | undefined {
  if (fuente === "google") return "Google";
  if (fuente === "web") return "En la web";
  return undefined;
}
