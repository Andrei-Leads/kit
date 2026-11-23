import type { Pregunta } from "@andrei-leads/core";

import { dosCifras } from "@/lib/textos";
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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada (encargo §8): cada
 * pregunta numerada «P.01» y el marcador `+` dibujado como cruz de replanteo (gira 45° al abrir).
 * `<details name>` nativo: sin JavaScript, con teclado y lector de pantalla, y la respuesta está
 * en el HTML. Sin preguntas, no pinta nada.
 *
 * Tokens: --color-texto, --color-texto-suave, --font-titulo, --color-foco.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("max-w-[820px] border-t border-texto", className)}>
      {preguntas.map((p, i) => (
        <details key={p.pregunta} name={grupo} className="border-b border-texto">
          <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[52px_minmax(0,1fr)_24px] items-center gap-3 py-3.5">
            <span className="etiqueta">P.{dosCifras(i + 1)}</span>
            <Titulo className="font-titulo text-base leading-[1.4] font-medium text-pretty">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="cruz-replanteo relative size-6">
              <span className="absolute inset-x-0 top-[11.5px] h-px bg-texto" />
              <span className="absolute inset-y-0 left-[11.5px] w-px bg-texto" />
              <span className="absolute top-[7px] left-[7px] size-2.5 rounded-full border border-texto" />
            </span>
          </summary>
          <p className="pr-9 pb-[18px] pl-16 text-texto-suave text-pretty">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
