import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  /** Proporción de las dos fotos («Qué te pasa»: 16:9 en la ficha de trabajo). */
  proporcion?: "4/3" | "16/9";
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx). Comparador de
 * antes y después de un trabajo (`trabajo.antes` y `trabajo.imagenes[0]`).
 *
 * Sin JavaScript, las dos fotos salen en fila con su rótulo. Con JavaScript,
 * `DeslizadorAntesDespues` las superpone y añade un `<input type="range">`
 * nativo (teclado y lector de pantalla gratis) que recorta la foto de antes con
 * `clip-path`. Tokens: --color-texto, --color-fondo, --color-foco, --radius-foto.
 */
/** Con JS (`data-activo` en el contenedor), las dos capas comparten la celda 1/1 de la rejilla. */
const CAPA = "relative m-0 group-data-[activo]/ad:col-start-1 group-data-[activo]/ad:row-start-1";

export function AntesDespues({ antes, despues, sizes, proporcion = "4/3", className }: Props) {
  // «Qué te pasa»: rótulos rectos en mayúsculas; «Antes» sobre fondo y «Después» en tinta.
  const rotulo = "absolute top-1.5 z-[3] px-2 py-0.5 text-xs font-bold tracking-[0.08em] uppercase";
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion={proporcion} posicionEtiqueta="abajo-izquierda">
          <span className={cn(rotulo, "right-1.5 bg-texto text-fondo")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion={proporcion}>
          <span className={cn(rotulo, "left-1.5 bg-fondo text-texto")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
