import Link from "next/link";
import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { IconoSalir } from "@/components/Iconos";
import { Foto } from "@/components/base/Foto";
import { resenasRecientes } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = Pick<SiteConfig, "resenas" | "valoracion" | "trabajos"> & { fichaGoogle?: string; className?: string };

const LARGA = 300;

/**
 * Reseñas (encargo §6.8): valoración, «Ver todas en Google» (solo con `fichaGoogle`), el testimonio
 * del primer trabajo que lo tenga en una tarjeta ancha con la miniatura del después y el enlace, y
 * las 3 reseñas más recientes. Una reseña de más de 300 caracteres se corta a 5 líneas con «Leer
 * entera» (`<details>`, sin JS; el texto entero está en el HTML). Sin reseñas, no existe.
 */
export function Resenas({ resenas, valoracion, trabajos, fichaGoogle, className }: Props) {
  if (resenas.length === 0) return null;
  const obra = trabajos.find((t) => t.testimonio);
  const lista = resenasRecientes(resenas, 3);
  const deGoogle = resenas.every((r) => r.fuente === "google");
  return (
    <section aria-labelledby="titulo-resenas" className={cn("border-y border-borde bg-superficie py-[clamp(56px,2rem+6vw,112px)]", className)}>
      <div className="contenedor">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2 id="titulo-resenas" className="titulo-seccion">
              {deGoogle ? "Lo que dicen en Google" : "Lo que dicen de nosotros"}
            </h2>
            {valoracion && (
              <p className="mt-2.5 flex items-center gap-2">
                <span aria-hidden="true" className="text-xl text-primario-texto">
                  ★
                </span>
                <strong className="text-xl">{mediaVisible(valoracion.media)}</strong>
                <span className="text-texto-suave">
                  de {valoracion.total} {valoracion.total === 1 ? "reseña" : "reseñas"} en Google
                </span>
              </p>
            )}
          </div>
          {fichaGoogle && (
            <a href={fichaGoogle} className="inline-flex min-h-11 items-center gap-1.5 font-bold underline underline-offset-4">
              Ver todas en Google
              <IconoSalir />
            </a>
          )}
        </div>
        {obra?.testimonio && (
          <figure className="mb-4 flex flex-wrap items-center gap-x-7 gap-y-4 rounded-tarjeta bg-primario-suave p-4">
            <div className="w-28 flex-none">
              <Foto imagen={obra.imagenes[0]} proporcion="4/5" sizes="112px" decorativa sinEtiqueta>
                <span className="absolute top-2 left-2 z-[3] rounded-pastilla bg-acento px-2 py-[5px] text-[11px] leading-none font-bold text-sobre-acento">
                  Después
                </span>
              </Foto>
            </div>
            <div className="flex flex-[1_1_240px] flex-col gap-2.5">
              <blockquote className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.45] font-bold">«{obra.testimonio.texto}»</blockquote>
              <figcaption className="flex flex-wrap gap-x-4 gap-y-0.5 text-[15px] text-texto-suave">
                <span>{obra.testimonio.autor}</span>
                <Link href={`/trabajos/${obra.slug}`} className="inline-flex min-h-6 items-center font-bold text-texto underline underline-offset-3">
                  Ver «{obra.titulo}»
                </Link>
              </figcaption>
            </div>
          </figure>
        )}
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-4">
          {lista.map((r) => {
            const larga = r.texto.length > LARGA;
            return (
              <li key={r.autor + r.texto.slice(0, 20)} className={cn("flex", larga && "resena-larga")}>
                <article className="flex w-full flex-col gap-2.5 rounded-tarjeta border border-borde bg-fondo px-[22px] py-5">
                  <span role="img" aria-label={`${r.puntuacion} de 5 estrellas`} className="text-[17px] tracking-[2px]">
                    <span aria-hidden="true">{"★".repeat(r.puntuacion)}</span>
                    <span aria-hidden="true" className="text-texto-suave">
                      {"☆".repeat(5 - r.puntuacion)}
                    </span>
                  </span>
                  <p className="texto-resena text-[17px] leading-[1.55]">{r.texto}</p>
                  {larga && (
                    <details>
                      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-[15px] font-bold underline underline-offset-3">
                        <span className="leer-entera">Leer entera</span>
                        <span className="leer-menos">Leer menos</span>
                      </summary>
                    </details>
                  )}
                  <p className="mt-auto flex flex-wrap gap-x-2.5 gap-y-0.5 text-sm text-texto-suave">
                    <strong className="text-texto">{r.autor}</strong>
                    {(r.fecha || r.fuente === "google") && (
                      <span>{[r.fecha && fechaResena(r.fecha), r.fuente === "google" && "Google"].filter(Boolean).join(" · ")}</span>
                    )}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
