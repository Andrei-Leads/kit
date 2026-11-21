import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";
import { H1 } from "@/components/Rotulo";
import { cn } from "@/lib/utils";

/** Cabecera de página interior: migas en versalitas, h1 en la serif, entradilla y lo que venga (botones). */
export function CabeceraPagina({
  migas,
  titulo,
  entradilla,
  children,
  className,
}: {
  migas: Ancla[];
  titulo: string;
  entradilla?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("contenedor pt-3 pb-10 lg:pb-14", className)}>
      <Migas migas={migas} />
      <h1 className={cn(H1, "mt-2 max-w-[22ch]")}>{titulo}</h1>
      {entradilla && <p className="mt-4 max-w-[60ch] text-[1.125rem] text-texto-suave">{entradilla}</p>}
      {children}
    </div>
  );
}
