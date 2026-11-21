import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

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
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada (encargo §8): dentro de una
 * polaroid y con el tirador como regla roja (DeslizadorAntesDespues). Como en el export, «Después» a la
 * izquierda y «Antes» a la derecha: con JavaScript, «antes» es la capa de fondo y «después» la de
 * encima, recortada desde la derecha. Sin JavaScript, las dos fotos en fila con su rótulo. La etiqueta
 * de origen va escrita en el borde blanco inferior, nunca sobre la foto.
 */
const CAPA = "relative m-0 group-data-[activo]/ad:col-start-1 group-data-[activo]/ad:row-start-1";
const ROTULO =
  "absolute top-2.5 z-[3] border border-texto bg-superficie px-1.5 py-0.5 font-titulo text-[0.6875rem] tracking-[0.06em] uppercase";

export function AntesDespues({ antes, despues, sizes, className }: Props) {
  const etiquetas = [...new Set([etiquetaOrigen(despues), etiquetaOrigen(antes)].filter(Boolean))];
  return (
    <div className={cn("polaroid max-w-[560px]", className)}>
      <DeslizadorAntesDespues>
        <figure data-capa="despues" className={cn(CAPA, "group-data-[activo]/ad:z-[2] group-data-[activo]/ad:[clip-path:var(--recorte,none)]")}>
          <Foto imagen={despues} sizes={sizes} proporcion="4/3" marco="ninguno" sinEtiqueta>
            <span className={cn(ROTULO, "left-2.5")}>Después</span>
          </Foto>
        </figure>
        <figure data-capa="antes" className={CAPA}>
          <Foto imagen={antes} sizes={sizes} proporcion="4/3" marco="ninguno" sinEtiqueta>
            <span className={cn(ROTULO, "right-2.5")}>Antes</span>
          </Foto>
        </figure>
      </DeslizadorAntesDespues>
      <div className="polaroid-pie">{etiquetas.join(" · ")}</div>
    </div>
  );
}
