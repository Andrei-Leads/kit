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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada: tarjetas blancas
 * redondeadas con el «+» en un círculo. Preguntas
 * frecuentes con `<details name>` nativo: sin JavaScript, con teclado y con
 * lector de pantalla, y el texto está en el HTML (Google lo lee). Sustituye al
 * `accordion` de shadcn. Sin preguntas, no pinta nada.
 *
 * Tokens: --color-borde, --color-texto, --color-texto-suave, --color-foco.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta rounded-[20px] border border-borde bg-superficie px-5">
          <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-2 [&::-webkit-details-marker]:hidden">
            <Titulo className="font-titulo text-lg leading-[1.25] font-semibold text-pretty">{p.pregunta}</Titulo>
            <span
              aria-hidden="true"
              className="grid size-[30px] flex-none place-items-center rounded-full bg-alterna text-xl motion-safe:transition-transform group-open/pregunta:rotate-45"
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
