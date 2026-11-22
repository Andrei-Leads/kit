import { ViewTransition } from "react";
import type { Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { cn } from "@/lib/utils";

type Props = {
  grande: Imagen;
  mini?: Imagen;
  /** La miniatura a la izquierda (lado alterno). */
  invertido?: boolean;
  /** Nombre de la transición miniatura → ficha (recurso 6). */
  transicion?: string;
  /** Parallax de dos velocidades (recurso 3). Nunca en la primera pantalla. */
  parallax?: boolean;
  sizes?: string;
  preload?: boolean;
  className?: string;
};

/**
 * Collage 4:5 a dos escalas (anexo P2.1): una grande y una miniatura desplazada que
 * se solapa, en sentidos opuestos de parallax. Sin miniatura, solo la grande a todo
 * el ancho de su columna.
 */
export function Collage({ grande, mini, invertido, transicion, parallax = true, sizes = "(min-width: 1024px) 460px, 76vw", preload, className }: Props) {
  const foto = <Foto imagen={grande} sizes={sizes} proporcion="4/5" preload={preload} />;
  return (
    <div className={cn("relative", mini && "pb-[16%]", className)}>
      <div className={cn(parallax && "parallax-grande", mini ? "w-[76%]" : "w-full", mini && invertido && "ml-[24%]")}>
        {transicion ? (
          <ViewTransition name={transicion} share="morph" default="none">
            {foto}
          </ViewTransition>
        ) : (
          foto
        )}
      </div>
      {mini && (
        <div className={cn("absolute bottom-0 w-[36%]", invertido ? "left-0" : "right-0", parallax && "parallax-mini")}>
          <Foto imagen={mini} sizes="(min-width: 1024px) 220px, 36vw" proporcion="4/5" className="rounded-foto" />
        </div>
      )}
    </div>
  );
}
