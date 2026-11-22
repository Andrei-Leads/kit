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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), tal cual con los
 * tokens de «Estancia»: filetes de 1 px y «+» que gira. `<details name>` nativo:
 * sin JavaScript, con teclado y lector de pantalla, y el texto en el HTML.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("border-t border-borde", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta border-b border-borde">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 text-[19px] leading-snug font-normal text-texto">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="text-2xl leading-none font-light text-texto-suave motion-safe:transition-transform group-open/pregunta:rotate-45">
              +
            </span>
          </summary>
          <p className="m-0 max-w-[60ch] pb-5 text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
