import { BotonLlamada } from "@andrei-leads/core";
import type { Servicio } from "@andrei-leads/core";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { h2Seccion, seccion } from "@/lib/estilos";

import { ListaAverias } from "./ListaAverias";

type Props = {
  servicios: Servicio[];
  telefono: string;
};

/** Sección estrella del inicio: lista de averías. */
export function Averias({ servicios, telefono }: Props) {
  if (servicios.length === 0) return null;
  return (
    <section id="averias" className={seccion}>
      <div className="contenedor">
        <div className="mx-auto flex max-w-[880px] flex-col gap-4">
          <h2 className={h2Seccion}>¿Qué se ha roto?</h2>
          <ListaAverias servicios={servicios} nivelTitulo="h3" />
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-0.5 pt-1">
            <p className="m-0 font-semibold">¿No ves tu avería? Llámanos</p>
            <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaPequena" })}>
              <Phone aria-hidden="true" className="size-5" />
              <span>Llamar</span>
            </BotonLlamada>
          </div>
        </div>
      </div>
    </section>
  );
}
