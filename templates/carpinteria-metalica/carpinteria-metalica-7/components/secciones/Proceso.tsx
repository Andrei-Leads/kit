import type { Paso } from "@andrei-leads/core";

import { numero } from "@/lib/textos";
import { cn } from "@/lib/utils";

/**
 * Proceso (encargo §6): banda diagonal de hierro con los pasos numerados en condensada gigante
 * (contorno de acento), en vertical en móvil y en horizontal desde 1024 px (3 columnas con más de
 * 4 pasos). Sin `proceso`, los pasos por defecto de core (tipo proyecto). La banda entra de lado
 * con `animation-timeline: view()` ([data-banda] en globals.css).
 */
export function Proceso({ pasos }: { pasos: readonly Paso[] }) {
  const columnas = pasos.length > 4 ? "lg:grid-cols-3" : ["", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"][pasos.length];
  return (
    <section data-banda aria-labelledby="titulo-proceso" className="hierro banda-doble py-[calc(var(--diagonal)+28px)]">
      <div className="contenedor">
        <h2 id="titulo-proceso" className="h2">
          Cómo trabajamos
        </h2>
        <ol className={cn("mt-6 grid gap-x-7 gap-y-[18px]", columnas)}>
          {pasos.map((p, i) => (
            <li key={p.titulo} className="grid grid-cols-[64px_1fr] items-start gap-x-4 gap-y-1 border-t border-borde pt-3.5 lg:grid-cols-1">
              <span aria-hidden="true" className="contorno-acento font-titulo text-[60px] leading-[0.85] font-extrabold lg:text-[112px]">
                {numero(i)}
              </span>
              <div>
                <h3 className="font-titulo text-2xl leading-none font-extrabold text-balance uppercase">{p.titulo}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.45] text-pretty text-texto-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
