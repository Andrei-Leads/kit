import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  className?: string;
};

/** Con JS (`data-activo` en el contenedor), las dos capas comparten la celda 1/1 de la rejilla. */
const CAPA = "relative m-0 group-data-[activo]/ad:col-start-1 group-data-[activo]/ad:row-start-1";
const ROTULO = "etiqueta absolute top-3 z-[3] bg-tinta/70 px-2 py-1 text-fondo";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada en «Oficio»
 * (encargo §8.5): grande, a todo el ancho, 3:2. Sin JavaScript, las dos fotos en fila
 * con su rótulo; con JavaScript, superpuestas con un tirador de 1 px y un círculo de
 * 44 px sobre un `<input type="range">` nativo.
 */
export function AntesDespues({ antes, despues, sizes, className }: Props) {
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="3/2" posicionEtiqueta="abajo-derecha">
          <span className={cn(ROTULO, "right-3")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="3/2">
          <span className={cn(ROTULO, "left-3")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
