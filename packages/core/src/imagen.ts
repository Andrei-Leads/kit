/*
 * Etiqueta de origen de una foto (desde 0.6.0). Desde 0.8.0 no devuelve ninguna:
 * Ysst decidió el 26/11/2026 quitar «Imagen generada con IA» y «Foto de tu ficha
 * de Google» de todas las webs, sabiendo el riesgo (AI Act, art. 50.4, desde el
 * 2/8/2026: una imagen de IA realista que pueda pasar por real debe avisarse).
 * Se mantiene la función para no romper los templates que la llaman y por si se
 * vuelve a activar: basta con rellenar ETIQUETAS. `imagen.origen` sigue en el
 * contrato (nada de IA en /trabajos de un cliente real).
 */
import type { Imagen } from "./site-config";

const ETIQUETAS: Partial<Record<NonNullable<Imagen["origen"]>, string>> = {};

/** Texto de la etiqueta según `origen`; hoy siempre `undefined` (ver arriba). */
export function etiquetaOrigen(imagen: Pick<Imagen, "origen">): string | undefined {
  return imagen.origen ? ETIQUETAS[imagen.origen] : undefined;
}
