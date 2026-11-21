import type { Tarifas as TarifasDatos } from "@andrei-leads/core";

/** Tarifas: tabla de dos columnas (concepto y precio en primario-luz con cifras tabulares) y la nota. */
export function Tarifas({ tarifas }: { tarifas?: TarifasDatos }) {
  if (!tarifas) return null;
  return (
    <section className="border-t border-borde">
      <div className="contenedor seccion-y flex flex-wrap gap-x-12 gap-y-6">
        <h2 className="condensada flex-[1_1_240px] text-h2">Tarifas</h2>
        <div className="min-w-0 flex-[3_1_560px]">
          <table className="w-full border-collapse">
            <tbody>
              {tarifas.items.map((t) => (
                <tr key={t.concepto} className="border-b border-borde">
                  <th scope="row" className="py-3.5 pr-3 text-left font-normal">
                    {t.concepto}
                  </th>
                  <td className="condensada py-3.5 text-right text-[1.75rem] leading-none tracking-normal whitespace-nowrap text-primario-luz tabular-nums">
                    {t.precio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tarifas.nota && <p className="mt-3 text-texto-suave">{tarifas.nota}</p>}
        </div>
      </div>
    </section>
  );
}
