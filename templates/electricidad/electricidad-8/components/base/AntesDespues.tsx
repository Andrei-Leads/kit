import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  /** Solo la lámina LCP de la ficha de trabajo. */
  preload?: boolean;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada (encargo §8): lámina
 * enmarcada 3:2, rótulos «Antes» / «Después» en noche, tirador de línea de 1 px con un rombo
 * primario y un único pie de origen bajo la lámina.
 *
 * Sin JavaScript, las dos fotos salen en fila con su rótulo. Con JavaScript,
 * `DeslizadorAntesDespues` las superpone y añade un `<input type="range">` nativo.
 */
// Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el
// primer pintado: sin salto de diseño al hidratar. Sin JS, en fila.
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO = "versalitas absolute top-3 z-[3] bg-noche px-2 py-1 text-noche-texto";

export function AntesDespues({ antes, despues, sizes, preload, className }: Props) {
  const etiqueta = etiquetaOrigen(despues) ?? etiquetaOrigen(antes);
  return (
    <div className={className}>
      <div className="border border-linea-plano bg-fondo p-2 sm:p-3">
        <DeslizadorAntesDespues>
          <figure data-capa="despues" className={CAPA}>
            <Foto imagen={despues} sizes={sizes} preload={preload} sinEtiqueta>
              <span className={cn(ROTULO, "right-3")}>Después</span>
            </Foto>
          </figure>
          <figure data-capa="antes" className={cn(CAPA, "[@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
            <Foto imagen={antes} sizes={sizes} eager={preload} sinEtiqueta>
              <span className={cn(ROTULO, "left-3")}>Antes</span>
            </Foto>
          </figure>
        </DeslizadorAntesDespues>
      </div>
      <p className="versalitas mt-2 text-texto-suave">{[etiqueta, "Antes y después"].filter(Boolean).join(" · ")}</p>
    </div>
  );
}
