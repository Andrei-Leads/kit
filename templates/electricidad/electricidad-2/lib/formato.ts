import { fechaResena, type Acreditacion } from "@andrei-leads/core";

/** 112 → "112 reseñas en Google"; 1 → "1 reseña en Google". */
export function totalResenas(total: number): string {
  return `${total} ${total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** 112 → "reseñas en Google"; 1 → "reseña en Google" (sin la cifra: la pinta el contador). */
export function palabraResenas(total: number): string {
  return `${total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** "1 año" / "N años" (nunca «1 años»). */
export function textoAnios(n: number): string {
  return n === 1 ? "1 año" : `${n} años`;
}

/**
 * Años en el barrio desde `anioFundacion`. El año actual viene de `anioActual()` (lib/anio.ts):
 * aquí no se lee la hora. Devuelve `undefined` si no hay fecha de fundación o el resultado no es
 * positivo (nunca «0 años»).
 */
export function aniosEnElBarrio(anioFundacion: number | undefined, anioActual: number): number | undefined {
  if (anioFundacion === undefined) return undefined;
  const n = anioActual - anioFundacion;
  return n > 0 ? n : undefined;
}

/** Firma de una reseña: «Autor · septiembre de 2026»; sin fecha, solo el autor (nunca «Autor · »). */
export function firmaResena(resena: { autor: string; fecha?: string }): string {
  return resena.fecha ? `${resena.autor} · ${fechaResena(resena.fecha)}` : resena.autor;
}

/**
 * Acreditación para pintar: el nombre COMPLETO, tal cual está en los datos (no se recorta en la primera
 * coma: no se manipulan los datos) y, solo si hay `numero`, «Nº {numero}». Sin número, sin línea «Nº»
 * (nunca «Nº undefined»).
 */
export function acreditacionVisible(a: Acreditacion): { nombre: string; numero?: string } {
  return { nombre: a.nombre, numero: a.numero ? `Nº ${a.numero}` : undefined };
}

