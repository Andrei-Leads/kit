import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { ETIQUETA, Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Título del trabajo: «Comparar antes y después de {titulo}». */
  titulo: string;
  /** Ancho de cada foto (en fila sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  className?: string;
};

/** Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el primer pintado. */
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
/** «Antes» / «Después» (entrega): cursiva serif de 14 px sobre papel. */
const ROTULO = "pointer-events-none absolute bottom-3 z-[3] bg-fondo px-2 py-0.5 font-titulo text-sm leading-[1.3] text-texto italic";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), en la versión sin salto de
 * reformas-1 y reestilada en «Veta» (encargo §8): 4:3, sin radio, «Antes» abajo a la izquierda y
 * «Después» abajo a la derecha, tirador como filete vertical con un círculo fino. Una sola
 * etiqueta de origen por par si las dos fotos tienen el mismo origen; si no, la de cada una (AI
 * Act: ninguna foto de IA sin la suya). Sin JavaScript, las dos fotos en fila.
 */
export function AntesDespues({ antes, despues, titulo, sizes, className }: Props) {
  const [origenAntes, origenDespues] = [etiquetaOrigen(antes), etiquetaOrigen(despues)];
  const mismoOrigen = origenAntes === origenDespues;
  const etiqueta = mismoOrigen
    ? origenDespues
    : [origenAntes && `Antes: ${origenAntes}`, origenDespues && `Después: ${origenDespues}`].filter(Boolean).join(" · ");
  return (
    <div className={className}>
      <DeslizadorAntesDespues etiqueta={`Comparar antes y después de ${titulo}`}>
        <figure data-capa="despues" className={CAPA}>
          <Foto imagen={despues} sizes={sizes} proporcion="4/3" posicionEtiqueta="ninguna">
            <figcaption className={cn(ROTULO, "right-3")}>Después</figcaption>
          </Foto>
        </figure>
        <figure data-capa="antes" className={cn(CAPA, "-order-1 [@media(scripting:enabled)]:z-[1] [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
          <Foto imagen={antes} sizes={sizes} proporcion="4/3" posicionEtiqueta="ninguna">
            <figcaption className={cn(ROTULO, "left-3")}>Antes</figcaption>
          </Foto>
        </figure>
        {etiqueta && <span className={cn(ETIQUETA, "top-2.5 right-2.5 z-[4] hidden [@media(scripting:enabled)]:block")}>{etiqueta}</span>}
      </DeslizadorAntesDespues>
      {etiqueta && (
        <p className="pie-foto mt-2 text-sm [@media(scripting:enabled)]:hidden">
          {mismoOrigen ? etiqueta.replace("Imagen generada", "Imágenes generadas") : etiqueta}
        </p>
      )}
    </div>
  );
}
