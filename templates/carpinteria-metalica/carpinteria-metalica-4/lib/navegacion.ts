import { hayTrabajos, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { dosCifras } from "@/lib/textos";

/** Página actual, para marcarla en el índice sin JavaScript (cada página pinta su `Marco`). */
export type IdPagina = "trabajos" | "servicios" | "empresa" | "contacto";

/** Una entrada del índice: «01 Trabajos». `n` es su número de lámina. */
export type Enlace = Ancla & { id: IdPagina; n: string };

/**
 * Índice (encargo §6): Trabajos (solo si existe la ruta) · Servicios · Empresa · Contacto, numerados
 * 01, 02… Sin trabajos ni galería, «Trabajos» desaparece y la numeración se recalcula.
 */
export function indice(config: Pick<SiteConfig, "trabajos" | "galeria">): Enlace[] {
  const items: Omit<Enlace, "n">[] = [];
  if (hayTrabajos(config)) items.push({ id: "trabajos", href: "/trabajos", texto: "Trabajos" });
  items.push(
    { id: "servicios", href: "/servicios", texto: "Servicios" },
    { id: "empresa", href: "/empresa", texto: "Empresa" },
    { id: "contacto", href: "/contacto", texto: "Contacto" },
  );
  return items.map((e, i) => ({ ...e, n: dosCifras(i + 1) }));
}

/** Número de lámina de una página del índice («02» para Servicios con trabajos). El inicio es la «00». */
export function lamina(config: Pick<SiteConfig, "trabajos" | "galeria">, id: IdPagina): string {
  return indice(config).find((e) => e.id === id)?.n ?? "00";
}
