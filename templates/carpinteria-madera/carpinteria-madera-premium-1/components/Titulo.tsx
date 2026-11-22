import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Una línea por frase, partida en el servidor (sin medir con JS). */
  lineas: readonly ReactNode[];
  nivel?: "h2" | "h3" | "p";
  id?: string;
  className?: string;
};

/**
 * Titular por líneas con máscara (recurso 2): cada línea en un `<span>` con
 * `overflow: clip` que sube de 105 % a 0 al entrar en pantalla (globals.css,
 * `.linea`). Nunca en un `h1`. Sin soporte o con «reducir movimiento», quieto.
 */
export function TituloLineas({ lineas, nivel = "h2", id, className }: Props) {
  const Etiqueta = nivel;
  return (
    <Etiqueta id={id} className={cn("titulo", className)}>
      {lineas.map((l, i) => (
        <span key={i} className="linea" style={{ "--i": i } as CSSProperties}>
          <span>{l}</span>
          {i < lineas.length - 1 && " "}
        </span>
      ))}
    </Etiqueta>
  );
}

/** Palabra destacada: en --color-destacado (primario sobre papel, primario claro sobre tinta). */
export function Destacada({ children }: { children: ReactNode }) {
  return <span className="text-destacado">{children}</span>;
}
