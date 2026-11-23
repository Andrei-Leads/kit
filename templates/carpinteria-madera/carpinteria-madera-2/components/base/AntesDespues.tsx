import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  /** Precarga la foto de «después»: solo cuando es la imagen LCP. */
  preload?: boolean;
  className?: string;
};

/**
 * `isolate` en cada capa: sin él, el rótulo «Después» (z-index 3) quedaba por encima de la capa de
 * antes y tapaba el suyo. «Antes» a la izquierda y «Después» a la derecha, como se ven al deslizar.
 */
/** Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda ya en el HTML. */
const CAPA = "relative isolate m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO = "absolute bottom-3 z-[3] rounded-full bg-superficie px-2.5 py-1 text-xs font-bold text-texto";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada para «A medida»: fotos
 * 4:5 con radio de 20 px y tirador en píldora miel (encargo §8). Sin JavaScript, las dos fotos en
 * fila con su rótulo. Con JavaScript, superpuestas desde el primer pintado y un `<input
 * type="range">` nativo (teclado y lector de pantalla) recorta la de antes con `clip-path`.
 *
 * Tokens: --radius-foto, --color-acento, --color-superficie, --color-texto, --color-foco.
 */
export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="4/5" preload={preload}>
          <span className={cn(ROTULO, "right-3")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:none)]:order-first [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="4/5">
          <span className={cn(ROTULO, "left-3")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
