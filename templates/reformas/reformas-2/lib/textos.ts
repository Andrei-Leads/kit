import { horarioVisible, mediaVisible, type SiteConfig } from "@andrei-leads/core";

/** Línea de confianza con el horario: «Lunes a jueves, 8:30–18:30 · Viernes, 8:30–15:00». */
export function lineaHorario(contacto: Pick<SiteConfig["contacto"], "horario" | "urgencias24h">): string {
  return horarioVisible(contacto)
    .map((l) => `${l.dias}, ${l.horas}`)
    .join(" · ");
}

export type Cifra = { n: string; l: string };

/** Cifras de credibilidad: cada una solo con su dato (nunca «+500 obras»). */
export function cifras(config: Pick<SiteConfig, "negocio" | "valoracion" | "zonas">): Cifra[] {
  const lista: Cifra[] = [];
  if (config.negocio.anioFundacion) lista.push({ n: String(config.negocio.anioFundacion), l: "año de fundación" });
  if (config.valoracion) {
    lista.push({ n: mediaVisible(config.valoracion.media), l: "de 5 en Google" });
    lista.push({ n: config.valoracion.total.toLocaleString("es-ES"), l: config.valoracion.total === 1 ? "reseña" : "reseñas" });
  }
  if (config.zonas.length > 0) lista.push({ n: String(config.zonas.length), l: config.zonas.length === 1 ? "municipio" : "municipios" });
  return lista;
}

/** «4,9 de 5 · 212 reseñas en Google». */
export function lineaValoracion(valoracion: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(valoracion.media)} de 5 · ${valoracion.total.toLocaleString("es-ES")} reseñas en Google`;
}
