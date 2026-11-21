import type { Paso } from "@andrei-leads/core";

import { piedra } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** «Cómo trabajamos»: piedras en fila (en móvil, en columna) con el número en Fraunces cursiva de 5 rem. */
export function ComoTrabajamos({ pasos }: { pasos: readonly Paso[] }) {
  return (
    <section aria-labelledby="titulo-proceso" className="seccion">
      <div className="contenedor">
        <h2 id="titulo-proceso" className="titulo-seccion">
          Cómo trabajamos
        </h2>
        <ol className="m-0 mt-[clamp(1.5rem,1rem+2vw,3rem)] grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-[clamp(0.75rem,0.5rem+1vw,1.25rem)] p-0">
          {pasos.map((p, i) => (
            <li key={p.titulo} data-piedra className={cn("flex flex-col gap-2 bg-superficie p-[clamp(1.5rem,1.2rem+1.4vw,2.5rem)]", piedra(i + 1))}>
              <span aria-hidden="true" className="font-titulo text-[5rem] leading-[0.85] font-normal text-primario-texto italic">
                {i + 1}
              </span>
              <h3 className="m-0 mt-2 font-titulo text-[clamp(1.375rem,1.2rem+0.8vw,1.875rem)] leading-[1.1] font-medium">{p.titulo}</h3>
              <p className="m-0 leading-normal">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
