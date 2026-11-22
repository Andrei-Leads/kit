import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

export type Cifra = { dt: string; dd: string };

/**
 * Cifras clave (encargo §6.4 y /empresa), solo desde los datos: años desde
 * `anioFundacion` (con el año actual), `valoracion.media`, `valoracion.total` y
 * el número de `zonas`. Cada una solo con dato.
 */
export async function cifrasClave(config: Pick<SiteConfig, "negocio" | "valoracion" | "zonas">): Promise<Cifra[]> {
  const cifras: Cifra[] = [];
  if (config.negocio.anioFundacion) {
    const anios = (await anioActual()) - config.negocio.anioFundacion;
    if (anios > 0) cifras.push({ dt: "Años de oficio", dd: String(anios) });
  }
  if (config.valoracion) {
    cifras.push({ dt: "Valoración media", dd: mediaVisible(config.valoracion.media) });
    cifras.push({ dt: "Reseñas en Google", dd: String(config.valoracion.total) });
  }
  if (config.zonas.length > 0) cifras.push({ dt: "Municipios", dd: String(config.zonas.length) });
  return cifras;
}
