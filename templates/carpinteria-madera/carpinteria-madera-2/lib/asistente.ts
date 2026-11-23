/*
 * Textos fijos del asistente «A medida» y composición del mensaje (encargo §3 y §5). Sin imports:
 * lo usa el componente cliente `Asistente` y no puede arrastrar core ni site.config al navegador.
 */

/** Paso 2, «¿Cuánto mide el hueco?»: [texto del botón, trozo del mensaje]. */
export const TAMANOS = [
  ["Menos de 1 m", "de menos de 1 m"],
  ["De 1 a 2 m", "de 1 a 2 m"],
  ["De 2 a 3 m", "de 2 a 3 m"],
  ["Más de 3 m", "de más de 3 m"],
  ["Aún no lo he medido", "que aún no he medido"],
] as const;

/** Paso 3, «¿Qué acabado prefieres?»: [texto, trozo del mensaje, muestra de color]. Las muestras son dibujo, no datos. */
export const ACABADOS = [
  ["Madera natural", "en madera natural", "madera"],
  ["Lacado", "con acabado lacado", "lacado"],
  ["Aún no lo sé", "sin decidir el acabado", "ninguno"],
] as const;

/** Mensaje general si el cliente no trae `contacto.mensajeWhatsapp` (encargo §3). */
export const MENSAJE_BASE =
  "Hola, os escribo desde la web. Quiero presupuesto para un mueble a medida; os mando foto del hueco.";

/** Sin `servicios[].mensajeWhatsapp`: el de la opción del paso 1 sin JS, la ficha y su CTA. */
export function mensajePorServicio(frase: string): string {
  return `Hola, quiero presupuesto para ${frase}. Os mando foto y medidas del hueco.`;
}

/**
 * «Hola, os escribo desde la web. Quiero {servicio} para un hueco {tamaño}, {acabado}. ¿Me dais
 * presupuesto? Os mando foto del hueco.» Mientras falta una respuesta, su trozo se omite y el
 * mensaje se sigue leyendo bien. Sin servicio, `base` (el mensaje general).
 * `frase`: el título del servicio en minúscula, calculado en el servidor.
 */
export function componerMensaje(base: string, frase?: string, tamano?: number, acabado?: number): string {
  if (!frase) return base;
  let m = `Hola, os escribo desde la web. Quiero ${frase}`;
  if (tamano !== undefined) m += ` para un hueco ${TAMANOS[tamano][1]}`;
  if (acabado !== undefined) m += `${tamano !== undefined ? "," : ""} ${ACABADOS[acabado][1]}`;
  return `${m}. ¿Me dais presupuesto? Os mando foto del hueco.`;
}
