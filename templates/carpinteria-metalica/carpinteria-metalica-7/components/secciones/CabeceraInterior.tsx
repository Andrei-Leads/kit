import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

type Props = {
  migas: readonly Ancla[];
  titulo: string;
  entradilla?: ReactNode;
};

/** Cabecera de las páginas interiores (servicios, obras, el taller): migas, h1 display y entradilla. */
export function CabeceraInterior({ migas, titulo, entradilla }: Props) {
  return (
    <header className="pt-[clamp(96px,9vw,150px)] pb-[clamp(8px,1.5vw,24px)]">
      <div className="contenedor">
        <Migas migas={migas} />
        <h1 className="display mt-2.5 [overflow-wrap:anywhere]">{titulo}</h1>
        {entradilla && <p className="mt-3.5 max-w-[44ch] text-[clamp(1.0625rem,1rem+0.4vw,1.25rem)] leading-[1.45] text-pretty text-texto-suave">{entradilla}</p>}
      </div>
    </header>
  );
}
