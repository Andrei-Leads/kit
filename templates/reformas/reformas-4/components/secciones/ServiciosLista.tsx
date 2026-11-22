import type { ReactNode } from "react";
import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Rotulo } from "@/components/Rotulo";
import { dosCifras } from "@/lib/formato";

type Props = {
  n: string;
  servicios: readonly Servicio[];
  titulo: string;
  /** Pareja de botones al cierre (solo en el inicio). */
  children?: ReactNode;
};

/**
 * Lista editorial de servicios (encargo §6.3): número mono, título en mono de 22 px, descripción en la
 * sans, «desde» en mono y foto 3:2 pequeña solo si existe (sin foto, la fila ocupa todo el ancho). Con
 * más de 6 servicios, la descripción va plegada en `<details>` (§5, «Con 10 servicios»).
 */
export function ServiciosLista({ n, servicios, titulo, children }: Props) {
  const plegar = servicios.length > 6;
  return (
    <section id="servicios" aria-labelledby="h2-servicios" className="border-y border-borde bg-alterna px-(--pad) py-(--sec)">
      <div className="max-w-[1040px]">
        <Rotulo n={n}>Servicios</Rotulo>
        <h2 id="h2-servicios" className="h2-diario mb-8">
          {titulo}
        </h2>
        <ol className="border-t border-borde">
          {servicios.map((s, i) => {
            const [foto] = s.imagenes;
            return (
              <li key={s.slug} data-aparecer className="border-b border-borde">
                <div className="flex flex-wrap items-start gap-x-7 gap-y-4 py-7">
                  <span className="mono flex-[0_0_32px] pt-1 text-[13px] font-semibold text-primario-claro">{dosCifras(i + 1)}</span>
                  <div className="grid min-w-0 flex-[999_1_280px] justify-items-start gap-2">
                    <h3 className="mono text-[22px] leading-tight font-medium tracking-[-0.01em]">
                      <Link href={`/servicios/${s.slug}`} className="text-texto no-underline hover:text-primario-claro">
                        {s.titulo}
                      </Link>
                    </h3>
                    {plegar ? (
                      <details className="group/desc">
                        <summary className="mono inline-flex min-h-11 cursor-pointer items-center text-xs text-texto-suave">
                          Ver descripción <span aria-hidden="true" className="ml-2 text-primario-claro group-open/desc:rotate-45">+</span>
                        </summary>
                        <p className="max-w-[58ch] text-[17px] leading-[1.55] text-texto-suave">{s.descripcion}</p>
                      </details>
                    ) : (
                      <p className="max-w-[58ch] text-[17px] leading-[1.55] text-texto-suave">{s.descripcion}</p>
                    )}
                    {s.precioDesde && <p className="mono text-[13px] font-semibold text-primario-claro">{s.precioDesde}</p>}
                    <Link href={`/servicios/${s.slug}`} tabIndex={-1} aria-hidden="true" className="mono mt-1 inline-flex min-h-11 items-end text-xs text-texto no-underline hover:text-texto">
                      <span className="border-b border-cota">Ver servicio →</span>
                    </Link>
                  </div>
                  {foto && (
                    <Link href={`/servicios/${s.slug}`} tabIndex={-1} aria-hidden="true" className="block max-w-[220px] flex-[1_1_160px]">
                      <Foto imagen={foto} sizes="220px" mini decorativa />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
