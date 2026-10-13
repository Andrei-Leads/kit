import type { Resena, SiteConfig } from "@andrei-leads/core";
import { ExternalLink } from "lucide-react";

import { estrellas, fechaLegible, mediaVisible } from "@/lib/formato";
import { h2Seccion, seccion } from "@/lib/estilos";

type Props = {
  resenas: Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  titulo?: string;
};

const LARGA = 150;

/** Las 3 más recientes por fecha; las que no tienen fecha, detrás y en el orden de los datos. */
function masRecientes(resenas: Resena[]): Resena[] {
  const conFecha = resenas
    .filter((r) => r.fecha)
    .sort((a, b) => (b.fecha as string).localeCompare(a.fecha as string));
  const sinFecha = resenas.filter((r) => !r.fecha);
  return [...conFecha, ...sinFecha].slice(0, 3);
}

export function Resenas({ resenas, valoracion, fichaGoogle, titulo = "Lo que dicen nuestros clientes" }: Props) {
  if (resenas.length === 0) return null;

  return (
    <section id="resenas" className={`bg-tarjeta ${seccion}`}>
      <div className="contenedor flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="flex flex-col gap-1.5">
            <h2 className={h2Seccion}>{titulo}</h2>
            {valoracion && (
              <p className="m-0 flex items-baseline gap-2 text-[17px]">
                <span aria-hidden="true" className="text-xl">★</span>
                <strong className="text-[22px] tabular-nums">{mediaVisible(valoracion.media)}</strong>
                <span className="text-tinta-suave">{valoracion.total} reseñas</span>
              </p>
            )}
          </div>
          {fichaGoogle && (
            <a
              href={fichaGoogle}
              className="inline-flex min-h-11 items-center gap-1.5 font-bold text-tinta"
            >
              <span>Ver todas en Google</span>
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          )}
        </div>
        <div className="grid items-start gap-3 md:grid-cols-3">
          {masRecientes(resenas).map((r, i) => (
            <Tarjeta key={`${r.autor}-${i}`} resena={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tarjeta({ resena }: { resena: Resena }) {
  const larga = resena.texto.length > LARGA;
  return (
    // `group/r`: la <details> abierta (vacía, solo «Leer más/menos») quita el recorte del texto, sin JS.
    <article className="group/r flex flex-col gap-2.5 rounded-md bg-papel p-[18px]">
      <p className="m-0 text-lg leading-none tracking-[2px]">
        <span aria-hidden="true">{estrellas(resena.puntuacion)}</span>
        <span className="sr-only">{resena.puntuacion} de 5</span>
      </p>
      <p
        className={
          "m-0 text-pretty" + (larga ? " line-clamp-4 group-has-[details[open]]/r:line-clamp-none" : "")
        }
      >
        {resena.texto}
      </p>
      {larga && (
        <details className="group/d">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center font-bold text-tinta underline [&::-webkit-details-marker]:hidden">
            <span className="group-open/d:hidden">Leer más</span>
            <span className="hidden group-open/d:inline">Leer menos</span>
          </summary>
        </details>
      )}
      <p className="m-0 text-[15px]">
        <strong>{resena.autor}</strong>
        {resena.fecha && <span className="text-tinta-suave"> · {fechaLegible(resena.fecha)}</span>}
      </p>
    </article>
  );
}
