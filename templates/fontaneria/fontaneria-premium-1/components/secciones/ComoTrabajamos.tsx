import type { CSSProperties } from "react";
import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { numero, type DatosCta } from "@/lib/textos";

import { Titular } from "./Titular";

/**
 * «Cómo trabajamos» (encargo §6.6): `proceso` del cliente o los pasos por
 * defecto de proyecto de core. Lista ordenada con una línea de 1 px a la
 * izquierda que se dibuja con el scroll (`.linea-proceso`, solo scaleY) y cada
 * paso que aparece escalonado. Sin soporte o con «reducir movimiento», la
 * línea está entera y los pasos quietos.
 */
export function ComoTrabajamos({ proceso, cta }: { proceso: SiteConfig["proceso"]; cta: DatosCta }) {
  const pasos = pasosProceso(proceso, "proyecto");
  return (
    <section data-tono="claro" aria-labelledby="titulo-proceso" className="seccion bg-fondo">
      <div className="contenedor grid gap-10 lg:grid-cols-[440px_minmax(0,560px)] lg:gap-0">
        <div className="flex flex-col gap-[18px] lg:sticky lg:top-[calc(var(--alto-cabecera)+48px)] lg:self-start">
          <p className="etiqueta">Proceso</p>
          <Titular id="titulo-proceso" className="text-[40px] lg:text-h2" lineas={["Cómo", <em key="e">trabajamos</em>]} />
        </div>
        <div className="flex flex-col gap-12">
          <ol className="linea-proceso relative m-0 flex list-none flex-col p-0 pl-6 lg:pl-8">
            {pasos.map((p, i) => (
              <li
                key={p.titulo}
                data-aparecer
                className="grid grid-cols-[56px_1fr] gap-4 border-b border-borde py-6 lg:grid-cols-[112px_1fr] lg:py-[26px]"
                style={{ "--i": i % 3 } as CSSProperties}
              >
                <span aria-hidden="true" className="titulo text-[44px] leading-none font-extralight text-texto-suave">
                  {numero(i)}
                </span>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="m-0 text-[17px] leading-snug font-medium">{p.titulo}</h3>
                  <p className="m-0 text-texto-suave">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <Pareja cta={cta} />
        </div>
      </div>
    </section>
  );
}
