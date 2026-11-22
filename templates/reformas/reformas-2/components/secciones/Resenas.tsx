import Link from "next/link";
import { fechaResena, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { lineaValoracion } from "@/lib/textos";

type Props = {
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Inicio: el primer trabajo con testimonio va primero, en una tarjeta ancha con su foto. */
  testimonio?: Trabajo;
};

const LARGA = 240;

/** Las más recientes primero (sin fecha, al final), como mucho 6. */
function recientes(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 6);
}

/**
 * Reseñas (encargo §6.6): tarjetas redondeadas en dos columnas; el testimonio de una obra va
 * primero. Una reseña larga se recorta a 6 líneas con «Leer más» en `<details>` (sin JS). «Ver
 * todas en Google» solo con `fichaGoogle`. Sin reseñas ni testimonio, no pinta nada.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, testimonio }: Props) {
  const lista = recientes(resenas);
  const test = testimonio?.testimonio;
  if (lista.length === 0 && !test) return null;
  return (
    <section aria-labelledby="h2-resenas" className="seccion">
      <div className="contenedor flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="flex flex-col gap-1.5">
            <h2 id="h2-resenas" className="h2">
              Lo que dicen de nosotros
            </h2>
            {valoracion && (
              <p className="font-semibold">
                <span aria-hidden="true">★ </span>
                {lineaValoracion(valoracion)}
              </p>
            )}
          </div>
          {fichaGoogle && (
            <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace">
              Ver todas en Google →
            </a>
          )}
        </div>

        {testimonio && test && (
          <figure className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-x-[clamp(16px,4vw,48px)] gap-y-2 rounded-[28px] bg-superficie p-2 shadow-tarjeta">
            <Foto imagen={testimonio.imagenes[0]} sizes="(min-width: 1024px) 560px, calc(100vw - 48px)" className="rounded-[22px]" />
            <div className="flex flex-col gap-4 p-[clamp(12px,3vw,32px)]">
              <blockquote className="font-titulo text-[clamp(1.25rem,1rem+1vw,1.875rem)] leading-[1.3] font-medium tracking-[-0.01em] text-pretty">
                «{test.texto}»
              </blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <strong>{test.autor}</strong>
                <Link href={`/trabajos/${testimonio.slug}`} className="inline-flex min-h-11 items-center self-start text-[15px] text-texto-suave underline underline-offset-[3px]">
                  {testimonio.titulo}
                </Link>
              </figcaption>
            </div>
          </figure>
        )}

        {lista.length > 0 && (
          <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {lista.map((r) => {
              const larga = r.texto.length > LARGA;
              return (
                <li key={`${r.autor}-${r.fecha ?? ""}`} className="flex flex-col gap-2.5 rounded-tarjeta border border-borde bg-superficie px-[22px] py-5">
                  <span role="img" aria-label={`${r.puntuacion} de 5 estrellas`} className="text-[15px] tracking-[2px]">
                    {"★".repeat(r.puntuacion)}
                    {"☆".repeat(5 - r.puntuacion)}
                  </span>
                  <p className={larga ? "recorte text-pretty" : "text-pretty"}>{r.texto}</p>
                  {larga && (
                    <details className="-my-2">
                      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center font-semibold underline decoration-primario underline-offset-4">
                        <span className="leer-mas">Leer más</span>
                        <span className="leer-menos">Leer menos</span>
                      </summary>
                    </details>
                  )}
                  <p className="mt-auto text-sm text-texto-suave">
                    <strong className="text-texto">{r.autor}</strong>
                    {r.fecha && <> · {fechaResena(r.fecha)}</>}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
