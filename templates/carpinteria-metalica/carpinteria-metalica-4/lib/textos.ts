import { horarioVisible, listaY, mediaVisible, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** 3 → «03»: número de REF, de lámina y de sección. Es la posición en su lista, nunca un dato inventado. */
export function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

/** «4,8 · 63 reseñas». */
export function textoValoracion(valoracion: NonNullable<SiteConfig["valoracion"]>): string {
  const { media, total } = valoracion;
  return `${mediaVisible(media)} · ${total.toLocaleString("es-ES")} ${total === 1 ? "reseña" : "reseñas"}`;
}

/** Cotas de encima del h1 del hero (encargo §6.2): solo las que tienen dato. */
export function cotasHero(config: Pick<SiteConfig, "valoracion" | "negocio">): string[] {
  const cotas: string[] = [];
  if (config.valoracion) cotas.push(textoValoracion(config.valoracion));
  if (config.negocio.anioFundacion) cotas.push(`Desde ${config.negocio.anioFundacion}`);
  return cotas;
}

/** Cota de zonas: «Alboraya, Valencia, Meliana y 6 más»; con 3 o menos, la lista entera («A, B y C»). */
export function cotaZonas(zonas: readonly string[]): string {
  if (zonas.length <= 3) return listaY(zonas);
  return `${zonas.slice(0, 3).join(", ")} y ${zonas.length - 3} más`;
}

/**
 * Etiqueta de referencia de un trabajo (encargo §5): «REF. 03 · Alboraya · 2025 · 14 m² · 2 días».
 * Cada dato que falta desaparece con su separador. Con `servicio`, se añade su título al final.
 */
export function refTrabajo(trabajo: Pick<Trabajo, "ubicacion" | "anio" | "superficie" | "duracion">, indice: number, servicio?: string): string {
  return [`REF. ${dosCifras(indice + 1)}`, trabajo.ubicacion, trabajo.anio && String(trabajo.anio), trabajo.superficie, trabajo.duracion, servicio]
    .filter(Boolean)
    .join(" · ");
}

/** «Sistemas y marcas: Cortizo · Strugal · Technal» (la entrega dice «y marcas» porque Somfy hace motores). */
export function lineaMarcas(marcas: readonly string[]): string {
  return `Sistemas y marcas: ${marcas.join(" · ")}`;
}

/** Línea de confianza con el horario: «Lunes a viernes · 8:00–14:00 y 16:00–19:00». */
export function lineaHorario(contacto: Pick<SiteConfig["contacto"], "horario" | "urgencias24h">): string {
  return horarioVisible(contacto)
    .map((l) => `${l.dias} · ${l.horas}`)
    .join(" / ");
}
