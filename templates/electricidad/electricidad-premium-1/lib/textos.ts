import { formatearHorario, mediaVisible, telefonoVisible, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Datos de una pareja de botones (WhatsApp + Llamar). */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/** Datos de una pareja con el mensaje de la página. */
export function datosCta(contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">, mensaje: string): DatosCta {
  return { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje };
}

/** «Llamar al 600 00 09 01». */
export function textoLlamar(telefono: string): string {
  return `Llamar al ${telefonoVisible(telefono)}`;
}

/**
 * Línea de confianza bajo cada pareja grande (encargo §3): la valoración
 * («4,9 · 61 reseñas en Google») o, sin ella, la primera fila del horario.
 * Nunca «Abierto ahora».
 */
export function lineaConfianza(config: Pick<SiteConfig, "valoracion" | "contacto">): string | undefined {
  if (config.valoracion) return `${mediaVisible(config.valoracion.media)} · ${config.valoracion.total} reseñas en Google`;
  return lineaHorario(config.contacto);
}

/** Horario en una línea: «Lunes a jueves, 8:00–14:00 y 15:30–18:30 · Viernes, 8:00–15:00». */
export function lineaHorario(contacto: Pick<SiteConfig["contacto"], "horario">): string | undefined {
  const filas = formatearHorario(contacto.horario);
  if (filas.length === 0) return undefined;
  return filas.map((f) => `${f.dias}, ${f.horas}`).join(" · ");
}

/** Ficha corta de un trabajo: «Ruzafa · 2026 · 92 m² · 3 semanas» (solo datos existentes). */
export function fichaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie" | "duracion">): string {
  return [t.ubicacion?.split(",")[0], t.anio, t.superficie, t.duracion].filter(Boolean).join(" · ");
}

/** Los trabajos más recientes primero (por `anio`; sin año, al final; empate: orden de los datos). */
export function recientes<T extends Pick<Trabajo, "anio">>(trabajos: readonly T[]): T[] {
  return trabajos
    .map((t, i) => ({ t, i }))
    .sort((a, b) => (b.t.anio ?? 0) - (a.t.anio ?? 0) || a.i - b.i)
    .map(({ t }) => t);
}

/** «01», «02»… */
export function numero(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/** Fecha corta de reseña: "2026-11-04" → «4 nov 2026»; "2026-08" → «ago 2026». */
export function fechaCorta(fecha: string): string {
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const [anio, mes, dia] = fecha.split("-");
  const m = MESES[Number(mes) - 1];
  if (!anio || !m) return fecha;
  return [dia ? String(Number(dia)) : null, m, anio].filter(Boolean).join(" ");
}
