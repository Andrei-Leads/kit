import type { ReactNode } from "react";

/** Cabecera de página interior sobre la arena (sin foto): h1 a tamaño display y entrada. */
export function CabeceraPagina({ titulo, entrada, children }: { titulo: string; entrada?: string; children?: ReactNode }) {
  return (
    <section className="pt-[clamp(1.5rem,1rem+2vw,3rem)]">
      <div className="contenedor">
        <h1 className="m-0 font-titulo text-display font-medium tracking-[-0.025em] text-balance">{titulo}</h1>
        {entrada && <p className="mt-5 mb-0 max-w-[36em] text-entrada">{entrada}</p>}
        {children}
      </div>
    </section>
  );
}
