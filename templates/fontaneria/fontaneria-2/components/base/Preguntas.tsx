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
 * Reestilada en fontaneria-2 (encargo §6.8): cada pregunta es una tarjeta
 * blanca de radio 16 px con borde y chevrón que gira al abrir (sin animar la altura).
 *
 * Tokens: --color-fondo, --color-borde, --color-texto, --color-texto-suave, --color-foco.
 */
export function Preguntas({ preguntas, grupo = "preguntas", nivel = "h3", className }: Props) {
  if (preguntas.length === 0) return null;
  const Titulo = nivel;
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {preguntas.map((p) => (
        <details key={p.pregunta} name={grupo} className="group/pregunta rounded-pregunta border border-borde bg-fondo">
          <summary className="foco flex min-h-15 cursor-pointer list-none items-center justify-between gap-4 rounded-pregunta px-5 py-3.5 [&::-webkit-details-marker]:hidden">
            <Titulo className="m-0 text-cuerpo leading-snug font-bold text-texto">{p.pregunta}</Titulo>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="flex-none transition-transform duration-200 group-open/pregunta:rotate-180 motion-reduce:transition-none"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <p className="m-0 px-5 pb-4.5 leading-[1.6] text-texto-suave">{p.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
