import type { Servicio, Trabajo } from "@andrei-leads/core";

/** Una obra con su posición en `trabajos` (para «PIEZA 07»). */
export type Obra = { trabajo: Trabajo; indice: number };

export type Grupo = {
  /** Ancla: el slug del servicio («rejas-ventana») u «otros-trabajos». */
  id: string;
  titulo: string;
  obras: Obra[];
};

/**
 * Galería por tipo (encargo §5): los trabajos se agrupan por `trabajos[].servicio`, en el orden
 * de `servicios`; un servicio sin trabajos no crea grupo. Los que no tienen servicio (o uno que no
 * existe) van al final, en «Otros trabajos».
 */
export function agruparObras(trabajos: readonly Trabajo[], servicios: readonly Pick<Servicio, "slug" | "titulo">[]): Grupo[] {
  const obras = trabajos.map((trabajo, indice) => ({ trabajo, indice }));
  const grupos: Grupo[] = [];
  for (const s of servicios) {
    const delServicio = obras.filter((o) => o.trabajo.servicio === s.slug);
    if (delServicio.length > 0) grupos.push({ id: s.slug, titulo: s.titulo, obras: delServicio });
  }
  const otros = obras.filter((o) => !o.trabajo.servicio || !servicios.some((s) => s.slug === o.trabajo.servicio));
  if (otros.length > 0) grupos.push({ id: "otros-trabajos", titulo: "Otros trabajos", obras: otros });
  return grupos;
}

/** «2 obras» / «1 obra». */
export function obrasTexto(n: number): string {
  return `${n} ${n === 1 ? "obra" : "obras"}`;
}

/** «Con su pueblo y su año» solo si todas las obras traen `ubicacion` y `anio` (campos opcionales). */
export function conPuebloYAnio(trabajos: readonly Trabajo[]): boolean {
  return trabajos.length > 0 && trabajos.every((t) => t.ubicacion && t.anio);
}
