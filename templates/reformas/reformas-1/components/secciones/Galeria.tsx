import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

/** Galería en rejilla de 3 columnas con filetes y `titulo` como pie (sin trabajos). */
export function Galeria({ galeria }: { galeria: SiteConfig["galeria"] }) {
  return (
    <ul className="grid gap-x-[clamp(16px,2vw,32px)] gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {galeria.map((g) => (
        <li key={g.src} data-aparecer>
          <figure className="m-0">
            <Foto imagen={g} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
            {g.titulo && <figcaption className="versalitas mt-3 border-t border-filete pt-3">{g.titulo}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
