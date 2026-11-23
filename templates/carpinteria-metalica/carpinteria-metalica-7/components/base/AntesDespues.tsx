import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";
import { Foto, type Proporcion } from "./Foto";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  proporcion?: Proporcion;
  /** Precarga la foto de «después»: solo cuando es la imagen LCP. */
  preload?: boolean;
  className?: string;
};

/** Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda 1/1 ya en el HTML. */
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO = "absolute top-3 z-[3] bg-superficie px-2.5 py-1 font-titulo text-[15px] font-extrabold tracking-[0.08em] uppercase";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada para «Forja»: rótulos
 * «ANTES» (izquierda) y «DESPUÉS» (derecha, en acento) en placas de hierro y tirador como una
 * barra de hierro con filetes de acento (en `DeslizadorAntesDespues`). Sin JavaScript, las dos
 * fotos en fila. Las placas de IA van abajo para no chocar con los rótulos.
 */
export function AntesDespues({ antes, despues, sizes, proporcion = "1/1", preload, className }: Props) {
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion={proporcion} preload={preload} posicionEtiqueta="abajo-derecha">
          <span className={cn(ROTULO, "right-3 text-acento")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion={proporcion} posicionEtiqueta="abajo-izquierda">
          <span className={cn(ROTULO, "left-3 text-sobre-hierro")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
