import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/**
 * Rutas del menú en el orden de urgencias (brief §6): Inicio › Servicios › Contacto › Trabajos › Empresa.
 * Sin trabajos ni galería, «Trabajos» desaparece (la ruta da 404).
 */
export function rutas(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    { href: "/", texto: "Inicio" },
    { href: "/servicios", texto: "Servicios" },
    { href: "/contacto", texto: "Contacto" },
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Trabajos" }] : []),
    { href: "/empresa", texto: "Empresa" },
  ];
}

/** "01", "02"… para el número de orden de las filas del índice. */
export function numeroOrden(i: number): string {
  return String(i + 1).padStart(2, "0");
}
