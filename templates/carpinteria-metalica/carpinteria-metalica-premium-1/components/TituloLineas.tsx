import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Cada línea del titular (≤ 18 caracteres, pensadas a 375 px). */
  lineas: readonly ReactNode[];
  as?: ElementType;
  id?: string;
  className?: string;
};

/**
 * Titular por líneas con máscara (recurso 2): cada línea sube desde detrás de su máscara
 * (`overflow: clip`) con la línea de tiempo del propio titular. Solo `h2` y lema, nunca
 * un `h1`. Sin soporte o con «reducir movimiento», el texto está quieto y visible.
 */
export function TituloLineas({ lineas, as: Etiqueta = "h2", id, className }: Props) {
  return (
    <Etiqueta id={id} className={cn("lineas", className)}>
      {lineas.map((l, i) => (
        <span key={i} className="linea" style={{ "--l": i } as CSSProperties}>
          <span>{l}</span>
          {i < lineas.length - 1 && " "}
        </span>
      ))}
    </Etiqueta>
  );
}
