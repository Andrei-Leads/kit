/*
 * Textos fijos del planificador y composición del mensaje. Sin imports: lo usa el componente
 * cliente `Planificador` y no puede arrastrar core ni site.config al navegador.
 */

/** Paso «tamaño» (texto fijo del template, no datos del negocio). */
export const TAMANOS = ["Pequeño (hasta 5 m²)", "Mediano (5–15 m²)", "Grande (más de 15 m²)", "Vivienda entera"] as const;

/** Paso «plazo». */
export const PLAZOS = ["Lo antes posible", "En 1–3 meses", "Solo quiero precio"] as const;

/** Última casilla del paso 1. */
export const OTRA_COSA = { titulo: "Otra cosa", frase: "otra reforma" } as const;

/** Mensaje general del planificador si el cliente no trae `contacto.mensajeWhatsapp`. */
export const MENSAJE_PLANIFICADOR = "Hola, os escribo desde vuestro planificador de reformas.";

const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

/** El plazo elegido, dicho como en un WhatsApp («Para: solo quiero precio» no se entiende). */
const FRASE_PLAZO: Record<string, string> = {
  "Lo antes posible": "Me gustaría empezar lo antes posible.",
  "En 1–3 meses": "Me gustaría empezar en 1–3 meses.",
  "Solo quiero precio": "De momento solo quiero saber el precio.",
};

/**
 * «Hola, quiero presupuesto para {servicio}. Tamaño aproximado: {tamaño}. {plazo}» con las
 * respuestas que haya. Sin ninguna, `base`. (El encargo decía «quiero reformar: {servicio}», que
 * daba «quiero reformar: reforma de baño» y «Para: solo quiero precio».)
 */
export function componerMensaje(base: string, servicio?: string, tamano?: string, plazo?: string): string {
  if (!servicio && !tamano && !plazo) return base;
  let m = `Hola, quiero presupuesto para ${servicio ?? "una reforma"}.`;
  if (tamano) m += ` Tamaño aproximado: ${minuscula(tamano)}.`;
  if (plazo) m += ` ${FRASE_PLAZO[plazo] ?? `Plazo: ${minuscula(plazo)}.`}`;
  return m;
}

/** Sin JavaScript, cada opción del paso 1 es un WhatsApp con este mensaje. */
export function mensajeSinJs(servicio: string): string {
  return `Hola, quiero presupuesto para ${servicio}.`;
}
