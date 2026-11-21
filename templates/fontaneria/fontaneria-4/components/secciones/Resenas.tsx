import type { ReactNode } from "react";
import type { Resena, SiteConfig } from "@andrei-leads/core";

import { fechaParte, valoracionParte } from "@/lib/formato";

import { Encabezado } from "./Encabezado";

type Props = Pick<SiteConfig, "resenas" | "valoracion"> & {
  fichaGoogle?: string;
  n?: string;
  /** En el inicio cierra con la pareja de botones (`<Pareja>` que pasa la página). */
  children?: ReactNode;
};

/** Las 6 más recientes (las que no tienen fecha, al final). */
function recientes(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 6);
}

/**
 * Resenas (encargo §6.6): «notas en el reverso del parte». Texto entero en la fuente de texto, autor y
 * fecha en mono («12/11/2026»), estrellas como cinco casillas rellenas en --color-primario. Dos columnas
 * en escritorio. «Ver todas en Google» solo con `fichaGoogle`. Sin reseñas, no existe.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, n, children }: Props) {
  if (resenas.length === 0) return null;
  return (
    <section id="resenas" aria-labelledby="h2-resenas" className="border-y border-borde bg-alterna px-(--pad) py-(--sec)">
      <Encabezado n={n} rotulo="Reverso del parte · Reseñas" />
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <h2 id="h2-resenas" className="h2-parte">
          Lo que firman los clientes
        </h2>
        {valoracion && (
          <div className="border border-texto bg-superficie px-3 py-2">
            <div className="rotulo text-[0.6875rem]">Valoración en Google</div>
            <div className="font-titulo text-lg font-bold">{valoracionParte(valoracion)}</div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-x-8 gap-y-7">
        {recientes(resenas).map((r) => (
          <figure key={r.autor + r.texto.slice(0, 20)} className="flex flex-col gap-2.5 border-t border-texto pt-3" data-aparecer>
            <div role="img" aria-label={`${r.puntuacion} de 5`} className="flex gap-[3px]">
              {[1, 2, 3, 4, 5].map((k) => (
                <span key={k} className={`size-3 border border-primario ${k <= r.puntuacion ? "bg-primario" : ""}`} />
              ))}
            </div>
            <blockquote className="text-[1.0625rem] leading-relaxed text-pretty">{r.texto}</blockquote>
            <figcaption className="flex flex-wrap gap-x-2.5 gap-y-1 font-titulo text-[0.8125rem] text-acento">
              <span className="font-bold">{r.autor}</span>
              {r.fecha && <span className="text-texto-suave">{fechaParte(r.fecha)}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
      {fichaGoogle && (
        <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace-parte mt-6">
          Ver todas en Google →
        </a>
      )}
      {children && <div className="mt-8 border-t border-dashed border-cota pt-5">{children}</div>}
    </section>
  );
}
