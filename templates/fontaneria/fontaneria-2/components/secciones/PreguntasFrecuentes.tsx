import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { h2Seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  titulo: string;
  id: string;
  grupo: string;
  className?: string;
};

/** Preguntas (encargo §6.8): título a la izquierda (4/12) y tarjetas a la derecha (8/12) en escritorio. */
export function PreguntasFrecuentes({ preguntas, titulo, id, grupo, className }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section
      aria-labelledby={id}
      className={cn("contenedor grid grid-cols-1 items-start gap-x-[clamp(32px,5vw,80px)] gap-y-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]", className)}
    >
      <h2 id={id} className={h2Seccion}>
        {titulo}
      </h2>
      <Preguntas preguntas={preguntas} grupo={grupo} />
    </section>
  );
}
