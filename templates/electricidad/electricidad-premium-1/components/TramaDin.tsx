import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Trama de módulos DIN (encargo §5.3): rectángulos de 18 × 45 px con filetes de
 * 1 px. Es el estado vacío de todo hueco de foto: nunca un rectángulo gris.
 * Decorativa salvo lo que lleve dentro (`children`, p. ej. la valoración).
 */
export function TramaDin({ proporcion = "4/5", children, className }: { proporcion?: "4/5" | "1/1" | "3/2" | "4/1" | "relleno"; children?: ReactNode; className?: string }) {
  const aspecto = { "4/5": "aspect-[4/5]", "1/1": "aspect-square", "3/2": "aspect-[3/2]", "4/1": "aspect-[4/1]", relleno: "" }[proporcion];
  return (
    <div className={cn("trama-din relative flex flex-col justify-end border border-[var(--color-linea)] p-[clamp(16px,3vw,28px)]", aspecto, className)}>
      {children}
    </div>
  );
}

/** El número del bloque en grande sobre la trama («01», «02»…). */
export function NumeroTrama({ numero }: { numero: string }) {
  return (
    <span aria-hidden="true" className="cifra self-start bg-fondo px-3 pt-1 pb-2">
      {numero}
    </span>
  );
}
