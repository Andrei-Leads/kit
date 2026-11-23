import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** Preguntas (encargo §6): título a la izquierda (4/12) y filas de hierro. Sin preguntas, no se pinta. */
export function PreguntasFrecuentes({ preguntas, grupo }: { preguntas: readonly Pregunta[]; grupo: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-preguntas" className="py-[clamp(36px,5vw,72px)]">
      <div className="contenedor grid gap-x-8 gap-y-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <h2 id="titulo-preguntas" className="h2">
          Preguntas
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} />
      </div>
    </section>
  );
}
