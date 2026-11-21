import Link from "next/link";
import { BotonLlamada, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Palanca } from "@/components/Iconos";
import { PrecioCinta } from "@/components/PrecioCinta";
import { posicion } from "@/lib/formato";

/**
 * Leyenda del cuadro (encargo §6.4): una ficha por servicio con el mismo número que su módulo.
 * Con foto, foto 4:3; sin foto, la palanca grande y el número a 48 px (nunca un hueco gris).
 * «Ver la ficha» y `contorno-cuadro` «Llamar por esto».
 */
export function Leyenda({ servicios, telefono, titulo = "Qué arreglamos" }: { servicios: readonly Servicio[]; telefono: string; titulo?: string }) {
  return (
    <section aria-labelledby="h2-leyenda" className="contenedor pt-[clamp(40px,6vw,72px)]">
      <h2 id="h2-leyenda" className="h2 mb-5">
        {titulo}
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3.5">
        {servicios.map((s, i) => {
          const foto = s.imagenes[0];
          return (
            <li key={s.slug} data-aparecer="" className="flex flex-col border border-carril bg-superficie">
              {foto ? (
                <Foto imagen={foto} sizes="(min-width: 1280px) 390px, (min-width: 700px) 45vw, 92vw" className="border-b border-carril" />
              ) : (
                <div aria-hidden="true" className="relative flex aspect-[4/3] items-center justify-center gap-7 border-b border-carril bg-alterna">
                  <span className="absolute inset-x-0 top-1/2 -mt-3.5 h-7 bg-carril" />
                  <Palanca className="relative h-[124px] w-[76px]" />
                  <span className="cifras relative text-5xl leading-none font-semibold text-texto-suave">{posicion(i + 1)}</span>
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 px-4 pt-3.5 pb-4">
                <div className="flex items-center gap-2">
                  {foto && (
                    <span className="cifras flex-none border border-borde bg-etiqueta px-[5px] text-[13px] leading-5 font-semibold">{posicion(i + 1)}</span>
                  )}
                  <h3 className="text-xl leading-[1.2] font-semibold">{s.titulo}</h3>
                </div>
                <p className="text-base text-texto-suave">{s.descripcion}</p>
                {s.precioDesde && <PrecioCinta precio={s.precioDesde} />}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                  <Link href={`/servicios/${s.slug}`} className="enlace inline-flex min-h-11 items-center">
                    Ver la ficha<span className="sr-only"> de {s.titulo}</span>&nbsp;›
                  </Link>
                  <BotonLlamada telefono={telefono} className="contorno-cuadro ml-auto">
                    Llamar por esto
                  </BotonLlamada>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
