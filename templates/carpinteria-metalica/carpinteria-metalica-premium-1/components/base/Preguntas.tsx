import type { Pregunta } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás del mismo grupo. Único por página. */
  grupo?: string;
  nivel?: "h3" | "h4";
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada en «Marco»
 * (encargo §8): filetes de 1 px, pregunta en Hanken 400 a 22 px y «+» fino que gira 45°.
 * `<details name>` nativo: sin JavaScript y con el texto en el HTML.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("border-t border-borde", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta border-b border-borde">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 font-titulo text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.25] font-normal text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="pregunta-mas flex-none text-[28px] leading-none font-extralight group-open/pregunta:rotate-45">
              +
            </span>
          </summary>
          <p className="m-0 max-w-[64ch] pb-6 text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
