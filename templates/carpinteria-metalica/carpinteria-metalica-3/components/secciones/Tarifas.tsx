import type { Tarifas as TarifasTipo } from "@andrei-leads/core";

import { h2Seccion } from "@/lib/estilos";

type Props = {
  tarifas?: TarifasTipo;
};

/** Precios orientativos: solo cifras validadas por el cliente. */
export function Tarifas({ tarifas }: Props) {
  if (!tarifas || tarifas.items.length === 0) return null;
  return (
    <section className="pb-9 md:pb-20">
      <div className="contenedor flex flex-col gap-4">
        <h2 className={h2Seccion}>Precios orientativos</h2>
        <div className="max-w-[640px] rounded-md border-2 border-tinta bg-tarjeta">
          <table className="w-full">
            <caption className="sr-only">Precios orientativos</caption>
            <tbody>
              {tarifas.items.map((t, i) => (
                <tr key={`${t.concepto}-${i}`} className="border-b border-linea last:border-b-0">
                  <th scope="row" className="px-4 py-3.5 text-left font-normal">
                    {t.concepto}
                  </th>
                  <td className="px-4 py-3.5 text-right text-[19px] font-bold whitespace-nowrap tabular-nums">
                    {t.precio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tarifas.nota && (
            <p className="m-0 border-t border-linea px-4 py-3 text-[15px] text-tinta-suave">{tarifas.nota}</p>
          )}
        </div>
      </div>
    </section>
  );
}
