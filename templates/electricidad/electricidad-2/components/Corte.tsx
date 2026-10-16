import { cn } from "@/lib/utils";

/** Fondos entre los que se corta. */
export type Fondo = "piedra" | "piedra-2" | "tinta" | "blanco";

const COLOR: Record<Fondo, string> = {
  piedra: "var(--color-piedra)",
  "piedra-2": "var(--color-piedra-2)",
  tinta: "var(--color-tinta)",
  blanco: "#ffffff",
};

type Props = {
  /** Fondo de la banda que termina (la de arriba). */
  de: Fondo;
  /** Fondo de la banda que empieza (la de abajo). */
  a: Fondo;
  className?: string;
};

/**
 * Corte diagonal entre dos bandas (Specs §7): un elemento con el color de arriba y el de abajo separados
 * por una diagonal que sube hacia la derecha (3° móvil, 5° escritorio; utilidad `corte-bandas` de
 * globals.css). Decorativo (aria-hidden). El texto nunca va encima: el corte es un elemento propio entre
 * secciones. El -1 px de margen evita la línea fina de subpíxel entre la banda anterior y el corte.
 */
export function Corte({ de, a, className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn("corte-bandas -mt-px", className)}
      style={{ "--corte-de": COLOR[de], "--corte-a": COLOR[a] } as React.CSSProperties}
    />
  );
}
