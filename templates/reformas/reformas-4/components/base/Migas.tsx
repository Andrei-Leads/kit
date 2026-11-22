import Link from "next/link";
import type { Ancla } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/**
 * Pieza base del registro (kit/registry/base/Migas.tsx), reestilada: mono de 12 px con «/» como
 * separador y enlaces de 44 px de alto. La última es la página actual (`aria-current="page"`).
 */
export function Migas({ migas, className }: { migas: readonly Ancla[]; className?: string }) {
  if (migas.length === 0) return null;
  return (
    <nav aria-label="Migas de pan" className={cn("mono text-xs text-texto-suave", className)}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {migas.map((m, i) => {
          const ultima = i === migas.length - 1;
          return (
            <li key={m.href} className="flex min-h-11 items-center gap-2">
              {ultima ? (
                <span aria-current="page" className="text-texto">
                  {m.texto}
                </span>
              ) : (
                <>
                  <Link href={m.href} className="inline-flex min-h-11 items-center text-texto-suave no-underline hover:text-texto">
                    {m.texto}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
