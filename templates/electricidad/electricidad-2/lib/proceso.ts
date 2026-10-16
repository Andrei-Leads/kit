import type { SiteConfig } from "@andrei-leads/core";

export type Paso = { titulo: string; texto: string };

/**
 * Pasos por defecto de «Cómo trabajamos» (encargo §5) cuando `proceso` está vacío: Llamas → Vamos → Lo
 * arreglamos. Sin tiempos ni promesas: lo concreto solo puede venir de los datos.
 */
export const PASOS_POR_DEFECTO: Paso[] = [
  { titulo: "Llamas", texto: "Te cogemos el teléfono nosotros." },
  { titulo: "Vamos", texto: "Te decimos a qué hora llegamos." },
  { titulo: "Lo arreglamos", texto: "Y te explicamos qué ha pasado." },
];

/** `proceso` del cliente (≤ 6) o, si está vacío, los pasos por defecto. */
export function pasosProceso(proceso: SiteConfig["proceso"]): Paso[] {
  return proceso.length > 0 ? proceso : PASOS_POR_DEFECTO;
}
