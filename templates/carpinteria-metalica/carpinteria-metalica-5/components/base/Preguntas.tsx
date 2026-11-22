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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada en «Perfil» (encargo
 * §8): filete anodizado arriba, separadores en `borde`, pregunta en serif de 22 px y marcador
 * de filete (una cruz de 1 px) que gira 45° al abrir. `<details name>` nativo: sin JavaScript
 * y con las respuestas en el HTML.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("border-t border-anodizado", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta border-b border-borde">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-[22px] [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 font-titulo text-[22px] leading-[1.3] font-normal text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="pregunta-marca relative size-4 flex-none group-open/pregunta:rotate-45">
              <span className="absolute inset-x-0 top-[7.5px] h-px bg-anodizado" />
              <span className="absolute inset-y-0 left-[7.5px] w-px bg-anodizado" />
            </span>
          </summary>
          <p className="m-0 max-w-[60ch] pb-6 text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
