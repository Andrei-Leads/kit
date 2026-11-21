/*
 * Formato propio del diseño «Parte de trabajo». Lo común (teléfono visible, media, horario…) viene de
 * core; aquí solo lo que pinta este template. Solo para componentes de servidor (importa core).
 */
import { formatearHorario, mediaVisible, type Acreditacion, type SiteConfig } from "@andrei-leads/core";

/** 1 → "01": número de orden de casillas, campos y referencias. */
export function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

/** Fecha de reseña con aspecto de parte: "2026-11-12" → "12/11/2026"; "2026-10" → "10/2026". */
export function fechaParte(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-");
  if (!anio || !mes) return fecha;
  return dia ? `${dia}/${mes}/${anio}` : `${mes}/${anio}`;
}

/** Texto del botón de llamada: «Llamar 24 h» con urgencias24h; si no, «Llamar». */
export function textoLlamar(contacto: Pick<SiteConfig["contacto"], "urgencias24h">): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar";
}

/** "4,8 / 5 · 143 reseñas". */
export function valoracionParte(valoracion: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(valoracion.media)} / 5 · ${valoracion.total} reseñas`;
}

/**
 * Línea de confianza bajo cada pareja de botones: la valoración de Google si hay datos; si no, la
 * primera fila del horario. Solo lo que sale de los datos.
 */
export function lineaConfianza(config: Pick<SiteConfig, "valoracion" | "contacto">): string {
  const { valoracion, contacto } = config;
  if (valoracion) return `${mediaVisible(valoracion.media)} · ${valoracion.total} reseñas en Google`;
  const [primera] = formatearHorario(contacto.horario);
  return primera ? `${primera.dias}: ${primera.horas}` : "";
}

/** Primera acreditación con número: el sello rojo del hero (sin número no hay sello). */
export function acreditacionSello(acreditaciones: readonly Acreditacion[]): Acreditacion | undefined {
  return acreditaciones.find((a) => a.numero);
}

/** Sigla del sello: lo que va entre paréntesis («… (RASIC)» → «RASIC») o el nombre entero. */
export function siglaSello(nombre: string): string {
  return /\(([^)]+)\)/.exec(nombre)?.[1] ?? nombre;
}
