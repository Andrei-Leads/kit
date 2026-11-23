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
 * Pieza base del registro, reestilada (encargo §8): tarjetas de arcilla (`alterna`) con radio de
 * 24 px y el «+» en un guijarro de `superficie`. `<details name>` nativo: sin JavaScript, con
 * teclado y lector de pantalla, y el texto en el HTML. Sin preguntas, no pinta nada.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta rounded-3xl bg-alterna px-[22px]">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3.5">
            <Titulo className="font-titulo text-[19px] leading-[1.3] font-medium text-pretty">{p.pregunta}</Titulo>
            <span
              aria-hidden="true"
              className="flex h-[30px] w-8 flex-none items-center justify-center rounded-guijarro-1 bg-superficie text-xl transition-transform group-open/pregunta:rotate-45 motion-reduce:transition-none"
            >
              +
            </span>
          </summary>
          <p className="pb-5 text-texto-suave text-pretty">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
