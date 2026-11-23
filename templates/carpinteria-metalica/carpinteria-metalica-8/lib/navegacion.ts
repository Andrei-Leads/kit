import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Menú (encargo §6): Obras (si existe la ruta) · Servicios · El taller · Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  const items: Ancla[] = [];
  if (hayTrabajos(config)) items.push({ href: "/trabajos", texto: "Obras" });
  items.push({ href: "/servicios", texto: "Servicios" }, { href: "/empresa", texto: "El taller" }, { href: "/contacto", texto: "Contacto" });
  return items;
}
