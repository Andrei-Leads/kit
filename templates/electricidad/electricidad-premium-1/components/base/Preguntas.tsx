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
 * Reestilada para «Tensión»: filetes de 1 px y «+» en acento que gira 45°.
 * Tokens: --color-texto, --color-texto-suave, --color-acento.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("divide-y divide-[var(--color-linea)] border-y border-[var(--color-linea)]", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta">
          <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 font-titulo text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-snug font-normal text-texto text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="mt-0.5 text-2xl leading-none font-light text-acento transition-transform duration-500 ease-salida group-open/pregunta:rotate-45 motion-reduce:transition-none">
              +
            </span>
          </summary>
          <p className="m-0 max-w-[62ch] pb-6 text-texto-suave text-pretty">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
