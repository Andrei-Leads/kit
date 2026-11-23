import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  preload?: boolean;
  className?: string;
};

/** Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda 1/1 ya en el HTML. */
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO = "absolute top-3 z-[3] bg-[rgb(13_14_15/0.75)] px-2 py-[5px] text-xs leading-none font-medium tracking-[0.12em] text-texto uppercase";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), en «Perfil» (encargo §7): fotos
 * 3:2 con rótulos «Antes» y «Después» arriba y la etiqueta de origen abajo a la izquierda; el
 * tirador es un filete anodizado (lo pinta `DeslizadorAntesDespues`). Sin JS, en fila y con
 * «Antes» primero (`order-first`; con JS, las capas se colocan por celda y el orden no cuenta).
 */
export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="3/2" preload={preload}>
          <span className={cn(ROTULO, "right-3")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "order-first [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="3/2">
          <span className={cn(ROTULO, "left-3")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
