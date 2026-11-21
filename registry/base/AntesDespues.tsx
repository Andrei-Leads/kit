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

export function AntesDespues({ antes, despues, sizes, className }: Props) {
  const rotulo = "absolute top-2 left-2 z-[3] rounded-[2px] bg-texto/80 px-2 py-0.5 text-xs font-semibold text-fondo";
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="4/3">
          <span className={rotulo}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="4/3">
          <span className={rotulo}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
