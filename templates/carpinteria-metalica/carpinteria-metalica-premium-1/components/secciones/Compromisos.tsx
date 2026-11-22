import type { CSSProperties } from "react";
import type { SiteConfig } from "@andrei-leads/core";

import { TituloLineas } from "@/components/TituloLineas";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas">;

/**
 * Compromisos (encargo §6.8): garantías en Hanken 300 a 28 px con filete, acreditaciones
 * (con `numero` si existe) y «SISTEMAS» + marcas en una línea. Cada bloque vacío se oculta;
 * sin ninguno, la sección desaparece.
 */
export function Compromisos({ garantias, acreditaciones, marcas }: Props) {
  if (garantias.length + acreditaciones.length + marcas.length === 0) return null;
  return (
    <section data-tono="claro" aria-labelledby="titulo-compromisos" className="seccion bg-fondo">
      <div className="contenedor rejilla gap-y-10">
        <div className="lg:col-[1/6]">
          <p className="etiqueta">Compromisos</p>
          <TituloLineas id="titulo-compromisos" lineas={[<>Nuestras <em>garantías</em>.</>]} className="titulo-h2 mt-3" />
        </div>
        <div className="lg:col-[7/13]">
          {garantias.length > 0 && (
            <ul className="m-0 list-none border-t border-borde p-0">
              {garantias.map((g, i) => (
                <li key={g} data-aparecer style={{ "--i": i } as CSSProperties} className="fino border-b border-borde py-4 text-2xl leading-[1.2] lg:py-5 lg:text-[28px]">
                  {g}
                </li>
              ))}
            </ul>
          )}
          {acreditaciones.length > 0 && (
            <div className="mt-10">
              <h3 className="etiqueta">Acreditaciones</h3>
              <ul className="m-0 mt-3 list-none p-0">
                {acreditaciones.map((a) => (
                  <li key={a.nombre} className="py-1">
                    {a.nombre}
                    {a.numero && <span className="text-texto-suave"> · {a.numero}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {marcas.length > 0 && (
            <p className="m-0 mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="etiqueta">Sistemas</span>
              <span>{marcas.join(" · ")}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
