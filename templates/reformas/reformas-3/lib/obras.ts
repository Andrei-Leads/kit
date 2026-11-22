import { hayTrabajos, type Ancla, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** 0 → "01". La numeración de obra es la posición en `trabajos` (la primera es la 01): nada inventado. */
export function numeroObra(indice: number): string {
  return String(indice + 1).padStart(2, "0");
}

/** "1 obra", "6 obras". */
export function obrasTexto(n: number): string {
  return n === 1 ? "1 obra" : `${n} obras`;
}

/** Segunda línea de la etiqueta: «Sant Antoni · 2025 · 10 m²» (omite lo que falte). */
export function metaObra(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie">): string {
  return [t.ubicacion, t.anio, t.superficie].filter(Boolean).join(" · ");
}

/** Banda del collage: «01 · Eixample · 2025». */
export function bandaObra(t: Pick<Trabajo, "ubicacion" | "anio">, indice: number): string {
  return [numeroObra(indice), t.ubicacion, t.anio].filter(Boolean).join(" · ");
}

/** Recuento de obras por slug de servicio. */
export function obrasPorServicio(trabajos: readonly Trabajo[]): Map<string, number> {
  const mapa = new Map<string, number>();
  for (const t of trabajos) if (t.servicio) mapa.set(t.servicio, (mapa.get(t.servicio) ?? 0) + 1);
  return mapa;
}

/** Menú y pie en el orden del diseño: Inicio · Obras · Servicios · Empresa · Contacto. */
export function navegacion(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    { href: "/", texto: "Inicio" },
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Obras" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Empresa" },
    { href: "/contacto", texto: "Contacto" },
  ];
}
