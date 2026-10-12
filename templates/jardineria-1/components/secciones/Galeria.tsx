import Image from "next/image";
import type { SiteConfig } from "@andrei-leads/core";

import { contenedorSeccion, TituloSeccion } from "@/components/TituloSeccion";
import { cn } from "@/lib/utils";

/** Cuadrícula estática 2 col. (móvil) / 4 col. (escritorio), recorte 1:1. Sin JS. */
export function Galeria({ galeria }: { galeria: SiteConfig["galeria"] }) {
  if (galeria.length === 0) return null;

  return (
    <section id="trabajos" aria-labelledby="titulo-trabajos" className="border-t-2 border-tinta">
      <div className={cn(contenedorSeccion, "flex flex-col gap-[clamp(24px,3vw,40px)]")}>
        <TituloSeccion id="titulo-trabajos">Trabajos realizados</TituloSeccion>
        <ul className="m-0 grid list-none grid-cols-2 gap-[clamp(8px,1vw,16px)] p-0 lg:grid-cols-4">
          {galeria.map((g, i) => (
            <li key={`${g.src}-${i}`}>
              <figure className="relative m-0 aspect-square overflow-hidden rounded-lg bg-linea">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="object-cover"
                />
                {g.titulo && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(12_14_10/0.88),rgb(12_14_10/0))] px-2.5 pt-7 pb-2.5 text-sm leading-[1.25] font-bold text-white">
                    {g.titulo}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
