import type { SiteConfig } from "@andrei-leads/core";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones"> & { anioFundacion?: number };

/** Banda negra: «Desde 2006», garantías en condensada blanca separadas por «/» y acreditaciones con su número. Sin nada, no sale. */
export function GarantiasBanda({ garantias, acreditaciones, anioFundacion }: Props) {
  if (!anioFundacion && garantias.length === 0 && acreditaciones.length === 0) return null;
  return (
    <section aria-label="Garantías" className="sobre-negro mt-(--seccion) bg-negro py-8 text-sobre-negro">
      <div className="contenedor flex flex-wrap items-start gap-x-12 gap-y-4">
        {anioFundacion && <p className="titulo-h2 m-0 flex-none">Desde {anioFundacion}</p>}
        <div className="flex-[1_1_300px]">
          {garantias.length > 0 && (
            <ul className="m-0 flex list-none flex-wrap gap-y-2 p-0">
              {garantias.map((g, k) => (
                <li key={g} className="condensada text-[22px] leading-[1.05]">
                  {g}
                  {k < garantias.length - 1 && (
                    <span aria-hidden="true" className="px-3 text-[#8f8f8f]">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {acreditaciones.map((a) => (
            <p key={a.nombre} className="m-0 mt-4 text-[13px] leading-[1.4] text-[#cfcfcf]">
              {a.nombre}
              {a.numero && ` · ${a.numero}`}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
