import type { SiteConfig } from "@andrei-leads/core";

import { Rotulo } from "@/components/Rotulo";
import { anioActual } from "@/lib/anio";

type Props = {
  n: string;
  garantias: readonly string[];
  acreditaciones: SiteConfig["acreditaciones"];
  marcas: readonly string[];
  anioFundacion?: number;
  ciudad: string;
};

/**
 * Garantías (encargo §6.5): «Desde 1998» en mono grande, tabla de plano con cada garantía y su marca
 * «✓» dibujada a línea, acreditaciones con número y marcas. Se recompone con lo que haya; la página la
 * oculta si no hay nada.
 */
export async function Garantias({ n, garantias, acreditaciones, marcas, anioFundacion, ciudad }: Props) {
  const anio = anioFundacion ? await anioActual() : 0;
  return (
    <section id="garantias" aria-labelledby="h2-garantias" className="border-y border-borde bg-alterna px-(--pad) py-(--sec)">
      <div className="max-w-[1040px]">
        <Rotulo n={n}>Garantías</Rotulo>
        {anioFundacion && (
          <>
            <p className="mono text-[clamp(2.75rem,1.8rem+4vw,6rem)] leading-none font-medium tracking-[-0.04em] text-texto">Desde {anioFundacion}</p>
            <p className="mono mt-3 text-[13px] text-texto-suave">
              {anio - anioFundacion} años de obras en {ciudad}
            </p>
          </>
        )}
        <h2 id="h2-garantias" className={`h2-diario mb-6 ${anioFundacion ? "mt-10" : ""}`}>
          Lo que firmamos
        </h2>
        {garantias.length > 0 && (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-px border border-borde bg-borde">
            {garantias.map((g) => (
              <li key={g} data-aparecer className="flex items-start gap-4 bg-alterna px-5 pt-6 pb-7 text-[17px] leading-[1.45] text-texto">
                <span aria-hidden="true" className="mt-[3px] h-[9px] w-4 flex-none -rotate-45 border-b-[1.5px] border-l-[1.5px] border-primario-claro" />
                {g}
              </li>
            ))}
          </ul>
        )}
        {acreditaciones.length > 0 && (
          <ul className="mono mt-7 grid gap-2 text-[13px] text-texto">
            {acreditaciones.map((a) => (
              <li key={a.nombre} className="flex gap-2.5">
                <span aria-hidden="true" className="text-primario-claro">
                  §
                </span>
                {[a.nombre, a.numero].filter(Boolean).join(" · ")}
              </li>
            ))}
          </ul>
        )}
        {marcas.length > 0 && (
          <p className="mono mt-5 text-[13px] text-texto-suave">
            Materiales: <span className="text-texto">{marcas.join(" · ")}</span>
          </p>
        )}
      </div>
    </section>
  );
}
