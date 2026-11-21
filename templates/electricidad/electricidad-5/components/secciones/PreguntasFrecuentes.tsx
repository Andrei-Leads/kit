import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { cn } from "@/lib/utils";

/** Preguntas en tarjetas de 20 px (pieza base reestilada); título a la izquierda en escritorio, o una columna centrada. */
export function PreguntasFrecuentes({
  preguntas,
  titulo = "Preguntas frecuentes",
  grupo = "preguntas",
  centrada,
}: {
  preguntas: readonly Pregunta[];
  titulo?: string;
  grupo?: string;
  /** Una sola columna centrada (ficha de servicio). */
  centrada?: boolean;
}) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby={`titulo-${grupo}`} className="seccion pt-0">
      <div className="contenedor">
        <div className={cn("grid gap-7", centrada ? "mx-auto max-w-[52rem]" : "lg:grid-cols-[1fr_1fr] lg:gap-12")}>
        <h2 id={`titulo-${grupo}`} className="titulo-seccion">
          {titulo}
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} />
        </div>
      </div>
    </section>
  );
}
