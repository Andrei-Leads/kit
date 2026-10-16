import type { Imagen, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";

const SIZES = "(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw";

/** Foto recta de 16 px con su rótulo («Antes» / «Después») encima. */
function FotoRotulada({ imagen, rotulo }: { imagen: Imagen; rotulo: string }) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      <figcaption className="text-base font-bold">{rotulo}</figcaption>
      <Foto imagen={imagen} forma="recta" sizes={SIZES} />
    </figure>
  );
}

/**
 * Fotos del trabajo (todas las `imagenes`). Con `antes`: par «Antes» / «Después» (la primera imagen), apilado en
 * móvil y lado a lado en escritorio, sin slider; las demás imágenes van debajo, sin rótulo. Sin `antes`: todas las
 * imágenes en rejilla recta (una sola ocupa una columna).
 */
export function TrabajoFotos({ trabajo }: { trabajo: Trabajo }) {
  const [despues, ...resto] = trabajo.imagenes;
  const sueltas = trabajo.antes ? resto : trabajo.imagenes;
  return (
    <div className="flex flex-col gap-4">
      {trabajo.antes && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FotoRotulada imagen={trabajo.antes} rotulo="Antes" />
          <FotoRotulada imagen={despues} rotulo="Después" />
        </div>
      )}
      {sueltas.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
          {sueltas.map((imagen, i) => (
            <li key={`${imagen.src}-${i}`} className="min-w-0">
              <Foto imagen={imagen} forma="recta" sizes={SIZES} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
