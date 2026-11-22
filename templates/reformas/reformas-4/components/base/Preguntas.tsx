import type { Pregunta } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás. Único por página. */
  grupo?: string;
  nivel?: "h3" | "h4";
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada: pregunta en mono de 15 px
 * con «+» latón y respuesta en la sans a 65 caracteres. `<details name>` nativo, sin JavaScript.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("border-t border-borde", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta border-b border-borde">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3.5">
            <Titulo className="mono text-[15px] leading-snug font-normal text-texto">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="flex-none text-primario-claro transition-transform group-open/pregunta:rotate-45 motion-reduce:transition-none">
              +
            </span>
          </summary>
          <p className="max-w-[65ch] pb-5 text-[17px] leading-[1.65] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
