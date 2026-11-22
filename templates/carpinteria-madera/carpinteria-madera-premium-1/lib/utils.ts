import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Pieza base del registro (kit/registry/lib/utils.ts). `cn` de shadcn con los
 * tokens declarados: sin esto, tailwind-merge no sabe que `text-display` es un
 * tamaño y lo borra al lado de `text-texto` (un color). «Oficio» suma sus
 * tamaños propios (h1, h2, h3, pano, etiqueta, cuerpo).
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "pano", "etiqueta", "cuerpo"],
      radius: ["boton", "tarjeta", "foto"],
      font: ["titulo", "texto"],
    },
  },
});

/** Une clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
