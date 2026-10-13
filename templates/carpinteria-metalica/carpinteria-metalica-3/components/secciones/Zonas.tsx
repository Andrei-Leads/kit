import { BotonLlamada } from "@andrei-leads/core";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { h2Seccion, seccion } from "@/lib/estilos";

type Props = {
  zonas: string[];
  telefono: string;
};

/** Municipios donde se trabaja: etiquetas, nunca enlaces ni páginas. */
export function Zonas({ zonas, telefono }: Props) {
  if (zonas.length === 0) return null;
  return (
    <section className={`bg-tarjeta ${seccion}`}>
      <div className="contenedor flex flex-col gap-4">
        <h2 className={h2Seccion}>Dónde trabajamos</h2>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {zonas.map((zona) => (
            <li key={zona}>
              <span className="inline-block rounded-md border border-linea bg-papel px-3 py-2 font-semibold">
                {zona}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="m-0 font-semibold">¿Tu zona no aparece? Llámanos</p>
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaPequena" })}>
            <Phone aria-hidden="true" className="size-5" />
            <span>Llamar</span>
          </BotonLlamada>
        </div>
      </div>
    </section>
  );
}
