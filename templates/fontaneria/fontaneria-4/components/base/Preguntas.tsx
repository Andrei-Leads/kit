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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada como «Dudas frecuentes»
 * con numeración mono 01, 02… (encargo §6). `<details name>` nativo: sin JavaScript, y las
 * respuestas cerradas siguen en el HTML. No anima la altura.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("max-w-[760px] border-t border-texto", className)}>
      {preguntas.map((p, i) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta border-b border-borde">
          <summary className="flex min-h-11 cursor-pointer items-baseline gap-3.5 py-3.5">
            <span className="flex-none font-titulo text-[0.8125rem] font-bold text-primario">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Titulo className="flex-1 text-[1.0625rem] leading-snug font-semibold">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="font-titulo text-texto-suave group-open/pregunta:hidden">
              +
            </span>
            <span aria-hidden="true" className="hidden font-titulo text-texto-suave group-open/pregunta:inline">
              −
            </span>
          </summary>
          <p className="mb-4 ml-[38px] max-w-[62ch] text-base leading-relaxed">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
