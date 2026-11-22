import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

type Props = { preguntas: readonly Pregunta[]; grupo?: string };

/** «Preguntas *frecuentes*» (encargo §6.9): título a la izquierda y `<details name>` a la derecha. */
export function PreguntasFrecuentes({ preguntas, grupo }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-preguntas" className="contenedor seccion flex flex-wrap gap-x-[clamp(40px,6vw,112px)] gap-y-8">
      <h2 id="titulo-preguntas" className="titulo-h2 flex-[1_1_260px]">
        Preguntas <em>frecuentes</em>
      </h2>
      <Preguntas preguntas={preguntas} grupo={grupo} className="flex-[2_1_480px]" />
    </section>
  );
}
