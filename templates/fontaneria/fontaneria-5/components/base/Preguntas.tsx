import type { Pregunta } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  preguntas: readonly Pregunta[];
  /** Grupo de `<details name>`: abrir una cierra las demás del mismo grupo. Único por página. */
  grupo?: string;
  nivel?: "h3" | "h4";
  /** La primera abierta (inicio). */
  primeraAbierta?: boolean;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/Preguntas.tsx), reestilada para «Llegamos» con
 * separadores rayados en diagonal. `<details name>` nativo: sin JavaScript, con teclado y con
 * lector de pantalla; las respuestas están en el HTML. No se anima la altura.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", primeraAbierta, className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("text-tinta", className)}>
      {preguntas.map((p, i) => (
        <div key={p.pregunta}>
          <div aria-hidden="true" className="rayado" />
          <details name={grupo} open={primeraAbierta && i === 0 ? true : undefined} className="group/pregunta">
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 py-2 lg:min-h-[60px]">
              <Titulo className="m-0 font-titulo text-[17px] leading-[1.25] font-semibold text-texto lg:text-xl">{p.pregunta}</Titulo>
              <span
                aria-hidden="true"
                className="flex-none font-titulo text-2xl leading-none font-medium transition-transform group-open/pregunta:rotate-45 lg:text-[28px]"
              >
                +
              </span>
            </summary>
            <p className="m-0 mb-3.5 max-w-[62ch] text-texto-suave lg:mb-[18px]">{p.respuesta}</p>
          </details>
        </div>
      ))}
      <div aria-hidden="true" className="rayado" />
    </div>
  );
}
