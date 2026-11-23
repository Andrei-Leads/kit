import { horarioVisible, mediaVisible, MESES, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Número de pieza: la posición en la lista, con dos cifras («07»). */
export function numero(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/** Etiqueta de taller: «PIEZA 07 · ALFAFAR · 2025». Cada dato que falta desaparece con su separador. */
export function etiquetaPieza(trabajo: Pick<Trabajo, "ubicacion" | "anio">, i: number): string {
  return [`Pieza ${numero(i)}`, trabajo.ubicacion, trabajo.anio].filter(Boolean).join(" · ");
}

/** Fecha de reseña en el formato del diseño: «2026-08-21» → «21 ago 2026»; «2026-10» → «oct 2026». */
export function fechaCorta(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-");
  const nombre = MESES[Number(mes) - 1];
  if (!anio || !nombre) return fecha;
  return `${dia ? `${Number(dia)} ` : ""}${nombre.slice(0, 3)} ${anio}`;
}

/** «4,9 · 58 reseñas». */
export function valoracionCorta(valoracion: NonNullable<SiteConfig["valoracion"]>): string {
  const total = valoracion.total;
  return `${mediaVisible(valoracion.media)} · ${total.toLocaleString("es-ES")} ${total === 1 ? "reseña" : "reseñas"}`;
}

/** Línea de confianza con el horario: «Lunes a jueves, 7:30–13:30 y 15:30–18:30 · Viernes, 7:30–13:30». */
export function lineaHorario(contacto: Pick<SiteConfig["contacto"], "horario" | "urgencias24h">): string {
  return horarioVisible(contacto)
    .map((l) => `${l.dias}, ${l.horas}`)
    .join(" · ");
}
