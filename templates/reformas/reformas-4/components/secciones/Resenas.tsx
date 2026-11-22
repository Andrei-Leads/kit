import type { ReactNode } from "react";
import Link from "next/link";
import type { Resena, SiteConfig, Trabajo } from "@andrei-leads/core";

import { Rotulo } from "@/components/Rotulo";
import { cortarResena, estrellas, valoracionLarga } from "@/lib/formato";

type Props = {
  n: string;
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Primer trabajo (en el orden del diario) con testimonio: va primero, con enlace a su entrada. */
  testimonio?: Trabajo;
  children?: ReactNode;
};

/**
 * Reseñas como notas fechadas en mono (encargo §6.6): «2026-09 · Rocío P. · ★★★★★» y el texto en la
 * sans. Las 4 más recientes; una larga se corta con «Leer más» en `<details>`. «Ver todas en Google»
 * solo con `fichaGoogle`.
 */
export function Resenas({ n, resenas, valoracion, fichaGoogle, testimonio, children }: Props) {
  const recientes = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 4);
  return (
    <section id="resenas" aria-labelledby="h2-resenas" className="px-(--pad) py-(--sec)">
      <div className="max-w-[1040px]">
        <Rotulo n={n}>Reseñas</Rotulo>
        <h2 id="h2-resenas" className="h2-diario mb-3">
          Lo que dicen al acabar
        </h2>
        {valoracion && (
          <p className="mono mb-10 text-[13px] text-texto-suave">
            <span aria-hidden="true" className="text-primario-claro">
              ★{" "}
            </span>
            {valoracionLarga(valoracion)}
          </p>
        )}
        {testimonio?.testimonio && (
          <figure className="mb-10 grid gap-[18px] border-t border-t-cota border-b border-b-borde py-8">
            <blockquote className="max-w-[36ch] text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-[1.45] text-texto">«{testimonio.testimonio.texto}»</blockquote>
            <figcaption className="mono flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-texto-suave">
              — {testimonio.testimonio.autor} ·
              <Link href={`/trabajos/${testimonio.slug}`} className="inline-flex min-h-11 items-center no-underline">
                {testimonio.titulo} →
              </Link>
            </figcaption>
          </figure>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-px border border-borde bg-borde">
          {recientes.map((r) => {
            const corte = cortarResena(r.texto);
            return (
              <article key={`${r.autor}-${r.fecha ?? ""}`} data-aparecer className="grid content-start gap-3 bg-fondo px-[22px] pt-6 pb-7">
                <p className="mono flex flex-wrap gap-x-2.5 gap-y-1 text-xs text-texto-suave">
                  <span>{[r.fecha, r.autor].filter(Boolean).join(" · ")}</span>
                  <span role="img" aria-label={`${r.puntuacion} de 5 estrellas`} className="tracking-[0.1em] text-primario-claro">
                    {estrellas(r.puntuacion)}
                  </span>
                </p>
                {corte ? (
                  <>
                    <p className="text-[17px] leading-[1.6] text-texto">{corte.corto}</p>
                    <details>
                      <summary className="mono inline-flex min-h-11 cursor-pointer items-center text-xs text-primario-claro">… Leer más</summary>
                      <p className="text-[17px] leading-[1.6] text-texto">{corte.resto}</p>
                    </details>
                  </>
                ) : (
                  <p className="text-[17px] leading-[1.6] text-texto">{r.texto}</p>
                )}
              </article>
            );
          })}
        </div>
        {fichaGoogle && (
          <a href={fichaGoogle} target="_blank" rel="noopener" className="mono mt-4 inline-flex min-h-11 items-center text-[13px] no-underline">
            Ver todas en Google →
          </a>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
