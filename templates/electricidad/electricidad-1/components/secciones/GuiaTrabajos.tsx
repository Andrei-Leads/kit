import type { Trabajo } from "@andrei-leads/core";

import { Regla } from "@/components/Regla";
import { h2, seccionPlana } from "@/lib/estilos";
import { cn } from "@/lib/utils";
import { TarjetaTrabajoMini } from "./TarjetaTrabajoMini";

/**
 * Trabajos de este servicio (`trabajos[].servicio === slug`): rejilla de tarjetas sencillas
 * (1 columna en móvil, 3 en escritorio). La página solo la llama si hay alguno.
 */
export function GuiaTrabajos({ numero, id, trabajos }: { numero: string; id: string; trabajos: Trabajo[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={seccionPlana}>
      <Regla numero={numero} etiqueta="Trabajos" />
      <h2 id={`${id}-titulo`} className={cn(h2, "mt-4")}>
        Trabajos
      </h2>
      <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
        {trabajos.map((trabajo) => (
          <li key={trabajo.slug}>
            <TarjetaTrabajoMini
              trabajo={trabajo}
              sizes="(min-width: 1200px) 368px, (min-width: 768px) 30vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
