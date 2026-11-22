import Link from "next/link";
import { mediaVisible, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { etiquetaPieza, fechaCorta } from "@/lib/textos";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Testimonio de una obra (solo en el inicio) y su posición en `trabajos`. */
  testimonio?: { trabajo: Trabajo; indice: number };
};

/**
 * Reseñas (encargo §6): «Lo que dicen» con la media en grande, las 3 más recientes en tarjetas de
 * hierro (una larga hace crecer solo la suya) y, si hay, el testimonio de una obra con su foto y el
 * enlace. «Ver todas en Google» solo con `fichaGoogle`. Sin reseñas, no se pinta.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, testimonio }: Props) {
  if (resenas.length === 0) return null;
  const recientes = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 3);
  const t = testimonio?.trabajo.testimonio && testimonio;
  return (
    <section aria-labelledby="titulo-resenas" className="py-[clamp(36px,5vw,72px)]">
      <div className="contenedor">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2 id="titulo-resenas" className="h2">
              Lo que dicen
            </h2>
            {valoracion && (
              <p className="mt-1.5 flex items-baseline gap-2.5 font-titulo font-extrabold uppercase">
                <span className="text-[44px] leading-none">{mediaVisible(valoracion.media)}</span>
                <span className="text-lg tracking-[0.05em] text-texto-suave">
                  {valoracion.total.toLocaleString("es-ES")} reseñas en Google
                </span>
              </p>
            )}
          </div>
          {fichaGoogle && (
            <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace whitespace-nowrap">
              Ver todas en Google →
            </a>
          )}
        </div>
        <ul className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-2.5">
          {recientes.map((r) => (
            <li key={`${r.autor}-${r.fecha ?? ""}`}>
              <figure className="hierro corte-tarjeta px-5 pt-5 pb-[22px]">
                <div className="flex items-center justify-between gap-3">
                  <span role="img" aria-label={`${r.puntuacion} de 5 estrellas`} className="text-[15px] tracking-[2px] text-acento">
                    {"★".repeat(r.puntuacion)}
                    {"☆".repeat(5 - r.puntuacion)}
                  </span>
                  {r.fecha && <span className="font-titulo text-sm font-bold tracking-[0.08em] text-texto-suave uppercase">{fechaCorta(r.fecha)}</span>}
                </div>
                <blockquote className="mt-3 text-[15.5px] leading-normal text-pretty">{r.texto}</blockquote>
                <figcaption className="mt-3 font-titulo text-lg font-extrabold tracking-[0.03em] uppercase">{r.autor}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        {t && t.trabajo.testimonio && (
          <figure className="hierro corte-tarjeta mt-2.5 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <Foto imagen={t.trabajo.imagenes[0]} sizes="(min-width: 1024px) 440px, calc(100vw - 32px)" proporcion="4/3" />
            <div className="flex flex-col justify-center gap-3 p-[22px]">
              <p className="font-titulo text-sm font-bold tracking-[0.08em] text-acento uppercase">{etiquetaPieza(t.trabajo, t.indice)}</p>
              <blockquote className="font-titulo text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-[1.05] font-bold text-balance uppercase">
                «{t.trabajo.testimonio.texto}»
              </blockquote>
              <figcaption className="text-[15px] text-texto-suave">
                {t.trabajo.testimonio.autor} ·{" "}
                <Link href={`/trabajos/${t.trabajo.slug}`} className="inline-flex min-h-11 items-center text-sobre-hierro underline underline-offset-[3px]">
                  Ver la obra
                </Link>
              </figcaption>
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}
