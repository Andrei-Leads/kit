import Link from "next/link";
import { fechaResena, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Estrellas } from "@/components/Iconos";
import { Valoracion } from "@/components/secciones/Valoracion";
import { partirResena } from "@/lib/textos";

type Props = Pick<SiteConfig, "resenas" | "valoracion" | "trabajos"> & {
  fichaGoogle?: string;
  /** Testimonio grande del primer trabajo que lo tenga (solo en el inicio). */
  conTestimonio?: boolean;
};

const FUENTE = { google: "Google", web: "Web", otra: undefined } as const;

/**
 * «Lo que cuentan después» (encargo §6.6): el testimonio grande junto a la foto en arco de
 * su casa y debajo las 3 reseñas más recientes. Una reseña larga se corta con «Leer más»
 * en `<details>`. «Ver todas en Google» solo con `fichaGoogle`. Sin reseñas, no sale.
 */
export function ResenasTestimonio({ resenas, valoracion, trabajos, fichaGoogle, conTestimonio }: Props) {
  if (resenas.length === 0) return null;
  const recientes = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 3);
  const conT = conTestimonio ? trabajos.find((t) => t.testimonio) : undefined;
  return (
    <section aria-labelledby="titulo-resenas" className="seccion">
      <div className="contenedor">
        <h2 id="titulo-resenas" className="titulo-seccion mb-10">
          Lo que cuentan después
        </h2>
        {conT?.testimonio && (
          <div className="mb-14 grid items-center gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <figure className="m-0">
              <blockquote className="remate m-0 text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.3] text-balance">
                «{conT.testimonio.texto}»
              </blockquote>
              <figcaption className="mt-[18px] text-base text-texto-suave">
                {conT.testimonio.autor} ·{" "}
                <Link href={`/trabajos/${conT.slug}`} className="underline">
                  {conT.titulo}
                </Link>
              </figcaption>
            </figure>
            <div className="w-[72%] justify-self-center lg:w-full">
              <Foto imagen={conT.imagenes[0]} sizes="(min-width: 1024px) 30vw, 72vw" arco calidad={60} />
            </div>
          </div>
        )}
        {valoracion && <Valoracion valoracion={valoracion} deCinco className="mb-5" />}
        <ul className="m-0 grid list-none items-start gap-x-5 gap-y-4 p-0 lg:grid-cols-3">
          {recientes.map((r) => {
            const { inicio, resto } = partirResena(r.texto);
            const fuente = r.fuente ? FUENTE[r.fuente] : undefined;
            return (
              <li key={r.autor + r.texto.slice(0, 20)} className="flex flex-col gap-3 rounded-tarjeta bg-superficie px-[26px] pt-[26px] pb-6">
                <p className="m-0 text-lg leading-none text-acento">
                  <Estrellas puntuacion={r.puntuacion} />
                  <span className="sr-only">{r.puntuacion} de 5 estrellas</span>
                </p>
                <p className="m-0">{inicio}</p>
                {resto && (
                  <details className="-mt-1.5">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center text-[15px] font-semibold underline underline-offset-4 [&::-webkit-details-marker]:hidden">
                      Leer más
                    </summary>
                    <p className="m-0 mt-1.5">{resto}</p>
                  </details>
                )}
                <p className="m-0 mt-1 text-[15px] text-texto-suave">
                  <strong className="font-semibold text-texto">{r.autor}</strong>
                  {r.fecha && <> · {fechaResena(r.fecha)}</>}
                  {fuente && <> · {fuente}</>}
                </p>
              </li>
            );
          })}
        </ul>
        {fichaGoogle && (
          <p className="m-0 mt-6">
            <a href={fichaGoogle} className="inline-flex min-h-11 items-center text-base font-semibold underline">
              Ver todas en Google <span aria-hidden="true">&nbsp;→</span>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
