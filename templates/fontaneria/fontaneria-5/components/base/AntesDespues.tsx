import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho real de las fotos (las dos ocupan todo el comparador, con y sin JS). */
  sizes: string;
  /** Fotos LCP de la página: precarga las dos (se ven las dos en la primera pantalla). */
  preload?: boolean;
  /** Proporción del comparador (clases aspect-*), la misma con y sin JS. */
  claseProporcion?: string;
  className?: string;
};

/**
 * Copia de la pieza base del registro (kit/registry/base/AntesDespues.tsx), cambiada para «Llegamos»:
 * las dos fotos van SIEMPRE superpuestas en la misma celda y la de «Antes» se recorta al 50 % con
 * `clip-path`. Sin JavaScript se ve esa comparación fija (mitad y mitad, con su tirador); con
 * JavaScript, `DeslizadorAntesDespues` añade el `<input type="range">` nativo y mueve el corte. Como
 * el diseño es el mismo antes y después de hidratar, no hay salto (CLS) y `sizes` es el ancho real.
 * Rótulos en caja tinta y las dos fotos en duotono (Foto).
 */
export function AntesDespues({ antes, despues, sizes, preload, claseProporcion = "aspect-[4/3]", className }: Props) {
  const rotulo = "absolute top-2.5 z-[3] bg-tinta px-2.5 py-1.5 font-titulo text-sm leading-none font-bold text-sobre-tinta";
  const capa = "absolute inset-0 m-0";
  return (
    <DeslizadorAntesDespues className={cn("relative", claseProporcion, className)}>
      <figure data-capa="despues" className={capa}>
        <Foto imagen={despues} sizes={sizes} proporcion="relleno" preload={preload} className="h-full">
          <span className={cn(rotulo, "right-6")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(capa, "[clip-path:inset(0_calc(100%_-_var(--posicion,50%))_0_0)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="relleno" preload={preload} className="h-full">
          <span className={cn(rotulo, "left-2.5")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
