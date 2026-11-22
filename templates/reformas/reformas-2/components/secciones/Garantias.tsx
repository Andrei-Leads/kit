import type { SiteConfig } from "@andrei-leads/core";

import { Marca } from "@/components/Iconos";

/**
 * «Lo que firmamos» (encargo §6.5): baldosas redondeadas sobre --color-alterna con una marca de
 * verificación en CSS; las acreditaciones, en píldoras. Sin datos, no pinta nada.
 */
export function Garantias({ garantias, acreditaciones }: Pick<SiteConfig, "garantias" | "acreditaciones">) {
  if (garantias.length === 0 && acreditaciones.length === 0) return null;
  return (
    <section aria-labelledby="h2-garantias" className="seccion">
      <div className="contenedor">
        <div className="flex flex-col gap-6 rounded-[32px] bg-alterna p-[clamp(24px,4vw,56px)]">
          <h2 id="h2-garantias" className="h2">
            {garantias.length > 0 ? "Lo que firmamos" : "Acreditaciones"}
          </h2>
          {garantias.length > 0 && (
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3">
              {garantias.map((g) => (
                <li key={g} className="flex min-h-[132px] flex-col gap-3.5 rounded-[20px] bg-superficie p-5">
                  <Marca grande />
                  <span className="font-titulo text-[19px] leading-[1.25] font-medium text-balance">{g}</span>
                </li>
              ))}
            </ul>
          )}
          {acreditaciones.length > 0 && (
            <ul aria-label={garantias.length > 0 ? "Acreditaciones" : undefined} className="flex flex-wrap gap-2">
              {acreditaciones.map((a) => (
                <li key={a.nombre} className="rounded-full bg-superficie px-3.5 py-2 text-sm font-semibold">
                  {a.nombre}
                  {a.numero && <span className="font-normal text-texto-suave"> · {a.numero}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
