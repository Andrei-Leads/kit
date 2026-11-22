import Link from "next/link";
import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { partirResena, resenasRecientes } from "@/lib/textos";

type Props = Pick<SiteConfig, "resenas" | "valoracion" | "trabajos"> & { fichaGoogle?: string };

const mayuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * Reseñas y testimonio (encargo §6.6): valoración grande, el testimonio de la primera obra que
 * lo tenga (cita en serif cursiva con su foto «después» y enlace) y las 3 reseñas más recientes
 * con filete. Una reseña larga se corta con «Leer más» en `<details>`. Sin reseñas, no existe.
 */
export function Resenas({ resenas, valoracion, trabajos, fichaGoogle }: Props) {
  if (resenas.length === 0) return null;
  const obra = trabajos.find((t) => t.testimonio);
  const lista = resenasRecientes(resenas, 3);
  return (
    <section aria-labelledby="titulo-resenas" className="border-t border-filete">
      <div className="contenedor seccion">
        <p className="versalitas mb-3.5">Reseñas</p>
        <h2 id="titulo-resenas" className="titulo-seccion filete-h2 text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] tracking-[-0.02em]">
          {valoracion ? (
            <>
              {mediaVisible(valoracion.media)} <span className="text-primario-texto italic">·</span> {valoracion.total} {valoracion.total === 1 ? "reseña" : "reseñas"} en Google
            </>
          ) : (
            "Lo que dicen de nuestras obras"
          )}
        </h2>
        {obra?.testimonio && (
          <figure
            data-aparecer
            className="mt-[clamp(32px,4vw,56px)] grid items-center gap-[clamp(24px,4vw,72px)] lg:grid-cols-[7fr_5fr]"
          >
            <div>
              <blockquote className="font-titulo text-[clamp(1.5rem,1.1rem+1.8vw,2.5rem)] leading-[1.2] tracking-[-0.01em] text-balance italic">
                «{obra.testimonio.texto}»
              </blockquote>
              <figcaption className="versalitas mt-5">
                {obra.testimonio.autor} · {obra.titulo}
              </figcaption>
              <Link href={`/trabajos/${obra.slug}`} className="enlace mt-2 inline-flex min-h-11 items-center">
                Ver la obra<span className="sr-only">: {obra.titulo}</span>
              </Link>
            </div>
            <div className="max-w-[420px]">
              <Foto imagen={obra.imagenes[0]} sizes="(min-width: 1024px) 420px, 100vw" />
            </div>
          </figure>
        )}
        <ul className="mt-[clamp(40px,5vw,72px)] grid gap-[clamp(24px,3vw,48px)] lg:grid-cols-3">
          {lista.map((r) => {
            const { inicio, resto } = partirResena(r.texto);
            return (
              <li key={r.autor + r.texto.slice(0, 20)} data-aparecer className="border-t border-texto pt-[18px]">
                <article>
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <span role="img" aria-label={`${r.puntuacion} de 5`} className="text-[15px] tracking-[2px]">
                      <span aria-hidden="true">{"★".repeat(r.puntuacion)}</span>
                      <span aria-hidden="true" className="opacity-25">
                        {"★".repeat(5 - r.puntuacion)}
                      </span>
                    </span>
                    {r.fecha && <span className="versalitas">{mayuscula(fechaResena(r.fecha))}</span>}
                  </div>
                  <p className="mb-2.5 text-base leading-[1.6]">{inicio}</p>
                  {resto && (
                    <details className="mb-2.5">
                      <summary className="enlace flex min-h-11 w-max cursor-pointer list-none items-center [&::-webkit-details-marker]:hidden">
                        Leer más
                      </summary>
                      <p className="text-base leading-[1.6]">{resto}</p>
                    </details>
                  )}
                  <p className="font-titulo text-lg">{r.autor}</p>
                </article>
              </li>
            );
          })}
        </ul>
        {fichaGoogle && (
          <a href={fichaGoogle} className="enlace mt-6 inline-flex min-h-11 items-center">
            Ver todas en Google
          </a>
        )}
      </div>
    </section>
  );
}
