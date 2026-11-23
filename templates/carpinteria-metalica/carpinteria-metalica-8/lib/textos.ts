import { etiquetaOrigen, mediaVisible, type Imagen, type SiteConfig, type Trabajo } from "@andrei-leads/core";

/** Sello de cifra: la cifra en display y una línea de texto debajo. */
export type Sello = { cifra: string; linea: string };

/**
 * Sellos de credibilidad de «El taller» (encargo §5): cada uno solo con su dato, nunca cifras
 * inventadas. Años (con el año actual de `lib/anio.ts`), equipo (≥ 2), valoración y municipios.
 */
export function sellos(
  config: Pick<SiteConfig, "negocio" | "valoracion" | "zonas"> & { empresa: Pick<SiteConfig["empresa"], "equipo"> },
  anioActual: number,
): Sello[] {
  const lista: Sello[] = [];
  const { anioFundacion } = config.negocio;
  if (anioFundacion && anioActual - anioFundacion > 0) {
    const n = anioActual - anioFundacion;
    lista.push({ cifra: String(n), linea: n === 1 ? "año de taller" : "años de taller" });
  }
  if (config.empresa.equipo.length >= 2) lista.push({ cifra: String(config.empresa.equipo.length), linea: "personas en el taller" });
  if (config.valoracion) lista.push({ cifra: mediaVisible(config.valoracion.media), linea: `${totalResenas(config.valoracion.total)} en Google` });
  if (config.zonas.length > 0) lista.push({ cifra: String(config.zonas.length), linea: config.zonas.length === 1 ? "municipio" : "municipios" });
  return lista;
}

/** «112 reseñas» / «1 reseña». */
export function totalResenas(total: number): string {
  return `${total.toLocaleString("es-ES")} ${total === 1 ? "reseña" : "reseñas"}`;
}

/** Sello C del collage (encargo §5): «Desde {año}»; si no, la valoración; si no, nada. */
export function selloHero(config: { negocio: Pick<SiteConfig["negocio"], "anioFundacion">; valoracion?: SiteConfig["valoracion"] }): { antes?: string; cifra: string; despues?: string } | undefined {
  if (config.negocio.anioFundacion) return { antes: "Desde", cifra: String(config.negocio.anioFundacion) };
  if (config.valoracion) return { cifra: mediaVisible(config.valoracion.media), despues: totalResenas(config.valoracion.total) };
  return undefined;
}

/** Línea de una obra: «{ubicacion} · {anio} · {duracion}» (con `superficie` en los listados); sin huecos. */
export function metaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "superficie" | "duracion">, conSuperficie = false): string {
  return [t.ubicacion, t.anio && String(t.anio), conSuperficie ? t.superficie : undefined, t.duracion].filter(Boolean).join(" · ");
}

/**
 * Pie común para varias fotos con máscara (encargo §8: una etiqueta encima quedaría cortada).
 * «Imágenes generadas con IA» si alguna lo es; las de la ficha de Google, aparte.
 */
export function pieConjunto(imagenes: readonly Pick<Imagen, "origen">[]): string | undefined {
  const etiquetas = [...new Set(imagenes.map((i) => etiquetaOrigen(i)).filter((e): e is string => !!e))];
  if (etiquetas.length === 0) return undefined;
  const ia = imagenes.filter((i) => i.origen === "ia").length;
  return etiquetas.map((e) => (e === "Imagen generada con IA" && ia > 1 ? "Imágenes generadas con IA" : e)).join(" · ");
}
