import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/**
 * Rutas del menú en el orden de urgencias: Inicio › Servicios › Contacto ›
 * Trabajos › Empresa. Sin trabajos ni galería, no hay «Trabajos».
 */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    { href: "/", texto: "Inicio" },
    { href: "/servicios", texto: "Servicios" },
    { href: "/contacto", texto: "Contacto" },
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Trabajos" }] : []),
    { href: "/empresa", texto: "Empresa" },
  ];
}
