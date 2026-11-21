import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** Preguntas frecuentes (encargo §6.8): pieza base reestilada; respuestas siempre en el HTML. */
export function PreguntasFrecuentes({ preguntas, grupo = "preguntas" }: { preguntas: readonly Pregunta[]; grupo?: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby={`h2-${grupo}`} className="contenedor pt-[clamp(40px,6vw,72px)]">
      <h2 id={`h2-${grupo}`} className="h2 mb-3">
        Preguntas frecuentes
      </h2>
      <Preguntas preguntas={preguntas} grupo={grupo} className="max-w-[820px]" />
    </section>
  );
}
