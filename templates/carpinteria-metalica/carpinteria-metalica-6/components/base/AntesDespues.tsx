import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Título del trabajo: el `range` lleva «Comparar antes y después: {titulo}» (encargo §8). */
  titulo: string;
  /** 4:3 en el hero y la ficha; 4:5 en las tarjetas de fachada. */
  proporcion?: "4/3" | "4/5";
  /** Ancho de la foto completa con el deslizador (y de cada una en fila, sin JS). */
  sizes: string;
  /** La foto «después» es el LCP del hero y de la ficha de trabajo. */
  preload?: boolean;
  /**
   * Hero y ficha: el «antes» se pide enseguida (eager) a calidad 60, sin precarga (encargo §8,
   * riesgo). `fetchPriority="low"`: React no precarga un `<img>` eager con prioridad baja, así que
   * el «después» (LCP) es la única precarga.
   */
  antesInmediata?: boolean;
  className?: string;
};

// Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde
// el primer pintado: sin salto al hidratar. Sin JS, en fila: «Antes» a la izquierda.
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const PASTILLA =
  "pointer-events-none absolute top-2.5 z-[3] rounded-pastilla px-3 py-1.5 font-texto text-[13px] leading-none font-bold sm:top-3 sm:text-sm";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), en la versión sin salto de
 * electricidad-5 y reestilada en «Fachada nueva» (encargo §8): pastillas «Antes» (gris, texto
 * blanco) y «Después» (albero, texto tinta) en las esquinas de arriba, línea blanca de 2 px y
 * tirador circular de 44 px con dos flechas. La etiqueta de IA va en las dos capas y en el mismo
 * sitio (abajo a la izquierda): se lee entera en cualquier posición del deslizador. Sin JS, las
 * dos fotos en fila, cada una con su pastilla y su etiqueta.
 */
export function AntesDespues({ antes, despues, titulo, proporcion = "4/3", sizes, preload, antesInmediata, className }: Props) {
  return (
    <DeslizadorAntesDespues etiqueta={`Comparar antes y después: ${titulo}`} className={className}>
      <figure data-capa="despues" className={CAPA}>
        <Foto imagen={despues} sizes={sizes} proporcion={proporcion} preload={preload} className="max-sm:[@media(scripting:none)]:aspect-[4/5]">
          <figcaption className={cn(PASTILLA, "right-2.5 bg-acento text-sobre-acento sm:right-3")}>Después</figcaption>
        </Foto>
      </figure>
      <figure
        data-capa="antes"
        className={cn(CAPA, "-order-1 [@media(scripting:enabled)]:z-[1] [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}
      >
        <Foto
          imagen={antes}
          sizes={sizes}
          proporcion={proporcion}
          loading={antesInmediata ? "eager" : undefined}
          // Calidad 60 siempre: una sola URL por foto «antes», aunque salga en el hero y en las tarjetas.
          calidad={60}
          prioridad={antesInmediata ? "low" : undefined}
          className="max-sm:[@media(scripting:none)]:aspect-[4/5]"
        >
          <figcaption className={cn(PASTILLA, "left-2.5 bg-antes text-white sm:left-3")}>Antes</figcaption>
        </Foto>
      </figure>
    </DeslizadorAntesDespues>
  );
}
