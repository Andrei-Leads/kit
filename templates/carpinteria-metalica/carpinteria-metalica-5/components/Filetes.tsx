import { cn } from "@/lib/utils";

type Props = {
  /** Filetes encendidos (puntuación de 1 a 5). */
  puntos?: number;
  ancho?: 10 | 12 | 14;
  className?: string;
};

const ANCHO = { 10: "w-2.5", 12: "w-3", 14: "w-3.5" } as const;

/**
 * Cinco filetes cortos en lugar de estrellas (encargo §6.2 y §14: sin estrellas amarillas).
 * Decorativo: quien lo usa pone la puntuación en texto (visible o `sr-only`).
 */
export function Filetes({ puntos = 5, ancho = 12, className }: Props) {
  return (
    <span aria-hidden="true" className={cn("flex flex-none gap-1", className)}>
      {[1, 2, 3, 4, 5].map((k) => (
        <span key={k} className={cn("h-px", ANCHO[ancho], k <= puntos ? "bg-anodizado" : "bg-filete-apagado")} />
      ))}
    </span>
  );
}
