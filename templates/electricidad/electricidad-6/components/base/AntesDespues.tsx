import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  /** La foto «después» es el LCP de la ficha de trabajo: se precarga. */
  preload?: boolean;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada para «Apagón» (como la
 * solución revisada de electricidad-7): sin JavaScript, las dos fotos en fila; con JavaScript
 * disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el primer pintado
 * (sin salto al hidratar) y un `<input type="range">` nativo recorta la de antes con `clip-path`.
 * Divisor y tirador en primario (placa con «‹ ›»). Rótulos «Antes/Después» abajo: arriba a la
 * izquierda va la etiqueta de origen.
 */
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";

export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  const rotulo = "absolute bottom-3 z-[3] bg-texto px-2 py-0.5 text-xs font-bold tracking-wider text-fondo uppercase";
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="4/3" preload={preload}>
          <span className={cn(rotulo, "right-[calc(var(--corte)+0.5rem)]")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="4/3">
          <span className={cn(rotulo, "left-2")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
