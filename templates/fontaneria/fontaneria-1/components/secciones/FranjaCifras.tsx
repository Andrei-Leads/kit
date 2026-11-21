import type { CSSProperties } from "react";
import type { Acreditacion } from "@andrei-leads/core";

import { Cuadrado } from "@/components/Iconos";
import type { Cifra } from "@/lib/cifras";

type Props = {
  cifras: readonly Cifra[];
  acreditaciones: readonly Acreditacion[];
  garantias: readonly string[];
};

/**
 * Franja de confianza con cifras de credibilidad («Con quién hablas»). Cada cifra existe solo con su
 * dato; debajo, las acreditaciones con número en una línea y las garantías con un cuadrado latón.
 * Sin ningún dato, la sección no existe. Las cifras aparecen al hacer scroll (aparecer.css, escalonadas).
 */
export function FranjaCifras({ cifras, acreditaciones, garantias }: Props) {
  const acred = acreditaciones.map((a) => (a.numero ? `${a.nombre}, ${a.numero}` : a.nombre)).join(" · ");
  if (cifras.length === 0 && !acred && garantias.length === 0) return null;
  return (
    <section className="border-t border-borde">
      <div className="contenedor seccion-y flex flex-wrap gap-x-12 gap-y-6">
        <h2 className="condensada flex-[1_1_240px] text-h2">Con quién hablas</h2>
        <div className="min-w-0 flex-[3_1_560px]">
          {cifras.length > 0 && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8">
              {cifras.map((c, i) => (
                <div key={c.antes} data-aparecer style={{ "--i": i } as CSSProperties} className="border-t border-borde pt-3.5 pb-[18px]">
                  <p className="text-sm text-texto-suave">{c.antes}</p>
                  <p className="condensada mt-0.5 text-5xl leading-none tracking-normal text-primario-luz tabular-nums">{c.cifra}</p>
                  {c.despues && <p className="mt-1 text-sm text-texto-suave">{c.despues}</p>}
                </div>
              ))}
            </div>
          )}
          {acred && <p className="mt-5 text-sm leading-normal text-texto-suave">{acred}</p>}
          {garantias.length > 0 && (
            <ul className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-8 gap-y-2.5">
              {garantias.map((g) => (
                <li key={g} className="flex items-baseline gap-3">
                  <Cuadrado />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
