import type { CSSProperties, ReactNode } from "react";
import { listaY, type SiteConfig } from "@andrei-leads/core";

import { Titular } from "./Titular";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas"> & { id?: string; lineas?: ReactNode[] };

/**
 * «Todo por escrito» (encargo §6.7), sobre --color-alterna: garantías en filas
 * de 1 px, acreditaciones con su número en etiqueta y las marcas como una
 * frase («Trabajamos con …»), sin logos. Cada bloque vacío se oculta; sin
 * ninguno, la sección no existe.
 */
export function Garantias({ garantias, acreditaciones, marcas, id = "titulo-garantias", lineas }: Props) {
  if (garantias.length === 0 && acreditaciones.length === 0 && marcas.length === 0) return null;
  return (
    <section data-tono="claro" aria-labelledby={id} className="seccion bg-alterna">
      <div className="contenedor grid gap-12 lg:grid-cols-[440px_240px_240px] lg:gap-10">
        <div className="flex flex-col gap-[18px]">
          <p className="etiqueta">Garantías</p>
          <Titular id={id} className="text-[40px] lg:text-[clamp(2.75rem,2rem+2vw,3.5rem)]" lineas={lineas ?? [<>Todo <em key="e">por escrito</em>,</>, "antes de empezar"]} />
          {garantias.length > 0 && (
            <ul className="m-0 mt-5 list-none border-b border-borde p-0">
              {garantias.map((g, i) => (
                <li key={g} data-aparecer style={{ "--i": i % 3 } as CSSProperties} className="border-t border-borde py-3 text-[17px]">
                  {g}
                </li>
              ))}
            </ul>
          )}
        </div>
        {acreditaciones.length > 0 && (
          <div className="flex flex-col lg:pt-1">
            <h3 className="m-0 mb-6 text-xs font-medium tracking-[0.12em] text-texto-suave uppercase">Acreditaciones</h3>
            <ul className="m-0 list-none p-0">
              {acreditaciones.map((a) => (
                <li key={a.nombre} className="flex flex-col gap-1 border-t border-borde py-4">
                  <span className="leading-snug">{a.nombre}</span>
                  {a.numero && <span className="text-[11px] font-medium tracking-[0.1em] text-texto-suave uppercase">{a.numero}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {marcas.length > 0 && (
          <div className="flex flex-col lg:pt-1">
            <h3 className="m-0 mb-6 text-xs font-medium tracking-[0.12em] text-texto-suave uppercase">Marcas</h3>
            <p className="m-0 border-t border-borde pt-4 text-texto-suave">Trabajamos con {listaY(marcas)}.</p>
          </div>
        )}
      </div>
    </section>
  );
}
