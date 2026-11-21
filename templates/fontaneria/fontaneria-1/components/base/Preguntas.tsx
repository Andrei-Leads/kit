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
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada para «Qué te pasa»: filas
 * rectas en condensada con filete superior de 3 px y «+» latón que gira 45° (150 ms; sin giro con
 * «reducir movimiento»). `<details name>` nativo: sin JavaScript, con teclado y con el texto en el HTML.
 * La altura no se anima.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("border-t-3 border-primario-luz", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta border-b border-borde">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-2.5">
            <Titulo className="condensada text-[1.3125rem] leading-[1.15] font-bold text-pretty">{p.pregunta}</Titulo>
            <span
              aria-hidden="true"
              className="flex-none text-[1.75rem] leading-none text-primario-luz motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-open/pregunta:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mb-[18px] max-w-[65ch] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
