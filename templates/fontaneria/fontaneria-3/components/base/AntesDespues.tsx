import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada para
 * «La furgoneta»: fotos 4:5, rótulos «Antes»/«Después» en piedras tinta y tirador
 * circular arena de 52 px (DeslizadorAntesDespues).
 *
 * Sin JavaScript, las dos fotos salen en fila con su rótulo. Con JavaScript,
 * `DeslizadorAntesDespues` las superpone y añade un `<input type="range">`
 * nativo (teclado y lector de pantalla) que recorta la foto de antes con `clip-path`.
 */
/** Con JS (`data-activo` en el contenedor), las dos capas comparten la celda 1/1 de la rejilla. */
const CAPA = "relative m-0 group-data-[activo]/ad:col-start-1 group-data-[activo]/ad:row-start-1";

export function AntesDespues({ antes, despues, sizes, className }: Props) {
  const rotulo = "absolute top-3.5 z-[3] bg-tinta/80 px-3 py-1 text-sm font-bold text-sobre-tinta";
  return (
    <DeslizadorAntesDespues className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion="4/5" className="rounded-tarjeta">
          <span className={cn(rotulo, "right-3.5 rounded-piedra-3")}>Después</span>
        </Foto>
      </figure>
      <figure data-capa="antes" className={cn(CAPA, "[clip-path:var(--recorte,none)]")}>
        <Foto imagen={antes} sizes={sizes} proporcion="4/5" className="rounded-tarjeta" posicionEtiqueta="abajo-izquierda">
          <span className={cn(rotulo, "left-3.5 rounded-piedra-1")}>Antes</span>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
