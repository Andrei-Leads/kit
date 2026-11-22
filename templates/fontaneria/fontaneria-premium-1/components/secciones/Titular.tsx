import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Cada línea sube desde detrás de su máscara (+.12 s por línea). Textos de interfaz, nunca datos. */
  lineas: ReactNode[];
  as?: "h2" | "p";
  id?: string;
  className?: string;
};

/**
 * Titular por líneas con máscara (recurso 2, encargo §5.2): cada línea en un
 * `<span class="linea">` con `overflow: clip` y su texto en `translate 0 105% → 0`
 * con el scroll. Solo en `h2` de interfaz; nunca en el `h1`. Sin soporte o con
 * «reducir movimiento», texto quieto (globals.css, `.mascara`).
 */
export function Titular({ lineas, as: Etiqueta = "h2", id, className }: Props) {
  return (
    <Etiqueta id={id} className={cn("mascara titulo", className)}>
      {lineas.map((l, i) => (
        <span key={i} className="linea" style={{ "--l": i } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Etiqueta>
  );
}
