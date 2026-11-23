/*
 * Textos del asistente «Hoja de medición» (encargo §5). Sin importaciones: lo usa la isla de
 * cliente (components/HojaMedicion.tsx), que no puede arrastrar core ni site.config.
 */

export const HUECOS = ["1 ventana", "2 o 3", "4 o más", "Toda la casa"] as const;
export const PERSIANA = ["Persiana nueva", "Mantengo la que tengo", "No lo sé"] as const;

const ENTRADA = "Hola, os escribo desde vuestra web. Hoja de medición: ";
const CIERRE = ". ¿Cuándo podéis venir a medir?";

/** Minúscula inicial (copia local: este archivo no importa nada de core). */
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

/**
 * «Hola, os escribo desde vuestra web. Hoja de medición: {servicio} · Huecos: {huecos} · Persiana:
 * {persiana}. ¿Cuándo podéis venir a medir?». Las casillas 2 y 3 llevan su nombre para que «2 o 3» o
 * «No lo sé» se entiendan solos en el chat («Persiana nueva» queda «Persiana: nueva»). Las casillas
 * vacías se omiten.
 */
export function mensajeHoja(servicio?: string | null, huecos?: string | null, persiana?: string | null): string {
  const partes = [servicio, huecos && `Huecos: ${minuscula(huecos)}`, persiana && `Persiana: ${minuscula(persiana).replace(/^persiana /, "")}`];
  return ENTRADA + partes.filter(Boolean).join(" · ") + CIERRE;
}
