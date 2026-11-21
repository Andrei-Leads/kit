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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx). Preguntas
 * frecuentes con `<details name>` nativo: sin JavaScript, con teclado y con
 * lector de pantalla, y el texto está en el HTML (Google lo lee). Sustituye al
 * `accordion` de shadcn. Sin preguntas, no pinta nada.
 *
 * Reestilada para «Apagón»: «+» en sobre-primario sobre placa primario de 24 px.
 *
 * Tokens: --color-primario, --color-sobre-primario, --color-borde, --color-texto, --color-texto-suave, --color-foco.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("divide-y divide-borde/50 border-y border-borde/50", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 min-h-11 py-4 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foco [&::-webkit-details-marker]:hidden">
            <Titulo className="text-[1.0625rem] font-bold text-texto text-pretty">{p.pregunta}</Titulo>
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-6 flex-none items-center justify-center bg-primario text-lg leading-none font-bold text-sobre-primario motion-safe:transition-transform group-open/pregunta:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-4 text-texto-suave text-pretty">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
