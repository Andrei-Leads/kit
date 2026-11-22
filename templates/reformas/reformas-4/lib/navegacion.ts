import { hayTrabajos, type SiteConfig } from "@andrei-leads/core";

/** Página del menú (la actual se marca con aria-current en el servidor). */
export type IdPagina = "inicio" | "trabajos" | "servicios" | "empresa" | "contacto";

export type PaginaMenu = { id: IdPagina; href: string; texto: string };

/** Una sección de la página: entrada del «Índice de la página». */
export type Seccion = { id: string; texto: string };
export type SeccionNumerada = Seccion & { n: string };

/** Orden del diseño: Inicio · Obras · Servicios · Empresa · Contacto. Sin trabajos ni galería, sin Obras. */
export function paginasMenu(config: Pick<SiteConfig, "trabajos" | "galeria">): PaginaMenu[] {
  const lista: PaginaMenu[] = [{ id: "inicio", href: "/", texto: "Inicio" }];
  if (hayTrabajos(config)) lista.push({ id: "trabajos", href: "/trabajos", texto: "Obras" });
  lista.push(
    { id: "servicios", href: "/servicios", texto: "Servicios" },
    { id: "empresa", href: "/empresa", texto: "Empresa" },
    { id: "contacto", href: "/contacto", texto: "Contacto" },
  );
  return lista;
}

/** Secciones presentes (los `false` se quitan) con su número: la numeración se recalcula. */
export function numerar(secciones: (Seccion | false | undefined | null | 0)[]): SeccionNumerada[] {
  return secciones
    .filter((s): s is Seccion => Boolean(s))
    .map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0") }));
}

/** Número de una sección del índice ("" si no está). */
export function numeroDe(secciones: readonly SeccionNumerada[], id: string): string {
  return secciones.find((s) => s.id === id)?.n ?? "";
}
