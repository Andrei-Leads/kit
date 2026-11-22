import type { Pregunta } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás del mismo grupo. Único por página. */
  grupo?: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada solo con tokens
 * (filetes, título en serif y «+» que gira; globals.css `.pregunta`). `<details name>`
 * nativo: sin JavaScript, con teclado y con el texto en el HTML. La primera, abierta.
 */
export function Preguntas({ preguntas, grupo = "preguntas", className }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <div className={cn("border-b border-filete", className)}>
      {preguntas.map((p, i) => (
        <details key={p.pregunta} name={grupo} open={i === 0} className="pregunta border-t border-filete">
          <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-3">
            <h3 className="font-titulo text-[clamp(1.25rem,1.05rem+0.8vw,1.5rem)] leading-[1.25] font-normal">{p.pregunta}</h3>
          </summary>
          <p className="max-w-[62ch] pb-5 text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
