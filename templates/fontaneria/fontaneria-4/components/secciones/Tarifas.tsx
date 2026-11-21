import type { Tarifas as TipoTarifas } from "@andrei-leads/core";

import { Encabezado } from "./Encabezado";

/**
 * Tarifas (encargo §6.5): como un albarán. Concepto / Importe con filetes de 1 px, sin fila de total
 * (no es una factura) y la `nota` como «Observaciones». Sin `tarifas`, no existe.
 */
export function Tarifas({ tarifas, n }: { tarifas?: TipoTarifas; n: string }) {
  if (!tarifas) return null;
  return (
    <section id="tarifas" aria-labelledby="h2-tarifas" className="px-(--pad) pb-(--sec)">
      <Encabezado n={n} rotulo="Tarifas" titulo="Tarifas" id="h2-tarifas" />
      <div className="max-w-[640px] border border-texto bg-superficie" data-aparecer>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-texto">
              <th scope="col" className="rotulo px-3 py-2 text-left text-[0.6875rem] font-medium">
                Concepto
              </th>
              <th scope="col" className="rotulo w-[30%] border-l border-texto px-3 py-2 text-right text-[0.6875rem] font-medium">
                Importe
              </th>
            </tr>
          </thead>
          <tbody>
            {tarifas.items.map((t) => (
              <tr key={t.concepto} className="border-b border-borde last:border-b-0">
                <td className="p-3 leading-snug">{t.concepto}</td>
                <td className="border-l border-texto p-3 text-right font-titulo font-semibold">{t.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {tarifas.nota && (
          <div className="border-t border-texto px-3 py-2.5">
            <div className="rotulo text-[0.6875rem]">Observaciones</div>
            <p className="mt-1 text-[0.9375rem] leading-normal">{tarifas.nota}</p>
          </div>
        )}
      </div>
    </section>
  );
}
