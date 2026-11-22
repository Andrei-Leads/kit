import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";
import { Foto } from "./Foto";

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
// primer pintado: sin salto al hidratar. Sin JS, en fila, cada una con su rótulo.
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO = "absolute top-4 z-[3] text-[11px] leading-none font-medium tracking-[0.08em] uppercase";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada en
 * «Caudal» (encargo §7): 3:2 a ancho completo, tirador de 1 px con píldora
 * blanca y rótulos en etiqueta. Sin JavaScript, las dos fotos en fila.
 */
export function AntesDespues({ antes, despues, titulo, sizes, preload, className }: Props) {
  return (
    <DeslizadorAntesDespues etiqueta={`Comparar antes y después: ${titulo}`} className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="3/2" preload={preload}>
          <span className={cn(ROTULO, "right-4 text-tinta [@media(scripting:none)]:text-white")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "-order-1 [@media(scripting:enabled)]:z-[1] [@media(scripting:enabled)]:[clip-path:var(--recorte,inset(0_50%_0_0))]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="3/2" posicionEtiqueta="ninguna">
          <span className={cn(ROTULO, "left-4 text-white")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
