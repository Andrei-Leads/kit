import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto, type Proporcion } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  proporcion?: Proporcion;
  /** La foto «después» es el LCP de la ficha de trabajo. */
  preload?: boolean;
  className?: string;
};

// Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el
// primer pintado: sin salto de diseño al hidratar. Sin JS, en fila.
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada en «Casa al día»:
 * rótulos en pastilla blanca y tirador circular de 44 px (solución de referencia de
 * electricidad-7). Sin JavaScript, las dos fotos salen en fila. Con JavaScript,
 * `DeslizadorAntesDespues` superpone y un `<input type="range">` nativo recorta la de antes.
 */
export function AntesDespues({ antes, despues, sizes, proporcion = "4/3", preload, className }: Props) {
  const rotulo = "absolute top-3 z-[3] rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-texto";
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion={proporcion} preload={preload}>
          <span className={cn(rotulo, "right-3")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion={proporcion}>
          <span className={cn(rotulo, "left-3")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
