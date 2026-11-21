import Link from "next/link";
import type { Acreditacion, Servicio } from "@andrei-leads/core";

import { Palanca } from "@/components/Iconos";
import { acreditacionLinea, posicion } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Pick<Servicio, "titulo" | "slug" | "descripcion">[];
  nombre: string;
  acreditacion?: Acreditacion;
  /** Apariciones al hacer scroll en los módulos (solo en /servicios; en el hero, nunca). */
  aparecer?: boolean;
};

/** General y diferencial: fila decorativa de arriba del cuadro (sin texto). */
function Cabeza() {
  const caja = "relative flex h-[76px] w-20 items-center justify-center border border-borde md:h-[104px] md:w-24";
  const carril = "absolute -inset-x-px top-1/2 -mt-2 h-4 bg-carril md:-mt-[9px] md:h-[18px]";
  return (
    <div aria-hidden="true" className="flex pl-px">
      {["general", "diferencial"].map((s, i) => (
        <span key={s} className={cn(caja, i > 0 && "-ml-px")}>
          <span className={carril} />
          <svg viewBox="0 0 64 72" focusable="false" className="relative h-[52px] w-[46px] md:h-[72px] md:w-16">
            <use href={`#${s}`} width="64" height="72" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/**
 * La dinámica del template (encargo §5): el cuadro eléctrico como lista ordenada de enlaces. La
 * caja, el carril y las palancas son decoración (`aria-hidden`); cada módulo es un enlace con texto
 * real. Un solo marcado: en móvil, filas de 64 px (palanca, número, título y descripción); desde
 * 768 px, módulos de 120 px en filas de 5 con la cinta de rotuladora arriba (la descripción vive en
 * la Leyenda). La caja se encoge al contenido: con 1 servicio, un cuadro pequeño.
 */
export function Cuadro({ servicios, nombre, acreditacion, aparecer }: Props) {
  return (
    <div className="w-full border-2 border-texto bg-superficie p-[5px] md:w-fit md:max-w-full md:p-1.5">
      <div className="flex flex-col gap-3 border border-carril p-3 md:gap-3.5 md:px-4 md:pt-3.5 md:pb-4">
        <span aria-hidden="true" className="text-xs font-semibold tracking-[0.08em] text-texto-suave uppercase">
          Servicios · toca el tuyo
        </span>
        <Cabeza />
        <ol aria-label="Servicios" className="border-b border-carril md:flex md:max-w-[601px] md:flex-wrap md:gap-y-3.5 md:border-b-0 md:pl-px">
          {servicios.map((s, i) => (
            <li key={s.slug} data-aparecer={aparecer ? "" : undefined} className="border-t border-carril md:flex md:w-(--ancho-modulo) md:border-t-0">
              <Link
                href={`/servicios/${s.slug}`}
                className="modulo group relative grid min-h-(--altura-modulo) grid-cols-[48px_minmax(0,1fr)_24px] bg-superficie text-texto no-underline focus-visible:z-[1] md:-ml-px md:flex md:min-h-[184px] md:flex-1 md:flex-col md:border md:border-borde"
              >
                <span aria-hidden="true" className="relative flex items-center justify-center md:order-2 md:min-h-24 md:flex-1">
                  <span className="absolute -inset-y-px left-1/2 -ml-2 w-4 bg-carril md:inset-y-auto md:-right-px md:-left-px md:top-1/2 md:ml-0 md:-mt-[9px] md:h-[18px] md:w-auto" />
                  <Palanca className="relative h-[46px] w-[30px] md:h-[72px] md:w-11" />
                </span>
                <span className="cinta flex min-w-0 flex-col gap-[3px] px-1.5 pt-2.5 pb-[11px] md:order-1 md:m-[3px] md:min-h-[88px] md:gap-0.5 md:border md:border-borde md:bg-etiqueta md:p-[5px] md:group-hover:border-primario md:group-focus-visible:border-primario">
                  <span className="flex items-center gap-2 md:flex-col md:items-start md:gap-0.5">
                    <span className="cinta cifras flex-none border border-borde bg-etiqueta px-[5px] text-[13px] leading-5 font-semibold md:border-0 md:bg-transparent md:p-0 md:text-xs md:leading-normal group-hover:border-primario group-focus-visible:border-primario">
                      {posicion(i + 1)}
                    </span>
                    <span className="text-[17px] leading-[1.2] font-semibold md:text-xs md:font-medium md:tracking-[0.02em] md:[overflow-wrap:break-word] md:uppercase">
                      {s.titulo}
                    </span>
                  </span>
                  <span className="text-[15px] leading-[1.35] text-pretty text-texto-suave md:hidden">{s.descripcion}</span>
                </span>
                <span aria-hidden="true" className="flex items-center justify-center text-2xl text-texto-suave md:hidden">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-0.5 border border-borde bg-alterna px-2.5 py-2 md:max-w-[601px] md:flex-row md:flex-wrap md:items-baseline md:gap-x-4 md:px-3">
          <span className="text-[15px] leading-tight font-semibold [overflow-wrap:anywhere]">{nombre}</span>
          {acreditacion && <span className="cifras text-[13px] leading-[1.35]">{acreditacionLinea(acreditacion)}</span>}
        </div>
      </div>
    </div>
  );
}

/** Módulo pequeño suelto (Otros módulos de este cuadro): cinta + palanca, 120 px. */
export function ModuloPequeno({ servicio, n }: { servicio: Pick<Servicio, "titulo" | "slug">; n: number }) {
  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className="modulo group relative -ml-px flex min-h-40 flex-1 flex-col border border-borde bg-superficie text-texto no-underline focus-visible:z-[1]"
    >
      <span className="cinta m-[3px] flex min-h-[88px] flex-col gap-0.5 border border-borde bg-etiqueta p-[5px] group-hover:border-primario group-focus-visible:border-primario">
        <span className="cifras text-xs font-semibold">{posicion(n)}</span>
        <span className="text-xs leading-[1.2] font-medium tracking-[0.02em] [overflow-wrap:break-word] uppercase">{servicio.titulo}</span>
      </span>
      <span aria-hidden="true" className="relative flex min-h-[72px] flex-1 items-center justify-center">
        <span className="absolute -inset-x-px top-1/2 -mt-[7px] h-3.5 bg-carril" />
        <Palanca className="relative h-[54px] w-[34px]" />
      </span>
    </Link>
  );
}
