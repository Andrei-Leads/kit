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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada en «Veta» (encargo §8):
 * filetes de 1 px entre preguntas, pregunta en serif y un «+» fino que gira al abrir (globals.css).
 * `<details name>` nativo: sin JavaScript, con teclado y con lector de pantalla, y el texto está en
 * el HTML (Google lo lee). No anima la altura.
 *
 * Tokens: --color-texto, --color-texto-suave, --color-foco (más --color-filete, propio).
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("max-w-[68ch]", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="pregunta border-b border-filete">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3">
            <Titulo className="font-titulo text-pregunta font-normal text-texto">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="mas flex-none text-[28px] leading-none font-light">
              +
            </span>
          </summary>
          <p className="mb-5 text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
