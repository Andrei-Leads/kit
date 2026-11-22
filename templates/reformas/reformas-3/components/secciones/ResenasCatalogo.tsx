import type { ReactNode } from "react";
import Link from "next/link";
import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { numeroObra } from "@/lib/obras";

type Props = Pick<SiteConfig, "resenas" | "valoracion" | "trabajos"> & {
  fichaGoogle?: string;
  /** Pareja al pie (en el inicio). */
  children?: ReactNode;
};

/** Más de esto, se corta en una palabra y el resto sigue en `<details>` «Leer más». */
const LARGO = 240;

function cortar(texto: string): [string, string?] {
  if (texto.length <= LARGO) return [texto];
  const corte = texto.lastIndexOf(" ", 220);
  return [texto.slice(0, corte) + "…", "…" + texto.slice(corte + 1)];
}

/**
 * Reseñas en catálogo: 2 columnas de citas compactas con filete de 2 px. Las 4
 * más recientes y, delante, el primer testimonio de obra con su miniatura en
 * blanco y negro y la banda «01». «Ver todas en Google» solo con `fichaGoogle`.
 * Sin reseñas, no sale.
 */
export function ResenasCatalogo({ resenas, valoracion, trabajos, fichaGoogle, children }: Props) {
  if (resenas.length === 0) return null;
  const recientes = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 4);
  const iTestimonio = trabajos.findIndex((t) => t.testimonio);
  const obra = iTestimonio >= 0 ? trabajos[iTestimonio] : undefined;
  return (
    <section aria-labelledby="titulo-resenas" className="contenedor pt-(--seccion)">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h2 id="titulo-resenas" className="titulo-h2 m-0">
          Reseñas
        </h2>
        {valoracion && (
          <p className="m-0 text-[15px]">
            <span aria-hidden="true" className="text-primario">
              ★{" "}
            </span>
            {mediaVisible(valoracion.media)} · {valoracion.total} reseñas en Google
          </p>
        )}
      </div>
      <div className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {obra?.testimonio && (
          <figure className="m-0 flex gap-3.5 border-t-2 border-borde pt-3.5">
            <Link href={`/trabajos/${obra.slug}`} className="relative block w-[88px] flex-none overflow-hidden">
              <span className="sr-only">Ver la obra {obra.titulo}</span>
              <Foto imagen={obra.imagenes[0]} sizes="88px" proporcion="4/5" archivo decorativa credito={false}>
                <span aria-hidden="true" className="etiqueta absolute bottom-0 left-0 bg-negro px-1.5 py-1 text-xs text-sobre-negro">
                  {numeroObra(iTestimonio)}
                </span>
              </Foto>
            </Link>
            <div>
              <p className="etiqueta m-0 text-[13px] text-texto-suave">
                Obra {numeroObra(iTestimonio)} · {obra.titulo}
              </p>
              <blockquote className="m-0 mt-1.5 text-[17px] leading-[1.45] text-pretty">«{obra.testimonio.texto}»</blockquote>
              <figcaption className="mt-2 text-sm font-semibold">{obra.testimonio.autor}</figcaption>
            </div>
          </figure>
        )}
        {recientes.map((r) => {
          const [corto, resto] = cortar(r.texto);
          const estrellas = Math.round(r.puntuacion);
          return (
            <figure key={`${r.autor}-${r.fecha ?? ""}`} className="m-0 border-t-2 border-borde pt-3.5">
              <div className="flex justify-between gap-3 text-[13px]">
                <span role="img" aria-label={`${r.puntuacion} de 5`} className="tracking-[0.1em] text-primario">
                  {"★".repeat(estrellas)}
                  {"☆".repeat(5 - estrellas)}
                </span>
                {r.fecha && <span className="text-texto-suave">{fechaResena(r.fecha)}</span>}
              </div>
              <blockquote className="m-0 mt-2 text-base leading-[1.5] text-pretty">
                {corto}
                {resto && (
                  <details>
                    <summary className="etiqueta mt-1.5 inline-flex min-h-11 cursor-pointer list-none items-center text-sm underline decoration-primario decoration-2 underline-offset-4 [&::-webkit-details-marker]:hidden">
                      Leer más
                    </summary>
                    <p className="m-0">{resto}</p>
                  </details>
                )}
              </blockquote>
              <figcaption className="mt-2 text-sm font-semibold">{r.autor}</figcaption>
            </figure>
          );
        })}
      </div>
      {fichaGoogle && (
        <p className="m-0 mt-5">
          <a
            href={fichaGoogle}
            rel="noopener"
            className="etiqueta inline-flex min-h-11 items-center text-[15px] text-texto underline decoration-primario decoration-2 underline-offset-4"
          >
            Ver todas en Google
          </a>
        </p>
      )}
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}
