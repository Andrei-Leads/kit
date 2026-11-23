import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { TituloSeccion } from "@/components/TituloSeccion";

/** «Preguntas que nos hacen» (encargo §6.9): `<details name>` con el número de pregunta en mono. */
export function PreguntasFrecuentes({ n, preguntas }: { n: string; preguntas: readonly Pregunta[] }) {
  return (
    <section id="preguntas" aria-labelledby="h2-preguntas" className="pt-(--sec)">
      <TituloSeccion n={n} id="h2-preguntas" className="mb-6">
        Preguntas que nos hacen
      </TituloSeccion>
      <Preguntas preguntas={preguntas} grupo="faq-inicio" />
    </section>
  );
}
