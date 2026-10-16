import type { Imagen, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1200px) 552px, (min-width: 768px) 46vw, 100vw";

/** Foto con etiqueta de documento encima: cuadradito de color + ANTES / DESPUÉS en mono 12 px. */
function FotoEtiquetada({ imagen, etiqueta, marca }: { imagen: Imagen; etiqueta: string; marca: "aviso" | "primario" }) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      <figcaption className="flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.14em] uppercase">
        <span
          aria-hidden="true"
          className={cn("size-2.5 outline outline-1 outline-tinta", marca === "aviso" ? "bg-aviso" : "bg-primario")}
        />
        {etiqueta}
      </figcaption>
      <Foto imagen={imagen} sizes={SIZES} />
    </figure>
  );
}

/**
 * Fotos del trabajo. Con `antes`: par ANTES (marca amarilla) / DESPUÉS (marca primario), apilado en
 * móvil y lado a lado en escritorio, sin slider. Sin `antes`: las fotos sueltas, sin etiquetas.
 * Si hay más fotos que el par, el resto va debajo, también sin etiqueta.
 */
export function TrabajoFotos({ trabajo }: { trabajo: Trabajo }) {
  const [despues, ...resto] = trabajo.imagenes;
  const sueltas = trabajo.antes ? resto : trabajo.imagenes;
  return (
    <div className="flex flex-col gap-5">
      {trabajo.antes && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FotoEtiquetada imagen={trabajo.antes} etiqueta="Antes" marca="aviso" />
          <FotoEtiquetada imagen={despues} etiqueta="Después" marca="primario" />
        </div>
      )}
      {sueltas.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {sueltas.map((imagen, i) => (
            <Foto key={`${imagen.src}-${i}`} imagen={imagen} sizes={SIZES} />
          ))}
        </div>
      )}
    </div>
  );
}
