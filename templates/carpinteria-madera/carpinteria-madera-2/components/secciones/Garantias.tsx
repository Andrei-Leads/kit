import type { Acreditacion } from "@andrei-leads/core";

import { Check } from "@/components/Iconos";

type Props = {
  garantias: readonly string[];
  acreditaciones?: readonly Acreditacion[];
  marcas: readonly string[];
};

/**
 * Garantías, acreditaciones y marcas (encargo §6.6) sobre el tinte alterno: píldoras blancas con
 * check. Cada lista se oculta por separado; sin ninguna, el bloque no existe.
 */
export function Garantias({ garantias, acreditaciones = [], marcas }: Props) {
  if (garantias.length === 0 && acreditaciones.length === 0 && marcas.length === 0) return null;
  return (
    <section aria-labelledby="h2-garantias" className="bg-alterna py-[clamp(56px,8vw,104px)]">
      <div className="contenedor flex flex-col gap-7">
        <h2 id="h2-garantias" className="h2">
          Nuestras garantías
        </h2>
        {(garantias.length > 0 || acreditaciones.length > 0) && (
          <ul className="flex flex-wrap gap-3">
            {garantias.map((g) => (
              <li key={g} className="pildora-check bg-superficie text-[16.5px]">
                <Check />
                {g}
              </li>
            ))}
            {acreditaciones.map((a) => (
              <li key={a.nombre} className="pildora-check bg-superficie text-[16.5px]">
                <Check />
                <span>
                  {a.nombre}
                  {a.numero && <span className="font-normal text-texto-suave"> · n.º {a.numero}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
        {marcas.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 text-[15.5px] text-texto-suave">
            <p>Trabajamos con</p>
            <ul className="flex flex-wrap gap-2.5">
              {marcas.map((m) => (
                <li key={m} className="rounded-full border border-borde bg-superficie px-4 py-1.5 font-bold text-texto">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
