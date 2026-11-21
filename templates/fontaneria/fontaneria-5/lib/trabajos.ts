import type { SiteConfig } from "@andrei-leads/core";

/** Id de la lista de tarjetas (destino del chip «Todos»). */
export const ID_LISTA = "lista-trabajos";

export type Filtro = {
  chips: { id: string; texto: string }[];
  /** slug de trabajo → id de ancla (solo la primera tarjeta de cada servicio). */
  anclas: Map<string, string>;
};

/**
 * Filtro de /trabajos: solo con ≥ 2 servicios distintos y ≥ 4 trabajos. Estático: cada etiqueta es
 * un enlace a la primera tarjeta de su servicio. El texto es el título del servicio.
 */
export function filtroTrabajos(config: Pick<SiteConfig, "trabajos" | "servicios">): Filtro | null {
  const chips: Filtro["chips"] = [];
  const anclas = new Map<string, string>();
  for (const t of config.trabajos) {
    if (!t.servicio) continue;
    const id = `trabajos-${t.servicio}`;
    if (chips.some((c) => c.id === id)) continue;
    const servicio = config.servicios.find((s) => s.slug === t.servicio);
    chips.push({ id, texto: servicio?.titulo ?? t.servicio });
    anclas.set(t.slug, id);
  }
  if (chips.length < 2 || config.trabajos.length < 4) return null;
  return { chips, anclas };
}
