import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/**
 * Menú a pantalla completa (encargo §6.1): «01 Obras · 02 Soluciones · 03 El taller ·
 * 04 Contacto». Sin trabajos ni galería, «Obras» sale y la numeración se recalcula.
 */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Obras" }] : []),
    { href: "/servicios", texto: "Soluciones" },
    { href: "/empresa", texto: "El taller" },
    { href: "/contacto", texto: "Contacto" },
  ];
}

/** Pie: «Inicio» y el menú. */
export function menuPie(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [{ href: "/", texto: "Inicio" }, ...menu(config)];
}
