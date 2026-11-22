import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { Rotulo } from "@/components/Rotulo";

type Props = {
  n: string;
  zonas: readonly string[];
  preguntas?: readonly Pregunta[];
};

/** Zonas (lista en mono separada por «·») y, en el inicio, las preguntas frecuentes (encargo §6.8). */
export function ZonasPreguntas({ n, zonas, preguntas = [] }: Props) {
  return (
    <section id="zonas" aria-label={preguntas.length > 0 ? "Zonas y preguntas" : "Zonas"} className="border-t border-borde bg-alterna px-(--pad) py-(--sec)">
      <div className="max-w-[880px]">
        <Rotulo n={n}>{zonas.length > 0 && preguntas.length > 0 ? "Zonas y preguntas" : zonas.length > 0 ? "Zonas" : "Preguntas"}</Rotulo>
        {zonas.length > 0 && (
          <>
            <h2 className="h2-diario mb-5">Dónde trabajamos</h2>
            <p className="mono text-[15px] leading-[1.9] text-texto">{zonas.join(" · ")}</p>
          </>
        )}
        {preguntas.length > 0 && (
          <>
            <h2 className={`h2-diario mb-5 ${zonas.length > 0 ? "mt-16" : ""}`}>Preguntas frecuentes</h2>
            <Preguntas preguntas={preguntas} grupo="faq" />
          </>
        )}
      </div>
    </section>
  );
}
