import Link from "next/link";
import type { CSSProperties } from "react";
import type { Servicio } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { Flecha } from "@/components/EnlaceFlecha";
import { Destacada, TituloLineas } from "@/components/Titulo";
import { BandaServicio } from "@/components/secciones/BandaServicio";
import { dosCifras, type DatosCta } from "@/lib/textos";

type Props = {
  servicios: readonly Servicio[];
  cta: DatosCta;
  confianza?: string;
};

/**
 * Servicios (encargo §6.6): filas con filete, número, título en Newsreader 300 a
 * 28 px, descripción, «desde» en etiqueta y «Descubrir →». En escritorio, la banda
 * 4:1 se abre con `clip-path` al pasar o enfocar; en móvil va fija sobre el título.
 */
export function ServiciosFilas({ servicios, cta, confianza }: Props) {
  return (
    <section id="servicios" data-tono="claro" aria-labelledby="titulo-servicios" className="seccion relative bg-fondo" style={{ viewTimelineName: "--sec-servicios" }}>
      <div className="contenedor">
        <p className="etiqueta m-0 text-texto-suave">Servicios</p>
        <TituloLineas id="titulo-servicios" lineas={[<>Lo que <Destacada>fabricamos</Destacada></>]} className="mt-4 text-h2" />
        <ul className="m-0 mt-[clamp(40px,5vw,72px)] list-none border-b border-borde p-0">
          {servicios.map((s, i) => (
            <li key={s.slug} data-aparecer style={{ "--i": 0 } as CSSProperties}>
              <Link
                href={`/servicios/${s.slug}`}
                className="fila-servicio grupo-flecha flex flex-wrap-reverse items-center gap-x-10 gap-y-4 border-t border-borde py-7"
              >
                <div className="flex min-w-0 flex-[1_1_460px] items-baseline gap-5">
                  <span className="min-w-5 text-xs font-medium text-texto-suave tabular-nums">{dosCifras(i + 1)}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="titulo text-[clamp(1.5rem,1.2rem+1vw,1.75rem)] leading-[1.15]">{s.titulo}</h3>
                    <p className="mt-2 max-w-[46ch] text-base leading-[1.55] text-texto-suave">{s.descripcion}</p>
                    <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-3">
                      {s.precioDesde && <span className="etiqueta border border-borde px-2.5 py-1.5">{s.precioDesde}</span>}
                      <Flecha>Descubrir</Flecha>
                    </div>
                  </div>
                </div>
                <BandaServicio
                  imagen={s.imagenes[0]}
                  numero={dosCifras(i + 1)}
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="banda w-full flex-[1_1_300px] lg:max-w-[380px]"
                />
              </Link>
            </li>
          ))}
        </ul>
        <ParejaCta cta={cta} tono="claro" confianza={confianza} className="mt-12" />
      </div>
    </section>
  );
}
