import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

type Props = { preguntas: readonly Pregunta[]; titulo?: string; grupo?: string };

/** Preguntas (tablero Preguntas): título a la izquierda (4/12) y la lista con filetes (8/12). */
export function PreguntasFrecuentes({ preguntas, titulo = "Lo que nos preguntan antes de firmar.", grupo }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-preguntas" className="border-t border-filete">
      <div className="contenedor seccion grid items-start gap-[clamp(24px,4vw,72px)] lg:grid-cols-[4fr_8fr]">
        <div>
          <p className="versalitas mb-3.5">Preguntas</p>
          <h2 id="titulo-preguntas" className="titulo-seccion">
            {titulo}
          </h2>
        </div>
        <Preguntas preguntas={preguntas} grupo={grupo} />
      </div>
    </section>
  );
}
