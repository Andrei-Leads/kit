import type { Pregunta } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás del mismo grupo. Único por página. */
  grupo?: string;
  /** Nivel del título de cada pregunta dentro de `<summary>`. */
  nivel?: "h3" | "h4";
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada en «Restauración»:
 * cada pregunta es una tarjeta de esquinas orgánicas (`rounded-pregunta`) con el «+» en un
 * círculo que gira al abrir (globals.css). `<details name>` nativo: sin JavaScript, con teclado
 * y con lector de pantalla, y el texto está en el HTML (Google lo lee). No anima la altura.
 *
 * Tokens: --color-superficie, --color-borde, --color-texto, --color-texto-suave, --color-foco.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="pregunta rounded-pregunta border border-borde bg-superficie">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-pregunta px-5 py-3.5">
            <Titulo className="text-base font-semibold text-texto text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="mas flex size-8 flex-none items-center justify-center rounded-full border-[1.5px] border-borde">
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
