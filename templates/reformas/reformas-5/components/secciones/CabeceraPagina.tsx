import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";
import { cn } from "@/lib/utils";

type Props = {
  migas: readonly Ancla[];
  titulo: ReactNode;
  entrada?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Cabecera de página interior: migas, h1 en display y una entrada en texto suave. */
export function CabeceraPagina({ migas, titulo, entrada, children, className }: Props) {
  return (
    <div className={cn("contenedor pt-[clamp(1.25rem,4vw,4rem)]", className)}>
      <Migas migas={migas} className="mb-2" />
      <h1 className="titulo-display">{titulo}</h1>
      {entrada && <p className="m-0 mt-4 max-w-[52ch] text-texto-suave">{entrada}</p>}
      {children}
    </div>
  );
}
