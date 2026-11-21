import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  preload?: boolean;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada en electricidad-7:
 * fotos verticales 3:4 con radio de 18 px, rótulos en pastilla y tirador circular de 44 px.
 * Sin JavaScript, las dos fotos salen en fila. Con JavaScript, `DeslizadorAntesDespues` las
 * superpone y un `<input type="range">` nativo recorta la de antes con `clip-path`.
 */
// Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el
// primer pintado: sin salto de diseño al hidratar. Sin JS, en fila.
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";

export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  const rotulo = "absolute bottom-3 z-[3] rounded-boton px-2.5 py-1 text-[13px] leading-none font-extrabold";
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="3/4" preload={preload} posicionEtiqueta="arriba-izquierda">
          <span className={cn(rotulo, "right-3 bg-superficie text-texto")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="3/4" posicionEtiqueta="arriba-izquierda">
          <span className={cn(rotulo, "left-3 bg-texto text-fondo")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
