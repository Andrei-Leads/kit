import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { ETIQUETA, Foto, POSICION_ETIQUETA } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Título del trabajo: «Comparar antes y después de {titulo}». */
  titulo: string;
  /** Ancho de la foto completa con el deslizador. */
  sizes: string;
  /** Proporción del arco con JavaScript (las dos fotos superpuestas): móvil y desde `lg`. */
  forma: Forma;
  /** La foto «después» es el LCP del hero y de las fichas. */
  preload?: boolean;
  /** Hero y fichas: el «antes» se pide enseguida (eager, prioridad baja, sin precarga). */
  antesInmediata?: boolean;
  className?: string;
};

// Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el
// primer pintado (sin salto al hidratar) y el arco es el contenedor. Sin JS, en fila: cada foto en su
// arco pequeño 4:5, «Antes» a la izquierda.
/** Proporciones del arco (encargo §5 y §7; entrega: parAR, heroIntAR, heroTrabAR). Clases literales para Tailwind. */
const FORMAS = {
  /** Hero de inicio y ficha de trabajo: 1:1 en móvil, 3:2 en escritorio. */
  cuadrada: "[@media(scripting:enabled)]:aspect-square lg:[@media(scripting:enabled)]:aspect-[3/2]",
  /** Pares de Restauraciones y /trabajos: 4:5 en móvil, 3:2 en escritorio. */
  vertical: "[@media(scripting:enabled)]:aspect-[4/5] lg:[@media(scripting:enabled)]:aspect-[3/2]",
  /** Ficha de servicio: 4:3 en móvil, 3:2 en escritorio. */
  apaisada: "[@media(scripting:enabled)]:aspect-[4/3] lg:[@media(scripting:enabled)]:aspect-[3/2]",
};
export type Forma = keyof typeof FORMAS;

const CAPA =
  "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1 [@media(scripting:enabled)]:h-full";
const FOTO =
  "aspect-[4/5] rounded-arco-pequeno [@media(scripting:enabled)]:aspect-auto [@media(scripting:enabled)]:h-full [@media(scripting:enabled)]:rounded-none";
const ROTULO =
  "pointer-events-none absolute bottom-2.5 z-[3] rounded-boton bg-etiqueta px-2.5 py-[5px] text-xs leading-none font-semibold tracking-[0.02em] text-texto sm:bottom-3.5 sm:px-3 sm:py-1.5 sm:text-[13px]";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), en la versión sin salto de
 * reformas-1 y reestilada en «Restauración» (encargo §5 y §8): las dos fotos dentro del arco,
 * «Antes» abajo a la izquierda y «Después» abajo a la derecha en píldoras, tirador crema de 44 px
 * y una sola etiqueta de origen por par, arriba a la derecha bajo la curva del arco. Sin
 * JavaScript, las dos fotos en fila (cada una en su arco pequeño) y la etiqueta debajo.
 */
export function AntesDespues({ antes, despues, titulo, sizes, forma, preload, antesInmediata, className }: Props) {
  // Una etiqueta si las dos fotos tienen el mismo origen; si no, la de cada una (AI Act: ninguna foto de IA sin la suya).
  const [origenAntes, origenDespues] = [etiquetaOrigen(antes), etiquetaOrigen(despues)];
  const mismoOrigen = origenAntes === origenDespues;
  const etiqueta = mismoOrigen
    ? origenDespues
    : [origenAntes && `Antes: ${origenAntes}`, origenDespues && `Después: ${origenDespues}`].filter(Boolean).join(" · ");
  return (
    <div className={className}>
      <DeslizadorAntesDespues
        etiqueta={`Comparar antes y después de ${titulo}`}
        className={cn(
          "[@media(scripting:enabled)]:overflow-hidden [@media(scripting:enabled)]:rounded-foto [@media(scripting:enabled)]:bg-alterna",
          FORMAS[forma],
        )}
      >
        <figure data-capa="despues" className={CAPA}>
          <Foto imagen={despues} sizes={sizes} preload={preload} proporcion="relleno" posicionEtiqueta="ninguna" className={FOTO}>
            <figcaption className={cn(ROTULO, "right-2.5 sm:right-3.5")}>Después</figcaption>
          </Foto>
        </figure>
        <figure
          data-capa="antes"
          className={cn(CAPA, "-order-1 [@media(scripting:enabled)]:z-[1] [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}
        >
          <Foto
            imagen={antes}
            sizes={sizes}
            proporcion="relleno"
            posicionEtiqueta="ninguna"
            loading={antesInmediata ? "eager" : undefined}
            prioridad={antesInmediata ? "low" : undefined}
            // Calidad 60 siempre: una sola URL por foto «antes», aunque salga en el hero y en los pares.
            calidad={60}
            className={FOTO}
          >
            <figcaption className={cn(ROTULO, "left-2.5 sm:left-3.5")}>Antes</figcaption>
          </Foto>
        </figure>
        {etiqueta && <span className={cn(ETIQUETA, POSICION_ETIQUETA.arco, "z-[4] hidden [@media(scripting:enabled)]:block")}>{etiqueta}</span>}
      </DeslizadorAntesDespues>
      {etiqueta && <p className="mt-2 text-xs text-texto-suave [@media(scripting:enabled)]:hidden">{mismoOrigen ? etiqueta.replace("Imagen generada", "Imágenes generadas") : etiqueta}</p>}
    </div>
  );
}
