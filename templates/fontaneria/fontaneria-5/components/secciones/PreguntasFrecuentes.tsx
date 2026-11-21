import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** Preguntas frecuentes del inicio: título a la izquierda (4/12) y la lista a la derecha en escritorio. */
export function PreguntasFrecuentes({ preguntas }: { preguntas: readonly Pregunta[] }) {
  if (preguntas.length === 0) return null;
  return (
    <section className="contenedor grid items-start pt-8 pb-6 lg:grid-cols-[4fr_8fr] lg:gap-12 lg:pt-14 lg:pb-10">
      <h2 className="m-0 mb-3.5 font-titulo text-h2 leading-[1.1] font-bold tracking-[-0.02em] lg:mb-0">Preguntas frecuentes</h2>
      <Preguntas preguntas={preguntas} grupo="faq" primeraAbierta />
    </section>
  );
}
