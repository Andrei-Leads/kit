import { createElement } from "react";
import type { LucideProps } from "lucide-react";

import { iconoServicio } from "@/lib/iconos";

/**
 * Icono lucide del servicio (según su título, `lib/iconos.ts`), decorativo (`aria-hidden`). Se crea con
 * `createElement` para no declarar un componente dentro del render. Tarjetas del inicio y de /servicios
 * y ficha de servicio sin foto.
 */
export function IconoServicio({ titulo, ...props }: LucideProps & { titulo: string }) {
  return createElement(iconoServicio(titulo), { "aria-hidden": true, strokeWidth: 1.25, ...props });
}
