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
 * Reestilada en «Casa al día»: cada pregunta en tarjeta de 20 px y la primera
 * abierta.
 *
 * Tokens: --color-borde, --color-texto, --color-texto-suave, --color-foco.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {preguntas.map((p, i) => (
        <details key={p.pregunta} name={grupo} open={i === 0} className="group/pregunta rounded-[20px] bg-superficie">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-[20px] px-5 py-3 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 text-[1.0625rem] leading-snug font-bold text-texto text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-full bg-primario-suave text-xl leading-none text-texto motion-safe:transition-transform group-open/pregunta:rotate-45">
              +
            </span>
          </summary>
          <p className="m-0 px-5 pb-5 text-texto-suave text-pretty">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
