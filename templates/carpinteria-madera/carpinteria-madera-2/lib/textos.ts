import { formatearHorario, mediaVisible, type SiteConfig, type Trabajo } from "@andrei-leads/core";

export type Cifra = { previo?: string; numero: string; texto: string };

const plural = (n: number, uno: string, varios: string) => (n === 1 ? uno : varios);

/**
 * Cifras de credibilidad (encargo §6.2): cada una solo con su dato y nunca inventada. «Desde 2009»,
 * «4,8 · 143 reseñas en Google», «8 municipios donde montamos», «4 trabajos publicados».
 */
export function cifras(config: Pick<SiteConfig, "negocio" | "valoracion" | "zonas" | "trabajos">): Cifra[] {
  const lista: Cifra[] = [];
  const { negocio, valoracion, zonas, trabajos } = config;
  if (negocio.anioFundacion) lista.push({ previo: "Desde", numero: String(negocio.anioFundacion), texto: "midiendo y montando en la zona" });
  if (valoracion) {
    const total = valoracion.total.toLocaleString("es-ES");
    lista.push({ numero: mediaVisible(valoracion.media), texto: `${total} ${plural(valoracion.total, "reseña", "reseñas")} en Google` });
  }
  if (zonas.length > 0) lista.push({ numero: String(zonas.length), texto: plural(zonas.length, "municipio donde montamos", "municipios donde montamos") });
  if (trabajos.length > 0) lista.push({ numero: String(trabajos.length), texto: plural(trabajos.length, "trabajo publicado", "trabajos publicados") });
  return lista;
}

/** «4,8 · 143 reseñas en Google». */
export function lineaValoracion(valoracion: NonNullable<SiteConfig["valoracion"]>): string {
  const total = valoracion.total.toLocaleString("es-ES");
  return `${mediaVisible(valoracion.media)} · ${total} ${plural(valoracion.total, "reseña", "reseñas")} en Google`;
}

/** «Lunes a jueves 8:00–18:00 · Viernes 8:00–15:00» (CTA final). */
export function lineaHorario(contacto: Pick<SiteConfig["contacto"], "horario">): string {
  return formatearHorario(contacto.horario)
    .map((l) => `${l.dias} ${l.horas}`)
    .join(" · ");
}

/** «Las Tablas, Madrid · 2,4 m lineales · 3 semanas»: solo los datos que hay. */
export function metaTrabajo(t: Pick<Trabajo, "ubicacion" | "superficie" | "duracion">): string {
  return [t.ubicacion, t.superficie, t.duracion].filter(Boolean).join(" · ");
}
