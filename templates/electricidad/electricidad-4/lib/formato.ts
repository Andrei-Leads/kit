/*
 * Formato propio del diseño «Cuadro». Lo común (teléfono visible, media, horario…) viene de core;
 * aquí solo lo que pinta este template. Solo para componentes de servidor (importa core).
 */
import { mediaVisible, telefonoVisible, type Acreditacion, type SiteConfig } from "@andrei-leads/core";

type Contacto = Pick<SiteConfig["contacto"], "telefono" | "urgencias24h">;

/** 1 → "01": número de posición del módulo en el cuadro. */
export function posicion(n: number): string {
  return String(n).padStart(2, "0");
}

/** «Llamar 24 h» con urgencias24h; si no, «Llamar». */
export function textoLlamar(contacto: Pick<SiteConfig["contacto"], "urgencias24h">): string {
  return contacto.urgencias24h ? "Llamar 24 h" : "Llamar";
}

/** «Llamar 24 h · 600 00 01 04». */
export function textoLlamarCompleto(contacto: Contacto): string {
  return `${textoLlamar(contacto)} · ${telefonoVisible(contacto.telefono)}`;
}

/** «4,8 · 96 reseñas». */
export function valoracionCorta(v: NonNullable<SiteConfig["valoracion"]>): string {
  return `${mediaVisible(v.media)} · ${v.total} reseñas`;
}

/** «Empresa instaladora … · n.º 46/IBTE/0482» (sin número, solo el nombre). */
export function acreditacionLinea(a: Acreditacion): string {
  return a.numero ? `${a.nombre} · n.º ${a.numero}` : a.nombre;
}

/** Años en el oficio: «Desde 2008 · 18 años» (el año actual llega de lib/anio.ts). */
export function aniosOficio(anioFundacion: number, anio: number): string {
  const n = Math.max(0, anio - anioFundacion);
  return n > 0 ? `Desde ${anioFundacion} · ${n} ${n === 1 ? "año" : "años"}` : `Desde ${anioFundacion}`;
}
