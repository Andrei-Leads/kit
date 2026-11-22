import { etiquetaOrigen, formatearHorario, mediaVisible, telefonoVisible, type Imagen, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { RESPUESTA } from "@/lib/mensajes";

/** «01», «02»… */
export function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

/** «Llamar al 600 00 04 51». */
export function textoLlamar(telefono: string): string {
  return `Llamar al ${telefonoVisible(telefono)}`;
}

/** Línea de confianza del hero: «4,9 · 58 reseñas en Google» (enlazada a la ficha) o la de respuesta. */
export function confianzaValoracion(config: Pick<SiteConfig, "valoracion" | "contacto">): Confianza {
  const v = config.valoracion;
  if (!v) return { texto: RESPUESTA };
  return { texto: `${mediaVisible(v.media)} · ${v.total} reseñas en Google`, href: config.contacto.fichaGoogle };
}

/** Horario en una línea: «Lunes a jueves, 8:00–14:00 y 15:00–18:00 · Viernes, 8:00–14:00». */
export function horarioLinea(horario: SiteConfig["contacto"]["horario"]): string {
  return formatearHorario(horario)
    .map((l) => `${l.dias}, ${l.horas}`)
    .join(" · ");
}

/** Confianza con el horario (CTA final, contacto y menú); sin horario, la de respuesta. */
export function confianzaHorario(horario: SiteConfig["contacto"]["horario"]): Confianza {
  const linea = horarioLinea(horario);
  return { texto: linea || RESPUESTA };
}

export type Confianza = { texto: string; href?: string };

/** «Eixample, Barcelona · 2025». */
export function lugarAnio(t: Pick<Trabajo, "ubicacion" | "anio">): string {
  return [t.ubicacion, t.anio].filter(Boolean).join(" · ");
}

/** «9 m² · 2 días · entre 6.000 y 7.500 €». */
export function fichaCorta(t: Pick<Trabajo, "superficie" | "duracion" | "precio">): string {
  return [t.superficie, t.duracion, t.precio].filter(Boolean).join(" · ");
}

/** Trabajos del más reciente al más antiguo (sin año, al final; si empatan, el orden de los datos). */
export function porAnio<T extends Pick<Trabajo, "anio">>(lista: readonly T[]): T[] {
  return [...lista].sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0));
}

/**
 * Pie común de origen bajo un collage: «Imágenes generadas con IA» si todas son de IA;
 * si no, las etiquetas distintas de core («Foto de tu ficha de Google»…). Sin etiqueta, nada.
 */
export function pieOrigen(imagenes: readonly (Imagen | undefined)[]): string | undefined {
  const etiquetas = imagenes.flatMap((i) => (i ? [etiquetaOrigen(i)] : [])).filter((e): e is string => Boolean(e));
  if (etiquetas.length === 0) return undefined;
  const unicas = [...new Set(etiquetas)];
  if (unicas.length === 1 && etiquetas.length > 1 && unicas[0] === "Imagen generada con IA") return "Imágenes generadas con IA";
  return unicas.join(" · ");
}
