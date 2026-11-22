import type { CSSProperties } from "react";
import type { Paso } from "@andrei-leads/core";

import { ParejaCta, type DatosCta } from "@/components/ParejaCta";
import { TituloLineas } from "@/components/TituloLineas";
import { Foto } from "@/components/base/Foto";
import { RESPUESTA, TEXTO_WA } from "@/lib/mensajes";
import { dosCifras } from "@/lib/textos";

type Props = { pasos: readonly Paso[]; cta: DatosCta };

/**
 * Proceso (encargo §6.6): sobre superficie, «Así lo *hacemos*.», una fila de hasta 6
 * columnas con filete superior en escritorio y lista vertical en móvil. Con
 * `proceso[].imagen` (core 0.7.0), la foto 4:5 encima del paso. Pareja al final.
 */
export function Proceso({ pasos, cta }: Props) {
  return (
    <section data-tono="claro" aria-labelledby="titulo-proceso" className="seccion bg-superficie">
      <div className="contenedor">
        <p className="etiqueta">Proceso</p>
        <TituloLineas id="titulo-proceso" lineas={[<>Así lo <em>hacemos</em>.</>]} className="titulo-h2 mt-3" />
        <ol
          className="m-0 mt-12 grid list-none grid-cols-1 gap-x-6 p-0 lg:mt-16 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
          style={{ "--n": pasos.length } as CSSProperties}
        >
          {pasos.map((p, i) => (
            <li
              key={p.titulo}
              data-aparecer
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[40px_minmax(0,1fr)] border-t border-borde py-6 lg:grid-cols-1 lg:py-0 lg:pt-5"
            >
              <span className="text-xs tracking-[0.12em] text-texto-suave lg:mb-5">{dosCifras(i + 1)}</span>
              <div>
                {p.imagen && <Foto imagen={p.imagen} sizes="(min-width: 1024px) 16vw, 70vw" className="mb-4" />}
                <h3 className="fino m-0 text-[22px] leading-[1.2]">{p.titulo}</h3>
                <p className="m-0 mt-2 text-[15px] leading-normal text-texto-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
        <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA} confianza={{ texto: RESPUESTA }} className="mt-14 max-w-[620px] lg:mt-20" />
      </div>
    </section>
  );
}
