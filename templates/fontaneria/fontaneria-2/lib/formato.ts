import {
  formatearHorario,
  horarioVisible,
  mediaVisible,
  telefonoVisible,
  type SiteConfig,
} from "@andrei-leads/core";

/*
 * Textos propios de «Precio cerrado» calculados de los datos (la lógica común sale de core).
 * Solo para componentes de servidor: importa valores de core.
 */

type Contacto = SiteConfig["contacto"];

/** «Llamar · 600 00 20 02» o, con urgencias 24 h, «Llamar 24 h · …». */
export function textoLlamar(contacto: Pick<Contacto, "telefono" | "urgencias24h">): string {
  return `${contacto.urgencias24h ? "Llamar 24 h" : "Llamar"} · ${telefonoVisible(contacto.telefono)}`;
}

/** Texto corto (barra móvil y tarjetas de precio): «Llamar ahora» o «Llamar 24 h». */
export function textoLlamarCorto(contacto: Pick<Contacto, "urgencias24h">): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar ahora";
}

/** Línea de confianza bajo la pareja de botones del hero: «Lunes a viernes 8:00–19:00 · Sábado 9:00–13:00». */
export function lineaHorario(contacto: Pick<Contacto, "horario" | "urgencias24h">): string {
  const filas = formatearHorario(contacto.horario).map((f) => `${f.dias} ${f.horas}`);
  return [contacto.urgencias24h ? "Urgencias 24 h" : "", ...filas].filter(Boolean).join(" · ");
}

/** Línea bajo las parejas de cierre: la valoración («4,7 · 212 reseñas en Google») o, sin ella, el horario. */
export function lineaCierre(config: Pick<SiteConfig, "valoracion" | "contacto">): string {
  const v = config.valoracion;
  return v ? `${mediaVisible(v.media)} · ${textoResenas(v.total)}` : lineaHorario(config.contacto);
}

/** «212 reseñas en Google» (o «1 reseña en Google»). */
export function textoResenas(total: number): string {
  return `${total} ${total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** Filas del horario con la de urgencias (contacto y pie). */
export { horarioVisible };

/** «desde 79 €» → «Desde 79 €»; «unos 650 €» → «Unos 650 €» (el texto tal cual, con mayúscula). */
export function mayusculaInicial(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
