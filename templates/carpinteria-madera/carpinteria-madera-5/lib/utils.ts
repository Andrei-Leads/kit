import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Pieza base del registro (kit/registry/lib/utils.ts). `cn` de shadcn, pero
 * con los tokens comunes declarados: sin esto, tailwind-merge no sabe que
 * `text-display` es un tamaño y lo borra al lado de `text-texto` (un color).
 * Si el template añade tamaños o radios propios, los suma aquí (carpinteria-madera-5: h2, h3,
 * cuerpo y entrada; los arcos y esquinas desiguales).
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h2", "h3", "cuerpo", "entrada"],
      radius: ["boton", "tarjeta", "foto", "arco-pequeno", "arco-medio", "foto-tarjeta", "pregunta", "caja", "hoja"],
      font: ["titulo", "texto"],
    },
  },
});

/** Une clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
