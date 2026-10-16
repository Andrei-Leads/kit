import { BotonLlamada } from "@andrei-leads/core";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import type { EntradaIndice } from "@/lib/secciones";
import { IndiceLateralInterior } from "./IndiceLateralInterior";

type Props = {
  /** Secciones presentes en la página, en orden (lib/secciones.ts). Cada `id` es el de una <section id>. */
  secciones: EntradaIndice[];
  telefono: string;
};

/**
 * Índice lateral (ver IndiceLateralInterior). Componente de servidor: renderiza aquí los `BotonLlamada`
 * y los pasa ya hechos a la parte cliente, para que core (y zod) no entren en el JavaScript del navegador.
 */
export function IndiceLateral({ secciones, telefono }: Props) {
  return (
    <IndiceLateralInterior
      secciones={secciones}
      llamadas={
        <>
          <BotonLlamada
            telefono={telefono}
            className="flex min-h-11 items-center text-lg font-bold text-texto no-underline tabular-nums hover:underline hover:underline-offset-4"
          >
            {telefonoVisible(telefono)}
          </BotonLlamada>
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaCabecera" })}>
            <Phone aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[18px] flex-none" />
            <span>Llamar</span>
          </BotonLlamada>
        </>
      }
    />
  );
}
