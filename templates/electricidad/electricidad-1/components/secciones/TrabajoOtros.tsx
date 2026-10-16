import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { h3 } from "@/lib/estilos";
import { metaTrabajo } from "@/lib/trabajos";
import { cn } from "@/lib/utils";

/** «Otros trabajos» (Specs §2): filas de título + ubicación · año, con la fila entera como enlace (≥ 44 px). */
export function TrabajoOtros({ trabajos }: { trabajos: Trabajo[] }) {
  if (trabajos.length === 0) return null;
  return (
    <section aria-labelledby="titulo-otros-trabajos" className="mt-4 md:mt-8">
      <h2 id="titulo-otros-trabajos" className={cn(h3, "text-[22px] md:text-[26px]")}>
        Otros trabajos
      </h2>
      <ul className="m-0 mt-5 list-none border-b border-regla p-0">
        {trabajos.map((t) => {
          const meta = metaTrabajo(t);
          return (
            <li key={t.slug} className="border-t border-regla">
              <Link
                href={`/trabajos/${t.slug}`}
                className="grid min-h-14 grid-cols-[minmax(0,1fr)_20px] items-center gap-4 px-2 py-4 text-tinta no-underline hover:bg-papel-2"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-[17px] leading-[1.3] font-bold">{t.titulo}</span>
                  {meta && <span className="font-mono text-[13px] text-tinta-suave">{meta}</span>}
                </span>
                <ArrowRight aria-hidden="true" strokeWidth={2} className="size-5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
