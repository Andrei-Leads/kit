import type { Pregunta } from "@andrei-leads/core";

import { dosCifras } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás del mismo grupo. Único por página. */
  grupo?: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada (encargo §6.9): filete de
 * tinta arriba, «P.01» en mono y en lápiz, «+» a la derecha. `<details name>` nativo: sin JavaScript
 * y con las respuestas en el HTML. Sin preguntas, no pinta nada.
 */
export function Preguntas({ preguntas, grupo = "preguntas", className }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <div className={cn("max-w-[820px] border-t border-tinta", className)}>
      {preguntas.map((p, i) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta border-b border-borde">
          <summary className="flex min-h-11 cursor-pointer items-baseline gap-4 py-[18px] text-[1.0625rem] font-semibold">
            <span className="min-w-9 font-titulo text-[12.5px] font-normal text-lapiz">P.{dosCifras(i + 1)}</span>
            <span className="flex-1">{p.pregunta}</span>
            <span aria-hidden="true" className="font-titulo transition-transform group-open/pregunta:rotate-45 motion-reduce:transition-none">
              +
            </span>
          </summary>
          <p className="mb-5 max-w-[66ch] pl-[52px] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
