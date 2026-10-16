import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { h3 } from "@/lib/estilos";
import { ID_LISTA_TRABAJOS } from "@/lib/trabajos";

/**
 * /trabajos sin `trabajos` pero con `galeria` (mockup 2d): rejilla de foto 4:3 + título (si lo hay) en serif.
 * Las fotos no son enlaces (no hay página detrás) y el `alt` sale de los datos.
 */
export function GaleriaTrabajos({ galeria }: { galeria: SiteConfig["galeria"] }) {
  return (
    <ul id={ID_LISTA_TRABAJOS} className="m-0 grid list-none grid-cols-1 gap-9 p-0 md:grid-cols-2 md:gap-x-7">
      {galeria.map((foto, i) => (
        <li key={`${foto.src}-${i}`} className="min-w-0">
          <figure className="m-0 flex flex-col gap-2.5">
            <Foto imagen={foto} sizes="(min-width: 1200px) 578px, (min-width: 768px) 46vw, 100vw" />
            {foto.titulo && <figcaption className={`${h3} text-pretty`}>{foto.titulo}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
