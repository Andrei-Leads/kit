import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

/** Página del menú (la actual se marca con aria-current en el servidor). */
export type IdPagina = "inicio" | "servicios" | "contacto" | "trabajos" | "empresa";

export type PaginaMenu = Ancla & { id: IdPagina };

/** Orden de urgencias (brief §6): Inicio › Servicios › Contacto › Trabajos › Empresa. Sin trabajos ni galería, sin Trabajos. */
export function paginasMenu(config: Pick<SiteConfig, "trabajos" | "galeria">): PaginaMenu[] {
  const lista: PaginaMenu[] = [
    { id: "inicio", href: "/", texto: "Inicio" },
    { id: "servicios", href: "/servicios", texto: "Servicios" },
    { id: "contacto", href: "/contacto", texto: "Contacto" },
  ];
  if (hayTrabajos(config)) lista.push({ id: "trabajos", href: "/trabajos", texto: "Trabajos" });
  lista.push({ id: "empresa", href: "/empresa", texto: "Empresa" });
  return lista;
}
