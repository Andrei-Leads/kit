import type { Servicio, SiteConfig, Trabajo } from "@andrei-leads/core";

/** h1 de la ficha: «{titulo} en {ciudad}» (la ciudad sale de `contacto.direccion`, nunca escrita a mano). */
export function tituloFicha(servicio: Pick<Servicio, "titulo">, ciudad: string): string {
  return `${servicio.titulo} en ${ciudad}`;
}

/** Trabajos que enlazan a este servicio (`trabajos[].servicio` es su slug), en el orden de los datos. */
export function trabajosDelServicio(trabajos: readonly Trabajo[], servicio: Pick<Servicio, "slug">): Trabajo[] {
  return trabajos.filter((t) => t.servicio === servicio.slug);
}

/** Los demás servicios, en el orden de los datos. */
export function otrosServicios(servicios: readonly Servicio[], servicio: Pick<Servicio, "slug">): Servicio[] {
  return servicios.filter((s) => s.slug !== servicio.slug);
}

/** Línea de datos de un trabajo bajo su título: «Valencia (Benimaclet) · 2026»; vacía si no hay ninguno. */
export function metaTrabajo(trabajo: Pick<Trabajo, "ubicacion" | "anio">): string | undefined {
  const partes = [trabajo.ubicacion, trabajo.anio?.toString()].filter((p): p is string => Boolean(p));
  return partes.length > 0 ? partes.join(" · ") : undefined;
}

/** Datos de contacto que usan los botones de la ficha. */
export type ContactoFicha = Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
