/*
 * Textos de interfaz que dependen de los datos (no son datos del negocio): el verbo de llamada y las
 * «líneas de confianza» que acompañan a cada pareja de botones. Solo repiten datos (horario y
 * valoración): ninguna promesa escrita a mano.
 */
import { horarioVisible, mediaVisible, type SiteConfig } from "@andrei-leads/core";

type Contacto = SiteConfig["contacto"];

/** «Llamar 24 h» con urgencias; si no, «Llamar ahora». */
export function textoLlamar(contacto: Pick<Contacto, "urgencias24h">): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar ahora";
}

/** «Lunes a viernes 8:00–14:00 y 16:00–20:00 · Sábado 9:00–14:00 · Urgencias 24 h» (horarioVisible de core). */
export function lineaHorario(contacto: Pick<Contacto, "horario" | "urgencias24h">): string {
  return horarioVisible(contacto)
    .map((l) => `${l.dias} ${l.horas}`)
    .join(" · ");
}

/** «4,8 · 127 reseñas en Google»; sin valoración, el horario. */
export function lineaValoracion(config: Pick<SiteConfig, "valoracion" | "contacto">): string {
  const v = config.valoracion;
  return v ? `${mediaVisible(v.media)} · ${v.total} reseñas en Google` : lineaHorario(config.contacto);
}
