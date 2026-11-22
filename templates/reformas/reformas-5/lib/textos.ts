import { telefonoVisible, type Trabajo } from "@andrei-leads/core";

/** Datos de una pareja de botones (WhatsApp + Llamar). */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/** «Llamar · 600 00 05 15». */
export function textoLlamar(telefono: string): string {
  return `Llamar · ${telefonoVisible(telefono)}`;
}

/** «Patraix · 2026 · 70 m²» (tarjetas de la home). */
export function metaCorta(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie">): string {
  return [t.ubicacion, t.anio, t.superficie].filter(Boolean).join(" · ");
}

/** «Patraix · 2026 · 70 m² · 9 semanas» (rejilla de /trabajos). */
export function metaLarga(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie" | "duracion">): string {
  return [t.ubicacion, t.anio, t.superficie, t.duracion].filter(Boolean).join(" · ");
}

/**
 * Reseña larga (encargo §6.6: más de unas 6 líneas): la parte visible y el resto para
 * «Leer más». Corta en el final de frase más cercano a ~200 caracteres.
 */
export function partirResena(texto: string, limite = 260): { inicio: string; resto?: string } {
  if (texto.length <= limite) return { inicio: texto };
  const frases = texto.match(/[^.!?]+[.!?]+(\s+|$)/g) ?? [texto];
  let inicio = "";
  for (const f of frases) {
    if (inicio && (inicio + f).length > 200) break;
    inicio += f;
  }
  const resto = texto.slice(inicio.length).trim();
  return resto ? { inicio: inicio.trim(), resto } : { inicio: texto };
}
