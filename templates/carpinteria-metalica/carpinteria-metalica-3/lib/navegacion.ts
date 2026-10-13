import type { SiteConfig } from "@andrei-leads/core";
import type { Ancla } from "./formato";

/** /trabajos existe si hay trabajos o, al menos, fotos en la galería. */
export function hayTrabajos(config: Pick<SiteConfig, "trabajos" | "galeria">): boolean {
  return config.trabajos.length > 0 || config.galeria.length > 0;
}

/** Menú de cabecera y pie: «Averías» primero; «Trabajos» solo si existe la ruta. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  const items: Ancla[] = [
    { href: "/servicios", texto: "Averías" },
    { href: "/contacto", texto: "Contacto" },
  ];
  if (hayTrabajos(config)) items.push({ href: "/trabajos", texto: "Trabajos" });
  items.push({ href: "/empresa", texto: "Empresa" });
  return items;
}
