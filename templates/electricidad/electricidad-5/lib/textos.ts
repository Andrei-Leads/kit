import { horarioVisible, mediaVisible, type Resena, type SiteConfig } from "@andrei-leads/core";

import { mensajeInicio } from "@/lib/mensajes";

/** «Llamar 24 h» con urgencias; si no, «Llamar». */
export function textoLlamada(urgencias24h: boolean): string {
  return urgencias24h ? "Llamar 24 h" : "Llamar";
}

/** Texto del WhatsApp secundario (encargo §3). */
export const TEXTO_WHATSAPP = "Pídenos precio por WhatsApp";

/** Lo que necesita una pareja Llamar + WhatsApp. */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  textoLlamada: string;
};

/** Datos de la pareja: el mensaje general si no se pasa otro. */
export function datosCta(config: Pick<SiteConfig, "contacto">, mensaje: string = mensajeInicio(config.contacto)): DatosCta {
  const { contacto } = config;
  return {
    telefono: contacto.telefono,
    whatsapp: contacto.whatsapp,
    mensaje,
    textoLlamada: textoLlamada(contacto.urgencias24h),
  };
}

/** Horario del CTA final y de contacto, con la fila de urgencias si hay. */
export function lineasHorario(contacto: Pick<SiteConfig["contacto"], "horario" | "urgencias24h">) {
  return horarioVisible(contacto, "las 24 horas");
}

/** «45 min» → { numero: "45", unidad: "min" }. Si no empieza por un número, sin unidad. */
export function partirCifra(texto: string): { numero: string; unidad?: string } {
  const m = /^(\d+(?:[.,]\d+)?)\s*(.*)$/.exec(texto.trim());
  if (!m) return { numero: texto.trim() };
  return { numero: m[1], unidad: m[2] || undefined };
}

/**
 * Nombre corto de una acreditación: unas siglas al final entre paréntesis
 * («RII», «REBT», «ITC-BT») y el resto («Empresa instaladora en baja tensión»).
 * Solo siglas: «(Comunidad Valenciana)» u otro texto entre paréntesis no es un
 * corto, y entonces se pinta el nombre completo.
 */
export function partirAcreditacion(nombre: string): { corto?: string; largo: string } {
  const limpio = nombre.trim();
  const m = /^(.+?)\s*\(([A-ZÁÉÍÓÚÑ0-9.\-\/]{2,6})\)$/.exec(limpio);
  return m ? { corto: m[2], largo: m[1] } : { largo: limpio };
}

/** Valoración en texto completo para el lector de pantalla. */
export function valoracionCompleta(v: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(v.media)} de 5, ${v.total} ${v.total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** Más recientes primero; las que no tienen fecha, al final (orden estable). */
export function resenasRecientes(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
}

/** «1 trabajo», «3 trabajos». */
export function trabajosTexto(n: number): string {
  return `${n} ${n === 1 ? "trabajo" : "trabajos"}`;
}
