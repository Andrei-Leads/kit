import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

import { Encabezado } from "./Encabezado";

/** Dudas frecuentes del inicio (encargo §6.8): pieza base `Preguntas` reestilada. Sin preguntas, no existe. */
export function Dudas({ preguntas, n }: { preguntas: readonly Pregunta[]; n: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section id="dudas" aria-labelledby="h2-dudas" className="px-(--pad) pt-(--sec)">
      <Encabezado n={n} rotulo="Dudas" />
      <h2 id="h2-dudas" className="h2-parte mb-4">
        Dudas frecuentes
      </h2>
      <Preguntas preguntas={preguntas} grupo="dudas" />
    </section>
  );
}
