import { fechaResena, type Resena } from "@andrei-leads/core";

/** Las `n` reseñas más recientes por `fecha`; sin fecha, al final en su orden. */
export function resenasRecientes(resenas: readonly Resena[], n = 6): Resena[] {
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

export type Trozo = { texto: string; zona: boolean };

/**
 * Parte el texto de una reseña para marcar con <mark> los municipios de `zonas` que nombra
 * (comparación exacta, en el servidor). Los nombres largos van primero («Quart de Poblet» antes que «Quart»).
 */
export function marcarZonas(texto: string, zonas: readonly string[]): Trozo[] {
  const nombres = [...new Set(zonas.filter(Boolean))].sort((a, b) => b.length - a.length);
  if (nombres.length === 0) return [{ texto, zona: false }];
  const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?<![\\p{L}])(${nombres.map(escapar).join("|")})(?![\\p{L}])`, "gu");
  const trozos: Trozo[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > ultimo) trozos.push({ texto: texto.slice(ultimo, i), zona: false });
    trozos.push({ texto: m[0], zona: true });
    ultimo = i + m[0].length;
  }
  if (ultimo < texto.length) trozos.push({ texto: texto.slice(ultimo), zona: false });
  return trozos;
}

/** «noviembre de 2026» o nada. */
export function fechaVisible(r: Pick<Resena, "fecha">): string | undefined {
  return r.fecha ? fechaResena(r.fecha) : undefined;
}

/** «★★★★☆»: la puntuación redondeada a la estrella entera más cercana. */
export function estrellas(puntuacion: number): string {
  const n = Math.max(0, Math.min(5, Math.round(puntuacion)));
  return "★".repeat(n) + "☆".repeat(5 - n);
}
