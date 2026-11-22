/*
 * Textos del asistente «Encargo» (encargo §5). Sin importar nada de core ni de site.config: este
 * archivo lo usa el componente cliente.
 */

export const DONDE = ["una ventana o un balcón", "una puerta o un patio", "una escalera", "una comunidad"] as const;

export const MEDIDAS = ["Tengo las medidas", "Os mando una foto con el metro", "Necesito que vengáis a medir"] as const;

/** Primera letra en mayúscula (para las opciones de «¿Dónde va?»). */
export function mayusculaInicial(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * «Hola, os escribo desde vuestra web. Quiero {pieza} para {dónde}. {medidas}. Os mando una foto.»
 * Lo que falta se omite (no se manda «…»). Sin ninguna respuesta, el mensaje general.
 */
export function componerEncargo(general: string, pieza?: string, donde?: string, medidas?: string): string {
  if (!pieza && !donde && !medidas) return general;
  const partes = ["Hola, os escribo desde vuestra web."];
  if (pieza || donde) partes.push(`Quiero ${pieza ?? "una pieza"}${donde ? ` para ${donde}` : ""}.`);
  if (medidas) partes.push(`${medidas}.`);
  partes.push("Os mando una foto.");
  return partes.join(" ");
}
