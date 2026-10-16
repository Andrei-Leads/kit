import type { Servicio, SiteConfig, Trabajo } from "@andrei-leads/core";

/** Partes numeradas de una guía, en el orden del diseño (Specs §6). */
export type ParteGuia = "queEs" | "incluye" | "tramite" | "trabajos" | "preguntas" | "resenas";

/** Texto del índice «En esta guía» y ancla de cada parte. */
export const PARTES_GUIA: Record<ParteGuia, { id: string; etiqueta: string }> = {
  queEs: { id: "que-es", etiqueta: "Qué es" },
  incluye: { id: "que-incluye", etiqueta: "Qué incluye" },
  tramite: { id: "tramite", etiqueta: "Cómo es el trámite" },
  trabajos: { id: "trabajos", etiqueta: "Trabajos" },
  preguntas: { id: "preguntas", etiqueta: "Preguntas" },
  resenas: { id: "resenas", etiqueta: "Reseñas" },
};

/** h1 de guía: mono 700 · 28 → 46 px. */
export const h1Guia =
  "m-0 max-w-[24ch] font-mono text-[28px] leading-[1.12] font-bold tracking-[-0.025em] text-balance md:text-[46px]";

/** Trabajos que enlazan a este servicio (`trabajos[].servicio` es su slug). */
export function trabajosDelServicio(trabajos: readonly Trabajo[], servicio: Pick<Servicio, "slug">): Trabajo[] {
  return trabajos.filter((t) => t.servicio === servicio.slug);
}

/**
 * Partes numeradas que se pintan en la guía de un servicio, en orden. Única fuente de verdad: la
 * página pinta con esta lista y el índice «En esta guía» sale de ella, así que numeración, índice
 * y contenido no pueden desincronizarse.
 *
 * Sin `contenido` no hay «Qué es» ni índice (página corta; la `descripcion` ya va en la cabecera).
 * El trámite sale siempre (usa los pasos por defecto). El resto, solo con datos.
 */
export function partesGuia(
  servicio: Pick<Servicio, "contenido" | "incluye" | "preguntas">,
  config: Pick<SiteConfig, "resenas">,
  hayTrabajos: boolean
): ParteGuia[] {
  const partes: ParteGuia[] = [];
  if (servicio.contenido.length > 0) partes.push("queEs");
  if (servicio.incluye.length > 0) partes.push("incluye");
  partes.push("tramite");
  if (hayTrabajos) partes.push("trabajos");
  if (servicio.preguntas.length > 0) partes.push("preguntas");
  if (config.resenas.length > 0) partes.push("resenas");
  return partes;
}

/** El índice solo existe en las guías con `contenido` (Specs §6). */
export function hayIndice(servicio: Pick<Servicio, "contenido">): boolean {
  return servicio.contenido.length > 0;
}
