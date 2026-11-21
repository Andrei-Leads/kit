import type { Tarifas as TipoTarifas } from "@andrei-leads/core";

/** Tarifas (encargo §6.5): tabla negra de dos columnas, precio en condensada a 28 px, nota debajo. Sin datos, nada. */
export function Tarifas({ tarifas }: { tarifas?: TipoTarifas }) {
  if (!tarifas) return null;
  return (
    <section aria-labelledby="titulo-tarifas" className="bg-alterna">
      <div className="contenedor flex flex-col gap-6 py-9 lg:py-13">
        <h2 id="titulo-tarifas" className="titulo-h2 m-0">
          Lo que cuesta
        </h2>
        <div className="max-w-3xl">
          <table className="w-full border-collapse bg-fondo">
            <thead className="sr-only">
              <tr>
                <th scope="col">Concepto</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.items.map((t) => (
                <tr key={t.concepto} className="border-b border-borde/40 last:border-b-0">
                  <th scope="row" className="px-4 py-3.5 text-left font-semibold sm:px-6">
                    {t.concepto}
                  </th>
                  <td className="condensada px-4 py-3.5 text-right text-[1.75rem] leading-none whitespace-nowrap tabular-nums sm:px-6">{t.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {tarifas.nota && <p className="m-0 mt-3 text-sm text-texto-suave">{tarifas.nota}</p>}
        </div>
      </div>
    </section>
  );
}
