import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Página actual, para marcarla en la cápsula sin JavaScript (cada página pinta su cápsula). */
export type IdPagina = "trabajos" | "servicios" | "empresa" | "contacto";

export type Enlace = Ancla & { id: IdPagina };

/** Menú (orden del diseño, tipo proyecto): Trabajos (si existe la ruta) · Servicios · Empresa · Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Enlace[] {
  const items: Enlace[] = [];
  if (hayTrabajos(config)) items.push({ id: "trabajos", href: "/trabajos", texto: "Trabajos" });
  items.push(
    { id: "servicios", href: "/servicios", texto: "Servicios" },
    { id: "empresa", href: "/empresa", texto: "Empresa" },
    { id: "contacto", href: "/contacto", texto: "Contacto" },
  );
  return items;
}
