import type { ReactNode } from "react";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { Foto, type Proporcion } from "@/components/base/Foto";
import { lam } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  /** Sin imagen, la lámina pinta `dibujo` (un fragmento del despiece) con «· sin foto». */
  imagen?: Imagen;
  /** Número de lámina en la página («Lám. 03»). */
  numero: number;
  sizes?: string;
  proporcion?: Exclude<Proporcion, "relleno">;
  preload?: boolean;
  dibujo?: ReactNode;
  /** Texto extra del pie («antes / después»). */
  pie?: string;
  className?: string;
};

/**
 * «Lamina» del diseño (sustituye a `Foto` en todo el template, encargo §8): la foto con borde de 1 px
 * de tinta y, debajo, el pie en mono con el número de lámina y la etiqueta de origen («Imagen generada
 * con IA»). Así la etiqueta legal nunca tapa la imagen. Sin foto, un dibujo del despiece y
 * «Lám. 02 · sin foto» en vez de un hueco.
 */
export function Lamina({ imagen, numero, sizes = "(min-width: 1024px) 30vw, 100vw", proporcion = "4/3", preload, dibujo, pie, className }: Props) {
  const origen = imagen ? etiquetaOrigen(imagen) : undefined;
  return (
    <figure className={cn("m-0 flex w-full flex-col gap-2 bg-fondo", className)}>
      {imagen ? (
        <div className="border border-tinta bg-superficie">
          <Foto imagen={imagen} sizes={sizes} proporcion={proporcion} preload={preload} sinEtiqueta />
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center overflow-clip border border-tinta bg-superficie p-[6%]",
            { "4/3": "aspect-[4/3]", "3/2": "aspect-[3/2]", "4/5": "aspect-[4/5]", "1/1": "aspect-square", "16/9": "aspect-video" }[proporcion],
          )}
        >
          {dibujo}
        </div>
      )}
      <figcaption className="flex flex-wrap justify-between gap-x-3 gap-y-0.5 font-titulo text-xs leading-[1.4] tracking-[0.04em] text-texto-suave">
        <span>
          {lam(numero)}
          {!imagen && " · sin foto"}
          {pie && ` · ${pie}`}
        </span>
        {origen && <span>{origen}</span>}
      </figcaption>
    </figure>
  );
}
