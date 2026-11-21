/*
 * Etiqueta de origen de una foto (desde 0.6.0). Una foto generada con IA que
 * puede pasar por real lleva etiqueta (AI Act, art. 50.4, desde el 2/8/2026).
 * La pieza `Foto` del registro la pinta; el aspecto lo decide el template.
 */
import type { Imagen } from "./site-config";

const ETIQUETAS: Partial<Record<NonNullable<Imagen["origen"]>, string>> = {
  ia: "Imagen generada con IA",
  "ficha-google": "Foto de tu ficha de Google",
};

/** Texto de la etiqueta según `origen`, o `undefined` si no lleva (fotos del cliente, stock o sin origen). */
export function etiquetaOrigen(imagen: Pick<Imagen, "origen">): string | undefined {
  return imagen.origen ? ETIQUETAS[imagen.origen] : undefined;
}
