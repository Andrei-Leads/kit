import type { Tarifas as DatosTarifas } from "@andrei-leads/core";

/** Tarifas: tabla compacta en dos tintas; el precio en una caja tinta con la esquina cortada. Sin datos, no existe. */
export function Tarifas({ tarifas }: { tarifas?: DatosTarifas }) {
  if (!tarifas) return null;
  return (
    <section className="contenedor grid items-start pt-9 pb-2 lg:grid-cols-[4fr_8fr] lg:gap-12 lg:pt-14 lg:pb-4">
      <h2 className="m-0 mb-3 font-titulo text-h2 leading-[1.1] font-bold tracking-[-0.02em] lg:mb-0">Tarifas</h2>
      <div>
        <table className="w-full border-collapse lg:border-t-2 lg:border-tinta">
          <tbody>
            {tarifas.items.map((t) => (
              <tr key={t.concepto} className="border-b-2 border-tinta">
                <th scope="row" className="py-2.5 pr-2.5 text-left text-base leading-[1.3] font-normal lg:py-3 lg:pr-4 lg:text-lg">
                  {t.concepto}
                </th>
                <td className="py-2.5 text-right whitespace-nowrap lg:py-3">
                  <span className="corte-8 inline-block bg-tinta py-1.5 pr-3.5 pl-2.5 font-titulo text-[17px] leading-none font-bold text-sobre-tinta lg:py-[7px] lg:pr-[18px] lg:pl-3 lg:text-[19px]">
                    {t.precio}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tarifas.nota && <p className="mt-2.5 mb-0 text-sm text-texto-suave lg:text-[15px]">{tarifas.nota}</p>}
      </div>
    </section>
  );
}
