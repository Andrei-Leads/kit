import type { SiteConfig, Trabajo } from "@andrei-leads/core";

import { precioNoPartido } from "./formato";

/** Pastilla informativa de un trabajo: `etiqueta` es solo para lectores de pantalla («Ubicación: …»). */
export type PastillaTrabajo = { etiqueta: string; valor: string };

/**
 * Pastillas de la ficha de /trabajos/[slug] (solo las que existan), en el orden del diseño:
 * ubicación · duración · año · precio. `superficie` no tiene pastilla en el diseño y no se pinta.
 */
export function pastillasTrabajo(t: Trabajo): PastillaTrabajo[] {
  const pares: [string, string | number | undefined][] = [
    ["Ubicación", t.ubicacion],
    ["Duración", t.duracion],
    ["Año", t.anio],
    ["Precio", t.precio === undefined ? undefined : precioNoPartido(t.precio)],
  ];
  return pares
    .filter((p): p is [string, string | number] => p[1] !== undefined && p[1] !== "")
    .map(([etiqueta, valor]) => ({ etiqueta, valor: String(valor) }));
}

/** «Sevilla (Triana) · 2025»: línea de meta de las tarjetas (solo lo que exista). */
export function metaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio">): string {
  return [t.ubicacion, t.anio].filter((x) => x !== undefined && x !== "").join(" · ");
}

/** Id de la ancla del filtro de /trabajos para un servicio. */
export function idAncla(slugServicio: string): string {
  return `trabajos-${slugServicio}`;
}

/** Id de la lista de /trabajos (destino del chip «Todos»). */
export const ID_LISTA_TRABAJOS = "lista-trabajos";

export type Filtro = {
  /** Chips (sin «Todos»): un servicio por chip, en el orden en que aparece en los trabajos. */
  chips: { id: string; texto: string }[];
  /** slug de trabajo → id de ancla. Solo la PRIMERA tarjeta de cada servicio lleva id (ids únicos). */
  anclas: Map<string, string>;
};

/**
 * Filtro de /trabajos: solo con ≥ 2 servicios distintos y ≥ 4 trabajos (si no, `null`).
 * Es estático y sin JS: cada chip es un enlace ancla a la primera tarjeta de su servicio.
 */
export function filtroTrabajos(config: Pick<SiteConfig, "trabajos" | "servicios">): Filtro | null {
  const { trabajos, servicios } = config;
  const chips: Filtro["chips"] = [];
  const anclas = new Map<string, string>();
  for (const t of trabajos) {
    if (!t.servicio) continue;
    const id = idAncla(t.servicio);
    if (chips.some((c) => c.id === id)) continue;
    const servicio = servicios.find((s) => s.slug === t.servicio);
    chips.push({ id, texto: servicio?.titulo ?? t.servicio });
    anclas.set(t.slug, id);
  }
  if (chips.length < 2 || trabajos.length < 4) return null;
  return { chips, anclas };
}
