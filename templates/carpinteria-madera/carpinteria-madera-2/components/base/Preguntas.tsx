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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada: tarjetas blancas
 * redondeadas (24 px) con un «+» en círculo alterno que gira al abrir. `<details name>` nativo:
 * sin JavaScript, con teclado y lector de pantalla, y la respuesta siempre en el HTML.
 *
 * Tokens: --color-superficie, --color-alterna, --color-texto-suave, --radius-tarjeta.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta rounded-tarjeta bg-superficie px-[22px]">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-2 [&::-webkit-details-marker]:hidden">
            <Titulo className="text-[17.5px] leading-[1.3] font-bold text-pretty">{p.pregunta}</Titulo>
            <span
              aria-hidden="true"
              className="grid size-8 flex-none place-items-center rounded-full bg-alterna text-xl motion-safe:transition-transform group-open/pregunta:rotate-45"
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
