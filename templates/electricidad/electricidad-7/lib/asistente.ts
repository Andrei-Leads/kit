/*
 * Textos y composición del mensaje del asistente. Sin imports: lo usa el componente cliente
 * `Asistente` y no puede arrastrar core ni site.config al navegador.
 */

/** Paso 2: respuesta visible → trozo del mensaje. */
export const CUANDO = [
  { texto: "Ahora mismo", frase: "Empezó ahora mismo." },
  { texto: "Desde hoy", frase: "Empezó hoy." },
  { texto: "Hace días", frase: "Empezó hace días." },
] as const;

/** Paso 3: respuesta visible → trozo del mensaje («Es en casa.», no «Es en: en casa»). */
export const DONDE = [
  { texto: "En casa", frase: "Es en casa." },
  { texto: "En un local", frase: "Es en un local." },
  { texto: "En una zona común del edificio", frase: "Es en una zona común del edificio." },
] as const;

export const OTRA_COSA = { titulo: "Otra cosa", enFrase: "otra cosa" };

/** Pregunta que sigue a cada respuesta (la primera, «¿Qué te pasa?», es fija). */
export const PREGUNTAS = ["¿Qué te pasa?", "¿Desde cuándo?", "¿Dónde?"] as const;
export const LISTO = "Listo. Este es el mensaje que vas a enviar:";

/**
 * Mensaje compuesto con las respuestas que haya (también parciales: los enlaces sin JavaScript
 * llevan el mensaje hasta esa respuesta).
 * «{base} Es por: {servicio}. Empezó hoy. Es en casa. Ahora os mando una foto.»
 */
export function componerMensaje(base: string, servicio?: string, cuando?: string, donde?: string): string {
  const partes = [base];
  if (servicio) partes.push(`Es por: ${servicio}.`);
  if (cuando) partes.push(cuando);
  if (donde) partes.push(donde);
  partes.push("Ahora os mando una foto.");
  return partes.join(" ");
}
