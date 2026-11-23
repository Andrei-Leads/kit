import { hayTrabajos, type SiteConfig } from "@andrei-leads/core";

/** Un enlace del menú; `id` casa con `data-pagina` de cada página para marcar la actual (globals.css). */
export type EnlaceMenu = { href: string; texto: string; id: string };

/** Orden de proyecto (encargo §5): Trabajos (si hay trabajos o galería) · Servicios · Taller · Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): EnlaceMenu[] {
  return [
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Trabajos", id: "trabajos" }] : []),
    { href: "/servicios", texto: "Servicios", id: "servicios" },
    { href: "/empresa", texto: "Taller", id: "empresa" },
    { href: "/contacto", texto: "Contacto", id: "contacto" },
  ];
}

/** Menú móvil y pie: con «Inicio» delante. */
export function menuCompleto(config: Pick<SiteConfig, "trabajos" | "galeria">): EnlaceMenu[] {
  return [{ href: "/", texto: "Inicio", id: "inicio" }, ...menu(config)];
}
