import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Página actual, marcada sin JS con `body:has([data-pagina=…])` (globals.css). */
export type Pagina = "inicio" | "trabajos" | "servicios" | "empresa" | "contacto";

/** Menú a pantalla completa y pie: Inicio, Proyectos (si hay), Servicios, Empresa, Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    { href: "/", texto: "Inicio" },
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Proyectos" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Empresa" },
    { href: "/contacto", texto: "Contacto" },
  ];
}
