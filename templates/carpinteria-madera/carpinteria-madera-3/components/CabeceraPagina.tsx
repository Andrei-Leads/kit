import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";
import { cn } from "@/lib/utils";

type Props = {
  migas: readonly Ancla[];
  /** Rótulo en lápiz sobre el h1 («Hoja de piezas», «Pieza A»…). */
  rotulo?: ReactNode;
  titulo: ReactNode;
  /** `display`: el h1 de las fichas de servicio, al tamaño del hero. */
  tamano?: "h1" | "display" | "ficha";
  children?: ReactNode;
};

/** Cabecera de las páginas interiores (diseño: migas en mono, rótulo en lápiz y el h1 en mono). */
export function CabeceraPagina({ migas, rotulo, titulo, tamano = "h1", children }: Props) {
  return (
    <>
      <Migas className="pt-7" migas={migas} />
      <section className="flex flex-col gap-5 pt-6">
        {rotulo && <p className="etiqueta font-semibold text-lapiz">{rotulo}</p>}
        <h1
          className={cn(
            "titulo",
            tamano === "display" && "text-display leading-[1.04]",
            tamano === "h1" && "text-h1 leading-[1.05]",
            tamano === "ficha" && "text-[clamp(1.75rem,1.3rem+2vw,3rem)] leading-[1.1]",
          )}
        >
          {titulo}
        </h1>
        {children}
      </section>
    </>
  );
}
