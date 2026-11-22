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
 * «Obra con nombre»: filetes de 2 px y marcador «+» condensado en primario (gira 45° al abrir).
 * Tokens: --color-borde, --color-texto, --color-texto-suave, --color-foco.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("max-w-[960px] border-t-2 border-borde", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="border-b-2 border-borde">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 text-[17px] leading-[1.3] font-semibold text-texto text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="mas condensada flex-none text-[32px] leading-[0.8] text-primario">
              +
            </span>
          </summary>
          <p className="m-0 mb-4 max-w-[68ch] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
