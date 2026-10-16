import { createElement } from "react";
import type { LucideProps } from "lucide-react";

import { iconoServicio } from "@/lib/iconos";

/** Icono lucide (trazo 2, decorativo) elegido por el título del servicio (ver lib/iconos.ts). */
export function IconoServicio({ titulo, ...props }: LucideProps & { titulo: string }) {
  return createElement(iconoServicio(titulo), { "aria-hidden": true, strokeWidth: 2, ...props });
}
