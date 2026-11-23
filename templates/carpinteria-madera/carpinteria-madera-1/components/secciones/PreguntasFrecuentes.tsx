import type { Pregunta } from "@andrei-leads/core";

import { TituloSeccion } from "@/components/TituloSeccion";
import { Preguntas } from "@/components/base/Preguntas";

/** «Preguntas» (encargo §6.9) con la pieza `Preguntas` (`<details name>`). Sin preguntas, no existe. */
export function PreguntasFrecuentes({ preguntas }: { preguntas: readonly Pregunta[] }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-preguntas" className="marco seccion">
      <TituloSeccion id="titulo-preguntas">Preguntas</TituloSeccion>
      <Preguntas preguntas={preguntas} />
    </section>
  );
}
