import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  sizes: string;
  preload?: boolean;
  /** Nombre de View Transition de la foto de «después» (miniatura → ficha). */
  transicion?: string;
  className?: string;
};

/** Con JS (`data-activo`), las dos capas comparten la celda 1/1 de la rejilla. */
const CAPA = "relative m-0 group-data-[activo]/ad:col-start-1 group-data-[activo]/ad:row-start-1";
const ROTULO = "absolute bottom-3 z-[3] bg-[rgb(27_31_34/0.72)] px-2 py-1 text-[11px] leading-none font-medium tracking-[0.12em] text-sobre-tinta uppercase";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), en 4:5 grande (módulo
 * escenográfico de la ficha de trabajo). Sin JavaScript, las dos fotos en fila con su
 * rótulo. Con JavaScript, superpuestas con un `<input type="range">` nativo y un tirador
 * de filete de 1 px con píldora de 44 px.
 */
export function AntesDespues({ antes, despues, sizes, preload, transicion, className }: Props) {
  return (
    <DeslizadorAntesDespues className={className}>
      <div data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} preload={preload} etiqueta="dentro" transicion={transicion}>
          <span className={cn(ROTULO, "right-3")}>Después</span>
        </Foto>
      </div>
      <div data-capa="antes" className={cn(CAPA, "z-[2] [clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} etiqueta="dentro">
          <span className={cn(ROTULO, "left-3")}>Antes</span>
        </Foto>
      </div>
    </DeslizadorAntesDespues>
  );
}
