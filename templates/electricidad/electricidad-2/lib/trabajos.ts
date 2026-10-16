import type { SiteConfig, Trabajo } from "@andrei-leads/core";

import { textos } from "@/lib/textos";

/** Une con « · » solo lo que existe (nunca un separador colgando). */
function unir(partes: (string | number | undefined)[]): string {
  return partes.filter((x) => x !== undefined && x !== "").join(" · ");
}

/** Meta de la tarjeta de /trabajos y de «Otros trabajos»: «Valencia (Benimaclet) · 2026». */
export function metaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio">): string {
  return unir([t.ubicacion, t.anio]);
}

/** Línea de datos bajo el h1 de la ficha (mockup 2e): «Valencia (Benimaclet) · 2 horas · 2026». */
export function datosTrabajo(t: Pick<Trabajo, "ubicacion" | "duracion" | "anio">): string {
  return unir([t.ubicacion, t.duracion, t.anio]);
}

export type CampoFicha = { etiqueta: string; valor: string };

/**
 * Datos de la ficha que no caben en la línea bajo el h1 (superficie y precio): solo los que existan. El
 * precio se pinta tal cual (son cifras validadas por el cliente; no se interpreta ni se añade «desde»).
 */
export function camposFicha(t: Pick<Trabajo, "superficie" | "precio">): CampoFicha[] {
  const campos: CampoFicha[] = [];
  if (t.superficie) campos.push({ etiqueta: textos.superficie, valor: t.superficie });
  if (t.precio) campos.push({ etiqueta: textos.precio, valor: t.precio });
  return campos;
}

/** Id de la ancla del filtro de /trabajos para un servicio. */
export function idAncla(slugServicio: string): string {
  return `trabajos-${slugServicio}`;
}

/** Id de la lista de tarjetas (destino del chip «Todos»). */
export const ID_LISTA_TRABAJOS = "lista-trabajos";

export type Filtro = {
  /** Chips (sin «Todos»): un servicio por chip, en el orden en que aparece en los trabajos. */
  chips: { id: string; texto: string }[];
  /** slug de trabajo → id de ancla. Solo la PRIMERA tarjeta de cada servicio lleva id (ids únicos). */
  anclas: Map<string, string>;
};

/**
 * Filtro de /trabajos: solo con ≥ 2 servicios distintos y ≥ 4 trabajos (si no, `null`).
 * Estático y sin JS: cada chip es un enlace ancla a la primera tarjeta de su servicio. La etiqueta
 * sale del `titulo` del servicio cuyo slug es `trabajos[].servicio`.
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
