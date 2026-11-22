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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), tal cual salvo el aspecto:
 * filete de borde arriba, resumen de 64 px y un «+» en un círculo de arcilla.
 * `<details name>` nativo: sin JavaScript, con teclado y con lector de pantalla.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("border-b border-borde", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta border-t border-borde">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 text-lg leading-snug font-medium">{p.pregunta}</Titulo>
            <span
              aria-hidden="true"
              className="grid size-8 flex-none place-items-center rounded-full bg-alterna text-xl leading-none transition-transform group-open/pregunta:rotate-45 motion-reduce:transition-none"
            >
              +
            </span>
          </summary>
          <p className="m-0 mb-5 max-w-[60ch] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
