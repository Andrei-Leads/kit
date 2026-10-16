import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { textos } from "@/lib/textos";

type Props = {
  /** Los demás servicios (al menos 1). */
  servicios: Servicio[];
};

/**
 * «Otros servicios» (mockup 2b/2i): va DENTRO del bloque tinta del CTA (`children` de `CtaFinal`), bajo los
 * botones. h2 blanco y lista de enlaces en serif con flecha y línea fina debajo: 1 columna en móvil y hasta
 * 4 en escritorio. Cada enlace mide ≥ 56 px de alto. Foco en blanco (el CTA es `sobre-tinta`).
 */
export function FichaOtrosServicios({ servicios }: Props) {
  return (
    <nav aria-labelledby="titulo-otros-servicios" className="mt-12 lg:mt-14">
      <h2 id="titulo-otros-servicios" className="m-0 mb-3 font-serif text-2xl leading-[1.2] font-semibold">
        {textos.otrosServicios}
      </h2>
      <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {servicios.map((s) => (
          <li key={s.slug} className="min-w-0">
            <Link
              href={`/servicios/${s.slug}`}
              className="flex min-h-14 items-center justify-between gap-3 border-b border-white/25 py-2 font-serif text-xl leading-[1.25] text-white no-underline hover:border-white"
            >
              <span>{s.titulo}</span>
              <ArrowRight aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
