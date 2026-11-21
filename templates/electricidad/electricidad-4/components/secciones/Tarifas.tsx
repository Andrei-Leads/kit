import type { Tarifas as DatosTarifas } from "@andrei-leads/core";

/** Tarifas (encargo §6.5): dos columnas con puntos entre concepto y precio. Sin `tarifas`, no existe. */
export function Tarifas({ tarifas }: { tarifas?: DatosTarifas }) {
  if (!tarifas) return null;
  return (
    <section aria-labelledby="h2-tarifas" className="contenedor pt-[clamp(40px,6vw,72px)]">
      <h2 id="h2-tarifas" className="h2 mb-[18px]">
        Tarifas
      </h2>
      <div className="max-w-[640px] border border-carril bg-superficie px-4 py-1.5">
        <dl>
          {tarifas.items.map((t) => (
            <div key={t.concepto} className="flex items-baseline gap-2.5 border-b border-alterna py-3">
              <dt className="text-[17px]">{t.concepto}</dt>
              <span aria-hidden="true" className="min-w-6 flex-1 -translate-y-1 border-b-2 border-dotted border-borde" />
              <dd className="cifras text-lg font-semibold whitespace-nowrap">{t.precio}</dd>
            </div>
          ))}
        </dl>
        {tarifas.nota && <p className="pt-2.5 pb-2 text-sm text-texto-suave">{tarifas.nota}</p>}
      </div>
    </section>
  );
}
