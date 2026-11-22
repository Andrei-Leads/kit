import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** Título a la izquierda y las preguntas (`<details name>`) a la derecha. Sin preguntas, no sale. */
export function PreguntasFrecuentes({ preguntas, titulo = "Preguntas frecuentes", grupo }: { preguntas: readonly Pregunta[]; titulo?: string; grupo?: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-preguntas" className="seccion">
      <div className="contenedor grid gap-x-16 gap-y-6 lg:grid-cols-2">
        <h2 id="titulo-preguntas" className="titulo-seccion">
          {titulo}
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} />
      </div>
    </section>
  );
}
