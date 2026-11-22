/*
 * Textos del asistente «Hoja de medición» (encargo §5). Sin importaciones: lo usa la isla de
 * cliente (components/HojaMedicion.tsx), que no puede arrastrar core ni site.config.
 */

export const HUECOS = ["1 ventana", "2 o 3", "4 o más", "Toda la casa"] as const;
export const PERSIANA = ["Persiana nueva", "Mantengo la que tengo", "No lo sé"] as const;

const ENTRADA = "Hola, os escribo desde vuestra web. Hoja de medición: ";
const CIERRE = ". ¿Cuándo podéis venir a medir?";

/** «Hola, os escribo desde vuestra web. Hoja de medición: {servicio} · {huecos} · {persiana}. ¿Cuándo podéis venir a medir?» */
export function mensajeHoja(...casillas: (string | null | undefined)[]): string {
  return ENTRADA + casillas.filter(Boolean).join(" · ") + CIERRE;
}
