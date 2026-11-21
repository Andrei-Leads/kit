import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

export function PreguntasFrecuentes({ preguntas, titulo = "Preguntas frecuentes", grupo = "faq" }: { preguntas: readonly Pregunta[]; titulo?: string; grupo?: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby={`h-${grupo}`} className="contenedor pt-[clamp(48px,2.5rem+3vw,96px)]">
      <div className="flex flex-wrap gap-x-[clamp(32px,6vw,96px)] gap-y-4">
        <h2 id={`h-${grupo}`} className="m-0 flex-[1_1_260px] text-h2 leading-[1.1] font-black">
          {titulo}
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} className="min-w-0 flex-[2_1_340px]" />
      </div>
    </section>
  );
}
