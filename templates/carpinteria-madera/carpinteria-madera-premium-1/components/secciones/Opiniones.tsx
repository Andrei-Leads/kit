import type { CSSProperties } from "react";
import { fechaResena, mediaVisible, type Resena, type SiteConfig } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import type { DatosCta } from "@/lib/textos";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  trabajos: SiteConfig["trabajos"];
  cta: DatosCta;
  confianza?: string;
  /** Pareja al final (en /servicios la pone la CTA final). */
  conPareja?: boolean;
};

function meta(r: Resena, conFuente = false): string {
  return [conFuente && r.fuente === "google" ? "Google" : undefined, r.fecha ? fechaResena(r.fecha) : undefined].filter(Boolean).join(" · ");
}

/**
 * Opiniones (encargo §6.8): la reseña más reciente en Newsreader 300 grande, 2–3
 * más en texto pequeño (las largas, recortadas a 6 líneas solo a la vista), el
 * testimonio de la obra más reciente que lo tenga y «Ver todas en Google →».
 */
export function Opiniones({ resenas, valoracion, fichaGoogle, trabajos, cta, confianza, conPareja = true }: Props) {
  if (resenas.length === 0) return null;
  const orden = resenas
    .map((r, i) => ({ r, i }))
    .sort((a, b) => (b.r.fecha ?? "").localeCompare(a.r.fecha ?? "") || a.i - b.i)
    .map(({ r }) => r);
  const [top, ...mas] = orden;
  const conTestimonio = [...trabajos].sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0)).find((t) => t.testimonio);

  return (
    <section id="opiniones" data-tono="claro" aria-labelledby="titulo-opiniones" className="seccion" style={{ viewTimelineName: "--sec-opiniones" }}>
      <div className="contenedor">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="titulo-opiniones" className="etiqueta m-0 text-texto-suave">
            Opiniones
          </h2>
          {valoracion && (
            <p className="m-0 text-sm text-texto-suave">
              {mediaVisible(valoracion.media)} de 5 · {valoracion.total} reseñas en Google
            </p>
          )}
        </div>
        <figure className="m-0 mt-7 max-w-[900px]">
          <blockquote className="titulo m-0 text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] leading-[1.15]">«{top.texto}»</blockquote>
          <figcaption className="mt-5 text-sm text-texto-suave">
            {top.autor}
            {meta(top, true) && <> · {meta(top, true)}</>}
          </figcaption>
        </figure>
        {mas.length > 0 && (
          <div className="mt-[clamp(48px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-8">
            {mas.slice(0, 3).map((r, i) => (
              <figure key={r.autor + i} data-aparecer style={{ "--i": i } as CSSProperties} className="m-0 border-t border-borde pt-5">
                <p className="m-0 text-[13px] tracking-[0.12em]">
                  <span aria-hidden="true">
                    {"★".repeat(Math.round(r.puntuacion))}
                    {"☆".repeat(5 - Math.round(r.puntuacion))}
                  </span>
                  <span className="sr-only">{r.puntuacion} de 5 estrellas</span>
                </p>
                <blockquote className="m-0 mt-2.5 line-clamp-6 text-base leading-[1.55]">{r.texto}</blockquote>
                <figcaption className="mt-3 text-[13px] text-texto-suave">
                  {r.autor}
                  {meta(r) && <> · {meta(r)}</>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        {conTestimonio?.testimonio && (
          <figure className="m-0 mt-[clamp(48px,5vw,72px)] flex flex-wrap items-baseline justify-between gap-x-12 gap-y-4 border-y border-borde py-7">
            <blockquote className="titulo m-0 max-w-[40ch] flex-[1_1_420px] text-h3 leading-[1.25]">«{conTestimonio.testimonio.texto}»</blockquote>
            <figcaption className="flex flex-[0_1_300px] flex-col text-sm leading-normal text-texto-suave">
              <span>{conTestimonio.testimonio.autor}</span>
              <span>{conTestimonio.titulo}</span>
              <EnlaceFlecha href={`/trabajos/${conTestimonio.slug}`} className="text-texto">
                Ver obra
              </EnlaceFlecha>
            </figcaption>
          </figure>
        )}
        {(conPareja || fichaGoogle) && (
          <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
            {conPareja && <ParejaCta cta={cta} tono="claro" confianza={confianza} className="flex-[1_1_520px]" />}
            {fichaGoogle && (
              <EnlaceFlecha href={fichaGoogle} externo>
                Ver todas en Google
              </EnlaceFlecha>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
