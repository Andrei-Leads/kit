import { formatearHorario, mediaVisible, type SiteConfig, type Trabajo } from "@andrei-leads/core";

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

/** «Lunes a viernes 8:00–14:00 · Lunes a jueves 16:30–19:30». */
export function horarioCorto(horario: SiteConfig["contacto"]["horario"]): string {
  return formatearHorario(horario)
    .map((l) => `${l.dias} ${l.horas}`)
    .join(" · ");
}

/** «4,9 · 74 reseñas en Google». */
export function textoValoracion(valoracion: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(valoracion.media)} · ${valoracion.total} reseñas en Google`;
}

/**
 * Línea de confianza bajo cada pareja (encargo §3): solo con datos. `tipo`
 * elige qué se prefiere: la valoración, el horario o la frase de WhatsApp.
 */
export function lineaConfianza(
  config: Pick<SiteConfig, "valoracion" | "contacto">,
  tipo: "valoracion" | "horario" | "whatsapp" = "valoracion",
): string | undefined {
  const horario = config.contacto.horario.length > 0 ? horarioCorto(config.contacto.horario) : undefined;
  if (tipo === "whatsapp" && config.contacto.whatsapp) return "Por WhatsApp puedes mandarnos fotos y medidas";
  if (tipo === "horario") return horario ?? (config.valoracion ? textoValoracion(config.valoracion) : undefined);
  return config.valoracion ? textoValoracion(config.valoracion) : horario;
}

/** «Cocinas a medida · Barrio de Santa Cruz, Sevilla · 2026» (etiqueta de obra). */
export function etiquetaObra(t: Pick<Trabajo, "ubicacion" | "anio">, servicio?: string): string {
  return [servicio, t.ubicacion, t.anio].filter(Boolean).join(" · ");
}

/** «12 m² · 7 semanas · entre 18.000 y 22.000 €» (lo que exista). */
export function fichaObra(t: Pick<Trabajo, "superficie" | "duracion" | "precio">): string {
  return [t.superficie, t.duracion, t.precio].filter(Boolean).join(" · ");
}

/** Dos cifras: 1 → «01». */
export function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

/** Los tres trabajos más recientes por `anio` (sin año, al final; empate: orden de los datos). */
export function masRecientes(trabajos: readonly Trabajo[], n = 3): Trabajo[] {
  return trabajos
    .map((t, i) => ({ t, i }))
    .sort((a, b) => (b.t.anio ?? 0) - (a.t.anio ?? 0) || a.i - b.i)
    .slice(0, n)
    .map(({ t }) => t);
}
