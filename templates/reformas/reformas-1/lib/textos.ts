import type { Resena, Trabajo } from "@andrei-leads/core";

/** Datos de una pareja de botones (WhatsApp + Llamar). */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/** Pie de una obra: «Baño con ventana en Benimaclet · 5 m² · 12 días». Lo que falta, se omite. */
export function pieObra(t: Pick<Trabajo, "titulo" | "superficie" | "duracion">): string {
  return [t.titulo, t.superficie, t.duracion].filter(Boolean).join(" · ");
}

/** «Benimaclet · 2026» (línea de versalitas de la ficha). */
export function lineaObra(t: Pick<Trabajo, "ubicacion" | "anio">): string {
  return [t.ubicacion, t.anio].filter(Boolean).join(" · ");
}

/** Filas de la tabla de una obra (pares de la home): solo las que existen. */
export function filasObra(t: Pick<Trabajo, "superficie" | "duracion" | "precio">): { k: string; v: string }[] {
  const filas: { k: string; v: string }[] = [];
  if (t.superficie) filas.push({ k: "Superficie", v: t.superficie });
  if (t.duracion) filas.push({ k: "Plazo", v: t.duracion });
  if (t.precio) filas.push({ k: "Precio aproximado", v: t.precio });
  return filas;
}

/** Título con la última palabra aparte, para ponerla en cursiva: «Reforma de » + «baño». */
export function partirUltima(texto: string): [string, string] {
  const i = texto.trimEnd().lastIndexOf(" ");
  return i < 0 ? ["", texto] : [texto.slice(0, i + 1), texto.slice(i + 1)];
}

/** Título de obra con la ubicación al final en cursiva, si termina por ella; si no, entero. */
export function partirUbicacion(titulo: string, ubicacion?: string): [string, string] {
  if (ubicacion && titulo.endsWith(ubicacion) && titulo.length > ubicacion.length) {
    return [titulo.slice(0, titulo.length - ubicacion.length), ubicacion];
  }
  return [titulo, ""];
}

/** 4 → «Cuatro» (título del proceso). */
export function numeroEnLetra(n: number): string {
  return ["Cero", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis"][n] ?? String(n);
}

/** Las reseñas más recientes primero (sin fecha, al final), como mucho `max`. */
export function resenasRecientes(resenas: readonly Resena[], max: number): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, max);
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
