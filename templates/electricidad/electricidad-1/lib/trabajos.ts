import type { SiteConfig, Trabajo } from "@andrei-leads/core";

export type CampoTrabajo = { etiqueta: string; valor: string };

function lista(pares: [string, string | number | undefined][]): CampoTrabajo[] {
  return pares
    .filter((p): p is [string, string | number] => p[1] !== undefined && p[1] !== "")
    .map(([etiqueta, valor]) => ({ etiqueta, valor: String(valor) }));
}

/** Campos de la tarjeta de /trabajos (solo los que existan): ubicación · año · duración. */
export function camposTarjeta(t: Trabajo): CampoTrabajo[] {
  return lista([
    ["Ubicación", t.ubicacion],
    ["Año", t.anio],
    ["Duración", t.duracion],
  ]);
}

/** Campos de la ficha de /trabajos/[slug] (solo los que existan): ubicación · superficie · duración · año · precio. */
export function camposFicha(t: Trabajo): CampoTrabajo[] {
  return lista([
    ["Ubicación", t.ubicacion],
    ["Superficie", t.superficie],
    ["Duración", t.duracion],
    ["Año", t.anio],
    ["Precio", t.precio],
  ]);
}

/** «Madrid (Tetuán) · 2026»: línea de meta de «Otros trabajos». */
export function metaTrabajo(t: Trabajo): string {
  return [t.ubicacion, t.anio].filter((x) => x !== undefined && x !== "").join(" · ");
}

/**
 * Clases de ancho de cada celda de una rejilla de campos con huecos de 1 px (2 columnas en móvil, 4 en
 * escritorio). La última celda se ensancha hasta llenar la fila: una celda vacía se vería como un
 * bloque gris, porque los huecos de la rejilla son las reglas.
 */
export function anchosRejilla(n: number): string[] {
  const MOVIL = { 1: "col-span-1", 2: "col-span-2" } as const;
  const ESCRITORIO = { 1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4" } as const;
  return Array.from({ length: n }, (_, i) => {
    const ultima = i === n - 1;
    const movil = ultima && n % 2 === 1 ? 2 : 1;
    const escritorio = (ultima ? 4 - (i % 4) : 1) as 1 | 2 | 3 | 4;
    return `${MOVIL[movil]} ${ESCRITORIO[escritorio]}`;
  });
}

/** Id de la ancla del filtro de /trabajos para un servicio. */
export function idAncla(slugServicio: string): string {
  return `trabajos-${slugServicio}`;
}

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
