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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada en «Oficio»
 * (encargo §8.5): filetes de 1 px, pregunta en Newsreader 300 y «+» que gira 45°.
 * `<details name>` nativo: sin JavaScript y con el texto en el HTML.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("border-b border-borde", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="border-t border-borde">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <Titulo className="titulo text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-[1.25]">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="mas font-texto text-[22px] leading-none">
              +
            </span>
          </summary>
          <p className="max-w-[56ch] pb-6 text-base leading-[1.6] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
