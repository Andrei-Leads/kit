import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  titulo?: string;
  id?: string;
  grupo?: string;
  className?: string;
};

/** Preguntas frecuentes (encargo §6.7) con la pieza base reestilada. Sin preguntas, nada. */
export function PreguntasFrecuentes({ preguntas, titulo = "Preguntas frecuentes", id = "titulo-preguntas", grupo, className }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby={id} className={cn("bg-fondo", className)}>
      <div className="contenedor flex flex-col gap-6 py-9 lg:py-13">
        <h2 id={id} className="titulo-h2 m-0">
          {titulo}
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} className="max-w-4xl" />
      </div>
    </section>
  );
}
