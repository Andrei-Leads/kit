import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Página actual, para marcarla en la cápsula sin JavaScript (cada página pinta su cápsula). */
export type IdPagina = "trabajos" | "servicios" | "empresa" | "contacto";

export type Enlace = Ancla & { id: IdPagina };

/** Menú (encargo §6): Obras (si existe la ruta) · Servicios · El taller · Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Enlace[] {
  const items: Enlace[] = [];
  if (hayTrabajos(config)) items.push({ id: "trabajos", href: "/trabajos", texto: config.trabajos.length > 0 ? "Obras" : "Galería" });
  items.push(
    { id: "servicios", href: "/servicios", texto: "Servicios" },
    { id: "empresa", href: "/empresa", texto: "El taller" },
    { id: "contacto", href: "/contacto", texto: "Contacto" },
  );
  return items;
}
