import type { CSSProperties, ReactNode } from "react";
import { fechaResena, mediaVisible, type Resena, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Estrellas, IconoExterno } from "@/components/Iconos";
import { resenasRecientes, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  resenas: readonly Resena[];
  valoracion: SiteConfig["valoracion"];
  fichaGoogle?: string;
  cta: DatosCta;
  textoWhatsapp?: ReactNode;
};

/**
 * Bento de reseñas (las 6 más recientes): la más larga en tarjeta ancha con la
 * cita a 30 px, las demás pequeñas a 22 px. Cierra con la pareja y «Ver todas en
 * Google» (con ficha). Sin reseñas, no existe.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, cta, textoWhatsapp }: Props) {
  if (resenas.length === 0) return null;
  const lista = resenasRecientes(resenas).slice(0, 6);
  const larga = lista.reduce((m, r, i) => (r.texto.length > lista[m].texto.length ? i : m), 0);
  return (
    <section aria-labelledby="titulo-resenas" className="seccion pt-0">
      <div className="contenedor">
        <h2 id="titulo-resenas" className="titulo-seccion">
          {valoracion ? `${mediaVisible(valoracion.media)} de 5 en Google` : "Lo que dicen de nosotros"}
        </h2>
        {valoracion && (
          <p className="m-0 mt-2 text-texto-suave">
            {valoracion.total} {valoracion.total === 1 ? "reseña" : "reseñas"}. Estas son las más recientes.
          </p>
        )}
        <ul className="m-0 mt-7 grid list-none grid-flow-dense gap-(--hueco-bento) p-0 md:grid-cols-2 lg:grid-cols-3">
          {lista.map((r, i) => {
            const ancha = i === larga && lista.length > 1;
            return (
              <li
                key={`${r.autor}-${i}`}
                data-aparecer
                style={{ "--i": i } as CSSProperties}
                className={cn("flex flex-col rounded-tarjeta bg-superficie p-6 lg:p-7", ancha && "md:col-span-2")}
              >
                <figure className="m-0 flex h-full flex-col">
                  <Estrellas puntuacion={r.puntuacion} />
                  <span className="sr-only">{r.puntuacion} de 5</span>
                  <blockquote className="m-0 mt-4 mb-6">
                    <p className={cn("m-0 leading-[1.3] font-semibold tracking-[-0.01em]", ancha ? "text-[clamp(1.375rem,1.1rem+1vw,1.875rem)]" : "text-[1.375rem]")}>
                      «{r.texto}»
                    </p>
                  </blockquote>
                  <figcaption className="mt-auto text-[0.9375rem] text-texto-suave">
                    <strong className="font-bold text-texto">{r.autor}</strong>
                    {r.fecha && <> · {fechaResena(r.fecha)}</>}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
        <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center">
          <Pareja cta={cta} tono="claro" textoWhatsapp={textoWhatsapp} />
          {fichaGoogle && (
            <a href={fichaGoogle} rel="noopener" className="inline-flex min-h-11 items-center gap-1.5 font-bold underline underline-offset-4 hover:no-underline">
              Ver todas en Google
              <IconoExterno />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
