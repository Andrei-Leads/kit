import { formatearHorario, mediaVisible, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

type Contacto = SiteConfig["contacto"];

/** «Llamar 24 h» con urgencias; si no, «Llamar ahora». */
export function textoLlamarCorto(contacto: Pick<Contacto, "urgencias24h">): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar ahora";
}

/** «Llamar 24 h · 600 005 005» (o «Llamar · 600 005 005»). */
export function textoLlamar(contacto: Pick<Contacto, "urgencias24h" | "telefono">): string {
  return `${contacto.urgencias24h ? "Llamar 24 h" : "Llamar"} · ${telefonoVisible(contacto.telefono)}`;
}

/** Horario en una línea: «Lunes a viernes, 8:00–20:00 · Sábado y domingo, 10:00–14:00 · Urgencias 24 h». */
export function horarioLinea(contacto: Pick<Contacto, "horario" | "urgencias24h">): string {
  const partes = formatearHorario(contacto.horario).map((l) => `${l.dias}, ${l.horas}`);
  if (contacto.urgencias24h) partes.push("Urgencias 24 h");
  return partes.join(" · ");
}

/** «4,8 ★ · 97 reseñas en Google» (1 → «reseña»). */
export function valoracionLinea(valoracion: SiteConfig["valoracion"]): string | undefined {
  if (!valoracion) return undefined;
  return `${mediaVisible(valoracion.media)} ★ · ${valoracion.total} ${valoracion.total === 1 ? "reseña" : "reseñas"} en Google`;
}

/** «4,8 ★ · 97» (cabecera de reseñas en móvil). */
export function valoracionCorta(valoracion: SiteConfig["valoracion"]): string | undefined {
  if (!valoracion) return undefined;
  return `${mediaVisible(valoracion.media)} ★ · ${valoracion.total}`;
}

/** Municipios sin repetir la ciudad del taller (las ramas de la red). */
export function ramasZonas(ciudad: string, zonas: readonly string[]): string[] {
  return zonas.filter((z) => z !== ciudad);
}

/** Años de oficio desde `anioFundacion` (nunca 0 ni negativos). */
export function aniosOficio(anioFundacion: number | undefined, anioActual: number): number | undefined {
  if (anioFundacion === undefined) return undefined;
  const n = anioActual - anioFundacion;
  return n > 0 ? n : undefined;
}
