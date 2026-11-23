import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

type Props = {
  migas: readonly Ancla[];
  titulo: string;
  entradilla?: string;
  /** Pareja de CTAs bajo la entradilla (/contacto). */
  ctas?: ReactNode;
};

/** Cabecera de página interior (entrega §4): migas, h1 en display y entradilla. */
export function CabeceraPagina({ migas, titulo, entradilla, ctas }: Props) {
  return (
    <section className="contenedor pt-[clamp(28px,4vw,48px)] pb-[clamp(24px,4vw,48px)]">
      <div className="flex flex-col gap-[18px]">
        <Migas migas={migas} />
        <h1 className="max-w-[16ch] font-titulo text-display leading-none font-medium tracking-[-0.02em] text-balance">{titulo}</h1>
        {entradilla && <p className="max-w-[52ch] text-texto-suave text-pretty">{entradilla}</p>}
        {ctas && <div className="mt-2">{ctas}</div>}
      </div>
    </section>
  );
}
