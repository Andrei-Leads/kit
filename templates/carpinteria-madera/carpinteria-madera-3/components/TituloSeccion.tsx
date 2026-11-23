import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Número de la sección en el índice («03»). */
  n: string;
  id: string;
  children: ReactNode;
  /** Proceso y CTA final: un punto más grandes. */
  grande?: boolean;
  className?: string;
};

/**
 * Cabecera de sección del inicio: «03» en lápiz y una línea de cota (con sus dos topes) que se dibuja
 * al entrar en pantalla (`.cota-anim`, solo `transform`); debajo, el h2 en mono.
 */
export function TituloSeccion({ n, id, children, grande, className }: Props) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4", className)}>
      <div className="flex items-center gap-3.5">
        <span className="font-titulo text-[13px] font-semibold tracking-[0.04em] text-lapiz">{n}</span>
        <div aria-hidden="true" className="cota-anim relative h-[9px] flex-1">
          <div className="absolute inset-x-0 top-1 border-t border-lapiz" />
          <div className="absolute inset-y-0 left-0 border-l border-lapiz" />
          <div className="absolute inset-y-0 right-0 border-l border-lapiz" />
        </div>
      </div>
      <h2 id={id} className={cn("titulo leading-[1.1]", grande ? "text-h2-grande" : "text-h2")}>
        {children}
      </h2>
    </div>
  );
}

/** Título de bloque de las fichas («01 Qué hacemos»), con filete de tinta encima. */
export function TituloBloque({ n, id, children }: { n?: string; id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="titulo mb-5 flex items-baseline gap-3.5 border-t border-tinta pt-4 text-h3-bloque leading-[1.15]">
      {n && <span className="text-[13px] tracking-normal text-lapiz">{n}</span>}
      {children}
    </h2>
  );
}
