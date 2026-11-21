import Link from "next/link";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { dosCifras } from "@/lib/formato";

import { Encabezado } from "./Encabezado";

type Props = {
  servicios: readonly Servicio[];
  /** Número de campo en el inicio; en /servicios no lleva encabezado (el h1 ya lo dice). */
  n?: string;
};

/** «desde 60 €» → rótulo «DESDE» + importe; cualquier otro texto, tal cual. */
function Precio({ texto }: { texto: string }) {
  const p = precioDesde(texto);
  return (
    <div className="font-titulo text-[0.8125rem] font-semibold">
      {p.desde && <span className="mr-1.5 text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">Desde</span>}
      {p.importe}
    </div>
  );
}

/**
 * ServiciosParte (encargo §6.4): cada servicio es una ficha con cabecera de casillas (Ref. 01 ·
 * Servicio), una cota roja que se dibuja al entrar (`cota-ficha`, solo CSS), la descripción, «desde»
 * si hay precio y, si hay foto, una polaroid de 96 px «grapada» arriba a la derecha y girada 2°.
 * Sin foto, la ficha se queda solo con texto (sin hueco).
 */
export function ServiciosParte({ servicios, n }: Props) {
  // Con encabezado numerado (inicio) las fichas son h3; en /servicios, bajo el h1, son h2.
  const Titulo = n ? "h3" : "h2";
  return (
    <section id="servicios" aria-labelledby={n ? "h2-servicios" : undefined} aria-label={n ? undefined : "Servicios"} className="px-(--pad) py-(--sec)">
      {n && <Encabezado n={n} rotulo="Servicios" titulo="Un parte para cada avería" id="h2-servicios" />}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,330px),1fr))] gap-x-5 gap-y-7 pt-3">
        {servicios.map((s, i) => {
          const foto = s.imagenes[0];
          return (
            <article key={s.slug} id={`s-${s.slug}`} className="relative flex scroll-mt-20 flex-col border border-texto bg-superficie">
              <div className="flex border-b border-texto">
                <div className="w-[58px] flex-none border-r border-texto px-2.5 py-2">
                  <div className="rotulo-sm">Ref.</div>
                  <div className="font-titulo text-[0.9375rem] font-bold">{dosCifras(i + 1)}</div>
                </div>
                <div className={`min-w-0 flex-1 py-2 pl-3 ${foto ? "pr-28" : "pr-3"}`}>
                  <div className="rotulo-sm">Servicio</div>
                  <Titulo className="mt-0.5 font-titulo text-base leading-snug font-semibold">{s.titulo}</Titulo>
                </div>
              </div>
              <div aria-hidden="true" className="cota-ficha mx-3 flex items-center text-primario">
                <span className="h-[7px] w-px bg-current" />
                <span className="h-px flex-1 bg-current" />
                <span className="h-[7px] w-px bg-current" />
              </div>
              <div className="flex flex-1 gap-3.5 px-3 pt-3 pb-2">
                <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                  <p className="leading-normal">{s.descripcion}</p>
                  {s.precioDesde && <Precio texto={s.precioDesde} />}
                  <Link href={`/servicios/${s.slug}`} className="enlace-parte mt-auto">
                    Ver el parte del servicio →
                  </Link>
                </div>
                {foto && (
                  <div className="giro-der relative z-[2] -mt-[58px] w-24 flex-none">
                    <span aria-hidden="true" className="absolute -top-[3px] left-1/2 z-[3] -ml-[11px] h-[5px] w-[22px] border border-cota bg-alterna" />
                    <Foto imagen={foto} sizes="96px" marco="pequena" />
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
