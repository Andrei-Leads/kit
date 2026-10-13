import { createElement } from "react";

import { iconoServicio } from "@/lib/iconoServicio";

/** Icono de síntoma de un servicio (decorativo). Elige el icono según el título. */
export function IconoServicio({ titulo, className }: { titulo: string; className?: string }) {
  return createElement(iconoServicio(titulo), { "aria-hidden": true, className });
}
