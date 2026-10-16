import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { h2 } from "@/lib/estilos";
import { iniciales } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

/**
 * Equipo de /empresa (mockup 2f): h2 «El equipo» y una ficha por persona con un cuadrado de 80 px: la foto
 * (`alt` de los datos) o, sin ella, las iniciales en serif cursiva sobre piedra-2 (tinta: ≥ 16:1). Si alguien
 * tiene foto, todos los cuadrados miden 128 px (la etiqueta «Foto de ejemplo» necesita ese ancho y así no se
 * mezclan tamaños). Sin `equipo`, no existe.
 */
export function EmpresaEquipo({ equipo }: { equipo: SiteConfig["empresa"]["equipo"] }) {
  if (equipo.length === 0) return null;
  const grande = equipo.some((p) => p.foto);
  const lado = grande ? "size-32" : "size-20";
  return (
    <section aria-labelledby="titulo-equipo">
      <h2 id="titulo-equipo" className={cn(h2, "mb-6")}>
        {textos.elEquipo}
      </h2>
      <ul className="m-0 flex list-none flex-wrap gap-x-10 gap-y-6 p-0">
        {equipo.map((p, i) => (
          <li key={`${i}-${p.nombre}`} className="flex min-w-0 items-center gap-4">
            {p.foto ? (
              <Foto imagen={p.foto} proporcion="relleno" sizes="128px" className={cn(lado, "flex-none")} />
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  lado,
                  "flex flex-none items-center justify-center bg-piedra-2 font-serif text-4xl text-tinta italic"
                )}
              >
                {iniciales(p.nombre)}
              </span>
            )}
            <span className="flex min-w-0 flex-col">
              <span className="font-serif text-[22px] leading-[1.25] font-semibold">{p.nombre}</span>
              {p.cargo && <span className="text-tinta-suave">{p.cargo}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
