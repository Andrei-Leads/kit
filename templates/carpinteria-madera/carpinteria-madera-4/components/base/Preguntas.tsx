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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx). Preguntas frecuentes con `<details
 * name>` nativo: sin JavaScript, con teclado y con lector de pantalla, y el texto está en el HTML.
 * «Galería»: líneas negras de 2 px, pregunta en condensada mayúscula y «+» que gira 45° al abrir.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("max-w-[900px] border-t-2 border-borde", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="border-b-2 border-borde">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3.5 [&::-webkit-details-marker]:hidden">
            <Titulo className="ft m-0 text-[1.375rem] leading-none text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="mas ft flex-none text-[1.75rem] leading-none">
              +
            </span>
          </summary>
          <p className="m-0 mb-4 max-w-[60ch] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
