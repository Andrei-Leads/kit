/*
 * Textos fijos del asistente «A medida» y composición del mensaje (encargo §3 y §5). Sin imports:
 * lo usa el componente cliente `Asistente` y no puede arrastrar core ni site.config al navegador.
 */

/** Paso 2, «¿Cuánto mide el hueco?»: [texto del botón, frase del mensaje]. */
export const TAMANOS = [
  ["Menos de 1 m", "El hueco mide menos de 1 m."],
  ["De 1 a 2 m", "El hueco mide entre 1 y 2 m."],
  ["De 2 a 3 m", "El hueco mide entre 2 y 3 m."],
  ["Más de 3 m", "El hueco mide más de 3 m."],
  ["Aún no lo he medido", "Aún no he medido el hueco."],
] as const;

/** Paso 3, «¿Qué acabado prefieres?»: [texto, frase del mensaje, muestra de color]. Las muestras son dibujo, no datos. */
export const ACABADOS = [
  ["Madera natural", "Prefiero acabado en madera natural.", "madera"],
  ["Lacado", "Prefiero acabado lacado.", "lacado"],
  ["Aún no lo sé", "Aún no sé qué acabado quiero.", "ninguno"],
] as const;

/** Mensaje general si el cliente no trae `contacto.mensajeWhatsapp` (encargo §3). */
export const MENSAJE_BASE =
  "Hola, os escribo desde la web. Quiero presupuesto para un mueble a medida; os mando foto del hueco.";

/** Sin `servicios[].mensajeWhatsapp`: el de la opción del paso 1 sin JS, la ficha y su CTA. */
export function mensajePorServicio(frase: string): string {
  return `Hola, quiero presupuesto para ${frase}. Os mando foto y medidas del hueco.`;
}

/**
 * Plantilla común de la tanda (decisión de Ysst, 23-nov-2026): «Hola, quiero presupuesto para
 * {servicio}.» y cada respuesta como frase aparte («El hueco mide entre 1 y 2 m. Prefiero acabado
 * lacado. Os mando foto del hueco.»), para que ningún título de servicio («Huecos difíciles»,
 * «Reparar una puerta que roza») rompa la frase. Mientras falta una respuesta, su frase se omite.
 * Sin servicio, `base` (el mensaje general).
 * `frase`: el título del servicio con `minusculaInicial` de core, calculado en el servidor.
 */
export function componerMensaje(base: string, frase?: string, tamano?: number, acabado?: number): string {
  if (!frase) return base;
  const partes = [`Hola, quiero presupuesto para ${frase}.`];
  if (tamano !== undefined) partes.push(TAMANOS[tamano][1]);
  if (acabado !== undefined) partes.push(ACABADOS[acabado][1]);
  partes.push("Os mando foto del hueco.");
  return partes.join(" ");
}
