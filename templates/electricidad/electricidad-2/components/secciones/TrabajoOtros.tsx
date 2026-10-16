import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { textos } from "@/lib/textos";

/**
 * «Otros trabajos» (mockup 2e/2j): lista de enlaces en serif de 20 px con flecha y filete, DENTRO del CTA
 * tinta (hijo de `CtaFinal`; el foco es blanco por `sobre-tinta`). Filas de ≥ 56 px. Sin otros trabajos, no existe.
 */
export function TrabajoOtros({ trabajos }: { trabajos: Trabajo[] }) {
  if (trabajos.length === 0) return null;
  return (
    <section aria-labelledby="titulo-otros-trabajos" className="mt-12">
      <h2 id="titulo-otros-trabajos" className="m-0 mb-2 font-serif text-2xl leading-[1.2] font-semibold">
        {textos.otrosTrabajos}
      </h2>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-8 p-0">
        {trabajos.map((t) => (
          <li key={t.slug} className="border-b border-white/16">
            <Link
              href={`/trabajos/${t.slug}`}
              className="flex min-h-14 items-center justify-between gap-3 py-2 font-serif text-xl text-white no-underline hover:underline hover:underline-offset-4"
            >
              {t.titulo}
              <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-[18px] flex-none text-linea" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
