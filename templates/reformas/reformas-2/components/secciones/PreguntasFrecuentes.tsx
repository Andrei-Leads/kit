import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** Preguntas frecuentes: título a la izquierda y `<details name>` a la derecha. Sin datos, nada. */
export function PreguntasFrecuentes({ preguntas, grupo }: { preguntas: readonly Pregunta[]; grupo: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="h2-preguntas" className="seccion">
      <div className="contenedor grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-x-[clamp(32px,5vw,72px)] gap-y-5">
        <h2 id="h2-preguntas" className="h2">
          Preguntas frecuentes
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} />
      </div>
    </section>
  );
}
