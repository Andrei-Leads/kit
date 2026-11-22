import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** «Preguntas» con `<details name>` (pieza base). Sin preguntas, no sale. */
export function PreguntasFrecuentes({ preguntas, grupo = "preguntas" }: { preguntas: readonly Pregunta[]; grupo?: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby={`titulo-${grupo}`} className="contenedor pt-(--seccion)">
      <h2 id={`titulo-${grupo}`} className="titulo-h2 m-0 mb-4">
        Preguntas
      </h2>
      <Preguntas preguntas={preguntas} grupo={grupo} />
    </section>
  );
}
