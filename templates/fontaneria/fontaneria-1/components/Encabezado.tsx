import type { Ancla } from "@andrei-leads/core";
import type { ReactNode } from "react";

import { Migas } from "@/components/base/Migas";
import { cn } from "@/lib/utils";

/** Cabecera de página interior: migas + h1 en condensada a --text-display (+ lo que siga). */
export function Encabezado({ migas, titulo, children, claseTitulo }: { migas: Ancla[]; titulo: ReactNode; children?: ReactNode; claseTitulo?: string }) {
  return (
    <section className="contenedor pt-[clamp(24px,4vw,56px)] pb-[clamp(32px,5vw,64px)]">
      <Migas migas={migas} />
      <h1 className={cn("condensada mt-3.5 text-display", claseTitulo)}>{titulo}</h1>
      {children}
    </section>
  );
}
