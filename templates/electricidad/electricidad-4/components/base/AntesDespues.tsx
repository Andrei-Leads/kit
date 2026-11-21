import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  /** Precarga la foto de «después» (la LCP de la ficha de trabajo). */
  preload?: boolean;
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
/** Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda 1/1 ya en el HTML. */
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";

export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  // «Cuadro»: rótulos en cinta de rotuladora; «Después» a la derecha para que no tape a «Antes»
  // (el clip-path de la capa de antes crea su propio contexto de apilamiento).
  const rotulo = "absolute top-2.5 left-2.5 z-[3] border border-borde bg-etiqueta px-2 text-sm leading-6 font-semibold text-texto";
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="4/3" preload={preload}>
          <span className={cn(rotulo, "right-2.5 left-auto")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="4/3">
          <span className={rotulo}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
