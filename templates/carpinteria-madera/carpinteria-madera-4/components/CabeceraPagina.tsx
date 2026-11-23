import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

export type Pagina = "inicio" | "trabajos" | "servicios" | "empresa" | "contacto";

/** Marcador de la página actual para el menú (sin JS: globals.css lo lee con `:has()`). */
export function MarcaPagina({ pagina }: { pagina: Pagina }) {
  return <span data-pagina={pagina} hidden />;
}

type Props = {
  pagina?: Pagina;
  migas: readonly Ancla[];
  titulo: string;
  /** Recuento en acento a la derecha del `h1` («6 servicios», «7 piezas»). */
  recuento?: string;
  children?: ReactNode;
};

/** Cabecera de /servicios y /trabajos (y /empresa, /contacto): migas y `h1` display con línea negra debajo. */
export function CabeceraPagina({ pagina, migas, titulo, recuento, children }: Props) {
  return (
    <section className="contenedor pt-1">
      {pagina && <MarcaPagina pagina={pagina} />}
      <Migas migas={migas} />
      <div className="mt-1.5 flex flex-wrap items-end justify-between gap-4 border-b-2 border-borde pb-3">
        <h1 className="titulo-display m-0">{titulo}</h1>
        {recuento && <span className="ft numero normal-case text-[clamp(1.5rem,1.1rem+1.2vw,2.5rem)] leading-none">{recuento}</span>}
      </div>
      {children}
    </section>
  );
}
