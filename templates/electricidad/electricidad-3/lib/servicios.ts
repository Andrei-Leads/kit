import type { Servicio, Trabajo } from "@andrei-leads/core";

/** h1 de la ficha: «{titulo} en {ciudad}» (encargo §5). */
export function tituloFicha(servicio: Pick<Servicio, "titulo">, ciudad: string): string {
  return `${servicio.titulo} en ${ciudad}`;
}

/**
 * Párrafos de la ficha: `contenido` y, sin él, la `descripcion` (en ese caso core marca la página
 * `noindex, follow`).
 */
export function parrafosServicio(servicio: Pick<Servicio, "contenido" | "descripcion">): string[] {
  return servicio.contenido.length > 0 ? servicio.contenido : [servicio.descripcion];
}

/** Trabajos de un servicio (`trabajos[].servicio === slug`), en el orden de los datos. */
export function trabajosDelServicio(trabajos: readonly Trabajo[], servicio: Pick<Servicio, "slug">): Trabajo[] {
  return trabajos.filter((t) => t.servicio === servicio.slug);
}

/** Fotos de la ficha después de la primera (la primera va arriba, en la cabecera). */
export function fotosRestantes(servicio: Pick<Servicio, "imagenes">): Servicio["imagenes"] {
  return servicio.imagenes.slice(1);
}

/** El resto de servicios, en su orden. */
export function otrosServicios(servicios: readonly Servicio[], servicio: Pick<Servicio, "slug">): Servicio[] {
  return servicios.filter((s) => s.slug !== servicio.slug);
}

/** «Dos Hermanas · 2026»: línea de meta de una tarjeta de trabajo (solo lo que exista). */
export function metaTrabajo(trabajo: Pick<Trabajo, "ubicacion" | "anio">): string {
  return [trabajo.ubicacion, trabajo.anio].filter((x) => x !== undefined && x !== "").join(" · ");
}
