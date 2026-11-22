import type { ReactNode } from "react";
import type { Ancla } from "@andrei-leads/core";

import { Migas } from "@/components/base/Migas";

type Props = {
  migas: readonly Ancla[];
  /** Cinta de carrocero: «Servicio · Sevilla». */
  cinta: string;
  /** Sin título (legales: el h1 lo pone core). */
  titulo?: string;
  /** Línea mono latón bajo el h1 (contexto del trabajo). */
  meta?: string;
  entradilla?: string;
  /** «desde 6.500 €». */
  desde?: string;
  /** Botones, cronología… */
  children?: ReactNode;
};

/** Cabecera de las páginas interiores (diseño): retícula, migas, cinta, h1 mono y lo que siga. */
export function CabeceraPagina({ migas, cinta, titulo, meta, entradilla, desde, children }: Props) {
  return (
    <section className="reticula border-b border-borde px-(--pad) pt-[clamp(28px,1rem+4vw,88px)] pb-[clamp(40px,2rem+3vw,80px)]">
      <div className="grid max-w-[1040px] justify-items-start gap-5">
        <Migas migas={migas} />
        <span className="cinta">{cinta}</span>
        {titulo && (
          <h1 className="mono max-w-[20ch] text-h1 leading-[1.08] font-medium tracking-[-0.03em] [overflow-wrap:anywhere] text-texto">{titulo}</h1>
        )}
        {meta && <p className="mono text-[13px] text-primario-claro">{meta}</p>}
        {entradilla && <p className="max-w-[56ch] text-cuerpo leading-[1.6] text-texto-suave">{entradilla}</p>}
        {desde && <p className="mono text-[15px] font-semibold text-primario-claro">{desde}</p>}
        {children}
      </div>
    </section>
  );
}
