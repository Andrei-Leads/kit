import type { Servicio } from "@andrei-leads/core";

import { h3 } from "@/lib/estilos";
import { FilaServicio } from "./FilaServicio";

/**
 * «Otros servicios» (último bloque de la guía): filas del resto de servicios, sin el que se está
 * leyendo. Con 1 solo servicio la página no la llama.
 */
export function GuiaOtrosServicios({ servicios }: { servicios: Servicio[] }) {
  return (
    <section aria-labelledby="titulo-otros-servicios" className="contenedor py-14 md:py-[88px]">
      <h2 id="titulo-otros-servicios" className={h3}>
        Otros servicios
      </h2>
      <ul className="m-0 mt-5 list-none border-b border-regla p-0">
        {servicios.map((servicio) => (
          <FilaServicio key={servicio.slug} servicio={servicio} />
        ))}
      </ul>
    </section>
  );
}
