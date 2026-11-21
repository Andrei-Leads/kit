import type { SiteConfig } from "@andrei-leads/core";

/** Una burbuja entrante ancha con la lista concepto/precio y la nota. Sin `tarifas`, nada. */
export function Tarifas({ tarifas }: { tarifas: SiteConfig["tarifas"] }) {
  if (!tarifas) return null;
  return (
    <section aria-labelledby="h-tarifas" className="contenedor pb-[clamp(40px,2rem+3vw,96px)]">
      <div className="flex flex-wrap items-start gap-x-[clamp(32px,6vw,96px)] gap-y-5">
        <h2 id="h-tarifas" className="m-0 flex-[1_1_260px] text-h2 leading-[1.1] font-black">
          Precios orientativos
        </h2>
        <div className="flex-[2_1_340px] border border-linea bg-superficie px-5 py-4 burbuja-entra">
          <dl className="m-0 divide-y divide-linea-fuerte">
            {tarifas.items.map((t) => (
              <div key={t.concepto} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2.5">
                <dt>{t.concepto}</dt>
                <dd className="m-0 font-extrabold">{t.precio}</dd>
              </div>
            ))}
          </dl>
          {tarifas.nota && <p className="m-0 mt-2 text-[15px] text-texto-suave">{tarifas.nota}</p>}
        </div>
      </div>
    </section>
  );
}
