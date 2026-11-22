import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de la foto completa con el deslizador. */
  sizes: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada para
 * «Tensión» (encargo §8): a ancho completo, tirador de 1 px en señal con
 * círculo de 44 px. Sin JavaScript, las dos fotos en fila con su rótulo; con
 * JavaScript, superpuestas y un `<input type="range">` nativo que recorta la
 * de antes con `clip-path`. La etiqueta de origen va fuera, una sola.
 */
const CAPA = "relative m-0 group-data-[activo]/ad:col-start-1 group-data-[activo]/ad:row-start-1";
const ROTULO = "etiqueta absolute top-3 z-[3] border border-[var(--color-linea)] bg-[var(--color-velo)] px-2 py-1 text-[11px] text-texto backdrop-blur-[6px]";

export function AntesDespues({ antes, despues, sizes, className }: Props) {
  const ia = antes.origen === "ia" || despues.origen === "ia";
  return (
    <div className={className}>
      <DeslizadorAntesDespues>
        <figure data-capa="despues" className={CAPA}>
          <Foto imagen={despues} sizes={sizes} proporcion="relleno" etiqueta="ninguna" className="aspect-[4/5] md:aspect-video">
            <span className={cn(ROTULO, "right-3")}>Después</span>
          </Foto>
        </figure>
        <figure data-capa="antes" className={cn(CAPA, "[clip-path:var(--recorte,none)]")}>
          <Foto imagen={antes} sizes={sizes} proporcion="relleno" etiqueta="ninguna" className="aspect-[4/5] md:aspect-video">
            <span className={cn(ROTULO, "left-3")}>Antes</span>
          </Foto>
        </figure>
      </DeslizadorAntesDespues>
      <p className="etiqueta m-0 mt-3 text-[11px] text-texto-suave">
        <span className="hidden [@media(scripting:enabled)]:inline">Desliza para comparar</span>
        {ia && <span className="[@media(scripting:enabled)]:before:content-['_·_']">Imágenes generadas con IA</span>}
      </p>
    </div>
  );
}
