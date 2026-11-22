import { formatearHorario, mediaVisible, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Datos de una pareja de botones (WhatsApp + Llamar). */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/** Datos de una pareja con el mensaje de la página. */
export function datosCta(contacto: SiteConfig["contacto"], mensaje: string): DatosCta {
  return { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje };
}

/**
 * Nombre del negocio en la cabecera y el pie: la primera palabra grande y el
 * resto en etiqueta («Olmedo» / «INSTALACIONES»). Un nombre de una palabra sale entero.
 */
export function partirNombre(nombre: string): { principal: string; resto?: string } {
  const [principal, ...resto] = nombre.trim().split(/\s+/);
  return { principal, resto: resto.length > 0 ? resto.join(" ") : undefined };
}

/** Título con la última palabra destacada: «Baños completos» → ["Baños ", "completos"]. */
export function destacarUltima(texto: string): [string, string] {
  const t = texto.trim();
  const i = t.lastIndexOf(" ");
  return i < 0 ? ["", t] : [t.slice(0, i + 1), t.slice(i + 1)];
}

/**
 * Línea de confianza (encargo §3): la valoración («4,8 · 143 reseñas en
 * Google») o, sin ella, el horario. Nunca «Abierto ahora».
 */
export function lineaConfianza(config: Pick<SiteConfig, "valoracion" | "contacto">): string | undefined {
  if (config.valoracion) return `${mediaVisible(config.valoracion.media)} · ${config.valoracion.total} reseñas en Google`;
  return lineaHorario(config.contacto.horario);
}

/** «Lunes a viernes, 8:00–14:00 y 15:00–18:30 · Sábado, …». */
export function lineaHorario(horario: SiteConfig["contacto"]["horario"]): string | undefined {
  const lineas = formatearHorario(horario);
  if (lineas.length === 0) return undefined;
  return lineas.map((l) => `${l.dias}, ${l.horas}`).join(" · ");
}

/** Contexto de un trabajo, cada dato solo si existe. */
export function contextoTrabajo(t: Pick<Trabajo, "superficie" | "duracion" | "precio">): { dt: string; dd: string }[] {
  return [
    t.superficie && { dt: "Superficie", dd: t.superficie },
    t.duracion && { dt: "Duración", dd: t.duracion },
    t.precio && { dt: "Precio", dd: t.precio },
  ].filter((x): x is { dt: string; dd: string } => Boolean(x));
}

/** «Chamberí (Madrid) · 2026». */
export function lugarAnio(t: Pick<Trabajo, "ubicacion" | "anio">): string {
  return [t.ubicacion, t.anio].filter(Boolean).join(" · ");
}

/** «01», «02»… */
export function numero(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/**
 * Parte una cita para destacar sus últimas palabras (sin el punto final):
 * «… y no hubo ni un extra.» → ["… y no hubo ", "ni un extra", "."].
 */
export function destacarFinal(texto: string, palabras = 3): [string, string, string] {
  const t = texto.trim();
  const m = /[.!?…]+$/.exec(t);
  const cierre = m ? m[0] : "";
  const cuerpo = cierre ? t.slice(0, -cierre.length) : t;
  const partes = cuerpo.split(" ");
  if (partes.length <= palabras) return ["", cuerpo, cierre];
  return [partes.slice(0, -palabras).join(" ") + " ", partes.slice(-palabras).join(" "), cierre];
}
