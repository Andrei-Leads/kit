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

/**
 * Pieza base del registro, reestilada (encargo §7 y entrega §5): radio de 32 px, rótulos «Antes» y
 * «Después» en `superficie` y tirador en guijarro. Sin JavaScript, las dos fotos en fila; con JS
 * disponible (`@media (scripting: enabled)`), superpuestas ya en el HTML y con un
 * `<input type="range">` nativo a toda la superficie. El pie de origen lo pone quien la usa.
 */
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO = "absolute top-4 z-[3] rounded-chip bg-superficie px-3 py-1 text-sm font-semibold text-texto";

export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sinEtiqueta sizes={sizes} proporcion="4/3" preload={preload}>
          <span className={cn(ROTULO, "right-4")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sinEtiqueta sizes={sizes} proporcion="4/3">
          <span className={cn(ROTULO, "left-4")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
