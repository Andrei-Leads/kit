import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { ID_LISTA_TRABAJOS } from "@/lib/trabajos";

/**
 * /trabajos sin `trabajos` pero con `galeria` (Pantalla, variante solo-galeria): rejilla de foto 4:3 recta con su
 * título (si lo hay). Las fotos NO son enlaces (no hay página detrás) y el `alt` sale de los datos.
 */
export function GaleriaTrabajos({ galeria }: { galeria: SiteConfig["galeria"] }) {
  return (
    <ul
      id={ID_LISTA_TRABAJOS}
      className="m-0 grid list-none grid-cols-2 gap-x-2.5 gap-y-[18px] p-0 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-8"
    >
      {galeria.map((foto, i) => (
        <li key={`${foto.src}-${i}`} className="min-w-0">
          <figure className="m-0 flex flex-col gap-2">
            <Foto
              imagen={foto}
              forma="recta"
              compacta
              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 50vw"
            />
            {foto.titulo && (
              <figcaption className="text-base leading-[1.3] font-semibold text-pretty">{foto.titulo}</figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}
