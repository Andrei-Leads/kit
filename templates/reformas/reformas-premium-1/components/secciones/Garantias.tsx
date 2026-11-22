import { listaY, type SiteConfig } from "@andrei-leads/core";

import { Titular } from "@/components/Botones";

type Props = Pick<SiteConfig, "garantias" | "acreditaciones" | "marcas">;

/**
 * «Lo que *firmamos*» (encargo §6.7): `h2` a la izquierda; garantías entre filetes y
 * acreditaciones con número a la derecha; marcas en una línea. Sin nada, no existe.
 */
export function Garantias({ garantias, acreditaciones, marcas }: Props) {
  if (garantias.length === 0 && acreditaciones.length === 0) return null;
  return (
    <section data-tono="claro" aria-labelledby="titulo-garantias" className="seccion bg-fondo">
      <div className="contenedor grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="etiqueta mb-4 text-texto-suave">Garantías</p>
          <Titular id="titulo-garantias" antes="Lo que" destacada="firmamos" />
        </div>
        <div className="lg:col-span-7">
          {garantias.length > 0 && (
            <ul className="m-0 list-none border-t border-borde p-0">
              {garantias.map((g, i) => (
                <li key={g} data-aparecer style={{ "--i": i } as React.CSSProperties} className="flex gap-5 border-b border-borde py-4 text-[19px] leading-snug">
                  <span aria-hidden="true" className="text-acento">—</span>
                  {g}
                </li>
              ))}
            </ul>
          )}
          {acreditaciones.length > 0 && (
            <dl className="m-0 mt-8">
              {acreditaciones.map((a) => (
                <div key={a.nombre} className="flex flex-wrap justify-between gap-x-6 border-b border-borde py-3 text-[15px]">
                  <dt>{a.nombre}</dt>
                  {a.numero && <dd className="m-0 text-texto-suave">{a.numero}</dd>}
                </div>
              ))}
            </dl>
          )}
          {marcas.length > 0 && <p className="m-0 mt-6 text-[15px] text-texto-suave">Trabajamos con {listaY(marcas)}.</p>}
        </div>
      </div>
    </section>
  );
}
