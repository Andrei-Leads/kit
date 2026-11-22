import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

type Props = {
  migas: readonly Ancla[];
  titulo: string;
  entradilla?: string;
  /** Pastilla «desde» (ficha de servicio). */
  desde?: string;
  /** Bajo el texto: cifras (empresa) o la llamada (servicio sin WhatsApp). */
  debajo?: ReactNode;
  /** Columna derecha: el planificador corto (ficha de servicio). */
  lateral?: ReactNode;
};

/** Cabecera de las páginas interiores: banda terracota corta con migas, h1 y entradilla. */
export function BandaInterior({ migas, titulo, entradilla, desde, debajo, lateral }: Props) {
  return (
    <section
      data-sobre-primario=""
      className="bg-(--color-fondo-hero) px-[clamp(16px,4vw,40px)] pt-[clamp(80px,3rem+6vw,140px)] pb-[clamp(32px,1rem+4vw,72px)] text-sobre-primario"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end gap-x-[clamp(32px,5vw,80px)] gap-y-6">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3 self-center">
          <Migas migas={migas} />
          <h1 className="font-titulo text-h1-interior leading-[1.05] font-semibold tracking-[-0.02em] text-balance">{titulo}</h1>
          {entradilla && <p className="max-w-[52ch] text-[clamp(1rem,0.92rem+0.4vw,1.25rem)] leading-[1.45] text-pretty">{entradilla}</p>}
          {desde && <span className="self-start rounded-full bg-superficie px-3.5 py-1.5 text-[15px] font-semibold text-texto">{desde}</span>}
          {debajo}
        </div>
        {lateral && <div className="min-w-0 max-w-[520px] flex-[1_1_340px]">{lateral}</div>}
      </div>
    </section>
  );
}
