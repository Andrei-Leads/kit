import { mediaVisible, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "urgencias24h">;

/** «Llamar» o «Llamar 24 h». */
export function llamarCorto(contacto: Pick<SiteConfig["contacto"], "urgencias24h">): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar";
}

/** «Llamar · 600 00 04 07» (o «Llamar 24 h · …»). */
export function llamarConNumero(contacto: Contacto): string {
  return `${llamarCorto(contacto)} · ${telefonoVisible(contacto.telefono)}`;
}

/** «4,9 · 138 reseñas en Google» (sin la estrella, que va aparte y oculta al lector). */
export function valoracionLinea(valoracion: SiteConfig["valoracion"]): string | undefined {
  if (!valoracion) return undefined;
  return `${mediaVisible(valoracion.media)} · ${valoracion.total} reseñas en Google`;
}

/**
 * Burbujas-ficha de confianza: acreditaciones con número, «Desde {año}», garantías y, si se pide,
 * la valoración. Sin nada, lista vacía (la sección se oculta).
 */
export function fichasConfianza(
  config: Pick<SiteConfig, "negocio" | "acreditaciones" | "garantias" | "valoracion">,
  conValoracion: boolean,
): string[] {
  const fichas = [
    ...config.acreditaciones.map((a) => (a.numero ? `${a.nombre} · n.º ${a.numero}` : a.nombre)),
    ...(config.negocio.anioFundacion ? [`Desde ${config.negocio.anioFundacion}`] : []),
    ...config.garantias,
  ];
  if (conValoracion && config.valoracion) {
    fichas.push(`${mediaVisible(config.valoracion.media)} ★ en Google · ${config.valoracion.total} reseñas`);
  }
  return fichas;
}
