import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** Preguntas frecuentes: título a la izquierda y la pieza base `Preguntas` reestilada. Sin preguntas, no existe. */
export function PreguntasFrecuentes({ preguntas, titulo = "Preguntas frecuentes", grupo = "faq" }: { preguntas: readonly Pregunta[]; titulo?: string; grupo?: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section className="border-t border-borde">
      <div className="contenedor flex flex-wrap gap-x-12 gap-y-5 py-[clamp(40px,6vw,96px)]">
        <h2 className="condensada flex-[1_1_240px] text-h2">{titulo}</h2>
        <Preguntas preguntas={preguntas} grupo={grupo} className="min-w-0 flex-[3_1_560px]" />
      </div>
    </section>
  );
}
