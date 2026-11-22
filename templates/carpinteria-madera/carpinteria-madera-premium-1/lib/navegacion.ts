import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Cabecera de escritorio (encargo §5.2): Obras · Servicios · El taller · Contacto. Sin trabajos ni galería, sin «Obras». */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Obras" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "El taller" },
    { href: "/contacto", texto: "Contacto" },
  ];
}

/** Menú móvil y pie: Inicio + los de la cabecera. */
export function menuCompleto(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [{ href: "/", texto: "Inicio" }, ...menu(config)];
}
