import { Check } from "lucide-react";

import { Regla } from "@/components/Regla";
import { h2, seccionPlana } from "@/lib/estilos";
import { cn } from "@/lib/utils";

/**
 * «Qué incluye» de la guía (Specs §6): lista con casilla marcada sobre `primario-tinte` y borde
 * primario. Las reglas entre filas son de primario al 30 %. La página solo la llama con `incluye`.
 */
export function GuiaIncluye({ numero, id, incluye }: { numero: string; id: string; incluye: string[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={seccionPlana}>
      <div className="max-w-[720px]">
        <Regla numero={numero} etiqueta="Qué incluye" />
        <h2 id={`${id}-titulo`} className={cn(h2, "mt-4")}>
          Qué incluye
        </h2>
        <ul className="m-0 mt-5 list-none border border-primario bg-primario-tinte px-5 py-0">
          {incluye.map((punto, i) => (
            <li
              key={`${i}-${punto}`}
              className={cn(
                "flex items-start gap-3 py-[13px] text-[17px] leading-[1.4]",
                i > 0 && "border-t border-[color-mix(in_oklab,var(--color-primario)_30%,white)]"
              )}
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-[18px] flex-none items-center justify-center bg-primario text-sobre-primario"
              >
                <Check strokeWidth={4} className="size-3" />
              </span>
              <span>{punto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
