import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Título de la pieza: «Comparar antes y después de {titulo}». */
  titulo: string;
  /** Ancho de la foto completa con el deslizador. */
  sizes: string;
  className?: string;
};

// Con JavaScript disponible (`@media (scripting: enabled)`), las dos capas comparten la celda desde el
// primer pintado (sin salto al hidratar). Sin JS, en fila: «Antes» a la izquierda.
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1 [@media(scripting:enabled)]:h-full";
const ROTULO = "pie-ficha absolute top-0 z-[3] bg-superficie px-1.5 py-0.5 text-[11px] text-texto [@media(scripting:enabled)]:hidden";
const ETIQUETA = "pie-ficha z-[4] flex h-[18px] items-center bg-superficie px-1.5 text-[11px] leading-none tracking-[0.04em] whitespace-nowrap text-texto";

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada para «Galería» (entrega
 * §12): las dos fotos 4:5 superpuestas, tirador de línea negra de 2 px con un cuadrado blanco, y
 * «← Antes / Después →» debajo, fuera de la foto. Una etiqueta de origen por par si las dos fotos
 * tienen el mismo; si no, la de cada una (ninguna foto de IA sin la suya). Sin JavaScript, las dos
 * fotos en fila con su rótulo.
 */
export function AntesDespues({ antes, despues, titulo, sizes, className }: Props) {
  const [origenAntes, origenDespues] = [etiquetaOrigen(antes), etiquetaOrigen(despues)];
  const etiqueta =
    origenAntes === origenDespues
      ? origenDespues
      : [origenAntes && `Antes: ${origenAntes}`, origenDespues && `Después: ${origenDespues}`].filter(Boolean).join(" · ");
  return (
    <div className={className}>
      <DeslizadorAntesDespues etiqueta={`Comparar antes y después de ${titulo}`} className="[@media(scripting:enabled)]:aspect-[4/5] [@media(scripting:enabled)]:overflow-hidden">
        <figure data-capa="despues" className={CAPA}>
          <Foto imagen={despues} sizes={sizes} etiqueta="ninguna" className="[@media(scripting:enabled)]:aspect-auto [@media(scripting:enabled)]:h-full">
            <figcaption className={cn(ROTULO, "right-0")}>Después</figcaption>
          </Foto>
        </figure>
        <figure data-capa="antes" className={cn(CAPA, "-order-1 [@media(scripting:enabled)]:z-[1] [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
          <Foto imagen={antes} sizes={sizes} etiqueta="ninguna" className="[@media(scripting:enabled)]:aspect-auto [@media(scripting:enabled)]:h-full">
            <figcaption className={cn(ROTULO, "left-0")}>Antes</figcaption>
          </Foto>
        </figure>
        {etiqueta && <span className={cn(ETIQUETA, "pointer-events-none absolute bottom-0 left-0 hidden max-w-full [@media(scripting:enabled)]:flex")}>{etiqueta}</span>}
      </DeslizadorAntesDespues>
      {etiqueta && <p className={cn(ETIQUETA, "m-0 mt-1 w-fit px-0 [@media(scripting:enabled)]:hidden")}>{etiqueta.replace(/^Imagen generada/, "Imágenes generadas")}</p>}
      <div aria-hidden="true" className="ft mt-2 hidden justify-between text-base tracking-[0.04em] [@media(scripting:enabled)]:flex">
        <span>← Antes</span>
        <span>Después →</span>
      </div>
    </div>
  );
}
