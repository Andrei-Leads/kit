import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

/** Una cifra de credibilidad: rótulo de arriba, cifra grande y rótulo de abajo (opcional). */
export type Cifra = { antes: string; cifra: string; despues?: string };

/**
 * Cifras de FranjaCifras y /empresa, cada una solo con su dato (nunca inventadas). Los años en el
 * oficio salen de `anioFundacion` y del año actual (lib/anio.ts, nunca la hora en el render).
 */
export async function cifras(
  config: Pick<SiteConfig, "negocio" | "valoracion" | "contacto">,
): Promise<Cifra[]> {
  const lista: Cifra[] = [];
  const { negocio, valoracion, contacto } = config;
  if (negocio.anioFundacion) {
    const anios = (await anioActual()) - negocio.anioFundacion;
    lista.push({
      antes: "Abiertos desde",
      cifra: String(negocio.anioFundacion),
      despues: anios > 1 ? `${anios} años en el oficio` : undefined,
    });
  }
  if (valoracion) {
    lista.push({ antes: "Valoración en Google", cifra: mediaVisible(valoracion.media), despues: `de ${valoracion.total} reseñas` });
  }
  if (contacto.tiempoLlegada) lista.push({ antes: "Llegamos en", cifra: contacto.tiempoLlegada });
  if (contacto.urgencias24h) lista.push({ antes: "Urgencias", cifra: "24 h", despues: "todos los días" });
  return lista;
}
