import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Menú de urgencias (brief §6): Inicio · Servicios · Contacto · Trabajos (solo si existe la ruta) · Empresa. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  const items: Ancla[] = [
    { href: "/", texto: "Inicio" },
    { href: "/servicios", texto: "Servicios" },
    { href: "/contacto", texto: "Contacto" },
  ];
  if (hayTrabajos(config)) items.push({ href: "/trabajos", texto: "Trabajos" });
  items.push({ href: "/empresa", texto: "Empresa" });
  return items;
}
