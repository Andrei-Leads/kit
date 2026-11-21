import type { ReactNode } from "react";
import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Estrellas } from "@/components/Estrellas";
import { h2Seccion, pildoraEnlace } from "@/lib/estilos";
import { textoResenas } from "@/lib/formato";
import { resenasRecientes } from "@/lib/resenas";

type Props = {
  resenas: SiteConfig["resenas"];
  valoracion: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Pareja de cierre (solo en el inicio). */
  children?: ReactNode;
};

const FUENTE = { google: "Google", web: "Web", otra: "" } as const;

/**
 * Reseñas (encargo §6.6): las 6 más recientes en tarjetas blancas con comillas grandes en primario
 * suave. Una reseña larga sale entera y la tarjeta crece (rejilla con `items-start`, sin `columns`, para
 * mantener el orden de lectura). «Ver todas en Google» solo con `fichaGoogle`. Sin reseñas, no existe.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, children }: Props) {
  if (resenas.length === 0) return null;
  const lista = resenasRecientes(resenas, 6);
  return (
    <section aria-labelledby="titulo-resenas" className="contenedor flex flex-col gap-[clamp(24px,3vw,40px)] bg-superficie py-[clamp(48px,6vw,96px)]">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex flex-col gap-2.5">
          <h2 id="titulo-resenas" className={h2Seccion}>
            Lo que dicen nuestros clientes
          </h2>
          {valoracion && (
            <p className="m-0 flex flex-wrap items-center gap-2">
              <Estrellas valor={valoracion.media} />
              <strong className="font-extrabold">{mediaVisible(valoracion.media)}</strong>
              <span className="text-texto-suave">· {textoResenas(valoracion.total)}</span>
            </p>
          )}
        </div>
        {fichaGoogle && (
          <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className={pildoraEnlace}>
            Ver todas en Google
          </a>
        )}
      </div>
      <ul className="m-0 grid list-none grid-cols-1 items-start gap-4 p-0 lg:grid-cols-3">
        {lista.map((r, i) => {
          const meta = [r.fecha ? fechaResena(r.fecha) : "", r.fuente ? FUENTE[r.fuente] : ""].filter(Boolean).join(" · ");
          return (
            <li key={`${r.autor}-${i}`}>
              <figure className="relative m-0 flex flex-col gap-3 overflow-hidden rounded-tarjeta border border-borde bg-fondo px-6 pt-7 pb-5.5">
                <span aria-hidden="true" className="absolute -top-2 right-4.5 text-[4rem] leading-none font-extrabold text-primario-suave">
                  “
                </span>
                <Estrellas valor={r.puntuacion} etiqueta={`${r.puntuacion} de 5 estrellas`} />
                <blockquote className="m-0 text-[1.0625rem] text-pretty">{r.texto}</blockquote>
                <figcaption className="flex flex-wrap gap-x-2 gap-y-1 border-t border-borde pt-1 text-[.9375rem] text-texto-suave">
                  <strong className="font-bold text-texto">{r.autor}</strong>
                  {meta && <span>{meta}</span>}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
      {children}
    </section>
  );
}
