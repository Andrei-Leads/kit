import type { Paso } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/**
 * «Cómo trabajamos» (encargo §6.4): cada paso con su número dentro de un pequeño arco de
 * 48×60 px en barro cocido (24 px, peso 600: texto grande). En escritorio, 3 columnas
 * (4 si son 4 pasos); en móvil, una lista. El arco se abre como una ventana (globals.css).
 */
export function ProcesoArcos({ pasos }: { pasos: readonly Paso[] }) {
  return (
    <section aria-labelledby="titulo-proceso" className="seccion">
      <div className="contenedor">
        <h2 id="titulo-proceso" className="titulo-seccion">
          Cómo trabajamos
        </h2>
        <ol className={cn("m-0 mt-11 grid list-none gap-7 p-0 lg:gap-x-10 lg:gap-y-12", pasos.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex gap-x-5 gap-y-3.5 lg:flex-col">
              <span
                aria-hidden="true"
                className="numero-arco grid h-[60px] w-12 flex-none origin-bottom place-items-center rounded-[24px_24px_6px_6px] bg-acento pt-2 text-2xl font-semibold text-superficie"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="remate m-0 mb-1 text-xl leading-snug">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {p.titulo}
                </h3>
                <p className="m-0 text-texto-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
