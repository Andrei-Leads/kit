import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

/** Solo `galeria` (sin trabajos): rejilla de fotos 4:5 sin deslizador, con `titulo` como pie (encargo §6.3). */
export function Galeria({ galeria }: { galeria: SiteConfig["galeria"] }) {
  return (
    <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {galeria.map((g) => (
        <li key={g.src} className="aparecer-fachada">
          <figure className="m-0">
            <Foto imagen={g} proporcion="4/5" sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" />
            {g.titulo && <figcaption className="mt-3 font-bold">{g.titulo}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
