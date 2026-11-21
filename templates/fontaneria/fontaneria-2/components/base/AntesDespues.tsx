import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  /** Precarga la foto de «Antes»: es la primera que se pinta (sin JS sale delante) y la LCP de la ficha. */
  preload?: boolean;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx). Comparador de
 * antes y después de un trabajo (`trabajo.antes` y `trabajo.imagenes[0]`).
 *
 * Sin JavaScript, las dos fotos salen en fila con su rótulo (primero «Antes», con `order-first`; con JS vuelve a `order-none` para quedar encima). Con JavaScript,
 * `DeslizadorAntesDespues` las superpone y añade un `<input type="range">`
 * nativo (teclado y lector de pantalla gratis) que recorta la foto de antes con
 * `clip-path`.
 *
 * Reestilada en fontaneria-2 (encargo §7): radio de tarjeta, rótulos en píldora
 * («Antes» en tinta, «Después» en blanco) y tirador circular blanco de 48 px con
 * sombra. Tokens: --color-texto, --color-fondo, --color-foco, --radius-tarjeta.
 */
/** Con JS (`data-activo` en el contenedor), las dos capas comparten la celda 1/1 de la rejilla. */
const CAPA = "relative m-0 group-data-[activo]/ad:col-start-1 group-data-[activo]/ad:row-start-1";
const ROTULO = "absolute top-3 z-[3] rounded-full px-3 py-1.5 text-[13px] leading-none font-bold";

export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="4/3" className="rounded-tarjeta">
          <span className={cn(ROTULO, "right-3 bg-fondo text-texto")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "order-first group-data-[activo]/ad:order-none [clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="4/3" preload={preload} className="rounded-tarjeta">
          <span className={cn(ROTULO, "left-3 bg-texto text-fondo")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
