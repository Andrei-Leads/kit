import { formatearHorario, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { mensajeInicio } from "@/lib/mensajes";

/** Más de 18 caracteres: nombre largo (cabecera en dos niveles y «Llamar ahora»). */
export const LARGO_NOMBRE = 18;

/**
 * Nombre en dos niveles: lo anterior a las dos últimas palabras, en pequeño
 * («Fontanería y Saneamientos»), y las dos últimas en Fraunces («Hermanos Rendón»).
 * Un nombre corto va entero como principal.
 */
export function partirNombre(nombre: string): { prefijo?: string; principal: string } {
  const palabras = nombre.trim().split(/\s+/);
  if (nombre.length > LARGO_NOMBRE && palabras.length > 2) {
    return { prefijo: palabras.slice(0, -2).join(" "), principal: palabras.slice(-2).join(" ") };
  }
  return { principal: nombre };
}

/** «Llamar 24 h» con urgencias; si no, «Llama a {nombre}» o, con nombre largo, «Llamar ahora». */
export function textoLlamada(nombre: string, urgencias24h: boolean): string {
  if (urgencias24h) return "Llamar 24 h";
  return nombre.length > LARGO_NOMBRE ? "Llamar ahora" : `Llama a ${nombre}`;
}

/** Primera fila del horario: «Lunes a viernes · 8:30–14:00 y 17:00–20:30». */
export function primerTramoHorario(horario: SiteConfig["contacto"]["horario"]): string | undefined {
  const [fila] = formatearHorario(horario);
  return fila ? `${fila.dias} · ${fila.horas}` : undefined;
}

/** Línea de confianza bajo cada pareja de botones (solo con datos reales). */
export type Confianza = { valoracion?: string; extra?: string };

/** Lo que necesita una pareja de botones de llamada y WhatsApp. */
export type DatosCta = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  textoLlamada: string;
  confianza: Confianza;
};

/**
 * Datos de la pareja de botones: teléfono, WhatsApp, mensaje (el general si no
 * se pasa otro), texto de la llamada y la línea de confianza
 * («★ 4,9 · 186 reseñas en Google · Urgencias 24 h»).
 */
export function datosCta(
  config: Pick<SiteConfig, "negocio" | "contacto" | "valoracion">,
  mensaje: string = mensajeInicio(config.contacto),
): DatosCta {
  const { contacto, valoracion } = config;
  return {
    telefono: contacto.telefono,
    whatsapp: contacto.whatsapp,
    mensaje,
    textoLlamada: textoLlamada(config.negocio.nombre, contacto.urgencias24h),
    confianza: {
      valoracion: valoracion ? `${mediaVisible(valoracion.media)} · ${valoracion.total} reseñas en Google` : undefined,
      extra: contacto.urgencias24h ? "Urgencias 24 h" : primerTramoHorario(contacto.horario),
    },
  };
}

/** Radios de piedra en rotación. */
export const PIEDRAS = ["rounded-piedra-1", "rounded-piedra-2", "rounded-piedra-3", "rounded-piedra-4"] as const;
export function piedra(i: number): string {
  return PIEDRAS[((i % 4) + 4) % 4];
}
