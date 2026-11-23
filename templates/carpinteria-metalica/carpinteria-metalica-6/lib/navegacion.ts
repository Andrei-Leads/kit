import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Cabecera de escritorio: Fachadas (si hay), Servicios, Empresa, Contacto (encargo §6.1). */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Fachadas" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Empresa" },
    { href: "/contacto", texto: "Contacto" },
  ];
}

/** Menú móvil y pie: Inicio delante. */
export function menuCompleto(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [{ href: "/", texto: "Inicio" }, ...menu(config)];
}
