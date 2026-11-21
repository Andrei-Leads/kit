import type { SiteConfig } from "@andrei-leads/core";

import { CasillaMarcada } from "@/components/Iconos";
import { valoracionParte } from "@/lib/formato";

import { Encabezado } from "./Encabezado";

type Props = Pick<SiteConfig, "acreditaciones" | "garantias" | "valoracion"> & {
  anioFundacion?: number;
  n: string;
};

/**
 * CasillasConfianza (franja de confianza, encargo §6.2): tabla de casillas con rótulo mono («DESDE»,
 * «ACREDITACIÓN», «VALORACIÓN EN GOOGLE») y garantías con casilla marcada en --color-acento.
 * Se recompone con lo que haya; sin años, acreditaciones ni garantías, no existe.
 */
export function CasillasConfianza({ acreditaciones, garantias, valoracion, anioFundacion, n }: Props) {
  const celdas = [
    ...(anioFundacion ? [{ rotulo: "Desde", valor: String(anioFundacion), sub: "" }] : []),
    ...acreditaciones.map((a) => ({ rotulo: "Acreditación", valor: a.nombre, sub: a.numero ?? "" })),
  ];
  if (celdas.length === 0 && garantias.length === 0) return null;
  if (valoracion) celdas.push({ rotulo: "Valoración en Google", valor: valoracionParte(valoracion), sub: "" });

  return (
    <section id="garantias" aria-labelledby="h2-garantias" className="px-(--pad) py-(--sec)">
      <Encabezado n={n} rotulo="Garantías" titulo="Lo que queda por escrito" id="h2-garantias" />
      <div className="casillas" data-aparecer="corto">
        {celdas.map((c) => (
          <div key={c.rotulo + c.valor} className="casilla flex-[1_1_180px] px-3 py-2.5">
            <div className="rotulo">{c.rotulo}</div>
            <div className="mt-1 leading-snug font-semibold">{c.valor}</div>
            {c.sub && <div className="mt-0.5 font-titulo text-[0.8125rem] text-primario">{c.sub}</div>}
          </div>
        ))}
        {garantias.length > 0 && (
          <div className="casilla flex-[1_1_100%] px-3 py-2.5">
            <div className="rotulo">Garantía</div>
            <ul className="mt-2 mb-0.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-5 gap-y-2.5">
              {garantias.map((g) => (
                <li key={g} className="flex items-start gap-2.5 leading-snug">
                  <CasillaMarcada />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
