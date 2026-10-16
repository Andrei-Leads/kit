import type { Imagen, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { textos } from "@/lib/textos";

const SIZES = "(min-width: 1200px) 582px, (min-width: 768px) 46vw, 100vw";

/**
 * Etiqueta oblicua «Antes» / «Después» sobre la foto (esquina superior izquierda, mockup 2e; la de «Foto de
 * ejemplo» va a la derecha). Antes: tinta; Después: primario. Texto blanco en negrita.
 */
function Etiqueta({ texto, fondo }: { texto: string; fondo: string }) {
  return (
    <span
      className="etiqueta-oblicua absolute top-3.5 left-4 z-[2] px-3.5 font-bold text-white"
      style={{ "--etiqueta-fondo": fondo } as React.CSSProperties}
    >
      {texto}
    </span>
  );
}

/**
 * Fotos de la ficha (mockup 2e/2j). Con `antes`: ANTES (tinta) y DESPUÉS (primario, la primera de
 * `imagenes`) apiladas en móvil y lado a lado desde tablet, sin slider. El resto de `imagenes` (y todas, si no
 * hay `antes`) va en la misma rejilla, sin etiqueta. Cada foto es una `figure` con el `alt` de los datos.
 */
export function TrabajoFotos({ trabajo }: { trabajo: Trabajo }) {
  const { antes, imagenes } = trabajo;
  const fotos: { imagen: Imagen; etiqueta?: { texto: string; fondo: string } }[] = [];
  if (antes) fotos.push({ imagen: antes, etiqueta: { texto: textos.antes, fondo: "var(--color-tinta)" } });
  imagenes.forEach((imagen, i) =>
    fotos.push({
      imagen,
      etiqueta: antes && i === 0 ? { texto: textos.despues, fondo: "var(--color-primario)" } : undefined,
    })
  );
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      {fotos.map(({ imagen, etiqueta }, i) => (
        <figure key={`${imagen.src}-${i}`} className="m-0 min-w-0">
          <Foto imagen={imagen} sizes={SIZES}>
            {etiqueta && <Etiqueta texto={etiqueta.texto} fondo={etiqueta.fondo} />}
          </Foto>
        </figure>
      ))}
    </div>
  );
}
