import { BotonLlamada, telefonoVisible } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { CLASE_FILA, type TamFila } from "./FilaIndice";

const TITULO: Record<TamFila, string> = {
  indice: "text-2xl lg:text-[calc(var(--text-display)*0.5)]",
  "indice-70": "text-2xl lg:text-[calc(var(--text-display)*0.5)]",
  pequena: "text-2xl lg:text-[2.75rem]",
};

/**
 * Variante `llamada-fila`: la última fila del índice es una llamada («¿No está tu problema? Llama y
 * cuéntanoslo · número»). Es un BotonLlamada con aspecto de fila.
 */
export function FilaLlamada({ telefono, tam = "indice" }: { telefono: string; tam?: TamFila }) {
  return (
    <li>
      <BotonLlamada telefono={telefono} className={CLASE_FILA}>
        <span aria-hidden="true" className="numero text-[0.8125rem] font-semibold">
          +
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className={cn("detalle condensada text-balance", TITULO[tam], "leading-[1.02]")}>¿No está tu problema?</span>
          <span className="text-sm font-medium">Llama y cuéntanoslo · {telefonoVisible(telefono)}</span>
        </span>
        <span aria-hidden="true" className="flecha text-xl leading-none lg:text-[2rem]">
          →
        </span>
      </BotonLlamada>
    </li>
  );
}
