import { formatearHorario, hayTrabajos, type Ancla, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/**
 * Número de pieza: la posición en la lista `trabajos`, con dos cifras (encargo §5). Es el mismo en la
 * home, en /trabajos, en la ficha y en el mensaje de WhatsApp. Nada inventado.
 */
export function numeroPieza(indice: number): string {
  return String(indice + 1).padStart(2, "0");
}

/** «N.º 07». */
export function rotuloPieza(indice: number): string {
  return `N.º ${numeroPieza(indice)}`;
}

/** "1 pieza", "7 piezas". */
export function piezasTexto(n: number): string {
  return n === 1 ? "1 pieza" : `${n} piezas`;
}

/** "1 servicio", "6 servicios". */
export function serviciosTexto(n: number): string {
  return n === 1 ? "1 servicio" : `${n} servicios`;
}

/** «Gràcia, Barcelona» → «Gràcia» (los pies y las fichas llevan solo el barrio). */
export function ubicacionCorta(ubicacion?: string): string | undefined {
  return ubicacion?.split(",")[0].trim() || undefined;
}

/** Línea de ficha de la tarjeta: «Gràcia · 2026 · 9 m²» (omite lo que falte). */
export function fichaPieza(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie">): string {
  return [ubicacionCorta(t.ubicacion), t.anio, t.superficie].filter(Boolean).join(" · ");
}

/** Pie del collage: «N.º 01 — Cocina de fresno · Gràcia · 2026». */
export function pieCollage(t: Pick<Trabajo, "titulo" | "ubicacion" | "anio">, indice: number): string {
  return [`${rotuloPieza(indice)} — ${t.titulo}`, ubicacionCorta(t.ubicacion), t.anio].filter(Boolean).join(" · ");
}

export type PiezaNumerada = { trabajo: Trabajo; indice: number };

/** Trabajos con su número de pieza, en el orden de la lista. */
export function numerar(trabajos: readonly Trabajo[]): PiezaNumerada[] {
  return trabajos.map((trabajo, indice) => ({ trabajo, indice }));
}

/** Los más recientes primero (por `anio`; sin año, al final). Orden estable: a igual año, el de la lista. */
export function recientes(trabajos: readonly Trabajo[]): PiezaNumerada[] {
  return numerar(trabajos).sort((a, b) => (b.trabajo.anio ?? 0) - (a.trabajo.anio ?? 0));
}

/** Menú y pie en el orden de proyecto (encargo §7): Piezas · Servicios · Obrador · Contacto. */
export function navegacion(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  return [
    ...(hayTrabajos(config) ? [{ href: "/trabajos", texto: "Piezas" }] : []),
    { href: "/servicios", texto: "Servicios" },
    { href: "/empresa", texto: "Obrador" },
    { href: "/contacto", texto: "Contacto" },
  ];
}

/** Horario en una línea: «Lunes a viernes · 8:30–17:30 / Sábados · 9:00–13:00». */
export function horarioLinea(horario: SiteConfig["contacto"]["horario"]): string {
  return formatearHorario(horario)
    .map((l) => `${l.dias} · ${l.horas}`)
    .join(" / ");
}
