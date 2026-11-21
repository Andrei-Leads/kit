import type { Acreditacion, SiteConfig } from "@andrei-leads/core";
import { mediaVisible } from "@andrei-leads/core";

import { acreditacionLinea, aniosOficio } from "@/lib/formato";

/**
 * Franja de confianza («placa», encargo §6.2): filas grabadas (habilitación con número, años en el
 * oficio, valoración) y garantías con un cuadradito primario. Se recompone con lo que haya; sin
 * nada, desaparece.
 */
export function Confianza({
  anioFundacion,
  anio,
  acreditaciones,
  garantias,
  valoracion,
}: {
  anioFundacion?: number;
  anio: number;
  acreditaciones: readonly Acreditacion[];
  garantias: readonly string[];
  valoracion?: SiteConfig["valoracion"];
}) {
  const filas = [
    ...acreditaciones.map((a) => ({ k: "Habilitación", v: acreditacionLinea(a) })),
    ...(anioFundacion ? [{ k: "En el oficio", v: aniosOficio(anioFundacion, anio) }] : []),
    ...(valoracion ? [{ k: "Valoración", v: `${mediaVisible(valoracion.media)} de 5 · ${valoracion.total} reseñas en Google` }] : []),
  ];
  if (filas.length === 0 && garantias.length === 0) return null;
  return (
    <section aria-labelledby="h2-confianza" className="border-y border-carril bg-superficie">
      <div className="contenedor grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(20px,4vw,48px)] py-[clamp(32px,5vw,56px)]">
        <div>
          <h2 id="h2-confianza" className="h2 mb-3.5">
            {acreditaciones.length > 0 ? (garantias.length > 0 ? "Garantías y habilitación" : "Habilitación") : "Por qué fiarte"}
          </h2>
          {filas.length > 0 && (
            <dl className="border-b border-carril">
              {filas.map((f) => (
                <div key={f.k + f.v} className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-t border-carril py-2.5">
                  <dt className="rotulo pt-[3px]">{f.k}</dt>
                  <dd className="cifras text-[17px]">{f.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {garantias.length > 0 && (
          <ul className="self-end border-b border-carril">
            {garantias.map((g) => (
              <li key={g} className="flex items-center gap-3 border-t border-carril py-3 text-lg font-medium">
                <span aria-hidden="true" className="size-3 flex-none bg-primario" />
                {g}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
