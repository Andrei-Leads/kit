import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  /** Precarga la foto de «después»: solo cuando es la imagen LCP (ficha de trabajo). */
  preload?: boolean;
  className?: string;
};

/** Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda 1/1 ya en el HTML. */
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO = "etiqueta absolute top-3 z-[3] border border-texto bg-superficie px-2 py-0.5 text-texto";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada (encargo §8): fotos 3:2
 * con marco de 1 px, rótulos «ANTES» y «DESPUÉS» como etiquetas de plano y el tirador como una cota
 * vertical (DeslizadorAntesDespues). La etiqueta de origen va en el pie de figura de quien la usa.
 *
 * Sin JavaScript, las dos fotos salen en fila. Con JavaScript disponible, superpuestas ya en el HTML
 * del servidor (sin salto al hidratar) y con un `<input type="range">` nativo que recorta la de antes.
 * Tokens: --color-texto, --color-superficie, --color-foco, --radius-foto.
 */
export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="3/2" preload={preload}>
          <span className={cn(ROTULO, "right-3")}>DESPUÉS</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="3/2">
          <span className={cn(ROTULO, "left-3")}>ANTES</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
