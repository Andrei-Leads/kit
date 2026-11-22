/*
 * Formato propio de «Banco de trabajo». Lo común (teléfono visible, media, horario, pasos…) viene de
 * core; aquí solo lo que pinta este diseño. Solo para componentes de servidor (importa core).
 */
import { formatearHorario, mediaVisible, pasosProceso, type Paso, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** 0 → "A", 1 → "B"… La letra de cada pieza (servicio) en el despiece y en la lista. */
export function letra(i: number): string {
  return i < 26 ? String.fromCharCode(65 + i) : String(i + 1);
}

/** 1 → "01". */
export function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

/** «Lám. 03». */
export function lam(n: number): string {
  return `Lám. ${dosCifras(n)}`;
}

/** Referencia de un trabajo: su número de orden en la lista, a 3 cifras («Ref. 004»). */
export function refTrabajo(indice: number): string {
  return `Ref. ${String(indice + 1).padStart(3, "0")}`;
}

/** «Ref. 004 · Triana · 2025 · 2,6 m² · 5 semanas»: lo que falte se omite con su separador. */
export function metaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie" | "duracion">, indice: number): string {
  return [refTrabajo(indice), t.ubicacion, t.anio, t.superficie, t.duracion].filter(Boolean).join(" · ");
}

/** «4,8 · 61 reseñas · Google». */
export function valoracionTexto(v: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(v.media)} · ${v.total.toLocaleString("es-ES")} ${v.total === 1 ? "reseña" : "reseñas"} · Google`;
}

/**
 * Línea de confianza bajo los botones (brief §7.6): el horario de formatearHorario y, con WhatsApp,
 * «Respondemos por WhatsApp en horario de taller».
 */
export function notaHorario(contacto: Pick<SiteConfig["contacto"], "horario" | "whatsapp">): string {
  const horario = formatearHorario(contacto.horario)
    .map((h) => `${h.dias} · ${h.horas}`)
    .join(" · ");
  return contacto.whatsapp ? `${horario} · Respondemos por WhatsApp en horario de taller` : horario;
}

/** "2026-10-09" → "09.10.2026"; "2026-05" → "05.2026". Sin Date. */
export function fechaNota(fecha?: string): string {
  if (!fecha) return "";
  const [anio, mes, dia] = fecha.split("-");
  return dia ? `${dia}.${mes}.${anio}` : `${mes}.${anio}`;
}

/** «★★★★☆». */
export function estrellas(puntuacion: number): string {
  const n = Math.max(0, Math.min(5, Math.round(puntuacion)));
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/** Las 6 más recientes (las que no tienen fecha, al final y en su orden). */
export function resenasRecientes(resenas: readonly Resena[], max = 6): Resena[] {
  return resenas
    .map((r, i) => ({ r, i }))
    .sort((a, b) => (b.r.fecha ?? "").localeCompare(a.r.fecha ?? "") || a.i - b.i)
    .slice(0, max)
    .map((x) => x.r);
}

/**
 * Pasos por defecto del diseño (sin `proceso` en los datos), los del tipo proyecto del brief:
 * visita → presupuesto → contrato con fecha → obra → limpieza → garantía.
 */
const PASOS_TALLER: readonly Paso[] = [
  { titulo: "Visitamos y medimos", texto: "Vamos a tu casa, vemos el hueco y tomamos medidas." },
  { titulo: "Presupuesto por escrito", texto: "Con la madera, el trabajo y lo que cuesta." },
  { titulo: "Contrato con fecha", texto: "Acordamos cuándo empezamos y cuándo terminamos." },
  { titulo: "Fabricamos y montamos", texto: "En nuestro taller, y luego en tu casa." },
  { titulo: "Limpiamos", texto: "Recogemos virutas y restos antes de irnos." },
  { titulo: "Garantía", texto: "Si algo se mueve, volvemos a ajustarlo." },
];

/** Como mucho 6 pasos (el contrato ya lo limita). */
export function pasosTaller(proceso: SiteConfig["proceso"]): readonly Paso[] {
  return pasosProceso(proceso, PASOS_TALLER).slice(0, 6);
}
