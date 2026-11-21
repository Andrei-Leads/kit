import type { Tarifas as TipoTarifas } from "@andrei-leads/core";

import { H2, Rotulo } from "@/components/Rotulo";
import { cn } from "@/lib/utils";

/** `Tarifas` (encargo §6.6): tabla editorial con filetes. Sin datos, no existe. */
export function Tarifas({ tarifas, n }: { tarifas?: TipoTarifas; n: string }) {
  if (!tarifas) return null;
  return (
    <section aria-labelledby="h2-tarifas" className="contenedor py-14 lg:py-20">
      <Rotulo n={n} texto="Tarifas" />
      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        <h2 id="h2-tarifas" className={cn(H2, "lg:col-span-4")}>
          Tarifas
        </h2>
        <div className="lg:col-span-8">
          <table className="w-full border-t border-texto text-left">
            <caption className="sr-only">Tarifas</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Concepto</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.items.map((t) => (
                <tr key={t.concepto} className="border-b border-linea-plano">
                  <th scope="row" className="py-3.5 pr-4 font-normal">
                    {t.concepto}
                  </th>
                  <td className="cifras-antiguas py-3.5 text-right font-titulo text-[1.1875rem] whitespace-nowrap">{t.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {tarifas.nota && <p className="mt-4 text-[0.9375rem] text-texto-suave">{tarifas.nota}</p>}
        </div>
      </div>
    </section>
  );
}
