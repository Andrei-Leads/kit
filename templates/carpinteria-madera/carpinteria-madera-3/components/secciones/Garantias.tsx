import { listaY, type Acreditacion } from "@andrei-leads/core";

import { TituloSeccion } from "@/components/TituloSeccion";
import { anioActual } from "@/lib/anio";

type Props = {
  n: string;
  garantias: readonly string[];
  acreditaciones: readonly Acreditacion[];
  marcas: readonly string[];
  anioFundacion?: number;
  ciudad: string;
};

/**
 * «Nuestras garantías» (encargo §6.5, que lo titulaba «Lo que firmamos»): un sello de taller con doble recuadro de 1 px. «Taller desde
 * 1987» en mono grande con los años, las garantías en lista con guiones, las acreditaciones y las
 * marcas. Cada parte existe solo con su dato (la página no pinta la sección si no hay ninguno).
 */
export async function Garantias({ n, garantias, acreditaciones, marcas, anioFundacion, ciudad }: Props) {
  const anios = anioFundacion ? (await anioActual()) - anioFundacion : 0;
  const hayLista = garantias.length > 0 || acreditaciones.length > 0 || marcas.length > 0;
  return (
    <section id="garantias" aria-labelledby="h2-garantias" className="pt-(--sec)">
      <TituloSeccion n={n} id="h2-garantias">
        Nuestras garantías
      </TituloSeccion>
      <div className="border border-tinta p-1.5">
        <div className="flex flex-wrap items-start gap-x-14 gap-y-8 border border-tinta p-[clamp(24px,1rem+2vw,48px)]">
          {anioFundacion && (
            <div className="flex flex-[1_1_220px] flex-col gap-1.5">
              <p className="etiqueta text-texto-suave">Sello del taller</p>
              <p className="titulo text-[clamp(2.25rem,1.5rem+3vw,4.25rem)] leading-[1.02]">Taller desde {anioFundacion}</p>
              {anios > 0 && (
                <p className="font-titulo text-[12.5px] tracking-[0.04em] text-texto-suave">
                  {anios === 1 ? "1 año" : `${anios} años`} en el mismo banco · {ciudad}
                </p>
              )}
            </div>
          )}
          {hayLista && (
            <div className="flex flex-[1_1_300px] flex-col gap-5">
              {garantias.length > 0 && (
                <ul className="flex flex-col gap-3.5">
                  {garantias.map((g) => (
                    <li key={g} className="flex items-baseline gap-3.5">
                      <span aria-hidden="true" className="font-titulo text-lapiz">
                        —
                      </span>
                      <span className="text-lg">{g}</span>
                    </li>
                  ))}
                </ul>
              )}
              {acreditaciones.length > 0 && (
                <ul className="flex flex-col gap-1.5 font-titulo text-[13px]">
                  {acreditaciones.map((a) => (
                    <li key={a.nombre}>
                      {a.nombre}
                      {a.numero && ` · ${a.numero}`}
                    </li>
                  ))}
                </ul>
              )}
              {marcas.length > 0 && <p className="etiqueta text-texto-suave">Trabajamos con {listaY([...marcas])}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
