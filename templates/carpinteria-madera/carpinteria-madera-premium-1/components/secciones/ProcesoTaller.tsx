import type { CSSProperties } from "react";
import type { Paso } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { Destacada, TituloLineas } from "@/components/Titulo";
import { Veta } from "@/components/Veta";
import { Foto } from "@/components/base/Foto";
import { TEXTO_WA_PROCESO } from "@/lib/mensajes";
import { dosCifras, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  pasos: readonly Paso[];
  cta: DatosCta;
  /** Línea de confianza tras el último bloque (una garantía o el horario). */
  confianza?: string;
};

/**
 * Proceso en bloques que se apilan (recurso 5, encargo §5.5): tablones fijados con
 * `position: sticky` que dejan ver el canto del anterior (12 px con su número). Cada
 * bloque lleva su pareja de CTAs. Paso sin foto: bloque con veta y número grande.
 * Con «reducir movimiento» o ventanas bajas, lista normal (globals.css, `.apilado`).
 */
export function ProcesoTaller({ pasos, cta, confianza }: Props) {
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-proceso" className="sobre-oscuro relative z-[6] bg-tinta text-fondo">
      <div className="contenedor pt-[clamp(5rem,3rem+6vw,9rem)] pb-[clamp(40px,5vw,72px)]">
        <p className="etiqueta m-0 text-papel-suave">Cómo trabajamos</p>
        <TituloLineas id="titulo-proceso" lineas={["Del tablón", <>a tu <Destacada>casa</Destacada></>]} className="mt-4 text-h2" />
      </div>
      <ol className="apilado apilado-alto m-0 list-none p-0">
        {pasos.map((p, i) => (
          <li
            key={p.titulo}
            style={{ "--i": i } as CSSProperties}
            className={cn("overflow-hidden border-t border-fondo/14", i % 2 ? "bg-tinta-suave" : "bg-tinta")}
          >
            <div aria-hidden="true" className="contenedor flex h-3 items-center text-[9px] tracking-[0.14em] text-papel-suave uppercase">
              {dosCifras(i + 1)} — {p.titulo}
            </div>
            <div className="contenedor flex flex-wrap-reverse items-center justify-between gap-x-[clamp(32px,6vw,96px)] gap-y-5 pt-5 pb-8 lg:h-[calc(100%-12px)] lg:py-10">
              <div className="max-w-[520px] min-w-0 flex-[1_1_380px]">
                <div className="flex items-baseline gap-3.5 lg:flex-col lg:items-start lg:gap-5">
                  <span aria-hidden="true" className="titulo text-[40px] leading-[0.9] text-destacado lg:text-[96px]">
                    {dosCifras(i + 1)}
                  </span>
                  <h3 className="titulo text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.05]">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {p.titulo}
                  </h3>
                </div>
                <p className="medida mt-4 text-cuerpo text-papel-suave">{p.texto}</p>
                <ParejaCta cta={cta} tono="oscuro" textoWhatsapp={TEXTO_WA_PROCESO} className="mt-6" />
              </div>
              <div className="relative h-[28svh] w-full flex-none overflow-hidden lg:aspect-[4/5] lg:h-auto lg:w-[min(100%,54vh)]">
                {p.imagen ? (
                  <Foto
                    imagen={p.imagen}
                    sizes="(min-width: 1024px) 54vh, 100vw"
                    proporcion="relleno"
                    tono="oscuro"
                    className="absolute inset-0"
                    claseImagen="asentar"
                  />
                ) : (
                  <div aria-hidden="true" className="absolute inset-0 flex items-end border border-fondo/14 p-4">
                    <Veta />
                    <span className="titulo relative text-[96px] leading-[0.8] text-fondo/18 lg:text-[160px]">{dosCifras(i + 1)}</span>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
      {confianza && (
        <div className="contenedor pt-10 pb-[clamp(56px,6vw,96px)]">
          <p className="m-0 border-t border-fondo/14 pt-5 text-sm text-papel-suave">{confianza}</p>
        </div>
      )}
    </section>
  );
}
