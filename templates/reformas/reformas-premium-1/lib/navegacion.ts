import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Página actual, marcada sin JS con `body:has([data-pagina=…])` (globals.css). */
export type Pagina = "inicio" | "trabajos" | "servicios" | "empresa" | "contacto";

/** Cabecera (encargo §5.1): Obras, Servicios, Estudio, Contacto. Sin trabajos ni galería, sin «Obras». */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Obras" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Estudio" },
    { href: "/contacto", texto: "Contacto" },
  ];
}
