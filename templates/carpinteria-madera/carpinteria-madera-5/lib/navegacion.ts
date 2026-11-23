import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Cabecera de escritorio y pie: Restauraciones (si hay trabajos o galería), Servicios, Empresa, Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Restauraciones" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Empresa" },
    { href: "/contacto", texto: "Contacto" },
  ];
}

/** Menú móvil (hoja inferior): con «Inicio» delante. */
export function menuMovil(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [{ href: "/", texto: "Inicio" }, ...menu(config)];
}
