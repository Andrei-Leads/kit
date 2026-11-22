import { formatearHorario, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Datos de una pareja de botones (WhatsApp + Llamar). */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/** Ficha corta de un trabajo: «El Carme, Valencia · 2026 · 3 semanas». Lo que falta, se omite. */
export function fichaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie" | "duracion">): string {
  return [t.ubicacion, t.anio, t.superficie, t.duracion].filter(Boolean).join(" · ");
}

/** El par del hero: el primer trabajo con `antes` (encargo §5). */
export function trabajoDelHero(trabajos: readonly Trabajo[]): Trabajo | undefined {
  return trabajos.find((t) => t.antes);
}

/** Las reseñas más recientes primero (sin fecha, al final), como mucho `max`. */
export function resenasRecientes(resenas: readonly Resena[], max: number): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, max);
}

/** «Lunes a jueves, 9:00–14:00 y 16:30–19:30 · Viernes, 9:00–14:00» (línea de confianza bajo el CTA). */
export function lineaHorario(horario: SiteConfig["contacto"]["horario"]): string {
  return formatearHorario(horario)
    .map((h) => `${h.dias}, ${h.horas}`)
    .join(" · ");
}

/** «74 reseñas» / «1 reseña». */
export function totalResenas(total: number): string {
  return `${total} ${total === 1 ? "reseña" : "reseñas"}`;
}
