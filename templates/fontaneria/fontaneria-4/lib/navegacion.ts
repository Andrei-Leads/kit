import { hayTrabajos, type SiteConfig } from "@andrei-leads/core";

import { lineaConfianza } from "@/lib/formato";

/** Página del menú (la actual se marca con aria-current en el servidor). */
export type IdPagina = "inicio" | "servicios" | "contacto" | "trabajos" | "empresa";

export type PaginaMenu = { id: IdPagina; href: string; texto: string };

/** Un «campo del parte»: ancla a una sección de la página actual. */
export type Campo = { id: string; texto: string };

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

/** Campos presentes (los `false` se quitan) con su número de orden. */
export function numerar(campos: (Campo | false | undefined | null | 0)[]): (Campo & { n: string })[] {
  return campos
    .filter((c): c is Campo => Boolean(c))
    .map((c, i) => ({ ...c, n: String(i + 1).padStart(2, "0") }));
}

/** Lo que necesita `<Marco>`: cada página lo calcula de su config y lo pasa como props. */
export type DatosMarco = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "logo">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h" | "mensajeWhatsapp">;
  paginas: PaginaMenu[];
  confianza: string;
};

export function datosMarco(config: Pick<SiteConfig, "negocio" | "contacto" | "trabajos" | "galeria" | "valoracion">): DatosMarco {
  return {
    negocio: config.negocio,
    contacto: config.contacto,
    paginas: paginasMenu(config),
    confianza: lineaConfianza(config),
  };
}
