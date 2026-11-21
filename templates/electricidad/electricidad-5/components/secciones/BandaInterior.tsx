import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";
import { cn } from "@/lib/utils";

type Props = {
  migas: readonly Ancla[];
  titulo: string;
  entrada?: ReactNode;
  /** Pareja de botones u otra fila bajo la entrada. */
  children?: ReactNode;
  /** Tarjeta a la derecha en escritorio (p. ej. la cifra con `precioDesde`). */
  aparte?: ReactNode;
};

/** Banda de color pleno de las páginas interiores: migas, h1, entrada y botones. */
export function BandaInterior({ migas, titulo, entrada, children, aparte }: Props) {
  return (
    <section aria-labelledby="titulo-pagina" className="sobre-pleno bg-pleno pt-2 pb-[clamp(2.5rem,1.5rem+3vw,4.5rem)] text-sobre-primario">
      <div className={cn("contenedor grid gap-8", aparte && "lg:grid-cols-[1.4fr_1fr] lg:items-center")}>
        <div>
          <Migas migas={migas} />
          <h1 id="titulo-pagina" className="m-0 mt-3 max-w-[18ch] font-titulo text-[clamp(2.5rem,1.9rem+2.6vw,4.25rem)] leading-[1.02] font-[750] tracking-[-0.035em] text-balance">
            {titulo}
          </h1>
          {entrada && <div className="mt-4 max-w-[40ch] text-[1.0625rem] lg:text-xl [&_p]:m-0">{entrada}</div>}
          {children && <div className="mt-6">{children}</div>}
        </div>
        {aparte}
      </div>
    </section>
  );
}
