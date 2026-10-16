import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { ID_LISTA_TRABAJOS } from "@/lib/trabajos";

/**
 * /trabajos sin `trabajos` pero con `galeria` (Specs §2): rejilla de foto 4:3 + título (si lo hay).
 * Las fotos no son enlaces (no hay página detrás) y el `alt` sale de los datos.
 */
export function GaleriaTrabajos({ galeria }: { galeria: SiteConfig["galeria"] }) {
  return (
    <ul
      id={ID_LISTA_TRABAJOS}
      className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3 md:gap-6"
    >
      {galeria.map((foto, i) => (
        <li key={`${foto.src}-${i}`} className="min-w-0">
          <figure className="m-0 flex flex-col gap-3">
            <Foto imagen={foto} sizes="(min-width: 1200px) 384px, (min-width: 768px) 31vw, 100vw" />
            {foto.titulo && (
              <figcaption className="text-[18px] leading-[1.3] font-bold">{foto.titulo}</figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}
