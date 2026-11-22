import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { ETIQUETA, Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Título de la obra: «Comparar antes y después: {titulo}». */
  titulo: string;
  /** Ancho de la foto completa con el deslizador (y de cada una en fila, sin JS). */
  sizes: string;
  /** La foto «después» es el LCP del hero y de la ficha de trabajo. */
  preload?: boolean;
  /**
   * Hero: el «antes» se pide enseguida (eager) a calidad 60, sin precarga (encargo §8, riesgo 1).
   * `fetchPriority="low"`: React no precarga un `<img>` eager con prioridad baja, así que el
   * «después» (LCP) es la única precarga y el «antes» se pide desde el HTML, detrás de él.
   */
  antesInmediata?: boolean;
  /** Pista de las flechas del asa al entrar en pantalla (pares; nunca en el hero). */
  pista?: boolean;
  className?: string;
};

// Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el
// primer pintado: sin salto de diseño al hidratar. Sin JS, en fila: «Antes» a la izquierda.
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO =
  "pointer-events-none absolute top-1.5 left-1.5 z-[3] bg-velo-etiqueta px-1.5 py-1 font-texto text-xs leading-none font-medium tracking-[0.08em] text-texto uppercase sm:top-2.5 sm:left-2.5 sm:px-2 sm:py-[5px]";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), en la versión sin salto de
 * electricidad-5 y reestilada en «Antes y después» (encargo §5): dos fotos 4:3, rótulos en
 * versalitas sobre el velo, asa cuadrada de 44 px con filete de tinta y una sola etiqueta de
 * IA por par, abajo a la derecha. Sin JavaScript, las dos fotos en fila, cada una con su rótulo.
 */
export function AntesDespues({ antes, despues, titulo, sizes, preload, antesInmediata, pista, className }: Props) {
  const etiqueta = etiquetaOrigen(despues) ?? etiquetaOrigen(antes);
  // Sin JS, cada foto lleva su etiqueta; con JS (superpuestas), una sola por par.
  const propia = (imagen: Imagen) => {
    const e = etiquetaOrigen(imagen);
    return e && <span className={cn(ETIQUETA, "right-2 bottom-2 max-sm:text-[10px] [@media(scripting:enabled)]:hidden")}>{e}</span>;
  };
  return (
    <DeslizadorAntesDespues etiqueta={`Comparar antes y después: ${titulo}`} pista={pista} className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} preload={preload} posicionEtiqueta="ninguna">
          <figcaption
            className={cn(ROTULO, "[@media(scripting:enabled)]:right-2.5 [@media(scripting:enabled)]:left-auto")}
          >
            Después
          </figcaption>
          {propia(despues)}
        </Foto>
      </figure>
      <figure
        data-capa="antes"
        className={cn(CAPA, "-order-1 [@media(scripting:enabled)]:z-[1] [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}
      >
        <Foto
          imagen={antes}
          sizes={sizes}
          posicionEtiqueta="ninguna"
          loading={antesInmediata ? "eager" : undefined}
          // Calidad 60 siempre: una sola URL por foto «antes», aunque salga en el hero y en los pares.
          calidad={60}
          prioridad={antesInmediata ? "low" : undefined}
        >
          <figcaption className={ROTULO}>Antes</figcaption>
          {propia(antes)}
        </Foto>
      </figure>
      {etiqueta && (
        <span className={cn(ETIQUETA, "right-2 bottom-2 z-[4] hidden max-sm:text-[10px] [@media(scripting:enabled)]:block")}>{etiqueta}</span>
      )}
    </DeslizadorAntesDespues>
  );
}
