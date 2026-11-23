import type { ReactNode } from "react";

import { Pareja } from "@/components/Botones";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/**
 * Pareja de cierre de bloque (ParCta.dc.html): pregunta corta a la izquierda (opcional) y
 * «Mándanos una foto» + «Llamar · {teléfono}» a la derecha. Se repite cada 2–3 secciones.
 */
export function ParCta({ cta, pregunta, className }: { cta: DatosCta; pregunta?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-3.5", className)}>
      {pregunta && <p className="flex-[1_1_280px] text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.3] font-extrabold text-balance">{pregunta}</p>}
      <Pareja cta={cta} className="max-w-[600px] flex-[1_1_300px]" />
    </div>
  );
}
