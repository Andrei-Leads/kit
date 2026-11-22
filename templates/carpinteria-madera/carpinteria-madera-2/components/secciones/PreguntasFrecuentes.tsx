import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

type Props = { preguntas: readonly Pregunta[]; titulo?: string; grupo: string };

/** Preguntas frecuentes (encargo §6.10): `<details name>` redondeados. Sin preguntas, no existe. */
export function PreguntasFrecuentes({ preguntas, titulo = "Preguntas frecuentes", grupo }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby={`h2-${grupo}`} className="px-[clamp(20px,4vw,40px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(64px,9vw,120px)]">
      <div className="mx-auto flex max-w-[820px] flex-col gap-3.5">
        <h2 id={`h2-${grupo}`} className="h2 mb-2.5">
          {titulo}
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} />
      </div>
    </section>
  );
}
