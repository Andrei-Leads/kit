import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Página actual, marcada sin JS con `body:has([data-pagina=…])` (globals.css). */
export type Pagina = "inicio" | "trabajos" | "servicios" | "empresa" | "contacto";

/** Cabecera, menú móvil y pie: Inicio, Trabajos (si hay), Servicios, Empresa, Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    { href: "/", texto: "Inicio" },
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Trabajos" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Empresa" },
    { href: "/contacto", texto: "Contacto" },
  ];
}
