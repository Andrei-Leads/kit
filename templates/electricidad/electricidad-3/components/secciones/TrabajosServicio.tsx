import type { Trabajo } from "@andrei-leads/core";

import { TarjetaTrabajoMini } from "@/components/secciones/TarjetaTrabajoMini";
import { h2 } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  /** Trabajos del servicio (`trabajosDelServicio`). Vacío: no se pinta. */
  trabajos: Trabajo[];
  className?: string;
};

/** «Trabajos de este servicio»: rejilla de 2 columnas en móvil y 3 en escritorio con las tarjetas mini. */
export function TrabajosServicio({ trabajos, className }: Props) {
  if (trabajos.length === 0) return null;
  return (
    <section aria-labelledby="trabajos-servicio-titulo" className={cn("pt-11 lg:pt-16", className)}>
      <h2 id="trabajos-servicio-titulo" className={cn(h2, "mb-4")}>
        Trabajos de este servicio
      </h2>
      <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 lg:grid-cols-3 lg:gap-4">
        {trabajos.map((t) => (
          <li key={t.slug}>
            <TarjetaTrabajoMini trabajo={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}
