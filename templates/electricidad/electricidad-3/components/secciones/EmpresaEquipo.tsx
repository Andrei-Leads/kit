import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { Mancha } from "@/components/Mancha";
import { h2, h3 } from "@/lib/estilos";
import { iniciales } from "@/lib/formato";
import { cn } from "@/lib/utils";

/**
 * Equipo de /empresa (Specs §2, encargo): una tarjeta por persona con su foto (1:1, contorno orgánico) o, sin foto,
 * sus iniciales en 800 sobre una mancha de luz del mismo tamaño. Nombre en 700 y cargo (si existe) en texto suave.
 * Sin equipo, no se pinta.
 */
export function EmpresaEquipo({ equipo }: { equipo: SiteConfig["empresa"]["equipo"] }) {
  if (equipo.length === 0) return null;
  return (
    <section aria-labelledby="titulo-equipo" className="pt-11 lg:pt-16">
      <h2 id="titulo-equipo" className={cn(h2, "mb-4")}>
        El equipo
      </h2>
      <ul className="m-0 grid list-none grid-cols-2 gap-x-2.5 gap-y-5 p-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4">
        {equipo.map((p, i) => (
          <li key={`${i}-${p.nombre}`} className="flex min-w-0 flex-col gap-2.5">
            {p.foto ? (
              <Foto
                imagen={p.foto}
                proporcion="1/1"
                compacta
                sizes="(min-width: 1280px) 300px, (min-width: 768px) 30vw, 50vw"
              />
            ) : (
              <div aria-hidden="true" className="relative flex aspect-square w-full items-center justify-center">
                <Mancha forma="servicio" className="inset-0" />
                <span className="relative z-10 text-5xl leading-none font-extrabold">{iniciales(p.nombre)}</span>
              </div>
            )}
            <div className="min-w-0">
              <p className={cn(h3, "text-[18px]")}>{p.nombre}</p>
              {p.cargo && <p className="m-0 text-[15px] text-texto-suave">{p.cargo}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
