import type { Pregunta } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás del mismo grupo. Único por página. */
  grupo?: string;
  /** Nivel del título de cada pregunta dentro de `<summary>` (para el índice de la página). */
  nivel?: "h3" | "h4";
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada para
 * «La furgoneta»: filas separadas por ondas finas (`onda-fina`), pregunta en
 * Fraunces y «+» en una piedra. `<details name>` nativo: sin JavaScript, con
 * teclado y con la respuesta en el HTML. Sin preguntas, no pinta nada.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={className}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta onda-fina">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 font-titulo text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-[1.2] font-normal text-pretty">{p.pregunta}</Titulo>
            <span
              aria-hidden="true"
              className={cn(
                "grid size-9 flex-none place-items-center rounded-piedra-1 bg-superficie font-texto text-xl font-bold",
                "motion-safe:transition-transform group-open/pregunta:rotate-45",
              )}
            >
              +
            </span>
          </summary>
          <p className="m-0 pr-12 pb-6 leading-[1.6]">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
