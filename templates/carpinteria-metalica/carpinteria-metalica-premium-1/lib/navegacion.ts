import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Menú «persiana» y pie (encargo §6): Inicio, Trabajos (solo con datos), Servicios, Empresa, Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    { href: "/", texto: "Inicio" },
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Trabajos" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Empresa" },
    { href: "/contacto", texto: "Contacto" },
  ];
}
