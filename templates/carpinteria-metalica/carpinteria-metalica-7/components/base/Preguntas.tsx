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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada para «Forja»: cada
 * pregunta es una fila de hierro (`.hierro`) con la esquina cortada y un rombo de acento.
 * `<details name>` nativo: sin JavaScript y con las respuestas en el HTML.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("grid gap-1.5", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="hierro [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]">
          <summary className="flex min-h-14 cursor-pointer items-center gap-3.5 px-[18px] py-3 focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-acento">
            <span aria-hidden="true" className="rombo bg-acento" />
            <Titulo className="font-titulo text-[21px] leading-[1.05] font-extrabold text-balance uppercase">{p.pregunta}</Titulo>
          </summary>
          <p className="pr-[18px] pb-[18px] pl-[41px] text-[15.5px] leading-normal text-pretty text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
