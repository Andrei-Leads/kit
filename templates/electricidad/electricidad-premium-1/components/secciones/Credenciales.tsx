import type { CSSProperties, ReactNode } from "react";
import type { SiteConfig } from "@andrei-leads/core";

import { Antetitulo, Senal, Titular } from "@/components/Titular";
import { numero } from "@/lib/textos";

type Props = Pick<SiteConfig, "acreditaciones" | "garantias" | "marcas"> & {
  /** Pareja de CTA al final (en /empresa). */
  pie?: ReactNode;
  /** Sin antetítulo ni titular grande (cuando la página ya tiene el suyo). */
  id?: string;
};

/**
 * Credenciales (encargo §6.5, estrella parte 2, sobre --color-alterna):
 * acreditaciones como una placa de características (nombre y número en
 * tabular-nums), garantías en dos columnas y marcas en una línea de texto, sin
 * logos. Se recompone con lo que haya; sin nada, no se pinta.
 */
export function Credenciales({ acreditaciones, garantias, marcas, pie, id = "titulo-credenciales" }: Props) {
  if (acreditaciones.length === 0 && garantias.length === 0 && marcas.length === 0) return null;
  return (
    <section data-tono="oscuro" aria-labelledby={id} className="seccion bg-alterna">
      <div className="contenedor flex flex-col gap-[clamp(40px,2rem+2vw,64px)]">
        <div className="flex flex-col gap-6">
          <Antetitulo>Credenciales</Antetitulo>
          <Titular
            id={id}
            lineas={
              acreditaciones.length > 0
                ? [
                    <>
                      Habilitados, asegurados y <Senal>documentados</Senal>.
                    </>,
                  ]
                : [
                    <>
                      Lo que te <Senal>garantizamos</Senal>.
                    </>,
                  ]
            }
          />
        </div>

        {acreditaciones.length > 0 && (
          <dl className="m-0 border-t border-[var(--color-linea)]">
            {acreditaciones.map((a, i) => (
              <div
                key={a.nombre}
                data-aparecer
                style={{ "--i": i } as CSSProperties}
                className="flex flex-col gap-1 border-b border-[var(--color-linea)] py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <dt className="text-[17px]">{a.nombre}</dt>
                {a.numero && (
                  <dd className="m-0 flex items-baseline gap-2 text-[15px] text-texto-suave tabular-nums">
                    <span className="etiqueta text-[10px] text-acento">N.º</span>
                    {a.numero}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        )}

        {garantias.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="etiqueta m-0 text-acento">Garantías</p>
            <ol className="m-0 grid list-none gap-x-10 p-0 md:grid-cols-2">
              {garantias.map((g, i) => (
                <li key={g} data-aparecer className="flex gap-3 border-t border-[var(--color-linea)] py-4 text-[17px]">
                  <span className="etiqueta mt-1 text-[10px] text-acento">{numero(i)}</span>
                  {g}
                </li>
              ))}
            </ol>
          </div>
        )}

        {marcas.length > 0 && (
          <p className="m-0 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="etiqueta text-[11px] text-acento">Marcas que instalamos</span>
            <span className="text-texto-suave">{marcas.join(" · ")}</span>
          </p>
        )}
        {pie}
      </div>
    </section>
  );
}
