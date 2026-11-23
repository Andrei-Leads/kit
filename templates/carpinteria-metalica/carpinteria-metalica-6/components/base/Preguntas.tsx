import type { Pregunta } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás del mismo grupo. Único por página. */
  grupo?: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada en «Fachada nueva»
 * (encargo §8): tarjetas blancas redondeadas con un «+» en un círculo primario que gira al abrir
 * (globals.css `.pregunta`). `<details name>` nativo: sin JavaScript, con teclado y con la
 * respuesta en el HTML.
 */
export function Preguntas({ preguntas, grupo = "preguntas", className }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="pregunta rounded-tarjeta border border-borde bg-superficie">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-2.5 pr-3.5 pl-5">
            <h3 className="text-[17px] leading-[1.35] font-bold">{p.pregunta}</h3>
            <span
              aria-hidden="true"
              className="mas flex size-8 flex-none items-center justify-center rounded-full bg-primario text-xl leading-none font-bold text-sobre-primario"
            >
              +
            </span>
          </summary>
          <p className="px-5 pb-[18px] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
