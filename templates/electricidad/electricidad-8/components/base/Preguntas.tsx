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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada con filetes de 1 px y la
 * pregunta en la serif (encargo §6, sección 9). `<details name>` nativo: sin JavaScript y con el
 * texto en el HTML.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("divide-y divide-linea-plano border-t border-texto border-b border-b-linea-plano", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foco [&::-webkit-details-marker]:hidden">
            <Titulo className="font-titulo text-[1.1875rem] leading-snug font-normal text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="text-xl leading-none text-texto-suave group-open/pregunta:rotate-45 motion-safe:transition-transform">
              +
            </span>
          </summary>
          <p className="max-w-[66ch] pb-5 text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
