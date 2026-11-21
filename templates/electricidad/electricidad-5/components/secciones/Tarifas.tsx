import type { Tarifas as DatosTarifas } from "@andrei-leads/core";

/** Tarjeta grande con filas concepto/precio y la nota. Sin datos, no existe. */
export function Tarifas({ tarifas }: { tarifas?: DatosTarifas }) {
  if (!tarifas) return null;
  return (
    <section aria-labelledby="titulo-tarifas" className="seccion pt-0">
      <div className="contenedor">
        <div className="rounded-tarjeta bg-superficie p-6 md:p-10">
          <h2 id="titulo-tarifas" className="titulo-seccion">
            Precios orientativos
          </h2>
          <dl className="m-0 mt-6">
            {tarifas.items.map((t) => (
              <div key={t.concepto} className="flex items-baseline justify-between gap-4 rounded-2xl px-1 py-3.5 odd:bg-fondo md:px-4">
                <dt className="text-lg font-semibold">{t.concepto}</dt>
                <dd className="m-0 font-titulo text-2xl font-[750] tracking-[-0.02em] whitespace-nowrap tabular-nums">{t.precio}</dd>
              </div>
            ))}
          </dl>
          {tarifas.nota && <p className="m-0 mt-5 text-texto-suave">{tarifas.nota}</p>}
        </div>
      </div>
    </section>
  );
}
