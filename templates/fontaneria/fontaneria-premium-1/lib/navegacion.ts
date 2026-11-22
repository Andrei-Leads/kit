import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Página actual, marcada sin JS con `body:has([data-pagina=…])` (globals.css). */
export type Pagina = "inicio" | "trabajos" | "servicios" | "empresa" | "contacto";

/** Enlaces de la cabecera en escritorio (encargo §5.2). Sin trabajos ni galería, sin «Trabajos». */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Trabajos" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Empresa" },
    { href: "/contacto", texto: "Contacto" },
  ];
}

/** Menú a pantalla completa y pie: Inicio + los de la cabecera. */
export function menuCompleto(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [{ href: "/", texto: "Inicio" }, ...menu(config)];
}
