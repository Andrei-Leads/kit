import Image from "next/image";
import type { SiteConfig } from "@andrei-leads/core";

import { iniciales } from "@/lib/formato";

/**
 * Equipo de /empresa (Specs §2): regla de 2 px, h2 y una ficha por persona con un cuadrado de 48 px:
 * la foto (`alt` de los datos) o, sin ella, las iniciales en mono. Sin `equipo`, no existe.
 */
export function EmpresaEquipo({ equipo }: { equipo: SiteConfig["empresa"]["equipo"] }) {
  if (equipo.length === 0) return null;
  return (
    <section aria-labelledby="titulo-equipo" className="mt-4 md:mt-8">
      <div aria-hidden="true" className="h-0.5 bg-tinta" />
      <h2
        id="titulo-equipo"
        className="m-0 mt-4 font-mono text-[22px] leading-[1.2] font-bold tracking-[-0.02em] md:text-[26px]"
      >
        Equipo
      </h2>
      <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3">
        {equipo.map((p) => (
          <li key={p.nombre} className="flex min-w-0 items-center gap-3.5 border border-regla p-3.5">
            {p.foto ? (
              <span className="relative size-12 flex-none overflow-hidden border-2 border-tinta">
                <Image src={p.foto.src} alt={p.foto.alt} fill sizes="48px" className="object-cover" />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="grid size-12 flex-none place-items-center border-2 border-tinta font-mono text-lg font-bold"
              >
                {iniciales(p.nombre)}
              </span>
            )}
            <span className="flex min-w-0 flex-col">
              <span className="text-[17px] leading-[1.3] font-bold">{p.nombre}</span>
              {p.cargo && <span className="text-[15px] text-tinta-suave">{p.cargo}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
