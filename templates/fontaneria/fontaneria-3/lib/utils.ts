import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Pieza base del registro (kit/registry/lib/utils.ts). `cn` de shadcn, pero
 * con los tokens comunes declarados: sin esto, tailwind-merge no sabe que
 * `text-display` es un tamaño y lo borra al lado de `text-texto` (un color).
 * Si el template añade tamaños o radios propios, los suma aquí.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h2", "cita", "entrada"],
      radius: ["boton", "tarjeta", "foto", "piedra-1", "piedra-2", "piedra-3", "piedra-4", "barra-wa"],
      font: ["titulo", "texto"],
    },
  },
});

/** Une clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
