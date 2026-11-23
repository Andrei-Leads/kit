import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

type Props = {
  migas: readonly Ancla[];
  titulo: string;
  entradilla?: string;
  /** Bajo la entradilla: cifras (empresa), anclas (trabajos) y la pareja de CTAs. */
  children?: ReactNode;
};

/** Cabecera de /servicios, /trabajos y /empresa (encargo §7): campo pleno con migas, h1 a tamaño display y entradilla. */
export function CabeceraPlena({ migas, titulo, entradilla, children }: Props) {
  return (
    <section aria-labelledby="h1-pagina" className="campo-pleno px-[clamp(20px,4vw,40px)] pt-[108px] pb-[clamp(40px,6vw,80px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
        <Migas migas={migas} />
        <h1 id="h1-pagina" className="font-titulo text-display leading-[1.04] font-bold tracking-[-0.03em]">
          {titulo}
        </h1>
        {entradilla && <p className="max-w-[56ch] text-entradilla">{entradilla}</p>}
        {children}
      </div>
    </section>
  );
}
