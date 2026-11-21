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
      text: ["display", "cifra", "h1", "h2", "cuerpo"],
      radius: ["boton", "tarjeta", "foto"],
      font: ["titulo", "texto"],
    },
  },
});

/** Une clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
