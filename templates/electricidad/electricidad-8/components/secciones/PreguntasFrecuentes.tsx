import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { H2, Rotulo } from "@/components/Rotulo";
import { cn } from "@/lib/utils";

/** `Preguntas` (encargo §6.9): pieza base reestilada con filetes. Sin preguntas, no existe. */
export function PreguntasFrecuentes({ preguntas, n, grupo = "preguntas" }: { preguntas: readonly Pregunta[]; n: string; grupo?: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby={`h2-${grupo}`} className="contenedor py-14 lg:py-20">
      <Rotulo n={n} texto="Preguntas" />
      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        <h2 id={`h2-${grupo}`} className={cn(H2, "lg:col-span-4")}>
          Preguntas frecuentes
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} className="lg:col-span-8" />
      </div>
    </section>
  );
}
