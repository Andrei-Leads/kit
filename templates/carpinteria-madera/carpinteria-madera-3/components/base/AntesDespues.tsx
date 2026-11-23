import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

import { lam } from "@/lib/formato";
import { cn } from "@/lib/utils";

import { Foto } from "./Foto";
import { DeslizadorAntesDespues } from "./DeslizadorAntesDespues";

type Props = {
  antes: Imagen;
  despues: Imagen;
  /** Número de lámina en la página. */
  numero: number;
  /** Ancho de cada foto cuando se ven en fila (sin JS) y de la foto completa con el deslizador. */
  sizes: string;
  /** Precarga la foto de «después»: solo cuando es la imagen LCP. */
  preload?: boolean;
  className?: string;
};

/**
 * Pieza base del registro (kit/registry/base/AntesDespues.tsx), reestilada como lámina (encargo §8):
 * borde de 1 px de tinta, rótulos «Antes» / «Después» en mono, el tirador como línea de cota en lápiz
 * y el pie «Lám. 05 · antes / después» con la etiqueta de origen (nunca sobre la foto).
 *
 * Sin JavaScript, las dos fotos salen en fila. Con JavaScript disponible (`@media (scripting: enabled)`),
 * el CSS las superpone ya en el HTML del servidor y `DeslizadorAntesDespues` añade un
 * `<input type="range">` nativo debajo que recorta la foto de antes con `clip-path`.
 */
const CAPA = "relative m-0 [@media(scripting:enabled)]:col-start-1 [@media(scripting:enabled)]:row-start-1";
const ROTULO = "absolute top-2.5 z-[3] bg-texto px-[7px] py-[3px] font-titulo text-[11.5px] tracking-[0.05em] text-fondo uppercase";

export function AntesDespues({ antes, despues, numero, sizes, preload, className }: Props) {
  const origenes = [etiquetaOrigen(antes), etiquetaOrigen(despues)];
  const origen = origenes[0] && origenes[0] === origenes[1] ? origenes[0].replace("Imagen generada", "Imágenes generadas") : origenes.filter(Boolean).join(" · ");
  return (
    <figure className={cn("m-0 flex flex-col gap-2", className)}>
      <DeslizadorAntesDespues>
        <div data-capa="despues" className={cn(CAPA, "border border-tinta bg-superficie")}>
          <Foto imagen={despues} sizes={sizes} proporcion="4/5" preload={preload} sinEtiqueta>
            <span className={cn(ROTULO, "right-2.5")}>Después</span>
          </Foto>
        </div>
        <div data-capa="antes" className={cn(CAPA, "border border-tinta bg-superficie [@media(scripting:enabled)]:[clip-path:var(--recorte,none)]")}>
          <Foto imagen={antes} sizes={sizes} proporcion="4/5" sinEtiqueta>
            <span className={cn(ROTULO, "left-2.5")}>Antes</span>
          </Foto>
        </div>
      </DeslizadorAntesDespues>
      <figcaption className="flex flex-wrap justify-between gap-x-3 font-titulo text-xs tracking-[0.04em] text-texto-suave">
        <span>{lam(numero)} · antes / después</span>
        {origen && <span>{origen}</span>}
      </figcaption>
    </figure>
  );
}
