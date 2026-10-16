import type { Trabajo } from "@andrei-leads/core";

import { TrabajoTarjeta } from "@/components/secciones/TrabajoTarjeta";
import { h2 } from "@/lib/estilos";
import { cn } from "@/lib/utils";

/** «Otros trabajos» (Pantalla, `trab`): las mismas tarjetas de /trabajos, 2 columnas en móvil y 3 en escritorio. */
export function TrabajoOtros({ trabajos }: { trabajos: Trabajo[] }) {
  if (trabajos.length === 0) return null;
  return (
    <section aria-labelledby="titulo-otros-trabajos" className="contenedor pt-11 pb-11 lg:pt-16 lg:pb-16">
      <h2 id="titulo-otros-trabajos" className={cn(h2, "mb-4")}>
        Otros trabajos
      </h2>
      <ul className="m-0 grid list-none grid-cols-2 gap-x-2.5 gap-y-[18px] p-0 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-8">
        {trabajos.map((t) => (
          <TrabajoTarjeta key={t.slug} trabajo={t} />
        ))}
      </ul>
    </section>
  );
}
