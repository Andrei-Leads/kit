/*
 * Formato propio de «Diario de obra». Lo común (teléfono visible, media, horario, pasos…) viene de core;
 * aquí solo lo que pinta este diseño. Solo para componentes de servidor.
 */
import { formatearHorario, mediaVisible, pasosProceso, type Paso, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** 1 → "01". */
export function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Pasos por defecto del diseño (sin `proceso` en los datos): visita → presupuesto → contrato con fecha →
 * obra → limpieza → garantía. Sin plazos ni promesas concretas.
 */
const PASOS_DIARIO: readonly Paso[] = [
  { titulo: "Visita y medición", texto: "Vamos a ver la obra y medimos." },
  { titulo: "Presupuesto por escrito", texto: "Te damos el presupuesto por escrito." },
  { titulo: "Contrato con fecha", texto: "Firmamos el precio y la fecha de fin." },
  { titulo: "Obra", texto: "Hacemos la obra y te contamos cómo va." },
  { titulo: "Limpieza", texto: "Recogemos y limpiamos al terminar." },
  { titulo: "Garantía", texto: "Volvemos si algo falla." },
];

export function pasosDiario(proceso: SiteConfig["proceso"]): readonly Paso[] {
  return pasosProceso(proceso, PASOS_DIARIO);
}

/** «Nota 04 · Obra»: la primera palabra del título del paso. */
export function tituloCorto(titulo: string): string {
  return titulo.split(/\s+/)[0] ?? titulo;
}

/** Trabajos por `anio`, del más reciente al más antiguo; los que no tienen año, al final y en su orden. */
export function trabajosOrdenados(trabajos: readonly Trabajo[]): Trabajo[] {
  return trabajos
    .map((t, i) => ({ t, i }))
    .sort((a, b) => (b.t.anio ?? -1e9) - (a.t.anio ?? -1e9) || a.i - b.i)
    .map((x) => x.t);
}

/** «2026 — Triana — 9 m² — 14 días»: cada dato que falte se quita. */
export function lineaObra(t: Pick<Trabajo, "anio" | "ubicacion" | "superficie" | "duracion">): string {
  return [t.anio, t.ubicacion, t.superficie, t.duracion].filter(Boolean).join(" — ");
}

/** "4,8 · 143 reseñas en Google". */
export function valoracionCorta(v: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(v.media)} · ${v.total} reseñas en Google`;
}

/** "4,8 de 5 · 143 reseñas en Google". */
export function valoracionLarga(v: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(v.media)} de 5 · ${v.total} reseñas en Google`;
}

/** «★★★★☆». */
export function estrellas(puntuacion: number): string {
  const n = Math.round(puntuacion);
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/** Corta una reseña larga (> 260 caracteres) por un espacio cerca del carácter 220. */
export function cortarResena(texto: string): { corto: string; resto: string } | undefined {
  if (texto.length <= 260) return undefined;
  const k = texto.lastIndexOf(" ", 220);
  return { corto: texto.slice(0, k), resto: texto.slice(k + 1) };
}

/** Horario en una línea: «Lunes a viernes, 7:30–15:30 · Sábado, 9:00–13:00». */
export function horarioLinea(horario: SiteConfig["contacto"]["horario"]): string {
  return formatearHorario(horario)
    .map((h) => `${h.dias}, ${h.horas}`)
    .join(" · ");
}
