import type { SiteConfig } from "@andrei-leads/core";

import { TituloLineas } from "@/components/TituloLineas";
import { Cifras } from "@/components/secciones/Cifras";

type Props = Pick<SiteConfig, "negocio" | "valoracion" | "zonas">;

/** Lema (encargo §6.3): oscuro, «Que entre la *luz*.» en display, `descripcionCorta` en 480 px y las cifras clave. */
export function Lema({ negocio, valoracion, zonas }: Props) {
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-lema" className="seccion bg-tinta text-sobre-tinta">
      <div className="contenedor">
        <TituloLineas id="titulo-lema" lineas={[<>Que entre la <em>luz</em>.</>]} className="titulo-display" />
        <p className="m-0 mt-8 col-texto text-sobre-tinta-suave" data-aparecer>
          {negocio.descripcionCorta}
        </p>
        <Cifras negocio={negocio} valoracion={valoracion} zonas={zonas} className="mt-[clamp(3rem,2rem+3vw,5rem)]" />
      </div>
    </section>
  );
}
