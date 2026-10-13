import type { Servicio } from "@andrei-leads/core";
import { normalizar } from "./iconoServicio";

const PALABRAS = ["medida", "cerramiento", "ventana", "fabricacion", "instalacion"];

/** Servicio «a medida»: el título habla de fabricar o instalar, no de reparar. */
export function esAMedida(servicio: Pick<Servicio, "titulo">): boolean {
  const t = normalizar(servicio.titulo);
  return PALABRAS.some((p) => t.includes(p));
}

export function serviciosAMedida(servicios: Servicio[]): Servicio[] {
  return servicios.filter(esAMedida);
}

export function serviciosAveria(servicios: Servicio[]): Servicio[] {
  return servicios.filter((s) => !esAMedida(s));
}
