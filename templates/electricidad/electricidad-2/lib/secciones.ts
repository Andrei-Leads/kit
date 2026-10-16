import type { SiteConfig } from "@andrei-leads/core";

import { aniosEnElBarrio } from "./formato";

/** Qué ocupa el puesto 2 del inicio: la sección estrella de reseñas, «Por qué fiarte» o nada. */
export type Estrella = "resenas" | "fiarte" | "ninguna";

type DatosConfianza = {
  negocio: Pick<SiteConfig["negocio"], "anioFundacion">;
  acreditaciones: readonly unknown[];
  garantias: readonly unknown[];
};

/** ¿Hay algo que decir en «Por qué fiarte» / la franja de confianza? Años, acreditaciones o garantías. */
export function hayConfianza(config: DatosConfianza, anioActual: number): boolean {
  return (
    aniosEnElBarrio(config.negocio.anioFundacion, anioActual) !== undefined ||
    config.acreditaciones.length > 0 ||
    config.garantias.length > 0
  );
}

/**
 * Puesto 2 del inicio (encargo §4): con reseñas, la sección estrella; con 0 reseñas y algún dato de
 * confianza, «Por qué fiarte» en el mismo sitio; sin ninguno de los dos, no sale nada y «Cómo
 * trabajamos» sube. Fuente única: la página decide con esto qué pinta, qué corte dibuja y si la franja
 * de confianza se repite (solo con reseñas: tras «Por qué fiarte» se oculta).
 */
export function estrellaInicio(config: DatosConfianza & { resenas: readonly unknown[] }, anioActual: number): Estrella {
  if (config.resenas.length > 0) return "resenas";
  return hayConfianza(config, anioActual) ? "fiarte" : "ninguna";
}
