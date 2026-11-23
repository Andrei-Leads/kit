import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Pieza base del registro (kit/registry/lib/utils.ts). `cn` de shadcn, pero
 * con los tokens comunes declarados: sin esto, tailwind-merge no sabe que
 * `text-display` es un tamaño y lo borra al lado de `text-texto` (un color).
 * «Fachada nueva» suma sus tamaños (`h2`, `cuerpo`, `cifra`) y el radio `pastilla`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h2", "cuerpo", "cifra"],
      radius: ["boton", "tarjeta", "foto", "pastilla"],
      font: ["titulo", "texto"],
    },
  },
});

/** Une clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
