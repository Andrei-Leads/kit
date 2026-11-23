import type { ReactNode } from "react";
import Link from "next/link";
import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { rotuloPieza } from "@/lib/piezas";

type Props = Pick<SiteConfig, "resenas" | "valoracion" | "trabajos"> & {
  fichaGoogle?: string;
  /** Pareja al pie. */
  children?: ReactNode;
};

/**
 * «Lo que dicen» (encargo §6.6): nota grande a la izquierda (con `valoracion`), tres columnas con las
 * 3 reseñas más recientes y comillas de acento, y debajo el primer `testimonio` de una pieza con su
 * número. «Ver todas en Google» solo con `fichaGoogle`. Sin reseñas, no sale.
 */
export function Resenas({ resenas, valoracion, trabajos, fichaGoogle, children }: Props) {
  if (resenas.length === 0) return null;
  const tres = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 3);
  const iTestimonio = trabajos.findIndex((t) => t.testimonio);
  const pieza = iTestimonio >= 0 ? trabajos[iTestimonio] : undefined;
  return (
    <section aria-labelledby="titulo-resenas" className="contenedor flex flex-col gap-[18px] pt-(--seccion)">
      <h2 id="titulo-resenas" className="titulo-h2 m-0 border-b-2 border-borde pb-2.5">
        Lo que dicen
      </h2>
      <div className="flex flex-wrap gap-x-[clamp(1rem,0.5rem+2.5vw,3rem)] gap-y-7">
        {valoracion && (
          <div className="flex flex-[1_1_200px] flex-col gap-1.5">
            <p className="ft m-0 text-[clamp(5rem,3rem+6vw,9rem)] leading-[0.8]">
              {mediaVisible(valoracion.media)}
              <span className="sr-only"> de 5</span>
            </p>
            <p className="pie-ficha m-0 text-sm">
              <span aria-hidden="true">de 5 · </span>
              {valoracion.total} {valoracion.total === 1 ? "reseña" : "reseñas"} en Google
            </p>
            {fichaGoogle && (
              <a href={fichaGoogle} rel="noopener" className="ft flex min-h-11 items-center self-start text-base tracking-[0.04em] text-texto underline">
                Ver todas en Google <span aria-hidden="true">&nbsp;→</span>
              </a>
            )}
          </div>
        )}
        <div className="grid min-w-0 flex-[3_1_560px] grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-6">
          {tres.map((r) => {
            const estrellas = Math.round(r.puntuacion);
            return (
              <figure key={`${r.autor}-${r.fecha ?? ""}`} className="m-0 flex flex-col gap-2.5 border-t-2 border-borde pt-2.5">
                <span aria-hidden="true" className="ft numero h-[30px] text-[4rem] leading-[0.6] [text-decoration-line:none]">
                  «
                </span>
                <blockquote className="m-0 text-[1.0625rem] leading-[1.45] text-pretty">{r.texto}</blockquote>
                <figcaption className="pie-ficha text-texto-suave">
                  {r.autor}
                  {r.fecha && ` · ${fechaResena(r.fecha)}`} ·{" "}
                  <span role="img" aria-label={`${r.puntuacion} de 5`}>
                    {"★".repeat(estrellas)}
                    {"☆".repeat(5 - estrellas)}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      {pieza?.testimonio && (
        <Link
          href={`/trabajos/${pieza.slug}`}
          className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-y-2 border-borde py-4 text-texto no-underline [@media(hover:hover)]:hover:bg-fila"
        >
          <span className="ft numero text-[clamp(1.75rem,1.3rem+1.4vw,2.75rem)] leading-none">{rotuloPieza(iTestimonio)}</span>
          <span className="ft flex-[1_1_300px] text-[clamp(1.375rem,1rem+1.4vw,2.25rem)] leading-none">«{pieza.testimonio.texto}»</span>
          <span className="pie-ficha text-texto-suave">
            {pieza.testimonio.autor} · {pieza.titulo}
          </span>
        </Link>
      )}
      {children && <div className="mt-2">{children}</div>}
    </section>
  );
}
