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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada en
 * «Caudal» (encargo §6.10): filas de 1 px y un «+» fino en Inter Tight que gira
 * 45°. `<details name>` nativo: sin JavaScript, con teclado y lector de pantalla.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("border-b border-borde", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="border-t border-borde py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-2 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 text-[17px] leading-[1.35] font-normal">{p.pregunta}</Titulo>
            <span aria-hidden="true" className="mas titulo flex-none text-[28px] leading-none">
              +
            </span>
          </summary>
          <p className="m-0 max-w-[60ch] pb-[18px] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
