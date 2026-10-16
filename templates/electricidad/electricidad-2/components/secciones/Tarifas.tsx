import type { Tarifas as DatosTarifas } from "@andrei-leads/core";

import { h2, tarjeta } from "@/lib/estilos";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  tarifas: DatosTarifas;
};

/**
 * Tarifas (Specs §2; sin mockup, compuesta con los tokens): h2 y una tarjeta blanca con una lista
 * concepto / precio (`dl`: concepto a la izquierda, precio en serif 600 a la derecha, línea fina entre filas)
 * y la `nota` debajo. Solo con cifras validadas por el cliente (AGENTS.md §6): sin `tarifas`, la página no
 * la llama. Va sobre piedra, detrás de los servicios.
 */
export function Tarifas({ tarifas }: Props) {
  return (
    <section aria-labelledby="titulo-tarifas" className="pt-4 pb-16 lg:pt-6 lg:pb-[104px]">
      <div className="contenedor">
        <h2 id="titulo-tarifas" className={cn(h2, "mb-6")}>
          {textos.tarifas}
        </h2>
        <div className={cn(tarjeta, "max-w-[820px] px-6 py-2")}>
          <dl className="m-0">
            {tarifas.items.map((item, i) => (
              <div
                key={`${i}-${item.concepto}`}
                className="flex items-baseline justify-between gap-6 border-t border-linea-suave py-4 first:border-t-0"
              >
                <dt className="min-w-0 text-lg leading-[1.35] text-pretty">{item.concepto}</dt>
                <dd className="m-0 flex-none text-right font-serif text-[22px] leading-[1.2] font-semibold whitespace-nowrap">
                  {item.precio}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {tarifas.nota && <p className="m-0 mt-4 max-w-[60ch] text-base text-tinta-suave text-pretty">{tarifas.nota}</p>}
      </div>
    </section>
  );
}
