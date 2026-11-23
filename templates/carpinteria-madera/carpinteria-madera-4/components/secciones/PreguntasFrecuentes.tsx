import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** «Preguntas» (encargo §6.9): `<details name>` con línea negra. Sin preguntas, no sale. */
export function PreguntasFrecuentes({ preguntas, grupo = "preguntas" }: { preguntas: readonly Pregunta[]; grupo?: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-preguntas" className="contenedor flex flex-col gap-[18px] pt-(--seccion)">
      <h2 id="titulo-preguntas" className="titulo-h2 m-0">
        Preguntas
      </h2>
      <Preguntas preguntas={preguntas} grupo={grupo} />
    </section>
  );
}
