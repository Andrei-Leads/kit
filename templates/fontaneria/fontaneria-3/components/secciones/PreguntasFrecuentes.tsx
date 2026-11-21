import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** Preguntas frecuentes en columna de 860 px. Sin preguntas, no existe. */
export function PreguntasFrecuentes({ preguntas, titulo = "Preguntas frecuentes" }: { preguntas: readonly Pregunta[]; titulo?: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-preguntas" className="seccion">
      <div className="contenedor">
        <div className="max-w-[860px]">
          <h2 id="titulo-preguntas" className="titulo-seccion mb-[clamp(1.25rem,1rem+1vw,2rem)]">
            {titulo}
          </h2>
          <Preguntas preguntas={preguntas} />
        </div>
      </div>
    </section>
  );
}
