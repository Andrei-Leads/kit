import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

/** `galeria` en arcos con su `titulo` (cuando no hay trabajos). */
export function GaleriaArcos({ galeria, nivel = "h3" }: { galeria: SiteConfig["galeria"]; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  return (
    <ul className="rejilla-casas m-0 grid list-none gap-x-8 gap-y-12 p-0 lg:grid-cols-3">
      {galeria.map((g, i) => (
        <li key={g.src} data-aparecer style={{ "--i": i } as React.CSSProperties} className="flex flex-col gap-3">
          <Foto imagen={g} sizes="(min-width: 1024px) 33vw, 100vw" arco calidad={60} />
          {g.titulo && <Titulo className="remate m-0 mt-1 text-[22px] leading-tight">{g.titulo}</Titulo>}
        </li>
      ))}
    </ul>
  );
}
