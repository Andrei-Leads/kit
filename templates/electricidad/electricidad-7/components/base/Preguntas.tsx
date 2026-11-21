import type { Pregunta } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás del mismo grupo. Único por página. */
  grupo?: string;
  /** Nivel del título de cada pregunta dentro de `<summary>` (para el índice de la página). */
  nivel?: "h3" | "h4";
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada en burbujas: la pregunta
 * es una burbuja saliente (derecha) y la respuesta, al abrir, una entrante (izquierda).
 * `<details name>` nativo: sin JavaScript, con teclado y con lector de pantalla, y la respuesta
 * está en el HTML. Sin preguntas, no pinta nada. No anima la altura.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta flex flex-col">
          <summary className="ml-auto flex w-fit max-w-[85%] cursor-pointer list-none items-start gap-3 bg-burbuja-sale px-[18px] py-3 burbuja-sale">
            <Titulo className="m-0 text-base leading-snug font-extrabold text-texto">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="mt-0.5 font-extrabold transition-transform group-open/pregunta:rotate-45">
              +
            </span>
          </summary>
          <p className="m-0 mt-2 w-fit max-w-[85%] border border-linea bg-superficie px-[18px] py-3 leading-normal burbuja-entra">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
