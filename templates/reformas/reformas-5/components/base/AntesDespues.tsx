import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Título del trabajo: «Comparar antes y después: {titulo}». */
  titulo: string;
  /** Ancho de la foto completa con el deslizador (y de cada una en fila, sin JS). */
  sizes: string;
  /** La foto «después» es el LCP de la ficha de trabajo. */
  preload?: boolean;
  className?: string;
};

// Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el
// primer pintado: sin salto de diseño al hidratar. Sin JS, en fila (cada una en su arco, con su pie).
const CAPA = "relative m-0 flex flex-col gap-2 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const PIE = "text-center text-[15px] font-semibold [@media(scripting:enabled)]:sr-only";
const ROTULO =
  "absolute top-[58%] z-[3] hidden rounded-full bg-texto/82 px-3 py-[5px] text-sm leading-none font-semibold text-white [@media(scripting:enabled)]:block";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), en la versión sin salto de
 * electricidad-5 y reestilada en «Tu casa»: dentro de un marco de arco 3:4 y tirador
 * circular de 44 px en superficie. Sin JavaScript, las dos fotos en fila, cada una en su arco.
 */
export function AntesDespues({ antes, despues, titulo, sizes, preload, className }: Props) {
  return (
    <DeslizadorAntesDespues etiqueta={`Comparar antes y después: ${titulo}`} className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="3/4" arco preload={preload}>
          <span className={cn(ROTULO, "right-3.5")}>Después</span>
        </Foto>
        <figcaption className={PIE}>Después</figcaption>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "-order-1 [@media(scripting:enabled)]:z-[1] [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="3/4" arco>
          <span className={cn(ROTULO, "left-3.5")}>Antes</span>
        </Foto>
        <figcaption className={PIE}>Antes</figcaption>
      </figure>
    </DeslizadorAntesDespues>
  );
}
